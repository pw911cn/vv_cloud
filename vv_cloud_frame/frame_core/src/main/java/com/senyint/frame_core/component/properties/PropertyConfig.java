package com.senyint.frame_core.component.properties;

import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.config.ConfigurableListableBeanFactory;
import org.springframework.beans.factory.config.PropertyPlaceholderConfigurer;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

/**
 * 
* @ClassName: SpringProperty 
* @Description: TODO 为了系统少量改动，改名为PropertyConfig
* @author zhangyang
* @date 2017年10月31日 下午2:55:05 
*
 */
//@Configuration
public class PropertyConfig extends PropertyPlaceholderConfigurer {

    private Logger logger = LoggerFactory.getLogger(this.getClass());
    public static final String PATH = "config/system-exception.properties;";

    private static Map<String, String> propertyMap;

    public PropertyConfig() {
        super.ignoreUnresolvablePlaceholders = true;
        init();
    }

    public void init() {
        String[] pa = PATH.split(";");
        Resource[] re = new Resource[pa.length];
        int i = 0;
        for (String p : pa) {
            re[i] = new ClassPathResource(p);
            i++;
        }
        setLocations(re);
    }

    @Override
    public void setLocations(Resource... locations) {
        super.setLocations(locations);
    }

    @Override
    protected void processProperties(ConfigurableListableBeanFactory beanFactoryToProcess, Properties props)
            throws BeansException {
        super.processProperties(beanFactoryToProcess, props);
        
        propertyMap = new HashMap<String, String>();
        
        props.forEach((m, n) -> {
            String value = null;
            try {
                value = new String(n.toString().getBytes("ISO-8859-1"), "utf-8");
            } catch (UnsupportedEncodingException e) {
                logger.error("转换uft出错!");
            }
            propertyMap.put(m.toString(), value);
            //logger.debug("缓存配置文件：---" + m.toString() + "=" + value);

        });

    }

    //static method for accessing context properties
    @SuppressWarnings("unchecked")
    public static <T> T getProperty(String name) {
        return (T) propertyMap.get(name);
    }
}