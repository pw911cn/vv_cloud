package com.senyint.frame_core.core.vo;

import java.io.Serializable;

/**
 * 
 * @desc:TODO 
 * @author: peiwei
 * version: V4.0
 * date: 2018年8月16日 下午2:18:24
 *
 * history:
 * date          author          version          description
 * -----------------------------------------------------------------------------------
 * 2018年8月16日       peiwei          4.0             1.0
 * modification
 */
public class ResponseInfoVo<T> implements Serializable {

    private static final long serialVersionUID = 1L;

    /** 响应状态类型 */
    public static final class Status {

        /** 10响应正常 */
        public static final String Status10 = "10";

        /** 20响应出错 */
        public static final String Status20 = "20";

        /** 30登录超时 */
        public static final String Status30 = "30";
    }

    /** 请求类型 */
    private String type = "XMLHttpRequest";

    /** 响应信息标题 */
    private String title = "操作成功";

    /** 响应信息图标:提示、警告、错误 */
    private String icon = "";

    /** 是否显示 */
    private Boolean isShow = true;

    /**
     * 响应信息样式：<br>                                                                        
     * -----------------------------------------------------------------------------------------
     * |响应信息标题（title）                                                                                                                                         |
     * ------------------------------------------------------------------------------------------
     * |响应信息图标（icon）                           响应信息短信息（message【如：业务操作成功/业务操作出现异常】）      |
     * |                   响应信息详细说明(explain【特殊说明时，显示】)                  |
     * |                   响应信息详细说明(datas【特殊需要时，显示】)                    |
     * |----------------------------------------------------------------------------------------|
     */

    /** 响应状态（必填） */
    private String status = ResponseInfoVo.Status.Status10;

    /** 响应信息（必填） */
    private String message = "业务操作成功";

    /** 响应数据对象（可为Object或List<T>或PageVo） */
    private T datas;

    /** 响应信息详情 */
    private String explain = "";

    public ResponseInfoVo() {

    }

    /**
     * 
     * @desc:构造方法
     * @author: peiwei
     */
    public ResponseInfoVo(T datas) {
        this.datas = datas;
    }

    /**
     * 
     * @desc:构造方法
     * @author: peiwei
     */
    public ResponseInfoVo(String message) {
        this.message = message;
    }

    /**
     * getter status
     * @return the status
     */
    public String getStatus() {
        return status;
    }

    /**
     * setter status
     * @param status
     */
    public void setStatus(String status) {
        this.status = status;
    }

    /**
     * getter title
     * @return the title
     */
    public String getTitle() {
        return title;
    }

    /**
     * setter title
     * @param title
     */
    public void setTitle(String title) {
        this.title = title;
    }

    /**
     * getter icon
     * @return the icon
     */
    public String getIcon() {
        return icon;
    }

    /**
     * setter icon
     * @param icon
     */
    public void setIcon(String icon) {
        this.icon = icon;
    }

    /**
     * getter message
     * @return the message
     */
    public String getMessage() {
        return message;
    }

    /**
     * setter message
     * @param message
     */
    public void setMessage(String message) {
        this.message = message;
    }

    /**
     * getter explain
     * @return the explain
     */
    public String getExplain() {
        return explain;
    }

    /**
     * setter explain
     * @param explain
     */
    public void setExplain(String explain) {
        this.explain = explain;
    }

    /**
     * getter type
     * @return the type
     */
    public String getType() {
        return type;
    }

    /**
     * setter type
     * @param type
     */
    public void setType(String type) {
        this.type = type;
    }

    /**
     * getter isShow
     * @return the isShow
     */
    public Boolean getIsShow() {
        return isShow;
    }

    /**
     * setter isShow
     * @param isShow
     */
    public void setIsShow(Boolean isShow) {
        this.isShow = isShow;
    }

    public T getDatas() {
        return datas;
    }

    public void setDatas(T datas) {
        this.datas = datas;
    }

}
