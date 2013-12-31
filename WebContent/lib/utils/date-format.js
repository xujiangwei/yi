/**
 * 日期格式化
 */
define(function(require, exports, module) {
	'require:nomunge,exports:nomunge,module:nomunge';

	var utils = require('./utils');

	(function() {
		var DATETIME_PATTERN = 'yyyy-MM-dd HH:mm:ss', DATE_PATTERN = 'yyyy-MM-dd';

		var dateRe = /-/g;

		function Format(pattern) {
			this.pattern = pattern;
		}

		Format.prototype.format = function(date) {
			if (utils.isDate(date)) {
				var pad = utils.leftPad;

				var y = date.getFullYear();
				var M = pad(date.getMonth() + 1, 2, '0');
				var d = pad(date.getDate(), 2, '0');

				if (this.pattern.toLowerCase() == DATE_PATTERN.toLowerCase()) {
					return [y, M, d].join('-');
				}

				var h = pad(date.getHours(), 2, '0');
				var m = pad(date.getMinutes(), 2, '0');
				var s = pad(date.getSeconds(), 2, '0');

				return [y, M, d].join('-') + ' ' + [h, m, s].join('-');
			} else {
				return undefined;
			}
		}

		Format.prototype.toMilliseconds = function(dateString) {
			if (utils.isString(dateString)) {
				return Date.parse(dateString.replace(dateRe, '/'));
			} else if (utils.isDate(dateString)) {
				return dateString.getMilliseconds();
			} else {
				return undefined;
			}
		}

		module.exports = Format;
	}());
});