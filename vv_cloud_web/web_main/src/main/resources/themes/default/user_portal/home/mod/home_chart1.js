define([ 'jquery', 'corectr', "echarts","vEchartsSkin"], function($, corectr, echarts, vEchartsSkin) {

	var myChart = null;
	
	/* ======================= 业务模块强制的开发规范 ======================= */
	var _initoptions=function(opts){
		opts.$todom=$("#home_chart1_lyt");
		
	}
	/* 修正初始化数据 */
	var _initdataconvert = function(renderdata) {
		
		return renderdata;
	};
	
	/* 模块页面初始化操作 */
	var _viewinit = function($thispage, renderdata) {
/*		corectr.loadMoudle({
			$todom:$("#home_todo_lyt",$thispage),
			module:"/xxxx/xxx/xxx/xx",
			initdata_param:{
				param:{
					
				},
				pageVo{
					pageSize:,
					pageNumber:
				}
			},
			initdata_url:"xxxx/xxx/xxxx"
		})*/
		//add by guanhao  柱形图 
		//初始化echarts实例
		myChart = echarts.init(document.getElementById('columnarChart'));
		//echart 指定图标的配置和数据
	    var option = {
				title:{
	                
	            },
			    legend: {},
			    tooltip: {},
			    dataset: {
			    	// 提供一份数据。
			    	dimensions: ['date', '申请量', '待处理量', '完成量'], 
			        source: [
//			        	{date: '远程会诊', '申请量': 43, '待处理量': 85, '完成量': 93},
//			        	{date: '双向转诊', '申请量': 83, '待处理量': 73, '完成量': 55},
//			        	{date: '预约中心', '申请量': 86, '待处理量': 65, '完成量': 82}
			        	//['date', '申请量', '待处理量', '完成量'],
			        	['远程会诊', 43, 85, 93],
			        	['双向转诊', 83, 73, 55],
			        	['预约中心', 86, 65, 82]
			        ]
			    },
			    xAxis: {type: 'category'}, // 声明一个 X 轴，类目轴（category）。默认情况下，类目轴对应到 dataset 第一列。
			    yAxis: {},   // 声明一个 Y 轴，数值轴。
			    series: [ //声明多个 图标类型系列，默认情况下，每个系列会自动对应到 dataset 的每一列。
			        {name:'申请量' ,type: 'bar'},  //柱状图bar、  折线line
			        {name:'待处理量', type: 'bar'},
			        {name:'完成量' ,type: 'bar'}
			    ]
		 };
	     //使用制定的配置项和数据显示图表
		 //myChart.setOption(option);
	    
		 $.ajax({
			url: statisticsPath,
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
				console.info(result);
				var remote = null;
				var referral = null;
				var appoint = null;
				$.each(result.datas, function(index, val){
					var dataObj = eval("["+ val + "]");//转换为json对象 
					if("remote" == index){
						remote = dataObj[0].day;
					}else if("referral" == index){
						referral = dataObj[0].day;
					}else{
						appoint = dataObj[0].day;
					}
				});
				refreshData(remote, referral, appoint, option);
			}
	     });
		 
	};
	
	/**
	 * 刷新柱型图数据
	 */
	function refreshData(remoteDatas, referralDatas, appointDatas, option){
	     if(!myChart){
	          return;
	     }
	     //更新数据
	     option.dataset.source[0] = ['远程会诊', remoteDatas[0], remoteDatas[1], remoteDatas[2]];
	     option.dataset.source[1] = ['双向转诊', referralDatas[0], referralDatas[1], referralDatas[2]];
	     option.dataset.source[2] = ['预约中心', appointDatas[0], appointDatas[1], appointDatas[2]];
	     
	     myChart.setOption(option);    
	}

	/* 模块页面事件绑定 */
	var _eventbind = function($thispage, renderdata, opts) {
		
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
});