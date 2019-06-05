define([ 'jquery', 'corectr' ,'util'], function($, corectr, util) {

	
	
	/* ======================= 业务模块强制的开发规范 ======================= */
	var _initoptions=function(opts){
		opts.$todom=$(".tms4SubIndex_mainData_lyt");
		
	}
	/* 修正初始化数据 */
	var _initdataconvert = function(renderdata) {
		//debugger;
		for(var i=0; i<renderdata.data.length; i++){
        	var obj = util.datediffer(parseInt(renderdata.data[i].updateDate));
        	if(obj.day != ''){
        		renderdata.data[i].interval=obj.day+'天前';
        	}else if(obj.hour != ''){
        		renderdata.data[i].interval=obj.hour+'小时前';
        	}else if(obj.min != ''){
        		renderdata.data[i].interval=obj.min+'分钟前';
        	}else{
        		renderdata.data[i].interval='刚刚';
        	}
        	renderdata.data[i].updateDate = util.dateFormat('yyyy-MM-dd hh:mm:ss',parseInt(renderdata.data[i].updateDate));
        }
		renderdata={datas:{datas:renderdata.data}};
		return renderdata;
	};
	
	/* 模块页面初始化操作 */
	var _viewinit = function($thispage, renderdata) {
		$(".tms4SubIndex_menu").find("a").removeClass("active");
		$(".tms4SubIndex_menu").find("a[href='#user_portal/home/mod/home_workspace_business']").addClass("active");
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