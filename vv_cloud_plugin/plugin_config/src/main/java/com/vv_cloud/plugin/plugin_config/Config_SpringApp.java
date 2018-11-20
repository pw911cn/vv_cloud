package com.vv_cloud.plugin.plugin_config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.config.server.EnableConfigServer;

/**
 * 
 * 
 * @author peiwei
 * @desc Version: V4.0 Date: 2018年10月19日 下午5:56:50<br>
 *       History:<br>
 *       Date          Author          Version          Desc<br>
 *       ---------------------------------------------------------<br>
 *       2018年10月19日       peiwei          4.0.1             xxx<br>
 */
@EnableConfigServer
//@EnableDiscoveryClient
@SpringBootApplication
public class Config_SpringApp extends SpringBootServletInitializer {

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(Config_SpringApp.class);
	}

	public static void main(String[] args) {
		SpringApplication.run(Config_SpringApp.class, args);
	}

	
}
