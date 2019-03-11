define(["jquery","templateweb","rebox","text!../template/singlepic.html"], function ($,template,rebox,singlePicTpl) {

    //获取模板
    function gettemplate(options){
        var defuOpt={
            backgroundClass : "oralegimg1",
            //containerClass : "upload_1",
            containerFontContent : "xxx"
        }
        var opts=$.extend(true,{},defuOpt,options);
        var html= template.render(singlePicTpl,opts);
        return  html;
    }

    //获取webuploader设置
    function getconfig(options){
    	var imageExtension = "gif,jpg,jpeg,bmp,png,svg,ico";
		var imageMimeTypes = "image/jpg,image/jpeg,image/png,image/gif,image/ico,image/bmp,image/svg";
        var config={
        		
        		accept:{
					title : "Images",
					extensions : imageExtension,
					mimeTypes : imageMimeTypes
				}
        }

        return config;
    }

    //开始上传
    function start(file,opts,uploader,container){
        reset(container,opts);
        $(".tmsupload_oralwrap", container).addClass("upload_start");
        $("input[file_result]", container).attr("file_state",opts.uploadStatus[1]);
        bindBtns(file,opts,container,uploader,'uploadStart');
    }

    //上传进度
    function progress(file,opts,container){
        $(".percent_text", container).text(file.percent + "%");
        $(".filetext", container).text(file.name);
    }

    //成功
    function success(file,opts,uploader,container){
        console.log(file);
        $(".tmsupload_oralwrap", container).addClass("upload_success");
        var result={}
        result.crc=file.crc;
        result.name=file.name;
        result.fileId=file.fileId;
        result.size=file.size;
        result.path=opts.path;
        result.bizId=file.bizId;
        $(".percent_text", container).text("100%");
        $("input[file_result]", container).attr("file_state",opts.uploadStatus[2]);
        $("input[file_result]", container).val(JSON.stringify(result));
        $(" .v_webUploader_thumbnail", container).attr("src",
            opts.loadFile + "?fileId=" + file.fileId).show();
        $(" .tmsupload_oralwrap", container).removeClass("noimage");
        $(".tmsupload_oralwrap", container).removeClass("upload_start");
        $(".preview",container).attr("href",opts.loadFile +"?fileId=" + file.fileId);
        $(".preview",container).attr("title",file.name);
        bindBtns(file,opts,container,uploader,'uploadComplete');
    }

    //结果展示
    function view(file,opts,uploader,container){
        console.log(file);
        $(".tmsupload_oralwrap", container).addClass("upload_success");
        var result={}
        result.crc=file.crc;
        result.name=file.file_name;
        result.fileId=file.file_id;
        result.size=file.file_size;
        result.path=opts.path;
        result.bizId=file.biz_id;
        $(".percent_text", container).text("100%");
        $("input[file_result]", container).attr("file_state",opts.uploadStatus[2]);
        $("input[file_result]", container).val(JSON.stringify(result));
        $(" .v_webUploader_thumbnail", container).attr("src",
            opts.loadFile + "?fileId=" + result.fileId).show();
        $(" .tmsupload_oralwrap", container).removeClass("noimage");
        $(".tmsupload_oralwrap", container).removeClass("upload_start");
        $(".preview",container).attr("href",opts.loadFile +"?fileId=" + result.fileId);
        $(".preview",container).attr("title",file.name);
        if(!opts.isEdit){
        	bindBtns(file,opts,container,uploader,'uploadComplete');
        }
        
    }

    function uperr(file,opts,uploader,container){
        console.log("失败");
        console.log(file);
        $(".tmsupload_oralwrap", container).removeClass("upload_start");
        $(".tmsupload_oralwrap", container).addClass("upload_error");
        $("input[file_result]", container).attr("file_state",opts.uploadStatus[3]);
        bindBtns(file,opts,container,uploader,'uploadError');
    }

    function bindBtns(file,opts,container,uploader,state) {
        $file=container;

        if(state && state == 'uploadStart'){
            $file.find('.operatewrap .delete').off().on('click', function(){
                try {
                    uploader.cancelFile(file);
                }
                catch(err) {
                    console.err(err);
                }
                finally {
                    reset(container,opts)
                }
            });
        } else if (state && state == 'uploadComplete') {
            $file.find('.operatewrap .delete').off().on('click', function(){
                try {
                    uploader.removeFile(file,true);
                }
                catch(err) {
                    console.err(err);
                }
                finally {
                    reset(container,opts)
                }
            });
        } else if (state && state == 'uploadError'){
            $file.find('.operatewrap .delete').off().on('click', function(){
                try {
                    uploader.removeFile(file,true);
                }
                catch(err) {
                    console.err(err);
                }
                finally {
                    reset(container,opts);
                }
            });
            $file.find('.operatewrap .retry').off().on('click', function(){
                try {
                    reset(container,opts);
                    uploader.retry(file);
                }
                catch(err) {
                    console.err(err);
                }
                finally {

                }
            });

        }
    }

    function reset(container,opts){
        $(".tmsupload_oralwrap", container).removeClass("upload_error");
        $(".tmsupload_oralwrap", container).removeClass("upload_success");
        $(".tmsupload_oralwrap", container).removeClass("upload_start");
        $(".tmsupload_oralwrap", container).addClass("noimage");
        $("input[file_result]", container).attr("file_state",opts.uploadStatus[0]);
        $("input[file_result]", container).val("");
        $(".percent_text", container).text("0%");
        $(".filetext", container).text("");
        $(" .v_webUploader_thumbnail", container).attr("src",
            "").hide();
        $(".preview",container).attr("href","");
        $(".preview",container).attr("title","");
    }


    return{
        gettemplate:gettemplate,
        getconfig:getconfig,
        start:start,
        progress:progress,
        success:success,
        view:view,
        uperr:uperr
	}
})


