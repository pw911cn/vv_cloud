package com.senyint.vv_cloud_server.server_base;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

/**
 * @author peiwei
 * @desc Version: V4.0 Date: 2018年10月11日 下午5:40:15<br>
 *       History:<br>
 *       Date Author Version Desc<br>
 *       ---------------------------------------------------------<br>
 *       2018年10月11日 peiwei 4.0.1 xxx<br>
 */
@SpringBootApplication
public class ServerBase_SpringApp extends SpringBootServletInitializer {

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(ServerBase_SpringApp.class);
    }

    public static void main(String[] args) {
        SpringApplication.run(ServerBase_SpringApp.class, args);
    }
}
