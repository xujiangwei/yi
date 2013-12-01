<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="java.util.List" %>
<%@page import="yi.core.*" %>
<%@page import="yi.debugger.*" %>
<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>调试管理器</title>
<link href="../lib/core/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
<link href="../lib/core/yi/yi.css" rel="stylesheet" />
<link href="assets/css/index.css" rel="stylesheet" />
</head>

<body>
<div class="navbar navbar-default" role="navigation">
  <div class="container">
    <div class="navbar-header">
      <button class="navbar-toggle" type="button" data-toggle="collapse" data-target=".navbar-collapse">
      	<span class="sr-only">Toggle navigation</span>
      	<span class="icon-bar"></span>
      	<span class="icon-bar"></span>
      	<span class="icon-bar"></span>
      </button>
      <div class="navbar-brand">调试管理器</div>
    </div>
    <div class="collapse navbar-collapse">
      <ul class="nav navbar-nav nav-pills pull-right">
        <li><button id="btn_new" class="btn btn-default">新建</button></li>
        <li><button id="btn_import" class="btn btn-default">导入</button></li>
        <li><button id="btn_help" class="btn btn-default">帮助</button></li>
      </ul>
    </div><!--/.nav-collapse -->
  </div>
</div>

<div class="container">
  <div class="row">
    <div class="col-md-12">
      <div class="panel panel-default">
        <div class="panel-heading">
          <div class="panel-title">模组列表</div>
        </div>
        <div class="panel-body">
          <div class="table-responsive">
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
              <tbody>
<%
List<Mod> list = DebuggerDirector.getInstance().getModList();
for (Mod mod : list) {
%>
                <tr>
                  <td><input type="checkbox" class="checkbox" /></td>
                  <td><%=mod.getName() %></td>
                  <td><%=mod.getVersion() %></td>
                  <td><%=mod.getContextPath() %></td>
                  <td>
                    <a id="btn_debug_<%=mod.getName()%>" class="btn btn-sm btn-primary" href="debugger.jsp?name=<%=mod.getName()%>&version=<%=mod.getVersion()%>" target="_blank">调试</a>
                    <button id="btn_build_<%=mod.getName()%>" class="btn btn-sm btn-info" onClick="javascript:window.build('builder.jsp?name=<%=mod.getName()%>&version=<%=mod.getVersion()%>');">构建</button>
                    <button id="btn_config_<%=mod.getName()%>" class="btn btn-sm btn-default">配置</button>
                    <div class="btn-group">
                      <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">更多 <span class="caret"></span></button>
                      <ul class="dropdown-menu" role="menu">
                        <li><a href="#">刷新</a></li>
                        <li><a href="#">导出</a></li>
                        <li><a href="#">删除</a></li>
                      </ul>
                    </div>
                  </td>
                </tr>
<%
}
%>
              </tbody>
            </table>
          </div>
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
<%=Stage.importScripts("../lib/")%>
<script src="assets/js/index.js" type="text/javascript"></script>
</body>
</html>
