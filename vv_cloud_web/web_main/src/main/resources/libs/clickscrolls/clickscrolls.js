"use strict";

define(["jquery","scroll_listtabs"], function ($,scroll_listtabs) {

	//现在只支持 用于内滚动的导航快速定位跳转。

    function clickscrolls(ops){

        //绑定这个对象的子元素li的点击跳转事件
        var $clickobj = ops.clickobj;
        //产生滚动条的对象
        var $scrollobj = ops.scrollobj;
        //滚动条元素内要跳转到的位置对象（对象数组）
        var $targetobj = ops.targetobj;

        var indexnum =0;
        //锚点跳转滑动效果
        $clickobj.on('click','li',function(){
            $(this).siblings('li').removeClass('active');
            $(this).addClass('active');
               indexnum = $(this).index();
            var target = $targetobj.eq(indexnum);

            var targetOffset = target.get(0).offsetTop;

            //console.log(targetOffset);
            $scrollobj.animate({
                scrollTop: targetOffset
            },300);
            scroll_listtabs.select_touch_bar();
        });





        $scrollobj.on('mouseover',function () {
            scrolls();
        })




        function scrolls(){
            // 滚动条高度
            var sTop = $scrollobj.scrollTop();
            // 获取子按钮对象
            var navli = $clickobj.find('li');

            var ECC_Num =  $scrollobj.outerHeight();

            var Tindexnum =0;
            navli.each(function (Tindex) {

                Tindexnum += $targetobj.eq(Tindex).outerHeight();
                if(sTop >= Tindexnum-ECC_Num-180) {
                    if(!$(this).hasClass('active')){
                        navli.eq(Tindex).addClass('active').siblings().removeClass('active');
                        scroll_listtabs.select_touch_bar();
                    }
                }

            })


        }


    }

    return clickscrolls;


});



