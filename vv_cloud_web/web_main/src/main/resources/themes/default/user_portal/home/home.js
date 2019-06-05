define([ 'jquery', 'corectr', "templateweb"], function($, corectr) {

	
	
	/* ======================= 业务模块强制的开发规范 ======================= */
	var _initoptions=function(opts){
		opts.$todom=$(".tms4Index_cont_lyt");
		
	}
	/* 修正初始化数据 */
	var _initdataconvert = function(renderdata) {
		
		return renderdata;
	};
	
	/* 模块页面初始化操作 */
	var _viewinit = function($thispage, renderdata) {
/*		corectr.loadMoudle({
			$todom:$("#home_todo_lyt",$thispage),
			module:"/xxxx/xxx/xxx/xx",
			initdata_param:{
				param:{
					
				},
				pageVo{
					pageSize:,
					pageNumber:
				}
			},
			initdata_url:"xxxx/xxx/xxxx"
		})*/
		corectr.loadmodule({
			module : "user_portal/home/home_sidebar",
			$todom : $("#home_sidebar_lyt", $thispage)
		});
		corectr.loadmodule({ 
    		module : "user_portal/home/home_todo",
    		$todom : $("#home_todo_lyt", $thispage)
    	});
		corectr.loadmodule({ 
    		module : "user_portal/home/mod/home_performance",
    		$todom : $("#home_performance_lyt", $thispage)
    	});
		corectr.loadmodule({ 
    		module : "user_portal/home/mod/home_business",
    		$todom : $("#home_business_lyt", $thispage),
    		ajaxopts:{contentType:"application/x-www-form-urlencoded",type:"get"},
            initdata_url:"http://127.0.0.1:9094/icenter/home/biztracking/more/list/zhangpengfei/1551061372232/1551061572232/%E4%B8%9A%E5%8A%A1%E7%B1%BB%E5%9E%8B/%E5%8C%BB%E9%99%A21/1/10"
    	});
		corectr.loadmodule({ 
    		module : "user_portal/home/mod/home_inform",
    		$todom : $("#home_inform_lyt", $thispage)
    	});
		corectr.loadmodule({ 
    		module : "user_portal/home/mod/home_warning",
    		$todom : $("#home_warning_lyt", $thispage)
    	});
		corectr.loadmodule({ 
    		module : "user_portal/home/mod/home_chart1",
    		$todom : $("#home_chart1_lyt", $thispage)
    	});
		corectr.loadmodule({ 
    		module : "user_portal/home/mod/home_chart2",
    		$todom : $("#home_chart2_lyt", $thispage)
    	});
		
		//首页设置 按钮
        /*$('.tms4HomeIndex_setbtn').on('click',function () {
        	corectr.v.popup({
                title: "首页配置",
                width: 1000,
                height: 700,
                url: "user_portal/sub_home/home_set.html",
                //content: "可以异步加载的内容,也可以是静态内容",
                content: function ($wrap, instance) {
                    var $resource = $("#resourceModules", $wrap);
                    var $target = $("#targetModules", $wrap);
                    var cm = customModules($resource, $target);
                    instance.data("cm", cm);

                    //确定
                    $('#submit').on('click',function () {
                        var resultArr;
                        $("#targetModules", $wrap).children().each(function (i) {
                            var cm = instance.data("cm");
                            resultArr = cm.result();
                        })
                        console.log(resultArr);
                    });

                },
                modalCloseable: false,
                //modal:false
            })
        });*/
	};

	/* 模块页面事件绑定 */
	var _eventbind = function($thispage, renderdata, opts) {
		
	};
	
	var _uninstall=function(){
		console.log("离开首页");
	}
	return {
		initoptions:_initoptions,
		initdataconvert : _initdataconvert,
		viewinit : _viewinit,
		eventbind : _eventbind,
		uninstall:_uninstall
	};
});