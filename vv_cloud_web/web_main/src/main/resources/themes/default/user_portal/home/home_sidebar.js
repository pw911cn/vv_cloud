define([ 'jquery', 'corectr',"thirdparty/mCustomScrollbar/jquery.mCustomScrollbar","thirdparty/mCustomScrollbar/jquery.mousewheel.min" ], function($, corectr) {

	
	
	/* ======================= 业务模块强制的开发规范 ======================= */
	var _initoptions=function(opts){
		opts.$todom=$("#home_sidebar_lyt");
		
	}
	/* 修正初始化数据 */
	var _initdataconvert = function(renderdata) {
		
		return renderdata;
	};
	
	/* 模块页面初始化操作 */
	var _viewinit = function($thispage, renderdata) {
		//折叠按钮
        $('.foldbtn').on('click',function () {
            var $sidebar_lyt = $('.tms4HomeIndex_sidebar_lyt');
            if($sidebar_lyt.hasClass('sidebar_close')){
                $sidebar_lyt.removeClass('sidebar_close');
            }else{
                $sidebar_lyt.addClass('sidebar_close');
            }
        })
        
        //自定义滚动条
        $("#shortcut_content").mCustomScrollbar({
            theme:"minimal-dark"
        });

        //判断快捷按钮组 是否包含显示的按钮
        shortcut_group();

        //绑定 快捷按钮 编辑 事件
        shortcut();
	};

	/* 模块页面事件绑定 */
	var _eventbind = function($thispage, renderdata, opts) {
		
	};
	
	var _uninstall=function(){
		console.log("离开首页");
	}
	return {
		initoptions:_initoptions,
		initdataconvert : _initdataconvert,
		viewinit : _viewinit,
		eventbind : _eventbind,
		uninstall:_uninstall
	};
	
	//判断快捷按钮组 是否包含显示的按钮
    function shortcut_group() {
        var $shortcut_group = $(".shortcut_group");
        $shortcut_group.removeClass('hide');
        for(var i=0;i<$shortcut_group.length;i++) {
            if($shortcut_group.eq(i).find('.shortcut_btn.show').length>0){
            }else{
                $shortcut_group.eq(i).addClass('hide');
            }
        }
    }



    //绑定 快捷按钮 编辑 事件
    function shortcut() {

        $(".shortcut_btn input.v-check-input[type='checkbox']").on('change',function () {
            if($(this).prop("checked")){
                $(this).parents('.shortcut_btn').addClass('show');
            }else{
                $(this).parents('.shortcut_btn').removeClass('show');
            }
        });

        //编辑快捷按钮
        $(".shortcut_editbtn").on('click',function () {
            $(".shortcut_cont").addClass('edit');
            $(".shortcut_btn input.v-check-input[type='checkbox']").prop("checked", false);
            var $showbtn = $(".shortcut_btn.show");
            for(var i=0;i<$showbtn.length;i++) {
                $showbtn.eq(i).find('.v-check-input').prop("checked", true);
            }
        });


        //保存 快捷按钮
        $(".shortcut_confirmbtn .confirmbtn").on('click',function () {
            $(".shortcut_cont").removeClass('edit');
            $(".shortcut_btn").removeClass('show');
            var $checkbox = $(".shortcut_btn input.v-check-input[type='checkbox']");
            for(var i=0;i<$checkbox.length;i++) {
                var $onecheck = $checkbox.eq(i);
                if($onecheck.prop("checked")){
                    $onecheck.parents('.shortcut_btn').addClass('show');
                }
            }
            //判断快捷按钮组 是否包含显示的按钮
            shortcut_group();

            v.miniPopup.success("保存成功");
            // 可以自定义延迟消失时间，时间单位是秒
            // v.miniPopup.success({content: "操作成功", seconds: 5});

        });


        //取消 快捷按钮
        $(".shortcut_confirmbtn .cancelbtn").on('click',function () {
            $(".shortcut_cont").removeClass('edit');
            //判断快捷按钮组 是否包含显示的按钮
            shortcut_group();
        });
    }
});