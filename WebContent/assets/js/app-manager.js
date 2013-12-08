/*
 * Yi Framework
 * 
 * Copyright (c) 2013,2014 DHC Software Research Department
 */

(function() {
	var yi = window.yi;

	yi.config("../");

	yi.ready(function() {
		window.manager = new Manager();

		// 绑定事件
		$('[id^=btn_delete_]').each(function(index, element) {
			var el = $(this);
			var name = el.data("name");
			var version = el.data("version");
			var index = parseInt(el.data("index"));
			el.bind("click", function() {
				el.button('loading');
				yi.mod.deleteRemoteMod(name, version
					, function(data) {
						el.button('reset');

						var table = $('#main-table');
						table.find('tbody tr').each(function(index, element) {
							if ($(this).attr('id') == name + '-' + version) {
								$(this).remove();
								return false;
							}
						});
					}
					, function() {
						el.button('reset');
					});
			});
        });
	});

	function Manager() {
	}

	Manager.prototype.showAbout = function() {
		yi.alert('<p>模组管理器 v1.0.0</p><small class="text-muted">Author: Xu Jiangwei (xujiangwei@dhcc.com.cn)</small>');
	}
})();
