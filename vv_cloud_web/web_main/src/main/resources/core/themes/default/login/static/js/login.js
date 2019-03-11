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



//登录等待时间
var waitTimer = 1000;
_loginBtn.onclick = function () {
if(document.querySelector('#WisdomPlatform')){
    _no_Login.classList.add('loading');
    //这里写判断逻辑
    /**
     *   @ usernmae , password
     *   Login_Status = true;  成功
     *   Login_Status = false;  失败
     *
    */
    Login_Status = true;

    var waitTimerFunC = setTimeout(function () {
        clearTimeout(waitTimerFunC);
        if(Login_Status){
          //登录成功
            Login_Ok_FunC();
        }else {
        //登录失败
            Login_Error_FunC();
        }
    },waitTimer)


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
    _login_error_text.innerText = '';
    _no_Login.classList.remove('loading');
    _no_Login.classList.add('setexit-login');
    _yes_login.classList.add('fade-userinfor');
    _WisdomPlatform.classList.remove('no-login');
    _WisdomPlatform.classList.add('ok-login');
    _login_message.innerText = '欢迎使用以下产品';
}

//失败执行的方法
function Login_Error_FunC() {
     ///// 可以继续在这里写
    _no_Login.classList.remove('loading');
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