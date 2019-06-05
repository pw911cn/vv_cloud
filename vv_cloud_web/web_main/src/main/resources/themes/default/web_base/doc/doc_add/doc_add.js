define([ 'jquery', 'corectr'], function($, corectr) {

	
	
	/* ======================= 业务模块强制的开发规范 ======================= */
	var _initoptions=function(opts){
		
		
	}
	/* 修正初始化数据 */
	var _initdataconvert = function(renderdata) {
		
		return renderdata;
	};
	
	/* 模块页面初始化操作 */
	var _viewinit = function($thispage, renderdata) {
        menuId={
        	menuId:renderdata.menuId
		}
		$thispage.initSelect(menuId);
		$("#doc_add_roletag",$thispage).activeTag({
			type:"tag",
			key:{
				text:"role_name",
				value:"role_id",
				id:"role_id"
			}
		});
		
		$("#doc_add_BaseMedicinetag",$thispage).activeTag({
			type:"tag",
			key:{
				text:"medicine_name",
				value:"medicine_id",
				id:"medicine_id"
			}
		});
		
		/** add by guanhao 初始化设定医生转正模糊搜索分页下拉框  begin */
		$thispage.find("input[name='medicine_name']").fuzzySearch({
			url: server_zuulpath + "/server-base/medicine/queryMedicineList",
			key:"medicine_name",
			data: function(){
				return {param:{
					
				}}
			},
			/*
			返回参数是json数组时,点选某个搜索结果以后会回调该方法,开发人员需要为input赋值
			返回结果是字符串数组时,此参数为可选参数
			-----------------------
			item:被选择的搜索结果,
			$input:input的jquery对象,
			resultArr:搜索列表数据
			 */
			active: function (item, $input, resultArr) {
//				$input.val(item.medicine_name);
//				$input.parent().siblings("input").val(item.medicine_id);
//				$thispage.find("input[name='medicine_name']").val("");
//				$thispage.find("input[name='medicine_name']").parent().siblings("input").val("");
//				if(item==""){
//					$thispage.find("input[name='medicine_name']").prop("disabled",true);
//					return
//				}
//				$thispage.find("input[name='medicine_name']").prop("disabled",false);
				console.info(item);
				//在下方div回显选择的标签
				$("#doc_add_BaseMedicinetag",$thispage).activeTag().add(item);
				
			},
			/*
			 返回结果是json数组的时候,该方法必须存在,否则会报错.依赖该方法渲染搜索结果列表
			 返回结果是字符串数组的时候,该参数是可选参数. 如果该方法存在,就调该方法.
			 */
			render: function (item, $li) {
				var leftHtml = "<div style='float:left; width:auto;'>" + item.medicine_name + "</div>";
				$li.html(leftHtml);
			},
			// 可选参数,是否允许发送空关键字,默认fasel不发送空关键字请求
			emptyKeywords: {
				// 点击input后,是否允许空关键字也发送ajax
				enable: true,
				// 可选参数,空关键字返回的结果列表标题
				title: "搜索"
			},
			// 可选参数,是否严格匹配搜索结果,默认false不严格匹配
			matching: true,
			// 可选参数,是否需要分页,默认false无分页,
			pagination: {
				// 默认pageNumber=1;
				// pageNumber:3,
				// 默认pageSize=10;
				pageSize:5
			}
		});
		/** add by guanhao 初始化设定医生转正模糊搜索分页下拉框  end */
		
	};

	/* 模块页面事件绑定 */
	var _eventbind = function($thispage, renderdata, opts) {
		  
		  $("#doc_add_save",$thispage).on("click",function(){
			  var data={};
			  data.param=$thispage.getformdata();
			  //取得角色权限组内容
			  var listdata=$("#doc_add_roletag",$thispage).activeTag().getData();
			  var powerUserRoleRefVoList=[];
			  $.each(listdata,function(i,n){
				  var roleObject=new Object();
				  roleObject.role_id=n.role_id;
				  powerUserRoleRefVoList.push(roleObject);
			  });
			  
			  /** add by guanhao 新增向专长标签集合保存数据  start */
			  var medicineListdata = $("#doc_add_BaseMedicinetag",$thispage).activeTag().getData();
			  //专长标签集合
			  var baseMedicineVoList = [];
			  $.each(medicineListdata,function(i,n){
				  var medicineObject = new Object();
				  medicineObject.medicine_id = n.medicine_id;
				  baseMedicineVoList.push(medicineObject);
			  });
			  data.param.baseMedicineVoList = baseMedicineVoList;
			  /** add by guanhao 新增向专长标签集合保存数据  end */
			  
			  data.param.powerUserRoleRefVoList=powerUserRoleRefVoList;
			  $.ajax({
					type :"post",					 
					url : sys_config.base_serverpath+"/base_user_doctor/save",
					data:JSON.stringify(data),
					xhrFields : {
						withCredentials : false
					// 跨域访问需要覆盖为false
					},
					contentType:"application/json",
			 		success : function(result) {
			 			console.log(result)
			 			corectr.v.message.success({content:result.message});
			 			opts.vpopup.data("closeType","submit");
			 			opts.vpopup.remove();     
			 			//corectr.v.popup.success({content: result.message, seconds: 1});
			 			
			 		}
			  });
		  });
		  $("#doc_add_cancle",$thispage).on("click",function(){
				opts.vpopup.remove();      
		  });
		  
		  $("#doc_add_chooseperm",$thispage).on("click",function(){
				corectr.v.popup({
	                width: 1000,
	                height: 800,
	                title: "添加医生权限",
	                type:"GET",
	                content:function($wrap, instance){ 
	                	var roledata=$("#doc_add_roletag",$thispage).activeTag().getData();
	                	instance.data("initrole",roledata);
	                	corectr.loadmodule({ 
	                		module : "web_base/doc/doc_adjust/doc_adjust",
	                		$todom : $wrap,
	                		vpopup:instance,
                            renderdata:renderdata.menuId
	                	});
	                },
	                closeCallback:function($wrap, instance){
	                	if(instance.data("closeType")&&instance.data("closeType")=="submit"){
	                		$("#doc_add_roletag",$thispage).activeTag().add(instance.data("rolelist"));
	                	}
	                	
	                }
	            })
		  });
	};
	
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