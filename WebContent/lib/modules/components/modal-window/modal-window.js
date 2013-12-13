/**
 * modalWindow 对话框
 * 
 * @author dengfenfen, dengfenfen@dhcc.com.cn, 2013-12-05
 * 
 * @requires extend, component
 * 
 * @method load: Function(Object option)
 * @method show: Function()
 * @method hide: Function()
 * 
 * @event hide: Function(modalWindow win ,String cmpId)
 * @event hidden: Function(modalWindow win ,String cmpId)
 * @event show: Function(modalWindow win ,String cmpId)
 * @event shown: Function(modalWindow win ,String cmpId)
 * @event load: Function(modalWindow win ,String responseText, String
 *        textStatus, XMLHttpRequest xhr)
 * 
 * @description updated on 2013-12-11
 * 
 */
define(function(require, exports, module) {
	'require:nomunge,exports:nomunge,module:nomunge';

	require('./modal-window.css');
	var extend = require('extend');
	var Base = require('component');

	(function() {
		var modalWindow = extend(Base, {
			baseCls : 'yi-modal-window',
			zIndex : 1000,
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
			 * {id：按钮的id, cls: 按钮的样式 , disabled: 按钮是否可用, hidden:是否隐藏按钮,text:
			 * 按钮的文字, handler:点击按钮时的处理方法}
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

			onRender : function(container, position) {
				modalWindow.superclass.onRender.call(this, container, position);
			},
			afterRender : function() {
				modalWindow.superclass.afterRender.call(this);
				this.init();
			},
			init : function() {
				var $el = this.el, baseCls = this.baseCls;
				$el
						.append('<div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h3>'
								+ (this.title || '&nbsp;')
								+ '</h3></div><div class="modal-body"></div><div class="modal-footer"></div></div></div>')
						.addClass((this.cls ? this.cls + ' ' : '') + baseCls
								+ ' modal fade');
				var cmpId = this.getId();
				$el.data('cmpId', cmpId);
				var $body = $('.modal-body', $el);
				var $dialog = $('.modal-dialog', $el);
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
				if (this.buttons && $.isArray(this.buttons)) {
					this.addButtons(this.buttons)
				}
				// 是否带遮罩
				$el.modal({
							backdrop : this.modal === true ? 'static' : 'false'
						});
				if (this.url) {
					var params = this.params;
					$('.modal-body', $el).load(this.url, params || null,
							this.doPageLoad);
					params = null;
				}
				$el.on('show.bs.modal', {
							cmpId : cmpId
						}, this.onShow).on('hide.bs.modal', {
							cmpId : cmpId
						}, this.onHide).on('shown.bs.modal', {
							cmpId : cmpId
						}, this.onShown).on('hidden.bs.modal', {
							cmpId : cmpId
						}, this.onHidden);
				$dialog = null;
				$body = null;
				$el = null;
			},
			addButtons : function(buttons) {
				var i, len = buttons.length, $footer = $('.modal-footer',
						this.el);
				for (i = 0; i < len; i++) {
					var button = buttons[i];
					var $btn = $('<a id='
							+ (button.id || '')
							+ ' class="btn btn-default '
							+ (button.cls || '')
							+ ' '
							+ (button.disabled ? 'disabled' : '')
							+ ' '
							+ (button.hidden
									? this.baseCls + '-button-hide'
									: '') + '"></a>').html(button.text || '')
							.appendTo($footer);
					var handler = button.handler;
					if (handler && $.isFunction(handler)) {
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
			 * 手动载入内容
			 */
			load : function(option) {
				var option = option || {}, url = option.url || '', params = option.params
						|| null;
				if (url) {
					$('.modal-body', this.el)
							.load(url, params, this.doPageLoad);
				}
			},
			onBtnClick : function(e) {
				var cmp = Base.get(e.data.cmpId);
				e.data.handler.call(cmp);
			},
			doPageLoad : function(responseText, textStatus, xhr) {
				var $el = $(this).parents('.yi-modal-window'), cmp = Base
						.get($el.data('cmpId'));
				cmp.trigger('load', cmp, responseText, textStatus, xhr);
				cmp = null;
				$el = null;
			},
			onShow : function(e) {
				var cmpId = e.data.cmpId, cmp = Base.get(cmpId);
				cmp.toFront();
				cmp.trigger('show', cmp, cmpId);
				cmp = null;
			},
			onHide : function(e) {
				var cmpId = e.data.cmpId, cmp = Base.get(cmpId);
				cmp.trigger('hide', cmp, cmpId);
				cmp = null;
			},
			onShown : function(e) {
				var cmpId = e.data.cmpId, cmp = Base.get(cmpId);
				cmp.trigger('shown', cmp, cmpId);
				cmp = null;
			},
			onHidden : function(e) {
				var cmpId = e.data.cmpId, cmp = Base.get(cmpId);
				cmp.trigger('hidden', cmp, cmpId);
				cmp = null;
			},
			/**
			 * 显示窗口
			 */
			show : function() {
				this.toFront();
				$(this.el).modal('show');
			},
			/**
			 * 隐藏窗口
			 */
			hide : function() {
				$(this.el).modal('hide');
			},
			/**
			 * 置于最前
			 */
			toFront : function() {
				$('.modal-backdrop').css({
							'zIndex' : this.zIndex++
						});
				$(this.el).css({
							'zIndex' : this.zIndex++
						});
			},
			beforeDestroy : function() {
				modalWindow.superclass.beforeDestroy.call(this);
			}
		});

		module.exports = modalWindow;
	}());
});