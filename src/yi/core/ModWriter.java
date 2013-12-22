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
import java.io.PrintWriter;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.w3c.dom.Document;
import org.w3c.dom.Element;

/**
 * 将指定 MOD 写入压缩包。
 * 
 * @author Jiangwei Xu
 *
 */
public final class ModWriter {

	public final static String MOD_CONFIG_FILE = "mod.xml";

	private final static DocumentBuilderFactory builderFactory = DocumentBuilderFactory.newInstance();

	/**
	 * 将 Mod 压缩为整包文件。
	 * @param destFile
	 * @param srcFile
	 * @param base
	 * @throws IOException
	 */
	public static void write(File destFile, String srcFile, String base) throws IOException {
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

	/**
	 * 将 MOD 数据写为指定目录下的配置文件。
	 * @param destDir
	 * @param mod
	 * @throws IOException
	 */
	public static void write(File destDir, Mod mod) throws IOException {
		if (!destDir.exists()) {
			destDir.mkdirs();
		}

		DocumentBuilder builder = null;
		try {
			builder = ModWriter.builderFactory.newDocumentBuilder();
		} catch (ParserConfigurationException e) {
			e.printStackTrace();
		}
		Document document = builder.newDocument();
		Element root = document.createElement("mod");
		// 加入根节点
		document.appendChild(root);

		// name
		Element name = document.createElement("name");
		name.setTextContent(mod.getName());
		root.appendChild(name);
		// version
		Element version = document.createElement("version");
		version.setTextContent(mod.getVersion());
		root.appendChild(version);
		// description
		Element description = document.createElement("description");
		description.setTextContent(mod.getDescription());
		root.appendChild(description);

		// files
		Element files = document.createElement("files");
		root.appendChild(files);

		TransformerFactory tf = TransformerFactory.newInstance();
		try {
			Transformer transformer = tf.newTransformer();
			DOMSource source = new DOMSource(document);
			transformer.setOutputProperty(OutputKeys.ENCODING, "utf-8");
			transformer.setOutputProperty(OutputKeys.INDENT, "yes");

			File file = new File(destDir.getAbsolutePath() + File.separator + MOD_CONFIG_FILE);
			FileOutputStream fos = new FileOutputStream(file);
			PrintWriter pw = new PrintWriter(fos);
			StreamResult result = new StreamResult(pw);
			transformer.transform(source, result);

			fos.close();
		} catch (Exception e) {
			e.printStackTrace();
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
