/**
 * Form
 * 
 * @author wensong, wensong@dhcc.com.cn, 2013-12-10
 * 
 * @extends component
 * 
 * @requires utils, extend, component
 * 
 * @method void submit(Object option)
 * 
 * @description updated on 2014-03-11
 * 
 */
define(function(require, exports, module) {
	'require:nomunge,exports:nomunge,module:nomunge';

	var utils = require('utils');
	var extend = require('extend');
	var Base = require('component');

	function proventSubmit(e) {
		if (e.keyCode == 13) {
			e.preventDefault();
		}
	}

	function onUploadFileFrameLoad(e) {
		var r = {
			responseText : '',
			responseXML : null
		}, doc;

		try {
			doc = this.contentWindow.document || this.contentDocument
					|| WINDOW.frames[id].document;
			if (doc) {
				if (doc.body) {
					r.responseText = doc.body.innerHTML;
				}
				r.responseXML = doc.XMLDocument || doc;
			}

			if (e.data.success && utils.isFunction(e.data.success)) {
				e.data.success.call(e.data.scope || null, r);

				delete e.data.success;
			}
		} catch (exception) {
			if (e.data.failure && utils.isFunction(e.data.failure)) {
				e.data.failure.call(e.data.scope || null, r);

				delete e.data.failure;
			}
		}

		if (e.data.componentId && e.data.fc) {
			var comp = Base.get(e.data.componentId), fc = e.data.fc, p;
			for (p in fc) {
				if (fc.hasOwnProperty(p)) {
					if (utils.isEmpty(fc[p])) {
						comp.el.removeAttr(p);
					} else {
						comp.el.attr(p, fc[p]);
					}
				}
			}
		}

		// TODO 关闭进度条
		// comp.afterAction();

		comp = null;
		doc = null;
		r = null;

		$(this).remove();
	}

	function onSubmitSuccess(data, textStatus, jqXhr) {
		var comp = Base.get(this.componentId);
		if (this.successFn && utils.isFunction(this.successFn)) {
			this.successFn.call(this.scope || null, comp, jqXhr);
			delete this.successFn;
		}
		delete this.failureFn;
		delete this.scope;

		// comp.afterAction();

		comp = null;
	}

	function onSubmitError(jqXhr, textStatus, errorThrown) {
		var comp = Base.get(this.componentId);
		if (this.failureFn && utils.isFunction(this.failureFn)) {
			this.failureFn.call(this.scope || null, comp, jqXhr);
			delete this.failureFn;
		}
		delete this.successFn;
		delete this.failureFn;

		// comp.afterAction();

		comp = null;
	}

	(function() {
		var httpsRe = /^https/i;

		var Form = extend(
				Base,
				{
					baseCls : 'yi-form',
					baseHtml : '<form></form>',

					/**
					 * uploadFile Boolean
					 * 
					 * 是否要上传文件
					 */

					afterRender : function(container) {
						Form.superclass.afterRender.call(this, container);

						this.el.on('keydown', proventSubmit);
					},
					/**
					 * 提交表单
					 * 
					 * @augments option {} 1)original Boolean 是否使用原生的表单提交 2)url
					 *           String: URL 3)params Object: 额外的参数 4)mothod
					 *           String: 'GET' or 'POST'，默认'GET' 5)success
					 *           Function: function(Form form, XmlHttpRequest
					 *           xhr) 6)failure Function: function(Form form,
					 *           XmlHttpRequest xhr) 7)timeout Number: 单位：毫秒
					 *           8)scope Object: success和failure的作用域
					 */
					submit : function(option) {
						option = option || {};// 避免undefined
						var action = this.el.attr('action');
						var url = option.url || action;
						if (utils.isEmpty(url)) {
							return;
						}

						if (option.original) {
							this.el.attr('action', url);

							if (option.params) {
								this.createHiddens(option.params);
							}

							this.el.submit();
						}

						// TODO 进度条
						// Form.beforeAction(option);

						if (this.uploadFile) {
							var id = utils.id('iframe');
							var $f = $(
									'<iframe id="'
											+ id
											+ '" class="'
											+ this.baseCls
											+ '-hidden-frame" name="'
											+ id
											+ '" src="'
											+ (httpsRe
													.test(window.location.protocol)
													&& utils.isIE
													? 'javascript:""'
													: 'about:blank') + '" />')
									.appendTo($('body'));
							if (utils.isIE) {
								document.frames[id].name = id;
							}

							var formId = this.el.attr('id');
							if (!formId) {
								formId = utils.id();
								this.el.attr('id', formId);
							}
							var fc = {
								id : formId,
								action : this.el.attr('action'),
								method : this.el.attr('method'),
								enctype : this.el.attr('enctype'),
								target : this.el.attr('target')
							}

							this.el.attr('action', url).attr('method', 'POST')
									.attr('enctype', 'multipart/form-data')
									.attr('target', id);

							if (option.params) {
								this.createHiddens(option.params);
							}

							$f.one('load', {
								componentId : this.getId(),
								fc : fc,
								success : option.success,
								failure : option.failure,
								scope : option.scope
							}, onUploadFileFrameLoad);

							this.el.submit();

							this.deleteHiddens();

							$f = null;
						} else {
							var o = {
								url : option.url,
								data : {},
								traditional : true
							};
							if (option.params) {
								o.data = option.params;
							}
							if (option.method) {
								o.type = option.method;
							}
							o.componentId = this.getId();
							o.success = onSubmitSuccess;
							if (option.success
									&& utils.isFunction(option.success)) {
								o.successFn = option.success;
								o.scope = option.scope;
							}
							o.error = onSubmitError;
							if (option.failure
									&& utils.isFunction(option.failure)) {
								o.failureFn = option.failure;
								o.scope = option.scope;
							}
							if (option.timeout && $.isNumber(option.timeout)) {
								o.timeout = option.timeout;
							}

							var sa = this.el.serializeArray(), i, len = sa.length;
							for (i = 0; i < len; i++) {
								o.data[sa[i].name] = sa[i].value;
							}
							// //
							// jQuery.fn.serializeArray()取checkbox的值有bug，要进行特殊处理
							// var D = o.data, $cs = $(':checkbox', this.el);
							// if ($cs.size() > 0) {
							// var j, len = $cs.size();
							// for (j = 0; j < len; j++) {
							// var $c = $cs.eq(j);
							// if ($c.prop('checked')) {
							// var name = $c.attr('name');
							// if (!D[name] || !$.isArray(D[name])) {
							// D[name] = [];
							// }
							// D[name].push($c.val());
							// }
							//
							// $c = null;
							// }
							// }
							//
							// $cs = null;
							// D = null;
							// sa = null;

							$.ajax(o);
						}
					},
					createHiddens : function(params) {
						this.deleteHiddens()

						this.hiddens = [];
						var p;
						for (p in params) {
							if (params.hasOwnProperty(p)) {
								var $h = $(
										'<input type="hidden" name="' + p
												+ '" value="' + params[p]
												+ '" />').appendTo(this.el);
								this.hiddens.push($h);

								$h = null;
							}
						}
					},
					deleteHiddens : function() {
						if (this.hiddens) {
							var i, len = hiddens.length;
							for (i = 0; i < len; i++) {
								hiddens[i].remove();

								delete hiddens[i];
							};
						}

						delete this.hiddens;
					}
				});

		module.exports = Form;
	}());
});