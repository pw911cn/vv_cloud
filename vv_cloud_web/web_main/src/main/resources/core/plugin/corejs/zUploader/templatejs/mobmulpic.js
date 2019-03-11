define(["jquery","templateweb","rebox"], function ($,template,rebox) {
	var htmltemplate;
	var opt;
	var htmlTpl,$result;
	var config
	//获取html模板
	function gettemplate(options){
		opt=options;
		$.ajax({
			url : basePath + "/resources/plugins/zUploader/template/mobmulpic.html",
			async : false,
			success : function(result) {
				htmltemplate = result;
			}
		});
		var html= template.render(htmltemplate,options);
		htmltemplate=$(html);
		htmlTpl=htmltemplate.filter("#skin3Template").html();
		htmltemplate.appendTo(opt.todom);
		return htmltemplate;
	} 
	
	//获取配置信息
	function getconfig(options){
		config=$.extend(true,
		{
			pick: {
                id:$(".add-attach"),
                // 允许多个文件
                multiple: true
            },
			thumb : {
				
			},
			// 允许的mime
			accept:{
					title : "Images",
					extensions :"gif,jpg,jpeg,bmp,png,svg,ico",
					mimeTypes : "image/jpg,image/jpeg,image/png,image/gif,image/ico,image/bmp,image/svg"
			},
			//时间函数
			start : startMulPic,
			progress : progressMulPic,
			success : successMulPic
		},options);
		
		return config;
	}
	
	// 开始上传多图片
	function startMulPic(json) {
		var tag ="li";
		$htmlTpl=$(htmlTpl)
		$tag = $("<" + tag +" class='photo-attach'"+"></" + tag + ">");
		$htmlTpl = $tag.append($(htmlTpl));
		$htmlTpl.attr("id",'file' + json.id);
		$htmlTpl.find("input[fieldId]").val(opt.uploadStatus[1]);
		$htmlTpl.find("input[fieldId]").attr("fileNm", json.name);
		$htmlTpl.find("input[fieldId]").attr("status_md5", json.md5);
		var $holder = $htmlTpl.appendTo($(opt.resultDom));
		console.log("aaaaaa")
		console.log($htmlTpl.find("input[fieldId]").attr("status_md5"));
		console.log("======", json.name);
		// 设置文件名
		$holder.find(".filetext").text(json.name);
		$holder.attr("data-vUploader-md5", json.md5);
		$holder.attr("id", "file" + json.id);						
	}

	// 多图片上传进度显示
	function progressMulPic(json) {		
		// 上传中设置百分比
		getHolder(json).find(".percent_text").text(json.percent + "%");
		getHolder(json).find(".operate_delete").css("display", "block");
	}
	
	// 多图片上传成功方法
	function successMulPic(json) {			
		if (json.mutiFinished) {
			setDataUploaerFile(json);
			if (json.isMerege == "1") {
				showMulPic(json)
			} else {
				var timeid;
				timeid = setInterval(function() {
					$.ajax({
								url : opt.uploadFileProcessServer,
								xhrFields : {
									withCredentials : false
								// 跨域访问需要覆盖为false
								},
								data : {
									fileid : json.fileid,
									md5 : json.md5
								},
								success : function(result) {
									console.log("文件状态:", result);
									if (result.isMerege == "1") {
										clearInterval(timeid);
										showMulPic(result);
									}
								},
								error : function() {
									clearInterval(timeid);
									alert("服务器异常！");
									$("input[fieldId]", getHolder(result)).val(
											uploadStatus[3]);
								}
							});
				}, 3000);
			}
		}
	}
	
	// 展示多图片提交结果信息
	function showMulPic(json) {	
		var md5 = json.md5;
		// json.md5=json.fontMd5;
		// 设置缩略图
		var $thumb = $("<img>").attr("src", opt.loadFileServer + "?md5=" + md5 + "&fileid=" + json.fileid);
		$thumb.appendTo(getHolder(json).find(".imagethumb"));
		// 设置百分比
		getHolder(json).find(".perc ent_text").text(100 + "%");
		// 成功后隐藏进度条
		getHolder(json).find(".state_percent").fadeOut();
		// 设置上传样式
		getHolder(json).find(".tmsupload_comwrap").removeClass("upload_start").addClass("upload_success");
		getHolder(json).find(".operate_delete").css("display", "block");
		// 设置文件名
		//getHolder(json).find(".filetext").text(json.name2);
		getHolder(json).find(".filetext").html("<a href='"+opt.loadFileServer + "?md5=" + json.md5 + "&fileid=" + json.fileid+"'>"+json.filename+"</a>");
		// 设置扩展名
		// getHolder(json).find(".fileext").text("." + json.ext);
		getHolder(json).find(".state_preview").attr("href",opt.loadFileServer + "?md5=" + md5 + "&fileid=" + json.fileid);
		getHolder(json).find(".state_preview").attr("title",json.filename);
		getHolder(json).find(".state_preview").attr("data-md5",json.md5);
		getHolder(json).rebox({ selector: '.state_preview' });

		var fieldIdVal = $("#" + opt.fieldId, opt.todom).val();
		console.log("fieldmd5Arr", fieldIdVal);
		var fieldmd5Arr = new Array();
		if (fieldIdVal != null && fieldIdVal != "" && fieldIdVal != undefined) {
			fieldmd5Arr = fieldIdVal.split(",");
		}
		fieldmd5Arr.push(md5);
		fieldIdVal = fieldmd5Arr.join(",");
		$("#" + opt.fieldId).val(fieldIdVal);
		$("input[fieldId]", getHolder(json)).val(opt.uploadStatus[2]);			
	}
	
	function bindBtns(json) {
		var $file = $('#file' + json.id);
		$file.find('.operate_delete').on('click', function() {
			$file.remove();
			if ($("#" + opt.fieldId, opt.todom)) {// 控制文件移除
				var fieldIdVal = $("#" + opt.fieldId, opt.todom).val();
				var fieldArr = fieldIdVal.split(",");
				if (fieldArr.length > 0) {
					fieldArr.splice($.inArray(json.md5, fieldArr), 1);
					$("#" + opt.fieldId, opt.todom).val(fieldArr.join(","));
					console.log("删除后：", $("#" + opt.fieldId, opt.todom).val());
				}
			}
		});
	}
	
	function setDataUploaerFile(json){
		var att = {
				fileid : json.fileid,
				filetype : json.ext,
				filename : json.name,
				filemd5 : json.md5,
				attechmenttype : opt.attechmenttype,
				attechmentsubtype : opt.attechmentsubtype,
			};
		var fileJson = JSON.stringify(att);
		getHolder(json).attr("data-vUploader-file", fileJson);
	}
	
	function viewDataUploaerFile(json){
		var att = {
				fileid : json.fileid,
				filetype : json.filetype,
				filename : json.filename,
				filemd5 : json.filemd5,
				attechmenttype : json.attechmenttype,
				attechmentsubtype : json.attechmentsubtype,
			};
		var fileJson = JSON.stringify(att);
		getHolder(json).attr("data-vUploader-file", fileJson);
	}
	
	// 获得dom节点
	function getHolder(json) {
		return $(opt.resultDom).find("*[data-vUploader-md5='" + json.md5 + "']");
	}
	
	function view(json){
		console.log("viewMulFiles",json);
		var tag ="li";
		$htmlTpl=$(htmlTpl)
		$tag = $("<" + tag +" class='photo-attach'"+"></" + tag + ">");
		$htmlTpl = $tag.append($(htmlTpl));
		$htmlTpl.find("input[fieldId]").val(opt.uploadStatus[2]);
		$htmlTpl.find("input[fieldId]").attr("fileNm", json.filename);
		$htmlTpl.find("input[fieldId]").attr("status_md5", json.filemd5);
		var $holder = $htmlTpl.appendTo($(opt.resultDom));
		$holder.attr("id",'file' + json.id);
		console.log("======", json.name);
		$holder.attr("data-vUploader-md5", json.filemd5);
		json.md5 = json.filemd5;
		//showMulPic(json);
		var md5 = json.md5;
		// json.md5=json.fontMd5;
		// 设置缩略图
		var $thumb = $("<img>").attr("src", opt.loadFileServer + "?md5=" + md5);
		$thumb.appendTo(getHolder(json).find(".imagethumb"));
		// 设置百分比
		getHolder(json).find(".perc ent_text").text(100 + "%");
		// 成功后隐藏进度条
		getHolder(json).find(".state_percent").fadeOut();
		// 设置上传样式
		getHolder(json).find(".tmsupload_comwrap").removeClass("upload_start").addClass("upload_success");
		getHolder(json).find(".operate_delete").css("display", "block");
		// 设置文件名
		//getHolder(json).find(".filetext").text(json.name2);
		getHolder(json).find(".filetext").html("<a href='"+opt.loadFileServer + "?md5=" + json.md5 +"'>"+json.filename+"</a>");
		// 设置扩展名
		// getHolder(json).find(".fileext").text("." + json.ext);
		getHolder(json).find(".state_preview").attr("href",opt.loadFileServer + "?md5=" + md5);
		getHolder(json).find(".state_preview").attr("title",json.filename);
		getHolder(json).find(".state_preview").attr("data-md5",json.md5);
		getHolder(json).rebox({ selector: '.state_preview' });

		var fieldIdVal = $("#" + opt.fieldId, opt.todom).val();
		console.log("fieldmd5Arr", fieldIdVal);
		var fieldmd5Arr = new Array();
		if (fieldIdVal != null && fieldIdVal != "" && fieldIdVal != undefined) {
			fieldmd5Arr = fieldIdVal.split(",");
		}
		fieldmd5Arr.push(md5);
		fieldIdVal = fieldmd5Arr.join(",");
		$("#" + opt.fieldId).val(fieldIdVal);
		$("input[fieldId]", getHolder(json)).val(opt.uploadStatus[2]);	
		viewDataUploaerFile(json);
		bindBtns(json);
	}
	
	return{
		gettemplate:gettemplate,
		getConfig:getconfig,
		view:view
	}
})


