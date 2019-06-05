/*
 * jQuery Rebox [http://trentrichardson.com/examples/jQuery-Rebox]
 * By: Trent Richardson [http://trentrichardson.com]
 * 
 * Copyright 2014 Trent Richardson
 * Dual licensed under the MIT license.
 * http://trentrichardson.com/Impromptu/MIT-LICENSE.txt
 * 
 * V 1.1 
 * Date: 20160513
 * Desc: 增加旋转、缩放、还原功能
 * Author： zoume
 * 
 * V 1.2 
 * Date: 20160905
 * Desc: 放大缩小步幅为0.1 ，缩小的最小值不能小于0.1，防止缩小没有
 * Author： zoume
 * 
 * 
 */
(function($){
	$.rebox = function($this, options){
		this.settings = $.extend(true, {}, $.rebox.defaults, options);
		this.$el = $this;      // parent container holding items
		this.$box = null;      // the lightbox modal
		this.$items = null;    // recomputed each time its opened
		this.idx = 0;          // of the $items which index are we on
		this.enable();
	};

	$.rebox.defaults = { 
		theme: 'rebox',        // class name parent gets (for your css)
		selector: null,        // the selector to delegate to, should be to the <a> which contains an <img>
		prev: '&larr;',        // use an image, text, whatever for the previous button
		next: '&rarr;',        // use an image, text, whatever for the next button
		loading: '%',          // use an image, text, whatever for the loading notification
		close: '&times;',      // use an image, text, whatever for the close button
		speed: 400,            // speed to fade in or out
		zIndex: 1000,          // zIndex to apply to the outer container
		cycle: false,           // whether to cycle through galleries or stop at ends
		captionAttr: 'title',  // name of the attribute to grab the caption from
		template: 'image',     // the default template to be used (see templates below)
		templates: {           // define templates to create the elements you need function($item, settings)
			image: function($item, settings, callback){ 
				return $('<img src="'+ $item.attr('href') +'" class="'+ settings.theme +'-content" />').load(callback);
			},
			pdf : function($item, settings, callback){
			    //$.post(ctxPath+'/attachment/loadPdfPage.ajax',{'md5':'12d851f06dd037e2e33b0ac4040de1bb'}, function(res){
			    //    return callback(res);
			    //},'html');
			    var md5 = $item.data('md5');
			    var ifr = $('<iframe style="width:100%; max-width:1024px"  height="100%" src="'+ctxPath+'/attachment/loadPdfPage.ajax?md5='+md5+'"  >')
			    $('.rebox-contents').empty().append(ifr);
			},
			none : function($item, settings, callback){
			     $('.rebox-contents').empty().append('<div style="margin-left: auto;margin-right: auto;color:white; margin-top:200px;">对不起，该格式的文件不支持在线浏览，请下载后使用！</div>');
			     
			} 
		}
	};

	$.rebox.setDefaults = function(options){
		$.rebox.defaults = $.extend(true, {}, $.rebox.defaults, options);
	};
	
	$.rebox.lookup = { i: 0 };

	$.extend($.rebox.prototype, {
		enable: function(){
				var t = this;

				return t.$el.on('click.rebox', t.settings.selector, function(e){
					e.preventDefault();
					t.open(this);
				});
			},
		open: function(i){
				var t = this;

				// figure out where to start
				t.$items = t.settings.selector === null? t.$el : t.$el.find(t.settings.selector);
				if(isNaN(i)){
					i = t.$items.index(i);
				}

				// build the rebox
				var box = '<div class="'+ t.settings.theme +' TmsCom_rebox" style="display:none;">'+
							'<a href="#" class="'+ t.settings.theme +'-close '+ t.settings.theme +'-button">'+ t.settings.close +'</a>' +
							'<a href="#" class="'+ t.settings.theme +'-prev '+ t.settings.theme +'-button"><i class="tms3-arrzuo"></i></a>' +
							'<a href="#" class="'+ t.settings.theme +'-next '+ t.settings.theme +'-button"><i class="tms3-arryou"></i></a>'+
//							'<a href="#" class="'+ t.settings.theme +'-prev '+ t.settings.theme +'-button">'+ t.settings.prev +'</a>' +
//							'<a href="#" class="'+ t.settings.theme +'-next '+ t.settings.theme +'-button">'+ t.settings.next +'</a>'+
							'<div class="'+ t.settings.theme +'-contents"></div>';
				if($(t.$items[i]).data('rebox-template') == "image"){
					//增加旋转功能
					box +='<div class="'+ t.settings.theme +'-operate"><span>'+
                            '<button class="clockwise tms3-turnright" title="顺时针转"></button>'+
                            '<button class="anticlockwise tms3-turnleft" title="逆时针转"></button>'+
                            '<button class="zoomin tms3-tobig" title="放大"></button>'+
                            '<button class="zoomout tms3-tosmall"  title="缩小"></button>'+
                            '<button class="restore tms3-toback" title="还原"></button>'+
                            '</span></div>';
				}
				box += '<div class="'+ t.settings.theme +'-caption"><p></p></div>' +
                        '</div>';
				t.$box = $(	box	).appendTo('body').css('zIndex',t.settings.zIndex).fadeIn(t.settings.speed)						
						.on('click.rebox','.'+t.settings.theme +'-close', function(e){ e.preventDefault(); t.close(); })
						.on('click.rebox','.'+t.settings.theme +'-next', function(e){ e.preventDefault(); t.next(); })
						.on('click.rebox','.'+t.settings.theme +'-prev', function(e){ e.preventDefault(); t.prev(); })
						.on('click.rebox','.'+t.settings.theme +'-contents', function(e){
							e.preventDefault();
							// if the content is clicked, go to the next, otherwise close
							/*  这块点击的话 会导致后面的拖拽方法失效 所以先注释掉
							if($(e.target).hasClass(t.settings.theme +'-content') && t.$items.length > 1){
															t.next();
														}else{
															t.close();
														}*/
							
						})
						.on('click.rebox','.clockwise', function(e){  t.addRotation(90); })
						.on('click.rebox','.anticlockwise', function(e){  t.addRotation(-90); })
						.on('click.rebox','.zoomin', function(e){  t.addScale(0.1); })
						.on('click.rebox','.zoomout', function(e){  t.addScale(-0.1); })
						.on('click.rebox','.restore', function(e){  t.restore(); });

				// add some key hooks
				$(document).on('swipeLeft.rebox', function(e){ t.next(); })
					.on('swipeRight.rebox', function(e){ t.prev(); })
					.on('keydown.rebox', function(e){
							e.preventDefault();
							var key = (window.event) ? event.keyCode : e.keyCode;
							switch(key){
								case 27: t.close(); break; // escape key closes
								case 37: t.prev(); break;  // left arrow to prev
								case 39: t.next(); break;  // right arrow to next
							}
						});

				t.$el.trigger('rebox:open',[t]);
				t.goto(i);
				return t.$el;			
			},
		close: function(){
				var t = this;

				if(t.$box && t.$box.length){
					t.$box.fadeOut(t.settings.speed, function(e){
						t.$box.remove();
						t.$box = null;
						t.$el.trigger('rebox:close',[t]);
					});
				}
				$(document).off('.rebox');
				
				return t.$el;
			},
		goto: function(i){
				var t = this,
					$item = $(t.$items[i]),
					captionVal = $item.attr(t.settings.captionAttr),
					$cap = t.$box.children('.'+ t.settings.theme +'-caption')[captionVal?'show':'hide']().children('p').text(captionVal),
					$bi = t.$box.children('.'+ t.settings.theme +'-contents'),
					$operate = t.$box.children('.'+ t.settings.theme +'-operate'),
					$img = null;
                
                if ($item.data('rebox-template') == "image") {
                    $operate.show();
                } else {
                    $operate.hide();
                }
                
				if($item.length){
					t.idx = i;
					$bi.html('<div class="'+ t.settings.theme +'-loading '+ t.settings.theme +'-button">'+ t.settings.loading +'</div>');
					
					$img = t.settings.templates[$item.data('rebox-template') || t.settings.template]($item, t.settings, function(content){ 
    						$bi.empty().append($(this));
					});

                    t.drag($img);

					if(t.$items.length == 1 || !t.settings.cycle){
						t.$box.children('.'+ t.settings.theme +'-prev')[i<=0 ? 'hide' : 'show']();
						t.$box.children('.'+ t.settings.theme +'-next')[i>=t.$items.length-1 ? 'hide' : 'show']();
					}
					t.$el.trigger('rebox:goto',[t, i, $item, $img]);
				}
				return t.$el;
			},
		drag: function(img){
		    $(img).draggable({
                        disabled: false,
                        containment: 'rebox-contents',
                        opacity: 0.4,
                        start   :function(event, ui){
                        },
                        stop: function(event, ui){
                        }
                    });
		},	
		prev: function(){
				var t = this;
				return t.goto(t.idx===0? t.$items.length-1 : t.idx-1);
			},
		next: function(){
				var t = this;
				return t.goto(t.idx===t.$items.length-1? 0 : t.idx+1);
			},
		disable: function(){
				var t = this;
				return t.close().off('.rebox').trigger('rebox:disable',[t]);
			},
		destroy: function(){
				var t = this;
				return t.disable().removeData('rebox').trigger('rebox:destroy');
			},
		option: function(key, val){
				var t = this;
				if(val !== undefined){
					t.settings[key] = val;
					return t.disable().enable();
				}
				return t.settings[key];
			},
		/* 判断是否支持 transition属性
		 * add by zoume
		 * date 20160513
		 */
		supportTransition :  function(){
                var s = document.createElement('p').style,
                    r = 'transition' in s ||
                            'WebkitTransition' in s ||
                            'MozTransition' in s ||
                            'msTransition' in s ||
                            'OTransition' in s;
                s = null;
                return r;
            },
         /* 增加 transition属性  顺时针旋转  逆时针旋转
         * add by zoume
         * date 20160513
         */   
         addRotation : function(rotation) {
             
             var t = this;
             $wrap = t.$box.children('.'+ t.settings.theme +'-contents').children('img');
             var oldRotate = $($wrap[0]).data("rotate") || 0;
             var oldScale = $($wrap[0]).data("scale") || 1;
             var newRotation = oldRotate + rotation;
             $($wrap[0]).data("rotate", newRotation);
             if ( t.supportTransition() ) {
                var deg = 'rotate(' + newRotation + 'deg)' + ' scale(' + oldScale + ')';
                $wrap.css({
                    '-webkit-transform': deg,
                    '-mos-transform': deg,
                    '-o-transform': deg,
                    'transform': deg
                 });
             } else {
                 $wrap.css( 'filter', 'progid:DXImageTransform.Microsoft.BasicImage(rotation='+ (~~((newRotation/90)%4 + 4)%4) +')');
             }
              t.drag($wrap[0]);
         },
         /* 增加 transition属性  放大缩小
         * add by zoume
         * date 20160513
         */ 
         addScale : function (scale) {
             var t = this;
             $wrap = t.$box.children('.'+ t.settings.theme +'-contents').children('img');
             var oldScale = $($wrap[0]).data("scale") || 1;
             var oldRotate = $($wrap[0]).data("rotate") || 0;
             var newScale = oldScale + scale;
             if(newScale < 0.1){
                 return;
             }
             
             $($wrap[0]).data("scale", newScale);
             if ( t.supportTransition() ) {
                var deg = 'scale(' + newScale + ')' + ' rotate(' + oldRotate + 'deg)';
                $wrap.css({
                    '-webkit-transform': deg,
                    '-mos-transform': deg,
                    '-o-transform': deg,
                    'transform': deg
                 });
             } else {
                 $wrap.css( 'filter', 'progid:DXImageTransform.Microsoft.BasicImage(scale='+ newScale +')');
             }
              t.drag($wrap[0]);
         },
         /* 增加 transition属性  还原
         * add by zoume
         * date 20160513
         */ 
         restore : function () {
             var t = this;
             $wrap = t.$box.children('.'+ t.settings.theme +'-contents').children('img');
             if ( t.supportTransition() ) {
                deg = 'none';
                $wrap.css({
                    '-webkit-transform': deg,
                    '-mos-transform': deg,
                    '-o-transform': deg,
                    'transform': deg
                 });
             } else {
                 //$wrap.css( 'filter', 'progid:DXImageTransform.Microsoft.BasicImage(scale='+ newScale +')');
             }
             
             $($wrap[0]).removeData("scale");
             $($wrap[0]).removeData("rotate");
              t.drag($wrap[0]);
         }   	
	});

	$.fn.rebox = function(o) {
		o = o || {};
		var tmp_args = Array.prototype.slice.call(arguments);

		if (typeof(o) == 'string'){ 
			if(o == 'option' && typeof(tmp_args[1]) == 'string' && tmp_args.length === 2){
				var inst = $.rebox.lookup[$(this).data('rebox')];
				return inst[o].apply(inst, tmp_args.slice(1));
			}
			else return this.each(function() {
				var inst = $.rebox.lookup[$(this).data('rebox')];
				inst[o].apply(inst, tmp_args.slice(1));
			});
		} else return this.each(function() {
				var $t = $(this);
				$.rebox.lookup[++$.rebox.lookup.i] = new $.rebox($t, o);
				$t.data('rebox', $.rebox.lookup.i);
			});
	};

	
})(window.jQuery || window.Zepto || window.$);