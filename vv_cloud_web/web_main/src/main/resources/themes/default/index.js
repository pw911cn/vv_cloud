define([],function(){	
	/**
	 * require.config配置信息
	 */
    require.config({
    	baseUrl:"../../",
        urlArgs:sys_config.version,
        waitSeconds: 0,//控制js加载超长时间，由于国内网络的不稳定，暂时为0不超时
        paths: {
        	/**
        	 * 本系统模块化js
        	 */
        	libs:'libs',
        	thirdparty:'libs',
        	plugin:'core/plugin',
        	plat_frame:'themes/default/plat_frame',
        	subsys_frame:'themes/default/subsys_frame',
        	user_portal:'themes/default/user_portal',
        	web_base:'themes/default/web_base',
        	web_cons:'themes/default/web_cons',
        	
        	
        	
            /**
             * 系统架构核心js
             */ 
            corectr:'core/plugin/corejs/corectr',
            sysinit:'core/plugin/corejs/sysinit',
            
            /**
             * 第三方组件包
             */ 
            jquery:'libs/jquery/2.2.4/jquery.min',
            router:'libs/router/1.2/q',
            templateweb:'libs/art-template/4.0/template-web',
            text:'libs/text/text',
            validate:'libs/jquery-validation-1.19.0/jquery.validate',
            validate_zh:'libs/jquery-validation-1.19.0/localization/messages_zh',
            webuploader:'libs/webuploader/0.1.5/webuploader',
            rebox:'libs/rebox/jquery-rebox',
            ztree:'libs/zTree/js/jquery.ztree.all.min',
            ztreeExhide:'libs/zTree/js/jquery.ztree.exhide.min',
            echarts:'libs/echarts/echarts.min',
            vEchartsSkin:'core/plugin/corejs/vEchartsSkin/vEchartsSkin',
            util:'core/plugin/corejs/util/util',
            ueditor:'libs/ueditor/1.0/ueditor.all',
            ueditorConfig:'libs/ueditor/1.0/ueditor.config',
            ZeroClipboard:'libs/ueditor/1.0/third-party/zeroclipboard/ZeroClipboard',
            ueditorZhCn:"libs/ueditor/1.0/lang/zh-cn/zh-cn",
            WdatePicker:"libs/My97DatePicker/4.8/WdatePicker",
            clickscrolls:'libs/clickscrolls/clickscrolls_only'
        },
    	//依赖加载
    	deps:[
    		"jquery",
    		"plugin/corejs/fuzzySearch/fuzzySearch",
    		"plugin/corejs/formcreater/formcreater",
    		"plugin/corejs/vValidate/vValidate",
    		"plugin/corejs/zUploader/zUploader",
    		"ztree",
    		"ztreeExhide",
    		"plugin/corejs/initSelect/initSelect",
    		"plugin/biz/activeTag/activeTag",
    		"plugin/corejs/initForm/initForm"
		],
        shim: {
        	router: {
                deps: ['jquery'],
                exports: 'Q'
            },
            v:{
            	deps:["jquery"]
	        },
	  		webuploader:{
	 			deps:["jquery"],
	   			exports: "webuploader"
			},
			ztree:{
				deps:["jquery"]
			},
			ztreeExhide:{
				deps:["ztree"]
			},
			ueditor:{
				deps:["ueditorConfig"]
			},
			ueditorZhCn:{
				deps:["ueditorConfig","ueditor"]
			}
			
       }
    });
    /*
    require.onError = function (err) {
        console.log(err.requireType);
        if (err.requireType === 'timeout') {
            console.log('modules: ' + err.requireModules);
        }
        alert("您要加载的模块不存在");
        //throw err;
    };*/
	/**
	 * require启动入口，加载模块js
	 */
    require(['jquery','corectr','sysinit','router','util',"plugin/corejs/coreform"],function($,corectr,sysinit,router,util) {
    	$(document).ready(function() {
    		sysinit.initSysParam();
    		$(window).on("message",function(ev){
    			var event=ev.originalEvent;		
    			v.getPopupInstance(event.data).remove();
    		});
    		
    		/*
    		 * 前端路由，地址发生变化触发，加载业务模块
    		 */ 
    		router.reg("pop",function(rule,modulepath,param){
    			var uri="";
    			var mainLyt="";
    			//加载不同的页面框架，复杂头部，简单头部，无头部
    			var mainLytUriMap=["plat_frame/frame_complex/frame_complex","plat_frame/frame_simple/frame_simple","plat_frame/frame_only/frame_only"];
    			var mainLtyMap=["frame_complex","frame_simple","frame_only"];
    			if(!param||!param.mainlyt){
    				uri=mainLytUriMap[0];
    				mainLyt=mainLtyMap[0];
    			}
    			if(param&&param.mainlyt){
    				uri=mainLytUriMap[param.mainlyt];
    				mainLyt=mainLtyMap[param.mainlyt];
    			}
    			if(!$("[lyt='"+mainLyt+"']").length){
    				return corectr.loadmodule({
        				module :uri,
        				$todom:$("body")
        			});
    			}
    		});
    		router.reg(["platform","light"],function(modulepath,param){
    			// 加载模块
    			param=param||{}
    			param.sys=modulepath;
    			param.menu_id=$(".sysnav [url='#"+modulepath+"']").attr("menu_id");
    			corectr.loadmodule({
    				module : "subsys_frame/framelr/framelr",
    				renderdata:param,
    				$todom:$("#indexContainer")
    			});
    		});
    		
    		router.reg("user_portal/home/home",function(modulepath,param){
    			// 加载模块
    			param=param||{}
    			corectr.loadmodule({
    				module :modulepath,
    				renderdata:param,
    				$todom:$("#indexContainer")
    			});
    		});

    		router.reg(/^(\w+)\/(?:\w+\/?)+(?!\/)$/,function(modulepath,param,sys){
    			var uri="";
    			var dtd_lyt=null;
    			if(sys.indexOf("web_")==0||sys.indexOf("user_portal")==0){
    				uri=modulepath;
    			}else{
        			if(!$("[lyt='"+sys+"']").length&&(!(param&&param.load_style)||param.load_style!="only")){
        				var param_flr={};
        				param_flr.menu_id=$(".sysnav [url='#"+sys+"']").attr("menu_id");
        				param_flr.sys=sys;
        				console.log(param_flr)
        				dtd_lyt=corectr.loadmodule({
            				module : "subsys_frame/framelr/framelr",
            				renderdata:param_flr,
            				$todom:$("#indexContainer")
            			});
        			}
        			uri=modulepath.substring(modulepath.indexOf("/")+1);  
    			}
    			$.when(dtd_lyt).done(function(){
        			// 加载模块
        			corectr.loadmodule({
        				module : uri,
        				initdata_param:param
        			});
    				
    			});

    		});
    		
    		router.init({
    			key:""
    		})
/*    		*//**
    		 * 加载页面头部模块
    		 *//*
    		var $ind_top= $("#ind_top");
			corectr.loadmodule({
				module : "user_portal/mainManage/top/top_lyt",
				$todom : $ind_top
				//clear:false,
				//param:{ }
			});*/
    		
    	});
    });
    
});