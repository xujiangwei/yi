package yi.example;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import yi.container.servlet.AbstractHttpServlet;

/**
 * Hello World 演示。
 * 
 * @author Jiangwei Xu
 *
 */
public class HelloWorldC extends AbstractHttpServlet {

	private static final long serialVersionUID = -6504922569400210997L;

	public HelloWorldC() {
		super();
	}

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		this.wrapResponse(response, HttpServletResponse.SC_NOT_FOUND);
	}
}
