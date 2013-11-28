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
		$('#btn_run').click(function(e) {
			var input = $('#input_args');
			var val = input.val().toString();
			var args = null;
			if (val.length > 1) {
				args = JSON.parse(val);
			}

			// 设置参数
			mod.args = args;

			// 调试
			yi.mod.debug("mod", mod);
		});
		$('#btn_run').tooltip({container:'body'});

		$('#btn_clear').click(function(e) {
            $('#input_args').val('');
        });
		$('#btn_clear').tooltip({container:'body'});

		// 如果直接加载则进行加载
		if (direct) {
			// 调试
			yi.mod.debug("mod", mod);
		}
	});
})();
