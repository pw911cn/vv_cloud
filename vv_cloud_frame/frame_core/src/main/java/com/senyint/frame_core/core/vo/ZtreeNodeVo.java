package com.senyint.frame_core.core.vo;

import java.io.Serializable;

/**
 * 
 * 与zTree控件中的treeNode节点数据相对于，将此类以josn类型返回便可初始化树形结构。
 * 
 * @author peiwei
 * 
 */
public class ZtreeNodeVo implements Serializable {
	private static final long serialVersionUID = 1L;

	/**
	 * id
	 */
	private String id;
	/**
	 * parent id
	 */
	private String pId;
	/**
	 * The node's name
	 * 
	 * 1. If you want to change 'name' attribute, please modify the 'setting.data.key.name' attribute.
	 * 
	 * Default: undenfined
	 */
	private String name;
	/**
	 * The URL of node link
	 * 
	 * 1. In edit mode (setting.edit.enable = true) , this feature fails. If you must use a similar feature, please use
	 * the 'onClick' callback for their own control.
	 * 
	 * 2. If you use the 'onClick' callback function to control opening URL , then set the URL in the other custom
	 * attribute, do not use the 'url' attribute.
	 * 
	 * Default: undefined
	 */
	private String url;
	
	/** 代替url的参数值，不与ztreeNode对应。为了避免点击时，url存在值时，跳转界面 */
	private String param_url;
	
	/**
	 * Used to record the parent node's expand status.
	 * 
	 * 1. When zTree initialize the node data, if you set treeNode.open = true, zTree will default expand this parent
	 * node.
	 * 
	 * 2. Leaf node's 'open' attribute is false.
	 * 
	 * 3. In order to solve the problem of someone make json data, supporting "false", "true" format of the data string.
	 * 
	 * Default: false
	 */
	private boolean open;
	/**
	 * The checked status about node's checkbox or radio. It is valid when [setting.check.enable = true &
	 * treeNode.nocheck = false]
	 * 
	 * 1. If change the 'checked' to other attribute, please set the 'setting.data.key.checked' attribute.
	 * 
	 * 2. If you create node data, and set 'checked' attribute to true, zTree will check this node's checkbox or radio
	 * when zTree is initialized.
	 * 
	 * 3. Use the treeObj.checkNode or checkAllNodes or updateNode method, you can check or uncheck the node. Please see
	 * the API about these methods.
	 * 
	 * 4. zTree support identification string 'true' & 'false'.
	 * 
	 * Default: false
	 */
	private boolean checked;
	private String title;
	/**
	 * 用于存储节点的等级
	 */
	private String nodeLevel;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getpId() {
		return pId;
	}

	public void setpId(String pId) {
		this.pId = pId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}
	
	public String getParam_url() {
		return param_url;
	}

	public void setParam_url(String param_url) {
		this.param_url = param_url;
	}

	public boolean isOpen() {
		return open;
	}

	public void setOpen(boolean open) {
		this.open = open;
	}

	public boolean isChecked() {
		return checked;
	}

	public void setChecked(boolean checked) {
		this.checked = checked;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getNodeLevel() {
		return nodeLevel;
	}

	public void setNodeLevel(String nodeLevel) {
		this.nodeLevel = nodeLevel;
	}

}
