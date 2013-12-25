<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="yi.core.*" %>
<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>最简单页面 - 壹框</title>
<!-- 通过 Stage 引入框架样式表 -->
<%=Stage.importStyles("../../../lib/")%>
</head>

<body>
<div class="navbar navbar-inverse" role="navigation">
  <div class="container">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="#">项目名称</a>
    </div>
    <div class="collapse navbar-collapse">
      <ul class="nav navbar-nav">
        <li class="active"><a href="#">首页</a></li>
        <li><a href="#about">关于</a></li>
        <li><a href="#contact">联系</a></li>
      </ul>
    </div><!--/.nav-collapse -->
  </div>
</div>

<div class="container">
  <div class="starter-template">
    <h1>最简页面</h1>
    <p class="lead">使用这个文档模板可以快速构建任何新的项目。<br/><span id="desc"></span></p>
  </div>
</div><!-- /.container -->

<!-- 通过 Stage 引入框架脚本 -->
<%=Stage.importScripts("../../../lib/")%>
<!-- 引入页面应用的入口脚本 -->
<script src="app.js" type="text/javascript"></script>
</body>
</html>
