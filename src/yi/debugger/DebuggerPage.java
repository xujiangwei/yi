/*
 * Yi Framework
 * 
 * Copyright (c) 2013,2014 DHC Software Research Department
 */

package yi.debugger;

import javax.servlet.http.HttpServletRequest;

/**
 * 模组调试页面。
 * 
 * @author Jiangwei Xu
 *
 */
public final class DebuggerPage {

	private DebuggerPage() {
		
	}

	/**
	 * 创建新的调试器。
	 * @param request
	 * @param path
	 * @return
	 */
	public static Debugger newDebugger(HttpServletRequest request) {
		Debugger debugger = new Debugger(request);
		return debugger;
	}
}
