define([ 'jquery', 'corectr' ], function($, corectr) {

	
	
	/* ======================= 业务模块强制的开发规范 ======================= */
	/* 修正初始化数据 */
	var _initdataconvert = function(renderdata) {
		
		return renderdata;
	};
	
	/* 模块页面初始化操作 */
	var _viewinit = function($thispage, renderdata) {
		
	};

	/* 模块页面事件绑定 */
	var _eventbind = function($thispage, renderdata, opts) {
		  $("#save").on("click",function(){
			  $.ajax({
					type : "PUT",					 
					url : "/main/version/add.ajax",
					data:$("#add_div").getformdata(),
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