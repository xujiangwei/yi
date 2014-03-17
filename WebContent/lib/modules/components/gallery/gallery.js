/**
 * Gallery
 * 
 * @author dengfenfen, dengfenfen@dhcc.com.cn, 2013-12-04
 * 
 * @extends component
 * 
 * @requires utils, map, extend, component
 * 
 * @method void load(Object option[, Boolean append])
 * @method void clear()
 * @method void add(Object/Array items[, Number index])
 * @method void remove(Object/String/Number item)
 * @method void select(Object/String/Number/Array items[, Boolean keep])
 * @method Array getSelectedItems()
 * @method Object getItem(String/Number/Object item)
 * @method Object getItemData(String/Object item)
 * @method Array getData()
 * 
 * @event load: function(Gallery g, Object/Array data)
 * @event beforeadd: function(Gallery g, Object data, String id, Boolean isAdd)
 * @event add: function(Tab t, Object item, String id, Boolean isAdd)
 * @event beforeremove: function(Tab t, Object item, String id, Boolean isAdd)
 * @event remove: function(Tab t, Object item, String id, Boolean isAdd)
 * @event itemrender: function(Gallery g, Object item, String id, Boolean isAdd)
 * @event itemmouseover: function(Gallery g, Object item, String id, Boolean
 *        isAdd, Event e)
 * @event itemmouseout: function(Gallery g, Object item, String id, Boolean
 *        isAdd, Event e)
 * @event itemclick: function(Gallery g, Object item, String id, Boolean isAdd,
 *        Event e)
 * @event beforeitemdestroy: function(Gallery g, Object item, String id, Boolean
 *        isAdd)
 * @event itemdestroy: function(Gallery g, Object item, String id, Boolean
 *        isAdd)
 * 
 * @description updated on 2013-03-11
 * 
 */
define(function(require, exports, module) {
	'require:nomunge,exports:nomunge,module:nomunge';

	require('./gallery.css');
	var utils = require('utils');
	var Map = require('map');
	var extend = require('extend');
	var Base = require('component');

	var baseCls = 'yi-gallery';

	function onClick(e) {
		var $item = $(e.target).closest('.' + baseCls + '-item');
		if ($item.size() > 0) {
			var comp = Base.get(e.data.componentId);
			if (comp) {
				var id = $item.parent().data('itemId');

				comp.clickItem(id, e);
			}

			comp = null;
		}

		$item = null;
	}

	function onItemMouseEnter(e) {
		var $item = $(e.currentTarget);
		if ($item.size() > 0) {
			var comp = Base.get(e.data.componentId);
			if (comp) {
				var id = $item.parent().data('itemId');

				comp.overItem(id, e);
			}

			comp = null;
		}

		$item = null;
	}

	function onItemMouseLeave(e) {
		var $item = $(e.currentTarget);
		if ($item.size() > 0) {
			var comp = Base.get(e.data.componentId);
			if (comp) {
				var id = $item.parent().data('itemId');

				comp.outItem(id, e);
			}

			comp = null;
		}

		$item = null;
	}

	(function() {
		var Gallery = extend(
				Base,
				{
					baseCls : baseCls,

					/**
					 * @cfg border Boolean
					 * 
					 * 画廊是否显示边框
					 */

					/**
					 * @cfg cols Array
					 * 
					 * 画廊的排列是遵从Bootstrap的栅格系统，cols数组中的4个元素依次表示在Extra
					 * small、Small、Medium和Large四种屏幕尺寸下，一行显示多少个item
					 */

					/**
					 * @cfg itemWidth Number
					 * 
					 * item的宽。没有设置cols时，还会根据item宽度自动计算cols
					 */

					/**
					 * @cfg itemHeight Number
					 * 
					 * item的高
					 */

					/**
					 * @cfg itemCls String
					 * 
					 * item的自定义样式类，它会被自动添加到item的el上，方便使用者定制item的样式
					 */

					/**
					 * @cfg itemOverCls String
					 * 
					 * 鼠标悬停时item的自定义样式类，它会被自动添加到item的el上或移除，方便使用者定制鼠标悬停时item的样式
					 */

					/**
					 * @cfg hasAddItem Boolean
					 * 
					 * 是否包含一个用于创建的item
					 */

					/**
					 * @cfg addItemFront Boolean
					 * 
					 * 用于创建的item是否总在前面
					 */

					/**
					 * @cfg data Array
					 * 
					 * 初始化时的静态数据
					 */

					/**
					 * @cfg dataUrl String
					 * 
					 * 远程数据的URL。dataUrl会被作为属性存储于实例中，还可以通过load()传入或覆盖
					 */

					/**
					 * @cfg params Object
					 * 
					 * 请求远程数据的额外参数。params会被作为属性存储于实例中，还可以通过load()传入或覆盖
					 */

					/**
					 * @cfg autoLoad Boolean
					 * 
					 * 初始化后是否自动加载远程数据。与data参数互斥，data参数优先
					 */

					/**
					 * @cfg reader Object 1)identifier String:
					 *      item的id对应数据那个属性，默认'id'
					 * 
					 * 例：reader:{identifier: 'id'}
					 */
					reader : {},

					/**
					 * @cfg multiSelect Boolean
					 * 
					 * 是否多选
					 */

					initComponent : function() {
						Gallery.superclass.initComponent.call(this);

						this.addEvents('load',

						'beforeadd',

						'add',

						'beforeremove',

						'remove',

						'itemrender',

						'itemmouseover',

						'itemmouseout',

						'itemclick',

						'beforeitemdestroy',

						'itemdestroy');

						this.identifier = (this.reader && this.reader.identifier)
								|| 'id';
						this.calculateCols();
					},
					calculateCols : function() {
						this.cols = [].concat(this.cols);

						var smC = this.cols[1]
								|| Math.floor(768 / this.itemWidth);
						var mdC = this.cols[2]
								|| Math.floor(992 / this.itemWidth);
						var lgC = this.cols[3]
								|| Math.floor(1200 / this.itemWidth);
						var xsC = this.cols[0] || (smC - 1);
						var xsN = Math.ceil(12 / xsC);
						var smN = Math.ceil(12 / smC);
						var mdN = Math.ceil(12 / mdC);
						var lgN = Math.ceil(12 / lgC);

						this.colCls = this.baseCls + '-col col-xs-' + xsN
								+ ' col-sm-' + smN + ' col-md-' + mdN
								+ ' col-lg-' + lgN;
					},
					afterRender : function(container) {
						Gallery.superclass.afterRender.call(this, container);

						if (this.border) {
							this.el.addClass(this.baseCls + '-border');
						}

						this.el.on('click', {
							componentId : this.getId()
						}, onClick);

						this.list = $(
								'<div class="' + this.baseCls
										+ '-list row"></div>')
								.appendTo(this.el);

						if (this.hasAddItem) {
							this.addAddItem();
						}

						if (utils.isArray(this.data)) {
							var data = this.data;

							delete this.data;

							this.add(data);
						} else if (this.autoLoad) {
							this.load({
								dataUrl : this.dataUrl,
								params : this.params
							});
						}
					},
					overItem : function(id, e) {
						var item = this.getItem(id);
						if (item) {
							item.el.addClass(this.baseCls + '-item-over');
							if (this.itemOverCls) {
								item.el.addClass(this.itemOverCls);
							}
							this.onItemOver(item, id, this.getItemData(id));

							this.trigger('itemmouseover', this, item, id,
									item.isAdd, e);
						}

						item = null;
					},
					// 扩展点
					onItemOver : utils.emptyFn,
					outItem : function(id, e) {
						var item = this.getItem(id);
						if (item) {
							item.el.removeClass(this.baseCls + '-item-over');
							if (this.itemOverCls) {
								item.el.removeClass(this.itemOverCls);
							}
							this.onItemOut(item, id, this.getItemData(id));

							this.trigger('itemmouseout', this, item, id,
									item.isAdd, e);
						}

						item = null;
					},
					// 扩展点
					onItemOut : utils.emptyFn,
					clickItem : function(id, e) {
						var item = this.getItem(id);
						if (item) {
							if (!item.isAdd) {
								if (this.multiSelect) {
									if (!this.selectedItems) {
										this.selectedItems = {};
									}
									if (this.selectedItems[id]) {
										delete this.selectedItems[id];
									} else {
										this.selectedItems[id] = id;
									}
								} else {
									this.selectedItems = id;
								}

								this.doSelect();
							}

							this.trigger('itemclick', this, item, id,
									item.isAdd, e);
						}

						item = null;
					},
					addAddItem : function() {
						if (!this.dataMap) {
							this.initData()
						}
						if (!this.itemMap) {
							this.initItems();
						}

						var id = this.getId() + '_add';
						// this.itemMap.put(id, {}); // 单独销毁，不记录就不会被clear()删除

						if (this.trigger('beforeadd', this, null, id, true) !== false) {
							var $col = $(
									'<div class="' + this.baseCls + '-col-add '
											+ this.colCls + '"></div>').data(
									'itemId', id).appendTo(this.list);

							this.addItem = {
								id : id,
								isAdd : true
							};
							this.itemMap.put(id, this.addItem);

							this.renderItem(this.addItem, $col, id, null);

							this.trigger('add', this, this.addItem, id, true);

							$col = null;
						}
					},
					initData : function() {
						this.dataMap = new Map();
					},
					initItems : function() {
						this.itemMap = new Map();
					},
					renderItem : function(item, container, id, data) {
						this
								.onItemRender(item, container, id, data,
										item.isAdd);
						if (this.itemCls) {
							item.el.addClass(this.itemCls);
						}
						if (this.itemWidth) {
							item.el.width(this.itemWidth);
						}
						if (this.itemHeight) {
							item.el.height(this.itemHeight);
						}

						var componentId = this.getId();
						item.el.on('mouseenter', {
							componentId : componentId
						}, onItemMouseEnter).on('mouseleave', {
							componentId : componentId
						}, onItemMouseLeave);

						this.trigger('itemrender', this, item, id, item.isAdd);

						// afteritemrender?
					},
					// 扩展点
					onItemRender : function(item, container, id, data, isAdd) {
						item.el = $(
								'<div class="' + this.baseCls + '-item"></div>')
								.appendTo(container);
					},
					/**
					 * (重新)加载数据
					 * 
					 * @argument
					 * 
					 * 1、option {} 1)data Array: 静态数据 2)dataUrl String: 数据的Url
					 * 3) params Object: 额外的参数
					 * 
					 * 2、append Boolean: 是否追加数据
					 */
					load : function(option, append) {
						if (this.rendered) {
							option = option || {};
							if (!append) {
								this.clear();
							}

							if (utils.isArray(option.data)) {
								this.add(option.data);

								return;
							}

							this.dataUrl = option.dataUrl || this.dataUrl;
							this.params = option.params || this.params;
							if (utils.isString(this.dataUrl)) {
								this.doLoad(this.dataUrl, this.params);
							}
						}
					},
					doLoad : function(url, params) {
						$.ajax({
							url : url,
							data : params || null,
							traditional : true,
							success : this.onLoadSuccess,
							context : this
						})
					},
					onLoadSuccess : function(data, textStatus, jqXhr) {
						var data = $.parseJSON(jqXhr.responseText);
						this.add(data);
						this.trigger('load', this, data);

						data = null;
					},
					/**
					 * 清空
					 */
					clear : function() {
						// keep it in paging?
						// if (!this.multiSelect) {
						// delete this.selectedItems;
						// }
						delete this.selectedItems;

						if (this.dataMap && !this.dataMap.isEmpty()) {
							var K = this.dataMap.keySet(), i, len = K.length;
							for (i = 0; i < len; i++) {
								if (this.dataMap.containsKey(K[i])) {
									this.remove(K[i]);
								}
							}
						}
					},
					/**
					 * 渲染列表，默认保留旧数据
					 * 
					 * @argument 1)data Object/Array: 待添加的列表数组或对象 2)index
					 *           Number: 插入UI中的位置（从0开始）
					 */
					add : function(data, index) {
						if (!this.dataMap) {
							this.initData();
						}
						if (!this.itemMap) {
							this.initItems();
						}

						var position;
						if (utils.isNumber(index)) {
							position = this.list.children(
									'.' + this.baseCls + '-col').eq(index);
						} else if (this.addItem) {
							if (!this.addItemFront) {
								position = this.addItem.el.parent();
							}
						}

						// 确保items是个数组
						data = [].concat(data);
						var i, len = data.length;
						for (i = 0; i < len; i++) {
							var d = data[i];

							var id = d[this.identifier];
							if (this.dataMap.containsKey(id)) {
								continue;
							}

							if (!id) {
								id = utils.id();
							}

							if (this.trigger('beforeadd', this, d, id, false) !== false) {
								this.dataMap.put(id, d);

								var $col = $(
										'<div class="' + this.colCls
												+ '"></div>')
										.data('itemId', id);
								if (position) {
									$col.insertBefore(position);
								} else {
									$col.appendTo(this.list);
								}

								var item = {
									id : id
								};
								this.itemMap.put(id, item);

								this.renderItem(item, $col, id, d);

								this.trigger('add', this, item, id, false);

								item = null;
								$col = null;
							}
						}

						position = null;
					},
					/**
					 * 删除列表项
					 * 
					 * @argument item Object/String/Number
					 *           参数可以是item对象、唯一标识或者UI中的位置（从0开始）
					 */
					remove : function(item) {
						var id, $col, ri;
						if (utils.isObject(item)) {
							ri = item;
							id = item.id;
							$col = ri.el.parent();
						} else if (utils.isString(item)) {
							id = item;
							ri = this.getItem(id);
							$col = ri.el.parent();
						} else if (utils.isNumber(item)) {
							$col = this.list.children(
									'.' + this.baseCls + '-col').eq(item);
							id = $col.data('itemId');
							ri = this.getItem(id);
						}

						if (ri
								&& this.trigger('beforeremove', this, ri, id,
										ri.isAdd) !== false) {
							if (this.multiSelect) {
								if (this.selectedItems
										&& this.selectedItems[id]) {
									delete this.selectedItems[id];
								}
							} else if (id == this.selectedItems) {
								delete this.selectedItems;
							}

							this.destroyItem(ri, id, ri.isAdd);

							if ($col.size() > 0) {
								$col.remove();
							}

							this.dataMap.remove(id);

							this.trigger('remove', this, ri, id, ri.isAdd);
						}

						ri = null;
						$col = null;
					},
					destroyItem : function(item, id, isAdd) {
						if (this.trigger('beforeitemdestroy', this, item, id,
								isAdd) !== false) {
							this.beforeItemDestroy(item, id, isAdd)// container?data?

							// for ensuring
							item.el.off('mouseenter', onItemMouseEnter).off(
									'mouseleave', onItemMouseLeave);
							delete item.el;

							this.onItemDestroy(item, id, isAdd);// container?data?

							this.itemMap.remove(id);

							this.trigger('itemdestroy', this, item, id, isAdd);
						}
					},
					// 扩展点
					beforeItemDestroy : utils.emptyFn,
					// 扩展点
					onItemDestroy : utils.emptyFn,
					/**
					 * 选中记录
					 * 
					 * @argument
					 * 
					 * 1、items Object/String/Number/Array
					 * 参数可以是单一的item对象、唯一标识或者UI中的位置（从0开始），也可以是它们的数组
					 * 
					 * 2、keep Boolean 是否保持选中先前的选中项，多选中有效
					 */
					select : function(items, keep) {
						if (this.multiSelect) {
							if (!this.selectedItems) {
								this.selectedItems = {};
							}
							if (!keep) {
								this.selectedItems = {};
							}
						}

						// 确保items是个数组
						items = [].concat(items);
						var i, len = items.length;
						for (i = 0; i < len; i++) {
							var item = items[i], id;
							if (utils.isObject(item)) {
								id = item.id;
							} else if (utils.isString(item)) {
								id = item;
							} else if (utils.isNumber(item)) {
								id = this.list.children(
										'.' + this.baseCls + '-col').eq(item)
										.data('itemId')
							}

							if (id) {
								if (this.multiSelect) {
									this.selectedItems[id] = id;
								} else {
									this.selectedItems = id;
								}
							}
						}

						this.doSelect();
					},
					doSelect : function() {
						this.el.find('.' + this.baseCls + '-item').removeClass(
								this.baseCls + '-item-selected');

						if (utils.isObject(this.selectedItems)) {
							var i;
							for (i in this.selectedItems) {
								if (this.selectedItems.hasOwnProperty(i)) {
									this.getItem(this.selectedItems[i]).el
											.addClass(this.baseCls
													+ '-item-selected');
								}
							}
						} else if (utils.isString(this.selectedItems)) {
							this.getItem(this.selectedItems).el
									.addClass(this.baseCls + '-item-selected');
						}
					},
					/**
					 * 获取选中的item对象，返回列表项数组
					 */
					getSelectedItems : function() {
						var s = this.selectedItems, D = [];
						if (utils.isString(s)) {
							D.push(this.itemMap.get(s));
						} else if (utils.isObject(s)) {
							var id;
							for (id in s) {
								if (s.hasOwnProperty(id)) {
									D.push(this.itemMap.get(s[id]));
								}
							}
						}

						s = null;

						return D;
					},
					/**
					 * 获取item对象
					 * 
					 * @argument item String/Number/Object
					 *           参数可以是item对象、唯一标识或者UI中的位置（从0开始）
					 */
					getItem : function(item) {
						if (utils.isString(item)) {
							return this.itemMap.get(item);
						} else if (utils.isNumber(item)) {
							return this.itemMap.get(this.list.children(
									'.' + this.baseCls + '-col').eq(item).data(
									'itemId'));
						} else if (utils.isObject(item)) {
							return item;
						} else {
							return null;
						}
					},
					/**
					 * 获取item数据
					 * 
					 * @argument item String/Object 参数可以是item对象或者唯一标识
					 */
					getItemData : function(item) {
						if (utils.isString(item)) {
							return this.dataMap.get(item);
						} else if (utils.isObject(item)) {
							return this.dataMap.get(item.id);
						} else {
							return null;
						}
					},
					/**
					 * 获取所有数据
					 */
					getData : function() {
						return this.dataMap.values();
					},
					beforeDestroy : function() {
						delete this.selectedItems;

						delete this.data;
						this.clear();
						if (this.addItem) {
							this.remove(this.addItem)
							delete this.addItem;
						}
						if (this.itemMap) {
							this.itemMap.clear();
							delete this.itemMap;
						}
						if (this.dataMap) {
							this.dataMap.clear();
							delete this.dataMap;
						}
						if (this.list) {
							this.list.remove();
							delete this.list;
						}

						// for ensuring
						this.el.off('click', onClick);

						Gallery.superclass.beforeDestroy.call(this);
					}
				});

		module.exports = Gallery;
	}());
});