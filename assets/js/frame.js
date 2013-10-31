/**
 * 主框架入口脚本
 * @author Jiangwei Xu
 */

/**
 * 后置配置
 */
(function() {
	// 配置库
	common.config({
		base: "./lib/",
		alias: {
			"class": "utils/class.js",							// 辅助构建 JS 对象关系
			"map": "utils/hashmap.js",							// 实用 Map 实现
			"console": "core/console/console.js",				// 可视化控制台
			"dialog": "plugins/bootbox.min.js",					// 对话框
			"menu-aim": "plugins/jquery.menu-aim.js",			// 改进的浮动菜单
			"theme-manager": "modules/misc/theme-manager.min.js"		// 主题管理器
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

	// 自动调整 Sidebar 高度
	(function() {
		var $sb = $('.sidebar-nav');
		var ww = parseInt(window.innerWidth);
		if (ww >= 992) {
			var sbh = Math.max(parseInt($('.page-wrapper').height())
				, parseInt(document.body.clientHeight) - 50);
			$sb.height(sbh);
		}

		$(window).resize(function(e) {
			var ww = parseInt(window.innerWidth);
			if (ww >= 992) {
				var sbh = Math.max(parseInt($('.page-wrapper').height())
					, parseInt(document.body.clientHeight) - 50);
				$sb.height(sbh);
			}
			else {
				$sb.height('auto');
			}
        });
	})();

	// 框架配置
	window.yi.setup(function(yi) {
		yi.themeManager.addTheme({name:"bootflat"});
	});
})();
