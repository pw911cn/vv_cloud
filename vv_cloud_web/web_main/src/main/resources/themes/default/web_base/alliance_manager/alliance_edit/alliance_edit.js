define([ 'jquery', 'corectr'], function($, corectr) {

	
	var table;
	/* ======================= 业务模块强制的开发规范 ======================= */
	var _initoptions=function(opts){
	}
	/* 修正初始化数据 */
	var _initdataconvert = function(renderdata) {
		
		return renderdata;
	};
	
	/* 模块页面初始化操作 */
	var _viewinit = function($thispage, renderdata) {

		
	};

	/* 模块页面事件绑定 */
	var _eventbind = function($thispage, renderdata, opts) {
		var init=false;
		$("#alliance_edit_choosealli",$thispage).click(function(ev){
			ev.stopPropagation();
			if(!init){
				var data={param:{
					
				}};
				$.ajax({
					url:sys_config.base_serverpath+"/alliance/queryAlliance",
					data:JSON.stringify(data),
					success:function(data){
						var setting = {
								view: {
									dblClickExpand: false,
									selectedMulti: false
								},
								data: {
									simpleData: {
										enable: true
									}
								},
								callback: {
									onClick:function(e, treeId, treeNode){
										var zTree = $.fn.zTree.getZTreeObj("alliance_edit_choosetree"),
										nodes = zTree.getSelectedNodes(),
										alli_name= nodes[0].name,
										alli_id=nodes[0].id;
										$("#alliance_edit_allinput",$thispage).val(alli_name);
										$("#alliance_edit_alli_id",$thispage).val(alli_id);
									}
								}
						};
						$.fn.zTree.init($("#alliance_edit_choosetree",$thispage), setting, data.datas);
					}
				});
				init=false;
			}
			$("#alliance_edit_choosewrap",$thispage).show();
			$("body").on("mousedown", onBodyDown);
		});
		
		$("#alliance_edit_empty").on("click", function(ev){
			ev.stopPropagation();
			$("#alliance_edit_allinput",$thispage).val("");
			$("#alliance_edit_alli_id",$thispage).val("");
			$("#alliance_edit_choosewrap",$thispage).hide();
		});


		function hideMenu() {
			$("#alliance_edit_choosewrap",$thispage).hide();
			$("body").off("mousedown", onBodyDown);
		}
		function onBodyDown(event) {
			if (!(event.target.id == "menuContent" || $(event.target).parents("#alliance_edit_choosewrap").length>0)) {
				hideMenu();
			}
		}
		
		  $("#alliance_edit_save",$thispage).on("click",function(){
			  var data={};
			  data.param=$thispage.getformdata();
			  if(!$("#alliance_edit_form").valid()){
				  return
			  }
			  $.ajax({
					type :"post",					 
					url : sys_config.base_serverpath+"/alliance/saveAlliance",
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
		  $("#alliance_edit_cancle",$thispage).on("click",function(){
				opts.vpopup.remove();      
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