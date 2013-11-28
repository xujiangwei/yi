/*
 * Yi Framework
 * 
 * Copyright (c) 2013,2014 DHC Software Research Department
 */

package yi.core;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
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

	private ArrayList<String> scriptFilenames;
	private ArrayList<String> styleFilenames;

	private ArrayList<String> depsAliases;
	private ArrayList<String> depsFiles;

	// 入口函数名
	private String main;

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
	 * 返回脚本文件名列表。
	 * @return
	 */
	public List<String> getScriptFilenameList() {
		return this.scriptFilenames;
	}

	/**
	 * 添加脚本文件。
	 * @param filename
	 */
	public void addScriptFile(String filename) {
		if (null == this.scriptFilenames) {
			this.scriptFilenames = new ArrayList<String>(1);
		}

		this.scriptFilenames.add(filename);
	}

	/**
	 * 返回样式文件名列表。
	 * @return
	 */
	public List<String> getStyleFilenameList() {
		return this.styleFilenames;
	}

	/**
	 * 添加样式文件。
	 * @param filename
	 */
	public void addStyleFile(String filename) {
		if (null == this.styleFilenames) {
			this.styleFilenames = new ArrayList<String>(1);
		}

		this.styleFilenames.add(filename);
	}

	/**
	 * 设置主函数名。
	 * @param main
	 */
	public void setMainFunction(String main) {
		this.main = main;
	}

	/**
	 * 添加依赖的空间别名。
	 * @param alias
	 */
	public void addDepsAliases(String alias) {
		if (null == this.depsAliases) {
			this.depsAliases = new ArrayList<String>(1);
		}

		this.depsAliases.add(alias);
	}

	/**
	 * 添加依赖的文件名。
	 * @param filename
	 */
	public void addDepsFile(String filename) {
		if (null == this.depsFiles) {
			this.depsFiles = new ArrayList<String>(1);
		}

		this.depsFiles.add(filename);
	}

	/**
	 * 返回 MOD JSON 格式对象。
	 * @return
	 */
	public JSONObject toJSON() {
		JSONObject json = new JSONObject();
		try {
			json.put("name", this.name);
			json.put("version", this.version);

			// 上下文路径
			json.put("path", this.contextPath);

			// 界面文件
			if (this.existHtmlFile()) {
				json.put("html", this.contextPath + this.htmlFilename);
			}
			else if (this.existTmplFile()) {
				json.put("tmpl", this.contextPath + this.tmplFilename);
			}

			// 脚本
			if (null != this.scriptFilenames) {
				JSONArray list = new JSONArray();
				for (String file : this.scriptFilenames) {
					list.put(this.contextPath + file);
				}
				json.put("scripts", list);
			}

			// 样式表
			if (null != this.styleFilenames) {
				JSONArray list = new JSONArray();
				for (String file : this.styleFilenames) {
					list.put(this.contextPath + file);
				}
				json.put("styles", list);
			}

			// 入口函数
			if (null != this.main) {
				json.put("main", this.main);
			}

			// 前置依赖
			JSONObject deps = null;
			if (null != this.depsAliases) {
				deps = new JSONObject();
				JSONArray list = new JSONArray();
				for (String alias : this.depsAliases) {
					list.put(alias);
				}
				// "aliases" 数组
				deps.put("aliases", list);
			}
			if (null != this.depsFiles) {
				if (null == deps) {
					deps = new JSONObject();
				}

				JSONArray list = new JSONArray();
				for (String filename : this.depsFiles) {
					list.put(filename);
				}
				// "files" 数组
				deps.put("files", list);
			}
			if (null != deps) {
				json.put("deps", deps);
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

	/**
	 * 返回加入指定 ROOT 上下文路径的 MOD 的 JSON 信息。
	 * @param root
	 * @return
	 */
	public JSONObject toJSONWithRoot(String root) {
		String ap = root.toString();
		if (!ap.endsWith("/"))
			ap += "/";
		ap += this.contextPath;

		JSONObject json = this.toJSON();
		try {
			// html
			if (json.has("html")) {
				json.remove("html");
				json.put("html", ap + this.htmlFilename);
			}
			else if (json.has("tmpl")) {
				json.remove("tmpl");
				json.put("tmpl", ap + this.tmplFilename);
			}

			// 脚本
			if (null != this.scriptFilenames) {
				json.remove("scripts");

				JSONArray list = new JSONArray();
				for (String file : this.scriptFilenames) {
					list.put(ap + file);
				}
				json.put("scripts", list);
			}

			// 样式表
			if (null != this.styleFilenames) {
				json.remove("styles");

				JSONArray list = new JSONArray();
				for (String file : this.styleFilenames) {
					list.put(ap + file);
				}
				json.put("styles", list);
			}
		} catch (JSONException e) {
			e.printStackTrace();
		}
		return json;
	}

	@Override
	public int compareTo(Mod other) {
		return (this.name.compareTo(other.name));
	}
}
