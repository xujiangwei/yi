/**
 * DelayedTask
 * 
 * @description for Component Event
 */
define(function(/* require */) {
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
		 *            newFn (optional) Overrides function passed to constructor
		 * @param {Object}
		 *            newScope (optional) Overrides scope passed to constructor.
		 *            Remember that if no scope is specified, <code>this</code>
		 *            will refer to the browser window.
		 * @param {Array}
		 *            newArgs (optional) Overrides args passed to constructor
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

	return DelayedTask;
});
