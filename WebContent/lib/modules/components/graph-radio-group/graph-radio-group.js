/**
 * graphRadioGroup 带图单选组 页面上需要准备的html: "<div class="yi-graph-radio-group row">
 * <label class="radio-inline"><input type="radio"/></label> <label
 * class="radio-inline"><input type="radio"/></label> ... </div>"
 * 
 * @author dengfenfen, dengfenfen@dhcc.com.cn, 2013-12-09
 * 
 * @requires extend, component
 * 
 * @description updated on 2013-12-25
 * 
 */
define(function(require, exports, module) {
	'require:nomunge,exports:nomunge,module:nomunge';

	var extend = require('extend');
	var Base = require('component');

	function firstLetterToUpperCase(str) {
		if (!str || !$.type(str) == 'string') {
			return '';
		}
		return str.charAt(0).toUpperCase() + str.substring(1);
	};

	(function() {
		var NORTH = 'north', SOUTH = 'south', WEST = 'west', EAST = 'east';
		var GraphRadioGroup = extend(Base, {
			baseCls : 'yi-graph-radio-group',
			/**
			 * @cfg region String: 图片所在的位置，可选值为south：按钮的下方，
			 *      north：按钮的上方，east：按钮的右方，west：按钮的左方，默认为north
			 */
			region : NORTH,
			/**
			 * @cfg imgWidth Number : 图片的宽度
			 */
			/**
			 * @cfg imgHeight Number : 图片的高度
			 */
			/**
			 * @cfg margin Number : 按钮的间隔
			 */
			margin : 0,
			onRender : function(container, position) {
				GraphRadioGroup.superclass.onRender.call(this, container,
						position);
			},
			afterRender : function(container) {
				GraphRadioGroup.superclass.afterRender.call(this,container);
				this.init();
				this.el.on('click', {
							cmpId : this.getId()
						}, this.onClick);
			},
			init : function() {
				var $labels = this.el.children('label'), i = 0, len = $labels.length, region = this.region, graph = this.graph
						|| {};
				for (i = 0; i < len; i++) {
					var $label = $($labels[i])
							.addClass('yi-graph-radio-group-label'), url = graph[i]
							&& graph[i].url, index = $label.index();
					if (index > 0) {
						$label.css({
									"margin-left" : this.margin + 'px'
								})
					}
					this["addTo" + firstLetterToUpperCase(region)]($label,
							region, url);

					$label = null;
				}

			},
			onClick : function(e) {
				var $target = $(e.target), $cmp = $(e.data.cmpId), $graph = $target
						.parentsUntil('.yi-graph-radio-group label',
								'.yi-graph-radio-group-graph');
				if ($graph.size() > 0
						|| $target.hasClass('yi-graph-radio-group-graph')) {
					$target.parents('label').children('input').trigger('click');
				}
				$cmp = null;
				$graph = null;
				e.stopPropagation();
			},
			initGraphTemplate : function(region, url) {
				return url
						? ('<div class="yi-graph-radio-group-graph-'
								+ region
								+ ' yi-graph-radio-group-graph"><img src="'
								+ url
								+ '" '
								+ (this.imgWidth ? 'width=' + this.imgWidth
										+ 'px' : '')
								+ ' '
								+ (this.imgHeight ? "height=" + this.imgHeight
										+ 'px' : '') + ' /></div>')
						: '';
			},
			addToSouth : function($label, region, url) {
				$label.append(this.initGraphTemplate(region, url))
						.addClass("yi-graph-radio-group-label-south");
			},
			addToNorth : function($label, region, url) {
				$label.prepend(this.initGraphTemplate(region, url))
						.addClass("yi-graph-radio-group-label-north");
			},
			addToWest : function($label, region, url) {
				$label.prepend(this.initGraphTemplate(region, url))
						.addClass("yi-graph-radio-group-label-west");
				$('input', $label).css({
							'margin-left' : '2px'
						});
			},
			addToEast : function($label, region, url) {
				$label.append(this.initGraphTemplate(region, url))
						.addClass("yi-graph-radio-group-label-east");
				$('input', $label).css({
							'margin-right' : '2px'
						});
			},
			beforeDestroy : function() {
				GraphRadioGroup.superclass.beforeDestroy.call(this);
			}
		});

		module.exports = GraphRadioGroup;
	}());
});