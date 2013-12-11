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
 * 进行 MOD 管理。
 * 
 * 格式1：modmgm/${action}/${mod_name}/${mod_version}
 * action: delete/redeploy_d/redeploy
 * 
 * @author Jiangwei Xu
 */
@WebServlet(
	name = "modmgm",
	urlPatterns = { "/modmgm", "/modmgm/*" },
	loadOnStartup = 1
)
public class ModManagementServlet extends AbstractHttpServlet {

	private static final long serialVersionUID = 1665855495027080547L;

	public ModManagementServlet() {
		super();
	}

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String pathInfo = request.getPathInfo();
		String[] info = pathInfo.split("/");
		if (info.length >= 4) {
			String action = info[1];
			String modName = info[2];
			String version = info[3];

			if (ModManager.getInstance().existMod(modName, version)) {
				if (action.equals("delete")) {
					// 执行删除
					Mod mod = ModManager.getInstance().deleteMod(modName, version);
					if (null != mod) {
						this.wrapResponseWithOk(response, mod.toJSON());
					}
					else {
						this.wrapResponse(response, HttpServletResponse.SC_NOT_FOUND);
					}
				}
				else if (action.equals("redeploy_d")) {
					// Debug 工程重新部署
					Mod mod = DebuggerDirector.getInstance().redeploy(modName, version);
					if (null != mod) {
						this.wrapResponseWithOk(response, mod.toJSON());
					}
					else {
						this.wrapResponse(response, HttpServletResponse.SC_NOT_FOUND);
					}
				}
				else {
					this.wrapResponse(response, HttpServletResponse.SC_NOT_IMPLEMENTED);
				}
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
