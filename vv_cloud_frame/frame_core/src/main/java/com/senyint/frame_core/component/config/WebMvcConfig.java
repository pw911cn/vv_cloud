package com.senyint.frame_core.component.config;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.config.annotation.CorsRegistration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.senyint.frame_core.component.interceptor.System_Interceptor;
import com.senyint.frame_core.component.transport.http.DataTypeConverter.JsonObjectMapper;

/**
 * web容器配置
 * @desc:TODO 
 * @author: weiwei
 * version: V4.0
 * date: 2019年3月27日 上午1:11:51
 *
 * history:
 * date          author          version          description
 * -----------------------------------------------------------------------------------
 * 2019年3月27日       weiwei          4.0             1.0
 * modification
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
        // 允许指定的pathPattern可以进行跨域请求
        CorsRegistration corsRegistration = registry.addMapping("/**");
        // 设置允许哪些可以进行跨域访问，设置为"*"表示允许所有
        corsRegistration.allowedOrigins("*");
        // 设置允许的跨域请求动作，设置为"*"表示允许所有，默认设置为允许简单动作，包括GET POST HEAD
        corsRegistration.allowedMethods("GET", "POST");

        // 设置浏览器是否需要发送认证信息
        corsRegistration.allowCredentials(true);
        // 设置客户端保存pre-flight request缓存的时间
        // pre-flight request 预检请求
        corsRegistration.maxAge(3600);

        // 设置允许的请求头，默认设置为允许所有，即"*"
        //corsRegistration.allowedHeaders("Cache-Control", "Content-Language");
        // 设置response的头结构，不支持"*"
        //corsRegistration.exposedHeaders("Cache-Control", "Content-Language");

        WebMvcConfigurer.super.addCorsMappings(registry);
    }

    /**
     * @desc:TODO 
     * @author: weiwei
     * version: V4.0
     * date: 2019年3月27日 下午10:47:03
     *
     * history:
     * date          author          version          description
     * -----------------------------------------------------------------------------------
     * 2019年3月27日       weiwei          4.0             1.0
     * modification
     */
    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        logger.info("====>HttpMessageConverter全局配置");
        MappingJackson2HttpMessageConverter httpMessageConverter = new MappingJackson2HttpMessageConverter();

        JsonObjectMapper jsonObjectMapper = new JsonObjectMapper();
        httpMessageConverter.setObjectMapper(jsonObjectMapper);

        converters.add(httpMessageConverter);
        WebMvcConfigurer.super.configureMessageConverters(converters);
    }

    /**
     * 添加一个处理异常的解析器
     * @desc:TODO 
     * @author: weiwei
     * version: V4.0
     * date: 2019年3月27日 下午11:10:32
     *
     * history:
     * date          author          version          description
     * -----------------------------------------------------------------------------------
     * 2019年3月27日       weiwei          4.0             1.0
     * modification
     */
//    public void configureHandlerExceptionResolvers(List<HandlerExceptionResolver> resolvers) {
//        WebMvcConfigurer.super.configureHandlerExceptionResolvers(resolvers);
//    }

}