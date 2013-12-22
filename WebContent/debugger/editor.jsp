<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="java.util.*" %>
<%@page import="yi.core.*" %>
<%@page import="yi.debugger.*" %>
<%@page import="yi.toolkit.*" %>
<%
String name = request.getParameter("name");
String version = request.getParameter("version");
// 获取 MOD
Mod mod = DebuggerDirector.getInstance().getMod(name, version);
String htmlFilename = mod.existHtmlFile() ? mod.getHtmlFilename() : (mod.existTmplFile() ? mod.getTmplFilename() : null);
List<String> scriptFileList = mod.getScriptFilenameList();
%>
<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>编辑器 - <%=mod.getName()%> <%=mod.getVersion()%></title>
<link href="../lib/core/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
<link href="../lib/core/yi/yi.min.css" rel="stylesheet" />
<link href="assets/css/app-editor.css" rel="stylesheet" />
</head>

<body>
<header class="navbar navbar-default">
  <div class="container">
    <div class="navbar-header">
      <button class="navbar-toggle" type="button" data-toggle="collapse" data-target=".navbar-collapse">
      	<span class="sr-only">Toggle navigation</span>
      	<span class="icon-bar"></span>
      	<span class="icon-bar"></span>
      	<span class="icon-bar"></span>
      </button>
      <div class="navbar-brand">编辑器 - <%=mod.getName()%> <%=mod.getVersion()%></div>
    </div>
  </div>
</header>

<div class="container main-toolbar">
  <div class="row">
    <div class="btn-toolbar col-sm-12" role="toolbar">
      <div class="btn-group">
        <button id="btn_debug" type="button" class="btn btn-default" disabled="disabled"><span class="glyphicon glyphicon-expand"></span> 调试</button>
      </div>
      <div class="btn-group">
        <button id="btn_save" type="button" class="btn btn-default" disabled="disabled"><span class="glyphicon glyphicon-floppy-disk"></span> 保存</button>
      </div>
      <div class="btn-group">
        <button type="button" class="btn btn-default" disabled="disabled"><span class="glyphicon glyphicon-cog"></span> 设置</button>
      </div>
    </div>
  </div>
</div>

<div class="container">
  <ul class="nav nav-tabs">
    <li class="active"><a href="#preview" data-toggle="tab"><span class="icon-preview"></span> 预览</a></li>
<%
if (null != htmlFilename) {
%>
    <li><a id="html_filename" href="#html" data-toggle="tab"><span class="icon-page"></span> <%=htmlFilename %></a></li>
<%
}
%>
  </ul>
  <div id="file_tab_content" class="tab-content">
    <div class="tab-pane fade in active" id="preview"><div class="no-preview"><img src="assets/img/unknown.png" /><br/><h4>无预览</h4></div></div>
<%
if (null != htmlFilename) {
%>
    <div class="tab-pane fade in" id="html">
      <pre id="html_editor" class="editor"><%=DebuggerPage.readHtmlFile(mod) %></pre>
    </div>
<%
}
%>
  </div>
</div>

<!-- 页脚 -->
<div class="container page-wrapper-footer">
  <div class="row">
    <div class="col-md-12">
      <div>
        <p class="text-muted credit">&copy; 2013,2014 东华软件</p>
      </div>
    </div>
  </div>
</div>
<%=Stage.importScripts("../lib/")%>
<script type="text/javascript">window.mod = <%=mod.toJSONString()%>;</script>
<script src="lib/ace/src-min-noconflict/ace.js" type="text/javascript"></script>
<script src="assets/js/app-editor.js" type="text/javascript"></script>
</body>
</html>
