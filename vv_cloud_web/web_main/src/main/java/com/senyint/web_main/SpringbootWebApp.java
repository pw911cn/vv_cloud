package com.senyint.web_main;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.PropertySource;


@SpringBootApplication
@EnableAutoConfiguration
@PropertySource("classpath:application.properties")
//@EnableEurekaClient
public class SpringbootWebApp extends SpringBootServletInitializer {

	
	
	public static void main(String[] args) {
		SpringApplication.run(SpringbootWebApp.class, args);
	}
	
	
	
	@Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
         return builder.sources(SpringbootWebApp.class);
    }
	
	
	
}

