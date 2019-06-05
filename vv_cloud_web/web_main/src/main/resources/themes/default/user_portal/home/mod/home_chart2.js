define([ 'jquery', 'corectr', "echarts","vEchartsSkin"], function($, corectr, echarts, vEchartsSkin) {

	var myChart = null;
	
	/* ======================= 业务模块强制的开发规范 ======================= */
	var _initoptions=function(opts){
		opts.$todom=$("#home_chart2_lyt");
		
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
		var remoteMonths = null;
		var remoteYears = null;
		var referralMonths = null;
		var referralYears = null;
		var appointYears = null;
		var appointMonths = null;
		
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
				$.each(result.datas, function(index, val){
					var dataObj = eval("["+ val + "]");//转换为json对象 
					if("remote" == index){
						remoteMonths = dataObj[0].month;
						remoteYears = dataObj[0].year;
					}else if("referral" == index){
						referralMonths = dataObj[0].month;
						referralYears = dataObj[0].year;
					}else{
						appointMonths = dataObj[0].month;
						appointYears = dataObj[0].year;
					}
				});
			}
	     });
		
		//初始化echarts实例
		myChart = echarts.init(document.getElementById('reticularChart'));
		//add by guanhao 初始化echart图表
		var option = {
		    title: {
		        
		    },
		    tooltip : {
		        trigger: 'axis',
		        axisPointer: {
		            type: 'cross',
		            label: {
		                backgroundColor: '#6a7985'
		            }
		        }
		    },
		    legend: {
		        data:['申请量','待处理量','完成量']
		    },
		    toolbox: {//自定义工具栏（本月/本年切换）
		        feature: {
		            myTool1: {
		                show: true,
		                title: '本月',
		                icon: 'image://http://echarts.baidu.com/images/favicon.png',
		                onclick: function (){
	                		refreshData(remoteMonths, referralMonths, appointMonths, option);
		                }
		            },
		            myTool2: {
		                show: true,
		                title: '本年',
		                icon: 'image://http://echarts.baidu.com/images/favicon.png',
		                onclick: function (){
	                		refreshData(remoteYears, referralYears, appointYears, option);
		                }
		            }
		        }
		    },
		    grid: {
//		        left: '3%',
//		        right: '4%',
//		        bottom: '3%',
//		        containLabel: true
		    },
		    xAxis : [
		        {
		            type : 'category',
		            boundaryGap : false,
		            data : ['远程会诊','双向转诊','预约中心']
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value'
		        }
		    ],
		    series : [
		        {
		            name:'申请量',
		            type:'line',
		            areaStyle: {}
		        },
		        {
		            name:'待处理量',
		            type:'line',
		            areaStyle: {}
		        },
		        {
		            name:'完成量',
		            type:'line',
		            areaStyle: {}
		        }
		    ]
		};
		refreshData(remoteMonths, referralMonths, appointMonths, option);
		//myChart.setOption(option);
		
	}
	
	/**
	 * 刷新曲线图数据
	 */
	function refreshData(remoteDatas, referralDatas, appointDatas, option){
	     if(!myChart){
	          return;
	     }
	     //更新数据
	     //var option = myChart.getOption();
	     option.series[0].data = [remoteDatas[0], referralDatas[0], appointDatas[0]];   
	     option.series[1].data = [remoteDatas[1], referralDatas[1], appointDatas[1]];   
	     option.series[2].data = [remoteDatas[2], referralDatas[2], appointDatas[2]];   
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