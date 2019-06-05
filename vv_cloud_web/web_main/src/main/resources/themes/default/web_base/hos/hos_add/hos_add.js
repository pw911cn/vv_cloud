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
			
		  $("#hos_add_save",$thispage).on("click",function(){
			  var data={};
			  datatem=$thispage.getformdata();
			  datatem.hosp_level_id=datatem["ORG.LEVEL"]+datatem["ORG.LEVEL1"];
			  data.param=datatem;
			  $.ajax({
					type :"post",					 
					url : sys_config.base_serverpath+"/base_org_hosp/save",
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
			 		}
			  });
		  });
		  $("#hos_add_cancle",$thispage).on("click",function(){
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