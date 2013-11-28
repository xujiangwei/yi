/**
 * 使用 Carousel 展示 Android 系统开发名示例。
 */

// 定义入口方法
(function() {
	// 进行简单的名称空间隔离（也可使用其他方式实现）
	if (this.tutorial === undefined) {
		this.tutorial = {};
	}

	/**
	 * container - 组件 jQuery 容器对象。
	 * args - 组件其他参数。
	 * mod - MOD 对象。
	 */
	this.tutorial.runAndroidCarousel = function(container, args, mod) {
		// 运行 Holder
		Holder.run();

		// 从容器里取出对象
		common.use(mod.contextPath + "AndroidCarousel", function(AndroidCarousel) {
			var ac = new AndroidCarousel(container.find('.carousel'));
			ac.resetJellyBean(mod.contextPath);
		});
	}
})();
