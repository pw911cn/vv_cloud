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
		console.log($thispage)
         menuId=opts.initdata_param.menu_id
		$thispage.initSelect();
		table=null;
		var data={}
		data.param={
            menuId:menuId
		}
		data.pageVo={
		  pageSize:15,
		  pageNumber:1
		}
		tableInit($thispage,data);
		
	};

	/* 模块页面事件绑定 */
	var _eventbind = function($thispage, renderdata, opts) {
		$("#org_list_addBtn",$thispage).on('click',function() {
			corectr.v.popup({
                width: 1000,
                height: 800,
                title: "添加机构信息",
                type:"GET",
                content:function($wrap, instance){ 
                	corectr.loadmodule({ 
                		module : "web_base/org/org_add/org_add",
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
		$("#org_list_searchbtn",$thispage).on("click",function(){
			var param=$("#org_list_searchform").getformdata();
            param.menuId=menuId;
			var data={};
			data.param=param;
			data.pageVo={
					pageSize:15,
					pageNumber:1
			};
			tableInit($thispage,data)
			
		});
		$("#org_list_resetbtn",$thispage).on("click",function(){
			$thispage.find("input[mode='city']").prop("disabled",true);
			$thispage.find("input[mode='area']").prop("disabled",true);
			
		});
	};
	
	var _uninstall=function(){
		
	}
	
	//修改
	function org_edit(org_id){
    	corectr.v.popup({
            width: 1000,
            height: 800,
            title: "修改机构信息",
            type:"GET",
            content:function($wrap, instance){ 
            	corectr.loadmodule({ 
            		module : "web_base/org/org_edit/org_edit",
            		$todom : $wrap,
            		vpopup:instance,
            		initdata_param:{
            			param:{
            				org_id:org_id
            			}
            		},
            		initdata_url:sys_config.base_serverpath+"/base_org_gov/getBaseOrgGovById",
            		
            		 
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
	function org_toggle_freeze(flag,org_id){
		var confirmIns =corectr.v.vConfirm({
			// 可选参数，自定义标题
			title: "操作",
			content: flag==1?"确定解冻吗？":"确定冻结吗？",
			// 可选参数，点击确认按钮调用
			confirmHandler: function () {
				  var data={param:{}};
				  data.param.flag=flag;
				  data.param.org_id=org_id;
				  $.ajax({				 
						url : sys_config.base_serverpath+"/base_org_gov/del",
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
	//删除
	function org_delete(org_id){
		var confirmIns = corectr.v.vConfirm({
			// 可选参数，自定义标题
			title: "操作",
			content: "确定删除吗",
			// 可选参数，点击确认按钮调用
			confirmHandler: function () {
				var data={param:{}};
				  data.param.org_id=org_id;
				  $.ajax({				 
						url : sys_config.base_serverpath+"/base_org_gov/del",
						data:JSON.stringify(data),
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
                el: $(".platmana_comlist_tablewrap",$thispage),
                // 定义表格列
                columns: [
                    {
                        title: "机构名称",
                        width: 300,
                        align: "center",
                        // 该列分配表格剩余宽度的比例，默认值1
                        // 缩放比例是0将固定宽度
                        scale: 3,
                        render: "rowData.org_name"
                    },
                    {
                        title: "省", width: 180,
                        align: "center",
                        render: "rowData.province"
                        
                    },
                    {
                        title: "市", width: 140,
                        align: "center",
                        render: "rowData.city"
                       
                    },
                    {
                        title: "区", width: 140,
                        align: "center",
                        render:"rowData.area"
                    },
                    {
                        title: "机构类型", width:100,
                        align: "center",
                        render:function(data,table){
                        	var $td = data.$td;
            				$td.html();
                            if(data.rowData.org_type == '10'){
                            	$td.html("医院机构");
                            }else if(data.rowData.org_type == '20'){
                            	$td.html("监管机构");
                            }else{
                            	$td.html("运营公司");
                            }
                         }
                    },
                    {
                        title: "机构状态", width: 100,
                        align: "center",
                        render: function(data,table){
                        	  var $stateHtml;
                              if(data.rowData.flag == '1'){
                                  //正常
                                  $stateHtml = $("<span class='platmana_permlist_state_normal'>正常</span>");
                              }else if(data.rowData.flag == '0'){
                                  //冻结
                                  $stateHtml = $("<span class='platmana_permlist_state_invalid'>无效</span>");
                              }else{
                            	  $stateHtml = $("<span class='platmana_permlist_state_frozen'>冻结</span>");
                              }
                              $stateHtml.appendTo(data.$td);
                        }

                    },
                    {
                        title: "审核状态", width: 100,
                        align: "center",
                        render: function(data,table){
                        	var $examStateHtml;
                            if(data.rowData.check_status == '00'){
                                //通过
                                $examStateHtml = $("<span class='platmana_permlist_examState_wait'>待审核</span>");
                            }else if(data.rowData.check_status == '10'){
                            	 $examStateHtml = $("<span class='platmana_permlist_examState_success'>审核通过</span>");
                            }else{
                            	//未通过
                                $examStateHtml = $("<span class='platmana_permlist_examState_fail'>审核未通过</span>");
                            }
                            $examStateHtml.appendTo(data.$td);
                        }

                    },
                    {
                        title: "操作", width: 300,
                        align: "center",
                        render: function(data,table){
                        	 //创建多个按钮
                            var $btnwrap = $("<div class='xBtn-multi'></div>");

                            var $btn1 = $("<button class='xBtn xBtn-default' type='button'>修改</button>");
                            $btn1.on('click',function () {
                            	org_edit(data.rowData.org_id);
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
                            $btn2.on("click",function(){
                            	var flag;
                            	if(data.rowData.flag == '1'){
                            		flag="2";
                            	}else if(data.rowData.flag == '2'){
                            		flag="1"
                            	}
                            	org_toggle_freeze(flag,data.rowData.org_id);
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
                	url: sys_config.base_serverpath+"/base_org_gov/list",
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