define([ 'jquery', 'corectr','util'], function($, corectr,util) {



    /* ======================= 业务模块强制的开发规范 ======================= */
    var _initoptions=function(opts){
        opts.$todom=$(".home_todo_cont");

    }
    /* 修正初始化数据 */
    var _initdataconvert = function(renderdata) {
    	//debugger;
        console.log("待办数据");
        console.log(renderdata);
        for(var i=0; i<renderdata.length; i++){
        	var obj = util.datediffer(parseInt(renderdata[i].time));
        	if(obj.day != ''){
        		renderdata[i].interval=obj.day+'天前';
        	}else if(obj.hour != ''){
        		renderdata[i].interval=obj.hour+'小时前';
        	}else if(obj.min != ''){
        		renderdata[i].interval=obj.min+'分钟前';
        	}else{
        		renderdata[i].interval='刚刚';
        	}
        	renderdata[i].time = util.dateFormat('yyyy-MM-dd hh:mm:ss',parseInt(renderdata[i].time));
//        	var hospital = renderdata[i].reqHospital.split(",");
//        	var department = renderdata[i].reqHospital.split(",");
//        	var obj={};
//        	var array=[];
//        	for(var i=0;i<hospital.length;i++){
//        		if(hospital[i]){
//        			obj.reqHospital=hospital[i];
//        			//obj.deptName=
//        		}
//        	}
        	
        }
        if(renderdata instanceof Array){
        	renderdata={datas:{datas:renderdata}};
        }else{
        	renderdata={datas:{datas:renderdata.data,countAll:renderdata.countAll,pageIndex:renderdata.pageIndex}}
        }
        return renderdata;
    };

    /* 模块页面初始化操作 */
    var _viewinit = function($thispage, renderdata) {

    };

    /* 模块页面事件绑定 */
    var _eventbind = function($thispage, renderdata, opts) {
    	$(".home_todo_list li").on('click',function(){
    	});

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