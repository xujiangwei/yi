/**
 * Fetch v1.0.0
 * 
 * Fetch 是用于通过 Ajax 方式加载页面片段程序到指定页面内容的 jQuery 插件。
 * 
 * @author Jiangwei Xu
 * 
 * @param {Object} options
 * {
 *     context: "../",						// 当前站点上下文路径
 *     html: 'modules/dhc/dhc.html',		// html 文件
 *     tmpl: 'modules/dhc/dhc.tmpl',		// html 模板
 *     params: {},							// URL 参数
 *     styles: ['modules/dhc/dhc1.css', 'modules/dhc/dhc2.css'],
 *     scripts: ['modules/dhc/dhc1.js', 'modules/dhc/dhc2.js'],
 *     main: function(parent, args) {},
 *     args: {},
 *     error: function(el) {},				// 错误处理函数
 *     done: function(container, payload) {},	// 处理完成回调
 *     debug: false							// 是否调试模式
 * }
 *
 * debug: {
 *     startTime: new Date(),
 *     htmlEndTime: new Date(),
 *     scriptsEndTime: new Date(),
 *     endTime: new Date(),
 *     tmplElapsed: 1000					// 模板解析耗时
 * }
 *
 * @note html 和 tmpl 两个参数只能二选一使用。
 */

(function($){
	
	/**
	 * jQuery Fetch
	 */
	$.fn.fetch = function(options, payload) {
		// 默认设置
		var defaults = {
			params: null
			, styles: []
			, scripts: []
			, main: null
			, args: null
			, context: null
			, error: function() {}
			, done: function() {}
			, debug: false
		};
		// 属性与参数
		var options = $.extend(defaults, options);

		// 容器自己
		var pself = $(this);

		// 判断是否调试
		var debug = options.debug ? {} : null;
		if (null != debug) {
			// 设置 debug 数据到容器
			pself.data("debug", debug);
			// 记录开始时间
			debug.startTime = new Date();
		}

		// 附加额外数据
		if (payload !== undefined) {
			pself.data("payload", payload);
		}

		// 解析 args 为 URL 格式
		var params = options.params;
		if (null != params) {
			var p = new Array();
			for (var o in params) {
				if (params.hasOwnProperty(o)) {
					p.push(o + "=" + params[o]);
				}
			}
			// 拼接参数串
			params = p.join('&');
		}

		this.each(function() {
			var self = $(this);
			// 加载样式表文件
			if (options.styles.length > 0) {
				for (var i = 0, size = options.styles.length; i < size; ++i) {
					loadLink(options.styles[i]);
				}
			}

			// 判断界面片段
			if (options['html'] !== undefined && options['html'] != null) {
				// 加载 HTML 片段
				var url = options['html'];
				if (null != params)
					url += "?" + params;
				// jQuery#load
				self.load(url, function(response, status, xhr) {
					// 记录 HTML 结束时间
					if (null != debug) {
						debug.htmlEndTime = new Date();
					}

					if (status == 'success') {
						// 加载成功
						// 加载脚本文件
						if (options.scripts.length > 0) {
							var counts = 0;
							var maxCounts = options.scripts.length;
							var main = options.main;
							// 加载完成回调
							var loadedCallback = function() {
								++counts;
								if (maxCounts == counts && null != main) {
									// 记录脚本结束时间
									if (null != debug) {
										debug.scriptsEndTime = new Date();
									}

									if (null != main && typeof(main) == 'string') {
										var f = eval(main);
										f.call(null, pself, options.args, payload);
									}
									else if (null != main) {
										main.call(null, pself, options.args, payload);
									}

									// 记录结束时间
									if (null != debug) {
										debug.endTime = new Date();
									}

									// 完成加载
									options.done.call(null, pself, payload);
								}
							};
							// 执行压缩方式加载
							compressLoad(options.scripts, loadedCallback);
							/* 以下为非压缩方式
							for (var i = 0, size = options.scripts.length; i < size; ++i) {
								loadScript(options.scripts[i], loadedCallback);
							}*/
						}
						else {
							// 记录加载结束时间
							if (null != debug) {
								debug.scriptsEndTime = new Date();
								debug.endTime = debug.scriptsEndTime;
							}

							// 完成加载
							options.done.call(null, pself, payload);
						}
					}
					else {
						// 加载失败
						options.error.call(null, self);
					}
				});
			}
			else if (options['tmpl'] !== undefined) {
				// 模板界面
				var url = options['tmpl'];
				if (null != params)
					url += "?" + params;
				// jQuery#ajax
				$.ajax(url, {
					async: true
					, mimeType: 'text/plain; charset=utf-8'
					, cache: false
				})
				.done(function(data) {
					var tmplArgs = (null != options.args) ? options.args : {};
					if (null != options.context) {
						// 将 options 设置里的 context 作为模板参数传入模板
						tmplArgs["context"] = options.context;
					}

					// 模板耗时
					var tmplStart;
					if (null != debug) {
						tmplStart = (new Date()).getTime();
					}

					var content = tmpl(data, tmplArgs);
					if (typeof(content) == 'function') {
						content = content();
					}

					if (null != debug) {
						// 计算模板耗时
						debug.tmplElapsed = (new Date()).getTime() - tmplStart;
					}

					// 替换 HTML 代码
					self.html(content);

					// 记录 HTML 结束时间
					if (null != debug) {
						debug.htmlEndTime = new Date();
					}

					// 加载脚本
					if (options.scripts.length > 0) {
						var counts = 0;
						var maxCounts = options.scripts.length;
						var main = options.main;
						// 加载完成回调
						var loadedCallback = function() {
							++counts;
							if (maxCounts == counts && null != main) {
								// 记录脚本结束时间
								if (null != debug) {
									debug.scriptsEndTime = new Date();
								}

								if (null != main && typeof(main) == 'string') {
									var f = eval(main);
									f.call(null, pself, options.args, payload);
								}
								else if (null != main) {
									main.call(null, pself, options.args, payload);
								}

								// 记录结束时间
								if (null != debug) {
									debug.endTime = new Date();
								}

								// 完成加载
								options.done.call(null, pself, payload);
							}
						};
						// 执行压缩方式加载
						compressLoad(options.scripts, loadedCallback);
						/* 以下为非压缩方式
						for (var i = 0, size = options.scripts.length; i < size; ++i) {
							loadScript(options.scripts[i], loadedCallback);
						}*/
					}
					else {
						// 记录加载结束时间
						if (null != debug) {
							debug.scriptsEndTime = new Date();
							debug.endTime = debug.scriptsEndTime;
						}

						// 完成加载
						options.done.call(null, pself, payload);
					}
				});
			}
			else if (options.scripts.length > 0) {
				// 无界面、有脚本
				// 记录 HTML 结束时间
				if (null != debug) {
					debug.htmlEndTime = debug.startTime;
				}

				var counts = 0;
				var maxCounts = options.scripts.length;
				var main = options.main;
				// 加载完成回调
				var loadedCallback = function() {
					++counts;
					if (maxCounts == counts && null != main) {
						// 记录脚本结束时间
						if (null != debug) {
							debug.scriptsEndTime = new Date();
						}

						if (null != main && typeof(main) == 'string') {
							var f = eval(main);
							f.call(null, pself, options.args, payload);
						}
						else if (null != main) {
							main.call(null, pself, options.args, payload);
						}

						// 记录结束时间
						if (null != debug) {
							debug.endTime = new Date();
						}

						// 完成加载
						options.done.call(null, pself, payload);
					}
				};
				// 执行压缩方式加载
				compressLoad(options.scripts, loadedCallback);
				/* 以下为非压缩方式
				for (var i = 0, size = options.scripts.length; i < size; ++i) {
					loadScript(options.scripts[i], loadedCallback);
				}*/
			}
			else {
				options.error.call(null, self);
			}
		});
	}

	// 本地关系集合
	var scriptRelationSet = {};
	var callbackSetKey = [];
	var callbackSet = {};
	// 本地定时器
	var localTimer = 0;

	// 压缩加载，解决瞬时相同 URL 脚本被重复加载的问题
	function compressLoad(list, callback) {
		for (var i = 0, size = list.length; i < size; ++i) {
			var url = list[i];
			var v = scriptRelationSet[url];
			if (typeof v == 'undefined') {
				// 没有对应的 URL，直接执行加载
				loadScript(url, function() {
					callback.call(null);
				});
				// 记录脚本 URL
				scriptRelationSet[url] = true;
			}
			else {
				// 发现有重复，追加记录
				if (callbackSetKey.indexOf(url) < 0)
					callbackSetKey.push(url);

				var array = callbackSet[url];
				if (typeof array == 'undefined')
					array = [];
				array.push(callback);
				callbackSet[url] = array;
			}
		}

		// 启动轮询
		if (callbackSetKey.length > 0) {
			if (localTimer > 0)
				clearTimeout(localTimer);
			localTimer = setTimeout(polling, 60);
		}
	}

	function polling() {
		clearTimeout(localTimer);
		localTimer = 0;

		var completedList = [];
		for (var i = 0; i < callbackSetKey.length; ++i) {
			var url = callbackSetKey[i];
			if (cache.checkScriptCached(url)) {
				// 获取回调函数列表
				var array = callbackSet[url];
				for (var n = 0; n < array.length; ++n) {
					(array[n]).call(null);
				}

				completedList.push(url);
			}
		}

		if (completedList.length > 0) {
			// 删除已完成加载
			for (var i = 0; i < completedList.length; ++i) {
				var url = completedList[i];
				var index = callbackSetKey.indexOf(url);
				if (index >= 0) {
					callbackSetKey.splice(index, 1);
				}
			}

			completedList.splice(0, completedList.length);
		}
		completedList = null;

		if (callbackSetKey.length > 0) {
			// 继续轮询
			localTimer = setTimeout(polling, 60);
			return;
		}

		// 执行清理
		scriptRelationSet = {};
		callbackSet = {};
	}

	// 加载样式表
	function loadLink(url) {
		if (!cache.checkStyleCached(url)) {
			var link = document.createElement("link");
			link.type = "text/css";
			link.rel  = "stylesheet";
			link.href  = url;// + "?_=" + (new Date()).getTime();
			var head = document.getElementsByTagName("head")[0];
			head.appendChild(link);

			// 缓存样式表记录
			cache.cacheStyle(url);
		}
	}

	// 加载脚本
	function loadScript(url, loadedCallback) {
		var surl = url.toString();
		if (!cache.checkScriptCached(surl)) {
			var script = document.createElement("script");
			script.type = "text/javascript";
			script.src = surl;// + "?_=" + (new Date()).getTime();
			if (loadedCallback !== undefined) {
				script.onload = function() {
					// 缓存脚本记录
					cache.cacheScript(surl);

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
		styleMap: null
		, scriptMap: null

		, init: function() {
			cache.styleMap = {};
			cache.scriptMap = {};
		}

		, cacheScript: function(url) {
			cache.scriptMap[url] = true;
		}

		, cacheStyle: function(url) {
			cache.styleMap[url] = true;
		}

		// 如果脚本已经被缓存则返回 true，否则返回 false
		, checkScriptCached: function(url) {
			var value = cache.scriptMap[url];
			if (typeof value == 'undefined') {
				// 未缓存
				return false;
			}
			else {
				// 已缓存
				return true;
			}
		}

		// 如果样式表已经被缓存则返回 true，否则返回 false
		, checkStyleCached: function(url) {
			var value = cache.styleMap[url];
			if (typeof value == 'undefined') {
				// 未缓存
				return false;
			}
			else {
				// 已缓存
				return true;
			}
		}
	};

	// 初始化
	cache.init();

	// 简易模板，来自 http://ejohn.org/blog/javascript-micro-templating/
	(function() {
		var cache = {};

		this.tmpl = function tmpl(str, data) {
			// Figure out if we're getting a template, or if we need to
			// load the template - and be sure to cache the result.
			var fn = !/\W/.test(str) ?
				cache[str] = cache[str] ||
				tmpl(document.getElementById(str).innerHTML) :

				// Generate a reusable function that will serve as a template
				// generator (and which will be cached).
				new Function("obj",
					"var p=[], print=function(){p.push.apply(p,arguments);};" +
					// Introduce the data as local variables using with(){}
					"with(obj){p.push('" +

					// Convert the template into pure JavaScript
					str.replace(/[\r\t\n]/g, " ")
						.split("<%").join("\t")
						.replace(/((^|%>)[^\t]*)'/g, "$1\r")
						.replace(/\t=(.*?)%>/g, "',$1,'")
						.split("\t").join("');")
						.split("%>").join("p.push('")
						.split("\r").join("\\'")
					+ "');}return p.join('');");

			// Provide some basic currying to the user
			return data ? fn( data ) : fn;
		};
	})();

})(jQuery);
