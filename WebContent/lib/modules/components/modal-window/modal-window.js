/**
 * ModalWindow
 * 
 * @author dengfenfen, dengfenfen@dhcc.com.cn, 2013-12-05
 * 
 * @requires extend, component, utils
 * 
 * @method load: Function(Object option)
 * @method show: Function()
 * @method hide: Function()
 * 
 * @event beforeshow: Function(ModalWindow win)
 * @event show: Function(ModalWindow win)
 * @event beforehide: Function(ModalWindow win)
 * @event hide: Function(ModalWindow win)
 * @event load: Function(ModalWindow win ,String responseText, String
 *        textStatus, XMLHttpRequest xhr)
 * 
 * @description updated on 2014-04-29
 * 
 */
define(function(require, exports, module) {
	'require:nomunge,exports:nomunge,module:nomunge';

	require('./modal-window.css');
	var extend = require('extend');
	var Base = require('component');
	var utils = require('utils');

	function onBtnClick(e) {
		var comp = Base.get(e.data.componentId);
		e.data.handler.call(comp, $(this));

		comp = null;
	}

	function initPage(e) {
		var comp = Base.get(e.data.componentId);
		if (comp) {
			comp.load();
		}

		comp = null;
	}

	function doPageLoad(responseText, textStatus, xhr) {
		var comp = Base.get($(this).data('componentId'));
		if (comp) {
			comp.trigger('load', comp, responseText, textStatus, xhr);
		}

		comp = null;
	}

	function onShown(e) {
		var comp = Base.get(e.data.componentId);
		if (comp) {
			comp.trigger('show', comp);
		}

		comp = null;
	}

	function onHidden(e) {
		var comp = Base.get(e.data.componentId);
		if (comp) {
			comp.trigger('hide', comp);
		}

		comp = null;
	}

	function onCloseIconClick(e) {
		var comp = Base.get(e.data.componentId);
		if (comp) {
			comp.hide();
		}

		comp = null;
	}

	(function() {
		var ModalWindow = extend(
				Base,
				{
					baseCls : 'yi-modal-window',
					baseHtml : '<div class="modal fade"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h4 class="modal-title"></h4></div><div class="modal-body"></div><div class="modal-footer"></div></div></div></div>',
					// <div class="modal-body" />的左右border、padding之和，单位：px
					bodyLRFrameWidth : 42,// (1 + 20) * 2
					// <div class="modal-body" />应由总高度减去的高度，单位：px
					bodyMinusHeight : 141,// 1 + 49 + 20 * 2 + 60 + 1

					/**
					 * @cfg title String
					 * 
					 * 窗口的标题
					 */

					/**
					 * @cfg width Number
					 * 
					 * 窗口的宽度
					 */

					/**
					 * @cfg height Number
					 * 
					 * 窗口的高度
					 */

					/**
					 * @cfg minHeight Number
					 * 
					 * 窗口的最小高度
					 */

					/**
					 * @cfg maxHeight Number
					 * 
					 * 窗口的最大高度
					 */

					/**
					 * @cfg scroll Boolean
					 * 
					 * 窗口是否显示滚动条
					 */

					/**
					 * @cfg url String
					 * 
					 * 页面的url
					 */

					/**
					 * @cfg params Object
					 * 
					 * 额外的参数
					 */

					/**
					 * @cfg buttons Array
					 * 
					 * 显示在窗口底部的按钮。每个按钮的属性包括：{id String: 按钮的id, cls String:
					 * 按钮的样式, iconCls String: 按钮的图标样式,disabled Boolean: 是否不可用,
					 * hidden Boolean: 是否隐藏, text String: 按钮的文字, handler
					 * Function: 点击按钮时的处理方法}
					 */

					/**
					 * @cfg modal Boolean
					 * 
					 * 窗口是否带遮罩，默认true
					 */
					modal : true,

					afterRender : function(container) {
						ModalWindow.superclass.afterRender
								.call(this, container);

						this.el.find('.modal-title').empty().html(
								this.title || '&nbsp;');

						var id = this.getId();

						this.dialog = $('.modal-dialog', this.el);
						this.body = $('.modal-body', this.el).data(
								'componentId', id);

						if (this.width) {
							this.dialog.width(this.width);
							this.body.width(this.width - this.bodyLRFrameWidth);
						}
						if (this.height) {
							this.body.css({
								'max-height' : 'none',
								'height' : this.height - this.bodyMinusHeight
							});
						}
						if (this.maxHeight) {
							this.body.css({
								'max-height' : this.maxHeight
										- this.bodyMinusHeight
							});
						}
						if (this.minHeight) {
							this.body.css({
								'min-height' : this.minHeight
										- this.bodyMinusHeight
							});
						}
						if (this.scroll || this.height || this.maxHeight) {
							this.body.css({
								'overflow-x' : 'hidden',
								'overflow-y' : 'auto'
							});
						}
						if (this.buttons) {
							this.addButtons(this.buttons)
						}

						this.el.modal({
							show : false,
							backdrop : this.modal === true ? 'static' : 'false' // 是否带遮罩
						}).one('shown.bs.modal', {
							componentId : id
						}, initPage).on('shown.bs.modal', {
							componentId : id
						}, onShown).on('hidden.bs.modal', {
							componentId : id
						}, onHidden);

						// prevent closing modal without trigger the
						// 'beforehide' event
						this.closeIcon = this.el.find('.close').attr(
								'data-dismiss', '').on('click', {
							componentId : id
						}, onCloseIconClick);
					},
					addButtons : function(buttons) {
						var i, len = buttons.length, $footer = $(
								'.modal-footer', this.el), id = this.getId();
						for (i = 0; i < len; i++) {
							var b = buttons[i];
							var $btn = $(
									'<button type="button"'
											+ (b.id
													? (' id="' + b.id + '"')
													: '')
											+ ' class="'
											+ (b.cls ? 'btn btn-default '
													+ b.cls : 'btn btn-default')
											+ '"'
											+ (b.disabled ? ' disabled' : '')
											+ '>'
											+ (b.iconCls
													? ('<span class="'
															+ b.iconCls
															+ '"></span> ' + b.text)
													: b.text) + '</button>')
									.appendTo($footer);
							var handler = b.handler;
							if (handler && utils.isFunction(handler)) {
								$btn.on('click', {
									handler : handler,
									componentId : id
								}, onBtnClick);
							}
							$btn = null;
						}
						$footer = null;
					},
					/**
					 * 加载页面
					 * 
					 * @argument option {} 1)url String:页面地址 2)params {}:额外的参数
					 */
					load : function(option) {
						var option = option || {};
						this.url = option.url || this.url;
						this.params = option.params || this.params;
						if (this.url) {
							this.body.empty().load(this.url,
									this.params || null, doPageLoad);
						}
					},
					/**
					 * 显示
					 */
					show : function() {
						if (this.trigger('beforeshow', this) !== false) {
							this.toFront();
							this.el.modal('show');
						}
					},
					toFront : function() {
						this.el.css({
							'zIndex' : utils.getZIndex()
						});
					},
					/**
					 * 隐藏
					 */
					hide : function() {
						if (this.trigger('beforehide', this) !== false) {
							this.toFront();
							this.el.modal('hide');
						}
					},
					beforeDestroy : function() {
						if (this.closeIcon) {
							this.closeIcon.off('click', onCloseIconClick);
							delete this.closeIcon;
						}

						delete this.body;
						delete this.dialog;

						this.el.off('shown.bs.modal', onShown).off(
								'hidden.bs.modal', onHidden);

						ModalWindow.superclass.beforeDestroy.call(this);
					}
				});

		module.exports = ModalWindow;
	}());
});