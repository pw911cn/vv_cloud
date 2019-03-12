package com.senyint.frame_core.core.vo;

import java.io.Serializable;

/**
  * 类名：CoreBaseVO<BR>
  * 描述：所有实体需要继承的类 将系统默认的表字段固化到pojo中<BR>
  * 作者： jiangshidong<BR>
  * 日期 ：2018年8月10日 上午11:29:52<BR>
  *
  */
public class CoreBasePojo implements Serializable
{
    /**
      * Field: id 实体主键<BR>
      */
    private String id;

    public String getId()
    {
        return id;
    }

    public void setId(String id)
    {
        this.id = id;
    }
    
}
