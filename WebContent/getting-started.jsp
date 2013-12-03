<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="yi.core.*" %>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>起步 - 壹框</title>
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
      <li class="active">
        <a href="getting-started.jsp">起步</a>
        </li>
        <li>
          <a href="javascript:yi.alert('正在制作中……');">组件</a>
        </li>
        <li>
          <a href="javascript:yi.alert('正在制作中……');">模组</a>
        </li>
        <li>
          <a href="javascript:yi.alert('正在制作中……');">教程</a>
        </li>
        <li>
          <a href="javascript:yi.alert('正在制作中……');">实用库</a>
        </li>
      </ul>
    </nav>
  </div>
</header>

<div class="bs-header" id="content">
  <div class="container">
    <h1>起步</h1>
    <p>简要介绍壹框，以及如何下载、使用，基本模版和案例等等。</p>
  </div>
</div>

<div class="container bs-docs-container">
  <div class="row">
    <div class="col-md-3">
      <div class="bs-sidebar hidden-print" role="complementary">
        <ul class="nav bs-sidenav">
          <li>
            <a href="#download">下载壹框</a>
            <ul class="nav">
              <li><a href="#download-compiled"></a></li>
            </ul>
          </li>
          <li>
            <a href="#whats-included">包含了哪些文件</a>
          </li>
          <li>
            <a href="#template">基本模板</a>
          </li>
          <li>
            <a href="#examples">案例</a>
          </li>
          <li>
            <a href="#intention">目标</a>
            <ul class="nav">
              <li><a href="#intention-first-stage">第一阶段目标</a></li>
            </ul>
          </li>
          <li>
            <a href="#browsers">浏览器支持</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="col-md-9" role="main">
      <div class="bs-docs-section">
      </div>
    </div>
  </div>
</div>

</body>

<%=Stage.importScripts("lib/")%>
<script src="assets/js/docs.js" type="text/javascript"></script>
</html>
