define([ 'jquery', 'corectr','plugin/corejs/zTreeSearch/zTreeSearch'], function($, corectr,zTreeSearch) {

	
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
        menuId=opts.initdata_param.menu_id
		var data={param:{
            menu_id:menuId
		}};
		alliancetree($thispage,data);
	};

	/* 模块页面事件绑定 */
	var _eventbind = function($thispage, renderdata, opts) {
		$("#alliance_main_addBtn",$thispage).click(function(){
			corectr.v.popup({
	            title: "新增医联体",
	            width: 600,
	            height: 600,
	            content: function ($wrap, popup) {
	            	corectr.loadmodule({ 
	            		module : "web_base/alliance_manager/alliance_add/alliance_add",
	            		$todom : $wrap,
	            		vpopup:popup,
                        renderdata:{
                            menuId:menuId
                        }
	            	});
	            },
	            closeCallback:function($wrap, instance){
	            	if(instance.data("closeType")&&instance.data("closeType")=="submit"){
	            		corectr.v.message.success({content:"新增成功"});
	            		var data={param:{}};
	            		data.param.menuId=menuId;
	            		var alliance_id=instance.data("alliance_id");
	            		alliancetree($thispage,data,alliance_id);
	            	}
	            	
	            }
			});
			

		});
		$("#alliance_main_search",$thispage).click(function(){
			var keywords=$("#alliance_main_tree_input",$thispage).val()
			zTreeSearch.search("alliance_main_alliancetree",keywords);
		});
	};
	
	function alliancetree($thispage,data,alliance_id){
		$.ajax({
			url:sys_config.base_serverpath+"/alliance/queryAlliance",
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

							},
							onClick : function(event, treeId, treeNode){
								corectr.loadmodule({ 
			                		module : "web_base/alliance_manager/alliance_hos_list/alliance_hos_list",
			                		$todom : $(".platmana_conj_right_wrap",$thispage),
                                    renderdata: treeNode,
									menuId:menuId,
			                		refreshtree:function(data,alliance_id){
			                			alliancetree($thispage,data,alliance_id);
			                		}
			                	});
							},
							beforeExpand:function(treeId, treeNode){
								if(treeNode.isParent){
									 $.fn.zTree.getZTreeObj("alliance_main_alliancetree").showNodes(treeNode.children)
								}
							}
							
						}
				};
				$.fn.zTree.init($("#alliance_main_alliancetree",$thispage), setting, data.datas);
				if(alliance_id){
					var zTreeObj=$.fn.zTree.getZTreeObj("alliance_main_alliancetree");
					var nodeObj=zTreeObj.getNodeByParam("id",alliance_id, null);
					var pathOfOne = nodeObj.getPath();
					if(pathOfOne && pathOfOne.length>0){ 
						for(var i=0;i<pathOfOne.length-1;i++){
							zTreeObj.expandNode(pathOfOne[i],true);
						}
					}
				}
			}
		});
	}
	
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