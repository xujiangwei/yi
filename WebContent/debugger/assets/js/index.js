/*
 * mod.js
 */

(function() {
	var yi = window.yi;

	// 配置 CommonJS
	yi.config("../");

	yi.ready(function() {
		$('#btn_new').click(function() {
			yi.confirm('正在开发……', function(result) {
				
			});
		});

		$('#btn_help').click(function() {
			yi.alert('正在开发……');
		});
	});
})();
