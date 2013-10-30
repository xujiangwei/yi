/*!
 * Yi
 * @author Jiangwei Xu
 */

window.yi = {
	// 配置框架
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
	        		width = $menu.outerWidth();

				// 是否配置了子菜单项
	        	if (submenuId === undefined) {
	        		return;
	        	}

				// 显示子菜单
				$submenu.css({
					display: "block",
					top: -1,
					left: width - 3	// 为了美观子菜单覆盖一点主菜单
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

			// Bootstrap 默认超链接 click 时间会关闭文档
			$(".sidebar-nav-menu li").click(function(e) {
				e.stopPropagation();
			});
			$(document).click(function() {
				// 单机消失浮动子菜单
				$(".popover").css("display", "none");
				$("a.maintain-hover").removeClass("maintain-hover");
        	});
		});

		// 启用对话框
		common.use('dialog', function() {
			bootbox.setDefaults({
				locale: 'zh_CN'
			});
		});

		// Tooltips
		$('#toggle_nav').tooltip({ container: 'body' });
	},

	/** 模态模式显示 Alert 对话框。
	 */
	alert: function(message, callback) {
		bootbox.alert(message, callback);
	},
	/** 模态模式显示 Confirm 对话框。
	 */
	confirm: function(message, callback) {
		bootbox.confirm(message, callback);
	},
	/** 模态模式显示 Prompt 对话框。
	 */
	prompt: function(title, callback) {
		bootbox.prompt(title, callback);
	},
	/** 显示指定配置的对话框。
	 */
	dialog: function(options) {
		bootbox.dialog(options);
	},

	/** 切换侧边导航栏
	 */
	toggleNav: function() {
		var nav = $('#main_nav');
		var content = $('#main_content');
		if (nav.css('display') == 'none') {
			// 显示导航
			nav.css('display', 'block');
			content.removeClass('col-md-12');
			content.addClass('col-md-10');
		}
		else {
			// 隐藏导航
			nav.css('display', 'none');
			content.removeClass('col-md-10');
			content.addClass('col-md-12');
		}
	},

	/** 切换主题
	 * options: {
	 * 	 name: 'Cooltheme'
	 *   styles: ['theme1.css', 'theme2.css']
	 * }
	 */
	changeTheme: function(options) {
		
	}
};
