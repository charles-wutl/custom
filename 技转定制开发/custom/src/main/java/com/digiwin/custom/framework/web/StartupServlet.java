package com.digiwin.custom.framework.web;

import com.seeyon.framework.web.FileConfig;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import java.io.File;

/**
 *
 * Created by zaregoto on 2017/6/25.
 */
public class StartupServlet extends HttpServlet {

    private static final Logger logger = LoggerFactory.getLogger(StartupServlet.class);

    @Override public void init(ServletConfig config) throws ServletException {
        preInit(config);
        doInit(config);
        afterInit(config);
    }

    /**
     * 初始化前置动作
     *
     * @param config
     * @throws ServletException
     */
    public void preInit(ServletConfig config) throws ServletException {

    }

    /**
     * 初始化动作
     *
     * @param config
     * @throws ServletException
     */
    public void doInit(ServletConfig config) throws ServletException {
        String path = StartupServlet.class.getResource("/").getPath();
        FileConfig.setTmpFilePath(path+ File.pathSeparator+"temp");
    }

    /**
     * 初始化后置动作
     *
     * @param config
     * @throws ServletException
     */
    public void afterInit(ServletConfig config) throws ServletException {
    }
}
