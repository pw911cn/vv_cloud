package com.senyint.frame_core.core.exception.frame;

import com.senyint.frame_core.core.exception.ContextLog;
import com.senyint.frame_core.core.exception.CoreException;

@Deprecated
public class CoreExceptionPersistent extends CoreException {

    public CoreExceptionPersistent(String message, Throwable cause) {
        super(message, cause, String.valueOf(ContextLog.BIZ_EXP));
    }

    public CoreExceptionPersistent(String message, Throwable cause, String code) {
        super(message, cause, concat(ContextLog.BIZ_EXP, code));
    }

    public CoreExceptionPersistent(String message) {
        super(message, String.valueOf(ContextLog.BIZ_EXP));
    }

    public CoreExceptionPersistent(String message, String code) {
        super(message, concat(ContextLog.BIZ_EXP, code));
    }

}
