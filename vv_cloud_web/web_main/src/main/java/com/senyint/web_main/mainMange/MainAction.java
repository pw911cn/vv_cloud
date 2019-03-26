package com.senyint.web_main.mainMange;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class MainAction{

    protected final Logger logger = LoggerFactory.getLogger(getClass());

    @Value("${isdebug}")
    private String isdebug;

    @Value("${bigVersion}")
    private String bigVersion;

    @Value("${server_zuulpath}")
    private String server_zuulpath;

    /**
     * 跳转到系统首页面处理action
     * @desc:TODO 
     * @author: peiwei
     * version: V4.0
     * date: 2019年3月11日 下午2:17:14
     *
     * history:
     * date          author          version          description
     * -----------------------------------------------------------------------------------
     * 2019年3月11日       peiwei          4.0             1.0
     * modification
     */
    @RequestMapping("/index.htm")
    public String index(Model model) {
        logger.info("跳转到系统首页面处理action...");
        
        /*
         * 进入平台首页面的初始化
         */
        // 是否debug
        model.addAttribute("isdebug", isdebug);
        
        // 版本号
        java.util.Random rd = new java.util.Random();
        String version = bigVersion+ "." + rd.nextInt(10000) ;
        model.addAttribute("version", version);

        // 微服务智能网关地址
        model.addAttribute("server_zuulpath", server_zuulpath);
        
        // 系统皮肤，后期改为从系统配置中读取
        model.addAttribute("sys_style", "senyint");

        return "/WEB-INF/index.jsp";
    }
    
    @RequestMapping("/test")
    @ResponseBody
    public String test(Model model) {
        return bigVersion;
    }

}
