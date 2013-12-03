/**
 * 继承
 * 
 * @description for Component Base
 * 
 * @example
 * 
 * Sp: Super, Sb: Sub
 * 
 * 1.
 * var Sb = extend(Sp, overrides);
 * 
 * or
 * 
 * 2.
 * var Sb = function(){
 * // my constructor codes before super' constructor
 * 
 * Sb.superclass.constructor.call(this);
 *  // my constructor codes after super' constructor
 * }
 * 
 * extend(Sb, Sp, overrides);
 * 
 * 3.
 * for Sb(which is extended by extend())' Sb, you can also use:
 * 
 * var Ssb = Sb.extend(overrides);
 */
define(function(require) {
			'require:nomunge,exports:nomunge,module:nomunge';

			var utils = require('./utils');

			var oc = Object.prototype.constructor;

			// inline overrides
			function io(o) {
				for (var m in o) {
					this[m] = o[m];
				}
			};

			function extend(sb, sp, overrides) {
				if (typeof sp == 'object') {
					overrides = sp;
					sp = sb;
					sb = overrides.constructor != oc
							? overrides.constructor
							: function() {
								sp.apply(this, arguments);
							};
				}
				var F = function() {
				}, sbp, spp = sp.prototype;

				F.prototype = spp;
				sbp = sb.prototype = new F();
				sbp.constructor = sb;
				sb.superclass = spp;
				if (spp.constructor == oc) {
					spp.constructor = sp;
				}
				sb.override = function(o) {
					utils.override(sb, o);
				};
				sbp.superclass = sbp.supr = (function() {
					return spp;
				});
				sbp.override = io;
				utils.override(sb, overrides);
				sb.extend = function(o) {
					return extend(sb, o);
				};
				return sb;
			};

			return extend;
		});