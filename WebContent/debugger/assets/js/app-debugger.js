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
			var data = null;
			if (val.length > 1) {
				data = JSON.parse(val);
			}

			if (null != data)
				mod.args = data;

			yi.mod.debug("mod", mod);
		});

		$('#btn_clear').click(function(e) {
            $('#input_args').val('');
        });
	});
})();
