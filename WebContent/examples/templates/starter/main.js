define(function(require, exports, module) {
	/* 导出 run() 方法 */
	exports.run = function() {
		/* 这里是你的页面入口，从这里编写你的页面应用代码 */
		console.log('这是最基础的页面');
		$('#desc').html('这个页面由简单的 HTML 标签和名为 "main.js" 的 CommonJS Module 构成。');
	}
});
