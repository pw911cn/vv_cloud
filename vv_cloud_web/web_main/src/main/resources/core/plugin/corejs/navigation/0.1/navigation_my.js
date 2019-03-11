define(["jquery","templateweb","text!plugin/corejs/navigation/0.1/navigationtpl.html",'plugin/corejs/v/0.2.1/v.min'],function($,template,menustr,v){
    
	//获取html模板，模板间用注释分割
	var regex=/<![-]{2}\s*(\w+)\s*[-]{2}>([\w\W]+?)<![-]{2}\s*\1\s*end\s*[-]{2}>/g;
	var result;
	var tplObj=new Object();
	while(result=regex.exec(menustr)){
		tplObj[RegExp.$1]=RegExp.$2.replace(/^\s+|\s+$/gm,'');
	};
	

	template.defaults.imports.subMenutpl=function(data){
		var renderdata={renderdata:data}
		return template.render(tplObj["sub"],renderdata);
	};
	
	function _creatMenu(json){
		var data=json.data;
		var keyMap={
			menuId: "menu_id",
			parentId: "p_id"
		};
		var group={
			root:[]
		}
		var arr=[];
		for(var i=0;i<data.length;i++){
			var parentId=data[i][keyMap.parentId];
			var key=parentId?parentId:"root";
			if(!group[key]){
				group[key]=[];
			}
			group[key].push(data[i]);
		}
		
		for(var j=0;j<group.root.length;j++){
			
			_subMenu(group.root[j],group,arr)
			
		}		
		$(json.el).html("<div class='syind_menu'>"+template.render(tplObj["root"],{root:arr})+"</div>");
		var menuTextClass = "group_title",
	    liClass = '.hasarr',
	    openClass = "open",
	    activeClass = "active",
	    subMenuClass = "sub-menu",
	    iconClass = "group_icon",
	    isAccordion=json.isAccordion,
	    delay = 200,
	    aFilter = ".syind_menu_ul li a";
		if(location.hash!="#"&&location.hash!=""){
			var target=location.hash;
			var $a = $(json.el).find('a[href=\'' + target + '\']');
			if ($a.length === 1) {
				$(aFilter).removeClass(activeClass);
				$a.addClass(activeClass);
				//isAccordion，默认为true开启手风琴效果，如果设为false，则可以同时展开多个菜单
				if (isAccordion) {
					$(json.el).find('.' + openClass).removeClass(openClass);
					$(json.el).find('.' + subMenuClass).hide();
				}
				/*el.find(`.${openClass}`).removeClass(openClass);
	el.find(`.${subMenuClass}`).hide();*/
				$(json.el).find("ul").has($a).show();
				$(json.el).find("li").has($a).addClass(openClass);
			}
		}

		$(json.el).on("click", aFilter, function (ev) {
			var $thisLi = $(this).parent('li');
			var $submenutemp = $(this).siblings('.' + subMenuClass);
			var menunum = $submenutemp.length;
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
				$(aFilter).removeClass(activeClass);
				$(this).addClass(activeClass);
				if($(this).attr("open_style")=="11"){
					var toHref=$(this).attr("href");
					v.popup({
						// 弹窗标题，支持html
						
						// 弹窗标题(文本|function($wrap,popupInstance)|html)
						content: function ($wrap, popupInstance) {
							str="<iframe width='100%' height='100%' src='"+toHref+"'></iframe>";
							$wrap.html(str);
						},
						// 宽度(100|0.6),小于1的值将作为百分比
						width: .7, // .5 === "50%"
						// 高度(100|0.6),小于1的值将作为百分比
						height: .7, // 400 === 400px
						// 按钮
						buttons: [
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
						],
						// 点击模态背景是否可以关闭弹窗
						modalCloseable: true
					});
					ev.preventDefault();
				}else if($(this).attr("open_style")=="20"){
					uri=$(this).attr("href");
					var new_to=window.open("_blank");
					new_to.location=uri;
					ev.preventDefault();
				}
			}
		});
		
		function _subMenu(current,group,arr){
			arr.push(current);
			var menuId=current[keyMap.menuId];
			var menuGroup=group[menuId];
			if(menuGroup){
				current.children=[];
				for(var k=0;k<menuGroup.length;k++){
					_subMenu(menuGroup[k],group,current.children);
				};
			}
		}
		
		function _active(){
			
		}
		
	}
	return {
		creatMenu:_creatMenu
	}
});