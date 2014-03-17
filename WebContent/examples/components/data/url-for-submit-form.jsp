<%@page language="java" contentType="text/html; charset=utf-8" pageEncoding="UTF-8"%>
<%
	out.write("{\"name\":\"" + request.getParameter("name")
			+ "\",\"description\":\""
			+ request.getParameter("description")
			+ "\",\"startDate\":\"" + request.getParameter("startDate")
			+ "\",\"endDate\":\"" + request.getParameter("endDate")
			+ "\"}");
%>