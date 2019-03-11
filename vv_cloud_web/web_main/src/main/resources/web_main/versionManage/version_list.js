define([ 'jquery', 'corectr','templateweb'], function($, corectr,template) {

	var table;
	
	/* ======================= 业务模块强制的开发规范 ======================= */
	/* 修正初始化数据 */
	var _initdataconvert = function(renderdata) {
 		return renderdata;
	};
	
	/* 模块页面初始化操作 */
	var _viewinit = function($thispage, renderdata) {
		createtable();
		 
	};	 

	/* 模块页面事件绑定 */
	var _eventbind = function($thispage, renderdata) {
		/**
		 * 新增跳转
		 */
		$("#version_addbtn").on('click',function() { 
			corectr.v.popup({
                width: 800,
                height: 500,
                title: "添加版本信息",
                type:"GET",
                // 被加载页面的地址
                //url: "web_main/versionManage/version_add.html",
                content:function($wrap, instance){ 
                	corectr.loadmodule({ 
                		module : "web_main/versionManage/version_add",
                		$todom : $wrap,
                		vpopup:instance
                		 
                	});
                	
                },
                closeCallback:function($wrap, instance){
                	table.refresh();
                }/*,
                buttons: [
                    {
                        text: "取消",
                        class: "xBtn xBtn-default"
                    },
                    {
                        text: "确认",
                        class: "xBtn xBtn-primary",
                        click: function ($wrap, popup) {                        	 
                        	save();
                            popup.remove();  
                            table.refresh();
                         }
                    }
                ]*/
            })
        
		})
		/**
		 * 重置
		 */
		$("#reset").on('click',function(){
			$("#version_code_query").val("");
		})
		
		/**
		 * 查询点击事件
		 */
			$("#version_querybtn").on('click',function() {   
				var allData = {version_code:$("#version_code_query").val(),pageNumber:1}//从第一页开始显示
				table.ajax({type:'POST', data: allData});//url: "/main/version/queryPageByCdn.ajax", 可以不写 默认是上一次table ajax请求的url
		})
		
	};

/**
 * 新增保存
 */
	
/*function save(){ 
	console.log($("#add_div").getformdata())
	 $.ajax({
			type : "PUT",					 
			url : "/main/version/add.ajax",
			data:$("#add_div").getformdata(),
	 		success : function(result) {
	 			corectr.v.popup.success({content: result.message, seconds: 1});
	 			table.refresh();
	 		}
		});
}*/
/**
 * 修改保存(先不用了)
 */
/*function update(id){	
	 
	 $.ajax({
			type : "PUT",					 
			url : "/main/version/edit.ajax",			 
			data:$("#edit_div").getformdata(),
	 		success : function(result) {
	 			corectr.v.popup.success({content: result.message, seconds: 1});
	 			
	 		}
		});
 
}*/
/**
 * 删除
 */
function del(id){
 	return $.ajax({
		type : "PUT",					 
		url : "/main/version/remove.ajax",
		data:{version_id:id},
 		success : function(result) {
 			corectr.v.popup.success({content: result.message, seconds: 1});
 		}
	});
}


/**
 * 修改跳转
 */	
function edit(id){
	corectr.v.popup({
        width: 800,
        height: 500,
        title: "修改版本信息",
        type:"GET",
        // 被加载页面的地址
        //url: "web_main/versionManage/version_edit.html",
        content:function($wrap, instance){ 
        	corectr.loadmodule({
        		initdata_url:"/main/version/getById.ajax",
        		initdata_param:{"version_id":id},
        		module : "web_main/versionManage/version_edit",
        		$todom : $wrap,
        		vpopup:instance
        		 
        	});
        	
        },
        closeCallback:function($wrap, instance){
        	table.refresh();
        }
        /*,buttons: [
            {
                text: "取消",
                class: "xBtn xBtn-default"
            },
            {
                text: "确认",
                class: "xBtn xBtn-primary",
                click: function ($wrap, popup) {                        	 
                	update(id);
                    popup.remove();
                    table.refresh();
                 }
            }
        ]*/
    })
}
	//表格
	function createtable(){
	var $tableHolder = $("#versiontable");
	 
	var allData = {	
			version_code:$("#version_code_query").val()
	　　　　　　　　　};
	var tableConfig = {
			el: $tableHolder,
			columns: [
				{
					title: "table.checkbox", width: 50, scale: 0,
					fixed1: "left", sort: true, render: "table.checkbox"
			
				},
				{
					title: "版本号", width: 90, scale: 4, 
					align: "left",  
					render: "rowData.version_code" 
				},
				{
					title: "版本内容",  width: 200, scale: 2,
					render:  "rowData.version_content"
					 
				},
				{
					title: "备注",  width: 90, scale: 2,
					render:  "rowData.remark"
					 
				},
				 
				{
					title: "操作", width: 130, scale: 0, align: "center",  
					// 内容渲染
					render: function (data, table) {
						var $td = data.$td;
						var $del = $("<input value='删除' type='button'>");
						$del.on("click", function (e) {							 
							del(data.rowData.version_id).done(function(){
								data.$tr.remove();
								table.refresh();
							});		
						});
						var $edit = $("<input value='修改' type='button'>");
						$edit.on("click", function (e) {							 
							edit(data.rowData.version_id);
							 
						});
						$edit.appendTo($td);
						$del.appendTo($td);
						
						
					}
				}
			],
			onCheckedChange: function (data, table) {
				var $tr = data.$tr;
				if (data.isChecked) {
					$tr.addClass("selectedRow");
				} else {
					$tr.removeClass("selectedRow");
				}
				// console.log(table.checkedRowsData);
			},
			onCheckAll: function (data, table) {
				// console.log("onCheckAll", data);
				var $tr = table.$tr;
				var $leftTr = table.$leftTr;
				var $rightTr = table.$rightTr;
				//
				if (data.isCheckAll) {
					console.log("isCheckAll");
					if ($tr)
						$tr.addClass("selectedRow");
					if ($leftTr)
						$leftTr.addClass("selectedRow");
					if ($rightTr)
						$rightTr.addClass("selectedRow");
				} else {
					console.log("!isCheckAll");
					if ($tr)
						$tr.removeClass("selectedRow");
					if ($leftTr)
						$leftTr.removeClass("selectedRow");
					if ($rightTr)
						$rightTr.removeClass("selectedRow");
				}
			},
			pagination: {
			
			},	
			ajax: {url: "/main/version/queryPageByCdn.ajax",type:'POST', data: allData}, 
			// 单击
			trClick: function (data, table) {
				var index = data.trIndex;
				if (table.isChecked(index)) {
					table.uncheckRows(data.trIndex);
				} else {
					table.checkRows(data.trIndex);
				}
			},
			
		};
		 table = corectr.v.table(tableConfig);
	}
	
	return {
		initdataconvert : _initdataconvert,
		viewinit : _viewinit,
		eventbind : _eventbind
	};
});