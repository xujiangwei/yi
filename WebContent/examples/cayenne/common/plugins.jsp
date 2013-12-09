<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<!-- 前端开发库，应该在<header />中，页面元信息（/common/meta.jsp）之后加载  -->
<!-- CSS -->
<!-- Bootstrap -->
<link rel="stylesheet" type="text/css" href="${ctx}/lib/core/bootstrap/css/bootstrap.css" />
<!-- common -->
<link rel="stylesheet" type="text/css" href="${ctx}/lib/extensions/default.css" />
<!-- private -->
<link rel="stylesheet" type="text/css" href="${ctx}/private/styles/default.css" />
<!-- form -->
<link rel="stylesheet" type="text/css" href="${ctx}/lib/plugins/form/resources/jquery.combobox.css" />
<link rel="stylesheet" type="text/css" href="${ctx}/lib/plugins/form/resources/jquery.combotree.css" />
<link rel="stylesheet" type="text/css" href="${ctx}/lib/plugins/form/resources/jquery.file.css" />
<link rel="stylesheet" type="text/css" href="${ctx}/lib/plugins/form/resources/jquery.form.css" />
<link rel="stylesheet" type="text/css" href="${ctx}/lib/plugins/form/resources/jquery.placeholder.css" />
<link rel="stylesheet" type="text/css" href="${ctx}/lib/plugins/form/resources/jquery.validation.css" />
<link rel="stylesheet" type="text/css" href="${ctx}/lib/plugins/form/resources/jquery.datepicker.css" />
<!-- formatter -->
<link rel="stylesheet" type="text/css" href="${ctx}/lib/plugins/formatter/resources/jquery.textFormatter.css" />
<!-- grid -->
<link rel="stylesheet" type="text/css" href="${ctx}/lib/plugins/grid/resources/jquery.grid.css" />
<!-- tree -->
<link rel="stylesheet" type="text/css" href="${ctx}/lib/plugins/tree/resources/jquery.tree.css" />
<!-- layer -->
<link rel="stylesheet" type="text/css" href="${ctx}/lib/plugins/layer/resources/jquery.layer.css" />
<link rel="stylesheet" type="text/css" href="${ctx}/lib/plugins/layer/resources/jquery.layer-page.css" />
<link rel="stylesheet" type="text/css" href="${ctx}/lib/plugins/layer/resources/jquery.modal-window.css" />
<link rel="stylesheet" type="text/css" href="${ctx}/lib/plugins/layer/resources/jquery.msg.css" />
<!-- layout -->
<link rel="stylesheet" type="text/css" href="${ctx}/lib/plugins/layout/resources/jquery.card-layout.css" />
<!-- permission -->
<link rel="stylesheet" type="text/css" href="${ctx}/lib/plugins/permission/resources/jquery.permission.css" />
<!-- progress -->
<link rel="stylesheet" type="text/css" href="${ctx}/lib/plugins/progress/resources/jquery.progress.css" />
<!-- scroll -->
<link rel="stylesheet" type="text/css" href="${ctx}/lib/plugins/scroll/resources/jquery.scroll.css" />
<!-- JavaScript -->
<!-- jQuery -->
<script type="text/javascript" src="${ctx}/lib/core/jquery/jquery-1.9.1.min.js"></script>
<!-- Bootstrap -->
<script type="text/javascript" src="${ctx}/lib/core/bootstrap/js/bootstrap.min.js"></script>
<!-- respond -->
<!--[if lt IE 9]>
<script type="text/javascript" src="${ctx}/lib/core/respond/respond.min.js"></script>
<![endif]-->
<!-- core -->
<script type="text/javascript" src="${ctx}/lib/plugins/core/jquery.core.js"></script>
<!-- data -->
<script type="text/javascript" src="${ctx}/lib/plugins/data/jquery.reader.js"></script>
<!-- form -->
<script type="text/javascript" src="${ctx}/lib/plugins/form/jquery.check.js"></script>
<script type="text/javascript" src="${ctx}/lib/plugins/form/jquery.combobox.js"></script>
<script type="text/javascript" src="${ctx}/lib/plugins/form/jquery.combotree.js"></script>
<script type="text/javascript" src="${ctx}/lib/plugins/form/jquery.file.js"></script>
<script type="text/javascript" src="${ctx}/lib/plugins/form/jquery.form.js"></script>
<script type="text/javascript" src="${ctx}/lib/plugins/form/jquery.placeholder.js"></script>
<script type="text/javascript" src="${ctx}/lib/plugins/form/jquery.validation.js"></script>
<script type="text/javascript" src="${ctx}/lib/plugins/form/jquery.datepicker.js"></script>
<!-- formatter -->
<script type="text/javascript" src="${ctx}/lib/plugins/formatter/jquery.textFormatter.js"></script>
<!-- grid -->
<script type="text/javascript" src="${ctx}/lib/plugins/grid/jquery.grid.js"></script>
<!-- tree -->
<script type="text/javascript" src="${ctx}/lib/plugins/tree/jquery.tree.js"></script>
<!-- layer -->
<script type="text/javascript" src="${ctx}/lib/plugins/layer/jquery.layer.js"></script>
<script type="text/javascript" src="${ctx}/lib/plugins/layer/jquery.layer-page.js"></script>
<script type="text/javascript" src="${ctx}/lib/plugins/layer/jquery.modal-window.js"></script>
<script type="text/javascript" src="${ctx}/lib/plugins/layer/jquery.msg.js"></script>
<!-- layout -->
<script type="text/javascript" src="${ctx}/lib/plugins/layout/jquery.card-layout.js"></script>
<!-- permission -->
<script type="text/javascript" src="${ctx}/lib/plugins/permission/jquery.permission.js"></script>
<!-- progress -->
<script type="text/javascript" src="${ctx}/lib/plugins/progress/jquery.progress.js"></script>
<!-- scroll -->
<script type="text/javascript" src="${ctx}/lib/plugins/scroll/jquery.scroll.js"></script>
<!-- adaptable -->
<script type="text/javascript" src="${ctx}/lib/plugins/adaptable/jquery.adaptable.js"></script>
<!-- template -->
<script type="text/javascript" src="${ctx}/lib/plugins/template/jquery.template.js"></script>
<script type="text/javascript" src="${ctx}/lib/plugins/template/jquery.i18n.js"></script>
<!-- 国际化 -->
<script type="text/javascript" src="${ctx}/lib/plugins/jquery.extension-lang-${locale}.js"></script>
<script type="text/javascript" src="${ctx}/locale/ApplicationResources_${locale}.js"></script>
<script type="text/javascript">
	var locale = '${locale}';
</script>