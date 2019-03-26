
package com.senyint.frame_core.core.support;

import java.util.Date;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.senyint.frame_core.component.transport.http.ActionSupportSpringImpl;

/**
 * Action的支撑类，提供一些常用的方法。
 * 
 * @author peiwei
 */
public abstract class CoreActionSupport<T> extends ActionSupportSpringImpl {

    protected final Logger logger = LoggerFactory.getLogger(getClass());

    /**
     * 启动页面缓存机制<br>
     * 设置响应页面元数据，作用是控制的缓存机制<br>
     * 
     * @param flag
     */
    protected void setResponseCache(HttpServletResponse response) {
        this.setResponseCache(response, true);
    }

    /**
     * 设置响应页面元数据，作用是控制的缓存机制
     * 
     * @param flag
     *            是否缓存
     */
    protected void setResponseCache(HttpServletResponse response, boolean flag) {
        if (flag == true) {
            Date date = new Date();
            response.setDateHeader("Last-Modified", date.getTime()); // Last-Modified:页面的最后生成时间
            response.setDateHeader("Expires", date.getTime() + 20000); // Expires:过时期限值
            response.setHeader("Cache-Control", "public"); // Cache-Control来控制页面的缓存与否,public:浏览器和缓存服务器都可以缓存页面信息；
            response.setHeader("Pragma", "Pragma"); // Pragma:设置页面是否缓存，为Pragma则缓存，no-cache则不缓存
        } else {
            response.setDateHeader("Expires", 0);
            response.addHeader("Cache-Control", "no-cache");// 浏览器和缓存服务器都不应该缓存页面信息
            response.addHeader("Cache-Control", "no-store");// 请求和响应的信息都不应该被存储在对方的磁盘系统中；
            response.addHeader("Cache-Control", "must-revalidate");// 于客户机的每次请求，代理服务器必须想服务器验证缓存是否过时；
        }

    }

    /**
     * 
     * <p>
     * method: downloadReport<BR>
     * description: 报表文件下载<BR>
     * author: peiwei<BR>
     * date: 2017年1月16日 下午5:10:15<BR>
     * 
     * @param downloadFileName
     * @param viewType
     * @param reportTempName
     * @param tempParamMap
     * @throws Exception
     */
    protected void reportDownload(String reportName, String viewType, String reportTempName,
            Map<String, Object> tempParamMap) throws Exception {
        //        String reportTempPath = BeanUtils.getClassRootPath() + "tempfile/" + reportTempName;
        //
        //        JReportProcess jReportProcess = new JReportProcess();
        //        byte[] byteArr = jReportProcess.generateReportBytes(viewType, reportTempPath, tempParamMap);
        //
        //        this.fileExport(byteArr, CoreConstant.OpenType.DOWNLOAD, reportName, viewType);
    }

}
