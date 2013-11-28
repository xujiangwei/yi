/*
 * ModManager
 * 
 * MOD Format:
 *   // 前置依赖
 *   "deps": {
 *       "aliases": []
 *       "files": []
 *   }
 */
var ModManager = function() {
	this.context = "";
	
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
	var version = target.data('modVer');
	if (version === undefined) {
		console.log('[Yi#Mod] Can not find "data-mod-ver" attribute value.');
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
}
