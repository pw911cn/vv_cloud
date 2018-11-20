
package com.vv_cloud.biz.biz_main.auth_interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

public class Auth_Interceptor implements HandlerInterceptor {

    private static Logger logger = LoggerFactory.getLogger(Auth_Interceptor.class);

    /**
     * 
     * @param request
     * @param response
     * @param handler
     * @return
     * @throws Exception
     * @author peiwei
     * @desc Version: V4.0 Date: 2018年10月11日 下午5:49:51<br>
     *       History:<br>
     *       Date          Author          Version          Desc<br>
     *       ---------------------------------------------------------<br>
     *       2018年10月11日       peiwei          4.0.1             xxx<br>
     */
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {

        logger.info("权限拦截器====>业务方法进入前:" + request.getRequestURI());

        // 用户登陆不拦截
//        if (request.getRequestURI().equals("/login/userLogin")) {
//            logger.info("====>用户登陆不拦截:" + request.getRequestURI());
//            return true;
//        }

        return HandlerInterceptor.super.preHandle(request, response, handler);
    }

    /**
     * 
     * @param request
     * @param response
     * @param handler
     * @param modelAndView
     * @throws Exception
     * @author peiwei
     * @desc Version: V4.0 Date: 2018年10月11日 下午5:49:36<br>
     *       History:<br>
     *       Date          Author          Version          Desc<br>
     *       ---------------------------------------------------------<br>
     *       2018年10月11日       peiwei          4.0.1             xxx<br>
     */
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
            ModelAndView modelAndView) throws Exception {

    	logger.info("权限拦截器====>业务方法响应前:" + request.getRequestURI());
        
        // TODO Auto-generated method stub  
        HandlerInterceptor.super.postHandle(request, response, handler, modelAndView);
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
            throws Exception {

        // TODO Auto-generated method stub  
        HandlerInterceptor.super.afterCompletion(request, response, handler, ex);
    }

}
