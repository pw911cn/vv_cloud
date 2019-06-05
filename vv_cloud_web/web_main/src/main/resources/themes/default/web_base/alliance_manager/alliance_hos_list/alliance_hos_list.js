define([ 'jquery', 'corectr','plugin/corejs/zTreeSearch/zTreeSearch'], function($, corectr,zTreeSearch) {

	
	var table;
	var menuId;
	/* ======================= 业务模块强制的开发规范 ======================= */
	var _initoptions=function(opts){

		
	}
	/* 修正初始化数据 */
	var _initdataconvert = function(renderdata) {
		
		return renderdata;
	};
	
	/* 模块页面初始化操作 */
	var _viewinit = function($thispage, renderdata,opts) {
		table=null;
        menuId=opts.menuId;
		getAllience($thispage);
		var data={}
		data.param={
				alliance_id:$("[name='alliance_id']",$thispage).val()
		}
		data.pageVo={

		}
		tableInit($thispage,data);
	};

	/* 模块页面事件绑定 */
	var _eventbind = function($thispage, renderdata, opts) {
		$("#alliance_hos_searchbtn",$thispage).on("click",function(){
			var param=$("#alliance_hos_form").getformdata();
			var data={};
			data.param=param;
			data.pageVo={
					pageSize:10,
					pageNumber:1
			};
			tableInit($thispage,data);
			
		});
		$("#alliance_hos_editalli",$thispage).on('click',function() {
			corectr.v.popup({
                width: 600,
                height: 600,
                title: "修改医联体",
                type:"GET",
                content:function($wrap, instance){ 
                	corectr.loadmodule({ 
                		module : "web_base/alliance_manager/alliance_edit/alliance_edit",
                		$todom : $wrap,
                		vpopup:instance,
                		initdata_param:{
                			param:{
                				alliance_id:$("[name='alliance_id']",$thispage).val()
                			}
                		},
                		initdata_url:sys_config.base_serverpath+"/alliance/queryOneAlliance",
                	});
                },
                closeCallback:function($wrap, instance){
                	if(instance.data("closeType")&&instance.data("closeType")=="submit"){
                		corectr.v.message.success({content:"修改成功"});
                		var data={param:{}};
	            		var alliance_id=instance.data("alliance_id");
	            		opts.refreshtree(data,alliance_id);
	            		getAllience($thispage);
                	}
                	
                }
            })
        
		});
		$("#alliance_hos_add",$thispage).click(function(){
			corectr.v.popup({
	            width: 900,
	            height: 700,
	            title: "添加医院",
	            type:"GET",
	            content:function($wrap, instance){ 
	            	corectr.loadmodule({ 
	            		module : "web_base/alliance_manager/alliance_hos_add/alliance_hos_add",
	            		$todom : $wrap,
	            		vpopup:instance,
	            		renderdata:{
	            			alliance_id:$("[name='alliance_id']",$thispage).val(),
                            menu_id:menuId
	            		}
	            	});
	            },
	            closeCallback:function($wrap, instance){
	            	if(instance.data("closeType")&&instance.data("closeType")=="submit"){
	            		corectr.v.message.success({content:"修改成功"});
	            		table.refresh();
	            	}
	            	
	            }
	        })
		});
		
	};
	
	var _uninstall=function(){
		
	}
	
	function getAllience($thispage){
		var alliance_data={param:{}};
		alliance_data.param.alliance_id=$("[name='alliance_id']",$thispage).val();
		$.ajax({
			url:sys_config.base_serverpath+"/alliance/queryOneAlliance",
			data:JSON.stringify(alliance_data),
			success:function(data){
				$("#alliance_hos_to_org",$thispage).html("所属管理机构:"+(data.datas.orgName?data.datas.orgName:"无"));
				$("#alliance_hos_to_alli",$thispage).html("上级医联体:"+(data.datas.pName?data.datas.pName:"无"));
				$("#alliance_hos_add_alliname",$thispage).html(data.datas.alliance_name);
			}
		});
	}
	

	//医院调整分区
	function adjust(org_id){
    	corectr.v.popup({
            width: 600,
            height: 300,
            title: "调整医院分级",
            type:"GET",
            content:function($wrap, instance){ 
            	corectr.loadmodule({ 
            		module : "web_base/alliance_manager/alliance_adjust/alliance_adjust",
            		$todom : $wrap,
            		vpopup:instance,
            		renderdata:{
            			org_id:org_id
            		},
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
                        title: "医院名称",
                        width: 180,
                        // 该列分配表格剩余宽度的比例，默认值1
                        // 缩放比例是0将固定宽度
                        render: "rowData.org_name"
                    },
                    {
                        title: "医院等级",
                        width: 90,
                        scale: 0,
                        align: "center",
                        render: "rowData.hosp_level_id"
                    },
                    {
                        title: "医院分级",
                        width: 90,
                        align: "center",
                        render: "rowData.hosp_rank_id"
                    },
                    {
                        title: "所属医联体",
                        width: 200,
                        scale: 2,
                        render: "rowData.allianceName"
                    },
                    {
                        title: "操作", width: 190,
                        scale: 0,
                        align: "center",
                        render: function (renderdata) {
                            //创建多个按钮
                            var $btnwrap = $("<div class='xBtn-multi'></div>");

                            var $btn1 = $("<button class='xBtn xBtn-default' type='button'>调整医院分级</button>");
                            $btn1.on('click',function () {
                                adjust(renderdata.rowData.org_id);
                            });
                            $btn1.appendTo($btnwrap);

                            var $btn3 = $("<button class='xBtn xBtn-danger' type='button'>移除</button>");
                            $btn3.on('click',function () {
                        		var confirmIns =corectr.v.vConfirm({
                        			// 可选参数，自定义标题
                        			title: "操作",
                        			content: "确定移除吗？",
                        			// 可选参数，点击确认按钮调用
                        			confirmHandler: function () {
                        				  var data={param:{}};
                        				  data.param.alliance_id=$("[name='alliance_id']",$thispage).val();
                        				  data.param.org_id=renderdata.rowData.org_id;
                        				  $.ajax({
                        						type :"post",					 
                        						url : sys_config.base_serverpath+"/alliance/delAllianceOrg",
                        						data:JSON.stringify(data),
                        				 		success : function(result) {
                        				 			if(result.status=="10"){
                            				 			corectr.v.message.success({content:result.message});
                            				 			renderdata.$tr.remove();
                            				 			table.refresh();
                        				 			}else{
                        				 				corectr.v.message.error({content:result.message});
                        				 			}

                        				 			
                        				 		}
                        				  });
                        			},
                        			// 可选参数，点击取消按钮调用
                        			cancelHandler: function () {
                        				console.log("vConfirm cancelHandler()");
                        			}
                        		});
                            });
                            $btn3.appendTo($btnwrap);


                            $btnwrap.appendTo(renderdata.$td);
                        }
                    }
                ],
                // 有分页
                pagination:data.pageVo,
                // 表格发送请求并渲染返回的数据，与$.ajax()用法相同
                ajax: {url: sys_config.base_serverpath+"/alliance/queryOrgHospById",
                	data:{param:data.param},
                	success:function(data){
                	var pageVo=data.datas;
                	data=pageVo;
                	}
                }

            });
            console.log(table)
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