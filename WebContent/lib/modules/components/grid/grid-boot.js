/*
 * Yi Framework
 * 
 * Copyright (c) 2013,2014 DHC Software Research Department
 */

define(function(require, exports, module) {

	var Grid = require('./grid.js');

	// 引导程序
	var _callbacks = [];
	var GridBoot = function() {
	}
	GridBoot.prototype._ready = function() {
		for (var i = 0; i < _callbacks.length; ++i) {
			var fn = _callbacks[i];
			fn.call(null, Grid);
		}
	}
	GridBoot.prototype.boot = function(callback) {
		_callbacks.push(callback);
	}
	// 实例化
	var gridboot = new GridBoot();

	// 加载 CSS
	require.async('../../../plugins/slickgrid/slick.grid.css', function() {
		require.async('../../../plugins/slickgrid/slick-default-theme.css', function() {
			require.async('../../../plugins/slickgrid/slickgrid-bootstrap.css', function() {
				// Nothing
			});
		});
	});

	// 加载前置依赖
	require.async('../../../plugins/slickgrid/jquery.event.drag-2.2.js', function() {
		require.async('../../../plugins/slickgrid/slick.core.js', function() {
			require.async('../../../plugins/slickgrid/slick.grid.js', function() {
				gridboot._ready();
			});
		});
	});

	// 导出模块
	module.exports = gridboot.boot;
});
