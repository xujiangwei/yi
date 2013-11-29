/**
 * 继承
 * 
 * @description for Component Base
 * 
 * @example
 * 
 * Sp: Super, Sb: Sub
 * 
 * var Sb = extend(Sp, overrides);
 * 
 * for Sb(which is extended by extend())' Sb, you can also use:
 * 
 * var Ssb = Sb.extend(overrides);
 */
define(function(/* require */) {
			var oc = Object.prototype.constructor;

			var isIE = !!window.ActiveXObject;

			// inline overrides
			function io(o) {
				for (var m in o) {
					this[m] = o[m];
				}
			};

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
			};

			function override(origclass, overrides) {
				if (overrides) {
					var p = origclass.prototype;
					apply(p, overrides);
					if (isIE && overrides.hasOwnProperty('toString')) {
						p.toString = overrides.toString;
					}
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
					override(sb, o);
				};
				sbp.superclass = sbp.supr = (function() {
					return spp;
				});
				sbp.override = io;
				override(sb, overrides);
				sb.extend = function(o) {
					return extend(sb, o);
				};
				return sb;
			};

			return extend;
		});