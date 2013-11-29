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
	// TODO
};

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
	delete this.mods[name];
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

/**
 * 删除监听器。
 */
ModManager.prototype.removeListener = function(event, listener) {
};
