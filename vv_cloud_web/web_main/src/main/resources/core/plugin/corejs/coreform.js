define(["jquery"],function($)
{
    var
        rCRLF = /\r?\n/g,
        manipulation_rcheckableType = /^(?:checkbox|radio)$/i,
        rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
        rsubmittable = /^(?:input|select|textarea|keygen)/i;

    jQuery.fn.extend({
        getformdata: function () {
            var that = this,
            o={},
            data=this.map(function () {
                // Can add propHook for "elements" to filter or add form elements
                var elements = jQuery.prop(this, "elements");
                return elements ? jQuery.makeArray(elements) : jQuery.makeArray($(this).find("input,textarea,select"));
            })
                .filter(function () {
                    var type = this.type;
                    // Use .is(":disabled") so that fieldset[disabled] works
                    return this.name && !jQuery(this).is(":disabled") &&!jQuery(this).attr("overlook")&&
                        rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) &&
                        (this.checked || !manipulation_rcheckableType.test(type));
                })
				.map(function( i, elem ){
							var val = jQuery( this ).val();
				
							return val == null ?
								null :
								jQuery.isArray( val ) ?
									jQuery.map( val, function( val ){
										return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
									}) :
									{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				}).get();
                console.log(data)
            	$.each(data,function(){
            		var names=this.name.split(".");
            		if(names.length==1){
            			if (o[this.name] !== undefined) {
  			              if (!o[this.name].push) {
  			                  o[this.name] = [o[this.name]];
  			              }
  			              o[this.name].push(this.value || '');
  			          	} else {
  			              o[this.name] = this.value || '';
  			          	}
            		  return
            		}
            		
            		if(Object.prototype.toString.call(o[names[0]])=="[object Object]"){
            			if(!o[names[0]][names[1]]){
            				o[names[0]][names[1]]=this.value || '';
            			}else{
            				if(!o[names[0]][names[1]].push()){
                				o[names[0]][names[1]]=[o[names[0]][names[1]]];
                			}
            				o[names[0]][names[1]].push(this.value || '');
            			} 
            		}else{
            			o[names[0]]={};
            			o[names[0]][names[1]]=this.value||'';
            			
            		}
            		
            		
            		
            		
            		
            		
            		
            		
            		
/*					if (o[this.name] !== undefined) {
			              if (!o[this.name].push) {
			                  o[this.name] = [o[this.name]];
			              }
			              o[this.name].push(this.value || '');
			          } else {
			              o[this.name] = this.value || '';
			          }*/
            	});
            	return o;
        },
        writeformdata: function (data) {
            $.each(data, function (key, value) {
                var ele = $(this).find("[name='" + key + "']");

                if (ele.length == "0") {
                    return;
                } else if (ele.eq(0).attr("type") == "checked" || ele.eq(0).attr("type") == "radio") {
                    ele.prop("checked", false);
                    ele.each(function () {
                        if ($(this).val() == value) {
                            $(this).prop("checked", true);
                            return false
                        }
                    });
                } else {
                    ele.val(value);
                }
            });
        }
    });
})