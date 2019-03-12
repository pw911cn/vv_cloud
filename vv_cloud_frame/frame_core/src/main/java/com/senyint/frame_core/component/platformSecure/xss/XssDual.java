package com.senyint.frame_core.component.platformSecure.xss;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 
 * ClassName: XssDual <br/>  
 * Function: xss攻击. <br/>  
 * Reason: TODO ADD REASON(可选). <br/>  
 * date: 2018年12月26日 上午10:46:37 <br/>  
 *  
 * @author zhangyang  
 * @version   
 * @since JDK 1.8
 */
public class XssDual extends HttpServletRequestWrapper {
	private final Logger logger = LoggerFactory.getLogger(getClass());
	public XssDual(HttpServletRequest request) {
		super(request);
	}

	@Override
	public String[] getParameterValues(String name) {
		String[] values = super.getParameterValues(name);
        if (values == null)
            return null;
        int count = values.length;
        String[] encodedValues = new String[count];
        for (int i = 0; i < count; i++) {
            encodedValues[i] = dualXSS(values[i]);
        }
		return encodedValues;
	}
	
	@Override
	public String getHeader(String name) {
        String value = super.getHeader(name);
        if (value == null)
            return null;
        return dualXSS(value);
    }
	
	private String dualXSS(String value) {
		if (value == null || "".equals(value)) {
            return value;
        }
		logger.info("platForm dual xxs ...");
        value = value.replaceAll("<", "<").replaceAll(">", ">");
        value = value.replaceAll("\\(", "(").replace("\\)", ")");
        value = value.replaceAll("'", "'");
        value = value.replaceAll("eval\\((.*)\\)", "");
        value = value.replaceAll("[\\\"\\\'][\\s]*javascript:(.*)[\\\"\\\']", "\"\"");
        value = value.replaceAll("script", "");
        value = value.replaceAll("<(no)?script[^>]*>.*?</(no)?script>", "");
        value = value.replaceAll("eval\\((.*?)\\)", "");
        value = value.replaceAll("expression\\((.*?)\\)", "");
        value = value.replaceAll("(javascript:|vbscript:|view-source:)*", "");
        value = value.replaceAll("<(\"[^\"]*\"|\'[^\']*\'|[^\'\">])*>", "");
        value = value.replaceAll("(window\\.location|window\\.|\\.location|document\\.cookie|document\\.|alert\\(.*?\\)|window\\.open\\()*", "");
        value = value.replaceAll("<+\\s*\\w*\\s*(oncontrolselect|oncopy|oncut|ondataavailable|ondatasetchanged|ondatasetcomplete|ondblclick|"
                + "ondeactivate|ondrag|ondragend|ondragenter|ondragleave|ondragover|"
                + "ondragstart|ondrop|onerror=|onerroupdate|onfilterchange|onfinish|onfocus|"
                + "onfocusin|onfocusout|onhelp|onkeydown|onkeypress|onkeyup|onlayoutcomplete|onload|onlosecapture|onmousedown|"
                + "onmouseenter|onmouseleave|onmousemove|onmousout|onmouseover|onmouseup|onmousewheel|onmove|onmoveend|"
                + "onmovestart|onabort|onactivate|onafterprint|onafterupdate|onbefore|onbeforeactivate|onbeforecopy|onbeforecut|"
                + "onbeforedeactivate|onbeforeeditocus|onbeforepaste|onbeforeprint|onbeforeunload|onbeforeupdate|onblur|onbounce|"
                + "oncellchange|onchange|onclick|oncontextmenu|onpaste|onpropertychange|onreadystatechange|onreset|onresize|onresizend|"
                + "onresizestart|onrowenter|onrowexit|onrowsdelete|onrowsinserted|onscroll|onselect|onselectionchange|onselectstart|onstart|"
                + "onstop|onsubmit|onunload)+\\s*=+", "");
        return value;
	}

	@Override
	public String getParameter(String parameter){
        String value = super.getParameter(parameter);
        if (value == null)
            return null;
        return dualXSS(value);
    }
	
	
}
