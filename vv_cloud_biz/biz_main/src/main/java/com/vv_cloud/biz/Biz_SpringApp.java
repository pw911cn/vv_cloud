/**
 * project: plugin_eurekaServer
 * package: plugin_eurekaServer
 * file: WebApp.java
 * description: TODO
 * Senyint
 * Copyright 2018 All rights Reserved
 * 
 * author: peiwei
 * version: V3.0
 * date: 2018年9月28日 下午2:25:52
 *
 * history:
 * date          author          version          description
 * -----------------------------------------------------------------------------------
 * 2018年9月28日       peiwei          3.0             1.0
 * modification
 */
package com.vv_cloud.biz;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;

/**
 * class: WebApp<BR>
 * description: TODO<BR>
 * author: peiwei<BR>
 * date: 2018年9月28日 下午2:25:52<BR>
 *
 */
@EnableZuulProxy
@EnableDiscoveryClient
@SpringBootApplication(scanBasePackages = { "com.vv_cloud.framework.core.config", "com.vv_cloud.biz.**.action",
		"com.vv_cloud.biz.**.service" })
public class Biz_SpringApp extends SpringBootServletInitializer {

	/**
	 * 
	 * @see TODO
	 * @author peiwei
	 * @desc Version: V4.0 Date: 2018年10月11日 下午4:55:02<br>
	 *       History:<br>
	 *       Date Author Version Desc<br>
	 *       ---------------------------------------------------------<br>
	 *       2018年10月11日 peiwei 4.0.1 xxx<br>
	 */
	public static void main(String[] args) {
		SpringApplication.run(Biz_SpringApp.class, args);
	}

	/**
	 * 
	 * @param builder
	 * @return
	 * @author peiwei
	 * @desc Version: V4.0 Date: 2018年10月11日 下午5:02:03<br>
	 *       History:<br>
	 *       Date Author Version Desc<br>
	 *       ---------------------------------------------------------<br>
	 *       2018年10月11日 peiwei 4.0.1 xxx<br>
	 */
	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
		return super.configure(builder);
	}

}
