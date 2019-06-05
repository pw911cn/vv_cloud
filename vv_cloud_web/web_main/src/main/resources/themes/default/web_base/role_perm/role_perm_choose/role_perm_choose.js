define([ 'jquery', 'corectr','plugin/corejs/zTreeSearch/zTreeSearch'], function($, corectr,zTreeSearch) {

	
	
	/* ======================= 业务模块强制的开发规范 ======================= */
	var _initoptions=function(opts){
		
		
	}
	/* 修正初始化数据 */
	var _initdataconvert = function(renderdata) {
		
		return renderdata;
	};
	
	/* 模块页面初始化操作 */
	var _viewinit = function($thispage, renderdata) {
		var role_id=$("[name='role_id']").val();
		var data={param:{}};
		data.param.role_id=$("[name='role_id']").val();
		$.ajax({
			url:sys_config.base_serverpath+"/rolemenu/queryRolePermission",
			data:JSON.stringify(data),
			success:function(data){
				var checkData=$.grep(data.datas,function(n){
					return n.checked==true
				});
				$.each(checkData,function(i,checkn){
					checkn.full_name=getFullName(checkn,data.datas);
				});
				function getFullName(checkn,alldata,arr){
					arr=arr||[];
					arr.unshift(checkn.name);
					if(checkn.pId){
						var pdata=$.grep(alldata,function(n){
							return n.id==checkn.pId;
						});
						if(pdata.length>0){
							return getFullName(pdata[0],alldata,arr)
						}
					}else{
						return arr.join("/");
					}

				}
				var menuData=checkData;
				$(".choose_list",$thispage).activeTag({
					data:menuData,
					callbacks:{
						operate:function(data,wrap,instance){
							queryAllianceOrg($thispage,renderdata,data.id,data.org,wrap);
						},
						del:function(data,wrap,instance){
							var updata={param:{}};
							updata.param.role_id=role_id;
							updata.param.menu_id=data.id;
							var isdel=false;
							if(wrap.hasClass("new")){
								if(wrap.hasClass("active")&&instance.el.find(".active").length==1){
									$.fn.zTree.init($("#role_choose_org_tree",$thispage), setting,[]);
									$(".myhos [name='all_org_flag']",$thispage).prop("checked",false);
									$(".myhos [name='all_detp_flag']",$thispage).prop("checked",false);
									$(".myhos [name='all_detp_flag']",$thispage).hide();
								}
								return true;
							}
							$.ajax({
								url:sys_config.base_serverpath+"/rolemenu/delRoleMenu",
								data:JSON.stringify(updata),
								async:false,
								success:function(data){
									if(data.status=="20"){
										isdel=false;
										return;
									}
									isdel=true;
								},
								error:function(){
									isdel=false;
								}
							});
							if(isdel&&wrap.hasClass("active")&&instance.el.find(".active").length==1){
								$.fn.zTree.init($("#role_choose_org_tree",$thispage), setting,[]);
							}
							return isdel;
						},
						empty:function(el){
							el.siblings(".nodata").show();
						},
						fill:function(el){
							el.siblings(".nodata").hide();
						}
					}

				});
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
								if(treeNode.children){
									return false;
								}
							},
							onClick : function(event, treeId, treeNode){
								var data=$.extend(true,{},treeNode);
								var pNode=treeNode.getParentNode();
								if(pNode){
									data.full_name=pNode.name+"/"+treeNode.name;
								}else{
									data.full_name=data.name;
								}
								$(".choose_list",$thispage).activeTag().add(data);
							},
							beforeExpand:function(treeId, treeNode){
								if(treeNode.isParent){
									 $.fn.zTree.getZTreeObj("role_perm_choosetree").showNodes(treeNode.children)
								}
							}
						}
				};
				$.fn.zTree.init($("#role_perm_choosetree",$thispage), setting, data.datas);
				
			}
		});
	};

	/* 模块页面事件绑定 */
	var _eventbind = function($thispage, renderdata, opts) {
		  $("#role_choose_save",$thispage).on("click",function(){
			  var role_id=$("[name='role_id']",$thispage).val();
			  var data={};
			  data.param=$thispage.getformdata();
			  var menulist=$(".choose_list",$thispage).activeTag().getData();
			  var roleMenuList=[];
			  var roleOrgList=[];
			  $.each(menulist,function(i,n){
				  if($(".choose_list",$thispage).find("li").eq(i).hasClass("new")){
					  var menuObj=new Object();
					  menuObj.menu_id=n.id;
					  menuObj.role_id=role_id;
					  if("all_org_flag" in n){
						  menuObj.all_org_flag=n.all_org_flag
					  }else{
						  menuObj.all_org_flag="0";
					  }
					  
					  if("all_detp_flag" in n){
						  menuObj.all_detp_flag=n.all_detp_flag
					  }else{
						  menuObj.all_detp_flag="0";
					  }
					  roleMenuList.push(menuObj);
				  }
				  if($.isArray(n.org)&&!n.org.length){
					  var orgObject=new Object();
					  orgObject.menu_id=n.id;
					  orgObject.role_id=role_id;
					  roleOrgList.push(orgObject);
				  }
				  if(("all_org_flag" in n)&&("all_detp_flag" in n)&&!$(".choose_list",$thispage).find("li").eq(i).hasClass("new")){
					  var menuObj=new Object();
					  menuObj.menu_id=n.id;
					  menuObj.role_id=role_id;
					  menuObj.all_org_flag=n.all_org_flag;
					  menuObj.all_detp_flag=n.all_detp_flag;
					  roleMenuList.push(menuObj);
				  }
				  $.each(n.org,function(i,orgid){
					  var orgObject=new Object();
					  orgObject.menu_id=n.id;
					  orgObject.org_id=orgid;
					  orgObject.role_id=role_id;
					  roleOrgList.push(orgObject);
				  });
			  });
			  data.param.roleMenuList=roleMenuList;
			  data.param.roleOrgList=roleOrgList;
			  
			  $.ajax({
					type :"post",					 
					url : sys_config.base_serverpath+"/rolemenu/updateRoleMenu",
					data:JSON.stringify(data),
			 		success : function(result) {
			 			corectr.v.message.success({content:result.message});
			 			opts.vpopup.data("closeType","submit");
			 			opts.vpopup.remove();
			 		}
			  });
		  });
		  $("#role_choose_cancle",$thispage).on("click",function(){
				opts.vpopup.remove();      
		  });
		  $("#role_choose_permtree_search",$thispage).click(function(){
			  var keywords=$("#role_choose_permtree_input",$thispage).val()
			  zTreeSearch.search("role_perm_choosetree",keywords);
		  });
		  $("#role_choose_orgtree_search",$thispage).click(function(){
			  var keywords=$("#role_choose_orgtree_input",$thispage).val();
			  zTreeSearch.search("role_choose_org_tree",keywords);
		  });
		  $("#role_shoose_all").click(function(){
			  var data=$(".choose_list",$thispage).activeTag().all();
			  var idsarr=[];
			  if(data.length){
				  queryAllianceOrg($thispage,renderdata,"",data.org);
			  }
		  });
		  $("[name='all_org_flag'],[name='all_detp_flag']",$thispage).on("change",function(){
			    var targetarr=$(".choose_list",$thispage).activeTag().choose();
			    console.log(targetarr)
				if(targetarr.length>=1){
					$.each(targetarr,function(i,n){
						n.all_org_flag=$(".myhos [name='all_org_flag']",$thispage).is(":checked")?"1":"0";
						n.all_detp_flag=$(".myhos [name='all_detp_flag']",$thispage).is(":checked")?"1":"0";
					});
				}
		  });
	};
	
	var _uninstall=function(){
		
	}

	
	function queryAllianceOrg($thispage,renderdata,menuid,orgids,wrap){
		console.log(wrap)
		var orgdata={param:{}};
		var orgdata={param:{
            menu_id:renderdata.menuId,
            checkMenuId:menuid
		}};
	    var targetarr=$(".choose_list",$thispage).activeTag().choose();
	    if(targetarr.length>1){
	    	$(".myhos [name='all_org_flag']",$thispage).prop("checked",false);
			$(".myhos [name='all_detp_flag']",$thispage).prop("checked",false);
			$.each(targetarr,function(i,n){
				n.all_org_flag=$(".myhos [name='all_org_flag']",$thispage).is(":checked")?"1":"0";
				n.all_detp_flag=$(".myhos [name='all_detp_flag']",$thispage).is(":checked")?"1":"0";
			});
			$(".myhos",$thispage).show();
	    }else{
			$.each(targetarr,function(i,n){
				if(("all_org_flag" in n)&&("all_detp_flag" in n)){
					var all_org_check=n.all_org_flag=="1"?true:false;
					var all_dept_check=n.all_detp_flag=="1"?true:false;
					$(".myhos [name='all_org_flag']",$thispage).prop("checked",all_org_check);
					$(".myhos [name='all_detp_flag']",$thispage).prop("checked",all_dept_check);
				}else{
					if(wrap&&wrap.hasClass("new")){
						$(".myhos [name='all_org_flag']",$thispage).prop("checked",false);
						$(".myhos [name='all_detp_flag']",$thispage).prop("checked",false);
						$.each(targetarr,function(i,n){
							n.all_org_flag=$(".myhos [name='all_org_flag']",$thispage).is(":checked")?"1":"0";
							n.all_detp_flag=$(".myhos [name='all_detp_flag']",$thispage).is(":checked")?"1":"0";
						});
						$(".myhos",$thispage).show();
						return;
					}
					var data={param:{}};
					data.param.role_id=$("[name='role_id']",$thispage).val();
					data.param.menu_id=menuid;
					$.ajax({
						url:sys_config.base_serverpath+"/rolemenu/queryMenuFlag",
						async:false,
						data:JSON.stringify(data),
						success:function(data){
							n.all_org_flag=data.datas.all_org_flag;
							n.all_detp_flag=data.datas.all_detp_flag;
							var all_org_check=data.datas.all_org_flag=="1"?true:false;
							var all_dept_check=data.datas.all_detp_flag=="1"?true:false;
							$(".myhos [name='all_org_flag']",$thispage).prop("checked",all_org_check);
							$(".myhos [name='all_detp_flag']",$thispage).prop("checked",all_dept_check);
						}
					})
				}
				$(".myhos",$thispage).show();
			});			
	    }

		orgdata.param.role_id=$("[name='role_id']").val();
		$.ajax({
			url:sys_config.base_serverpath+"/menuorg/queryAllianceOrg",
			data:JSON.stringify(orgdata),
			success:function(data){

				var setting = {
						check : {
							enable : true
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
							onCheck : function(event, treeId, treeNode){
								var treeObj = $.fn.zTree.getZTreeObj("role_choose_org_tree");
								var nodeobj=treeObj.getNodesByFilter(function(node){
									return node.checked&&(!node.isParent||node.check_Child_State==2)&&(!node.pId||node.getParentNode().check_Child_State==1)
								});
								console.log(nodeobj);
								var idarr=[];
								$.each(nodeobj,function(i,n){
									idarr.push(n.id);
								});
								var targetarr=$(".choose_list",$thispage).activeTag().choose();
								$.each(targetarr,function(i,n){
									n.org=idarr
								});
								console.log($(".choose_list",$thispage).activeTag().getData())
							},
							beforeExpand:function(treeId, treeNode){
								if(treeNode.isParent){
									 $.fn.zTree.getZTreeObj("role_choose_org_tree").showNodes(treeNode.children)
								}
							}
						},
						
				};
				var role_org_tree=$.fn.zTree.init($("#role_choose_org_tree",$thispage), setting, data.datas);
				var needcheck=role_org_tree.getNodesByFilter(function(node){
					return node.checked&&node.check_Child_State==0;
				});
				for(var i=0;i<needcheck.length;i++){
					role_org_tree.checkNode(needcheck[i],true,true,false);
				};
				if(orgids){
					role_org_tree.checkAllNodes(false);
					for(var i=0;i<orgids.length;i++){
						var initnode=role_org_tree.getNodesByParam("id",orgids[i]);
						console.log(initnode)
						role_org_tree.checkNode(initnode[0],true,true,false);
					};
				}
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