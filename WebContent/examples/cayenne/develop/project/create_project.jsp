<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="UTF-8"%>
<%@ include file="../../common/taglibs.jsp"%>
<!DOCTYPE html>
<html>
<head>
<title>Create Project</title>
</head>
<body>
	<div id="create_project" class="otu-page">
		<div class="otu-page-header">创建项目</div>
		<div id="create_project_steps" class="">步骤...</div>
		<!-- cardlayout should be applied-->
		<form id="create_project_form" class="yi-form">
			<div class="row">
				<div class="yi-form-element form-group col-lg-3">
					<label class="yi-form-label">项目名称：</label>
					<div class="yi-form-input-wrap">
						<input class="form-control" type="text" name="name" />
					</div>
				</div>
			</div>
			<div class="row">
				<div class="yi-form-element form-group col-lg-8">
					<label class="yi-form-label">项目描述：</label>
					<div class="yi-form-input-wrap">
						<textarea class="form-control" rows="8" name="description" />
					</div>
				</div>
			</div>
			<div class="row">
				<div class="yi-form-element form-group col-lg-3">
					<label class="yi-form-label">开发经理：</label>
					<div class="yi-form-input-wrap input-group">
						<input class="form-control" type="text" name="manager" />
						<span class="input-group-btn">
							<button class="btn btn-default" type="button">
								<span class="glyphicon glyphicon-search"></span>
							</button>
						</span>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="yi-form-element form-group col-lg-3">
					<label class="yi-form-label">项目开始于：</label>
					<div class="yi-form-input-wrap input-group">
						<input class="form-control" type="text" name="startDate" />
						<span class="input-group-btn">
							<button class="btn btn-default" type="button">
								<span class="glyphicon glyphicon-calendar"></span>
							</button>
						</span>
					</div>
				</div>
				<div class="yi-form-element form-group col-lg-offset-1 col-lg-3">
					<label class="yi-form-label">项目结束于：</label>
					<div class="yi-form-input-wrap input-group">
						<input class="form-control" type="text" name="endDate" />
						<span class="input-group-btn">
							<button class="btn btn-default" type="button">
								<span class="glyphicon glyphicon-calendar"></span>
							</button>
						</span>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="yi-form-element form-group col-lg-8">
					<label class="yi-form-label">项目里程碑：</label>
					<div class="yi-form-input-wrap">
						<div id="milestone" class="yi-timeline">
							<div class="yi-timeline-axis"></div>
							<div class="yi-timeline-start"><!-- 2013-06-23 --></div>
							<div class="yi-timeline-end"><!-- 2013-12-31 --></div>
							<!-- <div class="yi-timeline-point" title="2013-11-03">2013-11-03</div>
							<div class="yi-timeline-point" title="2013-12-04">2013-12-04</div> -->
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-lg-12">
					<button id="create_project_next_btn" type="button" class="btn btn-primary">上一步</button>
					<button id="create_project_pre_btn" type="button" class="btn btn-primary">下一步</button>
				</div>
			</div>
		</form>
	</div>
	</div>
	<!-- JavaScript -->
	<script type="text/javascript">
		seajs.use('${ctx}/develop/project/create_project', function(
				CreateProject) {
			CreateProject.run(/* arg */);
		});
	</script>
</body>
</html>