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
};

/**
 * 注册就绪回调函数。 
 */
Yi.prototype.ready = function(callback) {
	this._readyCallbacks.push(callback);
};

/**
 * 自动配置 CommonJS 。
 */
Yi.prototype.config = function(relativePath, addition) {
	if (relativePath.lastIndexOf("/") != (relativePath.length - 1))
		relativePath += "/";
	this.relativePath = relativePath;
	this.mod.context = relativePath;

	var alias = (addition !== undefined) ? addition : {};
	alias["class"] = "utils/class.js";						// 辅助构建 JS 对象关系
	alias["map"] = "utils/hashmap.js";						// 实用 Map 实现
	alias["console"] = "core/console/console.js";			// 可视化控制台
	alias["dialog"] = "plugins/bootbox.min.js";				// 对话框
	alias["menu-aim"] = "plugins/jquery.menu-aim.js";		// 改进的浮动菜单
	alias["fetch"] = "plugins/fetch/jquery.fetch.js";		// 片段截取
	alias["theme-manager"] = "modules/misc/theme-manager.min.js";	// 主题管理器
	alias["holder"] = "utils/holder.js";						// 图片占位符

	common.config({
		base: relativePath + "lib/",
		alias: alias
	});
};

/*
 * 配置框架。
 */
Yi.prototype._setup = function() {
	var readyCount = 0;
	var readyConst = 3;
	var self = this;

	// 创建主题管理器
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

	// 启用 fetch
	common.use('fetch', function() {
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
};

/** 模态模式显示 Alert 对话框。
 */
Yi.prototype.alert = function(message, callback) {
	bootbox.alert(message, callback);
};
/** 模态模式显示 Confirm 对话框。
 */
Yi.prototype.confirm = function(message, callback) {
	bootbox.confirm(message, callback);
};
/** 模态模式显示 Prompt 对话框。
 */
Yi.prototype.prompt = function(title, callback) {
	bootbox.prompt(title, callback);
};
/** 显示指定配置的对话框。
 */
Yi.prototype.dialog = function(options) {
	bootbox.dialog(options);
};
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
 */

var ModEvent = {
	LOAD: "load"
};

var ModManager = function() {
	this.context = "";
	this.mods = {};
	// Key：Event name， Value：List
	this.listeners = new HashMap();
};

/**
 * 加载 Mod 。 
 * @param container MOD 的容器
 * @param args MOD 参数
 */
ModManager.prototype.load = function(container, args) {
	var target = container;
	if (typeof(target) == 'string') {
		target = $('#' + container);
	}

	// 获取 MOD 名
	var modName = target.data('mod');
	if (modName === undefined) {
		console.log('[Yi#Mod] Can not find "data-mod" attribute value.');
		return;
	}
	var version = target.data('ver');
	if (version === undefined) {
		console.log('[Yi#Mod] Can not find "data-ver" attribute value.');
		return;
	}

	var context = this.context;
	var self = this;
	// 获取 MOD 加载数据
	var url = context + "modloader" + "/" + modName + "/" + version;
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
		console.log('[Yi#Mod] Failed requests "' + url + '".');
	});
};

/**
 * 卸载 MOD 。
 */
ModManager.prototype.unload = function(container) {
}

/**
 * 调试 MOD 。
 */
ModManager.prototype.debug = function(containerId, mod) {
	var container = $('#' + containerId);
	// 上下文
	mod["context"] = this.context;
	// URL 参数
	var params = {
		"_n": mod["name"]
		, "_v": mod["version"]
		, "_d": true
	};
	mod["params"] = params;

	// 上下文路径
	mod["contextPath"] = this.context + "debugger/" + mod.path;

	var self = this;
	// 完成回调
	mod["done"] = function(c, m) {
		self._done(c, m);
	};

	// 判断前置条件
	var deps = mod["deps"];
	if (deps !== undefined) {
		this._predeps(deps, function(){
			container.fetch(mod, mod);
		});
	}
	else {
		container.fetch(mod, mod);
	}
};

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
};

/**
 * Fetch 执行完毕的回调函数。
 */
ModManager.prototype._done = function(container, mod) {
	this.addMod(mod);
};

/**
 * 检索当前页的所有可自动装载的 MOD 。
 */
ModManager.prototype._search = function() {
	var self = this;
	$(".mod").each(function(index, element) {
		var el = $(this);
		var auto = el.attr("data-auto");
        if (auto !== undefined && auto == "true") {
			var args = el.data('args');
			if (args !== undefined) {
				try {
					var obj = eval(args);
					args = obj;
				} catch (e) {
					// Nothing
				}
				self.load(el, args);
			}
			else {
				self.load(el);
			}
		}
    });
};

/**
 * 添加 MOD 。
 */
ModManager.prototype.addMod = function(mod) {
	this.mods[mod.name] = mod;
};

/**
 * 删除 MOD 。
 */
ModManager.prototype.removeMod = function(name) {
};

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
};

// Create yi instance
global.yi = new Yi();

})(this);
