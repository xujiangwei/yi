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
	}

	/**
	 * 打包。
	 */
	protected File pack() throws IOException {
		String temp = this.tempPath + "yi.tmp";
		File destFile = new File(temp);
		if (destFile.exists() && destFile.isFile())
			destFile.delete();

		ModWriter.write(this.mod, this.projectPath + this.subDir, this.subDir.toString(), destFile);
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
		FileInputStream in = new FileInputStream(src);
		FileOutputStream out = new FileOutputStream(dest);
		FileChannel inC = in.getChannel();
		FileChannel outC = out.getChannel();
		ByteBuffer b = null;
		while (true) {
			if (inC.position() == inC.size()) {
				break;
			}

			if ((inC.size() - inC.position()) < length) {
				length = (int)(inC.size() - inC.position());
			}
			else {
                length = 2097152;
			}
			b = ByteBuffer.allocateDirect(length);
			inC.read(b);
			b.flip();
			outC.write(b);
			outC.force(false);
		}

		inC.close();
		outC.close();
		in.close();
		out.close();
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

					// 整包
					File file = pack();

					// 部署
					deploy(file);
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
		
	}
}
