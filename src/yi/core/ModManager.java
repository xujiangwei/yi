/*
 * Yi Framework
 * 
 * Copyright (c) 2013,2014 DHC Software Research Department
 */

package yi.core;

import java.io.File;
import java.io.FilenameFilter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
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

	// MOD 文件修改时间记录
	private HashMap<String, Long> modFileLastModifieds;

	// Key：MOD 名称，Value：版本与 MOD 实例映射
	private HashMap<String, HashMap<String, Mod>> mods;

	private ModManager() {
		this.modFileLastModifieds = new HashMap<String, Long>(8);
		this.mods = new HashMap<String, HashMap<String, Mod>>();
	}

	public static ModManager getInstance() {
		return ModManager.instance;
	}

	/**
	 * 返回指定名称和版本的 MOD 。
	 * @param name
	 * @param version
	 * @return
	 */
	public Mod getMod(String name, String version) {
		synchronized (this.mods) {
			HashMap<String, Mod> map = this.mods.get(name);
			if (null != map) {
				return map.get(version);
			}

			return null;
		}
	}

	/**
	 * 返回 Mod 列表。
	 * @return
	 */
	public List<Mod> getModList() {
		ArrayList<Mod> list = new ArrayList<Mod>(this.mods.size());
		for (HashMap<String, Mod> map : this.mods.values()) {
			list.addAll(map.values());
		}
		Collections.sort(list);
		return list;
	}

	/**
	 * 作废刷新周期。
	 */
	public synchronized void invalid() {
		if (null != this.timer)
			this.timer.cancel();
		this.timer = new Timer();
		this.task = new DaemonTimerTask();
		this.timer.schedule(this.task, 1000, 5 * 60 * 1000);
	}

	protected void setWorkPath(String path) {
		this.workPath = path;
	}

	@Override
	protected void doStart() {
		this.task = new DaemonTimerTask();
		if (null == this.timer) {
			this.timer = new Timer();
		}
		this.timer.schedule(this.task, 1000, 5 * 60 * 1000);
	}

	@Override
	protected void doStop() {
		if (null != this.timer) {
			this.timer.cancel();
		}
		this.task = null;
		this.timer = null;
	}

	/**
	 * 添加 MOD 到管理器。
	 * @param mod
	 */
	protected void addMod(Mod mod) {
		synchronized (this.mods) {
			HashMap<String, Mod> map = this.mods.get(mod.getName());
			if (null != map) {
				map.put(mod.getVersion(), mod);
			}
			else {
				map = new HashMap<String, Mod>();
				map.put(mod.getVersion(), mod);
				this.mods.put(mod.getName(), map);
			}
		}
	}

	/**
	 * 从管理器内移除指定的 MOD 。
	 * @param name
	 * @param version
	 */
	public Mod removeMod(String name, String version) {
		synchronized (this.mods) {
			HashMap<String, Mod> map = this.mods.get(name);
			if (null != map) {
				Mod mod = map.remove(version);
				if (map.isEmpty()) {
					this.mods.remove(name);
				}
				return mod;
			}

			return null;
		}
	}

	/**
	 * 删除 MOD 数据文件。
	 * @param name
	 * @param version
	 * @return
	 */
	public Mod deleteMod(String name, String version) {
		synchronized (this.mods) {
			HashMap<String, Mod> map = this.mods.get(name);
			if (null != map) {
				Mod mod = map.get(version);
				if (null != mod) {
					// 工作路径
					String path = this.workPath + this.modSubPath;
					File file = new File(path + File.separator + name + "_" + version + ".mod");
					if (file.exists()) {
						// 删除文件
						file.delete();
					}

					// 删除工作目录
					path = this.workPath + this.deploySubPath + File.separator;
					this.deleteWorkFiles(path, name, version);

					// 移除数据
					this.removeMod(name, version);
				}

				return mod;
			}

			return null;
		}
	}

	/**
	 * 返回指定的 MOD 是否已经添加。
	 * @param name
	 * @param version
	 * @return
	 */
	public boolean existMod(String name, String version) {
		synchronized (this.mods) {
			HashMap<String, Mod> map = this.mods.get(name);
			if (null != map && map.containsKey(version)) {
				return true;
			}

			return false;
		}
	}

	/**
	 * 删除模组工作目录下的所有文件。
	 */
	private void deleteWorkFiles(String path, String name, String version) {
		// 删除所有子目录及文件
		this.deleteDir(new File(path + name + File.separator + version));

		// 如果是空目录，则删除空目录
		File dir = new File(path + name + File.separator);
		if (dir.listFiles().length == 0) {
			dir.delete();
		}
	}

	private void deleteDir(File dir) {
		if (!dir.isDirectory()) {
			return;
		}

		File[] files = dir.listFiles();
		ArrayList<File> list = new ArrayList<File>(files.length);
		for (File file : files) {
			if (file.isDirectory()) {
				this.deleteDir(file);
			}
			else {
				list.add(file);
			}
		}

		if (!list.isEmpty()) {
			for (File file : list) {
				file.delete();
			}
		}

		File newDir = new File(dir.getAbsolutePath());
		if (newDir.listFiles().length == 0) {
			newDir.delete();
		}
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
			if (null != mod) {
				// 设置上下文
				mod.setContextPath(this.deploySubPath + "/" + mod.getName() + "/" + mod.getVersion());

				// 添加 Mod 到管理器
				this.addMod(mod);
			}
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
						if (modFileLastModifieds.containsKey(filename)) {
							// 判断文件修改时间
							Long lastModified = modFileLastModifieds.get(filename);
							if (lastModified.longValue() == modFile.lastModified()) {
								// 修改时间相同，跳过该文件
								continue;
							}
						}

						// 更新修改日期记录
						modFileLastModifieds.put(filename.toString(), modFile.lastModified());

						// 部署文件到部署路径
						deploy(modFile, this.deployPath);
					}
				}
			}
		}
	}
}
