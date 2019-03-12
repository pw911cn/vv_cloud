package com.senyint.frame_core.core.exception.sys;

import com.senyint.frame_core.core.exception.ContextLog;
import com.senyint.frame_core.core.exception.CoreException;

@Deprecated
public class CoreExceptionAuthSys extends CoreException {

    public CoreExceptionAuthSys(String message, Throwable cause) {
        super(message, cause, String.valueOf(ContextLog.BIZ_EXP));
    }

    public CoreExceptionAuthSys(String message, Throwable cause, String code) {
        super(message, cause, concat(ContextLog.BIZ_EXP, code));
    }

    public CoreExceptionAuthSys(String message) {
        super(message, String.valueOf(ContextLog.BIZ_EXP));
    }

    public CoreExceptionAuthSys(String message, String code) {
        super(message, concat(ContextLog.BIZ_EXP, code));
    }

}
