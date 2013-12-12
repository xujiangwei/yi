<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="java.util.*" %>
<%@page import="yi.core.*" %>
<%
List<Mod> list = ModManager.getInstance().getModList();
%>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>模组管理器</title>
<link href="../lib/core/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
<link href="../lib/core/yi/yi.min.css" rel="stylesheet" />
<link href="../assets/css/app-manager.css" rel="stylesheet" />
</head>

<body>
<!-- 主导航 -->
<header class="navbar navbar-default navbar-fixed-top" role="banner">
  <div class="container">
    <div class="navbar-header">
      <button class="navbar-toggle" type="button" data-toggle="collapse" data-target=".navbar-collapse">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <div class="navbar-brand">模组管理器</div>
    </div>
    <nav class="collapse navbar-collapse navbar-collapse" role="navigation">
      <ul class="nav navbar-nav">
        <li><a href="../debugger/index.jsp">调试器</a></li>
        <li><a href="javascript:window.manager.showAbout();">关于</a></li>
      </ul>
    </nav>
  </div>
</header>

<div class="container main">
  <div class="row">
    <div class="col-md-12">
      <div class="table-responsive">
        <table id="main-table" class="table table-striped table-hover table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>名称</th>
              <th>版本</th>
              <th>描述</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
<%
if (list.isEmpty()) {
%>
            <tr>
              <td colspan="5" align="center"><span class="glyphicon glyphicon-exclamation-sign"></span> 系统中没有任何模组</td>
            </tr>
<%
}
else {
	for (Mod mod : list) {
		String name = mod.getName();
		String version = mod.getVersion();
%>
            <tr id="<%=name%>-<%=version%>">
              <td><input type="checkbox" class="checkbox" /><input class="mod" type="hidden" name="<%=name%>" value="<%=version%>" data-mod="ModDetail" data-ver="1.0.0" data-auto="true" data-params='{"name":"<%=name%>","version":"<%=version%>"}' /></td>
              <td><%=name%></td>
              <td><%=version%></td>
              <td><%=mod.getDescription()%></td>
              <td>
                <button id="btn_detail_<%=name%>" class="btn btn-sm btn-primary" data-name="<%=name%>" data-version="<%=version%>">详情</button>
                <button id="btn_delete_<%=name%>" class="btn btn-sm btn-info" data-loading-text="正在删除..." data-name="<%=name%>" data-version="<%=version%>">删除</button>
              </td>
            </tr>
<%
	}
}
%>
          </tbody>
        </table>
      </div>
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
</body>

<%=Stage.importScripts("../lib/") %>
<script src="../assets/js/app-manager.js" type="text/javascript"></script>
</html>
