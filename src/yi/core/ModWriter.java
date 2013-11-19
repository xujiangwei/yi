/*
 * Yi Framework
 * 
 * Copyright (c) 2013,2014 DHC Software Research Department
 */

package yi.core;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

/**
 * 将指定 MOD 写入压缩包。
 * 
 * @author Jiangwei Xu
 *
 */
public final class ModWriter {

	/**
	 * 将 Mod 压缩为整包文件。
	 * @param mod
	 * @param path
	 * @throws IOException
	 */
	public static void write(Mod mod, String srcFile, String base, File destFile) throws IOException {
		try {
			BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream(destFile));
			ZipOutputStream zos = new ZipOutputStream(bos);

			if (base.endsWith("/") || base.endsWith("\\")) {
				base = base.substring(0, base.length() - 1);
			}

			// 压缩
			compress(zos, new File(srcFile), base);

			zos.flush();
			zos.close();
			bos.close();
		} catch (IOException e) {
			throw e;
		}
	}

	private static void compress(ZipOutputStream out, File file, String base) throws IOException {
		if (file.isDirectory()) {
			File[] list = file.listFiles();
			out.putNextEntry(new ZipEntry(base + "/"));
			base = base.length() == 0 ? "" : base + "/";
			for (int i = 0; i < list.length; ++i) {
				// 递归压缩
				compress(out, list[i], base + list[i].getName());
			}
		}
		else {
			out.putNextEntry(new ZipEntry(base));
			BufferedInputStream bis = new BufferedInputStream(new FileInputStream(file));
			byte[] b = new byte[1024];
			int len = -1;
			while ((len = bis.read(b, 0, 1024)) != -1) {
				out.write(b, 0, len);
			}
			bis.close();
			out.closeEntry();
		}
	}
}
