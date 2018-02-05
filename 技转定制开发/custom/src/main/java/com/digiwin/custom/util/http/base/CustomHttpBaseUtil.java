package com.digiwin.custom.util.http.base;

import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.ResponseHandler;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.config.Registry;
import org.apache.http.config.RegistryBuilder;
import org.apache.http.conn.routing.HttpRoutePlanner;
import org.apache.http.conn.socket.ConnectionSocketFactory;
import org.apache.http.conn.socket.PlainConnectionSocketFactory;
import org.apache.http.conn.ssl.DefaultHostnameVerifier;
import org.apache.http.conn.ssl.NoopHostnameVerifier;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.DefaultHttpRequestRetryHandler;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
import org.apache.http.impl.conn.SystemDefaultRoutePlanner;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.ssl.SSLContexts;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.SSLContext;
import java.io.Closeable;
import java.io.IOException;
import java.net.ProxySelector;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

/**
 * Created by Administrator on 2017/5/9.
 */
public final class CustomHttpBaseUtil {

    private final static Logger LOG = LoggerFactory.getLogger(CustomHttpBaseUtil.class);

    private static SystemDefaultRoutePlanner ROUTE_PLANNER = null;
    private static RequestConfig REQUEST_CONFIG = null;
    private static HostnameVerifier VERIFIER = null;
    private static CloseableHttpClient CLIENT = null;
    private static PoolingHttpClientConnectionManager CM = null;

    private static final int CONNECTION_TIMEOUT_MILLS = 3000;
    private static final int SOCKET_TIMEOUT_MILLS = 10000;
    private static final int MAX_CONNECTIONS = 6000;
    private static final int MAX_CONNECTIONS_PER_ROUTE = 2000;
    private static final int IDLE_TIMEOUT_SECOND = 15;
    private static final int VALIDATE_INTERVAL_MILLS = 3000;

    private static final String CHAR_ENCODING = "UTF-8";

    /**
     * 获取HttpClient,默认校验ssl
     *
     * @return
     */
    public static CloseableHttpClient getHttpClient() {
        return getHttpClient(defaultRoutePlanner(), defaultRequestConfig(), new DefaultHostnameVerifier());
    }

    /**
     * 获取HttpClient,信任任何ssl证书
     *
     * @return
     */
    public static CloseableHttpClient getIgnoreSSLHttpClient() {
        return getHttpClient(defaultRoutePlanner(), defaultRequestConfig(), ignoreSSL());
    }

    /**
     * 获取HttpClient
     *
     * @param route
     * @param requestConfig
     * @param verifier
     * @return
     */
    public static CloseableHttpClient getHttpClient(HttpRoutePlanner route,
                                                    RequestConfig requestConfig,
                                                    HostnameVerifier verifier) {
        if (CLIENT == null){
            HttpClientBuilder builder = HttpClients.custom();
            builder.setConnectionManager(defaultCM(verifier));
            if (route != null)
                builder.setRoutePlanner(route);
            if (requestConfig != null)
                builder.setDefaultRequestConfig(requestConfig);
            if (verifier != null) {
                builder.setSSLHostnameVerifier(verifier);
            }
            builder.setConnectionManagerShared(true);
            // 自动重试3次 add by mowj 201706012
            builder.setRetryHandler(new DefaultHttpRequestRetryHandler(3, true));
            CLIENT = builder.build();
        }
        return CLIENT;
    }

    /**
     * 触发request,根据handler处理response
     *
     * @param httpClient
     * @param req
     * @param handler
     * @param <T>
     * @return
     */
    public static <T> T handle(final HttpClient httpClient, HttpUriRequest req, ResponseHandler<T> handler) throws Exception{
        T result = null;
        try {
            result = httpClient.execute(req, handler);
        } catch (IOException e) {
            LOG.error("IO Exception! [" + req.getMethod() + "] URL [" + req.getURI().toString() + "]", e);
            throw e;
        }
        return result;
    }

//    /**
//     * 关闭Httpclient
//     *
//     * @param httpClient
//     */
//    public static void close(final HttpClient httpClient) {
//        HttpClient.closeQuietly(httpClient);
//    }
//
//    /**
//     * 执行get请求
//     *
//     * @param url
//     * @return string of http response body
//     * @throws Exception
//     */
//    public static String doGet(String url) throws Exception {
//        return doGet(url, new HashMap<String, String>(), new HashMap<String, String>());
//    }
//
//    /**
//     * 执行get请求
//     *
//     * @param url
//     * @param paras
//     * @return string of http response body
//     * @throws Exception
//     */
//    public static String doGet(String url, Map<String, String> paras) throws Exception {
//        return doGet(url, new HashMap<String, String>(), paras);
//    }

//    /**
//     * 执行get请求,默认UTF-8
//     *
//     * @param url
//     * @param headers
//     * @param paras
//     * @return string of http response body
//     * @throws Exception
//     */
//    public static String doGet(String url, Map<String, String> headers, Map<String, String> paras) throws Exception {
//        return doGet(url, headers, paras, Charset.forName(CHAR_ENCODING));
//    }

//    /**
//     * 自定义字符集，执行get请求
//     *
//     * @param url
//     * @param headers
//     * @param paras
//     * @param charset
//     * @return string of http response body
//     * @throws Exception
//     */
//    public static String doGet(String url, Map<String, String> headers, Map<String, String> paras, Charset charset) throws Exception {
//        String _url = new URIBuilder(url).setCharset(charset).addParameters(formMap(paras)).build().toString();
//        HttpGet req = new HttpGet(_url);
//        for (String k : headers.keySet()){
//            req.setHeader(k, headers.get(k));
//        }
//        return handle(getIgnoreSSLHttpClient(), req, new StringResponseHandler());
//    }
//
//    /**
//     * 执行表单提交的post请求
//     *
//     * @param url
//     * @param paras
//     * @return string of http response body
//     * @throws Exception
//     */
//    public static String doFormPost(String url, Map<String, String> paras) throws Exception {
//        return doFormPost(url, new HashMap<String, String>(), paras);
//    }

//    /**
//     * 执行表单提交的post请求
//     *
//     * @param url
//     * @param headers
//     * @param paras
//     * @return string of http response body
//     * @throws Exception
//     */
//    public static String doFormPost(String url, Map<String, String> headers, Map<String, String> paras) throws Exception {
//        return doFormPost(url, headers, paras, Charset.forName(CHAR_ENCODING));
//    }

//    /**
//     * 以指定的字符集，执行表单提交的post请求
//     *
//     * @param url
//     * @param headers
//     * @param paras
//     * @param charset
//     * @return string of http response body
//     * @throws Exception
//     */
//    public static String doFormPost(String url, Map<String, String> headers, Map<String, String> paras, Charset charset) throws Exception {
//        HttpEntity entity = new UrlEncodedFormEntity(formMap(paras), charset);
//        HttpPost post = new HttpPost(url);
//        for (String k : headers.keySet()){
//            post.setHeader(k, headers.get(k));
//        }
//        post.setEntity(entity);
//        return handle(getIgnoreSSLHttpClient(), post, new StringResponseHandler());
//    }
//
//    /**
//     * 执行post请求
//     *
//     * @param url
//     * @param httpEntity
//     * @return string of http response body
//     * @throws Exception
//     */
//    public static String doPost(String url, String httpEntity) throws Exception {
//        return doPost(url, new HashMap<String, String>(), httpEntity);
//    }

//    /**
//     * 执行post请求
//     * @param url
//     * @param headers
//     * @param httpEntity
//     * @return string of http response body
//     * @throws Exception
//     */
//    public static String doPost(String url, Map<String, String> headers, String httpEntity) throws Exception {
//        return doPost(url, headers, httpEntity, "UTF-8");
//    }

//    /**
//     * 执行post请求
//     *
//     * @param url
//     * @param headers
//     * @param httpEntity
//     * @return string of http response body
//     * @throws Exception
//     */
//    public static String doPost(String url, Map<String, String> headers, String httpEntity,String charset) throws Exception {
//        HttpPost post = new HttpPost(url);
//        for (String k : headers.keySet()){
//            post.setHeader(k, headers.get(k));
//        }
//        post.setEntity(new StringEntity(httpEntity,charset));
//        return handle(getIgnoreSSLHttpClient(), post, new StringResponseHandler());
//    }

//    /**
//     * post请求提交json数据
//     *
//     * @param url
//     * @param json
//     * @return string of http response body
//     * @throws Exception
//     */
//    public static String doJsonPost(String url, String json) throws Exception {
//        return doJsonPost(url, new HashMap<String, String>(), json);
//    }

//    /**
//     * post请求提交json数据
//     *
//     * @param url
//     * @param headers
//     * @param json
//     * @return string of http response body
//     * @throws Exception
//     */
//    public static String doJsonPost(String url, Map<String, String> headers, String json) throws Exception {
//        Map<String, String> _headers = new HashMap<String, String>();
//        _headers.put("Content-Type", "application/json");
//        _headers.putAll(headers);
//        HttpPost post = new HttpPost(url);
//        for (String k : headers.keySet()){
//            post.setHeader(k, headers.get(k));
//        }
//        post.setEntity(new StringEntity(json, "UTF-8"));
//        return handle(getIgnoreSSLHttpClient(), post, new StringResponseHandler());
//    }

    /**
     * 获取默认的PoolingHttpClientConnectionManager
     * @param verifier
     * @return
     */
    public static PoolingHttpClientConnectionManager defaultCM(HostnameVerifier verifier) {
        if (CM == null){
            SSLContext sslContext = SSLContexts.createDefault();
            SSLConnectionSocketFactory sslConnectionFactory = new
                    SSLConnectionSocketFactory(sslContext, verifier);
            Registry<ConnectionSocketFactory> socketFactoryRegistry =
                    RegistryBuilder.<ConnectionSocketFactory>create()
                            .register("http", PlainConnectionSocketFactory.getSocketFactory())
                            .register("https", sslConnectionFactory)
                            .build();
//            SocketConfig socketConfig = SocketConfig.custom()
//                .setSoTimeout(SOCKET_TIMEOUT_MILLS)
//                .build();
            CM = new
                    PoolingHttpClientConnectionManager(socketFactoryRegistry);

            // 将最大连接数增加
            CM.setMaxTotal(MAX_CONNECTIONS);
            // 将每个路由基础的连接增加
            CM.setDefaultMaxPerRoute(MAX_CONNECTIONS_PER_ROUTE);
            CM.closeIdleConnections(IDLE_TIMEOUT_SECOND, TimeUnit.SECONDS);

            // add by mowj 20170612
            // validateAfterInactivity 空闲永久连接检查间隔
            // 官方推荐使用这个来检查永久链接的可用性，而不推荐每次请求的时候才去检查
            CM.setValidateAfterInactivity(VALIDATE_INTERVAL_MILLS);

//            CM.setDefaultSocketConfig(socketConfig);
        }
        return CM;
    }

    /**
     * 默认requestConfig
     *
     * @return
     */
    public static RequestConfig defaultRequestConfig() {
        if (REQUEST_CONFIG == null) {
            REQUEST_CONFIG = RequestConfig.custom()
                    .setSocketTimeout(SOCKET_TIMEOUT_MILLS)
                    .setConnectTimeout(CONNECTION_TIMEOUT_MILLS)
                    .build();
        }
        return REQUEST_CONFIG;
    }

    /**
     * 忽略http ssl的认证
     *
     * @return
     */
    public static HostnameVerifier ignoreSSL() {
        if (VERIFIER == null) {
            VERIFIER = NoopHostnameVerifier.INSTANCE;
        }
        //jdk7
        return VERIFIER;
    }

    /**
     * 默认使用系统(jdk)的代理设置
     *
     * @return
     */
    public static HttpRoutePlanner defaultRoutePlanner() {
        if (ROUTE_PLANNER == null) {
            ROUTE_PLANNER = new SystemDefaultRoutePlanner(ProxySelector.getDefault());
        }
        return ROUTE_PLANNER;
    }

    /**
     * map to NameValuePair
     *
     * @param map
     * @return
     */
    public static List<NameValuePair> formMap(Map<String, String> map) {
        List<NameValuePair> nameValuePairs = new ArrayList<NameValuePair>();
        for (String k : map.keySet()) {
            nameValuePairs.add(new BasicNameValuePair(k, map.get(k)));
        }
        return nameValuePairs;
    }


    public static void closeQuietly(HttpClient httpClient) {
        if (httpClient != null && httpClient instanceof Closeable) {
            try {
                ((Closeable) httpClient).close();
            } catch (IOException var2) {
                ;
            }
        }
    }
}
