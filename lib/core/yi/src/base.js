
var Yi = function() {
	this.themeManager = null;
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

// 配置框架
Yi.prototype._setup = function() {
	var readyCount = 0;
	var readyConst = 2;
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
