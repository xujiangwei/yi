<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="yi.core.*" %>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>API - 壹框</title>
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
        <li class="active"><a href="api.jsp">API</a></li>
        <li><a href="components.jsp">组件</a></li>
        <li><a href="modules.jsp">模组</a></li>
        <li><a href="utility-library.jsp">实用库</a></li>
      </ul>
    </nav>
  </div>
</header>

<div class="bs-header" id="content">
  <div class="container">
    <h1>API 文档</h1>
    <p>TODO</p>
  </div>
</div>

<div class="container bs-docs-container">
  <div class="row">
    <div class="col-md-3">
      <div class="bs-sidebar hidden-print" role="complementary">
        <ul class="nav bs-sidenav">
          <li>
            <a href="#component">用户界面组件</a>
            <ul class="nav">
              <li><a href="#sub-item">子项目</a></li>
            </ul>
          </li>
          <li>
            <a href="#open-api">开放接口</a>
          </li>
        </ul>
      </div>
    </div>

    <div class="col-md-9" role="main">
      <div class="bs-docs-section">
        <div class="page-header">
          <h1 id="component">用户界面组件</h1>
        </div>
        <p class="lead">TODO</p>

        <h2 id="sub-item">子项目</h2>
        <p>TODO</p>
      </div>
      
      <div class="bs-docs-section">
        <div class="page-header">
          <h1 id="open-api">开放接口</h1>
        </div>
        <p class="lead">TODO</p>

        <h2 id="sub-item">子项目</h2>
        <p>TODO</p>
      </div>
    </div>
  </div>
</div>

<%=Stage.importScripts("lib/")%>
<script src="assets/js/docs.js" type="text/javascript"></script>
</body>
</html>
