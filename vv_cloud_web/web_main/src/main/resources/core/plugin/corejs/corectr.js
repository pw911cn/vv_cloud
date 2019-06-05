define([ 'jquery', 'templateweb', 'plugin/corejs/v/0.2.1/v.min'], function($, template, v) {
	/**
	 * 配置arttemplate相关参数
	 */
	// 原始语法的界定符规则
	// template.defaults.rules[0].test =
	// /<%(#?)((?:==|=#|[=-])?)[\t]*([\w\W]*?)[ \t]*(-?)%>/;
	/**
	 * 元信息
	 */
	var _opts = {
		/*
		 * 传入参数
		 */
		module : "",// 将要加载的功能模块
		initdata_param : "",// 加载功能模块初始化数据所需要的入参====
		initdata_url : "",
		$todom : $("body"),// 追加到前端dom节点,默认值：主操作区dom
		router : false,// 是否启用，路由加载（浏览器地址栏变动）
		clear : true,// 是否清空$todom
		noappend : false,

		/*
		 * 内部参数
		 */
		htmlpage_templ : "",// html原始模板页面
		renderdata : "",// html模板页面初始化数据
		htmlpage_render : "",// html模板页面渲染数据完成
		$htmlpage : "",// 最终返回的html页面query对象：如果存在页面初始化数据，为渲染数据后的html；否则为原始的html

		dtd : null,// promise对象
		errormsg : {
			error_bizctr_rtn : "规范如下：\n" + "return {\n" + "	initdataconvert : function($page){\n" + "	},\n"
					+ "	viewinit : function($page){\n" + "	},\n" + "	eventbind : function($page){\n" + "	}\n" + "};\n"
		},
		isdebug:true

	};

	/**
	 * 加载模块 1、加载模块html(ajax) 2、追加模块html到指定区域 3、加载模块html所匹配的js
	 */
	var _loadmodule = function(options) {
		/*
		 * loadmoudle如果有依赖关系，可以链式调用
		 */
		var dtd = $.Deferred();

		/*
		 * build main options before element iteration
		 */

		var opts = $.extend({}, _opts, options);


		/**
		 * 通过requirejs加载业务模块
		 */
		require([ opts.module ], function(module) {
			/**
			 * 校验biz_js函数结构规范
			 */

			/***option扩展****/
			if (module.initoptions&&module.initoptions != null&&'function' == typeof (module.initoptions)) {
				module.initoptions(opts);
			};
			
			var isdebug=opts.isdebug;
			
			if (module.viewinit == null || 'function' != typeof (module.viewinit)) {
				console.error(opts.module + ".js,\n文件内return{}中缺少viewinit:function(){},\n："
						+ opts.errormsg.error_bizctr_rtn);
				return;
			}
			;
			if (module.eventbind == null || 'function' != typeof (module.eventbind)) {
				console.error(opts.module + ".js,\n文件内return{}中缺少eventbind:function(){},\n："
						+ opts.errormsg.error_bizctr_rtn);
				return;
			}
			;

			//var module_url = opts.module;

			/**
			 * 加载模块，静态页面模板
			 */
			var req_url_html=requirejs.toUrl(opts.module);
			if(req_url_html.indexOf(".js")!=-1){
				req_url_html=req_url_html.replace(".js",".html");
			}else if(req_url_html.indexOf("?")!=-1){
				req_url_html=req_url_html.split("?")[0]+".html"+"?"+req_url_html.split("?")[1];
			}else{
				req_url_html=req_url_html.split+".html";
			}
			
			var htmlpage_url = opts.moduletpl|| req_url_html;
			if (isdebug) {
				console.info("corectr==>_loadmodule==>"+ opts.module+"==>htmlpage_url:", htmlpage_url);
			}
			;
			
			if (isdebug) {
				console.info("通过requirejs加载业务模块的js:corectr==>_loadmodule:", opts.module);
			}
			
			var $ajax_htmlpage_dtd = $.ajax({
				type : "GET",
				async : true,
				cache : false,
				url : htmlpage_url
			});

			/**
			 * 加载模块，静态页面模板渲染数据。<br>
			 * 获取到的为ajax请求dtd对象
			 */
			// 渲染数据
			var renderdata = null;
			// $ajax_renderdata_dtd对象，用于线程并发时，控制ajax完成状态的处理
			var $ajax_renderdata_dtd = null;
			
			if (isdebug) {
				console.info("corectr==>_loadmodule==>"+ opts.module+"==>opts.initdata_url:", opts.initdata_url);
			}
			
			//获取数据的ajax设置
			var ajaxopts={
					type : "post",
					dataType : "json",
					async : true,
					cache : false,
					url : opts.initdata_url,
					data: opts.initdata_param
			};
			if(opts.ajaxopts){
				ajaxopts=$.extend({},ajaxopts,opts.ajaxopts);
			}
			if(ajaxopts.contentType&&ajaxopts.contentType!="application/json"){
				
			}else{
				ajaxopts.data=JSON.stringify(ajaxopts.data);
			}
			
			if(opts.initdata_url != null && opts.initdata_url != ""){
				$ajax_renderdata_dtd = $.ajax(ajaxopts);
			}else if(opts.renderdata!=null){
				$ajax_renderdata_dtd=opts.renderdata;
			}
			
			
			/**
			 * 通过$.Deferred()控制，两个并发的ajax请求，都响应成功后的处理
			 */
			$.when($ajax_htmlpage_dtd, $ajax_renderdata_dtd).then(function(htmltempl_response, renderdata_response) {
				if (isdebug) {
					console.info("corectr==>_loadmodule==>"+ opts.module+"==>htmltempl_response:", htmltempl_response);
				}
				
				if (isdebug) {
					console.info("corectr==>_loadmodule==>"+ opts.module+"==>renderdata_response:", renderdata_response);
				}
				
				/*
				 * 通过arttemplate组件，将初始化数据渲染到html模板中
				 */
				opts.htmlpage_templ = htmltempl_response[0];
				if (renderdata_response == null) {
					// 无渲染数据
					htmlpage_render = template.render(opts.htmlpage_templ, opts.renderdata);
					opts.$htmlpage = $(htmlpage_render);
				} else {
					// 有渲染数据
					if(opts.initdata_url != null && opts.initdata_url != ""){
						opts.renderdata = renderdata_response[0];
					}else{
						opts.renderdata = renderdata_response;
					}
					
					/* 回调函数：修正初始化数据 */
					if (module.initdataconvert&&module.initdataconvert != null&&'function' == typeof (module.initdataconvert)) {
						opts.renderdata = module.initdataconvert(opts.renderdata);
					};

					htmlpage_render = template.render(opts.htmlpage_templ, opts.renderdata);
					opts.$htmlpage = $(htmlpage_render);
				}
				;

				/*
				 * 在将业务模块追加到指定dom前，是否清理内部子元素
				 */
				if (opts.clear && opts.$todom) {
					opts.$todom.trigger("uninstall.corectr");
					opts.$todom.off("uninstall.corectr")
					opts.$todom.find("*").each(function(){
						if($(this).find("iframe").length>0){
							$(this).find("iframe").each(function(){
								this.contentWindow.document.write('');//清空iframe的内容
								this.contentWindow.close();//避免iframe内存泄漏
								$(this).remove();//删除iframe
							});

						}
						$(this).trigger("uninstall.corectr")
						$(this).off().remove();
					})
				}
				
				/**插入dom前对opts.$htmlpage进行处理**/
				if (module.beforeappend&&module.beforeappend != null&&'function' == typeof (module.beforeappend)) {
					var beforeappend=module.beforeappend(opts.$htmlpage,opts.renderdata,opts);
					if(beforeappend){
						opts.$htmlpage=beforeappend;
					}
				};
				

				opts.$htmlpage.appendTo(opts.$todom);
				
				opts.$todom.on("uninstall.corectr",function(){
					module.uninstall(opts.$htmlpage, opts.renderdata, opts);
				});

				/**
				 * 回调函数
				 * 入参：第一个为$thispage,第二个为renderdata,第三个为请求options<br>
				 */
				/* 模块页面初始化操作 */
				module.viewinit(opts.$htmlpage, opts.renderdata, opts);
				/* 模块页面事件绑定 */
				module.eventbind(opts.$htmlpage, opts.renderdata, opts);

				/*
				 * $.Deferred执行成功后，$.when().then(rtnJson)，返回的参数对象rtnJson
				 */
				dtd.resolve({
					module : module,
					renderdata : opts.renderdata
				});

			}, function(error) {
				dtd.reject();
				v.hideLoading();
			});
		});

		return dtd.promise();
	};

	return {
		loadmodule : _loadmodule,
		v : v
	};

});