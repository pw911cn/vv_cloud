define([ 'jquery', 'corectr'], function($, corectr) {

	
	
	/* ======================= 业务模块强制的开发规范 ======================= */
	var _initoptions=function(opts){
		
		
	}
	/* 修正初始化数据 */
	var _initdataconvert = function(renderdata) {
		
		return renderdata;
	};
	
	/* 模块页面初始化操作 */
	var _viewinit = function($thispage, renderdata) {
		$thispage.initSelect();
	};

	/* 模块页面事件绑定 */
	var _eventbind = function($thispage, renderdata, opts) {
		  
		  $("#doc_add_save",$thispage).on("click",function(){
			  var data={};
			  data.param=$thispage.getformdata();
			  
			  $.ajax({
					type :"post",					 
					url : server_zuulpath+"/base_user_doctor/save",
					data:JSON.stringify(data),
					xhrFields : {
						withCredentials : false
					// 跨域访问需要覆盖为false
					},
					contentType:"application/json",
			 		success : function(result) {
			 			console.log(result)
			 			corectr.v.message.success({content:result.message});
			 			opts.vpopup.data("closeType","submit");
			 			opts.vpopup.remove();     
			 			//corectr.v.popup.success({content: result.message, seconds: 1});
			 			
			 		}
			  });
		  });
		  $("#doc_add_cancle",$thispage).on("click",function(){
				opts.vpopup.remove();      
		  });
	};
	
	var _uninstall=function(){
		
	}
	return {
		initoptions:_initoptions,
		initdataconvert : _initdataconvert,
		viewinit : _viewinit,
		eventbind : _eventbind,
		uninstall:_uninstall
	};
});