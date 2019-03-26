package com.senyint.frame_core.component.exceptionHandler;

import java.sql.SQLException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

import com.senyint.frame_core.component.properties.PropertyConfig;
import com.senyint.frame_core.core.common.CoreConstant;
import com.senyint.frame_core.core.exception.CoreException;
import com.senyint.frame_core.core.exception.CoreExceptionBiz;
import com.senyint.frame_core.core.exception.sys.CoreExceptionAuthSys;
import com.senyint.frame_core.core.vo.ResponseInfoVo;

/**
 * 全局异常捕捉处理类。Spring实现
 * 
 * @author peiwei
 * @date 2015-1-6
 * @version v1.0
 */
@ControllerAdvice
public class ExceptionHandlerSpring {

    protected static final Logger logger = LoggerFactory.getLogger(ExceptionHandlerSpring.class);

    /**
     * 全局异常捕捉处理
     */
    @ExceptionHandler(value = Exception.class)
    public ModelAndView resolveException(Exception exception, HttpServletRequest request, HttpServletResponse response,
            Object handler) {
        
        String requestType = request.getHeader("accept");

        Boolean isAjax = true;
        // 取得请求的方式（同步或ajax异步）
        if ("XMLHttpRequest".equals(request.getHeader("X-Requested-With"))
                || "application/json".equals(request.getHeader("accept"))) {
            isAjax = true;
        } else {
            isAjax = false;
        }

        // 设置响应码
        response.setStatus(500);

        /*
         * 设置响应信息(json)
         */
        ResponseInfoVo responseInfoVo = new ResponseInfoVo("业务处理出现异常！重试后仍不能成功，请联系系统管理员。");
        responseInfoVo.setType(requestType);
        responseInfoVo.setStatus(ResponseInfoVo.Status.Status20);

        /*
         * 将异常信息分类，并处理后返回给用户提示页面
         */
        Throwable throwable = exception.getCause();
        if (throwable == null) {
            throwable = exception;
        }

        if (throwable instanceof CoreExceptionBiz) {
            // 业务异常
            CoreExceptionBiz coreExceptionBiz = (CoreExceptionBiz) throwable;

            responseInfoVo.setTitle("业务异常！");
            responseInfoVo.setMessage(coreExceptionBiz.getMessage());
            responseInfoVo.setExplain("重试后仍不能成功，请联系系统管理员。");
            logger.error("业务异常！", throwable);

        } else if (throwable instanceof CoreExceptionAuthSys) {
            // 权限异常
            CoreExceptionAuthSys coreExceptionAuth = (CoreExceptionAuthSys) throwable;

            responseInfoVo.setTitle("权限异常！");
            responseInfoVo.setMessage(coreExceptionAuth.getMessage());
            responseInfoVo.setExplain("重试后仍不能成功，请联系系统管理员。");
            logger.error("权限异常！", throwable);

        } else if (throwable instanceof CoreException) {
            // 系统异常
            CoreException coreException = (CoreException) throwable;

            responseInfoVo.setTitle("系统异常！");
            responseInfoVo.setMessage(coreException.getMessage());
            responseInfoVo.setExplain("重试后仍不能成功，请联系系统管理员。");

            logger.error("系统异常！", throwable);

        } else if (throwable instanceof NullPointerException) {
            // 空指针异常

            responseInfoVo.setTitle("系统异常！");
            responseInfoVo.setMessage("系统处理必须的参数为空！");
            responseInfoVo.setExplain("重试后仍不能成功，请联系系统管理员。");
            logger.error("空指针异常！", throwable);

        } else if (throwable instanceof SQLException) {
            // 数据库异常
            SQLException sqlException = (SQLException) throwable;

            int sqlErrorCode = sqlException.getErrorCode();
            String errorMessage = PropertyConfig.getProperty(CoreConstant.SqlErrorCode_ + sqlErrorCode);

            responseInfoVo.setTitle("数据库异常！");
            responseInfoVo.setMessage(errorMessage);
            responseInfoVo.setExplain("重试后仍不能成功，请联系系统管理员。");
            logger.error("数据库异常", throwable);

        } else {
            responseInfoVo.setTitle("未知系统异常！");
            responseInfoVo.setMessage(throwable.getMessage());
            responseInfoVo.setExplain("重试后仍不能成功，请联系系统管理员。");
            logger.error("未知系统异常！", throwable);
        }

        if (isAjax) {
            return new ModelAndView(new MappingJackson2JsonView(), "resultInfoVo", responseInfoVo);
        } else {
            return new ModelAndView("common/errorPage/error", "resultInfoVo", responseInfoVo);
        }

    }
}