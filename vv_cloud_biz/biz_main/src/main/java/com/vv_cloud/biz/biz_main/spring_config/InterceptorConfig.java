package com.vv_cloud.biz.biz_main.spring_config;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.vv_cloud.biz.biz_main.auth_interceptor.Auth_Interceptor;

/**
 * 
 * @desc:TODO
 * @author: peiwei version: V4.0 date: 2018年10月11日 上午11:49:42
 *
 *          history: date author version description
 *          -----------------------------------------------------------------------------------
 *          2018年10月11日 peiwei 4.0 1.0 modification
 */
@Configuration
public class InterceptorConfig implements WebMvcConfigurer {

	private static Logger logger = LoggerFactory.getLogger(InterceptorConfig.class);

	/**
	 * 
	 * @desc:TODO 
	 * @author: peiwei
	 * version: V4.0
	 * date: 2018年10月11日 下午12:03:21
	 *
	 * history:
	 * date          author          version          description
	 * -----------------------------------------------------------------------------------
	 * 2018年10月11日       peiwei          4.0             1.0
	 * modification
	 */
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		/*
		 * 权限拦截器
		 */
		List<String> interceptorList = new ArrayList<String>();
		interceptorList.add("/**");
		registry.addInterceptor(new Auth_Interceptor()).addPathPatterns(interceptorList);

		WebMvcConfigurer.super.addInterceptors(registry);
	}

}