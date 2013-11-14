/*
 * mod.js
 */

(function() {
	var yi = window.yi;

	// 配置 CommonJS
	yi.config("../");

	yi.ready(function() {
		// 激活 helloworld_1
		yi.activeMod('helloworld_1', {'name':'徐江威', 'address':'海淀区知春路'});
	});
})();
