define([ 'jquery', 'corectr'], function($, corectr) {

	
	
	/* ======================= 业务模块强制的开发规范 ======================= */
	var _initoptions=function(opts){
		
	}
	/* 修正初始化数据 */
	var _initdataconvert = function(renderdata) {
		
		return renderdata;
	};
	
	/* 模块页面初始化操作 */
	var _viewinit = function($thispage, renderdata) {
        var sys_group_id=renderdata.sys_group_id
        var data={param:{}};
        data.param.sys_group_id=sys_group_id;
        $.ajax({
            url:sys_config.base_serverpath+"/rolemenu/querySysMenu",
            data:JSON.stringify(data),
            success:function(data){
                var checkData=$.grep(data.datas,function(n){
                    return n.checked==true
                });
                $.each(checkData,function(i,checkn){
                    checkn.full_name=getFullName(checkn,data.datas);
                });
                function getFullName(checkn,alldata,arr){
                    arr=arr||[];
                    arr.unshift(checkn.name);
                    if(checkn.pId){
                        var pdata=$.grep(alldata,function(n){
                            return n.id==checkn.pId;
                        });
                        if(pdata.length>0){
                            return getFullName(pdata[0],alldata,arr)
                        }
                    }else{
                        return arr.join("/");
                    }

                }
                var menuData=checkData;
                $(".choose_list",$thispage).activeTag({
                    widthopt:false,
                    data:menuData,
                    callbacks:{
                        del:function(data,wrap,instance){
                            var updata={param:{}};
                            updata.param.sys_group_id=sys_group_id;
                            updata.param.menu_id=data.id;
                            var isdel=false;
                            if(wrap.hasClass("new")){
                                if(wrap.hasClass("active")&&instance.el.find(".active").length==1){
                                    $.fn.zTree.init($("#role_choose_org_tree",$thispage), setting,[]);
                                    $(".myhos [name='all_org_flag']",$thispage).prop("checked",false);
                                    $(".myhos [name='all_detp_flag']",$thispage).prop("checked",false);
                                    $(".myhos [name='all_detp_flag']",$thispage).hide();
                                }
                                return true;
                            }
                            $.ajax({
                                url:sys_config.base_serverpath+"/rolemenu/delRoleMenu",
                                data:JSON.stringify(updata),
                                async:false,
                                success:function(data){
                                    if(data.status=="20"){
                                        isdel=false;
                                        return;
                                    }
                                    isdel=true;
                                },
                                error:function(){
                                    isdel=false;
                                }
                            });
                            return isdel;
                        },
                        empty:function(el){
                            el.siblings(".nodata").show();
                        },
                        fill:function(el){
                            el.siblings(".nodata").hide();
                        }
                    }

                });
                var setting = {
                    check : {
                        //enable : true
                    },
                    view : {
                        selectedMulti : true
                    },
                    data : {
                        simpleData : {
                            enable : true
                        }
                    },
                    callback : {
                        beforeClick: function(treeId, treeNode, clickFlag){
                            if(treeNode.children){
                                return false;
                            }
                        },
                        onClick : function(event, treeId, treeNode){
                            var data=$.extend(true,{},treeNode);
                            var pNode=treeNode.getParentNode();
                            if(pNode){
                                data.full_name=pNode.name+"/"+treeNode.name;
                            }else{
                                data.full_name=data.name;
                            }
                            $(".choose_list",$thispage).activeTag().add(data);
                        },
                        beforeExpand:function(treeId, treeNode){
                            if(treeNode.isParent){
                                $.fn.zTree.getZTreeObj("role_perm_choosetree").showNodes(treeNode.children)
                            }
                        }
                    }
                };
                $.fn.zTree.init($("#role_perm_choosetree",$thispage), setting, data.datas);

            }
        });
	};

	/* 模块页面事件绑定 */
	var _eventbind = function($thispage, renderdata, opts) {
        $("#role_choose_save",$thispage).on("click",function(){
            var sys_group_id=renderdata.sys_group_id;
            var data={};
            data.param=$thispage.getformdata();
            var menulist=$(".choose_list",$thispage).activeTag().getData();
            var roleMenuList=[];
            $.each(menulist,function(i,n){
                if($(".choose_list",$thispage).find("li").eq(i).hasClass("new")){
                    var menuObj=new Object();
                    menuObj.menu_id=n.id;
                    menuObj.sys_role_id=sys_group_id;
                    roleMenuList.push(menuObj);
                }
            });
            data.param.roleMenuList=roleMenuList;
            $.ajax({
                type :"post",
                url : sys_config.base_serverpath+"/power/sys/updateSysRoleMenu",
                data:JSON.stringify(data),
                success : function(result) {
                    corectr.v.message.success({content:result.message});
                    opts.vpopup.data("closeType","submit");
                    opts.vpopup.remove();
                }
            });
        });
        $("#role_choose_cancle",$thispage).on("click",function(){
            opts.vpopup.remove();
        });
        $("#role_choose_permtree_search",$thispage).click(function(){
            var keywords=$("#role_choose_permtree_input",$thispage).val()
            zTreeSearch.search("role_perm_choosetree",keywords);
        });
	};
	
	var _uninstall=function(){
		
	}
	return {
		initoptions:_initoptions,
		initdataconvert : _initdataconvert,
		viewinit : _viewinit,
		eventbind : _eventbind,
		uninstall:_uninstall
	};
});