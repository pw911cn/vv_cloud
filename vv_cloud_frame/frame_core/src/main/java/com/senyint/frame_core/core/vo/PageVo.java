package com.senyint.frame_core.core.vo;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

/**
 * @author peiwei
 * 
 */
public class PageVo<T> implements Serializable {

    private static final long serialVersionUID = 1L;

    /** 页数 */
    private Integer pageNumber;

    /** 每页显示条数 */
    private Integer pageSize;

    /** 总条数 */
    private Integer total;

    /**排序依据字段*/
    private String sortField;

    /**排序升序降序*/
    private String sortOrder = "desc";

    /**返回数据结果集*/
    private T datas;

    /**
     * getter pageNumber
     * @return the pageNumber
     */
    public Integer getPageNumber() {
        return pageNumber;
    }

    /**
     * setter pageNumber
     * @param pageNumber
     */
    public void setPageNumber(Integer pageNumber) {
        this.pageNumber = pageNumber;
    }

    /**
     * getter pageSize
     * @return the pageSize
     */
    public Integer getPageSize() {
        return pageSize;
    }

    /**
     * setter pageSize
     * @param pageSize
     */
    public void setPageSize(Integer pageSize) {
        this.pageSize = pageSize;
    }

    /**
     * getter total
     * @return the total
     */
    public Integer getTotal() {
        return total;
    }

    /**
     * setter total
     * @param total
     */
    public void setTotal(Integer total) {
        this.total = total;
    }

    /**
     * getter sortField
     * @return the sortField
     */
    public String getSortField() {
        return sortField;
    }

    /**
     * setter sortField
     * @param sortField
     */
    public void setSortField(String sortField) {
        this.sortField = sortField;
    }

    /**
     * getter sortOrder
     * @return the sortOrder
     */
    public String getSortOrder() {
        return sortOrder;
    }

    /**
     * setter sortOrder
     * @param sortOrder
     */
    public void setSortOrder(String sortOrder) {
        this.sortOrder = sortOrder;
    }

    /**
     * getter datas
     * @return the datas
     */
    public T getDatas() {
        return datas;
    }

    /**
     * setter datas
     * @param datas
     */
    public void setDatas(T datas) {
        this.datas = datas;
    }

}
