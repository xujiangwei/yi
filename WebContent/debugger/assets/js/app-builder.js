/*
 * Yi Framework
 * 
 * Copyright (c) 2013,2014 DHC Software Research Department
 */

(function() {
	// 禁用 AJAX 缓存
	$.ajaxSetup({
		cache: false
	});

	var yi = window.yi;

	// 配置 CommonJS
	yi.config("../");

	yi.ready(function() {
		var info = $('#progress_info');

		var timer = 0;
		var url = "../mod/" + mod.name + "/" + mod.version;
		var maxCounts = 20;		// 10 秒
		var counts = 0;

		var task = function() {
			clearTimeout(timer);

			// 尝试请求 MOD 数据
			$.ajax(url, {
				cache: false
				, statusCode: {
					404: function() {
						if (counts >= maxCounts) {
							// 达到最大尝试次数
							info.html('<p class="text-danger">构建模组所用时间超出预期，构建过程可能出错或者文件过多导致打包耗时过长</p>');
							return;
						}

						timer = setTimeout(task, 500);
						// 更新重试计数
						++counts;
					}
				}
			}).done(function(data) {
				stopProgressBar(100);
				info.html('<p class="text-success">构建并部署模组完成</p>');
				end();
			}).fail(function() {
				// Nothing
			});
		};

		// 启动定时器
		timer = setTimeout(task, 1000);

		// 简单进度条动画
		startProgressBar();
	});

	// 结束
	var end = function() {
		var handle = window.handle;
		if (handle === undefined) {
			return;
		}

		var info = $('#action_info');
		info.html('3 秒后将自动<a href="javascript:closeSelf();">关闭窗口</a>');
		var count = 3;
		var t = setInterval(function() {
			--count;
			info.html(count + ' 秒后将自动<a href="javascript:closeSelf();">关闭窗口</a>');
			if (count == 0) {
				clearInterval(t);
				handle.close();
			}
		}, 1000);
	}

	var pbTimer;
	var startProgressBar = function() {
		var bar = $('.progress-bar');
		var progress = 0;

		var task = function() {
			progress += 2;

			bar.css('width', progress + '%');

			if (progress >= 100) {
				progress = 0;
				clearInterval(pbTimer);
			}
		};

		pbTimer = setInterval(task, 210);
	};

	var stopProgressBar = function(value) {
		clearInterval(pbTimer);
		var bar = $('.progress-bar');
		bar.css('width', value + '%');
		setTimeout(function() {
			bar.parent().removeClass('active');
		}, 500);
	}

	// 关闭窗口
	this.closeSelf = function() {
		var handle = window.handle;
		if (handle === undefined) {
			return;
		}

		handle.close();
	}
})();
