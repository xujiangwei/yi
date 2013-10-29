/**
 * @author Jiangwei Xu
 */

window.framework = {
	setup: function() {
		// 配置主导航
		common.use('menu-aim', function(){
			var $menu = $(".sidebar-nav-menu");
			$menu.menuAim({
				activate: activateSubmenu,
				deactivate: deactivateSubmenu
	        });
	        function activateSubmenu(row) {
	        	var $row = $(row),
	        		submenuId = $row.data("submenuId"),
	        		$submenu = $("#" + submenuId),
	        		height = $menu.outerHeight(),
	        		width = $menu.outerWidth();

				// 是否配置了子菜单项
	        	if (submenuId === undefined) {
	        		return;
	        	}

				// 显示子菜单
				$submenu.css({
					display: "block",
					top: -1,
					left: width - 3,	// 为了美观子菜单覆盖一点主菜单
					height: height - 4
				});

				// 保持当前激活的行高亮
				$row.find("a").addClass("maintain-hover");
			}
			function deactivateSubmenu(row) {
				var $row = $(row),
                	submenuId = $row.data("submenuId"),
                	$submenu = $("#" + submenuId);

				// 是否配置了子菜单项
	        	if (submenuId === undefined) {
	        		return;
	        	}

				// 隐藏子菜单，并移除高亮
				$submenu.css("display", "none");
				$row.find("a").removeClass("maintain-hover");
			}

			$(document).click(function() {
				// 单机消失浮动子菜单
				$(".popover").css("display", "none");
				$("a.maintain-hover").removeClass("maintain-hover");
        	});
		});
	}
};


/**
 * 后置配置
 */
(function() {
	// 配置库
	common.config({
		base: "./lib/",
		alias: {
			"console": "console/console.js",
			"menu-aim": "plugins/jquery.menu-aim.js"
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

	// 框架配置
	window.framework.setup();
})();
