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
<link href="../lib/core/yi/yi.min.css" rel="stylesheet" />
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
      <ul class="nav navbar-nav">
        <li><a href="../modules/manager.jsp">模组管理器</a></li>
      </ul>
      <ul class="nav navbar-nav nav-pills pull-right">
        <li><button id="btn_new" class="btn btn-default" data-toggle="modal" data-target="#mod_profile_dialog">新建</button></li>
        <li><button id="btn_import" class="btn btn-default">导入</button></li>
        <li><button id="btn_help" class="btn btn-default">帮助</button></li>
      </ul>
    </div><!--/.nav-collapse -->
  </div>
</div>

<!-- 模组属性配置对话框 -->
<div id="mod_profile_dialog" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="mod_profile_dialog_label" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title" id="mod_profile_dialog">配置模组</h4>
      </div>
      <div class="modal-body">
        <form id="mod_profile_form" class="form-horizontal" role="form" verifier-validate>
          <div class="form-group">
            <label for="input_name" class="col-sm-3 control-label">名称 <sup>*</sup></label>
            <div class="col-sm-9">
              <input type="text" class="form-control" id="input_name" placeholder="模组名称" verifier-trigger="keyup focusin focusout" verifier-notblank="true" verifier-regexp="^[a-z0-9A-Z_]+$" required />
            </div>
          </div>
          <div class="form-group">
            <label for="input_version" class="col-sm-3 control-label">版本</label>
            <div class="col-sm-3"><input type="text" class="form-control" id="input_version_major" placeholder="主版本号" verifier-trigger="keyup focusin focusout" verifier-type="digits" /></div>
            <div class="col-sm-3"><input type="text" class="form-control" id="input_version_minor" placeholder="副版本号" verifier-trigger="keyup focusin focusout" verifier-type="digits" /></div>
            <div class="col-sm-3"><input type="text" class="form-control" id="input_version_revision" placeholder="修订号" verifier-trigger="keyup focusin focusout" verifier-type="digits" /></div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
        <button type="button" class="btn btn-primary">确定</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

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
                    <div class="btn-group">
                      <button type="button" class="btn btn-sm btn-default dropdown-toggle" data-toggle="dropdown">更多 <span class="caret"></span></button>
                      <ul class="dropdown-menu" role="menu">
                        <li><a id="btn_config_<%=mod.getName()%>" href="#">配置</a></li>
                        <li><a href="#">重置</a></li>
                        <li><a href="#">导出</a></li>
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
