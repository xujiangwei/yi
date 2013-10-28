/**
 * Application
 */

define(function(require, exports, module) {

	require('../css/app.css');
	require('plugins/jquery.menu-aim');
	require('flot/jquery.flot.min');
	require('flot/jquery.flot.resize.min');

	exports.run = function() {
		// 需求
		var Console = require('console');

		// 启动可视化控制台
		var c = new Console();
		c.start();

		// 绘制图表
		drawCharts();

		/* 测试菜单 - Begin
		var $menu = $("#top_dropdown");
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
            var $row = $(row),
                submenuId = $row.data("submenuId"),
                $submenu = $("#" + submenuId);

            // Hide the submenu and remove the row's highlighted look
            $submenu.css("display", "none");
            $row.find("a").removeClass("maintain-hover");
        }

		// Bootstrap's dropdown menus immediately close on document click.
        // Don't let this event close the menu if a submenu is being clicked.
        // This event propagation control doesn't belong in the menu-aim plugin
        // itself because the plugin is agnostic to bootstrap.
        $("#top_dropdown li").click(function(e) {
            e.stopPropagation();
        });

        $(document).click(function() {
            // Simply hide the submenu on any click. Again, this is just a hacked
            // together menu/submenu structure to show the use of jQuery-menu-aim.
            $(".popover").css("display", "none");
            $("a.maintain-hover").removeClass("maintain-hover");
        });
		测试菜单 - End */
	}

	function drawCharts() {
		var options = {
			colors: ["#88bbc8", "#afd8f8", "#cb4b4b", "#4da74d", "#9440ed"]
		};

		var d1 = [];
		for (var i = 0; i < 14; i += 0.5) {
			d1.push([i, Math.sin(i)]);
		}

		var plot1 = $.plot('#demo_chart_1', [ d1 ], options);
	}
});
