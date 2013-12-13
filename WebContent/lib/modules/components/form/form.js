/**
 * Form
 * 
 * @author wensong, wensong@dhcc.com.cn, 2013-12-10
 * 
 * @requires utils, extend, component
 * 
 * @method void submit()
 * 
 * @description updated on 2013-12-11
 * 
 */
define(function(require, exports, module) {
	'require:nomunge,exports:nomunge,module:nomunge';

	var utils = require('utils');
	var extend = require('extend');
	var Base = require('component');

	(function() {
		var HttpsRe = /^https/i;

		var Form = extend(Base, {
					/**
					 * uploadFile Boolean
					 * 
					 * 是否要上传文件
					 */
					baseCls : 'yi-form',
					baseHtml : '<form></form>',
					/**
					 * 提交表单
					 * 
					 * @augments {} option {} 1)url String: URL 2)params Object:
					 *           额外的参数 3)mothod String: 'GET' or 'POST'，默认'GET'
					 *           4)success Function: function(Form form)
					 *           5)failure Function: function(Form form)
					 *           6)timeout Number: 单位：毫秒 7)scope Object:
					 *           success和failure的作用域
					 */
					submit : function(option) {
						option = option || {};// 避免undefined
						var url = option.url || this.el.attr('action');
						if (utils.isEmpty(url)) {
							return;
						}

						// TODO 进度条
						// Form.beforeAction(option);

						if (this.uploadFile) {
							var id = utils.id('iframe');
							var $f = $('<iframe id="'
									+ id
									+ '" class="'
									+ this.baseCls
									+ '-hidden-frame" name="'
									+ id
									+ '" src="'
									+ (HttpsRe.test(window.location.protocol)
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

							var hiddens = [];
							if (option.params) {
								var P = option.params, p;
								for (p in P) {
									if (P.hasOwnProperty(p)) {
										var $h = $('<input type="hidden" name="'
												+ p
												+ '" value="'
												+ P[p]
												+ '" />').appendTo(this.el);
										hiddens.push($h);

										$h = null;
									}
								}

								P = null;
							}

							$f.one('load', {
										componentId : this.getId(),
										fc : fc,
										success : option.success,
										failure : option.failure,
										scope : option.scope
									}, this.onUploadFileFrameLoad);

							this.el.submit();

							if (hiddens.length > 0) {
								var i, len = hiddens.length;
								for (i = 0; i < len; i++) {
									hiddens[i].remove();

									delete hiddens[i];
								};
							}

							hiddens = null
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
							o.success = this.onSubmitSuccess;
							if (option.success
									&& utils.isFunction(option.success)) {
								o.successFn = option.success;
								o.scope = option.scope;
							}
							o.error = this.onSubmitError;
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

						// 只允许应用于jQuery对象中第一个元素则应使用return this;
						return this;
					},
					onUploadFileFrameLoad : function(e) {
						var r = {
							responseText : '',
							responseXML : null
						}, doc;

						try {
							doc = this.contentWindow.document
									|| this.contentDocument
									|| WINDOW.frames[id].document;
							if (doc) {
								if (doc.body) {
									r.responseText = doc.body.innerHTML;
								}
								r.responseXML = doc.XMLDocument || doc;
							}

							if (e.data.success
									&& utils.isFunction(e.data.success)) {
								e.data.success.call(e.data.scope || null, r);

								delete e.data.success;
							}
						} catch (exception) {
							if (e.data.failure
									&& utils.isFunction(e.data.failure)) {
								e.data.failure.call(e.data.scope || null, r);

								delete e.data.failure;
							}
						}

						if (e.data.componentId && e.data.fc) {
							var form = Base.get(e.data.componentId), fc = e.data.fc, p;
							for (p in fc) {
								if (fc.hasOwnProperty(p)) {
									if (utils.isEmpty(fc[p])) {
										form.el.removeAttr(p);
									} else {
										form.el.attr(p, fc[p]);
									}
								}
							}
						}

						// TODO 关闭进度条
						// form.afterAction();

						form = null;
						doc = null;
						r = null;

						$(this).remove();
					},
					onSubmitSuccess : function(data, textStatus, jqXhr) {
						var comp = Base.get(this.componentId);
						if (this.successFn && utils.isFunction(this.successFn)) {
							this.successFn
									.call(this.scope || null, comp, jqXhr);
							delete this.successFn;
						}
						delete this.failureFn;
						delete this.scope;

						// comp.afterAction();

						comp = null;
					},
					onSubmitError : function(jqXhr, textStatus, errorThrown) {
						var comp = Base.get(this.componentId);
						if (this.failureFn && utils.isFunction(this.failureFn)) {
							this.failureFn
									.call(this.scope || null, comp, jqXhr);
							delete this.failureFn;
						}
						delete this.successFn;
						delete this.failureFn;

						// comp.afterAction();

						comp = null;
					}
				});

		module.exports = Form;
	}());
});