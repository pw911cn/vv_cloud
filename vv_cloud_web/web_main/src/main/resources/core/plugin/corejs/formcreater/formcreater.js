define(["jquery","templateweb","text!./template/form.html"],function($,template,formstr){
	//获取html模板，模板间用注释分割
	var regex=/<![-]{2}\s*(\w+)\s*[-]{2}>([\w\W]+?)<![-]{2}\s*\1\s*end\s*[-]{2}>/g;
	var result;
	var tplObj=new Object();
	while(result=regex.exec(formstr)){
		console.log(result);
		tplObj[RegExp.$1]=RegExp.$2.replace(/^\s+|\s+$/gm,'');
	};
	
	$.fn.formcreater=function(opts){
		if(!isArray(opts)){
			var temarr=[];
			temarr.push(opts);
			opts=temarr;
		}
		for(var i=0;i<opts.length;i++){
			if(!isArray(opts[i].values)){
				var temvalue=[];
				temvalue.push(opts[i].values);
				opts[i].values=temvalue;
			}
			var wraphtml=template.render(tplObj.wrap,{title:opts[i].title,mustfill:opts[i].mustfill,vert:opts[i].vert});
			var $wrap=$(wraphtml);
			var thiscont=$(".form-cont",$wrap);
			var formele=template.render(tplObj[opts[i].type],opts[i]);
			console.log(formele)
			thiscont.append(formele);
			$(this).append($wrap);
			
		}
		
	};
	
	function isArray(arr){
		return Object.prototype.toString.call(arr)=="[object Array]";
	}
});