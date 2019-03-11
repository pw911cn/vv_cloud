define(["jquery","webuploader","templateweb","thirdparty/crc32/crc32","./templatejs/singlepic","./templatejs/mulpic","./templatejs/mulfile"], function ($,WebUploader,template,crc32,singlepic,mulpic,mulfile) {

	//当前已加载模板
	var haveMoudle={
		"singlepic":singlepic,
		"mulpic":mulpic,
		"mulfile":mulfile
	};

    // 必要参数检查
    function requirements(arg) {
        //待续
    }

	//默认模板，插入用
	var defaultTpl='<div class="z_webUploader z_webUploader1">' +
    '<div class="z_webUploader_holder"></div>' +
    '<input type="hidden" name="fileResult" fileresult value=""/>'+
    '</div>';

    //允许的mime(image)
    var imageMimeTypes = "image/jpg,image/jpeg,image/png,image/gif,image/ico,image/bmp,image/svg";
    var imageExtension = "gif,jpg,jpeg,bmp,png,svg,ico";

    // 允许的文件扩展名
    var extension = "rar,gif,jpg,jpeg,bmp,png,svg,ico," +
        "txt,rar,zip,7z," +
        "doc,xls,ppt," +
        "docx,xlsx,pptx," +
        ".wps,dps,et,pdf,dic";

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

    //severd地址
    //var FMSServer="http://172.16.180.97:80/file/";
    var FMSServer="http://172.16.180.135:8088/file/";
    

    //分片上传
    var chunkServer=FMSServer+"chunkUpload";
    //上传接口
    var loadFile = FMSServer + "download";
    //进度查询接口
    var uploadFileProcess = FMSServer + "getFileUploadProcess";
    //分片查询
    var chunkCheck= FMSServer + "chunkCheck";
    //分片合并
    var chunkMerge=FMSServer + "chunkMerge";
    
    var getattachment=FMSServer+"get";

    $.fn.webFileManager=function(options){
    	//对应模块传入的参数
    	var preToMoudleOpt={
    		//下载文件地址
            loadFile:loadFile,
            // 00、待上传，01、上传中，10、上传完成，20、上传失败
			uploadStatus:[ '00', '01', '10', '20' ],
			//能否编辑
			isEdit:true
		}

        var toMoudleOpt=$.extend({},preToMoudleOpt,options);

    	//获取模板
        var upTpl=(function(){
            if(toMoudleOpt.append){
                return defaultTpl;
            }else{
                return haveMoudle[options.moudlename].gettemplate(toMoudleOpt)||'<div style="display:inline-block;position:relative">' +
                    '<button class="xBtn xBtn-primary '+(toMoudleOpt.class||'')+'">'+(toMoudleOpt.btntext||"上传文件")+'</button>'+
					'<div class="z_webUploader z_webUploader1">\n' +
                    '\t<div class="z_webUploader_holder"></div>\n' +
                    '<input type="hidden" name="'+toMoudleOpt.name+'" fileresult value=""/>'+
                    '</div>'+
					'</div>'+
                    '<div class="" uploadfile="uploadFile"></div>';
            }
        })();

        var thisdom=$(this);

        var $upTpl=$(upTpl).appendTo(thisdom);
        
        var pickbtn=$upTpl.find(".z_webUploader_holder");

    	var defaultOption={

            sendAsBinary:true,

            server:chunkServer,
            // 指定接受哪些类型的文件
            accept:{
                extensions:extension,
                mimeTypes:mimeTypes
			},
			pick:{
                id:pickbtn[0],
                // 允许多个文件
                multiple: true
			},
            // auto {Boolean} [可选] [默认值：false] 设置为 true 后，不需要手动调用上传，有文件选择即开始上传。
            auto: true,
            // 同时最大上传进程数
            threads: 3,
            method: "POST",
            // [可选] [默认值：undefined] 验证文件总数量, 超出则不允许加入队列。 回调fileNumLimitError;
            fileNumLimit: undefined,
            // [可选] [默认值：undefined] 验证文件总大小是否超出限制, 超出则不允许加入队列。
            fileSizeLimit: undefined,
            //[可选] [默认值：undefined] 验证单个文件大小是否超出限制, 超出则不允许加入队列。
            fileSingleSizeLimit: undefined,
            chunked:true,
            chunkSize:10240,
            chunkRetry:100
            //5242880
        };

        //获取模块关于uploader设置
        var mdlOpts=haveMoudle[options.moudlename].getconfig();
    	var actualOpts=$.extend({},defaultOption,mdlOpts,options);

        WebUploader.Uploader.register({
            'before-send': 'beforeSend',
            'after-send-file':'afterSend'
        }, {
            beforeSend: function (block) {
                var own=this.owner;
                var data={};
                var file = block.file;
                if(file.Status&&file.Status=="cancelled "){
                    return
                }
                var customData = file.customData || {};
                $.extend(true, data, actualOpts.formData, customData);
                data.name=file.name;
                data.crc = file.crc;
                data.ext = file.ext;
                data.chunk=block.chunk;
                data.chunks=block.chunks;
                data.chunkSize=block.blob.size;
                data.path=actualOpts.path||"defaultpath";
                data.bizId=actualOpts.bizId||"";
                delete data.id;
                delete data.lastModifiedDate;
                var task = new $.Deferred();
                var file = block.file;
                $.ajax({
                    url:chunkCheck,
                    data:data,
                    type:'post',
					xhrFields : {
						withCredentials : false
					// 跨域访问需要覆盖为false
					},
                    success:function(data){
                        if(data){
                            task.reject();
                        }else{
                            task.resolve(data);
                        }

                    },
                    error:function(){
                        task.reject();
                    }
                });

                return task;
            },
            afterSend:function (file) {

                var data={};
                var customData = file.customData || {};
                $.extend(true, data, actualOpts.formData, customData);
                data.name=file.name;
                data.crc = file.crc;
                data.ext = file.ext;
                data.chunks=file.blocks.length;
                data.size=file.size;
                data.type=file.type;
                data.path=actualOpts.path||"defaultpath";
                data.bizId=actualOpts.bizId||"";
                delete data.id;
                delete data.lastModifiedDate;

                var task = new $.Deferred();
                $.ajax({
                    url:chunkMerge,
                    data:data,
                    type:'post',
					xhrFields : {
						withCredentials : false
					// 跨域访问需要覆盖为false
					},
                    success:function(data){
                        console.log('分片完事');
                        file.fileId=data;
                        task.resolve(data);
                    },
                    error:function(){
                        console.log('失败');
                        task.reject();
                    }
                });
                return task;
            }
        });

    	//初始化uploader
        var uploader=new WebUploader.Uploader(actualOpts);
        
        attachmentInfo();
        
		//获取attechment信息
		function attachmentInfo() {
			$.ajax({
				url :getattachment,
				data : {
					bizId :actualOpts.bizId,
					path : actualOpts.path,
					fileId:"934e5d0ebd364ef08862fcb15c3c9b42"
				},
				type:"get",
				xhrFields : {
					withCredentials : false
				// 跨域访问需要覆盖为false
				},
				success : function(result) {
					haveMoudle[options.moudlename].view(result,toMoudleOpt,uploader,$upTpl);
				}
			});
			
		}
		
        //当文件被加入队列之前触发，此事件的handler返回值为false，则此文件不会被添加进入队列。
        uploader.on("beforeFileQueued", function (file) {
            if (disallowedReg.test(file.type)) {
                uploader.reset();
                return false;
            } else if (!file.crc) {
                $.when( addCrc32(file)).done(function (crc) {
                    file.crc = crc;
                    /********重复处理，待续*********/



                    /********重复处理，待续*********/
                    uploader.addFile(file);
                }).fail(function(){
                    alert("文件初始化失败");
                });

                return false;
            }
        });



        // 当有文件被添加进队列的时候
        uploader.on("fileQueued", function (file) {
            if (actualOpts.auto) {
                uploader.upload(file);
            } else {
                actualOpts.uploader(uploader, file);
            }
        });

        //文件开始上传前触发,一个文件只会触发一次
        uploader.on("uploadStart", function (file) {
            haveMoudle[options.moudlename].start(file,toMoudleOpt,uploader,$upTpl);
        });

        //当某个文件的分块在发送前触发,添加自定义数据
        uploader.on('uploadBeforeSend', function (block, data, header) {
            var file = block.file;
            var customData = file.customData || {};
            $.extend(true, data, options.formData, customData);
            data.crc = file.crc;
            data.ext = file.ext;
            data.chunkSize=block.blob.size;
            data.path=actualOpts.path||"defaultpath";
            data.bizId=actualOpts.bizId||"";
            delete data.id;
            delete data.lastModifiedDate;
        });

        // 文件上传中，Web Uploader会对外派送uploadProgress事件，其中包含文件对象和该文件当前上传进度。
        uploader.on("uploadProgress", function (file, percentage) {
            var percent = Math.floor(percentage * 90);
            var json = {
                name: file.name,
                type: file.type,
                percent: percent,
                crc:file.crc,
                ext:file.ext
            }
            haveMoudle[options.moudlename].progress(json,toMoudleOpt,$upTpl);
        });

        // 当文件上传出错时触发。
        uploader.on("uploadError", function (file) {
            haveMoudle[options.moudlename].uperr(file,toMoudleOpt,uploader,$upTpl);
        });


        // 当文件上传成功时触发。
        uploader.on("uploadSuccess", function (file) {
            console.log('文件上传成功');
            console.log(file)
            haveMoudle[options.moudlename].success(file,toMoudleOpt,uploader,$upTpl);
        });

        //接收服务器返回信息
        //这里才是接收服务器信息的地方,如果有出错就 `return false` 来停止上传
        uploader.on('uploadAccept', function (file, json) {
            console.log("uploadAccept")

        })


        //不管成功或者失败，文件上传完成时触发
        uploader.on( 'uploadComplete', function( file ) {

            //bindBtns(file,'uploadComplete');
        });


        // Q_EXCEED_NUM_LIMIT 在设置了fileNumLimit且尝试给uploader添加的文件数量超出这个值时派送。
        // Q_EXCEED_SIZE_LIMIT 在设置了Q_EXCEED_SIZE_LIMIT且尝试给uploader添加的文件总大小超出这个值时派送。
        // Q_TYPE_DENIED 当文件类型不满足时触发。。
        uploader.on("error", function (type) {
            switch (type) {
                case "Q_EXCEED_NUM_LIMIT":
                    actualOpts.fileNumLimitError();
                    break;
                case "Q_EXCEED_SIZE_LIMIT":
                    actualOpts.fileSizeLimitError();
                    break;
                case "Q_TYPE_DENIED":
                    actualOpts.fileTypeDeniedError();
                    break;
                default:
                    console.log("error")

            }
        });

        $(this).rebox({ selector: '.preview' });









        //生成crc32
        function addCrc32(file){
            var dtd = WebUploader.Base.Deferred();
            var reader = new FileReader();
            //reader.readAsDataURL(file.source.source);
            reader.readAsArrayBuffer(file.source.source);
            reader.onload = function (e) {
                var unit8arr=new Uint8Array(e.target.result);
                var crcResult=crc32.buf(unit8arr)>>>0+"";
                dtd.resolve(crcResult);
            }
            return dtd.promise();

        }


















    };
});


