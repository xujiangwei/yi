/*
 * Yi Framework
 * 
 * Copyright (c) 2013,2014 DHC Software Research Department
 */

package yi.core;

import yi.debugger.DebuggerDirector;
import yi.util.AbstractLifeCycle;

/**
 * 舞台对象。
 * 
 * @author Jiangwei Xu
 *
 */
public final class Stage extends AbstractLifeCycle {

	private final static Stage instance = new Stage();

	private String deployPath;

	private Stage() {
	}

	public static Stage getInstance() {
		return Stage.instance;
	}

	/**
	 * 导入基础脚本文件。
	 * @param contextPath
	 * @return
	 */
	public static String importScripts(String contextPath) {
		if (!contextPath.endsWith("/"))
			contextPath += "/";

		String[] list = new String[] {"core/jquery/jquery-1.10.2.min.js"
			, "core/bootstrap/js/bootstrap.min.js"
			, "core/seajs/sea.js"
			, "utils/store.js"
			, "utils/json2.js"
			, "core/yi/yi.js"
		};

		StringBuilder ret = new StringBuilder();
		for (String file : list) {
			ret.append("\n<script src=\"");
			ret.append(contextPath);
			ret.append(file);
			ret.append("\" type=\"text/javascript\"></script>");
		}

		list = null;
		return ret.toString();
	}

	/**
	 * 导入基础样式表文件。
	 * @param contextPath
	 * @return
	 */
	public static String importStyles(String contextPath) {
		if (!contextPath.endsWith("/"))
			contextPath += "/";

		String[] list = new String[] {"core/bootstrap/css/bootstrap.min.css"};

		StringBuilder ret = new StringBuilder();
		for (String file : list) {
			ret.append("\n<link href=\"");
			ret.append(contextPath);
			ret.append(file);
			ret.append("\" rel=\"stylesheet\" />");
		}

		return ret.toString();
	}

	/**
	 * 配置舞台参数。
	 * @param config
	 * @return
	 */
	public Stage config(StageConfig config) {
		this.deployPath = config.deployPath;

		ModManager.getInstance().setWorkPath(this.deployPath);
		DebuggerDirector.getInstance().setRootPath(this.deployPath);

		return this;
	}

	@Override
	protected void doStart() {
		ModManager.getInstance().start();
		DebuggerDirector.getInstance().start();
	}

	@Override
	protected void doStop() {
		DebuggerDirector.getInstance().stop();
		ModManager.getInstance().stop();
	}
}
