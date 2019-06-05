define([ 'jquery', 'corectr'], function($, corectr) {

	
	var table;
    var menuId;
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
        menuId=opts.initdata_param.menu_id
        table=null;
        var data={}
        data.param={
            menuId:menuId
        }
        data.pageVo={

        }
        tableInit($thispage,data);
	};

	/* 模块页面事件绑定 */
	var _eventbind = function($thispage, renderdata, opts) {
		$("#medicine_list_addBtn",$thispage).on('click',function() {
			corectr.v.popup({
                width: 1000,
                height: 550,
                title: "添加病种信息",
                type:"GET",
                content:function($wrap, instance){ 
                	corectr.loadmodule({ 
                		module : "web_base/medicine/medicine_add/medicine_add",
                		$todom : $wrap,
                		vpopup:instance
                		 
                	});
                },
                closeCallback:function($wrap, instance){
                	if(instance.data("closeType")&&instance.data("closeType")=="submit"){
                		table.refresh();
                		console.log("成功")
                	}
                	
                }
            })
        
		});
		$("#medicine_list_searchbtn",$thispage).on("click",function(){
			var param=$("#medicine_list_searchform").getformdata();
			var data={};
			data.param=param;
			data.pageVo={
					pageSize:5,
					pageNumber:1
			};
			tableInit($thispage,data)
			
		});
	};
	
	var _uninstall=function(){
		
	}
	
	//修改
	function medicine_edit(medicine_id){
    	corectr.v.popup({
            width: 1000,
            height: 550,
            title: "修改病种信息",
            type:"GET",
            content:function($wrap, instance){ 
            	corectr.loadmodule({ 
            		module : "web_base/medicine/medicine_edit/medicine_edit",
            		$todom : $wrap,
            		vpopup:instance,
            		initdata_param:{
            			param:{
                            medicine_id:medicine_id
            			}
            		},
            		initdata_url:sys_config.base_serverpath+"/medicine/queryMedicine",
            		
            		 
            	});
            },
            closeCallback:function($wrap, instance){
            	if(instance.data("closeType")&&instance.data("closeType")=="submit"){
            		table.refresh();
            		corectr.v.message.success({content:"修改成功"});
            	}
            	
            }
        })
	}

	//删除
	function medicine_delete(medicine_id){
		var confirmIns = corectr.v.vConfirm({
			// 可选参数，自定义标题
			title: "操作",
			content: "确定删除吗",
			// 可选参数，点击确认按钮调用
			confirmHandler: function () {
				var data={param:{}};
				  data.param.medicine_id=medicine_id;
				  $.ajax({
						type :"post",					 
						url : sys_config.base_serverpath+"/medicine/delMedicine",
						data:JSON.stringify(data),
						xhrFields : {
							withCredentials : false
						// 跨域访问需要覆盖为false
						},
						contentType:"application/json",
				 		success : function(result) {
				 			corectr.v.message.success({content:result.message});
                            table.refresh();
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
                el: $(".platmana_comlist_tablewrap",$thispage),
                // 定义表格列
                columns: [
                    {
                        title: "病种名字",
                        width: 300,
                        align: "center",
                        // 该列分配表格剩余宽度的比例，默认值1
                        // 缩放比例是0将固定宽度
                        scale: 3,
                        render: "rowData.medicine_name"
                    },
                    {
                        title: "病种序号",
                        width: 150,
                        align: "center",
                        // 该列分配表格剩余宽度的比例，默认值1
                        // 缩放比例是0将固定宽度
                        render: "rowData.medicine_no" +
						""
                    },
                    {
                        title: "病种级别",
                        width: 150,
                        align: "center",
                        // 该列分配表格剩余宽度的比例，默认值1
                        // 缩放比例是0将固定宽度
                        render: "rowData.type"
                    },
                    {
                        title: "操作", width: 300,
                        align: "center",
                        render: function(data,table){
                        	 //创建多个按钮
                            var $btnwrap = $("<div class='xBtn-multi'></div>");

                            var $btn1 = $("<button class='xBtn xBtn-default' type='button'>修改</button>");
                            $btn1.on('click',function () {
                                medicine_edit(data.rowData.medicine_id);
                            });
                            $btn1.appendTo($btnwrap);

                            var $btn2 = $("<button class='xBtn xBtn-warning' type='button'>删除</button>");
                            $btn2.on('click',function () {
                                medicine_delete(data.rowData.medicine_id);
                            });
                            $btn2.appendTo($btnwrap);


                            
    /*                        var $btn3 = $("<button class='xBtn xBtn-danger' type='button'>删除</button>");
                            $btn3.on('click',function () {
                            	org_delete(data.rowData.org_id);
                            });
                            $btn3.appendTo($btnwrap);*/
                            

                            $btnwrap.appendTo(data.$td);
                        }

                    }
                ],
                // 有分页
                pagination:data.pageVo,
                // 表格发送请求并渲染返回的数据，与$.ajax()用法相同
                ajax: {
                	url: sys_config.base_serverpath+"/medicine/queryMedicineList",
                	data:{param:data.param},
                	success:function(data){
	                	var pageVo=data.datas;
	                	data=pageVo;
                	}
            	}

            });
    	}else{
    		table.ajax({data:data});
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