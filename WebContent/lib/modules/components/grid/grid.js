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

		initComponent: function() {
			var config = this.initialConfig;
			var container = config.container;
			var data = config.data;
			var columns = config.columns;
			var options = config.options;

			// 与 Bootstrap 保持一致
			options.rowHeight = 36;

			this.soul = new Slick.Grid(container, data, columns, options);
		}
	});

	// 导出模块
	module.exports = Grid;
});
