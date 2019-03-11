define([ 'jquery', 'corectr' ], function($, corectr) {

	
	
	
	
	/* ======================= 业务模块强制的开发规范 ======================= */
	var _initdataconvert = function() {
		
		
	};

	var _viewinit = function($thispage, renderdata) {
		corectr.loadmodule({
			module : "web_main/mainManage/top/notice",
			$todom : $("#noticewrap")
			//clear:false,
			//param:{ }
		});
		
		corectr.loadmodule({
			module : "web_main/mainManage/top/operation",
			$todom : $("#operation_wrap")
			//clear:false,
			//param:{ }
		});
		
		corectr.loadmodule({
			module : "web_main/mainManage/top/about",
			$todom : $("#about_wrap")
			//clear:false,
			//param:{ }
		});

	};

	var _eventbind = function($thispage, renderdata) {

	};

	return {
		initdataconvert : _initdataconvert,
		viewinit : _viewinit,
		eventbind : _eventbind
	};
});