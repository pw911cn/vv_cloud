define([ 'jquery', 'corectr','ZeroClipboard','ueditorZhCn'], function($, corectr,ZeroClipboard) {

	
	 
	/* ======================= 业务模块强制的开发规范 ======================= */
	
	/*
	 * 修正加载模块时的参数【可选】
	 *@param {Object} [opts],load模块时传入的参数
	*/
	var _initoptions=function(opts){
		opts.$todom=$(".cons_patientInfo_view_wrap");
		
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
		 
		window.ZeroClipboard  = ZeroClipboard ;
		new UE.ui.Editor({
			initialFrameHeight : 200,
			toolbars : [ [] ],
			elementPathEnabled : false,
			wordCount:false
		}).render("medical_editor");

		new UE.ui.Editor({
			initialFrameHeight : 200,
			toolbars : [ [] ],
			elementPathEnabled : false,
			wordCount:false
		}).render("examination_editor");
		
		var medical_editor = UE.getEditor('medical_editor');
		medical_editor.ready(function() {
			medical_editor.execCommand('insertHtml', renderdata.datas.consPatiInfo.clin_history)
			// 不可编辑
			medical_editor.setDisabled();
		});
		
		var examination_editor = UE.getEditor('examination_editor');
		examination_editor.ready(function() {
			examination_editor.execCommand('insertHtml',renderdata.datas.consPatiInfo.clin_exam )
			// 不可编辑
			examination_editor.setDisabled();
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
		viewinit : _viewinit,
		eventbind : _eventbind,
		uninstall:_uninstall
	};
});