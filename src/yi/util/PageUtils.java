/*
 * Yi Framework
 * 
 * Copyright (c) 2013,2014 DHC Software Research Department
 */

package yi.util;

import javax.servlet.http.HttpServletRequest;

import yi.core.Mod;
import yi.core.ModManager;
import yi.debugger.DebuggerDirector;

/**
 * 页面辅助函数库。
 * 
 * @author Jiangwei Xu
 *
 */
public final class PageUtils {

	private static String PROJECT_CONTEXT_PATH = null;

	/**
	 * 返回请求的上下文路径。
	 * @param request
	 * @return
	 */
	public static String rootPath(HttpServletRequest request) {
		if (null == PROJECT_CONTEXT_PATH)
			PROJECT_CONTEXT_PATH = request.getContextPath();
		return PROJECT_CONTEXT_PATH;
	}

	/**
	 * 返回模组的根路径。
	 * @param request
	 * @return
	 */
	public static String modPath(HttpServletRequest request) {
		String cp = PageUtils.rootPath(request);
		String name = request.getParameter("_n");
		String version = request.getParameter("_v");
		boolean debug = Boolean.parseBoolean(request.getParameter("_d"));

		String ret = null;

		if (debug) {
			Mod mod = DebuggerDirector.getInstance().getMod(name, version);
			ret = cp + "/debugger/" + mod.getContextPath();
		}
		else {
			Mod mod = ModManager.getInstance().getMod(name, version);
			ret = cp + "/" + mod.getContextPath();
		}

		return ret;
	}

	/**
	 * 返回 MOD 的名称。
	 * @param request
	 * @return
	 */
	public static String getModName(HttpServletRequest request) {
		return request.getParameter("_n");
	}

	/**
	 * 返回 MOD 的版本号。
	 * @param request
	 * @return
	 */
	public static String getModVersion(HttpServletRequest request) {
		return request.getParameter("_v");
	}

	/**
	 * 是否调试模式。
	 * @param request
	 * @return
	 */
	public static boolean isDebug(HttpServletRequest request) {
		return Boolean.parseBoolean(request.getParameter("_d"));
	}

	/**
	 * 返回 MOD 对象实例。
	 * @param request
	 * @return
	 */
	public static Mod getMod(HttpServletRequest request) {
		String name = request.getParameter("_n");
		String version = request.getParameter("_v");
		boolean debug = Boolean.parseBoolean(request.getParameter("_d"));
		if (debug) {
			return DebuggerDirector.getInstance().getMod(name, version);
		}
		else {
			return ModManager.getInstance().getMod(name, version);
		}
	}

	/**
	 * TODO 返回共享文件目录的上下文路径。
	 * @param request
	 * @return
	 */
	public static String sharedImageFileContextPath(HttpServletRequest request) {
		String cp = PageUtils.rootPath(request);
		return cp;
	}
}
