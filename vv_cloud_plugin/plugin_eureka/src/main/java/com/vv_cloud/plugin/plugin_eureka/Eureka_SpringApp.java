package com.vv_cloud.plugin.plugin_eureka;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

/**
 * 
 * 
 * @author peiwei
 * @desc Version: V4.0 Date: 2018年10月11日 下午5:40:15<br>
 *       History:<br>
 *       Date Author Version Desc<br>
 *       ---------------------------------------------------------<br>
 *       2018年10月11日 peiwei 4.0.1 xxx<br>
 */
@EnableEurekaServer
// 开启注册中心服务
@SpringBootApplication
public class Eureka_SpringApp extends SpringBootServletInitializer {

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(Eureka_SpringApp.class);
	}

	public static void main(String[] args) {
		SpringApplication.run(Eureka_SpringApp.class, args);
	}
}
