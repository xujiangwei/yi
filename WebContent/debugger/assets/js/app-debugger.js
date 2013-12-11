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
		// 初始化 0 索引区域
		window.debugger.initArea($('#mod_area_0'), 0, currentMod);

		// 添加监听器
		yi.mod.addListener(ModEvent.LOADED, function(param){window.debugger.onModLoaded(param);});

		// 如果直接加载则进行加载
		if (direct) {
			// 调试
			yi.mod.debug("mod_container_0", currentMod);
		}
	});

	/** Debugger 对象。
	 */
	var Debugger = function() {
		var self = this;
		// 激活控制台
		common.use('console', function(Console){
			self.console = new Console();
			self.console.start();
			self._registerCmd(console);
		});
	}

	/** 注册调试命令 */
	Debugger.prototype._registerCmd = function(console) {
		
	}

	Debugger.prototype.initArea = function(area, index, mod) {
		var self = this;
		// 清空输入框按钮
		area.find('#btn_clear_args').click(function(e) {
			area.find('#input_args').val('');
		});
		area.find('#btn_clear_params').click(function(e) {
			area.find('#input_params').val('');
		});
		// 设置预置数据按钮
		area.find('a[id^="btn_preset_arg_"]').click(function(e) {
			var btn = $(this);
			area.find('#input_args').val(btn.attr('data-value'));
		});
		area.find('a[id^="btn_preset_param_"]').click(function(e) {
			var btn = $(this);
			area.find('#input_params').val(btn.attr('data-value'));
		});

		// 运行按钮
		area.find('#btn_run').click(function(e) {
			// 显示正在加载
			area.find('.preview').html('<img src="assets/img/loading_128x128.gif" />');

			var t = setTimeout(function() {
				clearTimeout(t);

				var input = area.find('#input_args');
				var val = input.val().toString();
				var args = null;
				if (val.length > 1) {
					try {
						args = JSON.parse(val);
					} catch (e) {
						yi.alert('解析参数错误: ' + e.toString());
						return;
					}
				}

				// 设置主函数参数
				mod.args = args;

				input = area.find('#input_params');
				val = input.val().toString();
				var params = null;
				if (val.length > 1) {
					try {
						params = JSON.parse(val);
					} catch (e) {
						yi.alert('解析参数错误: ' + e.toString());
						return;
					}
				}

				// 调试
				yi.mod.debug("mod_container_" + index, mod, params);
			}, 500);
		});
		area.find('#btn_run').tooltip({container:'body'});

		// 清理按钮
		area.find('#btn_reset').click(function(e) {
			area.find('#btn_run').attr("disabled", "disabled");
			area.find('#btn_reset').attr("disabled", "disabled");
			area.find('.mod').html('<div class="preview text-center"><img src="assets/img/loading_128x128.gif" /></div>');

			// 重置评分区
			self.resetMark(area);

			yi.mod.redeployDebug(mod.name, mod.version
				, function(data) {
					var t = setTimeout(function() {
						clearTimeout(t);
						area.find('#btn_run').removeAttr("disabled");
						area.find('#btn_reset').removeAttr("disabled");
						area.find('.mod').html('<div class="preview text-center"><h3>预览区域</h3></div>');
					}, 500);
				}
				, function() {
					area.find('#btn_run').removeAttr("disabled");
					area.find('#btn_reset').removeAttr("disabled");
					area.find('.mod').html('<div class="preview text-center"><h3>预览区域</h3></div>');
				});
		});
		area.find('#btn_reset').tooltip({container:'body'});

		area.find('#step_1_explain .rating').tooltip({container:'body'});
		area.find('#step_2_explain .rating').tooltip({container:'body'});
		area.find('#step_3_explain .rating').tooltip({container:'body'});
		area.find('#step_4_explain .rating').tooltip({container:'body'});
	}

	Debugger.prototype.onModLoaded = function(param) {
		var mod = param.mod;
		var container = param.container;
		// 获取 debug 数据
		var preparatoryStartTime = mod._debug.startTime.getTime();
		var preparatoryEndTime = mod._debug.endTime.getTime();
		var debug = container.data('debug');
		var startTime = debug.startTime.getTime();
		var htmlEndTime = debug.htmlEndTime.getTime();
		var scriptsEndTime = debug.scriptsEndTime.getTime();
		var endTime = debug.endTime.getTime();
		// 计算耗时
		var elapsedS1 = preparatoryEndTime - preparatoryStartTime;
		var elapsedS2 = htmlEndTime - startTime;
		var elapsedS3 = scriptsEndTime - htmlEndTime;
		var elapsedS4 = endTime - scriptsEndTime;

		// 文件大小
		var size = (mod.htmlSize !== undefined) ? mod.htmlSize
			: ((mod.tmplSize !== undefined) ? mod.tmplSize : 0);
		// 脚本文件大小
		var scriptSize = 0;
		if (mod.scriptFileSizeList !== undefined) {
			for (var i = 0, len = mod.scriptFileSizeList.length; i < len; ++i) {
				scriptSize += mod.scriptFileSizeList[i];
			}
		}

		// 更新界面信息
		var c = container.parent();
		c.find('#step_1').html("耗时：" + elapsedS1 + " ms<br/>&nbsp;");
		c.find('#step_2').html("耗时：" + elapsedS2 + " ms<br/>数据量：" + this.formatSize(size));
		c.find('#step_3').html("耗时：" + elapsedS3 + " ms<br/>数据量：" + this.formatSize(scriptSize));
		c.find('#step_4').html("耗时：" + elapsedS4 + " ms<br/>&nbsp;");

		// 评价说明
		this.markStep1(c.find('#step_1_explain'), mod, elapsedS1);
		this.markStep2(c.find('#step_2_explain'), mod, elapsedS2, size, debug.tmplElapsed);
		this.markStep3(c.find('#step_3_explain'), mod, elapsedS3, scriptSize);
		this.markStep4(c.find('#step_4_explain'), mod, elapsedS4);
	}

	Debugger.prototype.markStep1 = function(content, mod, elapsed) {
		var text = "";
		var score = 0;
		if (mod.deps !== undefined) {
			text = "执行了前置处理网络 I/O";
			if (elapsed < 50)
				score = 5;
			else if (elapsed < 60)
				score = 4;
			else if (elapsed < 80)
				score = 3;
			else if (elapsed < 100)
				score = 2;
			else
				score = 1;
		}
		else {
			text = "无前置处理的网络 I/O";
			if (elapsed < 5)
				score = 5;
			else if (elapsed < 15)
				score = 4;
			else if (elapsed < 20)
				score = 3;
			else if (elapsed < 30)
				score = 2;
			else
				score = 1;
		}

		content.find('.text').html(text);
		var rating = content.find('.rating');
		rating.html("");
		rating.raty({ score: score, readOnly: true });
	}

	Debugger.prototype.markStep2 = function(content, mod, elapsed, size, tmplElapsed) {
		var text = "";
		var score = 0;
		if (0 == elapsed || 0 == size) {
			text = "没有 HTML 数据被装载";
			score = -1;
		}
		else {
			var et = (tmplElapsed !== undefined) ? (elapsed - 5 - tmplElapsed) : (elapsed - 5);
			var rate = Math.round(size / et);
			text = "平均数据吞吐率：" + rate + " B/s";
			if (rate >= 50)
				score = 5;
			else if (rate >= 40)
				score = 4;
			else if (rate >= 30)
				score = 3;
			else if (rate >= 20)
				score = 2;
			else
				score = 1;
		}

		content.find('.text').html(text);
		var rating = content.find('.rating');
		if (score > -1) {
			rating.html("");
			rating.raty({ score: score, readOnly: true });
		}
		else {
			rating.html("此项无评分");
		}
	}

	Debugger.prototype.markStep3 = function(content, mod, elapsed, size) {
		var text = "";
		var score = 0;
		if (0 == elapsed && 0 == size) {
			text = "没有脚本数据被装载";
			score = -1;
		}
		else {
			if (0 == elapsed) {
				text = "脚本已被缓存";
				score = 5;
			}
			else {
				var rate = Math.round(size / elapsed);
				text = "平均数据吞吐率：" + rate + " B/s";
				if (rate >= 40)
					score = 5;
				else if (rate >= 30)
					score = 4;
				else if (rate >= 20)
					score = 3;
				else if (rate >= 10)
					score = 2;
				else
					score = 1;
			}
		}

		content.find('.text').html(text);
		var rating = content.find('.rating');
		if (score > -1) {
			rating.html("");
			rating.raty({ score: score, readOnly: true });
		}
		else {
			rating.html("此项无评分");
		}
	}

	Debugger.prototype.markStep4 = function(content, mod, elapsed) {
		var text = "";
		var score = 0;
		if (0 == elapsed) {
			text = "无回调函数被执行";
			score = -1;
		}
		else {
			text = "回调函数被执行";
			if (elapsed < 20)
				score = 5;
			else if (elapsed < 40)
				score = 4;
			else if (elapsed < 60)
				score = 3;
			else if (elapsed < 100)
				score = 2;
			else
				score = 1;
		}

		content.find('.text').html(text);
		var rating = content.find('.rating');
		if (score > -1) {
			rating.html("");
			rating.raty({ score: score, readOnly: true });
		}
		else {
			rating.html("此项无评分");
		}
	}

	Debugger.prototype.resetMark = function(area) {
		var c = '未执行<br/><span class="glyphicon glyphicon-question-sign"></span>';
		area.find('#step_1').html(c);
		area.find('#step_2').html(c);
		area.find('#step_3').html(c);
		area.find('#step_4').html(c);
		c = '未执行';
		var r = '<span class="glyphicon glyphicon-question-sign"></span>';
		area.find('#step_1_explain').find('.text').html(c);
		area.find('#step_1_explain').find('.rating').html(r);
		area.find('#step_2_explain').find('.text').html(c);
		area.find('#step_2_explain').find('.rating').html(r);
		area.find('#step_3_explain').find('.text').html(c);
		area.find('#step_3_explain').find('.rating').html(r);
		area.find('#step_4_explain').find('.text').html(c);
		area.find('#step_4_explain').find('.rating').html(r);
	}

	Debugger.prototype.formatSize = function(size) {
		if (size <= 1024) {
			return size + " bytes";
		}
		else if (size <= 1024 * 1024) {
			var ss = (size / 1024).toString();
			var index = ss.indexOf(".");
			ss = ss.substr(0, (index + 3));
			return ss + " KB";
		}
		else {
			return size + " bytes";
		}
	}

	// 实例化
	this.debugger = new Debugger();
})();
