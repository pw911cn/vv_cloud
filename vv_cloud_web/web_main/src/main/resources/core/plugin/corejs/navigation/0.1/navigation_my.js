define(["jquery","templateweb","text!plugin/corejs/navigation/0.1/navigationtpl.html","util"],function($,template,menustr,util){
    
	//获取html模板，模板间用注释分割
	var regex=/<![-]{2}\s*(\w+)\s*[-]{2}>([\w\W]+?)<![-]{2}\s*\1\s*end\s*[-]{2}>/g;
	var result;
	var tplObj=new Object();
	
	while(result=regex.exec(menustr)){
		tplObj[RegExp.$1]=RegExp.$2.replace(/^\s+|\s+$/gm,'');
	};
	
	//template扩展，用于渲染子菜单
	template.defaults.imports.subMenutpl=function(data,keyMap){
		var renderdata={renderdata:data,keyMap:keyMap}
		return template.render(tplObj["sub"],renderdata);
	};
	
	var keyMap_defalut={
			menu_id:"menu_id",
			menu_name:"menu_name",
			p_id:"p_id",
			menu_url:"menu_url",
			menu_level:"menu_level",
			open_style:"open_style",
			is_open:"is_open",
			children:"children"
	}
	
	
	//创建菜单
	function _creatMenu(json){
	    var keyMap=$.extend(true,{},keyMap_defalut,json.keyMap),
		menuTextClass = "group_title",
	    liClass = '.hasarr',
	    openClass = "open",
	    activeClass = "active",
	    subMenuClass = "sub-menu",
	    iconClass = "group_icon",
	    isAccordion=json.isAccordion,
	    delay = 200,
	    aFilter = ".syind_menu_ul li a",
		arr=initJson(json.data);
		
		$(json.el).html("<div class='syind_menu'>"+template.render(tplObj["root"],{root:arr,keyMap:keyMap})+"</div>");
		
		
		$(json.el).on("click", aFilter, function (ev) {
			var $thisLi = $(this).parent('li');
			var $submenutemp = $(this).siblings('.' + subMenuClass);
			var menunum = $submenutemp.length;
			var me=$(this);
			if (menunum > 0) {
				var $submenu = $submenutemp.eq(0);
				if ($thisLi.hasClass(openClass)) {
					//收起当前菜单
					$submenu.slideUp(delay, function () {
						$thisLi.removeClass(openClass);
					});
				} else {
					//收起其他同级菜单，展开当前菜单
					$submenu.slideDown(delay, function () {
						$thisLi.addClass(openClass);
					});
					//isAccordion，默认为true开启手风琴效果，如果设为false，则可以同时展开多个菜单
					if (isAccordion) {
						$thisLi.siblings().children('.' + subMenuClass).slideUp(delay, function () {
							$thisLi.siblings().removeClass(openClass);
						});
					}
				}
			} else {
				var open_style=me.attr("open_style");
				var url=me.attr("href");
				ev.preventDefault();
				if(open_style!="30"){
					$(aFilter).removeClass(activeClass);
					$(this).addClass(activeClass);
				}
				if(open_style=="10"||open_style=="11"){
					$(".breadcrumb div").html('<a>'+$(".sysnav .active").html()+'</a>'+'<i class="comicon-right"></i>'+'<a>'+me.html()+'</a>');
				}
				if(open_style=="10"){
					url=util.changeUrlHashArg(me.attr("href"),"menu_id",me.attr("menu_id"));
					location.hash=url;				
					return;
				}
				var option={
					open_style:me.attr("open_style"),
					url:url,
					title:me.html()
				}
				if(me.attr("open_style")=="11"){
					location.hash=""
					option.$todom=$(".tms4SubIndex_mainData_lyt");
				}
				util.open(ev,option);
			}
			

			
		});
		
		if(location.hash!="#"&&location.hash!=""){
			var target=location.hash.split("!")[0];
			if(target.indexOf("web_")=="-1"){
				$(aFilter).each(function(){
					if($(this).attr("href")!="javascript:void(0)"&&$(this).next().length==0){
						$(this).click();
						return false;
					}
				});
			}
			var $a = $(json.el).find('a[href^=\'' + target + '\']');
			if ($a.length === 1) {
				$(aFilter).removeClass(activeClass);
				$a.addClass(activeClass);
				//isAccordion，默认为true开启手风琴效果，如果设为false，则可以同时展开多个菜单
				if (isAccordion) {
					$(json.el).find('.' + openClass).removeClass(openClass);
					$(json.el).find('.' + subMenuClass).hide();
				}
				$(json.el).find("ul").has($a).show();
				$(json.el).find("li").has($a).addClass(openClass);
				if($a.attr("open_style")=="10"||$a.attr("open_style")=="11"){
					$(".breadcrumb div").html('<a>'+$(".sysnav .active").html()+'</a>'+'<i class="comicon-right"></i>'+'<a>'+$a.html()+'</a>');
				}
			}
			

		}else{

		}
		
		//数据处理
		function initJson(json){
			var i,menu_id,p_id,
			children=keyMap.children,
			tmpObj={},
			targetArr=[];
			for(i=0;i<json.length;i++){
				console.log(json[i][keyMap.menu_id])
				tmpObj[json[i][keyMap.menu_id]]=json[i];
			}
			console.log(tmpObj);
			for(menu_id in tmpObj){
				p_id=tmpObj[menu_id][keyMap.p_id];
				if(p_id&&p_id in tmpObj){
					if(!tmpObj[p_id][children]){
						tmpObj[p_id][children]=[];
					}
					tmpObj[p_id][children].push(tmpObj[menu_id]);
				}else{
					targetArr.push(tmpObj[menu_id]);
				}
			}
			return targetArr;
		}
		
	}
	
	function _creatSysMenu(json){
		var keyMap=$.extend(true,{},keyMap_defalut,json.keyMap),
		activeClass="active";
		$navs=$(template.render(tplObj["nav"],{renderdata:json.data,keyMap:keyMap}));
		$navs.on("click","li",function(ev){
			var me=$(this);
			var open_style=me.attr("open_style");
			var url=me.attr("url");
			if(open_style!="30"){
				$navs.find("li").removeClass(activeClass);
				$(this).addClass(activeClass);
			}
			if(open_style=="10"||open_style=="11"){
				$(".breadcrumb div").html('<a>'+$(".sysnav .active").html()+'</a>');
			}
			if(open_style=="10"){
				url=util.changeUrlHashArg(me.attr("url"),"menu_id",me.attr("menu_id"));
				location.hash=url;
				return;
			}
			var option={
				open_style:me.attr("open_style"),
				url:url,
				title:me.html()
			}
			if(me.attr("open_style")=="11"){
				location.hash="";
				option.$todom=$(".tms4Index_cont_lyt");
			}
			util.open(ev,option);
			
		});
		
		$(json.el).append($navs);
		if(location.hash=="#"||location.hash==""){
			json.el.find(".sysnav li").eq(0).click();
		}else if(location.hash.split("/")[0].indexOf("web_")==-1){
			$navs.find("[url='"+location.hash.split("/")[0]+"']").siblings().removeClass(activeClass);
			$navs.find("[url='"+location.hash.split("/")[0]+"']").addClass(activeClass);
			$(".breadcrumb div").html('<a>'+$(".sysnav .active").html()+'</a>');
		}else{
			$navs.find("li").removeClass(activeClass);
			$navs.find("li").filter(function(){
				var url=$(this).attr("url");
				return url.substring(url.indexOf("#")+1,url.indexOf("!")==-1?undefined:url.indexOf("!"))=="user_portal/home/home";
			}).addClass(activeClass);
			$(".breadcrumb div").html('<a>'+$(".sysnav .active").html()+'</a>');
		}
		
	}
	return {
		creatMenu:_creatMenu,
		creatSysMenu:_creatSysMenu
	}
});