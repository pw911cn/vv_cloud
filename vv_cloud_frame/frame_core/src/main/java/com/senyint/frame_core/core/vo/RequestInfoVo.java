package com.senyint.frame_core.core.vo;

import java.io.Serializable;

/**
  * 类名：RequestInfoVo<BR>
  * 描述：公共输入参数对象<BR>
  * 作者： guanhao<BR>
  * 日期 ：2019年1月16日 上午10:24:08<BR>
  * @param <T>
 */
public class RequestInfoVo<T> implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 访问令牌
     */
    private String token;

    /**
     * 入参对象
     */
    private T param;

    /**
     * 入参分页对象
     */
    private PageVo<T> pageVo;

    /**
     * 业务逻辑名称
     */
    private String logicName;

    /**
     * getter logicName
     * @return the logicName
     */
    public String getLogicName() {
        return logicName;
    }

    /**
     * setter logicName
     * @param logicName
     */
    public void setLogicName(String logicName) {
        this.logicName = logicName;
    }

    /**
     * getter token
     * @return the token
     */
    public String getToken() {
        return token;
    }

    /**
     * setter token
     * @param token
     */
    public void setToken(String token) {
        this.token = token;
    }

    /**
     * getter param
     * @return the param
     */
    public T getParam() {
        return param;
    }

    /**
     * setter param
     * @param param
     */
    public void setParam(T param) {
        this.param = param;
    }

    /**
     * getter pageVo
     * @return the pageVo
     */
    public PageVo<T> getPageVo() {
        return pageVo;
    }

    /**
     * setter pageVo
     * @param pageVo
     */
    public void setPageVo(PageVo<T> pageVo) {
        this.pageVo = pageVo;
    }

}
