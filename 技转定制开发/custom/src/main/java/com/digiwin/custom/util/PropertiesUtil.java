package com.digiwin.custom.util;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 配置文件工具类
 * Created by zaregoto on 2017/4/24.
 */
public class PropertiesUtil {

    private static final Logger logger = LoggerFactory.getLogger(PropertiesUtil.class);

    public static final String PROPERTIES_PATH = "config.properties";

    public static String getPropertyValueByKey(String key) {
        return getPropertyValueByKey(PROPERTIES_PATH, key);
    }

    public static String getPropertyValueByKey(String propertiesPath, String key) {
        return getValue(propertiesPath, key);
    }

    /**
     * 根据配置文件获取CRM的URL
     * @return
     */
    public static String getDigiwinCrmUrl() {
        String url = "";
        switch (getPropertyValueByKey("digiCustom.mode")) {
            case "prod" :
                url = getPropertyValueByKey("digiCustom.prod.url");
                break;
            case "test" :
                url = getPropertyValueByKey("digiCustom.test.url");
                break;
            default :
                url = getPropertyValueByKey("digiCustom.test.url");
                break;
        }
        return url;
    }
    /**
     * 取得移動平台的URL
     * @return
     */
    public static String getMobileServerUrl() {
    	String url ="";
    	url = getPropertyValueByKey("esnServiceUrl");
    	return url;
    }


    /**
     * 获取资源文件里面的key对应的内容
     *
     * @param propertiesFilePath
     * @param key
     * @return
     */
    public static String getValue(String propertiesFilePath, String key) {
        String value = null;
        try {
            Properties pros = new Properties();
            String path = PropertiesUtil.class.getClassLoader().getResource("/" + propertiesFilePath).getPath();
            InputStream in = new FileInputStream(path);
            pros.load(in);
            value= pros.getProperty(key);
            in.close();
        } catch (IOException e) {
            logger.error("PropertiesUtil.getValue(String propertiesFilePath:" + propertiesFilePath
                + ",String key:" + key + ") exception ,return null", e);
        }
        return value;
    }
}
