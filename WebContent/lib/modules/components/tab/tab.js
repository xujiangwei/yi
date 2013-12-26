/**
 * Tab
 * 
 * @author dengfenfen, dengfenfen@dhcc.com.cn, 2013-12-11
 * 
 * @requires utils, extend, component
 * 
 * @method void setActive(Number index)
 * @method void setTitle(Object option)
 * @method void loadTabContent(Object option)
 * @method void add(Object option)
 * @method void remove(Number index)
 * @method Object getTab(Number index)
 * 
 * @event beforetabchange function(Tab t, Number activeIndex)
 * @event tabchange function(Tab t, Number activeIndex, Number lastActiveIndex)
 * @event add function(Tab t, Object item)
 * @event remove function(Tab t, Object item)
 * 
 * @description updated on 2013-12-25
 * 
 */
define(function(require, exports, module) {
	'require:nomunge,exports:nomunge,module:nomunge';

	var utils = require('utils');
	var extend = require('extend');
	var Base = require('component');

	(function() {
		var Tab = extend(Base, {
			baseCls : 'yi-tab',
			/**
			 * @cfg activeIndex Number
			 * 
			 * 初始化时激活的标签序号，从0开始计数，默认激活第0项
			 */
			activeIndex : 0,
			defaultTitle : 'new tab',
			afterRender : function(parent) {
				Tab.superclass.afterRender.call(this, parent);
				var id = this.getId();
				this.el.data('cmpId', id);
				this.headers = this.el.children('.' + this.baseCls + '-nav');
				this.tabs = this.el.children('.' + this.baseCls + '-content');
				this.tab = this.tabs.children();
				this.header = this.headers.children().addClass(this.baseCls
						+ '-header');

				this.headers.on('click', {
							cmpId : id
						}, this.onTitleClick).on('mouseover', {
							cmpId : id
						}, this.showRemoveBtn).on('mouseleave', {
							cmpId : id
						}, this.hideDeleteBtn);

				this.items = this.items || [];
				this.add(this.items, true);
				this.setActive(this.activeIndex);

				$a = null;
			},
			showRemoveBtn : function(e) {
				var cmp = Base.get(e.data.cmpId), $target = $(e.target), targetCls = cmp.baseCls
						+ '-header', $li = $target.parentsUntil('.'
								+ cmp.baseCls, '.' + targetCls);
				if ($target.hasClass(targetCls)) {
					$li = $target;
				}
				$('.' + cmp.baseCls + '-header-remove', cmp.el).hide();
				if ($li.data('item') && true === $li.data('item').closable) {
					$li.children('.' + cmp.baseCls + '-header-remove').show();
				}
				$target = null;
				$li = null;
				cmp = null;
			},
			hideDeleteBtn : function(e) {
				var cmp = Base.get(e.data.cmpId);
				$('.' + cmp.baseCls + '-header-remove', cmp.el).hide();
				cmp = null;
			},
			onTitleClick : function(e) {
				var $target = $(e.target), cmp = Base.get(e.data.cmpId);
				if ($target.hasClass('yi-tab-nav')) {
					$target = null;
					return;
				}
				var $li = $target.parentsUntil('.yi-tab-nav', '.yi-tab-header');
				if ($li.size() == 0) {
					$li = $target;
				}
				var index = $li.index();
				// 删除标签页
				if ($target.hasClass(cmp.baseCls + '-header-remove')) {
					cmp.remove(index);
				}
				// 添加标签页
				else if ($target.parentsUntil('.yi-tab-nav',
						'.yi-tab-title-add').size() > 0
						|| $target.hasClass('yi-tab-title-add')) {
					cmp.onAddTab && cmp.onAddTab.call(cmp)
				}
				// 激活标签页
				else if ((($target
						.parentsUntil('.yi-tab-nav', '.yi-tab-header').size() > 0 || $target
						.hasClass(cmp.baseCls + '-header')))
						&& !$li.hasClass('active')) {
					cmp.setActive(index);
				}
				$li = null;
				$target = null;
			},
			onAddTab : utils.emptyFn,
			/**
			 * @description 获取tab对象
			 * @param index
			 *            Number : tab的序号
			 */
			getTab : function(index) {
				return this.items[index];
			},
			/**
			 * @description 添加标签页
			 * @param items
			 *            [{item},{item},] or {item} item的属性：1)title String:
			 *            标签页的标题 2)closable Boolean: 标签页是否可关闭,默认不可关闭 3)url
			 *            String 或者 html String:标签页内容 4)beforeDestory: Function
			 *            删除标签页前的处理 5)afterDestroy: Function 删除标签页后的处理
			 *            6)afterLoad Function:标签页内容加载完之后执行的函数 7)isAdd:Boolean:
			 *            判断是否是‘添加’按钮
			 */
			add : function(items, init) {
				// 确保items是个数组
				items = [].concat(items);
				if (true !== init) {
					this.items = this.items.concat(items);
				}
				var i, len = items.length, baseCls = this.baseCls, addItem;
				for (i = 0; i < len; i++) {
					var item = items[i];
					url = item.url || '';
					item.closable = item.closable === true;
					var $header = $('<li class="' + baseCls + '-header"><a>'
							+ (item.title || this.defaultTitle)
							+ '</a><span class="glyphicon glyphicon-remove '
							+ baseCls + '-header-remove"></span></li>');
					var $tab = $('<div tabid="'
							+ (item[this.identifier] || item.id || '')
							+ '" class="row yi-tab-item tab-pane fade"></div>');
					item.el = $tab;
					var $addHeader = $('.' + baseCls + '-title-add', this.el);
					var $addTab = this.tab.eq($addHeader.index());
					// 是否是添加按钮
					if (true === item.isAdd) {
						item.closable = false;
						item.url = '';
						item.html = '';
						item.beforeDestory = utils.emptyFn;
						item.afterDestroy = utils.emptyFn;
						item.afterLoad = utils.emptyFn;
						$header = $('<li class="'
								+ baseCls
								+ '-header '
								+ baseCls
								+ '-title-add"><a><span class="glyphicon glyphicon-plus"></span></a></li>');
						addItem = this.items.splice(i, 1);

					}
					if ($addHeader.size() > 0) {
						$header.insertBefore($addHeader);
						$tab.insertBefore($addTab);
					} else {
						$header.appendTo(this.headers);
						$tab.appendTo(this.tabs);
					}
					$tab.hide();
					$header.data('item', item);
					$tab.data('item', item);

					this.refresh();

					var index = $header.index();

					this.loadTabContent({
								index : index,
								url : url,
								html : item.html || ''
							});
				}
				$header = null;
				$tab = null;
				$addHeader = null;
				$addTab = null;
			},
			/**
			 * @description 标签页加载内容 option 1)index Number:标签页的index 2)url
			 *              String: 请求的地址 或者 4)html String: 标签页的内容 5)params
			 *              Object: 额外的数据
			 */
			loadTabContent : function(option) {
				var $item = this.tab.eq(option.index);
				if (option.url && '' != option.url) {
					$item.load(option.url, option.params, this.doItemLoad);
				} else {
					$item.html(option.html);
					this.afterItemLoad.call(this, $item);
				}
				$item = null;
			},
			doItemLoad : function(responseText, textStatus, xhr) {
				var cmp = Base.get($(this).parents('.yi-tab').data('cmpId'));
				var $item = $(this);
				var item = $item.data('item');
				cmp.afterItemLoad.call(cmp, $item, item);
				$item = null;
			},
			afterItemLoad : function($item) {
				var item = $item.data('item');
				var afterLoad = item && item.afterLoad;
				afterLoad && afterLoad.call(item, this);
				this.trigger('add', this, item);
			},

			/**
			 * @description 删除标签页
			 * @param index
			 *            Number 标签页的序号
			 */
			remove : function(index) {
				var $item = this.header.eq(index), $tab = this.tab.eq(index), item = $tab
						.data('item'), afterDestroy = item.afterDestroy, beforeDestroy = item.beforeDestroy;
				if (false !== (beforeDestroy && beforeDestroy.call(item, this))) {
					delete item.el;
					$item.removeData('item');
					$tab.removeData('item');
					this.items.splice(index, 1);
					$item.remove();
					$tab.remove();
					this.trigger('remove', this, item);
					this.refresh();
					afterDestroy && afterDestroy.call(item, this);
				}
				$item = null;
				$tab = null;
			},
			refresh : function() {
				this.tab = this.tabs.children();
				this.header = this.headers.children();
			},
			/**
			 * 激活某一标签页
			 */
			setActive : function(index) {
				var item = this.items[index], $tab = item.el;
				if (false !== this.trigger('beforetabchange', this, index)) {
					var activeCls = 'in active';
					this.header.removeClass(activeCls);
					this.tab.removeClass(activeCls).hide();
					this.header.eq(index).addClass(activeCls);
					$tab.addClass(activeCls).show();
					this.lastActiveIndex = this.activeIndex;
					this.activeIndex = index;
					this
							.trigger('tabchange', this, index,
									this.lastActiveIndex);
				}
				$tab = null;
			},
			/**
			 * @description 设置标签的名称
			 * @param option
			 *            1) index 标签页的序号 2) title String: 标签页的标题
			 */
			setTitle : function(option) {
				this.header.eq(option.index).children('a').html(option.title
						|| '');
			},
			beforeDestory : function() {
				if (this.headers) {
					this.headers.remove();
					delete this.headers;
				}
				if (this.tabs) {
					this.tabs.remove();
					delete this.tabs;
				}
				if (this.header) {
					this.header.remove();
					delete this.header;
				}
				if (this.tab) {
					this.tab.remove();
					delete this.tab;
				}
				if (this.activeIndex) {
					delete this.activeIndex;
				}
				if (this.items) {
					delete this.items;
				}
				Tab.superclass.beforeDestory.call(this);
			}
		});

		module.exports = Tab;
	}());
});