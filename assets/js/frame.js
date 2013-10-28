/**
 * @author Jiangwei Xu
 */

(function() {
	// 配置库
	common.config({
		base: "./lib/",
		alias: {
			"console": "console/console.js"
		}
	});

	if (location.href.indexOf("?dev") > 0) {
		// For development
		common.use("./assets/js/application", function(app) {
			app.main();
		});
	}
	else {
		// For production
		common.use("./assets/js/application", function(app) {
			app.main();
		});
	}
})();
