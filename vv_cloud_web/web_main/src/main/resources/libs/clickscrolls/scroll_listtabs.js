define(['jquery'],function ($) {



    function select_touch_bar() {
        var clicks = 0,serverMtop = -80,liwrapNum = 80,btn_index = 0,half_index = 0,sw_server_timer = null,Focus_Timer = 3,mousewheelNum = 1,listli_Max=0;


        var $selelist = $('.select-server-list');
        var $listli = $(".select-server-list li");
        var $selectlistui = $(".select-server-list ul");
        var selelist_height = $selelist.outerHeight();
        var listli_Max = ($listli.length)- Math.ceil(selelist_height / liwrapNum)+1;



        $listli.each(function (index) {
            if($(this).hasClass('active')){
                btn_index = index;
                see_selelist_viwe(btn_index);
            }
        })



    //点击事件
    $listli.on('click',function(e){
        // 点击某一个
        btn_index = $(this).index();
        $listli.removeClass('active');
        $listli.eq(btn_index).addClass('active');
        see_selelist_viwe(btn_index);

    })

    // 滚动




    //滚动显示列表区域

    function see_selelist_viwe(event) {

        var showViwe_length = Math.ceil(selelist_height / liwrapNum);
        var showViwe_page = Math.ceil($listli.length / showViwe_length);
        var showViwe_page_half = Math.ceil(Math.ceil(selelist_height / 2) / liwrapNum);
        var listliMaxlength = ($listli.length)- showViwe_length+1;


        if(event != undefined){
            if(event - showViwe_page_half >= 0){
                showViwe_page_half = event - showViwe_page_half;
                half_index = showViwe_page_half;
                if(half_index >= showViwe_length-1){
                    $selectlistui.stop().animate({marginTop:+serverMtop*(showViwe_length-1)});
                }
            }
        }


        if(showViwe_page_half <= btn_index) {

            if(half_index < listliMaxlength){
                half_index++;
                $selectlistui.stop().animate({marginTop:+serverMtop*half_index});
                clicks = half_index;
            }else{
                if(half_index>=listliMaxlength){
                    $selectlistui.stop().animate({marginTop:+serverMtop*listliMaxlength});
                }
            }


        }else {
            //初始化元素小于 6 个 点击次数，与相关次数置为零
            half_index = 0;
            clicks = 0
            $selectlistui.stop().animate({marginTop:0});
            //初始化第一位置为 不可点

        }
    }









};



    return {
        select_touch_bar:select_touch_bar
    };

    $(window).resize(function(){
        select_touch_bar();
    })



});
