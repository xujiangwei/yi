(function() {
	var yi = window.yi;

	// 配置 CommonJS 基础路径
	yi.config("../../../");

	yi.ready(function() {
		// 使用 CommonJS 的模块加载方式加载我们上面的 JavaScript 文件
		common.use('./main.js', function(module) {
			module.run();
		});
	});
})();
