define([ 'jquery', 'corectr'], function($, corectr) {

	
	
	/* ======================= 业务模块强制的开发规范 ======================= */
	var _initoptions=function(opts){
		opts.$todom=$(".tms4SubIndex_mainData_lyt");
		
	}
	/* 修正初始化数据 */
	var _initdataconvert = function(renderdata) {
		
		return renderdata;
	};
	
	/* 模块页面初始化操作 */
	var _viewinit = function($thispage, renderdata) {
		//初始化uploader
        //var uploader=new WebUploader.Uploader(actualOpts);
		//attachmentInfo();
	};
	//$('#consultation-prim_id').val();
	/* 模块页面事件绑定 */
	var _eventbind = function($thispage, renderdata, opts) {
		console.log("hp++++++++++:"+$('#consultation-prim_id').val());
		var uploaderWrap1 = {
                moudlename:"mulfile",
                attechmenttype:"4",
                attechmentsubtype:"photo",
                bizId:"123456",
                //fileId:"934e5d0ebd364ef08862fcb15c3c9b42",
                append:true
        };
        $thispage.find(".bnt-patient-book").webFileManager(uploaderWrap1);
        
        var uploaderWrap2 = {
                moudlename:"mulfile",
                attechmenttype:"4",
                attechmentsubtype:"photo",
                bizId:"1234567",
                append:true
        };
        $thispage.find(".bnt-image-exam").webFileManager(uploaderWrap2);
        
        var uploaderWrap3 = {
                moudlename:"mulfile",
                attechmenttype:"4",
                attechmentsubtype:"photo",
                bizId:"1234567",
                //fileId:"07b02e42cced4c4fb38129f10058f9a2",
                append:true
        };
        $thispage.find(".bnt-up-check").webFileManager(uploaderWrap3);
        var uploaderWrap4 = {
                moudlename:"mulfile",
                attechmenttype:"4",
                attechmentsubtype:"photo",
                bizId:"12345678",
                //fileId:"aee20f6b7ec34e4384c4b6bcba3ff214",
                append:true
        };
        $thispage.find(".bnt-image-egc").webFileManager(uploaderWrap4);
        
        $("#btn-addImageExamInfo",$thispage).on("click",function(){
        	alert("1");
        });
        
	};

	//获取attechment信息
	/*function attachmentInfo() {
		$.ajax({
			url :getattachment,
			data : {
				bizId :actualOpts.bizId,
				path : actualOpts.path,
				fileId:actualOpts.fileId
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
		
	}*/
	
	var _uninstall=function(){
		console.log("拜拜");
	}
	return {
		initoptions:_initoptions,
		initdataconvert : _initdataconvert,
		viewinit : _viewinit,
		eventbind : _eventbind,
		uninstall:_uninstall
	};
});