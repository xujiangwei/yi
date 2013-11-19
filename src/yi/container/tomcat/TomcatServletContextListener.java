/*
 * Yi Framework
 * 
 * Copyright (c) 2013,2014 DHC Software Research Department
 */

package yi.container.tomcat;

import java.io.File;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import yi.core.Stage;
import yi.core.StageConfig;

/**
 * Tomcat Servlet Context 监听器。
 * 
 * @author Jiangwei Xu
 */
public class TomcatServletContextListener implements ServletContextListener {

	public TomcatServletContextListener() {
	}

	@Override
	public void contextInitialized(ServletContextEvent event) {
		// 进行舞台配置
		StageConfig config = new StageConfig();
		config.deployPath = event.getServletContext().getRealPath("/");
		if (!config.deployPath.endsWith("/") && !config.deployPath.endsWith("\\")) {
			config.deployPath += File.separator;
		}

		// 配置并启动
		Stage.getInstance().config(config).start();
	}

	@Override
	public void contextDestroyed(ServletContextEvent event) {
		// 停止
		Stage.getInstance().stop();
	}
}
