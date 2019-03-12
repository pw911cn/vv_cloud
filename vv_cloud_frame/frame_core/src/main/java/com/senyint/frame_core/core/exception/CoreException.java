package com.senyint.frame_core.core.exception;

/**
 * 
 * ClassName: CombBaseException <br/>  
 * Function: comb平台基础的exception,只允许基础的模块异常类继承，不允许其他的继承<br/>
 * Reason: TODO ADD REASON(可选). <br/>  
 * date: 2018年12月10日 下午2:00:01 <br/>  
 *  
 * @author zhangyang  
 * @version   
 * @since JDK 1.8
 */
public class CoreException extends Exception {

    public String code;

    private static final long serialVersionUID = 1L;

    protected CoreException(String message, String code) {
        super(message + "--错误码:" + code);
        this.code = code;
    }

    protected CoreException(String message, Throwable cause) {
        super(message, cause);
    }

    protected CoreException(String message, Throwable cause, String code) {
        super(message + "--错误码:" + code, cause);
        this.code = code;
    }

    protected CoreException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }

    protected synchronized static String concat(Object code, Object code1) {
        if (!(code instanceof String) && !(code instanceof Integer)) {
            return null;
        }
        if (!(code1 instanceof String) && !(code1 instanceof Integer)) {
            return null;
        }
        return code + "-" + code1;
    }

}
