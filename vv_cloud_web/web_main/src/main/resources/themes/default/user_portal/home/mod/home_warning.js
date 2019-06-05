define([ 'jquery', 'corectr' ], function($, corectr) {

	
	
	/* ======================= 业务模块强制的开发规范 ======================= */
	var _initoptions=function(opts){
		opts.$todom=$("#home_warning_lyt");
		
	}
	/* 修正初始化数据 */
	var _initdataconvert = function(renderdata) {
		
		return renderdata;
	};
	
	/* 模块页面初始化操作 */
	var _viewinit = function($thispage, renderdata) {
//		var url = "http://172.16.180.153:9094/icenter/home/alerted/list/zhangpengfei";
//		$.ajax({
//			url: url,
//			type : "GET",
//			dataType : 'json',
//			async : false,
//			data : "",
//			cache : false,
//			xhrFields : {
//				withCredentials : false
//			// 此处必须是false否则报跨域错误
//			},
//			beforeSend : function() {
//				// 为了不影响主业务，需要覆盖ajax的全局参数设置，这里什么都不能做
//			},
//			complete : function(xmlHttpRequest, textStatus) {
//				// 为了不影响主业务，需要覆盖ajax的全局参数设置，这里什么都不能做
//			},
//			error : function(xmlHttpRequest, textStatus, errorThrown) {
//				console.info("请求发送失败:");
//			},
//			success : function(result) {
//				$('#waringDatas').empty();   //清空resText里面的所有内容
//				var dataObj = eval("["+result+"]");//转换为json对象 
//				var html = "<ul class='tms4Home_inform_list'>";
//				$.each(dataObj, function(index, val){
//					html += "<li class='home_inform_item'>";
//					
//					switch (val.alertedType){
//						case '远程会诊':
//							html += "<div class='tms4Home_type_tag tms'>" + val.alertedType + "</div>";
//							break;
//						case '双向转诊':
//							html += "<div class='tms4Home_type_tag ref'>" + val.alertedType + "</div>";
//							break;
//						case '院间互动':
//							html += "<div class='tms4Home_type_tag among'>" + val.alertedType + "</div>";
//							break;
//						case '远程门诊':
//							html += "<div class='tms4Home_type_tag otp'>" + val.alertedType + "</div>";
//							break;
//					
//					}
//					
//					html += "<div class='baseinfo'>" + val.alertedContent + "</div>";
//					html += "<div class='timeinfo'>" + val.time + "</div>";
//					html += "</li>";
//					
//				});
//				 
//				html += "</ul>";
//				$('#waringDatas').html(html);
//			}
//	    });
		
		$("#more_waring").on('click',function () {
			corectr.v.popup({
                width: 1,
                height: 1,
                title: "首页工作区",
                type:"GET",
                content:function($wrap, instance){ 
                	corectr.loadmodule({ 
                		module : "user_portal/home/mod/home_framelr",
                		$todom : $wrap,
                		vpopup:instance,
                		initdata_param:{
	            			param:{
	            				menu: 'warning'
	            			}
	            		}
                	});
                	
                },
                closeCallback:function($wrap, instance){
                	
                }
            });
	    });
	};

	/* 模块页面事件绑定 */
	var _eventbind = function($thispage, renderdata, opts) {
		
	};
	
	var _uninstall=function(){
		console.log("离开首页");
	}
	return {
		initoptions:_initoptions,
		initdataconvert : _initdataconvert,
		viewinit : _viewinit,
		eventbind : _eventbind,
		uninstall:_uninstall
	};
});