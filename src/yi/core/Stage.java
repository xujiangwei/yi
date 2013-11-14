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

	// 模块管理器
	private ModManager modMgr;

	private Stage() {
		this.modMgr = new ModManager();
	}

	public static Stage getInstance() {
		return Stage.instance;
	}

	public Stage config(StageConfig config) {
		this.deployPath = config.deployPath;

		this.modMgr.setWorkPath(this.deployPath);
		DebuggerDirector.getInstance().setWorkPath(this.deployPath);

		return this;
	}

	@Override
	protected void doStart() {
		this.modMgr.start();
		DebuggerDirector.getInstance().start();
	}

	@Override
	protected void doStop() {
		DebuggerDirector.getInstance().stop();
		this.modMgr.stop();
	}
}
