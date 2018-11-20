/**
 * project: biz_demo
 * package: com.vv.biz.biz_demo.action
 * file: DemoTest.java
 * description: TODO
 * Senyint
 * Copyright 2018 All rights Reserved
 * 
 * author: peiwei
 * version: V3.0
 * date: 2018年9月28日 下午7:32:52
 *
 * history:
 * date          author          version          description
 * -----------------------------------------------------------------------------------
 * 2018年9月28日       peiwei          3.0             1.0
 * modification
 */
package com.vv_cloud.biz.biz_pub.login_manage.action;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vv_cloud.frame.frame_core.action.CoreActionSupport;


/**
  * class: DemoTest<BR>
  * description: TODO<BR>
  * author: peiwei<BR>
  * date: 2018年9月28日 下午7:32:52<BR>
  *
  */
@RestController
@RequestMapping("/login")
public class LoginAction extends CoreActionSupport {

    //@Autowired
    //private RestTemplate restTemplate;
	@Value("${loginaction_value}")
	private String loginaction_value;

    @RequestMapping("/userLogin")
    public String userLogin() {
        this.logger.info("userLogin.ajax.....loginaction_value:"+loginaction_value);
//        this.logger.info("userLogin.ajax.....");
        
        /*
         * 后端服务，通过注册中心
         */
//        return restTemplate.getForEntity("http://biz-base/user/get.ajax",String.class).getBody();
        return "userLogin.ajax";
    }

}
