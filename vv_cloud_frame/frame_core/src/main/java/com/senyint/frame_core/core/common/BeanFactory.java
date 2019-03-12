package com.senyint.frame_core.core.common;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;

/**
 * Spring注入bean实例工厂
 * 
 * @author 裴巍
 * 
 * update by zhangyang
 */
@Component
public class BeanFactory implements ApplicationContextAware {

    private static ApplicationContext appContext;

    /***
     * 
     * TODO 获取环境上下文（可选）.  
     * @see org.springframework.context.ApplicationContextAware#setApplicationContext(org.springframework.context.ApplicationContext)
     */
    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        if (applicationContext != null) {
            appContext = applicationContext;
        }
    }

    /**
     * 获取appContext
     * getApplicationContext:(). <br/>  
     * @author zhangyang    
     *  
     * @return  
     * @since JDK 1.8
     */
    public static ApplicationContext getApplicationContext() {
        return appContext;
    }

    /**
     * 获取bean
     * getBean:(). <br/>  
     * @author zhangyang    
     *  
     * @param name
     * @return  
     * @since JDK 1.8
     */
    public static <T> T getBean(String name) {
        return (T) getBean(name, null);
    }

    /**
     * 
     *<p>
      * method:  getBean<BR>
      * description:  TODO<BR>
      * author:  peiwei<BR>
      * date:  2018年8月1日 下午3:49:24<BR>
      * 
      * @param clazz
      * @return
     */
    public static <T> T getBean(Class<T> clazz) {
        return getApplicationContext().getBean(clazz);
    }

    /**
     * 
     *<p>
      * method:  getBean<BR>
      * description:  TODO<BR>
      * author:  peiwei<BR>
      * date:  2018年8月1日 下午3:49:27<BR>
      * 
      * @param name
      * @param clazz
      * @return
     */
    public static <T> T getBean(String name, Class<T> clazz) {
        return getApplicationContext().getBean(name, clazz);
    }

}