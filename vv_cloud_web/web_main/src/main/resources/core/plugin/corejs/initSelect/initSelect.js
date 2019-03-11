define(['jquery',"plugin/corejs/fuzzySearch/fuzzySearch"], function($) {
	
		$.fn.initSelect=function(zool){
			return this.each(function(){
				var wrap=$(this);
				$(this).find("select[mode='only']").each(function(){
					var me=$(this);
					var data={param:{}};
					var default_vale=$(this).attr("default_value");
					data.param.type_key=$(this).attr("type_key");
					var optstr='<option title="--请选择--" value="">--请选择--</option>';
					$.ajax({
						url:server_zuulpath+"/dictData/pullDown",
						data:JSON.stringify(data),
						success:function(data){
							var result=data.datas;
							$.each(result,function(key,value){
								optstr+='<option title="'+value.data_name+'" value="'+value.data_value+'" '+(default_vale&&default_vale.length&&value.data_value==default_vale?'selected=true ':' ')+'>'+value.data_name+'</option>';
								
							});
							console.log(optstr)
							me.html(optstr);
						}
					});
				});
				if($(this).find("input[mode='province']").length){
					if($(this).find("input[mode='province']").val()&&$(this).find("input[mode='province']").length){
						wrap.find("input[mode='city']").prop("disabled",false);
					}
					$(this).find("input[mode='province']").fuzzySearch({
						url: server_zuulpath+"/dictData/dimQuery",
						key:"data_name",
						data: function(){
							return {param:{
								type_key:"PUB.PROVINCE"
							}}
						},
						/*
						返回参数是json数组时,点选某个搜索结果以后会回调该方法,开发人员需要为input赋值
						返回结果是字符串数组时,此参数为可选参数
						-----------------------
						item:被选择的搜索结果,
						$input:input的jquery对象,
						resultArr:搜索列表数据
						 */
						active: function (item, $input, resultArr) {
							$input.val(item.data_name);
							$input.parent().siblings("input").val(item.data_value);
							wrap.find("input[mode='city']").val("");
							wrap.find("input[mode='city']").parent().siblings("input").val("");
							wrap.find("input[mode='area']").val("");
							wrap.find("input[mode='area']").parent().siblings("input").val("");
							if(item==""){
								wrap.find("input[mode='city']").prop("disabled",true);
								wrap.find("input[mode='area']").prop("disabled",true);
								return
							}
							wrap.find("input[mode='city']").prop("disabled",false);
							wrap.find("input[mode='area']").prop("disabled",true);
						},
						/*
						 返回结果是json数组的时候,该方法必须存在,否则会报错.依赖该方法渲染搜索结果列表
						 返回结果是字符串数组的时候,该参数是可选参数. 如果该方法存在,就调该方法.
						 */
						render: function (item, $li) {
							var leftHtml = "<div style='float:left; width:auto;'>" + item.data_name + "</div>";
							$li.html(leftHtml);
						},
						// 可选参数,是否允许发送空关键字,默认fasel不发送空关键字请求
						emptyKeywords: {
							// 点击input后,是否允许空关键字也发送ajax
							enable: true,
							// 可选参数,空关键字返回的结果列表标题
							title: "搜索"
						},
						// 可选参数,是否严格匹配搜索结果,默认false不严格匹配
						matching: true,
						// 可选参数,是否需要分页,默认false无分页,
						pagination: {
							// 默认pageNumber=1;
							// pageNumber:3,
							// 默认pageSize=10;
							pageSize:5
						}
				});
				}
				
				if($(this).find("input[mode='city']").length){
					if($(this).find("input[mode='city']").val()&&$(this).find("input[mode='city']").length){
						wrap.find("input[mode='area']").prop("disabled",false);
					}
					$(this).find("input[mode='city']").fuzzySearch({
						url: server_zuulpath+"/dictData/dimQuery",
						key:"data_name",
						data: function(){
							return {param:{
								type_key:"PUB.CITY",
								p_value:wrap.find("input[mode='province']").parent().siblings("input").val()
							}}
						},
						/*
						返回参数是json数组时,点选某个搜索结果以后会回调该方法,开发人员需要为input赋值
						返回结果是字符串数组时,此参数为可选参数
						-----------------------
						item:被选择的搜索结果,
						$input:input的jquery对象,
						resultArr:搜索列表数据
						 */
						active: function (item, $input, resultArr) {
							$input.val(item.data_name);
							$input.parent().siblings("input").val(item.data_value);
							wrap.find("input[mode='area']").val("");
							wrap.find("input[mode='area']").parent().siblings("input").val("");
							if(item==""){
								wrap.find("input[mode='area']").prop("disabled",true);
								return
							}
							wrap.find("input[mode='area']").prop("disabled",false);
						},
						/*
						 返回结果是json数组的时候,该方法必须存在,否则会报错.依赖该方法渲染搜索结果列表
						 返回结果是字符串数组的时候,该参数是可选参数. 如果该方法存在,就调该方法.
						 */
						render: function (item, $li) {
							var leftHtml = "<div style='float:left; width:auto;'>" + item.data_name + "</div>";
							$li.html(leftHtml);
						},
						// 可选参数,是否允许发送空关键字,默认fasel不发送空关键字请求
						emptyKeywords: {
							// 点击input后,是否允许空关键字也发送ajax
							enable: true,
							// 可选参数,空关键字返回的结果列表标题
							title: "搜索"
						},
						// 可选参数,是否严格匹配搜索结果,默认false不严格匹配
						matching: true,
						// 可选参数,是否需要分页,默认false无分页,
						pagination: {
							// 默认pageNumber=1;
							// pageNumber:3,
							// 默认pageSize=10;
							pageSize:5
						}
				});
				}
				
				if($(this).find("input[mode='area']").length){
					$(this).find("input[mode='area']").fuzzySearch({
						url: server_zuulpath+"/dictData/dimQuery",
						key:"data_name",
						data: function(){
							return {param:{
								type_key:"PUB.AREA",
								p_value:wrap.find("input[mode='city']").parent().siblings("input").val()
							}}
						},
						/*
						返回参数是json数组时,点选某个搜索结果以后会回调该方法,开发人员需要为input赋值
						返回结果是字符串数组时,此参数为可选参数
						-----------------------
						item:被选择的搜索结果,
						$input:input的jquery对象,
						resultArr:搜索列表数据
						 */
						active: function (item, $input, resultArr) {
							$input.val(item.data_name);
							$input.parent().siblings("input").val(item.data_value);
						},
						/*
						 返回结果是json数组的时候,该方法必须存在,否则会报错.依赖该方法渲染搜索结果列表
						 返回结果是字符串数组的时候,该参数是可选参数. 如果该方法存在,就调该方法.
						 */
						render: function (item, $li) {
							var leftHtml = "<div style='float:left; width:auto;'>" + item.data_name + "</div>";
							$li.html(leftHtml);
						},
						// 可选参数,是否允许发送空关键字,默认fasel不发送空关键字请求
						emptyKeywords: {
							// 点击input后,是否允许空关键字也发送ajax
							enable: true,
							// 可选参数,空关键字返回的结果列表标题
							title: "搜索"
						},
						// 可选参数,是否严格匹配搜索结果,默认false不严格匹配
						matching: true,
						// 可选参数,是否需要分页,默认false无分页,
						pagination: {
							// 默认pageNumber=1;
							// pageNumber:3,
							// 默认pageSize=10;
							pageSize:5
						}
				});
				}
				
				if($(this).find("input[mode='hospital']").length){
					if($(this).find("input[mode='hospital']").val()&&$(this).find("input[mode='hospital']").length){
						wrap.find("input[mode='departments']").prop("disabled",false);
					}
					$(this).find("input[mode='hospital']").fuzzySearch({
						url: server_zuulpath+"/base_org_hosp/list",
						key:"org_name",
						data: function(){
							return {param:{
								
							}}
						},
						/*
						返回参数是json数组时,点选某个搜索结果以后会回调该方法,开发人员需要为input赋值
						返回结果是字符串数组时,此参数为可选参数
						-----------------------
						item:被选择的搜索结果,
						$input:input的jquery对象,
						resultArr:搜索列表数据
						 */
						active: function (item, $input, resultArr) {
							$input.val(item.org_name);
							$input.parent().siblings("input").val(item.org_id);
							wrap.find("input[mode='departments']").val("");
							wrap.find("input[mode='departments']").parent().siblings("input").val("");
							if(item==""){
								wrap.find("input[mode='departments']").prop("disabled",true);
								return
							}
							wrap.find("input[mode='departments']").prop("disabled",false);
						},
						/*
						 返回结果是json数组的时候,该方法必须存在,否则会报错.依赖该方法渲染搜索结果列表
						 返回结果是字符串数组的时候,该参数是可选参数. 如果该方法存在,就调该方法.
						 */
						render: function (item, $li) {
							var leftHtml = "<div style='float:left; width:auto;'>" + item.org_name + "</div>";
							$li.html(leftHtml);
						},
						// 可选参数,是否允许发送空关键字,默认fasel不发送空关键字请求
						emptyKeywords: {
							// 点击input后,是否允许空关键字也发送ajax
							enable: true,
							// 可选参数,空关键字返回的结果列表标题
							title: "搜索"
						},
						// 可选参数,是否严格匹配搜索结果,默认false不严格匹配
						matching: true,
						// 可选参数,是否需要分页,默认false无分页,
						pagination: {
							// 默认pageNumber=1;
							// pageNumber:3,
							// 默认pageSize=10;
							pageSize:5
						}
				});
				}
				
				if($(this).find("input[mode='departments']").length){
					$(this).find("input[mode='departments']").fuzzySearch({
						url: server_zuulpath+"/base_dept/list",
						key:"dept_name",
						data: function(){
							return {param:{
								org_id:wrap.find("input[mode='hospital']").parent().siblings("input").val()
							}}
						},
						/*
						返回参数是json数组时,点选某个搜索结果以后会回调该方法,开发人员需要为input赋值
						返回结果是字符串数组时,此参数为可选参数
						-----------------------
						item:被选择的搜索结果,
						$input:input的jquery对象,
						resultArr:搜索列表数据
						 */
						active: function (item, $input, resultArr) {
							$input.val(item.dept_name);
							$input.parent().siblings("input").val(item.dept_id);
						},
						/*
						 返回结果是json数组的时候,该方法必须存在,否则会报错.依赖该方法渲染搜索结果列表
						 返回结果是字符串数组的时候,该参数是可选参数. 如果该方法存在,就调该方法.
						 */
						render: function (item, $li) {
							var leftHtml = "<div style='float:left; width:auto;'>" + item.dept_name + "</div>";
							$li.html(leftHtml);
						},
						// 可选参数,是否允许发送空关键字,默认fasel不发送空关键字请求
						emptyKeywords: {
							// 点击input后,是否允许空关键字也发送ajax
							enable: true,
							// 可选参数,空关键字返回的结果列表标题
							title: "搜索"
						},
						// 可选参数,是否严格匹配搜索结果,默认false不严格匹配
						matching: true,
						// 可选参数,是否需要分页,默认false无分页,
						pagination: {
							// 默认pageNumber=1;
							// pageNumber:3,
							// 默认pageSize=10;
							pageSize:5
						}
				});
				}


				
				
			});
		};
});