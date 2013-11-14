/*
 * Yi Framework
 * 
 * Copyright (c) 2013,2014 DHC Software Research Department
 */

package yi.util;

/**
 * 所有组件对象生命周期接口。
 * 
 * @author Jiangwei Xu
 *
 */
public interface LifeCycle {

	/**
	 * 启动组件。
	 */
	public void start();

	/**
	 * 停止组件。
	 */
	public void stop();

	public boolean isStarting();

	public boolean isStarted();

	public boolean isRunning();

	public boolean isStopping();

	public boolean isStopped();

	public boolean isFailed();
}
