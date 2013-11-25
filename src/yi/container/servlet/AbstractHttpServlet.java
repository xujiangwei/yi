/*
 * Yi Framework
 * 
 * Copyright (c) 2013,2014 DHC Software Research Department
 */

package yi.container.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

/**
 * 抽象 HTTP Servlet 。
 * 
 * @author Jiangwei Xu
 */
public abstract class AbstractHttpServlet extends HttpServlet {

	private static final long serialVersionUID = -4893029735090022402L;

	public AbstractHttpServlet() {
		super();
	}

	/**
	 * 设置指定响应的状态码。
	 * @param response
	 * @param statusCode
	 */
	protected void wrapResponse(HttpServletResponse response, int statusCode) {
		response.setContentType("text/html");
		response.setCharacterEncoding("utf-8");
		response.setStatus(statusCode);
	}

	/**
	 * 设置指定响应的状态为 200 。
	 * @param response
	 */
	protected void wrapResponseWithOk(HttpServletResponse response) {
		response.setContentType("text/html");
		response.setCharacterEncoding("utf-8");
		response.setStatus(HttpServletResponse.SC_OK);
	}

	/**
	 * 设置指定响应的数据，并返回状态码 200 。
	 * @param response
	 * @param json
	 */
	protected void wrapResponseWithOk(HttpServletResponse response, JSONObject json) {
		response.setContentType("text/html");
		response.setCharacterEncoding("utf-8");
		response.setStatus(HttpServletResponse.SC_OK);

		try {
			response.getWriter().print(json.toString());
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				response.getWriter().close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

	/**
	 * 设置指定响应的数据和状态码。
	 * @param response
	 * @param statusCode
	 * @param json
	 */
	protected void wrapResponseWithOk(HttpServletResponse response, int statusCode, JSONObject json) {
		response.setContentType("text/html");
		response.setCharacterEncoding("utf-8");
		response.setStatus(statusCode);

		try {
			response.getWriter().print(json.toString());
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				response.getWriter().close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		this.wrapResponse(response, HttpServletResponse.SC_NOT_FOUND);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		this.wrapResponse(response, HttpServletResponse.SC_NOT_FOUND);
	}
}
