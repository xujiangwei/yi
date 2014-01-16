<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="yi.core.*" %>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>组件 - 壹框</title>
<%=Stage.importStyles("lib/")%>
<link href="assets/css/docs.css" rel="stylesheet">
</head>

<body>
<!-- 主导航 -->
<header class="navbar navbar-inverse navbar-fixed-top bs-docs-nav" role="banner">
  <div class="container">
    <div class="navbar-header">
      <button class="navbar-toggle" type="button" data-toggle="collapse" data-target=".bs-navbar-collapse">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a href="index.jsp" class="navbar-brand">壹框</a>
    </div>
    <nav class="collapse navbar-collapse bs-navbar-collapse" role="navigation">
      <ul class="nav navbar-nav">
        <li><a href="getting-started.jsp">起步</a></li>
        <li><a href="css.jsp">层叠样式表</a></li>
        <li class="active"><a href="components.jsp">组件</a></li>
        <li><a href="modules.jsp">模组</a></li>
        <li><a href="utility-library.jsp">实用库</a></li>
        <li><a href="extend.jsp">扩展</a></li>
      </ul>
    </nav>
  </div>
</header>

<div class="bs-header" id="content">
  <div class="container">
    <h1>组件</h1>
    <p>无数可复用的组件，包括动态栅格，下拉菜单，树型菜单，导航，警告框，弹出框等更多功能。</p>
  </div>
</div>

<div class="container bs-docs-container">
  <div class="row">
    <div class="col-md-3">
      <div class="bs-sidebar hidden-print" role="complementary">
        <ul class="nav bs-sidenav">
          <li>
            <a href="#grid">栅格</a>
            <ul class="nav">
              <li><a href="#grid-example">案例</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <div class="col-md-9" role="main">
      <div class="bs-docs-section">
        <div class="page-header">
          <h1 id="grid">栅格</h1>
        </div>
        <p class="lead">TODO</p>

        <h2 id="grid-example">案例</h2>
        <p>TODO</p>
      </div>
    </div>
  </div>
</div>

<!-- 页脚
================================================== -->
<footer class="bs-footer" role="contentinfo">
  <div class="container">
    <p>Copyright &copy; 2013,2014 DHC Software Research Department.</p>
    <p>Code licensed under <a href="http://www.gnu.org/licenses/gpl.html" target="_blank">GPL License Version 3</a>, documentation under <a href="http://creativecommons.org/licenses/by/3.0/" target="_blank">CC BY 3.0</a>.</p>
    <ul class="footer-links">
      <li>当前版本： v<%=Stage.getVersion()%></li>
      <li class="muted">&middot;</li>
      <li><a href="http://www.java.com/" target="_blank">Java</a></li>
      <li class="muted">&middot;</li>
      <li><a href="http://jquery.com" target="_blank">jQuery</a></li>
      <li class="muted">&middot;</li>
      <li><a href="http://getbootstrap.com" target="_blank">Bootstrap</a></li>
      <li class="muted">&middot;</li>
      <li><a href="https://github.com/xujiangwei/yi/issues" target="_blank">Issues</a></li>
    </ul>
  </div>
</footer>

<%=Stage.importScripts("lib/")%>
<script src="assets/js/docs.js" type="text/javascript"></script>
</body>
</html>
