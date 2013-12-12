/*
 * Yi Framework
 * 
 * Copyright (c) 2013,2014 DHC Software Research Department
 */

(function() {
	var yi = window.yi;

	yi.config("../");

	yi.ready(function() {
		window.manager = new Manager(yi);

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
				yi.confirm('是否确认要删除模组：<span class="text-info">' + name + ' ' + version + '</span>？', function(result) {
					if (!result) {
						return;
					}

					el.button('loading');
					yi.mod.deleteRemoteMod(name, version
						, function(data) {
							el.button('reset');

							if (data.readOnly !== undefined && data.readOnly) {
								yi.alert('<p class="text-warning">模组 ' + name + ' ' + version + ' 为只读模组，不能执行“删除”操作。</p>');
								return;
							}

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
	});

	function Manager(yi) {
		this.timer = 0;
		// 监听失败事件
		yi.mod.addListener(ModEvent.FAILED, this._onModFailed);
	}

	Manager.prototype.showAbout = function() {
		yi.alert('<p>模组管理器 v1.0.0</p><small class="text-muted">Author: Xu Jiangwei (xujiangwei@dhcc.com.cn)</small>');
	}

	Manager.prototype._onModFailed = function(data) {
		var self = this;
		if (self.timer > 0)
			clearTimeout(self.timer);

		self.timer = setTimeout(function() {
			clearTimeout(self.timer);
			self.timer = 0;

			yi.alert('<h5>警告</h5><p class="text-danger">丢失 "'+ data.mod.name +'" 模组，无法使用“详情”功能。</p>');
		}, 1000);
	}
})();
