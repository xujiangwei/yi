/**
 * 工具
 */
define(function(/* require */) {
	/*
	 * 类型判断
	 */
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

	function isIterable(v) {
		// check for array or arguments
		if (isArray(v) || v.callee) {
			return true;
		}
		// check for node list type
		if (/NodeList|HTMLCollection/.test(toString.call(v))) {
			return true;
		}
		// NodeList has an item and length property
		// IXMLDOMNodeList has nextNode method, needs to be checked
		// first.
		return ((typeof v.nextNode != 'undefined' || v.item) && ou
				.isNumber(v.length));
	}

	function isPrimitive(v) {
		return isString(v) || isNumber(v) || isBoolean(v);
	}

	/*
	 * 属性复制
	 */
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

	var isIE = !!window.ActiveXObject;

	function override(origclass, overrides) {
		if (overrides) {
			var p = origclass.prototype;
			apply(p, overrides);
			if (isIE && overrides.hasOwnProperty('toString')) {
				p.toString = overrides.toString;
			}
		}
	}

	/*
	 * 对象操作
	 */
	function each(array, fn, scope) {
		if (ou.isEmpty(array, true)) {
			return;
		}
		if (!ou.ou.isPrimitive(array) || ou.isPrimitive(array)) {
			array = [array];
		}
		for (var i = 0, len = array.length; i < len; i++) {
			if (fn.call(scope || array[i], array[i], i, array) === false) {
				return i;
			};
		}
	}

	var AUTO_ID = 0, PREFIX = 'yi';
	/*
	 * id 产生器
	 */
	function id(prefix) {
		return (prefix || PREFIX) + '_' + (AUTO_ID++);
	}

	/*
	 * 空函数
	 */
	function emptyFn() {

	};

	// 
	return {
		isArray : isArray,
		isBoolean : isBoolean,
		isFunction : isFunction,
		isNumber : isNumber,
		isObject : isObject,
		isRegexp : isRegexp,
		isString : isString,
		isEmpty : isEmpty,
		isIterable : isIterable,
		isPrimitive : isPrimitive,
		apply : apply,
		applyIf : applyIf,
		override : override,
		each : each,
		id : id,
		emptyFn : emptyFn
	}
});
