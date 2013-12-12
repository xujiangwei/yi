<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="java.util.*" %>
<%@page import="yi.core.*" %>
<%@page import="yi.debugger.*" %>
<%
Debugger debugger = DebuggerPage.newDebugger(request);
Mod mod = debugger.getMod();
// 是否直接载入
String load = request.getParameter("load");
boolean direct = (null != load && (load.equals("1") || load.equals("true")));
%>
<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>调试器 - <%=mod.getName()%> <%=mod.getVersion()%></title>
<link href="../lib/core/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
<link href="../lib/core/yi/yi.min.css" rel="stylesheet" />
<link href="assets/css/app-debugger.css" rel="stylesheet" />
</head>

<body>
<header class="navbar navbar-default">
  <div class="container">
    <div class="navbar-header">
      <button class="navbar-toggle" type="button" data-toggle="collapse" data-target=".navbar-collapse">
      	<span class="sr-only">Toggle navigation</span>
      	<span class="icon-bar"></span>
      	<span class="icon-bar"></span>
      	<span class="icon-bar"></span>
      </button>
      <div class="navbar-brand">调试器</div>
    </div>
    <div class="collapse navbar-collapse">
      <ul class="nav navbar-nav nav-pills pull-right">
        <li><button id="btn_add" class="btn btn-default">添加</button></li>
        <li><button id="btn_help" class="btn btn-default">帮助</button></li>
      </ul>
    </div><!--/.nav-collapse -->
  </div>
</header>

<div class="container">
  <div class="row">
    <div id="mod_area_0" class="col-md-12">
      <div class="panel panel-primary">
        <div class="panel-heading">
          <div class="panel-title"><%=mod.getName()%> <%=mod.getVersion()%></div>
        </div>
        <div class="panel-body">
          <div class="row toolbar">
            <div class="col-md-9 col-sm-9">
              <form class="form-horizontal" role="form">
                <div class="form-group">
                  <label class="col-sm-3 control-label" for="input_args">主函数参数</label>
                  <div class="col-sm-9">
                    <div class="input-group">
                      <input type="text" class="form-control" id="input_args" placeholder="输入主函数参数" maxlength="512" />
                      <span class="input-group-btn">
                        <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" tabindex="-1">
                          <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu pull-right" role="menu">
                          <li><a id="btn_clear_args" href="javascript:;"><span class="glyphicon glyphicon-remove-circle"></span> 清空</a></li>
<%
List<String> presetList = mod.getPresetDebugArgs();
if (null != presetList) {
	int index = 0;
	for (String value : presetList) {
%>
                          <li><a id="btn_preset_arg_<%=index%>" href="javascript:;" data-value='<%=value%>'><span class="glyphicon glyphicon-pencil"></span> 预置参数<%=(index+1) %></a></li>
<%
		++index;
	}
}
%>
                        </ul>
                      </span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-3 control-label" for="input_params">URL参数</label>
                  <div class="col-sm-9">
                    <div class="input-group">
                      <input type="text" class="form-control" id="input_params" placeholder="输入URL参数" maxlength="512" />
                      <span class="input-group-btn">
                        <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" tabindex="-1">
                          <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu pull-right" role="menu">
                          <li><a id="btn_clear_params" href="javascript:;"><span class="glyphicon glyphicon-remove-circle"></span> 清空</a></li>
<%
presetList = mod.getPresetDebugParams();
if (null != presetList) {
	int index = 0;
	for (String value : presetList) {
%>
                          <li><a id="btn_preset_param_<%=index%>" href="javascript:;" data-value='<%=value%>'><span class="glyphicon glyphicon-pencil"></span> 预置参数<%=(index+1) %></a></li>
<%
		++index;
	}
}
%>
                        </ul>
                      </span>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div class="col-md-3 col-sm-3 action-group">
              <button id="btn_run" type="button" class="btn btn-ultrahigh btn-primary" data-toggle="tooltip" data-placement="top" title="加载"><span class="glyphicon glyphicon-play"></span></button>
              <button id="btn_reset" type="button" class="btn btn-ultrahigh btn-primary" data-toggle="tooltip" data-placement="top" title="重置"><span class="glyphicon glyphicon-refresh"></span></button>
            </div>
          </div>
          <hr />
          <div id="mod_container_0" class="mod-container mod">
            <div class="preview text-center"><h3>预览区域</h3></div>
          </div>
          <hr />
          <div class="debug-info">
            <div class="row">
              <div class="col-md-4 col-sm-4">
                <div class="text-center col-title">评测流程</div>
                <div class="text-center"><h4><div class="glyphicon glyphicon-chevron-down"></div></h4></div>
                <div class="alert alert-info text-center">准备阶段<br/>（脚本执行 + 网络 I/O<sup>*</sup>）</div>
                <div class="text-center"><h2><div class="glyphicon glyphicon-arrow-down"></div></h2></div>
                <div class="alert alert-info text-center">加载 HTML 数据<br/>（网络 I/O + 渲染）</div>
                <div class="text-center"><h2><div class="glyphicon glyphicon-arrow-down"></div></h2></div>
                <div class="alert alert-info text-center">加载脚本数据<br/>（网络 I/O + 解释执行）</div>
                <div class="text-center"><h2><div class="glyphicon glyphicon-arrow-down"></div></h2></div>
                <div class="alert alert-info text-center">执行回调函数<br/>（脚本执行）</div>
              </div>
              <div class="col-md-4 col-sm-4">
                <div class="text-center col-title">评测成绩</div>
                <div class="text-center"><h4><div class="glyphicon glyphicon-chevron-down"></div></h4></div>
                <div id="step_1" class="alert alert-success text-center">未执行<br/><span class="glyphicon glyphicon-question-sign"></span></div>
                <div class="text-center"><h2><div class="glyphicon glyphicon-arrow-down"></div></h2></div>
                <div id="step_2" class="alert alert-success text-center">未执行<br/><span class="glyphicon glyphicon-question-sign"></span></div>
                <div class="text-center"><h2><div class="glyphicon glyphicon-arrow-down"></div></h2></div>
                <div id="step_3" class="alert alert-success text-center">未执行<br/><span class="glyphicon glyphicon-question-sign"></span></div>
                <div class="text-center"><h2><div class="glyphicon glyphicon-arrow-down"></div></h2></div>
                <div id="step_4" class="alert alert-success text-center">未执行<br/><span class="glyphicon glyphicon-question-sign"></span></div>
              </div>
              <div class="col-md-4 col-sm-4">
                <div class="text-center col-title">评测评价</div>
                <div class="text-center"><h4><div class="glyphicon glyphicon-chevron-down"></div></h4></div>
                <div id="step_1_explain" class="alert alert-warning text-center">
                  <span class="text">未执行</span>
                  <div class="rating" data-toggle="tooltip" data-placement="left" title="评价等级"><span class="glyphicon glyphicon-question-sign"></span></div>
                </div>
                <div class="text-center"><h2><div class="glyphicon glyphicon-arrow-down"></div></h2></div>
                <div id="step_2_explain" class="alert alert-warning text-center">
                  <span class="text">未执行</span>
                  <div class="rating" data-toggle="tooltip" data-placement="left" title="评价等级"><span class="glyphicon glyphicon-question-sign"></span></div>
                </div>
                <div class="text-center"><h2><div class="glyphicon glyphicon-arrow-down"></div></h2></div>
                <div id="step_3_explain" class="alert alert-warning text-center">
                  <span class="text">未执行</span>
                  <div class="rating" data-toggle="tooltip" data-placement="left" title="评价等级"><span class="glyphicon glyphicon-question-sign"></span></div>
                </div>
                <div class="text-center"><h2><div class="glyphicon glyphicon-arrow-down"></div></h2></div>
                <div id="step_4_explain" class="alert alert-warning text-center">
                  <span class="text">未执行</span>
                  <div class="rating" data-toggle="tooltip" data-placement="left" title="评价等级"><span class="glyphicon glyphicon-question-sign"></span></div>
                </div>
              </div>
            </div><!-- /.row -->
            <div class="row">
              <div class="col-md-12">
                <ul>
                  <li><sup>*</sup> <span class="text-muted">只有配置了前置依赖项的项目需要在首次加载时执行网络 I/O 操作来下载对应的组件脚本文件。</span></li>
                  <li><span class="text-muted">评价等级由“五星”等级构成，从低到高依次为：极差、差、合格、好、极好。评价不作为最终判定模组工作能力的依据，仅供横向比较。</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- 页脚 -->
<div class="container page-wrapper-footer">
  <div class="row">
    <div class="col-md-12">
      <div>
        <p class="text-muted credit">&copy; 2013,2014 东华软件</p>
      </div>
    </div>
  </div>
</div>
<%=Stage.importScripts("../lib/")%>
<script type="text/javascript">
(function() {
	this.currentMod = <%=mod.toJSONString()%>;
	this.direct = <%=direct%>;
})();
</script>
<script src="assets/js/app-debugger.js" type="text/javascript"></script>
</body>
</html>
