
package com.senyint.frame_core.component.transport.http.DataTypeConverter;

import java.beans.PropertyEditorSupport;
import java.util.Date;

import com.senyint.frame_core.core.utility.DateUtils;


/**
 * 表单数据封装：特定类型的转换处理
 * 
 * @author peiwei
 * @date 2016年1月15日
 */
public class DateTypeConverter extends PropertyEditorSupport
{

    /**
     * Parse the Date from the given text, using the specified DateFormat.
     */
    public void setAsText(String dateStr) throws IllegalArgumentException
    {
        this.setValue(DateUtils.toDate(dateStr));
    }

    /**
     * Format the Date as String, using the specified DateFormat.
     */
    public String getAsText()
    {
        Date date = (Date) this.getValue();

        return DateUtils.dateFormat(date);
    }

}
