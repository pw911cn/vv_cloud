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
		$thispage.initSelect();
		$("#fuzzy_menu_id",$thispage).fuzzySearch({
			url: server_zuulpath+"/menu/dimQuery",
			key:"menu_name",
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
				$input.val(item.menu_name);
				$input.parent().siblings("input").val(item.menu_id);
			},
			/*
			 返回结果是json数组的时候,该方法必须存在,否则会报错.依赖该方法渲染搜索结果列表
			 返回结果是字符串数组的时候,该参数是可选参数. 如果该方法存在,就调该方法.
			 */
			render: function (item, $li) {
				var leftHtml = "<div style='float:left; width:auto;'>" + item.menu_name+"("+item.menu_id+")" + "</div>";
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
		  $thispage.initSelect();
		  $("#menu_add_save",$thispage).on("click",function(){
			  if(!$("#menu_add_form").valid()){
				  return
			  }
			  
			  var data={};
			  data.param=$thispage.getformdata();
			  
			  $.ajax({
					type :"post",					 
					url : server_zuulpath+"/menu/add",
					data:JSON.stringify(data),
			 		success : function(result) {
			 			console.log(result)
			 			corectr.v.message.success({content:result.message});
			 			opts.vpopup.data("closeType","submit");
			 			opts.vpopup.remove();
			 		}
			  });
		  });
		  $("#menu_add_cancle",$thispage).on("click",function(){
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