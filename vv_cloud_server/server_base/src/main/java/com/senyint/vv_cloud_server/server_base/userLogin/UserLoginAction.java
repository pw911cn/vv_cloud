package com.senyint.vv_cloud_server.server_base.userLogin;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.senyint.vv_cloud_entity.entity_base.pojo.BaseUser;

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
@RequestMapping("/")
public class UserLoginAction {

    @RequestMapping("/userLogin")
    public BaseUser userLogin(@RequestBody BaseUser baseUser) {
        
        baseUser.setUser_id("test user_id");
        baseUser.setUser_name("test user_name");
        
        return baseUser;
    }
    
}
