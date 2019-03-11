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
		  pageSize:15,
		  pageNumber:1
		}
		//tableInit($thispage,data);
/*		  $.ajax({
				type :"post",					 
				url : server_zuulpath+"/base_org_gov/list",
				data:JSON.stringify(data),
				xhrFields : {
					withCredentials : false
				// 跨域访问需要覆盖为false
				},
				contentType:"application/json",
		 		success : function(result) {
		 			table.dataSource=result.datas
		 		}
		  });*/
		
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
                		module : "web_pub/org/org_add/org_add",
                		$todom : $wrap,
                		vpopup:instance
                		 
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
		$("#org_list_searchbtn",$thispage).on("click",function(){
			var param=$("#org_list_searchform").getformdata();
			var data={};
			data.param=param;
			data.pageVo={
					pageSize:15,
					pageNumber:1
			};
			tableInit($thispage,data)
			
		});

		$("#go", $thispage).on("click", function () {

			let sendParamStr = '{\n' +
				'    "sendType": "1",\n' +
				'    "bizParam": ""\n' +
				'}';
			let sendParamJSONObj = JSON.parse(sendParamStr);

			window.frames['testIframe'].contentWindow
				.postMessage(sendParamJSONObj, "http://localhost:9090");

			function receiveMessage(event) {
				// 我们能相信信息的发送者吗?  (也许这个发送者和我们最初打开的不是同一个页面).
				if (event.origin !== "http://localhost:9090")
					return;

				// alert("TSCP");
				// event.source 是我们通过window.open打开的弹出页面 popup
				// event.data 是 popup发送给当前页面的消息 "hi there yourself!  the secret response is: rheeeeet!"
				// alert(event.data);
			}

			window.addEventListener("message", receiveMessage, false);

		});
		$("#goDetail", $thispage).on("click", function () {


			let bizParamStr = '{\n' +
				'    "prim_id": "22b5432079cf4cd481291eeb389bbe5c",\n' +
				'    "consultation_id": "8945e67316584217a1bb8606135bd6c3",\n' +
				'    "prim_no": "20190124008",\n' +
				'    "cons_type": "clinic",\n' +
				'    "prim_interactive": "1",\n' +
				'    "prim_appointed": "0",\n' +
				'    "prim_important": "0",\n' +
				'    "prim_mdt": "0",\n' +
				'    "prim_reservation": "0",\n' +
				'    "prim_emergency": "0",\n' +
				'    "prim_allocate": "1",\n' +
				'    "request_type": "1",\n' +
				'    "prim_follow_up": null,\n' +
				'    "apply_time": "2019-01-24 14:47:10",\n' +
				'    "info_type": "1",\n' +
				'    "apply_hospid": "2b323da4d35c408c9f0b728ad24840ce",\n' +
				'    "apply_deptid": "3ff89564fc0e4cb58d1c35377350fc7e",\n' +
				'    "apply_subdeptid": "a43f12ab71ff4469801ba8c972cf4f93",\n' +
				'    "apply_docid": "1da69baec98d4160956f7e8e8e96dedf",\n' +
				'    "self_hosp": "心医国际数字医疗有限（大连）公司",\n' +
				'    "self_dept": "2",\n' +
				'    "self_doc": "2",\n' +
				'    "self_doctel": "2",\n' +
				'    "cons_start": null,\n' +
				'    "cons_ampm": null,\n' +
				'    "cons_end": null,\n' +
				'    "prim_status": "10",\n' +
				'    "hangup_node": "0",\n' +
				'    "flag": "1",\n' +
				'    "cm_data": "D测试会诊端医院/信息科/信息科",\n' +
				'    "reserve_doctor": null,\n' +
				'    "report_flag": "0",\n' +
				'    "conference_flag": "0",\n' +
				'    "reject_flag": "0",\n' +
				'    "send_status": null,\n' +
				'    "create_time": "2019-01-24 14:47:10",\n' +
				'    "update_time": "2019-01-24 14:47:10",\n' +
				'    "create_operator": "1da69baec98d4160956f7e8e8e96dedf",\n' +
				'    "update_operator": "1da69baec98d4160956f7e8e8e96dedf",\n' +
				'    "unite_flag": "0",\n' +
				'    "unite_id": "0",\n' +
				'    "prim_expertteam": "0",\n' +
				'    "fund_fee_type": null,\n' +
				'    "apply_type": null,\n' +
				'    "cons_attribute": null,\n' +
				'    "cons_id": null,\n' +
				'    "prim_reserve_spec": "0",\n' +
				'    "prim_reserve_dept": "0",\n' +
				'    "cons_mode": "1",\n' +
				'    "apply_doctel": null,\n' +
				'    "hosp_adminname": "1",\n' +
				'    "hosp_admintel": "1",\n' +
				'    "pati_name": "测试12",\n' +
				'    "req_hospital_name": "心医国际数字医疗有限（大连）公司",\n' +
				'    "req_doc_name": "平台管理员",\n' +
				'    "prim_staus_name": "前质控",\n' +
				'    "cons_type_name": "临床会诊",\n' +
				'    "prim_interactive_name": "是",\n' +
				'    "hospital_type_code": "1000009",\n' +
				'    "hospital_type_name": "心医国际",\n' +
				'    "start_time": null,\n' +
				'    "room_id": null,\n' +
				'    "room_name": null,\n' +
				'    "cons_time": null,\n' +
				'    "status": null,\n' +
				'    "_id": 0,\n' +
				'    "rno": 1\n' +
				'}';

			let sendParamStr = '{\n' +
				'    "sendType": "2",\n' +
				'    "bizParam": ""\n' +
				'}';

			let sendParamJSONObj = JSON.parse(sendParamStr);
			sendParamJSONObj["bizParam"] = bizParamStr;

			window.frames['testIframe'].contentWindow
				.postMessage(sendParamJSONObj, "http://localhost:9090");
				// .postMessage("hello there!", "http://localhost:9090");

			function receiveMessage(event) {
				// 我们能相信信息的发送者吗?  (也许这个发送者和我们最初打开的不是同一个页面).
				if (event.origin !== "http://localhost:9090")
					return;

				// alert("TSCP");
				// event.source 是我们通过window.open打开的弹出页面 popup
				// event.data 是 popup发送给当前页面的消息 "hi there yourself!  the secret response is: rheeeeet!"
			}

			window.addEventListener("message", receiveMessage, false);

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
            		module : "web_pub/org/org_edit/org_edit",
            		$todom : $wrap,
            		vpopup:instance,
            		initdata_param:{
            			param:{
            				org_id:org_id
            			}
            		},
            		initdata_url:server_zuulpath+"/base_org_gov/getBaseOrgGovById",
            		
            		 
            	});
            },
            closeCallback:function($wrap, instance){
            	if(instance.data("closeType")&&instance.data("closeType")=="submit"){
            		//table.refresh();
            		console.log("成功")
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
						type :"post",					 
						url : server_zuulpath+"/base_org_gov/del",
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
						type :"post",					 
						url : server_zuulpath+"/base_org_gov/del",
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
                pagination: {

                },
                onPageNumberChange:function(page){
                	
                }
                // 表格发送请求并渲染返回的数据，与$.ajax()用法相同
                //ajax: {url: "http://172.16.161.105:999/v/table", data: {a: 1, b: 2}}

            });
    	}
    	$.ajax({
			type :"post",					 
			url : server_zuulpath+"/base_org_gov/list",
			data:JSON.stringify(data),
			xhrFields : {
				withCredentials : false
			// 跨域访问需要覆盖为false
			},
			contentType:"application/json",
	 		success : function(result) {
	 			table.dataSource=result.datas
	 		}
    	});
    	

    }
	return {
		initoptions:_initoptions,
		initdataconvert : _initdataconvert,
		viewinit : _viewinit,
		eventbind : _eventbind,
		uninstall:_uninstall
	};
});