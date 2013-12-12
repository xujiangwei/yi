<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="yi.core.*" %>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>实用库 - 壹框</title>
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
        <li><a href="modules.jsp">模组</a></li>
        <li class="active"><a href="utility-library.jsp">实用库</a></li>
      </ul>
    </nav>
  </div>
</header>

<div class="bs-header" id="content">
  <div class="container">
    <h1>实用库</h1>
    <p>帮助你快速构建应用的实用函数库，充分满足你日常的开发工作。</p>
  </div>
</div>

<div class="container bs-docs-container">
  <div class="row">
    <div class="col-md-3">
      <div class="bs-sidebar hidden-print" role="complementary">
        <ul class="nav bs-sidenav">
          <li>
            <a href="#object">JavaScript 对象</a>
            <ul class="nav">
              <li><a href="#object-extend">Extend</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <div class="col-md-9" role="main">
      <div class="bs-docs-section">
        <div class="page-header">
          <h1 id="object">JavaScript 对象</h1>
        </div>
        <p class="lead"></p>

        <h3 id="object-extend">Extend</h3>
        <p>TODO</p>
      </div>
    </div>
  </div>
</div>

</body>

<%=Stage.importScripts("lib/")%>
<script src="assets/js/docs.js" type="text/javascript"></script>
</html>
