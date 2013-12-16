/*
 * index.js
 */

(function() {
	var yi = window.yi;

	// 配置 CommonJS
	yi.config("../");

	yi.ready(function() {
		$('#btn_new').click(function() {
			profileMode = MODE_NEW;
		});

		// 配置 Form
		configProfileForm();
	});

	this.build = function(url) {
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

	// 工作模式
	var MODE_NEW = 1;
	var MODE_MODIFY = 2;
	var profileMode = MODE_MODIFY;

	// 配置 Profile 表单
	var configProfileForm = function() {
		// 启动配置模组的表单验证
		$('#mod_profile_form').verify({ listeners: {
			onFormValidate: function(isFormValid, event) {
				
			},
			onFieldError: function(field, constraint) {
				
			}
		}});

		// 表单“确定”按钮
		$('#mod_profile_dialog').find('#ok').click(function(e) {
			$('#mod_profile_form').verify('validate');
		});

		// 绑定按钮事件
		// 添加脚本
		$('#mod_profile_form').find('#btn_add_script').click(function(e) {
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
					$('#mod_profile_form').find('#script_files').append(content);
				}
			});
		});
		// 删除脚本
		$('#mod_profile_form').find('#btn_remove_script').click(function(e) {
			var el = $('#mod_profile_form').find('#script_files');
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

		form.find('#import_jsp').prop("checked", true);
		form.find('#is_tmpl').prop("checked", false);

		form.find('#script_files').html('');
		form.find('#style_files').html('');

		form.find('.verifier-error-list').each(function(index, element) {
            $(this).remove();
        });
	}

	var ModDummy = function() {
	}
	//ModDummy.prototype
})();
