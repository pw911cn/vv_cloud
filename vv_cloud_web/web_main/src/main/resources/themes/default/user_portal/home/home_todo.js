define([ 'jquery', 'corectr' ], function($, corectr) {

	
	
	/* ======================= 业务模块强制的开发规范 ======================= */
	var _initoptions=function(opts){
		opts.$todom=$(".tms4HomeIndex_todo_lyt");
		
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
            module : "user_portal/home/home_todo_list",
            $todom : $(".home_todo_list", $thispage),
            ajaxopts:{contentType:"application/x-www-form-urlencoded",type:"get"},
            initdata_url:"http://127.0.0.1:9094/icenter/home/schedule/list/1da69baec98d4160956f7e8e8e96dedf/asc"
        });
		
	};

	/* 模块页面事件绑定 */
	var _eventbind = function($thispage, renderdata, opts) {
		$(".home_todo_header .home_todo_order .dropdown #descOrder").on("click",function(){
			var orderType="";
			if($(this).hasClass("descOrder")){
                $(this).removeClass("descOrder");
                $(this).html("发生时间降序");
                orderType = "asc";
			}else{
                $(this).addClass("descOrder");
                $(this).html("发生时间升序");
                orderType = "desc";
			}
            corectr.loadmodule({
                module : "user_portal/home/home_todo_list",
                $todom : $(".home_todo_list", $thispage),
                ajaxopts:{contentType:"application/x-www-form-urlencoded",type:"get"},
                initdata_url:"http://127.0.0.1:9094/icenter/home/schedule/list/zhangpengfei"+"/"+ orderType
            });
        });

        $(".home_todo_footer button").on("click",function(){
            var orderType="";
            if($(this).hasClass("descOrder")){
                $(this).removeClass("descOrder");
                $(this).html("发生时间降序");
                orderType = "asc";
            }else{
                $(this).addClass("descOrder");
                $(this).html("发生时间升序");
                orderType = "desc";
            }
            corectr.loadmodule({
                module : "user_portal/home/home_todo_list",
                $todom : $(".home_todo_list", $thispage),
                clear:false,
                ajaxopts:{contentType:"application/x-www-form-urlencoded",type:"get"},
                initdata_url:"http://127.0.0.1:9094/icenter/home/schedule/more/list/zhangpengfei/1551059273627/1551059434411/empty/%E5%8C%BB%E9%99%A21/1/10"
            });
        });
        $(".home_todo_header .home_todo_oper button").on("click",function () {
            _viewinit();
            _reset();
        })
		
	};
	var _reset=function(){
		$("#descOrder").html("发生时间升序");

	}
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