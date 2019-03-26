
package com.senyint.web_main.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

public class Auth_Interceptor implements HandlerInterceptor {

    private static Logger logger = LoggerFactory.getLogger(Auth_Interceptor.class);

    /**  
     * TODO 简单描述该方法的实现功能（可选）.  
     * @see org.springframework.web.servlet.HandlerInterceptor#preHandle(javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse, java.lang.Object)  
     */
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {

        logger.debug("====>权限拦截器访问记录:" + request.getRequestURI());

        return HandlerInterceptor.super.preHandle(request, response, handler);
    }

    /**  
     * TODO 简单描述该方法的实现功能（可选）.  
     * @see org.springframework.web.servlet.HandlerInterceptor#postHandle(javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse, java.lang.Object, org.springframework.web.servlet.ModelAndView)  
     */
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
            ModelAndView modelAndView) throws Exception {

        // TODO Auto-generated method stub  
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
