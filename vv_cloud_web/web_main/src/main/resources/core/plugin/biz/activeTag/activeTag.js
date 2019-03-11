define(["jquery","text!./template/tag.html","templateweb","corectr"],function($,tagstr,template,corectr){
	//获取html模板，模板间用注释分割
	var regex=/<![-]{2}\s*(\w+)\s*[-]{2}>([\w\W]+?)<![-]{2}\s*\1\s*end\s*[-]{2}>/g;
	var result;
	var tplObj=new Object();
	while(result=regex.exec(tagstr)){
		tplObj[RegExp.$1]=RegExp.$2.replace(/^\s+|\s+$/gm,'');
	};
	$.activeTag=function(options,el){
		this.settings = $.extend( true, {}, $.activeTag.defaults, options );
		this.el = el;
		this.init();
	}
	
	
	$.extend($.activeTag,{
		
		defaults:{
			name:"",
			edit:true,
			type:"withopt",
			key:{
				text:"full_name",
				id:"id",
				hide:""
			},
			optClass:{
				del:"activeTag_dele",
				operate:"activeTag_opt",
				wrap:"activeTag_wrap"
			},
			callbacks:{
/*				del,
				delall,
				operate,
				empty,
				fill*/
			}
		},
		
		setDefaults: function( settings ) {
			$.extend( $.activeTag.defaults, settings );
		},
		
		prototype: {
			
			init:function(){
				var config=this.settings;
				var renderdata=config.data
				if(renderdata){
					this.data=$.isArray(renderdata)?renderdata:[renderdata];
				}else{
					this.data=[];
				}
				this.el.find('*').remove();
				this.render(this.data);
				this.bindevent();
				
			},
			
			refresh:function(initdata){
				var config=this.settings;
				var renderdata=initdata;
				if(renderdata){
					this.data=$.isArray(renderdata)?renderdata:[renderdata];
				}else{
					this.data=[];
				}
				this.el.find('*').remove();
				this.render(this.data);
			},
			
			all:function(){
				var config=this.settings;
				this.el.find("."+config.optClass.wrap).addClass("active");
				return this.data;
			},
			
			add:function(data){
				if(!data){
					return;
				}
				var config=this.settings;
				var render_data=$.isArray(data)?data:[data];
				var target_data=[];
				var me=this;
				var ifadd=false;
				if(config.callbacks.add){
					var ifadd=config.callbacks.add(data[index],me);
					if(!ifadd){
						return;
					}
				}
				$.each(render_data,function(i,v){
					var exit=$.grep(me.data,function(n){
						if(typeof v=='string'){
							return n==v;
						}
						return n[config.key.id]==v[config.key.id];
					});
					if(exit.length){
						corectr.v.miniPopup.error("该权限已选择");
					}else{
						me.data.push(v);
						target_data.push(v);
					}
					
				});
				this.render(target_data,true);
			},
			
			del:function(index,wrap){
				var config=this.settings;
				var data=this.data;
				var me=this;
				if(config.callbacks.del){
					var ifdel=config.callbacks.del(data[index],wrap,me);
					if(!ifdel){
						return;
					}
				}
				data.splice(index,1);
				wrap.remove();
				this.isempty();
			},
			
			choose:function(){
				var choose=this.el.find("."+config.optClass.wrap+".active");
				var data=[];
				var me=this;
				choose.each(function(){
					var index=$(this).index();
					data.push(me.data[index]);
				});
				return data;
			},
			
			render:function(data,isnew){
				var config=this.settings;
				var tpl=tplObj[config.type];
				if(data){
					var render_data=$.isArray(data)?data:[data];
					var $html=$(template.render(tpl,{data:render_data,key:config.key,edit:config.edit,name:config.name}));
					if(isnew){
						$html.filter("."+config.optClass.wrap).addClass("new");
					}
					this.el.append($html);
				}
				this.isempty();
			},
			
			isempty:function(){
				var el=this.el
				var config=this.settings;
				var data=this.data;
				var me=this;
				if(!data||!data.length){
					config.callbacks.empty&&config.callbacks.empty(el,me);
				}else{
					config.callbacks.fill&&config.callbacks.fill(el,me);
				}
			},
			
			bindevent:function(){
				var el=this.el;
				var config=this.settings;
				var me=this;
				el.on("click","."+config.optClass.wrap,function(){
					el.find("."+config.optClass.wrap).removeClass("active");
					$(this).addClass("active");
				});
				el.on("click","."+config.optClass.operate,function(){
					var index=$(this).parents("."+config.optClass.wrap).index();
					var data=me.data[index];
					if(config.callbacks.operate){
						config.callbacks.operate(data,me);
					}
				});
				el.on("click","."+config.optClass.del,function(ev){
					ev.stopPropagation();
					var index=$(this).parents("."+config.optClass.wrap).index();
					var wrap=$(this).parents("."+config.optClass.wrap);
					me.del(index,wrap);
				});
				
			},
			
			getData:function(){
				return this.data;
			},
			
			delall:function(){
				var config=this.settings;
				var data=this.data;
				var me=this;
				if(config.callbacks.del){
					var ifdel=config.callbacks.delall(data,me);
					if(ifdel){
						data=[];
						this.el.find("."+config.optClass.wrap).remove();
					}
					return;
				}
				this.data=data=[];
				this.el.find("."+config.optClass.wrap).remove();
				this.isempty();
				console.log(this.data)
			}
		}
	});
	
	$.fn.activeTag=function(options){
		if ( !this.length ) {
			if ( options && options.debug && window.console ) {
				console.warn( "啥也没有" );
			}
			return;
		}
		var activeTag = $.data( this[ 0 ], "activeTag" );
		if ( activeTag ) {
			return activeTag;
		}
		activeTag = new $.activeTag( options, this);
		$.data( this[ 0 ], "activeTag", activeTag );
		return activeTag;
	}
});