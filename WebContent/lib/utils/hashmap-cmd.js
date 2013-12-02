define(function(/* require */) {
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

/**
 * HashMap 封装。
 */
function HashMap() {
	// 定义长度
	var length = 0;
	// 创建一个对象
	var obj = new Object();

	/**
	 * 判断 Map 是否为空
	 */
	this.isEmpty = function() {
		 return length == 0;
	};
	
	/**
	 * 判断对象中是否包含给定 Key
	 */
	this.containsKey = function(key) {
		return (key in obj);
	};

	/**
	 * 判断对象中是否包含给定的 Value
	 */
	this.containsValue = function(value) {
		for (var key in obj) {
			if (obj[key] == value) {
				return true;
			}
		}
		return false;
	};

	/**
	 * 向 Map 中添加数据
	 */
	this.put = function(key,value) {
		if (!this.containsKey(key)) {
			length++;
		}
		obj[key] = value;
	};

	/**
	 * 根据给定的 Key 获得 Value
	 */
	this.get = function(key) {
		return this.containsKey(key) ? obj[key] : null;
	};

	/**
	 * 根据给定的 Key 删除一个值
	 */
	this.remove = function(key) {
		if (this.containsKey(key) && (delete obj[key])) {
			length--;
		}
	};

	/**
	 * 获得 Map 中的所有 Value
	 */
	this.values = function() {
		var _values= new Array();
		for (var key in obj) {
			_values.push(obj[key]);
		}
		return _values;
	};

	/**
	 * 获得 Map 中的所有 Key
	 */
	this.keySet = function() {
		var _keys = new Array();
		for (var key in obj) {
			_keys.push(key);
		}
		return _keys;
	};

	/**
	 * 获得 Map 的长度
	 */
	this.size = function() {
		return length;
	};

	/**
	 * 清空 Map
	 */
	this.clear = function() {
		length = 0;
		obj = new Object();
	};
}

return HashMap;
});