define(['jquery',"text!./template/template.html","templateweb","plugin/corejs/fuzzySearch/fuzzySearch"], function($,tagstr,template) {
		
		//获取html模板，模板间用注释分割
		var regex=/<![-]{2}\s*(\w+)\s*[-]{2}>([\w\W]+?)<![-]{2}\s*\1\s*end\s*[-]{2}>/g;
		var result;
		var tplObj=new Object();
		while(result=regex.exec(tagstr)){
			tplObj[RegExp.$1]=RegExp.$2.replace(/^\s+|\s+$/gm,'');
		};
		
		$.fn.initFrom=function(opts){
			opts=opts||{};
			$(this).filter(".init-form-element").each(function(){
				var me=$(this);
				if(!(me.data("name")&&me.data("name").length&&me.data("qvalue")&&me.data("qvalue").length)){
					return;
				}
				var config=$.extend(true,{},$.fn.initFrom.defaults,me.data(),opts[me.data("name")]);
				var data={};
				var param={};
				param[config.qkey]=config.qvalue;
				data.param=param;
				console.log(config)
				$.ajax({
					url:config.url,
					data:JSON.stringify(data),
					success:function(data){
						var renderdata=data.datas;
						var defaults=config.defaults;
						$.each(renderdata,function(i,n){
							if(config.type=="checkbox"){
								if((typeof defaults=="string"&&defaults.length)||typeof defaults=="number"){
									if(config.defaults==n[config.value])n.checked=true;
								}
								if(Object.prototype.toString.call(defaults)=="[object Array]"&&defaults.length){
									$.each(defaults,function(j,v){
										if(typeof v=="string"||typeof v=="number"){
											if(v==n[config.value])n.checked=true;
										}else if(typeof v=="object"){
											if(!config.checkboxKey){
												return
											}
											if(v[config.checkboxKey]==n[config.value])n.checked=true;
										}
									});
								}
								if(Object.prototype.toString.call(defaults)=="[object Object]"){
									if(!config.checkboxKey){
										return
									}
									if(defaults[config.checkboxKey]==n[config.value])n.checked=true;
								}
								if(defaults===undefined&&i==0){
									n.checked=true
								}
							}else{
								if(defaults===undefined&&i==0){
									n.checked=true
								}
								if(defaults!==undefined&&defaults==n[config.value])n.checked=true;
							}
						});
						
						var htmlstr=template.render(tplObj[config.type],{data:renderdata,config:config});
						me.html(htmlstr);
					}
				});
			});
			
			
		};
		
		$.fn.initFrom.defaults={
				url:sys_config.base_serverpath+"/dictData/pullDown",
				qkey:"type_key",
				text:"data_name",
				value:"data_value",
				type:"select",
				empty:true,
				firstName:"请选择",
				firstValue:"",
				
		}
		
		function isJSON(str) {
		    if (typeof str == 'string') {
		        try {
		            var obj=JSON.parse(str);
		            if(typeof obj == 'object' && obj ){
		                return true;
		            }else{
		                return false;
		            }

		        } catch(e) {
		            console.log('error：'+str+'!!!'+e);
		            return false;
		        }
		    }
		    console.log('It is not a string!')
		}
});