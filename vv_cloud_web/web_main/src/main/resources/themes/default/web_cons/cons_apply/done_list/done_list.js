define([ 'jquery', 'corectr','WdatePicker'], function($, corectr,WdatePicker) {
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
		data.param.menuId=opts.initdata_param.menu_id;
        initConsType($thispage);
        initStatusValue($thispage);
	    tableInit($thispage,data);
		
	};

	/* 模块页面事件绑定 */
	var _eventbind = function($thispage, renderdata, opts) {
		
		$("#done_list_search",$thispage).on("click",function(){
			var param=$("#done_list_searchform").getformdata();
			var data={};
			data.param=param;
			data.pageVo={
				pageNumber:1
			};
			data.param.menuId=opts.initdata_param.menu_id;
			tableInit($thispage,data)
		});
		
		$("#done_list_reset",$thispage).on("click",function(){
			if (!!$('form[id="done_list_searchform"]')[0]){
				$('form[id="done_list_searchform"]')[0].reset();
			}
		});
	};
	
	var _uninstall=function(){
		
	}
    //初始化表格
    function tableInit($thispage,data) {
    	var table = corectr.v.table({
    		// 承载表格的容器
    		el: $("#done_list",$thispage),
    		// 定义表格列
    		columns: [
    			{
    				title: "状态", width: 100, scale: 0, align: "center",
    				render: "rowData.primStatusName"
    			},
    			{
    				title: "序号",
    				width: 150,
    				align: "center",
    				scale: 0,
    				render: "rowData.serial_num"
    			},
    			{
    				title: "会诊方式", width: 140,
    				align: "center",
    				scale: 0,
    				render: "rowData.consType_name"
    			},
    			{
    				title: "患者姓名", width: 100, scale: 0,
    				align: "center",
    				render: "rowData.pati_name"
    			},
    			/*{
    				title: "会诊来源", width: 160, scale: 0,
    				align: "center",
    				render: "rowData.platform_name"
    			},*/
    			{
    				title: "申请医院", width: 220, scale: 0,
    				align: "center",
    				render: "rowData.org_name"
    			},
    			{
    				title: "申请时间", width: 160, scale: 0,
    				align: "center",
    				render: "rowData.applyTime"
    			},
    			{
    				title: "会诊时间及地点", width: 180, scale: 0,
    				align: "center",
    				render: "rowData.cons_time_room"
    			},
    			{
    				title: "会诊信息", width: 300, scale: 0,
    				align: "center",
    				render: "rowData.cm_data"
    			},
    			
    			{
    				title: "操作", width: 60, scale: 0,
    				align: "center",
					render: function(data,table){
                       var $btn1 = $("<button class='xBtn xBtn-default' type='button'>查看</button>");
                       $btn1.on('click',function () {
                    	   alert("查看按钮"+"prim_id:"+data.rowData.prim_id+","+"prim_status:"+data.rowData.prim_status);
                       });
                       $btn1.appendTo(data.$td);
                   }
    			}
    		],
    		// 有分页
    		pagination: data.pageVo,
    	    //,
    		// 表格发送请求并渲染返回的数据，与$.ajax()用法相同
    		ajax: {url: "http://localhost:8080/server_cons/consApplyQuery/doneList", data:{param:data.param}}
    	});
    }

    function initConsType($thispage){
    	$.ajax({
    		type:"get",
    		url : "http://localhost:8080/server_cons/consApplyQuery/queryConsType",
    		xhrFields : {
    			withCredentials : false
    		// 跨域访问需要覆盖为false
    		},
    		contentType:"application/json",	
    		success : function(result) {
    			console.log(result);
     			renderConsTypeSelect($thispage,result.datas)
     		}
    	});
    }
    function initStatusValue($thispage){
    	$.ajax({
    		type:"get",
    		url : "http://localhost:8080/server_cons/consApplyQuery/queryPrimStatus",
    		xhrFields : {
    			withCredentials : false
    		},
    		contentType:"application/json",	
    		success : function(result) {
    			renderStatusSelect($thispage,result.datas)
     		}
    	});
    }
    function renderStatusSelect($thispage,data){
    	var str='<select class="xInput" name="prim_status"><option title="--请选择--" value>--全部--</option>';
    	for(var i=0; i<data.length; i++){
    		str += '<option title="" value='+data[i].statusValue+'>'+data[i].statusName+'</option>'
    	}
    	str +='</select>'
    	$("#statusSelect",$thispage).append(str);
    }
    function renderConsTypeSelect($thispage,data){
    	$("#consTypeSelect",$thispage).empty();
    	var str='<select class="xInput" name="consultationType"><option title="--请选择--" value>--全部--</option>';
    	for(var i=0; i<data.length; i++){
    		str += '<option title="" value='+data[i].consTypeId+'>'+data[i].consTypeName+'</option>'
    	}
    	str +='</select>'
    	$("#consTypeSelect",$thispage).append(str);
    }
	return {
		initoptions:_initoptions,
		initdataconvert : _initdataconvert,
		viewinit : _viewinit,
		eventbind : _eventbind,
		uninstall:_uninstall
	};
});