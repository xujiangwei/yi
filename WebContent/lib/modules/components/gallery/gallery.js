/**
 * Gallery 大图列表
 * 
 * @author dengfenfen, dengfenfen@dhcc.com.cn, 2013-12-04
 * 
 * @requires utils, extend, component
 * 
 * @method getData: Object Function()
 * @method deleteItem: void Function(String itemId)
 * @method addItem: void Function(Array items)
 * @method getSelectedItems: Array Function()
 * @method onItemRender : String Function(jqObject $item, Object item)
 * @method onAddItemRender : String Function()
 * @method onItemOver : void Function(jqObject $item)
 * 
 * @event click: Function()
 * @event load: Function()
 * 
 * @description updated on 2013-12-12
 * 
 */
define(function(require, exports, module) {
	'require:nomunge,exports:nomunge,module:nomunge';

	require('./gallery.css');
	var utils = require('utils/utils');
	var extend = require('extend');
	var Base = require('component');

	(function() {
		var Gallery = extend(Base, {
			baseCls : 'yi-gallery',
			/**
			 * @cfg 列表容器是否显示边框，默认不显示
			 */
			bordered : false,
			/**
			 * @cfg cols[0],cols[1],cols[2],cols[3]分别设置col-xs-*,col-sm-*,col-md-*,col-lg-*
			 */
			cols : [],
			/**
			 * @cfg 列表项的宽，默认300px
			 */
			itemWidth : 300,
			/**
			 * @cfg Object
			 */
			reader : {},
			/**
			 * @cfg responsive boolean 列表项是否自适应宽高
			 */
			responsive : false,
			afterRender : function() {
				Gallery.superclass.afterRender.call(this);
				this.load({
							data : this.data || [],
							dataUrl : this.dataUrl || '',
							params : this.params || {}
						});
				var cmpId = this.getId();
				(this.bordered === true)
						&& this.el.addClass(this.baseCls + '-bordered');
				this.el.on('mouseover', {
							cmpId : cmpId
						}, this.onMouseOver).on('click', {
							cmpId : cmpId
						}, this.onClick);
			},
			/**
			 * @description 获取列表数据
			 */
			getData : function() {
				return this.itemData;
			},
			/**
			 * @description (重新)加载数据
			 * @argument option {} 1)data Array: 静态数据 2)dataUrl String: 远程数据url
			 *           3) params Object: 额外的参数
			 */
			load : function(option) {
				var option = option || {};
				var dataUrl = option.dataUrl || this.dataUrl, data = option.data
						|| this.itemData, params = option.params || this.params;
				this.selectedItem = {};
				if (data && $.isArray(data)) {
					this.fillList(data);
					this.trigger('load');
				}
				if (dataUrl) {
					this.doLoad(dataUrl, params);
				}
			},
			fillList : function(data) {
				this.el.empty();
				this.itemData = data;
				var cols = [].concat(this.cols);
				var smC = cols[1] || Math.floor(768 / this.itemWidth), mdC = cols[2]
						|| Math.floor(992 / this.itemWidth), lgC = cols[3]
						|| Math.floor(1200 / this.itemWidth), xsC = cols[0]
						|| (smC - 1);
				var xsN = Math.ceil(12 / xsC);
				var smN = Math.ceil(12 / smC);
				var mdN = Math.ceil(12 / mdC);
				var lgN = Math.ceil(12 / lgC);

				var identifier = (this.reader && this.reader.identifier)
						|| 'id', i, len = data.length, baseCls = this.baseCls, $el = $(this.el), $list = $("<div class='"
						+ baseCls + "-list-item-wrap row'></div>")
						.appendTo($el), itemCls = baseCls
						+ "-list-item col-xs-" + xsN + " col-sm-" + smN
						+ " col-md-" + mdN + " col-lg-" + lgN, addItemCls = baseCls
						+ '-list-item-add', onItemRender = this.onItemRender, onAddItemRender = this.onAddItemRender;
				for (i = 0; i < len; i++) {
					var item = data[i], $item = $("<div itemid="
							+ item[identifier] + " class='" + itemCls
							+ "'><div class=" + baseCls
							+ "-list-item-inner></div></div>").appendTo($list);
					$inner = $("." + baseCls + "-list-item-inner", $item)
					if (cols.length == 0 && !this.responsive) {
						$inner.width(this.itemWidth);
					}

					$inner.append(onItemRender && $.isFunction(onItemRender)
							&& onItemRender.call(this, $inner, item));
					$item = null;
					$inner = null;
				}
				// 默认的添加列表项的div
				var $add = $("<div class='" + itemCls + " " + baseCls
						+ "-list-item-add'></div>").appendTo($list);
				if (onAddItemRender && $.isFunction(onAddItemRender)) {
					$add.append(onAddItemRender.call(this, $add));
					if ($add.html()) {
						$add.css({
									'visibility' : 'visible'
								});
					}
				}

				$el = null;
				$add = null;
				$list = null;
			},
			onMouseOver : function(e) {
				if ($(e.target).hasClass('yi-gallery-list-item-add')
						|| $(e.target).parentsUntil(
								'.yi-gallery-list-item-wrap',
								'.yi-gallery-list-item-add').size() > 0) {
					return;
				}
				var $target = $(e.target), cmp = Base.get(e.data.cmpId), itemCls = cmp.baseCls
						+ '-list-item-inner';
				var $item = $target.parentsUntil('.' + itemCls + '-wrap', '.'
								+ itemCls);
				if ($item.size() <= 0) {
					$item = $target;
				}
				if ($item.hasClass(itemCls)) {
					cmp.onItemOver($item);
				}
				cmp.trigger('gallery.mouseover', [e.data.cmpId]);
				$item = null;
				cmp = null;
			},
			/**
			 * 扩展点
			 */
			onItemOver : utils.emptyFn,
			onClick : function(e) {
				var $target = $(e.target);
				if ($target.hasClass('yi-gallery')
						|| $target.hasClass('yi-gallery-list-item-wrap')
						|| $target.hasClass('yi-gallery-list-item')) {
					$target = null;
					return;
				}
				var cmp = Base.get(e.data.cmpId), itemCls = cmp.baseCls
						+ '-list-item-inner', $inner = $target.parentsUntil('.'
								+ itemCls + '-wrap', '.' + itemCls), selectedItem = cmp.selectedItem
						|| {};
				if ($inner.size() <= 0) {
					$inner = $target;
				}
				var $item = $inner.parent('.yi-gallery-list-item'), id = $item
						.attr('itemid');
				if ($inner.hasClass("yi-gallery-item-selected")) {
					$inner.removeClass("yi-gallery-item-selected");
					delete selectedItem[id];
				} else {
					$inner.addClass("yi-gallery-item-selected");
					selectedItem[id] = id;
				}

				cmp.selectedItem = selectedItem;
				cmp.trigger('click');

				$inner = null;
				$item = null;
				cmp = null;
			},
			/**
			 * @description 删除列表项,调用该方法后需要调用load函数才会生效
			 * @argument 1) itemId {}: 待删除的列表项的ID
			 */
			deleteItem : function(itemId) {
				var i, data = this.itemData, len = data.length, selectedItem = this.selectedItem, identifier = (this.reader && this.reader.identifier)
						|| "id";
				delete selectedItem[itemId];
				for (i = 0; i < len; i++) {
					if (data[i][identifier] == itemId) {
						data.splice(i, 1);
						break;
					}
				}
				this.itemData = data;
				this.selectedItem = selectedItem;
			},
			/**
			 * @description 增加列表项,调用该方法后需要调用load函数才会生效
			 * @argument 1)items []: 待添加的列表项数组
			 */
			addItem : function(items) {
				if (items) {
					if (!$.isArray(items)) {
						items = [items];
					}
					this.itemData = this.itemData.concat(items);
				}
			},
			/**
			 * @description 获取选中的列表项，返回列表项id数组
			 */
			getSelectedItems : function() {
				var i, data = this.itemData, len = this.data, itemId, selectedItem = this.selectedItem, D = [];
				for (itemId in selectedItem) {
					if (selectedItem.hasOwnProperty(itemId)) {
						D.push(selectedItem[itemId]);
					}
				}
				return D;
			},
			/**
			 * @description 处理列表项的排列，默认图片和文字上下排列
			 * 
			 */
			onItemRender : function($item, item) {
				$item.html('<div class=' + this.baseCls
						+ '-list-item-content><img src="' + (item.imgUrl || '')
						+ '" class="img-responsive"></img></div><div class='
						+ this.baseCls + '-list-item-title>'
						+ (item.title || 'title') + '</div>');
			},
			/**
			 * @description 渲染新增列表项的列表项,不提供默认的处理,由使用者扩展
			 */
			onAddItemRender : utils.emptyFn,
			doLoad : function(url, params) {
				this.dataUrl = url;
				$.ajax({
							url : url,
							success : this.onLoadSuccess,
							data : params,
							option : {
								cmpId : this.getId()
							}
						})
			},
			onLoadSuccess : function(data) {
				var data = $.parseJSON(data), option = this.option, cmpId = option.cmpId, galleryComponent = Base
						.get(cmpId);
				galleryComponent.fillList(data);
				galleryComponent.trigger('load');
				galleryComponent = null;
			},
			beforeDestroy : function() {
				Gallery.superclass.beforeDestroy.call(this);
				if (this.selectedItem) {
					delete this.selectedItem;
				}
				if (this.itemData) {
					delete this.itemData;
				}
			}
		});

		module.exports = Gallery;
	}());
});