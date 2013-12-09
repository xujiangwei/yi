<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="UTF-8"%>
<%@ include file="../common/taglibs.jsp"%>
<!DOCTYPE html>
<html>
<head>
<title>Cayenne Developing Platform</title>
<%@ include file="../common/meta.jsp"%>
<%@ include file="../common/yi_css.jsp"%>
</head>
<body>
	<nav id="framework_header" class="navbar navbar-fixed-top navbar-inverse" role="navigation">
		<!-- Brand and toggle get grouped for better mobile display -->
		<div class="navbar-header">
			<!-- <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
				<span class="sr-only">Toggle navigation</span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</button> -->
			<a class="navbar-brand" href="#">
				<div id="framework_logo"></div>
				<div id="framework_brand">Cayenne</div>
			</a>
		</div>

		<!-- Collect the nav links, forms, and other content for toggling -->
		<div id="bs-example-navbar-collapse-1"
			class="collapse navbar-collapse container">
			<ul id="framework_tools" class="nav navbar-nav navbar-right">
				<li><a id="framework_fullscreen" href="#"><span class="glyphicon glyphicon-fullscreen"></span></a></li>
				<li><a id="framework_user" href="#"><span class="glyphicon glyphicon-user"></span></a></li>
				<li><a id="framework_message" href="#"><span class="glyphicon glyphicon-envelope"></span></a></li>
				<li><a id="framework_im" href="#"><span class="glyphicon glyphicon-comment"></span></a></li>
				<li><a id="framework_logout" href="#"><span class="glyphicon glyphicon-share-alt"></span></a></li>
			</ul>

			<form id="framework_search_form" class="navbar-form navbar-right" role="search">
				<div class="input-group">
					<input type="text" class="form-control" placeholder="搜索...">
					<span class="input-group-btn">
						<button class="btn btn-default" type="button">
							<span class="glyphicon glyphicon-search"></span>
						</button>
					</span>
				</div>
			</form>
		</div>
		<!-- /.navbar-collapse -->
	</nav>

	<ol id="framework_breadcrumb" class="breadcrumb"></ol>

	<div id="framework_body"></div>

	<!-- JavaScript -->
	<%@ include file="../common/yi_js.jsp"%>
	<script type="text/javascript">
		var pageUri = '${param.pageUri}';
		if (!pageUri || pageUri == 'null' || pageUri == '') {
			pageUri = null;
		}

		var ctx = '${ctx}';

		// JSP中用seajs.use加载模块始终用绝对路径
		seajs.use('${ctx}/develop/develop', function(Framework) {
			window.framework = new Framework(ctx, pageUri,
					'framework_breadcrumb', 'framework_body');
			framework.init();
		});
	</script>
</body>
</html>