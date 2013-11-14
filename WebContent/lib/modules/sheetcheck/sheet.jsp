<%@ page language="java" contentType="text/html;charset=utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
    <script type="text/javascript" src="${pageContext.request.contextPath}/frmwk/sheetparsley/js/jquery-1.7.2.js"></script>
	
	<script type="text/javascript" src="${pageContext.request.contextPath}/frmwk/sheetparsley/js/sheetcheck.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/frmwk/sheetparsley/js/parsley.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/frmwk/sheetparsley/js/parsley.extend.js"></script>
	<input type="hidden" id="PATH" value="<%=basePath %>" />
<script>
	var contextPath="<%=path%>";
</script>
