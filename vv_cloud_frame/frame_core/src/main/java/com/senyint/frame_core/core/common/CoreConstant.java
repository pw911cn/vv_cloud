package com.senyint.frame_core.core.common;

import java.io.File;

/**
 * 业务常量类
 * 
 * @author peiwei
 * @date 2014-12-26
 * @version v1.0
 */
public abstract class CoreConstant {

    /************************** 系统级常量 *********************************/
    public static final String IsDebug = "isdebug";

    public static final String File_Separator = File.separator;

    public static final String Separator_WildCard = "*";

    public static final String Separator_FIELD = ",";

    public static final String Separator_GROUP = "|";

    public static final String Separator_DB = "'";

    public static final String Separator_Underline = "_";

    public static final String UNKNOWN = "未知情况";// 未知情况

    public static final String SystemCode = "SystemCode";// 系统处理标识

    public static final String SqlErrorCode_ = "sqlErrorCode_";// 异常码前缀

    /** 系统资源版本号 */
    public static final String Version = "version";

    public static final String SmallVesion = "smallVesion";

    /** 业务处理器 */
    public static final String BizHandler = "BizHandler";

    /************************** 通用常量 *********************************/
    /** 分页插件 */
    public static final String TOTAL = "total";// dataGrid数据总页数

    public static final String PAGE = "page";// dataGrid当前页

    public static final String RECORDS = "records";// dataGrid数据条数

    public static final String ROWS = "rows";// dataGrid数据

    /** Session信息 */
    public static final String HttpSession = "HttpSession";
    
    /** 机构信息 */
    public static final String Session_OrgVo = "Session_OrgVo";

    /** 用户信息 */
    public static final String Session_UserVo = "Session_UserVo";
    
    public static final String Session_user_id = "Session_user_id";

    public static final String Session_user_name = "Session_user_name";


    /** 状态 */
    public static final class Flag {

        /** 无效（删除） */
        public final static String Invalid = "0";

        /** 有效 */
        public final static String Valid = "1";
        
        /** 冻结 */
        public final static String Frozen = "2";

    }

    /** websocket */
    public static final class Websocket {

        /** 消息推送类型 */
        public static final class PushType {

            public static final String broadcastMessage = "10";

            public static final String p2pMessage = "20";
        }

        /** 业务名称 */
        public static final class LogicName {

            public static final String userOnline = "userOnline";

            public static final String userOffline = "userOffline";

            public static final String sendMessage = "sendMessage";
        }
    }

    /** 文件类型 */
    public static final class FileType {

        public final static String PDF = "pdf";

        public final static String XLS = "xls";

        public final static String DOC = "doc";

        public final static String HTML = "html";
    }

    /** 文件打开方式*/
    public static final class OpenType {

        public final static String VIEW = "view";

        public final static String DOWNLOAD = "download";
    }

}
