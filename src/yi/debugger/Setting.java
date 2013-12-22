/*
 * Yi Framework
 * 
 * Copyright (c) 2013,2014 DHC Software Research Department
 */

package yi.debugger;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NamedNodeMap;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

/**
 * 调试器设置。
 * 
 * @author Jiangwei Xu
 *
 */
public final class Setting {

	// 是否启用逆向同步
	protected boolean reverseSyncEnabled = false;
	// 逆向同步路径
	protected String reverseSyncPath = null;
	// 需要进行同步的项目记录
	protected ArrayList<Project> reverseSyncList = new ArrayList<Project>();

	/**
	 * 返回是否启用逆向同步。
	 * @return
	 */
	public boolean enabledReverseSync() {
		return this.reverseSyncEnabled;
	}

	/**
	 * 返回逆向同步路径。
	 * @return
	 */
	public String getReverseSyncPath() {
		return this.reverseSyncPath;
	}

	/**
	 * 指定的 MOD 项目是否逆向同步。
	 * @param modName
	 * @param modVersion
	 * @return
	 */
	public boolean isReverseSync(String modName, String modVersion) {
		for (Project proj : this.reverseSyncList) {
			if (proj.name.equals(modName) && proj.version.equals(modVersion)) {
				return true;
			}
		}
		return false;
	}

	/**
	 * 删除指定的逆向工程。
	 * @param modName
	 * @param modVersion
	 */
	public void deleteReverseSyncProject(String modName, String modVersion) {
		for (Project proj : this.reverseSyncList) {
			if (proj.name.equals(modName) && proj.version.equals(modVersion)) {
				this.reverseSyncList.remove(proj);
				return;
			}
		}
	}

	/**
	 * 读取设置。
	 * @return
	 */
	public static Setting readSetting(String filePath) {
		Setting ret = new Setting();
		File file = new File(filePath + "setting.xml");
		if (!file.exists()) {
			return ret;
		}

		try {
			DocumentBuilderFactory builderFactory = DocumentBuilderFactory.newInstance();
			DocumentBuilder builder = builderFactory.newDocumentBuilder();
			Document document = builder.parse(file);

			Element root = document.getDocumentElement();
			NodeList nl = root.getElementsByTagName("reverse-sync");
			if (null != nl && nl.getLength() > 0) {
				Node node = nl.item(0);
				nl = node.getChildNodes();
				for (int i = 0; i < nl.getLength(); ++i) {
					Node el = nl.item(i);
					if (el.getNodeName().equals("enabled")) {
						ret.reverseSyncEnabled = el.getTextContent().equals("true");
					}
					else if (el.getNodeName().equals("path")) {
						ret.reverseSyncPath = el.getTextContent();
						if (!ret.reverseSyncPath.endsWith("/") && !ret.reverseSyncPath.endsWith("\\")) {
							ret.reverseSyncPath += File.separator;
						}
					}
					else if (el.getNodeName().equals("list")) {
						NodeList listNL = el.getChildNodes();
						// 读取需要同步的工程
						for (int n = 0; n < listNL.getLength(); ++n) {
							Node nproj = listNL.item(n);
							if (nproj.getNodeName().equals("project")) {
								NamedNodeMap nnm = nproj.getAttributes();
								String name = nnm.getNamedItem("name").getNodeValue();
								String version = nnm.getNamedItem("version").getNodeValue();
								// 创建项目
								Project proj = ret.new Project(name, version);
								ret.reverseSyncList.add(proj);
							}
						}
					}
				}
			}
		} catch (ParserConfigurationException e) {
			e.printStackTrace();
		} catch (SAXException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

		return ret;
	}

	/**
	 * 项目信息封装。
	 * 
	 * @author Jiangwei Xu
	 *
	 */
	public class Project {
		public String name;
		public String version;

		public HashMap<String, Long> fileTimestamps;

		public Project(String name, String version) {
			this.name = name;
			this.version = version;
			this.fileTimestamps = new HashMap<String, Long>();
		}
	}
}
