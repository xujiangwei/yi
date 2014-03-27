/**
 * GraphRadioGroup 带图单选组
 * 
 * @author dengfenfen, dengfenfen@dhcc.com.cn, 2013-12-09
 * 
 * @requires extend, component
 * 
 * @method Object getSelectedItem()
 * 
 * @event itemrender: function(GraphRadioGroup g, jqObject $item, Object data)
 * @event itemclick: function(GraphRadioGroup g, jqObject $item, Object data,
 *        Event e)
 * 
 * @description updated on 2014-03-27
 * 
 */
define(function(require, exports, module) {
	'require:nomunge,exports:nomunge,module:nomunge';

	var utils = require('utils');
	var extend = require('extend');
	var Base = require('component');

	function onItemClick(e) {
		var comp = Base.get(e.data.compId), baseCls = comp.baseCls, $item = $(
				e.target).closest('.' + baseCls + '-item');
		if ($item.size() > 0) {
			comp.clickItem($item, e);
		}
		$item = null;
		comp = null;

		e.stopPropagation();
	}

	(function() {
		var NORTH = 'north', SOUTH = 'south', WEST = 'west', EAST = 'east';

		var GraphRadioGroup = extend(
				Base,
				{
					baseCls : 'yi-graph-radio-group',

					/**
					 * @cfg region String
					 * 
					 * 按钮的内容显示在按钮的哪个方向，'north'、'south'、'east'或'west'，默认'north'
					 */
					region : NORTH,

					/**
					 * @cfg margin Number
					 * 
					 * 按钮的间隔，默认0
					 */
					margin : 0,

					/**
					 * @cfg data Array
					 * 
					 * 初始化时的静态数据
					 */

					afterRender : function(container) {
						GraphRadioGroup.superclass.afterRender.call(this,
								container);

						var data = [].concat(this.data), i, len = data.length, baseCls = this.baseCls;
						this.items = this.el.children('.radio-inline');
						if (this.items.size() == 0) {
							this.createItems();
						}
						for (i = 0; i < len; i++) {
							var d = data[i], url = d && d.url, $item = $(
									this.items[i]).addClass(baseCls + '-item')
									.data('item', d), index = $item.index();
							if (index > 0) {
								$item.css({
									"margin-left" : this.margin + 'px'
								})
							}
							this["addTo"
									+ utils.firstLetterToUpperCase(this.region)]
									($item);
							var $input = $('input', $item);
							var checked = $input.attr('checked'), $graph = $(
									'.' + baseCls + '-graph', $item);
							if (checked) {
								$graph.addClass(this.baseCls + '-selected');
								$input.prop('checked', true);
							}
							this.trigger('itemrender', this, $graph, d);
							$input = null;
							$item = null;
							$graph = null;
						}

						this.items.on('click', {
							compId : this.getId()
						}, onItemClick);
					},
					createItems : function() {
						var i, len = this.data.length, item = "";
						for (i = 0; i < len; i++) {
							item += '<div class="radio-inline"><input type="radio" name=a></input></div>';
						}
						this.items = $(item).appendTo(this.el);
					},
					renderItem : function() {
						return '<div class="' + this.baseCls + '-graph-'
								+ this.region + ' ' + this.baseCls
								+ '-graph"></div>';
					},
					addToSouth : function(item) {
						item.append(this.renderItem()).addClass(
								this.baseCls + "-item-south");
					},
					addToNorth : function(item) {
						item.prepend(this.renderItem()).addClass(
								this.baseCls + "-item-north");
					},
					addToWest : function(item) {
						item.prepend(this.renderItem()).addClass(
								this.baseCls + "-item-west");
						$('input', item).css({
							'margin-left' : '2px'
						});
					},
					addToEast : function(item) {
						item.append(this.renderItem()).addClass(
								this.baseCls + "-item-east");
						$('input', item).css({
							'margin-right' : '2px'
						});
					},
					clickItem : function(item, e) {
						var baseCls = this.baseCls;
						$('input', this.el).prop('checked', false);
						$('.' + baseCls + '-graph', this.el).removeClass(
								baseCls + '-selected');
						$('.' + baseCls + '-graph', item).addClass(
								baseCls + '-selected');
						$('input', item).prop('checked', true);
						this.trigger('itemclick', this, item,
								item.data('item'), e);
					},
					/**
					 * 获取选中项,返回选中的数据
					 */
					getSelectedItem : function() {
						return $('.' + this.baseCls + '-selected', this.el)
								.parent().data('item');
					},
					beforeDestroy : function() {
						if (this.items) {
							this.items.remove();
							delete this.items;
						}
						GraphRadioGroup.superclass.beforeDestroy.call(this);
					}
				});

		module.exports = GraphRadioGroup;
	}());
});