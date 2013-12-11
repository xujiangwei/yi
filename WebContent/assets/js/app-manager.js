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

		// 详情按钮
		$('[id^=btn_detail_]').each(function(index, element) {
            var el = $(this);
			var name = el.data("name");
			var version = el.data("version");
			el.bind("click", function() {
				var content = $('input[name="'+ name +'"][value="'+ version +'"]');
				content = content.html();
				if (content.length > 0) {
					yi.alert(content);
				}
				else {
					yi.alert('正在后台加载数据请稍候……');
				}
			});
        });

		// 删除按钮
		$('[id^=btn_delete_]').each(function(index, element) {
			var el = $(this);
			var name = el.data("name");
			var version = el.data("version");
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
