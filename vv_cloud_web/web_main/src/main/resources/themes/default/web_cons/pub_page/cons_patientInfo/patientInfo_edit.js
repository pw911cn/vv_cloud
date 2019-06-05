define([ 'jquery', 'corectr','ZeroClipboard','ueditorZhCn'], function($, corectr,ZeroClipboard) {

	
	
	/* ======================= 业务模块强制的开发规范 ======================= */
	
	/*
	 * 修正加载模块时的参数【可选】
	 *@param {Object} [opts],load模块时传入的参数
	*/
	var _initoptions=function(opts){
		opts.$todom=$("#patientInfo");
		
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
		
	    //加载患者基本信息模块
		corectr.loadmodule({
			module : "web_cons/pub_page/cons_patientInfo/baseInfo/baseInfo_edit",
			$todom : $("#patientBasicInfo", $thispage),
					});
		window.ZeroClipboard  = ZeroClipboard ;
		new UE.ui.Editor({
			initialFrameHeight:200,
			toolbars:[[]],
			elementPathEnabled:false 
		}).render("medical_editor");
		
		new UE.ui.Editor({
			initialFrameHeight:200,
			toolbars:[[]],
			elementPathEnabled:false 
		}).render("examination_editor");

	};

	/* 模块页面事件绑定
	 * @param {jQuery Object} [$thispage] 模板渲染后的jq对象
	 * @param {Object} [renderdata]用于渲染模板的数据
	 * @param {Object} [opts]load模块时的配置对象
	 *  
	 *  
	 *  */
	var _eventbind = function($thispage, renderdata, opts) {
		$(".medical_history").on('click',function(){
			UE.getEditor('medical_editor').execCommand('insertHtml', '</BR><hr><p><B>'+$(this).val()+'</B></p><hr>')
		})
		
		$(".examination").on('click',function(){
			UE.getEditor('examination_editor').execCommand('insertHtml', '</BR><hr><p><B>'+$(this).val()+'</B></p><hr>')
		})
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