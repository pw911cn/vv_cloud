package com.senyint.frame_core.component.httpclient;

public class DefaultResponse {

    // 应答状态码
    private Integer statusCode;
    
    private String content;

    public DefaultResponse() {
        super();
    }

    public DefaultResponse(String content, Integer statusCode) {
        super();
        this.content = content;
        this.statusCode = statusCode;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Integer getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(Integer statusCode) {
        this.statusCode = statusCode;
    }

    @Override
    public String toString() {
        return "DefaultResponse [statusCode=" + statusCode + ", content=" + content + "]";
    }
    

}
