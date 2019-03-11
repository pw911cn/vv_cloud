define([ 'jquery', 'corectr','plugin/corejs/navigation/0.1/navigation_my','plugin/corejs/navigation/0.1/navigation'], function($, corectr,navigation_my,navigation) {

	
	
	/* ======================= 业务模块强制的开发规范 ======================= */
	var _initoptions=function(opts){
		opts.renderdata=opts.initdata_param;
	}
	/* 修正初始化数据 */
	var _initdataconvert = function(renderdata) {
		
		return renderdata;
	};
	
	/* 模块页面初始化操作 */
	var _viewinit = function($thispage, renderdata) {
		$.ajax({
			type:"get",
			url:"web_main/json/sysnav.json",
			dataType:"text",
			success:function(data){
				data=JSON.parse(data);
				var str="";
				var activeIndex=0;
				for(var i=0;i<data.length;i++){
					str+="<li><a style='color:white' href="+data[i].url+">"+data[i].text+"</a></li>"
				}
				$(".sysnav ul").html(str);
				$(".sysnav ul li").click(function(){
					$(".sysnav ul li").removeClass("active");
					$(this).addClass("active");
				});
				if(!location.hash||!location.hash=="#"){
					location.hash=$(".sysnav ul li a").eq(0).attr("href");
				}else{
					$(".sysnav ul li a").each(function(){
						console.log($(this).attr("href"))
						if($(this).attr("href")==location.hash||$(this).attr("href")==location.hash.split("/")[0]){
							activeIndex=$(this).parent().index();
							console.log(activeIndex)
							return false;
						}
					
					})
				}
				$(".sysnav ul li").removeClass("active");
				$(".sysnav ul li").eq(activeIndex).addClass("active");
			}
		});
	};

	/* 模块页面事件绑定 */
	var _eventbind = function($thispage, renderdata, opts) {

	};
	
	var _uninstall=function(){
		console.log("拜拜");
	}
	return {
		initoptions:_initoptions,
		initdataconvert : _initdataconvert,
		viewinit : _viewinit,
		eventbind : _eventbind,
		uninstall:_uninstall
	};
});