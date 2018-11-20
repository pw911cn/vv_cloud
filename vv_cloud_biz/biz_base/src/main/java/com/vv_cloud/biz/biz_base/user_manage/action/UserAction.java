package com.vv_cloud.biz.biz_base.user_manage.action;

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
@RequestMapping("/user")
public class UserAction extends CoreActionSupport {

    @RequestMapping("/queryList")
    public String queryList() {
        this.logger.info("queryList.ajax.....");

        return "queryList.ajax";
    }

    @RequestMapping("/get.ajax")
    public String get() {
        System.out.println("get.ajax.....");

        return "get.ajax";
    }

}
