define([ 'jquery', 'corectr','router'], function($, corectr,router) {
	/**
	 * 系统菜单事件
	 */
	var menu_event = function(){
	    /*新版menu 20180727*/
	    // nav收缩展开
        $('.mtm-ind-menu .mtm-ind-menucont .nav-menu li a').on('click',function(){
            var parent = $(this).parent().parent();//获取当前页签的父级的父级
            var labeul =$(this).parent("li").find(">ul");
            if ($(this).parent().hasClass('open') == false) {
                //展开未展开
                parent.find('ul').slideUp(300);
                parent.find("li").removeClass("open");
                parent.find('li a').removeClass("active").find(".menu_group_arr").removeClass("open");
                $(this).parent("li").addClass("open").find(labeul).slideDown(300);
                $(this).addClass("active").find(".menu_group_arr").addClass("open");
            }else{
                $(this).parent("li").removeClass("open").find(labeul).slideUp(300);
                if($(this).parent().find("ul").length>0){
                    $(this).removeClass("active").find(".menu_group_arr").removeClass("open");
                }else{
                    $(this).addClass("active");
                }
            }

        });

	};
	
	
	/* ======================= 业务模块强制的开发规范 ======================= */
	/* 修正初始化数据 */
	var _initdataconvert = function(renderdata) {
		
		return renderdata;
	};
	
	/* 模块页面初始化操作 */
	var _viewinit = function($thispage, renderdataList) {

		/**
		 * 通过菜单表，查询用户的权限菜单<br>
		 * 注册前端路由地址，当浏览器地址栏发生变化时，触发处理
		 */
		/*
		 * 查询用户的权限菜单<br>
		 * 系统菜单点击触发，浏览器地址栏变化
		 */ 
		$(".mtm-ind-menu ul li").on("click",function(){
			router.go("web_main/versionManage/version_list");
			var menuVoStr=$(this).attr("data");	
			if(menuVoStr==undefined||menuVoStr==""||menuVoStr==null) {
				return ;
			}
			var menuVo = JSON.parse(menuVoStr);
			//open_type页面打开方式
			if(menuVo.open_type == '4'){
				//转系统
				$(window).attr('location',menuVo.menu_url);
				//A标签，系统标识，IP 
			} else if(menuVo.open_type == '1'){
				// 加载模块
				if(menuVo.url!=undefined&&menuVo.url!=""&&menuVo.url!=null) {
					router.go(menuVo.url);
				} 
				console.log("跳转模块路径:",menuVo.url);
				
			}else {
				// 加载模块
				if(menuVo.url!=undefined&&menuVo.url!=""&&menuVo.url!=null) {
					router.go(menuVo.url);
				}
				console.log("跳转模块路径:",menuVo.menu_url);
			}
			
		});
		
		
	};

	/* 模块页面时间绑定 */
	var _eventbind = function($thispage, renderdata) {
		menu_event();
		
	};

	return {
		initdataconvert : _initdataconvert,
		viewinit : _viewinit,
		eventbind : _eventbind
	};
});