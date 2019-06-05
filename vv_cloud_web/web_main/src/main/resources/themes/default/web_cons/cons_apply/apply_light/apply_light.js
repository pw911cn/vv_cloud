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
		 
		 
		clickscrolls({
	        clickobj:$(".consul_sidenav",$thispage),
	        scrollobj:$('.consul_apply_lyt_center_cont',$thispage),
	        targetobj:$('.consul_apply_lyt_center_cont .apply_light_unit')
	    });
		
		$("#apply_light_form",$thispage).validate({
			onfocusout:function(element,event){
				if(!$(element.form ).validate().elements().length){
					return
				}
				$(element).valid();
				var pindex=$(element).parents(".consul_apply_lyt_center_cont .apply_light_unit").index();
				var totalEle=$(element.form ).validate().elements().filter(function(){
					return $(this).parents(".consul_apply_lyt_center_cont .apply_light_unit").length>0&&$(this).parents(".consul_apply_lyt_center_cont .apply_light_unit").index()==pindex;
				}),
				total=totalEle.length,
				count=totalEle.filter(function(){
					return $(this).hasClass("valid");
				}).length,
				percent=(count/total*100+"").substring(0,5);
				if(percent=="100"){
					$(".consul_apply_timeaxis_cont .item").removeClass("active");
					$(".consul_apply_timeaxis_cont .item").eq(pindex).removeClass("active").addClass("finish");
				}else{
					$(".consul_apply_timeaxis_cont .item").removeClass("active");
					$(".consul_apply_timeaxis_cont .item").eq(pindex).addClass("active");
				}
				$(".consul_apply_timeaxis_cont .item").eq(pindex).find(".toptext").html("已完成"+percent+"%");
				
			}
		});
 
		
		 
	    //加载会诊申请信息模块
 		corectr.loadmodule({
			module : "web_cons/pub_page/cons_applyInfo/applyInfo_edit",
			//module : "web_cons/pub_page/cons_applyInfo/applyInfo_view",
			$todom : $("#basicConsInfo", $thispage),
			initdata_param:{
    			param:{
    				consApplyInfo:{id:"49c0ba328e8c4207a7f532c9c15d1bf5",consPrimaryId:"49c0ba328e8c4207a7f532c9c15d1bf5"},
    				menu_id:opts.initdata_param.menu_id
    			}
    		},
    		
			//initdata_url:"http://172.16.180.92:8012/plugin_zuul/server_cons"+"/generalConsApply/getConsOrderInfoById",
			
		});
		
		//加载患者信息模块
 		corectr.loadmodule({
			module : "web_cons/pub_page/cons_patientInfo/patientInfo_edit",
			//module : "web_cons/pub_page/cons_patientInfo/patientInfo_view",
			$todom : $("#patientInfo", $thispage),
			initdata_param:{
    			param:{
    				consApplyInfo:{id:"49c0ba328e8c4207a7f532c9c15d1bf5"}
    			}
    		},
    		
			//initdata_url:"http://172.16.180.92:8080/server_cons"+"/generalConsApply/getConsOrderInfoById",
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
		//取消会诊
		$("#btn-cancelConsultation",$thispage).on("click", function(){
			
		});
		
		//暂存会诊
		$("#btn-saveConsultation",$thispage).on("click", function(){
			var data={}; 
			data.param=$thispage.getformdata();  
			/*if(!$("#apply_light_form",$thispage).valid()){
				alert("验证未通过")
			}*/
			data.param.consPrimary.biz_id='1';
			data.param.consPrimary.cons_type='1';

			
			var start_date = data.param.consDoctorInfo.cons_start;
			var cons_start_time = data.param.cons_start_time;
			var cons_end_time = data.param.cons_end_time;
			var start_time = start_date+" "+cons_start_time+":00";
			var end_time = start_date+" "+cons_end_time+":00";
			//data.param.consDoctorInfo.cons_start=start_time;
			//data.param.consDoctorInfo.cons_end=end_time;
			console.log(start_date)
			console.log(cons_start_time)
			console.log(start_time)
			data.param.consDoctorInfo.cons_start = start_time;
			data.param.consDoctorInfo.cons_end = end_time;
			
			data.param.consDoctorList=[{cons_start:start_time,cons_end:end_time,apply_hosp_name:"北京医院",apply_dept_name:"耳鼻喉",apply_doc_name:"天天",apply_hospid:"79579d6153204e9bb7bf9de0a46f4344",apply_deptid:"639be779311c4afd8b44b3ded3aa5560",apply_docid:"3f1425c52b2e42b6b68745dbd9d821d9"}];
			data.param.consPrimary.cm_data=data.param.consApplyInfo.apply_hosp_name+"/"+data.param.consApplyInfo.apply_dept_name+"/"+data.param.consApplyInfo.apply_doc_name;
			data.param.consPatiInfo.clin_history = UE.getEditor('medical_editor').getContent();
			data.param.consPatiInfo.clin_exam = UE.getEditor('examination_editor').getContent();	
			//console.log(JSON.stringify(data))
			$.ajax({
				url:"http://172.16.180.92:8030/cloud_zuul/server_cons"+"/generalConsApply/lightConsApplyTempSave",
				
				data:JSON.stringify(data),
				success:function(result){
					corectr.v.message.success({content:result.message});
					 
				}
			});
			
		});
		
		//提交会诊
		$("#btn-submitConsultation",$thispage).on("click", function(){
			console.log($("#apply_light_form",$thispage).getformdata());
			data.param.medical_editor = UE.getEditor('medical_editor').getContent();
			data.param.examination_editor = UE.getEditor('examination_editor').getContent();
			
			
			if(!$("#apply_light_form",$thispage).valid()){
				alert("验证未通过")
			}
		});
		
		//返回
		$("#btn-return",$thispage).on("click", function(){
			
		});

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