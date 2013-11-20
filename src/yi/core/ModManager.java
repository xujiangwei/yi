/*
 * Yi Framework
 * 
 * Copyright (c) 2013,2014 DHC Software Research Department
 */

package yi.core;

import java.io.File;
import java.io.FilenameFilter;
import java.util.HashMap;
import java.util.Timer;
import java.util.TimerTask;

import yi.util.AbstractLifeCycle;
import yi.util.LifeCycleState;

/**
 * Mod 管理器。
 * 
 * @author Jiangwei Xu
 */
public final class ModManager extends AbstractLifeCycle {

	private final static ModManager instance = new ModManager();

	private Timer timer;
	private TimerTask task;

	private String workPath;

	public final String modSubPath = "modules";
	public final String deploySubPath = "working";

	// Key：MOD 名称
	private HashMap<String, Mod> mods;

	private ModManager() {
		this.timer = new Timer();
		this.mods = new HashMap<String, Mod>();
	}

	public static ModManager getInstance() {
		return ModManager.instance;
	}

	/**
	 * 作废刷新周期。
	 */
	public void invalid() {
		this.timer.cancel();
		this.timer.schedule(this.task, 1000, 5 * 60 * 1000);
	}

	protected void setWorkPath(String path) {
		this.workPath = path;
	}

	@Override
	protected void doStart() {
		this.task = new DaemonTimerTask();
		this.timer.schedule(this.task, 5000, 5 * 60 * 1000);
	}

	@Override
	protected void doStop() {
		this.timer.cancel();
		this.task = null;
	}

	protected void addMod(Mod mod) {
		this.mods.put(mod.getName(), mod);
	}

	public boolean hasMod(String modName) {
		return false;
	}

	/**
	 * 部署 MOD 。
	 */
	private void deploy(File modFile, String deployPath) {
		try {
			String filename = modFile.getName();
			// 分析文件名
			int index = filename.lastIndexOf("_");
			// 模组名
			String modName = filename.substring(0, index);
			// 版本号
			String version = filename.substring(index + 1, filename.length() - 4);

			String path = deployPath + modName + File.separator + version + File.separator;
			File dir = new File(path);
			if (!dir.exists())
				dir.mkdirs();

			Mod mod = ModReader.read(modFile, path);
			// 添加 Mod 到管理器
			if (null != mod)
				addMod(mod);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 用户定时扫描和维护模块的守护定时任务。
	 * @author Jiangwei Xu
	 */
	protected class DaemonTimerTask extends TimerTask {

		private FilenameFilter filter;
		private String modPath;
		private String deployPath;

		private HashMap<String, Long> modFileLastModifieds;

		protected DaemonTimerTask() {
			this.filter = new FilenameFilter() {
				@Override
				public boolean accept(File dir, String name) {
					return (name.endsWith("mod"));
				}
			};

			// 路径
			this.modPath = workPath + modSubPath + File.separator;
			this.deployPath = workPath + deploySubPath + File.separator;

			File dir = new File(this.deployPath);
			if (!dir.exists()) {
				dir.mkdir();
			}
			else if (!dir.isDirectory()) {
				dir.delete();
				dir.mkdir();
			}

			this.modFileLastModifieds = new HashMap<String, Long>(8);
		}

		@Override
		public void run() {
			// 变更状态
			changeState(LifeCycleState.RUNNING);

			// 扫描指定目录
			File workDir = new File(this.modPath);
			if (workDir.isDirectory()) {
				String[] list = workDir.list(this.filter);
				if (null != list && list.length > 0) {
					for (String filename : list) {
						File modFile = new File(this.modPath + filename);
						if (this.modFileLastModifieds.containsKey(filename)) {
							// 判断文件修改时间
							Long lastModified = this.modFileLastModifieds.get(filename);
							if (lastModified.longValue() == modFile.lastModified()) {
								// 修改时间相同，跳过该文件
								continue;
							}
						}

						// 更新修改日期记录
						this.modFileLastModifieds.put(filename.toString(), modFile.lastModified());

						// 部署文件到部署路径
						deploy(modFile, this.deployPath);
					}
				}
			}
		}
	}
}
