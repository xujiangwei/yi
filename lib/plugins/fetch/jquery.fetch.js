/**
 * Fetch v1.0.0
 * 
 * Fetch 是用于通过 Ajax 方式加载页面片段程序到指定页面内容的 jQuery 插件。
 * 
 * @author Jiangwei Xu
 * 
 * @param {Object} options
 * {
 *     ui: 'modules/dhc/ui.html',
 *     styles: ['dhc1.css', 'dhc2.css'],
 *     scripts: ['modules/dhc/main.js', 'modules/dhc/dhc.js'],
 *     error: function(el) {}
 * }
 */

(function($){
	$.fn.fetch = function(options) {
		var defaults = {
			styles: []
			, scripts: []
			, error: function() {}
		};

		// 属性与参数
		var options = $.extend(defaults, options);

		this.each(function() {
			if (options['ui'] !== 'undefined') {
				var self = $(this);
				self.load(options['ui'], function(response, status, xhr){
					if (status == 'success') {
						// 加载界面成功
						// 加载样式表文件
						if (options.styles.length > 0) {
							for (var i = 0, size = options.styles.length; i < size; ++i) {
								loadLink(options.styles[i]);
							}
						}
						// 加载脚本文件
						if (options.scripts.length > 0) {
							for (var i = 0, size = options.scripts.length; i < size; ++i) {
								loadScript(options.scripts[i]);
							}
						}
					}
					else {
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
		var link = document.createElement("link");
		link.type = "text/css";
		link.rel  = "stylesheet";
		link.href  = url;
		var head = document.getElementsByTagName("head")[0];
		head.appendChild(link);
	};

	// 加载脚本
	function loadScript(url) {
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.src = url;
		document.body.appendChild(script);
	}

	// 用于缓存已加载样式表和脚本的缓存
	var cache = {
		ready: false

		, init: function() {
			cache.ready = true;
			if (window.store !== 'undefined') {
				
			}
		}
	};

	cache.init();

})(jQuery);
