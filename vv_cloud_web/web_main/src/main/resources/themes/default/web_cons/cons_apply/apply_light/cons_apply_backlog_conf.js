define([ 'jquery', 'corectr','clickscrolls','WdatePicker'], function($, corectr,clickscrolls,WdatePicker) {

	
	
	/* ======================= 业务模块强制的开发规范 ======================= */
	
	/*
	 * 修正加载模块时的参数【可选】
	 *@param {Object} [opts],load模块时传入的参数
	*/
	var _initoptions=function(opts){
		opts.$todom=$(".tms4SubIndex_mainData_lyt");
	}
	/* 
	 * 修正初始化数据【可选】 
	 * @param {Object} [renderdata]渲染模板的数据
	 * 
	 * */
	var _initdataconvert = function(renderdata) {
		
		return renderdata;
	};
	
	/* 
	 * 插入目标dom前【可选】 
	 * @param {jQuery Object} [$thispage] 模板渲染后的jq对象
	 * @param {Object} [renderdata]用于渲染模板的数据
	 * @param {Object} [opts]load模块时的配置对象
	 * 
	 * */
	var _beforeappend = function($thispage,renderdata,opts) {
		
		return renderdata;
	};
	
	
	/* 模块页面初始化操作
	 * @param {jQuery Object} [$thispage] 模板渲染后的jq对象
	 * @param {Object} [renderdata]用于渲染模板的数据
	 * @param {Object} [opts]load模块时的配置对象
	 *  
	 *  */
	var _viewinit = function($thispage, renderdata,opts) {
		corectr.loadmodule({
			module : "web_cons/pub_page/cons_applyInfo/cons_applyIntfo_view",
			//module : "web_cons/pub_page/cons_applyInfo/applyInfo_view",
			$todom : $(".cons_applyIntfo_view_wrap", $thispage),
			initdata_param:{
    			param:{
    				consPrimary:{id:"d19e3f401ffc4c79bcf71db045926394"},
    				menu_id:opts.initdata_param.menu_id
    			}
    		},
    		
			initdata_url:"http://172.16.180.92:8030/cloud_zuul/server_cons"+"/generalConsApply/getConsOrderInfoByPrimId",
			
		});
		corectr.loadmodule({
			module : "web_cons/pub_page/cons_applyInfo/cons_patientInfo_base_view",
			//module : "web_cons/pub_page/cons_applyInfo/applyInfo_view",
			$todom : $(".cons_patientInfo_base_view_wrap", $thispage),
			initdata_param:{
    			param:{
    				consPrimary:{id:"d19e3f401ffc4c79bcf71db045926394"},
    				menu_id:opts.initdata_param.menu_id
    			}
    		},
    		
    		initdata_url:"http://172.16.180.92:8030/cloud_zuul/server_cons"+"/generalConsApply/getConsOrderInfoByPrimId",
			
		});
		corectr.loadmodule({
			module : "web_cons/pub_page/cons_applyInfo/cons_patientInfo_view",
			//module : "web_cons/pub_page/cons_applyInfo/applyInfo_view",
			$todom : $(".cons_patientInfo_view_wrap", $thispage),
			initdata_param:{
    			param:{
    				consPrimary:{id:"d19e3f401ffc4c79bcf71db045926394"},
    				menu_id:opts.initdata_param.menu_id
    			}
    		},
    		
    		initdata_url:"http://172.16.180.92:8030/cloud_zuul/server_cons"+"/generalConsApply/getConsOrderInfoByPrimId",
			
		});

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
		beforeappend:_beforeappend,
		viewinit : _viewinit,
		eventbind : _eventbind,
		uninstall:_uninstall
	};
});