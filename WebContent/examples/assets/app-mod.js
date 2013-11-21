/*
 * mod.js
 */

(function() {
	var yi = window.yi;

	// 配置 CommonJS
	yi.config("../");

	yi.ready(function() {
		// helloworld_1
		$('#btn_helloworld_1').click(function(e) {
			yi.mod.load("helloworld_1");
		});
	});
})();
