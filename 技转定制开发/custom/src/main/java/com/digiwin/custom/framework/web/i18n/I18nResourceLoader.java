package com.digiwin.custom.framework.web.i18n;

import com.digiwin.custom.util.I18nResourceUtil;
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashSet;
import java.util.Locale;
import java.util.Map;
import java.util.Properties;
import java.util.Set;

/**
 * 国际化资源加载器
 */
public class I18nResourceLoader {
    private static Logger logger = Logger.getLogger(I18nResourceLoader.class);
    //国际化资源根目录
    private String i18nBaseDir;
    private String localeString;
    private Locale[] locales;
    private Map<String,Locale> localMap;
    //
    private final String resourceCacheKey = "dinghui_i18n_cache";
    //
    private Set<String> resourceBundle = new HashSet<>();

    public String getI18nBaseDir() {
        return i18nBaseDir;
    }

    public I18nResourceLoader(){
        i18nBaseDir = I18nResourceLoader.class.getClassLoader().getResource("/").getPath()+"i18n";
        Properties pros = new Properties();
        try (InputStream in = I18nResourceLoader.class.getResourceAsStream("/locale.properties")){
            pros.load(in);
        } catch (IOException e) {
            logger.error("I18nResourceLoader error:",e);
        }
        localeString = pros.getProperty("locale");
    }

    /**
     * 查找所有有国际化资源
     */
    public void findAllResourceBundle(){
        File i18nBaseFile = new File(i18nBaseDir);
        resourceBundle = searchResourceBundle(i18nBaseFile);
    }

    /**
     *
     * @param base
     * @return
     */
    private Set<String> searchResourceBundle(File base){
        Set<String> resource = new HashSet<>();
        if(base.exists()){
            File[] files = base.listFiles();
            for(File file:files){
                if(file.isDirectory()){
                    resource.addAll(searchResourceBundle(file));
                }else{
                    String fileName = file.getName();
                    if(StringUtils.isNotBlank(fileName) && fileName.contains("properties") && fileName.contains("_")){
                        String resourceBundleName = fileName.substring(0,fileName.indexOf("_"));
                        resource.add(resourceBundleName);
                    }
                }
            }
        }
        return resource;
    }
    /**
     * 加载国际化资源到缓存
     */
    public void loadToCache(){
        try{
            findAllResourceBundle();
            logger.error(I18nResourceUtil
                .getResource("i18n.index.index","zh_TW","title"));
        }catch (Exception e){
            logger.error("",e);
        }
    }

    public Locale[] getLocales() {
        return locales;
    }

    public Map<String, Locale> getLocalMap() {
        return localMap;
    }
}
