/**
 * Timeline 时间线
 * 
 * @author wensong, wensong@dhcc.com.cn, 2013-12-04
 * 
 * @extends component
 * 
 * @requires utils, date-format, extend, component
 * 
 * @method void setStartDate(String startDateString)
 * @method void setEndDate(String endDateString)
 * @method String getValue()
 * @method void setValue(String value)
 * 
 * @description 1.目前只处理到天 2.目前只处理闭区间 updated on 2014-01-16
 * 
 */
define(function(require, exports, module) {
	'require:nomunge,exports:nomunge,module:nomunge';

	var utils = require('utils');
	var DateFormat = require('date-format');
	var extend = require('extend');
	var Base = require('component');

	function onMousedown(e) {
		var comp = Base.get(e.data.componentId);

		// 记录按下鼠标时的point
		var $target = $(e.target);
		if ($target.is('.' + comp.baseCls + '-point')) {
			comp.target = $target;
			comp.lastPageX = e.pageX;
		}

		$target = null;
		comp = null;
	}

	function onMousemove(e) {
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
	}

	function onMouseout(e) {
		var comp = Base.get(e.data.componentId);
		// 拖拽过程中，鼠标移动到了this.el外，委托给body监听
		if (comp.dragged) {
			comp.delegateToBody = true;

			comp.addDelegateEvents();
		}

		comp = null;
	}

	function delegateMouseMoveToBody(e) {
		var comp = Base.get(e.data.componentId);

		comp.onDrag(comp.target, e.pageX, comp.lastPageX);
		comp.lastPageX = e.pageX;

		comp = null;
	}

	function delegateMouseUpToBody(e) {
		var comp = Base.get(e.data.componentId);
		delete comp.dragged;
		delete comp.target;
		delete comp.lastPageX;

		comp.removeDelegateEvents();

		comp.updateValue();

		comp = null;
	}

	function onMouseup(e) {
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
	}

	function onDeleteMenuClick(e) {
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
	}

	function hideDeleteMenu(e) {
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
	}

	function isChildOrSelf(source, target) {
		if (source && target) {
			return $(source).closest(target).length > 0;
		}
		return false;
	}

	(function() {
		var SMALL = 'small', NORMAL = 'normal';

		var Timeline = extend(Base, {
			/**
			 * @cfg size String
			 * 
			 * 'normal' or 'small'，默认：'normal'
			 */

			/**
			 * @cfg dateFormat String
			 * 
			 * 'yyyy-MM-dd' or 'yyyy-MM-dd HH:mm:ss'
			 */
			dateFormat : 'yyyy-MM-dd',

			/**
			 * @cfg startDate String
			 * 
			 * 开始日期
			 */

			/**
			 * @cfg endDate String
			 * 
			 * 结束日期
			 */

			/**
			 * @cfg readonly Boolean
			 * 
			 * 是否只读。缺少startDate或endDate时也会强制为只读状态
			 */

			/**
			 * @cfg value String
			 * 
			 * 初始值，逗号分隔的字符串
			 */

			baseCls : 'yi-timeline',
			baseHtml : '<div><div class="yi-timeline-axis"></div><div class="yi-timeline-start"></div><div class="yi-timeline-end"></div></div>',
			/*
			 * 时间点宽度的1/2
			 */
			halfPointWidth : 9,
			initComponent : function() {
				Timeline.superclass.initComponent.call(this);

				this.formatter = new DateFormat(this.dateFormat);
			},
			afterRender : function(container) {
				Timeline.superclass.afterRender.call(this, container);

				if (this.size == SMALL) {
					this.el.addClass(this.baseCls + '-sm');
				} else if (this.size == NORMAL) {
					this.el.removeClass(this.baseCls + '-sm')
				} else {
					this.size = this.el.hasClass(this.baseCls + '-sm')
							? SMALL
							: NORMAL
				}

				this.startDateEl = this.el.children('.' + this.baseCls
						+ '-start');
				if (this.startDate !== undefined) {
					this.setStartDate(this.startDate, true);
				}

				this.endDateEl = this.el.children('.' + this.baseCls + '-end');
				if (this.endDate !== undefined) {
					this.setEndDate(this.endDate, true);
				}

				this.updateReadonly();
				this.initValue();
			},
			/**
			 * 设置开始日期
			 */
			setStartDate : function(startDate, silent) {
				this.startDate = startDate;
				if (this.startDateEl) {
					this.startDateEl.html(startDate);
				}
				if (!silent) {
					this.updateReadonly();
					this.updateValue(true);
				}
			},
			/**
			 * 设置结束日期
			 */
			setEndDate : function(endDate, silent) {
				this.endDate = endDate;
				if (this.endDateEl) {
					this.endDateEl.html(endDate);
				}
				if (!silent) {
					this.updateReadonly();
					this.updateValue(true);
				}
			},
			updateReadonly : function() {
				if (this.startDate) {
					this.sm = this.formatter.toMilliseconds(this.startDate);
				}
				if (this.endDate) {
					this.em = this.formatter.toMilliseconds(this.endDate);
				}
				this.dm = this.em - this.sm;
				this.readonly = this.readonly || isNaN(this.sm)
						|| isNaN(this.em);

				// 未免setStartDate()和setEndDate()时还未渲染
				if (this.rendered) {
					if (this.readonly) {
						this.el.addClass(this.baseCls + '-readonly');
					} else {
						this.el.removeClass(this.baseCls + '-readonly');
					}

					this.updateEvents();
				}
			},
			updateEvents : function() {
				if (this.readonly) {
					this.removeDragEvents();
				} else {
					this.addDragEvents()
				}
			},
			addDragEvents : function() {
				if (this.el) {
					this.el.on('mousedown', {
								componentId : this.getId()
							}, onMousedown).on('mousemove', {
								componentId : this.getId()
							}, onMousemove).on('mouseout', {
								componentId : this.getId()
							}, onMouseout).on('mouseup', {
								componentId : this.getId()
							}, onMouseup);
				}
			},
			removeDragEvents : function() {
				if (this.el) {
					this.el.off('mousedown', onMousedown).off('mousemove',
							onMousemove).off('mouseout', onMouseout).off(
							'mouseup', onMouseup);
				}
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
			getDateString : function(left) {
				var w = this.el.width();
				var d = left + this.halfPointWidth;
				var vm = Math.floor(d * this.dm / w) + this.sm;
				var date = new Date(vm);
				return this.formatter.format(date);
			},
			addDelegateEvents : function() {
				$('body').on('mousemove', {
							componentId : this.getId()
						}, delegateMouseMoveToBody).on('mouseup', {
							componentId : this.getId()
						}, delegateMouseUpToBody);
			},
			removeDelegateEvents : function() {
				$('body').off('mousemove', delegateMouseMoveToBody).off(
						'mouseup', delegateMouseUpToBody);
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
							}, onDeleteMenuClick).appendTo($('body'));
				}
				// 从一个deleteTarget到另一个deleteTarget，先清除之前的body事件
				this.removeDelegateDeleteEvent();

				this.deleteMenu.css({
							top : y,
							left : x
						}).show();

				this.addDelegateDeleteEvent();
			},
			deletePoint : function(point) {
				point.tooltip('destroy').remove();

				this.points = this.el.children('.' + this.baseCls + '-point');
			},
			addDelegateDeleteEvent : function() {
				$('body').on('click', {
							componentId : this.getId()
						}, hideDeleteMenu);
			},
			removeDelegateDeleteEvent : function() {
				$('body').off('click', hideDeleteMenu);
			},
			initValue : function() {
				if (this.value !== undefined) {
					this.setValue(this.value);
				} else {
					this.updateValue(true);
				}
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
							var vm = this.formatter.toMilliseconds(value)
							var l = isNaN(vm) ? -this.halfPointWidth : this
									.getLeft(vm);

							this.createPoint(l, value)
						}

						vs = null;
					}
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
							var vm = this.formatter.toMilliseconds(value);
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