/*
-----------------------------------------------------------------------------
This source file is part of Cell Cloud.

Copyright (c) 2009-2013 Cell Cloud Team (www.cellcloud.net)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
-----------------------------------------------------------------------------
*/

function argumentNames(fn) {
	var names = fn.toString().match(/^[\s\(]*function[^(]*\(([^\)]*)\)/)[1].replace(/\s+/g, '').split(',');
	return names.length == 1 && !names[0] ? [] : names;
}

/**
 * 对象类实用函数。
 */
function Class(baseClass, prop) {
	// 只接受一个参数的情况 - Class(prop)
	if (typeof (baseClass) === "object") {
		prop = baseClass;
		baseClass = null;
	}

	// 本次调用所创建的类（构造函数）
	function F() {
		// 如果父类存在，则实例对象的baseprototype指向父类的原型
		// 这里提供了在实例对象中调用父类方法的途径
		if (baseClass) {
			this.baseprototype = baseClass.prototype;
		}
		this.initialize.apply(this, arguments);
	}

	// 如果此类需要从其它类扩展
	if (baseClass) {
		var middleClass = function() {};
		middleClass.prototype = baseClass.prototype;
		F.prototype = new middleClass();
		F.prototype.constructor = F;
	}

	// 覆盖父类的同名函数
	for (var name in prop) {
		if (prop.hasOwnProperty(name)) {
			// 如果此类继承自父类baseClass并且父类原型中存在同名函数name
			if (baseClass
				&& typeof (prop[name]) === "function"
				&& argumentNames(prop[name])[0] === "$super") {
				// 重定义子类的原型方法prop[name]
				// - 比如$super封装了父类方法的调用，但是调用时的上下文指针要指向当前子类的实例对象
				// - 将$super作为方法调用的第一个参数
				F.prototype[name] = (function(name, fn) {
					return function() {
						var that = this;
						$super = function() {
							return baseClass.prototype[name].apply(that, arguments);
						};
						return fn.apply(this, Array.prototype.concat.apply($super, arguments));
					};
				})(name, prop[name]);
			}
			else {
				F.prototype[name] = prop[name];
			}
		}
	}

	return F;
};
