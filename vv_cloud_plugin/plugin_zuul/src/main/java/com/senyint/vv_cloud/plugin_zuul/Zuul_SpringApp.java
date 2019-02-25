package com.senyint.vv_cloud.plugin_zuul;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;

/**
 * 
 * 
 * @author peiwei
 * @desc Version: V4.0 Date: 2018年10月11日 下午5:41:28<br>
 *       History:<br>
 *       Date Author Version Desc<br>
 *       ---------------------------------------------------------<br>
 *       2018年10月11日 peiwei 4.0.1 xxx<br>
 */
@EnableZuulProxy
//@EnableFeignClients
@EnableDiscoveryClient
//@EnableGlobalMethodSecurity(prePostEnabled = true)
// @ComponentScan(basePackages = { "" })
@SpringBootApplication
public class Zuul_SpringApp {

    public static void main(String[] args) {
        SpringApplication.run(Zuul_SpringApp.class, args);
    }

    //	@Bean
    //	LoadBalancerInterceptor loadBalancerInterceptor(LoadBalancerClient loadBalance) {
    //		return new LoadBalancerInterceptor(loadBalance);
    //	}
}
