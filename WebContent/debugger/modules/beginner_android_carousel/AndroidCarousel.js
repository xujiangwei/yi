/**
 * 定义一个简单的 Carousel 组件。
 */
define(function(require, exports, module) {

	function AndroidCarousel(container) {
		this.container = container;
	}

	AndroidCarousel.prototype.prev = function() {
		this.container.carousel('prev');
	}

	AndroidCarousel.prototype.next = function() {
		this.container.carousel('next');
	}

	AndroidCarousel.prototype.resetJellyBean = function(contextPath) {
		this.container.find('#img_jellybean').attr("src", contextPath + "img/jelly_bean.jpg");
	}

	// 导出接口
	module.exports = AndroidCarousel;
});
