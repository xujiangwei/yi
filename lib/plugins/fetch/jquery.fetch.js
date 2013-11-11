/**
 * Fetch v1.0.0
 * 
 * Fetch 是用于通过 Ajax 方式加载页面片段程序到指定页面内容的 jQuery 插件。
 * 
 * @author Jiangwei Xu
 * 
 * @param {Object} options
 * {
 *     html: 'modules/dhc/dhc.html',
 *     styles: ['modules/dhc/dhc1.css', 'modules/dhc/dhc2.css'],
 *     scripts: ['modules/dhc/dhc1.js', 'modules/dhc/dhc2.js'],
 *     main: function(args) {},
 *     args: 'main-args',
 *     error: function(el) {}
 * }
 */

(function($){
	$.fn.fetch = function(options) {
		var defaults = {
			styles: []
			, scripts: []
			, main: null
			, mainArgs: null
			, error: function() {}
		};

		// 属性与参数
		var options = $.extend(defaults, options);

		this.each(function() {
			if (options['html'] !== undefined) {
				var self = $(this);
				// 加载样式表文件
				if (options.styles.length > 0) {
					for (var i = 0, size = options.styles.length; i < size; ++i) {
						loadLink(options.styles[i]);
					}
				}

				// 加载 HTML 片段
				self.load(options['html'], function(response, status, xhr) {
					if (status == 'success') {
						// 加载成功
						// 加载脚本文件
						if (options.scripts.length > 0) {
							var counts = 0;
							var maxCounts = options.scripts.length;
							var main = options.main;
							var loadedCallback = function() {
								++counts;
								if (maxCounts == counts && null != main) {
									main.call(null, options.args);
								}
							};
							for (var i = 0, size = options.scripts.length; i < size; ++i) {
								loadScript(options.scripts[i], loadedCallback);
							}
						}
					}
					else {
						// 加载失败
						options.error.call(null, self);
					}
				});
			}
			else {
				options.error.call(null, self);
			}
		});
	};

	// 加载样式表
	function loadLink(url) {
		if (!cache.checkStyleCached(url)) {
			var link = document.createElement("link");
			link.type = "text/css";
			link.rel  = "stylesheet";
			link.href  = url;
			var head = document.getElementsByTagName("head")[0];
			head.appendChild(link);
		}
	};

	// 加载脚本
	function loadScript(url, loadedCallback) {
		if (!cache.checkScriptCached(url)) {
			var script = document.createElement("script");
			script.type = "text/javascript";
			script.src = url;
			if (loadedCallback !== undefined) {
				script.onload = function() {
					loadedCallback.call(null);
				};
			}
			document.body.appendChild(script);
		}
		else {
			loadedCallback.call(null);
		}
	}

	// 用于缓存已加载样式表和脚本的缓存
	var cache = {
		pageStyle: "jquery.fetch.style"
		, pageScript: "jquery.fetch.script"
		, styleMap: null
		, scriptMap: null

		, init: function() {
			var page = window.location.href;
			cache.pageStyle = page + '#css';
			cache.pageScript = page + '#js';
			if (window.store !== undefined) {
				window.store.remove(cache.pageStyle);
				window.store.remove(cache.pageScript);
			}
			else {
				cache.styleMap = {};
				cache.scriptMap = {};
			}
		}

		// 如果脚本已经被缓存则返回 true，否则返回 false
		, checkScriptCached: function(url) {
			if (null == cache.scriptMap) {
				var s = window.store.get(cache.pageScript);
				if (s != null && s !== undefined) {
					var obj = JSON.parse(s);
					var list = obj.scripts;
					if (list.indexOf(url) >= 0) {
						// 已经缓存
						return true;
					}
					else {
						// 未缓存
						list.push(url);
						var nv = JSON.stringify({"scripts":list});
						window.store.set(cache.pageScript, nv);
						return false;
					}
				}
				else {
					// 未缓存
					var newValue = JSON.stringify({"scripts":[url]});
					window.store.set(cache.pageScript, newValue);
					return false;
				}
			}
			else {
				var value = cache.scriptMap[url];
				if (value != null && value !== undefined) {
					// 已经缓存
					return true;
				}
				else {
					// 未缓存
					cache.scriptMap[url] = true;
					return false;
				}
			}
		}

		// 如果样式表已经被缓存则返回 true，否则返回 false
		, checkStyleCached: function(url) {
			if (null == cache.styleMap) {
				var s = window.store.get(cache.pageStyle);
				if (s != null && s !== undefined) {
					var obj = JSON.parse(s);
					var list = obj.styles;
					if (list.indexOf(url) >= 0) {
						// 已经缓存
						return true;
					}
					else {
						// 未缓存
						list.push(url);
						var nv = JSON.stringify({"styles":list});
						window.store.set(cache.pageStyle, nv);
						return false;
					}
				}
				else {
					// 未缓存
					var newValue = JSON.stringify({"styles":[url]});
					window.store.set(cache.pageStyle, newValue);
					return false;
				}
			}
			else {
				var value = cache.styleMap[url];
				if (value != null && value !== undefined) {
					// 已经缓存
					return true;
				}
				else {
					// 未缓存
					cache.styleMap[url] = true;
					return false;
				}
			}
		}
	};

	// 初始化
	cache.init();

})(jQuery);
