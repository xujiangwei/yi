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

	protected void wrapResponse(HttpServletResponse response, int statusCode) {
		response.setContentType("text/html");
		response.setCharacterEncoding("utf-8");
		response.setStatus(statusCode);
	}

	protected void wrapResponseWithOk(HttpServletResponse response) {
		response.setContentType("text/html");
		response.setCharacterEncoding("utf-8");
		response.setStatus(HttpServletResponse.SC_OK);
	}

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
