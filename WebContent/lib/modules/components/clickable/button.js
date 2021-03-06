/**
 * Button 按钮
 * 
 * @author songdarui, songdarui@dhcc.com.cn, 2013-12-09
 * 
 * @extends clickable
 * 
 * @requires utils, extend, clickable
 * 
 * @method void setText(String text)
 * @method void setIconCls(String iconCls)
 * 
 * @description updated on 2014-03-27
 * 
 */
define(function(require, exports, module) {
	'require:nomunge,exports:nomunge,module:nomunge';

	var utils = require('utils');
	var extend = require('extend');
	var Clickable = require('clickable');

	(function() {
		var Button = extend(Clickable, {
			baseCls : 'yi-button',

			baseHtml : '<button class="btn"></button>',

			/**
			 * @cfg disabled Boolean
			 * 
			 * 是否不可用
			 */

			/**
			 * @cfg type String
			 * 
			 * <button>的type属性，'button'、'submit'或'reset'，默认'button'
			 */

			/**
			 * @cfg name String
			 * 
			 * <button>的name属性
			 */

			/**
			 * @cfg value String
			 * 
			 * <button>的value属性
			 */

			/**
			 * @cfg iconCls String
			 * 
			 * 按钮图标的class
			 */

			/**
			 * @cfg text String
			 * 
			 * 按钮的文字
			 */

			afterRender : function(container) {
				Button.superclass.afterRender.call(this, container);

				this.el.addClass('btn');

				if (this.disabled) {
					this.el.prop('disabled', true);
				} else if (this.disabled === undefined) {
					this.disabled = this.el.prop('disabled');
				} else {
					this.el.removeAttr('disabled');
				}

				if (this.type !== undefined) {
					this.el.attr('type', this.type);
				} else if (this.el.attr('type')) {
					this.type = this.el.attr('type');
				} else {
					this.type = 'button';
					this.el.attr('type', this.type);
				}

				if (this.name !== undefined) {
					this.el.attr('name', this.name);
				} else {
					this.name = this.el.attr('name');
				}

				if (this.value !== undefined) {
					this.el.val(this.value);
				} else {
					this.value = this.el.val();
				}

				if (this.text !== undefined) {
					this.setText(this.text);
				} else {
					this.text = utils.trim(this.el.text());
				}

				if (!this.el.hasClass('btn-primary')
						&& !this.el.hasClass('btn-success')
						&& !this.el.hasClass('btn-info')
						&& !this.el.hasClass('btn-warning')
						&& !this.el.hasClass('btn-danger')
						&& !this.el.hasClass('btn-link')
						&& !this.el.hasClass('btn-default')) {
					this.el.addClass('btn-default');
				}

				if (this.iconCls) {
					this.setIconCls(this.iconCls);
				} else {
					this.iconCls = this.el.children('span').attr('class');
				}
			},
			onEnable : function() {
				if (this.el.prop('disabled')) {
					this.el.removeAttr('disabled');
				}
			},
			onDisable : function() {
				this.el.prop('disabled', true);
			},
			/**
			 * @augments iconCls String
			 */
			setIconCls : function(iconCls) {
				this.iconCls = iconCls;
				this.el.empty().html(
						(utils.isEmpty(iconCls) ? '' : '<span class="'
								+ iconCls + '"></span>&nbsp;')
								+ this.text + '');
			},
			/**
			 * @augments text String
			 */
			setText : function(text) {
				var text = utils.trim(text);
				this.text = text;
				this.el.empty().html(
						(utils.isEmpty(this.iconCls) ? '' : '<span class="'
								+ this.iconCls + '"></span>&nbsp;')
								+ text + '');
			}
		});

		module.exports = Button;
	}());
});