/*
 * Yi Framework
 * 
 * Copyright (c) 2013,2014 DHC Software Research Department
 */

package yi.core;

import java.io.Serializable;

import org.json.JSONException;
import org.json.JSONObject;

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
	private String tmplFilename;

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

	/**
	 * 设置上下文路径。
	 * @param path
	 */
	public void setContextPath(String path) {
		this.contextPath = path;
		if (!this.contextPath.endsWith("/")) {
			this.contextPath += "/";
		}
	}

	/**
	 * 返回上下文路径。
	 * @return
	 */
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
	 * 注册 HTML 页面。
	 * @param filename
	 */
	public void registerHtmlFile(String filename) {
		this.htmlFilename = filename;
	}

	/**
	 * 是否配置了模板文件。
	 * @return
	 */
	public boolean existTmplFile() {
		return (null != this.tmplFilename);
	}

	/**
	 * 返回模板文件名。
	 * @return
	 */
	public String getTmplFilename() {
		return this.tmplFilename;
	}

	/**
	 * 注册模板页面。
	 * @param filename
	 */
	public void registerTmplFile(String filename) {
		this.tmplFilename = filename;
	}

	/**
	 * 返回 MOD JSON 格式对象。
	 * @return
	 */
	public JSONObject toJSON() {
		JSONObject json = new JSONObject();
		try {
			if (this.existHtmlFile()) {
				json.put("html", this.contextPath + this.htmlFilename);
			}
			else if (this.existTmplFile()) {
				json.put("tmpl", this.contextPath + this.htmlFilename);
			}
		} catch (JSONException e) {
			e.printStackTrace();
		}
		return json;
	}

	/**
	 * 返回 JSON 字符串。
	 * @return
	 */
	public String toJSONString() {
		JSONObject json = this.toJSON();
		return json.toString();
	}

	@Override
	public int compareTo(Mod other) {
		return (this.name.compareTo(other.name));
	}
}
