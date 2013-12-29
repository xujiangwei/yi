
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

	var alias = (addition !== undefined && null != addition) ? addition : {};
	alias["class"] = "utils/class.js";						// 辅助构建 JS 对象关系
	alias["utils"] = "utils/utils.js";						// 实用函数库
	alias["map"] = "utils/hashmap.js";						// 实用 Map 实现
	alias["extend"] = "utils/extend.js";					// 对象继承实现
	alias["observable"] = "utils/observable.js";			// 观察者实现
	alias["delayed-task"] = "utils/delayed-task.js";		// 延迟任务
	alias["event"] = "utils/event.js";						// 事件
	alias["holder"] = "utils/holder.js";					// 图片占位符
	alias["console"] = "core/console/console.min.js";		// 可视化控制台
	alias["dialog"] = "plugins/bootbox/bootbox.min.js";		// 对话框
	alias["menu-aim"] = "plugins/menu/jquery.menu-aim.js";	// 改进的浮动菜单
	alias["rating"] = "plugins/raty/jquery.raty.min.js";	// 评分插件
	alias["verify"] = "plugins/parsley/parsley.min.js";		// 表单验证插件
	alias["switch"] = "plugins/switch/switch.js";			// Switch 按钮
	alias["fetch"] = "plugins/fetch/jquery.fetch.js";		// 片段截取
	alias["theme-manager"] = "modules/misc/theme-manager.min.js";	// 主题管理器
	alias["component"] = "modules/components/component.js";	// 组件基类

	alias["grid"] = "modules/components/grid/grid-boot.js";

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
		debug: 2,
		base: relativePath + "lib/",
		alias: alias,
		preload: []
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
