<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="java.util.*" %>
<%@page import="yi.core.*" %>
<%@page import="yi.debugger.*" %>
<%@page import="yi.util.*" %>
<%
String name = request.getParameter("name");
String version = request.getParameter("version");
boolean debug = PageUtils.isDebug(request);
Mod mod = null;
if (null != name && null != version) {
	if (debug) {
		mod = DebuggerDirector.getInstance().getMod(name, version);
	}
	else {
		mod = ModManager.getInstance().getMod(name, version);
	}
}

if (null == mod) {
	mod = new Mod();
}
%>
<!-- MOD 详细信息 -->
<div class="container mod_detail">
  <form class="form-horizontal" role="form">
    <div class="form-group">
      <span class="form-control-static" style="font-size:16px;">模组信息</span>
    </div>
    <div class="form-group">
      <label class="col-sm-3 control-label">名称</label>
      <div class="col-sm-9">
        <p class="form-control-static"><%=mod.getName() %></p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-3 control-label">版本号</label>
      <div class="col-sm-9">
        <p class="form-control-static"><%=mod.getVersion() %></p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-3 control-label">描述</label>
      <div class="col-sm-9">
        <p class="form-control-static"><%=mod.getDescription() %></p>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-3 control-label">HTML 文件</label>
      <div class="col-sm-9">
<%
String html = mod.getHtmlFilename();
long size = mod.getHtmlFileSize();
if (null == html) {
	html = mod.getTmplFilename();
	size = mod.getTmplFileSize();
}
if (null != html) {
%>
        <p class="form-control-static"><%=html%> <small class="text-muted">(<em><%=FormatUtils.formatNumberWithComma(size)%> bytes</em>)</small></p>
<%
}
else {
%>
        <p class="form-control-static text-muted"><em>无</em></p>
<%
}
%>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-3 control-label">样式表文件</label>
      <div class="col-sm-9">
<%
List<String> list = mod.getStyleFilenameList();
if (null != list) {
	for (String filename : list) {
		size = mod.getStyleFileSize(filename);
%>
        <p class="form-control-static"><%=filename%> <small class="text-muted">(<em><%=FormatUtils.formatNumberWithComma(size)%> bytes</em>)</small></p>
<%
	}
}
else {
%>
        <p class="form-control-static text-muted"><em>无</em></p>
<%
}
%>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-3 control-label">脚本文件</label>
      <div class="col-sm-9">
<%
list = mod.getScriptFilenameList();
if (null != list) {
	for (String filename : list) {
		size = mod.getScriptFileSize(filename);
%>
        <p class="form-control-static"><%=filename%> <small class="text-muted">(<em><%=FormatUtils.formatNumberWithComma(size)%> bytes</em>)</small></p>
<%
	}
}
else {
%>
        <p class="form-control-static text-muted"><em>无</em></p>
<%
}
%>
      </div>
    </div>
    <div class="form-group">
      <label class="col-sm-3 control-label">入口函数</label>
      <div class="col-sm-9">
<%
String main = mod.getMainFunction();
if (null != main) {
%>
        <p class="form-control-static"><%=main %></p>
<%
}
else {
%>
        <p class="form-control-static text-muted"><em>无</em></p>
<%
}
%>
      </div>
    </div>
  </form>
</div>
