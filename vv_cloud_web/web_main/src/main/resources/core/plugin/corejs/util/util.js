define(["jquery","corectr"],function($,corectr){
	var util={},
	//URL解析正则
	url_reg=/^((?:[A-Za-z]+:)?\/{0,3}(?:[0-9.\-A-Za-z]+)?(?::\d+)?(?:\/[^?#]*)?)?(\?[^#]*)?(#.*)?$/,
	popUpCount=0;
	var now = new Date(); //当前日期
	var nowDayOfWeek = now.getDay(); //今天本周的第几天
	var nowDay = now.getDate(); //当前日
	var nowMonth = now.getMonth(); //当前月
	var nowYear = now.getYear(); //当前年
	nowYear += (nowYear < 2000) ? 1900 : 0; //
	var lastMonthDate = new Date(); //上月日期
	lastMonthDate.setDate(1);
	lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
	var lastYear = lastMonthDate.getYear();
	var lastMonth = lastMonthDate.getMonth();

	/*
	 *时间格式化
	 *@param {String}[ fmt] 日期格式，例"yyyy-MM-dd-hh-mm-ss"
	 *@param {String}|{Number} [datestr]日期时间戳或日期格式字符串
	 *@return {String} 日期格式字符串
	*/

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
	
	/*
	 *计算输入时间与当前时间差值
	 *@param {String}[ datestr] 日期时间戳或日期格式字符串
	 *@return {Object} {
			sign:"+",//符号
			day:1,//天
			hour:5,//小时
			min:8,//分
			s:24//秒
	}
	*/
	
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
	
	/*
	 *修改url字符串的hash参数
	 *@param {String}[url] url字符串
	 *@param {String}[arg] 要修改的参数名
	 *@param [arg_val] 要修改的参数值
	 *@param {String}[sign]hash值参数部分的分隔符，默认为'!'
	 *@return {String} 修改后的url
	*/
	
	util.changeUrlHashArg=function(url,arg,arg_val,sign){
	    var pattern=arg+'=([^&]*)',
	    sign=sign||"!",
	    replaceText=arg+'='+arg_val,
	    url_arr=url_reg.exec(url),
	    url_base=url_arr[1]?url_arr[1]:"",
	    url_query=url_arr[2]?url_arr[2]:"",
	    url_hash=url_arr[3]?url_arr[3]:"#",
	    temp="",
	    reg;
	    if(url_hash.match(pattern)){
	        tmp='('+ arg+'=[^&]*)';
	        reg=new RegExp(tmp,"gi");
	        tmp=url_hash.replace(reg,replaceText);
	        return url_base+url_query+tmp;
	    }else{ 
	        if(url_hash.indexOf(sign)!="-1"){
	            return url_base+url_query+url_hash+(url_hash.length>sign.length+1?"&&":"")+replaceText; 
	        }else{ 
	            return url_base+url_query+url_hash+sign+replaceText;
	        } 
	    }
	}
	
	/*
	 *修改url字符串的search参数
	 *@param {String}[url] url字符串
	 *@param {String}[arg] 要修改的参数名
	 *@param [arg_val] 要修改的参数值
	 *@return {String} 修改后的url
	*/
	
	util.changeUrlSearchArg=function(url,arg,arg_val){
	    var pattern=arg+'=([^&]*)',
	    sign=sign||"!",
	    replaceText=arg+'='+arg_val,
	    url_arr=url_reg.exec(url),
	    url_base=url_arr[1]?url_arr[1]:"",
	    url_query=url_arr[2]?url_arr[2]:"?",
	    url_hash=url_arr[3]?url_arr[3]:"",
	    temp="",
	    reg;
	    if(url_query.match(pattern)){
	        tmp='('+ arg+'=[^&]*)';
	        reg=new RegExp(tmp,"gi");
	        tmp=url_query.replace(reg,replaceText);
	        return url_base+tmp+url_hash;
	    }else{ 
	        return url_base+url_query+(url_query.length>1?"&&":"")+replaceText+url_hash;
	    }
	}
	
	/*
	 *修改url字符串的search参数
	 *@param {String}[url] url字符串
	 *@param {String}[arg] 要修改的参数名
	 *@param [arg_val] 要修改的参数值
	 *@return {String} 修改后的url
	*/
	
	util.getUrlSearch=function(){
	    url_query=location.search.substring(1);
	    return url_query?query(url_query):url_query;
	    
	    function query(url_query){
	    	var queryObj={},
	    	queryPreArr=url_query.split("&");
	    	for(var i=0;i<queryPreArr.length;i++){
	    		var arr=queryPreArr[i].split("=");
	    		queryObj[arr[0]]=arr[1];
	    	}
	    	
	    	return queryObj
	    }
	}
	
	/*
	 *菜单几种打开方式封装
	 *@param {Object}[event] 事件event
	 *@param {Object}[option] 设置对象
	 *@param {String}[option.url] 要打开的资源地址
	 *@param {String}[option.open_style] 打开方式 "10":div内嵌，"11":iframe内嵌，"20":新页签，"30":弹出iframe
	 *@param {Number}[option.width]弹窗宽,默认100%
	 *@param {Number}[option.height]弹窗高,默认100%
	 *@param {jQueryObject}[option.$todom]打开方式为"11"时的插入点
	 *@param {String}[option.title]打开方式为"30"时的标题
	*/
	
	util.open=function(event,option){
		event.preventDefault();
		var defaluts={
			width:1,
			height:1
		}
		option=$.extend(true,{},defaluts,option);
		if(option.open_style=="11"){
			var str="<iframe width='100%' height='100%' style='border:none' src='"+option.url+"'></iframe>";
			option.$todom.html(str);
		}else if(option.open_style=="20"){
			var new_to=window.open("_blank");
			new_to.location=option.url;
		}else if(option.open_style=="30"){
			var popUpId="test"+popUpCount;
			option.url=util.changeUrlSearchArg(option.url,"popUpId",popUpId);
			corectr.v.popup({
				content: function ($wrap, popupInstance) {
					$("<iframe width='100%' height='100%' style='border:none' src='"+option.url+"'></iframe>").appendTo($wrap);
//					$iframe.load(function(){
//						$iframe[0].contentWindow.postMessage(popUpId,option.url);
//						$iframe=null;
//					});
				},
				width:option.width,
				height:option.height,
				id:popUpId,
				title:option.title||"",
/*				buttons: [
					{
						// 按钮上的文字，如果仅仅定义text属性，则点击该按钮将移除弹窗
						text: "取消",
						// 按钮样式，如有多个样式用空格隔开
						class: "xBtn xBtn-default"
					},
					{
						// 按钮上的文字
						text: "确认",
						// 按钮点击事件，$wrap是弹窗容器，popupInstance是弹窗实例
						click: function ($wrap, popupInstance) {
							// 移除弹窗
							popupInstance.remove()
						},
						// 按钮样式，如有多个样式用空格隔开
						class: "xBtn xBtn-primary"
					}
				],*/
				modalCloseable: true
			});
			popUpCount++;

			
		}
		
		
	}
	

	
	//获得某月的天数
	util.getMonthDays=function(myMonth) {
	    var monthStartDate = new Date(nowYear, myMonth, 1);
	    var monthEndDate = new Date(nowYear, myMonth + 1, 1);
	    var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
	    return days;
	}
	
	//获得本周的开始时间
	util.getTodayStartDate=function() {
	    var weekStartDate = new Date(nowYear, nowMonth, nowDay);
	    return weekStartDate.getTime();
	}
	
	//获得本周的开始时间
	util.getTodayEndDate=function() {
	    var weekStartDate = new Date(nowYear, nowMonth, nowDay + 1);
	    return weekStartDate.getTime()-1;
	}
	
	//获得本周的开始时间
	util.getWeekStartDate=function() {
	    var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + 1);
	    return weekStartDate.getTime();
	}
	
	//获得本周的结束时间
	util.getWeekEndDate=function() {
	    var weekEndDate = new Date(nowYear, nowMonth, nowDay + (8 - nowDayOfWeek));
	    return weekEndDate.getTime()-1;
	}
	
	//获得本月的开始时间
	util.getMonthStartDate=function() {
	    var monthStartDate = new Date(nowYear, nowMonth, 1);
	    return monthStartDate.getTime();
	}
	
	//获得本月的结束时间
	util.getMonthEndDate=function() {
	    var monthEndDate = new Date(nowYear, nowMonth, this.getMonthDays(nowMonth)+1);
	    return monthEndDate.getTime()-1;
	}
	
	return util;
});