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

/**
 * MOD 加载器。
 * 
 * @author Jiangwei Xu
 *
 */
@WebServlet(
	name = "modloader",
	urlPatterns = { "/modloader", "/modloader/*" },
	loadOnStartup = 1
)
public class ModLoaderServlet extends AbstractHttpServlet {

	private static final long serialVersionUID = 8769885479938978845L;

	public ModLoaderServlet() {
		super();
	}

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String pathInfo = request.getPathInfo();
		String[] info = pathInfo.split("/");
		if (info.length >= 3) {
			String modName = info[1];
			String version = info[2];
			Mod mod = ModManager.getInstance().getMod(modName, version);
			if (null != mod) {
				this.wrapResponseWithOk(response, mod.toJSONWithRoot(request.getContextPath()));
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
