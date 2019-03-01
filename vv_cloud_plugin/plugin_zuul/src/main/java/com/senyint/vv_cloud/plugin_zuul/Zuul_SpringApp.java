package com.senyint.vv_cloud.plugin_zuul;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;

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
@EnableZuulProxy
@EnableDiscoveryClient
@SpringBootApplication
public class Zuul_SpringApp extends SpringBootServletInitializer {

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(Zuul_SpringApp.class);
    }

    public static void main(String[] args) {
        SpringApplication.run(Zuul_SpringApp.class, args);
    }

}
