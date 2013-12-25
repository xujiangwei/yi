/*
 * Yi Framework
 * 
 * Copyright (c) 2013,2014 DHC Software Research Department
 */

define(function(require, exports, module) {

	var Grid = require('./grid.js');

	// 引导程序
	var boot =  {
		_callback: null,

		_ready: function() {
			this._callback.call(null, Grid);
		},

		main: function(callback) {
			this._callback = callback;
		},
	};

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
				boot._ready();
			});
		});
	});

	// 导出模块
	module.exports = boot;
});
