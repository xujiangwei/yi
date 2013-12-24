/**
 * Yi
 * @author Jiangwei Xu
 * @version 1.0.0
 */

(function(global, undefined) {

// Avoid conflicting when `yi.js` is loaded multiple times
if (global.yi) {
	return;
}

var Yi = function() {
	this.relativePath = "";
	this.themeManager = null;
	this.mod = new ModManager();

	this._readyCallbacks = [];

	this._dialogTimer = 0;

	var self = this;
	var ready = function(event) {
		// 检查就绪状态
		self._setup();

		if (typeof window.addEventListener != 'undefined')
			window.removeEventListener('load', ready, false);
		else
			window.detachEvent('onload', ready);
	};
	// 监听 load 事件
	if (typeof window.addEventListener != 'undefined')
		window.addEventListener('load', ready, false);
	else
		window.attachEvent('onload', ready);
}

/**
 * 注册就绪回调函数。 
 */
Yi.prototype.ready = function(callback) {
	this._readyCallbacks.push(callback);
}

/**
 * 自动配置 CommonJS 。
 * @param relativePath 页面相对路径
 * @param addition 附加别名列表
 * @param excluded 自动排除不需要的组件
 */
Yi.prototype.config = function(relativePath, addition, excluded) {
	if (relativePath.lastIndexOf("/") != (relativePath.length - 1))
		relativePath += "/";
	this.relativePath = relativePath;
	this.mod.context = relativePath;

	var alias = (addition !== undefined) ? addition : {};
	alias["class"] = "utils/class.js";						// 辅助构建 JS 对象关系
	alias["utils"] = "utils/utils.js";						// 实用函数库
	alias["map"] = "utils/hashmap.js";						// 实用 Map 实现
	alias["extend"] = "utils/extend.js";					// 对象继承实现
	alias["observable"] = "utils/observable.js";			// 观察者实现
	alias["delayed-task"] = "utils/delayed-task.js";			// 延迟任务
	alias["event"] = "utils/event.js";						// 事件
	alias["holder"] = "utils/holder.js";					// 图片占位符
	alias["console"] = "core/console/console.min.js";		// 可视化控制台
	alias["dialog"] = "plugins/bootbox.min.js";				// 对话框
	alias["menu-aim"] = "plugins/jquery.menu-aim.js";		// 改进的浮动菜单
	alias["rating"] = "plugins/raty/jquery.raty.min.js";	// 评分插件
	alias["verify"] = "plugins/parsley/parsley.min.js";		// 表单验证插件
	alias["switch"] = "plugins/bootstrap-switch/switch.js";	// Switch 按钮
	alias["fetch"] = "plugins/fetch/jquery.fetch.js";		// 片段截取
	alias["theme-manager"] = "modules/misc/theme-manager.min.js";	// 主题管理器
	alias["component"] = "modules/components/component.js";	// 组件基类

	alias["card-layout"] = "modules/components/card-layout/card-layout.js";	// 卡式布局
	alias["form"] = "modules/components/form/form.js";						// 表单
	alias["gallery"] = "modules/components/gallery/gallery.js";				// 大图列表基类
	alias["graph-radio-group"] = "modules/components/graph-radio-group/graph-radio-group.js"; // 单选按钮组
	alias["modal"] = "modules/components/modal-window/modal-window.js";		// 模态对话框
	alias["tab"] = "modules/components/tab/tab.js";							// 单选按钮组
	alias["timeline"] = "modules/components/timeline/timeline.js";			// 时间线
	// 待定 alias["roundabout"]="plugins/roundabout";						// 轮播轮盘
	alias["clickable"] = "modules/components/clickable/clickable.js";		// 点击类
	alias["button"] = "modules/components/button/button.js";				// 按钮
	// 待定 alias["page-loader"] = "modules/components/page-loader/page-loader.js";	// 点击类
	alias["carousel"] = "modules/components/carousel/carousel-roundabout.js";	// 轮播组件
	alias["date-format"] = "utils/date-format.js";							// 简单日期格式化工具

	common.config({
		base: relativePath + "lib/",
		alias: alias
	});
}

/*
 * 配置框架。
 */
Yi.prototype._setup = function() {
	var readyCount = 0;
	var readyConst = 5;
	var self = this;

	// 启用主题管理器
	common.use('theme-manager', function(ThemeManager) {
		self.themeManager = new ThemeManager();
		// 检查就绪状态
		checkReady();
	});

	// 启用对话框
	common.use('dialog', function() {
		bootbox.setDefaults({
			locale: 'zh_CN'
		});

		// 检查就绪状态
		checkReady();
	});

	// 启用 Fetch 插件
	common.use('fetch', function() {
		// 检查就绪状态
		checkReady();
	});

	// 启动表单验证插件
	// 首先加载语言
	common.use('plugins/parsley/i18n/messages.zh_cn.js', function() {
		common.use('verify', function() {
			self._fitParsley();
			// 检查就绪状态
			checkReady();
		});
	});

	// 启用 Rating 插件
	common.use('rating', function() {
		self._fitRaty();
		// 检查就绪状态
		checkReady();
	});

	// 检查是否就绪
	function checkReady() {
		++readyCount;
		if (readyCount == readyConst) {
			// 调用回调
			if (self._readyCallbacks.length > 0) {
				for (var i = 0; i < self._readyCallbacks.length; ++i) {
					var cb = self._readyCallbacks[i];
					cb.call(null, self);
				}
			}

			// 处理 MOD 自动化
			self.mod._search();
		}
	}
}

// 配置 Raty
Yi.prototype._fitRaty = function() {
	// 设置参数
	$.fn.raty.defaults.path = this.relativePath + "lib/plugins/raty/img";
	$.fn.raty.defaults.hints = ['极差', '差', '合格', '好', '极好'];
	// 别名
	$.fn.rating = $.fn.raty;
}
// 配置 Parsley
Yi.prototype._fitParsley = function() {
	$.fn.parsley.defaults.namespace = 'verifier-';
	$.fn.parsley.defaults.successClass = 'verifier-success';
	$.fn.parsley.defaults.errorClass = 'verifier-error';
	$.fn.parsley.defaults.validationMinlength = 1;
	// 别名
	$.fn.verify = $.fn.parsley;
}

/** 模态模式显示 Alert 对话框。
 */
Yi.prototype.alert = function(message, callback) {
	bootbox.alert(message, callback);
}
/** 模态模式显示 Confirm 对话框。
 */
Yi.prototype.confirm = function(message, callback) {
	bootbox.confirm(message, callback);
}
/** 模态模式显示 Prompt 对话框。
 */
Yi.prototype.prompt = function(title, callback) {
	bootbox.prompt(title, callback);
}
/** 显示指定配置的对话框。
 */
Yi.prototype.dialog = function(options) {
	bootbox.dialog(options);
}
/** 隐藏所有对话框。
 */
Yi.prototype.hideDialog = function() {
	bootbox.hideAll();
}
/**
 */
Yi.prototype.pasteDialogTips = function(text, autoTimeout) {
	var el = $('.bootbox');
	if (el.length > 0) {
		if (this._dialogTimer > 0) {
			clearTimeout(this._dialogTimer);
			this._dialogTimer = 0;
		}

		el = el.find('.bootbox-body');
		if (el.find('#_tip').length > 0) {
			el.find('#_tip').html('<h6>' + text + '</h6>');
		}
		else {
			el.append('<div id="_tip" class="text-center text-warning"><h6>' + text + '</h6></div>');
		}

		if (typeof autoTimeout != 'undefined') {
			var self = this;
			this._dialogTimer = setTimeout(self.eraseDialogTips, autoTimeout);
		}
	}
}
/**
 */
Yi.prototype.eraseDialogTips = function() {
	var el = $('.bootbox');
	if (el.length > 0) {
		if (this._dialogTimer > 0) {
			clearTimeout(this._dialogTimer);
			this._dialogTimer = 0;
		}

		el = el.find('#_tip');
		el.remove();
	}
}
/*
 * ModManager
 * 
 * MOD Format: {
 *   // 前置依赖
 *   "deps": {
 *       "aliases": []
 *       "files": []
 *   }
 * }
 * 
 * DOM 节点属性：
 * data-mod - MOD 名称
 * data-ver - MOD 版本
 * data-auto - 是否自动加载，默认 false
 * data-args - 自动加载时的参数
 *
 * Event 属性：
 * event - {String} 事件名
 * container - {Object} MOD 容器的 jQuery对象
 * mod - {Object} MOD 对象
 */

global.ModEvent = {
	LOADED: "loaded",
	FAILED: "failed"
};

var ModManager = function() {
	this.context = "";
	this.mods = {};
	// Key：Event name， Value：List
	this.listeners = new HashMap();
}

ModManager.prototype.getMod = function(name, version, success, fail, debug) {
	var url = this.context + "mod/" + name + "/" + version;
	if (debug !== undefined && debug)
		url += "?_d=true";

	$.get(url, function(data, textStatus, jqXHR) {
		success.call(null, data);
	}, 'json')
	.fail(function(e) {
		console.log('[Yi.Mod#getMod] Failed requests "' + url + '"');
		if (fail !== undefined)
			fail.call(null, name, version);
	});
}

/**
 * 加载 Mod 。 
 * @param container MOD 的容器
 * @param args MOD 参数
 * @param addition URL 参数
 */
ModManager.prototype.load = function(container, args, addition) {
	var target = container;
	if (typeof(target) == 'string') {
		target = $('#' + container);
	}

	// 获取 MOD 名
	var modName = target.data('mod');
	if (modName === undefined) {
		console.log('[Yi.Mod#load] Can not find "data-mod" attribute value.');
		return;
	}
	var version = target.data('ver');
	if (version === undefined) {
		console.log('[Yi.Mod#load] Can not find "data-ver" attribute value.');
		return;
	}

	var context = this.context;
	var self = this;
	// 获取 MOD 加载数据
	var url = context + "modloader/" + modName + "/" + version;
	$.post(url, function(data, textStatus, jqXHR) {
		// 处理返回数据
		if (args !== undefined) {
			data["args"] = args;
		}
		// 设置上下文
		data["context"] = context;
		// 设置 params
		var params = {
			"_n": data["name"]
			, "_v": data["version"]
			, "_d": false
		};
		if (addition !== undefined && addition != null) {
			addition["_n"] = params._n;
			addition["_v"] = params._v;
			addition["_d"] = params._d;
			params = addition;
		}
		data["params"] = params;
		// 上下文路径
		data["contextPath"] = context + data.path;
		// 完成回调
		data["done"] = function(c, m) {
			self._done(c, m);
		};

		// 判断前置条件
		var deps = data["deps"];
		if (deps !== undefined) {
			self._predeps(deps, function(){
				// 执行 Fetch
				target.fetch(data, data);
			});
		}
		else {
			// 执行 Fetch
			target.fetch(data, data);
		}
	}, 'json')
	.fail(function() {
		console.log('[Yi.Mod#load] Failed requests "' + url + '"');
		self.notifyEvent(global.ModEvent.FAILED, target, {"name":modName, "version":version});
	});
}

/**
 * 卸载 MOD 。
 */
ModManager.prototype.unload = function(container) {
	// TODO
}

/**
 * 删除服务器上的 MOD 数据。
 */
ModManager.prototype.deleteRemoteMod = function(name, version, callback, fail) {
	var url = this.context + "modmgm/delete/" + name + "/" + version;
	$.post(url, function(data, textStatus, jqXHR) {
		callback.call(null, data);
	}, 'json')
	.fail(function() {
		console.log('[Yi.Mod#deleteRemoteMod] Failed requests "' + url + '"');
		if (fail !== undefined) {
			fail.call(null, name, version);
		}
	});
}

/**
 * 重新部署 Debug 下的 MOD 工程。
 */
ModManager.prototype.redeployDebug = function(name, version, callback, fail) {
	var url = this.context + "modmgm/redeploy_d/" + name + "/" + version;
	$.post(url, function(data, textStatus, jqXHR) {
		callback.call(null, data);
	}, 'json')
	.fail(function() {
		console.log('[Yi.Mod#redeployDebug] Failed requests "' + url + '"');
		if (fail !== undefined) {
			fail.call(null, name, version);
		}
	});
}

/**
 * 新建 Debug 项目工程。
 */
ModManager.prototype.newDebug = function(mod, done, fail) {
	var url = this.context + "modmgm/new/" + mod.name + "/" + mod.version;
	$.post(url, JSON.stringify(mod), function(data, textStatus, jqXHR) {
		done.call(null, data);
	}, 'json')
	.fail(function() {
		console.log('[Yi.Mod#newDebug] Failed requests "' + url + '"');
		if (fail !== undefined) {
			fail.call(null, mod);
		}
	});
}

/**
 * 删除 Debug 项目工程。
 */
ModManager.prototype.deleteDebug = function(name, version, done, fail) {
	var url = this.context + "modmgm/delete_d/" + name + "/" + version;
	$.post(url, function(data, textStatus, jqXHR) {
		done.call(null, data);
	}, 'json')
	.fail(function() {
		console.log('[Yi.Mod#deleteDebug] Failed requests "' + url + '"');
		if (fail !== undefined) {
			fail.call(null, name, version);
		}
	}); 
}

/**
 * 调试 MOD 。
 */
ModManager.prototype.debug = function(containerId, mod, addition) {
	var _debug = {
		startTime: new Date()
	};

	var container = $('#' + containerId);
	// 清空 HTML 数据
	container.html('');

	// 上下文
	mod["context"] = this.context;
	// URL 参数
	var params = {
		"_n": mod["name"]
		, "_v": mod["version"]
		, "_d": true
	};
	if (addition !== undefined && addition != null) {
		addition["_n"] = params._n;
		addition["_v"] = params._v;
		addition["_d"] = params._d;
		params = addition;
	}
	mod["params"] = params;

	// 上下文路径
	mod["contextPath"] = this.context + "debugger/" + mod.path;

	var self = this;
	// 完成回调
	mod["done"] = function(c, m) {
		self._done(c, m);
	};

	// 启用调试
	mod.debug = true;

	// 调试数据
	mod._debug = _debug;

	// 判断前置条件
	var deps = mod["deps"];
	if (deps !== undefined) {
		this._predeps(deps, function(){
			container.fetch(mod, mod);

			// 结束时间
			_debug.endTime = new Date();
		});
	}
	else {
		container.fetch(mod, mod);

		// 结束时间
		_debug.endTime = new Date();
	}
}

/**
 * 处理前置条件。
 */
ModManager.prototype._predeps = function(deps, callback) {
	var checkCount = 0;
	var aliases = deps["aliases"];
	var check = function() {
		++checkCount;
		if (checkCount == aliases.length) {
			callback.call(null);
		}
	}

	if (aliases !== undefined) {
		for (var i = 0; i < aliases.length; ++i) {
			common.use(aliases[i], function() {
				check();
			});
		}
	}
}

/**
 * Fetch 执行完毕的回调函数。
 */
ModManager.prototype._done = function(container, mod) {
	this.addMod(mod);

	// 停止 LOADED 事件
	this.notifyEvent(ModEvent.LOADED, container, mod);
}

/**
 * 检索当前页的所有可自动装载的 MOD 。
 */
ModManager.prototype._search = function() {
	var self = this;
	$(".mod").each(function(index, element) {
		var el = $(this);
		var auto = el.attr("data-auto");
        if (auto !== undefined && auto == "true") {
			// 主函数参数
			var args = el.data('args');
			// URL 参数
			var params = el.data('params');

			if (args !== undefined) {
				try {
					var obj = eval(args);
					args = obj;
				} catch (e) {
					console.log('[Yi.Mod#_search] Parse "data-args" error');
				}
			}

			if (params !== undefined) {
				try {
					var obj = eval(params);
					params = obj;
				} catch (e) {
					console.log('[Yi.Mod#_search] Parse "data-params" error');
				}
			}

			self.load(el, args, params);
		}
    });
}

/**
 * 添加 MOD 。
 */
ModManager.prototype.addMod = function(mod) {
	this.mods[mod.name] = mod;
}

/**
 * 删除 MOD 。
 */
ModManager.prototype.removeMod = function(name) {
	delete this.mods[name];
}

/**
 * 添加监听器。
 */
ModManager.prototype.addListener = function(event, listener) {
	if (this.listeners.containsKey(event)) {
		var list = this.listeners.get(event);
		if (list.indexOf(listener) < 0) {
			list.push(listener);
		}
	}
	else {
		this.listeners.put(event, [listener]);
	}
}

/**
 * 删除监听器。
 */
ModManager.prototype.removeListener = function(event, listener) {
	if (this.listeners.containsKey(event)) {
		var list = this.listeners.get(event);
		var index = list.indexOf(listener);
		if (index >= 0) {
			list.split(index, 1);
			// 如果列表空，则从 Map 中删除列表
			if (list.length == 0) {
				this.listeners.remove(event);
			}
		}
	}
}

/**
 * 通知事件。
 */
ModManager.prototype.notifyEvent = function(event, container, mod) {
	if (this.listeners.containsKey(event)) {
		var list = this.listeners.get(event);
		var obj = {event:event, container:container, mod:mod};
		for (var i = 0; i < list.length; ++i) {
			var listener = list[i];
			listener.call(null, obj);
		}
	}
}

// Create yi instance
global.yi = new Yi();

})(this);
