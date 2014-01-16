/**
 * graphRadioGroup 带图单选组 页面上需要准备的html: "<div class="yi-graph-radio-group row">
 * <label class="radio-inline"><input type="radio"/></label> <label
 * class="radio-inline"><input type="radio"/></label> ... </div>"
 * 
 * @author dengfenfen, dengfenfen@dhcc.com.cn, 2013-12-09
 * 
 * @requires extend, component
 * 
 * @event itemrender: function(GraphRadioGroup g, jqObject $item, Object data)
 * 
 * @description updated on 2014-01-13
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

	function onLabeClick(e) {
		var $label = $(e.target).closest('.yi-graph-radio-group-label'), cmp = Base
				.get(e.data.cmpId);
		if ($label.size() > 0) {
			$('.yi-graph-radio-group-graph', cmp.el).removeClass(cmp.baseCls
					+ '-selected');
			$('.yi-graph-radio-group-graph', $label).addClass(cmp.baseCls
					+ '-selected');
			$('input', $label).prop('checked', true);
		}
		$label = null;
		cmp = null;
		e.stopPropagation();
	}

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
			/**
			 * @cfg data Array : 按钮数据
			 */
			data : [],
			onRender : function(container, position) {
				GraphRadioGroup.superclass.onRender.call(this, container,
						position);
			},
			afterRender : function(container) {
				GraphRadioGroup.superclass.afterRender.call(this, container);
				this.init();
				$('label', this.el).on('click', {
							cmpId : this.getId()
						}, onLabeClick);
			},
			init : function() {
				var $labels = this.el.children('label'), i = 0, len = $labels.length, region = this.region, data = this.data
						|| [];
				for (i = 0; i < len; i++) {
					var $label = $($labels[i])
							.addClass('yi-graph-radio-group-label'), d = data[i], url = d
							&& d.url, index = $label.index();
					if (index > 0) {
						$label.css({
									"margin-left" : this.margin + 'px'
								})
					}
					this["addTo" + firstLetterToUpperCase(region)]($label,
							region, url);
					var $input = $('input', $label);
					var checked = $input.attr('checked'), $graph = $(
							'.yi-graph-radio-group-graph', $label);
					if (checked) {
						$graph.addClass(this.baseCls + '-selected');
						$input.prop('checked', true);
					}
					this.trigger('itemrender', this, $graph, d);
					$input = null;
					$label = null;
					$graph = null;
				}
			},
			initGraphTemplate : function(region, url) {
				var baseWrap = '<div class="yi-graph-radio-group-graph-'
						+ region + ' yi-graph-radio-group-graph">';
				if (url) {
					baseWrap += '<img src="'
							+ url
							+ '" '
							+ (this.imgWidth
									? 'width=' + this.imgWidth + 'px'
									: '')
							+ ' '
							+ (this.imgHeight ? 'height=' + this.imgHeight
									+ 'px' : '') + ' />';

				}
				baseWrap += '</div>';
				return baseWrap;
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