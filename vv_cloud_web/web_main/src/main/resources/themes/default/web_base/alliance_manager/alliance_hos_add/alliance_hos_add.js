define([ 'jquery', 'corectr','plugin/corejs/zTreeSearch/zTreeSearch'], function($, corectr,zTreeSearch) {

	

	/* ======================= 业务模块强制的开发规范 ======================= */
	var _initoptions=function(opts){
		
		
	};
	/* 修正初始化数据 */
	var _initdataconvert = function(renderdata) {
		
		return renderdata;
	};
	
	/* 模块页面初始化操作 */
	var _viewinit = function($thispage, renderdata,opts) {
		var data={param:{}};
		data.param.menu_id=renderdata.menu_id
		data.param.alliance_id=$("[name='alliance_id']",$thispage).val()
		$.ajax({
			url:sys_config.base_serverpath+"/alliance/queryAllianceOrg",
			data:JSON.stringify(data),
			success:function(data){

				$("#alliance_addhos_hoslist",$thispage).activeTag({
					type:"user",
					data:[],
					key:{
						text:"name",
						id:"id"
					},
					callbacks:{
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
								if(treeNode.nodeLevel=="00"){
									return false;
								}else if(treeNode.checked){
									corectr.v.miniPopup.error("该成员已属于当前医联体");
									return false;
								}
								
							},
							onClick : function(event, treeId, treeNode){
								$("#alliance_addhos_hoslist",$thispage).activeTag().add(treeNode);
							},
							beforeExpand:function(treeId, treeNode){
								if(treeNode.isParent){
									 $.fn.zTree.getZTreeObj("alliance_addhos_hostree").showNodes(treeNode.children);
								}
							}
							
						}
				};
				$.fn.zTree.init($("#alliance_addhos_hostree",$thispage), setting, data.datas);
				
			}
		});
	};

	/* 模块页面事件绑定 */
	var _eventbind = function($thispage, renderdata, opts) {
		$("#alliance_addhos_cancle",$thispage).click(function(){
			opts.vpopup.remove();
		});
		$("#alliance_addhos_save",$thispage).click(function(){
			  var data={param:{}};
			  var allianceOrgRefVoList=[];
			  var hoslist=$("#alliance_addhos_hoslist",$thispage).activeTag().getData();
			  var alliance_id=$("[name='alliance_id']",$thispage).val();
			  $.each(hoslist,function(i,n){
				  var hosObj=new Object();
				  hosObj.alliance_id=alliance_id;
				  hosObj.org_id=n.id;
				  allianceOrgRefVoList.push(hosObj);
			  });
			  data.param.allianceOrgRefVoList=allianceOrgRefVoList;
			  $.ajax({
					type :"post",					 
					url : sys_config.base_serverpath+"/alliance/saveAllianceOrg",
					data:JSON.stringify(data),
			 		success : function(result) {
			 			corectr.v.message.success({content:result.message});
			 			opts.vpopup.data("closeType","submit");
			 			if(result.datas){
			 				opts.vpopup.data("alliance_id",result.datas);
			 			}
			 			opts.vpopup.remove();
			 		}
			  });
		});
		$("#alliance_addhos_hossarch",$thispage).click(function(){
			var keywords=$("#alliance_addhos_searchinput",$thispage).val();
			zTreeSearch.search("alliance_addhos_hostree",keywords);
		});
		$("#alliance_addhos_removeall",$thispage).click(function(){
			$("#alliance_addhos_hoslist",$thispage).activeTag().delall();
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