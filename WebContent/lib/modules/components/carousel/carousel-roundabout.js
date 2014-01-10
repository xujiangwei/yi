/**
 * carouselRoundabout 轮播转盘
 * 
 * @author songdarui, songdarui@dhcc.com.cn, 2013-12-13
 * 
 * @extends component
 * 
 * @requires utils, extend, component
 * 
 * 
 * 
 * @description updated on 2013-12-27
 * 
 */
define(function(require, exports, module) {
	'require:nomunge,exports:nomunge,module:nomunge';

	var utils = require('utils/utils');
	var extend = require('extend');
	var Base = require('component');
	require('roundabout/jquery.roundabout');
	require('roundabout/jquery.roundabout-shapes');

	(function() {
		var carouselRoundabout = extend(Base, {
					baseCls : 'yi-carousel-roundabout',
					baseHtml : '<ul class="roundabout">' + '</ul>',
					/**
					 * @cfg btnNext String
					 * 
					 * jQuery选择器的页面元素,当点击时,将触发的推动下一个轮播元素。
					 */
					btnNext : null,
					/**
					 * @cfg btnPrev String
					 * 
					 * jQuery选择器的页面元素,当点击时,将触发的推动上一个轮播元素。
					 */
					btnPrev : null,
					/**
					 * @cfg btnToggleAutoplay String
					 * 
					 * jQuery选择器的页面元素,当点击时,将切换播放状态(启动或停止)。
					 */
					btnToggleAutoplay : null,
					/**
					 * @cfg btnStartAutoplay String
					 * 
					 * jQuery选择器的页面元素,当点击时,将自动轮播元素。
					 */
					btnStartAutoplay : null,
					/**
					 * @cfg btnStopAutoplay String
					 * 
					 * jQuery选择器的页面元素,当点击时,将停止轮播元素。
					 */
					btnStopAutoplay : null,
					// 扩展点 btnNext点击后回调方法
					btnNextCallback : function() {

					},
					// 扩展点 btnPrev点击后回调方法
					btnPrevCallback : function() {

					},
					// 扩展点 点击获取到焦点后的回调方法
					clickToFocusCallback : function() {

					},
					afterRender : function(container) {
						Button.superclass.onRender.call(this, container);
						var _this = this;
						this.el.roundabout({
									shape : 'square',
									minOpacity : 1,
									btnNext : _this.btnNext,
									btnPrev : _this.btnPrev,
									btnToggleAutoplay : _this.btnToggleAutoplay,
									btnStartAutoplay : _this.btnStartAutoplay,
									btnStopAutoplay : _this.btnStopAutoplay,
									btnNextCallback : _this.btnNextCallback(),
									btnPrevCallback : _this.btnPrevCallback(),
									clickToFocusCallback : _this.clickToFocusCallback()
								});
						_this = null;
					}
				});
		module.exports = carouselRoundabout;
	}());
});