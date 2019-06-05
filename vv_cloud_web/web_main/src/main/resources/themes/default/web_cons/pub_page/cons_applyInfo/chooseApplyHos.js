define([ 'jquery', 'corectr'], function($, corectr) {

	
 
	/* ======================= 业务模块强制的开发规范 ======================= */
	var _initoptions=function(opts){
		
		
	}
	/* 修正初始化数据 */
	var _initdataconvert = function(renderdata) {
		
		return renderdata;
	};
	
	/* 模块页面初始化操作 */
	var _viewinit = function($thispage, renderdata,opts) {
		table=null;
		var data={}
		data.param={
	            menuId:opts.initdata_param.menu_id
			}
		data.pageVo={

		}
		 
		initTable($thispage,data,opts);
	
	};

	/* 模块页面事件绑定 */
	var _eventbind = function($thispage, renderdata, opts) {
		$("#hos_addBtn",$thispage).on("click",function(){
		 
				corectr.v.popup({
	                width: 1000,
	                height: 800,
	                title: "新增",
	                type:"GET",
	                content:function($wrap, instance){ 
	                	corectr.loadmodule({ 
	                		module : "web_base/hos/hos_add/hos_add",
	                		$todom : $wrap,
	                		vpopup:instance,
	                		initdata_param:{
	                			menuId:opts.initdata_param.menu_id
	                		}
	                		
	                		 
	                	});
	                },
	                closeCallback:function($wrap, instance){
	                    
	                	table.refresh();
	                }
	        
			})
			
		})
	};
	function initTable($thispage,data,opts){
		
    	if(!table){
            // 变量table是表格实例
            table =corectr.v.table({
                // 承载表格的容器
                el: $(".platmana_comlist_tablewrap",$thispage),
                // 定义表格列
                columns: [
                    {
                        title: "医院名称",
                        width: 300,
                        align: "center",
                        // 该列分配表格剩余宽度的比例，默认值1
                        // 缩放比例是0将固定宽度
                        scale: 3,
                        render: "rowData.org_name"
                    },
                    {
                        title: "省", width: 300,
                        align: "center",
                        render:  "rowData.province"

                    },
                    {
                        title: "操作", width: 300,
                        align: "center",
                        render: function(data,table){
                        	 //创建多个按钮
                            var $btnwrap = $("<div class='xBtn-multi'></div>");                            
                            var $btn0 = $("<button class='xBtn xBtn-default' type='button' >选择</button>");
                            $btn0.on('click',function () {                            	 
                            	choose(data.rowData.org_id,data.rowData.org_name,opts);
                            	 
                            });
                            $btn0.appendTo($btnwrap); 
                            $btnwrap.appendTo(data.$td);
                        }

                    }
                ],
                // 有分页
                pagination:data.pageVo,
                // 表格发送请求并渲染返回的数据，与$.ajax()用法相同
                ajax: {url: sys_config.base_serverpath+"/base_org_hosp/list",
                	data:{param:data.param},
                	success:function(data){
                 	var pageVo=data.datas; 
                	data=pageVo;
                	
                	}
                }
          
            })
    	}else{
    		console.log(data)
    		table.ajax({data:data});
    	}
	}
	
	function choose(chooseVal,chooseName,opts){		
		 
		opts.vpopup.data("choose_hosId",chooseVal);		
		opts.vpopup.data("choose_hos_name",chooseName);		
		opts.vpopup.remove();	
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