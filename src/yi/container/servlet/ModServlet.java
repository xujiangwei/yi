/*
 * Yi Framework
 * 
 * Copyright (c) 2013,2014 DHC Software Research Department
 */

package yi.container.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import yi.core.Mod;
import yi.core.ModManager;
import yi.debugger.DebuggerDirector;

/**
 * 查询 MOD 信息。
 * 
 * 格式1：mod/${mod_name}/${mod_version}
 * 
 * @author Jiangwei Xu
 */
@WebServlet(
	name = "mod",
	urlPatterns = { "/mod", "/mod/*" },
	loadOnStartup = 1
)
public class ModServlet extends AbstractHttpServlet {

	private static final long serialVersionUID = 1665855495027080547L;

	public ModServlet() {
		super();
	}

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String pathInfo = request.getPathInfo();
		String[] info = pathInfo.split("/");
		if (info.length >= 3) {
			String name = info[1];
			String version = info[2];

			// debug
			boolean debug = false;
			String strDebug = request.getParameter("_d");
			if (null != strDebug && strDebug.equals("true"))
				debug = true;

			Mod mod = null;
			if (debug)
				mod = DebuggerDirector.getInstance().getMod(name, version);
			else
				mod = ModManager.getInstance().getMod(name, version);
			if (null != mod) {
				this.wrapResponseWithOk(response, mod.toJSON());
			}
			else {
				this.wrapResponse(response, HttpServletResponse.SC_NOT_FOUND);
			}
		}
		else {
			this.wrapResponse(response, HttpServletResponse.SC_BAD_REQUEST);
		}
	}
}
