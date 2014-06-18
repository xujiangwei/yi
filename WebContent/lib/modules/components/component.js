/**
 * Component Base Class
 * 
 * @requires utils, extend, observable
 * 
 * @extends component
 * 
 * @method String getId()
 * @method void render(Mixed parent[, Mixed position])
 * @method void hide()
 * @method void show()
 * @method void enable()
 * @method void disable()
 * @method void focus()
 * @method void blur()
 * @method void on(String eventName, Functon listener, Object scope)
 * @method void off(String eventName[, Functon listener])
 * @method trigger(String eventName[, args])
 * @method Object getEl()
 * @method Object getPosition()
 * @method Number getWidth()
 * @method Number getHeight()
 * @method Object getInitialConfig()
 * @method void destroy()
 * 
 * @event render function(Component c)
 * @event beforehide function(Component c)
 * @event hide function(Component c)
 * @event beforeshow function(Component c)
 * @event show function(Component c)
 * @event disable function(Component c)
 * @event enable function(Component c)
 * @event focus function(Component c)
 * @event blur function(Component c)
 * @event beforedestroy function(Component c)
 * @event destroy function(Component c)
 * 
 * @description updated on 2014-06-17
 */
define(function(require, exports, module) {
	'require:nomunge,exports:nomunge,module:nomunge';

	var utils = require('utils');
	var extend = require('extend');
	var Observable = require('observable');
	var Map = require('map');

	// 组件管理
	var components = new Map();

	function get(id) {
		var el;
		if (utils.isString(id)) {
			el = $(id);// selector
			if (el.size() == 0) {
				el = $('#' + id);// id
			}
		} else {
			el = $(id);// jqObject or DOM
		}
		return el;
	}

	// 处理style
	var cssRe = /([a-z0-9-]+)\s*:\s*([^;\s]+(?:\s*[^;\s]+)*);?/gi;

	function applyStyles(el, styles) {
		if (styles) {
			el = $(el);
			if (utils.isObject(styles)) {
				el.css(styles);
			}
			var matches;
			if (utils.isString(styles)) {
				/**
				 * Since we're using the g flag on the regex, we need to set the
				 * lastIndex. This automatically happens on some
				 * implementations, but not others, see:
				 * http://stackoverflow.com/questions/2645273/javascript-regular-expression-literal-persists-between-function-calls
				 * http://blog.stevenlevithan.com/archives/fixing-javascript-regexp
				 */
				cssRe.lastIndex = 0;
				while ((matches = cssRe.exec(styles))) {
					el.css(matches[1], matches[2]);
				}
			}
		}
	}

	// 处理overCls
	function hoverClass(el, cls) {
		if (cls) {
			el = $(el);
			el.hover(addClassOnMouseenter(cls), removeClassOnMouseleave(cls));
		}
	}

	function addClassOnMouseenter(cls) {
		return function() {
			$(this).addClass(cls);
		}
	}

	function removeClassOnMouseleave(cls) {
		return function() {
			$(this).removeClass(cls);
		}
	}

	(function() {
		// 
		function Component(config) {
			config = config || {};
			/**
			 * This Component's initial configuration specification. Read-only.
			 * 
			 * @type Object
			 * @property initialConfig
			 */
			this.initialConfig = config;
			utils.apply(this, config);

			this.addEvents('render',

			'beforehide',

			'hide',

			'beforeshow',

			'show',

			'disable',

			'enable',

			'focus',

			'blur',

			'beforedestroy',

			'destroy');

			this.getId();

			Component.register(this);

			Component.superclass.constructor.call(this);

			this.initComponent();

			if (this.applyTo) {
				this.applyToMarkup(this.applyTo);
				delete this.applyTo;
			} else if (this.renderTo) {
				this.render(this.renderTo);
				delete this.renderTo;
			}
		}

		extend(Component, Observable, {
			/**
			 * @cfg id String
			 * 
			 * 为组件实例指定一个唯一标识，不指定则自动赋值
			 */

			/**
			 * @cfg applyTo String
			 * 
			 * 指定一个节点，将其应用于组件实例。该节点将成为组件的最外层元素或关键元素，applyTo的值就是该节点的id。组件渲染（render()）后，该节点的jQuery对象将成为组件的私有属性el
			 */

			/**
			 * @cfg renderTo String
			 * 
			 * 指定一个节点，在其内部按组件的baseHtml构建新的子节点作为组件的el，renderTo的值就是父节点的id
			 */

			/**
			 * @cfg baseHtml String
			 * 
			 * 如果不是应用于已有的节点，则按baseHtml动态构建，并且baseHtml的最外层元素的jQuery对象将成为组件的私有属性el
			 * 
			 * baseHtml由组件的默认配置指定
			 */

			/**
			 * @cfg baseCls String
			 * 
			 * 每种组件都可以定义一个样式类，它会被自动添加到组件的el上，方便组件创建自己的样式表
			 * 
			 * baseCls由组件的默认配置指定
			 */

			/**
			 * @cfg cls String
			 * 
			 * 每个组件实例可以拥有自定义的样式类，它会被自动添加到组件的el上，方便使用者修改组件实例的样式
			 */

			/**
			 * @cfg style Object/String
			 * 
			 * 每个组件实例可以拥有自定义的内联样式，它会被自动添加到组件的el上，方便使用者修改组件实例的样式
			 */

			/**
			 * @cfg overCls String
			 * 
			 * 每种组件都可以定义一个样式类，当鼠标在组件的el上时，它会被自动添加到组件的el上，方便组件设置自己的高亮样式
			 * 
			 * overCls由组件的默认配置指定
			 */

			/**
			 * @cfg hidden Boolean
			 * 
			 * 渲染后是否隐藏
			 */

			/**
			 * @cfg hideMode String
			 * 
			 * 隐藏组件的方式，hidden : true时，如果hideMode : 'display'，则组件隐藏且不占位（display:
			 * none）。如果hideMode : 'visibility'，则组件占位隐藏（visibility: hidden）
			 */
			hideMode : 'display',

			/**
			 * @cfg disabled Boolean
			 * 
			 * 渲染后是否为不可用状态
			 */

			/**
			 * @cfg disabledCls String
			 * 
			 * 每种组件都可以定义一个不可用时的样式类，当组件不可用时，它会被自动添加到组件的el上，方便组件设置自己的不可用样式表
			 */
			disabledCls : 'disabled',

			/**
			 * @cfg listeners Object
			 * 
			 * {'eventName1': {fn: function(args){},scope: {}}[, event2...]}
			 * 
			 * 创建组件时就监听事件
			 */

			/**
			 * @cfg permission Object
			 * 
			 * {name: 'cigrid', method: 'hide'}
			 * 
			 * 组件权限控制，如果当前用户没有name属性的权限，则按照method属性的方法进行处理。method：'hide'、'disable'和'space'
			 */

			/**
			 * 返回组件id
			 */
			getId : function() {
				return this.id || (this.id = utils.id('comp'));
			},
			// 扩展点
			initComponent : utils.emptyFn,
			applyToMarkup : function(applyTo) {
				var selector = '#' + applyTo;
				this.allowDomMove = false;
				this.el = $(selector);
				this.render(this.el[0].parentNode);
			},
			/**
			 * 渲染组件
			 */
			render : function(container, position) {
				if (!this.rendered
						&& this.trigger('beforerender', this) !== false) {
					if (!container && this.el) {
						this.el = $(this.el);
						container = this.el[0].parentNode;
						this.allowDomMove = false;
					}
					this.container = get(container);
					// if (this.ctCls) {
					// this.container.addClass(this.ctCls);
					// }
					this.rendered = true;
					if (position !== undefined) {
						if (utils.isNumber(position)) {
							position = this.container[0].childNodes[position];
						} else {
							position = get(position)[0];
						}
					}
					this.onRender(this.container, position || null);
					// if (this.autoShow) {
					// this.el.removeClass(['x-hidden', 'x-hide-' +
					// this.hideMode]);
					// }
					if (this.baseCls) {
						this.el.addClass(this.baseCls);
					}
					if (this.cls) {
						this.el.addClass(this.cls);
						delete this.cls;
					}
					if (this.style) {
						applyStyles(this.el, this.style);
						delete this.style;
					}
					if (this.overCls) {
						hoverClass(this.el, this.overCls)
					}
					this.trigger('render', this);

					this.afterRender(this.container);

					// 此处不触发事件
					if (this.hidden) {
						this._hide();
					} else {
						this._show();
					}
					// 此处不触发事件
					if (this.disabled) {
						this._disable();
					}

					if (this.permission) {
						utils.permission(this, this.permission);
					}
				}
				return this;
			},
			// 扩展点
			onRender : function(ct, position) {
				if (!this.el) {
					if (utils.isString(this.baseHtml)) {
						this.el = $(this.baseHtml);
					} else {
						this.el = $('<div></div>');
					}
					if (!this.el.attr('id')) {
						this.el.attr('id', this.getId());
					}
				}
				if (this.el) {
					this.el = $(this.el);
					if (this.allowDomMove !== false) {
						ct[0].insertBefore(this.el[0], position);
					}
				}
			},
			// 扩展点
			afterRender : utils.emptyFn,
			/**
			 * 隐藏组件
			 */
			hide : function() {
				if (this.trigger('beforehide', this) !== false) {
					this._hide();
					this.trigger('hide', this);
				}
				return this;
			},
			_hide : function() {
				this.hidden = true;
				if (this.rendered) {
					this.onHide();
				}
			},
			// 扩展点
			onHide : function() {
				this.el.addClass('yi-hide-' + this.hideMode);
				// this.getVisibilityEl().addClass('x-hide-' +
				// this.hideMode);
			},
			/**
			 * 显示组件
			 */
			show : function() {
				if (this.trigger('beforeshow', this) !== false) {
					this._show();
					this.trigger('show', this);
				}
				return this;
			},
			_show : function() {
				this.hidden = false;
				if (this.rendered) {
					this.onShow();
				}
			},
			// 扩展点
			onShow : function() {
				this.el.removeClass('yi-hide-' + this.hideMode);
				// this.getVisibilityEl().removeClass('x-hide-' +
				// this.hideMode);
			},
			/**
			 * 使组件不可用
			 */
			disable : function() {
				this._disable();
				this.trigger('disable', this);
				return this;
			},
			_disable : function() {
				if (this.rendered) {
					this.onDisable();
				}
				this.disabled = true;
			},
			// 扩展点
			onDisable : function() {
				this.el.addClass(this.disabledCls);
				// this.getActionEl().addClass(this.disabledClass);
				// this.el.dom.disabled = true;
			},
			/**
			 * 使组件可用
			 */
			enable : function() {
				if (this.rendered) {
					this.onEnable();
				}
				this.disabled = false;
				this.trigger('enable', this);
				return this;
			},
			// 扩展点
			onEnable : function() {
				this.el.removeClass(this.disabledCls);
				// this.getActionEl().removeClass(this.disabledClass);
				// this.el.dom.disabled = false;
			},
			/**
			 * 使组件不可用
			 */
			focus : function() {
				if (!this.disabled) {
					this.onFocus();
					this.trigger('focus', this);
				}
				return this;
			},
			// 扩展点
			onFocus : function() {
				this.el.focus();
			},
			/**
			 * 使组件可用
			 */
			blur : function() {
				if (!this.disabled) {
					this.onBlur();
					this.trigger('blur', this);
				}
				return this;
			},
			// 扩展点
			onBlur : function() {
				this.el.blur();
			},
			/**
			 * 返回组件el（jQuery Object）
			 */
			getEl : function() {
				return this.el;
			},
			/**
			 * 返回组件el（jQuery Object）
			 */
			getPosition : function() {
				return this.el.position();
			},
			/**
			 * 返回组件el的宽
			 */
			getWidth : function() {
				return this.el.width();
			},
			/**
			 * 返回组件el的宽
			 */
			getHeight : function() {
				return this.el.height();
			},
			/**
			 * 返回组件el的宽
			 */
			getInitialConfig : function() {
				return this.initialConfig;
			},
			/**
			 * 销毁组件
			 */
			destroy : function() {
				if (!this.destroyed) {
					if (this.trigger('beforedestroy', this) !== false) {
						this.destroying = true;
						this.beforeDestroy();
						// if (this.ownerCt && this.ownerCt.remove) {
						// this.ownerCt.remove(this, false);
						// }
						if (this.rendered) {
							if (this.el) {
								this.el.remove();
								delete this.el;
							}
							// if (this.actionMode == 'container' ||
							// this.removeMode == 'container') {
							// this.container.remove();
							// }
						}
						delete this.container;
						// Stop any buffered tasks
						// if (this.focusTask && this.focusTask.cancel)
						// {
						// this.focusTask.cancel();
						// }
						this.onDestroy();
						Component.unregister(this);
						this.trigger('destroy', this);
						this.purgeListeners();
						this.destroying = false;
						this.destroyed = true;
					}
				}
			},
			// 扩展点
			beforeDestroy : utils.emptyFn,
			// 扩展点
			onDestroy : utils.emptyFn
		});

		// manage components
		Component.register = function(c) {
			var key = c.getId();
			if (components.containsKey(key)) {
				components.remove(key);
			}
			components.put(key, c);
		}

		Component.unregister = function(c) {
			components.remove(c);
		}

		Component.get = function(id) {
			return components.get(id);
		}

		module.exports = Component;
	}());
});