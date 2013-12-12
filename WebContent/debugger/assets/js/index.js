/*
 * mod.js
 */

(function() {
	var yi = window.yi;

	// 配置 CommonJS
	yi.config("../");

	yi.ready(function() {
		$('#btn_help').click(function() {
			yi.alert('正在开发……');
		});

		// 启动配置模组的表单验证
		$('#mod_profile_form').verify();
	});

	this.build = function(url) {
		var params = ["width=", 800
			, ",height=", 400
			, ",left=", (window.screen.availWidth - 800) / 2
			, ",top=", (window.screen.availHeight - 400 - 40) / 2
			, ",location=no,menubar=no,resizable=no,toolbar=no,scrollbars=no,status=no"
		];
		params = params.join("");
		var win = window.open(url, "builder", params);
		win.handle = win;
	}
})();
