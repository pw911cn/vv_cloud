package com.senyint.frame_core.component.properties;

import java.util.Locale;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.servlet.support.RequestContext;

/**
 * 
 * 国际化信息获取
 * 
 * @author peiwei
 * @date 2016年1月28日
 * 
 */
public class LocaleMessage {

	protected static Logger logger = LoggerFactory.getLogger(LocaleMessage.class);
	
	/**
	 * 根据key获取国际化value
	 * 
	 * @param key
	 * @return
	 */
	public static String getMessage(String key) {
		// RequestContextUtils.

		ServletRequestAttributes servletRequestAttributes = (ServletRequestAttributes) RequestContextHolder
				.getRequestAttributes();
		HttpServletRequest request = servletRequestAttributes.getRequest();

		RequestContext requestContext = new RequestContext(request);

		return requestContext.getMessage(key);

	}

	/**
	 * 从浏览器端获取本地类型；如果浏览器端获取不到Locale，从本地系统获取。
	 * 
	 * @return
	 */
	public static Locale getLocale() {
	    Locale locale;
	    try {
	        ServletRequestAttributes servletRequestAttributes = (ServletRequestAttributes) RequestContextHolder
	                .getRequestAttributes();
	        HttpServletRequest request = servletRequestAttributes.getRequest();

	        RequestContext requestContext = new RequestContext(request);
	        locale = requestContext.getLocale();
        } catch (Exception e) {
            logger.debug("浏览器端获取不到Locale，从本地系统获取");
            
            // 从本地系统获取
            locale = Locale.getDefault();  
        }

		return locale;
	}
	
	/**
	 * 
	 *<p>
	  * method:  getLanguage<BR>
	  * description:  从浏览器端获取语言（包括国家）<BR>
	  * author:  peiwei<BR>
	  * date:  2016年10月17日 下午4:16:40<BR>
	  * 
	  * @return
	 */
	public static String getLanguage()
	{
	    String localeLanguage = getLocale().toString();
	    
	    return localeLanguage.toLowerCase();
	}
	
	/**
	 * 
	 *<p>
	  * method:  getLanguage<BR>
	  * description:  从浏览器端获取语言（包括国家）<BR>
	  * author:  peiwei<BR>
	  * date:  2016年10月17日 下午4:16:51<BR>
	  * 
	  * @param str
	  * @return
	 */
    public static String getLanguage(String str)
    {
        if (str == null || "".equals(str))
        {
            return getLanguage();
        }
        
        return str;
    }
    
    /**
     * 获取
     *<p>
      * method:  getCountry<BR>
      * description:  从浏览器端获取国家<BR>
      * author:  peiwei<BR>
      * date:  2016年10月17日 下午4:14:54<BR>
      * 
      * @return
     */
    public static String getCountry() {
        return getLocale().getCountry();
    }
    
    public static void main(String[] args){
        Locale locale  = getLocale();
        
        logger.debug("locale：" + locale.toString());
    }
    
    
}
