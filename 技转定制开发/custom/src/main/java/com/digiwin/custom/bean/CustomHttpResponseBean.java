package com.digiwin.custom.bean;

/**
 * 定制工程使用的HTTP相应实体类。
 *
 */
public class CustomHttpResponseBean {

    private Integer httpCode;
    private String responseTxt;

    public CustomHttpResponseBean() {
    }

    public CustomHttpResponseBean(Integer httpCode, String responseTxt) {
        this.httpCode = httpCode;
        this.responseTxt = responseTxt;
    }

    public Integer getHttpCode() {
        return httpCode;
    }

    public void setHttpCode(Integer httpCode) {
        this.httpCode = httpCode;
    }

    public String getResponseTxt() {
        return responseTxt;
    }

    public void setResponseTxt(String responseTxt) {
        this.responseTxt = responseTxt;
    }
}
