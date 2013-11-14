/*
 * ModManager
 */
var ModManager = function() {
	
};

/**
 * 激活 Mod 。 
 */
ModManager.prototype.active = function(name, args) {
	
};

/**
 * 调试普通 MOD 。
 */
ModManager.prototype.debug = function(containerId, mod) {
	var container = $('#' + containerId);
	container.fetch(mod);
};

/**
 * 调试模板 MOD 。
 */
ModManager.prototype.debugTmpl = function(containerId, mod) {
	
};

/*
 * 启用 Mod 。
 */
Yi.prototype.activeMod = function(containerId, args) {
	var container = $('#' + containerId);
	var modName = container.data('mod');

	// 以下为技术验证测试代码
	container.fetch({
		tmpl: 'mod/helloworld/helloworld.tmpl'
		, args: args
	});
};
