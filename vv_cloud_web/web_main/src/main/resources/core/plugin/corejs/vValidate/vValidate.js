/**
 * @authors 1042482525@qq.com
 * @date    2018/8/10/0029 16:11:04
 */
"use strict";

define(["jquery","validate","validate_zh"], function ($,validate,validate_zh) {

    //var selector = '.valierror';
    var attrname;


    function _vVali(){
        //扩展验证规则正则
        extendAddMethod();
        //默认配置 错误提示和成功时执行方法
        setDefaults();
    }


    //默认配置 错误提示和成功时执行方法
    function setDefaults() {
        //设置默认
        $.validator.setDefaults({
            errorPlacement:function(error,element) {
                _errorPlacement(error,element);
            },
            success:function(error,element) {
                _success(error,element);
            }
/*
            //单条校验失败，后会调用此方法，在此方法中，编写错误消息如何显示 及  校验失败回调方法
            showErrors : function(errorMap, errorList) {
                console.log(errorMap);
                console.log(errorList);
                // 遍历错误列表
                for(var erri in errorList) {
                    // 自定义错误提示效果
                    flag++;
                    console.log('错了::'+flag+errorList[erri].message);
                }
                this.defaultShowErrors();
            },
*/

        });

    }




    //验证errorPlacement
    function _errorPlacement(error,element) {
        /*attrname = element.attr("name");
        var $errorshow = $(element).closest('form').find('.v-errorgroupshow[data-errorfor="'+attrname+ '"]');
        if($errorshow.length>0){
            $errorshow.eq(0).html($(error).html());
            $errorshow.fadeIn();
        }else{
            $(element).addClass('valierror').attr('data-v-tooltip','tl:'+error.html());
        }*/
        if($(error).text() != ""){  //错误不为空验证错误时
            attrname = element.attr("name");
            var $errorshow = $(element).closest('form').find('.v-errorgroupshow[data-errorfor="'+attrname+ '"]');
            if($errorshow.length>0){
                $errorshow.eq(0).html('<i class="vicon vicon-warning_fill"></i>'+$(error).html());
                $errorshow.fadeIn();
                $errorshow.addClass('errorshow');
            }else{
                $(element).addClass('valierror').attr('data-v-tooltip','tl:'+error.html());
            }
        }else {//验证成功时执行的代码
            successfunc(error,element);
        }
    }


    //验证success
    function _success(error,element) {
        successfunc(error,element);
    }


    //验证成功方法
    function successfunc(error,element) {
        attrname = $(element).attr("name");
        console.log(attrname);
        var $errorshow = $(element).closest('form').find('.v-errorgroupshow[data-errorfor="'+attrname+ '"]');
        if($errorshow.length>0){
            $errorshow.fadeOut();
            $errorshow.removeClass('errorshow');
        }
        $(element).removeClass('valierror');
        $(element).removeAttr('data-v-tooltip');
        $('.v02-tooltip-svg').remove();
/*
        $("body").on("mouseout", selector, function () {
            $(element).removeAttr('data-v-tooltip');
        });*/
    }





    //扩展验证规则正则
    function extendAddMethod() {

        // 字符验证，只能包含中文、英文、数字、下划线等字符。
        $.validator.addMethod("stringCheck", function(value, element) {
            return this.optional(element) || /^[a-zA-Z0-9\u4e00-\u9fa5-_]+$/.test(value);
        }, "只能包含中文、英文、数字、下划线等字符");

        // 手机号码验证
        $.validator.addMethod("isMobile", function(value, element) {
            var length = value.length;
            return this.optional(element) || (length == 11 && /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/.test(value));
        }, "请输入正确的手机号码");

        // 电话号码验证
        $.validator.addMethod("isPhone", function(value, element) {
            var tel = /^(\d{3,4}-?)?\d{7,9}$/g;
            return this.optional(element) || (tel.test(value));
        }, "请输入正确的的电话号码");

        // 联系电话(手机/电话皆可)验证
        $.validator.addMethod("isTel", function(value,element) {
            var length = value.length;
            var mobile = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/;
            var tel = /^(\d{3,4}-?)?\d{7,9}$/g;
            return this.optional(element) || tel.test(value) || (length==11 && mobile.test(value));
        }, "请输入正确的联系方式");

        // 邮政编码验证
        $.validator.addMethod("isZipCode", function(value, element) {
            var zip = /^[0-9]{6}$/;
            return this.optional(element) || (zip.test(value));
        }, "请输入正确的邮政编码");


        // 身份证号码验证
        $.validator.addMethod("isIdCardNo", function(value, element) {
            //var idCard = /^(\d{6})()?(\d{4})(\d{2})(\d{2})(\d{3})(\w)$/;
            return this.optional(element) || isIdCardNo(value);
        }, "请输入正确的身份证号码");

        //身份证号码的验证规则
        function isIdCardNo(num){
            //if (isNaN(num)) {alert("输入的不是数字！"); return false;}
            var len = num.length, re;
            if (len == 15)
                re = new RegExp(/^(\d{6})()?(\d{2})(\d{2})(\d{2})(\d{2})(\w)$/);
            else if (len == 18)
                re = new RegExp(/^(\d{6})()?(\d{4})(\d{2})(\d{2})(\d{3})(\w)$/);
            else {
                //alert("输入的数字位数不对。");
                return false;
            }
            var a = num.match(re);
            if (a != null)
            {
                if (len==15)
                {
                    var D = new Date("19"+a[3]+"/"+a[4]+"/"+a[5]);
                    var B = D.getYear()==a[3]&&(D.getMonth()+1)==a[4]&&D.getDate()==a[5];
                }
                else
                {
                    var D = new Date(a[3]+"/"+a[4]+"/"+a[5]);
                    var B = D.getFullYear()==a[3]&&(D.getMonth()+1)==a[4]&&D.getDate()==a[5];
                }
                if (!B) {
                    //alert("输入的身份证号 "+ a[0] +" 里出生日期不对。");
                    return false;
                }
            }
            if(!re.test(num)){
                //alert("身份证最后一位只能是数字和字母。");
                return false;
            }
            return true;
        }





    }










    _vVali();

    return {
        vVali:_vVali,
        errorPlacement:_errorPlacement,
        success:_success
    };


});



