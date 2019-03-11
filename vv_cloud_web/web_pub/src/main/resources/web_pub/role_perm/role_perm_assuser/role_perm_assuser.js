define([ 'jquery', 'corectr','plugin/corejs/zTreeSearch/zTreeSearch'], function($, corectr,zTreeSearch) {

	
	var users_list
	/* ======================= 业务模块强制的开发规范 ======================= */
	var _initoptions=function(opts){
		
		
	}
	/* 修正初始化数据 */
	var _initdataconvert = function(renderdata) {
		
		return renderdata;
	};
	
	/* 模块页面初始化操作 */
	var _viewinit = function($thispage, renderdata) {
		users_list=null;
		var role_id=$("[name='role_id']").val();
		$(".selected_list",$thispage).activeTag({
			type:"user",
			key:{
				text:"text",
				id:"text"
			},
			data:[],
			callbacks:{
				empty:function(el){
					el.siblings(".nodata").show();
				},
				fill:function(el){
					el.siblings(".nodata").hide();
				}
			}
		});
		users_list={
			isinit:false,
			pageNumber:1,
			pageSize:5,
			total:0,
			orgName:"",
			ajax:function(fresh){
				var me=this;
				var userdata={param:{},pageVo:{}};
				userdata.param.role_id=role_id;
				userdata.param.orgName=me.orgName;
				userdata.pageVo.pageNumber=me.pageNumber;
				userdata.pageVo.pageSize=me.pageSize;
				
				$.ajax({
					url:server_zuulpath+"/userrole/queryUserRole",
					data:JSON.stringify(userdata),
					success:function(data){
						me.total=data.datas.total;
						var renderdata=data.datas.datas;
						$.each(renderdata,function(i,n){
							var orgName=n.orgName&&n.orgName.length?n.orgName+"/":"";
							var pDeptName=n.pDeptName&&n.pDeptName.length?n.pDeptName+"/":"";
							var deptName=n.deptName&&n.deptName.length?n.deptName+"/":"";
							var userName=n.userName&&n.userName.length?n.userName:"";
							n.text=orgName+pDeptName+deptName+userName;
							
						});
						if(!me.isinit){
							me.isinit=true;
							var settings={
								type:"user",
								key:{
									text:"text",
									id:"text"
								},
								data:renderdata,
								callbacks:{
									del:function(data,wrap){
										var updata={param:{}};
										updata.param.role_id=role_id;
										updata.param.user_id=data.userId;
										$.ajax({
											url:server_zuulpath+"/userrole/delUserRole",
											data:JSON.stringify(updata),
											async:false,
											success:function(data){
												if(data.status=="20"){
													return;
												}
												me.ajax(true);
											},
											error:function(){
											}
										});
									},
									empty:function(el){
										$(".choose_cont .nodata",$thispage).show();
										$("#pagewrap",$thispage).find("*").remove();
									},
									fill(el){
										$(".choose_cont .nodata",$thispage).hide();
									}
								}

							}
							$(".alreadylist",$thispage).activeTag(settings);
						}else{
							$(".alreadylist",$thispage).activeTag().refresh(renderdata);
						}
						if(!data.datas.datas.length){
							return;
						}
						corectr.v.pagination({
							// 承载分页的容器
							el: $("#pagewrap",$thispage),
							// 当前显示第几页.可选参数,默认值:1
							pageNumber:me.pageNumber,
							// 总共多少调记录.必要参数,分页组件将依赖这个值计算分页
							total: me.total,
							// 每页显示多少条.必要参数,分页组件将依赖这个值计算分页
							pageSize: me.pageSize,
							// 是否可以显示 pageSize. 可选参数,默认值:true
							showPageSizeChanger: false,
							// 是否显示QuickJumper. 可选参数,默认值:true
							showQuickJumper: false,
							// 分页信息改变的回调. 可选参数, Function(data) data={page, pageSize}
							onPageNumberChange: function (data) {
								// 转到第几页
								me.pageNumber = data.pageNumber;
								// 每页显示几条
								me.pageSize = data.pageSize;
								
								me.ajax();
							}
						});
					}
				});
			}
		}
		users_list.ajax();
		
		var data={param:{}};
		data.param.role_id=$("[name='role_id']").val();
		$.ajax({
			url:server_zuulpath+"/userrole/queryDeptUser",
			data:JSON.stringify(data),
			success:function(data){
				var setting = {
						check : {
							//enable : true
						},
						view : {
							selectedMulti : true
						},
						data : {
							simpleData : {
								enable : true
							}
						},
						callback : {
							beforeClick: function(treeId, treeNode, clickFlag){
								if(treeNode.checked){
									corectr.v.miniPopup.error("已添加");
									return false;
								}								
							},
							onClick : function(event, treeId, treeNode){
								var map={
									"20":"orgId",
									"1":"deptId",
									"2":"deptId",
									"30":"userId"
								}
								var temp=map[treeNode.nodeLevel];
								var data={param:{}};
								data.param.role_id=role_id;
								data.param[temp]=treeNode.id;
								if(temp=="userId"){
									data.param.deptId=treeNode.pId;
								}
								console.log(treeNode)
								$.ajax({
									url:server_zuulpath+"/userrole/queryUserById",
									data:JSON.stringify(data),
									success:function(data){
										var renderdata=data.datas;
										if(!renderdata.length){
											return false;
										}
										if(!$.isArray(data.datas)){
											renderdata=[data.datas];
										}
										renderdata=$.grep(renderdata,function(n){
											return !n.checked;
										});
										if(!renderdata.length){
											corectr.v.miniPopup.error("已添加");
											return false;
										}
										console.log(renderdata)
										$.each(renderdata,function(i,n){
											var orgName=n.orgName&&n.orgName.length?n.orgName+"/":"";
											var pDeptName=n.pDeptName&&n.pDeptName.length?n.pDeptName+"/":"";
											var deptName=n.deptName&&n.deptName.length?n.deptName+"/":"";
											var userName=n.userName&&n.userName.length?n.userName:"";
											n.text=orgName+pDeptName+deptName+userName;
											//$(".selected_list",$thispage).activeTag().add(n);
										});
										$(".selected_list",$thispage).activeTag().add(renderdata);
										
									}
								});
								
							},
							beforeExpand:function(treeId, treeNode){
								if(treeNode.isParent){
									 $.fn.zTree.getZTreeObj("deptUser_tree").showNodes(treeNode.children)
								}
							}
						}
				};
				$.fn.zTree.init($("#deptUser_tree",$thispage), setting, data.datas);
				
			}
		});
	};

	/* 模块页面事件绑定 */
	var _eventbind = function($thispage, renderdata, opts) {
		  $("#del_all_assuser",$thispage).click(function(){
			  $(".selected_list",$thispage).activeTag().delall();
		  });
		  $("#add_assuser",$thispage).on("click",function(){
			  var role_id=$("[name='role_id']").val();
			  var data={param:{}};
			  var userlist=$(".selected_list",$thispage).activeTag().getData();
			  var powerUserRoleRefVoList=[];
			  $.each(userlist,function(i,n){
				  var userObject=new Object();
				  userObject.user_id=n.userId;
				  userObject.role_id=role_id;
				  powerUserRoleRefVoList.push(userObject);
			  });
			  data.param.powerUserRoleRefVoList=powerUserRoleRefVoList;
			  $.ajax({
					type :"post",					 
					url : server_zuulpath+"/userrole/addUserRole",
					data:JSON.stringify(data),
			 		success : function(result) {
			 			$(".selected_list",$thispage).activeTag().delall();
						users_list.orgName="";
						$("#roleperm_fuzzy_name",$thispage).val("");
						users_list.pageNumber=1;
					    users_list.pageSize=5;
						users_list.ajax();
			 		}
			  });
		  });
		  $("#roleperm_userlist",$thispage).click(function(){
			  
			  users_list.orgName=$("#roleperm_fuzzy_name",$thispage).val();
			  users_list.pageNumber=1;
			  users_list.pageSize=5;
			  users_list.ajax();
			  
		  });
		  
		  $("#deptUser_tree_search",$thispage).click(function(){
			  var keywords=$("#deptUser_tree_input",$thispage).val();
			  zTreeSearch.search("deptUser_tree",keywords);
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