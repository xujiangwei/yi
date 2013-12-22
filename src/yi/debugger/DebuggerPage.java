/*
 * Yi Framework
 * 
 * Copyright (c) 2013,2014 DHC Software Research Department
 */

package yi.debugger;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;

import javax.servlet.http.HttpServletRequest;

import yi.core.Mod;

/**
 * 模组调试页面。
 * 
 * @author Jiangwei Xu
 *
 */
public final class DebuggerPage {

	private DebuggerPage() {
		
	}

	/**
	 * 创建新的调试器。
	 * @param request
	 * @param path
	 * @return
	 */
	public static Debugger newDebugger(HttpServletRequest request) {
		Debugger debugger = new Debugger(request);
		return debugger;
	}

	/**
	 * 返回指定 MOD 的 HTML 文件内容。
	 * @param mod
	 * @return
	 */
	public static String readHtmlFile(Mod mod) {
		if (mod.existHtmlFile()) {
			String path = DebuggerDirector.getInstance().parseModAbsolutePath(mod) + mod.getHtmlFilename();
			File file = new File(path);
			StringBuilder buf = readFile(file);
			String content = buf.toString().replaceAll("<(.+?)>", "&lt;$1&gt;");
			return content;
		}
		else if (mod.existTmplFile()) {
			String path = DebuggerDirector.getInstance().parseModAbsolutePath(mod) + mod.getTmplFilename();
			File file = new File(path);
			StringBuilder buf = readFile(file);
			String content = buf.toString().replaceAll("<(.+?)>", "&lt;$1&gt;");
			return content;
		}

		return "";
	}

	private static StringBuilder readFile(File file) {
		StringBuilder output = new StringBuilder();
		BufferedReader br = null;
		try {
			br = new BufferedReader(new InputStreamReader(new FileInputStream(file)));
			char[] buf = new char[1024];
			int len = -1;
			while ((len = br.read(buf, 0, 1024)) > 0) {
				output.append(buf, 0, len);
			}
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (null != br) {
				try {
					br.close();
				} catch (IOException e) {
					// Nothing
				}
			}
		}

		return output;
	}
}
