package com.digiwin.custom.util.file;

import com.seeyon.framework.entity.FileEntity;
import com.seeyon.framework.exception.BaseException;
import com.seeyon.framework.service.FileService.FileFrom;
import com.seeyon.framework.util.Constants;
import com.seeyon.framework.util.JsonUtil;
import com.seeyon.framework.util.RadomUtil;
import com.seeyon.framework.util.UUIDUtil;
import com.seeyon.framework.web.FileConfig;
import it.sauronsoftware.jave.*;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.codec.binary.Hex;
import org.apache.commons.fileupload.FileItem;
import org.apache.log4j.Logger;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URLEncoder;
import java.security.MessageDigest;
import java.util.*;
/**
 * 文件处理类
 *
 * @author Administrator
 */
public class FileUtil {
    public static Logger log = Logger.getLogger(FileUtil.class);
    public static String tempFilePath = FileConfig.getTmpFilePath();
    public static Map<String, HttpServletRequest> httpServletRequestMap = new HashMap<String, HttpServletRequest>();

    public static final String PNG = "png";
    public static final String JPG = "jpg";
    public static final String GIF = "gif";
    public static final String BMP = "bmp";
    public static final String JPEG = "jpeg";
    public static final String PDF = "pdf";
    public static final String DOC = "doc";
    public static final String DOCX = "docx";
    public static final String XLS = "xls";
    public static final String XLSX = "xlsx";
    public static final String PPT = "ppt";
    public static final String PPTX = "pptx";
    public static final String TXT = "txt";
    public static final String HTML = "html";

    /**
     * 得到唯一主键
     *
     * @return
     */
    public static String getPk() {
        String uuid = UUIDUtil.getUUID();
        return uuid;
    }

    /**
     * 输入流转换成byte字节
     *
     * @param fileInputStream
     * @return
     */
    public static List<byte[]> inputStreamToByte(InputStream fileInputStream) {
        if (fileInputStream == null) {
            return null;
        }
        List<byte[]> l = new ArrayList<byte[]>();
        try {
            byte[] b = new byte[1024];
            int len;
            while ((len = fileInputStream.read(b)) != -1) {
                byte[] newB = Arrays.copyOfRange(b, 0, len);
                l.add(newB);
            }
            fileInputStream.close();
        } catch (Exception e) {
        }
        return l;
    }

    /**
     * 读取文件信息
     *
     * @param objFile
     * @return
     * @throws Exception
     */
    public static String readContentFromFile(File objFile) throws Exception {
        BufferedReader styleB = new BufferedReader(new InputStreamReader(new FileInputStream(objFile), "utf-8"));
        String line = "";
        StringBuffer parseString = new StringBuffer("");
        while ((line = styleB.readLine()) != null) {
            parseString.append(line);
        }
        if (styleB != null) {
            styleB.close();
        }
        return parseString.toString();
    }

    /**
     * Get an unique file
     *
     * @param ext file name extension
     * @return an unique file that not exists
     * @throws IOException
     */
    public static File getUniqueFile(String ext) throws IOException {
        File result;
        String fileName = getPk();
        File file = new File(FileConfig.getTmpFilePath());
        if (!file.isDirectory()) {
            file.mkdirs();
        }
        result = new File(FileConfig.getTmpFilePath(), "" + fileName + "." + ext);
        return result;
    }

    /**
     * 获取portal资源包名称
     * 规则为portal-前缀  + 时间戳 精确到毫秒
     * Tim 2016-07-19
     *
     * @param ext file name extension
     * @return an unique file that not exists
     * @throws IOException
     */
    public static File getPortalZipFile(String ext) throws IOException {
        File result;
        String fileName = "portal-" + System.currentTimeMillis();
        File file = new File(FileConfig.getTmpFilePath());
        if (!file.isDirectory()) {
            file.mkdirs();
        }
        result = new File(FileConfig.getTmpFilePath(), "" + fileName + ext);
        return result;
    }

    /**
     * 获取临时目录下的资源文件
     *
     * @return
     * @throws IOException
     */
    public static File getTempSourceFile() throws BaseException {
        File result;
        File file = new File(FileConfig.getTmpFilePath());
        if (!file.isDirectory()) {
            file.mkdirs();
        }
        result = new File(FileConfig.getTmpFilePath(), "/source");
        return result;
    }

    /**
     * 获取临时note文件
     * Tim 2016-08-11
     *
     * @return
     * @throws IOException
     */
    public static File getPortalNoteFile() throws IOException {
        File result;
        String fileName = "/source/note";
        File file = new File(FileConfig.getTmpFilePath());
        if (!file.isDirectory()) {
            file.mkdirs();
        }
        result = new File(FileConfig.getTmpFilePath(), fileName);
        if(result.exists() && result.isFile()){
            result.delete();
        }
        return new File(FileConfig.getTmpFilePath(), fileName);
    }

    /**
     * @param fileExt
     * @return
     * @throws Exception
     */
    public static String getContentType(String fileExt) throws Exception {
        Map mime = new HashMap();
        // 文档类型
        mime.put(".doc", "application/msword");
        mime.put(".docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
        mime.put(".xls", "application/vnd.ms-excel");
        mime.put(".xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        mime.put(".ppt", "application/vnd.ms-powerpoint");
        // mime.put(".pptx", "application/vnd.ms-powerpoint");
        mime.put(".pptx", "application/vnd.openxmlformats-officedocument.presentationml.presentation");
        mime.put(".pdf", "application/pdf");
        mime.put(".key", "application/x-iwork-keynote-sffkey");
        mime.put(".pages", "application/x-iwork-pages-sffpages");
        mime.put(".numbers", "application/x-iwork-numbers-sffnumbers");
        mime.put(".rtf", "application/rtf");

        // 图片类型
        mime.put(".jpe", "image/jpeg");
        mime.put(".jpeg", "image/jpeg");
        mime.put(".jpg", "image/jpeg");
        mime.put(".gif", "image/gif");
        mime.put(".png", "image/png");
        mime.put(".bmp", "image/bmp ");
        mime.put(".tif", "image/tiff");

        // 声音类型
        mime.put(".mp3", "audio/x-mpeg");
        mime.put(".amr", "audio/amr");
        mime.put(".aac", "audio/x-aac");
        mime.put(".caf", "audio/x-caf");
        mime.put(".wav", "audio/wav");
        mime.put(".wma", "audio/x-ms-wma");
        mime.put(".awb", "audio/amr-wb");
        mime.put(".mid", "audio/midi");
        mime.put(".midi", "audio/midi");
        mime.put(".ra", "audio/x-pn-realaudio");
        mime.put(".ram", "audio/x-pn-realaudio");

        // 文本、超文本类型
        mime.put(".html", "text/html");
        mime.put(".htx", "text/html");
        mime.put(".htm", "text/html");
        mime.put(".xml", "text/xml");
        mime.put(".xsl", "text/xml");
        mime.put(".xhtml", "application/xhtml+xml");
        mime.put(".txt", "text/plain");
        mime.put(".js", "text/javascript");

        // 视频类型
        mime.put(".mp4", "video/mp4");
        mime.put(".mpeg", "video/mpeg");
        mime.put(".mpg", "video/mpeg");
        mime.put(".avi", "video/avi");
        mime.put(".wmv", "video/x-ms-wmv");
        mime.put(".flv", "video/x-flv");
        mime.put(".mov", "video/quicktime");
        mime.put(".m4v", "video/x-m4v");
        mime.put(".3gp", "video/3gpp");

        // 其他类型
        mime.put(".exe", "application/x-msdownload");
        mime.put(".apk", "application/vnd.android.package-archive");
        mime.put(".swf", "application/x-shockwave-flash");
        mime.put(".zip", "application/zip");
        mime.put(".rar", "application/x-rar-compressed");

        String cType = (String) mime.get(fileExt);
        if (cType == null || "".equals(cType)) {
            cType = "application/x-msdownload";
        }
        return cType;
    }

    /**
     * inputstream 转 File
     * @param ins
     * @param file
     */
    public static void inputstreamtofile(InputStream ins,File file) {
        try {
            OutputStream os = new FileOutputStream(file);
            int bytesRead = 0;
            byte[] buffer = new byte[8192];
            while ((bytesRead = ins.read(buffer, 0, 8192)) != -1) {
                os.write(buffer, 0, bytesRead);
            }
            os.close();
            ins.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * 文件转base64字符串
     * @param file
     * @return
     */
    public static String fileToBase64(File file) {
        String base64 = null;
        InputStream in = null;
        try {
            in = new FileInputStream(file);
            byte[] bytes = new byte[in.available()];
            int length = in.read(bytes);
            base64 = Base64.encodeBase64String(bytes);
        } catch (FileNotFoundException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } finally {
            try {
                if (in != null) {
                    in.close();
                }
            } catch (IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }
        return base64;
    }

    /**
     * base64字符串转文件
     * @param base64
     * @return
     */
    public static File base64ToFile(String base64,String fileName) {
        File file = null;
        //String fileName = "/Petssions/record/testFile.amr";
        FileOutputStream out = null;
        try {
            // 解码，然后将字节转换为文件
            file = new File(fileName);
            if (!file.exists())
                file.createNewFile();
            byte[] bytes = Base64.decodeBase64(base64);//base64, Base64.DEFAULT);// 将字符串转换为byte数组
            ByteArrayInputStream in = new ByteArrayInputStream(bytes);
            byte[] buffer = new byte[1024];
            out = new FileOutputStream(file);
            int bytesum = 0;
            int byteread = 0;
            while ((byteread = in.read(buffer)) != -1) {
                bytesum += byteread;
                out.write(buffer, 0, byteread); // 文件写操作
            }
        } catch (IOException ioe) {
            ioe.printStackTrace();
        } finally {
            try {
                if (out!= null) {
                    out.close();
                }
            } catch (IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }
        return file;
    }

    /**
     * 下载文件:文件下载成功后，删除临时文件
     *
     * @param fileName
     * @param inStream
     * @param response
     * @throws Exception
     */
    public static void downLoadFileForMobile(String fileName, InputStream inStream, HttpServletRequest request,
                                             HttpServletResponse response) throws Exception {

        String ext = FileUtil.getExt(fileName);
        String cType = getContentType("." + ext);
        //amr转mp3
        if(ext.equals("amr")){
            File amrfile = new File(fileName);
            inputstreamtofile(inStream,amrfile);
            fileName.replaceAll("amr","mp3");
            File mp3file = new File(fileName);
            FileUtil.changeToMp3(amrfile,mp3file);
            inStream = new FileInputStream(mp3file);

        }
        response.reset();
        response.setContentType(cType);
        //response.addHeader("Content-Disposition", "attachment; filename=\"" + URLEncoder.encode(fileName, "utf-8") + "\"");
        String agent = request.getHeader("User-Agent");
        try {
            boolean isFireFox = (agent != null && agent.toLowerCase().indexOf("firefox") != -1);
            boolean isMicroMessenger = (agent != null && agent.toLowerCase().indexOf("micromessenger") != -1);
            if (isFireFox) {
                response.addHeader("Content-Disposition",
                        "attachment; filename*=" + URLEncoder.encode(fileName, "utf-8"));
            } else if (isMicroMessenger) {
                response.addHeader("Content-Disposition",
                        "attachment; filename=\"" + new String(fileName.getBytes("UTF8"), "ISO8859-1") + "\"");
            } else {
                response.addHeader("Content-Disposition",
                        "attachment; filename=\"" + URLEncoder.encode(fileName, "utf-8") + "\"");
            }
        } catch (Exception e) {
            log.debug(e);
            response.addHeader("Content-Disposition",
                    "attachment; filename=\"" + URLEncoder.encode(fileName, "utf-8") + "\"");
        }
        int len;
        byte[] b = new byte[1024];

        while ((len = inStream.read(b)) > 0) {
            response.getOutputStream().write(b, 0, len);
        }
        inStream.close();


    }

    /**
     * 下载文件:文件下载成功后，删除临时文件
     *
     * @param fileName
     * @param inStream
     * @param response
     * @throws Exception
     */
    public static void downLoadFile(String fileName, InputStream inStream, HttpServletRequest request,
                                    HttpServletResponse response) throws Exception {
        response.reset();
        String ext = FileUtil.getExt(fileName);
        String cType = getContentType("." + ext);
        response.setContentType(cType + ";charset=utf-8");
        String agent = request.getHeader("User-Agent");
        try {
            boolean isFireFox = (agent != null && agent.toLowerCase().indexOf("firefox") != -1);
            boolean isChrome = (agent != null && agent.toLowerCase().indexOf("chrome") != -1);
            boolean isEdge = (agent != null && agent.toLowerCase().indexOf("edge") != -1);
            if (isFireFox) {
                response.addHeader("Content-Disposition",
                        "attachment; filename*=" + URLEncoder.encode(fileName, "utf-8"));
            } else if (isChrome && !isEdge) {
                response.addHeader("Content-Disposition",
                        "attachment; filename=\"" + new String(fileName.getBytes("UTF-8"), "ISO8859-1") + "\"");
            } else {
                response.addHeader("Content-Disposition",
                        "attachment; filename=\"" + URLEncoder.encode(fileName, "utf-8").replace("+", " ") + "\"");
            }
            //response.setHeader("Content-type","text/html;charset=utf-8");
        } catch (Exception e) {
            response.addHeader("Content-Disposition",
                    "attachment; filename=\"" + URLEncoder.encode(fileName, "utf-8") + "\"");

        }
        int len;
        byte[] b = new byte[1024];
        while ((len = inStream.read(b)) > 0) {
            OutputStream outputStream = response.getOutputStream();
            outputStream.write(b, 0, len);
        }
        inStream.close();
        response.getOutputStream().flush();
        response.getOutputStream().close();
    }

    /**
     * 下载Mp3文件:文件下载成功后，删除临时文件
     *
     * @param fileName
     * @param inStream
     * @param request
     * @param response
     * @throws Exception
     */
    public static void downLoadMp3File(String fileName, InputStream inStream, HttpServletRequest request,
                                       HttpServletResponse response) throws Exception {
        response.reset();
        String agent = request.getHeader("User-Agent");
        try {
            boolean isFireFox = (agent != null && agent.toLowerCase().indexOf("firefox") != -1);
            if (isFireFox) {
                response.addHeader("Content-Disposition",
                        "attachment; filename*=" + URLEncoder.encode(fileName, "utf-8"));
            } else {
                response.addHeader("Content-Type", "audio/x-mpeg");
                response.setContentType("audio/x-mpeg");
            }
        } catch (Exception e) {
            response.addHeader("Content-Disposition",
                    "attachment; filename=\"" + URLEncoder.encode(fileName, "utf-8") + "\"");
        }
        int len;
        byte[] b = new byte[1024];
        while ((len = inStream.read(b)) > 0) {
            response.getOutputStream().write(b, 0, len);
        }
        inStream.close();
    }

    /**
     * 下载文件:文件下载成功后，删除临时文件
     *
     * @param fileName
     * @param b
     * @param response
     * @throws Exception
     */
    public static void downLoadFile(String fileName, List<byte[]> b, HttpServletResponse response) throws Exception {
        response.reset();
        for (byte[] bs : b) {
            response.getOutputStream().write(bs, 0, bs.length);
        }
    }

    /**
     * 下载文件:文件下载成功后，删除临时文件
     *
     * @param fileName
     * @param descFile
     * @param response
     * @throws Exception
     */
    public static void downLoadFileNormal(String fileName, File descFile, HttpServletResponse response)
            throws Exception {
        fileName = new String(fileName.getBytes("gb2312"), "ISO8859-1");
        String ext = FileUtil.getExt(fileName);
        String cType = getContentType("." + ext);
        response.setContentType(cType);
        response.setContentLength((int) descFile.length());

        response.addHeader("Content-Disposition", "attachment; filename=\"" + fileName + "\"");
        InputStream inStream = new FileInputStream(descFile);
        int len;
        byte[] b = new byte[100];
        while ((len = inStream.read(b)) > 0) {
            response.getOutputStream().write(b, 0, len);
        }
        inStream.close();
    }

    /**
     * 下载文件:文件下载成功后，删除临时文件
     *
     * @param fileName
     * @param descFile
     * @param response
     * @throws Exception
     */
    public static void downLoadFile(String fileName, File descFile, HttpServletResponse response) throws Exception {
        downLoadFileNormal(fileName, descFile, response);
        forceDelete(descFile);
    }

    /**
     * 下载文件；
     *
     * @param fileName
     * @param descFile
     * @param response
     * @throws Exception
     */
    public static void downLoadFile(String fileName, byte[] descFile, HttpServletResponse response) throws Exception {
        fileName = new String(fileName.getBytes("gb2312"), "ISO8859-1");
        response.reset();
        response.setContentType("application/x-msdownload");
        response.addHeader("Content-Disposition", "attachment; filename=\"" + fileName + "\"");
        response.getOutputStream().write(descFile, 0, descFile.length);
    }

    /**
     * 清理不需要的临时文件；
     */
    public static void clearGarbageTemplateFolder() {

    }

    /**
     * 得到临时存放文件目录；
     *
     * @return
     */
    public static File getTempFolder() {
        File tempFile = new File(tempFilePath);
        if (!tempFile.exists()) {
            tempFile.mkdirs();
        }
        return tempFile;
    }

//    /**
//     * 写文件
//     *
//     * @param request
//     * @param dataMap
//     * @param fileFrom
//     * @param companyID
//     * @return
//     * @throws Exception
//     */
//    public static List<FileEntity> getFileInfo(HttpServletRequest request, Map dataMap, FileFrom fileFrom,
//                                               String companyID) throws Exception {
//        return getFileInfo(request, null, dataMap, fileFrom, companyID);
//    }
//
//    /**
//     * 写文件
//     *
//     * @param request
//     * @param response
//     * @param dataMap
//     * @param fileFrom
//     * @param companyID
//     * @return
//     * @throws Exception
//     */
//    public static List<FileEntity> getFileInfo(HttpServletRequest request, HttpServletResponse response, Map dataMap,
//                                               FileFrom fileFrom, String companyID) throws Exception {
//        Map fileMap = new HashMap();
//        DiskFileItemFactory factory = new DiskFileItemFactory();
//        factory.setSizeThreshold(2048);
//        File tempFile = getTempFolder();
//        factory.setRepository(tempFile);
//        ServletFileUpload upload = new ServletFileUpload(factory);
//        Long sizeMax = (Long) dataMap.get("sizeMax");
//        if (null == sizeMax) {
//            sizeMax = 1024000000l;
//        }
//        upload.setSizeMax(sizeMax);
//        // progressListener.setStatus("start");
//        request.setAttribute("fileUploadResponse", response);
//        String radomFileID = request.getParameter("radomFileID");
//        String showPercent = request.getParameter("showPercent");
//        if ("yes".equals(showPercent) && null != radomFileID) {
//            FileUploadListenerSerial progressListener = new FileUploadListenerSerial();
//            httpServletRequestMap.put(radomFileID, request);
//            request.getSession().setAttribute("progress_" + radomFileID, progressListener);
//            upload.setProgressListener(progressListener);
//        }
//
//        List items = upload.parseRequest(request);
//        /*
//         * InputStream in=uploadFile.getInputStream(); FileOutputStream out=new
//         * FileOutputStream(outFile); byte bt[] = new byte[1024]; int c;
//         * while((c=in.read(bt))>0){ out.write(bt,0,c); } out.close();
//         * in.close();
//         */
//        String pid = "";
//        String comment = "";
//        Iterator iter = items.iterator();
//        while (iter.hasNext()) {
//            FileItem item = (FileItem) iter.next();
//            if (item.isFormField()) {
//                String name = item.getFieldName();
//                String value = item.getString("utf-8");
//                value = HtmlUtils.encodeCharacter(value);
//                dataMap.put(name, value);
//                if ("uid".equals(name)) {
//                    // request.getSession().setAttribute(value,
//                    // progressListener);
//                }
//            } else {
//                String fileName = item.getName();
//                if (fileName == null || fileName.equals(""))
//                    continue;
//                fileName = fileName.substring(fileName.lastIndexOf("\\") + 1);
//                fileMap.put(fileName, item);
//                // item.write(uploadedFile);
//            }
//        }
//        processDataMap(dataMap);
//        return getFileList(fileMap, fileFrom, companyID);
//    }

    /**
     * 处理
     *
     * @param dataMap
     * @throws Exception
     */
    public static void processDataMap(Map dataMap) throws Exception {
        String __json__String = (String) dataMap.get("__json__String");
        if (null != __json__String) {
            Map dMap = JsonUtil.jsonStringToMap(__json__String);
            dataMap.putAll(dMap);
            dataMap.remove("__json__String");
        }
    }

    /**
     * 得到文件List
     *
     * @param fileMap
     * @return
     */
    public static List<FileEntity> getFileList(Map fileMap, FileFrom fileFrom, String companyID) {
        List<FileEntity> fileList = new ArrayList<FileEntity>();
        Iterator iterator = fileMap.keySet().iterator();
        while (iterator.hasNext()) {
            String fileName = (String) iterator.next();
            FileItem fileItem = (FileItem) fileMap.get(fileName);
            FileEntity fileEntity = new FileEntity();
            fileEntity.setCompanyID(companyID);
            // file
            fileEntity.setFileId(FileUtil.getPk());
            fileEntity.setFileSize(fileItem.getSize());
            fileEntity.setFileItem(fileItem);
            // RENAME EXE FILE
            String ext = FileUtil.getExt(fileName);
            if ("exe".equalsIgnoreCase(ext)) {
                fileName += RadomUtil.getRadomNum(4);
            }
            fileEntity.setFileName(fileName);
            if (null == fileFrom) {
                fileFrom = FileFrom.other;
            }
            fileEntity.setFileFrom(fileFrom.toString());
            fileEntity.setFileExt(FileUtil.getExt(fileName));
            fileList.add(fileEntity);
        }
        return fileList;
    }

    /**
     * 得到文件后缀名
     *
     * @param fileName
     * @return
     */
    public static String getExt(String fileName) {
        String ext = fileName.substring(fileName.lastIndexOf(".") + 1);
        ext = ext.toLowerCase();
        return ext;
    }

    /**
     * Delete a file. If file is directory delete it and all sub-directories.
     */
    public static void forceDelete(final String file) throws IOException {
        forceDelete(new File(file));
    }
    /**
     * 把Object输出到文件
     * @param obj
     * @param outputFile
     */
    public static void object2File(Object obj, File outputFile) {
        ObjectOutputStream oos = null;
        FileOutputStream fos = null;
        try {
            fos = new FileOutputStream(outputFile);
            oos = new ObjectOutputStream(fos);
            oos.writeObject(obj);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (oos != null) {
                try {
                    oos.close();
                } catch (IOException e1) {
                    e1.printStackTrace();
                }
            }
            if (fos != null) {
                try {
                    fos.close();
                } catch (IOException e2) {
                    e2.printStackTrace();
                }
            }
        }
    }
    /**
     * Delete a file. If file is directory delete it and all sub-directories.
     */
    public static void forceDelete(final File file) throws IOException {
        if (file.isDirectory()) {
            deleteDirectory(file);
        } else {
            if (file.isFile()) {
                File tf = new File(file.getAbsolutePath());
                if (tf.isFile()) {
                    tf.delete();
                }
            }
        }
    }

    /**
     * Recursively delete a directory.
     */
    public static void deleteDirectory(final String directory) throws IOException {
        deleteDirectory(new File(directory));
    }

    /**
     * Recursively delete a directory.
     */
    public static void deleteDirectory(final File directory) throws IOException {
        if (!directory.exists()) {
            return;
        }

        cleanDirectory(directory);
        if (false == directory.delete()) {
            throw new IOException("Directory " + directory + " unable to be deleted.");
        }
    }

    /**
     * Clean a directory without deleting it.
     */
    public static void cleanDirectory(final String directory) throws IOException {
        cleanDirectory(new File(directory));
    }

    /**
     * Clean a directory without deleting it.
     */
    public static void cleanDirectory(final File directory) throws IOException {
        if (!directory.exists()) {
            final String message = directory + " does not exist";
            throw new IllegalArgumentException(message);
        }

        if (!directory.isDirectory()) {
            final String message = directory + " is not a directory";
            throw new IllegalArgumentException(message);
        }

        final File[] files = directory.listFiles();

        for (int i = 0; i < files.length; i++) {
            final File file = files[i];
            FileUtil.forceDelete(file);
        }
    }

    /**
     * 将数据内容写入到文件内
     *
     * @param objFile
     * @param titleList
     * @param keyList
     * @param codeMap
     * @param dataList
     * @return
     */
    public static File writeContentToTXTFile(File objFile, List titleList, List<String> keyList, Map codeMap,
                                             List<Map<String, Object>> dataList) {
        try {
            FileWriter fw = new FileWriter(objFile);
            BufferedWriter bw = new BufferedWriter(fw);
            // 文件标题
            writeTitleInfo(bw, titleList);
            // 文件主体
            writeContentInfo(bw, keyList, codeMap, dataList);

            bw.flush();
            fw.close();
        } catch (IOException e) {
            System.out.println("文件没有找到");
        }

        return null;
    }

    /**
     * 内容部分
     *
     * @param bw
     * @param keyList
     * @param codeMap
     * @param dataList
     * @throws IOException
     */
    private static void writeContentInfo(BufferedWriter bw, List<String> keyList, Map codeMap,
                                         List<Map<String, Object>> dataList) throws IOException {
        for (int j = 0; j < dataList.size(); j++) {
            Map dataMap = dataList.get(j);
            for (int i = 0; i < keyList.size(); i++) {
                String key = (String) keyList.get(i);
                Object data = dataMap.get(key);
                String ifCode = (String) codeMap.get(key);
                if (null != ifCode && !"".equals(ifCode) && data != null) {
                    String codeid = data.toString();
                    try {
                        data = null;// Constants.DICKEYVALUE_MAP.get(codeid);
                        if (null == data) {
                            data = dataMap.get(key);
                        }
                    } catch (Exception e) {
                        System.out.println("码表转换出错，请确认key：" + key + " 对应的value值：" + data + " 为码表的值");
                        data = dataMap.get(key);
                    }
                }
                if (null == data) {
                    data = "";
                }
                bw.write(data.toString());
                bw.write(Constants.separatorChar);
            }
            bw.newLine();
        }
    }

    /**
     * 构造文件头
     *
     * @param bw
     * @param titleList
     * @throws IOException
     */
    private static void writeTitleInfo(BufferedWriter bw, List titleList) throws IOException {
        for (int i = 0; i < titleList.size(); i++) {
            String value = titleList.get(i).toString();
            bw.write(value);
            bw.write(Constants.separatorChar);
        }
        bw.newLine();
    }

    /**
     * 加载到页面；
     *
     * @param response
     * @throws Exception
     */
    public static void writePicToPage(HttpServletResponse response, InputStream is) throws Exception {
        if (is == null) {
            return;
        }
        response.reset();
        response.setContentType("image/jpeg");
        int len;
        byte[] b = new byte[1024];
        while ((len = is.read(b)) > 0) {
            response.getOutputStream().write(b, 0, len);
        }
        response.getOutputStream().flush();
        is.close();
    }

    /**
     * 加载到页面；
     *
     * @param response
     * @throws Exception
     */
    public static void writePicToPage(HttpServletResponse response, List<byte[]> b) throws Exception {
        response.setContentType("image/jpeg");

        // width height
        // Image image = javax.imageio.ImageIO.read();
        if (null != b) {
            for (byte[] sb : b) {
                response.getOutputStream().write(sb);
            }
            response.getOutputStream().flush();
        }
    }

    /**
     * 文件流到byte数组；
     *
     * @param fileInputStream
     * @return
     * @throws IOException
     */
    public static byte[] inputStream2Byte(InputStream fileInputStream) throws IOException {
        if (fileInputStream == null) {
            return null;
        }
        ByteArrayOutputStream swapStream = new ByteArrayOutputStream();
        byte[] buff = new byte[1024];
        int rc = 0;
        while ((rc = fileInputStream.read(buff, 0, 1024)) > 0) {
            swapStream.write(buff, 0, rc);
        }
        fileInputStream.close();
        byte[] in2b = swapStream.toByteArray();
        return in2b;
    }

    /**
     * 加载到页面；
     *
     * @param response
     * @throws Exception
     */
    public static void writeFileToPage(HttpServletResponse response, List<byte[]> b) throws Exception {
        response.reset();
        for (byte[] sb : b) {
            response.getOutputStream().write(sb);
        }
    }

    public static boolean isImage(String externalName) {
        if (PNG.equalsIgnoreCase(externalName) || GIF.equalsIgnoreCase(externalName) || BMP
                .equalsIgnoreCase(externalName) || JPG.equalsIgnoreCase(externalName) || JPEG
                .equalsIgnoreCase(externalName)) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 将流写到文件内；
     *
     * @param file
     * @param is
     * @throws Exception
     */
    public static void writeInputStreamToFile(File file, InputStream is) throws Exception {
        FileOutputStream fos = null;
        BufferedInputStream bis = null;
        int BUFFER_SIZE = 9999;
        byte[] buf = new byte[BUFFER_SIZE];
        int size = 0;
        bis = new BufferedInputStream(is);
        fos = new FileOutputStream(file);
        while ((size = bis.read(buf)) != -1) {
            fos.write(buf, 0, size);
        }
        fos.close();
        bis.close();
        if (is != null) {
            is.close();
        }
    }

    /**
     * 将字节写入文件
     * @param bytes
     * @param file
     * @throws Exception
     */
    public static void writeBytesToFile(byte[] bytes, File file){
        OutputStream out = null;
        try {
            ByteArrayInputStream in = new ByteArrayInputStream(bytes);
            byte[] buffer = new byte[1024];
            out = new FileOutputStream(file);
            int byteread = 0;
            while ((byteread = in.read(buffer)) != -1) {
                out.write(buffer, 0, byteread); // 文件写操作
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        } finally {
            if ( out != null) {
                try {
                    out.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

    }

    public static boolean isPdf(String externalName) {
        return PDF.equalsIgnoreCase(externalName);
    }

    public static boolean isOffice(String externalName) {
        if (PPT.equalsIgnoreCase(externalName)) {
            return true;
        } else if (XLS.equalsIgnoreCase(externalName)) {
            return true;
        } else if (XLSX.equalsIgnoreCase(externalName)) {
            return true;
        } else if (DOC.equalsIgnoreCase(externalName)) {
            return true;
        } else if (DOCX.equalsIgnoreCase(externalName)) {
            return true;
        } else if (PPTX.equalsIgnoreCase(externalName)) {
            return true;
        } else if (PPT.equalsIgnoreCase(externalName)) {
            return true;
        } else if (TXT.equalsIgnoreCase(externalName)) {
            return true;
        }
        return false;

    }

    public static String getFileMD5(String filePath) {
        return getFileMD5(new File(filePath));
    }

    public static String getFileMD5(File file) {
        InputStream inStream = null;
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            inStream = new FileInputStream(file);
            int len;
            byte[] b = new byte[100];
            while ((len = inStream.read(b)) > 0) {
                md.update(b, 0, len);
            }
            inStream.close();
            return new String(Hex.encodeHex(md.digest()));
        } catch (Exception e) {
        } finally {
            try {
                if (inStream != null) {
                    inStream.close();
                }
            } catch (Exception e) {
            }
        }
        return null;
    }

    /**
     * 适用于同一目录下全是
     * 子目录递归调用获取文件
     *
     * @param file
     * @return List<File> 返回file的list
     * @throws BaseException
     */
    public static List<File> getAllFileWithPath(File file, List<File> tempList, Boolean isCustom) throws BaseException {
        File[] files = file.listFiles();
        if (files == null) {
            return tempList;
        }
        for (File f : files) {
            if (f.isDirectory()) {
                if (!isCustom) {
                    if ("custom".equalsIgnoreCase(f.getName())) {
                        continue;
                    }
                }
                getAllFileWithPath(f, tempList, isCustom);
            } else {
                if ("note".equalsIgnoreCase(f.getName())) {
                    continue;
                }
                tempList.add(f);
            }
        }
        return tempList;
    }

    /**
     * 音频格式转MP3
     * @param source
     * @param target
     */
    public static void changeToMp3(File source, File target) {
        AudioAttributes audio = new AudioAttributes();
        Encoder encoder = new Encoder();

        audio.setCodec("libmp3lame");
        EncodingAttributes attrs = new EncodingAttributes();
        attrs.setFormat("mp3");
        attrs.setAudioAttributes(audio);

        try {
            encoder.encode(source, target, attrs);
        } catch (IllegalArgumentException e) {
            log.error(e.getMessage(),e);
        } catch (InputFormatException e) {
            log.error(e.getMessage(),e);
        } catch (EncoderException e) {
            log.error(e.getMessage(),e);
        }
    }
    /**
     * 复制一个目录及其子目录、文件到另外一个目录
     * Tim
     *
     * @param src  -- 源文件
     * @param dest -- 目标文件
     * @throws IOException
     */
    public static void copyFolder(File src, File dest) throws IOException {
        if (src.isDirectory()) {
            if (!dest.exists()) {
                dest.mkdir();
            }
            String files[] = src.list();
            for (String file : files) {
                File srcFile = new File(src, file);
                File destFile = new File(dest, file);
                // 递归复制
                copyFolder(srcFile, destFile);
            }
        } else {
            InputStream in = new FileInputStream(src);
            OutputStream out = new FileOutputStream(dest);
            byte[] buffer = new byte[1024];

            int length;

            while ((length = in.read(buffer)) > 0) {
                out.write(buffer, 0, length);
            }
            in.close();
            out.close();
        }
    }

    /**
     * 去掉图片编码中的头信息（data:image/png;base64,）
     * @param base64    图片字符码
     * @return  如果未找到则返回null
     */
    public static String removeImageHeaderFromBase64(String base64) {
        int i = base64.indexOf(";base64,");
        if (i == -1) {
            return base64;
        }
        return base64.substring(i + 8);
    }
    /**
     * 获取base64编码的图片扩展名
     * @param base64    图片字符码
     * @return  如果未找到则返回null
     */
    public static String getImageExtFromBase64(String base64) {
        int i = base64.indexOf("data:image/");
        if (i == -1) {
            return null;
        }
        String extStr = base64.substring(i + 11, i+21).toLowerCase();
        if (extStr.startsWith(PNG)) {
            return PNG;
        }
        if (extStr.startsWith(JPG)) {
            return JPG;
        }
        if (extStr.startsWith(GIF)) {
            return GIF;
        }
        if (extStr.startsWith(BMP)) {
            return BMP;
        }
        if (extStr.startsWith(JPEG)) {
            return JPEG;
        }
        return null;
    }

}
