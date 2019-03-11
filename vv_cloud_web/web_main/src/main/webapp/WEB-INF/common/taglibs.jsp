<%-- (jstl taglib) need import to these jar: jstl.jar, standard.jar--%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%-- <%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%> --%>

<%-- 是否调试模式，debug模式系统每次请求都刷新js、css等缓存数据 --%>
<c:set var="isdebug" value="${isdebug}" />
<%-- 系统资源文件版本号（每次重启系统会生成新的小版本号，用于刷新js、css等缓存数据） --%>
<c:set var="version" value="${version}" />

<%-- 上下文环境变量 --%>
<c:set var="web_mainpath"
	value="${pageContext.request.scheme}://${pageContext.request.serverName}:${pageContext.request.serverPort}${pageContext.request.contextPath}" />
<%-- 后端服务智能网关地址 --%>
<c:set var="server_zuulpath" value="${server_zuulpath}" />






