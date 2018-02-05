package com.digiwin.custom.util;

import com.digiwin.custom.util.file.FileUtil;

import java.io.File;
import java.util.HashMap;

public class RecordToMp3 {

    public static Object recordToMp3(Object record) {
        //录音转mp3
        if (((HashMap) record).containsKey("content")) {
            File oldfile = FileUtil.base64ToFile(((HashMap) record).get("content").toString(),
                    FileUtil.getTempFolder() + File.separator + ((HashMap) record).get("file_name").toString() +
                            "." + ((HashMap) record).get("file_extname").toString());
            File newFile = new File(FileUtil.getTempFolder() + File.separator + ((HashMap) record).get("file_name").toString() + ".mp3");
            FileUtil.changeToMp3(oldfile, newFile);
            ((HashMap) record).put("content", FileUtil.fileToBase64(newFile));
            ((HashMap) record).put("file_extname", "mp3");
        }
        return record;
    }
}
