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
 * PRE： 这种过滤器在请求被路由之前调用。我们可利用这种过滤器实现身份验证、在集群中选择请求的微服务、记录调试信息等。
 * ROUTING：这种过滤器将请求路由到微服务。这种过滤器用于构建发送给微服务的请求，并使用Apache HttpClient或Netfilx Ribbon请求微服务。
 * POST：这种过滤器在路由到微服务以后执行。这种过滤器可用来为响应添加标准的HTTP Header、收集统计信息和指标、将响应从微服务发送给客户端等。
 * ERROR：在其他阶段发生错误时执行该过滤器。 除了默认的过滤器类型，Zuul还允许我们创建自定义的过滤器类型。例如，我们可以定制一种STATIC类型的过滤器，直接在Zuul中生成响应，而不将请求转发到后端的微服务。
 *
 * @author weiwei<br>
 * version: V4.0<br>
 * date: 2019年5月16日 下午11:56:13<br>
 */
@Component
public class PreZuulFilter extends ZuulFilter {

    private static final Logger logger = LoggerFactory.getLogger(PreZuulFilter.class);

    public String filterType() {
        //在请求被路由之前调用
        return FilterConstants.PRE_TYPE;
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

        logger.info("====>PreZuulFilter请求记录：" + requestURI);

        Boolean isPass = true;

        if (isPass) {
            /*
             * 可以通过的情况
             */
            ctx.setSendZuulResponse(true); //对请求进行路由
            ctx.set("isSuccess", true);
            ctx.setResponseStatusCode(200);
        } else {
            /*
             * 不可以通过的情况
             */
            //            UniVerResponse res = new UniVerResponse();
            //            res.beFalse3("zuul拦截--请求前验证---没有auth登录验证", UniVerResponse.ERROR_BUSINESS);

            ctx.setSendZuulResponse(false); //不对请求进行路由
            ctx.set("isSuccess", false);
            //            ctx.setResponseStatusCode(res.getCode());//设置返回状态码
            //            ctx.setResponseBody(JSON.toJSONString(res));//设置返回响应体
            //            ctx.getResponse().setContentType("application/json;charset=UTF-8");//设置返回响应体格式，可能会乱码
        }

        //        try {
        //
        //            InputStream inputStream = request.getInputStream();
        //
        //            String method = request.getMethod();
        //
        //            String interfaceMethod = request.getServletPath();
        //
        //            //logger.info("请求方法method={},url={}",method,interfaceMethod);
        //            String reqBody = StreamUtils.copyToString(inputStream, Charset.forName("UTF-8"));
        //            int user = 0;
        //            String invokeUser = "";
        //            if ("GET".equals(method.toUpperCase())) {
        //                Map<String, String[]> map = request.getParameterMap();
        //                // 打印请求url参数
        //                if (map != null) {
        //                    StringBuilder sb = new StringBuilder();
        //                    sb.append("{");
        //                    for (Map.Entry<String, String[]> entry : map.entrySet()) {
        //                        String key = entry.getKey();
        //                        String value = printArray(entry.getValue());
        //                        sb.append("[" + key + "=" + value + "]");
        //                        if ("user".equals(key)) {
        //                            invokeUser = value;
        //                        } else if ("userFlag".equals(key)) {
        //                            user = Integer.parseInt(value);
        //                        }
        //                    }
        //                    sb.append("}");
        //                    reqBody = sb.toString();
        //                    //logger.info("reqBody ={}" + reqBody);
        //                }
        //            } else if ("POST".equals(method.toUpperCase())) {
        //
        //                //打印请求json参数
        //                if (reqBody != null) {
        //                    String conType = request.getHeader("content-type");
        //                    //post请求目前获取userFlag，user参数只支持multipart/form-data，application/json，对于其他方式不记录用户信息
        //                    if (conType.contains("multipart/form-data") || conType.contains("application/json")) {
        //                        if (conType.contains("multipart/form-data")) {
        //                            reqBody = MultiPartFormDateToJson.formDateToJson(reqBody);
        //                        }
        //                        //默认content-type传json-->application/json
        //                        Object userObject;
        //                        Object invokeUserObject;
        //                        JSONObject jsonObject = JSONObject.parseObject(reqBody);
        //                        userObject = jsonObject.get("userFlag");
        //                        if (null != userObject) {
        //                            user = Integer.parseInt(userObject.toString());
        //                        } else {
        //                            logger.warn("当前请求缺少userFlag");
        //                        }
        //                        invokeUserObject = jsonObject.get("user");
        //                        if (null != userObject) {
        //                            invokeUser = invokeUserObject.toString();
        //                        } else {
        //                            logger.warn("当前请求缺少user");
        //                        }
        //                        //logger.info("reqBody:={}" + reqBody);
        //                    }
        //                }
        //
        //            }
        //
        //            // 打印response
        //            InputStream out = ctx.getResponseDataStream();
        //            String outBody = StreamUtils.copyToString(out, Charset.forName("UTF-8"));
        //            boolean result = false;
        //            if (outBody != null && "" != outBody) {
        //                JSONObject jsonObject = JSONObject.parseObject(outBody);
        //                Object dataFlagObject = jsonObject.get("dataFlag");
        //                if (null != dataFlagObject) {
        //                    int flag = Integer.parseInt(dataFlagObject.toString());
        //                    if (flag == 1) {
        //                        result = true;
        //                    }
        //                }
        //                //logger.info("响应参数:={}" + outBody);
        //            }
        //            //必须重新写入流//重要！！！
        //            ctx.setResponseBody(outBody);
        //            InvokeLogModel logModel = new InvokeLogModel();
        //            logModel.setUid(user);
        //            logModel.setInvokeUser(invokeUser);
        //            logModel.setInterfaceName(interfaceMethod);
        //            logModel.setInterfaceMethod(method);
        //            logModel.setInvokeStartTime(new Date());
        //            logModel.setInvokeEndTime(null);
        //            logModel.setRequestParam(reqBody);
        //            logModel.setResponseResult(result);
        //            logModel.setResponseBody(outBody);
        //            invokeLogService.insertInvokerLog(logModel);
        //
        //        } catch (IOException e) {
        //            logger.error("LogRecode IO异常", e);
        //        }

        return null;
    }

    String printArray(String[] arr) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < arr.length; i++) {
            sb.append(arr[i]);
            if (i < arr.length - 1) {
                sb.append(",");
            }
        }
        return sb.toString();
    }

}