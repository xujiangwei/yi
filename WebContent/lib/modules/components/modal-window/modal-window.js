/**
 * ModalWindow 对话框
 * 
 * @author dengfenfen, dengfenfen@dhcc.com.cn, 2013-12-05
 * 
 * @requires extend, component, utils
 * 
 * @method load: Function(Object option)
 * @method show: Function()
 * @method hide: Function()
 * 
 * @event hide: Function(ModalWindow win)
 * @event hidden: Function(ModalWindow win)
 * @event shown: Function(ModalWindow win)
 * @event load: Function(ModalWindow win ,String responseText, String
 *        textStatus, XMLHttpRequest xhr)
 * 
 * @description updated on 2014-03-21
 * 
 */
define(function(require, exports, module) {
	'require:nomunge,exports:nomunge,module:nomunge';

	require('./modal-window.css');
	var extend = require('extend');
	var Base = require('component');
	var utils = require('utils');

	(function() {
		var ModalWindow = extend(
				Base,
				{
					baseCls : 'yi-modal-window',
					// <div class="modal-body" />的左右border、padding之和，单位：px
					bodyLRFrameWidth : 42,// (1 + 20) * 2
					// <div class="modal-body" />应由总高度减去的高度，单位：px
					bodyMinusHeight : 141,// 1 + 49 + 20 * 2 + 60 + 1

					/**
					 * @cfg url String 页面的url
					 */

					/**
					 * @cfg params {} 额外的参数
					 */

					/**
					 * @cfg width Number 窗口的宽度
					 */

					/**
					 * @cfg height Number 窗口的高度
					 */

					/**
					 * @cfg buttons Array 窗口的按钮
					 * 
					 * {id String: 按钮的id, cls String: 按钮的样式, disabled Boolean:
					 * 是否不可用, hidden Boolean: 是否隐藏, text String: 按钮的文字, handler
					 * Function: 点击按钮时的处理方法}
					 */

					/**
					 * @cfg title String 窗口的标题
					 */

					/**
					 * @cfg scroll Boolean 窗口是否显示滚动条
					 */

					/**
					 * @cfg minHeight Number 窗口的最小高度
					 */

					/**
					 * @cfg maxHeight Number 窗口的最大高度
					 */

					/**
					 * @cfg modal Boolean 窗口是否带遮罩，默认带遮罩
					 */
					modal : true,

					afterRender : function(container) {
						ModalWindow.superclass.afterRender
								.call(this, container);

						this.el
								.html(
										'<div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h3>'
												+ (this.title || '&nbsp;')
												+ '</h3></div><div class="modal-body"></div><div class="modal-footer"></div></div></div>')
								.addClass(
										(this.cls ? this.cls + ' ' : '')
												+ this.baseCls + ' modal fade');
						var cmpId = this.getId();
						this.el.data('cmpId', cmpId);
						var $body = $('.modal-body', this.el);
						var $dialog = $('.modal-dialog', this.el);
						if (this.width) {
							$dialog.width(this.width);
							$body.width(this.width - this.bodyLRFrameWidth);
						}
						if (this.height) {
							$body.css({
								'max-height' : 'none',
								'height' : this.height - this.bodyMinusHeight
							});
						}
						if (this.maxHeight) {
							$body.css({
								'max-height' : this.maxHeight
										- this.bodyMinusHeight
							});
						}
						if (this.minHeight) {
							$body.css({
								'min-height' : this.minHeight
										- this.bodyMinusHeight
							});
						}
						if (this.scroll || this.height || this.maxHeight) {
							$body.css({
								'overflow-x' : 'hidden',
								'overflow-y' : 'auto'
							});
						}
						if (this.buttons) {
							this.addButtons(this.buttons)
						}
						if (this.url && '' != this.url) {
							var params = this.params;
							$('.modal-body', this.el).load(this.url,
									params || null, this.doPageLoad);
							params = null;
						}
						this.el.on('hide.bs.modal', {
							cmpId : cmpId
						}, this.onHide).on('shown.bs.modal', {
							cmpId : cmpId
						}, this.onShown).on('hidden.bs.modal', {
							cmpId : cmpId
						}, this.onHidden);
						// 是否带遮罩
						this.el.modal({
							backdrop : this.modal === true ? 'static' : 'false'
						});
						$dialog = null;
						$body = null;
						this.el = null;
					},
					addButtons : function(buttons) {
						var i, len = buttons.length, $footer = $(
								'.modal-footer', this.el);
						for (i = 0; i < len; i++) {
							var button = buttons[i];
							var $btn = $(
									'<a id="'
											+ (button.id || '')
											+ '" class="btn btn-default '
											+ (button.cls || '')
											+ ' '
											+ (button.disabled
													? 'disabled'
													: '')
											+ ' '
											+ (button.hidden ? this.baseCls
													+ '-button-hide' : '')
											+ '"></a>').html(button.text || '')
									.appendTo($footer);
							var handler = button.handler;
							if (handler && utils.isFunction(handler)) {
								$btn.on('click', {
									handler : handler,
									cmpId : this.getId()
								}, this.onBtnClick);
							}
							$btn = null;
						}
						$footer = null;
					},
					/**
					 * @description 加载内容
					 * @param option {} :
					 *            1)url String:页面地址 2)params {}:额外的参数
					 */
					load : function(option) {
						var option = option || {}, url = option.url || '', params = option.params
								|| null;
						if (url) {
							$('.modal-body', this.el).load(url, params,
									this.doPageLoad);
						}
					},
					onBtnClick : function(e) {
						var cmp = Base.get(e.data.cmpId);
						e.data.handler.call(cmp, $(this));
					},
					doPageLoad : function(responseText, textStatus, xhr) {
						var $el = $(this).parents('.yi-modal-window'), cmp = Base
								.get($el.data('cmpId'));
						cmp.trigger('load', cmp, responseText, textStatus, xhr);
						cmp = null;
						$el = null;
					},
					onHide : function(e) {
						var cmpId = e.data.cmpId, cmp = Base.get(cmpId);
						cmp.trigger('hide', cmp);
						cmp = null;
					},
					onShown : function(e) {
						var cmpId = e.data.cmpId, cmp = Base.get(cmpId);
						cmp.toFront();
						cmp.trigger('shown', cmp);
						cmp = null;
					},
					onHidden : function(e) {
						var cmpId = e.data.cmpId, cmp = Base.get(cmpId);
						cmp.trigger('hidden', cmp);
						cmp = null;
					},
					/**
					 * 显示窗口
					 */
					show : function() {
						this.toFront();
						this.el.modal('show');
					},
					/**
					 * 隐藏窗口
					 */
					hide : function() {
						this.el.modal('hide');
					},
					toFront : function() {
						$('.modal-backdrop').css({
							'zIndex' : utils.getZIndex()
						});
						this.el.css({
							'zIndex' : utils.getZIndex()
						});
					},
					beforeDestroy : function() {
						ModalWindow.superclass.beforeDestroy.call(this);
					}
				});

		module.exports = ModalWindow;
	}());
});