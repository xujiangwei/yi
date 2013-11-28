/**
 * Hello world 示例 3
 */

// 定义入口方法
(function() {
	// 进行简单的名称空间隔离（也可使用其他方式实现）
	if (this.demo === undefined) {
		this.demo = {};
	}

	/**
	 * container 组件 jQuery 容器对象。
	 * args 组件其他参数。
	 */
	this.demo.helloworld3 = function(container, args, mod) {
		// 运行 Holder
		Holder.run();

		// 从容器里取出对象
		common.use(mod.contextPath + "AndroidCarousel", function(AndroidCarousel) {
			var ac = new AndroidCarousel(container.find('.carousel'));
			ac.resetJellyBean(mod.contextPath);
		});
	}
})();
