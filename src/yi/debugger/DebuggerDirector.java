/*
 * Yi Framework
 * 
 * Copyright (c) 2013,2014 DHC Software Research Department
 */

package yi.debugger;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.channels.FileChannel;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.atomic.AtomicBoolean;

import org.json.JSONException;
import org.json.JSONObject;

import yi.core.Mod;
import yi.core.ModReader;
import yi.core.ModWriter;
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
	protected String workPath;
	private final String managedDir = "debugger" + File.separator + "modules" + File.separator;

	private Timer timer;
	private HashMap<String, HashMap<String, Mod>> mods;

	private AtomicBoolean taskRunning;

	private Setting setting;

	private DebuggerDirector() {
		this.timer = new Timer();
		this.mods = new HashMap<String, HashMap<String, Mod>>(8);
		this.taskRunning = new AtomicBoolean(false);
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
		synchronized (this.mods) {
			for (HashMap<String, Mod> map : this.mods.values()) {
				list.addAll(map.values());
			}
		}
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
		synchronized (this.mods) {
			HashMap<String, Mod> map = this.mods.get(name);
			if (null != map) {
				return map.get(version);
			}
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

	/**
	 * 解析 MOD 的绝对路径。
	 * @param mod
	 * @return
	 */
	protected String parseModAbsolutePath(Mod mod) {
		return this.workPath + mod.getContextPath().substring(8);
	}

	/**
	 * 创建新的 MOD 。
	 * @param modJson
	 * @return
	 * @throws JSONException 
	 * @throws IOException
	 */
	public Mod newMod(JSONObject modJson) throws JSONException, IOException {
		Mod mod = new Mod(modJson.getString("name"), modJson.getString("version"), modJson.getString("description"));
		if (modJson.has("html")) {
			mod.registerHtmlFile(modJson.getString("html"), 0);
		}
		else if (modJson.has("tmpl")) {
			mod.registerTmplFile(modJson.getString("tmpl"), 0);
		}

		String destDir = this.workPath + mod.getName() + "_" + mod.getVersion() + File.separator;
		try {
			// 写入配置文件
			ModWriter.write(new File(destDir), mod);

			// 写入 HTML 文件
//			this.newHtmlFile(filename, tag);
		} catch (IOException e) {
			e.printStackTrace();
			mod = null;
			throw e;
		}

		// 启动线程
		Thread thread = new Thread() {
			@Override
			public void run() {
				DaemonTimerTask task = new DaemonTimerTask();
				task.run();
				task = null;
			}
		};
		thread.start();

		return mod;
	}

	protected void newHtmlFile(String filename, boolean tag) {
		
	}

	/**
	 * 删除调试工程下的 MOD 工程。
	 * @param name
	 * @param version
	 * @return
	 */
	public Mod deleteMod(final String name, final String version) {
		Mod mod = null;
		synchronized (this.mods) {
			HashMap<String, Mod> map = this.mods.get(name);
			if (null != map) {
				mod = map.get(version);
			}

			if (null == mod || mod.isReadOnly()) {
				return null;
			}

			// 删除
			map.remove(version);
			if (map.isEmpty()) {
				this.mods.remove(name);
			}
		}

		String cp = mod.getContextPath();
		String dir = this.workPath + cp.substring(8);
		File path = new File(dir);
		// 递归删除所有文件和子目录
		this.deleteDirectory(path);

		// 检查是否为逆向同步工程
		if (this.setting.isReverseSync(name, version)) {
			this.setting.deleteReverseSyncProject(name, version);
			this.deleteDirectory(new File(this.setting.getReverseSyncPath() + cp.substring(8)));
		}

		return mod;
	}

	/**
	 * 重新部署。
	 * @param name
	 * @param version
	 */
	public Mod redeploy(String name, String version) {
		Mod mod = null;
		// 删除数据
		synchronized (this.mods) {
			HashMap<String, Mod> map = this.mods.get(name);
			if (null != map) {
				mod = map.remove(version);
				if (map.isEmpty()) {
					this.mods.remove(name);
				}
			}
		}

		// 启动线程
		Thread thread = new Thread() {
			@Override
			public void run() {
				DaemonTimerTask task = new DaemonTimerTask();
				task.run();
				task = null;
			}
		};
		thread.start();

		return mod;
	}

	/**
	 * 返回设置项。
	 * @return
	 */
	public Setting getSetting() {
		return this.setting;
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
		synchronized (this.mods) {
			HashMap<String, Mod> map = this.mods.get(mod.getName());
			if (null != map) {
				map.put(mod.getVersion(), mod);
			}
			else {
				map = new HashMap<String, Mod>(1);
				map.put(mod.getVersion(), mod);
				this.mods.put(mod.getName(), map);
			}
		}
	}

	/**
	 * 执行逆向同步。
	 */
	private void exeReverseSync() {
		if (!this.setting.enabledReverseSync() && null != this.setting.reverseSyncPath) {
			return;
		}

		for (Setting.Project proj : this.setting.reverseSyncList) {
			Mod mod = this.getMod(proj.name, proj.version);
			if (null != mod) {
				String dest = this.setting.reverseSyncPath + mod.getContextPath().substring(8);
				String src = this.parseModAbsolutePath(mod);
				// 复制文件
				this.copyDirectory(dest, src);
			}
		}
	}

	/**
	 * 复制目录及其子目录。
	 * @param dest
	 * @param src
	 */
	private void copyDirectory(String dest, String src) {
		if (!dest.endsWith("/") && !dest.endsWith("\\")) {
			dest += File.separator;
		}

		File srcDir = new File(src);
		if (!srcDir.exists()) {
			return;
		}

		File destDir = new File(dest);
		if (!destDir.exists()) {
			destDir.mkdirs();
		}

		File[] list = srcDir.listFiles();
		for (File f : list) {
			if (f.isFile()) {
				copyFile(new File(dest + f.getName()), f);
			}
			else if (f.isDirectory()) {
				copyDirectory(dest + f.getName(), f.getAbsolutePath());
			}
		}
	}

	/**
	 * 复制文件。
	 * @param dest
	 * @param src
	 */
	private void copyFile(File dest, File src) {
		int length = 2097152;
		FileInputStream fis = null;
		FileOutputStream fos = null;
		FileChannel fic = null;
		FileChannel foc = null;
		try {
			fis = new FileInputStream(src);
			fos = new FileOutputStream(dest);
			fic = fis.getChannel();
			foc = fos.getChannel();
			ByteBuffer b = null;
			while (true) {
				if (fic.position() == fic.size()) {
					break;
				}
	
				if ((fic.size() - fic.position()) < length) {
					length = (int)(fic.size() - fic.position());
				}
				else {
	                length = 2097152;
				}
				b = ByteBuffer.allocateDirect(length);
				fic.read(b);
				b.flip();
				foc.write(b);
				foc.force(false);
			}
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				fic.close();
				foc.close();
				fis.close();
				fos.close();
			} catch (Exception e) {
				// Nothing
			}
		}
	}

	private void deleteDirectory(File dir) {
		if (!dir.isDirectory()) {
			return;
		}

		File[] files = dir.listFiles();
		ArrayList<File> list = new ArrayList<File>(files.length);
		for (File file : files) {
			if (file.isDirectory()) {
				this.deleteDirectory(file);
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
	 * 枚举目录下的所有文件。
	 * @param dir
	 * @param list
	 */
	protected void enumerateFile(File dir, List<File> list) {
		if (dir.isFile()) {
			list.add(dir);
		}
		else if (dir.isDirectory()) {
			File[] files = dir.listFiles();
			for (File file : files) {
				enumerateFile(file, list);
			}
		}
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
			if (taskRunning.get()) {
				return;
			}

			// 设置任务启动
			taskRunning.set(true);

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

			// 读取设置
			if (null == setting)
				setting = Setting.readSetting(getProjectPath());
			// 执行逆向同步
			exeReverseSync();

			// 设置任务结束
			taskRunning.set(false);
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
