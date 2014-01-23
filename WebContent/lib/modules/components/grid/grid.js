/*
 * Yi Framework
 * 
 * Copyright (c) 2013,2014 DHC Software Research Department
 */

define(function(require, exports, module) {

	var extend = require('extend');
	var Base = require('component');

	var Grid = extend(Base, {
		// SlickGrid 引用
		soul: null,

		_onContainerResize: null,

		_monitorContainer: function(container) {
			var self = this;
			if (null != self._onContainerResize) {
				return;
			}

			// 容器大小变化
			self._onContainerResize = function(e) {
				self.soul.resizeCanvas();
			};

			var resize = self._onContainerResize;
			$(window).resize(resize);
		},

		initComponent: function() {
			var config = this.initialConfig;
			var container = config.container;
			var data = config.data;
			var columns = config.columns;
			var options = config.options;

			// 与 Bootstrap 保持一致
			options.rowHeight = 36;

			this.soul = new Slick.Grid(container, data, columns, options);

			// 监视容器
			this._monitorContainer(container);
		}
	});

	// 格式化器
	//Grid.Formatters.PercentCompleteBar = Slick.Formatters.PercentCompleteBar;

	window.Grid = Grid;

	// 导出模块
	module.exports = Grid;
});
