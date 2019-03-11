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
			url:server_zuulpath+"/rolemenu/queryRolePermission",
			data:JSON.stringify(data),
			success:function(data){
				var checkData=$.grep(data.datas,function(n){
					return n.checked==true
				});
				var menuData=$.each(checkData,function(i,checkn){
					if(checkn.pId){
						var pdata=$.grep(data.datas,function(n){
							return n.id==checkn.pId;
						});
						if(pdata){
							checkn.full_name=pdata[0].name+"/"+checkn.name;
						}
					}
				});
				$(".choose_list",$thispage).activeTag({
					data:menuData,
					callbacks:{
						operate:function(data){
							queryAllianceOrg($thispage,data.id,data.org);
						},
						del:function(data,wrap,instance){
							var updata={param:{}};
							updata.param.role_id=role_id;
							updata.param.menu_id=data.id;
							var isdel=false;
							if(wrap.hasClass("new")){
								if(wrap.hasClass("active")&&instance.el.find(".active").length==1){
									$.fn.zTree.init($("#role_choose_org_tree",$thispage), setting,[]);
								}
								return true;
							}
							$.ajax({
								url:server_zuulpath+"/rolemenu/delRoleMenu",
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
			  var role_id=$("[name='role_id']").val();
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
					  roleMenuList.push(menuObj);
				  }
				  if($.isArray(n.org)&&!n.org.length){
					  var orgObject=new Object();
					  orgObject.menu_id=n.id;
					  orgObject.role_id=role_id;
					  roleOrgList.push(orgObject);
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
					url : server_zuulpath+"/rolemenu/updateRoleMenu",
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
				  queryAllianceOrg($thispage,"",data.org);
			  }
		  });
	};
	
	var _uninstall=function(){
		
	}

	
	function queryAllianceOrg($thispage,menuid,orgids){
		var orgdata={param:{}};
	    orgdata.param.menu_id=11;
		orgdata.param.role_id=$("[name='role_id']").val();
        orgdata.param.checkMenuId=menuid
		$.ajax({
			url:server_zuulpath+"/menuorg/queryAllianceOrg",
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