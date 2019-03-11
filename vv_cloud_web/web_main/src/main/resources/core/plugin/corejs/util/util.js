define(["jquery"],function($){
	var util={};
	util.dateFormat=function(fmt,datestr){
	  var date=new Date(datestr);
	  var weektext=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
	  var o = {   
	    "M+" : date.getMonth()+1,                 //月份   
	    "d+" : date.getDate(),                    //日   
	    "h+" : date.getHours(),                   //小时   
	    "m+" : date.getMinutes(),                 //分   
	    "s+" : date.getSeconds(),                 //秒  
	    "q+" : Math.floor((date.getMonth()+3)/3), //季度   
	    "S"  : date.getMilliseconds(),             //毫秒   
	    "w"  : weektext[date.getDay()]           //星期
	  };   
	  if(/(y+)/.test(fmt))  
	    fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));   
	  for(var k in o)   
	    if(new RegExp("("+ k +")").test(fmt))   
	  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
	  return fmt; 
	}
	util.datediffer=function(datestr){
		var date=new Date(datestr).getTime();
		var now=new Date().getTime();
		var differ=date-now;
		var sign="+";
		if(differ<0){
			sign="-";
		}
		differ=Math.abs(differ);
		var day=Math.floor(differ/(1000*60*60*24));
		var hour=Math.floor(differ%(1000*60*60*24)/(1000*60*60));
		var min=Math.floor(differ%(1000*60*60)/(1000*60));
		var s=Math.floor(differ%(1000*60)/1000);
		return {
			sign:sign,
			day:day,
			hour:hour,
			min:min,
			s:s
		}
	}
	
	return util;
});