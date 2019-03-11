define([ 'jquery', 'corectr' ], function($, corectr) {

	
	
	/* ======================= 业务模块强制的开发规范 ======================= */
	/*初始化loadmoudle参数*/
	/*var _initoptions=function(param){
		return {
			$todom:xxxxx,//插入位置
			clear:false,//是否清空插入点
			initdata_url:"xxxxx.ajax",//获取渲染数据ajax地址
			initdata_param:{
				a:xxxx,
				b:xxxx
			}//获取渲染数据ajax参数
		}
	}*/
	
	/* 修正初始化数据 */
	var _initdataconvert = function(renderdata) {
	
		return renderdata;
	};
	
	/* 模块页面初始化操作 */
	var _viewinit = function($thispage, renderdata, opts) {
	 	
 
	};

	/* 模块页面事件绑定 */
	var _eventbind = function($thispage, renderdata, opts) {
 		$("#save").on("click",function(){			
			$.ajax({
				type : "PUT",					 
				url : "/main/version/edit.ajax",			 
				data:$("#edit_div").getformdata(),
		 		success : function(result) {	
		 			opts.vpopup.remove();      
		 			corectr.v.popup.success({content: result.message, seconds: 1});		 			 
		 		}
			});
		})
		
		$("#cancle").on("click",function(){
			opts.vpopup.remove();      
		})
		
 	};

	return {
		initdataconvert : _initdataconvert,
		viewinit : _viewinit,
		eventbind : _eventbind
	};
});