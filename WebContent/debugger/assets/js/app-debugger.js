/*
 * Yi Framework
 * 
 * Copyright (c) 2013,2014 DHC Software Research Department
 */

(function() {
	// 禁用 AJAX 缓存
	$.ajaxSetup({
		cache: false
	});

	var yi = window.yi;

	// 配置 CommonJS
	yi.config("../");

	yi.ready(function() {
		// 绑定事件
		window.debugger.bindButton($('#mod_area_0'));

		// 如果直接加载则进行加载
		if (direct) {
			// 调试
			yi.mod.debug("mod_area_0", mod);
		}
	});

	this.debugger = {
		bindButton: function(area) {
			// 运行按钮
			area.find('#btn_run').click(function(e) {
				var input = area.find('#input_args');
				var val = input.val().toString();
				var args = null;
				if (val.length > 1) {
					args = JSON.parse(val);
				}

				// 设置参数
				mod.args = args;

				// 调试
				yi.mod.debug("mod_container_0", mod);
			});
			area.find('#btn_run').tooltip({container:'body'});

			// 清空按钮
			area.find('#btn_clear').click(function(e) {
				area.find('#input_args').val('');
			});
			area.find('#btn_clear').tooltip({container:'body'});
		}
	};
})();
