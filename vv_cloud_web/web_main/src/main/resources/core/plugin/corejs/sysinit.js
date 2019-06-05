define(['jquery','router',"corectr","util"],function($,router,corectr,util) {
	function initSysParam(){
		var token="";
		if(util.getUrlSearch()&&util.getUrlSearch().token){
			token=util.getUrlSearch().token;
			localStorage.setItem("token",token);
		}else if(localStorage.getItem("token")){
			token=localStorage.getItem("token");
		}else{
			if(location.hash!=""&&location.hash!="#"){
				location.href="./login/login/login.html"+location.hash;
				return
			}
			location.href="./login/login/login.html";
		}
		/**
		 * 配置jquery相关参数
		 */
		$.ajaxSetup({
			global : false,
			cache : false,
			async : true,
			type : "POST",
			xhrFields:{
				//withCredentials: true
				//Access-Control-Allow-Origin:"*"
			},
			contentType:"application/json",
			beforeSend : function(xhr,options) {
				corectr.v.showLoading("loading......");
				xhr.setRequestHeader('token',token);
				//xhr.setRequestHeader('ssoUri',sys_config.server_zuulpath+"/auth2.0");
				//xhr.setRequestHeader('token','88888888');
				//options.url+="?token=88888"
			},
			success : function(resultInfoVo) {
				// 用户提示信息：操作成功。
				
			},
			complete : function(xmlHttpRequest, textStatus) {//当请求完成之后调用这个函数，无论成功或失败
				corectr.v.hideLoading();
			},
			error : function(xmlHttpRequest, textStatus, errorThrown) {
				console.log(xmlHttpRequest)
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
				} else if (errorCode == "401") {
						console.error('操作失败！重试后仍不成功，请联系系统管理员。错误码：'+ errorCode);
						localStorage.removeItem("token","");
						if(location.hash!=""&&location.hash!="#"){
							location.href="./login/login/login.html"+location.hash;
							return
						}
						location.href="./login/login/login.html";
					

				} else {
					console.error('操作失败！重试后仍不成功，请联系系统管理员。错误码：'+ errorCode);
				}
				
			}
		});
		
		//设置baresize事件延迟时间，提升效率
		//jQuery.resize.delay = 200;
	}
	
	
	return {
		initSysParam:initSysParam
	}
	
	
	
});