package com.digiwin.custom.util;

import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.seeyon.framework.exception.BaseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.Map;

/**
 * 定制工程用JSON处理工具类
 * Created by zaregoto on 2017/4/25.
 */
public class CustomJsonUtil {
    private static Logger logger = LoggerFactory.getLogger(CustomJsonUtil.class);

    private static JsonFactory factory = new JsonFactory();
    private static ObjectMapper mapper = new ObjectMapper(factory);

    static {
        factory.configure(JsonGenerator.Feature.IGNORE_UNKNOWN, true);
        mapper.disable(SerializationFeature.FAIL_ON_EMPTY_BEANS);
    }

    public static <T> T getJsonStringToObject(String jsonString, Class<T> cls) throws Exception {
        if (jsonString != null && jsonString.length() > 0) {
            return mapper.readValue(jsonString, cls);
        } else {
            return cls.newInstance();
        }
    }

    public static Map getJsonStringToMap(String jsonString) throws BaseException {
        if(null == jsonString) {
            return null;
        } else {
            try {
                Map hashMap = getJsonStringToObject(jsonString, Map.class);
                return hashMap;
            } catch (Exception var3) {
                throw new BaseException(var3);
            }
        }
    }

    public static String javaObjectToJsonString(Object object) throws BaseException {
        String jsonString = "";
        if(null != object) {
            try {
                jsonString = mapper.writeValueAsString(object);
            } catch (Exception var4) {
                var4.printStackTrace();
                jsonString = "";
            }
        }

        return jsonString;
    }

    /**
     * 从JSON字符串中获取某个key的值
     * @param jsonObject JSON对象字符串，所有value均为基本数据类型。
     * @param key
     * @return
     * @throws IOException
     */
    public static String getValueFromJsonByKey(String jsonObject, String key) throws IOException {
        Map map = mapper.readValue(jsonObject, Map.class);
        if (null != map) {
            return (String) map.get(key);
        }
        return "";
    }
}
