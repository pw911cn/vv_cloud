package com.senyint.frame_core.component.servletInit;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@WebServlet(loadOnStartup = 3, urlPatterns = "/SystemInitServlet")
public class SystemInitServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

    protected static final Logger logger = LoggerFactory.getLogger(SystemInitServlet.class);

    /**
     * 初始化
     */
    public void init() throws ServletException {
        logger.info("========>SystemInitServlet初始化开始...");
        logger.info("========>SystemInitServlet初始化完成...");
    }

    /**
     * 销毁
     */
    public void destroy() {

    }

}
