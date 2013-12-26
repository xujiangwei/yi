/**
 * PageLoader 可以加载页面的组件
 * 
 * @author wensong, wensong@dhcc.com.cn, 2013-12-18
 * 
 * @extends component
 * 
 * @requires utils, extend, component
 * 
 * @method void load(Object option)
 * 
 * @event load function(PageLoader c)
 * 
 * @description updated on 2013-12-26
 * 
 */
define(function(require, exports, module) {
	'require:nomunge,exports:nomunge,module:nomunge';

	var utils = require('utils');
	var extend = require('extend');
	var Base = require('component');

	function onLoadSuccess(data, textStatus, jqXhr) {
		// console.info('onLoadSuccess')
		if (this.componentId) {
			var comp = Base.get(this.componentId);
			comp.processSuccess(jqXhr.responseText);

			comp = null;
		}

		delete this.componentId;
	}

	function onLoadFailure(jqXhr, textStatus, errorThrown) {
		// console.info('onLoadFailure')
		if (this.componentId) {
			var comp = Base.get(this.componentId);
			comp.processFailure();

			comp = null;
		}

		delete this.componentId;
	}

	var Event;

	(function() {
		var POLL_RETRYS = 200, POLL_INTERVAL = 20;

		var loadComplete = false, retryCount = 0, onAvailStack = [], _interval, locked = false;

		function _tryPreloadAttach() {
			var ret = false, notAvail = [], element, i, v, override, tryAgain = !loadComplete
					|| (retryCount > 0);

			if (!locked) {
				locked = true;

				for (i = 0; i < onAvailStack.length; ++i) {
					v = onAvailStack[i];
					if (v && (element = document.getElementById(v.id))) {
						if (!v.checkReady || loadComplete
								|| element.nextSibling
								|| (document && document.body)) {
							override = v.override;
							element = override ? (override === true
									? v.obj
									: override) : element;
							v.fn.call(element, v.obj);
							onAvailStack.splice(v);
							--i;
						} else {
							notAvail.push(v);
						}
					}
				}

				retryCount = (notAvail.length === 0) ? 0 : retryCount - 1;

				if (tryAgain) {
					startInterval();
				} else {
					clearInterval(_interval);
					_interval = null;
				}
				ret = !(locked = false);
			}
			return ret;
		}

		function startInterval() {
			if (!_interval) {
				var callback = function() {
					_tryPreloadAttach();
				};
				_interval = setInterval(callback, POLL_INTERVAL);
			}
		}

		Event = {
			onAvailable : function(p_id, p_fn, p_obj, p_override) {
				onAvailStack.push({
							id : p_id,
							fn : p_fn,
							obj : p_obj,
							override : p_override,
							checkReady : false
						});

				retryCount = POLL_RETRYS;
				startInterval();
			}
		};
	}());

	(function() {
		var scriptRe = /(?:<script.*?>)((\n|\r|.)*?)(?:<\/script>)/ig, scriptRe2 = /(?:<script([^>]*)?>)((\n|\r|.)*?)(?:<\/script>)/ig, srcRe = /\ssrc=([\'\"])(.*?)\1/i, typeRe = /\stype=([\'\"])(.*?)\1/i;

		PageLoader = extend(Base, {
			baseCls : 'yi-page-loader',

			/**
			 * @cfg autoLoad Boolean 是否自动加载
			 */
			autoLoad : true,

			/**
			 * @cfg url String
			 * 
			 * 组件中加载的页面URL
			 */

			/**
			 * @cfg params Object
			 * 
			 * 请求页面时的额外参数
			 */

			/**
			 * @cfg async Boolean
			 * 
			 * 是否异步加载
			 */

			/**
			 * @cfg timeout Number
			 * 
			 * 超时
			 */
			timeout : 60000,

			/**
			 * @cfg loadScripts
			 * 
			 * 是否加载页面中的脚本
			 */
			loadScripts : true,

			/**
			 * @cfg html String
			 * 
			 * 组件中放入的Html片段
			 */

			initComponent : function() {
				PageLoader.superclass.initComponent.call(this);

				this.addEvents('load');
			},
			afterRender : function(container) {
				PageLoader.superclass.afterRender.call(this, container);

				if (this.autoLoad) {
					this.load({
								url : this.url,
								params : this.params
							});
				} else if (this.html) {
					this.el.html(this.html);
					this.trigger('load', this);
				}
			},
			/**
			 * @augments option {} 1)url String: URL 2)params Object: 额外的参数
			 *           3)async Boolean: 是否异步加载 4)timeout Number: 超时
			 */
			load : function(option) {
				if (this.rendered) {
					option = option || {};
					this.url = option.url || this.url;
					this.params = option.params || this.params;
					this.async = option.async !== undefined
							? option.async
							: this.async;
					this.timeout = option.timeout !== undefined
							? option.timeout
							: this.timeout;

					if (this.url) {
						this.doLoad(this.url, this.params, this.async,
								this.timeout, onLoadSuccess, onLoadFailure,
								this.getId());
					}
				}
			},
			doLoad : function(url, params, async, timeout, success, failure,
					componentId) {
				$.ajax({
							url : url,
							data : params || null,
							traditional : false,
							async : async === true ? true : false,
							timeout : timeout,
							// complete : callback,
							success : success,
							error : failure,
							// scope : scope,
							componentId : componentId
						});
			},
			processSuccess : function(html) {
				if (this.el) {
					this.html = html || '';

					if (this.loadScripts === true) {
						// 确保Html先于Script
						var id = utils.id();
						html += '<span id="' + id + '"></span>';
						this.hookId = id;

						Event.onAvailable(id, this.doLoadScripts, this);

						this.el.html(html.replace(scriptRe, ''));
					} else {
						this.el.html(html);
					}

					this.trigger('load', this);
				}
			},
			doLoadScripts : function() {
				var hd = document.getElementsByTagName('head')[0], match, attrs, srcMatch, typeMatch, el, s;

				while ((match = scriptRe2.exec(this.html))) {
					attrs = match[1];
					srcMatch = attrs ? attrs.match(srcRe) : false;
					if (srcMatch && srcMatch[2]) {
						s = document.createElement('script');
						s.src = srcMatch[2];
						typeMatch = attrs.match(typeRe);
						if (typeMatch && typeMatch[2]) {
							s.type = typeMatch[2];
						}
						hd.appendChild(s);
					} else if (match[2] && match[2].length > 0) {
						if (window.execScript) {
							window.execScript(match[2]);
						} else {
							window.eval(match[2]);
						}
					}
				}

				var el = $('#' + this.hookId);
				if (el.size() > 0) {
					el.remove();
				}

				el = null;
				hd = null;

				delete this.hookId;
			},
			processFailure : function() {

			}
		});

		module.exports = PageLoader;
	}());
});