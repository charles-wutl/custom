/**
 * author duansy
 * date 2017/3/28 15:27
 * Copyright(c) Dajiashequ Technology Co.,Ltd.
 */
package com.digiwin.custom.util;

import com.seeyon.framework.component.util.StringUtil;
import org.apache.commons.io.IOUtils;
import org.apache.log4j.Logger;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.text.MessageFormat;
import java.util.Locale;
import java.util.PropertyResourceBundle;
import java.util.ResourceBundle;

public class I18nResourceUtil {
    private static Logger logger = Logger.getLogger(I18nResourceUtil.class);
    /**
     * 查找相应国际化资源文件
     * @param baseName
     * @param key
     * @return
     */
    public static String getResource(String baseName,String localStr,String key){
        return getResource(baseName, localStr, key,null);
    }
    /**
     * 查找相应国际化资源文件
     * @param baseName
     * @param key
     * @return
     */
    public static String getResource(String baseName,String localStr,String key,Object ... param){
        Locale locale;
        if(StringUtil.isBlank(localStr)){
            locale = Locale.getDefault();
        }else{
            String[] localStrs = localStr.split("_");
            locale = new Locale(localStrs[0],localStrs[1]);
        }
        String i18nBaseDir = I18nResourceUtil.class.getClassLoader().getResource("/").getPath();
        ResourceBundle.Control control = new CustomeResourceBundleControl(new File(i18nBaseDir));
        ResourceBundle bundle = ResourceBundle.getBundle(baseName,locale,control);
        String i18nResource = bundle.getString(key);
        String res;
        if (param != null) {
            res = MessageFormat.format(i18nResource,param);
        }else{
            res = i18nResource;
        }
        return res;
    }

    protected static class CustomeResourceBundleControl extends ResourceBundle.Control {
        private File bundleBase;

        public CustomeResourceBundleControl(File bundleBase) {
            this.bundleBase = bundleBase;
        }

        public ResourceBundle newBundle(String baseName, Locale locale, String format, ClassLoader loader,
                                        boolean reload) throws IllegalAccessException, InstantiationException, IOException {
            String resourceName = toResourceName(toBundleName(baseName, locale), "properties");
            File f = new File(bundleBase, resourceName);
            if (f.exists()) {
                InputStream is = null;
                ResourceBundle bundle = null;
                try {
                    is = new FileInputStream(f);
                    bundle = new PropertyResourceBundle(is);
                } finally {
                    IOUtils.closeQuietly(is);
                }
                return bundle;
            } else {
                return null;
            }
        }

        public long getTimeToLive(String baseName, Locale locale) {
            return TTL_DONT_CACHE;
        }
    }
}
