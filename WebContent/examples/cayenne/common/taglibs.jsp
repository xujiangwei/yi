<%@ page language="java" errorPage="/error.jsp" contentType="text/html; charset=utf-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<c:set var="ctx" value="${pageContext.request.contextPath}" />
<c:set var="datePattern">
	<fmt:message key="date.format" />
</c:set>
<c:set var='locale'>
	<c:choose>
		<c:when test="${sessionScope['org.springframework.web.servlet.i18n.SessionLocaleResolver.LOCALE'] ne null}">
			${sessionScope["org.springframework.web.servlet.i18n.SessionLocaleResolver.LOCALE"]}
		</c:when>
		<c:otherwise>
			${pageContext.request.locale}
		</c:otherwise>
	</c:choose>
</c:set>
<fmt:setLocale value="${locale}" scope="session"/>