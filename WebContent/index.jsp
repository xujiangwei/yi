<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="yi.core.*" %>
<!doctype html>
<!--[if lt IE 7 ]><html class="ie ie6"><![endif]-->
<!--[if IE 7 ]><html class="ie ie7"><![endif]-->
<!--[if IE 8 ]><html class="ie ie8"><![endif]-->
<!--[if (gte IE 9)|!(IE)]><!-->
<html class="not-ie">
<!--<![endif]-->
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Yi - 壹框</title>
<%=Stage.importStyles("lib/")%>
<link href="assets/css/docs.css" rel="stylesheet">
</head>

<body class="bs-docs-home">
<header class="navbar navbar-inverse navbar-fixed-top bs-docs-nav" role="banner">
  <div class="container">
  <div class="navbar-header">
    <button class="navbar-toggle" type="button" data-toggle="collapse" data-target=".bs-navbar-collapse">
      <span class="sr-only">Toggle navigation</span>
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
    </button>
    <a href="#" class="navbar-brand">壹框</a>
  </div>
  <nav class="collapse navbar-collapse bs-navbar-collapse" role="navigation">
    <ul class="nav navbar-nav">
      <li>
        <a href="getting-started.jsp">起步</a>
        </li>
        <li>
          <a href="javascript:yi.alert('正在制作中……');">组件</a>
        </li>
        <li>
          <a href="javascript:yi.alert('正在制作中……');">模组</a>
        </li>
        <li>
          <a href="javascript:yi.alert('正在制作中……');">教程</a>
        </li>
        <li>
          <a href="javascript:yi.alert('正在制作中……');">实用库</a>
        </li>
      </ul>
    </nav>
  </div>
</header>

<main class="bs-masthead" id="content" role="main">
  <div class="container">
    <h1>壹框</h1>
    <p class="lead">基于 Servlet &amp; Bootstrap &amp; jQuery &amp; Seajs 简洁、直观、强悍、移动设备可用的前端开发框架，让 Web 开发更迅速、简单。</p>
    <p>
      <a href="https://github.com/xujiangwei/yi/archive/master.zip" class="btn btn-outline-inverse btn-lg">下载壹框</a>
      <a href="https://github.com/xujiangwei/yi/" class="btn btn-outline-inverse btn-lg" target="_blank">Github</a>
    </p>
  </div>
</main>

<footer class="container" role="contentinfo">
  <ul class="bs-masthead-links pull-right">
    <li class="current-version">
    当前版本：1.0.0
    </li>
  </ul>
</footer>

<%=Stage.importScripts("lib/")%>
<script type="text/javascript">yi.config("./");</script>
</body>
</html>
