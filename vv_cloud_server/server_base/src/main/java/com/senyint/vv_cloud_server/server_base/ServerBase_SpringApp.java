package com.senyint.vv_cloud_server.server_base;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

/**
 * @author peiwei
 * @desc Version: V4.0 Date: 2018年10月11日 下午5:40:15<br>
 *       History:<br>
 *       Date Author Version Desc<br>
 *       ---------------------------------------------------------<br>
 *       2018年10月11日 peiwei 4.0.1 xxx<br>
 */
@SpringBootApplication(scanBasePackages = {"com.senyint.*.*.action", "com.senyint.*.*.service"})
@EnableEurekaClient
//帮助SpringBoot应用将所有符合条件的@Configuration配置都加载到当前SpringBoot创建并使用的IoC容器。
//@EnableAutoConfiguration
public class ServerBase_SpringApp extends SpringBootServletInitializer {

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(ServerBase_SpringApp.class);
    }

    public static void main(String[] args) {
        SpringApplication.run(ServerBase_SpringApp.class, args);
    }
}
