define([ 'jquery', 'corectr','plugin/corejs/navigation/0.1/navigation_my','plugin/corejs/navigation/0.1/navigation'], function($, corectr,navigation_my,navigation) {

	
	
	/* ======================= 业务模块强制的开发规范 ======================= */
	var _initoptions=function(opts){
		
	}
	/* 修正初始化数据 */
	var _initdataconvert = function(renderdata) {
		
		return renderdata;
	};
	
	/* 模块页面初始化操作 */
	var _viewinit = function($thispage, renderdata, opts) {
		console.log(opts.initdata_param.param.menu)
		$.ajax({
			type:"get",
			url:"web_main/json/menu_mod_list.json",
			dataType:"text",
			data:{a:1},
			success:function(data){
				data=JSON.parse(data);
				var sideMenuOptions = {
					el: $(".tms4SubIndex_menu",$thispage),
					data: data,
					isAccordion:false, //手风琴效果，可以省略，默认为true，如果设为false，则可以同时展开多个菜单
					keyMap: {
						menuId: "menu_id",
						isOpen: "isopen",
						menuText: "menu_name",
						parentId: "parentId",
						href: "url",
						children: "children",
						iconClass: "icon"
					}
				}
				navigation_my.creatMenu(sideMenuOptions);

				//var sideMenuInstance = navigation.sideMenu(sideMenuOptions);


			}
		});
		if (opts.initdata_param.param.menu == 'inform')
			corectr.loadmodule({
				module : "web_main/home/mod/home_workspace_inform",
				$todom : $(".tms4SubIndex_mainData_lyt", $thispage)
			});
		else if (opts.initdata_param.param.menu == 'warning')
			corectr.loadmodule({
				module : "web_main/home/mod/home_workspace_warning",
				$todom : $(".tms4SubIndex_mainData_lyt", $thispage)
			});
		else if (opts.initdata_param.param.menu == 'business')
			corectr.loadmodule({
				module : "web_main/home/mod/home_workspace_business",
				$todom : $(".tms4SubIndex_mainData_lyt", $thispage)
			});
		else if (opts.initdata_param.param.menu == 'todo')
			corectr.loadmodule({
				module : "web_main/home/home_workspace_todo_todolist",
				$todom : $(".tms4SubIndex_mainData_lyt", $thispage)
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