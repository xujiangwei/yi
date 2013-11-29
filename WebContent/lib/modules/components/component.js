/**
 * Component Base Class
 */
define(function(require, exports, module) {
			'require:nomunge,exports:nomunge,module:nomunge';

			(function() {
				var extend = require('lib/utils/extend');
				var Observable = require('lib/utils/observable');

				var Base = extend(Observable, {});

				module.exports = Base;
			}());
		});