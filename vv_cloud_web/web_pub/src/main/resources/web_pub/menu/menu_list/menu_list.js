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
	var _viewinit = function($thispage, renderdata) {
		table=null;
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
		$("#menu_list_addBtn",$thispage).on('click',function() {
			corectr.v.popup({
                width: 500,
                height: 500,
                title: "添加菜单",
                type:"GET",
                content:function($wrap, instance){ 
                	corectr.loadmodule({ 
                		module : "web_pub/menu/menu_add/menu_add",
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
		$("#menu_list_searchbtn",$thispage).on("click",function(){
			var param=$("#menu_list_searchform").getformdata();
			var data={};
			data.param=param;
			data.pageVo={
					pageNumber:1
			};
			tableInit($thispage,data)
			
		});
	};
	
	var _uninstall=function(){
		
	}
	
	//修改
	function menu_edit(flag,menu_id){
		if(flag=="2"){
			corectr.v.miniPopup.error("冻结状态禁止修改");
			return;
		}

    	corectr.v.popup({
			width: 500,
	        height: 500,
            title: "修改菜单信息",
            type:"GET",
            content:function($wrap, instance){ 
            	corectr.loadmodule({ 
            		module : "web_pub/menu/menu_edit/menu_edit",
            		$todom : $wrap,
            		vpopup:instance,
            		initdata_param:{
            			param:{
            				menu_id:menu_id
            			}
            		},
            		initdata_url:server_zuulpath+"/menu/getById",
            		
            		 
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
	//冻结解冻
	function menu_toggle_freeze(flag,menu_id){
		var confirmIns =corectr.v.vConfirm({
			// 可选参数，自定义标题
			title: "操作",
			content: flag==1?"确定解冻吗？":"确定冻结吗？",
			// 可选参数，点击确认按钮调用
			confirmHandler: function () {
				  var data={param:{}};
				  data.param.menu_id=menu_id;
				  if(flag==1){
					  toogleUrl=server_zuulpath+"/menu/freeze";
				  }else if(flag==2){
					  toogleUrl=server_zuulpath+"/menu/unfreeze";
				  }
				  
				  $.ajax({				 
						url : toogleUrl,
						data:JSON.stringify(data),
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
                        title: "菜单名称",
                        width: 180,
                        align: "center",
                        // 该列分配表格剩余宽度的比例，默认值1
                        // 缩放比例是0将固定宽度
                        render: "rowData.menu_name"
                    },
                    {
                        title: "菜单url", width: 180,
                        align: "center",
                        scale: 4,
                        render: "rowData.menu_url"
                        
                    },
                    {
                        title: "上级菜单ID", width: 100,
                        align: "center",
                        render: function(data,table){
                        	var $td = data.$td;
                        	if(data.rowData.p_id){
                        		$td.html(data.rowData.p_id);
                        	}else{
                        		$td.html("");
                        	}
                        }
                       
                    },
                    {
                        title: "是否有效", width: 50,
                        align: "center",
                        render: function(data,table){
                        	  var $stateHtml;
                              if(data.rowData.flag == '1'){
                                  //正常
                                  $stateHtml = $("<span class='platmana_permlist_state_normal'>有效</span>");
                              }else if(data.rowData.flag == '0'){
                                  //冻结
                                  $stateHtml = $("<span class='platmana_permlist_state_invalid'>无效</span>");
                              }else if(data.rowData.flag == "2"){
                            	  $stateHtml = $("<span class='platmana_permlist_state_frozen'>冻结</span>");
                              }else{
                            	  $stateHtml = $("");
                              }
                              $stateHtml.appendTo(data.$td);
                        }

                    },
                    {
                        title: "操作", width: 100,
                        align: "center",
                        render: function(data,table){
                        	 //创建多个按钮
                            var $btnwrap = $("<div class='xBtn-multi'></div>");

                            var $btn1 = $("<button class='xBtn xBtn-default' type='button'>修改</button>");
                            $btn1.on('click',function () {
                            	menu_edit(data.rowData.flag,data.rowData.menu_id);
                            });
                            $btn1.appendTo($btnwrap);

                            var $btn2;
                            if(data.rowData.flag == '1'){
                                //冻结
                                $btn2 = $("<button class='xBtn xBtn-warning' type='button'>冻结</button>");
                            }else if(data.rowData.flag == '2'){
                                //解冻
                                $btn2 = $("<button class='xBtn xBtn-success' type='button'>解冻</button>");
                            }
                            if($btn2){
                                $btn2.on("click",function(){
                                	menu_toggle_freeze(data.rowData.flag,data.rowData.menu_id);
                                });
                                $btn2.appendTo($btnwrap);
                            }

                            

                            

                           
                            $btnwrap.appendTo(data.$td);
                        }

                    }
                ],
                // 有分页
                pagination:data.pageVo,
                // 表格发送请求并渲染返回的数据，与$.ajax()用法相同
                ajax: {
                	url: server_zuulpath+"/menu/list",
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