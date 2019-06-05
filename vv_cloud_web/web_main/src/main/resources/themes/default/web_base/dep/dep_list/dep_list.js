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
		$thispage.find("[name='hosp_name']").fuzzySearch({
			url: sys_config.base_serverpath+"/base_org_hosp/list",
			key:"org_name",
			data: function(){
				return {param:{
                    menuId:opts.initdata_param.menu_id
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
		table=null;
        menuId=opts.initdata_param.menu_id
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
		$("#dep_list_addBtn",$thispage).on('click',function() {
			corectr.v.popup({
                width: 1000,
                height: 550,
                title: "添加科室信息",
                type:"GET",
                content:function($wrap, instance){ 
                	corectr.loadmodule({ 
                		module : "web_base/dep/dep_add/dep_add",
                		$todom : $wrap,
                		vpopup:instance,
                        renderdata:opts.initdata_param.menu_id
                	});
                },
                closeCallback:function($wrap, instance){
                	if(instance.data("closeType")&&instance.data("closeType")=="submit"){
                		//table.refresh();
                		console.log("成功")
                	}
                	
                }
            })
        
		});
		$("#dep_list_searchbtn",$thispage).on("click",function(){
			var param=$("#dep_list_searchform").getformdata();
            param.menuId=menuId;
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
	function dep_edit(dept_id){
    	corectr.v.popup({
            width: 1000,
            height: 550,
            title: "修改科室信息",
            type:"GET",
            content:function($wrap, instance){ 
            	corectr.loadmodule({ 
            		module : "web_base/dep/dep_edit/dep_edit",
            		$todom : $wrap,
            		vpopup:instance,
            		initdata_param:{
            			param:{
            				dept_id:dept_id
            			}
            		},
            		initdata_url:sys_config.base_serverpath+"/base_dept/getBaseDeptById",
            		
            		 
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
	//冻结解冻
	function dep_toggle_freeze(flag,dept_id){
		var confirmIns =corectr.v.vConfirm({
			// 可选参数，自定义标题
			title: "操作",
			content: flag==1?"确定解冻吗？":"确定冻结吗？",
			// 可选参数，点击确认按钮调用
			confirmHandler: function () {
				  var data={param:{}};
				  data.param.flag=flag;
				  data.param.dept_id=dept_id;
				  $.ajax({
						type :"post",					 
						url : sys_config.base_serverpath+"/base_dept/del",
						data:JSON.stringify(data),
				 		success : function(result) {
				 			table.refresh();
				 			corectr.v.message.success({content:result.message});
				 		},
				 		error:function(){
				 			table.refresh();
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
	function dep_delete(org_id){
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
						url : sys_config.base_serverpath+"/base_dept/del",
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
                el: $(".platmana_comlist_tablewrap",$thispage),
                // 定义表格列
                columns: [
                    {
                        title: "所属医院",
                        width: 300,
                        align: "center",
                        // 该列分配表格剩余宽度的比例，默认值1
                        // 缩放比例是0将固定宽度
                        scale: 3,
                        render: "rowData.hosp_name"
                    },
                    {
                        title: "科室名称",
                        width: 180,
                        align: "center",
                        // 该列分配表格剩余宽度的比例，默认值1
                        // 缩放比例是0将固定宽度
                        render: "rowData.dept_name"
                    },
                    {
                        title: "上级科室名称",
                        width: 180,
                        align: "center",
                        // 该列分配表格剩余宽度的比例，默认值1
                        // 缩放比例是0将固定宽度
                        render: "rowData.p_name"
                    },
                    {
                        title: "科室级别",
                        width: 180,
                        align: "center",
                        // 该列分配表格剩余宽度的比例，默认值1
                        // 缩放比例是0将固定宽度
                        render: "rowData.dept_level"
                    },
                    {
                        title: "所属专科",
                        width: 180,
                        align: "center",
                        // 该列分配表格剩余宽度的比例，默认值1
                        // 缩放比例是0将固定宽度
                        render: "rowData.special_name"
                    },
                    
                    {
                        title: "科室状态", width: 100,
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
                        title: "操作", width: 300,
                        align: "center",
                        render: function(data,table){
                        	 //创建多个按钮
                            var $btnwrap = $("<div class='xBtn-multi'></div>");

                            var $btn1 = $("<button class='xBtn xBtn-default' type='button'>修改</button>");
                            $btn1.on('click',function () {
                            	dep_edit(data.rowData.dept_id);
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
                            	dep_toggle_freeze(flag,data.rowData.dept_id);
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
                	url: sys_config.base_serverpath+"/base_dept/list",
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