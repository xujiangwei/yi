/**
 * Timeline 时间线
 * 
 * @author wensong, wensong@dhcc.com.cn, 2013-12-04
 * 
 * @requires utils, extend, component
 * 
 * @method void setStartDate(String startDateString)
 * @method void setEndDate(String endDateString)
 * @method String getValue()
 * @method void setValue(String value)
 * 
 * @description 1.目前只处理到天 2.目前只处理闭区间 updated on 2013-12-10
 * 
 */
define(function(require, exports, module) {
	'require:nomunge,exports:nomunge,module:nomunge';

	var utils = require('utils');
	var extend = require('extend');
	var Base = require('component');

	// TODO 自定义时间格式并将String转化为Date
	var dateRe = /-/g;

	function parseToDate(dateString) {
		if (utils.isString(dateString)) {
			return new Date(dateString.replace(dateRe, "/"));
		}
		return undefined;
	}

	function parseToMilliseconds(dateString) {
		if (utils.isString(dateString)) {
			return Date.parse(dateString.replace(dateRe, "/"));
		}
		return undefined;
	}

	function isChildOrSelf(source, target) {
		if (source && target) {
			return $(source).closest(target).length > 0;
		}
		return false;
	}

	function format(date) {
		if (utils.isDate(date)) {
			var y = date.getFullYear();
			var m = date.getMonth() + 1;
			if (m < 10) {
				m = '0' + m;
			}
			var d = date.getDate();
			if (d < 10) {
				d = '0' + d;
			}
			return [y, m, d].join('-');
		}
		return undefined;
	}

	(function() {
		var SMALL = 'small', NORMAL = 'normal';

		var Timeline = extend(Base, {
			/**
			 * @cfg size String
			 * 
			 * 'normal', 'small'，默认：'normal'
			 */
			size : NORMAL,
			/**
			 * @cfg startDate String
			 * 
			 * 起始日期，目前支持格式：'yyyy-MM-dd'
			 */
			/**
			 * @cfg endDate String
			 * 
			 * 结束日期，目前支持格式：'yyyy-MM-dd'
			 */
			/**
			 * @cfg readonly Boolean
			 * 
			 * 是否只读，目前缺少startDate或endDate时readonly只读为true
			 */
			/**
			 * @cfg value String
			 * 
			 * 初始值，逗号分隔的字符串
			 */
			baseCls : 'yi-timeline',
			baseHtml : '<div>' + '<div class="yi-timeline-axis"></div>'
					+ '<div class="yi-timeline-start"></div>'
					+ '<div class="yi-timeline-end"></div>' + '</div>',
			/*
			 * 时间点宽度的1/2
			 */
			halfPointWidth : 9,
			initComponent : function() {
				Timeline.superclass.initComponent.call(this);

				this.updateReadonly()
			},
			updateReadonly : function() {
				// initComponent()时只需执行这部分
				if (this.startDate) {
					this.sm = parseToMilliseconds(this.startDate);
				}
				if (this.endDate) {
					this.em = parseToMilliseconds(this.endDate);
				}
				this.dm = this.em - this.sm;
				this.readonly = this.readonly || isNaN(this.sm)
						|| isNaN(this.em);

				// setStartDate()和setEndDate()时还会执行这部分
				if (this.rendered) {
					if (this.readonly) {
						this.el.addClass(this.baseCls + '-readonly');
					} else {
						this.el.removeClass(this.baseCls + '-readonly');
					}

					this.initEvents();
				}
			},
			/**
			 * 设置起始日期
			 */
			setStartDate : function(startDate) {
				this.startDate = startDate;
				if (this.startDateEl) {
					if (this.startDate) {
						this.startDateEl.html(startDate);
					} else {
						this.startDateEl.html('');
					}
				}
				this.updateReadonly();
				this.updateValue(true);
			},
			/**
			 * 设置起始日期
			 */
			setEndDate : function(endDate) {
				this.endDate = endDate;
				if (this.endDateEl) {
					if (this.endDate) {
						this.endDateEl.html(endDate);
					} else {
						this.endDateEl.html('');
					}
				}
				this.updateReadonly();
				this.updateValue(true);
			},
			afterRender : function(parent) {
				Timeline.superclass.afterRender.call(this, parent);

				if (this.size == SMALL) {
					this.el.addClass(this.baseCls + '-sm');
				}
				if (this.el.hasClass(this.baseCls + '-sm')) {
					this.size = SMALL;
				}

				if (this.readonly) {
					this.el.addClass(this.baseCls + '-readonly');
				}

				this.startDateEl = this.el.children('.' + this.baseCls
						+ '-start');
				if (this.startDate) {
					// TODO 反向同步startDate
					this.startDateEl.html(this.startDate);
				} else {
					this.startDateEl.html('');
				}

				this.endDateEl = this.el.children('.' + this.baseCls + '-end');
				if (this.endDate) {
					// TODO 反向同步endDate
					this.endDateEl.html(this.endDate);
				} else {
					this.endDateEl.html('');
				}

				this.initValue();
				this.initEvents();
			},
			initValue : function() {
				if (this.value !== undefined) {
					this.setValue(this.value);
				} else {
					this.updateValue(true);
				}
			},
			updateValue : function(reposition) {
				var fisrtTime = false;
				if (!this.points || this.points.size() == 0) {
					fisrtTime = true;

					this.points = this.el.children('.' + this.baseCls
							+ '-point');
				}

				if (this.points.size() > 0) {
					var len = this.points.size(), i, vs = [];
					for (i = 0; i < len; i++) {
						var $p = this.points.eq(i);
						var value = $p.html();
						vs.push(value);
						if (fisrtTime) {
							$p.attr('title', value).tooltip();
						}

						if (reposition) {
							// 处理时间点位置
							var vm = parseToMilliseconds(value);
							if (!isNaN(vm)) {
								var l = this.getLeft(vm);
								$p.css({
											left : l
										});
							}
						}

						$p = null;
					}

					this.value = vs.join();

					vs = null;
				} else {
					this.value = undefined;
					delete this.points;
				}
			},
			getLeft : function(vm) {
				var left = -this.halfPointWidth, w = this.el.width();
				var d = vm - this.sm;
				if (d >= 0) {
					left += Math.floor((d / this.dm) * w);
				}
				return left;
			},
			getDateString : function(left) {
				var w = this.el.width();
				var d = left + this.halfPointWidth;
				var vm = Math.floor(d * this.dm / w) + this.sm;
				var date = new Date(vm);
				return format(date);
			},
			/**
			 * 接受逗号分隔的字符串
			 */
			setValue : function(v) {
				this.deletePoints();

				this.value = v;
				if (this.rendered) {
					if (utils.isString(v)) {
						var vs = v.split(','), len = vs.length, i;
						for (i = 0; i < len; i++) {
							var value = utils.trim(vs[i]);
							var vm = parseToMilliseconds(value)
							var l = isNaN(vm) ? -this.halfPointWidth : this
									.getLeft(vm);

							this.createPoint(l, value)
						}

						vs = null;
					}
				}
			},
			deletePoints : function() {
				if (this.points) {
					var len = this.points.size(), i;
					for (i = 0; i < len; i++) {
						this.points.eq(i).tooltip('destroy');
					}

					this.points.remove();
					delete this.points;
				}
			},
			/**
			 * 返回逗号分隔的字符串
			 */
			getValue : function() {
				return this.value;
			},
			initEvents : function() {
				if (this.readonly) {
					this.removeDragEvents();
				} else {
					this.addDragEvents()
				}
			},
			addDragEvents : function() {
				this.el.on('mousedown', {
							componentId : this.getId()
						}, this.onMousedown).on('mousemove', {
							componentId : this.getId()
						}, this.onMousemove).on('mouseout', {
							componentId : this.getId()
						}, this.onMouseout).on('mouseup', {
							componentId : this.getId()
						}, this.onMouseup);
			},
			removeDragEvents : function() {
				this.el.off('mousedown', this.onMousedown).off('mousemove',
						this.onMousemove).off('mouseout', this.onMouseout).off(
						'mouseup', this.onMouseup);
			},
			onMousedown : function(e) {
				var comp = Base.get(e.data.componentId);

				// 记录按下鼠标时的point
				var $target = $(e.target);
				if ($target.is('.' + comp.baseCls + '-point')) {
					comp.target = $target;
					comp.lastPageX = e.pageX;
				}

				$target = null;
				comp = null;
			},
			onMousemove : function(e) {
				var comp = Base.get(e.data.componentId);
				// 从body回到this.el
				if (comp.delegateToBody) {
					comp.removeDelegateEvents();
					delete comp.delegateToBody;
				}

				// 鼠标按下时有point，是拖拽
				if (comp.target) {
					// dragged标记鼠标是否弹起
					comp.dragged = true;

					comp.onDrag(comp.target, e.pageX, comp.lastPageX);
					comp.lastPageX = e.pageX;
				}

				comp = null;
			},
			onDrag : function(target, newX, oldX) {
				var leftStr = target.css('left');
				var left = utils.getNumberOfPixelString(leftStr) + newX - oldX;
				if (left < -this.halfPointWidth) {
					left = -this.halfPointWidth;
				}
				var w = this.el.width() - this.halfPointWidth;
				if (left > w) {
					left = w
				}
				target.css({
							left : left
						});

				var dateString = this.getDateString(left);
				target.attr('data-original-title', dateString).attr('title',
						dateString).html(dateString).tooltip('show');
				target.parent().find('.tooltip-inner').html(dateString);
			},
			onMouseout : function(e) {
				var comp = Base.get(e.data.componentId);
				// 拖拽过程中，鼠标移动到了this.el外，委托给body监听
				if (comp.dragged) {
					comp.delegateToBody = true;

					$('body').on('mousemove', {
								componentId : e.data.componentId
							}, comp.delegateMouseMoveToBody).on('mouseup', {
								componentId : e.data.componentId
							}, comp.delegateMouseUpToBody);
				}

				comp = null;
			},
			onMouseup : function(e) {
				var comp = Base.get(e.data.componentId);
				if (comp.dragged) {
					delete comp.dragged;
					delete comp.target;
					delete comp.lastPageX;
					comp.updateValue();
				} else if (comp.target) {
					comp.deleteTarget = comp.target;
					delete comp.target;

					comp.showDeleteMenu(e.pageX, e.pageY);
				} else {
					comp.createPointOnMouseup(e.pageX);
					comp.updateValue();
				}

				comp = null;
			},
			delegateMouseMoveToBody : function(e) {
				var comp = Base.get(e.data.componentId);

				comp.onDrag(comp.target, e.pageX, comp.lastPageX);
				comp.lastPageX = e.pageX;

				comp = null;
			},
			delegateMouseUpToBody : function(e) {
				var comp = Base.get(e.data.componentId);
				delete comp.dragged;
				delete comp.target;
				delete comp.lastPageX;

				comp.removeDelegateEvents();

				comp.updateValue();

				comp = null;
			},
			removeDelegateEvents : function() {
				$('body').off('mousemove', this.delegateMouseMoveToBody).off(
						'mouseup', this.delegateMouseUpToBody);
			},
			createPointOnMouseup : function(eventPageX) {
				var offset = this.el.offset();
				var left = eventPageX - offset.left;
				var dateString = this.getDateString(left);

				this.createPoint(left, dateString);
			},
			createPoint : function(left, value) {
				this.el.append($('<div class="' + this.baseCls
						+ '-point" style="left: ' + left + 'px;" title="'
						+ value + '">' + value + '</div>').tooltip());

				this.points = this.el.children('.' + this.baseCls + '-point');
			},
			showDeleteMenu : function(x, y) {
				if (!this.deleteMenu) {
					this.deleteMenu = $('<ul class="dropdown-menu" role="menu">'
							+ '<li role="presentation"><a role="menuitem" tabindex="-1" href="javascript:void(0)">删除</a></li>'
							+ '</ul>').on('click', {
								componentId : this.getId()
							}, this.onDeleteMenuClick);
				}
				// 从一个deleteTarget到另一个deleteTarget，先清除之前的body事件
				this.removeDelegateDeleteEvent();

				this.deleteMenu.css({
							top : y,
							left : x
						}).show();

				this.addDelegateDeleteEvent();
			},
			onDeleteMenuClick : function(e) {
				var $target = $(e.target);
				if ($target.is('.dropdown-menu li a')) {
					var comp = Base.get(e.data.componentId);
					comp.deletePoint(comp.deleteTarget);
					delete comp.deleteTarget;
					comp.removeDelegateDeleteEvent();
					comp.updateValue();

					comp = null;

					$(this).hide();
				}

				$target = null;
			},
			deletePoint : function(point) {
				point.tooltip('destroy').remove();

				this.points = this.el.children('.' + this.baseCls + '-point');
			},
			addDelegateDeleteEvent : function() {
				$('body').append(this.deleteMenu).on('click', {
							componentId : this.getId()
						}, this.hideDeleteMenu);
			},
			removeDelegateDeleteEvent : function() {
				$('body').off('click', this.hideDeleteMenu);
			},
			hideDeleteMenu : function(e) {
				var comp = Base.get(e.data.componentId);
				// 监听body后首先会响应的是本次mouseup之后的click事件
				if (isChildOrSelf(e.target, comp.deleteTarget)) {
					comp = null;
					return;
				} else if (isChildOrSelf(e.target, comp.deleteMenu)) {
					// 先被menu截取到移除了body的监听，基本不会发生，本判断永远不会为true
					comp = null;
					return;
				} else {
					delete comp.deleteTarget;
					comp.removeDelegateDeleteEvent();
					comp.deleteMenu.hide();

					comp = null;
				}
			},
			beforeDestroy : function() {
				this.removeDelegateEvents();
				this.removeDelegateDeleteEvent();

				delete this.target;
				delete this.deleteTarget;

				if (this.deleteMenu) {
					this.deleteMenu.remove();
				}
				delete this.deleteMenu;

				this.deletePoints();

				if (this.startDateEl) {
					this.startDateEl.remove();
					delete this.startDateEl;
				}
				if (this.endDateEl) {
					this.endDateEl.remove();
					delete this.endDateEl;
				}

				Timeline.superclass.beforeDestroy.call(this);
			}
		});

		module.exports = Timeline;
	}());
});