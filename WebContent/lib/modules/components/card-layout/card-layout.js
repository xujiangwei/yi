/**
 * CardLayout 一个容器中有多个子元素，只会看到最上面的元素，重叠起来的就像重叠起来的扑克牌，每次中能看到第一张
 * 
 * @author wensong, wensong@dhcc.com.cn, 2013-12-09
 * 
 * @extends component
 * 
 * @requires utils, extend, component
 * 
 * @method void setActive(Number index)
 * 
 * @event activate function(CardLayout c, Number activeIndex, Number
 *        lastActiveIndex)
 * 
 * @description 还可以补充通过参数加载卡片页面以及手动添加卡片页面 updated on 2013-12-26
 * 
 */
define(function(require, exports, module) {
	'require:nomunge,exports:nomunge,module:nomunge';

	require('./cardLayout.css');
	var utils = require('utils');
	var extend = require('extend');
	var Base = require('component');

	(function() {
		var CardLayout = extend(Base, {
					/**
					 * @cfg activeIndex Number
					 * 
					 * 初始化时激活的标签序号，从0开始计数
					 */
					baseCls : 'yi-card-layout',
					initComponent : function() {
						CardLayout.superclass.initComponent.call(this);

						this.addEvents('activate');
					},
					afterRender : function(parent) {
						CardLayout.superclass.afterRender.call(this, parent);

						this.cards = this.el.children('.' + this.baseCls
								+ '-card');
						if (this.cards.size() > 0) {
							var len = this.cards.size(), i;
							for (i = 0; i < len; i++) {
								var card = this.cards.eq(i);
								if (card
										.hasClass(this.baseCls + '-card-active')) {
									this.lastActiveIndex = i;
									break;
								}
							}
						}

						if (utils.isNumber(this.activeIndex)
								&& this.activeIndex != this.lastActiveIndex) {
							this.setActive(this.activeIndex);
						}
					},
					/**
					 * 展示某一card
					 */
					setActive : function(index) {
						this.cards.removeClass(this.baseCls + '-card-active');
						this.cards.eq(index).addClass(this.baseCls
								+ '-card-active');
						this.trigger('activate', this, index,
								this.lastActiveIndex);
						this.lastActiveIndex = index;
					},
					beforeDestory : function() {
						delete this.cards;

						CardLayout.superclass.beforeDestory.call(this);
					}
				});

		module.exports = CardLayout;
	}());
});