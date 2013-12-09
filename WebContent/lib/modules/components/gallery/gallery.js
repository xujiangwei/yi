/**
 * Gallery 大图列表
 * 
 * @author dengfenfen, dengfenfen@dhcc.com.cn, 2013-12-04
 * 
 * @requires utils, extend, component
 * 
 * @method getData: Function()
 * @method deleteItem: Function(String itemId)
 * @method addItem: Function(Object item)
 * @method onItemRender : Function(jqObject $item, Object item)
 * @method onAddItemRender : Function()
 * @method onItemOver : Function(jqObject $item)
 * @method onAddItem : Function(jqObject $item)
 * 
 * @description updated on 2013-12-08
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
			 * @cfg 列表项的宽，默认300px
			 */
			itemWidth : 300,
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
				this.el.on('click', {
							cmpId : cmpId
						}, this.onClick).on('mouseover', {
							cmpId : cmpId
						}, this.onMouseOver);
			},
			/**
			 * 扩展点
			 */
			onItemOver : utils.emptyFn,
			/**
			 * 扩展点
			 */
			onAddItem : utils.emptyFn,
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
						|| this.itemData, params = option.params || '';
				if (data && $.isArray(data) && data.length > 0) {
					this.fillList(data);
				}
				if (dataUrl) {
					this.doLoad(dataUrl, params);
				}
			},
			fillList : function(data) {
				this.el.empty();
				this.itemData = data;
				var mdN = Math.min(Math.ceil(this.itemWidth * 12
								/ this.el.width()), 12);
				var i, len = data.length, baseCls = this.baseCls, $el = $(this.el), $list = $("<div class='"
						+ baseCls + "-list-item-wrap'></div>").appendTo($el), itemCls = baseCls
						+ "-list-item col-xs-6"
						+ " col-md-"
						+ mdN
						+ " col-lg-" + mdN, addItemCls = baseCls
						+ '-list-item-add', onItemRender = this.onItemRender, onAddItemRender = this.onAddItemRender;
				this.cols = mdN;
				for (i = 0; i < len; i++) {
					var item = data[i], $item = $("<div itemid=" + item.id
							+ " class='" + itemCls + "'><div class=" + baseCls
							+ "-list-item-inner></div></div>").appendTo($list);
					$inner = $("." + baseCls + "-list-item-inner").width($item.width());
					$inner.append(onItemRender && $.isFunction(onItemRender)
							&& onItemRender.call(this, $inner, item));
					$item = null;
					$inner = null;
				}
				// 默认的添加列表项的div
				var $add = $("<div class='" + itemCls + " "+baseCls+"-list-item-add'></div>").appendTo($list);
				if(onAddItemRender && $.isFunction(onAddItemRender)){
				    $add.html(onAddItemRender.call(this,$add));
				    if($add.html()){
				        $add.css({'visibility' : 'visible'});
				    }
				}

				$el = null;
				$add = null;
				$list = null;
			},
			onClick : function(e) {
				if (!($(e.target).hasClass('yi-gallery-list-item-add') || $(e.target)
						.parentsUntil('.yi-gallery-list-item-wrap',
								'.yi-gallery-list-item-add').size() > 0)) {
					return;
				}
				var $target = $(e.target), cmp = Base.get(e.data.cmpId), itemCls = cmp.baseCls
						+ '-list-item';
				var $parents = $target.parentsUntil('.' + cmp.baseCls, '.'
								+ itemCls + '-wrap');
				var $itemAdd = $target.parentsUntil('.' + itemCls + '-wrap',
						'.' + itemCls + '-add');
				if ($itemAdd.size() <= 0) {
					$itemAdd = $target;
				}

				if ($parents.size() > 0) {
					cmp.onAddItem($itemAdd);
				}
				$parents = null;
				$item = null;
				cmp = null;
			},
			onMouseOver : function(e) {
				if ($(e.target).hasClass('yi-gallery-list-item-add')
						|| $(e.target).parentsUntil(
								'.yi-gallery-list-item-wrap',
								'.yi-gallery-list-item-add').size() > 0) {
					return;
				}
				var $target = $(e.target), cmp = Base.get(e.data.cmpId), itemCls = cmp.baseCls
						+ '-list-item';
				var $parents = $target.parentsUntil('.' + cmp.baseCls, '.'
								+ itemCls + '-wrap');
				var $item = $target.parentsUntil('.' + itemCls + '-wrap', '.'
								+ itemCls);
				if ($item.size() <= 0) {
					$item = $target;
				}

				if ($parents.size() > 0) {
					cmp.onItemOver($item);
				}
				$parents = null;
				$item = null;
				cmp = null;
			},
			/**
			 * @description 删除列表项,调用该方法后需要调用load函数才会生效
			 * @argument 1) itemId {}: 待删除的列表项的ID
			 */
			deleteItem : function(itemId) {
				var i, data = this.itemData, len = data.length;
				for (i = 0; i < len; i++) {
					if (data[i].id == itemId) {
						data.splice(i, 1);
						break;
					}
				}
				this.itemData = data;
			},
			/**
			 * @description 增加列表项,调用该方法后需要调用load函数才会生效
			 * @argument 1)item {}: 待添加的列表项
			 */
			addItem : function(item) {
				this.itemData.push(item);
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
			/*
			 * function() { var cols = this.cols, baseCls = this.baseCls,
			 * itemCls = baseCls + "-list-item col-xs-" + cols + " col-md-" +
			 * cols + " col-lg-" + cols, addItemCls = baseCls +
			 * '-list-item-add', $list = $('.' + baseCls + "-list-item-wrap",
			 * this.el); $("<div class='" + itemCls + " " + addItemCls + "'>新增</div>")
			 * .appendTo($list); $list = null; },
			 */
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
				galleryComponent = null;
			}
		});

		module.exports = Gallery;
	}());
});