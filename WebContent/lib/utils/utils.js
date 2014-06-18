/**
 * 工具
 */
define(function(/* require */) {
	var Utils = {};

	/**
	 * 1.JavaScript基本对象类
	 */
	/**
	 * 类型判断
	 */
	(function(u) {
		function type(v) {
			var ts = Object.prototype.toString.call(v);// '[object Xx]'
			return ts.substring(8, ts.length - 1).toLowerCase();
		}

		function isArray(v) {
			return type(v) === 'array';
		}

		function isBoolean(v) {
			return type(v) === 'boolean';
		}

		function isDate(v) {
			return type(v) === 'date';
		}

		function isFunction(v) {
			return type(v) === 'function';
		}

		function isNumber(v) {
			return type(v) === 'number';
		}

		function isObject(v) {
			return type(v) === 'object';
		}

		function isRegexp(v) {
			return type(v) === 'regexp';
		}

		function isString(v) {
			return type(v) === 'string';
		}

		u.isArray = isArray;
		u.isBoolean = isBoolean;
		u.isDate = isDate;
		u.isFunction = isFunction;
		u.isNumber = isNumber;
		u.isObject = isObject;
		u.isRegexp = isRegexp;
		u.isString = isString;
	}(Utils));

	/**
	 * 判断一个对象是否为空（undefine、null、空字符串）
	 */
	(function(u) {
		function isEmpty(v, allowEmptyString) {
			return v === undefined || v === null
					|| (!allowEmptyString ? v === '' : false)
					|| (u.isArray(v) && v.length === 0);
		}

		u.isEmpty = isEmpty;
	}(Utils));

	/**
	 * 判断一个对象是否可迭代
	 */
	(function(u) {
		var nodeListRe = /NodeList|HTMLCollection/;

		function isIterable(v) {
			// check for array or arguments
			if (u.isArray(v) || v.callee) {
				return true;
			}
			// check for node list type
			if (nodeListRe.test(toString.call(v))) {
				return true;
			}
			// NodeList has an item and length property
			// IXMLDOMNodeList has nextNode method, needs to be checked
			// first.
			return ((v.nextNode !== undefined || v.item) && u
					.isNumber(v.length));
		}

		u.isIterable = isIterable;
	}(Utils));

	/**
	 * 判断一个对象是否是原始类型
	 */
	(function(u) {
		function isPrimitive(v) {
			return u.isString(v) || u.isNumber(v) || u.isBoolean(v);
		}

		u.isPrimitive = isPrimitive;
	}(Utils));

	/**
	 * 除去字符串开头和末尾的空格
	 */
	(function(u) {
		var trimRe = /^\s+|\s+$/g;

		function trim(v) {
			if (u.isString(v)) {
				return v.replace(trimRe, '');
			}
			return v;
		}

		u.trim = trim;
	}(Utils));

	/**
	 * 字符串首字母大写
	 */
	(function(u) {
		function firstLetterToUpperCase(str) {
			if (!u.isString(str)) {
				return '';
			}

			return str.charAt(0).toUpperCase() + str.substring(1);
		}

		u.firstLetterToUpperCase = firstLetterToUpperCase;
	}(Utils));

	/**
	 * 如果一个字符串的长度小于指定的值，则在字符串的左侧（也就是前面）用指定的字符填充，直到字符串长度达到最小值
	 */
	(function(u) {
		function leftPad(string, size, character) {
			var result = String(string);
			character = character || ' ';
			while (result.length < size) {
				result = character + result;
			}
			return result;
		}

		u.leftPad = leftPad;
	}(Utils));

	/**
	 * 2.DOM类
	 */
	/**
	 * 浏览器判断
	 */
	(function(u) {
		// I think window.ActiveXObject would be in IE for a long time
		var isIE = window.ActiveXObject !== undefined;

		u.isIE = isIE;
		// window.XMLHttpRequest IE7+
		u.isIE6 = isIE && !!(document.compatMode && !window.XMLHttpRequest);
		// document.documentMode IE8+
		u.isIE7 = isIE && !!(window.XMLHttpRequest && !document.documentMode);
		// window.performance IE9+
		u.isIE8 = isIE && !!(document.documentMode && !window.performance);
		// window.applicationCache IE10+
		u.isIE9 = isIE && !!(window.performance && !window.applicationCache);
		// window.msCrypto IE11+
		u.isIE10 = isIE && !!(window.applicationCache && !window.msCrypto);
		u.isIE11 = isIE && !!window.msCrypto;
		u.isFirefox = !!(window.sidebar && (window.sidebar.addPanel || window.sidebar.addSearchEngine));
		u.isChrome = !!window.chrome;
		u.isSafari = /a/.__proto__ == '//';

	}(Utils));

	/**
	 * 事件检测
	 */
	(function(u) {
		// 可以扩充
		var MAP = {
			'select' : 'input',
			'change' : 'input',
			'input' : 'input',
			'submit' : 'form',
			'reset' : 'form',
			'error' : 'img',
			'load' : 'img',
			'abort' : 'img'
		};

		function isEventSupported(eventName) {
			var el = document.createElement(MAP[eventName] || 'div');
			eventName = 'on' + eventName;
			if (eventName in el) {
				el = null;
				return true;
			} else {
				el.setAttribute(eventName, 'return;');
				if (u.isFunction(el[eventName])) {
					el = null;
					return true;
				} else {
					el = null;
					return false
				}
			}
		}

		u.isEventSupported = isEventSupported;
	}(Utils));

	/**
	 * CSS检测
	 */
	(function(u) {
		var VENDORS = ['Khtml', 'Ms', 'O', 'Moz', 'Webkit'];
		var sample = document.createElement('div');

		function toUpperCase(v) {
			return v.toUpperCase();
		}

		(function() {
			function isCssSupported(feature) {
				if (feature in sample.style) {
					return true;
				}
				feature = feature.replace(/^[a-z]/, toUpperCase);
				var len = VENDORS.length;
				while (len--) {
					if (VENDORS[len] + feature in sample.style) {
						return true;
					}
				}
				return false;
			}

			u.isCssSupported = isCssSupported;
		}());
	}(Utils));

	/**
	 * 3.组件辅助
	 */
	/**
	 * 属性复制
	 */
	(function(u) {
		function apply(o, c, defaults) {
			// no "this" reference for friendly out of scope calls
			if (defaults) {
				apply(o, defaults);
			}
			if (o && c && u.isObject(c)) {
				var p;
				for (p in c) {
					if (c.hasOwnProperty(p)) {
						o[p] = c[p];
					}
				}
			}
			return o;
		}

		function applyIf(o, c) {
			if (o) {
				var p;
				for (p in c) {
					if (o[p] === undefined) {
						o[p] = c[p];
					}
				}
			}
			return o;
		}

		u.apply = apply;
		u.applyIf = applyIf;
	}(Utils));

	/**
	 * 原型覆盖
	 */
	(function(u) {
		function override(origclass, overrides) {
			if (overrides) {
				var p = origclass.prototype;
				u.apply(p, overrides);
				if (window.ActiveXObject !== undefined
						&& overrides.hasOwnProperty('toString')) {
					p.toString = overrides.toString;
				}
			}
		}

		u.override = override;
	}(Utils));

	/**
	 * 对象操作
	 */
	(function(u) {
		function each(array, fn, scope) {
			if (u.isEmpty(array, true)) {
				return;
			}
			if (!u.isPrimitive(array) || u.isPrimitive(array)) {
				array = [array];
			}
			var i, len = array.length;
			for (i = 0; i < len; i++) {
				if (fn.call(scope || array[i], array[i], i, array) === false) {
					return i;
				};
			}
		}

		u.each = each;
	}(Utils));

	/**
	 * 空函数
	 */
	(function(u) {
		function emptyFn() {

		};

		u.emptyFn = emptyFn;
	}(Utils));

	/**
	 * id 产生器
	 */
	(function(u) {
		var AUTO_ID = 0, PREFIX = 'yi';

		function id(prefix) {
			return (prefix || PREFIX) + '_' + (AUTO_ID++);
		}

		u.id = id;
	}(Utils));

	/**
	 * 权限验证
	 */
	(function(u) {
		var permissionStr = '', methods = {
			hide : function() {
				this.hideMode = 'display';
				this.hide();
			},
			space : function() {
				this.hideMode = 'visibility';
				this.hide();
			},
			disable : function() {
				this.disable();
			}
		};

		function onGetPermissionSuccess(data, textStatus, jqXHR) {
			if (!jqXHR.responseText) {
				return;
			}

			try {
				var r = $.parseJSON(jqXHR.responseText);
				if (r && r.success) {
					permissionStr = r.permission || '';
				}
			} catch (e) {

			}
		}

		(function() {
			/**
			 * permission
			 * 
			 * @interface
			 * 
			 * @augments 1、component Component: 组件 2、permission {}: 1)name
			 *           String: 权限名 2)method String: 处理方式。'hide'、'space' 或者
			 *           'disable'，默认'hide'
			 */
			function permission(component, permission) {
				permission = permission || {};

				if (!u.hasPermission(permission.name)) {
					var method = permission.method;
					if (!u.isFunction(methods[method])) {
						method = 'hide';
					}
					return methods[method].call(component);
				}
			}

			/**
			 * 判断用户是否具有某项权限
			 * 
			 * @augments permissionName String
			 */
			function hasPermission(permissionName) {
				if (u.isString(permissionName)) {
					if (permissionStr.indexOf(permissionName) < 0) {
						return false;
					} else {
						return true;
					}
				} else {
					return false;
				}
			}

			/**
			 * 载入权限字符串
			 * 
			 * @augments url String URL
			 */
			function loadPermission(url) {
				if ($.isString(url)) {
					$.ajax({
						url : url,
						async : false,
						success : onGetPermissionSuccess
					});
				}
			}

			u.permission = permission;
			u.hasPermission = hasPermission;
			u.loadPermission = loadPermission;
		}());
	}(Utils));

	/**
	 * 像素字符串中与Number的转化
	 */
	(function(u) {
		var pxRe = /px\s*$/, pxStr = 'px';

		function getNumberOfPixelString(pixelString) {
			if (u.isString(pixelString)) {
				return parseFloat(u.trim(pixelString.replace(pxRe, '')));
			}
			return undefined;
		}

		function parseNumberToPixelString(number) {
			if (u.isNumber(number)) {
				return '' + number + pxStr;
			}
			return undefined;
		}

		u.getNumberOfPixelString = getNumberOfPixelString;
		u.parseNumberToPixelString = parseNumberToPixelString;
	}(Utils));

	/**
	 * 层次控制
	 */
	(function(u) {
		// I had to use global variable to synchronize the index between
		// Components and Plugins
		try {
			globalIndex = globalIndex;
		} catch (e) {
			globalIndex = 1040;
		}

		function getZIndex() {
			return globalIndex++;
		}

		u.getZIndex = getZIndex;
	}(Utils));

	/**
	 * 获取应用上下文 - 相对于WebRoot的路径（结尾没有"/"）
	 */
	(function(u) {
		function getContext() {
			return '/' + window.location.href.replace('//', '').split('/')[1];
		}

		u.getContext = getContext;
	}(Utils));

	// 
	return Utils;
});