<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="yi.core.*" %>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>层叠样式表 - 壹框</title>
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
        <li><a href="getting-started.jsp">起步</a></li>
        <li class="active"><a href="css.jsp">层叠样式表</a></li>
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
    <h1>层叠样式表</h1>
    <p>设置全局CSS样式，基本的HTML元素均可以通过 class 设置样式并得到增强效果，还有先进的栅格系统。</p>
  </div>
</div>

<div class="container bs-docs-container">
  <div class="row">
    <div class="col-md-3">
      <div class="bs-sidebar hidden-print" role="complementary">
        <ul class="nav bs-sidenav">
          <li>
            <a href="#overview">概览</a>
            <ul class="nav">
              <li><a href="#overview-doctype">HTML5文档类型</a></li>
              <li><a href="#overview-mobile">移动设备优先</a></li>
              <li><a href="#overview-responsive-images">响应式图片</a></li>
              <li><a href="#overview-type-links">排版和链接</a></li>
              <li><a href="#overview-normalize">Normalize</a></li>
              <li><a href="#overview-container">Containers</a></li>
            </ul>
          </li>
          <li>
            <a href="#grid">栅格系统</a>
            <ul class="nav">
              <li><a href="#grid-intro">简介</a></li>
              <li><a href="#grid-media-queries">媒体查询</a></li>
              <li><a href="#grid-options">栅格选项</a></li>
              <li><a href="#grid-example-basic">案例：从堆叠到水平排列</a></li>
              <li><a href="#grid-example-mixed">案例：移动设备和桌面</a></li>
              <li><a href="#grid-example-mixed-complete">案例：手机、平板和桌面</a></li>
              <li><a href="#grid-responsive-resets">响应式列重置</a></li>
              <li><a href="#grid-offsetting">列偏移</a></li>
              <li><a href="#grid-nesting">嵌套列</a></li>
              <li><a href="#grid-column-ordering">列排序</a></li>
            </ul>
          </li>
          <li>
            <a href="#type">排版</a>
            <ul class="nav">
              <li><a href="#type-headings">标题</a></li>
              <li><a href="#type-body-copy">页面主体</a></li>
              <li><a href="#type-emphasis">强调</a></li>
              <li><a href="#type-abbreviations">缩略语</a></li>
              <li><a href="#type-addresses">地址</a></li>
              <li><a href="#type-blockquotes">引用</a></li>
              <li><a href="#type-lists">列表</a></li>
            </ul>
          </li>
          <li><a href="#code">代码</a></li>
          <li>
            <a href="#tables">表格</a>
            <ul class="nav">
              <li><a href="#tables-example">基本案例</a></li>
              <li><a href="#tables-striped">条纹状表格</a></li>
              <li><a href="#tables-bordered">带边框的表格</a></li>
              <li><a href="#tables-hover-rows">鼠标悬停</a></li>
              <li><a href="#tables-condensed">紧缩表格</a></li>
              <li><a href="#tables-contextual-classes">状态 class</a></li>
              <li><a href="#tables-responsive">响应式表格</a></li>
            </ul>
          </li>
          <li>
            <a href="#forms">表单</a>
            <ul class="nav">
              <li><a href="#forms-example">基本案例</a></li>
              <li><a href="#forms-inline">内联表单</a></li>
              <li><a href="#forms-horizontal">水平排列的表单</a></li>
              <li><a href="#forms-controls">被支持的控件</a></li>
              <li><a href="#forms-controls-static">静态控件</a></li>
              <li><a href="#forms-control-states">控件状态</a></li>
              <li><a href="#forms-control-sizes">控件尺寸</a></li>
              <li><a href="#forms-help-text">帮助文本</a></li>
            </ul>
          </li>
          <li>
            <a href="#buttons">按钮</a>
            <ul class="nav">
              <li><a href="#buttons-options">选项</a></li>
              <li><a href="#buttons-sizes">尺寸</a></li>
              <li><a href="#buttons-active">激活状态</a></li>
              <li><a href="#buttons-disabled">禁用状态</a></li>
              <li><a href="#buttons-tags">可作按钮使用的HTML标签</a></li>
            </ul>
          </li>
          <li>
            <a href="#images">图片</a>
          </li>
          <li>
            <a href="#helper-classes">工具class</a>
            <ul class="nav">
              <li><a href="#helper-classes-close">关闭按钮</a></li>
              <li><a href="#helper-classes-carets">脱字符号</a></li>
              <li><a href="#helper-classes-floats">快速设置浮动</a></li>
              <li><a href="#helper-classes-center">居中内容块</a></li>
              <li><a href="#helper-classes-clearfix">清除浮动</a></li>
              <li><a href="#helper-classes-show-hide">显示或隐藏内容</a></li>
              <li><a href="#helper-classes-screen-readers">针对屏幕阅读器的内容</a></li>
              <li><a href="#helper-classes-image-replacement">图片替换</a></li>
            </ul>
          </li>
          <li>
            <a href="#responsive-utilities">响应式工具</a>
            <ul class="nav">
              <li><a href="#responsive-utilities-classes">可用的class</a></li>
              <li><a href="#responsive-utilities-print">打印class</a></li>
              <li><a href="#responsive-utilities-tests">测试用例</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <div class="col-md-9" role="main">

      <!-- Global settings
      ================================================== -->
      <div class="bs-docs-section">
        <div class="page-header">
          <h1 id="overview">概览</h1>
        </div>
        <p class="lead">深入了解样式表底层结构的关键部分，包括我们让 Web 开发变得更好、更快、更强壮的最佳实践。</p>

        <h3 id="overview-doctype">HTML5文档类型</h3>
        <p>壹框使用的核心样式表是 Bootstrap 的样式表，这些样式使用到的某些HTML元素和CSS属性需要将页面设置为HTML5文档类型。在你项目中的每个页面都要参照下面的格式进行设置。</p>
        <div class="highlight">
<pre><code class="language-html">&lt;!doctype html&gt;
&lt;html lang=&quot;zh-CN&quot;&gt;
  ...
&lt;/html&gt;</code></pre>
        </div>

        <h3 id="overview-mobile">移动设备优先</h3>
        <p>Bootstrap 3 是对移动设备优先的实现，针对移动设备的样式融合进了框架的每个角落，而不是一个单一的文件。</p>
        <p>为了确保适当的绘制和触屏缩放，需要在<code>&lt;head&gt;</code>之中<strong>添加 viewport 元数据标签</strong>。</p>
        <div class="highlight">
<pre><code class="language-html">&lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;</code></pre>
        </div>
        <p>在移动设备浏览器上，通过为 viewport meta 标签添加 <code>user-scalable=no</code> 可以禁用其缩放（zooming）功能。这样禁用缩放功能后，用户只能滚动屏幕，就能让你的应用或网站看上去更像原生应用的感觉。注意，这种方式我们并不推荐所有应用或网站使用，还是要看你自己的情况而定！</p>
        <div class="highlight">
<pre><code class="language-html">&lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no&quot;&gt;</code></pre>
        </div>

        <h3 id="overview-responsive-images">响应式图片</h3>
        <p>通过添加 <code>.img-responsive</code> class 可以让图片对响应式布局的支持更友好。其实质是为图片赋予了 <code>max-width: 100%;</code> 和 <code>height: auto;</code> 属性，可以让图片按比例缩放，不超过其父元素的尺寸。</p>
        <div class="highlight">
<pre><code class="language-html">&lt;img src=&quot;...&quot; class=&quot;img-responsive&quot; alt=&quot;Responsive image&quot;/&gt;</code></pre>
        </div>

        <h3 id="overview-type-links">排版和链接</h3>
        <p>样式表设置了全局样式，包括显示、排版和链接。尤其是，我们还：</p>
        <ul>
          <li>为 <code>body</code> 标签设置了 <code>background-color: #fff;</code> 样式</li>
          <li>设置了排版的基本属性 <code>@font-family-base</code> 、<code>@font-size-base</code> 和 <code>@line-height-base</code></li>
          <li>设置了全局链接颜色 <code>@link-color</code>，并且仅在 <code>:hover</code> 里设置链接下划线（underline）</li>
        </ul>
        <p>这些样式可以在 <code>scaffolding.less</code> 文件中找到。</p>

        <h3 id="overview-normalize">Normalize</h3>
        <p>为了增强跨浏览器表现的一致性，我们使用了 <a href="http://necolas.github.io/normalize.css/" target="_blank">Normalize</a>，这是由 <a href="http://twitter.com/necolas" target="_blank">Nicolas Gallagher</a> 和 <a href="http://twitter.com/jon_neal" target="_blank">Jonathan Neal</a> 维护的一个 reset 库。</p>

        <h3 id="overview-container">Containers</h3>
        <p>用 <code>.container</code> 包裹页面上的内容即可实现居中对齐。在不同的媒体查询阈值范围内都为 container 设置了 <code>width</code>，用以匹配栅格系统。</p>
        <p>注意，由于设置了 <code>padding</code> 和固定宽度， <code>.container</code> 不能嵌套。</p>
        <div class="highlight">
<pre><code class="language-html">&lt;div class=&quot;container&quot;&gt;
  ...
&lt;/div&gt;</code></pre>
        </div>
      </div>

      <!-- Grid system
      ================================================== -->
      <div class="bs-docs-section">
        <div class="page-header">
          <h1 id="grid">栅格系统</h1>
        </div>
        <p class="lead">核心样式表内置了一套响应式、移动设备优先的流式栅格系统，随着屏幕设备或视口（viewport）尺寸的增加，系统会自动分为最多12列。它包含了易于使用的 <a href="#grid-example-basic">预定义classe</a>，还有强大的 <a href="#grid-less">mixin用于生成更具语义的布局</a>。</p>

        <h3 id="grid-intro">简介</h3>
        <p>栅格系统用于通过一系列的行（row）与列（column）的组合创建页面布局，你的内容就可以放入创建好的布局中。下面就介绍以下 Bootstrap 栅格系统的工作原理：</p>
        <ul>
          <li>“行（row）”必须包含在 <code>.container</code>中，以便为其赋予合适的排列（aligment）和内补（padding）。</li>
          <li>使用“行（row）”在水平方向创建一组“列（column）”。</li>
          <li>你的内容应当放置于“列（column）”内，而且，只有“列（column）”可以作为行（row）”的直接子元素。</li>
          <li>类似 Predefined grid classes like <code>.row</code> and <code>.col-xs-4</code> 这些预定义的栅格 class 可以用来快速创建栅格布局。Bootstrap 源码中定义的mixin也可以用来创建语义化的布局。</li>
          <li>通过设置 <code>padding</code> 从而创建“列（column）”之间的间隔（gutter）。然后通过为第一和最后一样设置负值的 <code>margin</code> 从而抵消掉padding的影响。</li>
          <li>栅格系统中的列是通过指定1到12的值来表示其跨越的范围。例如，三个等宽的列可以使用三个<code>.col-xs-4</code>来创建。</li>
        </ul>
        <p>通过研究案例，可以将这些原理应用到你的代码中。</p>

        <div class="bs-callout bs-callout-info">
          <h4>栅格与全宽布局</h4>
          <p>对于需要占据整个浏览器视口（viewport）的页面，需要将内容区域包裹在一个容器元素内，并且赋予 <code>padding: 0 15px;</code>，为的是抵消掉为 <code>.row</code> 所设置的 <code>margin: 0 -15px;</code> （如果不这样的话，你的页面会左右超出视口15px，页面底部出现横向滚动条）。</p>
        </div>

        <h3 id="grid-media-queries">媒体查询</h3>
        <p>在栅格系统中，我们在LESS文件中使用以下媒体查询（media query）来创建关键的分界点阈值。</p>
        <div class="highlight">
<pre><code class="language-css"><span class="comment">/* 屏幕非常小的设备（手机，屏幕宽小于 768px） */</span>
<span class="comment">/* 这是默认尺寸设置，没有这个尺寸的媒体查询设置 */</span>

<span class="comment">/* 小屏幕设备（平板电脑，屏幕宽大于等于 768px） */</span>
<span class="at_rule">@<span class="keyword">media</span> (min-width: @screen-sm-min) </span>{ ... }

<span class="comment">/* 中屏幕设备（桌面设备，屏幕宽大于等于 992px） */</span>
<span class="at_rule">@<span class="keyword">media</span> (min-width: @screen-md-min) </span>{ ... }

<span class="comment">/* 大屏幕设备（大型屏幕设备，屏幕宽大于等于 1200px） */</span>
<span class="at_rule">@<span class="keyword">media</span> (min-width: @screen-lg-min) </span>{ ... }</code></pre>
        </div>
        <p>我们偶尔需要扩展媒体查询的 <code>max-width</code> 来限制 CSS 工作在屏幕范围更窄的设备。</p>
        <div class="highlight">
<pre><code class="language-css"><span class="at_rule">@<span class="keyword">media</span> (max-width: @screen-xs-max) </span>{ ... }
<span class="at_rule">@<span class="keyword">media</span> (min-width: @screen-sm-min) and (max-width: @screen-sm-max) </span>{ ... }
<span class="at_rule">@<span class="keyword">media</span> (min-width: @screen-md-min) and (max-width: @screen-md-max) </span>{ ... }
<span class="at_rule">@<span class="keyword">media</span> (min-width: @screen-lg-min) </span>{ ... }</code></pre>
        </div>

        <h3 id="grid-options">栅格选项</h3>
        <p>通过下表可以详细查看栅格系统如何在多种屏幕设备上工作的。</p>
        <div class="table-responsive">
          <table class="table table-bordered table-striped">
            <thead>
              <tr>
                <th></th>
                <th>超小屏幕设备 <small>手机 (&lt;768px)</small></th>
                <th>小屏幕设备 <small>平板 (&ge;768px)</small></th>
                <th>中等屏幕设备 <small>桌面 (&ge;992px)</small></th>
                <th>大屏幕设备 <small>桌面 (&ge;1200px)</small></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>栅格系统行为</th>
                <td>总是水平排列</td>
                <td colspan="3">开始是堆叠在一起的，超过这些阈值将变为水平排列</td>
              </tr>
              <tr>
                <th>最大<code>.container</code>宽度</th>
                <td>None (自动)</td>
                <td>750px</td>
                <td>970px</td>
                <td>1170px</td>
              </tr>
              <tr>
                <th>class 前缀</th>
                <td><code>.col-xs-</code></td>
                <td><code>.col-sm-</code></td>
                <td><code>.col-md-</code></td>
                <td><code>.col-lg-</code></td>
              </tr>
              <tr>
                <th>列数</th>
                <td colspan="4">12</td>
              </tr>
              <tr>
                <th>最大列宽</th>
                <td class="text-muted">自动</td>
                <td>60px</td>
                <td>78px</td>
                <td>95px</td>
              </tr>
              <tr>
                <th>槽宽</th>
                <td colspan="4">30px (每列左右均有15px)</td>
              </tr>
              <tr>
                <th>可嵌套</th>
                <td colspan="4">是</td>
              </tr>
              <tr>
                <th>偏移（Offsets）</th>
                <td colspan="4">是</td>
              </tr>
              <tr>
                <th>列排序</th>
                <td colspan="4">是</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>栅格 class 在屏幕宽度大于或等于阈值的设备上起作用，并且将针对小屏幕设备所设置的 class 覆盖掉。因此，对任何一个元素应用任何 <code>.col-md-</code> class 将不仅作用于中等尺寸的屏幕，还将作用于大屏幕设备（如果没有设置 <code>.col-lg-</code> class的话）。</p>

        <h3 id="grid-example-basic">案例：从堆叠到水平排列</h3>
        <p>使用单一的一组 <code>.col-md-*</code> 栅格class，你就可以创建一个基本的栅格系统，在手机和平板设备上一开始是堆叠在一起的（超小屏幕到小屏幕这一范围），在桌面（中等）屏幕设备上变为水平排列。将列(col-*-*)放置于任何 <code>.row</code> 内即可。</p>
        <div class="bs-docs-grid">
          <div class="row show-grid">
            <div class="col-md-1">.col-md-1</div>
            <div class="col-md-1">.col-md-1</div>
            <div class="col-md-1">.col-md-1</div>
            <div class="col-md-1">.col-md-1</div>
            <div class="col-md-1">.col-md-1</div>
            <div class="col-md-1">.col-md-1</div>
            <div class="col-md-1">.col-md-1</div>
            <div class="col-md-1">.col-md-1</div>
            <div class="col-md-1">.col-md-1</div>
            <div class="col-md-1">.col-md-1</div>
            <div class="col-md-1">.col-md-1</div>
            <div class="col-md-1">.col-md-1</div>
          </div>
          <div class="row show-grid">
            <div class="col-md-8">.col-md-8</div>
            <div class="col-md-4">.col-md-4</div>
          </div>
          <div class="row show-grid">
            <div class="col-md-4">.col-md-4</div>
            <div class="col-md-4">.col-md-4</div>
            <div class="col-md-4">.col-md-4</div>
          </div>
          <div class="row show-grid">
            <div class="col-md-6">.col-md-6</div>
            <div class="col-md-6">.col-md-6</div>
          </div>
        </div>
        <div class="highlight">
<pre><code class="language-html">&lt;div class=&quot;row&quot;&gt;
  &lt;div class=&quot;col-md-1&quot;&gt;.col-md-1&lt;/div&gt;
  &lt;div class=&quot;col-md-1&quot;&gt;.col-md-1&lt;/div&gt;
  &lt;div class=&quot;col-md-1&quot;&gt;.col-md-1&lt;/div&gt;
  &lt;div class=&quot;col-md-1&quot;&gt;.col-md-1&lt;/div&gt;
  &lt;div class=&quot;col-md-1&quot;&gt;.col-md-1&lt;/div&gt;
  &lt;div class=&quot;col-md-1&quot;&gt;.col-md-1&lt;/div&gt;
  &lt;div class=&quot;col-md-1&quot;&gt;.col-md-1&lt;/div&gt;
  &lt;div class=&quot;col-md-1&quot;&gt;.col-md-1&lt;/div&gt;
  &lt;div class=&quot;col-md-1&quot;&gt;.col-md-1&lt;/div&gt;
  &lt;div class=&quot;col-md-1&quot;&gt;.col-md-1&lt;/div&gt;
  &lt;div class=&quot;col-md-1&quot;&gt;.col-md-1&lt;/div&gt;
  &lt;div class=&quot;col-md-1&quot;&gt;.col-md-1&lt;/div&gt;
&lt;/div&gt;
&lt;div class=&quot;row&quot;&gt;
  &lt;div class=&quot;col-md-8&quot;&gt;.col-md-8&lt;/div&gt;
  &lt;div class=&quot;col-md-4&quot;&gt;.col-md-4&lt;/div&gt;
&lt;/div&gt;
&lt;div class=&quot;row&quot;&gt;
  &lt;div class=&quot;col-md-4&quot;&gt;.col-md-4&lt;/div&gt;
  &lt;div class=&quot;col-md-4&quot;&gt;.col-md-4&lt;/div&gt;
  &lt;div class=&quot;col-md-4&quot;&gt;.col-md-4&lt;/div&gt;
&lt;/div&gt;
&lt;div class=&quot;row&quot;&gt;
  &lt;div class=&quot;col-md-6&quot;&gt;.col-md-6&lt;/div&gt;
  &lt;div class=&quot;col-md-6&quot;&gt;.col-md-6&lt;/div&gt;
&lt;/div&gt;</code></pre>
        </div>

        <h3 id="grid-example-mixed">案例：移动设备和桌面</h3>
        <p>是否不希望在小屏幕设备上所有列都堆叠在一起？那就使用针对超小屏幕和中等屏幕设备所定义的 class 吧，即 <code>.col-xs-*</code> 、 <code>.col-md-*</code> 。请看下面的案例。</p>
        <div class="bs-docs-grid">
          <div class="row show-grid">
            <div class="col-xs-12 col-md-8">.col-xs-12 .col-md-8</div>
            <div class="col-xs-6 col-md-4">.col-xs-6 .col-md-4</div>
          </div>
          <div class="row show-grid">
            <div class="col-xs-6 col-md-4">.col-xs-6 .col-md-4</div>
            <div class="col-xs-6 col-md-4">.col-xs-6 .col-md-4</div>
            <div class="col-xs-6 col-md-4">.col-xs-6 .col-md-4</div>
          </div>
          <div class="row show-grid">
            <div class="col-xs-6">.col-xs-6</div>
            <div class="col-xs-6">.col-xs-6</div>
          </div>
        </div>
        <div class="highlight">
<pre><code class="language-html">&lt;!-- 堆叠列在移动设备上前一个显示完整宽度，后一个显示一半宽度 --&gt;
&lt;div class=&quot;row&quot;&gt;
  &lt;div class=&quot;col-xs-12 col-md-8&quot;&gt;.col-xs-12 .col-md-8&lt;/div&gt;
  &lt;div class=&quot;col-xs-6 col-md-4&quot;&gt;.col-xs-6 .col-md-4&lt;/div&gt;
&lt;/div&gt;

&lt;!-- 列在移动设备上按照50%宽显示，在桌面设备上提高到33%宽显示 --&gt;
&lt;div class=&quot;row&quot;&gt;
  &lt;div class=&quot;col-xs-6 col-md-4&quot;&gt;.col-xs-6 .col-md-4&lt;/div&gt;
  &lt;div class=&quot;col-xs-6 col-md-4&quot;&gt;.col-xs-6 .col-md-4&lt;/div&gt;
  &lt;div class=&quot;col-xs-6 col-md-4&quot;&gt;.col-xs-6 .col-md-4&lt;/div&gt;
&lt;/div&gt;

&lt;!-- 列在移动设备和桌面上都是按照50%宽显示 --&gt;
&lt;div class=&quot;row&quot;&gt;
  &lt;div class=&quot;col-xs-6&quot;&gt;.col-xs-6&lt;/div&gt;
  &lt;div class=&quot;col-xs-6&quot;&gt;.col-xs-6&lt;/div&gt;
&lt;/div&gt;</code></pre>
</div>

        <h3 id="grid-example-mixed-complete">案例：手机、平板和桌面</h3>
        <p>在上面案例的基础上，通过使用 <code>.col-sm-*</code> class 我们来创建更加动态和强大的布局吧。</p>
        <div class="bs-docs-grid">
          <div class="row show-grid">
            <div class="col-xs-12 col-sm-6 col-md-8">.col-xs-12 .col-sm-6 .col-md-8</div>
            <div class="col-xs-6 col-md-4">.col-xs-6 .col-md-4</div>
          </div>
          <div class="row show-grid">
            <div class="col-xs-6 col-sm-4">.col-xs-6 .col-sm-4</div>
            <div class="col-xs-6 col-sm-4">.col-xs-6 .col-sm-4</div>
            <!-- 可选：如果内容高度不匹配，则清空 XS 列设置 -->
            <div class="clearfix visible-xs"></div>
            <div class="col-xs-6 col-sm-4">.col-xs-6 .col-sm-4</div>
          </div>
        </div>
        <div class="highlight">
<pre><code class="language-html">&lt;div class=&quot;row&quot;&gt;
  &lt;div class=&quot;col-xs-12 col-sm-6 col-md-8&quot;&gt;.col-xs-12 .col-sm-6 .col-md-8&lt;/div&gt;
  &lt;div class=&quot;col-xs-6 col-md-4&quot;&gt;.col-xs-6 .col-md-4&lt;/div&gt;
&lt;/div&gt;
&lt;div class=&quot;row&quot;&gt;
  &lt;div class=&quot;col-xs-6 col-sm-4&quot;&gt;.col-xs-6 .col-sm-4&lt;/div&gt;
  &lt;div class=&quot;col-xs-6 col-sm-4&quot;&gt;.col-xs-6 .col-sm-4&lt;/div&gt;
  &lt;!-- 可选：如果内容高度不匹配，则清空 XS 列设置 --&gt;
  &lt;div class=&quot;clearfix visible-xs&quot;&gt;&lt;/div&gt;
  &lt;div class=&quot;col-xs-6 col-sm-4&quot;&gt;.col-xs-6 .col-sm-4&lt;/div&gt;
&lt;/div&gt;</code></pre>
        </div>

        <h3 id="grid-responsive-resets">响应式列重置</h3>
        <p>即便有上面给出的四组栅格 class，你也不免会碰到一些问题，例如，在某些阈值时，某些列可能会出现比别的列高的情况。为了克服这一问题，建议联合使用 <code>.clearfix</code> 和 <a href="#responsive-utilities">响应式工具</a>。</p>
        <div class="bs-docs-grid">
          <div class="row show-grid">
            <div class="col-xs-6 col-sm-3">
              .col-xs-6 .col-sm-3
              <br/>通过调整浏览器的宽度或在手机上即可查看这些案例的实际效果。
            </div>
            <div class="col-xs-6 col-sm-3">.col-xs-6 .col-sm-3</div>

            <!-- 添加 clearfix 到需要的视口 -->
            <div class="clearfix visible-xs"></div>

            <div class="col-xs-6 col-sm-3">.col-xs-6 .col-sm-3</div>
            <div class="col-xs-6 col-sm-3">.col-xs-6 .col-sm-3</div>
          </div>
        </div>
        <div class="highlight">
<pre><code class="language-html">&lt;div class=&quot;row&quot;&gt;
  &lt;div class=&quot;col-xs-6 col-sm-3&quot;&gt;.col-xs-6 .col-sm-3&lt;/div&gt;
  &lt;div class=&quot;col-xs-6 col-sm-3&quot;&gt;.col-xs-6 .col-sm-3&lt;/div&gt;

  &lt;!-- 添加 clearfix 到需要的视口 --&gt;
  &lt;div class=&quot;clearfix visible-xs&quot;&gt;&lt;/div&gt;

  &lt;div class=&quot;col-xs-6 col-sm-3&quot;&gt;.col-xs-6 .col-sm-3&lt;/div&gt;
  &lt;div class=&quot;col-xs-6 col-sm-3&quot;&gt;.col-xs-6 .col-sm-3&lt;/div&gt;
&lt;/div&gt;</code></pre>
        </div>

        <h3 id="grid-offsetting">列偏移</h3>
        <p>使用 <code>.col-md-offset-*</code> 可以将列偏移到右侧。这些 class 通过使用 <code>*</code> 选择器将所有列增加了列的左侧 margin。例如， <code>.col-md-offset-4</code> 将 <code>.col-md-4</code> 向右移动了4个列的宽度。</p>
        <div class="bs-docs-grid">
          <div class="row show-grid">
            <div class="col-md-4">.col-md-4</div>
            <div class="col-md-4 col-md-offset-4">.col-md-4 .col-md-offset-4</div>
          </div>
          <div class="row show-grid">
            <div class="col-md-3 col-md-offset-3">.col-md-3 .col-md-offset-3</div>
            <div class="col-md-3 col-md-offset-3">.col-md-3 .col-md-offset-3</div>
          </div>
          <div class="row show-grid">
            <div class="col-md-6 col-md-offset-3">.col-md-6 .col-md-offset-3</div>
          </div>
        </div>
        <div class="highlight">
<pre><code class="language-html">&lt;div class=&quot;row&quot;&gt;
  &lt;div class=&quot;col-md-4&quot;&gt;.col-md-4&lt;/div&gt;
  &lt;div class=&quot;col-md-4 col-md-offset-4&quot;&gt;.col-md-4 .col-md-offset-4&lt;/div&gt;
&lt;/div&gt;
&lt;div class=&quot;row&quot;&gt;
  &lt;div class=&quot;col-md-3 col-md-offset-3&quot;&gt;.col-md-3 .col-md-offset-3&lt;/div&gt;
  &lt;div class=&quot;col-md-3 col-md-offset-3&quot;&gt;.col-md-3 .col-md-offset-3&lt;/div&gt;
&lt;/div&gt;
&lt;div class=&quot;row&quot;&gt;
  &lt;div class=&quot;col-md-6 col-md-offset-3&quot;&gt;.col-md-6 .col-md-offset-3&lt;/div&gt;
&lt;/div&gt;</code></pre>
        </div>

        <h3 id="grid-nesting">嵌套列</h3>
        <p>为了使用内置的栅格将内容嵌套，通过添加一个新的 <code>.row</code> 和一系列 <code>.col-md-*</code> 列到已经存在的 <code>.col-md-*</code> 列内即可实现。嵌套 row 所包含的列加起来应该等于12。</p>
        <div class="row show-grid">
          <div class="col-md-9">
            Level 1: .col-md-9
            <div class="row show-grid">
              <div class="col-md-6">
                Level 2: .col-md-6
              </div>
              <div class="col-md-6">
                Level 2: .col-md-6
              </div>
            </div>
          </div>
        </div>
        <div class="highlight">
<pre><code class="language-html">&lt;div class=&quot;row&quot;&gt;
  &lt;div class=&quot;col-md-9&quot;&gt;
    Level 1: .col-md-9
    &lt;div class=&quot;row&quot;&gt;
      &lt;div class=&quot;col-md-6&quot;&gt;
        Level 2: .col-md-6
      &lt;/div&gt;
      &lt;div class=&quot;col-md-6&quot;&gt;
        Level 2: .col-md-6
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;</code></pre>
        </div>

        <h3 id="grid-column-ordering">列排序</h3>
        <p>通过使用 <code>.col-md-push-*</code> 和 <code>.col-md-pull-*</code> 就可以很容易的改变列的顺序。</p>
        <div class="row show-grid">
          <div class="col-md-9 col-md-push-3">.col-md-9 .col-md-push-3</div>
          <div class="col-md-3 col-md-pull-9">.col-md-3 .col-md-pull-9</div>
        </div>
        <div class="highlight">
<pre><code class="language-html">&lt;div class=&quot;row&quot;&gt;
  &lt;div class=&quot;col-md-9 col-md-push-3&quot;&gt;.col-md-9 .col-md-push-3&lt;/div&gt;
  &lt;div class=&quot;col-md-3 col-md-pull-9&quot;&gt;.col-md-3 .col-md-pull-9&lt;/div&gt;
&lt;/div&gt;</code></pre>
        </div>
      </div>

      <!-- Typography
      ================================================== -->
      <div class="bs-docs-section">
        <div class="page-header">
          <h1 id="type">排版</h1>
        </div>

        <!-- Headings -->
        <h2 id="type-headings">标题</h2>
        <p>HTML 中的所有标题标签，从 <code>&lt;h1&gt;</code> 到 <code>&lt;h6&gt;</code> 均可用。另外，还提供了 <code>.h1</code> 到 <code>.h6</code> class，为的是给 inline 属性的文本赋予标题的样式。</p>
        <div class="bs-example bs-example-type">
          <table class="table">
            <tbody>
              <tr>
                <td><h1>h1. 壹框标题</h1></td>
                <td class="info">粗体 36px</td>
              </tr>
              <tr>
                <td><h2>h2. 壹框标题</h2></td>
                <td class="info">粗体 30px</td>
              </tr>
              <tr>
                <td><h3>h3. 壹框标题</h3></td>
                <td class="info">粗体 24px</td>
              </tr>
              <tr>
                <td><h4>h4. 壹框标题</h4></td>
                <td class="info">粗体 18px</td>
              </tr>
              <tr>
                <td><h5>h5. 壹框标题</h5></td>
                <td class="info">粗体 14px</td>
              </tr>
              <tr>
                <td><h6>h6. 壹框标题</h6></td>
                <td class="info">粗体 12px</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="highlight">
<pre><code class="language-html">&lt;h1&gt;h1. 壹框标题&lt;/h1&gt;
&lt;h2&gt;h2. 壹框标题&lt;/h2&gt;
&lt;h3&gt;h3. 壹框标题&lt;/h3&gt;
&lt;h4&gt;h4. 壹框标题&lt;/h4&gt;
&lt;h5&gt;h5. 壹框标题&lt;/h5&gt;
&lt;h6&gt;h6. 壹框标题&lt;/h6&gt;</code></pre>
        </div>

        <p>在标题内还可以包含 <code>&lt;small&gt;</code> 标签或 <code>.small</code> 元素，可以用来标记副标题。</p>
        <div class="bs-example bs-example-type">
          <table class="table">
            <tbody>
              <tr><td><h1>h1. 壹框标题 <small>二级文本</small></h1></td></tr>
              <tr><td><h2>h2. 壹框标题 <small>二级文本</small></h2></td></tr>
              <tr><td><h3>h3. 壹框标题 <small>二级文本</small></h3></td></tr>
              <tr><td><h4>h4. 壹框标题 <small>二级文本</small></h4></td></tr>
              <tr><td><h5>h5. 壹框标题 <small>二级文本</small></h5></td></tr>
              <tr><td><h6>h6. 壹框标题 <small>二级文本</small></h6></td></tr>
            </tbody>
          </table>
        </div>
        <div class="highlight">
<pre><code class="language-html">&lt;h1&gt;h1. 壹框标题 &lt;small&gt;二级文本&lt;/small&gt;&lt;/h1&gt;
&lt;h2&gt;h2. 壹框标题 &lt;small&gt;二级文本&lt;/small&gt;&lt;/h2&gt;
&lt;h3&gt;h3. 壹框标题 &lt;small&gt;二级文本&lt;/small&gt;&lt;/h3&gt;
&lt;h4&gt;h4. 壹框标题 &lt;small&gt;二级文本&lt;/small&gt;&lt;/h4&gt;
&lt;h5&gt;h5. 壹框标题 &lt;small&gt;二级文本&lt;/small&gt;&lt;/h5&gt;
&lt;h6&gt;h6. 壹框标题 &lt;small&gt;二级文本&lt;/small&gt;&lt;/h6&gt;</code></pre>
        </div>

        <!-- Body copy -->
        <h2 id="type-body-copy">页面主体</h2>
        <p>样式表里将全局 <code>font-size</code> 设置为 <strong>14px</strong>，<code>line-height</code> 为<strong>1.428</strong>。这些属性直接赋给 <code>&lt;body&gt;</code> 和所有段落元素。另外，<code>&lt;p&gt;</code> （段落）还被设置了等于1/2行高的底部外边距（margin）（即10px）。</p>
        <div class="bs-example">
          <p>一天，夜深人静了，桌上的标点却吵起来了。</p>
          <p>逗号慢吞吞地说：“没有了我句子怎么断开？人类怎么读？”句号不高兴的说：“我的功劳才大，要不人类写的文章没有一句完整的话！”感叹号嘟着小嘴说：“没了我，人类全是“冷血动物”。”省略号急了，结结巴巴说：“我……我的……功劳才最……最大！”</p>
          <p>这时，字典公公捋了捋胡子说：“你们每个人都有功劳，你们每个人都缺不得！我想，只要大家齐心协力，相互配合，每篇文章都会很精彩！”</p>
          <p>标点们都羞愧地低下了头。</p>
        </div>
        <div class="highlight">
<pre><code class="language-html">&lt;p&gt;...&lt;/p&gt;</code></pre>
        </div>

        <!-- Body copy .lead -->
        <h3>主体突显</h3>
        <p>通过添加 <code>.lead</code> 可以让段落突出显示。</p>
        <div class="bs-example">
          <p class="lead">一条鱼爬上岸，欢呼道：“我自由了！”</p>
        </div>
        <div class="highlight">
<pre><code class="language-html">&lt;p class=&quot;lead&quot;&gt;...&lt;/p&gt;</code></pre>
        </div>

        <!-- Emphasis -->
        <h2 id="type-emphasis">强调</h2>
        <p>直接使用 HTML 中用于标注强调的标签，并给他们赋予少许的样式。</p>
        <h3>小号文本</h3>
        <p>对于不需要强调的 inline 或 block 类型的文本，使用 <code>&lt;small&gt;</code> 标签包裹，其内的文本将被设置为父容器字体大小的85%。标题元素中嵌套的 <code>&lt;small&gt;</code> 元素被设置不同的 <code>font-size</code> 。</p>
        <p>你还可以为行内元素赋予 <code>.small</code> 以代替任何 <code>&lt;small&gt;</code> 标签。</p>
        <div class="bs-example">
          <p><small>这一行的文本是小号文本。</small></p>
        </div>
        <div class="highlight">
<pre><code class="language-html">&lt;small&gt;这一行的文本是小号文本。&lt;/small&gt;</code></pre>
        </div>

        <h3>着重</h3>
        <p>通过增加 font-weight 强调一段文本。</p>
        <div class="bs-example">
          <p>这段文本<strong>进行了着重处理</strong>。</p>
        </div>
        <div class="highlight">
<pre><code class="language-html">这段文本&lt;strong&gt;进行了着重处理&lt;/strong&gt;。</code></pre>
        </div>

        <h3>斜体</h3>
        <p>用斜体强调一段文本。</p>
        <div class="bs-example">
          <p>这段文本<em>就是通过斜体进行强调的</em>。</p>
        </div>
        <div class="highlight">
<pre><code class="language-html">这段文本&lt;em&gt;就是通过斜体进行强调的&lt;/em&gt;。</code></pre>
        </div>

        <div class="bs-callout bs-callout-info">
          <h4>可选元素</h4>
          <p>还可以使用HTML5中定义的 <code>&lt;b&gt;</code> 和 <code>&lt;i&gt;</code> 元素。<code>&lt;b&gt;</code> 表示在不增加额外重要性的同时将词或短语高亮显示，<code>&lt;i&gt;</code> 大部分用于发言、技术短语等情况。</p>
        </div>

        <h3>对齐</h3>
        <p>通过文本对齐 class，可以简单方便的将文字重新对齐。</p>
        <div class="bs-example">
          <p class="text-left">文本左对齐</p>
          <p class="text-center">文本居中对齐</p>
          <p class="text-right">文本右对齐</p>
        </div>
        <div class="highlight">
<pre><code class="language-html">&lt;p class=&quot;text-left&quot;&gt;文本左对齐&lt;/p&gt;
&lt;p class=&quot;text-center&quot;&gt;文本居中对齐&lt;/p&gt;
&lt;p class=&quot;text-right&quot;&gt;文本右对齐&lt;/p&gt;</code></pre>
        </div>

        <h3>强调</h3>
        <p>这些 class 通过颜色来表示强调。也可以应用于链接，当鼠标盘旋于链接上时，其颜色会变深，就像默认的链接样式。</p>
        <div class="bs-example">
          <p class="text-muted">基于他们自身的问题构建。</p>
          <p class="text-primary">构建过于花哨。</p>
          <p class="text-success">创建不灵活的代码。</p>
          <p class="text-info">过早部署。</p>
          <p class="text-warning">太关注代码。</p>
          <p class="text-danger">基于易用代码的规划。</p>
        </div>
        <div class="highlight">
<pre><code class="language-html">&lt;p class=&quot;text-muted&quot;&gt;...&lt;/p&gt;
&lt;p class=&quot;text-primary&quot;&gt;...&lt;/p&gt;
&lt;p class=&quot;text-success&quot;&gt;...&lt;/p&gt;
&lt;p class=&quot;text-info&quot;&gt;...&lt;/p&gt;
&lt;p class=&quot;text-warning&quot;&gt;...&lt;/p&gt;
&lt;p class=&quot;text-danger&quot;&gt;...&lt;/p&gt;</code></pre>
        </div>
        <div class="bs-callout bs-callout-info">
          <h4>解决特殊情况</h4>
          <p>有时候强调 class 不能被应用到另一个样式选择器里，因此一个可靠的解决方案是在 <code>&lt;span&gt;</code> 标签里包裹你的文本 class 。</p>
        </div>

        <!-- Abbreviations -->
        <h2 id="type-abbreviations">缩略语</h2>
        <p>当鼠标悬停在缩写和缩写词上时就会显示完整内容，样式表里实现了对 HTML 的 <code>&lt;abbr&gt;</code> 元素的增强样式。缩略语元素带有 <code>title</code> 属性，外观表现为带有较浅的虚线框，鼠标移至上面时会变成带有“问号”的指针。如想看完整的内容可把鼠标悬停在缩略语上, 但需要包含 title 属性。</p>

        <h3>基本缩略语</h3>
        <p>如想看完整的内容可把鼠标悬停在缩略语上, 但需要包含 <code>title</code> 属性。</p>
        <div class="bs-example">
          <p>单词 <abbr title="属性">attr</abbr> 是“attribute”的缩写形式。</p>
        </div>
        <div class="highlight">
<pre><code class="language-html">&lt;abbr title=&quot;属性&quot;&gt;attr&lt;/abbr&gt;</code></pre>
        </div>

        <h3>首字母缩略词</h3>
        <p>为缩略语添加 <code>.initialism</code> 可以将其 font-size 设置的更小些。</p>
        <div class="bs-example">
          <p><abbr title="HyperText Markup Language" class="initialism">HTML</abbr> 是超文本标记语言。</p>
        </div>
        <div class="highlight">
<pre><code class="language-html">&lt;abbr title=&quot;HyperText Markup Language&quot; class=&quot;initialism&quot;&gt;HTML&lt;/abbr&gt;</code></pre>
        </div>

        <!-- Addresses -->
        <h2 id="type-addresses">地址</h2>
        <p>让联系信息以最接近日常使用的格式呈现。在每行结尾添加 <code>&lt;br/&gt;</code> 可以保留需要的样式。</p>
        <div class="bs-example">
          <address>
            <strong>东华软件股份公司</strong><br/>
            北京市海淀区知春路<br/>
            紫金数码园东华合创大厦<br/>
            <abbr title="电话">电话</abbr>： (010) 62662288
          </address>
          <address>
            <strong>章巩志</strong><br>
            <a href="mailto:#">payrise@example.com</a>
          </address>
        </div>
        <div class="highlight">
<pre><code class="language-html">&lt;address&gt;
  &lt;strong&gt;东华软件股份公司&lt;/strong&gt;&lt;br/&gt;
  北京市海淀区知春路&lt;br/&gt;
  紫金数码园东华合创大厦&lt;br/&gt;
  &lt;abbr title=&quot;电话&quot;&gt;电话&lt;/abbr&gt;： (010) 62662288
&lt;/address&gt;

&lt;address&gt;
  &lt;strong&gt;章巩志&lt;/strong&gt;&lt;br/&gt;
  &lt;a href=&quot;mailto:#&quot;&gt;payrise@example.com&lt;/a&gt;
&lt;/address&gt;</code></pre>
        </div>

        <!-- Blockquotes -->
        <h2 id="type-blockquotes">引用</h2>
        <p>在你的文档中引用其他来源的内容。</p>

        <h3>默认样式的引用</h3>
        <p>将任何 <abbr title="HyperText Markup Language">HTML</abbr> 裹在 <code>&lt;blockquote&gt;</code> 之中即可表现为引用。对于直接引用，我们建议用 <code>&lt;p&gt;</code> 标签。</p>
        <div class="bs-example">
          <blockquote>
            <p>夫君子之行，静以修身，俭以养德。</p>
          </blockquote>
        </div>
        <div class="highlight">
<pre><code class="language-html">&lt;blockquote&gt;
  &lt;p&gt;夫君子之行，静以修身，俭以养德。&lt;/p&gt;
&lt;/blockquote&gt;</code></pre>
        </div>

        <h3>引用选项</h3>
        <p>对于标准样式的 <code>&lt;blockquote&gt;</code> ，可以通过几个简单的变体就能改变风格和内容。</p>

        <h4>命名来源</h4>
        <p>添加 <code>&lt;small&gt;</code> 标签或 <code>.small</code> class 来注明引用来源。来源名称可以放在 <code>&lt;cite&gt;</code> 标签里面。</p>
        <div class="bs-example">
          <blockquote>
            <p>夫君子之行，静以修身，俭以养德。</p>
            <small>诸葛亮 <cite title="出处">《诫子书》</cite></small>
          </blockquote>
        </div>
        <div class="highlight">
<pre><code class="language-html">&lt;blockquote&gt;
  &lt;p&gt;夫君子之行，静以修身，俭以养德。&lt;/p&gt;
  &lt;small&gt;诸葛亮 &lt;cite title=&quot;出处&quot;&gt;《诫子书》&lt;/cite&gt;&lt;/small&gt;
&lt;/blockquote&gt;</code></pre>
        </div>

        <h4>另一种展示风格</h4>
        <p>使用 <code>.pull-right</code> 可以让引用展现出向右侧移动、对齐的效果。</p>
        <div class="bs-example" style="overflow: hidden;">
          <blockquote class="pull-right">
            <p>夫君子之行，静以修身，俭以养德。</p>
            <small>诸葛亮 <cite title="出处">《诫子书》</cite></small>
          </blockquote>
        </div>
        <div class="highlight">
<pre><code class="language-html">&lt;blockquote class=&quot;pull-right&quot;&gt;
  ...
&lt;/blockquote&gt;</code></pre>
        </div>

        <!-- Lists -->
        <h2 id="type-lists">列表</h2>

        <h3>无序列表</h3>
        <p>顺序无关紧要的一列元素。</p>
        <div class="bs-example">
          <ul>
            <li>文件</li>
            <li>编辑</li>
            <li>查看</li>
            <li>历史</li>
            <li>书签
              <ul>
                <li>管理所有书签</li>
                <li>书签工具栏</li>
                <li>最近使用的书签</li>
                <li>未分类书签</li>
              </ul>
            </li>
            <li>工具</li>
            <li>帮助</li>
          </ul>
        </div>
        <div class="highlight">
<pre><code class="language-html">&lt;ul&gt;
  &lt;li&gt;...&lt;/li&gt;
&lt;/ul&gt;</code></pre>
        </div>

        <h3>有序列表</h3>
        <p>顺序至关重要的一组元素。</p>
        <div class="bs-example">
          <ol>
            <li>文件</li>
            <li>编辑</li>
            <li>查看</li>
            <li>历史</li>
            <li>书签
              <ol>
                <li>管理所有书签</li>
                <li>书签工具栏</li>
                <li>最近使用的书签</li>
                <li>未分类书签</li>
              </ol>
            </li>
            <li>工具</li>
            <li>帮助</li>
          </ol>
        </div>
        <div class="highlight">
<pre><code class="language-html">&lt;ol&gt;
  &lt;li&gt;...&lt;/li&gt;
&lt;/ol&gt;</code></pre>
        </div>

        <h3>无样式列表</h3>
        <p>移除了默认的 <code>list-style</code> 样式和左侧外边距的一组元素（只针对直接子元素）。<strong>这是针对直接子元素</strong>，也就是说，你需要对所有嵌套的列表都添加此 class 才能具有同样的样式。</p>
        <div class="bs-example">
          <ul class="list-unstyled">
            <li>文件</li>
            <li>编辑</li>
            <li>查看</li>
            <li>历史</li>
            <li>书签
              <ul>
                <li>管理所有书签</li>
                <li>书签工具栏</li>
                <li>最近使用的书签</li>
                <li>未分类书签</li>
              </ul>
            </li>
            <li>工具</li>
            <li>帮助</li>
          </ul>
        </div>
        <div class="highlight">
<pre><code class="language-html">&lt;ul class=&quot;list-unstyled&quot;&gt;
  &lt;li&gt;...&lt;/li&gt;
&lt;/ul&gt;</code></pre>
        </div>

        <h3>内联列表</h3>
        <p>通过设置 <code>display: inline-block;</code> 并添加少量的内补，将所有元素放置于同一列。</p>
        <div class="bs-example">
          <ul class="list-inline">
            <li>文件</li>
            <li>编辑</li>
            <li>查看</li>
          </ul>
        </div>
        <div class="highlight">
<pre><code class="language-html">&lt;ul class=&quot;list-inline&quot;&gt;
  &lt;li&gt;...&lt;/li&gt;
&lt;/ul&gt;</code></pre>
        </div>

        <h3>描述</h3>
        <p>带有描述的短语列表。</p>
        <div class="bs-example">
          <dl>
            <dt>爱因斯坦</dt>
            <dd>德国物理学家，1921年诺贝尔物理学奖金获得者。他的科学业绩主要包括四个方面：早期对布朗运动的研究；狭义相对论的创建；推动量子力学的发展；建立了广义相对论，开辟了宇宙学的研究途径。</dd>
            <dt>开普勒</dt>
            <dd>德国天文学家。发现了行星沿椭圆轨道运行，并且提出行星运动三定律（即开普勒定律），为牛顿发现万有引力定律打下了基础。</dd>
            <dt>伽利略</dt>
            <dd>意大利著名数学家、天文学家、物理学家、哲学家，是首先在科学实验的基础上融合贯通了数学、天文学、物理学三门科学的科学巨人。伽利略是科学革命的先驱，毕生把哥白尼、开普勒开创的新世界观加以证明和广泛宣传。</dd>
          </dl>
        </div>
        <div class="highlight">
<pre><code class="language-html">&lt;dl&gt;
  &lt;dt&gt;...&lt;/dt&gt;
  &lt;dd&gt;...&lt;/dd&gt;
&lt;/dl&gt;</code></pre>
        </div>

        <h4>水平排列的描述</h4>
        <p><code>.dl-horizontal</code> 可以让 <code>&lt;dl&gt;</code> 内短语及其描述排在一行。开始是像 <code>&lt;dl&gt;</code> 默认样式堆叠在一起，随着导航条逐渐展开而排列在一样。</p>
        <div class="bs-example">
          <dl class="dl-horizontal">
            <dt>爱因斯坦</dt>
            <dd>德国物理学家，1921年诺贝尔物理学奖金获得者。他的科学业绩主要包括四个方面：早期对布朗运动的研究；狭义相对论的创建；推动量子力学的发展；建立了广义相对论，开辟了宇宙学的研究途径。</dd>
            <dt>开普勒</dt>
            <dd>德国天文学家。发现了行星沿椭圆轨道运行，并且提出行星运动三定律（即开普勒定律），为牛顿发现万有引力定律打下了基础。</dd>
            <dt>伽利略</dt>
            <dd>意大利著名数学家、天文学家、物理学家、哲学家，是首先在科学实验的基础上融合贯通了数学、天文学、物理学三门科学的科学巨人。伽利略是科学革命的先驱，毕生把哥白尼、开普勒开创的新世界观加以证明和广泛宣传。</dd>
          </dl>
        </div>
        <div class="highlight">
<pre><code class="language-html">&lt;dl class=&quot;dl-horizontal&quot;&gt;
  &lt;dt&gt;...&lt;/dt&gt;
  &lt;dd&gt;...&lt;/dd&gt;
&lt;/dl&gt;</code></pre>
        </div>

        <div class="bs-callout bs-callout-info">
          <h4>自动截断</h4>
          <p>通过 <code>text-overflow</code> ，水平排列的描述列表将会截断左侧太长的短语。在较窄的视口（viewport）内，列表将变为默认堆叠排列的布局方式。</p>
        </div>
      </div>


      <!-- Code
      ================================================== -->
      <div class="bs-docs-section">
        <div class="page-header">
          <h1 id="code">代码</h1>
        </div>

        <h2>内联代码</h2>
        <p>在正文中通过 <code>&lt;code&gt;</code> 标签包裹内联样式的代码片段。</p>
        <div class="bs-example">
          例如，<code>&lt;section&gt;</code> 应当被封装为内联样式。
        </div>
        <div class="highlight">
<pre><code class="language-html">例如，&lt;code&gt;&amp;lt;section&amp;gt;&lt;/code&gt; 应当被封装为内联样式。</code></pre>
        </div>

        <h2>基本代码块</h2>
        <p>多行代码可以使用 <code>&lt;pre&gt;</code> 标签。为了正确的展示代码，注意将尖括号做转义处理。</p>
        <div class="bs-example">
<pre>&lt;p&gt;这里填写示例内容……&lt;/p&gt;</pre>
        </div>
        <div class="highlight">
<pre><code class="language-html">&lt;pre&gt;&amp;lt;p&amp;gt;这里填写示例内容……&amp;lt;/p&amp;gt;&lt;/pre&gt;</code></pre>
        </div>

        <p>还可以使用 <code>.pre-scrollable</code> class，其作用是设置 max-height 为350px，并在垂直方向展示滚动条。</p>
      </div>

      <!-- Tables
      ================================================== -->
      <div class="bs-docs-section">
        <div class="page-header">
          <h1 id="tables">表格</h1>
        </div>

        <h2 id="tables-example">基本案例</h2>
        <p>为任意 <code>&lt;table&gt;</code> 标签添加 <code>.table</code> 可以为其赋予基本的样式 &mdash;&mdash; 少量的内补（padding）和水平方向的分隔线。这种方式看起来很多余！？但是我们觉得，表格元素使用的很广泛，如果我们为其赋予默认样式可能会影响例如日历和日期选择之类的插件，所以我们选择将其样式独立出来。</p>
        <div class="bs-example">
          <table class="table">
            <thead>
              <tr>
                <th>#</th>
                <th>姓氏</th>
                <th>名字</th>
                <th>用户名</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>章</td>
                <td>巩志</td>
                <td>@zhgzh</td>
              </tr>
              <tr>
                <td>2</td>
                <td>林</td>
                <td>石</td>
                <td>@lsh</td>
              </tr>
              <tr>
                <td>3</td>
                <td>郑</td>
                <td>青安</td>
                <td>@zhqan</td>
              </tr>
            </tbody>
          </table>
        </div><!-- /example -->
        <div class="highlight">
<pre><code class="language-html">&lt;table class=&quot;table&quot;&gt;
  ...
&lt;/table&gt;</code></pre>
        </div>

        <h2 id="tables-striped">条纹状表格</h2>
        <p>利用 <code>.table-striped</code> 可以给 <code>&lt;tbody&gt;</code> 之内的每一样增加斑马条纹样式。</p>
        <div class="bs-callout bs-callout-danger">
          <h4>跨浏览器兼容性</h4>
          <p>条纹状表格是通过 <code>:nth-child</code> CSS选择器实现的，而这一功能不被 Internet Explorer 8 支持。</p>
        </div>
        <div class="bs-example">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>姓氏</th>
                <th>名字</th>
                <th>用户名</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>章</td>
                <td>巩志</td>
                <td>@zhgzh</td>
              </tr>
              <tr>
                <td>2</td>
                <td>林</td>
                <td>石</td>
                <td>@lsh</td>
              </tr>
              <tr>
                <td>3</td>
                <td>郑</td>
                <td>青安</td>
                <td>@zhqan</td>
              </tr>
            </tbody>
          </table>
        </div><!-- /example -->
        <div class="highlight">
<pre><code class="language-html">&lt;table class=&quot;table table-striped&quot;&gt;
  ...
&lt;/table&gt;</code></pre>
        </div>

        <h2 id="tables-bordered">带边框的表格</h2>
        <p>利用 <code>.table-bordered</code> 为表格和其中的每个单元格增加边框。</p>
        <div class="bs-example">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>姓氏</th>
                <th>名字</th>
                <th>用户名</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td rowspan="2">1</td>
                <td>章</td>
                <td>巩志</td>
                <td>@zhgzh</td>
              </tr>
              <tr>
                <td>章</td>
                <td>巩志</td>
                <td>@zhanggongzhi</td>
              </tr>
              <tr>
                <td>2</td>
                <td>林</td>
                <td>石</td>
                <td>@lsh</td>
              </tr>
              <tr>
                <td>3</td>
                <td colspan="2">郑青安</td>
                <td>@zhqan</td>
              </tr>
            </tbody>
          </table>
        </div><!-- /example -->
        <div class="highlight">
<pre><code class="language-html">&lt;table class=&quot;table table-bordered&quot;&gt;
  ...
&lt;/table&gt;</code></pre>
        </div>

        <h2 id="tables-hover-rows">鼠标悬停</h2>
        <p>利用 <code>.table-hover</code> 可以让 <code>&lt;tbody&gt;</code> 中的每一行响应鼠标悬停状态。</p>
        <div class="bs-example">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>姓氏</th>
                <th>名字</th>
                <th>用户名</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>章</td>
                <td>巩志</td>
                <td>@zhgzh</td>
              </tr>
              <tr>
                <td>2</td>
                <td>林</td>
                <td>石</td>
                <td>@lsh</td>
              </tr>
              <tr>
                <td>3</td>
                <td>郑</td>
                <td>青安</td>
                <td>@zhqan</td>
              </tr>
            </tbody>
          </table>
        </div><!-- /example -->
<div class="highlight">
<pre><code class="language-html">&lt;table class=&quot;table table-hover&quot;&gt;
  ...
&lt;/table&gt;</code></pre>
        </div>

        <h2 id="tables-condensed">紧缩表格</h2>
        <p>利用 <code>.table-condensed</code> 可以让表格更加紧凑，单元格中的内部（padding）均会减半。</p>
        <div class="bs-example">
          <table class="table table-condensed">
            <thead>
              <tr>
                <th>#</th>
                <th>姓氏</th>
                <th>名字</th>
                <th>用户名</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>章</td>
                <td>巩志</td>
                <td>@zhgzh</td>
              </tr>
              <tr>
                <td>2</td>
                <td>林</td>
                <td>石</td>
                <td>@lsh</td>
              </tr>
              <tr>
                <td>3</td>
                <td>郑</td>
                <td>青安</td>
                <td>@zhqan</td>
              </tr>
            </tbody>
          </table>
        </div><!-- /example -->
<div class="highlight">
<pre><code class="language-html">&lt;table class=&quot;table table-condensed&quot;&gt;
  ...
&lt;/table&gt;</code></pre>
        </div>

        <h2 id="tables-contextual-classes">状态 class</h2>
        <p>通过这些状态 class 可以为行货单元格设置颜色。</p>
        <div class="table-responsive">
          <table class="table table-bordered table-striped">
            <colgroup>
              <col class="col-xs-1">
              <col class="col-xs-7">
            </colgroup>
            <thead>
              <tr>
                <th>Class</th>
                <th>描述</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>.active</code>
                </td>
                <td>鼠标悬停在行或单元格上时所设置的颜色</td>
              </tr>
              <tr>
                <td>
                  <code>.success</code>
                </td>
                <td>标识成功或积极的动作</td>
              </tr>
              <tr>
                <td>
                  <code>.warning</code>
                </td>
                <td>标识警告或需要用户注意</td>
              </tr>
              <tr>
                <td>
                  <code>.danger</code>
                </td>
                <td>标识危险或潜在的带来负面影响的动作</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="bs-example">
          <table class="table">
            <thead>
              <tr>
                <th>#</th>
                <th>列标题</th>
                <th>列标题</th>
                <th>列标题</th>
              </tr>
            </thead>
            <tbody>
              <tr class="active">
                <td>1</td>
                <td>列内容</td>
                <td>列内容</td>
                <td>列内容</td>
              </tr>
              <tr>
                <td>2</td>
                <td>列内容</td>
                <td>列内容</td>
                <td>列内容</td>
              </tr>
              <tr class="success">
                <td>3</td>
                <td>列内容</td>
                <td>列内容</td>
                <td>列内容</td>
              </tr>
              <tr>
                <td>4</td>
                <td>列内容</td>
                <td>列内容</td>
                <td>列内容</td>
              </tr>
              <tr class="warning">
                <td>5</td>
                <td>列内容</td>
                <td>列内容</td>
                <td>列内容</td>
              </tr>
              <tr>
                <td>6</td>
                <td>列内容</td>
                <td>列内容</td>
                <td>列内容</td>
              </tr>
              <tr class="danger">
                <td>7</td>
                <td>列内容</td>
                <td>列内容</td>
                <td>列内容</td>
              </tr>
            </tbody>
          </table>
        </div><!-- /example -->
        <div class="highlight">
<pre><code class="language-html">&lt;!-- 应用于一行 --&gt;
&lt;tr class=&quot;active&quot;&gt;...&lt;/tr&gt;
&lt;tr class=&quot;success&quot;&gt;...&lt;/tr&gt;
&lt;tr class=&quot;warning&quot;&gt;...&lt;/tr&gt;
&lt;tr class=&quot;danger&quot;&gt;...&lt;/tr&gt;

&lt;!-- 应用于一个单元格（`td` 或者 `th`） --&gt;
&lt;tr&gt;
  &lt;td class=&quot;active&quot;&gt;...&lt;/td&gt;
  &lt;td class=&quot;success&quot;&gt;...&lt;/td&gt;
  &lt;td class=&quot;warning&quot;&gt;...&lt;/td&gt;
  &lt;td class=&quot;danger&quot;&gt;...&lt;/td&gt;
&lt;/tr&gt;</code></pre>
        </div>

        <h2 id="tables-responsive">响应式表格</h2>
        <p>将任何 <code>.table</code> 包裹在 <code>.table-responsive</code> 中即可创建响应式表格，其会在小屏幕设备上（小于768px）水平滚动。当屏幕大于768px宽度时，水平滚动条消失。</p>
        <div class="bs-example">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>表格标题</th>
                  <th>表格标题</th>
                  <th>表格标题</th>
                  <th>表格标题</th>
                  <th>表格标题</th>
                  <th>表格标题</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>表格单元格</td>
                  <td>表格单元格</td>
                  <td>表格单元格</td>
                  <td>表格单元格</td>
                  <td>表格单元格</td>
                  <td>表格单元格</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>表格单元格</td>
                  <td>表格单元格</td>
                  <td>表格单元格</td>
                  <td>表格单元格</td>
                  <td>表格单元格</td>
                  <td>表格单元格</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>表格单元格</td>
                  <td>表格单元格</td>
                  <td>表格单元格</td>
                  <td>表格单元格</td>
                  <td>表格单元格</td>
                  <td>表格单元格</td>
                </tr>
              </tbody>
            </table>
          </div><!-- /.table-responsive -->

          <div class="table-responsive">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>表格标题</th>
                  <th>表格标题</th>
                  <th>表格标题</th>
                  <th>表格标题</th>
                  <th>表格标题</th>
                  <th>表格标题</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                     <td>表格单元格</td>
                  <td>表格单元格</td>
                  <td>表格单元格</td>
                  <td>表格单元格</td>
                  <td>表格单元格</td>
                  <td>表格单元格</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>表格单元格</td>
                  <td>表格单元格</td>
                  <td>表格单元格</td>
                  <td>表格单元格</td>
                  <td>表格单元格</td>
                  <td>表格单元格</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>表格单元格</td>
                  <td>表格单元格</td>
                  <td>表格单元格</td>
                  <td>表格单元格</td>
                  <td>表格单元格</td>
                  <td>表格单元格</td>
                </tr>
              </tbody>
            </table>
          </div><!-- /.table-responsive -->
        </div><!-- /example -->
        <div class="highlight">
<pre><code class="language-html">&lt;div class=&quot;table-responsive&quot;&gt;
  &lt;table class=&quot;table&quot;&gt;
    ...
  &lt;/table&gt;
&lt;/div&gt;</code></pre>
        </div>
      </div>

      <!-- Forms
      ================================================== -->
      <div class="bs-docs-section">
        <div class="page-header">
          <h1 id="forms">表单</h1>
        </div>

        <h2 id="forms-example">基本案例</h2>
        <p>单独的表单控件会被自动赋予一些全局样式。所有设置了 <code>.form-control</code> 的 <code>&lt;input&gt;</code> 、<code>&lt;textarea&gt;</code> 和 <code>&lt;select&gt;</code> 元素都将被默认设置为 <code>width: 100%;</code> 。将 label 和前面提到的这些控件包裹在 <code>.form-group</code> 中可以获得最好的排列。</p>
        <div class="bs-example">
          <form role="form">
            <div class="form-group">
              <label for="exampleInputEmail1">电子邮箱</label>
              <input type="email" class="form-control" id="exampleInputEmail1" placeholder="输入电子邮箱地址"/>
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">密码</label>
              <input type="password" class="form-control" id="exampleInputPassword1" placeholder="输入密码"/>
            </div>
            <div class="form-group">
              <label for="exampleInputFile">请选择文件</label>
              <input type="file" id="exampleInputFile"/>
              <p class="help-block">这行是区块帮助文本实例。</p>
            </div>
            <div class="checkbox">
              <label>
                <input type="checkbox"/> 这是 Checkbox
              </label>
            </div>
            <button type="submit" class="btn btn-default">提交</button>
          </form>
        </div><!-- /example -->
        <div class="highlight">
<pre><code class="language-html">&lt;form role=&quot;form&quot;&gt;
  &lt;div class=&quot;form-group&quot;&gt;
    &lt;label for=&quot;exampleInputEmail1&quot;&gt;电子邮箱&lt;/label&gt;
    &lt;input type=&quot;email&quot; class=&quot;form-control&quot; id=&quot;exampleInputEmail1&quot; placeholder=&quot;输入电子邮箱地址&quot;/&gt;
  &lt;/div&gt;
  &lt;div class=&quot;form-group&quot;&gt;
    &lt;label for=&quot;exampleInputPassword1&quot;&gt;密码&lt;/label&gt;
    &lt;input type=&quot;password&quot; class=&quot;form-control&quot; id=&quot;exampleInputPassword1&quot; placeholder=&quot;输入密码&quot;/&gt;
  &lt;/div&gt;
  &lt;div class=&quot;form-group&quot;&gt;
    &lt;label for=&quot;exampleInputFile&quot;&gt;请选择文件&lt;/label&gt;
    &lt;input type=&quot;file&quot; id=&quot;exampleInputFile&quot;/&gt;
    &lt;p class=&quot;help-block&quot;&gt;这行是区块帮助文本实例。&lt;/p&gt;
  &lt;/div&gt;
  &lt;div class=&quot;checkbox&quot;&gt;
    &lt;label&gt;
      &lt;input type=&quot;checkbox&quot;/&gt; 这是 Checkbox
    &lt;/label&gt;
  &lt;/div&gt;
  &lt;button type=&quot;submit&quot; class=&quot;btn btn-default&quot;&gt;提交&lt;/button&gt;
&lt;/form&gt;</code></pre>
        </div>

        <h2 id="forms-inline">内联表单</h2>
        <p>为 <code>&lt;form&gt;</code> 元素 <code>.form-inline</code> 可使其内容左对齐并且表现为 inline-block 级别的控件。<strong>只适用于浏览器窗口至少在 768px 宽度时（窗口宽度再小的话就会使表单折叠）。</strong></p>
        <div class="bs-callout bs-callout-danger">
          <h4>需要设置宽度</h4>
          <p>在样式表中，input、select 和 textarea 默认被设置为100%宽度。为了使用内联表单，你需要专门为使用到的表单控件设置宽度。</p>
        </div>
        <div class="bs-callout bs-callout-danger">
          <h4>一定要设置 label</h4>
          <p>如果你没有为每个输入控件设置 label，屏幕阅读器将无法正确识读。对于这些内联表单，你可以通过为 label 设置 <code>.sr-only</code> 已将其隐藏。</p>
        </div>
        <div class="bs-example">
          <form class="form-inline" role="form">
            <div class="form-group">
              <label class="sr-only" for="exampleInputEmail2">电子邮箱</label>
              <input type="email" class="form-control" id="exampleInputEmail2" placeholder="输入电子邮箱地址"/>
            </div>
            <div class="form-group">
              <label class="sr-only" for="exampleInputPassword2">密码</label>
              <input type="password" class="form-control" id="exampleInputPassword2" placeholder="输入密码"/>
            </div>
            <div class="checkbox">
              <label>
                <input type="checkbox"/> 记住我
              </label>
            </div>
            <button type="submit" class="btn btn-default">登录</button>
          </form>
        </div><!-- /example -->
        <div class="highlight">
<pre><code class="language-html">&lt;form class=&quot;form-inline&quot; role=&quot;form&quot;&gt;
  &lt;div class=&quot;form-group&quot;&gt;
    &lt;label class=&quot;sr-only&quot; for=&quot;exampleInputEmail2&quot;&gt;电子邮箱&lt;/label&gt;
    &lt;input type=&quot;email&quot; class=&quot;form-control&quot; id=&quot;exampleInputEmail2&quot; placeholder=&quot;输入电子邮箱地址&quot;/&gt;
  &lt;/div&gt;
  &lt;div class=&quot;form-group&quot;&gt;
    &lt;label class=&quot;sr-only&quot; for=&quot;exampleInputPassword2&quot;&gt;密码&lt;/label&gt;
    &lt;input type=&quot;password&quot; class=&quot;form-control&quot; id=&quot;exampleInputPassword2&quot; placeholder=&quot;输入密码&quot;/&gt;
  &lt;/div&gt;
  &lt;div class=&quot;checkbox&quot;&gt;
    &lt;label&gt;
      &lt;input type=&quot;checkbox&quot;/&gt; 记住我
    &lt;/label&gt;
  &lt;/div&gt;
  &lt;button type=&quot;submit&quot; class=&quot;btn btn-default&quot;&gt;登录&lt;/button&gt;
&lt;/form&gt;</code></pre>
        </div>

        <h2 id="forms-horizontal">水平排列的表单</h2>
        <p>通过为表单添加 <code>.form-horizontal</code> ，并使用预置的栅格 class 可以将 label 和控件组水平并排布局。这样做将改变 <code>.form-group</code> 的行为，使其表现为栅格系统中的行（row），因此就无需再使用 <code>.row</code> 了。</p>
        <div class="bs-example">
          <form class="form-horizontal"  role="form">
            <div class="form-group">
              <label for="inputEmail3" class="col-sm-2 control-label">电子邮箱</label>
              <div class="col-sm-10">
                <input type="email" class="form-control" id="inputEmail3" placeholder="输入电子邮箱地址"/>
              </div>
            </div>
            <div class="form-group">
              <label for="inputPassword3" class="col-sm-2 control-label">密码</label>
              <div class="col-sm-10">
                <input type="password" class="form-control" id="inputPassword3" placeholder="输入密码"/>
              </div>
            </div>
            <div class="form-group">
              <div class="col-sm-offset-2 col-sm-10">
                <div class="checkbox">
                  <label>
                    <input type="checkbox"/> 记住我
                  </label>
                </div>
              </div>
            </div>
            <div class="form-group">
              <div class="col-sm-offset-2 col-sm-10">
                <button type="submit" class="btn btn-default">登录</button>
              </div>
            </div>
          </form>
        </div><!-- /.bs-example -->
        <div class="highlight">
<pre><code class="language-html">&lt;form class=&quot;form-horizontal&quot; role=&quot;form&quot;&gt;
  &lt;div class=&quot;form-group&quot;&gt;
    &lt;label for=&quot;inputEmail3&quot; class=&quot;col-sm-2 control-label&quot;&gt;电子邮箱&lt;/label&gt;
    &lt;div class=&quot;col-sm-10&quot;&gt;
      &lt;input type=&quot;email&quot; class=&quot;form-control&quot; id=&quot;inputEmail3&quot; placeholder=&quot;输入电子邮箱地址&quot;/&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class=&quot;form-group&quot;&gt;
    &lt;label for=&quot;inputPassword3&quot; class=&quot;col-sm-2 control-label&quot;&gt;密码&lt;/label&gt;
    &lt;div class=&quot;col-sm-10&quot;&gt;
      &lt;input type=&quot;password&quot; class=&quot;form-control&quot; id=&quot;inputPassword3&quot; placeholder=&quot;输入密码&quot;/&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class=&quot;form-group&quot;&gt;
    &lt;div class=&quot;col-sm-offset-2 col-sm-10&quot;&gt;
      &lt;div class=&quot;checkbox&quot;&gt;
        &lt;label&gt;
          &lt;input type=&quot;checkbox&quot;/&gt; 记住我
        &lt;/label&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class=&quot;form-group&quot;&gt;
    &lt;div class=&quot;col-sm-offset-2 col-sm-10&quot;&gt;
      &lt;button type=&quot;submit&quot; class=&quot;btn btn-default&quot;&gt;登录&lt;/button&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/form&gt;</code></pre>
        </div>

        <h2 id="forms-controls">被支持的控件</h2>
        <p>在表单布局案例中展示了其所支持的标准表单控件。</p>

        <h3>Input</h3>
        <p>大部分表单控件、文本输入域控件。包括 HTML5 支持的所有类型：<code>text</code>、<code>password</code>、<code>datetime</code>、<code>datetime-local</code>、<code>date</code>、<code>month</code>、<code>time</code>、<code>week</code>、<code>number</code>、<code>email</code>、<code>url</code>、<code>search</code>、<code>tel</code> 和 <code>color</code>。</p>
        <div class="bs-callout bs-callout-danger">
          <h4>必须添加类型声明</h4>
          <p>只有正确设置了 <code>type</code> 的input控件才能被赋予正确的样式。</p>
        </div>
        <div class="bs-example">
          <form role="form">
            <input type="text" class="form-control" placeholder="输入文本">
          </form>
        </div><!-- /.bs-example -->
        <div class="highlight">
<pre><code class="language-html">&lt;input type=&quot;text&quot; class=&quot;form-control&quot; placeholder=&quot;输入文本&quot;&gt;</code></pre>
        </div>
        <div class="bs-callout bs-callout-info">
          <h4>输入框组</h4>
          <p>在文本 <code>&lt;input&gt;</code> 标签前面或者后面添加任意文本、按钮内容组合，可以参考<a href="components.jsp#input-groups">输入框组组件</a>。</p>
        </div>

        <h3>Textarea</h3>
        <p>支持多行文本的表单控件。可根据需要改变 <code>rows</code> 属性。</p>
        <div class="bs-example">
          <form role="form">
            <textarea class="form-control" rows="3"></textarea>
          </form>
        </div><!-- /.bs-example -->
        <div class="highlight">
<pre><code class="language-html">&lt;textarea class=&quot;form-control&quot; rows=&quot;3&quot;&gt;&lt;/textarea&gt;</code></pre>
        </div>

        <h3>Checkbox 和 Radio</h3>
        <p>Checkbox 用于选择列表中的一个或多个选项，而 Radio 用于从多个选项中只选择一个。</p>
        <h4>默认外观(堆叠在一起)</h4>
        <div class="bs-example">
          <form role="form">
            <div class="checkbox">
              <label>
                <input type="checkbox" value=""/> 复选项 &mdash; 可以选择也可以不选择
              </label>
            </div>
            <br/>
            <div class="radio">
              <label>
                <input type="radio" name="optionsRadios" id="optionsRadios1" value="option1" checked/> 单选项1 &mdash; 任意选择其一
              </label>
            </div>
            <div class="radio">
              <label>
                <input type="radio" name="optionsRadios" id="optionsRadios2" value="option2"/> 单选项2 &mdash; 同时只能选择其一
              </label>
            </div>
          </form>
        </div><!-- /.bs-example -->
        <div class="highlight">
<pre><code class="language-html">&lt;div class=&quot;checkbox&quot;&gt;
  &lt;label&gt;
    &lt;input type=&quot;checkbox&quot; value=&quot;&quot;&gt;
    可复选项 &amp;mdash; 可以选择也可以不选择
  &lt;/label&gt;
&lt;/div&gt;

&lt;div class=&quot;radio&quot;&gt;
  &lt;label&gt;
    &lt;input type=&quot;radio&quot; name=&quot;optionsRadios&quot; id=&quot;optionsRadios1&quot; value=&quot;option1&quot; checked/&gt;
    单选项1 &amp;mdash; 任意选择其一
  &lt;/label&gt;
&lt;/div&gt;
&lt;div class=&quot;radio&quot;&gt;
  &lt;label&gt;
    &lt;input type=&quot;radio&quot; name=&quot;optionsRadios&quot; id=&quot;optionsRadios2&quot; value=&quot;option2&quot;/&gt;
    单选项2 &amp;mdash; 同时只能选择其一
  &lt;/label&gt;
&lt;/div&gt;</code></pre>
        </div>

        <h4>内联 checkboxes</h4>
        <p>通过将 <code>.checkbox-inline</code> 或 <code>.radio-inline</code> 应用到一系列的 checkbox 或 radio 控件上，可以使这些控件排列在一行。</p>
        <div class="bs-example">
          <form role="form">
            <label class="checkbox-inline">
              <input type="checkbox" id="inlineCheckbox1" value="option1"> 被内联的复选框1
            </label>
            <label class="checkbox-inline">
              <input type="checkbox" id="inlineCheckbox2" value="option2"> 被内联的复选框2
            </label>
            <label class="checkbox-inline">
              <input type="checkbox" id="inlineCheckbox3" value="option3"> 被内联的复选框3
            </label>
          </form>
        </div><!-- /.bs-example -->
        <div class="highlight">
<pre><code class="language-html">&lt;label class=&quot;checkbox-inline&quot;&gt;
  &lt;input type=&quot;checkbox&quot; id=&quot;inlineCheckbox1&quot; value=&quot;option1&quot;&gt; 被内联的复选框1
&lt;/label&gt;
&lt;label class=&quot;checkbox-inline&quot;&gt;
  &lt;input type=&quot;checkbox&quot; id=&quot;inlineCheckbox2&quot; value=&quot;option2&quot;&gt; 被内联的复选框2
&lt;/label&gt;
&lt;label class=&quot;checkbox-inline&quot;&gt;
  &lt;input type=&quot;checkbox&quot; id=&quot;inlineCheckbox3&quot; value=&quot;option3&quot;&gt; 被内联的复选框3
&lt;/label&gt;</code></pre>
        </div>

        <h3>Select</h3>
        <p>使用默认选项或添加 <code>multiple</code> 属性可以显示多个选项。</p>
        <div class="bs-example">
          <form role="form">
            <select class="form-control">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
            <br/>
            <select multiple class="form-control">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </form>
        </div><!-- /.bs-example -->
        <div class="highlight">
<pre><code class="language-html">&lt;select class=&quot;form-control&quot;&gt;
  &lt;option&gt;1&lt;/option&gt;
  &lt;option&gt;2&lt;/option&gt;
  &lt;option&gt;3&lt;/option&gt;
  &lt;option&gt;4&lt;/option&gt;
  &lt;option&gt;5&lt;/option&gt;
&lt;/select&gt;

&lt;select multiple class=&quot;form-control&quot;&gt;
  &lt;option&gt;1&lt;/option&gt;
  &lt;option&gt;2&lt;/option&gt;
  &lt;option&gt;3&lt;/option&gt;
  &lt;option&gt;4&lt;/option&gt;
  &lt;option&gt;5&lt;/option&gt;
&lt;/select&gt;</code></pre>
        </div>


        <h2 id="forms-controls-static">静态控件</h2>
        <p>在水平布局的表单中，如果需要将一行纯文本放置于 label 的同一行，为 <code>&lt;p&gt;</code> 元素添加 <code>.form-control-static</code> 即可。</p>
        <div class="bs-example">
          <form class="form-horizontal" role="form">
            <div class="form-group">
              <label class="col-sm-2 control-label">电子邮箱</label>
              <div class="col-sm-10">
                <p class="form-control-static">email@example.com</p>
              </div>
            </div>
            <div class="form-group">
              <label for="inputPassword" class="col-sm-2 control-label">密码</label>
              <div class="col-sm-10">
                <input type="password" class="form-control" id="inputPassword" placeholder="输入密码"/>
              </div>
            </div>
          </form>
        </div><!-- /.bs-example -->
        <div class="highlight">
<pre><code class="language-html">&lt;form class=&quot;form-horizontal&quot; role=&quot;form&quot;&gt;
  &lt;div class=&quot;form-group&quot;&gt;
    &lt;label class=&quot;col-sm-2 control-label&quot;&gt;电子邮箱&lt;/label&gt;
    &lt;div class=&quot;col-sm-10&quot;&gt;
      &lt;p class=&quot;form-control-static&quot;&gt;email@example.com&lt;/p&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class=&quot;form-group&quot;&gt;
    &lt;label for=&quot;inputPassword&quot; class=&quot;col-sm-2 control-label&quot;&gt;密码&lt;/label&gt;
    &lt;div class=&quot;col-sm-10&quot;&gt;
      &lt;input type=&quot;password&quot; class=&quot;form-control&quot; id=&quot;inputPassword&quot; placeholder=&quot;输入密码&quot;/&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/form&gt;</code></pre>
        </div>

        <h2 id="forms-control-states">控件状态</h2>
        <p>通过为控件和label设置一些基本状态，可以为用户提供回馈。</p>

        <h3 id="forms-input-focus">输入焦点</h3>
        <p>我们移除了某些表单控件的默认 <code>outline</code> 样式，并对其 <code>:focus</code> 状态赋予了 <code>box-shadow</code> 样式。</p>
         <div class="bs-example">
          <form role="form">
            <input class="form-control" id="focusedInput" type="text" value="这是获得焦点的状态..."/>
          </form>
        </div>
        <div class="highlight">
<pre><code class="language-html">&lt;input class=&quot;form-control&quot; id=&quot;focusedInput&quot; type=&quot;text&quot; value=&quot;这是获得焦点的状态...&quot;/&gt;</code></pre>
        </div>

        <h3 id="forms-disabled-inputs">被禁用的输入框</h3>
        <p>为输入框设置 <code>disabled</code> 属性可以防止用户输入，并能改变一点外观，使其更直观。</p>
        <div class="bs-example">
          <form role="form">
            <input class="form-control" id="disabledInput" type="text" placeholder="禁止在此输入..." disabled />
          </form>
        </div><!-- /.bs-example -->
        <div class="highlight">
<pre><code class="language-html">&lt;input class=&quot;form-control&quot; id=&quot;disabledInput&quot; type=&quot;text&quot; placeholder=&quot;禁止在此输入...&quot; disabled /&gt;</code></pre>
        </div>

        <h3 id="forms-disabled-fieldsets">被禁用的 fieldset</h3>
        <p>为 <code>&lt;fieldset&gt;</code> 设置 <code>disabled</code> 属性可以禁用 <code>&lt;fieldset&gt;</code> 中包含的所有控件。</p>

        <div class="bs-callout bs-callout-warning">
          <h4><code>&lt;a&gt;</code> 标签的链接功能不受影响</h4>
          <p>这个 class 只改变 <code>&lt;a class="btn btn-default"&gt;</code> 按钮的外观，并不能禁用其功能。建议自己通过 JavaScript 代码禁用链接功能。</p>
        </div>

        <div class="bs-callout bs-callout-danger">
          <h4>跨浏览器兼容性</h4>
          <p>虽然样式表会将这些样式应用到所有浏览器上，Internet Explorer 9 及以下浏览器中的 <code>&lt;fieldset&gt;</code> 并不支持 <code>disabled</code> 属性。因此建议在这些浏览器上通过 JavaScript 代码来禁用 fieldset 。</p>
        </div>

        <div class="bs-example">
          <form role="form">
            <fieldset disabled>
              <div class="form-group">
                <label for="disabledTextInput">被禁用的输入框</label>
                <input type="text" id="disabledTextInput" class="form-control" placeholder="禁止输入"/>
              </div>
              <div class="form-group">
                <label for="disabledSelect">被禁用的选择菜单</label>
                <select id="disabledSelect" class="form-control">
                  <option>禁止选择</option>
                </select>
              </div>
              <div class="checkbox">
                <label>
                  <input type="checkbox"/> 被禁用的选框
                </label>
              </div>
              <button type="submit" class="btn btn-primary">提交</button>
            </fieldset>
          </form>
        </div><!-- /.bs-example -->
        <div class="highlight">
<pre><code class="language-html">&lt;form role=&quot;form&quot;&gt;
  &lt;fieldset disabled&gt;
    &lt;div class=&quot;form-group&quot;&gt;
      &lt;label for=&quot;disabledTextInput&quot;&gt;被禁用的输入框&lt;/label&gt;
      &lt;input type=&quot;text&quot; id=&quot;disabledTextInput&quot; class=&quot;form-control&quot; placeholder=&quot;禁止输入&quot;/&gt;
    &lt;/div&gt;
    &lt;div class=&quot;form-group&quot;&gt;
      &lt;label for=&quot;disabledSelect&quot;&gt;被禁用的选择菜单&lt;/label&gt;
      &lt;select id=&quot;disabledSelect&quot; class=&quot;form-control&quot;&gt;
        &lt;option&gt;禁止选择&lt;/option&gt;
      &lt;/select&gt;
    &lt;/div&gt;
    &lt;div class=&quot;checkbox&quot;&gt;
      &lt;label&gt;
        &lt;input type=&quot;checkbox&quot;/&gt; 被禁用的选框
      &lt;/label&gt;
    &lt;/div&gt;
    &lt;button type=&quot;submit&quot; class=&quot;btn btn-primary&quot;&gt;提交&lt;/button&gt;
  &lt;/fieldset&gt;
&lt;/form&gt;</code></pre>
        </div>

        <h3 id="forms-validation">校验状态</h3>
        <p>我们对表单控件的校验状态，如 error、warning 和 success 状态，都定义了样式。使用时，添加 <code>.has-warning</code>、<code>.has-error</code> 或 <code>.has-success</code> 到这些控件的父元素即可。任何包含在此元素之内的 <code>.control-label</code>、<code>.form-control</code> 和 <code>.help-block</code> 都将接受这些校验状态的样式。</p>

        <div class="bs-example">
          <form role="form">
            <div class="form-group has-success">
              <label class="control-label" for="inputSuccess">正确的输入</label>
              <input type="text" class="form-control" id="inputSuccess"/>
            </div>
            <div class="form-group has-warning">
              <label class="control-label" for="inputWarning">警告的输入</label>
              <input type="text" class="form-control" id="inputWarning"/>
            </div>
            <div class="form-group has-error">
              <label class="control-label" for="inputError">错误的输入</label>
              <input type="text" class="form-control" id="inputError"/>
            </div>
          </form>
        </div><!-- /.bs-example -->
        <div class="highlight">
<pre><code class="language-html">&lt;div class=&quot;form-group has-success&quot;&gt;
  &lt;label class=&quot;control-label&quot; for=&quot;inputSuccess&quot;&gt;正确的输入&lt;/label&gt;
  &lt;input type=&quot;text&quot; class=&quot;form-control&quot; id=&quot;inputSuccess&quot;/&gt;
&lt;/div&gt;
&lt;div class=&quot;form-group has-warning&quot;&gt;
  &lt;label class=&quot;control-label&quot; for=&quot;inputWarning&quot;&gt;警告的输入&lt;/label&gt;
  &lt;input type=&quot;text&quot; class=&quot;form-control&quot; id=&quot;inputWarning&quot;/&gt;
&lt;/div&gt;
&lt;div class=&quot;form-group has-error&quot;&gt;
  &lt;label class=&quot;control-label&quot; for=&quot;inputError&quot;&gt;错误的输入&lt;/label&gt;
  &lt;input type=&quot;text&quot; class=&quot;form-control&quot; id=&quot;inputError&quot;/&gt;
&lt;/div&gt;</code></pre>
        </div>

        <h2 id="forms-control-sizes">控件尺寸</h2>
        <p>通过 <code>.input-lg</code> 之类的 class 可以为控件设置高度，通过 <code>.col-lg-*</code> 之类的 class 可以为控件设置宽度。</p>

        <h3>高度尺寸</h3>
        <p>创建大一些或小一些的表单控件以匹配按钮尺寸。</p>
        <div class="bs-example bs-example-control-sizing">
          <form role="form">
            <div class="controls">
              <input class="form-control input-lg" type="text" placeholder=".input-lg">
              <input type="text" class="form-control" placeholder="默认 input">
              <input class="form-control input-sm" type="text" placeholder=".input-sm">

              <select class="form-control input-lg">
                <option value="">.input-lg</option>
              </select>
              <select class="form-control">
                <option value="">默认 select</option>
              </select>
              <select class="form-control input-sm">
                <option value="">.input-sm</option>
              </select>
            </div>
          </form>
        </div><!-- /.bs-example -->
        <div class="highlight">
<pre><code class="language-html">&lt;input class=&quot;form-control input-lg&quot; type=&quot;text&quot; placeholder=&quot;.input-lg&quot;&gt;
&lt;input class=&quot;form-control&quot; type=&quot;text&quot; placeholder=&quot;默认 input&quot;&gt;
&lt;input class=&quot;form-control input-sm&quot; type=&quot;text&quot; placeholder=&quot;.input-sm&quot;&gt;

&lt;select class=&quot;form-control input-lg&quot;&gt;...&lt;/select&gt;
&lt;select class=&quot;form-control&quot;&gt;...&lt;/select&gt;
&lt;select class=&quot;form-control input-sm&quot;&gt;...&lt;/select&gt;</code></pre>
        </div>

        <h3>调整列尺寸</h3>
        <p>用栅格系统中的列包裹 input 或其任何父元素，都可很容易的为其设置宽度。</p>
        <div class="bs-example">
          <form role="form">
            <div class="row">
              <div class="col-xs-2">
                <input type="text" class="form-control" placeholder=".col-xs-2">
              </div>
              <div class="col-xs-3">
                <input type="text" class="form-control" placeholder=".col-xs-3">
              </div>
              <div class="col-xs-4">
                <input type="text" class="form-control" placeholder=".col-xs-4">
              </div>
            </div>
          </form>
        </div><!-- /.bs-example -->
        <div class="highlight">
<pre><code class="language-html">&lt;div class=&quot;row&quot;&gt;
  &lt;div class=&quot;col-xs-2&quot;&gt;
    &lt;input type=&quot;text&quot; class=&quot;form-control&quot; placeholder=&quot;.col-xs-2&quot;&gt;
  &lt;/div&gt;
  &lt;div class=&quot;col-xs-3&quot;&gt;
    &lt;input type=&quot;text&quot; class=&quot;form-control&quot; placeholder=&quot;.col-xs-3&quot;&gt;
  &lt;/div&gt;
  &lt;div class=&quot;col-xs-4&quot;&gt;
    &lt;input type=&quot;text&quot; class=&quot;form-control&quot; placeholder=&quot;.col-xs-4&quot;&gt;
  &lt;/div&gt;
&lt;/div&gt;</code></pre>
        </div>

        <h2 id="forms-help-text">帮助文本</h2>
        <p>用于表单控件的块级帮助文本。</p>
        <div class="bs-example">
          <form role="form">
            <input type="text" class="form-control">
            <span class="help-block">自己独占一行或多行的块级帮助文本。</span>
          </form>
        </div><!-- /.bs-example -->
        <div class="highlight">
<pre><code class="language-html">&lt;span class=&quot;help-block&quot;&gt;自己独占一行或多行的块级帮助文本。&lt;/span&gt;</code></pre>
        </div>
      </div>

      <!-- Buttons
      ================================================== -->
      <div class="bs-docs-section">
        <div class="page-header">
          <h1 id="buttons">按钮</h1>
        </div>

        <h2 id="buttons-options">选项</h2>
        <p>使用下面列出的class可以快速创建一个带有样式的按钮。</p>
        <div class="bs-example">
          <button type="button" class="btn btn-default">默认</button>
          <button type="button" class="btn btn-primary">主要</button>
          <button type="button" class="btn btn-success">成功</button>
          <button type="button" class="btn btn-info">信息</button>
          <button type="button" class="btn btn-warning">警告</button>
          <button type="button" class="btn btn-danger">危险</button>
          <button type="button" class="btn btn-link">链接</button>
        </div>
        <div class="highlight">
<pre><code class="language-html">&lt;!-- 标准按钮 --&gt;
&lt;button type=&quot;button&quot; class=&quot;btn btn-default&quot;&gt;默认&lt;/button&gt;

&lt;!-- 在一组按钮中提供更明显的视觉效果的主要操作行为按钮 --&gt;
&lt;button type=&quot;button&quot; class=&quot;btn btn-primary&quot;&gt;Primary&lt;/button&gt;

&lt;!-- 表示成功或者正确行为的按钮 --&gt;
&lt;button type=&quot;button&quot; class=&quot;btn btn-success&quot;&gt;Success&lt;/button&gt;

&lt;!-- 有上下文关系的提示信息按钮 --&gt;
&lt;button type=&quot;button&quot; class=&quot;btn btn-info&quot;&gt;Info&lt;/button&gt;

&lt;!-- 表示需要谨慎操作的按钮 --&gt;
&lt;button type=&quot;button&quot; class=&quot;btn btn-warning&quot;&gt;Warning&lt;/button&gt;

&lt;!-- 表示危险或者有负面效果的按钮 --&gt;
&lt;button type=&quot;button&quot; class=&quot;btn btn-danger&quot;&gt;Danger&lt;/button&gt;

&lt;!-- 外观看起来是一个链接的按钮 --&gt;
&lt;button type=&quot;button&quot; class=&quot;btn btn-link&quot;&gt;Link&lt;/button&gt;</code></pre>
        </div>

        <h2 id="buttons-sizes">尺寸</h2>
        <p>需要让按钮具有不同尺寸吗？使用 <code>.btn-lg</code>、<code>.btn-sm</code>、<code>.btn-xs</code> 可以获得不同尺寸的按钮。</p>
        <div class="bs-example">
          <p>
            <button type="button" class="btn btn-primary btn-lg">大尺寸按钮</button>
            <button type="button" class="btn btn-default btn-lg">大尺寸按钮</button>
          </p>
          <p>
            <button type="button" class="btn btn-primary">默认尺寸按钮</button>
            <button type="button" class="btn btn-default">默认尺寸按钮</button>
          </p>
          <p>
            <button type="button" class="btn btn-primary btn-sm">小尺寸按钮</button>
            <button type="button" class="btn btn-default btn-sm">小尺寸按钮</button>
          </p>
          <p>
            <button type="button" class="btn btn-primary btn-xs">超小尺寸按钮</button>
            <button type="button" class="btn btn-default btn-xs">超小尺寸按钮</button>
          </p>
        </div>
        <div class="highlight">
<pre><code class="language-html">&lt;p&gt;
  &lt;button type=&quot;button&quot; class=&quot;btn btn-primary btn-lg&quot;&gt;大尺寸按钮&lt;/button&gt;
  &lt;button type=&quot;button&quot; class=&quot;btn btn-default btn-lg&quot;&gt;大尺寸按钮&lt;/button&gt;
&lt;/p&gt;
&lt;p&gt;
  &lt;button type=&quot;button&quot; class=&quot;btn btn-primary&quot;&gt;默认尺寸按钮&lt;/button&gt;
  &lt;button type=&quot;button&quot; class=&quot;btn btn-default&quot;&gt;默认尺寸按钮&lt;/button&gt;
&lt;/p&gt;
&lt;p&gt;
  &lt;button type=&quot;button&quot; class=&quot;btn btn-primary btn-sm&quot;&gt;小尺寸按钮&lt;/button&gt;
  &lt;button type=&quot;button&quot; class=&quot;btn btn-default btn-sm&quot;&gt;小尺寸按钮&lt;/button&gt;
&lt;/p&gt;
&lt;p&gt;
  &lt;button type=&quot;button&quot; class=&quot;btn btn-primary btn-xs&quot;&gt;超小尺寸按钮&lt;/button&gt;
  &lt;button type=&quot;button&quot; class=&quot;btn btn-default btn-xs&quot;&gt;超小尺寸按钮&lt;/button&gt;
&lt;/p&gt;</code></pre>
        </div>

        <p>通过给按钮添加 <code>.btn-block</code> 可以使其充满父节点100%的宽度，而且按钮也变为了块级（block）元素。</p>
        <div class="bs-example">
          <div class="well" style="max-width: 400px; margin: 0 auto 10px;">
            <button type="button" class="btn btn-primary btn-lg btn-block">此按钮为块级元素</button>
            <button type="button" class="btn btn-default btn-lg btn-block">此按钮为块级元素</button>
          </div>
        </div>
        <div class="highlight">
<pre><code class="language-html">&lt;button type=&quot;button&quot; class=&quot;btn btn-primary btn-lg btn-block&quot;&gt;此按钮为块级元素&lt;/button&gt;
&lt;button type=&quot;button&quot; class=&quot;btn btn-default btn-lg btn-block&quot;&gt;此按钮为块级元素&lt;/button&gt;</code></pre>
        </div>

        <h2 id="buttons-active">活动状态</h2>
        <p>当按钮处于活动状态时，其表现为被按压下（底色更深，边框夜色更深，内置阴影）。对于 <code>&lt;button&gt;</code> 元素，是通过 <code>:active</code> 实现的。对于 <code>&lt;a&gt;</code> 元素，是通过 <code>.active</code> 实现的。然而，你还可以联合使用 <code>.active</code> <code>&lt;button&gt;</code> 并通过编程的方式使其处于活动状态。</p>

        <h3>按钮元素</h3>
        <p>由于 <code>:active</code> 是伪状态，因此无需添加，但是在需要表现出同样外观的时候可以添加 <code>.active</code> 。</p>
        <p class="bs-example">
          <button type="button" class="btn btn-primary btn-lg active">主按钮</button>
          <button type="button" class="btn btn-default btn-lg active">按钮</button>
        </p>
        <div class="highlight">
<pre><code class="language-html">&lt;button type=&quot;button&quot; class=&quot;btn btn-primary btn-lg active&quot;&gt;主按钮&lt;/button&gt;
&lt;button type=&quot;button&quot; class=&quot;btn btn-default btn-lg active&quot;&gt;按钮&lt;/button&gt;</code></pre>
        </div>

        <h3>链接元素</h3>
        <p>可以为 <code>&lt;a&gt;</code> 添加 <code>.active</code> class 。</p>
        <p class="bs-example">
          <a href="#" class="btn btn-primary btn-lg active" role="button">主链接</a>
          <a href="#" class="btn btn-default btn-lg active" role="button">链接</a>
        </p>
        <div class="highlight">
<pre><code class="language-html">&lt;a href=&quot;#&quot; class=&quot;btn btn-primary btn-lg active&quot; role=&quot;button&quot;&gt;主链接&lt;/a&gt;
&lt;a href=&quot;#&quot; class=&quot;btn btn-default btn-lg active&quot; role=&quot;button&quot;&gt;链接&lt;/a&gt;</code></pre>
        </div>

        <h2 id="buttons-disabled">禁用状态</h2>
        <p>通过将按钮的背景色做50%的褪色处理就可以呈现出无法点击的效果。</p>

        <h3>按钮元素</h3>
        <p>为 <code>&lt;button&gt;</code> 添加 <code>disabled</code> 属性。</p>
        <p class="bs-example">
          <button type="button" class="btn btn-primary btn-lg" disabled="disabled">主按钮</button>
          <button type="button" class="btn btn-default btn-lg" disabled="disabled">按钮</button>
        </p>
        <div class="highlight">
<pre><code class="language-html">&lt;button type=&quot;button&quot; class=&quot;btn btn-lg btn-primary&quot; disabled=&quot;disabled&quot;&gt;主按钮&lt;/button&gt;
&lt;button type=&quot;button&quot; class=&quot;btn btn-default btn-lg&quot; disabled=&quot;disabled&quot;&gt;按钮&lt;/button&gt;</code></pre>
        </div>

        <div class="bs-callout bs-callout-danger">
          <h4>跨浏览器的兼容性</h4>
          <p>如果为 <code>&lt;button&gt;</code> 添加 <code>disabled</code> 属性，Internet Explorer 9 及更低版本的浏览器将会把按钮中的文本绘制为灰色，并带有恶心的阴影，目前还没有办法解决。</p>
        </div>

        <h3>链接元素</h3>
        <p>为 <code>&lt;a&gt;</code> 添加 <code>.disabled</code> class 。</p>
        <p class="bs-example">
          <a href="#" class="btn btn-primary btn-lg disabled" role="button">主链接</a>
          <a href="#" class="btn btn-default btn-lg disabled" role="button">链接</a>
        </p>
        <div class="highlight">
<pre><code class="language-html">&lt;a href=&quot;#&quot; class=&quot;btn btn-primary btn-lg disabled&quot; role=&quot;button&quot;&gt;主链接&lt;/a&gt;
&lt;a href=&quot;#&quot; class=&quot;btn btn-default btn-lg disabled&quot; role=&quot;button&quot;&gt;链接&lt;/a&gt;</code></pre>
        </div>
        <p>我们把 <code>.disabled</code> 作为工具 class 使用，就像 <code>.active</code> class 一样，因此不需要增加前缀。</p>
        <div class="bs-callout bs-callout-warning">
          <h4>链接功能不受影响</h4>
          <p>上面提到的 class 只是改变 <code>&lt;a&gt;</code> 的外观，不影响功能。在此文档中，我们通过 JavaScript 代码禁用了链接的默认功能。</p>
        </div>
        <div class="bs-callout bs-callout-warning">
          <h4>特殊情况说明</h4>
          <p>虽然按钮 class 可以同时应用到 <code>&lt;a&gt;</code> 和 <code>&lt;button&gt;</code> 元素，但是在 <code>nav</code> （导航）和 <code>navbar</code> （导航栏）里，只支持 <code>&lt;button&gt;</code> 元素作为按钮使用。</p>
        </div>

        <h2 id="buttons-tags">可作按钮使用的 HTML 标签</h2>
        <p>可以为 <code>&lt;a&gt;</code>、<code>&lt;button&gt;</code> 或 <code>&lt;input&gt;</code> 元素添加按钮 class 。</p>
        <form class="bs-example">
          <a class="btn btn-default" href="#" role="button">链接</a>
          <button class="btn btn-default">按钮</button>
          <input class="btn btn-default" type="button" value="Button 型 Input"/>
          <input class="btn btn-default" type="submit" value="Submit 型 Input"/>
        </form>
        <div class="highlight">
<pre><code class="language-html">&lt;a class=&quot;btn btn-default&quot; href=&quot;#&quot; role=&quot;button&quot;&gt;链接&lt;/a&gt;
&lt;button class=&quot;btn btn-default&quot;&gt;按钮&lt;/button&gt;
&lt;input class=&quot;btn btn-default&quot; type=&quot;button&quot; value=&quot;Button 型 Input&quot;/&gt;
&lt;input class=&quot;btn btn-default&quot; type=&quot;submit&quot; value=&quot;Submit 型 Input&quot;/&gt;</code></pre>
        </div>

        <div class="bs-callout bs-callout-warning">
          <h4>跨浏览器表现</h4>
          <p>作为最佳实践，<strong>我们强烈建议尽可能使用 <code>&lt;button&gt;</code> 元素</strong>以确保跨浏览器的一致性样式。</p>
          <p>出去其它原因，这个 <a href="https://bugzilla.mozilla.org/show_bug.cgi?id=697451" target="_blank">Firefox 的 bug</a> 让我们无法为基于 <code>&lt;input&gt;</code> 标签的按钮设置 <code>line-height</code>，这导致在 Firefox 上，他们与其它按钮的高度不一致。</p>
        </div>
      </div>

      <!-- Images
      ================================================== -->
      <div class="bs-docs-section">
        <div class="page-header">
          <h1 id="images">图片</h1>
        </div>

        <p>为 <code>&lt;img&gt;</code> 元素增加不同的 class，就可以轻松的改变其样式。</p>
        <div class="bs-callout bs-callout-danger">
          <h4>跨浏览器兼容性</h4>
          <p>你要知道，Internet Explorer 8 是不支持圆角矩形的。</p>
        </div>
        <div class="bs-example bs-example-images">
          <img data-src="holder.js/140x140" class="img-rounded" alt="A generic square placeholder image with rounded corners">
          <img data-src="holder.js/140x140" class="img-circle" alt="A generic square placeholder image where only the portion within the circle circumscribed about said square is visible">
          <img data-src="holder.js/140x140" class="img-thumbnail" alt="A generic square placeholder image with a white border around it, making it resemble a photograph taken with an old instant camera">
        </div>
        <div class="highlight">
<pre><code class="language-html">&lt;img src=&quot;...&quot; alt=&quot;...&quot; class=&quot;img-rounded&quot;&gt;
&lt;img src=&quot;...&quot; alt=&quot;...&quot; class=&quot;img-circle&quot;&gt;
&lt;img src=&quot;...&quot; alt=&quot;...&quot; class=&quot;img-thumbnail&quot;&gt;</code></pre>
        </div>

        <div class="bs-callout bs-callout-warning">
          <h4>响应式图片</h4>
          <p>想要知道如何让图片具有响应式特性吗？<a href="#overview-responsive-images">请看响应式图片一节</a>。</p>
        </div>
      </div>

      <!-- Helpers
      ================================================== -->
      <div class="bs-docs-section">
        <div class="page-header">
          <h1 id="helper-classes">工具 class</h1>
        </div>

        <h3 id="helper-classes-close">关闭按钮</h3>
        <p>通过使用一个象征关闭的图标，可以用来让模式对话框和警告框消失。</p>
        <div class="bs-example">
          <p><button type="button" class="close" aria-hidden="true">&times;</button></p>
        </div>
        <div class="highlight">
<pre><code class="language-html">&lt;button type=&quot;button&quot; class=&quot;close&quot; aria-hidden=&quot;true&quot;&gt;&amp;times;&lt;/button&gt;</code></pre>
        </div>

        <h3 id="helper-classes-carets">脱字符号</h3>
        <p>使用脱字符号表示下拉功能和下拉方向。</p>
        <div class="bs-example">
          <span class="caret"></span>
        </div>
        <div class="highlight">
<pre><code class="language-html">&lt;span class=&quot;caret&quot;&gt;&lt;/span&gt;</code></pre>
        </div>

        <h3 id="helper-classes-floats">快速设置浮动</h3>
        <p>通过这两个 class 让页面元素左右浮动。 <code>!important</code> 被用来避免某些问题。也可以像 mixin 一样使用这两个 class 。</p>
        <div class="highlight">
<pre><code class="language-html">&lt;div class=&quot;pull-left&quot;&gt;...&lt;/div&gt;
&lt;div class=&quot;pull-right&quot;&gt;...&lt;/div&gt;</code></pre>
        </div>
        <div class="highlight">
<pre><code class="language-css">// 作为 classe 使用
.pull-left {
  float: left !important;
}
.pull-right {
  float: right !important;
}

// 作为 mixin 使用
.element {
  .pull-left();
}
.another-element {
  .pull-right();
}</code></pre>
        </div>

        <div class="bs-callout bs-callout-warning">
          <h4>不要用于导航条</h4>
          <p>如果是用于对齐导航条上的组件，请务必使用 <code>.navbar-left</code> 或 <code>.navbar-right</code> 。查看<a href="components.jsp#navbar-component-alignment">导航条文档</a>以获取详情。</p>
        </div>

        <h3 id="helper-classes-center">内容区域居中</h3>
        <p>将页面元素设置为 <code>display: block</code> 并通过设置 <code>margin</code> 使其居中。可以作为 mixin 或 class 使用。</p>
        <div class="highlight">
<pre><code class="language-html">&lt;div class=&quot;center-block&quot;&gt;...&lt;/div&gt;</code></pre>
        </div>
        <div class="highlight">
<pre><code class="language-css">// 作为 classe 使用
.center-block {
  display: block;
  margin-left: auto;
  margin-right: auto;
}

// 作为 mixin 使用
.element {
  .center-block();
}</code></pre>
        </div>

        <h3 id="helper-classes-clearfix">清除浮动</h3>
        <p>使用 <code>.clearfix</code> 清除任意页面元素的<code>浮动</code>。我们使用了 Nicolas Gallagher 的 <a href="http://nicolasgallagher.com/micro-clearfix-hack/">the micro clearfix</a> 。也可以像 mixin 一样使用。</p>
        <div class="highlight">
<pre><code class="language-html">&lt;!-- 作为 class 使用 --&gt;
&lt;div class=&quot;clearfix&quot;&gt;...&lt;/div&gt;</code></pre>
        </div>
        <div class="highlight">
<pre><code class="language-css">// Mixin itself
.clearfix() {
  &amp;:before,
  &amp;:after {
    content: " ";
    display: table;
  }
  &amp;:after {
    clear: both;
  }
}

// 作为 mixin 使用
.element {
  .clearfix();
}</code></pre>
        </div>

        <h3 id="helper-classes-show-hide">显示和隐藏内容</h3>
        <p>通过 <code>.show</code> 和 <code>.hidden</code> 可以强制显示或隐藏任一页面元素（<strong>包括在屏幕阅读器上</strong>）。这两个 class 使用了 <code>!important</code> 以避免冲突，原因和<a href="#helper-classes-floats">快速浮动</a>类似。这两个 class 只能做用于块级元素，也可以作为 mixin 使用。</p>
        <p><code>.hide</code> 仍然可以用，但是它不能影响屏幕阅读器，并且<strong>不建议使用</strong>。请使用 <code>.hidden</code> 或 <code>.sr-only</code>。</p>
        <p>此外，<code>.invisible</code> 是用来控制元素的可见性，其显示与否不影响文档流结构。</p>
        <div class="highlight">
<pre><code class="language-html">&lt;div class=&quot;show&quot;&gt;...&lt;/div&gt;
&lt;div class=&quot;hidden&quot;&gt;...&lt;/div&gt;</code></pre>
        </div>
        <div class="highlight">
<pre><code class="language-css">// 作为 classe 使用
.show {
  display: block !important;
}
.hidden {
  display: none !important;
  visibility: hidden !important;
}
.invisible {
  visibility: hidden;
}

// 作为 mixin 使用
.element {
  .show();
}
.another-element {
  .hidden();
}</code></pre>
        </div>

        <h3 id="helper-classes-screen-readers">针对屏幕阅读器的内容</h3>
        <p>使用 <code>.sr-only</code> 可以针对<strong>除了屏幕阅读器</strong>之外的所有设备隐藏一个元素。此 class 还可以作为 mixin 使用。</p>
        <div class="highlight">
<pre><code class="language-html">&lt;a class=&quot;sr-only&quot; href=&quot;#content&quot;&gt;跳过主内容&lt;/a&gt;</code></pre>
        </div>
        <div class="highlight">
<pre><code class="language-css">// 作为 Mixin 使用
.skip-navigation {
  .sr-only();
}</code></pre>
        </div>

        <h3 id="helper-classes-image-replacement">图片替换</h3>
        <p>使用 <code>.text-hide</code> class（也可作为 mixin 使用）可以将页面元素所包含的文本内容替换为背景图。</p>
        <div class="highlight">
<pre><code class="language-html">&lt;h1 class=&quot;text-hide&quot;&gt;自定义标题&lt;/h1&gt;</code></pre>
        </div>
        <div class="highlight">
<pre><code class="language-css">// 作为 Mixin 使用
.heading {
  .text-hide();
}</code></pre>
        </div>
      </div>

      <!-- Responsive utilities
      ================================================== -->
      <div class="bs-docs-section" id="responsive-utilities">
        <div class="page-header">
          <h1>响应式工具</h1>
        </div>
        <p class="lead">通过使用这些工具 class 可以根据屏幕和不同的媒体查询显示或隐藏页面内容，加速针对移动设备的开发。</p>
        <p>尝试使用这些 class 并避免创建同一个网站的不同版本，从而能够完善不同设备上的显示效果。<strong>响应式工具目前只是针对块级元素</strong>，不支持 inline 元素和表格元素。</p>

        <h2 id="responsive-utilities-classes">可用的 class</h2>
        <p>通过单独或联合使用以下列出的 class，可以针对不同屏幕尺寸隐藏或显示页面内容。</p>
        <div class="table-responsive">
          <table class="table table-bordered table-striped responsive-utilities">
            <thead>
              <tr>
                <th></th>
                <th>
                  超小屏幕
                  <small>手机 (&lt;768px)</small>
                </th>
                <th>
                  小屏幕
                  <small>平板 (&ge;768px)</small>
                </th>
                <th>
                  中等屏幕
                  <small>桌面 (&ge;992px)</small>
                </th>
                <th>
                  大屏幕
                  <small>桌面 (&ge;1200px)</small>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th><code>.visible-xs</code></th>
                <td class="is-visible">可见</td>
                <td class="is-hidden">隐藏</td>
                <td class="is-hidden">隐藏</td>
                <td class="is-hidden">隐藏</td>
              </tr>
              <tr>
                <th><code>.visible-sm</code></th>
                <td class="is-hidden">隐藏</td>
                <td class="is-visible">可见</td>
                <td class="is-hidden">隐藏</td>
                <td class="is-hidden">隐藏</td>
              </tr>
              <tr>
                <th><code>.visible-md</code></th>
                <td class="is-hidden">隐藏</td>
                <td class="is-hidden">隐藏</td>
                <td class="is-visible">可见</td>
                <td class="is-hidden">隐藏</td>
              </tr>
              <tr>
                <th><code>.visible-lg</code></th>
                <td class="is-hidden">隐藏</td>
                <td class="is-hidden">隐藏</td>
                <td class="is-hidden">隐藏</td>
                <td class="is-visible">可见</td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <th><code>.hidden-xs</code></th>
                <td class="is-hidden">隐藏</td>
                <td class="is-visible">可见</td>
                <td class="is-visible">可见</td>
                <td class="is-visible">可见</td>
              </tr>
              <tr>
                <th><code>.hidden-sm</code></th>
                <td class="is-visible">可见</td>
                <td class="is-hidden">隐藏</td>
                <td class="is-visible">可见</td>
                <td class="is-visible">可见</td>
              </tr>
              <tr>
                <th><code>.hidden-md</code></th>
                <td class="is-visible">可见</td>
                <td class="is-visible">可见</td>
                <td class="is-hidden">隐藏</td>
                <td class="is-visible">可见</td>
              </tr>
              <tr>
                <th><code>.hidden-lg</code></th>
                <td class="is-visible">可见</td>
                <td class="is-visible">可见</td>
                <td class="is-visible">可见</td>
                <td class="is-hidden">隐藏</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 id="responsive-utilities-print">打印 class</h2>
        <p>和常规的响应式 class 一样，使用下面的 class 可以针对打印机隐藏或显示某些内容。</p>
        <div class="table-responsive">
          <table class="table table-bordered table-striped responsive-utilities">
            <thead>
              <tr>
                <th>Class</th>
                <th>浏览器</th>
                <th>打印机</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th><code>.visible-print</code></th>
                <td class="is-hidden">隐藏</td>
                <td class="is-visible">可见</td>
              </tr>
              <tr>
                <th><code>.hidden-print</code></th>
                <td class="is-visible">可见</td>
                <td class="is-hidden">隐藏</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 id="responsive-utilities-tests">测试用例</h2>
        <p>调整你的浏览器窗口的尺寸或者在不同的设备上加载此页面，均可测试上面提到的工具 class 。</p>

        <h3>在...上可见</h3>
        <p>带有绿色标记的元素表示其在当前浏览器窗口中是<strong>可见的</strong>。</p>
        <div class="row responsive-utilities-test visible-on">
          <div class="col-xs-6 col-sm-3">
            <span class="hidden-xs">超小屏幕</span>
            <span class="visible-xs">&#10004; 超小屏幕可见</span>
          </div>
          <div class="col-xs-6 col-sm-3">
            <span class="hidden-sm">小屏幕</span>
            <span class="visible-sm">&#10004; 小屏幕可见</span>
          </div>
          <div class="clearfix visible-xs"></div>
          <div class="col-xs-6 col-sm-3">
            <span class="hidden-md">中等屏幕</span>
            <span class="visible-md">&#10004; 中等屏幕可见</span>
          </div>
          <div class="col-xs-6 col-sm-3">
            <span class="hidden-lg">大屏幕</span>
            <span class="visible-lg">&#10004; 大屏幕可见</span>
          </div>
        </div>
        <div class="row responsive-utilities-test visible-on">
          <div class="col-xs-6 col-sm-6">
            <span class="hidden-xs hidden-sm">超小和小屏幕</span>
            <span class="visible-xs visible-sm">&#10004; 超小和小屏幕可见</span>
          </div>
          <div class="col-xs-6 col-sm-6">
            <span class="hidden-md hidden-lg">中等和大屏幕</span>
            <span class="visible-md visible-lg">&#10004; 中等和大屏幕可见</span>
          </div>
          <div class="clearfix visible-xs"></div>
          <div class="col-xs-6 col-sm-6">
            <span class="hidden-xs hidden-md">超小和中等屏幕</span>
            <span class="visible-xs visible-md">&#10004; 超小和中等屏幕可见</span>
          </div>
          <div class="col-xs-6 col-sm-6">
            <span class="hidden-sm hidden-lg">小和大屏幕</span>
            <span class="visible-sm visible-lg">&#10004; 小和大屏幕可见</span>
          </div>
          <div class="clearfix visible-xs"></div>
          <div class="col-xs-6 col-sm-6">
            <span class="hidden-xs hidden-lg">超小和大屏幕</span>
            <span class="visible-xs visible-lg">&#10004; 超小和大屏幕可见</span>
          </div>
          <div class="col-xs-6 col-sm-6">
            <span class="hidden-sm hidden-md">小和中等屏幕</span>
            <span class="visible-sm visible-md">&#10004; 小和中等屏幕可见</span>
          </div>
        </div>

        <h3>在...上隐藏</h3>
        <p>带有绿色标记的元素表示其在当前浏览器窗口中是<strong>隐藏的</strong>。</p>
        <div class="row responsive-utilities-test hidden-on">
          <div class="col-xs-6 col-sm-3">
            <span class="hidden-xs">超小屏幕</span>
            <span class="visible-xs">&#10004; 超小屏幕隐藏</span>
          </div>
          <div class="col-xs-6 col-sm-3">
            <span class="hidden-sm">小屏幕</span>
            <span class="visible-sm">&#10004; 小屏幕隐藏</span>
          </div>
          <div class="clearfix visible-xs"></div>
          <div class="col-xs-6 col-sm-3">
            <span class="hidden-md">中等屏幕</span>
            <span class="visible-md">&#10004; 中等屏幕隐藏</span>
          </div>
          <div class="col-xs-6 col-sm-3">
            <span class="hidden-lg">大屏幕</span>
            <span class="visible-lg">&#10004; 大屏幕隐藏</span>
          </div>
        </div>
        <div class="row responsive-utilities-test hidden-on">
          <div class="col-xs-6 col-sm-6">
            <span class="hidden-xs hidden-sm">超小和小屏幕</span>
            <span class="visible-xs visible-sm">&#10004; 超小和小屏幕隐藏</span>
          </div>
          <div class="col-xs-6 col-sm-6">
            <span class="hidden-md hidden-lg">中等和大屏幕</span>
            <span class="visible-md visible-lg">&#10004; 中等和大屏幕隐藏</span>
          </div>
          <div class="clearfix visible-xs"></div>
          <div class="col-xs-6 col-sm-6">
            <span class="hidden-xs hidden-md">超小和中等屏幕</span>
            <span class="visible-xs visible-md">&#10004; 超小和中等屏幕隐藏</span>
          </div>
          <div class="col-xs-6 col-sm-6">
            <span class="hidden-sm hidden-lg">小和大屏幕</span>
            <span class="visible-sm visible-lg">&#10004; 小和大屏幕隐藏</span>
          </div>
          <div class="clearfix visible-xs"></div>
          <div class="col-xs-6 col-sm-6">
            <span class="hidden-xs hidden-lg">超小和大屏幕</span>
            <span class="visible-xs visible-lg">&#10004; 超小和大屏幕隐藏</span>
          </div>
          <div class="col-xs-6 col-sm-6">
            <span class="hidden-sm hidden-md">小和中等屏幕</span>
            <span class="visible-sm visible-md">&#10004; 小和中等屏幕隐藏</span>
          </div>
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

<%=Stage.importScripts("lib/")%>
<script type="text/javascript" src="assets/js/highlight.min.js"></script>
<script type="text/javascript">hljs.initHighlightingOnLoad();</script>
<script src="lib/utils/holder.js" type="text/javascript"></script>
<script src="assets/js/docs.js" type="text/javascript"></script>
</body>
</html>
