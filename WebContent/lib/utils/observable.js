/**
 * 观察者
 * 
 * @description for Component Base
 */
define(function(require, exports, module) {
	'require:nomunge,exports:nomunge,module:nomunge';

	function isArray(v) {
		return Object.prototype.toString.call(v, null) === '[object Array]';
	}

	function isString(v) {
		return Object.prototype.toString.call(v, null) === '[object String]';
	}

	function isNumber(v) {
		return Object.prototype.toString.call(v, null) === '[object Number]';
	}

	function isBoolean(v) {
		return Object.prototype.toString.call(v, null) === '[object Boolean]';
	}

	function isEmpty(value, allowEmptyString) {
		return (value === null) || (value === undefined)
				|| (!allowEmptyString ? value === '' : false)
				|| (isArray(value) && value.length === 0);
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
		// IXMLDOMNodeList has nextNode method, needs to be checked first.
		return ((typeof v.nextNode != 'undefined' || v.item) && isNumber(v.length));
	}

	function isPrimitive(v) {
		return isString(v) || isNumber(v) || isBoolean(v);
	}

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

	function each(array, fn, scope) {
		if (isEmpty(array, true)) {
			return;
		}
		if (!isIterable(array) || isPrimitive(array)) {
			array = [array];
		}
		for (var i = 0, len = array.length; i < len; i++) {
			if (fn.call(scope || array[i], array[i], i, array) === false) {
				return i;
			};
		}
	}

(function() {
		var TRUE = true, FALSE = false;

		function Observable() {
			var me = this, e = me.events;
			if (me.listeners) {
				me.on(me.listeners);
				delete me.listeners;
			}
			me.events = e || {};
		};

		Observable.prototype = {
			// private
			filterOptRe : /^(?:scope|delay|buffer|single)$/,

			/**
			 * <p>
			 * Fires the specified event with the passed parameters (minus the
			 * event name).
			 * </p>
			 * <p>
			 * An event may be set to bubble up an Observable parent hierarchy
			 * </p>
			 * 
			 * @param {String}
			 *            eventName The name of the event to fire.
			 * @param {Object...}
			 *            args Variable number of parameters are passed to
			 *            handlers.
			 * @return {Boolean} returns false if any of the handlers return
			 *         false otherwise it returns true.
			 */
			fireEvent : function() {
				var a = Array.prototype.slice.call(arguments, 0), ename = a[0]
						.toLowerCase(), me = this, ret = TRUE, ce = me.events[ename], cc, q, c;
				if (me.eventsSuspended === TRUE) {
					if (q = me.eventQueue) {
						q.push(a);
					}
				} else if (typeof ce == 'object') {
					if (ce.bubble) {
						if (ce.fire.apply(ce, a.slice(1)) === FALSE) {
							return FALSE;
						}
						c = me.getBubbleTarget && me.getBubbleTarget();
						if (c && c.enableBubble) {
							cc = c.events[ename];
							if (!cc || typeof cc != 'object' || !cc.bubble) {
								c.enableBubble(ename);
							}
							return c.fireEvent.apply(c, a);
						}
					} else {
						a.shift();
						ret = ce.fire.apply(ce, a);
					}
				}
				return ret;
			},

			addListener : function(eventName, fn, scope, o) {
				var me = this, e, oe, ce;

				if (typeof eventName == 'object') {
					o = eventName;
					for (e in o) {
						oe = o[e];
						if (!me.filterOptRe.test(e)) {
							me.addListener(e, oe.fn || oe, oe.scope || o.scope,
									oe.fn ? oe : o);
						}
					}
				} else {
					eventName = eventName.toLowerCase();
					ce = me.events[eventName] || TRUE;
					if (typeof ce == 'boolean') {
						me.events[eventName] = ce = new Event(me, eventName);
					}
					ce.addListener(fn, scope, typeof o == 'object' ? o : {});
				}
			},

			/**
			 * Removes an event handler.
			 * 
			 * @param {String}
			 *            eventName The type of event the handler was associated
			 *            with.
			 * @param {Function}
			 *            handler The handler to remove. <b>This must be a
			 *            reference to the function passed into the
			 *            {@link #addListener} call.</b>
			 * @param {Object}
			 *            scope (optional) The scope originally specified for
			 *            the handler.
			 */
			removeListener : function(eventName, fn, scope) {
				var ce = this.events[eventName.toLowerCase()];
				if (typeof ce == 'object') {
					ce.removeListener(fn, scope);
				}
			},

			/**
			 * Removes all listeners for this object
			 */
			purgeListeners : function() {
				var events = this.events, evt, key;
				for (key in events) {
					evt = events[key];
					if (typeof evt == 'object') {
						evt.clearListeners();
					}
				}
			},

			/**
			 * Adds the specified events to the list of events which this
			 * Observable may fire.
			 * 
			 * @param {Object|String}
			 *            o Either an object with event names as properties with
			 *            a value of <code>true</code> or the first event name
			 *            string if multiple event names are being passed as
			 *            separate parameters.
			 * @param {string}
			 *            Optional. Event name if multiple event names are being
			 *            passed as separate parameters. Usage:
			 * 
			 * <pre><code>
			 * this.addEvents('storeloaded', 'storecleared');
			 * </code></pre>
			 */
			addEvents : function(o) {
				var me = this;
				me.events = me.events || {};
				if (typeof o == 'string') {
					var a = arguments, i = a.length;
					while (i--) {
						me.events[a[i]] = me.events[a[i]] || TRUE;
					}
				} else {
					applyIf(me.events, o);
				}
			},

			/**
			 * Checks to see if this object has any listeners for a specified
			 * event
			 * 
			 * @param {String}
			 *            eventName The name of the event to check for
			 * @return {Boolean} True if the event is being listened for, else
			 *         false
			 */
			hasListener : function(eventName) {
				var e = this.events[eventName.toLowerCase()];
				return typeof e == 'object' && e.listeners.length > 0;
			},

			/**
			 * Suspend the firing of all events. (see {@link #resumeEvents})
			 * 
			 * @param {Boolean}
			 *            queueSuspended Pass as true to queue up suspended
			 *            events to be fired after the {@link #resumeEvents}
			 *            call instead of discarding all suspended events;
			 */
			suspendEvents : function(queueSuspended) {
				this.eventsSuspended = TRUE;
				if (queueSuspended && !this.eventQueue) {
					this.eventQueue = [];
				}
			},

			/**
			 * Resume firing events. (see {@link #suspendEvents}) If events
			 * were suspended using the <tt><b>queueSuspended</b></tt>
			 * parameter, then all events fired during event suspension will be
			 * sent to any listeners now.
			 */
			resumeEvents : function() {
				var me = this, queued = me.eventQueue || [];
				me.eventsSuspended = FALSE;
				delete me.eventQueue;
				each(queued, function(e) {
							me.fireEvent.apply(me, e);
						});
			}
		};

		/**
		 * Appends an event handler to this object (shorthand for
		 * {@link #addListener}.)
		 * 
		 * @param {String}
		 *            eventName The type of event to listen for
		 * @param {Function}
		 *            handler The method the event invokes
		 * @param {Object}
		 *            scope (optional) The scope (<code><b>this</b></code>
		 *            reference) in which the handler function is executed.
		 *            <b>If omitted, defaults to the object which fired the
		 *            event.</b>
		 * @param {Object}
		 *            options (optional) An object containing handler
		 *            configuration.
		 * @method
		 */
		Observable.prototype.on = Observable.prototype.addListener;
		/**
		 * Removes an event handler (shorthand for {@link #removeListener}.)
		 * 
		 * @param {String}
		 *            eventName The type of event the handler was associated
		 *            with.
		 * @param {Function}
		 *            handler The handler to remove. <b>This must be a reference
		 *            to the function passed into the {@link #addListener} call.</b>
		 * @param {Object}
		 *            scope (optional) The scope originally specified for the
		 *            handler.
		 * @method
		 */
		Observable.prototype.off = Observable.prototype.removeListener;

		Observable.prototype.trigger = Observable.prototype.fireEvent;

		/**
		 * Removes <b>all</b> added captures from the Observable.
		 * 
		 * @param {Observable}
		 *            o The Observable to release
		 * @static
		 */
		Observable.releaseCapture = function(o) {
			o.fireEvent = Observable.prototype.fireEvent;
		};

		function DelayedTask(fn, scope, args) {
			var me = this, id, call = function() {
				clearInterval(id);
				id = null;
				fn.apply(scope, args || []);
			};

			/**
			 * Cancels any pending timeout and queues a new one
			 * 
			 * @param {Number}
			 *            delay The milliseconds to delay
			 * @param {Function}
			 *            newFn (optional) Overrides function passed to
			 *            constructor
			 * @param {Object}
			 *            newScope (optional) Overrides scope passed to
			 *            constructor. Remember that if no scope is specified,
			 *            <code>this</code> will refer to the browser window.
			 * @param {Array}
			 *            newArgs (optional) Overrides args passed to
			 *            constructor
			 */
			me.delay = function(delay, newFn, newScope, newArgs) {
				me.cancel();
				fn = newFn || fn;
				scope = newScope || scope;
				args = newArgs || args;
				id = setInterval(call, delay);
			};

			/**
			 * Cancel the last queued timeout
			 */
			me.cancel = function() {
				if (id) {
					clearInterval(id);
					id = null;
				}
			};
		}

		function createTargeted(h, o, scope) {
			return function() {
				if (o.target == arguments[0]) {
					h.apply(scope, Array.prototype.slice.call(arguments, 0));
				}
			};
		};

		function createBuffered(h, o, l, scope) {
			l.task = new EventDelayedTask();
			return function() {
				l.task.delay(o.buffer, h, scope, Array.prototype.slice.call(
								arguments, 0));
			};
		};

		function createSingle(h, e, fn, scope) {
			return function() {
				e.removeListener(fn, scope);
				return h.apply(scope, arguments);
			};
		};

		function createDelayed(h, o, l, scope) {
			return function() {
				var task = new EventDelayedTask(), args = Array.prototype.slice
						.call(arguments, 0);
				if (!l.tasks) {
					l.tasks = [];
				}
				l.tasks.push(task);
				task.delay(o.delay || 10, function() {
							l.tasks.remove(task);
							h.apply(scope, args);
						}, scope);
			};
		};

		function Event(obj, name) {
			this.name = name;
			this.obj = obj;
			this.listeners = [];
		};

		Event.prototype = {
			addListener : function(fn, scope, options) {
				var me = this, l;
				scope = scope || me.obj;
				if (!me.isListening(fn, scope)) {
					l = me.createListener(fn, scope, options);
					if (me.firing) { // if we are currently firing this
						// event, don't disturb the listener
						// loop
						me.listeners = me.listeners.slice(0);
					}
					me.listeners.push(l);
				}
			},

			createListener : function(fn, scope, o) {
				o = o || {};
				scope = scope || this.obj;
				var l = {
					fn : fn,
					scope : scope,
					options : o
				}, h = fn;
				if (o.target) {
					h = createTargeted(h, o, scope);
				}
				if (o.delay) {
					h = createDelayed(h, o, l, scope);
				}
				if (o.single) {
					h = createSingle(h, this, fn, scope);
				}
				if (o.buffer) {
					h = createBuffered(h, o, l, scope);
				}
				l.fireFn = h;
				return l;
			},

			findListener : function(fn, scope) {
				var list = this.listeners, i = list.length, l;

				scope = scope || this.obj;
				while (i--) {
					l = list[i];
					if (l) {
						if (l.fn == fn && l.scope == scope) {
							return i;
						}
					}
				}
				return -1;
			},

			isListening : function(fn, scope) {
				return this.findListener(fn, scope) != -1;
			},

			removeListener : function(fn, scope) {
				var index, l, k, me = this, ret = FALSE;
				if ((index = me.findListener(fn, scope)) != -1) {
					if (me.firing) {
						me.listeners = me.listeners.slice(0);
					}
					l = me.listeners[index];
					if (l.task) {
						l.task.cancel();
						delete l.task;
					}
					k = l.tasks && l.tasks.length;
					if (k) {
						while (k--) {
							l.tasks[k].cancel();
						}
						delete l.tasks;
					}
					me.listeners.splice(index, 1);
					ret = TRUE;
				}
				return ret;
			},

			// Iterate to stop any buffered/delayed events
			clearListeners : function() {
				var me = this, l = me.listeners, i = l.length;
				while (i--) {
					me.removeListener(l[i].fn, l[i].scope);
				}
			},

			fire : function() {
				var me = this, listeners = me.listeners, len = listeners.length, i = 0, l;

				if (len > 0) {
					me.firing = TRUE;
					var args = Array.prototype.slice.call(arguments, 0);
					for (; i < len; i++) {
						l = listeners[i];
						if (l
								&& l.fireFn.apply(l.scope || me.obj || window,
										args) === FALSE) {
							return (me.firing = FALSE);
						}
					}
				}
				me.firing = FALSE;
				return TRUE;
			}

		};

		module.exports = Observable;
	})();
});