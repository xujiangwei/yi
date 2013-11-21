/*
 * Yi Framework
 * 
 * Copyright (c) 2013,2014 DHC Software Research Department
 */

package yi.util;

import javax.servlet.http.HttpServletRequest;

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
	public static String root(HttpServletRequest request) {
		if (null == PROJECT_CONTEXT_PATH)
			PROJECT_CONTEXT_PATH = request.getContextPath();
		return PROJECT_CONTEXT_PATH;
	}
}
