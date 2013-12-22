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

import org.json.JSONException;
import org.json.JSONObject;

import yi.core.Mod;
import yi.core.ModManager;
import yi.debugger.DebuggerDirector;

/**
 * 进行 MOD 管理。
 * 
 * 格式1：modmgm/${action}/${mod_name}/${mod_version}
 * action: new/delete_d/delete/redeploy_d/redeploy
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
			String name = info[2];
			String version = info[3];

			if (action.equals("new")) {
				// 在调试器中创建新工程
				String jsonString = this.readJSONStringFromRequestBody(request);
				if (null != jsonString) {
					JSONObject modJson = null;
					try {
						modJson = new JSONObject(jsonString);
						Mod mod = DebuggerDirector.getInstance().newMod(modJson);
						// 返回 MOD 数据
						this.wrapResponseWithOk(response, mod.toJSON());
					} catch (JSONException e) {
						this.wrapResponse(response, HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
					} catch (IOException e) {
						this.wrapResponse(response, HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
					}
				}
				else {
					this.wrapResponse(response, HttpServletResponse.SC_BAD_REQUEST);
				}
			}
			else if (action.equals("delete_d")) {
				// 删除 Debug 工程
				Mod mod = DebuggerDirector.getInstance().deleteMod(name, version);
				if (null != mod) {
					this.wrapResponseWithOk(response, mod.toJSON());
				}
				else {
					this.wrapResponse(response, HttpServletResponse.SC_NOT_FOUND);
				}
			}
			else if (action.equals("redeploy_d")) {
				// Debug 工程重新部署
				Mod mod = DebuggerDirector.getInstance().redeploy(name, version);
				if (null != mod) {
					this.wrapResponseWithOk(response, mod.toJSON());
				}
				else {
					this.wrapResponse(response, HttpServletResponse.SC_NOT_FOUND);
				}
			}
			else if (action.equals("delete")) {
				// 执行删除
				Mod mod = ModManager.getInstance().deleteMod(name, version);
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
			this.wrapResponse(response, HttpServletResponse.SC_BAD_REQUEST);
		}
	}
}
