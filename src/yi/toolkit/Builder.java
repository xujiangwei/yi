/*
 * Yi Framework
 * 
 * Copyright (c) 2013,2014 DHC Software Research Department
 */

package yi.toolkit;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.channels.FileChannel;

import yi.core.Mod;
import yi.core.ModManager;
import yi.core.ModReader;
import yi.core.ModWriter;
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

	// 部署目录
	private String deployPath;

	private Mod mod;

	// 是否使用扁平路径
	private boolean flatBase = true;

	public Builder(String rootPath, String projectPath, String subDir) {
		this.rootPath = rootPath;
		this.projectPath = projectPath;
		this.subDir = subDir;

		this.workPath = this.rootPath + "working" + File.separator;
		this.tempPath = this.workPath + "temp" + File.separator;

		this.deployPath = this.rootPath + "modules" + File.separator;
	}

	/**
	 * 编译。
	 */
	protected void compile() throws IOException {
		// 创建临时目录
		File tmpDir = new File(this.tempPath);
		if (!tmpDir.exists()) {
			tmpDir.mkdirs();
		}

		File file = new File(this.projectPath + this.subDir + "mod.xml");
		this.mod = ModReader.readConfig(file);

		// 删除旧 MOD
		ModManager.getInstance().removeMod(this.mod.getName(), this.mod.getVersion());
	}

	/**
	 * 打包。
	 */
	protected File pack() throws IOException {
		if (null == this.mod) {
			return null;
		}

		String temp = this.tempPath + "mod_" + this.mod.getName() + ".tmp";
		File destFile = new File(temp);
		if (destFile.exists() && destFile.isFile())
			destFile.delete();

		// 压缩包基础路径
		String base = null;
		if (this.flatBase) {
			base = "";
		}
		else {
			base = this.subDir.toString();
			if (base.endsWith("/") || base.endsWith("\\")) {
				base = base.substring(0, base.length() - 1);
			}
			int index = base.indexOf("/");
			base = base.substring(index + 1);
		}

		ModWriter.write(destFile, this.projectPath + this.subDir, base);
		return destFile;
	}

	/**
	 * 部署。
	 */
	protected void deploy(File src) throws IOException {
		File dest = new File(this.deployPath + this.mod.getName() + "_" + this.mod.getVersion() + ".mod");
		if (dest.exists() && dest.isFile())
			dest.delete();

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
			throw e;
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

		// 删除源文件
		src.delete();
	}

	@Override
	protected void doStart() {
		final Builder that = this;

		Thread thread = new Thread() {
			@Override
			public void run() {
				changeState(LifeCycleState.RUNNING);

				try {
					// 编译
					compile();

					// 打包
					File file = pack();
					if (null != file) {
						// 部署
						deploy(file);

						// 作废管理器任务，以便刷新
						ModManager.getInstance().invalid();
					}
				} catch (Exception e) {
					e.printStackTrace();
				} finally {
					that.stop();
				}
			}
		};
		thread.setName("Builder#" + this.subDir);
		thread.start();
	}

	@Override
	protected void doStop() {
		// Nothing
	}
}
