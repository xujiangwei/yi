<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<!-- 页面元信息，应该在<header />中加载 -->
<!-- HTML Content Type -->
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<!-- force IE8+ to use the highest document mode -->
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<!-- enable cache in online mode but not in developing mode -->
<c:if test="${'dev' eq runMode}">
	<!-- HTTP 1.1 -->
	<meta http-equiv="Cache-Control" content="no-store" />
	<!-- HTTP 1.0 -->
	<meta http-equiv="pragma" content="no-cache" />
	<meta http-equiv="expires" content="0" />
</c:if>
<c:if test="${'online' eq runMode}">
	<meta http-equiv="Cache-Control" content="max-age=86400" />
</c:if>
<!-- page generator -->
<meta name="generator" content="Cayenne Service Desk 4.0" />
<!-- icon -->
<link rel="icon" href="<c:url value="/images/favicon.ico"/>" />