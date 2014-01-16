/**
 * Carousel 轮播转盘
 * 
 * @author dengfenfen, dengfenfen@dhcc.com.cn, 2014-01-06
 * 
 * @extends component
 * 
 * @requires utils, map, extend, component
 * 
 * @method void load(Object option)
 * @method void clear()
 * @method Object getItem(String/Number/Object item)
 * @method Object getItemData(String/Object item)
 * @method Object getFocusItem()
 * @method void prev(Object item)
 * @method void next(Object item)
 * @method void play(String/Number/Object item)
 * 
 * @event load: function(Carousel c, Object/Array data)
 * @event play: function(Carousel c, Object item)
 * @event switch: function(Carousel c, Object lastActiveItem, Object
 *        activeItem,)
 * @event stop: function(Carousel c, Object item)
 * @event itemrender: function(Carousel c, Object item, String id)
 * 
 * @description updated on 2014-01-15
 * 
 */
define(function(require, exports, module) {
	'require:nomunge,exports:nomunge,module:nomunge';

	require('./carousel.css');
	var utils = require('utils/utils');
	var Map = require('map');
	var extend = require('extend');
	var Base = require('component');

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
	function onIndicatorClick(e) {
		var comp = Base.get(e.data.compId), $target = $(e.target);
		if ($target.hasClass(comp.baseCls + '-indicator')) {
			comp.clickIndicator($target.index());
		}
		$target = null;
		comp = null;
	}
	function onChangeClcik(e) {
		var comp = Base.get(e.data.compId), $target = $(e.target)
				.closest('.yi-carousel-control');
		if ($target.size() > 0) {
			if ($target.closest('.' + comp.baseCls + '-left').size() > 0) {
				comp.clickPrev(e);
			} else if ($target.closest('.' + comp.baseCls + '-right').size() > 0) {
				comp.clickNext(e);
			}
		}
		$target = null;
		comp = null;
	}

	function onItemClick(e) {
		var comp = Base.get(e.data.compId), $item = $(e.target).closest('.'
				+ comp.baseCls + '-item-modal');
		if ($item.size() > 0) {
			comp.clickItem(e);
		}
		$item = null;
		comp = null;
	}

	function onItemMouseLeave() {

	}

	function onItemMouseEnter() {

	}

	(function() {
		var Carousel = extend(Base, {
			baseCls : 'yi-carousel',
			/**
			 * @cfg width Number
			 * 
			 * 轮播的宽度
			 */
			/**
			 * @cfg height Number
			 * 
			 * 轮播的高度
			 */
			/**
			 * @cfg data Object/Array
			 * 
			 * 轮播数据
			 */
			/**
			 * @cfg dataUrl String
			 * 
			 * 轮播数据url
			 */
			/**
			 * @cfg params Object
			 * 
			 * 额外的参数
			 */
			/**
			 * @cfg autoPlay Boolean
			 * 
			 * 是否自动执行切换
			 */
			/**
			 * @cfg interval Number
			 * 
			 * 切换的时间间隔
			 */
			interval : 4000,
			/**
			 * @cfg hasIndicators Boolean
			 * 
			 * 是否有圆球形的滑块
			 */
			/**
			 * @cfg startWidth Number
			 * 
			 * 轮播项的起始宽度
			 */
			/**
			 * @cfg startHeight Number
			 * 
			 * 轮播项的起始高度
			 */
			/**
			 * @cfg thumbnail Boolean
			 * 
			 * 当前的轮播项的两侧是否还显示别的项
			 */
			// 缩放因子
			factor : 0.85,
			// 规定只显示5张
			number : 5,
			activeIndex : 0,
			activeModal : 0,
			maxZindex : 1000,
			maxOpacity : 1,
			maxFontSize : 14,
			initComponent : function() {
				Carousel.superclass.initComponent.call(this);

				this.addEvents('play',

						'switch',

						'stop');
				this.itemCls = this.baseCls + '-item';
				this.focusItemCls = this.baseCls + '-item-focus';

				this.startLeft = ((this.width - this.startWidth) / 2)
						.toFixed(0)
						+ 'px';
				this.startTop = ((this.height - this.startHeight) / 2)
						.toFixed(0)
						+ 'px';
				this.frontWidth = this.startWidth * this.factor;
				this.frontHeight = this.startHeight * this.factor;
				this.sLeft = parseFloat(this.startLeft) - this.frontWidth / 2
						+ 'px';
				this.sRLeft = parseFloat(this.startLeft) + this.startWidth
						- this.startWidth * this.factor / 2 + 'px';
				this.sTop = ((this.height - this.frontHeight) / 2).toFixed(0)
						+ 'px';
			},
			afterRender : function(container) {
				Carousel.superclass.afterRender.call(this, container);

				this.el.width(this.width).height(this.height)
						.addClass(this.baseCls);
				this.itemContainer = $("<div class=" + this.baseCls
						+ "-item-container></div>").appendTo(this.el);
				this.itemModal = $("<div class=" + this.baseCls
						+ "-item-modal-container>").appendTo(this.el).on(
						'click', {
							compId : this.getId()
						}, onItemClick);
				this.indicatorsCt = $("<ol class='" + this.baseCls
						+ "-indicators'></ol>").appendTo(this.el).on('click', {
							compId : this.getId()
						}, onIndicatorClick).css({
							'z-index' : this.maxZindex
						});
				if (!this.hasIndicators) {
					this.indicatorsCt.hide();
				}

				this.addControl();
				this.addModal();

				if (utils.isArray(this.data)) {
					var data = this.data;
					delete this.data;
					this.add(data);
				} else {
					this.load({
								dataUrl : this.dataUrl,
								params : this.params
							});
				}
			},
			addIndicators : function() {
				var i, len = this.dataMap.values().length, indicators = "";
				this.indicatorsCt.empty()
				if (len > 0) {
					for (i = 0; i < len; i++) {
						indicators += "<li class='" + this.baseCls
								+ "-indicator'>";
					}
					this.indicatorsCt.append(indicators);
				}
				indicators = null;
			},
			addControl : function() {
				this.control = $('<a class="yi-carousel-left yi-carousel-control">'
						+ '<span class="glyphicon glyphicon-chevron-left">'
						+ '</span></a>'
						+ '<a class="yi-carousel-right yi-carousel-control">'
						+ '<span class="glyphicon glyphicon-chevron-right">'
						+ '</span></a>').appendTo(this.el).css({
							'z-index' : this.maxZindex
						}).on('click', {
							compId : this.getId()
						}, onChangeClcik);
				var top = (this.height - this.control.height()) / 2 + 'px';
				this.control.css({
							'top' : top
						});
			},
			addModal : function() {
				var i, len = this.number, itemModal = '';
				for (i = 0; i < len; i++) {
					itemModal += '<div class=' + this.baseCls
							+ '-item-modal></div>'
				}
				this.itemModal.append(itemModal);
				this.modals = this.itemModal.children();
				itemModal = null;
			},
			clickPrev : function(e) {
				var $current = this.itemContainer.children()
						.eq(this.activeIndex);
				var $prev = $current.prev();

				if ($prev.size() == 0) {
					$prev = this.itemContainer.children().eq(this.dataMap
							.values().length
							- 1);
				}
				this.lastActiveIndex = this.activeIndex;
				this.activeIndex = $prev.index();

				// itemModal
				var $currentModal = this.modals.eq(this.activeModal);
				var $prevModal = $currentModal.prev();
				if ($prevModal.size() == 0) {
					$prevModal = this.modals.eq(this.number - 1);
				}
				this.lastActiveModal = this.activeModal;
				this.activeModal = $prevModal.index();

				if (this.thumbnail) {
					this.updateThumbnailItemPosition(true);
				} else {
					this.toggleIndicator($current, $prev, true);
				}
				this.prev(this.getItem($prev.data('itemId')));

				$current = null;
				$prev = null;
				$currentModal = null;
				$prevModal = null;
			},
			clickNext : function(e) {
				var $current = this.itemContainer.children()
						.eq(this.activeIndex);
				var $next = $current.next();

				if ($next.size() == 0) {
					$next = this.itemContainer.children().eq(0);
				}

				this.lastActiveIndex = this.activeIndex;
				this.activeIndex = $next.index();

				// itemModal
				var $currentModal = this.modals.eq(this.activeModal);
				var $nextModal = $currentModal.next();
				if ($nextModal.size() == 0) {
					$nextModal = this.modals.eq(0);
				}
				this.lastActiveModal = this.activeModal;
				this.activeModal = $nextModal.index();

				if (this.thumbnail) {
					this.updateThumbnailItemPosition(false);
				} else {
					this.toggleIndicator($current, $next, false);
				}

				this.next(this.getItem($next.data('itemId')));

				$current = null;
				$next = null;
				$currentModal = null;
				$nextModal = null;
			},
			clickItem : function(e) {
				if (this.control.css('display') !== 'none') {
					if (e.clientX > this.itemContainer.children()
							.eq(this.activeIndex).offset().left) {
						$('.' + this.baseCls + '-right', this.el)
								.triggerHandler('click', [this.getId()]);
					} else {
						$('.' + this.baseCls + '-left', this.el)
								.triggerHandler('click', [this.getId()]);
					}
				}
			},
			clickIndicator : function(order) {
				var isLeft = order < this.activeIndex;;
				if (order == this.activeIndex) {
					return;
				}
				var $item = $('.' + this.baseCls + '-item', this.el);
				var $current = $item.eq(this.activeIndex);
				var $next = $item.eq(order);

				this.lastActiveIndex = this.activeIndex;
				this.activeIndex = order;

				// itemModal
				var $currentModal = this.modals.eq(this.activeModal);
				var $nextModal = $currentModal.next();
				var $prevModal = $currentModal.prev();
				if ($prevModal.size() == 0) {
					$prevModal = this.modals.eq(this.number - 1);
				}
				if ($nextModal.size() == 0) {
					$nextModal = this.modals.eq(0);
				}
				this.lastActiveModal = this.activeModal;

				if (isLeft) {
					this.activeModal = $prevModal.index();
				} else {
					this.activeModal = $nextModal.index();
				}

				if (this.thumbnail) {
					this.updateThumbnailItemPosition(isLeft);
				} else {
					this.toggleIndicator($current, $next, isLeft);
				}

				if (isLeft) {
					this.prev(this.getItem($next.data('itemId')));
				} else {
					this.next(this.getItem($next.data('itemId')));
				}

				$next = null
				$current = null;
				$currentModal = null;
				$nextModal = null;
				$prevModal = null;
				$item = null;
			},
			toggleIndicator : function($current, $next, isLeft) {
				var isLeft = (isLeft !== undefined)
						? isLeft
						: ($next.index() < this.activeIndex);
				if (isLeft) {
					$next.css({
								'left' : -this.width
							});
					$current.animate({
								'left' : this.width
							}, this.interval / 3, 'swing');
					$next.animate({
								'left' : 0
							}, this.interval / 3, 'swing');
				} else {
					$next.css({
								'left' : this.width
							});
					$next.animate({
								'left' : 0
							}, this.interval / 3, 'swing');
					$current.animate({
								'left' : -(this.width)
							}, this.interval / 3, 'swing');
				}
				if (this.autoPlay) {
					this.carouselInterval();
				}

				this.trigger('play', this, this.getItem($next.data('itemId')));
				this.trigger('switch', this, this.getItem($current
								.data('itemId')), this.getItem($next
								.data('itemId')));

				// 选择器样式改变
				var $indicators = this.indicatorsCt.children()
						.removeClass('active');
				$indicators.eq($next.index()).addClass('active');

				$indicators = null;
				$current = null;
				$next = null;
			},
			carouselInterval : function() {
				var compId = this.getId(), baseCls = this.baseCls, activeIndex = (this.activeIndex + 1)
						% this.dataMap.values().length;
				// 停止轮播
				if (this.intervalId) {
					this.stop();
				}

				function thumbnailInterval() {
					var comp = Base.get(compId);
					if (comp.control.css('display') !== 'none') {
						$('.' + baseCls + '-right', comp.el).triggerHandler(
								'click', [compId]);
					}
					comp = null;
				}
				this.intervalId = setInterval(thumbnailInterval, this.interval);
			},
			/**
			 * 获取当前播放的项
			 */
			getFocusItem : function() {
				return this.getItem(this.activeIndex);
			},
			add : function(data) {
				if (!this.dataMap) {
					this.initData();
				}
				if (!this.itemMap) {
					this.initItems();
				}

				// 确保items是个数组
				data = [].concat(data);
				var i, len = data.length;
				for (i = 0; i < len; i++) {
					var d = data[i];

					var id = d.id;
					if (!id) {
						id = utils.id();
					}
					if (this.dataMap.containsKey(id)) {
						continue;
					}
					this.dataMap.put(id, d);

					var item = {
						id : id
					};
					this.itemMap.put(id, item);

					this.renderItem(item, this.itemContainer, id, d);

					item = null;
				}

				this.addIndicators();
				if (data.length == 0) {
					this.itemModal.hide();
				} else {
					this.itemModal.show();
				}
				if (data.length <= 1) {
					this.control.hide();
				} else {
					this.control.show();
				}

				if (this.thumbnail) {
					this.updateThumbnailItemPosition(false);
				} else {
					this.updateItemPosition();
				}
				if (data.length > 0) {
					this.indicatorsCt.children().eq(this.activeIndex)
							.addClass('active');
				}
			},
			initData : function() {
				this.dataMap = new Map();
			},
			initItems : function() {
				this.itemMap = new Map();
			},
			renderItem : function(item, container, id, data) {
				var componentId = this.getId();
				this.onItemRender(item, container, id, data, item.isAdd);
				if (this.itemCls) {
					item.el.addClass(this.itemCls);
				}
				item.el.on('mouseenter', {
							componentId : componentId
						}, onItemMouseEnter).on('mouseleave', {
							componentId : componentId
						}, onItemMouseLeave);
				this.trigger('itemrender', this, item, id);
			},
			// 扩展点
			onItemRender : function(item, container, id, data) {
				item.el = $('<div class="' + this.itemCls + '"></div>').data(
						'itemId', id).appendTo(this.itemContainer);
			},
			updateItemPosition : function() {
				var $items = this.itemContainer.children('.' + this.itemCls), i, size = $items
						.size();
				if (size > 0) {
					for (i = 0; i < size; i++) {
						$items.eq(i).css({
									'left' : (i * this.width) + 'px'
								}).width(this.width).height(this.height);
					}
					$items = null;
					if (this.autoPlay) {
						this.carouselInterval();
					}
				}
			},
			// 修改轮播项的位置
			updateThumbnailItemPosition : function(prev) {
				var $items = this.itemContainer.children('.' + this.itemCls)
						.removeClass(this.focusItemCls).animate({
									'opacity' : 0
								}, 0, 'swing').css({
									"z-index" : this.maxZindex - 2
								}), $frontItem, startLeft = this.startLeft, startTop = this.startTop, size = this.dataMap
						.values().length;
				if (size > 0) {
					$frontItem = $items.eq(this.activeIndex)
							.addClass(this.focusItemCls);

					var $lastActiveItem = $items.eq(this.lastActiveIndex);
					// 放灰色的图片
					var m = this.activeModal, j, count = this.number / 2 + m, y = 0;
					this.modals.removeClass(this.baseCls + '-item-modal-focus')
							.animate({
										'opacity' : 0.6
									}, 0, 'swing');

					// 当前的灰色图片
					var $lastModal = this.modals.eq(this.lastActiveModal);
					var $frontModal = this.modals.eq(m);

					if (prev) {
						// 向左
						$frontItem.css({
									'top' : this.sTop,
									'left' : this.sLeft,
									'width' : this.frontWidth,
									'height' : this.frontHeight,
									'z-index' : this.maxZindex - 1
								});
					} else {
						// 向右
						$frontItem.css({
									'top' : this.sTop,
									'left' : this.sRLeft,
									'width' : this.frontWidth,
									'height' : this.frontHeight,
									'z-index' : this.maxZindex - 1
								});
					}
					if (prev) {
						$lastActiveItem.animate({
									'opacity' : 1
								}, 0, 'swing').animate({
									'width' : this.frontWidth,
									'height' : this.frontHeight,
									'left' : this.sRLeft,
									'top' : this.sTop,
									'opacity' : 0
								}, 800, 'swing').css({
									'z-index' : this.maxZindex - 1,
									'font-size' : this.maxFontSize - 1 + 'px'
								});

					} else {
						$lastActiveItem.animate({
									'opacity' : 1
								}, 0, 'swing').animate({
									'width' : this.frontWidth,
									'height' : this.frontHeight,
									'left' : this.sLeft,
									'top' : this.sTop,
									'opacity' : 0
								}, 800, 'swing').css({
									'z-index' : this.maxZindex - 1,
									'font-size' : this.maxFontSize - 1 + 'px'
								});
					}
					$frontModal.addClass(this.baseCls + '-item-modal-focus')
							.animate({
										'width' : this.startWidth,
										'height' : this.startHeight,
										'left' : startLeft,
										'top' : startTop,
										'font-size' : this.maxFontSize + 'px'
									}, 800, 'swing').css({
										'z-index' : this.maxZindex
									});
					$frontItem.animate({
								'width' : this.startWidth,
								'height' : this.startHeight,
								'left' : startLeft,
								'top' : startTop,
								'opacity' : this.maxOpacity
							}, 800, 'swing').css({
								'z-index' : this.maxZindex + 1,
								'font-size' : this.maxFontSize + 'px'
							});
					$frontModal.animate({
								'opacity' : 0
							}, 0, 'swing');
					$lastActiveItem = null;
					$frontModal = null;
					$frontItem = null;
					for (j = m + 1; j < count; j++) {
						y++;
						var rightModalIndex = j % this.number;

						var $leftItemModal = this.modals.eq(rightModalIndex);
						var leftModalIndex = ((rightModalIndex + 2
								* ((this.number - 1) / 2 - y)) + 1)
								% this.number;
						var $rightItemModal = this.modals.eq(leftModalIndex);
						var width = this.startWidth * this.factor / y;
						var height = this.startHeight * this.factor / y;

						var fontSize = (this.maxFontSize - y) + 'px';
						var zIndex = this.maxZindex - y;

						var left = (parseFloat(startLeft) - width * 1 / 2)
								.toFixed(0)
								+ 'px';
						var rLeft = (parseFloat(startLeft) + this.startWidth - width
								/ 2)
								+ 'px';
						var top = ((this.height - height) / 2).toFixed(0)
								+ 'px';

						$rightItemModal.animate({
									'width' : width,
									'height' : height,
									'left' : left,
									'top' : top
								}, 800, 'swing').css({
									'z-index' : zIndex,
									'font-size' : fontSize
								});
						$leftItemModal.animate({
									'width' : width,
									'height' : height,
									'left' : rLeft,
									'top' : top
								}, 800, 'swing').css({
									'z-index' : zIndex,
									'font-size' : fontSize
								});;
						$leftItemModal = null;
						$rightItemModal = null;
					}
					if (this.autoPlay) {
						this.carouselInterval();
					}

					// 选择器样式改变
					var $indicators = this.indicatorsCt.children()
							.removeClass('active');
					$indicators.eq(this.activeIndex).addClass('active');

					this.trigger('play', this, this.getItem(this.activeIndex));
					this.trigger('switch', this, this
									.getItem(this.lastActiveIndex), this
									.getItem(this.activeIndex));
					$indicators = null;
				}
				$items = null;
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
					return this.itemMap.get(this.itemContainer.children('.'
							+ this.itemCls).eq(item).data('itemId'));
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
			 * (重新)加载数据
			 * 
			 * @argument
			 * 
			 * 1、option {} 1)data Array: 静态数据 2)dataUrl String: 数据的Url 3) params
			 * Object: 额外的参数
			 */
			load : function(option) {
				if (this.rendered) {
					option = option || {};
					this.clear();

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
				this.activeIndex = 0;
				this.activeModal = 0;
				if (this.dataMap && !this.dataMap.isEmpty()) {
					var K = this.dataMap.keySet(), i, len = K.length;
					for (i = 0; i < len; i++) {
						if (this.dataMap.containsKey(K[i])) {
							this.remove(K[i]);
						}
					}
				}
			},
			remove : function(option) {
				var itemEl = this.getItem(option).el;
				this.dataMap.remove(option);
				this.itemMap.remove(option);
				itemEl.remove();
				itemEl = null;
			},
			/**
			 * 播放轮播
			 * 
			 * @argument item Number/String/Object
			 *           参数可以是item对象、唯一标识或者UI中的位置（从0开始）
			 */
			play : function(item) {
				var index, $item;
				if (utils.isString(item)) {
					$item = this.getItem(item).el;
					index = $item.index();
				} else if (utils.isNumber(item)) {
					index = item;
				} else if (utils.isObject(item)) {
					$item = item.el;
					index = $item.index();
				}
				this.indicatorsCt.children().eq((index)
						% this.dataMap.values().length).triggerHandler('click',
						[this.getId()]);
				$item = null;
			},
			/**
			 * 
			 */
			next : utils.emptyFn,
			/**
			 * 
			 */
			prev : utils.emptyFn,
			/**
			 * 停止动画
			 */
			stop : function() {
				if (this.intervalId) {
					clearInterval(this.intervalId);
				}
				this.trigger('stop', this, this.getItem(this.activeIndex));
			},
			beforeDestroy : function() {
				this.clear();
				if (this.activeIndex) {
					delete this.activeIndex;
				}
				if (this.lastActiveIndex) {
					delete this.lastActiveIndex;
				}
				if (this.itemModal) {
					this.itemModal.remove();
					delete this.itemModal;
				}
				if (this.modals) {
					this.modals.remove();
					delete this.modals;
				}

				if (this.itemContainer) {
					this.itemContainer.remove();
					delete this.itemContainer;
				}
				if (this.control) {
					this.control.remove();
					delete this.control;
				}

				if (this.indicatorsCt) {
					this.indicatorsCt.remove();
					delete this.indicatorsCt;
				}

				Carousel.superclass.beforeDestroy.call(this);
			}
		});
		module.exports = Carousel;
	}());
});