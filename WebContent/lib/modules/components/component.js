/**
 * Component Base Class
 */
define(function(require, exports, module) {
	'require:nomunge,exports:nomunge,module:nomunge';

	var cu = require('lib/utils/coreUtil');
	var extend = require('lib/utils/extend');
	var Map = require('lib/utils/hashmap-cmd');
	var Observable = require('lib/utils/observable');

	// 组件管理
	var components = new Map();

	// 处理style
	var cssRe = /([a-z0-9-]+)\s*:\s*([^;\s]+(?:\s*[^;\s]+)*);?/gi;

	function applyStyles(el, styles) {
		if (styles) {
			el = $(el);
			if (cu.isObject(styles)) {
				el.css(styles);
			}
			var matches;
			if (cu.isString(styles)) {
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
		function Base(config) {
			config = config || {};
			/**
			 * This Component's initial configuration specification. Read-only.
			 * 
			 * @type Object
			 * @property initialConfig
			 */
			this.initialConfig = config;
			cu.apply(this, config);

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

			Base.register(this);

			Base.superclass.constructor.call(this);

			this.initComponent();

			if (this.applyTo) {
				this.applyToMarkup(this.applyTo);
				delete this.applyTo;
			} else if (this.renderTo) {
				this.render(this.renderTo);
				delete this.renderTo;
			}
		}

		extend(Base, Observable, {
					/**
					 * @cfg id String
					 * 
					 * 不指定则自动赋值
					 */
					/**
					 * @cfg applyTo String
					 * 
					 * 已有DOM的id，将其应用于组件。该DOM可能是组件的最外层元素或关键元素，视组件情况而定。组件初始化后，该DOM的jQuery对象将成为组件的私有属性el
					 */
					/**
					 * @cfg renderTo String
					 * 
					 * 只给出一个空白元素，交给组件渲染，renderTo的值就是该空白元素的id
					 */
					/**
					 * @cfg baseHtml String
					 * 
					 * 如果不是应用于已有的DOM，则按baseHtml动态构建，并且baseHtml的最外层元素的jQuery对象将成为组件的私有属性el
					 * 
					 * baseHtml由组件的默认配置指定
					 */
					/**
					 * @cfg baseCls String
					 * 
					 * 每种组件都可以定义一个样式类，它会被自动添加到组件的el上，方便组件创建自己的样式表。
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
					 * 隐藏组件的方式，hidden: true时，如果hideMode :
					 * ’display’，则组件隐藏且不占位（display: none）。如果hideMode :
					 * ’visibility’，则组件占位隐藏（visibility: hidden）
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
					 * 每个组件实例可以拥有自定义的内联样式，它会被自动添加到组件的el上，方便使用者修改组件实例的样式
					 */
					disabledCls : 'disabled',
					/**
					 * @cfg listeners Object
					 * 
					 * 每个组件实例可以拥有自定义的内联样式，它会被自动添加到组件的el上，方便使用者修改组件实例的样式
					 */
					/**
					 * @cfg permission Object
					 * 
					 * 每个组件实例可以拥有自定义的内联样式，它会被自动添加到组件的el上，方便使用者修改组件实例的样式
					 */

					/**
					 * 返回组件id
					 */
					getId : function() {
						return this.id || (this.id = cu.id('comp'));
					},
					// 扩展点
					initComponent : cu.emptyFn,
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
							this.container = $(container);
							// if (this.ctCls) {
							// this.container.addClass(this.ctCls);
							// }
							this.rendered = true;
							if (position !== undefined) {
								if (cu.isNumber(position)) {
									position = this.container[0].childNodes[position];
								} else {
									position = $(position)[0];
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
							}
							// 此处不触发事件
							if (this.disabled) {
								this._disable();
							}
							// require jquery.permission
							if (this.permission) {
								this.el.permission(this.permission);
							}
						}
						return this;
					},
					// 扩展点
					onRender : function(ct, position) {
						if (!this.el) {
							if (cu.isString(this.baseHtml)) {
								this.el = $(this.baseHtml);
							} else {
								this.el = $('<div></div');
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
					afterRender : cu.emptyFn,
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
							this.hidden = false;
							if (this.rendered) {
								this.onShow();
							}
							this.trigger('show', this);
						}
						return this;
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
								// Stop any buffered tasks
								// if (this.focusTask && this.focusTask.cancel)
								// {
								// this.focusTask.cancel();
								// }
								this.onDestroy();
								Base.unregister(this);
								this.trigger('destroy', this);
								this.purgeListeners();
								this.destroying = false;
								this.destroyed = true;
							}
						}
					},
					// 扩展点
					beforeDestroy : cu.emptyFn,
					// 扩展点
					onDestroy : cu.emptyFn
				});

		// manage components
		Base.register = function(c) {
			var key = c.getId();
			if (components.containsKey(key)) {
				components.remove(key);
			}
			components.put(key, c);
		}

		Base.unregister = function(c) {
			components.remove(c);
		}

		Base.get = function(id) {
			return components.get(id);
		}

		module.exports = Base;
	}());
});