/*
 * Yi Framework
 * 
 * Copyright (c) 2013,2014 DHC Software Research Department
 */

package yi.util;

/**
 * 生命周期状态描述。
 * 
 * @author Jiangwei Xu
 *
 */
public enum LifeCycleState {

	// 正在启动
	STARTING("STARTING"),

	// 已启动
	STARTED("STARTED"),

	// 正在运行
	RUNNING("RUNNING"),

	// 正在停止
	STOPPING("STOPPING"),

	// 已停止
	STOPPED("STOPPED"),

	// 失败或错误
	FAILED("FAILED");

	private String code;

	LifeCycleState(String code) {
		this.code = code;
	}

	public String asCode() {
		return this.code;
	}

	@Override
	public String toString() {
		return this.code;
	}
}
