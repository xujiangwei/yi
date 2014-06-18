/*
 * Yi Framework
 * 
 * Copyright (c) 2013,2014 DHC Software Research Department
 */
(function() {
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
			for ( var key in obj) {
				if (obj[key] == value) {
					return true;
				}
			}
			return false;
		};

		/**
		 * 向 Map 中添加数据
		 */
		this.put = function(key, value) {
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
			var _values = new Array();
			for ( var key in obj) {
				_values.push(obj[key]);
			}
			return _values;
		};

		/**
		 * 获得 Map 中的所有 Key
		 */
		this.keySet = function() {
			var _keys = new Array();
			for ( var key in obj) {
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

	// 全局定义
	this.HashMap = HashMap;
})();

/**
 * CommonJS 规范定义
 */
define(function(require, exports, module) {
	'require:nomunge,exports:nomunge,module:nomunge';

	module.exports = window.HashMap;
});