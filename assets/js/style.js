// Sytel controller

(function() {

	// 自动调整 Sidebar 高度
	(function() {
		var $sb = $('#sidebar');
		var ww = parseInt(window.innerWidth);
		if (ww >= 992) {
			var sbh = parseInt(document.body.clientHeight) + 44;
			$sb.height(sbh);
		}

		$(window).resize(function(e) {
			var ww = parseInt(window.innerWidth);
			if (ww >= 992) {
				var sbh = parseInt(document.body.clientHeight) + 44;
				$sb.height(sbh);
			}
			else {
				$sb.height('100%');
			}
        });
	})();

	// menu-stepless 自动适应
	(function($){
		var menuList = [];

		var list = $(".menu-stepless");
		list.each(function(index, element) {
			var $el = $(this);
			common.use('modules/module.menu-stepless', function(MenuStepless) {
				var ms = new MenuStepless($el);
				menuList.push(ms);
			});
		});
	})(window.jQuery);

	// Tooltip
	$('.toggle-nav a').tooltip({container: "body"});

	/** Framework
	 */
	window.framework  = {
		toggleNav: function() {
			var $sb = $('#sidebar');
			var $ch = $('.content-header');
			var $c = $('#content');
			if ($sb.css('display') != 'none') {
				$sb.removeClass("col-md-2");
				$sb.css('display', 'none');
				$c.removeClass('col-md-10');
				$c.addClass('col-md-12');
				$ch.removeClass('col-md-10');
				$ch.addClass('col-md-12');
			}
			else {
				$sb.addClass("col-md-2");
				$sb.css('display', 'block');
				$c.removeClass('col-md-12');
				$c.addClass('col-md-10');
				$ch.removeClass('col-md-12');
				$ch.addClass('col-md-10');
			}
		}
	}
})();
