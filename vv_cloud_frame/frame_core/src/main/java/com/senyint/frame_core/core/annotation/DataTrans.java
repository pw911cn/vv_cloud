package com.senyint.frame_core.core.annotation;

import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

import java.lang.annotation.Retention;
import java.lang.annotation.Target;


/**
 * 进行与基础数据name与value的转换
 * ClassName: DataTrans <br/>  
 * Function: TODO ADD FUNCTION. <br/>  
 * Reason: TODO ADD REASON(可选). <br/>  
 * date: 2018年9月11日 下午3:25:03 <br/>  
 *  
 * @author zhangyang  
 * @version   
 * @since JDK 1.8
 */
@Retention(RUNTIME)
@Target(FIELD)
public @interface DataTrans {
	public abstract String type();//类型
	public abstract String srcVal() default "";//参考的field字段,必须是和field的名称完全相同，包括大小写
}
