package com.senyint.frame_core.component.httpclient;

import java.io.File;

import org.apache.http.entity.mime.content.FileBody;

/**
 * 
  * class: FileParam<BR>
  * description: 附件参数的简单封装<BR>
  * author: zhangyanchao<BR>
  * date: 2018年9月5日 上午10:05:41<BR>
  *
 */
public class FileParam {
	
	/**
	 * 请求参数名
	 */
	private String name;

	private FileBody file;

	public FileParam(String name, File file) {
		super();
		this.name = name;
		this.file = new FileBody(file);
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public FileBody getFile() {
		return file;
	}

	public void setFile(FileBody file) {
		this.file = file;
	}

	

}
