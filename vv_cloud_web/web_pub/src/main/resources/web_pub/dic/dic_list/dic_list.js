define([ 'jquery', 'corectr'], function($, corectr) {

	
	var table,dataTable
	/* ======================= 业务模块强制的开发规范 ======================= */
	var _initoptions=function(opts){
		opts.$todom=$(".tms4SubIndex_mainData_lyt");
		
	}
	/* 修正初始化数据 */
	var _initdataconvert = function(renderdata) {
		
		return renderdata;
	};
	
	/* 模块页面初始化操作 */
	var _viewinit = function($thispage, renderdata) {
		$thispage.initSelect();
		table=null;
		dataTable=null;
		var data={}
		data.param={
			
		}
		data.pageVo={
		  pageNumber:1
		}
		tableInit($thispage,data);
	};

	/* 模块页面事件绑定 */
	var _eventbind = function($thispage, renderdata, opts) {
		$("#dic_list_addBtn",$thispage).on('click',function() {
			corectr.v.popup({
                width: 600,
                height: 300,
                title: "添加数据字典",
                type:"GET",
                content:function($wrap, instance){ 
                	corectr.loadmodule({ 
                		module : "web_pub/dic/dic_add/dic_type_add",
                		$todom : $wrap,
                		vpopup:instance
                		 
                	});
                },
                closeCallback:function($wrap, instance){
                	if(instance.data("closeType")&&instance.data("closeType")=="submit"){
                		corectr.v.message.success({content:"新增成功"});
                		table.refresh();
                	}
                	
                }
            })
        
		});
		$("#dic_list_searchbtn",$thispage).on("click",function(){
			var param=$("#dic_list_searchform").getformdata();
			var data={};
			data.param=param;
			data.pageVo={
				pageNumber:1
			};
			tableInit($thispage,data)
			if(dataTable){
				dataTable.dataSouece({});
			}
		});
	};
	
	var _uninstall=function(){
		
	}
	
	//修改
	function dic_edit(data){
    	corectr.v.popup({
            width: 1000,
            height: 800,
            title: "修改数据字典",
            type:"GET",
            content:function($wrap, instance){ 
            	corectr.loadmodule({ 
            		module : "web_pub/dic/dic_edit/dic_type_edit",
            		$todom : $wrap,
            		vpopup:instance,
            		
            	});
            },
            closeCallback:function($wrap, instance){
            	if(instance.data("closeType")&&instance.data("closeType")=="submit"){
            		corectr.v.message.success({content:"修改成功"});
            		table.refresh();
            	}
            }
        })
	}

	//删除
	function dic_delete(data){
		var confirmIns = corectr.v.vConfirm({
			// 可选参数，自定义标题
			title: "操作",
			content: "确定删除吗",
			// 可选参数，点击确认按钮调用
			confirmHandler: function () {
				var data={param:{}};
				  data.param.org_id=org_id;
				  $.ajax({
						type :"post",					 
						url : server_zuulpath+"/base_org_hosp/del",
						data:JSON.stringify(data),
						xhrFields : {
							withCredentials : false
						// 跨域访问需要覆盖为false
						},
						contentType:"application/json",
				 		success : function(result) {
				 			corectr.v.message.success({content:result.message});
				 		},
				 		error:function(){
				 			corectr.v.message.error({content:"失败"});
				 		}
				  });
			},
			// 可选参数，点击取消按钮调用
			cancelHandler: function () {
				console.log("vConfirm cancelHandler()");
			}
		});
	}
	
    //初始化表格
    function tableInit($thispage,data) {
    	if(!table){
            // 变量table是表格实例
            table =corectr.v.table({
                // 承载表格的容器
                el: $("#dic_type_list",$thispage),
                // 定义表格列
                columns: [
                    {
                        title: "数据字典值",
                        width: 300,
                        align: "center",
                        // 该列分配表格剩余宽度的比例，默认值1
                        // 缩放比例是0将固定宽度
                        scale: 3,
                        render: "rowData.type_key"
                    },
                    {
                        title: "数据字典名称", width: 180,
                        align: "center",
                        render: "rowData.type_name"
                        
                    },
                    {
                        title: "操作", width: 200,
                        align: "center",
                        render: function(data,table){
                        	 //创建多个按钮
                            var $btnwrap = $("<div class='xBtn-multi'></div>");

                            var $btn1 = $("<button class='xBtn xBtn-default' type='button'>修改</button>");
                            $btn1.on('click',function () {
                            	dic_edit(data.rowData);
                            });
                            $btn1.appendTo($btnwrap);


                            var $btn2;
                            $btn2 = $("<button class='xBtn xBtn-danger' type='button'>删除</button>");
                            $btn2.on("click",function(){
                            	dic_delete(data.rowData.org_id);
                            });
                            $btn2.appendTo($btnwrap);

                            
                            $btnwrap.appendTo(data.$td);
                        }

                    }
                ],
                // 有分页
                pagination:data.pageVo,
                // 表格发送请求并渲染返回的数据，与$.ajax()用法相同
                ajax: {
                	url: server_zuulpath+"/dictType/list",
                	data:{param:data.param},
                	success:function(data){
                		
	                	var pageVo=data.datas;
	                	data=pageVo;
                	}
            	},
            	trClick:function(data,tableInstance){
            		
/*            	    data.rowData: 当前行数据
            	    data.$tr: 当前行tr(jquery对象)
            	    data.trIndex: 当前行索引(从0开始)
            	    data.pageX: 鼠标相对于表格的X坐标
            	    data.pageY: 鼠标相对于表格的Y坐标
            	    data.altKey: 点击时是否按下alt键
            	    data.ctrlKey: 点击时是否按下ctrl键
            	    data.shiftKey: 点击时是否按下shift键
            	    data.$centerTr: 有左右锁定列时，中间列tr(jquery对象)
            	    data.$leftTr: 有左右锁定列时，左侧列tr(jquery对象)
            	    data.$rightTr: 有左右锁定列时，右侧列tr(jquery对象)*/
            		
            	}

            });
    	}else{
    		table.ajax({data:data});
    	}
    }
    
    //初始化表格
    function dataTableInit($thispage,data) {
    	if(!dataTable){
            // 变量table是表格实例
    		dataTable =corectr.v.table({
                // 承载表格的容器
                el: $("#dic_data_list",$thispage),
                // 定义表格列
                columns: [
                    {
                        title: "选项值",
                        width: 300,
                        align: "center",
                        // 该列分配表格剩余宽度的比例，默认值1
                        // 缩放比例是0将固定宽度
                        scale: 3,
                        render: "rowData.type_key"
                    },
                    {
                        title: "选项显示名称", width: 180,
                        align: "center",
                        render: "rowData.type_name"
                        
                    },
                    {
                        title: "顺序", width: 180,
                        align: "center",
                        render: "rowData.type_name"
                        
                    },
                    {
                        title: "是否有效", width: 180,
                        align: "center",
                        render: "rowData.type_name"
                        
                    },
                    {
                        title: "操作", width: 200,
                        align: "center",
                        render: function(data,table){
                        	 //创建多个按钮
                            var $btnwrap = $("<div class='xBtn-multi'></div>");

                            var $btn1 = $("<button class='xBtn xBtn-default' type='button'>修改</button>");
                            $btn1.on('click',function () {
                            	dic_edit(data.rowData.org_id);
                            });
                            $btn1.appendTo($btnwrap);


                            var $btn2;
                            $btn2 = $("<button class='xBtn xBtn-danger' type='button'>删除</button>");
                            $btn2.on("click",function(){
                            	dic_delete(data.rowData.org_id);
                            });
                            $btn2.appendTo($btnwrap);

                            
                            $btnwrap.appendTo(data.$td);
                        }

                    }
                ],
                // 有分页
                pagination:data.pageVo,
                // 表格发送请求并渲染返回的数据，与$.ajax()用法相同
                ajax: {
                	url: server_zuulpath+"/dictType/list",
                	data:{param:data.param},
                	success:function(data){
                		
	                	var pageVo=data.datas;
	                	data=pageVo;
                	}
            	},
            	trClick:function(data,tableInstance){
/*            	    data.rowData: 当前行数据
            	    data.$tr: 当前行tr(jquery对象)
            	    data.trIndex: 当前行索引(从0开始)
            	    data.pageX: 鼠标相对于表格的X坐标
            	    data.pageY: 鼠标相对于表格的Y坐标
            	    data.altKey: 点击时是否按下alt键
            	    data.ctrlKey: 点击时是否按下ctrl键
            	    data.shiftKey: 点击时是否按下shift键
            	    data.$centerTr: 有左右锁定列时，中间列tr(jquery对象)
            	    data.$leftTr: 有左右锁定列时，左侧列tr(jquery对象)
            	    data.$rightTr: 有左右锁定列时，右侧列tr(jquery对象)*/
            	}

            });
    	}else{
    		dataTable.ajax({data:data});
    	}
    }
    
	return {
		initoptions:_initoptions,
		initdataconvert : _initdataconvert,
		viewinit : _viewinit,
		eventbind : _eventbind,
		uninstall:_uninstall
	};
});