define(["jquery","webuploader","templateweb"], function ($,WebUploader,template) {
	//,"mulfile","mulpic"
	//当前已加载模板
	var haveMoudle={
		//"singlepic":singlepic,
		//"mulfile":mulfile,"mulpic":mulpic
	}
	
	
	//添加模板
	function _addMoudle(moudlename,options){
		require([moudlename],function(){
			haveMoudle[moudlename]=arguments[0];
			_createinit(options);
		});
	}
	
	//对外暴露接口
	function _init(options){
		var moudlename=options.moudlename;
		if(moudlename in haveMoudle){
			_createinit(options);
		}else{
		   _addMoudle(moudlename,options)
		}
	}
	
	//uploader
	function _createinit(options){
		// 检测浏览器兼容
		if (!WebUploader.Uploader.support()) {
			alert('您的浏览器不支持WebUploader!');
			throw new Error('WebUploader does not support the browser you are using.');
		}
		
		// 允许的文件扩展名
		var extension = "gif,jpg,jpeg,bmp,png,svg,ico," +
		"txt,rar,zip,7z," +
		"doc,xls,ppt," +
		"docx,xlsx,pptx," +
		".wps,dps,et,pdf";
		
		// 允许的mime
		var mimeTypes = "image/*,video/*,audio/*," +
			"application/pdf," +
			"application/vnd.ms-powerpoint,application/msword,application/vnd.ms-excel," +
			"application/vnd.openxmlformats-officedocument.wordprocessingml.document," +
			"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet," +
			"application/vnd.openxmlformats-officedocument.presentationml.presentation," +
			"application/application/x-visio," +
			"application/vnd.ms-works," +
			"application/x-rar-compressed,application/zip," +
			"text/plain," +
			"application/kswps,application/kset,application/ksdps," +
			"application/rtf,application/x-rtf,text/richtext," +
			"application/dicom,application/dicom+json,application/dicom+xml," +
			"application/octet-stream,"+
			"image/svg+xml,"+
			".doc,.xls,.ppt," +
			".docx,.xlsx,.pptx";
		
		// 禁止的mime/ js,exe,dll
		var disallowedReg = /javascript|x-msdownload/;
		
		//获取文件系统地址
		var SFSServer=(	function getSfsServerPre() {
			var sfsserver = "";
			var url = corectr.serverbath + "rest/bizService/report/getSfsServiceIp.ajax?key=sfs_server_url";
			$.ajax({
				url : url,
				async : false,
				success : function(result) {
					if(result.responseStatus==200){
						sfsserver=result.data.dictionaryvalue;
					}
				}
			});
			return sfsserver;

		})();
		
		//severd地址
		var uploadServer = SFSServer + "/file/uploadFile";
		var loadFileServer = SFSServer + "/file/loadFile";
		var uploadFileProcessServer = SFSServer + "/file/uploadFileProcess";
		
		//UI提供的模板
		var uitemplate=(function(){
			 var _uitemplate;
			 $.ajax({
				 	async : false,
		            url:basePath + "/resources/plugins/zUploader/template/uploader.html" ,
		            success: function (html) {
		            	_uitemplate = html;
		            }
	        })
	        var temarr=[];
			temarr.push($(_uitemplate).filter(".v_webUploader1"));
			temarr.push($(_uitemplate).filter(".v_webUploader2"));
			temarr.push($(_uitemplate).filter(".v_webUploader3"));
			return temarr;
		})();
		
		// 必要参数检查
		function requirements(arg) {
			if (!arg.moudlename) {
				throw new Error("uploader初始化错误, 必须传入server参数.");
			}
		}
		
		//业务及ui相关默认参数
		var bus_defaults = {
				//ui提供的模板
				uitemplate:uitemplate,
				// 00、待上传，01、上传中，10、上传完成，20、上传失败
				uploadStatus:[ '00', '01', '10', '20' ],
				// [可选] 默认值:"点击选择文件" 自定义按钮文字
				pickButtonText : "点击选择文件",
				// 下载地址
				loadFileServer:SFSServer + "/file/loadFile",
				//分块上传时合并文件进度
				uploadFileProcessServer:SFSServer + "/file/uploadFileProcess",
				//是否可删除
				removable : false,
		        //是否可编辑
		        isEdit:false,
		        //模板class，如背景等
				backgroundClass : "oralegimg0",
				containerClass : "upload_1",
				containerFontContent : ""
		};
		
		//检查必要参数
		requirements(options);
		
		//合并业务参数
		var bus_merge=$.extend(true,{},bus_defaults,options);
		
		//挂载点转jq对象
		var $todom=bus_merge.todom=$(bus_merge.todom);
		
		//调用对应模块的获取模板
		
		haveMoudle[options.moudlename].gettemplate(bus_merge);
		console.log($todom.find(".tms-report-upload").height());
		console.log($todom.find(".v_webUploader_holder").height());
		createUploader();
		function createUploader(){
			// 点选文件按钮
	        var pickBtn = $todom.find(".v_webUploader_holder");
			//uploader相关默认参数
			var upl_defaults = {
					server:uploadServer,
					chunked : true,// 开启分片上传
					chunkSize : 10 * 1024 * 1024,// 如果要分片，分多大一片？默认大小为5M
					chunkRetry : 3,// 如果某个分片由于网络问题出错，允许自动重传多少次
					threads : 1,// 上传并发数。允许同时最大上传进程数[默认值：3]			
					fileTypeError : function(json) {
				
						console.log("不允许上传  ", json.name);
					},
					removable : false,
					pick: {
	                    id: pickBtn.eq(0),
	                    // 允许多个文件
	                    multiple: true
	                },
	                // 是否自动生成删除按钮
	                removable: true,
	                // [可选] 默认 true:(上传成功自动显示缩略图), false:不按照默认逻辑显示缩略图等信息;
	                autoRender: true,
	                // auto {Boolean} [可选] [默认值：false] 设置为 true 后，不需要手动调用上传，有文件选择即开始上传。
	                auto: true,
	                // 同时最大上传进程数
	                threads: 2,
	                // 拖动上传的区域
	                // dnd: "#drag",
	                // {Selector} [可选] [默认值：false] 是否禁掉整个页面的拖拽功能，如果不禁用，图片拖进来的时候会默认被浏览器打开。
	                // disableGlobalDnd: true,
	                // 剪贴板监听范围
	                // paste: document.body,
	                // 指定接受哪些类型的文件
	                accept: {
	                    title: 'intoTypes',
	                    extensions: extension,
	                    mimeTypes: mimeTypes
	                },
	                // 配置生成缩略图的选项
/*	                thumb: {
	                    // width: 110,
	                    // height: 110,
	                    // 图片质量，只有type为`image/jpeg`的时候才有效。
	                    quality: 100,
	                    // 是否允许放大，如果想要生成小图的时候不失真，此选项应该设置为false.
	                    allowMagnify: false,
	                    // 是否允许裁剪。
	                    crop: false,
	                    // 为空的话则保留原有图片格式。
	                    // 否则强制转换成指定的类型。
	                    type: "image/jpeg"
	                },*/
	                // 配置压缩的图片的选项。如果此选项为false, 则图片在上传前不进行压缩。
	                compress: false,
	                // compress: {
	                // 	width: 1600,
	                // 	height: 1600,
	                // 	// 图片质量，只有type为`image/jpeg`的时候才有效。
	                // 	quality: 90,
	                // 	// 是否允许放大，如果想要生成小图的时候不失真，此选项应该设置为false.
	                // 	allowMagnify: false,
	                // 	// 是否允许裁剪。
	                // 	crop: false,
	                // 	// 是否保留头部meta信息。
	                // 	preserveHeaders: true,
	                // 	// 如果发现压缩后文件大小比原来还大，则使用原来图片
	                // 	// 此属性可能会影响图片自动纠正功能
	                // 	noCompressIfLarger: false,
	                // 	// 单位字节，如果图片大小小于此值，不会采用压缩。
	                // 	compressSize: 0
	                // },
	                // [可选]默认值：{} ,文件上传请求的参数表，每次发送都会发送此对象中的参数。
	                formData: options.formData || {},
	                // [可选] [默认值："POST"] 文件上传方式，POST或者GET。
	                method: "POST",
	                // {Object} [可选] [默认值：false] 是否已二进制的流的方式发送文件，这样整个上传内容都为文件内容， 其他参数在$_GET数组中。
	                // sendAsBinary: false,
	                // [可选] [默认值：undefined] 验证文件总数量, 超出则不允许加入队列。 回调fileNumLimitError;
	                fileNumLimit: undefined,
	                // [可选] [默认值：undefined] 验证文件总大小是否超出限制, 超出则不允许加入队列。
	                fileSizeLimit: 2048*1024*1024,
	                //[可选] [默认值：undefined] 验证单个文件大小是否超出限制, 超出则不允许加入队列。
	                fileSingleSizeLimit: undefined
			}
	        // 按钮文字
	        var pickButtonText = bus_merge.pickButtonText || "点击选择文件";
	        $todom.find(".v_webUploader_uploadText").text(pickButtonText);
	        var upl_config=haveMoudle[options.moudlename].getConfig(options)
	        var upl_options = $.extend(true, {}, upl_defaults,upl_config);
	        // 实例化
	        console.log(upl_options)
	        var uploader = new WebUploader.Uploader(upl_options);
	        
	        console.log($todom.find(".v_webUploader_holder"))
	        
	        
	        //获取附件
	        if(upl_options.bizid){
	        	$.ajax({
					url : corectr.serverbath + 'rest/bizService/report/getAttacments.ajax',
					data : {
						bizId:upl_options.bizid,
						attechmenttype : upl_options.attechmenttype,
						attechmentsubtype : upl_options.attechmentsubtype
					},
					success : function(result) {
						if(result.responseStatus==200){
							$.each(result.data, function(index, attvo) {
								console.log("attvo", attvo);
								haveMoudle[options.moudlename].view(attvo);
							});
						}

					}
				});
	        }
	        
	        // 生成缩略图
	        function getThumbnail(file, w, h) {            	
	            var dtd = WebUploader.Base.Deferred();
	            var width = w || 1, height = h || 1;
	            uploader.makeThumb(file, function (error, ret) {
	                if (error) {
	                    dtd.resolve();
	                } else {
	                    // 添加处理
	                    dtd.resolve(ret);
	                }
	            }, width, height);
	            return dtd.promise();
	        }

	        // 生成md5
	        function addMd5(file) {
	            var dtd = WebUploader.Base.Deferred();
	            // 生成md5
	            uploader.md5File(file)
	                .then(function (md5Result) {
	                    file.md5 = md5Result;
	                    dtd.resolve(md5Result);
	                });
	            return dtd.promise();
	        }

	        // 生成base64方法,不知道webuploader怎么生成base64. 如果知道webuploader怎么生成base64, 请替换该方法;
	        function base64(file) {
	            var dtd = WebUploader.Base.Deferred();
	            var reader = new FileReader();
	            reader.readAsDataURL(file.source.source);
	            reader.onload = function (e) {
	                file.base64 = e.target.result;
	                dtd.resolve(e.target.result);
	            }
	            // 添加处理
	            return dtd.promise();
	        }
	        
	        //上传成功后删除
//	        function removeHandler(file) {
//				var requestRemove = options.requestRemove;
//				if (requestRemove) {
//					// 删除按钮事件
//					$wrap.find(".v_webUploader_remove").on("click", function () {
//						requestRemove(file, function () {
//							uploader.reset();
//							$wrap.attr("class", startClass)
//						});
//					})
//				}
//			}

	        // 上传错误
	        function errorHandler(file) { 
	        	alert("上传失败，请重试");
	            var $file = $('#file' + file.id);
	            $file.remove();
	            uploader.removeFile(file,true);
	            if(upl_options.errorHandler){
	            	upl_options.errorHandler();
	            }

	        }
	        
			//当文件被加入队列之前触发，此事件的handler返回值为false，则此文件不会被添加进入队列。
			uploader.on("beforeFileQueued", function (file) {
				
				if (disallowedReg.test(file.type)) {
					var fileTypeError = options.fileTypeError;
					if (fileTypeError) {
						fileTypeError(file);
					}
					uploader.reset();
					return false;
				} else if (!file.md5) {	
					$.when(addMd5(file)).done(function ( md5) {
						file.md5 = md5;
						if($(bus_merge.resultDom,bus_merge.todom).find("*[data-vUploader-md5='" + md5 + "']").length>0){
							alert("请勿重复上传");
							return false;
						}
						//file.base64 = base64Result;
						uploader.addFile(file);
					})
					return false;
				}
			});
	        
	        function oralloadinglayershow(fileid) {
		    	var $body = $("body");
		    	var $oralloadinglayer = $('<div class="aci-oral-loadinglayer" id="doing'+fileid+'">' +
		    			'<div class="aci-oral-loading">' +
		    			'<div class="loadingicon"><i class="tms3-loading"></i></div>' +
		    			'<div class="loadingtext">文件正在上传，请耐心等待！</div>' +
		    			'</div>' +
		    			'</div>');
		    	$oralloadinglayer.appendTo($body);
		    	$oralloadinglayer.fadeIn(400);
		    }


		    function oralloadinglayerhide(fileid) {
		    	var $oralloadinglayer = $("#doing"+fileid);    	    	
		    	$oralloadinglayer.fadeOut(400,function(){
		    	   $oralloadinglayer.remove();
		    	});
		    }

	        //上传开始
	        uploader.on("uploadStart", function (file) {
	        	console.log(file.getSource());
	            if (upl_options.start) {
	            	upl_options.start(file);
	            }
	            bindBtns(file,'uploadStart');
	        });

	        uploader.on( 'uploadComplete', function( file ) {
	        	
	            bindBtns(file,'uploadComplete');                
	        });

	        function bindBtns(file,state) {
	            var $file =  $( '#file'+file.id );
	            if(state && state == 'uploadStart'){
	                $file.find('.operate_delete').on('click', function(){
	                    try {
	                        uploader.cancelFile(file);
	                    }
	                    catch(err) {
	                        console.err(err);
	                    }
	                    finally {
	                        $file.remove();
	                    }
	                });
	            } else if (state && state == 'uploadComplete') {
	                $file.find('.operate_delete').on('click', function(){
	                    try {
	                        uploader.removeFile(file,true);
	                    }
	                    catch(err) {
	                        console.err(err);
	                    }
	                    finally {
	                        $file.remove();
	                    }
	                });
	            }
	        }

	        // 当有文件被添加进队列的时候
	        uploader.on("fileQueued", function (file) {

	            if (upl_options.auto) {
	                uploader.upload(file);
	            } else {
	            	upl_options.uploader(uploader, file);
	            }
	        });

	        // 添加自定义数据
	        uploader.on('uploadBeforeSend', function (block, data, header) {   
	        	console.log("data",data);
	            var file = block.file;
	            var customData = file.customData || {};
	            $.extend(true, data, options.formData, customData);
	            data.md5 = file.md5;
	            //data.data = file.base64;
	            data.ext = file.ext;
	            
	            data.attechmenttype=upl_options.attechmenttype;
	            data.attechmentsubtype=upl_options.attechmentsubtype;
	            data.consultationId=upl_options.consultationId;
	            delete data.id;
	            delete data.lastModifiedDate;
	        });

	        // 文件上传中，Web Uploader会对外派送uploadProgress事件，其中包含文件对象和该文件当前上传进度。
	        uploader.on("uploadProgress", function (file, percentage) {
	            var percent = Math.floor(percentage * 90);
	            if (upl_options.progress) {
	                var json = {
	                    name: file.name,
	                    type: file.type,
	                    md5: file.md5,
	                    //thumbBase64: file.thumbBase64,
	                    percent: percent
	                }
	                upl_options.progress(json);
	            }
	        });

	        // 当文件上传出错时触发。
	        uploader.on("uploadError", function (file, reason) {
	        	alert(reason);
	            errorHandler(file);
	        	console.log("失败文件信息1：",file);
	        });
	       

	        //接收服务器返回信息
	        //这里才是接收服务器信息的地方,如果有出错就 `return false` 来停止上传
	        uploader.on('uploadAccept', function (file, json) {
	        	console.log("json==",json);
	            if (json.result) {
	                // call success handler
	                if (upl_options.success) {
	                    var size = upl_options.thumb;
	                    // 返回的上传对象实例
	                    json.uploader = {
	                        reset: function () {
	                            uploader.reset();
	                        }
	                    };
	                    //json.$thumb = $wrap.find(".v_webUploader_thumbnail");
	                    json.name2 = json.name.replace(/\.[\w|\d]*$/, "");
	                    json.ext = file.file.ext;
	                    /*if (size) {
	                        $.when(getThumbnail(file.file, size.width, size.height)).done(function (base64) {
	                            json.thumbBase64 = base64;
	                            json.base64 = file.file.base64;
	                            options.success(json);
	                        })
	                    } else {
	                        options.success(json);
	                    }*/
	                    upl_options.success(json);
	                }
	                // 上传成功处理
	                if(upl_options.successHandler){
	                	upl_options.successHandler(file, json);
	                }
	            } else {                	
	            	console.log("失败文件信息2：",file);
	                errorHandler(file);
	            }                
	        })


	        // Q_EXCEED_NUM_LIMIT 在设置了fileNumLimit且尝试给uploader添加的文件数量超出这个值时派送。
	        // Q_EXCEED_SIZE_LIMIT 在设置了Q_EXCEED_SIZE_LIMIT且尝试给uploader添加的文件总大小超出这个值时派送。
	        // Q_TYPE_DENIED 当文件类型不满足时触发。。
	        uploader.on("error", function (type) {
	            switch (type) {
	                case "Q_EXCEED_NUM_LIMIT":
	                	alert("文件过多");
	                    break;
	                case "Q_EXCEED_SIZE_LIMIT":
	                	alert("文件过大");
	                	break;
	                case "Q_TYPE_DENIED":
	                	alert("类型错误");
	                	break;
	                case "F_DUPLICATE":
	                	alert("请不要重复上传相同文件");
	                	break;
	            }
	        });
	        
			// 文件大小超限错误处理方法
			function fileSizeLimitError() {
				alert("上传的文件不能大于" + ptionsFinal.fileSizeLimit / 1024 / 1024 + "M!");
			}
			// 文件大小超限错误处理方法
			function fileTypeDeniedError(type) {
				alert("不支持" + type + "的文件上传!");
			}
		}
        
		
		
	}
	
	
	return {init:_init}
	
})


