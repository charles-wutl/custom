package com.digiwin.custom.util.http;

import com.seeyon.framework.exception.BaseException;
import com.seeyon.framework.util.JsonUtil;

import javax.servlet.http.HttpServletRequest;
import java.io.BufferedReader;
import java.io.IOException;
import java.net.URLDecoder;
import java.util.Map;

/**
 * RequestParameterUtil
 *
 * @author hewanxian
 * @date 1/20/16
 * Copyright © 2016 hewanxian. All rights reserved.
 */
public class RequestParameterUtil {

    public static String getPersonID(HttpServletRequest request) {
        String personID = request.getParameter("personID");
        return personID;
    }

    public static String getCompanyID(HttpServletRequest request) {
        String companyID = request.getParameter("companyID");
        return companyID;
    }

    /**
     * 获取POST过来的key=value数据并返回数据字符串
     * @param request 请求的request
     * @param needUrlDecode 是否需要进行URLDecode
     * @return POST过来的数据字符串
     * @throws IOException
     */
    public static String getPostData(HttpServletRequest request,
        boolean needUrlDecode, String encoding) throws IOException
    {
        BufferedReader bfReader = request.getReader();
        char[] chayBuf = new char[1024];
        int iLen = 0;
        StringBuffer sb = new StringBuffer();
        while((iLen = bfReader.read(chayBuf)) != -1)
        {
            sb.append(chayBuf, 0, iLen);
        }

        // sb为post过来的数据
        return needUrlDecode ? URLDecoder.decode(sb.toString(), encoding) : sb.toString();
    }

    /**
     * 根据请求JSON的数据，转换成对应的Map.Map的key等于请求中数据的key,value等于请求数据key的value.
     * @param postData
     * @return
     */
    public static Map<String, Object> getPostDataMap(String postData) throws BaseException {
        Map<String, Object> map = JsonUtil.jsonStringToMap(postData);
        return map;
    }
}
