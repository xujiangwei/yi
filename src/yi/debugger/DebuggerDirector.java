/*
 * Yi Framework
 * 
 * Copyright (c) 2013,2014 DHC Software Research Department
 */

package yi.debugger;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Timer;
import java.util.TimerTask;

import yi.core.Mod;
import yi.core.ModReader;
import yi.util.AbstractLifeCycle;
import yi.util.LifeCycleState;

/**
 * 调试器引导管理类。
 * 
 * @author Jiangwei Xu
 *
 */
public final class DebuggerDirector extends AbstractLifeCycle {

	private final static DebuggerDirector instance = new DebuggerDirector();

	private String rootPath;
	private String workPath;
	private String managedDir = "debugger" + File.separator + "modules" + File.separator;

	private Timer timer;
	private HashMap<String, Mod> mods;

	private DebuggerDirector() {
		this.timer = new Timer();
		this.mods = new HashMap<String, Mod>(8);
	}

	public static DebuggerDirector getInstance() {
		return DebuggerDirector.instance;
	}

	/**
	 * 返回在调试目录下的所有 MOD 的清单。
	 * @return
	 */
	public List<Mod> getModList() {
		ArrayList<Mod> list = new ArrayList<Mod>(this.mods.size());
		list.addAll(this.mods.values());
		Collections.sort(list);
		return list;
	}

	/**
	 * 返回指定的 MOD 。
	 * @param name
	 * @param version
	 * @return
	 */
	public Mod getMod(String name, String version) {
		Mod mod = this.mods.get(name);
		if (null != mod && mod.getVersion().equals(version)) {
			return mod;
		}

		return null;
	}

	/**
	 * 设置工作路径。
	 * @param path
	 */
	public void setRootPath(String path) {
		this.rootPath = path;
		this.workPath = path + this.managedDir;
	}

	/**
	 * 返回工作路径。
	 * @return
	 */
	public String getRootPath() {
		return this.rootPath;
	}

	public String getProjectPath() {
		return this.rootPath + "debugger" + File.separator;
	}

	@Override
	protected void doStart() {
		this.timer.schedule(new DaemonTimerTask(), 2000, 10 * 60 * 1000);
	}

	@Override
	protected void doStop() {
		this.timer.cancel();
	}

	protected void registerMod(Mod mod) {
		this.mods.put(mod.getName(), mod);
	}

	/**
	 * 定时器任务。
	 * @author Jiangwei Xu
	 */
	protected class DaemonTimerTask extends TimerTask {
		protected DaemonTimerTask() {
			
		}

		@Override
		public void run() {
			// 变更状态
			changeState(LifeCycleState.RUNNING);

			// 扫描目录获取调试模组
			File dir = new File(workPath);
			String[] list = dir.list();
			if (null != list && list.length > 0) {
				for (String name : list) {
					String filename = workPath + name;
					File file = new File(filename);
					this.scanAndParse(file);
				}
			}
		}

		/**
		 * 递归搜索。
		 * @param dir
		 */
		private void scanAndParse(File file) {
			if (file.isDirectory()) {
				String[] list = file.list();
				if (null == list || list.length == 0) {
					return;
				}

				// 路径
				String path = file.getPath() + File.separator;

				// 分析目录
				for (String name : list) {
					File f = new File(path + name);
					if (f.isFile() && name.equals(Debugger.MOD_CONFIG_FILE)) {
						// 该目录下有配置文件，进行分析
						try {
							// 读取配置文件
							Mod mod = ModReader.readConfig(f);
							if (null == mod) {
								continue;
							}

							// 分析上下文路径
							int index = f.getParent().indexOf(managedDir);
							String cp = f.getParent().substring(index);
							index = cp.indexOf(File.separator);
							cp = cp.substring(index + 1).replaceAll("\\\\", "/");;
							// 设置上下文路径
							mod.setContextPath(cp);
							// 注册 MOD
							registerMod(mod);
						} catch (IOException e) {
							e.printStackTrace();
						}
					}
					else if (f.isDirectory()) {
						this.scanAndParse(f);
					}
				}
			}
		}
	}
}
