
package com.senyint.web_main.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

/**
 * 通过权限拦截html内容
 * ClassName: System_Interceptor <br/>  
 * Function: TODO ADD FUNCTION. <br/>  
 * Reason: TODO ADD REASON(可选). <br/>  
 * date: 2018年8月1日 上午10:33:49 <br/>  
 *  
 * @author zhangyang  
 * @version   
 * @since JDK 1.8
 */
public class System_Interceptor implements HandlerInterceptor {

    private static Logger logger = LoggerFactory.getLogger(System_Interceptor.class);

    /**  
     * TODO 简单描述该方法的实现功能（可选）.  
     * @see org.springframework.web.servlet.HandlerInterceptor#preHandle(javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse, java.lang.Object)  
     */
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {

        logger.debug("====》系统请求URI：" + request.getRequestURI());
        
        return HandlerInterceptor.super.preHandle(request, response, handler);
    }

    /**  
     * TODO 简单描述该方法的实现功能（可选）.  
     * @see org.springframework.web.servlet.HandlerInterceptor#postHandle(javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse, java.lang.Object, org.springframework.web.servlet.ModelAndView)  
     */
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
            ModelAndView modelAndView) throws Exception {
        
        HandlerInterceptor.super.postHandle(request, response, handler, modelAndView);
    }

    /**  
     * TODO 简单描述该方法的实现功能（可选）.  
     * @see org.springframework.web.servlet.HandlerInterceptor#afterCompletion(javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse, java.lang.Object, java.lang.Exception)  
     */
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
            throws Exception {

        // TODO Auto-generated method stub  
        HandlerInterceptor.super.afterCompletion(request, response, handler, ex);
    }

}
