define([ 'jquery', 'corectr','plugin/corejs/navigation/0.1/navigation_my','plugin/corejs/navigation/0.1/navigation'], function($, corectr,navigation_my,navigation) {
	/* ======================= 业务模块强制的开发规范 ======================= */
	var _initoptions=function(opts){

	}
	/* 修正初始化数据 */
	var _initdataconvert = function(renderdata) {
		
		return renderdata;
	};
	
	/* 模块页面初始化操作 */
	var _viewinit = function($thispage, renderdata) {
		var data={param:{
			menu_level:"00"
		}}
		$.ajax({
			async:false,
			url:sys_config.base_serverpath+"/rolemenu/queryMenuByUser",
			data:JSON.stringify(data),
			success:function(data){
				data=data.datas;
				var sysOptions = {
						el: $(".tms4Index_header",$thispage),
						data: data,
						isAccordion:false, //手风琴效果，可以省略，默认为true，如果设为false，则可以同时展开多个菜单
				}
				navigation_my.creatSysMenu(sysOptions);
			}
		});
	};

	/* 模块页面事件绑定 */
	var _eventbind = function($thispage, renderdata, opts) {

	};
	
	var _uninstall=function(){
		console.log("拜拜");
	}
	return {
		initoptions:_initoptions,
		initdataconvert : _initdataconvert,
		viewinit : _viewinit,
		eventbind : _eventbind,
		uninstall:_uninstall
	};
});