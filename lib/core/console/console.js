/**
 * Web Console
 * @author Jiangwei Xu
 *
 * 快捷键：
 * Ctrl + ~
 *
 * 控制台命令对象格式：
 * {
 *   name: "version",
 *   short: "ver",
 *   desc: "Print console version.",
 *   usage: "version|ver",
 *   exec: function(console, name, args) { console.println("v1.0"); }
 * }
 */
define(function(require, exports, module) {

	// 需求样式表
	require("core/console/console.css");

	/** 控制台构造函数。
	 */
	function Console() {
		this.version = "1.0";
		this.dom = null;
		this.viewDom = null;
		this.inputDom = null;
		this.keyDownFun = null;
		this.keyUpFun = null;
		this.hotKeyCtrl = false;
		// 原始 console
		this.rawConsole = window.console;

		// 字符数
		this.charCounts = 0;
		// 最大允许字符数
		this.maxCharCounts = 5000;

		this.prompt = '&gt; ';

		// 命令列表
		this.cmdNameMap = {};
		this.cmdShortMap = {};

		// 内置命令
		this._buildIn();
	}

	// 导出
	module.exports = Console;

	/** 启动控制台。
	 */
	Console.prototype.start = function() {
		var that = this;
		this.keyDownFun = function(event) { that._onKeyDown(event); };
		this.keyUpFun = function(event) { that._onKeyUp(event); };
		document.addEventListener('keydown', this.keyDownFun, false);
		document.addEventListener('keyup', this.keyUpFun, false);

		if (null == this.dom) {
			var el = document.createElement("div");
			el.id = "_console";
			var ta = ['<div class="window container">'
			, '<div class="title">Console</div>'
			, '<div id="_console_view" class="view"><p>Console 1.0 (author Ambrose Xu, updated 20131010)</p><p>Enter the "help" for more information.</p><p><br/></p></div>'
			, '<div class="cmd-input">&gt; <input type="text" name="_console_cmd" id="_console_cmd" maxlength="256"></div>'
			, '</div>'];
			el.innerHTML = ta.join('');
			document.body.appendChild(el);
			el.style.visibility = 'hidden';

			this.dom = el;
		}

		if (null == this.viewDom) {
			this.viewDom = document.getElementById('_console_view');
		}
		if (null == this.inputDom) {
			this.inputDom = document.getElementById('_console_cmd');
		}

		if (typeof console === "undefined" || typeof console.log === "undefined") {
			var names = ["log", "debug", "info", "warn", "error", "assert", "dir", "dirxml",
				"group", "groupEnd", "time", "timeEnd", "count", "trace", "profile", "profileEnd"];

			window.console = {};
			for (var i = 0; i < names.length; ++i) {
				window.console[names[i]] = function() {};
			}
		}

		window.console = this;
	};

	/** 停用控制台。
	 */
	Console.prototype.stop = function() {
		document.removeEventListener('keydown', this.keyDownFun, false);
		document.removeEventListener('keyup', this.keyUpFun, false);

		window.console = this.rawConsole;
	};

	/** 开启控制台界面。
	 */
	Console.prototype.open = function() {
		if (!this.isClosed()) {
			return;
		}

		document.body.style.overflowX = 'hidden';
		this.dom.style.right = '-600px';
		this.dom.style.visibility = 'visible';
		$(this.dom).animate({right:'8px'}, function(){
			document.body.style.overflowX = 'auto';
		});
	};

	/** 关闭控制台界面。
	 */
	Console.prototype.close = function() {
		if (this.isClosed()) {
			return;
		}

		var that = this;
		document.body.style.overflowX = 'hidden';
		$(this.dom).animate({right:'-600px'}, function(){
			that.dom.style.visibility = 'hidden';
			that.dom.style.right = '8px';
			document.body.style.overflowX = 'auto';
		});
	};

	/** 控制台是否已显示。
	 */
	Console.prototype.isClosed = function() {
		return (null == this.dom || this.dom.style.visibility != 'visible') ? true : false;
	};

	/** 打印指定文本信息到控制台界面。
	 */
	Console.prototype.log = function(text) {
		this.rawConsole.log(text);
		this.println(text);
	};

	/** 打印指定文本信息到控制台界面。
	 */
	Console.prototype.info = function(text) {
		this.rawConsole.info(text);
		this.println(text);
	};

	/** 打印指定文本信息到控制台界面。
	 */
	Console.prototype.warn = function(text) {
		this.rawConsole.warn(text);
		this.println(text);
	};

	/** 打印指定文本信息到控制台界面。
	 */
	Console.prototype.error = function(text) {
		this.rawConsole.error(text);
		this.println(text);
	};

	/** 打印文本内容并换行。
	 */
	Console.prototype.println = function(content) {
		if (typeof(content) != 'string') {
			content = content.toString();
		}

		if (null != this.viewDom) {
			this._precheckCharCounts(content);

			var el = document.createElement('p');
			el.innerHTML = content.length > 0 ? content : '<br/>';
			this.viewDom.appendChild(el);
			this.viewDom.scrollTop = this.viewDom.scrollHeight;
		}
	};

	/** 清空打印信息。
	 */
	Console.prototype.clear = function() {
		this.viewDom.innerHTML = "";
		this.charCounts = 0;
	};

	/** 注册控制台命令。
	 */
	Console.prototype.register = function(cmd) {
		this.cmdNameMap[cmd.name] = cmd;
		this.cmdShortMap[cmd.short] = cmd;
	};

	/** 内置命令。
	 */
	Console.prototype._buildIn = function() {
		// help
		this.register({name: "help"
				, short: "help"
				, desc: "打印控制台帮助信息及命令清单。"
				, usage: "help"
				, exec: function(console, name, args) {
					console.println(console.prompt + name);
					console.println("控制台显示/隐藏快捷键：Ctrl + ~");
					console.println("控制台命令清单：");
					for (var n in console.cmdNameMap) {
						if (typeof(n) == 'string') {
							var cmd = console.cmdNameMap[n];
							console.println(n + "  -  " + cmd.desc);
						}
					}
					console.println("");
				}
			});

		// version/ver
		this.register({name: "version"
				, short: "ver"
				, desc: "打印控制台版本信息。"
				, usage: "version|ver"
				, exec: function(console, name, args) {
					console.println(console.prompt + name);
					console.log("Console version " + console.version + ", author 'Ambrose Xu'");
					console.println("");
				}
			});

		// clear/cls
		this.register({name: "clear"
				, short: "cls"
				, desc: "清空控制台界面内的所有打印信息。"
				, usage: "clear|cls"
				, exec: function(console, name, args) {
					console.clear();
				}
			});
	};

	Console.prototype._precheckCharCounts = function(content) {
		var chars = content.length;
		this.charCounts += chars;

		if (this.charCounts >= this.maxCharCounts) {
			this.viewDom.innerHTML = "";
			this.charCounts = chars;
		}
	};

	Console.prototype._processInput = function() {
		var text = this.inputDom.value;
		if (text.length <= 0) {
			return;
		}

		// 分拆命令
		var name = null;
		var args = "";
		var index = text.indexOf(" ");
		if (index == 0) {
			return;
		}
		else if (index < 0) {
			name = text;
		}
		else {
			name = text.substr(0, index);
			args = text.substr(index + 1, text.length - index);
		}

		// 清空输入框
		this.inputDom.value = "";

		var cmd = this.cmdNameMap[name];
		if (undefined === cmd || null == cmd)
			cmd = this.cmdShortMap[name];
		if (null == cmd) {
			this.println("Unknown command: " + name);
			this.println("");
			return;
		}

		// 执行命令
		cmd.exec(this, name, args);
	};

	Console.prototype._onKeyDown = function(event) {
		if (event.keyCode == 17)
			this.hotKeyCtrl = true;
	};

	Console.prototype._onKeyUp = function(event) {
		// C - 67，~ - 192
		if (event.keyCode == 192 && this.hotKeyCtrl) {
			if (this.dom.style.visibility == 'visible')
				this.close();
			else
				this.open();
		}
		else if (event.keyCode == 17) {
			this.hotKeyCtrl = false;
		}
		else if (event.keyCode == 13) {
			// 回车
			this._processInput();
		}
	};
});
