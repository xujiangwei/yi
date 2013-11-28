/*
 * Yi Framework
 * 
 * Copyright (c) 2013,2014 DHC Software Research Department
 */

package yi.core;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

/**
 * Mod 文件读取器。
 * 
 * @author Jiangwei Xu
 *
 */
public final class ModReader {

	public final static String MOD_CONFIG_FILE = "mod.xml";

	private final static DocumentBuilderFactory builderFactory = DocumentBuilderFactory.newInstance();

	/**
	 * 解包指定的 MOD 到指定目录下
	 * @param file
	 * @throws FileNotFoundException
	 * @throws IOException
	 */
	public static Mod read(File file, String outputDirectory) throws FileNotFoundException, IOException {
		// 将所有文件解压到发布路径下

		/* 测试用代码：
		ZipInputStream zis = null;
		try {
			zis = new ZipInputStream(new BufferedInputStream(new FileInputStream(file)));
		} catch (FileNotFoundException e) {
			throw e;
		}

		// 创建临时目录
		String tempDir = relesePath + "temp" + File.separator;
		File td = new File(tempDir);
		if (!td.exists()) {
			td.mkdir();
		}
		td = null;
		// 删除临时文件
		File cf = new File(tempDir + MOD_CONFIG_FILE);
		if (cf.exists()) {
			cf.delete();
		}
		cf = null;

		ZipEntry entry = null;
		BufferedOutputStream bos = null;

		// 先解压配置文件
		try {
			while (null != (entry = zis.getNextEntry())) {
				if (entry.getName().equals(MOD_CONFIG_FILE)) {
					String entryName = entry.getName();
					bos = new BufferedOutputStream(new FileOutputStream(tempDir + entryName));
					byte[] buf = new byte[128];
					int readedBytes = -1;
					while ((readedBytes = zis.read(buf)) != -1) {
						bos.write(buf, 0, readedBytes);
					}
					bos.flush();
					bos.close();

					// 解析配置文件
					mod = readConfig(new File(tempDir + entryName));

					break;
				}
			}
		} catch (IOException e) {
			throw e;
		} finally {
			try {
				zis.closeEntry();
			} catch (Exception e) {
				// Nothing
			}
		}

		if (null == mod) {
			// 没有找对正确的配置文件
			try {
				zis.close();
			} catch (Exception e) {
				// Nothing
			}

			return null;
		}*/

		ZipInputStream zis = new ZipInputStream(new FileInputStream(file));
		ZipEntry entry;
		while ((entry = zis.getNextEntry())!= null) {
			if (entry.isDirectory()) {
				String name = entry.getName();
				name = name.substring(0, name.length() - 1);
				File f = new File(outputDirectory + File.separator + name);
				f.mkdir();
			}
			else {
				File f = new File(outputDirectory + File.separator + entry.getName());
				f.createNewFile();
				BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream(f));
				byte[] b = new byte[1024];
				int len = -1;
				while ((len = zis.read(b)) != -1) {
					bos.write(b, 0, len);
				}
				bos.close();
			}
		}
		zis.close();

		// 尝试读取 mod.xml
		File configFile = new File(outputDirectory + MOD_CONFIG_FILE);
		Mod mod = readConfig(configFile);
		return mod;
	}

	/**
	 * 分析 MOD 配置文件。
	 * @param file
	 * @return
	 */
	public static Mod readConfig(File file) throws IOException {
		Mod mod = null;

		try {
			DocumentBuilder builder = ModReader.builderFactory.newDocumentBuilder();
			Document document = builder.parse(file);

			Element root = document.getDocumentElement();
			// name 节点
			NodeList nlName = root.getElementsByTagName("name");
			// version 节点
			NodeList nlVersion = root.getElementsByTagName("version");

			// 创建 Mod 实例
			mod = new Mod(nlName.item(0).getTextContent(), nlVersion.item(0).getTextContent());

			// 获取文件列表
			Node nodeFiles = root.getElementsByTagName("files").item(0);
			NodeList list = nodeFiles.getChildNodes();
			for (int i = 0, size = list.getLength(); i < size; ++i) {
				Node n = list.item(i);
				String name = n.getNodeName();
				if (name.equals("html")) {
					mod.registerHtmlFile(n.getTextContent());
				}
				else if (name.equals("tmpl")) {
					mod.registerTmplFile(n.getTextContent());
				}
				else if (name.equals("script")) {
					mod.addScriptFile(n.getTextContent());
				}
				else if (name.equals("style")) {
					mod.addStyleFile(n.getTextContent());
				}
			}

			// 主函数入口名
			NodeList nl = root.getElementsByTagName("main");
			if (null != nl && nl.getLength() > 0) {
				Node nodeMain = nl.item(0);
				mod.setMainFunction(nodeMain.getTextContent());
			}

			// 前置依赖
			nl = root.getElementsByTagName("dependents");
			if (null != nl && nl.getLength() > 0) {
				Node dependents = nl.item(0);
				// 别名
				nl = dependents.getChildNodes();
				for (int i = 0, size = nl.getLength(); i < size; ++i) {
					Node node = nl.item(i);
					String name = node.getNodeName();
					if (name.equals("alias")) {
						mod.addDepsAliases(node.getTextContent());
					}
				}
				// TODO 文件
			}

			// 共享文件
		} catch (ParserConfigurationException e) {
			e.printStackTrace();
		} catch (SAXException e) {
			e.printStackTrace();
		}

		return mod;
	}
}
