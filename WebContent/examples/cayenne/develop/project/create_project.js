define(function(require, exports, module) {
			'require:nomunge,exports:nomunge,module:nomunge';

			require('./create_project.css');
			var Timeline = require('modules/components/timeline/timeline');

			return {
				run : function() {
					var milestone = new Timeline({
								applyTo : 'milestone',
								startDate : '2013-06-23',
								endDate : '2013-12-31'
							});

					milestone.setValue('2013-11-4, 2013-12-5');

					// setTimeout(function() {
					// milestone.setEndDate('2014-06-01');
					// }, 3000);

					// setTimeout(function() {
					// milestone.destroy();
					// }, 5000);
				}
			};
		});