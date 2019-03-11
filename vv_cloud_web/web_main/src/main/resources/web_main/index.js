define([],function(){	
	/**
	 * require.config配置信息
	 */
    require.config({
    	baseUrl: web_mainpath,
        urlArgs: version,
        waitSeconds: 0,//控制js加载超长时间，由于国内网络的不稳定，暂时为0不超时
        paths: {
        	/**
        	 * 本系统模块化js
        	 */
        	thirdparty:'core/thirdparty',
        	plugin:'core/plugin',
        	themes:'core/themes',
        	
        	web_main:'web_main',
        	web_pub:'web_pub',
        	
            /**
             * 系统架构核心js
             */ 
            corectr:'core/plugin/corejs/corectr',
            sysinit:'core/plugin/corejs/sysinit',
            
            /**
             * 第三方组件包
             */ 
            jquery:'core/thirdparty/jquery/2.2.4/jquery.min',
            router:'core/thirdparty/router/1.2/q',
            templateweb:'core/thirdparty/art-template/4.0/template-web',
            text:'core/thirdparty/text/text',
            validate:'core/thirdparty/jquery-validation-1.19.0/jquery.validate',
            validate_zh:'core/thirdparty/jquery-validation-1.19.0/localization/messages_zh',
            webuploader:'core/thirdparty/webuploader/0.1.5/webuploader',
            rebox:'core/thirdparty/rebox/jquery-rebox',
            ztree:'core/thirdparty/zTree/js/jquery.ztree.all.min',
            ztreeExhide:'core/thirdparty/zTree/js/jquery.ztree.exhide.min',
            echarts:'core/thirdparty/echarts/echarts',
            vEchartsSkin:'core/plugin/corejs/vEchartsSkin/vEchartsSkin'
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
    require(['jquery','corectr','sysinit','router',"plugin/corejs/coreform"],function($,corectr,sysinit,router) {
    	window.onunload =function(){
    		localStorage.setItem("onunload","window.unload");
    	}
    	$(document).ready(function() {  		
    		localStorage.setItem("lastname", "Gates");
    		console.info("web_mainpath：",web_mainpath);
    		
    		/*
    		 * 前端路由，地址发生变化触发，加载业务模块
    		 */ 
    		router.reg("pop",function(rule,modulepath,param){
    			var uri="";
    			var mainLyt="";
    			//加载不同的页面框架，复杂头部，简单头部，无头部
    			var mainLytUriMap=["web_main/frame_complex/frame_complex","web_main/frame_simple/frame_simple","web_main/frame_only/frame_only"];
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
        				module :uri
        			});
    			}
    		});
    		router.reg(["platform"],function(modulepath,param){
    			// 加载模块
    			corectr.loadmodule({
    				module : "web_main/framelr/framelr",
    				initdata_param:{
    					sys:modulepath
    				}
    			});
    		});
    		router.reg(["tms"],function(modulepath,param){
    			// 加载模块
    			corectr.loadmodule({
    				module : "web_main/tms/tms",
    				initdata_param:{
    					sys:modulepath
    				}
    			});
    		});

    		router.reg(["testJump"],function(modulepath,param){
    			var $iframe=$('<iframe id="tmsIframe" width="100%" height="100%" marginwidth="0" marginheight="0" frameborder="0" scrolling="no"></iframe>');
                $iframe.attr('src','http://localhost:9090/TMS/');
    			$('.tms4Index_cont_lyt').html($iframe);
    		});
    		
    		router.reg(["ylt"],function(modulepath,param){
    			var $iframe=$('<iframe id="ylt" width="100%" height="100%" marginwidth="0" marginheight="0" frameborder="0" scrolling="no"></iframe>');
                $iframe.attr('src','http://localhost:9090/TMS/');
    			$('.tms4Index_cont_lyt').html($iframe);
    		});

    		router.reg(/^(\w+)\/(?:\w+\/?)+(?!\/)$/,function(modulepath,param,sys){
    			var uri="";
    			var dtd_lyt=null;
    			if(sys.indexOf("web_")==0){
    				uri=modulepath;
    			}else{
        			if(!$("[lyt='"+sys+"']").length&&(!(param&&param.load_style)||param.load_style!="only")){
        				dtd_lyt=corectr.loadmodule({
            				module : "web_main/framelr/framelr",
            				initdata_param:{
            					param:{
            					   sys:sys
            					},
            					pageVo:{
            						
            					}
            				}
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
				module : "web_main/mainManage/top/top_lyt",
				$todom : $ind_top
				//clear:false,
				//param:{ }
			});*/
    		
    	});
    });
    
});