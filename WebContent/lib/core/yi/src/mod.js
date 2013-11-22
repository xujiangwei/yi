/*
 * ModManager
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
	// 获取 MOD 加载数据
	var url = this.context + "modloader" + "/" + modName + "/" + version;
	$.post(url, function(data, textStatus, jqXHR) {
		// 处理返回数据
		if (args !== undefined) {
			data["args"] = args;
		}
		// 设置上下文
		data["context"] = context;
		// fetch
		target.fetch(data);
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
	mod["context"] = this.context;
	container.fetch(mod);
};
