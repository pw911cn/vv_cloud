var sys_config={};

sys_config.version="4.0.1"+new Date().getTime();
//登录相关
sys_config.client_id="ylt";
sys_config.client_secret=123;
sys_config.scope="code";
sys_config.grant_type="code";
sys_config.redirect_uri="http://www.baidu.com";
//zuul地址
sys_config.zuul_serverpath="http://localhost:8010/cloud-zuul";
//基础数据系统
sys_config.base_serverpath = sys_config.zuul_serverpath+"/server-base"
//远程会诊系统
sys_config.cons_serverpath = sys_config.zuul_serverpath+"/server_cons";
















/*var sys_config={
		"version":"20190424",
		"server_zuulpath":"http://172.16.180.92:8543",
		"client_id":"ylt",
		"client_secret":123,
		"scope":"code",
		"grant_type":"code",
		"redirect_uri":"http://www.baidu.com",
		"server_zuulpath1":"http://172.16.180.92:8086"
	}*/


/*	 	(function(){
	var xhr = new XMLHttpRequest();
xhr.open('GET',"./config.json?"+new Date().getTime(), false);
xhr.onreadystatechange = function() {
  // readyState == 4说明请求已完成
  if (xhr.readyState == 4 && xhr.status == 200 || xhr.status == 304) { 
    // 从服务器获得数据 
    sys_config=JSON.parse(xhr.responseText);  
  }
};
xhr.send();
})();
console.log(sys_config)
var version=sys_config.version,
//server_zuulpath="http://172.16.180.135:7001"
server_zuulpath=sys_config.server_zuulpath1;
server_basepath=sys_config.server_zuulpath1+"/server_base";
server_conspath=sys_config.server_zuulpath1;*/