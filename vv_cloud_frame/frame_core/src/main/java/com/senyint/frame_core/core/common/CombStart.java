package com.senyint.frame_core.core.common;

/**
 * 平台启动的总入口，建议所有入口实现该接口
 * ClassName: CombStart <br/>  
 * Function: TODO ADD FUNCTION. <br/>  
 * Reason: TODO ADD REASON(可选). <br/>  
 * date: 2018年9月26日 下午1:39:49 <br/>  
 *  
 * @author zhangyang  
 * @version   
 * @since JDK 1.8
 */
public interface CombStart {
	
	public default String  getCombVersion() {
		return "4.0";
	}
}
