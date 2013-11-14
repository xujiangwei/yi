/*
 * Yi Framework
 * 
 * Copyright (c) 2013,2014 DHC Software Research Department
 */

package yi.container.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 查询插件信息 Servlet 。
 * 
 * @author Jiangwei Xu
 */
@WebServlet(
	name = "mod",
	urlPatterns = { "/mod", "/mod/*" },
	loadOnStartup = 1
)
public class ModServlet extends AbstractHttpServlet {

	private static final long serialVersionUID = 1665855495027080547L;

	public final static String Mod = "mod";

	public ModServlet() {
		super();
	}

	/**
	 * 参数：
	 * page_name
	 */
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
//		String pageName = request.getParameter(PageName);
//		if (null != pageName) {
//			Page page = Stage.getInstance().getPageStage().getPage(pageName);
//			if (null != page) {
//				this.wrapResponseWithOk(response, page.exportPluginJSON());
//			}
//			else {
//				this.wrapResponse(response, HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
//			}
//		}
//		else {
//			this.wrapResponse(response, HttpServletResponse.SC_BAD_REQUEST);
//		}
	}
}
