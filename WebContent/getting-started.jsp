<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="yi.core.*" %>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>起步 - 壹框</title>
<%=Stage.importStyles("lib/")%>
<link href="assets/css/highlight.min.css" rel="stylesheet">
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
        <li class="active"><a href="getting-started.jsp">起步</a></li>
        <li><a href="api.jsp">API</a></li>
        <li><a href="components.jsp">组件</a></li>
        <li><a href="modules.jsp">模组</a></li>
        <li><a href="utility-library.jsp">实用库</a></li>
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
            <a href="#templates">基本模板</a>
          </li>
          <li>
            <a href="#examples">案例</a>
          </li>
          <li>
            <a href="#browsers">浏览器支持</a>
          </li>
          <li>
            <a href="#aliases">组件别名列表</a>
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
        <p>获取壹框最快速的方式就是下载经过编译的 JAR、CSS、JavaScript 文件，另外还包含字体文件。但是不包含文档和源码文件。</p>
        <p><a class="btn btn-lg btn-primary" href="https://github.com/xujiangwei/yi/archive/master.zip">下载壹框</a></p>

        <h3 id="download-sources">源代码文件</h3>
        <div class="bs-docs-dl-options">
          <h4>
            <a href="https://github.com/xujiangwei/yi/archive/master.zip">下载源码</a>
          </h4>
        </div>
      </div><!-- /.bs-docs-section -->

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
        <p>下载压缩包之后，将其解压至任意目录即可看到以下目录结构：</p>
        <div class="highlight">
<pre><code class="language-bash">yi/
├── src/
│── WebContent/
│   ├── assets/
│   │   ├── css/
│   │   │   ├── app-manager.css
│   │   │   ├── docs.css
│   │   │   ├── theme.css
│   │   └── js/
│   │       └── app-manager.js
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
│   │   │   ├── html5shiv/
│   │   │   │   └── html5shiv.js
│   │   │   ├── jquery/
│   │   │   │   ├── jquery-1.10.2.js
│   │   │   │   ├── jquery-1.10.2.min.js
│   │   │   │   ├── jquery-2.0.3.js
│   │   │   │   └── jquery-2.0.3.min.js
│   │   │   ├── respond/
│   │   │   │   └── respond.min.js
│   │   │   ├── seajs/
│   │   │   │   ├── sea-debug.js
│   │   │   │   └── sea.js
│   │   │   └── yi/
│   │   │       ├── yi.css
│   │   │       ├── yi.js
│   │   │       ├── yi.min.css
│   │   │       └── yi.min.js
│   │   ├── extensions/
│   │   ├── modules/
│   │   │   ├── components/
│   │   │   │   ├── component.css
│   │   │   │   └── component.js
│   │   │   └── misc/
│   │   │      ├── theme-manager.js
│   │   │      └── theme-manager.min.js
│   │   ├── plugins/
│   │   │   ├── fetch/
│   │   │   │   ├── jquery.fetch.js
│   │   │   │   └── jquery.fetch.min.js
│   │   │   ├── bootbox.js
│   │   │   ├── bootbox.min.js
│   │   │   └── jquery.menu-aim.js
│   │   └── utils/
│   │       ├── class.js
│   │       ├── delayed-task.js
│   │       ├── event.js
│   │       ├── extend.js
│   │       ├── hashmap.js
│   │       ├── holder.js
│   │       ├── json2.js
│   │       ├── observable.js
│   │       ├── store.js
│   │       └── utlis.js
│   ├── modules/
│   │   └── manager.jsp
│   ├── scripts/
│   │   ├── compiler.console.cmd
│   │   ├── compiler.theme-manager.cmd
│   │   └── compiler.yi.cmd
│   └── tools/
│       ├── compiler.jar
│       ├── splicer.jar
│       └── yuicompressor-2.4.8.jar
└── versions.txt
</code></pre>
        </div>
        <p><code>lib/</code> 目录包含了壹框的全部前端脚本文件和样式表文件。<code>debugger/</code> 目录是模组调试器目录。<code>modules/</code> 目录是存放模组原始文件目录。<code>scripts/</code> 目录是工程的维护脚本目录。</p>
      </div><!-- /.bs-docs-section -->

      <!-- 基础环境说明
      ================================================== -->
      <div class="bs-docs-section">
        <div class="page-header">
          <h1 id="base-setting">基础环境需求</h1>
        </div>
        <p class="lead"></p>

        <p>TODO</p>
      </div><!-- /.bs-docs-section -->

      <!-- 基本模板
      ================================================== -->
      <div class="bs-docs-section">
        <div class="page-header">
          <h1 id="templates">基本模板</h1>
        </div>
        <p class="lead">使用以下给出的这份超级简单的 JSP 模版，或者修改这些案例。我们强烈建议你对这些案例按照自己的需求进行修改，而不要简单的复制、粘贴。</p>

        <p>拷贝并粘贴下面给出的JSP代码，这就是一个最简单的壹框页面了。</p>
        <div class="highlight">
<pre><code class="language-html">&lt;%@page language=&quot;java&quot; contentType=&quot;text/html; charset=UTF-8&quot; pageEncoding=&quot;UTF-8&quot;%&gt;
&lt;%@page import=&quot;yi.core.*&quot; %&gt;
&lt;!doctype html&gt;
&lt;html lang=&quot;zh-CN&quot;&gt;
&lt;head&gt;
&lt;meta charset=&quot;utf-8&quot;&gt;
&lt;meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;IE=edge&quot;&gt;
&lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;
&lt;title&gt;壹框模板&lt;/title&gt;
&lt;!-- 通过 Stage 引入框架样式表 --&gt;
&lt;%=Stage.importStyles(&quot;lib/&quot;)%&gt;
&lt;/head&gt;

&lt;body&gt;
  &lt;h1&gt;页面内容&lt;/h1&gt;
&lt;/body&gt;

&lt;!-- 通过 Stage 引入框架脚本 --&gt;
&lt;%=Stage.importScripts(&quot;lib/&quot;)%&gt;
&lt;!-- 引入页面应用的入口脚本 --&gt;
&lt;script src="assets/app.js" type="text/javascript"&gt;&lt;/script&gt;
&lt;/html&gt;</code></pre>
        </div>
        <p>上面 JSP 模板里引入的 <code>app.js</code> 的代码如下：</p>
        <div class="highlight">
<pre><code class="language-javascript">(function() {
    var yi = window.yi;

    // 配置 CommonJS 基础路径
    yi.config("./");

    yi.ready(function() {
        // 框架就绪函数
        // 从这里开始你自己的页面应用的代码
    }
})();
</code></pre>
        </div>
        <p>在 JavaScript 代码里，需要进行基本的框架配置，并且可以注册页面的 ready 函数来加载页面应用的逻辑代码。</p>
      </div><!-- /.bs-docs-section -->
      
      <!-- 案例
      ================================================== -->
      <div class="bs-docs-section">
        <div class="page-header">
          <h1 id="examples">案例</h1>
        </div>
        <p class="lead">下面这些案例都是基于上面给出的基本模版并结合各种组件制作的。</p>

        <div class="row bs-examples">
          <div class="col-xs-6 col-md-4">
            <a class="thumbnail" href="examples/templates/starter/">
              <img src="examples/screenshots/template.jpg" alt="" />
            </a>
            <h4>最简页面</h4>
            <p>只有一些最基本的东西：引入框架CSS和JavaScript文件，并进行壹框基础属性配置，页面只有一个container容器。</p>
          </div>
        </div>
      </div><!-- /.bs-docs-section -->
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
<script type="text/javascript" src="assets/js/highlight.min.js"></script>
<script type="text/javascript">hljs.initHighlightingOnLoad();</script>
<script type="text/javascript" src="assets/js/docs.js"></script>
</html>
