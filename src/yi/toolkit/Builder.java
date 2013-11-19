/*
 * Yi Framework
 * 
 * Copyright (c) 2013,2014 DHC Software Research Department
 */

package yi.toolkit;

import java.io.File;

import yi.core.ModReader;
import yi.util.AbstractLifeCycle;
import yi.util.LifeCycleState;

/**
 * MOD 构建器。
 * 
 * @author Jiangwei Xu
 *
 */
public final class Builder extends AbstractLifeCycle {

	// 当前 Web 工程项目根路径（绝对路径）
	private String rootPath;
	// MOD 工程源目录（绝对路径）
	private String projectPath;
	// 需要构建的 MOD 的子路径
	private String subDir;

	// 打包工作路径
	private String workPath;
	// 临时文件路径
	private String tempPath;

	public Builder(String rootPath, String projectPath, String subDir) {
		this.rootPath = rootPath;
		this.projectPath = projectPath;
		this.subDir = subDir;

		this.workPath = this.rootPath + "working" + File.separator;
		this.tempPath = this.workPath + "temp" + File.separator;
	}

	/**
	 * 编译。
	 */
	private void compile() {
//		File file = new File(this.projectPath + this.subDir + "");
//		ModReader.readConfig(file)
	}

	/**
	 * 打包。
	 */
	private void pack() {
		
	}

	/**
	 * 部署。
	 */
	private void deploy() {
		
	}

	@Override
	protected void doStart() {
		Thread thread = new Thread() {
			@Override
			public void run() {
				changeState(LifeCycleState.RUNNING);

				compile();

				pack();

				deploy();
			}
		};
		thread.setName("Builder#this.subDir");
		thread.start();
	}

	@Override
	protected void doStop() {
		
	}
}
