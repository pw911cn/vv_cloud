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
		var data={param:{}};
		data.param.type_key="DEPT_LEVEL";
		var optstr='';
		$.ajax({
			url:sys_config.base_serverpath+"/dictData/pullDown",
			data:JSON.stringify(data),
			async:false,
			success:function(data){
				var result=data.datas;
				
				$.each(result,function(key,value){
					optstr+='<option title="'+value.data_name+'" value="'+value.data_value+'" '+'>'+value.data_name+'</option>';
					
				});
				$("select[name='dept_level']",$thispage).html(optstr);
			}
		});
		$thispage.find("input[name='hosp_name']").fuzzySearch({
			url: sys_config.base_serverpath+"/base_org_hosp/list",
			key:"org_name",
			data: function(){
				return {param:{
                    menuId:renderdata
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
				$input.val(item.org_name);
				$input.parent().siblings("input").val(item.org_id);
				$thispage.find("input[name='up_dept_name']").val("");
				$thispage.find("input[name='up_dept_name']").parent().siblings("input").val("");
				if(item==""){
					$thispage.find("input[name='up_dept_name']").prop("disabled",true);
					return
				}
				$thispage.find("input[name='up_dept_name']").prop("disabled",false);
			},
			/*
			 返回结果是json数组的时候,该方法必须存在,否则会报错.依赖该方法渲染搜索结果列表
			 返回结果是字符串数组的时候,该参数是可选参数. 如果该方法存在,就调该方法.
			 */
			render: function (item, $li) {
				var leftHtml = "<div style='float:left; width:auto;'>" + item.org_name + "</div>";
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
		$thispage.find("input[name='up_dept_name']").fuzzySearch({
			url: sys_config.base_serverpath+"/base_dept/list",
			key:"dept_name",
			data: function(){
				return {param:{
					org_id:$thispage.find("input[name='hosp_name']").parent().siblings("input").val()
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
				$input.val(item.dept_name);
				$input.parent().siblings("input").val(item.dept_id);
				if(item==""){
					$thispage.find("select[name='dept_level'] option").prop("selected",false);
					return;
				}
				var level=item.dept_level-0+1;
				level=level>=2?2:1;
				console.log(level)
				$thispage.find("select[name='dept_level'] option").prop("selected",false);
				$thispage.find("select[name='dept_level'] option[value="+level+"]").prop("selected",true);
			},
			/*
			 返回结果是json数组的时候,该方法必须存在,否则会报错.依赖该方法渲染搜索结果列表
			 返回结果是字符串数组的时候,该参数是可选参数. 如果该方法存在,就调该方法.
			 */
			render: function (item, $li) {
				var leftHtml = "<div style='float:left; width:auto;'>" + item.dept_name + "</div>";
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
	};

	/* 模块页面事件绑定 */
	var _eventbind = function($thispage, renderdata, opts) {
		  
		  $("#dep_add_save",$thispage).on("click",function(){
			  var data={};
			  data.param=$thispage.getformdata();
			  $.ajax({
					type :"post",					 
					url : sys_config.base_serverpath+"/base_dept/save",
					data:JSON.stringify(data),
			 		success : function(result) {
			 			console.log(result)
			 			corectr.v.message.success({content:result.message});
			 			opts.vpopup.data("closeType","submit");
			 			opts.vpopup.remove();     
			 		}
			  });
		  });
		  $("#dep_add_cancle",$thispage).on("click",function(){
				opts.vpopup.remove();      
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