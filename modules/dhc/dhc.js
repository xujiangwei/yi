/*!
 * 演示模块脚本入口。
 */

(function(){
	var Demo = function() {
	};

	Demo.prototype.showAlert = function(name) {
		window.yi.alert('加载 dhc#'+ name +' 模组成功！<br/>如果图片居中并呈现圆角边，则说明样式表装载正确。');
	};

	window.demo = new Demo();
})();
