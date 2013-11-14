/*
 * Yi Framework
 * 
 * Copyright (c) 2013,2014 DHC Software Research Department
 */

package yi.core;

import java.io.Serializable;


/**
 * Mod 文件。
 * 
 * @author Jiangwei Xu
 *
 */
public final class Mod implements Serializable, Comparable<Mod> {

	private static final long serialVersionUID = -1259621851477001920L;

	private String name;
	private String version;

	private String contextPath;

	private String htmlFilename;

	public Mod() {
		this("Unknown", "unknown version");
	}

	public Mod(String name, String version) {
		this.name = name;
		this.version = version;
	}

	/**
	 * 返回 Mod 名称。
	 * @return
	 */
	public String getName() {
		return this.name;
	}

	/**
	 * 返回 Mod 版本号。
	 * @return
	 */
	public String getVersion() {
		return this.version;
	}

	public void setContextPath(String path) {
		this.contextPath = path;
		if (!this.contextPath.endsWith("/")) {
			this.contextPath += "/";
		}
	}

	public String getContextPath() {
		return this.contextPath;
	}

	/**
	 * 是否存在 HTML 文件。
	 * @return
	 */
	public boolean existHtmlFile() {
		return (null != this.htmlFilename);
	}

	/**
	 * 返回 HTML 文件名。
	 * @return
	 */
	public String getHtmlFilename() {
		return this.htmlFilename;
	}

	/**
	 * 注册 HTML 页面文件名。
	 * @param filename
	 */
	public void registerHtmlFile(String filename) {
		this.htmlFilename = filename;
	}

	@Override
	public int compareTo(Mod other) {
		return (this.name.compareTo(other.name));
	}
}
