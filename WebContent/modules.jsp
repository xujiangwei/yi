<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="yi.core.*" %>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>模组 - 壹框</title>
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
        <li><a href="api.jsp">API</a></li>
        <li><a href="components.jsp">组件</a></li>
        <li class="active"><a href="modules.jsp">模组</a></li>
        <li><a href="utility-library.jsp">实用库</a></li>
      </ul>
    </nav>
  </div>
</header>

<div class="bs-header" id="content">
  <div class="container">
    <h1>模组</h1>
    <p>模块化的界面组织方式，合理、充分地解耦界面设计与开发，可被单元测试，复用且独立按需发布的模组功能。</p>
  </div>
</div>

<div class="container bs-docs-container">
  <div class="row">
    <div class="col-md-3">
      <div class="bs-sidebar hidden-print" role="complementary">
        <ul class="nav bs-sidenav">
          <li>
            <a href="#primer">入门</a>
            <ul class="nav">
              <li><a href="#primer-design">设计模组</a></li>
              <li><a href="#primer-new">创建模组</a></li>
              <li><a href="#primer-edit">编辑模组</a></li>
              <li><a href="#primer-debug">调试模组</a></li>
              <li><a href="#primer-release">发布模组</a></li>
            </ul>
          </li>
          <li>
            <a href="#debugger">调试器</a>
          </li>
          <li>
            <a href="#manager">管理器</a>
          </li>
        </ul>
      </div>
    </div>

    <div class="col-md-9" role="main">
      <!-- 入门
      ================================================== -->
      <div class="bs-docs-section">
        <div class="page-header">
          <h1 id="primer">入门</h1>
        </div>
        <p class="lead"></p>

        <h2 id="primer-design">设计模组</h2>
        <p>TODO</p>

        <h2 id="primer-design">创建模组</h2>
        <p>TODO</p>
      </div>
    </div>
  </div>
</div>

<%=Stage.importScripts("lib/")%>
<script src="assets/js/docs.js" type="text/javascript"></script>
</body>
</html>
