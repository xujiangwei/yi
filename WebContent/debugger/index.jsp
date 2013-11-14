<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="java.util.List" %>
<%@page import="yi.core.*" %>
<%@page import="yi.debugger.*" %>
<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>模组调试管理器</title>
<link href="../lib/core/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
<link href="assets/css/index.css" rel="stylesheet" />
<!--[if lt IE 9]>
  <script src="lib/bootflat/js/html5shiv.js"></script>
  <script src="lib/bootflat/js/respond.min.js"></script>
<![endif]-->
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
      <a href="#" class="navbar-brand">模组调试管理器</a>
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
      <div class="panel panel-default">
        <div class="panel-heading">
          <div class="panel-title">模组列表</div>
        </div>
        <div class="panel-body">
          <table class="table table-striped table-hover table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>名称</th>
                <th>版本</th>
                <th>上下文路径</th>
                <th>操作</th>
              </tr>
            </thead>
<%
	List<Mod> list = DebuggerDirector.getInstance().getModList();
	for (Mod mod : list) {
%>
              <tr>
                <td><input type="checkbox" class="checkbox" /></td>
                <td><%=mod.getName() %></td>
                <td><%=mod.getVersion() %></td>
                <td><%=mod.getContextPath() %></td>
                <td><a id="btn_debug_<%=mod.getName()%>" class="btn btn-sm btn-primary" href="debugger.jsp?name=<%=mod.getName()%>&version=<%=mod.getVersion()%>" target="_blank">调试</a></td>
              </tr>
<%
	}
%>
            <tbody>
              
            </tbody>
          </table>
        </div>
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

<script src="../lib/core/jquery/jquery-1.10.2.min.js" type="text/javascript"></script>
<script src="../lib/core/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
<script src="../lib/core/seajs/sea.js" type="text/javascript"></script>
<script src="../lib/utils/store.js" type="text/javascript"></script>
<script src="../lib/utils/json2.js" type="text/javascript"></script>
<script src="../lib/core/yi/yi.js" type="text/javascript"></script>
<script src="assets/js/index.js" type="text/javascript"></script>
</body>
</html>
