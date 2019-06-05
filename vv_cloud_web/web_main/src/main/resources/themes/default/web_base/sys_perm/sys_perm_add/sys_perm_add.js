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

        var data={param:{}};
        $.ajax({
            url:sys_config.base_serverpath+"/rolemenu/querySysMenu",
            data:JSON.stringify(data),
            success:function(data){
                var checkData=$.grep(data.datas,function(n){
                    return n.checked==true
                });
                var menuData=$.each(checkData,function(i,checkn){
                    if(checkn.pId){
                        var pdata=$.grep(data.datas,function(n){
                            return n.id==checkn.pId;
                        });
                        if(pdata){
                            checkn.full_name=pdata[0].name+"/"+checkn.name;
                        }
                    }
                });
                $(".choose_list",$thispage).activeTag({
                    widthopt:false,
                    data:menuData,
                    callbacks:{

                        del:function(data,wrap,instance){
                            if(wrap.hasClass("active")&&instance.el.find(".active").length==1){
                                $.fn.zTree.init($("#role_perm_org_tree",$thispage), setting,[]);
                                $(".myhos [name='all_org_flag']",$thispage).prop("checked",false);
                                $(".myhos [name='all_detp_flag']",$thispage).prop("checked",false);
                                $(".myhos [name='all_detp_flag']",$thispage).hide();
                            }
                            return true;
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
                                $.fn.zTree.getZTreeObj("role_perm_tree").showNodes(treeNode.children)
                            }
                        }

                    }
                };
                $.fn.zTree.init($("#role_perm_tree",$thispage), setting, data.datas);

            }
        });

	};

	/* 模块页面事件绑定 */
	var _eventbind = function($thispage, renderdata, opts) {
        $("#role_add_save",$thispage).on("click",function(){
            var data={};
            data.param=$thispage.getformdata();
            if(!$("#role_add_form").valid()){
                return
            }
            var menulist=$(".choose_list",$thispage).activeTag().getData();
            var roleMenuList=[];

            $.each(menulist,function(i,n){
                var menuObj=new Object();
                menuObj.menu_id=n.id;

                roleMenuList.push(menuObj);

            });
            data.param.roleMenuList=roleMenuList;

            $.ajax({
                type :"post",
                url : sys_config.base_serverpath+"/power/sys/addSysRole",
                data:JSON.stringify(data),
                success : function(result) {
                    corectr.v.message.success({content:result.message});
                    opts.vpopup.data("closeType","submit");
                    opts.vpopup.remove();
                }
            });
        });
        $("#role_add_cancle",$thispage).on("click",function(){
            opts.vpopup.remove();
        });
        $("#role_perm_tree_search",$thispage).click(function(){
            var keywords=$("#role_perm_tree_input",$thispage).val()
            zTreeSearch.search("role_perm_tree",keywords);
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