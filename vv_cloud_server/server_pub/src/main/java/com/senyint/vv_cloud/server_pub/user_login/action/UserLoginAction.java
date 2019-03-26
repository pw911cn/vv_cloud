package com.senyint.vv_cloud.server_pub.user_login.action;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @desc:TODO 
 * @author: weiwei
 * version: V4.0
 * date: 2019年3月3日 下午8:17:52
 *
 * history:
 * date          author          version          description
 * -----------------------------------------------------------------------------------
 * 2019年3月3日       weiwei          4.0             1.0
 * modification
 */
@RestController
@RequestMapping("/userLogin")
public class UserLoginAction {

    
    @RequestMapping("/test")
    public String test() {
        
        return "test 返回成功";
    }
    
}
