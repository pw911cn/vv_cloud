package com.senyint.frame_core.component.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.senyint.frame_core.component.interceptor.System_Interceptor;

/**
 * web容器配置 ClassName: WebMvcConfig <br/>
 * Function: TODO ADD FUNCTION. <br/>
 * Reason: TODO ADD REASON(可选). <br/>
 * date: 2018年6月21日 下午5:32:11 <br/>
 * 
 * @author zhangyang
 * @version
 * @since JDK 1.8
 */
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    private static Logger logger = LoggerFactory.getLogger(WebMvcConfig.class);

    /**
     * 
     * TODO 拦截器管理，系统管理拦截器的总入口（可选）.  
     * @see org.springframework.web.servlet.config.annotation.WebMvcConfigurer<br>
     * addInterceptors(org.springframework.web.servlet.config.annotation.InterceptorRegistry)
     */
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        /*
         * 系统拦截器
         */
        registry.addInterceptor(new System_Interceptor());

        //List<String> excludeList = new ArrayList<String>();
        //registry.addInterceptor(new System_Interceptor()).excludePathPatterns(excludeList);

        WebMvcConfigurer.super.addInterceptors(registry);
    }

    /**
     * 
      *<p> 
      * description: 系统默认页面全局配置<BR>
      * author: peiwei<BR>
      * overriding_date: 2018年7月2日 下午6:03:57<BR></p>
      * @param registry WebMvcConfig
      * @see org.springframework.web.servlet.config.annotation.WebMvcConfigurer<br>
      * addViewControllers(org.springframework.web.servlet.config.annotation.ViewControllerRegistry)
     */
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        //        logger.info("====>系统默认页面全局配置");
        //
        //        registry.addViewController("/").setViewName("redirect:/index.htm");
        //        registry.setOrder(Ordered.HIGHEST_PRECEDENCE);
        //        WebMvcConfigurer.super.addViewControllers(registry);
    }

    /**
     * 
      *<p> 
      * description: 静态资源文件映射<BR>
      * author: peiwei<BR>
      * overriding_date: 2018年7月2日 下午6:03:27<BR></p>
      * @param registry WebMvcConfig
      * @see org.springframework.web.servlet.config.annotation.WebMvcConfigurer#addResourceHandlers(org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry)
     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {

        WebMvcConfigurer.super.addResourceHandlers(registry);
    }

    /**
     * 支持跨域访问
     * @desc:TODO 
     * @author: weiwei
     * version: V4.0
     * date: 2019年3月27日 上午12:21:59
     *
     * history:
     * date          author          version          description
     * -----------------------------------------------------------------------------------
     * 2019年3月27日       weiwei          4.0             1.0
     * modification
     */
    public void addCorsMappings(CorsRegistry registry) {
        CorsRegistration corsRegistration = registry.addMapping("/**");
        corsRegistration.allowedOrigins("*");
        corsRegistration.allowCredentials(true);
        corsRegistration.allowedMethods("GET", "POST");
        corsRegistration.maxAge(3600);

        WebMvcConfigurer.super.addCorsMappings(registry);
    }

}