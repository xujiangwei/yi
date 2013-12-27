/**
 * Gallery 大图列表
 * 
 * @author dengfenfen, dengfenfen@dhcc.com.cn, 2013-12-04
 * 
 * @extends component
 * 
 * @requires utils, map, extend, component
 * 
 * @method void load(Object option)
 * @method void clear()
 * @method void add(Object/Array items)
 * @method void remove(Object/String/Number item)
 * @method Array getSelectedItems()
 * @method Object getItem(String/Number/Object item)
 * @method Object getItemData(String/Object item)
 * @method Object getData()
 * 
 * @event load: function(Gallery g, Object/Array data)
 * @event itemrender: function(Gallery g, Object item, String id, Boolean isAdd)
 * @event beforeitemdestroy:function(Gallery g, Object item, String id, Boolean
 *        isAdd)
 * @event itemdestroy:function(Gallery g, Object item, String id, Boolean isAdd)
 * @event itemmouseover: function(Gallery g, Object item, String id, Boolean
 *        isAdd, Event e)
 * @event itemmouseout: function(Gallery g, Object item, String id, Boolean
 *        isAdd, Event e)
 * @event itemclick: function(Gallery g, Object item, String id, Boolean isAdd,
 *        Event e)
 * 
 * @description updated on 2013-12-27
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

	function onLoadSuccess(data, textStatus, jqXhr) {
		var d = $.parseJSON(jqXhr.responseText);
		var comp = Base.get(this.componentId);
		if (comp) {
			comp.add(d);
			comp.trigger('load', comp, d);
		}

		comp = null;
		d = null;
	}

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
		var Gallery = extend(Base, {
			baseCls : baseCls,

			/**
			 * @cfg border Boolean
			 * 
			 * 列表容器是否显示边框
			 */

			/**
			 * @cfg cols Array
			 * 
			 * cols[0],cols[1],cols[2],cols[3]分别表示在不同屏幕分辨率下最多占多少列
			 */

			/**
			 * @cfg responsive Boolean
			 * 
			 * item是否自适应宽高
			 */

			/**
			 * @cfg itemWidth Number
			 * 
			 * item的宽
			 */
			itemWidth : 300,

			/**
			 * @cfg itemCls String
			 * 
			 * item的样式
			 */

			/**
			 * @cfg itemOverCls String
			 * 
			 * 鼠标悬停时item的样式
			 */
			itemOverCls : 'yi-gallery-item-over',

			/**
			 * @cfg hasAddItem Boolean
			 * 
			 * 是否包含一个用于创建的item
			 */

			/**
			 * @cfg reader Object 1)identifier String: item的id对应数据那个属性
			 * 
			 * 例：reader:{identifier: id}
			 */
			reader : {},

			/**
			 * @cfg data Array
			 * 
			 * 初始化时的静态数据
			 */

			/**
			 * @cfg autoLoad Boolean
			 * 
			 * 初始化后是否自动加载远程数据
			 */
			autoLoad : true,

			/**
			 * @cfg dataUrl String
			 * 
			 * 初始化时远程数据的URL
			 */

			/**
			 * @cfg params Object
			 * 
			 * 初始化时请求远程数据的额外参数
			 */

			/**
			 * @cfg multiSelect Boolean
			 * 
			 * 是否多选
			 */

			initComponent : function() {
				Gallery.superclass.initComponent.call(this);

				this.addEvents('load',

						'itemrender',

						'beforeitemdestroy',

						'itemdestroy',

						'itemmouseover',

						'itemmouseout',

						'itemclick');

				this.identifier = (this.reader && this.reader.identifier)
						|| 'id';
				this.calculateCols();
			},
			calculateCols : function() {
				this.cols = [].concat(this.cols);

				var smC = this.cols[1] || Math.floor(768 / this.itemWidth);
				var mdC = this.cols[2] || Math.floor(992 / this.itemWidth);
				var lgC = this.cols[3] || Math.floor(1200 / this.itemWidth);
				var xsC = this.cols[0] || (smC - 1);
				var xsN = Math.ceil(12 / xsC);
				var smN = Math.ceil(12 / smC);
				var mdN = Math.ceil(12 / mdC);
				var lgN = Math.ceil(12 / lgC);

				this.colCls = this.baseCls + '-col col-xs-' + xsN + ' col-sm-'
						+ smN + ' col-md-' + mdN + ' col-lg-' + lgN;
			},
			afterRender : function(container) {
				Gallery.superclass.afterRender.call(this, container);

				if (this.border) {
					this.el.addClass(this.baseCls + '-border');
				}

				this.el.on('click', {
							componentId : this.getId()
						}, onClick);

				this.list = $('<div class="' + this.baseCls
						+ '-list row"></div>').appendTo(this.el);

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
					item.el.addClass(this.itemOverCls);
					this.onItemOver(item, id, this.getItemData(id));

					this
							.trigger('itemmouseover', this, item, id,
									item.isAdd, e);
				}

				item = null;
			},
			// 扩展点
			onItemOver : utils.emptyFn,
			outItem : function(id, e) {
				var item = this.getItem(id);
				if (item) {
					item.el.removeClass(this.itemOverCls);
					this.onItemOut(item, id, this.getItemData(id));

					this.trigger('itemmouseout', this, item, id, item.isAdd, e);
				}

				item = null;
			},
			// 扩展点
			onItemOut : utils.emptyFn,
			clickItem : function(id, e) {
				var item = this.getItem(id);
				if (item) {
					var selected = [], unselected = [];

					if (!item.isAdd) {
						if (this.multiSelect) {
							if (!this.selectedItems) {
								this.selectedItems = {};
							}
							if (this.selectedItems[id]) {
								unselected.push(id);
								delete this.selectedItems[id];
							} else {
								selected.push(id);
								this.selectedItems[id] = id;
							}
						} else {
							if (this.selectedItems) {
								unselected.push(this.selectedItems);
							}
							this.selectedItems = id;
							selected.push(id);
						}
					}

					var i, j, len = selected.length, ulen = unselected.length;
					for (j = 0; j < ulen; j++) {
						this.getItem(unselected[j]).el.removeClass(this.baseCls
								+ '-item-selected');
					}
					for (i = 0; i < len; i++) {
						this.getItem(selected[i]).el.addClass(this.baseCls
								+ '-item-selected');
					}

					this.trigger('itemclick', this, item, id, item.isAdd, e);
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

				var $col = $('<div class="' + this.baseCls + '-col-add '
						+ this.colCls + '"></div>').data('itemId', id)
						.appendTo(this.list);

				this.addItem = {
					id : id,
					isAdd : true
				};
				this.itemMap.put(id, this.addItem);

				this.renderItem(this.addItem, $col, id, null);

				$col = null;
			},
			initData : function() {
				this.dataMap = new Map();
			},
			initItems : function() {
				this.itemMap = new Map();
			},
			renderItem : function(item, container, id, data) {
				this.onItemRender(item, container, id, data, item.isAdd);
				if (this.itemCls) {
					item.el.addClass(this.itemCls);
				}
				if (this.cols.length == 0 && !this.responsive) {
					item.el.width(this.itemWidth);
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
				item.el = $('<div class="' + this.baseCls + '-item"></div>')
						.appendTo(container);
			},
			/**
			 * (重新)加载数据
			 * 
			 * @argument option {} 1)data Array: 静态数据 2)dataUrl String: 数据的Url
			 *           3) params Object: 额外的参数 4)append Boolean: 是否追加数据
			 */
			load : function(option) {
				if (this.rendered) {
					option = option || {};
					if (option.append !== true) {
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
							success : onLoadSuccess,
							componentId : this.getId()
						})
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
			 * @argument 1)data Array/Object: 待添加的列表数组或对象 2)index Number:
			 *           插入UI中的位置（从0开始）
			 */
			add : function(data, index) {
				if (utils.isObject(data)) {
					data = [data];
				}
				if (utils.isArray(data)) {
					if (!this.dataMap) {
						this.initData();
					}
					if (!this.itemMap) {
						this.initItems();
					}

					var position;
					if (utils.isNumber(index)) {
						position = this.list.children('.' + this.baseCls
								+ '-col').eq(index);
					} else if (this.addItem) {
						position = this.addItem.el.parent();
					}

					var i, len = data.length;
					for (i = 0; i < len; i++) {
						var d = data[i];

						var id = d[this.identifier];
						if (!id) {
							id = utils.id();
						}
						if (this.dataMap.containsKey(id)) {
							continue;
						}
						this.dataMap.put(id, d);

						var $col = $('<div class="' + this.colCls + '"></div>')
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

						item = null;
						$col = null;
					}

					position = null;
				}
			},
			/**
			 * 删除列表项
			 * 
			 * @argument item Object/String/Number
			 *           参数可以是item对象、唯一标识或者UI中的位置（从0开始）
			 */
			remove : function(item) {
				var id, $col, removeItem;
				if (utils.isNumber(item)) {
					$col = this.list.children('.' + this.baseCls + '-col')
							.eq(item);
					id = $col.data('itemId');
					removeItem = this.getItem(id);
				} else if (utils.isString(item)) {
					id = item;
					removeItem = this.getItem(id);
					$col = removeItem.el.parent();
				} else if (utils.isObject(item)) {
					removeItem = item;
					$col = removeItem.el.parent();
					id = item.id;
				}

				if (this.multiSelect) {
					if (this.selectedItems && this.selectedItems[id]) {
						delete this.selectedItems[id];
					}
				} else if (id == this.selectedItems) {
					delete this.selectedItems;
				}

				if (removeItem) {
					this.destroyItem(removeItem, id, removeItem.isAdd);
				}
				if ($col.size() > 0) {
					$col.remove();
				}
				this.dataMap.remove(id);

				removeItem = null;
				$col = null;
			},
			destroyItem : function(item, id, isAdd) {
				if (this.trigger('beforeitemdestroy', this, item, id, isAdd) !== false) {
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
			 * 获取item
			 * 
			 * @argument item String/Number/Object
			 *           参数可以是item对象、唯一标识或者UI中的位置（从0开始）
			 */
			getItem : function(item) {
				if (utils.isObject(item)) {
					return item;
				} else if (utils.isString(item)) {
					return this.itemMap.get(item);
				} else if (utils.isNumber(item)) {
					return this.itemMap.get(this.list.children('.'
							+ this.baseCls + '-col').eq(item).data('itemId'));
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
			 * 获取选中的列表项，返回列表项数组
			 */
			getSelectedItems : function() {
				var s = this.selectedItems, D = [];
				if (utils.isString(s)) {
					D.push(this.dataMap.get(s));
				} else if (utils.isObject(s)) {
					var id;
					for (id in s) {
						if (s.hasOwnProperty(id)) {
							D.push(this.dataMap.get(s[id]));
						}
					}
				}

				s = null;

				return D;
			},
			/**
			 * 获取列表数据
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
				if (this.dataMap) {
					this.dataMap.clear();
					delete this.dataMap;
				}
				if (this.itemMap) {
					this.itemMap.clear();
					delete this.itemMap;
				}
				if (this.list) {
					this.list.remove();
					delete this.list;
				}

				this.el.off('click', onClick);

				Gallery.superclass.beforeDestroy.call(this);
			}
		});

		module.exports = Gallery;
	}());
});