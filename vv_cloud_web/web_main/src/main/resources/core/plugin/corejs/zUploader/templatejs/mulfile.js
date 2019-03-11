define(["jquery","templateweb","rebox","text!../template/mulfile.html"], function ($,template,rebox,mulTpl) {

    //获取模板
    function gettemplate(options){

    }

    //获取webuploader设置
    function getconfig(options){
        var config={}

        return config;
    }

    //开始上传
    function start(file,opts,uploader,container){
    	var item=getHolder(file);
    	if(item.length==0){
        	if(container.filter("div[uploadfile]").length==0&&!opts.resultdom){
        		var todom=null;
        		if(opts.append){
        			todom=container.parent();
        		}else{
        			todom=container;
        		}
        		opts.resultdom=$('<div class="" uploadfile="uploadFile"></div>').insertAfter(todom);
        	}else if(container.filter("div[uploadfile]").length>0&&!opts.resultdom){
        		opts.resultdom=container.filter("div[uploadfile]");
        	}
        	if(!opts.resulttag){
        		opts.resulttag="<div style='' abc=1></div>";
        	}
        	item=$(opts.resulttag).appendTo(opts.resultdom).append(template.render(mulTpl,opts));
        	item.attr("data-uploader-crc32",file.crc);
    	}
    	$(".tmsupload_comwrap", item).addClass("upload_start");
        $("input[file_result]", item).attr("file_state",opts.uploadStatus[1]);
        bindBtns(file,opts,item,uploader,'uploadStart');
    }

    //上传进度
    function progress(file,opts,container){
    	var item=getHolder(file);
        $(".percent_text", item).text(file.percent + "%");
        $(".filetext", item).text(file.name);
        //$(".fileext", item).text(file.ext);
    }

    //成功
    function success(file,opts,uploader,container){
    	var item=getHolder(file);
        $(".tmsupload_comwrap", item).addClass("upload_success");
        var result={}
        result.crc=file.crc;
        result.name=file.name;
        result.fileId=file.fileId;
        result.size=file.size;
        result.path=opts.path;
        result.bizId=file.bizId;
        $(".percent_text", item).text("100%");
        $("input[file_result]", item).attr("file_state",opts.uploadStatus[2]);
        $("input[file_result]", item).val(JSON.stringify(result));
        $("img", item).attr("src",
            opts.loadFile + "?fileId=" + file.fileId).show();
        $(".tmsupload_comwrap", item).removeClass("upload_start");
        $(".upload_filenamewrap a",item).attr("href",opts.loadFile +"?fileId=" + file.fileId);
        $(".state_preview",item).attr("href",opts.loadFile +"?fileId=" + file.fileId);
        $(".operate_view",item).attr("href",opts.loadFile +"?fileId=" + file.fileId);
    	item.rebox({ selector: '.state_preview' });
    	item.rebox({ selector: '.operate_view' });
        
        bindBtns(file,opts,item,uploader,'uploadComplete');
    }

    //结果展示
    function view(files,opts,uploader,container){
    	if(Object.prototype.toString.call(files)!="[object Array]"){
    		var filearr=new Array();
    		filearr.push(files);
    	}
		if(container.filter("div[uploadfile]").length==0&&!opts.resultdom){
    		var todom=null;
    		if(opts.append){
    			todom=container.parent();
    		}else{
    			todom=container;
    		}
    		opts.resultdom=$('<div class="" uploadfile="uploadFile"></div>').insertAfter(todom);
    	}else if(container.filter("div[uploadfile]").length>0&&!opts.resultdom){
    		opts.resultdom=container.filter("div[uploadfile]");
    	}
		$.each(filearr,function(index,file){
        	if(!opts.resulttag){
        		opts.resulttag="<div style='' ></div>";
        	}
        	var item=$(opts.resulttag).appendTo(opts.resultdom).append(template.render(mulTpl,opts));
        	item.attr("data-uploader-crc32",file.crc);
            $(".tmsupload_comwrap", item).addClass("upload_success");
            var result={}
            result.crc=file.crc;
            result.name=file.file_name;
            result.fileId=file.file_id;
            result.size=file.file_size;
            result.path=opts.path;
            result.bizId=file.biz_id;
            $(".percent_text", item).text("100%");
            $("input[file_result]", item).attr("file_state",opts.uploadStatus[2]);
            $("input[file_result]", item).val(JSON.stringify(result));
            $("img", item).attr("src",
                opts.loadFile + "?fileId=" + result.fileId).show();
            $(".upload_filenamewrap a",item).attr("href",opts.loadFile +"?fileId=" + result.fileId);
            $(".state_preview",item).attr("href",opts.loadFile +"?fileId=" + result.fileId);
            $(".operate_view",item).attr("href",opts.loadFile +"?fileId=" + result.fileId);
        	item.rebox({ selector: '.state_preview' });
        	item.rebox({ selector: '.operate_view' });
        	$(".filetext", item).text(result.name);
            if(opts.isEdit){
            	bindBtns(file,opts,item,uploader,'uploadComplete');
            }
		});
    	
    }

    function uperr(file,opts,uploader,container){
        console.log("失败");
        console.log(file);
        var item=getHolder(file);
        if(item.length==0){
        	alert("上传出错");
        	return;
        }
        $(".tmsupload_comwrap", item).removeClass("upload_start");
        $(".tmsupload_comwrap", item).addClass("upload_error");
        $("input[file_result]", item).attr("file_state",opts.uploadStatus[3]);
        bindBtns(file,opts,item,uploader,'uploadError');
    }

    function bindBtns(file,opts,container,uploader,state) {
        $file=container;

        if(state && state == 'uploadStart'){
            $file.find('.operate_delete').off().on('click', function(){
                try {
                    uploader.cancelFile(file);
                }
                catch(err) {
                    console.err(err);
                }
                finally {
                    reset(container,opts);
                    $file.remove();
                }
            });
        } else if (state && state == 'uploadComplete') {
            $file.find('.operate_delete').off().on('click', function(){
                try {
                    uploader.removeFile(file,true);
                }
                catch(err) {
                    console.err(err);
                }
                finally {
                    reset($file,opts);
                    $file.remove();
                }
            });
        } else if (state && state == 'uploadError'){
            $file.find('.operate_delete').off().on('click', function(){
                try {
                    uploader.removeFile(file,true);
                }
                catch(err) {
                    console.err(err);
                }
                finally {
                    reset($file,opts);
                    $file.remove();
                }
            });
            $file.find('.state_error').off().on('click', function(){
                try {
                    reset($file,opts);
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
        $(".tmsupload_comwrap", container).removeClass("upload_error");
        $(".tmsupload_comwrap", container).removeClass("upload_success");
        $(".tmsupload_comwrap", container).removeClass("upload_start");
        $("input[file_result]", container).attr("file_state",opts.uploadStatus[0]);
        $("input[file_result]", container).val("");
        $(".percent_text", container).text("0%");
        $(".filetext", container).text("");
        $("img", container).attr("src","").show();
        $(".upload_filenamewrap a",container).attr("href","");
        $(".state_preview",container).attr("href","");
        $(".operate_view",item).attr("href","");
        
    }
    
    function getHolder(file){
    	return $("[data-uploader-crc32='"+file.crc+"']");
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


