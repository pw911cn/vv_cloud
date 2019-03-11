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
		
		var data={param:{}};
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
							if(wrap.hasClass("active")&&instance.el.find(".active").length==1){
								$.fn.zTree.init($("#role_perm_org_tree",$thispage), setting,[]);
							}
							return true;
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
									 $.fn.zTree.getZTreeObj("role_perm_tree").showNodes(treeNode.children)
								}
							}
							
						}
				};
				$.fn.zTree.init($("#role_perm_tree",$thispage), setting, data.datas);
				
			}
		});
	};

	/* 模块页面事件绑定 */
	var _eventbind = function($thispage, renderdata, opts) {
		  $("#role_add_save",$thispage).on("click",function(){
			  var data={};
			  data.param=$thispage.getformdata();
			  if(!$("#role_add_form").valid()){
				  return
			  }
			  var menulist=$(".choose_list",$thispage).activeTag().getData();
			  var roleMenuList=[];
			  var roleOrgList=[];
			  $.each(menulist,function(i,n){
				  var menuObj=new Object();
				  menuObj.menu_id=n.id;
				  if(n.all_detp_flag){
					  menuObj.all_detp_flag=n.all_detp_flag;
				  };
				  if(all_org_flag){
					  menuObj.all_org_flag=n.all_org_flag;
				  }
				  roleMenuList.push(menuObj);
				  $.each(n.org,function(i,orgid){
					  var orgObject=new Object();
					  orgObject.menu_id=n.id;
					  orgObject.org_id=orgid;
					  roleOrgList.push(orgObject);
				  });
			  });
			  data.param.roleMenuList=roleMenuList;
			  data.param.roleOrgList=roleOrgList;
			  
			  $.ajax({
					type :"post",					 
					url : server_zuulpath+"/power/addRole",
					data:JSON.stringify(data),
			 		success : function(result) {
			 			corectr.v.message.success({content:result.message});
			 			opts.vpopup.data("closeType","submit");
			 			opts.vpopup.remove();
			 		}
			  });
		  });
		  $("#role_add_cancle",$thispage).on("click",function(){
				opts.vpopup.remove();      
		  });
		  $("#role_perm_tree_search",$thispage).click(function(){
			  var keywords=$("#role_perm_tree_input",$thispage).val()
			  zTreeSearch.search("role_perm_tree",keywords);
		  });
		  $("#role_perm_orgtree_search",$thispage).click(function(){
			  var keywords=$("#role_perm_orgtree_input",$thispage).val();
			  zTreeSearch.search("role_perm_org_tree",keywords);
		  });
		  $("#role_add_all").click(function(){
			  var data=$(".choose_list",$thispage).activeTag().all();
			  var idsarr=[];
			  if(data.length){
				  queryAllianceOrg($thispage,"",data.org);
			  }
		  });
		  $(".myhos[name='all_org_flag'],.myhos[name='all_dept_flag']",$thispage).on("change",function(){
			    var targetarr=$(".choose_list",$thispage).activeTag().choose();
				if(targetarr.length>=1){
					$.each(targetarr,function(i,n){
						n.all_org_flag=$(".myhos[name='all_org_flag']",$thispage).is(":checked")?"1":"0";
						n.all_dept_flag=$(".myhos[name='all_dept_flag']",$thispage).is(":checked")?"1":"0";
					});
				}
		  });
	};
	
	var _uninstall=function(){
		
	}

	
	function queryAllianceOrg($thispage,menuid,orgids){
		var orgdata={param:{
			menu_id:11,
            checkMenuId:menuid
		}};
		//orgdata.param.menu_id=menuid;
		var flagdata={param:{}};
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
								var treeObj = $.fn.zTree.getZTreeObj("role_perm_org_tree");
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
									 $.fn.zTree.getZTreeObj("role_perm_org_tree").showNodes(treeNode.children)
								}
							}
						},
						
				};
				var role_org_tree=$.fn.zTree.init($("#role_perm_org_tree",$thispage), setting, data.datas);
				var needcheck=role_org_tree.getNodesByFilter(function(node){
					return node.checked&&node.check_Child_State==0;
				});
				for(var i=0;i<needcheck.length;i++){
					role_org_tree.checkNode(needcheck[i],true,true,false);
				};
				if(orgids){
					for(var i=0;i<orgids.length;i++){
						var initnode=role_org_tree.getNodesByParam("id",orgids[i]);
						console.log(initnode)
						role_org_tree.checkNode(initnode[0],true,true,false);
					};
				}
				var targetarr=$(".choose_list",$thispage).activeTag().choose();
				if(targetarr.length>1){
					$(".myhos[name='all_org_flag']",$thispage).prop("checked",false);
					$(".myhos[name='all_dept_flag']",$thispage).prop("checked",false);
					$.each(targetarr,function(i,n){
						n.all_org_flag=$(".myhos[name='all_org_flag']",$thispage).is(":checked")?"1":"0";
						n.all_dept_flag=$(".myhos[name='all_dept_flag']",$thispage).is(":checked")?"1":"0";
					});
					$(".myhos",$thispage).show();
				}else{
					$.each(targetarr,function(i,n){
						if(n.all_org_flag&&n.all_org_flag=="1"){
							$(".myhos[name='all_org_flag']",$thispage).prop("checked",true);
						}else{
							$(".myhos[name='all_org_flag']",$thispage).prop("checked",false);
						}
						if(n.all_dept_flag&&n.all_dept_flag=="1"){
							$(".myhos[name='all_dept_flag']",$thispage).prop("checked",true);
						}else{
							$(".myhos[name='all_dept_flag']",$thispage).prop("checked",false);
						}
						
						$(".myhos",$thispage).show();
					});
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