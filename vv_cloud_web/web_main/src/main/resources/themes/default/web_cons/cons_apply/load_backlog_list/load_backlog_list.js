define([ 'jquery', 'corectr'], function($, corectr) {

	
	var table;
	/* ======================= 业务模块强制的开发规范 ======================= */
	var _initoptions=function(opts){
		opts.$todom=$(".tms4SubIndex_mainData_lyt");
		
	}
	/* 修正初始化数据 */
	var _initdataconvert = function(renderdata) {
		
		return renderdata;
	};
	
	/* 模块页面初始化操作 */
	var _viewinit = function($thispage, renderdata,opts) {
		table=null;
		var data={}
		data.param={

		}
		data.pageVo={
		  pageNumber:1
		}
		data.param.menu_id = opts.initdata_param.menu_id
		tableInit($thispage,data);
	};

	/* 模块页面事件绑定 */
	var _eventbind = function($thispage, renderdata, opts) {
		var selectClass="tab-curr";
		$(".tab-ul li",$thispage).on("click",function(){
			if($(this).index()==0){
				$(this).siblings().removeClass(selectClass);
				$(this).addClass(selectClass);
				corectr.loadmodule({
					module : "web_cons/cons_apply/backlog_list/backlog_list",
					$todom : $(".tab-content", $thispage),
					initdata_param:{
    					menu_id: opts.initdata_param.menu_id
    				}
				});
			}else{
				$(this).siblings().removeClass(selectClass);
				$(this).addClass(selectClass);
				corectr.loadmodule({
					module : "web_cons/cons_apply/backlog_list/backlog_conference_list",
					$todom : $(".tab-content", $thispage),
					initdata_param:{
    					menu_id:opts.initdata_param.menu_id
    				}
				});
			}

		});
		
	};
	
	var _uninstall=function(){
		
	}
    //初始化表格
    function tableInit($thispage,data) {
		corectr.loadmodule({
			module : "web_cons/cons_apply/backlog_list/backlog_list",
			$todom : $(".tab-content", $thispage),
			initdata_param:{
				menu_id:data.param.menu_id
			}
		});
    }
	return {
		initoptions:_initoptions,
		initdataconvert : _initdataconvert,
		viewinit : _viewinit,
		eventbind : _eventbind,
		uninstall:_uninstall
	};
});