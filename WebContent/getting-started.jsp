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
        <li><a href="css.jsp">层叠样式表</a></li>
        <li><a href="components.jsp">组件</a></li>
        <li><a href="modules.jsp">模组</a></li>
        <li><a href="utility-library.jsp">实用库</a></li>
        <li><a href="extend.jsp">扩展</a></li>
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
            <a href="#base-env">基础环境需求</a>
          </li>
          <li>
            <a href="#base-js">客户端初始化</a>
          </li>
          <li>
            <a href="#commonjs">CommonJS</a>
            <ul class="nav">
              <li><a href="#commonjs-api">常用 API</a></li>
              <li><a href="#commonjs-aliases">别名列表</a></li>
            </ul>
          </li>
          <li>
            <a href="#templates">基本模板</a>
            <ul class="nav">
              <li><a href="#template-page">页面模板</a></li>
              <li><a href="#template-app">应用模板</a></li>
              <li><a href="#template-examples">案例</a></li></ul>
          </li>
          <li>
            <a href="#project-mod">工程模组</a>
            <ul class="nav">
              <li><a href="#project-mod-new">创建模组</a></li>
              <li><a href="#project-mod-coding">编写模组</a></li>
              <li><a href="#project-mod-test">测试模组</a></li>
              <li><a href="#project-mod-release">发布模组</a></li>
              <li><a href="#project-mod-load">使用模组</a></li>
              <li><a href="#project-mod-rule">“三优三不”原则</a></li>
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
          <p>请注意，使用 <strong>Stage</strong> 的 <code>importScripts()</code> 方法将帮助你自动导入脚本依赖， 就像在<a href="#templates">基础模版</a>中所展示的一样。</p>
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
          <h1 id="base-env">基础环境需求</h1>
        </div>
        <p class="lead">壹框的动态页面技术使用了 Servlet 技术，首选 <a href="http://tomcat.apache.org/" target="_blank">Tomcat</a> 作为 Servlet 容器。壹框能稳定地运行在任何支持 Servlet 技术的平台上。</p>

        <h4>操作系统</h4>
        <p>壹框能运行在任意支持 Java 技术的 x86 架构操作系统。</p>

        <h4>JDK</h4>
        <p>壹框使用了 Java NIO.2 提供的最新功能，对 JDK 最低版本需求是 7.x ，<a href="http://www.oracle.com/technetwork/java/javase/downloads/jdk7-downloads-1880260.html" target="_blank">点击这里</a>下载 Java SE Development Kit 7 。</p>

        <h4>Tomcat</h4>
        <p>壹框需要 Servlet 3.0 及其以上版本的支持，因此我们推荐首选的 Tomcat 版本为 7.x 版本，<a href="http://tomcat.apache.org/download-70.cgi" target="_blank">点击这里</a>下载 Tomcat 7 。</p>

        <div class="bs-callout bs-callout-warning">
          <h4>在 <code>web.xml</code> 里配置监听器</h4>
          <p>壹框需要在容器启动时伴随启动模组管理任务来进行模组文件管理，所以在 Tomcat 里需要增加一个上下文监听器。壹框已经提供了监听器类，你只需要按照下面的配置代码将监听器类添加到项目的 <code>web.xml</code> 文件里。</p>
        <div class="highlight">
<pre><code class="language-html">&lt;listener&gt;
    &lt;listener-class&gt;yi.container.tomcat.TomcatServletContextListener&lt;/listener-class&gt;
&lt;/listener&gt;
</code></pre>
        </div>
        </div>
      </div><!-- /.bs-docs-section -->

      <!-- 客户端初始化
      ================================================== -->
      <div class="bs-docs-section">
        <div class="page-header">
          <h1 id="base-js">客户端初始化</h1>
        </div>
        <p class="lead">壹框为开发者提供了一个页面内 JavaScript 代码初始化的标准流程，来帮助开发者在客户端里执行应用程序代码。</p>

        <p>客户端程序初始化需要解决以下几个问题：</p>
        <ul>
          <li>正确地按顺序加载 JavaScript 文件</li>
          <li>客户端程序在所有准备工作完成之后被正确地引导</li>
          <li>避免名称空间污染</li>
          <li>有可接受的性能</li>
        </ul>
        <p>壹框的核心 JavaScript 被封装在 <code>yi.js</code> 里，通过 <code>Stage</code> 引入的脚本非常少，仅包括 Bootstrap、jQuery 和 JSON 兼容实现等，具体引入方式你可参考<a href="#templates">基本模板</a>。</p>
        <p>壹框的名称空间为 <code>yi</code>，通过该名称空间内的函数完成对客户端库的配置和应用程序的引导。<code>yi</code> 包含的几个关键函数有：</p>

        <h4 class="bs-function-name">yi.config</h4>
        <p>用于对整个客户端框架进行初始化配置。<strong>该函数必须在所有代码之前被调用</strong>。</p>
        <div class="bs-callout bs-callout-info bs-function">
          <h4>yi.config(relativePath [, addition][, excluded])</h4>
          <div class="bs-at-param">
            <p>relativePath</p>
            <p>类型：<code>String</code></p>
            <p>当前页面相对于 <code>lib</code> 目录的相对路径。</p>
          </div>
          <hr/>
          <div class="bs-at-param">
            <p>addition</p>
            <p>类型：<code>Object</code></p>
            <p>追加的 CommonJS 的别名名单。</p>
          </div>
          <hr/>
          <div class="bs-at-param">
            <p>excluded</p>
            <p>类型：<code>Array</code></p>
            <p>在框架加载时需要排除的加载模块。在排除列表里的组件将不会被框架载入。</p>
          </div>
        </div>
        <p>示例代码：</p>
        <div class="highlight">
<pre><code class="language-js">// 配置相对路径
yi.config('../');

// 配置相对路径，追加一个模组别名
yi.config('../', {"panel" : "./modules/panel/panel.min.js"});

// 配置相对路径，不加载主题管理器
yi.config('../', null, ['theme-manager']);
</code></pre>
        </div>

        <h4 class="bs-function-name">yi.ready</h4>
        <p>用于注册客户端就绪函数。当壹框完成客户端初始化后，会回调该注册函数以通知客户端程序框架已就绪。</p>
        <div class="bs-callout bs-callout-info bs-function">
          <h4>yi.ready(callback(yi))</h4>
          <div class="bs-at-param">
            <p>callback</p>
            <p>类型：<code>String</code></p>
            <p>当就绪时被回调的函数。</p>
          </div>
        </div>
        <p>示例代码：</p>
        <div class="highlight">
<pre><code class="language-js">// 注册就绪函数
yi.ready(function() {

    // 客户端已就绪

});
</code></pre>
        </div>

        <p>一般的，通过上面两个函数的调用，开发者即可完成对客户端的有效初始化，帮助开发者解决客户端程序初始化的问题。完整的参考代码：</p>
        <div class="highlight">
<pre><code class="language-js">// 进行客户端代码初始化
(function() {
    var yi = window.yi;

    // 配置相对路径，追加一个模块别名
    yi.config("./", {"panel" : "./modules/panel/panel.min.js"});

    yi.ready(function() {
        // 程序就绪
        console.log("程序就绪");
    }
})();
</code></pre>
        </div>
      </div><!-- /.bs-docs-section -->

      <!-- CommonJS 说明
      ================================================== -->
      <div class="bs-docs-section">
        <div class="page-header">
          <h1 id="commonjs">CommonJS</h1>
        </div>
        <p class="lead"><a href="http://www.commonjs.org" target="_blank">CommonJS</a> 是一个有志于构建 JavaScript 生态圈的组织。它有一个<a href="http://groups.google.com/group/commonjs" target="_blank">邮件列表</a>，很多开发者参与其中。整个社区致力于提高 JavaScript 程序的可移植性和可交换性，无论是在服务端还是浏览器端。</p>
        <p>JavaScript 是一个强大面向对象语言，它有很多快速高效的解释器。官方 JavaScript 标准定义的 API 是为了构建基于浏览器的应用程序。然而，并没有定于一个用于更广泛的应用程序的标准库。CommonJS API 定义很多普通应用程序（主要指非浏览器的应用）使用的 API，从而填补了这个空白。它的终极目标是提供一个类似 Python，Ruby 和 Java 标准库。这样的话，开发者可以使用 CommonJS API 编写应用程序，然后这些应用可以运行在不同的 JavaScript 解释器和不同的主机环境中。</p>

        <p>壹框的 CommonJS 实现采用的是 <a href="http://seajs.org" target="_blank">Seajs</a>，全局名称空间为 <code>common</code>。使用 CommonJS 的核心前提是建立一套模块化的编码思维模式，通过模块之间的关系来构建前端系统。下面是一些常用的 API 和壹框提供的模块名单。</p>

        <h3 id="commonjs-api">常用 API</h3>
        <p>这里列举了常用的 API，掌握这些基本用法就可以熟练地进行浏览器端的模块化开发。</p>

        <h4 class="bs-function-name">common.use</h4>
        <p>用于在页面中加载一个或多个模块。</p>
        <div class="bs-callout bs-callout-info bs-function">
          <h4>common.use(module [, callback(moduleExportor)])</h4>
          <div class="bs-at-param">
            <p>module</p>
            <p>类型：<code>String</code></p>
            <p>描述待加载的模块别名或者模块路径的字符串。</p>
          </div>
          <hr/>
          <div class="bs-at-param">
            <p>callback</p>
            <p>类型：<code>Function</code></p>
            <p>模块被加载成功之后的回调函数。</p>
          </div>
        </div>
        <div class="bs-callout bs-callout-info bs-function">
          <h4>common.use(moduleArray [, callback(moduleExportor)])</h4>
          <div class="bs-at-param">
            <p>moduleArray</p>
            <p>类型：<code>Array</code></p>
            <p>描述待加载的模块别名或者模块路径的字符串数组。</p>
          </div>
          <hr/>
          <div class="bs-at-param">
            <p>callback</p>
            <p>类型：<code>Function</code></p>
            <p>模块被加载成功之后的回调函数。</p>
          </div>
        </div>
        <p>示例代码：</p>
        <div class="highlight">
<pre><code class="language-js">// 加载一个模块
common.use('./a');

// 加载一个模块，在加载完成时执行回调
common.use('./a', function(a) {
    a.doSomething();
});

// 加载多个模块，在加载完成时执行回调
common.use(['./a', './b'], function(a, b) {
    a.doSomething();
    b.doSomething();
});
</code></pre>
        </div>

        <h4 class="bs-function-name">define</h4>
        <p>用于定义模块。一个模块一个文件是最佳实践。</p>
        <div class="bs-callout bs-callout-info bs-function">
          <h4>define(factory(require, exports, module))</h4>
          <div class="bs-at-param">
            <p>factory</p>
            <p>类型：<code>Function</code> 或 <code>Object</code> 或 <code>String</code></p>
            <p>参数类型为对象、字符串时，表示模块的接口就是该对象、字符串。参数类型为函数时，表示是模块的构造方法。执行该构造方法，可以得到模块向外提供的接口。<em>factory</em> 方法在执行时，默认会传入三个参数：<em>require</em>、<em>exports</em> 和 <em>module</em> 。</p>
          </div>
        </div>
        <p>示例代码：</p>
        <div class="highlight">
<pre><code class="language-js">define(function(require, exports, module) {

    // 模块代码

});
</code></pre>
        </div>

        <h4 class="bs-function-name">require</h4>
        <p>用于获取指定模块。</p>
        <div class="bs-callout bs-callout-info bs-function">
          <h4>require(module)</h4>
          <div class="bs-at-param">
            <p>module</p>
            <p>类型：<code>String</code></p>
            <p>描述待加载的模块别名或者模块路径的字符串。</p>
            <p class="text-danger"><span class="glyphicon glyphicon-warning-sign"></span> 注意：<strong>require</strong> 只接受字符串直接量作为参数。</p>
          </div>
        </div>
        <p>示例代码：</p>
        <div class="highlight">
<pre><code class="language-js">define(function(require) {

    // 获取模块 a 的接口
    var a = require('./a');

    // 调用模块 a 的方法
    a.doSomething();
});
</code></pre>
        </div>

        <h4 class="bs-function-name">require.async</h4>
        <p>用于在模块内部异步加载一个或多个模块。</p>
        <div class="bs-callout bs-callout-info bs-function">
          <h4>require.async(module, callback(moduleExportor))</h4>
          <div class="bs-at-param">
            <p>module</p>
            <p>类型：<code>String</code></p>
            <p>描述待加载的模块别名或者模块路径的字符串。</p>
          </div>
          <hr/>
          <div class="bs-at-param">
            <p>callback</p>
            <p>类型：<code>Function</code></p>
            <p>模块被加载成功之后的回调函数。</p>
          </div>
        </div>
        <p>示例代码：</p>
        <div class="highlight">
<pre><code class="language-js">define(function(require) {

    // 异步加载一个模块，在加载完成时，执行回调
    require.async('./b', function(b) {
        b.doSomething();
    });

    // 异步加载多个模块，在加载完成时，执行回调
    require.async(['./c', './d'], function(c, d) {
        c.doSomething();
        d.doSomething();
    });

});
</code></pre>
        </div>

        <h4 class="bs-function-name">exports</h4>
        <p>用于在模块内部对外提供接口。</p>
        <p><code>exports</code> 是一个 <code>Object</code> 实例，可以直接添加属性或者方法给外部系统使用。</p>
        <p>示例代码：</p>
        <div class="highlight">
<pre><code class="language-js">define(function(require, exports) {

    // 对外提供 foo 属性
    exports.foo = 'bar';

    // 对外提供 doSomething 方法
    exports.doSomething = function() {};

});
</code></pre>
        </div>

        <h4 class="bs-function-name">module.exports</h4>
        <p>与 <code>exports</code> 类似，用于在模块内部对外提供接口。</p>
        <p>传给 <code>factory</code> 构造方法的 <code>exports</code> 参数是 <code>module.exports</code> 对象的一个引用。只通过 <code>exports</code> 参数来提供接口，有时无法满足开发需求。 比如当模块的接口是某个类的实例时，需要通过 <code>module.exports</code> 来实现。</p>
        <p>示例代码：</p>
        <div class="highlight">
<pre><code class="language-js">define(function(require, exports, module) {

    // 对外提供接口
    module.exports = {
        name: 'a',
        doSomething: function() {};
    };

});
</code></pre>
        </div>

        <h3 id="commonjs-aliases">别名列表</h3>
        <p>下面是壹框的默认模块别名列表。</p>
        <div class="table-responsive">
          <table class="table table-striped table-bordered table-condensed">
            <thead>
              <tr>
                <th>别名</th>
                <th>描述</th>
                <th>模块文件</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>class</td>
                <td>辅助构建 JavaScript 对象关系</td>
                <td>utils/class.js</td>
              </tr>
              <tr>
                <td>utils</td>
                <td>实用函数库</td>
                <td>utils/utils.js</td>
              </tr>
              <tr>
                <td>map</td>
                <td>实用 Map 数据结构实现</td>
                <td>utils/hashmap.js</td>
              </tr>
              <tr>
                <td>extend</td>
                <td>JavaScript 对象继承实现</td>
                <td>utils/extend.js</td>
              </tr>
              <tr>
                <td>observable</td>
                <td>观察者实现</td>
                <td>utils/observable.js</td>
              </tr>
              <tr>
                <td>event</td>
                <td>事件描述类</td>
                <td>utils/event.js</td>
              </tr>
              <tr>
                <td>holder</td>
                <td>图像占位符</td>
                <td>utils/holder.js</td>
              </tr>
              <tr>
                <td>console</td>
                <td>可视化控制台</td>
                <td>core/console/console.min.js</td>
              </tr>
              <tr>
                <td>component</td>
                <td>组件基类</td>
                <td>modules/components/component.js</td>
              </tr>
              <tr>
                <td>card-layout</td>
                <td>卡式布局</td>
                <td>modules/components/card-layout/card-layout.js</td>
              </tr>
              <tr>
                <td>form</td>
                <td>表单</td>
                <td>modules/components/form/form.js</td>
              </tr>
              <tr>
                <td>gallery</td>
                <td>大图列表</td>
                <td>modules/components/gallery/gallery.js</td>
              </tr>
              <tr>
                <td>timeline</td>
                <td>时间线</td>
                <td>modules/components/timeline/timeline.js</td>
              </tr>
              <tr>
                <td>button</td>
                <td>按钮</td>
                <td>modules/components/button/button.js</td>
              </tr>
              <tr>
                <td>carousel</td>
                <td>轮播组件</td>
                <td>modules/components/carousel/carousel-roundabout.js</td>
              </tr>
              <tr>
                <td>grid</td>
                <td>动态栅格</td>
                <td>modules/components/grid/grid-boot.js</td>
              </tr>
              <tr>
                <td>date-format</td>
                <td>简单日期格式化</td>
                <td>utils/date-format.js</td>
              </tr>
            </tbody>
          </table><!-- /.table -->
        </div><!-- /.table-responsive -->
      </div>

      <!-- 基本模板
      ================================================== -->
      <div class="bs-docs-section">
        <div class="page-header">
          <h1 id="templates">基本模板</h1>
        </div>
        <p class="lead">使用以下给出的这份超级简单的 JSP 模版，或者修改这些案例。我们强烈建议你对这些案例按照自己的需求进行修改，而不要简单的复制、粘贴。</p>

        <h3 id="template-page">页面模板</h3>
        <p>拷贝并粘贴下面给出的 JSP 代码，这就是一个最简单的壹框页面了。</p>
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

&lt;!-- 通过 Stage 引入框架脚本 --&gt;
&lt;%=Stage.importScripts(&quot;lib/&quot;)%&gt;
&lt;!-- 引入页面应用的入口脚本 --&gt;
&lt;script src="app.js" type="text/javascript"&gt;&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
        </div>
        <p>上面 JSP 模板里引入的 <code>app.js</code> 的代码如下：</p>
        <div class="highlight">
<pre><code class="language-js">(function() {
    var yi = window.yi;

    // 配置路径
    yi.config("./");

    yi.ready(function() {
        // 框架就绪函数
        // 从这里开始你自己的页面应用的代码
    });
})();
</code></pre>
        </div>
        <p>在 JavaScript 代码里，需要进行基本的框架配置，并且可以注册页面的 ready 函数来加载页面应用的逻辑代码。</p>

        <h3 id="template-app">应用模板</h3>
        <p>为每一个页面创建一个符合 CommonJS 规范的调用方式将极大的提高代码复用率并合理的解耦代码结构。拷贝并粘贴下面给出的 JavaScript 代码，这就是一个基础的 CommonJS 模块定义。</p>
        <div class="highlight">
<pre><code class="language-js">define(function(require, exports, module) {
    /* 请求依赖的CommonJS模块，这是一个示例，你可以根据你的需要添加自己的模块依赖项 */
    require('utils');

    /* 导出 run() 方法 */
    exports.run = function() {
        /* 这里是你的页面入口，从这里编写你的页面应用代码 */
        console.log('这里是程序入口');
    }
});
</code></pre>
        </div>
        <p>接着我们需要在 ready 函数里调用我们定义好的应用入口函数 <code>run()</code>，修改页面模板里 <code>app.js</code> 为：</p>
        <div class="highlight">
<pre><code class="language-js">(function() {
    var yi = window.yi;

    // 配置路径
    yi.config("./");

    yi.ready(function() {
        // 使用 CommonJS 的模块加载方式加载我们上面的 JavaScript 文件
        common.use('./main.js', function(module) {
            module.run();
        });
    }
})();
</code></pre>
        </div>
        <p>应用模板帮助我们规范所有的页面应用代码，这些代码都采用统一的标准进行开发，这样即有利于与划分代码结构，也便于今后的代码升级和维护。遵循统一的编码规范将事半功倍，当然这需要你学习和训练使用这些相关规范的 API 。</p>

        <h3 id="template-examples">案例</h3>
        <p>下面这些案例都是基于上面给出的基本模版并结合各种组件制作的。</p>
        <div class="row bs-examples">
          <div class="col-xs-6 col-md-4">
            <a class="thumbnail" href="examples/templates/starter/" target="_blank">
              <img src="examples/screenshots/starter.jpg" alt="最简页面" />
            </a>
            <h4>最简页面</h4>
            <p>只有一些最基本的东西：引入框架CSS和JavaScript文件，并进行壹框基础属性配置，载入一个Module。</p>
          </div>
        </div>
      </div><!-- /.bs-docs-section -->

      <!-- 工程模组
      ================================================== -->
      <div class="bs-docs-section">
        <div class="page-header">
          <h1 id="project-mod">工程模组</h1>
        </div>
        <p class="lead">工程模组化是一种模块化的界面组织方式，合理、充分地解耦界面设计与开发，可被单元测试，复用且独立按需发布的模组功能。</p>
        <p>壹框提供的模组化能力涵盖了模组开发的全周期，包括<strong>工程创建、编码、调试、测试、发布等</strong>过程。在使用模组前，一些必要的预备知识的学习将更好地帮助你理解和运用模组：</p>
        <ul>
          <li><a href="https://developer.mozilla.org/en-US/docs/AJAX/Getting_Started" target="_blank">AJAX</a></li>
          <li><a href="http://en.wikipedia.org/wiki/Representational_state_transfer" target="_blank">RESTful</a></li>
          <li><a href="http://engineering.linkedin.com/frontend/leaving-jsps-dust-moving-linkedin-dustjs-client-side-templates" target="_blank">JavaScript templating</a></li>
        </ul>
        <p>如果你已经掌握了这些知识那么很容易理解模组的技术原理。</p>
        <p>壹框模组通过 AJAX 按需获取界面单元，并自动管理依赖关系（JavaScript 文件和 CSS 样式表文件），提供模组工作的上下文环境。每个界面模组可独立使用 JSP 技术或者前端 JavaScript 模板技术，由开发者自由控制服务器负载部署。</p>
        <p>每一个模组最终被打包为一个 <code>.mod</code> 文件，通过<strong>模组管理器</strong>管理和控制，支持版本控制和热部署。</p>

        <p>下面将简述模组的一般开发方式，让你对模组的开发有一个初步的了解。详细的模组介绍你可以查看<a href="modules.jsp">模组</a>章节。</p>

        <!-- 创建模组 -->
        <h3 id="project-mod-new">创建模组</h3>
        <p>模组的创建可以在模组<strong>调试管理器</strong>里进行，打开<a href="debugger/" target="_blank">调试管理器</a>，点击“新建”按钮，在模态框里完成模组信息的录入，如下图所示：</p>
        <div class="bs-screenshot">
          <img src="assets/img/screenshots/new_mod.png" class="img-responsive img-rounded"/>
        </div>
        <div class="bs-callout bs-callout-warning">
          <h4>模组定义文件</h4>
          <p>每一个模组都用一个名为 <code>mod.xml</code> 的文件来对模组信息进行描述。这个文件包含了模组的名称、版本号、描述、文件列表、调试信息等数据，是模组的核心文件。</p>
        </div>
        <p>创建好模组后，你可以在<strong>调试管理器</strong>的表格里看到该模组的信息，其中<strong>名称</strong>和<strong>版本</strong>是模组系统管理模组的唯一查询条件，是标识模组唯一性的唯一依据。调试管理器模组列表：</p>
        <div class="bs-screenshot">
          <img src="assets/img/screenshots/debugger_manager.png" class="img-responsive img-rounded"/>
        </div>

        <!-- 编写模组 -->
        <h3 id="project-mod-coding">编写模组</h3>
        <p>创建好模组后，你就可以开始编写模组代码了。选择你熟悉的任何编辑器或 IDE 工具进行编码工作，如下图所示，使用了 Eclipse 对界面 JSP 文件进行编码。</p>
        <div class="bs-screenshot">
          <img src="assets/img/screenshots/coding_in_eclipse.png" class="img-responsive img-rounded"/>
        </div>
        <p>如果你希望进行在线编辑，可以选择表格“操作”列里的“更多”-&gt;“创作”，启动在线编辑器进行编辑。如下图所示，使用在线编辑器开发界面 JSP 文件。</p>
        <div class="bs-screenshot">
          <img src="assets/img/screenshots/coding_online.png" class="img-responsive img-rounded"/>
        </div>
        <p><strong>根据你项目的需要，你可能还需要编写模组相关的 JavaScript 代码和 CSS 代码。</strong></p>
        <p>编辑完代码并保存，完成模组的编码工作。如果你使用的 IDE 工具支持对容器即时发布，那么你需要将编写好的代码发布到容器里；如果你使用的是在线编辑器，只需要保存你的修改即可。</p>

        <!-- 测试模组 -->
        <h3 id="project-mod-test">测试模组</h3>
        <p>完成代码编写后，就可以开始对模组进行测试。在<a href="debugger/" target="_blank">调试管理器</a>里，点击待测试项目的“调试”按钮，进入调试器。在调试器内，点击“加载”按钮（按钮图标为 <span class="glyphicon glyphicon-play"></span> 的按钮），调试器加载模组数据、加载模组脚本和样式表，开发者在预览区即可看到模组界面。如下图所示：</p>
        <div class="bs-screenshot">
          <img src="assets/img/screenshots/debugger.png" class="img-responsive img-rounded"/>
        </div>
        <p>调试时，你依然可以使用你熟悉任何一种调试 Web 应用的工具和软件，比如 Firefox 的开发者工具栏、 Chrome 的开发者工具或者 IE 的开发人员工具等。</p>

        <!-- 发布模组 -->
        <h3 id="project-mod-release">发布模组</h3>
        <p>测试工作完成，模组符合开发预期需求后，我们就可以发布我们的模组了。如前所述，壹框模组会将相关的文件打包为一个 <code>.mod</code> 文件，只需在 <code>modules</code> 路径下部署此 <code>.mod</code> 文件，系统将自动识别并发布文件内容，让各个页面可复用此模组。</p>
        <p>点击<a href="debugger/" target="_blank">调试管理器</a>里的“构建”按钮进行模组构建和打包。构建器运行时的界面如下图所示：</p>
        <div class="bs-screenshot">
          <img src="assets/img/screenshots/builder.png" class="img-responsive img-rounded"/>
        </div>
        <p>构建器构建完成后会提示完成情况，并自动关闭构建窗口。点击<strong>调试管理器</strong>的<strong>“模组管理器”</strong>链接，可打开模组管理器：</p>
        <div class="bs-screenshot">
          <img src="assets/img/screenshots/mod_manager.png" class="img-responsive img-rounded"/>
        </div>
        <p>发布正确的模组都由模组管理器进行管理，因此在这里列表里你能看到已经被正确发布的模组。</p>

        <!-- 使用模组 -->
        <h3 id="project-mod-load">使用模组</h3>
        <p>壹框提供了 DOM 节点定义方式、 JSP 标签库方式、JavaScript 动态加载方式等多种加载模组的方式。以最常用的 DOM 节点定义方式为例，首先在需要显示模组的 DOM 节点的 class 属性里加入 <code>mod</code> class，然后插入 <code>data-mod</code>、<code>data-ver</code> 和 <code>data-auto</code> 等属性，分别赋值为<strong>模组名称</strong>、<strong>模组版本号</strong>和<strong>是否自动载入</strong>。</p>
        <div class="highlight">
<pre><code class="language-html">&lt;div id=&quot;my_mod&quot; class=&quot;mod&quot; data-mod=&quot;AndroidCarousel&quot; data-ver=&quot;1.0.0&quot; data-auto=&quot;true&quot;&gt;&lt;/div&gt;
</code></pre>
        </div>
        <p>壹框在完成客户端初始化后，自动搜索所有包含 <code>.mod</code> class 的节点，并尝试加载 <code>data-auto</code> 属性为 <code>true</code> 的模组。如下图所示，一个自动加载的模组：</p>
        <div class="bs-screenshot">
          <img src="assets/img/screenshots/load_example.png" class="img-responsive img-rounded"/>
        </div>
        <p>如果你的模组主函数需要输入参数，可以插入 <code>data-args</code> 属性，设置一个 JSON 格式的输入参数，壹框会自动将参数传给主函数。</p>
        <div class="highlight">
<pre><code class="language-html">&lt;div id=&quot;my_mod&quot; class=&quot;mod&quot; data-mod=&quot;AndroidCarousel&quot; data-ver=&quot;1.0.0&quot; data-auto=&quot;true&quot; data-args='{&quot;first&quot;:&quot;Android 2.3&quot;}'&gt;&lt;/div&gt;
</code></pre>
        </div>
        <p>至此，一个简单的创建、编写、测试、发布、使用模组的流程就结束了，更多关于模组的详细信息、相关的 API 和高级应用方式可以查看<a href="modules.jsp">模组</a>章节。</p>

        <!-- 原则 -->
        <h3 id="project-mod-rule">“三优三不”原则</h3>
        <p>在很多情况下你都可以使用模组，合理地应用模组能力将帮助你的项目达到事半功倍的效果，所以你需要规划好你的模组。</p>
        <div class="bs-callout bs-callout-warning" id="jquery-required">
          <h4>你需要规划好你的模组</h4>
          <p>壹框模组相比直接在页面里预置界面标签和采用 JavaScript 动态修改 DOM 树实现动态界面方式而言，在开发效率上并没有较大的改进。模组考虑的是<strong>缓存</strong>、<strong>性能</strong>、<strong>浓缩</strong>、<strong>解耦</strong>、<strong>渐进渲染</strong>和<strong>持续演进</strong>。</p>
          <ul>
            <li>抑制重复加载 JavaScript 和 CSS 文件以及重复出现的 HTML 片段。</li>
            <li>惰性延迟、压缩模板等技术让开发者对性能完全可控。</li>
            <li>界面可以分解为片段，模板可以分解为小片段，HTML标记和渲染逻辑可重用。</li>
            <li>鼓励表现层和应用层、业务逻辑分离，提供 URL 参数、Function JSON 参数多种手段进行层次控制。</li>
            <li>支持同步或异步渲染，后端服务既可以参与渲染也可以只提供数据，可以将部分内容优先渲染，这样用户能很快看到一些数据。</li>
            <li>严格的版本约定和单文件批包方式保证模组能被持续演进。</li>
          </ul>
          <p>因此，当你希望得到这些特性支持时便可以选择使用模组来进行你的应用开发，合理地设计和规划你应用中的模块，将其模组化将是你开发模组的第一步！</p>
        </div>

        <p>为了帮助开发者快速筛选模组应用的场景和需求，我们总结了一个“三优三不”原则，“三优”即3种可优先使用模组的场景，“三不”即3类不合适使用模组的情况。</p>
        <div class="bs-callout bs-callout-info">
          <h4>“三优”原则</h4>
          <ul>
            <li>独立功能组件可优先应用模组技术，无论该组件工作在数据层还是业务层。</li>
            <li>需求需要快速迭代的可解耦功能可优先应用模组技术。</li>
            <li>需要前后端同时分担界面负载时可优先使用模组技术。</li>
          </ul>
        </div>
        <div class="bs-callout bs-callout-danger">
          <h4>“三不”原则</h4>
          <ul>
            <li>驱动全局或者外部组件布局时，不应当使用模组技术去实现布局控制。</li>
            <li>串联数据层和逻辑层功能的管理器，不应当使用模组技术实现。</li>
            <li>产品级或大系统级的补丁，不应当使用模组技术实现。</li>
          </ul>
        </div>
      </div><!-- /.bs-docs-section -->

      <!-- 浏览器支持
      ================================================== -->
      <div class="bs-docs-section">
        <div class="page-header">
          <h1 id="browsers">浏览器支持</h1>
        </div>
        <p class="lead">壹框的目标是在最新的桌面和移动浏览器上有最佳的表现，也就是说，在较老旧的浏览器上可能会导致某些组件表现出的样式有些不同，但是功能是完整的。</p>

        <h3>被支持的浏览器</h3>
        <p>特别注意，我们坚决支持这些浏览器的最新版本：</p>
        <ul>
          <li>Chrome (Mac、Windows、iOS和Android)</li>
          <li>Safari (只支持Mac和iOS版，Windows版已经基本死掉了)</li>
          <li>Firefox (Mac、Windows)</li>
          <li>Internet Explorer</li>
          <li>Opera (Mac、Windows)</li>
        </ul>
        <p>壹框在 Chromium、Linux版Chrome、Linux版Firefox 和 Internet Explorer 7 上的表现也是很不错的，虽然我们不对其进行官方支持。</p>
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

<%=Stage.importScripts("lib/")%>
<script type="text/javascript" src="assets/js/highlight.min.js"></script>
<script type="text/javascript">hljs.initHighlightingOnLoad();</script>
<script type="text/javascript" src="assets/js/docs.js"></script>

</body>
</html>
