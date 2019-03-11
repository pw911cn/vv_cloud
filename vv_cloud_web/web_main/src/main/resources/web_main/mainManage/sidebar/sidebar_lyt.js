define([ 'jquery', 'corectr'], function($, corectr) {
	
	/**
	 * 左侧边栏操作
	 */
	var siderbar_event = function(){
	    //左侧侧边栏折叠
	    $('.mtm-ind-body').on('click','.mtm-ind-fold',function() {
	        var $tmsindfold = $(this);
	        var $tmssidebar = $('.mtm-ind-sidebar');
	        var $tmsmain = $('.mtm-ind-section-main');

	        if($tmssidebar.hasClass('sidebar_open')){
	            $tmssidebar.addClass("sidebar_close").removeClass("sidebar_open");
	            $tmsmain.addClass("sidebar_close").removeClass("sidebar_open");
	            $tmsindfold.addClass("sidebar_close").removeClass("sidebar_open");
	        }else{
	            $tmssidebar.addClass("sidebar_open").removeClass("sidebar_close");
	            $tmsmain.addClass("sidebar_open").removeClass("sidebar_close");
	            $tmsindfold.addClass("sidebar_open").removeClass("sidebar_close");
	        }

	    });
		
	};
	
	
	/* ======================= 业务模块强制的开发规范 ======================= */
	var _initdataconvert = function(renderdata) {
		
		return renderdata;
	};

	var _viewinit = function($thispage, renderdata) {
		
		corectr.loadmodule({
			module : "web_main/mainManage/sidebar/userinfo",
			$todom : $("#userinfo")
			//clear:false,
			//param:{ }
		});
		corectr.loadmodule({
			module : "web_main/mainManage/sidebar/sysmenu",
			$todom : $("#sysmenu"),
			//initdata_url : web_mainpath + "/menu/getMenusByPermission"
			//clear:false,
			//param:{ }
		});

	};

	var _eventbind = function($thispage, renderdata) {
		siderbar_event();
	};

	return {
		initdataconvert : _initdataconvert,
		viewinit : _viewinit,
		eventbind : _eventbind
	};
});