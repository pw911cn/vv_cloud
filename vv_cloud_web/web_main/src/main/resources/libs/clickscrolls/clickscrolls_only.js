"use strict";

define(["jquery"], function ($) {

    //现在只支持 用于内滚动的导航快速定位跳转。

    function clickscrolls(ops){

        //绑定这个对象的子元素li的点击跳转事件
        var $clickobj = ops.clickobj;
        //产生滚动条的对象
        var $scrollobj = ops.scrollobj;
        //滚动条元素内要跳转到的位置对象（对象数组）
        var $targetobj = ops.targetobj;

        //锚点跳转滑动效果
        $clickobj.on('click','li',function(){
            $(this).siblings('li').removeClass('active');
            $(this).addClass('active');
            var indexnum = $(this).index();
            var target = $targetobj.eq(indexnum);
            //var targetOffset = target.position().top;
            var targetOffset = target.get(0).offsetTop;
            $scrollobj.animate({
                scrollTop: targetOffset
            },300);
        });

        $scrollobj.scroll(scrolls);
        scrolls();

        function scrolls(){
            var sTop = $scrollobj.scrollTop();
            var acinavcont = $targetobj;
            var navli = $clickobj.find('li');
            for(var i=0;i<acinavcont.length;i++){
                //var ff = acinavcont.eq(i).position().top;
                var ff = acinavcont.eq(i).get(0).offsetTop;
                if(sTop >= ff-10){
                    navli.eq(i).addClass('active').siblings().removeClass('active');
                }
            }

        }


    }

    return clickscrolls;


});



