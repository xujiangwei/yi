<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="yi.core.*" %>
<%@page import="yi.debugger.*" %>
<%@page import="yi.toolkit.*" %>
<%
String name = request.getParameter("name");
String version = request.getParameter("version");
// 获取 MOD
Mod mod = DebuggerDirector.getInstance().getMod(name, version);
// 创建构建器
Builder builder = new Builder(DebuggerDirector.getInstance().getRootPath()
		, DebuggerDirector.getInstance().getProjectPath(), mod.getContextPath());
builder.start();
%>
<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title><%=mod.getName()%> <%=mod.getVersion()%> - 构建器</title>
<%=Stage.importStyles("../lib/") %>
<link href="assets/css/app-builder.css" rel="stylesheet" />
</head>

<body>
<header class="navbar navbar-inverse">
  <div class="container">
    <div class="navbar-header">
      <button class="navbar-toggle" type="button" data-toggle="collapse" data-target=".navbar-collapse">
      	<span class="sr-only">Toggle navigation</span>
      	<span class="icon-bar"></span>
      	<span class="icon-bar"></span>
      	<span class="icon-bar"></span>
      </button>
      <a href="javascript:;" class="navbar-brand">构建器</a>
    </div>
    <div class="navbar-collapse collapse">
      <ul class="nav navbar-nav navbar-right">
      </ul>
    </div>
  </div>
</header>

<div class="container">
  <div class="row">
    <div class="col-md-12">
    </div>
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
<script type="text/javascript">
(function() {
	
})();
</script>
<script src="assets/js/app-builder.js" type="text/javascript"></script>
</body>
</html>
