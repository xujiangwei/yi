/*
 * index.js
 */

(function() {
	var yi = window.yi;

	// 配置 CommonJS
	yi.config("../");

	yi.ready(function() {
		// 加载 switch
		common.use('switch');

		$('#btn_new').click(function() {
			profileMode = MODE_NEW;
		});

		// 配置 Form
		configProfileForm();
		configSettingForm();
	});

	this.build = function(name, version) {
		var url = 'builder.jsp?name=' + name + '&version=' + version;
		var params = ["width=", 800
			, ",height=", 400
			, ",left=", (window.screen.availWidth - 800) / 2
			, ",top=", (window.screen.availHeight - 400 - 40) / 2
			, ",location=no,menubar=no,resizable=no,toolbar=no,scrollbars=no,status=no"
		];
		params = params.join("");
		var win = window.open(url, "builder", params);
		win.handle = win;
	}

	this.profileMod = function(name, version) {
		yi.mod.getMod(name, version, function(data) {
			// Form 赋值
			var form = $('#mod_profile_form');
			// name
			form.find('#input_name').val(data.name);
			// version
			var version = data.version;
			version = version.split('.');
			form.find('#input_version_major').val(version[0]);
			form.find('#input_version_minor').val(version[1]);
			form.find('#input_version_revision').val(version[2]);
			// description
			form.find('#input_desc').val(data.description);
			// file
			var path = data.path;
			var file = '';
			if (data["html"] !== undefined)
				file = data["html"];
			else if (data["tmpl"] !== undefined)
				file = data["tmpl"];
			file = file.substr(path.length, file.length);
			form.find('#input_html_file').val(file);
			form.find('#import_tag').parent().css('visibility', 'hidden');
			form.find('#is_tmpl').parent().css('visibility', 'hidden');
			// scripts
			if (data["scripts"] !== undefined) {
				var scripts = data["scripts"];
				for (var i = 0; i < scripts.length; ++i) {
					file = scripts[i];
					file = file.substr(path.length, file.length);
					var content = '<option value="'+ file +'">'+ file +'</option>';
					form.find('#script_files').append(content);
				}
			}
			// styles
			if (data["styles"] !== undefined) {
				var styles = data["styles"];
				for (var i = 0; i < styles.length; ++i) {
					file = styles[i];
					file = file.substr(path.length, file.length);
					var content = '<option value="'+ file +'">'+ file +'</option>';
					form.find('#style_files').append(content);
				}
			}

			// 主函数
			if (data.main !== undefined) {
				form.find('#input_main_function').val(data.main);
			}

			profileMode = MODE_MODIFY;
			$('#mod_profile_dialog').modal('show');
		}, function() {
			yi.alert('读取模组 ' + name + ' ' + version + ' 数据失败！');
		}, true);
	}

	this.redeployMod = function(name, version) {
		yi.alert('正在开发中……');
	}

	this.exportMod = function(name, version) {
		yi.alert('正在开发中……');
	}

	this.deleteMod = function(name, version) {
		yi.confirm('<p style="font-size:16px;">是否确定删除模组 <strong>'+ name + ' ' + version +'</strong> ？</p><div class="alert alert-danger">提示：工程文件删除后不可恢复！</div>', function(result) {
			if (result) {
				yi.mod.deleteDebug(name, version, function(data) {
					window.location.reload();
				});
			}
		});
	}

	// 工作模式
	var MODE_NEW = 1;
	var MODE_MODIFY = 2;
	var profileMode = MODE_MODIFY;

	// 配置 Profile 表单
	var configProfileForm = function() {
		var form = $('#mod_profile_form');
		// 启动配置模组的表单验证
		form.verify({ listeners: {
			onFormValidate: function(isFormValid, event) {
				if (isFormValid) {
					// 读取 Form 数据
					var mod = {"name": form.find('#input_name').val()
						, "version": form.find('#input_version_major').val() + "." + form.find('#input_version_minor').val() + "." + form.find('#input_version_revision').val()
						, "description": form.find('#input_desc').val()};
					var htmlFile = form.find('#input_html_file').val();
					if (htmlFile.length > 0) {
						// 是否导入 JSP 标签
						mod["importTag"] = form.find('#import_tag').prop("checked");

						// 自动添加文件后缀名
						if (htmlFile.indexOf(".") < 0) {
							htmlFile += (mod["importTag"] ? ".jsp" : ".html");
						}

						if (form.find('#is_tmpl').prop("checked")) {
							mod["tmpl"] = htmlFile;
						}
						else {
							mod["html"] = htmlFile;
						}
					}

					// 脚本文件列表
					var files = form.find('#script_files').find('option');
					if (files.length > 0) {
						var scripts = new Array();
						files.each(function(index, element) {
							scripts.push($(this).val());
						});
						mod["scripts"] = scripts;
					}
					// 样式文件列表
					files = form.find('#style_files').find('option');
					if (files.length > 0) {
						var styles = new Array();
						files.each(function(index, element) {
							styles.push($(this).val());
						});
						mod["styles"] = styles;
					}

					if (profileMode == MODE_NEW) {
						yi.mod.newDebug(mod, function() {
							$('#mod_profile_dialog').modal('hide');
							setTimeout(function() {
								window.location.reload();
							}, 500);
						}, function() {
							yi.alert('<p class="text-danger">新建模组失败</p>');
						});
					}
					else if (profileMode == MODE_MODIFY) {
						$('#mod_profile_dialog').modal('hide');
					}
				}
			},
			onFieldError: function(field, constraint) {
				
			}
		}});

		// 表单“确定”按钮
		$('#mod_profile_dialog').find('#ok').click(function(e) {
			form.verify('validate');
		});

		// 绑定按钮事件
		// 删除界面文件
		form.find('#btn_remove_html').click(function(e) {
			form.find('#input_html_file').val('');
		});
		// 添加脚本
		form.find('#btn_add_script').click(function(e) {
			yi.prompt("请输入脚本文件名", function(result) {
				if (result !== null) {
					// 校验输入
					var regExp = /^[a-z0-9A-Z_\.\-]+$/;
					if (!regExp.test(result)) {
						yi.pasteDialogTips('文件名格式不合法，请重新输入', 3000);
						return false;
					}
					else if (result.substr(result.length - 3, 3) != '.js') {
						yi.pasteDialogTips('文件名没有使用 ".js" 作为后缀', 3000);
						return false;
					}

					var content = '<option value="'+ result +'">'+ result +'</option>';
					form.find('#script_files').append(content);
				}
			});
		});
		// 删除脚本
		form.find('#btn_remove_script').click(function(e) {
			var el = form.find('#script_files');
			var num = el.find('option').length;
			if (num == 0) {
				return;
			}

			var selected = el.val();
			if (null == selected) {
				yi.alert('<p class="text-danger">请先选择需要删除的文件，再点击“删除”按钮。</p>');
				return;
			}

			if (profileMode == MODE_MODIFY) {
				yi.confirm('<p>您是否确认要删除脚本文件“' + selected + '”？</p>', function(result) {
					if (result) {
						// TODO
					}
				});
			}
			else if (profileMode == MODE_NEW) {
				el.find('option:selected').remove();
			}
		});
		// 添加样式表
		form.find('#btn_add_style').click(function(e) {
			yi.prompt("请输入样式表文件名", function(result) {
				if (result !== null) {
					// 校验输入
					var regExp = /^[a-z0-9A-Z_\.\-]+$/;
					if (!regExp.test(result)) {
						yi.pasteDialogTips('文件名格式不合法，请重新输入', 3000);
						return false;
					}
					else if (result.substr(result.length - 4, 4) != '.css') {
						yi.pasteDialogTips('文件名没有使用 ".css" 作为后缀', 3000);
						return false;
					}

					var content = '<option value="'+ result +'">'+ result +'</option>';
					form.find('#style_files').append(content);
				}
			});
		});
		// 删除样式表
		form.find('#btn_remove_style').click(function(e) {
			var el = form.find('#style_files');
			var num = el.find('option').length;
			if (num == 0) {
				return;
			}

			var selected = el.val();
			if (null == selected) {
				yi.alert('<p class="text-danger">请先选择需要删除的文件，再点击“删除”按钮。</p>');
				return;
			}

			if (profileMode == MODE_MODIFY) {
				yi.confirm('<p>您是否确认要删除脚本文件“' + selected + '”？</p>', function(result) {
					if (result) {
						// TODO
					}
				});
			}
			else if (profileMode == MODE_NEW) {
				el.find('option:selected').remove();
			}
		});

		// 监听事件
		$('#mod_profile_dialog').on('hidden.bs.modal', function (e) {
			resetProfileForm();
		});
	}

	// 重置 Profile 表单
	var resetProfileForm = function() {
		var form = $('#mod_profile_form');
		form.find('#input_name').val('').removeClass('verifier-success').removeClass('verifier-error');
		form.find('#input_version_major').val('').removeClass('verifier-success').removeClass('verifier-error');
		form.find('#input_version_minor').val('').removeClass('verifier-success').removeClass('verifier-error');
		form.find('#input_version_revision').val('').removeClass('verifier-success').removeClass('verifier-error');
		form.find('#input_desc').val('').removeClass('verifier-success').removeClass('verifier-error');
		form.find('#input_html_file').val('').removeClass('verifier-success').removeClass('verifier-error');

		form.find('#import_tag').prop("checked", true);
		form.find('#import_tag').parent().css('visibility', 'visible');
		form.find('#is_tmpl').prop("checked", false);
		form.find('#is_tmpl').parent().css('visibility', 'visible');

		form.find('#script_files').html('');
		form.find('#style_files').html('');

		form.find('#input_main_function').val('').removeClass('verifier-success').removeClass('verifier-error');

		form.find('.verifier-error-list').each(function(index, element) {
            $(this).remove();
        });
	}

	var configSettingForm = function() {
		// 启动配置模组的表单验证
		$('#setting_form').verify({ listeners: {
			onFormValidate: function(isFormValid, event) {
				if (isFormValid) {
					
				}
			},
			onFieldError: function(field, constraint) {
				
			}
		}});
	}
})();
