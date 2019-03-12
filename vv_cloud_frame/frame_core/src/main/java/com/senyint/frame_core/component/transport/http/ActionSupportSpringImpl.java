package com.senyint.frame_core.component.transport.http;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.ServletRequestDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.servlet.LocaleResolver;

import com.senyint.frame_core.core.vo.ResponseInfoVo;

public class ActionSupportSpringImpl {

    private static final ThreadLocal<HttpServletRequest> requestThreadLocal = new ThreadLocal<HttpServletRequest>();

    private static final ThreadLocal<HttpServletResponse> responseThreadLocal = new ThreadLocal<HttpServletResponse>();

    private static final ThreadLocal<ResponseInfoVo> resultInfoVoThreadLocal = new ThreadLocal<ResponseInfoVo>();

    /**
     * 表单数据封装：自定义数据类型转换
     */
    @InitBinder
    void initBinder(HttpServletRequest request, ServletRequestDataBinder binder) throws Exception {
        /*
         * Date类型的属性，需要使用DateEditor进行处理
         */
        //binder.registerCustomEditor(Date.class, new DateTypeConverter());

    }

    /**
     * @author peiwei
     * @date 2016-5-20
     * @param request
     * @param response
     */
    @ModelAttribute
    void init(HttpServletRequest request, HttpServletResponse response) {
        // 20171214 解决ajax请求中sessionId改变的问题。
//        response.reset();
//        requestThreadLocal.set(request);
//        responseThreadLocal.set(response);
//
//        resultInfoVoThreadLocal.set(new ResultInfoVo());
    }

    /**
     * 获取请求对象
     * 
     * @return
     */
    public HttpServletRequest getRequest() {
        return requestThreadLocal.get();
    }

    /**
     * 获取响应对象
     * 
     * @return
     */
    public HttpServletResponse getResponse() {
        return responseThreadLocal.get();
    }

    /**
     * 设置国际化语言
     *<p>
      * method:  setLocaleLang<BR>
      * description:  TODO<BR>
      * author:  peiwei<BR>
      * date:  2016年10月17日 下午4:49:00<BR>
      *
     */
    protected void setLocaleLang(String localeLang, LocaleResolver localeResolver) {
//        if (StringUtils.isEmpty(localeLang)) {
//            localeLang = "zh_cn";
//        }
//        Locale locale = new Locale(localeLang);
//        localeResolver.setLocale(this.getRequest(), this.getResponse(), locale);
    }


}
