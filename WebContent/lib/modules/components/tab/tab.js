/**
 * Tab
 * 
 * @author dengfenfen, dengfenfen@dhcc.com.cn, 2013-12-11
 * 
 * @requires utils, Map, extend, component
 * 
 * @method void add(Object/Array items, Number index)
 * @method void remove(Object/String/Number item)
 * @method void setActive(Object/String/Number item)
 * @method void setTitle(Object/String/Number item, String title)
 * @method Object getItem(String/Number/Object item)
 * 
 * @event beforeadd: function(Tab t, Object item)
 * @event add: function(Tab t, Object item)
 * @event beforeclose: function(Tab t, Object item)
 * @event close: function(Tab t, Object item)
 * @event beforeremove: function(Tab t, Object item)
 * @event remove: function(Tab t, Object item)
 * @event beforetabchange: function(Tab t, Object activeTab, Object
 *        lastActiveTab)
 * @event tabchange: function(Tab t, Object activeTab, Object lastActiveTab)
 * @event activate: function(Tab t, Object activeTab)
 * @event addbuttonclick: function(Tab t, jqObject addButton, Event e)
 * 
 * @description updated on 2013-03-21
 * 
 */
define(function(require, exports, module) {
	'require:nomunge,exports:nomunge,moduleactivate:nomunge';

	require('./tab.css');
	var utils = require('utils');
	var Map = require('map');
	var extend = require('extend');
	var Base = require('component');
	var PageLoader = require('page-loader');

	function onClick(e) {
		var comp = Base.get(e.data.componentId);
		if (comp) {
			var $target = $(e.target), $header = $target.closest('.'
					+ comp.baseCls + '-header');
			if ($target.hasClass('close') && $header.size() > 0) {
				var ci = comp.itemMap.get($header.data('itemId'));
				if (ci && comp.trigger('beforeclose', comp, ci) !== false) {
					comp.trigger('close', comp, ci);
					comp.remove(ci);
				}

				ci = null;
			} else if ($header.size() > 0) {
				if ($header.hasClass(comp.baseCls + '-header-add')) {
					comp.trigger('addbuttonclick', comp, $header, e)
				} else if (!$header.hasClass('active')) {
					comp.setActive($header.data('itemId'));
				}
			}

			$header = null;
			$target = null;
		}

		comp = null;
	}

	(function() {
		var Tab = extend(
				Base,
				{
					baseCls : 'yi-tab',
					baseHtml : '<div><ul class="nav nav-tabs"></ul><div class="tab-content"></div></div>',

					/**
					 * @cfg items Array
					 * 
					 * 每一个标签页都是一个页面加载器，数组中的每一个对象即为组件实例的参数。
					 */

					/**
					 * @cfg activeIndex Number
					 * 
					 * 初始化时激活的标签序号（从0开始）
					 */
					activeIndex : 0,

					/**
					 * @cfg hasAddButton Boolean
					 * 
					 * 是否有'添加'按钮
					 */

					/**
					 * @cfg defaultTitle String
					 * 
					 * item中没有title属性则使用它作为标题
					 */
					defaultTitle : 'new tab',

					initComponent : function() {
						Tab.superclass.initComponent.call(this);

						this.addEvents('beforeadd',

						'add',

						'beforeremove',

						'remove',

						'beforetabchange',

						'tabchange',

						'activate',

						'addbuttonclick');
					},
					afterRender : function(parent) {
						Tab.superclass.afterRender.call(this, parent);

						this.nav = this.el.children('.nav-tabs').addClass(
								this.baseCls + '-nav').on('click', {
							componentId : this.getId()
						}, onClick);
						this.headers = this.nav.children().addClass(
								this.baseCls + '-header');

						this.content = this.el.children('.tab-content')
								.addClass(this.baseCls + '-content');
						this.tabs = this.content.children();

						if (this.hasAddButton) {
							this.addAddButton();
						}

						if (this.items) {
							this.add(this.items);
							delete this.items;
						}

						this.setActive(this.activeIndex);
					},
					addAddButton : function() {
						this.addButton = $(
								'<li class="'
										+ this.baseCls
										+ '-header '
										+ this.baseCls
										+ '-header-add"><a><span class="glyphicon glyphicon-plus"></span></a></li>')
								.appendTo(this.nav);
					},
					/**
					 * 添加标签页
					 * 
					 * @argument
					 * 
					 * 1、items Object/Array 1)title String: 标签页的标题 2)closable
					 * Boolean: 标签页是否可关闭 3)url String: 标签页会加载页面 4)params Object:
					 * 加载页面时的额外参数 5)async Boolean: 是否异步加载页面 6)loadScripts
					 * Boolean: 是否处理加载页面中的脚步 7)html String:标签页中会加入html代码
					 * 
					 * 2、index Number: 插入UI中的位置（从0开始）
					 */
					add : function(items, index) {
						if (!this.itemMap) {
							this.initItems();
						}

						var $prevHeader, $prevTab;
						if (utils.isNumber(index)) {
							$prevHeader = this.headers.eq(index);
							$prevTab = this.tabs.eq(index);
						} else if (this.addButton) {
							$prevHeader = this.addButton;
						}

						// 确保items是个数组
						items = [].concat(items);
						var i, len = items.length, ais = [];
						for (i = 0; i < len; i++) {
							var item = items[i];

							var id = item.id;
							if (this.itemMap.containsKey(id)) {
								continue;
							}

							if (this.trigger('beforeadd', this, item) !== false) {
								var c = new PageLoader(item);
								id = c.getId();
								this.itemMap.put(id, c);
								ais.push(c);

								var $header = $(
										'<li class="'
												+ this.baseCls
												+ '-header"><a>'
												+ (item.title || this.defaultTitle)
												+ '</a>'
												+ (item.closable
														? '<button type="button" class="close" aria-hidden="true">&times;</button>'
														: '') + '</li>').data(
										'itemId', id);
								if ($prevHeader) {
									$header.insertBefore($prevHeader);
								} else {
									$header.appendTo(this.nav);
								}
								c.headerEl = $header;

								var $tab = $('<div class="' + this.baseCls
										+ '-item tab-pane"></div>');
								if ($prevTab) {
									$tab.insertBefore($prevTab);
								} else {
									$tab.appendTo(this.content);
								}
								c.render($tab);

								this.refresh();

								this.trigger('add', this, c);

								$header = null;
								$tab = null;
							}
						}

						$prevTab = null;
						$prevHeader = null;

						return ais;
					},
					initItems : function() {
						this.itemMap = new Map();
					},
					refresh : function() {
						this.headers = this.nav.children().not(
								'.' + this.baseCls + '-header-add');
						this.tabs = this.content.children();
					},
					/**
					 * 删除标签页
					 * 
					 * @argument item Object/String/Number
					 *           参数可以是item对象、唯一标识或者UI中的位置（从0开始）
					 */
					remove : function(item) {
						var id, $header, $tab, ri;
						if (utils.isObject(item)) {
							ri = item
							id = item.id;
							$header = ri.headerEl;
							$tab = ri.el.parent();
						} else if (utils.isString(item)) {
							id = item;
							ri = this.itemMap.get(item);
							$header = ri.headerEl;
							$tab = ri.el.parent();
						} else if (utils.isNumber(item)) {
							$header = this.headers.eq(item);
							id = $header.data('itemId');
							ri = this.itemMap.get(id);
							$tab = ri.el.parent();
						}

						if (ri
								&& this.trigger('beforeremove', this, ri) !== false) {
							var ai;
							if (ri == this.activeTab) {
								ai = $header.prev();
								if (ai.size() == 0) {
									ai = $header.next();
								}
								if (ai.size() > 0) {
									ai = ai.data('itemId');
								} else {
									ai = undefined;
								}
							}

							delete ri.headerEl;
							ri.destroy();

							if ($tab.size() > 0) {
								$tab.remove();
							}
							if ($header.size() > 0) {
								$header.remove();
							}

							this.itemMap.remove(id);

							this.refresh();

							this.trigger('remove', this, ri);

							if (ai) {
								this.setActive(ai);
							}

							ai = null;
						}

						ri = null;
						$tab = null;
						$header = null;
					},
					/**
					 * 激活某一标签页
					 * 
					 * @argument item Object/String/Number
					 *           参数可以是item对象、唯一标识或者UI中的位置（从0开始）
					 */
					setActive : function(item) {
						var id, $header, $tab, ai;
						if (utils.isObject(item)) {
							ai = item;
							id = item.id;
							$header = ai.headerEl;
							$tab = ai.el.parent();
						} else if (utils.isString(item)) {
							id = item;
							ai = this.itemMap.get(item);
							$header = ai.headerEl;
							$tab = ai.el.parent();
						} else if (utils.isNumber(item)) {
							$header = this.headers.eq(item);
							id = $header.data('itemId');
							ai = this.itemMap.get(id);
							$tab = ai.el.parent();
						}

						if (false !== this.trigger('beforetabchange', this, ai,
								this.activeTab)) {
							var activeCls = 'active';
							this.headers.removeClass(activeCls);
							this.tabs.removeClass(activeCls).hide();
							$header.addClass(activeCls);
							$tab.addClass(activeCls).show();

							if (this.activeTab != ai) {
								this.trigger('tabchange', this, ai,
										this.activeTab);
							}

							this.trigger('activate', this, ai);

							this.activeTab = ai
						}

						ai = null;
						$tab = null;
						$header = null;
					},
					/**
					 * 获取tab对象
					 * 
					 * @argument item String/Number/Object
					 *           参数可以是item对象、唯一标识或者UI中的位置（从0开始）
					 */
					getItem : function(item) {
						if (utils.isString(item)) {
							return this.itemMap.get(item);
						} else if (utils.isNumber(item)) {
							return this.itemMap.get(this.headers.eq(item).data(
									'itemId'));
						} else if (utils.isObject(item)) {
							return item;
						} else {
							return null;
						}
					},
					/**
					 * 设置标签的文字
					 * 
					 * @argument
					 * 
					 * 1、item Object/String/Number
					 * 参数可以是item对象、唯一标识或者UI中的位置（从0开始）
					 * 
					 * 2、title String: 新的标题
					 */
					setTitle : function(item, title) {
						var $header;
						if (utils.isObject(item)) {
							$header = item.headerEl;
						} else if (utils.isString(item)) {
							$header = this.itemMap.get(item).headerEl;
						} else if (utils.isNumber(item)) {
							$header = this.headers.eq(item);
						}

						if ($header) {
							$header.children('a').html(title || '');

							$header = null;
						}
					},
					beforeDestory : function() {
						delete this.activeTab;

						if (this.addButton) {
							this.addButton.remove();
							delete this.addButton;
						}

						if (this.itemMap && !this.itemMap.isEmpty()) {
							var K = this.itemMap.keySet(), i, len = K.length;
							for (i = 0; i < len; i++) {
								if (this.itemMap.containsKey(K[i])) {
									this.remove(K[i]);
								}
							}
						}
						if (this.itemMap) {
							this.itemMap.clear();
							delete this.itemMap;
						}

						if (this.headers) {
							this.headers.remove();
							delete this.headers;
						}
						if (this.nav) {
							// for ensuring
							this.nav.off('click', onClick);
							delete this.nav;
						}
						if (this.tabs) {
							this.tabs.remove();
							delete this.tabs;
						}
						if (this.content) {
							this.content.remove();
							delete this.content;
						}

						Tab.superclass.beforeDestory.call(this);
					}
				});

		module.exports = Tab;
	}());
});