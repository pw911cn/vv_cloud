package com.senyint.vv_cloud.entity_base.pojo;

/**
 * @desc:TODO 
 * @author: weiwei
 * version: V4.0
 * date: 2019年3月3日 上午12:54:44
 *
 * history:
 * date          author          version          description
 * -----------------------------------------------------------------------------------
 * 2019年3月3日       weiwei          4.0             1.0
 * modification
 */

public class BaseUser {

    private String user_id;

    private String user_name;

    /**
     * getter user_id
     * @return the user_id
     */
    public String getUser_id() {
        return user_id;
    }

    /**
     * setter user_id
     * @param user_id
     */
    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }

    /**
     * getter user_name
     * @return the user_name
     */
    public String getUser_name() {
        return user_name;
    }

    /**
     * setter user_name
     * @param user_name
     */
    public void setUser_name(String user_name) {
        this.user_name = user_name;
    }

}
