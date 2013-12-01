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
<title>构建器 - <%=mod.getName()%> <%=mod.getVersion()%></title>
<link href="../lib/core/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
<link href="../lib/core/yi/yi.css" rel="stylesheet" />
<link href="assets/css/app-builder.css" rel="stylesheet" />
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
      <div class="navbar-brand">构建器</div>
    </div>
  </div>
</header>

<div class="container">
  <div class="jumbotron">
    <h4 class="text-center">当前构建模组：<%=mod.getName()%> <%=mod.getVersion()%></h4>
    <div class="progress progress-striped active">
      <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%">
      </div>
    </div>
    <h4 id="progress_info" class="text-center"><p class="text-info">已启动构建线程</p></h4>
    <h6 id="action_info" class="text-center text-muted">&nbsp;</h6>
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
(function(){
	this.mod = {
		name: "<%=name%>"
		, version: "<%=version%>"
	};
})();
</script>
<script src="assets/js/app-builder.js" type="text/javascript"></script>
</body>
</html>
