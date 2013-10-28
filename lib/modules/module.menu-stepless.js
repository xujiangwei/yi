/**
 * 平滑无级菜单。
 */

define(function(require, exports, module) {

	// 需求
	require('modules/module.menu-stepless.css');
	require('extras/jquery.menu-aim');

	function MenuStepless(menu) {
		this.menu = menu;
		this._init();
	}

	// 导出
	module.exports = MenuStepless;

	MenuStepless.prototype._init = function() {
		/*var btn = this.menu.children("a");
		// 绑定事件
		btn.bind('mouseover', function(e) {
		});*/

		var $menu = this.menu;
		$menu.menuAim({
            activate: activateSubmenu,
            deactivate: deactivateSubmenu
        });

		function activateSubmenu(row) {
			console.log("activateSubmenu");
			var $row = $(row),
                submenuId = $row.data("submenuId"),
                $submenu = $("#" + submenuId),
                height = $menu.outerHeight(),
                width = $menu.outerWidth();

            // Show the submenu
            $submenu.css({
                display: "block",
                top: -1,
                left: width - 3  // main should overlay submenu
            });

            // Keep the currently activated row's highlighted look
            $row.find("a").addClass("maintain-hover");
		}

		function deactivateSubmenu(row) {
			console.log("deactivateSubmenu");
			var $row = $(row),
                submenuId = $row.data("submenuId"),
                $submenu = $("#" + submenuId);

            // Hide the submenu and remove the row's highlighted look
            $submenu.css("display", "none");
            $row.find("a").removeClass("maintain-hover");
		}
	}
});
