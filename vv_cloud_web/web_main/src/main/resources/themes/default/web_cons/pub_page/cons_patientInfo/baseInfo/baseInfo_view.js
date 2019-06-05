define([ 'jquery', 'corectr'], function($, corectr) {

	
	
	/* ======================= 业务模块强制的开发规范 ======================= */
	
	/*
	 * 修正加载模块时的参数【可选】
	 *@param {Object} [opts],load模块时传入的参数
	*/
	var _initoptions=function(opts){
		//opts.$todom=$("#patientBasicInfo");
		
	}
	/* 
	 * 修正初始化数据【可选】 
	 * @param {Object} [renderdata]渲染模板的数据
	 * 
	 * */
	var _initdataconvert = function(renderdata) {
		
		return renderdata;
	};
	

	
	
	/* 模块页面初始化操作
	 * @param {jQuery Object} [$thispage] 模板渲染后的jq对象
	 * @param {Object} [renderdata]用于渲染模板的数据
	 * @param {Object} [opts]load模块时的配置对象
	 *  
	 *  */
	var _viewinit = function($thispage, renderdata,opts) {

	};

	/* 模块页面事件绑定
	 * @param {jQuery Object} [$thispage] 模板渲染后的jq对象
	 * @param {Object} [renderdata]用于渲染模板的数据
	 * @param {Object} [opts]load模块时的配置对象
	 *  
	 *  
	 *  */
	var _eventbind = function($thispage, renderdata, opts) {

	};
	
	/* 卸载dom */
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