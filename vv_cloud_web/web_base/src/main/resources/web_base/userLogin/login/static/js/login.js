/** 登录区域居中 */
function Login_Center_resizeFunc() {
    var _Login_From_Wrap = document.querySelector('#Login_From_Wrap');
    var _Login_From_CenterWrap = document.querySelector('#Login_From_CenterWrap');
    var _Login_From_Wrap_Height = _Login_From_Wrap.clientHeight;
    var _Login_From_CenterWrap_Height = _Login_From_CenterWrap.clientHeight;
    if(_Login_From_Wrap_Height > _Login_From_CenterWrap_Height){
        var _Login_From_CenterWrap_MargginTop  = _Login_From_Wrap_Height/2 -  _Login_From_CenterWrap_Height/ 2;
        _Login_From_CenterWrap.style.marginTop = _Login_From_CenterWrap_MargginTop + 'px';
    }

};

//插画区域
function Login_illustration() {
    /** 插画计算区域 */
    var _logo_wrap = document.querySelector('#logo_wrap');
    var _illustration_wrap = document.querySelector('#illustration_wrap');
    var _logo_wrap_Height = _logo_wrap.clientHeight;
    var _logo_wrap_Top = _logo_wrap.offsetTop;
    var _new_Logo_OutHeight = _logo_wrap_Height + _logo_wrap_Top; // 头部+ LOGO高度
    _illustration_wrap.style.top = _new_Logo_OutHeight+40 + 'px'; // 数字为留白
}

//判断只有在PC端执行resize
if (!(navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
    Login_Center_resizeFunc();
    Login_illustration();
    //resize ，修正居中区域
    window.onresize =function () {
        Login_Center_resizeFunc();
        Login_illustration();
    }
}

// 登录状态
var Login_Status;
/** 登录点击事件 */
var _loginBtn= document.querySelector('#loginBtn');
// 未登录
var _no_Login= document.querySelector('#no_Login');
// 已登录
var _yes_login= document.querySelector('#yes_login');
//提示消息
var _login_message= document.querySelector('#login_message');
//  平台产品展示
var _WisdomPlatform = document.querySelector('#WisdomPlatform');
// 提示错误信息
var _login_error_text = document.querySelector('#login_error_text');
// 退出按钮
var _login_Exit = document.querySelector('#login_Exit');

jQuery(document).ready(function() {
	_login_error_text.innerText = '';
	$('#Login_From_CenterWrap input').keypress(function(e) {
		if (e.which == 13) {
			_loginBtn.onclick();
			return false;
		}
	});
});

//登录等待时间
var waitTimer = 1000;
_loginBtn.onclick = function () {
	if(document.querySelector('#WisdomPlatform')){
	    //_no_Login.classList.add('loading');
	    var username = $(":input[name='username']").val();
	    var password = $(":input[name='password']").val();
	    //username = 'zhaosi';
	    //password = '123456';
	    
	    $.ajax({
			url: "http://172.16.191.65:8543/auth2.0/login?client_id=ylt&client_secret=123&scope=code&grant_type=code&redirect_uri=http://www.baidu.com&username="+username+"&password="+password,
			type : "GET",
			dataType : 'json',
			async : true,
			data : "",
			cache : false,
			xhrFields : {
				withCredentials : false
			// 此处必须是false否则报跨域错误
			},
			beforeSend : function() {
				// 为了不影响主业务，需要覆盖ajax的全局参数设置，这里什么都不能做
			},
			complete : function(xmlHttpRequest, textStatus) {
				// 为了不影响主业务，需要覆盖ajax的全局参数设置，这里什么都不能做
			},
			error : function(xmlHttpRequest, textStatus, errorThrown) {
				console.info("请求发送失败:");
			},
			success : function(result) {
				/**
			     *   @ usernmae , password
			     *   Login_Status = true;  成功
			     *   Login_Status = false;  失败
			     *
			    */
			    Login_Status = false;
				
				if (result.status == '10') {
					Login_Status = true;
				} 
				
			    var waitTimerFunC = setTimeout(function () {
			        clearTimeout(waitTimerFunC);
			        if(Login_Status){
			    		$('#tmsForm').find('[name="userid"]').val(username);
			    		$('#tmsForm').find('[name="password"]').val(password);
			    		$('#tmsForm').submit();

			    		//医联体登录form提交
                        $('#yltForm').find('[name="username"]').val(username);
                        $('#yltForm').find('[name="password"]').val(password);
                        $('#yltForm').submit();

			    		//登录成功
			            Login_Ok_FunC();
			        }else {
			        	//登录失败
			            Login_Error_FunC();
			        }
			    },waitTimer)
			}
	    });
    }
}

//退出逻辑
if(_login_Exit){
    _login_Exit.onclick = function () {
        if(document.querySelector('#WisdomPlatform')){
            //初始化方法
            Login_Reset_FunC();
        }
    }
}



//成功执行的方法
function Login_Ok_FunC() {
    //登录成功样式, ///// 可以继续在这里写
    //_login_error_text.innerText = '';
    //_no_Login.classList.remove('loading');
    //_no_Login.classList.add('setexit-login');
    //_yes_login.classList.add('fade-userinfor');
    //_WisdomPlatform.classList.remove('no-login');
    //_WisdomPlatform.classList.add('ok-login');
    //_login_message.innerText = '欢迎使用以下产品';
    window.location.href = "http://localhost/index.htm#web_main/home/home";
}

//失败执行的方法
function Login_Error_FunC() {
     ///// 可以继续在这里写
    //_no_Login.classList.remove('loading');
    _login_error_text.innerText = '账号或密码错误,请重新输入';
}
//登录初始化方法
function Login_Reset_FunC() {
    _no_Login.classList.remove('loading');
    _no_Login.classList.remove('setexit-login');
    _yes_login.classList.remove('fade-userinfor');
    _WisdomPlatform.classList.add('no-login');
    _WisdomPlatform.classList.remove('ok-login');
    _login_message.innerText = '使用产品前请先登录';
    _login_error_text.innerText = '';
}