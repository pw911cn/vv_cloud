package com.senyint.frame_core.core.exception;
/**
 * 
 * ClassName: ContextLog <br/>  
 * Function: 平台功能异常的状态码. <br/>
 * Reason: TODO ADD REASON(可选). <br/>  
 * date: 2018年12月10日 下午3:22:21 <br/>  
 *  
 * @author zhangyang  
 * @version   
 * @since JDK 1.8
 */
public interface ContextLog {

	public static final int COMB_EXP = 000;//平台
	public static final int FRAMEWORK_EXP = 100;//框架
	public static final int PERSISTENT_EXP = 200;//持久层
	public static final int CACHE_EXP = 300;//缓存的异常
	public static final int FILESYS_EXP = 400;//文件管理的异常
	public static final int SSO_EXP = 500;//单点登录的异常
	public static final int WORKFLOW_EXP = 600;//工作流异常
	public static final int MQ_EXP = 700;//消息异常

	public static final int BIZ_EXP = 700;//业务异常
	public static final int SERVICE_EXP = 7101;//service框架的异常
	public static final int ACTION_EXP = 7201;//action框架的异常

}
