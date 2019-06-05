define([ 'jquery', 'corectr'], function($, corectr) {

	
	var users_list=null
	/* ======================= 业务模块强制的开发规范 ======================= */
	var _initoptions=function(opts){
		
		
	};
	/* 修正初始化数据 */
	var _initdataconvert = function(renderdata) {
		
		return renderdata;
	};
	
	/* 模块页面初始化操作 */
	var _viewinit = function($thispage, renderdata,opts) {
		$(".selected_list",$thispage).activeTag({
			type:"user",
			key:{
				text:"role_name",
				id:"role_id"
			},
			data:opts.vpopup.data("initrole")?opts.vpopup.data("initrole"):[],
			callbacks:{
				empty:function(el){
					$("#doc_adjust_addrole .nodata",$thispage).show();
					$("#pagewrap",$thispage).find("*").remove();
				},
				fill(el){
					$("#doc_adjust_addrole .nodata",$thispage).hide();
				}
			}
			
		});
		users_list={
			isinit:false,
			pageNumber:1,
			pageSize:10,
			total:0,
			role_name:"",
			ajax:function(fresh){
				var me=this;
				var userdata={param:{},pageVo:{}};
				userdata.param.role_name=me.role_name;
				userdata.pageVo.pageNumber=me.pageNumber;
				userdata.pageVo.pageSize=me.pageSize;
				userdata.param.menuId=renderdata;

				$.ajax({
					url:sys_config.base_serverpath+"/power/roleList",
					data:JSON.stringify(userdata),
					success:function(data){
						me.total=data.datas.total;
						var renderdata=data.datas.datas;
						if(!me.isinit){
							me.isinit=true;
							var settings={
								type:"user",
								edit:false,
								key:{
									text:"role_name",
									id:"role_id"
								},
								data:renderdata,
								callbacks:{
									wrapclick:function(data,wrap){
										$(".selected_list",$thispage).activeTag().add(data);
									},
									empty:function(el){
										$("#doc_adjust_rolelist .nodata",$thispage).show();
										$("#pagewrap",$thispage).find("*").remove();
									},
									fill(el){
										$("#doc_adjust_rolelist .nodata",$thispage).hide();
									}
								}
	
							}
							$(".all_list",$thispage).activeTag(settings);
						}else{
							$(".all_list",$thispage).activeTag().refresh(renderdata);
						}
						if(!data.datas.datas.length){
							return;
						}
						corectr.v.pagination({
							// 承载分页的容器
							el: $("#allpagewrap",$thispage),
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
	};

	/* 模块页面事件绑定 */
	var _eventbind = function($thispage, renderdata, opts) {
		  $("#doc_adjust_removeall",$thispage).on("click",function(){
			 $(".selected_list",$thispage).activeTag().delall(); 
		  });
		  $("#doc_adjust_cancle",$thispage).click(function(){
			  	opts.vpopup.remove();
		  });
  		  $("#doc_adjust_save",$thispage).click(function(){
  			  	var data=$(".selected_list",$thispage).activeTag().getData();
	 			opts.vpopup.data("closeType","submit");
	 			opts.vpopup.data("rolelist",data);
	 			opts.vpopup.remove();
		  });
  		  $("#doc_adjust_search",$thispage).click(function(){
  			  users_list.role_name=$("#doc_adjust_searchinput",$thispage).val();
  			  users_list.ajax();
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