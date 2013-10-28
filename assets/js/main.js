/**
 * Main
 */

// 配置
(function() {
	// 设置配置
	common.config({
		base: "./lib/",
		alias: {
			"console": "console/console.js"
		}
	});

	if (location.href.indexOf("?dev") > 0) {
		// For development
		common.use("./assets/js/app", function(app) {
			app.run();
		});
	}
	else {
		// For production
		common.use("./assets/js/app", function(app) {
			app.run();
		});
	}
})();
