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
<link href="../lib/core/yi/yi.css" rel="stylesheet" />
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
%>
            <tr id="<%=mod.getName()%>-<%=mod.getVersion()%>">
              <td><input type="checkbox" class="checkbox" /></td>
              <td><%=mod.getName()%></td>
              <td><%=mod.getVersion()%></td>
              <td><%=mod.getDescription()%></td>
              <td>
                <button id="btn_detail_<%=mod.getName()%>" class="btn btn-sm btn-primary">详情</button>
                <button id="btn_delete_<%=mod.getName()%>" class="btn btn-sm btn-info" data-loading-text="正在删除..." data-name="<%=mod.getName()%>" data-version="<%=mod.getVersion()%>">删除</button>
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
