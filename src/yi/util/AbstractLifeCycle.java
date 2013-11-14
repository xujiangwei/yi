/*
 * Yi Framework
 * 
 * Copyright (c) 2013,2014 DHC Software Research Department
 */

package yi.util;

/**
 * 抽象生命周期描述。
 * 
 * @author Jiangwei Xu
 *
 */
public abstract class AbstractLifeCycle implements LifeCycle {

	protected LifeCycleState state = LifeCycleState.STOPPED;
	protected Object monitor = new Object();

	public AbstractLifeCycle() {
	}

	@Override
	public void start() {
		synchronized (this.monitor) {
			if (this.state == LifeCycleState.RUNNING
				|| this.state == LifeCycleState.STARTED
				|| this.state == LifeCycleState.STARTING) {
				// 启动状态，不允许重复启动
				return;
			}

			// 变更状态
			this.state = LifeCycleState.STARTING;
		}

		// 执行 start
		this.doStart();

		synchronized (this.monitor) {
			// 变更状态
			this.state = LifeCycleState.STARTED;
		}
	}

	@Override
	public void stop() {
		synchronized (this.monitor) {
			if (this.state == LifeCycleState.STOPPED
				|| this.state == LifeCycleState.STOPPING) {
				return;
			}

			// 变更状态
			this.state = LifeCycleState.STOPPING;
		}

		// 执行 stop
		this.doStop();

		synchronized (this.monitor) {
			// 变更状态
			this.state = LifeCycleState.STOPPED;
		}
	}

	/**
	 * 执行启动。由子类覆盖实现。
	 */
	protected abstract void doStart();

	/**
	 * 执行停止。由子类覆盖实现。
	 */
	protected abstract void doStop();

	/**
	 * 变更状态。
	 * @param state
	 */
	protected void changeState(LifeCycleState state) {
		synchronized (this.monitor) {
			this.state = state;
		}
	}

	@Override
	public boolean isStarting() {
		synchronized (this.monitor) {
			return (LifeCycleState.STARTING == this.state);
		}
	}

	@Override
	public boolean isStarted() {
		synchronized (this.monitor) {
			return (LifeCycleState.STARTED == this.state);
		}
	}

	@Override
	public boolean isRunning() {
		synchronized (this.monitor) {
			return (LifeCycleState.RUNNING == this.state);
		}
	}

	@Override
	public boolean isStopping() {
		synchronized (this.monitor) {
			return (LifeCycleState.STOPPING == this.state);
		}
	}

	@Override
	public boolean isStopped() {
		synchronized (this.monitor) {
			return (LifeCycleState.STOPPED == this.state);
		}
	}

	@Override
	public boolean isFailed() {
		synchronized (this.monitor) {
			return (LifeCycleState.FAILED == this.state);
		}
	}
}
