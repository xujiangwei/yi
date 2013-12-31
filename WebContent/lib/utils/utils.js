/**
 * 工具
 */
define(function(/* require */) {
	var U = {};

	/*
	 * 属性复制
	 */
	(function() {
		function apply(o, c, defaults) {
			// no "this" reference for friendly out of scope calls
			if (defaults) {
				apply(o, defaults);
			}
			if (o && c && typeof c == 'object') {
				for (var p in c) {
					o[p] = c[p];
				}
			}
			return o;
		}

		function applyIf(o, c) {
			if (o) {
				for (var p in c) {
					if (typeof o[p] === 'undefined') {
						o[p] = c[p];
					}
				}
			}
			return o;
		}

		U.apply = apply;
		U.applyIf = applyIf;
	}());

	/*
	 * 浏览器判断
	 */
	(function() {
		// I think window.ActiveXObject would be in IE for a long time
		var isIE = window.ActiveXObject !== undefined;

		U.apply(U, {
			isIE : isIE,
			// window.XMLHttpRequest IE7+
			isIE6 : isIE && !!(document.compatMode && !window.XMLHttpRequest),
			// document.documentMode IE8+
			isIE7 : isIE && !!(window.XMLHttpRequest && !document.documentMode),
			// window.performance IE9+
			isIE8 : isIE && !!(document.documentMode && !window.performance),
			// window.applicationCache IE10+
			isIE9 : isIE && !!(window.performance && !window.applicationCache),
			// window.msCrypto IE11+
			isIE10 : isIE && !!(window.applicationCache && !window.msCrypto),
			isIE11 : isIE && !!window.msCrypto,
			isFirefox : !!(window.sidebar && (window.sidebar.addPanel || window.sidebar.addSearchEngine)),
			isChrome : !!window.chrome,
			isSafari : /a/.__proto__ == '//'
		});
	}());

	/*
	 * 属性覆盖
	 */
	(function() {
		function override(origclass, overrides) {
			if (overrides) {
				var p = origclass.prototype;
				U.apply(p, overrides);
				if (U.isIE && overrides.hasOwnProperty('toString')) {
					p.toString = overrides.toString;
				}
			}
		}

		U.override = override;
	}());

	/*
	 * 类型判断
	 */
	(function() {
		function type(v) {
			var ts = Object.prototype.toString.call(v);// [object Xx]
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

		function isEmpty(v, allowEmptyString) {
			return (v === null) || (v === undefined)
					|| (!allowEmptyString ? v === '' : false)
					|| (isArray(v) && v.length === 0);
		}

		var nodeListRe = /NodeList|HTMLCollection/;

		function isIterable(v) {
			// check for array or arguments
			if (isArray(v) || v.callee) {
				return true;
			}
			// check for node list type
			if (nodeListRe.test(toString.call(v))) {
				return true;
			}
			// NodeList has an item and length property
			// IXMLDOMNodeList has nextNode method, needs to be checked
			// first.
			return ((typeof v.nextNode != 'undefined' || v.item) && isNumber(v.length));
		}

		function isPrimitive(v) {
			return isString(v) || isNumber(v) || isBoolean(v);
		}

		U.apply(U, {
					isArray : isArray,
					isBoolean : isBoolean,
					isDate : isDate,
					isFunction : isFunction,
					isNumber : isNumber,
					isObject : isObject,
					isRegexp : isRegexp,
					isString : isString,
					isEmpty : isEmpty,
					isIterable : isIterable,
					isPrimitive : isPrimitive
				});
	}());

	/*
	 * 对象操作
	 */
	(function() {
		function each(array, fn, scope) {
			if (U.isEmpty(array, true)) {
				return;
			}
			if (!U.isPrimitive(array) || U.isPrimitive(array)) {
				array = [array];
			}
			for (var i = 0, len = array.length; i < len; i++) {
				if (fn.call(scope || array[i], array[i], i, array) === false) {
					return i;
				};
			}
		}

		U.each = each;
	}());

	/*
	 * id 产生器
	 */
	(function() {
		var AUTO_ID = 0, PREFIX = 'yi';

		function id(prefix) {
			return (prefix || PREFIX) + '_' + (AUTO_ID++);
		}

		U.id = id;
	}());

	/*
	 * 空函数
	 */
	(function() {
		function emptyFn() {

		};

		U.emptyFn = emptyFn;
	}());

	/*
	 * 除去字符串开头和末尾的空格
	 */
	(function() {
		var trimRe = /^\s+|\s+$/g;

		function trim(v) {
			if (U.isString(v)) {
				return v.replace(trimRe, '');
			}
			return v;
		}

		U.trim = trim;
	}());

	/*
	 * 像素字符串中与Number的转化
	 */
	(function() {
		var pxRe = /px\s*$/, pxStr = 'px';

		function getNumberOfPixelString(pixelString) {
			if (U.isString(pixelString)) {
				return parseFloat(U.trim(pixelString.replace(pxRe, '')));
			}
			return undefined;
		}

		function parseNumberToPixelString(number) {
			if (U.isNumber(number)) {
				return '' + number + pxStr;
			}
			return undefined;
		}

		U.apply(U, {
					getNumberOfPixelString : getNumberOfPixelString,
					parseNumberToPixelString : parseNumberToPixelString
				});
	}());

	/*
	 * 如果一个字符串的长度小于指定的值,则在字符串的左侧(也就是前面)用指定的字符填充,直到字符串长度达到最小值
	 */
	(function() {
		function leftPad(string, size, character) {
			var result = String(string);
			character = character || ' ';
			while (result.length < size) {
				result = character + result;
			}
			return result;
		}

		U.leftPad = leftPad;
	}());

	// 
	return U;
});