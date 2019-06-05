define([ 'jquery', 'corectr'], function($, corectr) {

	
	
	/* ======================= 业务模块强制的开发规范 ======================= */
	
	/*
	 * 修正加载模块时的参数【可选】
	 *@param {Object} [opts],load模块时传入的参数
	*/
    var menuId;
	var _initoptions=function(opts){
		opts.$todom=$(".tms4SubIndex_mainData_lyt");
		
	}
	/* 
	 * 修正初始化数据【可选】 
	 * @param {Object} [renderdata]渲染模板的数据
	 * 
	 * */
	var _initdataconvert = function(renderdata) {
		
		return renderdata;
	};
	
	/* 
	 * 插入目标dom前【可选】 
	 * @param {jQuery Object} [$thispage] 模板渲染后的jq对象
	 * @param {Object} [renderdata]用于渲染模板的数据
	 * @param {Object} [opts]load模块时的配置对象
	 * 
	 * */
	var _beforeappend = function($thispage,renderdata,opts) {
		
		return renderdata;
	};
	
	
	/* 模块页面初始化操作
	 * @param {jQuery Object} [$thispage] 模板渲染后的jq对象
	 * @param {Object} [renderdata]用于渲染模板的数据
	 * @param {Object} [opts]load模块时的配置对象
	 *  
	 *  */
	var _viewinit = function($thispage, renderdata,opts) {
        menuId=opts.initdata_param.menu_id
        table=null;
        var data={}
        data.param={
            menuId:menuId
        }
        data.pageVo={

        }
        tableInit($thispage,data);
	};

	/* 模块页面事件绑定
	 * @param {jQuery Object} [$thispage] 模板渲染后的jq对象
	 * @param {Object} [renderdata]用于渲染模板的数据
	 * @param {Object} [opts]load模块时的配置对象
	 *  
	 *  
	 *  */
	var _eventbind = function($thispage, renderdata, opts) {
        $("#addBtn",$thispage).on('click',function() {
            corectr.v.popup({
                width: 1000,
                height: 800,
                title: "添加权限组",
                type:"GET",
                content:function($wrap, instance){
                    corectr.loadmodule({
                        module : "web_base/sys_perm/sys_perm_add/sys_perm_add",
                        $todom : $wrap,
                        vpopup:instance,
                        renderdata:{
                            menuId:menuId
                        }


                    });
                },
                closeCallback:function($wrap, instance){
                    if(instance.data("closeType")&&instance.data("closeType")=="submit"){
                        corectr.v.message.success({content:"新增成功"});
                        table.refresh();
                        console.log("成功")
                    }

                }
            })

        });
        $("#role_list_searchbtn",$thispage).on("click",function(){
            var param=$("#role_list_searchform").getformdata();
            param.menuId=menuId;
            var data={};
            data.param=param;
            data.pageVo={
                pageSize:10,
                pageNumber:1
            };
            tableInit($thispage,data);
        });
	};
	
	/* 卸载dom */
	var _uninstall=function(){
		
	}
    function choose(sys_group_id){
        corectr.v.popup({
            width: 1000,
            height: 800,
            title: "功能调整",
            type:"GET",
            content:function($wrap, instance){
                corectr.loadmodule({
                    module : "web_base/sys_perm/sys_perm_choose/sys_perm_choose",
                    $todom : $wrap,
                    vpopup:instance,
                    renderdata:{
                        sys_group_id:sys_group_id,
                        menuId:menuId
                    }
                });
            },
            closeCallback:function($wrap, instance){
                if(instance.data("closeType")&&instance.data("closeType")=="submit"){
                    corectr.v.message.success({content:"修改成功"});
                    table.refresh();
                    console.log("成功")
                }

            }
        })

    }

    //修改
    function role_edit(sys_group_id){
        corectr.v.popup({
            width: 600,
            height: 300,
            title: "修改权限组信息",
            type:"GET",
            content:function($wrap, instance){
                corectr.loadmodule({
                    module : "web_base/sys_perm/sys_perm_edit/sys_perm_edit",
                    $todom : $wrap,
                    vpopup:instance,
                    initdata_param:{
                        param:{
                            sys_group_id:sys_group_id
                        }
                    },
                    initdata_url:sys_config.base_serverpath+"/power/sys/queryOneSysRole"
                });
            },
            closeCallback:function($wrap, instance){
                if(instance.data("closeType")&&instance.data("closeType")=="submit"){
                    table.refresh();
                    corectr.v.message.success({content:"修改成功"});
                }

            }
        })
    }
    //冻结解冻
    function role_toggle_freeze(flag,sys_group_id){
        var confirmIns =corectr.v.vConfirm({
            // 可选参数，自定义标题
            title: "操作",
            content: flag==1?"确定解冻吗？":"确定冻结吗？",
            // 可选参数，点击确认按钮调用
            confirmHandler: function () {
                var data={param:{}};
                data.param.sys_group_id=sys_group_id;
                data.param.flag=flag;
                $.ajax({
                    type :"post",
                    url : sys_config.base_serverpath+"/power/sys/editSysPowerRole",
                    data:JSON.stringify(data),
                    xhrFields : {
                        withCredentials : false
                        // 跨域访问需要覆盖为false
                    },
                    contentType:"application/json",
                    success : function(result) {
                        corectr.v.message.success({content:result.message});
                        table.refresh();
                    },
                    error:function(){
                        corectr.v.message.error({content:"失败"});
                    }
                });
            },
            // 可选参数，点击取消按钮调用
            cancelHandler: function () {
                console.log("vConfirm cancelHandler()");
            }
        });

    }

    //初始化表格
    function tableInit($thispage,data) {
        if(!table){
            // 变量table是表格实例
            table =corectr.v.table({
                // 承载表格的容器
                el: $(".platmana_comlist_tablewrap",$thispage),
                // 定义表格列
                columns: [
                    {
                        title: "权限组名称",
                        width: 400,
                        align: "center",
                        // 该列分配表格剩余宽度的比例，默认值1
                        // 缩放比例是0将固定宽度
                        scale: 3,
                        render: "rowData.sys_group_name"
                    },
                    {
                        title: "权限组状态", width: 300,
                        align: "center",
                        render: function(data,table){
                            var $stateHtml;
                            if(data.rowData.flag == '1'){
                                //正常
                                $stateHtml = $("<span class='platmana_permlist_state_normal'>正常</span>");
                            }else if(data.rowData.flag == '0'){
                                //冻结
                                $stateHtml = $("<span class='platmana_permlist_state_invalid'>无效</span>");
                            }else{
                                $stateHtml = $("<span class='platmana_permlist_state_frozen'>冻结</span>");
                            }
                            $stateHtml.appendTo(data.$td);
                        }

                    },
                    {
                        title: "操作", width: 400,
                        align: "center",
                        render: function(data,table){
                            //创建多个按钮
                            var $btnwrap = $("<div class='xBtn-multi'></div>");

                            var $btn0 = $("<button class='xBtn xBtn-default' type='button'>功能调整</button>");
                            $btn0.on('click',function () {
                                choose(data.rowData.sys_group_id);
                            });
                            $btn0.appendTo($btnwrap);

                            var $btn1 = $("<button class='xBtn xBtn-default' type='button'>修改</button>");
                            $btn1.on('click',function () {
                                role_edit(data.rowData.sys_group_id);
                            });
                            $btn1.appendTo($btnwrap);


                            var $btn2;
                            if(data.rowData.flag == '1'){
                                //冻结
                                $btn2 = $("<button class='xBtn xBtn-warning' type='button'>冻结</button>");
                            }else if(data.rowData.flag == '2'){
                                //解冻
                                $btn2 = $("<button class='xBtn xBtn-success' type='button'>解冻</button>");
                            }
                            $btn2.on("click",function(){
                                var flag;
                                if(data.rowData.flag == '1'){
                                    flag="2";
                                }else if(data.rowData.flag == '2'){
                                    flag="1"
                                }
                                role_toggle_freeze(flag ,data.rowData.sys_group_id);
                            });
                            $btn2.appendTo($btnwrap);

                            $btnwrap.appendTo(data.$td);
                        }

                    }
                ],
                // 有分页
                pagination:data.pageVo,
                // 表格发送请求并渲染返回的数据，与$.ajax()用法相同
                ajax: {url: sys_config.base_serverpath+"/power/sys/sysGroupList",
                    data:{param:data.param},
                    success:function(data){
                        var pageVo=data.datas;
                        data=pageVo;
                    }
                }

            });
            console.log(table)
        }else{
            table.ajax({data:data});
        }
    }
	return {
		initoptions:_initoptions,
		initdataconvert : _initdataconvert,
		beforeappend:_beforeappend,
		viewinit : _viewinit,
		eventbind : _eventbind,
		uninstall:_uninstall
	};
});