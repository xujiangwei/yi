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
			yi.mod.debug("mod_area_0", currentMod);
		}
	});

	/** Debugger 对象。
	 */
	var Debugger = function() {
	}

	Debugger.prototype.initArea = function(area, index, mod) {
		// 运行按钮
		area.find('#btn_run').click(function(e) {
			var input = area.find('#input_args');
			var val = input.val().toString();
			var args = null;
			if (val.length > 1) {
				args = JSON.parse(val);
			}

			// 设置参数
			mod.args = args;

			// 调试
			yi.mod.debug("mod_container_" + index, mod);
		});
		area.find('#btn_run').tooltip({container:'body'});

		// 清空按钮
		area.find('#btn_clear').click(function(e) {
			area.find('#input_args').val('');
		});
		area.find('#btn_clear').tooltip({container:'body'});

		area.find('#step_1_explain .raty').tooltip({container:'body'});
		area.find('#step_2_explain .raty').tooltip({container:'body'});
		area.find('#step_3_explain .raty').tooltip({container:'body'});
		area.find('#step_4_explain .raty').tooltip({container:'body'});
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
		var rating = content.find('.raty');
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
		var rating = content.find('.raty');
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
		var rating = content.find('.raty');
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
		var rating = content.find('.raty');
		if (score > -1) {
			rating.html("");
			rating.raty({ score: score, readOnly: true });
		}
		else {
			rating.html("此项无评分");
		}
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
