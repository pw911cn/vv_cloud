define([ 'jquery', 'corectr', 'util' ], function($, corectr, util) {

	
	
	/* ======================= 业务模块强制的开发规范 ======================= */
	var _initoptions=function(opts){
		opts.$todom=$(".tms4SubIndex_mainData_lyt");
		
	}
	/* 修正初始化数据 */
	var _initdataconvert = function(renderdata) {
		
		return renderdata;
	};
	
	/* 模块页面初始化操作 */
	var _viewinit = function($thispage, renderdata, opts) {
		$(".tms4SubIndex_menu").find("a").removeClass("active");
		$(".tms4SubIndex_menu").find("a[href='#user_portal/home/mod/home_workspace_warning']").addClass("active");
		
		initAlertList('empty', 'empty', 'empty', 'empty');
	};

	/* 模块页面事件绑定 */
	var _eventbind = function($thispage, renderdata, opts) {
		$("button[name='alertSearch']").unbind("click").bind("click", function(){
			var alertedType = $("select[name='alertedType']").val();
			alertedType = (alertedType != "")? alertedType: 'empty';
			
			var hospitalName = $("input:text[name='hospitalName']").val();
			hospitalName = (hospitalName != null && hospitalName != "")? hospitalName: 'empty';
			
			var timeType = $(":radio[name='timeType']:checked").val();
			var startTime = "";
			var endTime = "";
			if (timeType == "all"){
				startTime = "empty";
				endTime = "empty";
			} else if (timeType == "today"){
				startTime = parseInt(util.getTodayStartDate());
				endTime = parseInt(util.getTodayEndDate());
			} else if (timeType == "tswk"){
				startTime = parseInt(util.getWeekStartDate());
				endTime = parseInt(util.getWeekEndDate());
			} else if (timeType == "month"){
				startTime = parseInt(util.getMonthStartDate());
				endTime = parseInt(util.getMonthEndDate());
			}
			
			initAlertList(alertedType, hospitalName, startTime, endTime);
		})
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
	
	function initAlertList(alertedType, hospitalName, startTime, endTime){
		/*var url = "http://127.0.0.1:9094/icenter/home/alerted/more/list/zhangpengfei/"+ startTime +"/"+ endTime +"/empty/"+ hospitalName +"/"+ alertedType +"/1/10";
		$.ajax({
			url: url,
			type : "GET",
			dataType : 'json',
			async : false,
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
				$(".home_ws_com_info .infocont .infotext .number").eq(0).text(result.countAll);
				$(".home_ws_com_info .infocont .infotext .number").eq(1).text(result.countCondition);
				$('.home_ws_com_list .home_ws_com_table').empty();
				var html = "";
				
				$.each(result.data, function(index, val){
					html = "<tr>";
					html += "<td class=\"td_typenode home_com_unread\">";
					html += "	<div class=\"td_typewrap\">";
					switch (val.alertedType){
						case '远程会诊':
							html += "<div class='tms4Home_type_tag tms'>" + val.alertedType + "</div>";
							break;
						case '双向转诊':
							html += "<div class='tms4Home_type_tag ref'>" + val.alertedType + "</div>";
							break;
						case '院间互动':
							html += "<div class='tms4Home_type_tag among'>" + val.alertedType + "</div>";
							break;
						case '远程门诊':
							html += "<div class='tms4Home_type_tag otp'>" + val.alertedType + "</div>";
							break;
					}
					html += "		<div class=\"node\"><span class=\"nodeicon\"></span><span class=\"nodetext\">"+ val.processStatus +"</span></div>";
					html += "	</div>";
					html += "</td>";
					html += "<td>";
					html += "	<div class=\"textcont\">患者："+ val.patientName +"</div>";
					html += "	<div class=\"textcont\">来自："+ val.from +"</div>";
					html += "</td>";
					html += "<td>";
					html += "	<div class=\"textcont\">申请方：";
					html += "		<span class=\"text\">"+ val.reqHospital +"</span>";
					html += "		<span class=\"oblique\">/</span>";
					html += "		<span class=\"text\">"+ val.reqDeptOne +"</span>";
					html += "		<span class=\"oblique\">/</span>";
					html += "		<span class=\"text\">"+ val.reqDoctor +"</span>";
					html += "	</div>";
					html += "	<div class=\"textcont\">会诊方：";
					html += "		<span class=\"text\">"+ val.respHospital +"</span>";
					html += "		<span class=\"oblique\">/</span>";
					html += "		<span class=\"text\">"+ val.respDeptOne +"</span>";
					html += "		<span class=\"oblique\">/</span>";
					html += "		<span class=\"text\">"+ val.respDoctor +"</span>";
					html += "	</div>";
					html += "</td>";
					html += "<td>";
					html += "	<div class=\"textcont\">操作截止日期："+ util.dateFormat('yyyy-MM-dd hh:mm:ss', new Date(parseInt(val.deadLine))) +"</div>";
					var above = util.datediffer(new Date(parseInt(val.deadLine)));
					if (above.sign == '-')
						html += "	<div class=\"textcont\"><span class=\"dangertext\">已超时 "+ above.day +" 天</span></div>";
					else
						html += "	<div class=\"textcont\"><span class=\"warningtext\">还有 "+ above.day +" 天</span></div>";
					html += "</td>";
					html += "<td class=\"td_pushtime\">";
					html += "	<div class=\"pushtime\">"+ util.dateFormat('yyyy-MM-dd hh:mm:ss', new Date(parseInt(val.updateDate))) +"</div>";
					html += "</td>";
					html += "</tr>";
					
					$('.home_ws_com_list .home_ws_com_table').append(html);
				});
			}
	    });*/
	};
});