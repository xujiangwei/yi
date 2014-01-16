<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="yi.core.*" %>
<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>栅格示例2 - 格式化单元格</title>
<!-- 通过 Stage 引入框架样式表 -->
<%=Stage.importStyles("../../lib/")%>
</head>

<body>

<div class="container">
  <div class="row">
    <div class="col-md-12">
      <div class="panel panel-primary">
        <div class="panel-heading">
          <span class="panel-title">栅格示例2 - 格式化单元格</span>
        </div>
        <div class="panel-body">

          <!-- 示例栅格 -->
          <div class="grid" id="main_grid"></div>

        </div>
      </div>
    </div>
  </div>
</div>

<!-- 通过 Stage 引入框架脚本 -->
<%=Stage.importScripts("../../lib/")%>
<!-- 引入页面应用的入口脚本 -->
<script type="text/javascript">
(function() {
	var yi = window.yi;

	// 配置
	yi.config("../../");

	yi.ready(function() {
		function formatter(row, cell, value, columnDef, dataContext) {
			return value;
		}

		// 定义列
		var columns = [
			{id: "title", name: "标题", field: "title", formatter:formatter},
			{id: "duration", name: "工期", field: "duration"},
			{id: "%", name: "完成(%)", field: "percentComplete"},
			{id: "start", name: "开始", field: "start"},
			{id: "finish", name: "结束", field: "finish"},
			{id: "medium-term", name: "中期检查", field: "mediumTerm"}];

		// 设置选项
		var options = {
			enableCellNavigation: true,
			enableColumnReorder: false,
			forceFitColumns: true
		};

		// 构建示例数据
		var data = [];
	    for (var i = 0; i < 500; ++i) {
			data[i] = {
				title: "任务 " + i,
				duration: ((Math.round(Math.random() * 100) % 10) + 2) + " 天",
				percentComplete: Math.round(Math.random() * 100),
				start: "01/02/2014",
				finish: "06/09/2014",
				mediumTerm: (i % 5 == 0)
			};
	    }

		common.use('grid', function(boot) {
			// 从引导程序异步创建 Grid
			boot(function(Grid) {
				var grid = new Grid({
								container: $('#main_grid'),
								data: data,
								columns: columns,
								options: options
				});
			});
		});
	});
})();
</script>
</body>
</html>
