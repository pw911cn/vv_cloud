define(["jquery","templateweb","rebox"], function ($,template,rebox) {
	var htmltemplate;
	var opt;
	var htmlTpl;
	var config
	//获取html模板
	function gettemplate(options){
		opt=options;
		$.ajax({
			url : basePath + "/resources/plugins/zUploader/template/mobmulfile.html",
			async : false,
			success : function(result) {
				htmltemplate = result;
			}
		});
		var html= template.render(htmltemplate,options);
		htmltemplate=$(html);
		htmlTpl=htmltemplate.filter("#skin2Template").html();
		htmltemplate.filter("div[uploadFile='uploadFile']").append(opt.uitemplate[1]);
		htmltemplate.appendTo(opt.todom);
		
		return htmltemplate;
	} 
	
	//获取配置信息
	function getconfig(options){
		config=$.extend(true,
		{
/*			pick:{
				id:".attacmentreport .tms-report-upload",
				multiple: true
			},*/
			//时间函数
			start :startMulFile ,
			progress :progressMulFile ,
			success : successMulFile
		},options);
		
		return config;
	}
	
	// 开始上传多文件
	function startMulFile(json) {
		var $dom = $(htmlTpl);
		$dom.attr("id", "file" + json.id);
		$dom.find("input[fieldId]").val(opt.uploadStatus[1]);
		$dom.find("input[fieldId]").attr("fileNm", json.name);	
		$dom.find("input[fieldId]").attr("status_md5", json.md5);
		var $holder = $dom.appendTo(opt.resultDom);
		$holder.attr("id", "file" + json.id);
		$holder.find(".filetext", opt.resultDom).text(json.name);
		$holder.attr("data-vUploader-md5", json.md5);
	}
	

	
	
	// 多文件上传
	function progressMulFile(json) {
		// json.md5=json.filemd5;
		getHolder(json).find(".percent_text", opt.resultDom).text(json.percent + "%");
		getHolder(json).find(".filetext", opt.resultDom).text(json.name2);
		getHolder(json).find(".operate_delete").css("display", "block");
		getHolder(json).find(".vert").css("display", "none");
	}
	
	
	//上传成功
	function successMulFile(json) {			
		if (json.mutiFinished) {
			var md5 = json.md5;
			json.md5 = json.fontMd5;
			setDataUploaerFile(json);
			if (json.isMerege == "1") {
				showMulFile(json)
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
							fileid : json.id,
							md5 : md5
						},
						success : function(result) {
							console.log("文件状态:", result);
							if (result.isMerege == "1") {
								clearInterval(timeid);
								showMulFile(result)
							}
						},
						error : function() {
							clearInterval(timeid);
							alert("服务器异常！");
						}
					});
				}, 3000);

			}
		}
	}

	// 上传成功后展示文件信息
	function showMulFile(json) {			
		// 设置百分比
		getHolder(json).find(".percent_text", opt.resultDom).text(100 + "%");
		// 设置上传样式
		getHolder(json).filter(".tmsupload_comwrap", opt.resultDom).removeClass("upload_start")
				.addClass("upload_success");
		// 设置下载
		getHolder(json).find(".upload_filenameDownload", opt.resultDom).attr({
			href : opt.loadFileServer + "?md5=" + json.md5 + "&fileid=" + json.fileid,
			download : json.name
		});
		// 设置文件名
		getHolder(json).find(".filetext", opt.resultDom).text(json.name2);					
		$("input[fieldId]", getHolder(json)).val(opt.uploadStatus[2]);
		
		getHolder(json).find(".operate_view").attr("href",opt.loadFileServer + "?md5=" + json.md5 + "&fileid=" + json.fileid);
		getHolder(json).find(".operate_view").attr("title",json.filename);
		getHolder(json).rebox({ selector: '.operate_view' });
	}
	
	function bindBtns(json) {
		var $file = $('#file' + json.id);
		$file.find('.operate_delete').on('click', function() {
			$file.remove();
			if ($("#" + opt.fieldId, opt.resultDom)) {// 控制文件移除
				var fieldIdVal = $("#" + opt.fieldId, opt.resultDom).val();
				var fieldArr = fieldIdVal.split(",");
				if (fieldArr.length > 0) {
					fieldArr.splice($.inArray(json.md5, fieldArr), 1);
					$("#" + opt.fieldId, opt.resultDom).val(fieldArr.join(","));
					console.log("删除后：", $("#" + opt.fieldId, opt.resultDom).val());
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
		var $dom = $(htmlTpl);
		//$dom.attr("id", "file" + json.id);
		$dom.find("input[fieldId]").val(opt.uploadStatus[2]);
		$dom.find("input[fieldId]").attr("fileNm", json.filename);	
		$dom.find("input[fieldId]").attr("status_md5", json.filemd5);
		var $holder = $dom.appendTo(opt.resultDom);
		$holder.attr("id", "file" + json.id);
		$holder.find(".filetext", opt.resultDom).text(json.filename);
		$holder.attr("data-vUploader-md5", json.filemd5);
		json.md5 = json.filemd5;
		var md5 = json.md5;
		// json.md5=json.fontMd5;
		// 设置百分比
		getHolder(json).find(".percent_text", opt.resultDom).text(100 + "%");
		// 设置上传样式
		getHolder(json).filter(".tmsupload_comwrap", opt.resultDom).removeClass("upload_start")
				.addClass("upload_success");
		// 设置下载
		getHolder(json).find(".upload_filenameDownload", opt.resultDom).attr({
			href : opt.loadFileServer + "?md5=" + json.md5,
			download : json.name
		});
		// 设置文件名
		getHolder(json).find(".filetext", opt.resultDom).text(json.name2);					
		$("input[fieldId]", getHolder(json)).val(opt.uploadStatus[2]);
		
		getHolder(json).find(".operate_view").attr("href",opt.loadFileServer + "?md5=" + json.md5);
		getHolder(json).find(".operate_view").attr("title",json.filename);
		getHolder(json).rebox({ selector: '.operate_view' });
		
		viewDataUploaerFile(json);
		bindBtns(json);
	}
	
	return{
		gettemplate:gettemplate,
		getConfig:getconfig,
		view:view
	}
})


