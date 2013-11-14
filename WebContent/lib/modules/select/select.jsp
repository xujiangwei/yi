<%@ page language="java" pageEncoding="UTF-8"%>  
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/frmwk/select2package/css/select2.css" />
	<script type="text/javascript" src="${pageContext.request.contextPath}/frmwk/select2package/js/jquery-1.7.2.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/frmwk/select2package/js/select.js" charset="utf-8"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/frmwk/select2package/js/select2.js" charset="utf-8"></script>

	<input type="hidden" id="PATH" value="<%=basePath %>" />
<script>
	var contextPath="<%=path%>";
</script>
