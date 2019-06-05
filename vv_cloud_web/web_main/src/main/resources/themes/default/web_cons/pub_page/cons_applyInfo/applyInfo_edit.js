define([ 'jquery', 'corectr'], function($, corectr) {

	
	var serviceSelhtml;
	var managerList = new Array();
	var serviceInfoList = new Array();
	/* ======================= 业务模块强制的开发规范 ======================= */
	
	/*
	 * 修正加载模块时的参数【可选】
	 *@param {Object} [opts],load模块时传入的参数
	*/
	var _initoptions=function(opts){
		opts.$todom=$("#basicConsInfo");
		
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
		initDiseaseLable($thispage);
		initObjectiveLable($thispage);
		var data={};
		data.param={
				menu_id:opts.initdata_param.param.menu_id
			}
		 
		 
		initManager($thispage,data);
		initService($thispage,data);
	};

	/* 模块页面事件绑定
	 * @param {jQuery Object} [$thispage] 模板渲染后的jq对象
	 * @param {Object} [renderdata]用于渲染模板的数据
	 * @param {Object} [opts]load模块时的配置对象
	 *  
	 *  
	 *  */
	var _eventbind = function($thispage, renderdata, opts) {
		$("#addDocCard",$thispage).on('click',function() {
			var data={docName:'田馥甄',docLevel:'主任医师',hosName:'医大一院',hosLevel:'一级甲等',deptName:'神经内科',subDeptName:'神经内科子科室',subject:'神经科',cons_date:'2019-05-01 08:30~09:30'}
			addDocCard(data,$thispage);		
		})
		
		$('.docCardWrap').on('click','.deleteBtn',function() {
			$(".originBottom").remove();
			$(this).parent().parent(".docCard").remove();
		})
		
		$("#applyhos",$thispage).on('click',function() {
 
			corectr.v.popup({
                width: 1000,
                height: 800,
                title: "选择申请医院",
                type:"GET",
                content:function($wrap, instance){ 
                	corectr.loadmodule({ 
                		module : "web_cons/pub_page/cons_applyInfo/chooseApplyHos",
                		$todom : $wrap,
                		vpopup:instance,
                		initdata_param:{
                			menu_id:opts.initdata_param.param.menu_id
                		}
                		
                		 
                	});
                },
                closeCallback:function($wrap, instance){
                    var choose_hosId=instance.data("choose_hosId");
                    var choose_hos_name=instance.data("choose_hos_name");
                    $("#applyhos",$thispage).val(choose_hos_name);                    
                    $("input[name='consApplyInfo.apply_hospid']",$thispage).val(choose_hosId);
                	console.log(choose_hosId)
                }
            })
		})
		
		
		$("#applydep",$thispage).on('click',function() {

			console.log($("input[name='consApplyInfo.apply_hospid']").val())
			corectr.v.popup({
                width: 1000,
                height: 800,
                title: "选择申请科室",
                type:"GET",
                content:function($wrap, instance){ 
                	corectr.loadmodule({ 
                		module : "web_cons/pub_page/cons_applyInfo/chooseApplyDep",
                		$todom : $wrap,
                		vpopup:instance,
                		initdata_param:{
                			menu_id:opts.initdata_param.param.menu_id,
                			org_id:$("input[name='consApplyInfo.apply_hospid']",$thispage).val()
                		}
                		
                		 
                	});
                },
                closeCallback:function($wrap, instance){
                	var choose_depId=instance.data("choose_depId");
                    var choose_dep_name=instance.data("choose_dep_name");
                    $("#applydep",$thispage).val(choose_dep_name);                    
                    $("input[name='consApplyInfo.apply_deptid']",$thispage).val(choose_depId);
                	
                }
            })
		})
		
		$("#applydoc",$thispage).on('click',function() {
			corectr.v.popup({
                width: 1000,
                height: 800,
                title: "选择申请医生",
                type:"GET",
                content:function($wrap, instance){ 
                	corectr.loadmodule({ 
                		module : "web_cons/pub_page/cons_applyInfo/chooseApplyDoc",
                		$todom : $wrap,
                		vpopup:instance,
                		initdata_param:{   
                			menu_id:opts.initdata_param.param.menu_id,
                			dept_id:$("input[name='consApplyInfo.apply_deptid']",$thispage).val()
                		}
                		
                		 
                	});
                },
                closeCallback:function($wrap, instance){
                	console.log(instance.data("choose_docId"))
                    var choose_docId=instance.data("choose_docId");
                    var choose_doc_name=instance.data("choose_doc_name");
                    $("#applydoc",$thispage).val(choose_doc_name);                    
                    $("input[name='consApplyInfo.apply_docid']",$thispage).val(choose_docId);
                     
                	
                }
            })
		})
		
		$("#addService",$thispage).on('click',function() { 		
			var $clone=$(this).parents(".v-panel").find(".flowlyt-wrap").eq(0).clone(true);
			$('<button type="button" class="xBtn xBtn-danger  deleteRow" style="margin:3px" >删除</button>').appendTo($clone).on("click",function(){
				$(this).parent().remove();
			})
			if($clone.find(".service_Tel").val() != ''){
				$clone.find(".service_Tel").val('')
			}			 
			$("#serviceList",$thispage).append($clone); 
		
		})
		$("#manager",$thispage).on("change",function(){
			var i = $(this).get(0).selectedIndex-1;
 			 if(i != -1){
 				$("#manager_Tel").val(managerList[i].tel)
 			 }		
			
		})
		/**
		 * 动态添加元素的change事件
		 */
		$("#serviceList").on("change", ".service_sel", function() {
			var i = $(this).get(0).selectedIndex-1;
			 if(i != -1){				 
				 $(this).parents(".flowlyt-wrap").find(".service_Tel").val(serviceInfoList[i].tel)
				 
			 }		
          }); 
	};
	function initDiseaseLable($thispage){
		/*$.ajax({
		url:server_zuulpath+"/alliance/queryOneAlliance",
		data:JSON.stringify(alliance_data),
		success:function(data){
			$("#disease_lable",$thispage).html(lablehtml);
			 
		}
	});*/	
		var disList = [{id:'1',name:'心脏病'},{id:'2',name:'心脑血管疾病'},{id:'3',name:'脑卒中'},{id:'4',name:'肺泡蛋白质沉积症'},{id:'5',name:'腰椎间盘突出'}];
		
		for(var i=0;i<disList.length;i++){
			var $div0 = $('<div class="select_item disease" id='+disList[i].id+'>'+disList[i].name+'</div>'); 			 
			 $div0.appendTo($(".disease_lable"),$thispage);
		}		

		var $divmore = $('<div class="select_item moreLabel more_disease" id="moreLabelBtn">更多疾病标签 <i class="comicon-transverse"></i></div>');
		var $btn=$('<div class="select_item addNewLabel" id="addDiseaseLable"><i class="comicon-add"></i> 添加疾病标签</div> ')
		$divmore.appendTo($(".disease_lable"),$thispage); 
		$btn.appendTo($(".disease_lable"),$thispage); 
		 
		$(".disease_lable").on("click", ".disease", function() {
			
			var chooseHtml = getChooseDisIds();	
			if(chooseHtml.indexOf($(this).attr("id"))<0){ 
				$(".select_text").remove()			
				var div_selected = '<div class="select_tag" id="'+$(this).attr("id")+'">'+$(this).html()+'</span><span class="select_tag_closeBtn" data-v-tooltip="移除"><i class="comicon-no"></i></span></div>'
 				 $(".disease_selected").append(div_selected);
			}
			
		})
		
		$(".disease_selected").on("click", ".select_tag_closeBtn", function() {
			$(".originBottom").remove();
			$(this).parent(".select_tag").remove();
			if($(".disease_selected").find(".select_tag").length == 0){
				$(".disease_selected").append('<div class="select_text">请选择疾病分类标签</div>')
			}
		}) 
		
		$(".disease_lable").on("click", ".more_disease", function() {
 
			corectr.v.popup({
                width: 800,
                height: 400,
                title: "选择疾病标签",
                type:"GET",
                content:function($wrap, instance){ 
                	corectr.loadmodule({ 
                		module : "web_cons/pub_page/cons_applyInfo/moreDisease",
                		$todom : $wrap,
                		vpopup:instance,
                		initdata_param:{
                			datas:[{id:'a',name:'肝病'},{id:'b',name:'心血管疾病'},{id:'c',name:'胃病'},{id:'4',name:'肾病'},{id:'5',name:'糖尿病'},{id:'9',name:'原发性皮肤滤泡中心细胞性淋巴瘤'}
                			,{id:'6',name:'口腔疾病'},{id:'7',name:'肺泡蛋白质沉积症'},{id:'8',name:'眼病'},{id:'6',name:'口腔疾病'},{id:'7',name:'肺泡蛋白质沉积症'},{id:'8',name:'眼病'},
                			{id:'6',name:'口腔疾病'},{id:'7',name:'肺泡蛋白质沉积症'},{id:'8',name:'眼病'}
                			,{id:'6',name:'口腔疾病'},{id:'7',name:'肺泡蛋白质沉积症'},{id:'8',name:'眼病'}
                			,{id:'6',name:'口腔疾病'},{id:'7',name:'肺泡蛋白质沉积症'},{id:'8',name:'眼病'}
                			,{id:'6',name:'口腔疾病'},{id:'7',name:'肺泡蛋白质沉积症'},{id:'8',name:'眼病'}
                			,{id:'6',name:'口腔疾病'},{id:'7',name:'肺泡蛋白质沉积症'},{id:'8',name:'眼病'}]
                		}                		
                		 
                	});
                 
                },
                closeCallback:function($wrap, instance){
               
                }
            })
 		})
			
 		$(".disease_lable").on("click", "#addDiseaseLable", function() {
 			
			corectr.v.popup({
                width: 800,
                height: 400,
                title: "添加疾病标签",
                type:"GET",
                content:function($wrap, instance){ 
                	corectr.loadmodule({ 
                		module : "web_cons/pub_page/cons_applyInfo/addDiseaseLable",
                		$todom : $wrap,
                		vpopup:instance 
//                		initdata_param:{
//                			datas:[{id:'a',name:'精神病'},{id:'b',name:'癌症'},{id:'c',name:'妄想症'}]
//                		}
                		
                		 
                	});
                },
                closeCallback:function($wrap, instance){
               
                }
            })
 		})
		 
	}
	function initObjectiveLable($thispage){
		
		var disList = [{id:'1',name:'辅助诊疗'},{id:'2',name:'指导诊疗'},{id:'3',name:'协助鉴定'},{id:'4',name:'治疗建议'}];
		
		for(var i=0;i<disList.length;i++){
			var $div0 = $('<div class="select_item objective" id='+disList[i].id+'>'+disList[i].name+'</div>'); 			 
			 $div0.appendTo($(".objective_lable"),$thispage); 
		} 
		var $divmore = $('<div class="select_item moreLabel more_objective" id="moreLabelBtn">更多会诊目的 <i class="comicon-transverse"></i></div>');
	 
		$divmore.appendTo($(".objective_lable"),$thispage); 
		 
		
 	 
		 
		/*$.ajax({
			url:server_zuulpath+"/alliance/queryOneAlliance",
			data:JSON.stringify(alliance_data),
			success:function(data){
				$("#disease_lable",$thispage).html(lablehtml);
				 
			}
		});*/		
 		 
 	 
		 
		
		$(".objective_lable").on("click", ".objective", function() {
			var v_val = '';
			var s_val = $('#cons_objective').val();
			var btn_val = $(this).html();
			if(s_val.indexOf(btn_val)<0){
				if(''!=s_val){
					v_val = s_val +','+ btn_val;
				}else{
					v_val = btn_val;
				} 
				$('#cons_objective').val(v_val);
			} 
			
		}) 
		
	
		$(".objective_lable").on("click", ".more_objective", function() {
			corectr.v.popup({
                width: 800,
                height: 400,
                title: "选择会诊目的",
                type:"GET",
                content:function($wrap, instance){ 
                	corectr.loadmodule({ 
                		module : "web_cons/pub_page/cons_applyInfo/moreObjective",
                		$todom : $wrap,
                		vpopup:instance,
                		initdata_param:{
                			datas:[{id:'a',name:'目的a'},{id:'b',name:'目的b'},{id:'c',name:'目的c'},{id:'a',name:'目的a'},{id:'b',name:'目的b'},{id:'c',name:'目的c'}
                			,{id:'a',name:'目的a'},
                			{id:'b',name:'目的b'},{id:'c',name:'目的c'},{id:'a',name:'目的a'},{id:'b',name:'目的b'},{id:'c',name:'目的c'}
                			,{id:'a',name:'目的a'},{id:'b',name:'目的b'},{id:'c',name:'目的c'},{id:'a',name:'目的a'},{id:'b',name:'目的b'},{id:'c',name:'目的c'}
                			,{id:'a',name:'目的a'},{id:'b',name:'目的b'},{id:'c',name:'目的c'},{id:'a',name:'目的a'},{id:'b',name:'目的b'},{id:'c',name:'目的c'}
                			,{id:'a',name:'目的a'},{id:'b',name:'目的b'},{id:'c',name:'目的c'},{id:'a',name:'目的a'},{id:'b',name:'目的b'},{id:'c',name:'目的c'}
                			,{id:'a',name:'目的a'},{id:'b',name:'目的b'},{id:'c',name:'目的c'},{id:'a',name:'目的a'},{id:'b',name:'目的b'},{id:'c',name:'目的c'}]
                		}
                		
                		 
                	});
                },
                closeCallback:function($wrap, instance){
               
                }
            })
 		})
	}
	function getChooseDisIds(){
		 var chooseHtml = "";
		 $(".disease_selected").children(".select_tag").each(function(index,item){
				var val = $(this).attr("id");   
				chooseHtml = chooseHtml+","+val;
	    });
		 return chooseHtml;
	 }
	function initManager($thispage,data){
		
			$.ajax({
				type :"post",					 
				url : sys_config.cons_serverpath+"/generalConsApply/getManagerList",
				data:JSON.stringify(data),
				xhrFields : {
					withCredentials : false
				// 跨域访问需要覆盖为false
				},
				contentType:"application/json",
		 		success : function(result) {
		 			managerList = result.datas;
					var option="";		
					for(var i=0;i<managerList.length;i++){
						option = option+ '<option title="管理员" value="'+managerList[i].USER_FID+'">'+managerList[i].USER_NAME+'</option>';
					}

					$("#manager").append(option)
		 			
		 		}
		  });
			
			
		}
		
		function initService(){
			getService();
			$(".service_name").append(serviceSelhtml)
			//$serviceSelect.appendTo($serviceSelect)
		}
		
		function getService(){
			/*	$.ajax({
			type :"post",					 
			url : server_zuulpath+"/power/editPowerRole",
			data:JSON.stringify(data),
			xhrFields : {
				withCredentials : false
			// 跨域访问需要覆盖为false
			},
			contentType:"application/json",
	 		success : function(result) {
	 			var $option = $('<option title="女性" value="2">test</option>');
	 			$option.appendTo($("#manager")); 
	 			
	 		}
	  });
		*/serviceInfoList[0]={"name":"张三","tel":"123","serv_staff_id":1};
		  serviceInfoList[1]={"name":"韬韬","tel":"34355","serv_staff_id":2};
		  var option="";
		  var selectStr = '<select class="xInput service_sel"  name="serv_staff_id" ><option title="--请选择--" value="0">--请选择--</option>';
			for(var i=0;i<serviceInfoList.length;i++){
				option = option+ '<option title="" value="'+serviceInfoList[i].serv_staff_id+'">'+serviceInfoList[i].name+'</option>';
			}		
			serviceSelhtml = selectStr+option+'</select>';
	 
		}
		function addDocCard(data,$thispage){
			var card=$('<div class="docCard"></div>');
			var card_top=$('<div class="docCard_top"><div class="operBtn editBtn"><i class="comicon-write"></i>编辑</div><div class="operBtn deleteBtn c_remove" data-v-tooltip="移除"><i class="comicon-no"></i></div></div>')
			var card_centrt=$('<div class="docCard_center"></div>');
			var doc_contItem=$('<div class="contItem"></div>');
			var doc_span=$('<span class="doctor">'+data.docName+'</span><span class="doctor_tag">'+data.docLevel+'</span>');
			
			doc_span.appendTo(doc_contItem);
			doc_contItem.appendTo(card_centrt);
			
			var hos_contItem=$('<div class="contItem"></div>');
			var hos_span=$('<span class="hospital">'+data.hosName+'</span><span class="hospital_tag">'+data.hosLevel+'</span>');
			hos_span.appendTo(hos_contItem);
			hos_contItem.appendTo(card_centrt);
			
			var dept_contItem=$('<div class="contItem"></div>');
			var dept_span=$('<span class="normal">'+data.deptName+'</span><span class="oblique">/</span><span class="nortext">'+data.subDeptName+'</span>');
			dept_span.appendTo(dept_contItem);
			dept_contItem.appendTo(card_centrt);
			
			var subj_contItem=$('<div class="contItem"></div>');
			var hos_subject=$('<span class="nortext">专科：'+data.subject+'</span>');
			hos_subject.appendTo(subj_contItem);
			subj_contItem.appendTo(card_centrt);
			
			var date_contItem=$('<div class="contItem"></div>');
			var cons_date=$('<span class="nortext">会诊时间：</span><span class="boldtext">'+data.cons_date+'</span>');
			cons_date.appendTo(date_contItem);
			date_contItem.appendTo(card_centrt);
			
			card_top.appendTo(card);
			card_centrt.appendTo(card); 
			
			$(".docCardWrap").append(card);

		}
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