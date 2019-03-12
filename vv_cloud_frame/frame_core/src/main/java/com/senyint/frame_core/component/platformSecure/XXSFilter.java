package com.senyint.frame_core.component.platformSecure;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;

import org.springframework.core.annotation.Order;

import com.senyint.frame_core.component.platformSecure.xss.XssDual;

/**
 * 
 * ClassName: XXSFilter <br/>  
 * Function: TODO ADD FUNCTION. <br/>  
 * Reason: TODO ADD REASON(可选). <br/>  
 * date: 2018年12月26日 上午10:42:09 <br/>  
 *  
 * @author zhangyang  
 * @version   
 * @since JDK 1.8
 */
@Order(1)
@WebFilter(filterName  = "xxsFilter", urlPatterns = "/*")
public class XXSFilter implements Filter {
	
	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		// todo
	}
	
	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		chain.doFilter(new XssDual((HttpServletRequest)request), response);
	}

	@Override
	public void destroy() {
		//todo
	}

}
