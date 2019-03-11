<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isErrorPage="true"%>
<%@ page import="org.slf4j.Logger,org.slf4j.LoggerFactory"%>

<%@ include file="/WEB-INF/common/taglibs.jsp"%>

<%
    //记录日志
    Logger logger = LoggerFactory.getLogger(this.getClass());

    Object error_status_code = request.getAttribute("javax.servlet.error.status_code");
    Object error_message = request.getAttribute("javax.servlet.error.message");
    Object error_exception_type = request.getAttribute("javax.servlet.error.exception_type");

    logger.error(
            "系统发生错误====>错误码：" + error_status_code + "，错误信息：" + error_message + "，错误类型：" + error_exception_type);
%>

<!DOCTYPE html>
<html>
<head>
	<link rel="stylesheet" type="text/css" href="${ctx}/resources/themes/default/css/portal/ui_common.css?${version}">
</head>

<body>
	<div class="TmsCom_errorK">
		<div class="TmsCom_error">
			<div class="TmsCom_error_cry"></div>
			<div class="TmsCom_error_numcode">403</div>
			<!-- <div class="TmsCom_error_numcode TmsCom_error_biao">未知错误！</div> -->
			<div class="TmsCom_error_text"><bbf:message key="page_errorPage_403Tips"/></div>
		</div>
	</div>
</body>
</html>