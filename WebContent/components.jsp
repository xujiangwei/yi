<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="yi.core.*" %>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>组件 - 壹框</title>
<%=Stage.importStyles("lib/")%>
<link href="assets/css/docs.css" rel="stylesheet">
<link href="lib/extensions/default.css" rel="stylesheet">
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
        <li><a href="css.jsp">层叠样式表</a></li>
        <li class="active"><a href="components.jsp">组件</a></li>
        <li><a href="modules.jsp">模组</a></li>
        <li><a href="utility-library.jsp">实用库</a></li>
        <li><a href="extend.jsp">扩展</a></li>
      </ul>
    </nav>
  </div>
</header>

<div class="bs-header" id="content">
  <div class="container">
    <h1>组件</h1>
    <p>无数可复用的组件，包括动态栅格，下拉菜单，树型菜单，导航，警告框，弹出框等更多功能。</p>
  </div>
</div>

<div class="container bs-docs-container">
  <div class="row">
    <div class="col-md-3">
      <div class="bs-sidebar hidden-print" role="complementary">
        <ul class="nav bs-sidenav">
          <li>
            <a href="#base">组件基类</a>
            <ul class="nav">
              <li><a href="#base_interface">接口</a></li>
              <li><a href="#base_manager">组件管理器</a></li>
            </ul>
          </li>
          <li>
            <a href="#timeline">时间线</a>
            <ul class="nav">
              <li><a href="#timeline_examples">示例</a></li>
              <li><a href="#timeline_usage">用法</a></li>
            </ul>
          </li>
          <li>
            <a href="#gallery">画廊</a>
            <ul class="nav">
              <li><a href="#gallery_base">基本画廊</a></li>
              <li><a href="#gallery_customization">定制</a></li>
              <li><a href="#image_gallery">相册</a></li>
            </ul>
          </li>
          <li>
            <a href="#graph_radio_group">带图单选组</a>
            <ul class="nav">
              <li><a href="#graph_radio_group_example_two">示例</a></li>
            </ul>
          </li>
          <li>
            <a href="#modal_window">模态窗口</a>
            <ul class="nav">
              <li><a href="#modal_window_example_one">示例</a></li>
              <li><a href="#modal_window_usage">用法</a></li>
            </ul>
          </li>
          <li>
           <a href="#carousel">轮播</a>
            <ul class="nav">
              <li><a href="#carousel_example_two">示例</a></li>
              <li><a href="#carousel_example_one">环形轮播</a></li>
            </ul>
          </li>
          <li>
            <a href="#page_loader">页面加载器</a>
            <ul class="nav">
              <li><a href="#page_loader_examples">示例</a></li>
              <li><a href="#page_loader_usage">用法</a></li>
            </ul>
          </li>
          <li>
            <a href="#tab">标签页</a>
            <ul class="nav">
              <li><a href="#tab_examples">示例</a></li>
              <li><a href="#tab_usage">用法</a></li>
            </ul>
          </li>
          <li>
            <a href="#clickable">可点击元素</a>
            <ul class="nav">
              <li><a href="#clickable_base">任意元素</a></li>
              <li><a href="#button">按钮</a></li>
            </ul>
          </li>
          <li>
            <a href="#form">表单</a>
            <ul class="nav">
              <li><a href="#form_submit">提交</a></li>
            </ul>
          </li>
          <li>
            <a href="#grid">栅格</a>
            <ul class="nav">
              <li><a href="#grid-example">案例</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <div class="col-md-9" role="main">
      <div class="bs-docs-section">
	        <div class="page-header">
	          <h1 id="base">组件基类 <small>Component</small></h1>
	        </div>
	        <p class="lead">所有组件具有一个相同的基类。它用于规范组件在生命周期中的行为，并且具有一些通用操作和事件的基本实现。</p>
	
	        <h2 id="base_interface">接口</h2>
	        
	        <h3>实例化</h3>
	        <p>组件通过构造函数的实例化。</p>
			<div class="highlight">
				<pre>
var c = new Component(option);
				</pre>
			</div>
			
			<h3>基本参数</h3>
		    <p>在实例化组件时，通过<strong>参数</strong>来定制每个实例独特的外观、功能和交互特性。每种组件都有特定的参数。此外，还可以在传入本文档描述以外的任意参数，并通过组件实例的属性访问。</p>
		    <p>以下是所有组件都具有的参数，并且所有组件应保持它们的原意。</p>
		    <div class="table-responsive">
		      <table class="table table-bordered table-striped">
		        <thead>
		         <tr>
		           <th style="width: 100px;">名称</th>
		           <th style="width: 50px;">类型</th>
		           <th style="width: 100px;">默认值</th>
		           <th>描述</th>
		         </tr>
		        </thead>
		        <tbody>
		         <tr>
		           <td>id</td>
		           <td>String</td>
		           <td></td>
		           <td>为组件实例指定一个唯一标识，不指定则自动赋值。</td>
		         </tr>
		         <tr>
		           <td>applyTo</td>
		           <td>String</td>
		           <td></td>
		           <td>指定一个节点，将其应用于组件实例。该节点将成为组件的最外层元素或关键元素，applyTo的值就是该节点的id。组件渲染（<code>render()</code>）后，该节点的jQuery对象将成为组件的私有属性el。<br><em>下文也用el指代组件的最外层元素或关键元素。</em></td>
		         </tr>
		         <tr>
		           <td>renderTo</td>
		           <td>String</td>
		           <td></td>
		           <td>指定一个节点，在其内部按组件的baseHtml构建新的子节点作为组件的el，renderTo的值就是父节点的id。<br><em>有applyTo或renderTo参数时，组件实例化后将自动开始渲染（<code>render()</code>）。</em></td>
		         </tr>
		         <tr>
		           <td>baseHtml</td>
		           <td>String</td>
		           <td>'&lt;div&gt;&lt;/div&gt;'</td>
		           <td>如果不是应用于已有的节点，则按baseHtml动态构建，并且baseHtml的最外层元素的jQuery对象将成为组件的私有属性el。</td>
		         </tr>
		         <tr>
		           <td>baseCls</td>
		           <td>String</td>
		           <td></td>
		           <td>每种组件都可以定义一个样式类，它会被自动添加到组件的el上，方便组件创建自己的样式表。</td>
		         </tr>
		         <tr>
		           <td>cls</td>
		           <td>String</td>
		           <td></td>
		           <td>每个组件实例可以拥有自定义的样式类，它会被自动添加到组件的el上，方便使用者修改组件实例的样式。</td>
		         </tr>
		         <tr>
		           <td>style</td>
		           <td>Object/String</td>
		           <td></td>
		           <td>每个组件实例可以拥有自定义的内联样式，它会被自动添加到组件的el上，方便使用者修改组件实例的样式。</td>
		         </tr>
		         <tr>
		           <td>overCls</td>
		           <td>String</td>
		           <td></td>
		           <td>每种组件都可以定义一个样式类，当鼠标在组件的el上时，它会被自动添加到组件的el上，方便组件设置自己的高亮样式。</td>
		         </tr>
		         <tr>
		           <td>hidden</td>
		           <td>Boolean</td>
		           <td></td>
		           <td>渲染后是否隐藏。</td>
		         </tr>
		         <tr>
		           <td>hideMode</td>
		           <td>String</td>
		           <td>'display'</td>
		           <td>隐藏组件的方式，<code>hidden : true</code>时，如果<code>hideMode : 'display'</code>，则组件隐藏且不占位（display: none）。如果<code>hideMode : 'visibility'</code>，则组件占位隐藏（visibility: hidden）。</td>
		         </tr>
		         <tr>
		           <td>disabled</td>
		           <td>Boolean</td>
		           <td></td>
		           <td>渲染后是否为不可用状态。</td>
		         </tr>
		         <tr>
		           <td>disabledCls</td>
		           <td>String</td>
		           <td>'disabled'</td>
		           <td>每种组件都可以定义一个不可用时的样式类，当组件不可用时，它会被自动添加到组件的el上，方便组件设置自己的不可用样式表。</td>
		         </tr>
		         <tr>
		           <td>listeners</td>
		           <td>Object</td>
		           <td></td>
		           <td><code>{'eventName1': {fn: function(args){}, scope: {}}[, event2...]}</code><br>创建组件时就监听事件。</td>
		         </tr>
		         <tr>
		           <td>permission</td>
		           <td>String</td>
		           <td>'hide'</td>
		           <td><code>{name: 'cigrid', method: 'hide'}</code><br>组件权限控制，如果当前用户没有name属性的权限，则按照method属性的方法进行处理。method：<code>'hide'</code>，<code>'disable'</code>和<code>'space'</code>。</td>
		         </tr>
		        </tbody>
		      </table>
		    </div><!-- /.table-responsive -->
		    
			<h3>公共属性</h3>
		    <p>以下是所有组件实例都具有的属性。</p>
		    <div class="table-responsive">
		      <table class="table table-bordered table-striped">
		        <thead>
		         <tr>
		           <th style="width: 100px;">名称</th>
		           <th style="width: 50px;">类型</th>
		           <th>描述</th>
		         </tr>
		        </thead>
		        <tbody>
		         <tr>
		           <td>id</td>
		           <td>String</td>
		           <td>组件实例的唯一标识，只读。</td>
		         </tr>
		         <tr>
		           <td>rendered</td>
		           <td>Boolean</td>
		           <td>组件实例是否渲染，只读。</td>
		         </tr>
		         <tr>
		           <td>hidden</td>
		           <td>Boolean</td>
		           <td>组件实例是否隐藏，只读。</td>
		         </tr>
		         <tr>
		           <td>disabled</td>
		           <td>Boolean</td>
		           <td>组件实例是否不可用，只读。</td>
		         </tr>
		        </tbody>
		      </table>
		    </div><!-- /.table-responsive -->
		    
			<h3>公共方法</h3>
		    <p>以下所有组件都具有的方法。同一个方法，不同的组件可能会有不同的表现，但所有组件应保持它们的原意。</p>
			<h4>String getId()</h4>
		    <p>返回组件id。</p>
			<div class="highlight">
				<pre>
var Component = require('component');
<br>
var c = new Component(option);
<br>
console.info(c.getId());
				</pre>
			</div>
			<h4>void render(Mixed parent[, Mixed position])</h4>
		    <p>渲染组件。</p>
			<div class="highlight">
				<pre>
&lt;div id="parent"&gt;
<br>
&nbsp;&nbsp;&lt;div class="first-child"&gt;&lt;/div&gt;
<br>
&nbsp;&nbsp;&lt;div class="second-child"&gt;&lt;/div&gt;
<br>
&lt;/div&gt;
				</pre>
			</div>
			<div class="highlight">
				<pre>
var c = new Component(option);
<br>
c = c.render($('#parent'), $('#parent .second-child'));
				</pre>
			</div>
		    <p>组件会渲染到<code>div.second-child</code>之前，形成以下html：</p>
			<div class="highlight">
				<pre>
&lt;div id="parent"&gt;
<br>
&nbsp;&nbsp;&lt;div class="first-child"&gt;&lt;/div&gt;
<br>
&nbsp;&nbsp;&lt;div id="comp_0"&gt;&lt;/div&gt;
<br>
&nbsp;&nbsp;&lt;div class="second-child"&gt;&lt;/div&gt;
<br>
&lt;/div&gt;
				</pre>
			</div>
		    <p>以下用法也是可以的：</p>
			<div class="highlight">
				<pre>
// parent和position可以接受节点的id、选择符、DOM或者jquery对象，position还可以接受节点在父节点中的序号（从0开始）
<br>
c = c.render('#parent', '#parent .second-child');
<br>
c = c.render('parent', 1);
				</pre>
			</div>
		    <p>没有position参数则在parent内部最末尾创建一个子节点，将组件创渲染到该节点上。</p>
			<h4>String hide()</h4>
		    <p>隐藏组件。</p>
			<div class="highlight">
				<pre>
c.hide();
				</pre>
			</div>
			<h4>String show()</h4>
		    <p>显示组件。</p>
			<div class="highlight">
				<pre>
c.show();
				</pre>
			</div>
			<h4>String disable()</h4>
		    <p>使组件不可用。</p>
			<div class="highlight">
				<pre>
c.disable();
				</pre>
			</div>
			<h4>String enable()</h4>
		    <p>使组件可用。</p>
			<div class="highlight">
				<pre>
c.enable();
				</pre>
			</div>
			<h4>String focus()</h4>
		    <p>使组件的el获得焦点。</p>
			<div class="highlight">
				<pre>
c.focus();
				</pre>
			</div>
			<h4>String blur()</h4>
		    <p>使组件的el失去焦点。</p>
			<div class="highlight">
				<pre>
c.blur();
				</pre>
			</div>
			<h4>void on(String eventName, Functon listener[, Object scope])</h4>
		    <p>监听组件事件。</p>
			<div class="highlight">
				<pre>
var Gallery = require('gallery');
<br>
var gallery = new Gallery(option);
<br>
gallery.on('itemclick', function(g, item, id, isAdd, e){
<br>
&nbsp;&nbsp;// do something...
<br>
}, gallery);
			</pre>
			</div>
		    <p>每种组件都有特定的事件，事件的名称和可用的参数都可以在本文档中查到。组件的事件可以通过scope参数指定监听函数的作用域（this所引用的对象），没有则作用域为组件实例自身。</p>
			<h4>void off(String eventName[, Functon listener])</h4>
		    <p>取消监听组件事件。</p>
			<div class="highlight">
				<pre>
gallery.off('itemclick');
				</pre>
			</div>
			<h4>void trigger(String eventName[, args])</h4>
		    <p>手动触发事件。</p>
			<div class="highlight">
				<pre>
c.trigger('myevents');
				</pre>
			</div>
			<h4>Object getEl()</h4>
		    <p>返回组件el（jQuery Object）。</p>
			<div class="highlight">
				<pre>
var el = c.getEl();
<br>
console.info(el.html());
				</pre>
			</div>
			<h4>Object getPosition()</h4>
		    <p><code>{left: X, top: Y}</code></p>
		    <p>返回组件el的位置。</p>
			<div class="highlight">
				<pre>
var position = c.getPosition();
<br>
console.info(position.left, postion.top);
				</pre>
			</div>
			<h4>Number getWidth()</h4>
		    <p>返回组件el的宽。</p>
			<div class="highlight">
				<pre>
console.info(c.getWidth());
				</pre>
			</div>
			<h4>Number getHeight()</h4>
		    <p>返回组件el的高。</p>
			<div class="highlight">
				<pre>
console.info(c.getHeight());
				</pre>
			</div>
			<h4>Object getInitialConfig()</h4>
		    <p>返回执行构造函数时的参数（为特殊目的准备）。</p>
			<div class="highlight">
				<pre>
console.info(c.getInitialConfig());
				</pre>
			</div>
			<h4>void destroy()</h4>
		    <p>销毁组件。</p>
			<div class="highlight">
				<pre>
c.destroy();
<br>
c = null;
				</pre>
			</div>
		    
			<h3>公共事件</h3>
		    <p>以下所有组件都具有的事件，并且所有组件应保持它们的原意。</p>
		    <div class="table-responsive">
		      <table class="table table-bordered table-striped">
		        <thead>
		         <tr>
		           <th style="width: 100px;">事件类型</th>
		           <th style="width: 200px;">监听函数</th>
		           <th>描述</th>
		         </tr>
		        </thead>
		        <tbody>
		         <tr>
		           <td>render</td>
		           <td>function(Component c)</td>
		           <td>渲染完成后的事件。</td>
		         </tr>
		         <tr>
		           <td>beforehide</td>
		           <td>function(Component c)</td>
		           <td>执行隐藏操作前的事件，返回false将终止隐藏操作。</td>
		         </tr>
		         <tr>
		           <td>hide</td>
		           <td>function(Component c)</td>
		           <td>隐藏完成后的事件。</td>
		         </tr>
		         <tr>
		           <td>beforeshow</td>
		           <td>function(Component c)</td>
		           <td>执行显示操作前的事件，返回false将终止显示操作。</td>
		         </tr>
		         <tr>
		           <td>show</td>
		           <td>function(Component c)</td>
		           <td>显示完成后的事件。</td>
		         </tr>
		         <tr>
		           <td>disable</td>
		           <td>function(Component c)</td>
		           <td>不可用后的事件。</td>
		         </tr>
		         <tr>
		           <td>enable</td>
		           <td>function(Component c)</td>
		           <td>恢复为可用后的事件。</td>
		         </tr>
		         <tr>
		           <td>focus</td>
		           <td>function(Component c)</td>
		           <td>获得焦点后的事件。</td>
		         </tr>
		         <tr>
		           <td>blur</td>
		           <td>function(Component c)</td>
		           <td>失去焦点后的事件。</td>
		         </tr>
		         <tr>
		           <td>beforedestroy</td>
		           <td>function(Component c)</td>
		           <td>执行销毁操作前的事件，返回false将终止销毁操作。</td>
		         </tr>
		         <tr>
		           <td>destroy</td>
		           <td>function(Component c)</td>
		           <td>销毁完成后的事件。</td>
		         </tr>
		        </tbody>
		      </table>
		    </div><!-- /.table-responsive -->
		    
		    <h2 id="base_manager">组件管理器</h2>
		    <p>Component对象既是组件的基类，也是组件管理器，通过它可以进行注册、注销和获取组件实例。</p>
		    <h3>静态方法</h3>
			<h4>void register(Component c)</h4>
		    <p>注册组件实例。此过程在组件实例化时自动完成，通常无需调用。</p>
			<h4>void unregister(Component c)</h4>
		    <p>注销组件实例。此过程在组件实例化时自动完成，通常无需调用。</p>
			<h4>Component get(String id)</h4>
		    <p>返回组件组件对象。通常于jQuery事件中获取组件实例，避免直接传递实例对象。</p>
			<div class="highlight">
				<pre>
var Base = require('component');
<br>
<br>
function handler(e){
<br>
&nbsp;&nbsp;var c = Base.get(e.data.componentId);
<br>
<br>
&nbsp;&nbsp;...
<br>
}
<br>
<br>
(function(){
<br>
&nbsp;&nbsp;var c = new Base(option);
<br>
<br>
&nbsp;&nbsp;$('#SOME_ELEMENT').on('SOME_EVENT', {
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;componentId: c.getId()
<br>
&nbsp;&nbsp;}, handler);
<br>
}());
<br>

				</pre>
			</div>
	      </div>
	      
	      <div class="bs-docs-section">
	        <div class="page-header">
	          <h1 id="timeline">时间线 <small>Timeline</small></h1>
	        </div>
	
	        <h2 id="timeline_examples">示例</h2>
	        
	        <h3>静态示例</h3>
	        <div class="bs-example">
		      <div id="timeline_example" class="yi-timeline">
		      	<div class="yi-timeline-axis"></div>
		      	<div class="yi-timeline-start">2013-06-23</div>
		      	<div class="yi-timeline-end">2013-12-31</div>
		      	<div class="yi-timeline-point" title="2013-11-03" style="left: 559px;">2013-11-03</div>
		      	<div class="yi-timeline-point" title="2013-12-04" style="left: 691px;">2013-12-04</div>
		      </div>
		      <br>
		      <div id="timeline_example2" class="yi-timeline yi-timeline-readonly">
		      	<div class="yi-timeline-axis"></div>
		      	<div class="yi-timeline-start">2013-06-23</div>
		      	<div class="yi-timeline-end">2013-12-31</div>
		      	<div class="yi-timeline-point" title="2013-08-29" style="left: 280px;">2013-08-29</div>
		      	<div class="yi-timeline-point" title="2013-10-20" style="left: 501px;">2013-10-20</div>
		      </div>
		    </div><!-- /example -->
			<div class="highlight">
				<pre>
// html
<br>
&lt;div id="timeline_example" class="yi-timeline"&gt;
<br>
&nbsp;&nbsp;&lt;div class="yi-timeline-axis"&gt;&lt;/div&gt;
<br>
&nbsp;&nbsp;&lt;div class="yi-timeline-start"&gt;2013-06-23&lt;/div&gt;
<br>
&nbsp;&nbsp;&lt;div class="yi-timeline-end"&gt;2013-12-31&lt;/div&gt;
<br>
&nbsp;&nbsp;&lt;div class="yi-timeline-point" title="2013-11-03" style="left: 559px;"&gt;2013-11-03&lt;/div&gt;
<br>
&nbsp;&nbsp;&lt;div class="yi-timeline-point" title="2013-12-04" style="left: 691px;"&gt;2013-12-04&lt;/div&gt;
<br>
&lt;/div&gt;
<br>
&lt;br&gt;
<br>
&lt;div id="timeline_example2" class="yi-timeline yi-timeline-readonly"&gt;
<br>
&nbsp;&nbsp;&lt;div class="yi-timeline-axis"&gt;&lt;/div&gt;
<br>
&nbsp;&nbsp;&lt;div class="yi-timeline-start"&gt;2013-06-23&lt;/div&gt;
<br>
&nbsp;&nbsp;&lt;div class="yi-timeline-end"&gt;2013-12-31&lt;/div&gt;
<br>
&nbsp;&nbsp;&lt;div class="yi-timeline-point" title="2013-08-29" style="left: 280px;"&gt;2013-08-29&lt;/div&gt;
<br>
&nbsp;&nbsp;&lt;div class="yi-timeline-point" title="2013-10-20" style="left: 501px;"&gt;2013-10-20&lt;/div&gt;
<br>
&lt;/div&gt;
				</pre>
			</div>
			<p>只通过html展示静态的时间线时，需要为每个点（<code>.yi-timeline-point</code>）设置<code>left</code>。</p>
			<p>此外，添加<code>.yi-timeline-readonly</code>可以将时间线设置为只读样式。</p>
	        
	        <h3>动态示例</h3>
	        <p class="text-muted">提示：点击时间线创建时间点，时间点创建后可以拖动，点击时间点会弹出删除菜单。</p>
	        <div class="bs-example">
		      <div id="timeline_example3" style="min-height: 40px;"></div>
		    </div><!-- /example -->
			<div class="highlight">
				<pre>
// html
<br>
&lt;div id="timeline_example3"&gt;
<br>
<br>
// javascript
<br>
var timeline = new Timeline({
<br>
&nbsp;&nbsp;renderTo : 'timeline_example3',
<br>
&nbsp;&nbsp;startDate : '2013-06-23',
<br>
&nbsp;&nbsp;endDate : '2013-12-31'
<br>
});
				</pre>
			</div>
			
	        <h2 id="timeline_usage">用法</h2>
	        
			<h3>参数</h3>
		    <div class="table-responsive">
		      <table class="table table-bordered table-striped">
		        <thead>
		         <tr>
		           <th style="width: 100px;">名称</th>
		           <th style="width: 50px;">类型</th>
		           <th style="width: 100px;">默认值</th>
		           <th>描述</th>
		         </tr>
		        </thead>
		        <tbody>
		         <tr>
		           <td>size</td>
		           <td>String</td>
		           <td>'normal'</td>
		           <td>尺寸。<code>'normal'</code>或<code>'small'</code>。</td>
		         </tr>
		         <tr>
		           <td>dateFormat</td>
		           <td>String</td>
		           <td>'yyyy-MM-dd'</td>
		           <td>日期格式。<code>'yyyy-MM-dd'</code> or <code>'yyyy-MM-dd HH:mm:ss'</code>。</td>
		         </tr>
		         <tr>
		           <td>startDate</td>
		           <td>String</td>
		           <td></td>
		           <td>开始日期</td>
		         </tr>
		         <tr>
		           <td>endDate</td>
		           <td>String</td>
		           <td></td>
		           <td>结束日期。</td>
		         </tr>
		         <tr>
		           <td>readonly</td>
		           <td>Boolean</td>
		           <td></td>
		           <td>是否只读。缺少startDate或endDate时也会强制为只读状态。</td>
		         </tr>
		         <tr>
		           <td>value</td>
		           <td>String</td>
		           <td></td>
		           <td>初始值，逗号分隔的字符串。</td>
		         </tr>
		        </tbody>
		      </table>
		    </div><!-- /.table-responsive -->
		    
			<h3>方法</h3>
			<h4>void setStartDate(String startDate)</h4>
		    <p>修改开始日期。</p>
			<div class="highlight">
				<pre>
timeline.setStartDate('2014-01-14');
				</pre>
			</div>
			<h4>void setEndDate(String endDateString)</h4>
		    <p>修改结束日期。</p>
			<div class="highlight">
				<pre>
timeline.setEndDate('2014-07-14');
				</pre>
			</div>
			<h4>String getValue()</h4>
		    <p>返回组件的值，返回逗号分隔的字符串。</p>
			<div class="highlight">
				<pre>
console.info(timeline.getValue());
				</pre>
			</div>
			<h4>void setValue(String value)</h4>
		    <p>设置组件的值，接收逗号分隔的字符串。</p>
			<div class="highlight">
				<pre>
timeline.setValue('2014-02-14, 2014-05-01');
				</pre>
			</div>
	      </div>
	      
	      
	      <div class="bs-docs-section">
	        <div class="page-header">
	          <h1 id="gallery">画廊 <small>Gallery</small></h1>
	        </div>
	        <p class="lead">画廊将数据一条条地以块状显示，横向排列，就好像在展出艺术作品。</p>
	
	        <h2 id="gallery_base">基本画廊</h2>
	        <p>画廊的个性化需求很强，为了满足各种情况，画廊的基础功能是将数据（data）排列一个个画框（以下用item指代）</p>
	        
	        <h3>示例</h3>
		    <p>一个基本的画廊</p>
		    <div class="bs-example">
		      <div id="gallery_base_example" style="min-height: 336px;"></div>
		    </div><!-- /example -->
			<div class="highlight">
				<pre>
// html
<br>
&lt;div id="gallery_base_example"&gt;&lt;/div&gt;
<br>
<br>
// javascript
<br>
var Gallery = require('gallery');
<br>
<br>
(function() {
<br>
&nbsp;&nbsp;...
<br>
<br>
&nbsp;&nbsp;var emptyGallery = new Gallery({
<br>
&nbsp;&nbsp;&nbsp;&nbsp;renderTo : 'gallery_base_example',
<br>
&nbsp;&nbsp;&nbsp;&nbsp;cols : [4, 4, 4, 4],
<br>
&nbsp;&nbsp;&nbsp;&nbsp;itemHeight : 100,
<br>
&nbsp;&nbsp;&nbsp;&nbsp;data : [{
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"code" : "0"
<br>
&nbsp;&nbsp;&nbsp;&nbsp;}, {
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"code" : "1"
<br>
&nbsp;&nbsp;&nbsp;&nbsp;}, {
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"code" : "2"
<br>
&nbsp;&nbsp;&nbsp;&nbsp;}, ...],
<br>
&nbsp;&nbsp;&nbsp;&nbsp;reader : {
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;identifier : 'code'
<br>
&nbsp;&nbsp;&nbsp;&nbsp;}
<br>
&nbsp;&nbsp;});
<br>
<br>
&nbsp;&nbsp;...
<br>
}());
				</pre>
			</div>
			
			<h3>参数</h3>
		    <div class="table-responsive">
		      <table class="table table-bordered table-striped">
		        <thead>
		         <tr>
		           <th style="width: 100px;">名称</th>
		           <th style="width: 50px;">类型</th>
		           <th style="width: 100px;">默认值</th>
		           <th>描述</th>
		         </tr>
		        </thead>
		        <tbody>
		         <tr>
		           <td>border</td>
		           <td>Boolean</td>
		           <td></td>
		           <td>画廊是否显示边框</td>
		         </tr>
		         <tr>
		           <td>cols</td>
		           <td>Array</td>
		           <td></td>
		           <td>画廊的排列是遵从Bootstrap的栅格系统，cols数组中的4个元素依次表示在<strong>Extra small</strong>、<strong>Small</strong>、<strong>Medium</strong>和<strong>Large</strong>四种屏幕尺寸下，一行显示多少个item。</td>
		         </tr>
		         <tr>
		           <td>itemWidth</td>
		           <td>Number</td>
		           <td></td>
		           <td>item的宽。没有设置cols时，还会根据item宽度自动计算cols。</td>
		         </tr>
		         <tr>
		           <td>itemHeight</td>
		           <td>Number</td>
		           <td></td>
		           <td>item的高。</td>
		         </tr>
		         <tr>
		           <td>itemCls</td>
		           <td>String</td>
		           <td></td>
		           <td>item的自定义样式类，它会被自动添加到item的el上，方便使用者定制item的样式。</td>
		         </tr>
		         <tr>
		           <td>itemOverCls</td>
		           <td>String</td>
		           <td></td>
		           <td>鼠标悬停时item的自定义样式类，它会被自动添加到item的el上或移除，方便使用者定制鼠标悬停时item的样式。</td>
		         </tr>
		         <tr>
		           <td>hasAddItem</td>
		           <td>Boolean</td>
		           <td></td>
		           <td>是否包含一个用于创建的item。</td>
		         </tr>
		         <tr>
		           <td>addItemFront</td>
		           <td>Boolean</td>
		           <td></td>
		           <td>用于创建的item是否总在前面。</td>
		         </tr>
		         <tr>
		           <td>data</td>
		           <td>Array</td>
		           <td></td>
		           <td>初始化时的静态数据</td>
		         </tr>
		         <tr>
		           <td>dataUrl</td>
		           <td>String</td>
		           <td></td>
		           <td>远程数据的URL。dataUrl会被作为属性存储于实例中，还可以通过<code>load()</code>传入或覆盖。</td>
		         </tr>
		         <tr>
		           <td>params</td>
		           <td>Object</td>
		           <td></td>
		           <td>请求远程数据的额外参数。params会被作为属性存储于实例中，还可以通过<code>load()</code>传入或覆盖。</td>
		         </tr>
		         <tr>
		           <td>autoLoad</td>
		           <td>Boolean</td>
		           <td></td>
		           <td>初始化后是否自动加载远程数据。与data参数互斥，data参数优先。</td>
		         </tr>
		         <tr>
		           <td>reader</td>
		           <td>Object</td>
		           <td></td>
		           <td>数据读取设置，它需要指定一个参数：<br><strong>identifier</strong> String: item的id对应数据哪个属性，默认<code>'id'</code></td>
		         </tr>
		         <tr>
		           <td>multiSelect</td>
		           <td>Boolean</td>
		           <td></td>
		           <td>是否多选。</td>
		         </tr>
		        </tbody>
		      </table>
		    </div><!-- /.table-responsive -->
		    
			<h3>方法</h3>
			<h4>void load(Object option[, Boolean append])</h4>
		    <p>(重新)加载数据。</p>
			<div class="highlight">
				<pre>
var gallery = new Gallery(option);
<br>
gallery.load({
<br>
&nbsp;&nbsp;dataUrl: 'getData.mvc',
<br>
&nbsp;&nbsp;params: {
<br>
&nbsp;&nbsp;&nbsp;&nbsp;filter: 'today'
<br>
&nbsp;&nbsp;}
<br>
});
				</pre>
			</div>
			<p>append参数可以指定是否在不清空原有数据的情况下追加新的数据。</p>
			<h4>void clear()</h4>
		    <p>清空数据。</p>
			<div class="highlight">
				<pre>
gallery.clear();
				</pre>
			</div>
			<h4>void add(Object/Array items[, Number index])</h4>
		    <p>添加数据。</p>
			<div class="highlight">
				<pre>
<br>
gallery.add([
<br>
&nbsp;&nbsp;{code: 'A', b: true, ...},
<br>
&nbsp;&nbsp;{code: 'B', b: false, ...},
<br>
&nbsp;&nbsp;...
<br>
]);
				</pre>
			</div>
			<p>一次添加一条数据就用对象，多条数据就用数组。index参数可以指定新数据插入UI中的位置（从0开始）</p>
			<h4>void remove(Object/String/Number item)</h4>
		    <p>删除数据。</p>
			<div class="highlight">
				<pre>
var selectedItems = gallery.getSelectedItems();
<br>
gallery.remove(selectedItems[0]);// 通过item对象
<br>
gallery.remove(selectedItems[0].id);// 通过item的id
<br>
gallery.remove(0);// 通过UI中的位置（从0开始）
				</pre>
			</div>
			<h4>void select(Object/String/Number/Array items[, Boolean keep])</h4>
		    <p>选中数据。</p>
			<div class="highlight">
				<pre>
gallery.select(item);// 通过item对象
<br>
gallery.select('B');// 通过item的id
<br>
gallery.select(1);// 通过UI中的位置（从0开始）
				</pre>
			</div>
			<p>keep参数可以指定是否保持选中先前的选中项，多选（<code>multiSelect : true</code>）时有效。</p>
			<h4>Array getSelectedItems()</h4>
		    <p>获取被选中item对象。</p>
			<div class="highlight">
				<pre>
var selectedItems = gallery.getSelectedItems();
<br>
console.info(getSelectedItems.length);
				</pre>
			</div>
			<h4>void getItem(String/Number/Object item)</h4>
		    <p>获取item对象。</p>
			<div class="highlight">
				<pre>
var item = gallery.getItem('B');// 通过item的id
<br>
var item = gallery.getItem(1);// 通过UI中的位置（从0开始）
<br>
var item = gallery.getItem(itemB);// 通过item对象，返回item对象本身
				</pre>
			</div>
			<h4>void getItemData(String/Number/Object item)</h4>
		    <p>获取item数据。</p>
			<div class="highlight">
				<pre>
var data = gallery.getItemData('B');// 通过item的id
<br>
var data = gallery.getItemData(1);// 通过UI中的位置（从0开始）
<br>
var data = gallery.getItemData(itemB);// 通过item对象，返回item对象本身
				</pre>
			</div>
			<h4>Array getData()</h4>
		    <p>获取所有数据。</p>
			<div class="highlight">
				<pre>
var data = gallery.getData();
<br>
console.info(data.lenght);
				</pre>
			</div>
		    
			<h3>事件</h3>
		    <div class="table-responsive">
		      <table class="table table-bordered table-striped">
		        <thead>
		         <tr>
		           <th style="width: 100px;">事件类型</th>
		           <th style="width: 200px;">监听函数</th>
		           <th>描述</th>
		         </tr>
		        </thead>
		        <tbody>
		         <tr>
		           <td>load</td>
		           <td>function(Gallery g, Object/Array data)</td>
		           <td>数据加载完成后的事件。</td>
		         </tr>
		         <tr>
		           <td>beforeadd</td>
		           <td>function(Gallery g, Object data, String id, Boolean isAdd)</td>
		           <td>执行添加item操作前的事件，返回false将终止添加操作。</td>
		         </tr>
		         <tr>
		           <td>add</td>
		           <td>function(Gallery g, Object item, String id, Boolean isAdd)</td>
		           <td>添加item完成后的事件。</td>
		         </tr>
		         <tr>
		           <td>beforeremove</td>
		           <td>function(Gallery g, Object item, String id, Boolean isAdd)</td>
		           <td>执行删除item操作前的事件，返回false将终止删除操作。</td>
		         </tr>
		         <tr>
		           <td>remove</td>
		           <td>function(Gallery g, Object item, String id, Boolean isAdd)</td>
		           <td>删除item完成后的事件。</td>
		         </tr>
		         <tr>
		           <td>itemrender</td>
		           <td>function(Gallery g, Object item, String id, Boolean isAdd)</td>
		           <td>item渲染完成后的事件。isAdd参数表明此item是否是用于创建的item，下同。</td>
		         </tr>
		         <tr>
		           <td>itemmouseover</td>
		           <td>function(Gallery g, Object item, String id, Boolean isAdd, Event e)</td>
		           <td>鼠标悬停在item时的事件。e参数是jQuery浏览器事件对象，下同。</td>
		         </tr>
		         <tr>
		           <td>itemmouseout</td>
		           <td>function(Gallery g, Object item, String id, Boolean isAdd, Event e)</td>
		           <td>鼠标移出item时的事件。</td>
		         </tr>
		         <tr>
		           <td>itemclick</td>
		           <td>function(Gallery g, Object item, String id, Boolean isAdd, Event e)</td>
		           <td>点击item时的事件。</td>
		         </tr>
		         <tr>
		           <td>beforeitemdestroy</td>
		           <td>function(Gallery g, Object item, String id, Boolean isAdd)</td>
		           <td>执行销毁item操作前的事件，返回false将终止销毁操作。</td>
		         </tr>
		         <tr>
		           <td>itemdestroy</td>
		           <td>function(Gallery g, Object item, String id, Boolean isAdd)</td>
		           <td>销毁item完成后的事件。</td>
		         </tr>
		        </tbody>
		      </table>
		    </div><!-- /.table-responsive -->
		    
			<h3 id='component_item'>item对象</h3>
		    <p>前文提到了item对象，这里解释一下：每条数据对应产生一个item，item是连接数据与UI对象的桥梁，也是操作和扩展的入口。</p>
		    
			<h3>item的属性</h3>
		    <div class="table-responsive">
		      <table class="table table-bordered table-striped">
		        <thead>
		         <tr>
		           <th style="width: 100px;">名称</th>
		           <th style="width: 50px;">类型</th>
		           <th>描述</th>
		         </tr>
		        </thead>
		        <tbody>
		         <tr>
		           <td>id</td>
		           <td>String</td>
		           <td>item的唯一标识，只读。通过reader参数的identifier指定从数据的哪个属性获取。如果没有获取到，则自动生成。</td>
		         </tr>
		         <tr>
		           <td>el</td>
		           <td>Object</td>
		           <td>item的jQuery对象。</td>
		         </tr>
		        </tbody>
		      </table>
		    </div><!-- /.table-responsive -->
		    
	        <h2 id="gallery_customization">定制</h2>
	        
	        <h3>示例1</h3>
		    <p>一个项目的列表</p>
		    <div class="bs-example">
		      <div id="gallery_customization_example" style="min-height: 460px;"></div>
		    </div><!-- /example -->
			<div class="highlight">
				<pre>
// html
<br>
&lt;div id="gallery_customization_example"&gt;&lt;/div&gt;
<br>
<br>
// css
<br>
.project-gallery-item {
<br>
&nbsp;&nbsp;-webkkit-border-radius: 3px;
<br>
&nbsp;&nbsp;-moz-border-radius: 3px;
<br>
&nbsp;&nbsp;border-radius: 3px;
<br>
&nbsp;&nbsp;padding: 6px 23px;
<br>
}
<br>
<br>
.project-gallery-item.yi-gallery-item {
<br>
&nbsp;&nbsp;margin-bottom: 20px;
<br>
}
<br>
<br>
.project-gallery-item .project-gallery-name {
<br>
&nbsp;&nbsp;text-align: left; /* override */
<br>
&nbsp;&nbsp;color: #428BCA;
<br>
}
<br>
<br>
.project-gallery-item .project-gallery-status {
<br>
&nbsp;&nbsp;text-align: right; /* override */
<br>
}
<br>
<br>
.project-gallery-item .project-gallery-tools {
<br>
&nbsp;&nbsp;margin-top: 9px;
<br>
&nbsp;&nbsp;text-align: left; /* override */
<br>
}
<br>
<br>
.project-gallery-item .project-gallery-tools .btn {
<br>
&nbsp;&nbsp;margin-right: 15px;
<br>
&nbsp;&nbsp;padding: 6px 8px; /* override */
<br>
&nbsp;&nbsp;width: 32px; /* override */
<br>
&nbsp;&nbsp;height: 32px; /* override */
<br>
}
<br>
<br>
.project-gallery-item .project-gallery-timeline {
<br>
&nbsp;&nbsp;margin-top: 5px;
<br>
}
<br>
<br>
.project-gallery-item .project-gallery-manager {
<br>
&nbsp;&nbsp;margin-top: 12px;
<br>
&nbsp;&nbsp;text-align: left /* override */
<br>
}
<br>
<br>
.project-gallery-item .project-gallery-manager .btn {
<br>
&nbsp;&nbsp;padding: 0;
<br>
&nbsp;&nbsp;width: 34px; /* override */
<br>
&nbsp;&nbsp;height: 34px; /* override */
<br>
}
<br>
<br>
.project-gallery-item .project-gallery-manager .btn .project-manager-face
<br>
&nbsp;&nbsp;{
<br>
&nbsp;&nbsp;width: 32px;
<br>
&nbsp;&nbsp;height: 32px;
<br>
}
<br>
<br>
.project-gallery-item .project-gallery-ip {
<br>
&nbsp;&nbsp;margin-top: 12px;
<br>
&nbsp;&nbsp;text-align: left; /* override */
<br>
}
<br>
<br>
.project-gallery-item .project-gallery-ip p {
<br>
&nbsp;&nbsp;margin-bottom: 0; /* override */
<br>
}
<br>
<br>
.project-gallery-item .project-gallery-syn {
<br>
&nbsp;&nbsp;margin-top: 22px; /* 12 + 20 / 2 */
<br>
&nbsp;&nbsp;text-align: right; /* override */
<br>
}
<br>
<br>
.project-gallery-item .project-gallery-syn .btn {
<br>
&nbsp;&nbsp;padding-left: 12px; /* override */
<br>
&nbsp;&nbsp;padding-right: 12px; /* override */
<br>
}
<br>
<br>
.project-gallery-item .row {
<br>
&nbsp;&nbsp;margin: 0;
<br>
}
<br>
<br>
// javascript
<br>
require('./resources/project-gallery.css');
<br>
<br>
var PROJECT_STATUS = {
<br>
&nbsp;&nbsp;'active' : '（开发中）',
<br>
&nbsp;&nbsp;'closed' : '（已结束）'
<br>
};
<br>
var formatter = new DateFormat('yyyy-MM-dd');
<br>
<br>
function renderProject(g, item, id, isAdd) {
<br>
&nbsp;&nbsp;var data = this.getItemData(id);
<br>
<br>
&nbsp;&nbsp;var timelineId = data.code + '_timeline';
<br>
<br>
&nbsp;&nbsp;item.el.html(
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// row 1
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'&lt;div class="row"&gt;'
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ '&lt;div class="project-gallery-name col-xs-6"&gt;'
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ data.name
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ '&lt;/div&gt;'
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ '&lt;div class="project-gallery-status col-xs-6"&gt;'
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ '&lt;a href="javascript:void(0)"&gt;'
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ (PROJECT_STATUS[data.status] || '')
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ '&lt;/a&gt;'
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ '&lt;/div&gt;'
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ '&lt;/div&gt;'
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// row 2
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ '&lt;div class="row"&gt;'
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ '&lt;div class="project-gallery-tools col-md-12"&gt;'
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ '&lt;button type="button" class="btn btn-default"&gt;'
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ '&lt;span class="glyphicon glyphicon-inbox"&gt;&lt;/span&gt;'
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ '&lt;/button&gt;'
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ '&lt;button type="button" class="btn btn-default"&gt;'
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ '&lt;span class="glyphicon glyphicon-book"&gt;&lt;/span&gt;'
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ '&lt;/button&gt;'
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ '&lt;button type="button" class="btn btn-default"&gt;'
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ '&lt;span class="glyphicon glyphicon-briefcase"&gt;&lt;/span&gt;'
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ '&lt;/button&gt;'
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ '&lt;/div&gt;'
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ '&lt;/div&gt;'
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// row 3
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ '&lt;div class="row"&gt;'
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ '&lt;div class="project-gallery-timeline col-md-12"&gt;'
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ '&lt;div id="'
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ timelineId
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ '" class="yi-timeline yi-timeline-sm"&gt;'
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ '&lt;div class="yi-timeline-axis"&gt;&lt;/div&gt;'
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ '&lt;div class="yi-timeline-start"&gt;'
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ data.startDate
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ '&lt;/div&gt;'
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ '&lt;div class="yi-timeline-end"&gt;'
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ data.endDate
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ '&lt;/div&gt;'
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ '&lt;/div&gt;'
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ '&lt;/div&gt;'
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ '&lt;/div&gt;'
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// row 4
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ '&lt;div class="row"&gt;'
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ '&lt;div class="project-gallery-manager col-md-12"&gt;'
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ '&lt;button type="button" class="btn btn-default"&gt;&lt;img class="project-manager-face" src="'
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ (data.manager
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;? data.manager.face
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: 'resources/images/32_32/project_manager_face.png')// 循环
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ '"&gt;&lt;/img&gt;&lt;/button&gt;'
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ '&lt;/div&gt;'
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ '&lt;/div&gt;'
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// row 5
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ '&lt;div class="row"&gt;'
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ '&lt;div class="project-gallery-ip col-xs-6"&gt;'
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ '&lt;p&gt;平台主IP：&lt;/p&gt;'
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ '&lt;p&gt;&lt;a href="javascript:void(0)"&gt;'
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ data.ip
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ '&lt;/a&gt;&lt;/p&gt;'
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ '&lt;/div&gt;'
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ '&lt;div class="project-gallery-syn col-xs-6"&gt;'
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ '&lt;button type="button" class="btn btn-default btn-xs"&gt;'
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ '&lt;span class="glyphicon glyphicon-refresh"&gt;&lt;/span&gt; 同步'
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ '&lt;/button&gt;'
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ '&lt;/div&gt;' + '&lt;/div&gt;');
<br>
<br>
&nbsp;&nbsp;item.timeline = new Timeline({
<br>
&nbsp;&nbsp;&nbsp;&nbsp;applyTo : timelineId,
<br>
&nbsp;&nbsp;&nbsp;&nbsp;startDate : data.startDate ? data.startDate.substring(0, 10) : null,
<br>
&nbsp;&nbsp;&nbsp;&nbsp;endDate : data.endDate ? data.endDate.substring(0, 10) : null,
<br>
&nbsp;&nbsp;&nbsp;&nbsp;value : formatter.format(new Date()),
<br>
&nbsp;&nbsp;&nbsp;&nbsp;readonly : true
<br>
&nbsp;&nbsp;});
<br>
}
<br>
<br>
function destroyProject(g, item, id, isAdd) {
<br>
&nbsp;&nbsp;if (item.timeline) {
<br>
&nbsp;&nbsp;&nbsp;&nbsp;item.timeline.destroy();
<br>
&nbsp;&nbsp;&nbsp;&nbsp;delete item.timeline;
<br>
&nbsp;&nbsp;}
<br>
}
<br>
<br>
(function() {
<br>
&nbsp;&nbsp;&nbsp;&nbsp;...
<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;var projectGallery = new Gallery({
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;applyTo : 'gallery_customization_example',
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cols : [1, 1, 2, 2],
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;itemCls : 'project-gallery-item',
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dataUrl : 'data/project-gallery-data.json',
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;params : {
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;status : 'active'
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;autoLoad : true,
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;reader : {
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;identifier : 'code'
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;listeners : {
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'itemrender' : {
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fn : renderProject
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'beforeitemdestroy' : {
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fn : destroyProject
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;});
<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;...
<br>
}());
				</pre>
			</div>
	        
	        <h3>示例2</h3>
		    <p>一个目录的列表</p>
		    <div class="bs-example">
		      <div class="row">
		      	<div id="gallery_customization_example2" class="col-md-6" style="min-height: 100px;"></div>
		      </div>
		      <div class="row">
		      	<div class="yi-form-element form-group col-md-8">
		      		<label class="yi-form- sr-only">名称</label>
		      		<div class="yi-form-input-wrap">
		      			<input class="form-control" type="text" name="dir_name" placeholder="请输入名称" />
	      			</div>
				</div>
				<div class="col-md-4">
					<button id="gallery_customization_example2_add_btn" type="button" class="btn btn-primary">添加</button>
				</div>
		      </div>
		    </div><!-- /example -->
			<div class="highlight">
				<pre>
// html
<br>
&lt;div class="row"&gt;
<br>
&nbsp;&nbsp;&lt;div id="gallery_customization_example2" class="col-md-6"&gt;&lt;/div&gt;
<br>
&lt;/div&gt;
<br>
&lt;div class="row"&gt;
<br>
&nbsp;&nbsp;&lt;div class="yi-form-element form-group col-md-8"&gt;
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&lt;label class="yi-form-label sr-only"&gt;名称&lt;/label&gt;
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&lt;div class="yi-form-input-wrap"&gt;
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;input class="form-control" type="text" name="dir_name" placeholder="请输入名称" /&gt;
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;
<br>
&nbsp;&nbsp;&lt;/div&gt;
<br>
&nbsp;&nbsp;&lt;div class="col-md-4"&gt;
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&lt;button id="gallery_customization_example2_add_btn" type="button" class="btn btn-primary"&gt;添加&lt;/button&gt;
<br>
&nbsp;&nbsp;&lt;/div&gt;
<br>
&lt;/div&gt;
<br>
<br>
// css
<br>
.yi-gallery-item.dir-gallery-item {
<br>
&nbsp;&nbsp;height: 30px;
<br>
&nbsp;&nbsp;margin-bottom: 20px;
<br>
&nbsp;&nbsp;border: 1px solid #b3d8ec;
<br>
&nbsp;&nbsp;-webkkit-border-radius: 6px;
<br>
&nbsp;&nbsp;-moz-border-radius: 6px;
<br>
&nbsp;&nbsp;border-radius: 6px;
<br>
&nbsp;&nbsp;padding-top: 4px;
<br>
&nbsp;&nbsp;padding-bottom: 4px;
<br>
&nbsp;&nbsp;background-color: #d4e9f4;
<br>
&nbsp;&nbsp;color: #2b74b4;
<br>
&nbsp;&nbsp;text-align: center;
<br>
}
<br>
<br>
.yi-gallery-item.yi-gallery-item-selected.dir-gallery-item {
<br>
&nbsp;&nbsp;background-color: #85bff1;
<br>
&nbsp;&nbsp;border-color: #61a8e5;
<br>
&nbsp;&nbsp;color: white;
<br>
}
<br>
<br>
// javascript
<br>
require('./resources/dir-gallery.css');
<br>
var utils = require('utils');
<br>
var Button = require('button');
<br>
<br>
function renderDir(g, item, id, isAdd) {
<br>
&nbsp;&nbsp;item.el.html(this.getItemData(id).name);
<br>
}
<br>
<br>
function addDir() {
<br>
&nbsp;&nbsp;var $input = $('input[name="dir_name"]');
<br>
&nbsp;&nbsp;var val = $input.val();
<br>
&nbsp;&nbsp;if (!utils.isEmpty(val)) {
<br>
&nbsp;&nbsp;&nbsp;&nbsp;this.add({
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name : val
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;});
<br>
&nbsp;&nbsp;}
<br>
&nbsp;&nbsp;$input.val('');
<br>
&nbsp;&nbsp;$input = null;
<br>
}
<br>
<br>
(function() {
<br>
&nbsp;&nbsp;...
<br>
<br>
&nbsp;&nbsp;var dirGallery = new Gallery({
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;renderTo : 'gallery_customization_example2',
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cols : [3, 3, 3, 3],
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;itemCls : 'dir-gallery-item',
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dataUrl : 'data/dir-gallery-data.json',
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;params : {
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;project : 'PROJECTCODE'
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;autoLoad : true,
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;reader : {
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;identifier : 'code'
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;listeners : {
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'itemrender' : {
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fn : renderDir
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}
<br>
&nbsp;&nbsp;&nbsp;&nbsp;});
<br>
<br>
&nbsp;&nbsp;var dirAddBtn = new Button({
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;applyTo : 'gallery_customization_example2_add_btn',
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;listeners : {
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'click' : {
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fn : addDir,
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;scope : dirGallery
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}
<br>
&nbsp;&nbsp;&nbsp;&nbsp;});
<br>
<br>
&nbsp;&nbsp;...
<br>
}());
				</pre>
			</div>
	
	        <h2 id="image_gallery">相册 <small>ImageGallery</small></h2>
	        <p>相册是一种特殊的画廊，它将每条数据以上部图片和下部标题展现，使用者直接指定数据中的图片路径和标题来源，简单快捷。</p>
	        
	        <h3>示例</h3>
		    <p>一个资源的列表</p>
		    <div class="bs-example">
		      <div id="image_gallery_example" style="min-height: 471px;"></div>
		    </div><!-- /example -->
			<div class="highlight">
				<pre>
// html
<br>
&lt;div id="image_gallery_example"&gt;&lt;/div&gt;
<br>
<br>
// javascript
<br>
var ImageGallery = require('image-gallery');
<br>
<br>
function getSrc(g, item, id, data, isAdd) {
<br>
&nbsp;&nbsp;return isAdd ? 'resources/images/100_120/add.png' : 'resources/images/100_120/bp.png';
<br>
}
<br>
<br>
function getTitle(g, item, id, data, isAdd) {
<br>
&nbsp;&nbsp;return isAdd ? '创建' : data.name;
<br>
}
<br>
<br>
(function() {
<br>
&nbsp;&nbsp;...
<br>
<br>
&nbsp;&nbsp;var resourceGallery = new ImageGallery({
<br>
&nbsp;&nbsp;&nbsp;&nbsp;renderTo : 'image_gallery_example',
<br>
&nbsp;&nbsp;&nbsp;&nbsp;cols : [2, 3, 4, 6],
<br>
&nbsp;&nbsp;&nbsp;&nbsp;itemCls : 'resource-gallery-item',
<br>
&nbsp;&nbsp;&nbsp;&nbsp;imageWidth : 100,
<br>
&nbsp;&nbsp;&nbsp;&nbsp;imageHeight : 120,
<br>
&nbsp;&nbsp;&nbsp;&nbsp;hasAddItem : true,
<br>
&nbsp;&nbsp;&nbsp;&nbsp;addItemFront : true,
<br>
&nbsp;&nbsp;&nbsp;&nbsp;dataUrl : 'data/image-gallery-data.json',
<br>
&nbsp;&nbsp;&nbsp;&nbsp;autoLoad : true,
<br>
&nbsp;&nbsp;&nbsp;&nbsp;reader : {
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;identifier : 'code',
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;srcProperty : getSrc,
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;titleProperty : getTitle
<br>
&nbsp;&nbsp;&nbsp;&nbsp;}
<br>
&nbsp;&nbsp;});
<br>
<br>
&nbsp;&nbsp;...
<br>
}());
				</pre>
			</div>
			
			<h3>参数</h3>
		    <div class="table-responsive">
		      <table class="table table-bordered table-striped">
		        <thead>
		         <tr>
		           <th style="width: 100px;">名称</th>
		           <th style="width: 50px;">类型</th>
		           <th style="width: 100px;">默认值</th>
		           <th>描述</th>
		         </tr>
		        </thead>
		        <tbody>
		         <tr>
		           <td>reader</td>
		           <td>Object</td>
		           <td></td>
		           <td>数据读取设置，它需要指定以下三个参数：<br><strong>identifier</strong> String: item的id对应数据哪个属性，默认<code>'id'</code><br><strong>srcProperty</strong> String/Function: 图片的src对应数据哪个属性<br><strong>titleProperty</strong> String/Function : 图片的标题对应数据哪个属性</td>
		         </tr>
		         <tr>
		           <td>defaultSrc</td>
		           <td>String</td>
		           <td>''</td>
		           <td>数据中找不到src对应的属性则使用它作为图片的src</td>
		         </tr>
		         <tr>
		           <td>defaultTitle</td>
		           <td>String</td>
		           <td>'Title'</td>
		           <td>数据中找不到title对应的属性则使用它作为标题</td>
		         </tr>
		         <tr>
		           <td>hideTitle</td>
		           <td>Boolean</td>
		           <td></td>
		           <td>是否隐藏标题</td>
		         </tr>
		         <tr>
		           <td>imageWidth</td>
		           <td>Number</td>
		           <td></td>
		           <td>图片宽度。</td>
		         </tr>
		         <tr>
		           <td>imageHeight</td>
		           <td>Number</td>
		           <td></td>
		           <td>图片高度。</td>
		         </tr>
		        </tbody>
		      </table>
		    </div><!-- /.table-responsive -->
		    
			<h3>方法</h3>
			<h4>void setTitle(String/Number/Object item, String title)</h4>
		    <p>修改item的标题。</p>
			<div class="highlight">
				<pre>
resourceGallery.setTitle(item, '分派二线');// 通过item对象
<br>
resourceGallery.setTitle('assignToLine2', '分派二线');// 通过item的id
<br>
resourceGallery.setTitle(2, '分派二线');// 通过UI中的位置（从0开始）
				</pre>
			</div>
	      </div>
	      
	      
	      <!-- 画廊（完） ，带图单选组开始-->
	      <div class="bs-docs-section">
	          <div class='page-header'>
		          <h1 id="graph_radio_group">带图单选组 <small>graph-radio-group</small></h1>
		          <p class="lead">带图单选组丰富了单选按钮组的样式，能够在按钮的四周放置任意大小的图片。</p>
	          </div>
	          
	          <h2 id="graph_radio_group_example_two">示例</h2>
	          <div class="bs-example">
		          <div class="graph-radio-group-example-two" style="min-height: 125px;">
			          <div id="graph_radio_group_example_custom">
			              <label class="radio-inline"><input type="radio" name="a" checked/></label>
						  <label class="radio-inline"><input type="radio" name="a"/></label>
						  <label class="radio-inline"><input type="radio" name="a"/></label>
			              <label class="radio-inline"><input type="radio" name="a"/></label>
			          </div>
			      </div>
		      </div>
		      
		      <div class="highlight">
				<pre>
// html
<br>
&lt;div id="graph_radio_group_example_custom"&gt;
<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&lt;label class="radio-inline"&gt;&lt;input type="radio" name="a" checked/&gt;&lt;/label&gt;
<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&lt;label class="radio-inline"&gt;&lt;input type="radio" name="a"/&gt;&lt;/label&gt;
<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&lt;label class="radio-inline"&gt;&lt;input type="radio" name="a"/&gt;&lt;/label&gt;
<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&lt;label class="radio-inline"&gt;&lt;input type="radio" name="a"/&gt;&lt;/label&gt;
<br/>
&lt;/div&gt;
<br>
<br>
//css
<br>
.yi-component-demo-radio-group-graph{
<br/>
&nbsp;&nbsp;&nbsp;&nbsp;border: 1px solid #DDDDDD;
<br/>
&nbsp;&nbsp;&nbsp;&nbsp;padding: 20px 50px;
<br>
}
<br>
<br>
// javascript
<br>
require('./resources/graph-radio-group.css');
<br>
var GraphRadioGroup = require('graph-radio-group');
<br>
<br>
var onRadioItemRender = function(comp, $ct, data) {
<br>
&nbsp;&nbsp;&nbsp;&nbsp;$ct.html('&lt;p&gt;' + data.text + '&lt;/p&gt;&lt;img src=' + data.url + '/&gt;')
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.addClass('yi-component-demo-radio-group-graph');
<br>
}
<br>
<br>
(function() {
<br>
&nbsp;&nbsp;...
<br>
<br>
&nbsp;&nbsp;var graphRadioGroup = new GraphRadioGroup({
<br>
&nbsp;&nbsp;&nbsp;&nbsp;applyTo : 'graph_radio_group_example_custom',
<br>
&nbsp;&nbsp;&nbsp;&nbsp;margin : 50,
<br>
&nbsp;&nbsp;&nbsp;&nbsp;region : "north",
<br>
&nbsp;&nbsp;&nbsp;&nbsp;data : [{
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;text : '集中开发',
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;url : 'resources/images/graph_radio_group/centralize.png'
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}, {
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;text : '分散开发',
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;url : 'resources/images/graph_radio_group/separate.png'
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}, {
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;text : '自由开发',
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;url : 'resources/images/graph_radio_group/free.png'
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}, {
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;text : '个人开发',
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;url : 'resources/images/graph_radio_group/individual.png'
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}],
<br>
&nbsp;&nbsp;&nbsp;&nbsp;listeners : {
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'itemrender' : onRadioItemRender
<br>
&nbsp;&nbsp;&nbsp;&nbsp;}
<br>
&nbsp;&nbsp;});
<br>
<br>
&nbsp;&nbsp;...
<br>
}());
				</pre>
			</div>
			<h3>参数</h3>
		    <div class="table-responsive">
		      <table class="table table-bordered table-striped">
		        <thead>
		         <tr>
		           <th style="width: 100px;">名称</th>
		           <th style="width: 50px;">类型</th>
		           <th style="width: 100px;">默认值</th>
		           <th>描述</th>
		         </tr>
		        </thead>
		        <tbody>
		         <tr>
		           <td>region</td>
		           <td>String</td>
		           <td>'north'</td>
		           <td>按钮的内容显示在按钮的哪个方向，可取值为<code>'north'</code>, <code>'south'</code>, <code>'east'</code>, <code>'west'</code></td>
		         </tr>
		         <tr>
		           <td>margin</td>
		           <td>Number</td>
		           <td>0</td>
		           <td>item间的间隔。有关<strong>item</strong>的解释，请参考<a href='#component_item'>item对象</a></td>
		         </tr>
		         <tr>
		           <td>data</td>
		           <td>Array</td>
		           <td></td>
		           <td>初始化时的静态数据</td>
		         </tr>
		        </tbody>
		      </table>
		    </div> 
		    <h3>方法</h3>
	        <h3>事件</h3> 
	         <div class="table-responsive">
		      <table class="table table-bordered table-striped">
		        <thead>
		         <tr>
		           <th style="width: 100px;">事件类型</th>
		           <th style="width: 200px;">监听函数</th>
		           <th>描述</th>
		         </tr>
		        </thead>
		        <tbody>
		         <tr>
		           <td>itemrender</td>
		           <td>function(GraphRadioGroup g, jqObject $item, Object data)</td>
		           <td>item渲染完成后的事件。用于自定义$item的内容。</td>
		         </tr>
		        </tbody>
		      </table>
		    </div>
	      </div>
	      
	      <!-- 带图单选组（完） ，模态窗口开始-->
	      <div class="bs-docs-section">
	          <div class='page-header'>
				<h1 id="modal_window">模态窗口 <small>modal-window</small></h1>
				<p class="lead">模态窗口。</p>
	          </div>
	           <h2 id="modal_window_example_one">示例</h2>
	                           点击下面的按钮即可通过JavaScript启动一个模态框。此模态框将从上到下、逐渐浮现到页面前。
	           <div class="bs-example">
	               <button id='window_example_one_btn' class='btn btn-primary btn-lg'>Launch demo modal</button>
	               <div id='modal_window_example_first'></div>
	           </div>
	           <div class="highlight">
				<pre>// html
<br>
&lt;div id='modal_window_example_first'&gt;
<br/>&lt;/div&gt;
<br>
<br>
// javascript
<br>
var ModalWindow = require('modal-window');
<br>
<br>
function handler(){
<br>
&nbsp;&nbsp;&nbsp;&nbsp;this.hide();
<br>
}
<br>
<br>
(function() {
<br>
&nbsp;&nbsp;...
<br>
<br>
&nbsp;&nbsp;var win = new ModalWindow({
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;renderTo : 'modal_window_example_first',
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;url : 'html/modal_win_example.html',
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;title : 'Modal Heading',
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;height: 500,
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;buttons : [{
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;text : 'close',
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;disabled : false,
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;handler : handler
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}, {
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;text : 'save',
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cls : 'btn-primary'
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}]
<br>
&nbsp;&nbsp;});
<br>
<br>
&nbsp;&nbsp;...
<br>
}());
				</pre>
			</div>
			
	        <h2 id="modal_window_usage">用法</h2>
	        
			<h3>参数</h3>
		    <div class="table-responsive">
		      <table class="table table-bordered table-striped">
		        <thead>
		         <tr>
		           <th style="width: 100px;">名称</th>
		           <th style="width: 50px;">类型</th>
		           <th style="width: 100px;">默认值</th>
		           <th>描述</th>
		         </tr>
		        </thead>
		        <tbody>
		         <tr>
		           <td>title</td>
		           <td>String</td>
		           <td></td>
		           <td>窗口的标题</td>
		         </tr>
		         <tr>
		           <td>width</td>
		           <td>Number</td>
		           <td></td>
		           <td>窗口宽度</td>
		         </tr>
		         <tr>
		           <td>height</td>
		           <td>Number</td>
		           <td></td>
		           <td>窗口高度</td>
		         </tr>
		         <tr>
		           <td>minHeight</td>
		           <td>Number</td>
		           <td></td>
		           <td>窗口的最小高度</td>
		         </tr>
		         <tr>
		           <td>maxHeight</td>
		           <td>Number</td>
		           <td></td>
		           <td>窗口的最大高度</td>
		         </tr>
		         <tr>
		           <td>scroll</td>
		           <td>Boolean</td>
		           <td></td>
		           <td>窗口的内容溢出是否显示滚动条</td>
		         </tr>
		         <tr>
		           <td>url</td>
		           <td>String</td>
		           <td></td>
		           <td>请求的页面地址</td>
		         </tr>
		         <tr>
		           <td>params</td>
		           <td>Object</td>
		           <td></td>
		           <td>额外的参数</td>
		         </tr>
		         <tr>
		           <td>buttons</td>
		           <td>Array</td>
		           <td></td>
		           <td>显示在窗口底部的按钮。每个按钮的属性包括：<br><strong>id</strong> String: 按钮的id<br><strong>cls</strong> String: 按钮的样式<br><strong>disabled</strong> Boolean: 是否不可用<br><strong>hidden</strong> Boolean: 是否隐藏<br><strong>text</strong> String: 按钮的文字<br><strong>handler</strong> Function: 点击按钮时的处理方法</td>
		         </tr>
		         <tr>
		           <td>modal</td>
		           <td>Boolean</td>
		           <td>true</td>
		           <td>窗口是否带遮罩</td>
		         </tr>
		        </tbody>
		      </table>
		    </div> 
	        <h3>方法</h3>
	        <h4>void load(Object option)</h4>
	        <p>(重新)加载页面</p>
	        <div class='highlight'><pre>
	        
	        var win = new ModalWindow(option);
			<br>win.load({ dataUrl: 'getData.mvc', params: { id: 'today'})
		    </pre>
			</div>
			 <h4>void show()</h4>
	        <p>显示窗口</p>
	        <div class='highlight'><pre>
			win.show();
		    </pre></div>
		    <h4>void hide()</h4>
	        <p>隐藏窗口</p>
	        <div class='highlight'><pre>
			win.hide();
		    </pre> </div>
	        <h3>事件</h3>
	        <div class="table-responsive">
		      <table class="table table-bordered table-striped">
		        <thead>
		         <tr>
		           <th style="width: 100px;">事件类型</th>
		           <th style="width: 200px;">监听函数</th>
		           <th>描述</th>
		         </tr>
		        </thead>
		        <tbody>
		         <tr>
		           <td>beforeshow</td>
		           <td>function(modalWindow win)</td>
		           <td>执行显示操作前的事件，返回false将终止显示操作。</td>
		         </tr>
		         <tr>
		           <td>show</td>
		           <td>function(modalWindow win)</td>
		           <td>显示完成后的事件。</td>
		         </tr>
		         <tr>
		           <td>beforehide</td>
		           <td>function(modalWindow win)</td>
		           <td>执行隐藏操作前的事件，返回false将终止隐藏操作。</td>
		         </tr>
		         <tr>
		           <td>hide</td>
		           <td>function(modalWindow win)</td>
		           <td>隐藏完成后的事件。</td>
		         </tr>
		         <tr>
		           <td>load</td>
		           <td>function(ModalWindow win, String responseText, String textStatus, XMLHttpRequest xhr)</td>
		           <td>页面加载完成后的事件。</td>
		         </tr>
		        </tbody>
		      </table>
		    </div>
	      </div>
	      
	      
	      <!-- 模态窗口（完） ，轮播开始-->
	      <div class="bs-docs-section">
	          <div class='page-header'>
		          <h1 id="carousel">轮播 <small>carousel</small></h1>
		      </div>
		      
	          <h2 id="carousel_example_two">示例</h2>
	          <div class='bs-example'>
	              <div id='carousel_example_base' style="min-height: 300px;"></div>
	          </div>
	          <div class="highlight">
				<pre>// html
<br>
&lt;div id='carousel_example_base'&gt;
<br/>&lt;/div&gt;
<br>
<br>
//css
<br>.yi-component-demo-carousel-name{
<br>&nbsp;&nbsp;&nbsp;&nbsp;position: absolute;
<br>&nbsp;&nbsp;&nbsp;&nbsp;top: 50%;
<br>&nbsp;&nbsp;&nbsp;&nbsp;left: 50%;
<br>&nbsp;&nbsp;&nbsp;&nbsp;margin-left: -50%;
<br>&nbsp;&nbsp;&nbsp;&nbsp;width: 100%;
<br>&nbsp;&nbsp;&nbsp;&nbsp;opacity: 0.7;
<br>&nbsp;&nbsp;&nbsp;&nbsp;filter: alpha(opacity = 70);
<br>&nbsp;&nbsp;&nbsp;&nbsp;color: #ffffff;
<br>&nbsp;&nbsp;&nbsp;&nbsp;padding: 6px;
<br>&nbsp;&nbsp;&nbsp;&nbsp;font-size: 25px;
<br>}
<br>
// javascript
<br>
require('./resources/carousel.css');
<br>
var Carousel = require('carousel');
<br>
<br>
(function() {
<br>
&nbsp;&nbsp;...
<br>
<br>
var onItemRender = function(scope, item, id) {
			<br>&nbsp;&nbsp;&nbsp;&nbsp;var data = scope.getItemData(id);
			<br>&nbsp;&nbsp;&nbsp;&nbsp;item.el
			<br>&nbsp;&nbsp;&nbsp;&nbsp;.html('&lt;img src="resources/images/carousel/base.png"/&gt;
			<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;p class="yi-component-demo-carousel-name"&gt;'+ data.name + '&lt;/p&gt;');
		<br>}
		<br>var carousel = new Carousel({
		<br>&nbsp;&nbsp;&nbsp;&nbsp;applyTo : 'carousel_example_base',
		<br>&nbsp;&nbsp;&nbsp;&nbsp;data : [{
					<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id : 'carousel_1',
					<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name : 'item_1'
				    <br>&nbsp;&nbsp;&nbsp;&nbsp;}, {
					<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id : 'carousel_2',
					<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name : 'item_2'
				    <br>&nbsp;&nbsp;&nbsp;&nbsp;}, {
					<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id : 'carousel_3',
					<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name : 'item_3'
				    <br>&nbsp;&nbsp;&nbsp;&nbsp;}, {
					<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id : 'carousel_4',
					<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name : 'item_4'
				    <br>&nbsp;&nbsp;&nbsp;&nbsp;}, {
					<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id : 'carousel_5',
					<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name : 'item_5'
				    <br>&nbsp;&nbsp;&nbsp;&nbsp;}],
		<br>&nbsp;&nbsp;&nbsp;&nbsp;width : 600,
		<br>&nbsp;&nbsp;&nbsp;&nbsp;height : 300,
		<br>&nbsp;&nbsp;&nbsp;&nbsp;hasIndicators : true,
		<br>&nbsp;&nbsp;&nbsp;&nbsp;autoPlay : true,
		<br>&nbsp;&nbsp;&nbsp;&nbsp;listeners : {
		<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'itemRender' : {
		<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fn : onItemRender
		<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}
		<br>&nbsp;&nbsp;&nbsp;&nbsp;}
				<br>});
&nbsp;&nbsp;...
<br>
}());
				</pre>
			</div>
			<h3>参数</h3>
		    <div class="table-responsive">
		      <table class="table table-bordered table-striped">
		        <thead>
		         <tr>
		           <th style="width: 100px;">名称</th>
		           <th style="width: 50px;">类型</th>
		           <th style="width: 100px;">默认值</th>
		           <th>描述</th>
		         </tr>
		        </thead>
		        <tbody>
		         <tr>
		           <td>width</td>
		           <td>Number</td>
		           <td></td>
		           <td>轮播组件的宽</td>
		         </tr>
		         <tr>
		           <td>height</td>
		           <td>Number</td>
		           <td></td>
		           <td>轮播组件的高</td>
		         </tr>
		         <tr>
		           <td>dataUrl</td>
		           <td>String</td>
		           <td></td>
		           <td>远程请求url</td>
		         </tr>
		         <tr>
		           <td>params</td>
		           <td>Object</td>
		           <td></td>
		           <td>额外的参数</td>
		         </tr>
		         <tr>
		           <td>data</td>
		           <td>Object/Array</td>
		           <td></td>
		           <td>轮播数据</td>
		         </tr>
		         <tr>
		           <td>autoPlay</td>
		           <td>Boolean</td>
		           <td>false</td>
		           <td>是否自动播放动画</td>
		         </tr>
		         <tr>
		           <td>interval</td>
		           <td>Number</td>
		           <td>4000(ms)</td>
		           <td>轮播切换的时间间隔</td>
		         </tr>
		         <tr>
		           <td>hasIndicators</td>
		           <td>Boolean</td>
		           <td>false</td>
		           <td>是否显示圆球形的滑块</td>
		         </tr>
		         <tr>
		           <td>startWidth</td>
		           <td>Number</td>
		           <td></td>
		           <td>轮播项的起始宽度，<code>thumbnail : true</code>时才需要配置</td>
		         </tr>
		         <tr>
		           <td>startHeight</td>
		           <td>Number</td>
		           <td></td>
		           <td>轮播项的起始高度，<code>thumbnail : true</code>时才需要配置</td>
		         </tr>
		         <tr>
		           <td>thumbnail</td>
		           <td>Boolean</td>
		           <td>false</td>
		           <td>当前的轮播项的两侧是否还显示别的项</td>
		         </tr>
		        </tbody>
		      </table>
		    </div> 
	        <h3>方法</h3>
	        <h4>void load(Object option)</h4>
	        <p>(重新)加载数据</p>
	        <div class='highlight'><pre>
	        
	        var carousel = new Carousel(option);
			<br>carousel.load({ dataUrl: 'getData.mvc', params: { id: 'today'}})
		    </pre>
			</div>
			 <h4>void clear()</h4>
	        <p>清空数据</p>
	        <div class='highlight'><pre>
			carousel.clear();
		    </pre></div>
		    <h4>Object getItem(String/Number/Object item)</h4>
	        <p>获取轮播项</p>
	        <div class='highlight'><pre>
			carousel.getItem('1');//通过item的id
			<br>carousel.getItem({id: '1',name: 'tee'});//通过item
			<br>carousel.getItem(0);//通过ui的位置(0)
		    </pre> </div>
		    <h4>Object getItemData(String/Object item)</h4>
		     <p>获取轮播项数据</p>
	        <div class='highlight'><pre>
			carousel.getItemData('1');//通过item的id
			<br>carousel.getItemData({id: '1',name: 'tee'});//通过item
		    </pre> </div>
		     <h4>Object getFocusItem()</h4>
		     <p>获取当前播放的轮播项</p>
	        <div class='highlight'><pre>
			carousel.getFocusItem();
		    </pre> </div>
		    <h4>void prev(Object item)</h4>
		     <p>播放前一项</p>
	        <div class='highlight'><pre>
			carousel.next({id: '1',name: 'tee'});//item
		    </pre> </div>
		    <h4>void next(Object item)</h4>
		     <p>播放后一项</p>
	        <div class='highlight'><pre>
			carousel.next({id: '1',name: 'tee'});//item
		    </pre> </div>
		    <h4>void play(String/Number/Object item)</h4>
		     <p>播放指定的项</p>
	        <div class='highlight'><pre>
			carousel.play(0);//播放第0(ui中的位置)项
			<br>carousel.play({id: '1',name: 'tee'});//通过item
			<br>carousel.play('1');//通过item的id
		    </pre> </div>
	        <h3>事件</h3>
	        <div class="table-responsive">
		      <table class="table table-bordered table-striped">
		        <thead>
		         <tr>
		           <th style="width: 100px;">事件类型</th>
		           <th style="width: 200px;">监听函数</th>
		           <th>描述</th>
		         </tr>
		        </thead>
		        <tbody>
		         <tr>
		           <td>play</td>
		           <td>function(Carousel c, Object item)</td>
		           <td>播放动画的时候触发的事件。</td>
		         </tr>
		         <tr>
		           <td>switch</td>
		           <td>function(Carousel c, Object lastActiveItem, Object activeItem)</td>
		           <td>切换轮播项的时候触发的事件。</td>
		         </tr>
		         <tr>
		           <td>stop</td>
		           <td>function(Carousel c, Object item)</td>
		           <td>停止动画后触发的事件。</td>
		         </tr>
		         <tr>
		           <td>itemrender</td>
		           <td>function(Carousel c, Object item, String id)</td>
		           <td>item渲染完成后的事件。</td>
		         </tr>
		         <tr>
		           <td>load</td>
		           <td>function(Carousel c, Object/Array data)</td>
		           <td>数据加载完之后的事件。</td>
		         </tr>
		        </tbody>
		      </table>
		    </div>
	           <h2 id="carousel_example_one">环形轮播</h2>
	          <div class='bs-example'>
	              <div id='carousel_example_thumail' style="min-height: 300px;"></div>
	          </div>
	          <div class="highlight">
				<pre>// html
<br>
&lt;div id='carousel_example_thumail'&gt;&lt;/div&gt;
<br>
<br>
//css
<br>.yi-component-demo-carousel-thumbnail-name{
<br>&nbsp;&nbsp;&nbsp;&nbsp;position: absolute;
<br>&nbsp;&nbsp;&nbsp;&nbsp;bottom: 0;
<br>&nbsp;&nbsp;&nbsp;&nbsp;left: 50%;
<br>&nbsp;&nbsp;&nbsp;&nbsp;margin-left: -50%;
<br>&nbsp;&nbsp;&nbsp;&nbsp;width: 100%;
<br>&nbsp;&nbsp;&nbsp;&nbsp;margin-bottom: 0;
<br>&nbsp;&nbsp;&nbsp;&nbsp;background-color: #333333;
<br>&nbsp;&nbsp;&nbsp;&nbsp;opacity: 0.7;
<br>&nbsp;&nbsp;&nbsp;&nbsp;filter: alpha(opacity = 70);
<br>&nbsp;&nbsp;&nbsp;&nbsp;color: #ffffff;
<br>&nbsp;&nbsp;&nbsp;&nbsp;padding: 6px;
<br>}
<br>
// javascript
<br>
require('./resources/carousel.css');
<br>
var Carousel = require('carousel');
<br>
<br>
(function() {
<br>
&nbsp;&nbsp;...
<br>
<br>

var onItemRenderThumail = function(scope, item, id) {
<br>&nbsp;&nbsp;&nbsp;&nbsp;var data = scope.getItemData(id);
<br>&nbsp;&nbsp;&nbsp;&nbsp;item.el.html('&lt;img src="resources/images/carousel/upageVersion.jpg"/&gt;
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;p class="yi-component-demo-carousel-thumbnail-name"&gt;'+ data.name + '&lt;/p&gt;');
<br>}
		<br>var onSwitch = function($scope, currentItem, nextItem) {
		<br>}
		<br>var carouselThumail = new Carousel({
					<br>&nbsp;&nbsp;&nbsp;&nbsp;applyTo : 'carousel_example_thumail',
					<br>&nbsp;&nbsp;&nbsp;&nbsp;data : [{
					<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id : 'carousel_1',
					<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name : 'item_1'
				    <br>&nbsp;&nbsp;&nbsp;&nbsp;}, {
					<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id : 'carousel_2',
					<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name : 'item_2'
				    <br>&nbsp;&nbsp;&nbsp;&nbsp;}, {
					<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id : 'carousel_3',
					<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name : 'item_3'
				    <br>&nbsp;&nbsp;&nbsp;&nbsp;}, {
					<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id : 'carousel_4',
					<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name : 'item_4'
				    <br>&nbsp;&nbsp;&nbsp;&nbsp;}, {
					<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id : 'carousel_5',
					<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name : 'item_5'
				    <br>&nbsp;&nbsp;&nbsp;&nbsp;}],
					<br>&nbsp;&nbsp;&nbsp;&nbsp;width : 600,
					<br>&nbsp;&nbsp;&nbsp;&nbsp;height : 300,
					<br>&nbsp;&nbsp;&nbsp;&nbsp;hasIndicators : true,
					<br>&nbsp;&nbsp;&nbsp;&nbsp;thumbnail : true,
					<br>&nbsp;&nbsp;&nbsp;&nbsp;startWidth : 240,
					<br>&nbsp;&nbsp;&nbsp;&nbsp;startHeight : 240,
					<br>&nbsp;&nbsp;&nbsp;&nbsp;listeners : {
					<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'itemRender' : {
					<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fn : onItemRenderThumail
					<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},
					<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'switch' : {
					<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fn : onSwitch
				    <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}
					<br>&nbsp;&nbsp;&nbsp;&nbsp;}
				<br>});



&nbsp;&nbsp;...
<br>
}());
				</pre>
			</div>
	      </div>
	      
	      
	      <!-- 轮播（完） -->
	      
	      
	      <div class="bs-docs-section">
	        <div class="page-header">
	          <h1 id="page_loader">页面加载器 <small>PageLoader</small></h1>
	        </div>
	        <p class="lead">页面加载器将目标页面或者html字符串作为组件的内容，以组件的方式进行后处理。</p>
	
	        <h2 id="page_loader_examples">示例</h2>	
	        
	        <div class="bs-example">
		      <div id="page_loader_example" style="min-height: 111px;"></div>
		    </div><!-- /example -->
			<div class="highlight">
				<pre>
// html
<br>
&lt;div id="page_loader_example"&gt;&lt;/div&gt;
<br>
<br>
// page_for_page_loader_example.html
<br>
&lt;html&gt;
<br>
&lt;head&gt;
<br>
&lt;title&gt;Project Content Detail&lt;/title&gt;
<br>
&lt;/head&gt;
<br>
&lt;body&gt;
<br>
&nbsp;&nbsp;&lt;div class="project-content-detail"&gt;
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&lt;div class="project-content-switcher"&gt;
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div class="project-content-switcher-item project-content-switcher-bp project-content-switcher-item-active"&gt;
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div class="project-content-switcher-graph"&gt;&lt;/div&gt;
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div class="project-content-switcher-text"&gt;
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(&lt;span class="project-content-switcher-count"&gt;0&lt;/span&gt;)
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div class="project-content-switcher-item project-content-switcher-page"&gt;
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div class="project-content-switcher-graph"&gt;&lt;/div&gt;
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div class="project-content-switcher-text"&gt;
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(&lt;span class="project-content-switcher-count"&gt;0&lt;/span&gt;)
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div class="project-content-switcher-item project-content-switcher-report"&gt;
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div class="project-content-switcher-graph"&gt;&lt;/div&gt;
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div class="project-content-switcher-text"&gt;
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(&lt;span class="project-content-switcher-count"&gt;0&lt;/span&gt;)
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;
<br>
&nbsp;&nbsp;&lt;/div&gt;
<br>
&lt;/body&gt;
<br>
&lt;/html&gt;
<br>
<br>
// css
<br>
.project-content-detail {
<br>
&nbsp;&nbsp;padding: 10px 25px;
<br>
}
<br>
<br>
.project-content-switcher {
<br>
&nbsp;&nbsp;margin-bottom: 40px;
<br>
&nbsp;&nbsp;height: 51px;
<br>
}
<br>
<br>
.project-content-switcher-item {
<br>
&nbsp;&nbsp;width: 106px;
<br>
&nbsp;&nbsp;height: 51px;
<br>
&nbsp;&nbsp;cursor: pointer;
<br>
&nbsp;&nbsp;float: left;
<br>
}
<br>
<br>
.project-content-switcher-graph {
<br>
&nbsp;&nbsp;border-bottom: 3px solid transparent;
<br>
&nbsp;&nbsp;width: 48px;
<br>
&nbsp;&nbsp;height: 51px;
<br>
&nbsp;&nbsp;background-repeat: no-repeat;
<br>
&nbsp;&nbsp;background-position: 0 0;
<br>
&nbsp;&nbsp;float: left;
<br>
}
<br>
<br>
.project-content-switcher-text {
<br>
&nbsp;&nbsp;padding: 15px 0 16px;
<br>
&nbsp;&nbsp;float: left;
<br>
}
<br>
<br>
.project-content-switcher-bp .project-content-switcher-graph {
<br>
&nbsp;&nbsp;background-image: url(images/48_48/bp.png);
<br>
}
<br>
<br>
.project-content-switcher-page .project-content-switcher-graph {
<br>
&nbsp;&nbsp;background-image: url(images/48_48/page.png);
<br>
}
<br>
<br>
.project-content-switcher-report .project-content-switcher-graph {
<br>
&nbsp;&nbsp;background-image: url(images/48_48/report.png);
<br>
}
<br>

.project-content-switcher-item-active .project-content-switcher-graph {
<br>
&nbsp;&nbsp;border-color: #428bca;
<br>
}
<br>
<br>
.project-content-switcher-bp:hover .project-content-switcher-graph {
<br>
&nbsp;&nbsp;background-image: url(images/48_48/bp_select.png);
<br>
}
<br>
<br>
.project-content-switcher-page:hover .project-content-switcher-graph {
<br>
&nbsp;&nbsp;background-image: url(images/48_48/page_select.png);
<br>
}
<br>
<br>
.project-content-switcher-report:hover .project-content-switcher-graph {
<br>
&nbsp;&nbsp;background-image: url(images/48_48/report_select.png);
<br>
}
<br>
<br>
.project-content-switcher-bp.project-content-switcher-item-active .project-content-switcher-graph
<br>
&nbsp;&nbsp;{
<br>
&nbsp;&nbsp;background-image: url(images/48_48/bp_select.png);
<br>
}
<br>
<br>
.project-content-switcher-page.project-content-switcher-item-active .project-content-switcher-graph
<br>
&nbsp;&nbsp;{
<br>
&nbsp;&nbsp;background-image: url(images/48_48/page_select.png);
<br>
}
<br>
<br>
.project-content-switcher-report.project-content-switcher-item-active .project-content-switcher-graph
<br>
&nbsp;&nbsp;{
<br>
&nbsp;&nbsp;background-image: url(images/48_48/report_select.png);
<br>
}
<br>
<br>
// javascript
<br>
function renderProjectContent(p) {
<br>
&nbsp;&nbsp;this.switcher = this.el.find('.project-content-switcher');
<br>
&nbsp;&nbsp;this.switcher.children('.project-content-switcher-' + this.type)
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.addClass('project-content-switcher-item-active');
<br>
&nbsp;&nbsp;this.switcher.on('click', {
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;componentId : this.getId()
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}, onSwitcherClick);
<br>
}
<br>
<br>
function onSwitcherClick(e) {
<br>
&nbsp;&nbsp;var $item = $(e.target).closest('.project-content-switcher-item');
<br>
<br>
&nbsp;&nbsp;if ($item.size() > 0) {
<br>
&nbsp;&nbsp;&nbsp;&nbsp;$item.parent().children('.project-content-switcher-item')
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.removeClass('project-content-switcher-item-active');
<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;$item.addClass('project-content-switcher-item-active');
<br>
&nbsp;&nbsp;} else {
<br>
&nbsp;&nbsp;&nbsp;&nbsp;return;
<br>
&nbsp;&nbsp;}
<br>
<br>
&nbsp;&nbsp;var type;
<br>
&nbsp;&nbsp;if ($item.hasClass('project-content-switcher-bp')) {
<br>
&nbsp;&nbsp;&nbsp;&nbsp;type = 'bp';
<br>
&nbsp;&nbsp;} else if ($item.hasClass('project-content-switcher-page')) {
<br>
&nbsp;&nbsp;&nbsp;&nbsp;type = 'page';
<br>
&nbsp;&nbsp;} else if ($item.hasClass('project-content-switcher-report')) {
<br>
&nbsp;&nbsp;&nbsp;&nbsp;type = 'report';
<br>
&nbsp;&nbsp;}
<br>
<br>
&nbsp;&nbsp;if (type) {
<br>
&nbsp;&nbsp;&nbsp;&nbsp;var comp = Base.get(e.data.componentId);
<br>
&nbsp;&nbsp;&nbsp;&nbsp;if (comp) {
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;comp.type = type;
<br>
&nbsp;&nbsp;&nbsp;&nbsp;}
<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;comp = null;
<br>
&nbsp;&nbsp;}
<br>
<br>
&nbsp;&nbsp;$item = null;
<br>
}
<br>
<br>
(function(){
<br>
&nbsp;&nbsp;...
<br>
<br>
&nbsp;&nbsp;var projectContent = new PageLoader({
<br>
&nbsp;&nbsp;&nbsp;&nbsp;type : 'bp',
<br>
&nbsp;&nbsp;&nbsp;&nbsp;renderTo : 'page_loader_example',
<br>
&nbsp;&nbsp;&nbsp;&nbsp;url : 'html/page_for_page_loader_example.html',
<br>
&nbsp;&nbsp;&nbsp;&nbsp;listeners : {
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'load' : renderProjectContent
<br>
&nbsp;&nbsp;&nbsp;&nbsp;}
<br>
&nbsp;&nbsp;});
<br>
<br>
&nbsp;&nbsp;...
<br>
}());
				</pre>
			</div>
	        
	        <h2 id="page_loader_usage">用法</h2>	
			
			<h3>参数</h3>
		    <div class="table-responsive">
		      <table class="table table-bordered table-striped">
		        <thead>
		         <tr>
		           <th style="width: 100px;">名称</th>
		           <th style="width: 50px;">类型</th>
		           <th style="width: 100px;">默认值</th>
		           <th>描述</th>
		         </tr>
		        </thead>
		        <tbody>
		         <tr>
		           <td>autoLoad</td>
		           <td>Boolean</td>
		           <td>true</td>
		           <td>初始化后是否自动加载页面。</td>
		         </tr>
		         <tr>
		           <td>url</td>
		           <td>String</td>
		           <td></td>
		           <td>加载页面的URL，url会被作为属性存储于实例中，还可以通过<code>load()</code>传入或覆盖。</td>
		         </tr>
		         <tr>
		           <td>params</td>
		           <td>Object</td>
		           <td></td>
		           <td>请求页面时的额外参数，params会被作为属性存储于实例中，还可以通过<code>load()</code>传入或覆盖。</td>
		         </tr>
		         <tr>
		           <td>async</td>
		           <td>Boolean</td>
		           <td></td>
		           <td>是否异步加载，async会被作为属性存储于实例中，还可以通过<code>load()</code>传入或覆盖。</td>
		         </tr>
		         <tr>
		           <td>timeout</td>
		           <td>Number</td>
		           <td></td>
		           <td>超时设置，单位：毫秒，timeout会被作为属性存储于实例中，还可以通过<code>load()</code>传入或覆盖。</td>
		         </tr>
		         <tr>
		           <td>loadScripts</td>
		           <td>Boolean</td>
		           <td></td>
		           <td>是否加载页面中的脚本，loadScripts会被作为属性存储于实例中，还可以通过<code>load()</code>传入或覆盖。</td>
		         </tr>
		         <tr>
		           <td>html</td>
		           <td>String</td>
		           <td></td>
		           <td>初始化时将html字符串作为组件的内容。与url参数互斥，url参数优先。</td>
		         </tr>
		        </tbody>
		      </table>
		    </div><!-- /.table-responsive -->
		    
			<h3>方法</h3>
			<h4>void load(Object option)</h4>
		    <p>载入页面。</p>
			<div class="highlight">
				<pre>
var pageLoader = new PageLoader({
<br>
&nbsp;&nbsp;autoLoad: false,
<br>
&nbsp;&nbsp;...
<br>
});
<br>
<br>
...
<br>
<br>
pageLoader.load();
				</pre>
			</div>
		    
			<h3>事件</h3>
		    <div class="table-responsive">
		      <table class="table table-bordered table-striped">
		        <thead>
		         <tr>
		           <th style="width: 100px;">事件类型</th>
		           <th style="width: 200px;">监听函数</th>
		           <th>描述</th>
		         </tr>
		        </thead>
		        <tbody>
		         <tr>
		           <td>load</td>
		           <td>function(PageLoader p)</td>
		           <td>加载页面完成后的事件。</td>
		         </tr>
		        </tbody>
		      </table>
		    </div><!-- /.table-responsive -->
	      </div>
	      
	      
	      <div class="bs-docs-section">
	        <div class="page-header">
	          <h1 id="tab">标签页 <small>Tab</small></h1>
	        </div>
	
	        <h2 id="tab_examples">示例</h2>	
	        
	        <h3>静态示例</h3>
	        <div class="bs-example">
		      <div id="tab_example">
		      	<ul class="nav nav-tabs">
				  <li class="active"><a href="#tab_example_home" data-toggle="tab">首页</a></li>
				  <li><a href="#tab_example_project" data-toggle="tab">项目</a></li>
				  <li><a href="#tab_example_dir" data-toggle="tab">目录</a></li>
				  <li><a href="#tab_example_resource" data-toggle="tab">资源</a></li>
				</ul>
				
				<!-- Tab panes -->
				<div class="tab-content">
				  <div class="tab-pane active" id="tab_example_home"><br>进行中的项目...<br><br>已关闭的项目...</div>
				  <div class="tab-pane" id="tab_example_project"><br>项目名称<br><br>项目状态<br><br>项目经理<br><br>可用的工具<br><br>平台信息<br><br>同步项目</div>
				  <div class="tab-pane" id="tab_example_dir"><br>故障<br><br>问题<br><br>变更<br><br>事件</div>
				  <div class="tab-pane" id="tab_example_resource"><br>流程<br><br>页面<br><br>报表</div>
				</div>
		      </div>
		    </div><!-- /example -->
			<div class="highlight">
				<pre>
// html
<br>
&lt;div id="tab_example"&gt;
<br>
&nbsp;&nbsp;&lt;ul class="nav nav-tabs"&gt;
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&lt;li&gt;&lt;a href="#tab_example_home" data-toggle="tab"&gt;首页&lt;/a&gt;&lt;/li&gt;
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&lt;li&gt;&lt;a href="#tab_example_project" data-toggle="tab"&gt;项目&lt;/a&gt;&lt;/li&gt;
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&lt;li&gt;&lt;a href="#tab_example_dir" data-toggle="tab"&gt;目录&lt;/a&gt;&lt;/li&gt;
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&lt;li&gt;&lt;a href="#tab_example_resource" data-toggle="tab"&gt;资源&lt;/a&gt;&lt;/li&gt;
<br>
&nbsp;&nbsp;&lt;/ul&gt;
<br>
<br>
&nbsp;&nbsp;&lt;!-- Tab panes --&gt;
<br>
&nbsp;&nbsp;&lt;div class="tab-content"&gt;
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&lt;div class="tab-pane active" id="tab_example_home"&gt;&lt;br&gt;进行中的项目...&lt;br&gt;已关闭的项目...&lt;/div&gt;
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&lt;div class="tab-pane" id="tab_example_project"&gt;
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;br&gt;&lt;br&gt;项目名称&lt;br&gt;&lt;br&gt;项目状态&lt;br&gt;&lt;br&gt;项目经理&lt;br&gt;&lt;br&gt;可用的工具&lt;br&gt;&lt;br&gt;平台信息&lt;br&gt;&lt;br&gt;同步项目
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&lt;div class="tab-pane" id="tab_example_dir"&gt;&lt;br&gt;故障&lt;br&gt;&lt;br&gt;问题&lt;br&gt;&lt;br&gt;变更&lt;br&gt;&lt;br&gt;事件&lt;/div&gt;
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&lt;div class="tab-pane" id="tab_example_resource"&gt;&lt;br&gt;流程&lt;br&gt;&lt;br&gt;页面&lt;br&gt;&lt;br&gt;报表&lt;/div&gt;
<br>
&nbsp;&nbsp;&lt;/div&gt;
<br>
&lt;/div&gt;
				</pre>
			</div>
	        
	        <h3>动态示例</h2>
	        <div class="bs-example">
		      <div id="tab_example2" style="min-height: 82px;"></div>
		    </div><!-- /example -->
			<div class="highlight">
				<pre>
// html
<br>
&lt;div id="tab_example2"&gt;&lt;/div&gt;
<br>
<br>
// javascript
<br>
var Tab = require('tab');
<br>
<br>
function renderGalleryInTab(p) {
<br>
&nbsp;&nbsp;var resourceGallery = new ImageGallery({
<br>
&nbsp;&nbsp;&nbsp;&nbsp;renderTo : 'image_gallery_in_tab_example',
<br>
&nbsp;&nbsp;&nbsp;&nbsp;cols : [2, 3, 4, 6],
<br>
&nbsp;&nbsp;&nbsp;&nbsp;itemCls : 'resource-gallery-item',
<br>
&nbsp;&nbsp;&nbsp;&nbsp;imageWidth : 100,
<br>
&nbsp;&nbsp;&nbsp;&nbsp;imageHeight : 120,
<br>
&nbsp;&nbsp;&nbsp;&nbsp;hasAddItem : true,
<br>
&nbsp;&nbsp;&nbsp;&nbsp;addItemFront : true,
<br>
&nbsp;&nbsp;&nbsp;&nbsp;dataUrl : 'data/resource-gallery-data.json',
<br>
&nbsp;&nbsp;&nbsp;&nbsp;autoLoad : true,
<br>
&nbsp;&nbsp;&nbsp;&nbsp;reader : {
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;identifier : 'code',
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;srcProperty : getSrc,
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;titleProperty : getTitle
<br>
&nbsp;&nbsp;&nbsp;&nbsp;}
<br>
&nbsp;&nbsp;});
<br>
}
<br>
<br>
function addNewTab(t, addButton, e) {
<br>
&nbsp;&nbsp;var ts = this.add({
<br>
&nbsp;&nbsp;&nbsp;&nbsp;title : '新的标签',
<br>
&nbsp;&nbsp;&nbsp;&nbsp;html : '&lt;br&gt;&lt;p&gt;壹框&lt;/p&gt;&lt;p&gt;基于 Servlet & Bootstrap & jQuery & Seajs ' +
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'简洁、直观、强悍、移动设备可用的前端开发框架，让 Web 开发更迅速、简单。&lt;/p&gt;'
<br>
&nbsp;&nbsp;});
<br>
&nbsp;&nbsp;this.setActive(ts[0]);
<br>
}
<br>
<br>
(function() {
<br>
&nbsp;&nbsp;...
<br>
<br>
&nbsp;&nbsp;var tab = new Tab({
<br>
&nbsp;&nbsp;&nbsp;&nbsp;renderTo : 'tab_example2',
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;items : [{
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;title : '标签1',
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;html : '&lt;br&gt;通过html字符串添加标签页内容'
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}, {
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;title : '标签2',
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;url : 'html/page_for_tab_example2.html',
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;loadScripts : true
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}, {
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;title : '标签3',
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;html : '&lt;br&gt;通过事件添加标签页内容&lt;br&gt;&lt;br&gt;&lt;div id="image_gallery_in_tab_example"&gt;&lt;/div&gt;',
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;listeners : {
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'load' : {
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fn : renderGalleryInTab
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}]
<br>
&nbsp;&nbsp;&nbsp;&nbsp;});
<br>
&nbsp;&nbsp;}
<br>
<br>
&nbsp;&nbsp;...
<br>
}());
<br>
<br>
// page_for_tab_example2.html
<br>
&lt;html&gt;
<br>
&lt;head&gt;
<br>
&lt;title&gt;Components&lt;/title&gt;
<br>
&lt;/head&gt;
<br>
&lt;body&gt;
<br>
&nbsp;&nbsp;&lt;br&gt;
<br>
&nbsp;&nbsp;&lt;div id="tab_example2_tab_output"&gt;&lt;/div&gt;
<br>
&nbsp;&nbsp;&lt;br&gt;
<br>
&nbsp;&nbsp;&lt;br&gt;
<br>
&nbsp;&nbsp;&lt;p&gt;壹框&lt;/p&gt;
<br>
&nbsp;&nbsp;&lt;p&gt;基于 Servlet & Bootstrap & jQuery & Seajs 简洁、直观、强悍、移动设备可用的前端开发框架，让 Web 开发更迅速、简单。&lt;/p&gt;
<br>
&nbsp;&nbsp;&lt;script type="text/javascript"&gt;
<br>
&nbsp;&nbsp;&nbsp;&nbsp;document.getElementById('tab_example2_tab_output').innerHTML = '标签页加载页面';
<br>
&nbsp;&nbsp;&lt;/script&gt;
<br>
&lt;/body&gt;
<br>
&lt;/html&gt;
				</pre>
			</div>
			
	        <h2 id="tab_usage">用法</h2>	
			
			<h3>参数</h3>
		    <div class="table-responsive">
		      <table class="table table-bordered table-striped">
		        <thead>
		         <tr>
		           <th style="width: 100px;">名称</th>
		           <th style="width: 50px;">类型</th>
		           <th style="width: 100px;">默认值</th>
		           <th>描述</th>
		         </tr>
		        </thead>
		        <tbody>
		         <tr>
		           <td>items</td>
		           <td>Array</td>
		           <td></td>
		           <td>每一个标签页都是一个<strong>页面加载器</strong>，数组中的每一个对象即为组件实例的参数。<br>具体使用方法参考<a href="#page_loader_usage">页面加载器 - 用法</a>。</td>
		         </tr>
		         <tr>
		           <td>activeIndex</td>
		           <td>Number</td>
		           <td>0</td>
		           <td>初始化时激活的标签序号（从0开始）。</td>
		         </tr>
		         <tr>
		           <td>hasAddButton</td>
		           <td>Boolean</td>
		           <td></td>
		           <td>是否有“添加”按钮。</td>
		         </tr>
		         <tr>
		           <td>defaultTitle</td>
		           <td>String</td>
		           <td>'new tab'</td>
		           <td>item中没有title属性则使用它作为标题。</td>
		         </tr>
		        </tbody>
		      </table>
		    </div><!-- /.table-responsive -->
		    
			<h3>方法</h3>
			<h4>void setActive(Object/String/Number item)</h4>
		    <p>激活某一标签页。</p>
			<div class="highlight">
				<pre>
var Tab = require('tab');
<br>
var tab = new Tab(option);
<br>
var ts = tab.add([{id: '1', ...}, {id: '2', ...}]);
<br>
tab.setActive(ts[0]);// 通过item对象
<br>
tab.setActive('2');// 通过UI中的位置（从0开始）
<br>
tab.setActive(1);// 通过UI中的位置（从0开始）
				</pre>
			</div>
			<h4>void getItem(String/Number/Object item)</h4>
		    <p>获取item对象。</p>
			<div class="highlight">
				<pre>
var item = tab.getItem('2');// 通过item的id
<br>
var item = tab.getItem(1);// 通过UI中的位置（从0开始）
<br>
var item = tab.getItem(itemB);// 通过item对象，返回item对象本身
				</pre>
			</div>
			<h4>void setTitle(String/Number/Object item, String title)</h4>
		    <p>修改item的标题。</p>
			<div class="highlight">
				<pre>
tab.setTitle(item, '新的标题');// 通过item对象
<br>
tab.setTitle('2', '新的标题');// 通过item的id
<br>
tab.setTitle(1, '新的标题');// 通过UI中的位置（从0开始
				</pre>
			</div>
			<p>item指定要修改的对象，可以是数据的唯一标识、UI中的位置（从0开始）或item对象，title是新的标题。</p>
		    
			<h3>事件</h3>
		    <div class="table-responsive">
		      <table class="table table-bordered table-striped">
		        <thead>
		         <tr>
		           <th style="width: 100px;">事件类型</th>
		           <th style="width: 200px;">监听函数</th>
		           <th>描述</th>
		         </tr>
		        </thead>
		        <tbody>
		         <tr>
		           <td>beforeadd</td>
		           <td>function(Tab t, Object item)</td>
		           <td>执行添加标签页操作前的事件，返回false将终止添加操作。</td>
		         </tr>
		         <tr>
		           <td>add</td>
		           <td>function(Tab t, Object item)</td>
		           <td>添加标签页完成后的事件。</td>
		         </tr>
		         <tr>
		           <td>beforeclose</td>
		           <td>function(Tab t, Object item)</td>
		           <td>执行关闭标签页操作前的事件，返回false将终止关闭操作。</td>
		         </tr>
		         <tr>
		           <td>close</td>
		           <td>function(Tab t, Object item)</td>
		           <td>关闭标签页完成后的事件。</td>
		         </tr>
		         <tr>
		           <td>beforeremove</td>
		           <td>function(Tab t, Object item)</td>
		           <td>执行删除标签页操作前的事件，返回false将终止删除操作。</td>
		         </tr>
		         <tr>
		           <td>remove</td>
		           <td>function(Tab t, Object item)</td>
		           <td>删除标签页完成后的事件。<br>点击关闭按钮，事件触发的顺序为：beforeclose > close > beforeremove > remove。</td>
		         </tr>
		         <tr>
		           <td>beforetabchange</td>
		           <td>function(Tab t, Object item, Object lastActiveTab)</td>
		           <td>执行切换标签页操作前的事件，返回false将终止切换操作。</td>
		         </tr>
		         <tr>
		           <td>tabchange</td>
		           <td>function(Tab t, Object item, Object lastActiveTab)</td>
		           <td>切换标签页完成后的事件。</td>
		         </tr>
		         <tr>
		           <td>activate</td>
		           <td>function(Tab t, Object activeTab)</td>
		           <td>激活标签完成后的事件。<br>执行<code>setActive()</code>，事件触发的顺序为：beforetabchange > tabchange > activate。</td>
		         </tr>
		         <tr>
		           <td>addbuttonclick</td>
		           <td>function(Tab t, jqObject addButton, Event e)</td>
		           <td>点击'添加'按钮时的事件。</td>
		         </tr>
		        </tbody>
		      </table>
		    </div><!-- /.table-responsive -->
	      </div>
	      
	      
	      <div class="bs-docs-section">
	        <div class="page-header">
	          <h1 id="clickable">可点击元素</h1>
	        </div>
	
	        <h2 id="clickable_base">任意元素 <small>Clickable</small></h2>
	        <p>可点击元素能赋予任意元素单击和双击事件。</p>
	        
	        <h3>示例</h3>	
	        <div class="bs-example">
		      <a id="clickable_example_switcher" href="javascript:void(0)">展开>></a>
		      <br>
		      <br>
		      <div id="clickable_example_target">
		      	<p>层叠样式表</p>
		      	<p>设置全局CSS样式，基本的HTML元素均可以通过 class 设置样式并得到增强效果，还有先进的栅格系统。</p>
		      </div>
		    </div><!-- /example -->
			<div class="highlight">
				<pre>
// html
<br>
&lt;a id="clickable_example_switcher" href="javascript:void(0)"&gt;展开&gt;&gt;&lt;/a&gt;
<br>
&lt;br&gt;
<br>
&lt;br&gt;
<br>
&lt;div id="clickable_example_target"&gt;
<br>
&nbsp;&nbsp;&lt;p&gt;层叠样式表&lt;/p&gt;
<br>
&nbsp;&nbsp;&lt;p&gt;设置全局CSS样式，基本的HTML元素均可以通过 class 设置样式并得到增强效果，还有先进的栅格系统。&lt;/p&gt;
<br>
&lt;/div&gt;
<br>
<br>
// javascript
<br>
var Base = require('component');
<br>
var Clickable = require('clickable');
<br>
<br>
var SWITCHER_TEXT = {
<br>
&nbsp;&nbsp;'expand' : '展开&gt;&gt;',
<br>
&nbsp;&nbsp;'collapse' : '&lt;&lt;收起'
<br>
};
<br>
<br>
function toggleTarget(c, e) {
<br>
&nbsp;&nbsp;if (this.hidden) {
<br>
&nbsp;&nbsp;&nbsp;&nbsp;c.getEl().html(SWITCHER_TEXT['collapse']);
<br>
&nbsp;&nbsp;&nbsp;&nbsp;this.show();
<br>
&nbsp;&nbsp;} else {
<br>
&nbsp;&nbsp;&nbsp;&nbsp;c.getEl().html(SWITCHER_TEXT['expand']);
<br>
&nbsp;&nbsp;&nbsp;&nbsp;this.hide();
<br>
&nbsp;&nbsp;}
<br>
}
<br>
<br>
(function() {
<br>
&nbsp;&nbsp;...
<br>
<br>
&nbsp;&nbsp;var target = new Base({
<br>
&nbsp;&nbsp;&nbsp;&nbsp;applyTo : 'clickable_example_target',
<br>
&nbsp;&nbsp;&nbsp;&nbsp;hidden : true
<br>
&nbsp;&nbsp;});
<br>
&nbsp;&nbsp;var switcher = new Clickable({
<br>
&nbsp;&nbsp;&nbsp;&nbsp;applyTo : 'clickable_example_switcher',
<br>
&nbsp;&nbsp;&nbsp;&nbsp;listeners : {
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'click' : {
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fn : toggleTarget,
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;scope : target
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}
<br>
&nbsp;&nbsp;&nbsp;&nbsp;}
<br>
&nbsp;&nbsp;});
<br>
<br>
&nbsp;&nbsp;...
<br>
}());
				</pre>
			</div>
	        
			
			<h3>事件</h3>
		    <div class="table-responsive">
		      <table class="table table-bordered table-striped">
		        <thead>
		         <tr>
		           <th style="width: 100px;">事件类型</th>
		           <th style="width: 200px;">监听函数</th>
		           <th>描述</th>
		         </tr>
		        </thead>
		        <tbody>
		         <tr>
		           <td>click</td>
		           <td>function(Clickable c, Event e)</td>
		           <td>点击时的事件。</td>
		         </tr>
		         <tr>
		           <td>dblclick</td>
		           <td>function(Clickable c, Event e)</td>
		           <td>双击时的事件。</td>
		         </tr>
		        </tbody>
		      </table>
		    </div><!-- /.table-responsive -->
		    
	
	        <h2 id="button">按钮 <small>Button</small></h2>
	        <p>专门用于<code>&lt;button&gt;</code>标签。</p>
	        
	        <h3>示例</h3>	
	        <div class="bs-example">
		      <div id="button_example">
		      	<button id="button_example1" class="btn btn-default" type="button" name="button_example" value="1">已有的节点</button>
		      	<button id="button_example2">按钮的类型</button>
		      	<button id="button_example3">按钮的名称</button>
		      	<button id="button_example4">按钮的值</button>
		      	<button id="button_example5">按钮不可用</button>
		      	<button id="button_example6"><span class="yi-button-text">按钮图标</span></button>
		      	<button id="button_example7"><span class="yi-button-text"></span></button>
		      </div>
		    </div><!-- /example -->
			<div class="highlight">
				<pre>
// html
<br>
&lt;div id="button_example"&gt;
<br>
&nbsp;&nbsp;&lt;button id="button_example1" class="btn btn-default" type="button" 
<br>
&nbsp;&nbsp;&nbsp;&nbsp;name="button_example" value="1"&gt;已有的节点&lt;/button&gt;
<br>
&nbsp;&nbsp;&lt;button id="button_example2"&gt;按钮的类型&lt;/button&gt;
<br>
&nbsp;&nbsp;&lt;button id="button_example3"&gt;按钮的名称&lt;/button&gt;
<br>
&nbsp;&nbsp;&lt;button id="button_example4"&gt;按钮的值&lt;/button&gt;
<br>
&nbsp;&nbsp;&lt;button id="button_example5"&gt;按钮不可用&lt;/button&gt;
<br>
&nbsp;&nbsp;&lt;button id="button_example6"&gt;&lt;span class="yi-button-text"&gt;按钮图标&lt;/span&gt;&lt;/button&gt;
<br>
&nbsp;&nbsp;&lt;button id="button_example7"&gt;&lt;span class="yi-button-text"&gt;&lt;/span&gt;&lt;/button&gt;
<br>
&lt;/div&gt;
<br>
<br>
// javascript
<br>
var Button = require('button');
<br>
var ICON_CLASSES = ['glyphicon glyphicon-cog',
<br>
&nbsp;&nbsp;&nbsp;&nbsp;'glyphicon glyphicon-envelope', 'glyphicon glyphicon-check'], ii = 0;
<br>
var TEXT = ['按钮图标a', '按钮图标b', '按钮图标'], jj=0;
<br>
<br>
function onButtonClick(b, e) {
<br>
&nbsp;&nbsp;yi.alert('已有的节点 ');
<br>
}
<br>
<br>
function onButton2Click(b, e) {
<br>
&nbsp;&nbsp;yi.alert('按钮的类型：' + b.type);
<br>
}
<br>
<br>
function onButton3Click(b, e) {
<br>
&nbsp;&nbsp;yi.alert('按钮的名称：' + b.name);
<br>
}
<br>
<br>
function onButton4Click(b, e) {
<br>
&nbsp;&nbsp;yi.alert('按钮的值：' + b.value);
<br>
}
<br>
<br>
function onButton5Click(b, e) {
<br>
&nbsp;&nbsp;yi.alert('我永远不会执行');
<br>
}
<br>
<br>
function onButton6Click(b, e) {
<br>
&nbsp;&nbsp;b.setIconCls(ICON_CLASSES[ii++ % 3])
<br>
&nbsp;&nbsp;b.setText(TEXT[jj++ % 3])
<br>
}
<br>
<br>
function onButton7Click(b, e) {
<br>
&nbsp;&nbsp;yi.alert('按钮的文字：' + b.text);
<br>
}
<br>
<br>
function onButton8Click(b, e) {
<br>
&nbsp;&nbsp;yi.alert('新按钮');
<br>
}
<br>
<br>
(function() {
<br>
&nbsp;&nbsp;...
<br>
<br>
&nbsp;&nbsp;var be = new Button({
<br>
&nbsp;&nbsp;&nbsp;&nbsp;applyTo : 'button_example1',
<br>
&nbsp;&nbsp;&nbsp;&nbsp;listeners : {
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'click' : {
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fn : onButtonClick
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}
<br>
&nbsp;&nbsp;&nbsp;&nbsp;}
<br>
&nbsp;&nbsp;});
<br>
<br>
&nbsp;&nbsp;var be2 = new Button({
<br>
&nbsp;&nbsp;&nbsp;&nbsp;applyTo : 'button_example2',
<br>
&nbsp;&nbsp;&nbsp;&nbsp;cls : 'btn-primary',
<br>
&nbsp;&nbsp;&nbsp;&nbsp;type : 'submit',
<br>
&nbsp;&nbsp;&nbsp;&nbsp;listeners : {
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'click' : {
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fn : onButton2Click
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}
<br>
&nbsp;&nbsp;&nbsp;&nbsp;}
<br>
&nbsp;&nbsp;});
<br>
<br>
&nbsp;&nbsp;var be3 = new Button({
<br>
&nbsp;&nbsp;&nbsp;&nbsp;applyTo : 'button_example3',
<br>
&nbsp;&nbsp;&nbsp;&nbsp;cls : 'btn-success',
<br>
&nbsp;&nbsp;&nbsp;&nbsp;name : 'button_example3',
<br>
&nbsp;&nbsp;&nbsp;&nbsp;listeners : {
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'click' : {
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fn : onButton3Click
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}
<br>
&nbsp;&nbsp;&nbsp;&nbsp;}
<br>
&nbsp;&nbsp;});
<br>
<br>
&nbsp;&nbsp;var be4 = new Button({
<br>
&nbsp;&nbsp;&nbsp;&nbsp;applyTo : 'button_example4',
<br>
&nbsp;&nbsp;&nbsp;&nbsp;cls : 'btn-info',
<br>
&nbsp;&nbsp;&nbsp;&nbsp;value : '4',
<br>
&nbsp;&nbsp;&nbsp;&nbsp;listeners : {
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'click' : {
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fn : onButton4Click
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}
<br>
&nbsp;&nbsp;&nbsp;&nbsp;}
<br>
&nbsp;&nbsp;});
<br>
<br>
&nbsp;&nbsp;var be5 = new Button({
<br>
&nbsp;&nbsp;&nbsp;&nbsp;applyTo : 'button_example5',
<br>
&nbsp;&nbsp;&nbsp;&nbsp;cls : 'btn-warning',
<br>
&nbsp;&nbsp;&nbsp;&nbsp;disabled : true,
<br>
&nbsp;&nbsp;&nbsp;&nbsp;listeners : {
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'click' : {
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fn : onButton5Click
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}
<br>
&nbsp;&nbsp;&nbsp;&nbsp;}
<br>
&nbsp;&nbsp;});
<br>
<br>
&nbsp;&nbsp;var be6 = new Button({
<br>
&nbsp;&nbsp;&nbsp;&nbsp;applyTo : 'button_example6',
<br>
&nbsp;&nbsp;&nbsp;&nbsp;cls : 'btn-danger',
<br>
&nbsp;&nbsp;&nbsp;&nbsp;iconCls : 'glyphicon glyphicon-check',
<br>
&nbsp;&nbsp;&nbsp;&nbsp;listeners : {
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'click' : {
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fn : onButton6Click
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}
<br>
&nbsp;&nbsp;&nbsp;&nbsp;}
<br>
&nbsp;&nbsp;});
<br>
<br>
&nbsp;&nbsp;var be7 = new Button({
<br>
&nbsp;&nbsp;&nbsp;&nbsp;applyTo : 'button_example7',
<br>
&nbsp;&nbsp;&nbsp;&nbsp;cls : 'btn-link',
<br>
&nbsp;&nbsp;&nbsp;&nbsp;text : '按钮的文字'
<br>
&nbsp;&nbsp;&nbsp;&nbsp;listeners : {
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'click' : {
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fn : onButton7Click
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}
<br>
&nbsp;&nbsp;&nbsp;&nbsp;}
<br>
&nbsp;&nbsp;});
<br>
<br>
&nbsp;&nbsp;var be8 = new Button({
<br>
&nbsp;&nbsp;&nbsp;&nbsp;renderTo : 'button_example',
<br>
&nbsp;&nbsp;&nbsp;&nbsp;text : '新按钮',
<br>
&nbsp;&nbsp;&nbsp;&nbsp;listeners : {
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'click' : {
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fn : onButton8Click
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}
<br>
&nbsp;&nbsp;&nbsp;&nbsp;}
<br>
&nbsp;&nbsp;});
<br>
<br>
&nbsp;&nbsp;...
<br>
}());
				</pre>
			</div>
	        
			<h3>参数</h3>
		    <div class="table-responsive">
		      <table class="table table-bordered table-striped">
		        <thead>
		         <tr>
		           <th style="width: 100px;">名称</th>
		           <th style="width: 50px;">类型</th>
		           <th style="width: 100px;">默认值</th>
		           <th>描述</th>
		         </tr>
		        </thead>
		        <tbody>
		         <tr>
		           <td>disabled</td>
		           <td>Boolean</td>
		           <td></td>
		           <td>是否不可用。</td>
		         </tr>
		         <tr>
		           <td>type</td>
		           <td>String</td>
		           <td>'button'</td>
		           <td>&lt;button&gt;的type属性，<code>'button'</code>、<code>'submit'</code>和<code>'reset'</code>。</td>
		         </tr>
		         <tr>
		           <td>name</td>
		           <td>String</td>
		           <td></td>
		           <td>&lt;button&gt;的name属性。</td>
		         </tr>
		         <tr>
		           <td>value</td>
		           <td>String</td>
		           <td></td>
		           <td>&lt;button&gt;的value属性。</td>
		         </tr>
		         <tr>
		           <td>iconCls</td>
		           <td>String</td>
		           <td></td>
		           <td>按钮图标的class。</td>
		         </tr>
		         <tr>
		           <td>text</td>
		           <td>String</td>
		           <td></td>
		           <td>按钮的文字。</td>
		         </tr>
		        </tbody>
		      </table>
		    </div><!-- /.table-responsive -->
		    <h3>方法</h3>
		    <h4>void setIconCls(String cls)</h4>
		    <p>设置按钮的图标</p>
		    <div class="highlight"><pre>	        
	        var button = new Button(option);
			<br>button.setIconCls('glyphicon glyphicon-ok');
		    </pre>
			</div>
		    <h4>void setText(String text)</h4>
		    <p>设置按钮的文字</p>
		    <div class="highlight"><pre>	        
	        var button = new Button(option);
			<br>button.setText('text');
		    </pre>
			</div>
	      </div>
	      
	      <div class="bs-docs-section">
	        <div class="page-header">
	          <h1 id="form">表单 <small>Form</small></h1>
	        </div>
	
	        <h2 id="form_submit">提交</h2>
	        
	        <h3>示例</h3>	
	        <div class="bs-example">
		      <form id="form_submit_example">
				<div class="row">
					<div class="yi-form-element form-group col-md-3">
						<label class="yi-form-label">项目名称：</label>
						<div class="yi-form-input-wrap">
							<input class="form-control" type="text" name="name" />
						</div>
					</div>
				</div>
				<div class="row">
					<div class="yi-form-element form-group col-md-8">
						<label class="yi-form-label">项目描述：</label>
						<div class="yi-form-input-wrap">
							<textarea class="form-control" rows="8" name="description"></textarea>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="yi-form-element form-group col-md-3">
						<label class="yi-form-label">项目开始于：</label>
						<div class="yi-form-input-wrap input-group">
							<input class="form-control date-start-pick" type="text" name="startDate" />
							<span class="input-group-btn">
								<button class="btn btn-default" type="button">
									<span class="glyphicon glyphicon-calendar"></span>
								</button>
							</span>
						</div>
					</div>
					<div class="yi-form-element form-group col-md-offset-1 col-md-3">
						<label class="yi-form-label">项目结束于：</label>
						<div class="yi-form-input-wrap input-group">
							<input class="form-control date-end-pick" type="text" name="endDate" />
							<span class="input-group-btn">
								<button class="btn btn-default" type="button">
									<span class="glyphicon glyphicon-calendar"></span>
								</button>
							</span>
						</div>
					</div>
				</div>
				<div>
					<button id="form_submit_example_submit_btn" type="button" class="btn btn-primary">提交</button>
				</div>
				<br>
				<p>你输入的是：
					<br>
					<br>
					项目名称：<strong id="form_submit_example_name"></strong>
					<br>
					项目描述：<strong id="form_submit_example_description"></strong>
					<br>
					项目开始于：<strong id="form_submit_example_start_date"></strong>
					<br>
					项目结束于：<strong id="form_submit_example_end_date"></strong>
				</p>
		      </form>
		    </div><!-- /example -->
			<div class="highlight">
				<pre>
// html>
<br>
&lt;form id="form_submit_example"&gt;
<br>
&nbsp;&nbsp;&lt;div class="row"&gt;
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&lt;div class="yi-form-element form-group col-md-3"&gt;
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;label class="yi-form-label"&gt;项目名称：&lt;/label&gt;
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div class="yi-form-input-wrap"&gt;
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;input class="form-control" type="text" name="name" /&gt;
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;
<br>
&nbsp;&nbsp;&lt;/div&gt;
<br>
&nbsp;&nbsp;&lt;div class="row"&gt;
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&lt;div class="yi-form-element form-group col-md-8"&gt;
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;label class="yi-form-label"&gt;项目描述：&lt;/label&gt;
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div class="yi-form-input-wrap"&gt;
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;textarea class="form-control" rows="8" name="description"&gt;&lt;/textarea&gt;
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;
<br>
&nbsp;&nbsp;&lt;/div&gt;
<br>
&nbsp;&nbsp;&lt;div class="row"&gt;
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&lt;div class="yi-form-element form-group col-md-3"&gt;
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;label class="yi-form-label"&gt;项目开始于：&lt;/label&gt;
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div class="yi-form-input-wrap input-group"&gt;
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;input class="form-control date-start-pick" type="text" name="startDate" /&gt;
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;span class="input-group-btn"&gt;
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;button class="btn btn-default" type="button"&gt;
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;span class="glyphicon glyphicon-calendar"&gt;&lt;/span&gt;
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/button&gt;
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/span&gt;
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&lt;div class="yi-form-element form-group col-md-offset-1 col-md-3"&gt;
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;label class="yi-form-label"&gt;项目结束于：&lt;/label&gt;
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;div class="yi-form-input-wrap input-group"&gt;
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;input class="form-control date-end-pick" type="text" name="endDate" /&gt;
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;span class="input-group-btn"&gt;
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;button class="btn btn-default" type="button"&gt;
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;span class="glyphicon glyphicon-calendar"&gt;&lt;/span&gt;
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/button&gt;
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/span&gt;
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;
<br>
&nbsp;&nbsp;&lt;/div&gt;
<br>
&nbsp;&nbsp;&lt;div&gt;
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&lt;button id="form_submit_example_submit_btn" type="button" class="btn btn-primary"&gt;提交&lt;/button&gt;
<br>
&nbsp;&nbsp;&lt;/div&gt;
<br>
&nbsp;&nbsp;&lt;br&gt;
<br>
&nbsp;&nbsp;&lt;p&gt;你输入的是：
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&lt;br&gt;
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&lt;br&gt;
<br>
&nbsp;&nbsp;&nbsp;&nbsp;项目名称：&lt;strong id="form_submit_example_name"&gt;&lt;/strong&gt;
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&lt;br&gt;
<br>
&nbsp;&nbsp;&nbsp;&nbsp;项目描述：&lt;strong id="form_submit_example_description"&gt;&lt;/strong&gt;
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&lt;br&gt;
<br>
&nbsp;&nbsp;&nbsp;&nbsp;项目开始于：&lt;strong id="form_submit_example_start_date"&gt;&lt;/strong&gt;
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&lt;br&gt;
<br>
&nbsp;&nbsp;&nbsp;&nbsp;项目结束于：&lt;strong id="form_submit_example_end_date"&gt;&lt;/strong&gt;
<br>
&nbsp;&nbsp;&lt;/p&gt;
<br>
&lt;/form&gt;
<br>
<br>
// javascript
<br>
function onSubmitFormRender(c) {
<br>
&nbsp;&nbsp;this.el.find('input[name=startDate]').val(formatter.format(new Date()));
<br>
}
<br>
<br>
function submit(b, e) {
<br>
&nbsp;&nbsp;this.submit({
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;url : 'data/url-for-submit-form.jsp',
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;method : 'POST',
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;success : onSubmitSuccess,
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;scope : this
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;});
<br>
}
<br>
<br>
function onSubmitSuccess(form, xhr) {
<br>
&nbsp;&nbsp;var r = $.parseJSON(xhr.responseText);
<br>
&nbsp;&nbsp;if (r) {
<br>
&nbsp;&nbsp;&nbsp;&nbsp;$('#form_submit_example_name').html(r.name);
<br>
&nbsp;&nbsp;&nbsp;&nbsp;$('#form_submit_example_description').html(r.description);
<br>
&nbsp;&nbsp;&nbsp;&nbsp;$('#form_submit_example_start_date').html(r.startDate);
<br>
&nbsp;&nbsp;&nbsp;&nbsp;$('#form_submit_example_end_date').html(r.endDate);
<br>
&nbsp;&nbsp;}
<br>
}
<br>
<br>
(function() {
<br>
&nbsp;&nbsp;...
<br>
<br>
&nbsp;&nbsp;var submitForm = new Form({
<br>
&nbsp;&nbsp;&nbsp;&nbsp;applyTo : 'form_submit_example',
<br>
&nbsp;&nbsp;&nbsp;&nbsp;listeners : {
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'render' : {
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fn : onSubmitFormRender
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}
<br>
&nbsp;&nbsp;&nbsp;&nbsp;}
<br>
&nbsp;&nbsp;});
<br>
&nbsp;&nbsp;var submitBtn = new Button({
<br>
&nbsp;&nbsp;&nbsp;&nbsp;applyTo : 'form_submit_example_submit_btn',
<br>
&nbsp;&nbsp;&nbsp;&nbsp;listeners : {
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'click' : {
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fn : submit,
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;scope : submitForm
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}
<br>
&nbsp;&nbsp;&nbsp;&nbsp;}
<br>
&nbsp;&nbsp;});
<br>
<br>
&nbsp;&nbsp;...
<br>
}
				</pre>
			</div>
			
			<h3>方法</h3>
			<h4>void submit(Object option)</h4>
		    <p>提交表单。</p>
			<div class="highlight">
				<pre>
form.submit(option);
				</pre>
			</div>
			<p>提交时的参数有
				<br>
				<strong>original</strong> Boolean : 是否使用原生的表单提交
				<br>
				<strong>url</strong> String : URL，在<code>&lt;form&gt;</code>上加<code>action</code>属性也可以，url参数优先。
				<br>
				<strong>params</strong> Object : 额外的参数。
				<br>
				<strong>mothod</strong> String : <code>'GET'</code> or <code>'POST'</code>，默认<code>'GET'</code>。
				<br>
				<strong>success</strong> Function : 成功时的回调，函数格式：<code>function(Form form, XmlHttpRequest xhr)</code>。
				<br>
				<strong>failure</strong> Function : 失败时的回调，函数格式：<code>function(Form form, XmlHttpRequest xhr)</code>。
				<br>
				<strong>timeout</strong> Number : 超时设置，单位：毫秒。
				<br>
				<strong>scope</strong> Object : success和failure的作用域。
			</p>
	      </div>
      
      <div class="bs-docs-section">
        <div class="page-header">
          <h1 id="grid">栅格</h1>
        </div>
        <p class="lead">TODO</p>

        <h2 id="grid-example">案例</h2>
        <p>TODO</p>
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
<script type="text/javascript">
	(function() {
		yi.ready(function() {
			// JSP中用seajs.use加载模块始终用绝对路径
			seajs.use('./examples/components/components.js', function(Module) {
				Module.run();
			});
		});
	}());
</script>
<script src="assets/js/docs.js" type="text/javascript"></script>
</body>
</html>