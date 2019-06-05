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
		var data={param:{}};
		data.param.user_fid=$("[name='user_fid']").val();
		$.ajax({
			type :"post",					 
			url : sys_config.base_serverpath+"/userrole/queryRoleByUser",
			data:JSON.stringify(data),
	 		success : function(data) {
	 			$("#doc_edit_roletag",$thispage).activeTag({
	 				type:"tag",
	 				key:{
	 					text:"role_name",
	 					value:"role_id",
	 					id:"role_id"
	 				}
	 				data:data.datas
	 			});
	 			$("#doc_edit_chooseperm",$thispage).show();
	 			
	 		}
		});

	};

	/* 模块页面事件绑定 */
	var _eventbind = function($thispage, renderdata, opts) {
		  
		  $("#doc_edit_save",$thispage).on("click",function(){
			  var data={};
			  data.param=$thispage.getformdata();
			  var listdata=$("#doc_edit_roletag",$thispage).activeTag().getData();
			  var powerUserRoleRefVoList=[];
			  $.each(listdata,function(i,n){
				  var roleObject=new Object();
				  roleObject.role_id=n.role_id;
				  powerUserRoleRefVoList.push(roleObject);
			  });
			  data.param.powerUserRoleRefVoList=powerUserRoleRefVoList;
			  $.ajax({
					type :"post",					 
					url : sys_config.base_serverpath+"/base_user_doctor/save",
					data:JSON.stringify(data),
			 		success : function(result) {
			 			console.log(result)
			 			corectr.v.message.success({content:result.message});
			 			opts.vpopup.data("closeType","submit");
			 			opts.vpopup.remove();     
			 			//corectr.v.popup.success({content: result.message, seconds: 1});
			 			
			 		}
			  });
		  });
		  
		  $("#doc_edit_cancle",$thispage).on("click",function(){
				opts.vpopup.remove();      
		  });
		  
		  $("#doc_edit_chooseperm",$thispage).on("click",function(){
				corectr.v.popup({
	                width: 1000,
	                height: 800,
	                title: "添加医生权限",
	                type:"GET",
	                content:function($wrap, instance){
	                	var roledata=$("#doc_edit_roletag",$thispage).activeTag().getData();
	                	instance.data("initrole",roledata);
	                	corectr.loadmodule({ 
	                		module : "web_base/doc/doc_adjust/doc_adjust",
	                		$todom : $wrap,
	                		vpopup:instance
	                	});
	                },
	                closeCallback:function($wrap, instance){
	                	if(instance.data("closeType")&&instance.data("closeType")=="submit"){
	                		$("#doc_edit_roletag",$thispage).activeTag().add(instance.data("rolelist"));
	                	}
	                	
	                }
	            })
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