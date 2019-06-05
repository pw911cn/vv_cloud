define([ 'jquery', 'corectr'], function($, corectr) {

	
	
	/* ======================= 业务模块强制的开发规范 ======================= */
	var _initoptions=function(opts){
		console.log(opts.initdata_param.datas)
		
	}
	/* 修正初始化数据 */
	var _initdataconvert = function(renderdata) {
		
		return renderdata;
	};
	
	/* 模块页面初始化操作 */
	var _viewinit = function($thispage, renderdata,opts) {
		
		
		
		var pageSize_=20;
		var disList = opts.initdata_param.datas;
		if(pageSize_>disList.length){
			pageSize_ = disList.length;
		}
		for(var i=0;i<pageSize_;i++){
			var $div0 = $('<div class="label_item objective" id='+disList[i].id+'>'+disList[i].name+'</div>'); 			 
			 $div0.appendTo($(".objective_lable_more"),$thispage); 
		}
		
		corectr.v.pagination({
            // 承载分页的容器
            el: $("#page_demoWrap"),
            // 当前显示第几页.可选参数,默认值:1
            pageNumber: 1,
            // 总共多少调记录.必要参数,分页组件将依赖这个值计算分页
            total: disList.length,
            // 每页显示多少条.必要参数,分页组件将依赖这个值计算分页
            pageSize: 20,
            // pageSizeChanger列表数字 每页显示多少条
            pageSizeOptions: {options: [20, 30, 40, 50, 60], selected:1},
            // 是否可以显示 pageSize. 可选参数,默认值:true
            // showPageSizeChanger: false,
            // 是否显示QuickJumper. 可选参数,默认值:true
            // showQuickJumper: false,
            // 分页信息改变的回调. 可选参数, Function(data) data={page, pageSize}
            onPageNumberChange: function (data) {
                // 转到第几页
                var pageNumber = data.pageNumber;
                // 每页显示几条
                var pageSize = data.pageSize;
                var start = pageSize*(pageNumber-1);
                var end = pageNumber*pageSize;
                 if(end>disList.length){
                	 end = disList.length;
                 }
                 $(".objective_lable_more").find(".label_item").remove();
                for(var i=start;i<end;i++){
        			var $div0 = $('<div class="label_item objective" id='+disList[i].id+'>'+disList[i].name+'</div>');
        			 $div0.appendTo($(".objective_lable_more"),$thispage); 
        		}        		
                console.log("加载第 " + pageNumber + " 页" + ", pageSize==" + pageSize);
            }
        }); 
		
		$(".objective_lable_more" ,$thispage).on("click", ".objective", function() {
			var v_val = '';
			var s_val = $('#cons_objective').val();
			var btn_val = $(this).html();
			if(s_val.indexOf(btn_val)<0){
				if(''!=s_val){
					v_val = s_val +','+ btn_val;
				}else{
					v_val = btn_val;
				} 
				$('#cons_objective').val(v_val);
			} 	
		})
	};

	/* 模块页面事件绑定 */
	var _eventbind = function($thispage, renderdata, opts) {

	};
	
	var _uninstall=function(){
		
	}
	return {
		initoptions:_initoptions,
		initdataconvert : _initdataconvert,
		viewinit : _viewinit,
		eventbind : _eventbind,
		uninstall:_uninstall
	};
});