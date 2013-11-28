/**
 * Hello world 示例
 */

// 定义入口方法
(function() {
	// 进行简单的名称空间隔离（也可使用其他方式实现）
	if (this.tutorial === undefined) {
		this.tutorial = {};
	}

	/**
	 * container 组件 jQuery 容器对象。
	 * args 组件其他参数。
	 */
	this.tutorial.helloworld = function(container, args) {
		// 修改显示名称
		if (null == args) {
			yi.alert('没有设置模组参数');
		}
		else {
			container.find('#name').html(args.name);
		}
	}
})();
