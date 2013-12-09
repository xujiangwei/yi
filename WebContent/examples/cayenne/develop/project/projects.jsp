<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="UTF-8"%>
<%@ include file="../../common/taglibs.jsp"%>
<!DOCTYPE html>
<html>
<head>
<title>Projects</title>
</head>
<body>
	<div id="projects" class="otu-page">
		<div class="otu-page-header">所有项目</div>
		<div class="btn-group">
			<button id="projects_create_project_btn" type="button" class="btn btn-default">
				<span class="glyphicon glyphicon-plus"></span> 创建
			</button>
			<button type="button" class="btn btn-default">
				<span class="glyphicon glyphicon-save"></span> 导入
			</button>
		</div>
		<div class="row">
			<div id="projects_gallery" class="col-lg-12"></div>
		</div>

		<a id="closed_projects_switch" href="javascript:void(0)">已结束项目>></a>
		<div class="row">
			<div id="closed_projects_gallery" class="col-lg-12"></div>
		</div>
	</div>
	<!-- JavaScript -->
	<script type="text/javascript">
		seajs.use('${ctx}/develop/project/projects', function(Projects) {
			Projects.run(/* arg */);
		});
	</script>
</body>
</html>