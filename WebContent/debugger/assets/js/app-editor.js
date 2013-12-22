/*
 * Yi Framework
 * 
 * Copyright (c) 2013,2014 DHC Software Research Department
 */

(function() {
	// 禁用 AJAX 缓存
	$.ajaxSetup({
		cache: false
	});

	var yi = window.yi;
	var htmlEditor = null;

	// 配置 CommonJS
	yi.config("../");

	yi.ready(function() {
		fixModData();

		if ($('#html_editor').length > 0) {
			htmlEditor = ace.edit("html_editor");
			htmlEditor.setTheme("ace/theme/xcode");
			htmlEditor.getSession().setMode("ace/mode/html");
			var doc = htmlEditor.getSession().getDocument();
			// 绑定事件
			doc.on('change', _fireHtmlChange);
		}

		$('#btn_save').click(_onSave);
	});

	var _onSave = function(e) {
		alert('save');
	}

	var _fireHtmlChange = function(e) {
		$('#html_filename').html('<span class="icon-page"></span> <strong>*</strong>' + window.mod.html);
		$('#btn_save').button('reset');
	}

	var fixModData = function() {
		if (window.mod.html !== undefined) {
			window.mod.html = window.mod.html.substring(window.mod.path.length, window.mod.html.length);
		}
	}
})();
