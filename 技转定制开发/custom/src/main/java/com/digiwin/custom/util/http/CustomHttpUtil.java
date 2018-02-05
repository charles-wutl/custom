package com.digiwin.custom.util.http;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.digiwin.custom.bean.CustomHttpResponseBean;
import com.digiwin.custom.interceptor.AuthenticationInteceptor;
import com.digiwin.custom.util.CustomJsonUtil;
import com.digiwin.custom.util.PropertiesUtil;
import com.seeyon.esn.entity.digiwin.PersonDigiMiddleware;
import com.seeyon.esn.service.digiwin.PersonDigiMiddlewareService;
import com.seeyon.framework.util.HttpClientUtil;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.client.HttpClient;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.util.EntityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.context.ContextLoader;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.util.WebUtils;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

/**
 * Created by Administrator on 2017/5/9.
 * 网络请求工具类
 */
public class CustomHttpUtil {

    private static final Logger logger = LoggerFactory.getLogger(CustomHttpUtil.class);

    private static final String CHAR_ENCODING = "UTF-8";

    private static final Integer CONNECTION_TIMEOUT_MILLS = 10000;
    private static final Integer SOCKET_TIMEOUT_MILLS = 10000;

    public static String doHttpExecute(String url, String json) throws IOException {
        return doHttpExecute(url, new HashMap<>(), json).getResponseTxt();
    }

    /**
     * 读取配置文件中的超时时间设置后，再发送POST请求到指定URL
     * @param url
     * @param headers
     * @param json
     * @return
     * @throws IOException
     */
    public static CustomHttpResponseBean doHttpExecute(
            String url, Map<String, String> headers, String json) throws IOException {
        Map<String, String> _headers = new HashMap<>();
        _headers.put("Content-Type", ContentType.APPLICATION_JSON.getMimeType());
        _headers.putAll(headers);
        HttpPost post = new HttpPost(url);
        Iterator var5 = _headers.keySet().iterator();

        while(var5.hasNext()) {
            String k = (String)var5.next();
            String v = _headers.get(k);
            post.setHeader(k, v);
        }
        post.setEntity(new StringEntity(json, CHAR_ENCODING));
        Long reqTime = System.currentTimeMillis();
        logger.info("{}=====Ready to do HTTP POST...Header is: {}, URL is: {}, POST Body Data is: {}",
                reqTime, _headers, url, json);

        Integer socketTimeoutMills = 0;
        Integer connectTimeoutMills = 0;
        try {
            socketTimeoutMills =
                    Integer.parseInt(PropertiesUtil.getPropertyValueByKey("http.socket.timeout.mills"));
            connectTimeoutMills =
                    Integer.parseInt(PropertiesUtil.getPropertyValueByKey("http.connect.timeout.mills"));
        } catch (NumberFormatException e) {
            logger.error("Parse timeout mills failed...cause is:{}", e.getLocalizedMessage());
            e.printStackTrace();
        } finally {
            logger.error("Using default setting...SOCKET_TIMEOUT_MILLS:{},CONNECTION_TIMEOUT_MILLS:{}",
                    SOCKET_TIMEOUT_MILLS, CONNECTION_TIMEOUT_MILLS);
            if (socketTimeoutMills == 0) {
                socketTimeoutMills = SOCKET_TIMEOUT_MILLS;
            }
            if (connectTimeoutMills == 0) {
                connectTimeoutMills = CONNECTION_TIMEOUT_MILLS;
            }
        }

        HttpClient client = HttpClientUtil.getHttpClient(
                HttpClientUtil.defaultRoutePlanner(),
                RequestConfig.custom()
                        .setSocketTimeout(socketTimeoutMills)
                        .setConnectTimeout(connectTimeoutMills).build(),
                HttpClientUtil.ignoreSSL()
        );
        HttpResponse response = null;
        String responseTxt = "";
        int httpStatusCode;
        try {
            response = client.execute(post);
            httpStatusCode = response.getStatusLine().getStatusCode();
            if (httpStatusCode >= HttpStatus.SC_OK && httpStatusCode < HttpStatus.SC_BAD_REQUEST) {
                responseTxt = EntityUtils.toString(response.getEntity(), "UTF-8");
                logger.info("{}=====Received HTTP Reponse...{} ", reqTime, responseTxt);
            } else {
                logger.info("HTTP POST FAILED, HTTP CODE is {}", response.getStatusLine().getStatusCode());
                response.getEntity().getContent().close();
            }
        } catch (IOException e) {
            logger.error("=====HTTP POST FAILED by {} =====", e.getLocalizedMessage());
            e.printStackTrace();
            throw e;
        } finally {
            // add close action to release connection. add by mowj 20170629
            HttpClientUtil.close(client);
        }
        return new CustomHttpResponseBean(httpStatusCode, responseTxt);
    }



    public static String doJsonPost(
            String url, String json, String personID, HttpServletRequest request) throws Exception {
        Map<String, String> headers = new HashMap<>();

        return doJsonPost(url, headers, json, personID, request);
    }

    public static String doJsonPost(
            String url, Map<String, String> headers, String json, String personID,
            HttpServletRequest request) throws Exception {
//        String result = doHttpExecute(url, headers, json);
        String result = doJsonPostWithAutoAuthorize(url, json, personID,request);

        return result;
    }


    /**
     * 发送POST请求，数据为JSON，并在token过期时重新获取一次
     * @param url
     * @param jsonString
     * @param personID
     * @return
     * @throws Exception
     */
    public static String doJsonPostWithAutoAuthorize(
        String url, String jsonString, String personID,HttpServletRequest request) throws Exception {

        WebApplicationContext appContext = ContextLoader.getCurrentWebApplicationContext();
        PersonDigiMiddlewareService personDigiMiddlewareService =
            (PersonDigiMiddlewareService) appContext.getBean("personDigiMiddlewareService");
        PersonDigiMiddleware personDigiMiddleware = personDigiMiddlewareService
            .findPersonDigiMiddlewareByPersonID(personID);
        String result;
        logger.error("--url--->"+url+"-----jsonString---->"+jsonString);
        CustomHttpResponseBean response = doHttpExecute(url, new HashMap<>(), jsonString);

        if (response.getHttpCode() >= HttpStatus.SC_UNAUTHORIZED
            && response.getHttpCode() < HttpStatus.SC_INTERNAL_SERVER_ERROR) {
            logger.info("Token is expired...ready to refresh...");
            // 重新获取授权，并保存
            personDigiMiddlewareService.refreshUserToken(personDigiMiddleware);
            personDigiMiddlewareService.refreshAccessToken(personDigiMiddleware);
            // 获取新的token
            personDigiMiddleware = personDigiMiddlewareService.findPersonDigiMiddlewareByPersonID(personID);
            // 保存到当前的session中去
            WebUtils.setSessionAttribute(request, AuthenticationInteceptor.MOBILE_TOKEN_KEY,
                personDigiMiddleware.getAccessToken());
            logger.info("Token is refreshed...new mobileToken is:{}", personDigiMiddleware.getAccessToken());

            JSONObject jsonRoot = JSON.parseObject(jsonString);
            // 放入新的access_token
            jsonRoot.getJSONObject("std_data").getJSONObject("parameter")
                .put("access_token", personDigiMiddleware.getAccessToken());
            response = doHttpExecute(url, new HashMap<>(),
                CustomJsonUtil.javaObjectToJsonString(jsonRoot));
            result = response.getResponseTxt();
        } else {
            result = response.getResponseTxt();
        }
        logger.error("--result--->"+result);
        return result;
    }

    /**
     * 取得移動平台使用的token
     * @return
     */
    public static String getMobileServerToken() throws Exception {
        String result = "";
        String id = PropertiesUtil.getPropertyValueByKey("digiCustom.mobile.token.id");
        String secret = PropertiesUtil.getPropertyValueByKey("digiCustom.mobile.token.secret");
        String url = PropertiesUtil.getMobileServerUrl() + "/oauth/oauth/token?grant_type=client_credentials&client_id=" +
                id + "&client_secret=" + secret;
        String returnStr = CustomHttpUtil.doHttpExecute(url, "");
        Map<String, String> openApiTokenMap = CustomJsonUtil.getJsonStringToMap(returnStr);
        if (openApiTokenMap.containsKey("access_token")) {
            result = openApiTokenMap.get("access_token");
        }
        return result;
    }

}
