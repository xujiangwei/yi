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
	LOADED: "loaded"
};

var ModManager = function() {
	this.context = "";
	this.mods = {};
	// Key：Event name， Value：List
	this.listeners = new HashMap();
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
		console.log('[Yi#Mod] Failed requests "' + url + '"');
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
	var url = this.context + "modmgm" + "/delete/" + name + "/" + version;
	$.post(url, function(data, textStatus, jqXHR) {
		callback.call(null, data);
	}, 'json')
	.fail(function() {
		console.log('[Yi#Mod] Failed requests "' + url + '"');
		if (fail !== undefined) {
			fail.call(null, name, version);
		}
	});
}

/**
 * 重新部署 Debug 下的 MOD 工程。
 */
ModManager.prototype.redeployDebug = function(name, version, callback, fail) {
	var url = this.context + "modmgm" + "/redeploy_d/" + name + "/" + version;
	$.post(url, function(data, textStatus, jqXHR) {
		callback.call(null, data);
	}, 'json')
	.fail(function() {
		console.log('[Yi#Mod] Failed requests "' + url + '"');
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
					console.log('[Yi#Mod] Parse "data-args" error');
				}
			}

			if (params !== undefined) {
				try {
					var obj = eval(params);
					params = obj;
				} catch (e) {
					console.log('[Yi#Mod] Parse "data-params" error');
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
