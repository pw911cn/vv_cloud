package com.senyint.frame_core.core.exception.frame;

import com.senyint.frame_core.core.exception.ContextLog;
import com.senyint.frame_core.core.exception.CoreException;

/**
 * Function: 业务模块异常，为action，service等模块提供异常<br/>
 * REASON: <br/>
 * VERSION: 4.0
 *
 * @Auther: zhangyang
 * @Date: 2018/12/13.
 */
public class CoreExceptionFrameData extends CoreException {

    public CoreExceptionFrameData(String message, Throwable cause) {
        super(message, cause, String.valueOf(ContextLog.BIZ_EXP));
    }

    public CoreExceptionFrameData(String message, Throwable cause, String code) {
        super(message, cause, concat(ContextLog.BIZ_EXP, code));
    }

    public CoreExceptionFrameData(String message) {
        super(message, String.valueOf(ContextLog.BIZ_EXP));
    }

    public CoreExceptionFrameData(String message, String code) {
        super(message, concat(ContextLog.BIZ_EXP, code));
    }

}
