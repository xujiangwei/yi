/**
 * @author Jiangwei Xu
 */

define(function(require, exports, module) {

	exports.main = function() {
		// 启动可视化控制台
		var Console = require('console');
		var c = new Console();
		c.start();

		// 设置按钮事件
		$('#btn-show-console').click(function() {
			console.open();
		});
		$('#btn-hide-console').click(function() {
			console.close();
		});
	};
});
