package com.senyint.vv_cloud.plugin_zuul.config;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cloud.netflix.zuul.filters.support.FilterConstants;
import org.springframework.stereotype.Component;

import com.netflix.zuul.ZuulFilter;
import com.netflix.zuul.context.RequestContext;

/**
 * @desc 路由拦截<br>
 * zuul的filter过滤器的生命周期有一下四个：
 * Pre： 这种过滤器在请求被路由之前调用。我们可利用这种过滤器实现身份验证、在集群中选择请求的微服务、记录调试信息等。
 * Routing：这种过滤器将请求路由到微服务。这种过滤器用于构建发送给微服务的请求，并使用Apache HttpClient或Netfilx Ribbon请求微服务。
 * POST：这种过滤器在路由到微服务以后执行。这种过滤器可用来为响应添加标准的HTTP Header、收集统计信息和指标、将响应从微服务发送给客户端等。
 * ERROR：在其他阶段发生错误时执行该过滤器。 除了默认的过滤器类型，Zuul还允许我们创建自定义的过滤器类型。例如，我们可以定制一种STATIC类型的过滤器，直接在Zuul中生成响应，而不将请求转发到后端的微服务。
 *
 * @author weiwei<br>
 * version: V4.0<br>
 * date: 2019年5月16日 下午11:56:13<br>
 */
@Component
public class RoutingZuulFilter extends ZuulFilter {

    private static final Logger logger = LoggerFactory.getLogger(RoutingZuulFilter.class);

    public String filterType() {
        //在请求被路由之前调用
        return FilterConstants.ROUTE_TYPE;
    }

    public int filterOrder() {
        //filter执行顺序，通过数字指定 ,优先级为0，数字越大，优先级越低
        return 0;
    }

    public boolean shouldFilter() {
        //        RequestContext context = RequestContext.getCurrentContext();
        //        Boolean isSuccess = (boolean) context.get("isSuccess");
        //        return isSuccess;
        // 是否执行该过滤器
        return true;
    }

    @Override
    public Object run() {
        RequestContext ctx = RequestContext.getCurrentContext();
        HttpServletRequest request = ctx.getRequest();
        String requestURI = request.getRequestURI();

        String serviceId = (String) ctx.get(FilterConstants.SERVICE_ID_KEY);
        String routingRequestURI = (String) ctx.get(FilterConstants.REQUEST_URI_KEY);

        logger.info("====>RoutingZuulFilter请求记录：" + requestURI + ",serviceId:" + serviceId + ",routingRequestURI:"
                + routingRequestURI);

        return null;
    }

}