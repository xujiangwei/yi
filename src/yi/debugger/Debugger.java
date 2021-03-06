/*
 * Yi Framework
 * 
 * Copyright (c) 2013,2014 DHC Software Research Department
 */

package yi.debugger;

import javax.servlet.http.HttpServletRequest;

import yi.core.Mod;

/**
 * 模组调试器。
 * 
 * @author Jiangwei Xu
 *
 */
public class Debugger {

	public final static String MOD_CONFIG_FILE = "mod.xml";

	public static final String NAME = "name";
	public static final String VERSION = "version";

	private String version = "1.0.0";
	private String milestone = "Alpha";

	private Mod mod = null;

	protected Debugger(HttpServletRequest request) {
		String name = request.getParameter(NAME);
		String version = request.getParameter(VERSION);

		if (null != name && null != version) {
			this.mod = DebuggerDirector.getInstance().getMod(name, version);
		}

		if (null == this.mod) {
			this.mod = new Mod();
		}
	}

	/**
	 * 返回调试器版本号。
	 * @return
	 */
	public String getVersion() {
		return this.version;
	}

	/**
	 * 返回调试器里程碑信息。
	 * @return
	 */
	public String getMilestone() {
		return this.milestone;
	}

	/**
	 * 返回 MOD 。
	 * @return
	 */
	public Mod getMod() {
		return this.mod;
	}
}
