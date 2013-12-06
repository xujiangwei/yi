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
          <a href="api.jsp">API</a>
        </li>
        <li>
          <a href="components.jsp">组件</a>
        </li>
        <li>
          <a href="modules.jsp">模组</a>
        </li>
        <li>
          <a href="utility-library.jsp">实用库</a>
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
              <li><a href="#download-compiled">编译后的文件</a></li>
              <li><a href="#download-sources">源代码文件</a></li>
            </ul>
          </li>
          <li>
            <a href="#whats-included">包含了哪些文件</a>
          </li>
          <li>
            <a href="#base-setting">基础环境需求</a>
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
      <!-- 下载说明
      ================================================== -->
      <div class="bs-docs-section">
        <div class="page-header">
          <h1 id="download">下载壹框</h1>
        </div>
        <p class="lead">壹框提供了几种可以帮你快速上手的方式，每种方式针对具有不同技能等级的开发者和不同的使用场景。继续阅读下面的内容，看看哪种方式适合你的需求吧。</p>

        <h3 id="download-compiled">编译后的文件</h3>
        <p>获取壹框最快速的方式就是下载经过编译的Jar、CSS、JavaScript文件，另外还包含字体文件。但是不包含文档和源码文件。</p>
        <p><a class="btn btn-lg btn-primary" href="https://github.com/xujiangwei/yi/archive/master.zip">下载壹框</a></p>

        <h3 id="download-sources">源代码文件</h3>
        <div class="bs-docs-dl-options">
          <h4>
            <a href="https://github.com/xujiangwei/yi/archive/master.zip">下载源码</a>
          </h4>
        </div>
      </div>

      <!-- 文件结构
      ================================================== -->
      <div class="bs-docs-section">
        <div class="page-header">
          <h1 id="whats-included">包含了哪些文件</h1>
        </div>
        <p class="lead">壹框提供了前端（浏览器）和后端（Java Servlet）工程，在下载下来的压缩包内可以看到以下目录和文件，这些文件按照类别放到了不同的目录内，并且前端提供了压缩与未压缩两种版本，后端代码全部位于 src 目录下。</p>

        <div class="bs-callout bs-callout-warning" id="jquery-required">
          <h4>Yi 前端库依赖 jQuery、Bootstrap 和 Seajs</h4>
          <p>请注意，使用 <strong>Stage</strong> 的 <code>importScripts()</code> 方法将帮助你自动导入脚本依赖， 就像在<a href="#template">基础模版</a>中所展示的一样。</p>
        </div>

        <div class="highlight">
<pre><code class="language-bash">yi/
├── src/
│── WebContent/
│   ├── assets/
│   │   ├── css/
│   │   │   ├── docs.css
│   │   │   ├── theme.css
│   │   └── js/
│   │       └── docs.js
│   ├── debugger/
│   │   ├── assets/
│   │   │   ├── css/
│   │   │   │   ├── app-builder.css
│   │   │   │   ├── app-debugger.css
│   │   │   │   └── index.css
│   │   │   └── js/
│   │   │       ├── app-builder.js
│   │   │       ├── app-debugger.js
│   │   │       └── index.js
│   │   ├── modules/
│   │   ├── builder.jsp
│   │   ├── debugger.jsp
│   │   └── index.jsp
│   ├── examples/
│   │   ├── assets/
│   │   │   ├── app-mod.css
│   │   │   └── app-mod.js
│   │   └── mod.html
│   ├── lib/
│   │   ├── core/
│   │   │   ├── bootstrap/
│   │   │   │   ├── css/
│   │   │   │   │   ├── bootstrap-theme.css
│   │   │   │   │   ├── bootstrap-theme.min.css
│   │   │   │   │   ├── bootstrap.css
│   │   │   │   │   └── bootstrap.min.css
│   │   │   │   ├── fonts/
│   │   │   │   │   ├── glyphicons-halflings-regular.eot
│   │   │   │   │   ├── glyphicons-halflings-regular.svg
│   │   │   │   │   ├── glyphicons-halflings-regular.ttf
│   │   │   │   │   └── glyphicons-halflings-regular.woff
│   │   │   │   └── js/
│   │   │   │       ├── bootstrap.js
│   │   │   │       └── bootstrap.min.js
│   │   │   ├── console/
│   │   │   │   ├── console.css
│   │   │   │   ├── console.min.css
│   │   │   │   ├── console.js
│   │   │   │   └── console.min.js
│   │   ├── extensions/
│   │   ├── modules/
│   │   ├── plugins/
│   │   ├── utils/
│   ├── modules/
│   ├── scripts/
│   └── tools/
└── versions.txt
</code></pre>
        </div>
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

</body>

<%=Stage.importScripts("lib/")%>
<script src="assets/js/docs.js" type="text/javascript"></script>
</html>
