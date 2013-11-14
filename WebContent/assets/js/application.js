/**
 * @author Jiangwei Xu
 */

define(function(require, exports, module) {

	require('fetch');

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

		$('#btn-demo-fetch').click(function() {
			$('#dhc').fetch({
				html: 'modules/dhc/dhc.html'
				, styles: ['modules/dhc/dhc.css']
				, scripts: ['modules/dhc/dhc.js']
				, main: function(args) {
					window.demo.showAlert(args);
				}
				, args: 'demo'
				, error: function(el) {
					yi.alert('<p style="color:red">加载 dhc 模组失败！</p>');
				}
			});
		});
	};
});
