define(['jquery','router'],function($,router) {
	/**
	 * 配置jquery相关参数
	 */
	$.ajaxSetup({
		global : false,
		cache : false,
		async : true,
		type : "POST",
		contentType:"application/json",
		beforeSend : function(xhr,options) {
			//xhr.setRequestHeader('token','88888888');
			//options.url+="?token=88888"
		},
		success : function(resultInfoVo) {
			// 用户提示信息：操作成功。
			
		},
		complete : function(xmlHttpRequest, textStatus) {//当请求完成之后调用这个函数，无论成功或失败
			
		},
		error : function(xmlHttpRequest, textStatus, errorThrown) {
			// 通常 textStatus 和 errorThrown 之中只有一个会包含信息
			var errorCode = xmlHttpRequest.status;
			
			if (errorCode == "404") {
				console.error('操作失败！重试后仍不成功，请联系系统管理员。错误码：'+ errorCode);
				
			} else if (errorCode == "500") {
				var responseJSON = xmlHttpRequest.responseJSON;
				if (responseJSON == null) {
					console.error('操作失败！重试后仍不成功，请联系系统管理员。错误码：'+ errorCode);
				} else {
					var resultInfoVo = responseJSON.resultInfoVo;
					console.error('操作失败！重试后仍不成功，请联系系统管理员。错误码：'+ errorCode);
				}
			} else if (errorCode == "504") {
				console.error('操作失败！重试后仍不成功，请联系系统管理员。错误码：'+ errorCode);

			} else {
				console.error('操作失败！重试后仍不成功，请联系系统管理员。错误码：'+ errorCode);
			}
			
		}
	});
	
	//设置baresize事件延迟时间，提升效率
	//jQuery.resize.delay = 200;
	
	
});