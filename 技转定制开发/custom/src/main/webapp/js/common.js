// 表情配置定义
var EXPRESSION = [ {
    image : "qinqin.gif?v=2.0",
    title : "亲亲",
    mark : "[亲亲]"
}, {
    image : "baobao.gif?v=2.0",
    title : "抱抱",
    mark : "[抱抱]"
}, {
    image : "jiong.gif?v=2.0",
    title : "囧",
    mark : "[囧]"
}, {
    image : "kuangxiao.gif?v=2.0",
    title : "狂笑",
    mark : "[狂笑]"
}, {
    image : "xiaohehe.gif?v=2.0",
    title : "开心",
    mark : "[开心]"
}, {
    image : "sikao.gif?v=2.0",
    title : "思考",
    mark : "[思考]"
}, {
    image : "yiwen.gif?v=2.0",
    title : "疑问",
    mark : "[疑问]"
}, {
    image : "zhuakuang.gif?v=2.0",
    title : "抓狂",
    mark : "[抓狂]"
}, {
    image : "fengnu.gif?v=2.0",
    title : "愤怒",
    mark : "[愤怒]"
}, {
    image : "daku.gif?v=2.0",
    title : "大哭",
    mark : "[大哭]"
}, {
    image : "jingya.gif?v=2.0",
    title : "惊讶",
    mark : "[惊讶]"
}, {
    image : "ciya.gif?v=2.0",
    title : "呲牙",
    mark : "[呲牙]"
}, {
    image : "maimeng.gif?v=2.0",
    title : "卖萌",
    mark : "[卖萌]"
}, {
    image : "touxiao.gif?v=2.0",
    title : "偷笑",
    mark : "[偷笑]"
}, {
    image : "urge.gif?v=2.0",
    title : "催",
    mark : "[催]"
}, {
    image : "jiayou.gif?v=2.0",
    title : "加油",
    mark : "[加油]"
}, {
    image : "celebrity.gif?v=2.0",
    title : "庆祝",
    mark : "[庆祝]"
}, {
    image : "help.gif?v=2.0",
    title : "帮助",
    mark : "[帮助]"
}, {
    image : "jiaban.gif?v=2.0",
    title : "加班",
    mark : "[加班]"
}, {
    image : "award.gif?v=2.0",
    title : "奖励",
    mark : "[奖励]"
}, {
    image : "birth_cake.gif?v=2.0",
    title : "蛋糕",
    mark : "[蛋糕]"
}, {
    image : "ding.gif?v=2.0",
    title : "顶",
    mark : "[顶]"
}, {
    image : "huaxin.gif?v=2.0",
    title : "花心",
    mark : "[花心]"
}, {
    image : "zuoguilian.gif?v=2.0",
    title : "做鬼脸",
    mark : "[做鬼脸]"
}, {
    image : "good.gif?v=2.0",
    title : "赞",
    mark : "[赞]"
}, {
    image : "applause.gif?v=2.0",
    title : "鼓掌",
    mark : "[鼓掌]"
}, {
    image : "ok.gif?v=2.0",
    title : "OK",
    mark : "[OK]"
}, {
    image : "handshake.gif?v=2.0",
    title : "握手",
    mark : "[握手]"
}, {
    image : "entrust.gif?v=2.0",
    title : "抱拳",
    mark : "[抱拳]"
}, {
    image : "bad.gif?v=2.0",
    title : "弱",
    mark : "[弱]"
} ];
// 定义通用ESN UTITL类
function ESNMOBILE() {
    this.pictureType = [ 'jpg', 'jpeg', 'png', 'gif', 'bmp', 'tif' ];
    this.musicType = [ 'mp3', 'wav', 'amr', 'wma', 'ogg', 'ape', 'acc' ];
    this.videoType = [ 'mov', 'mp4', '3gp', 'avi', 'rmvb', 'mpg', 'rm', 'asf', 'wmv', 'navi', 'mkv', 'ra', 'ram', 'flv' ];
    this.docType = [ 'doc', 'docx', 'dot', 'dotx', 'dotm', 'docm', 'txt', 'pages', 'wps', 'wpt' ];
    this.pptType = [ 'ppt', 'pptx', 'pps', 'pot', 'potx', 'potm', 'ppsx', 'pptm', 'ppsm', 'key', 'dps', 'dpt' ];
    this.xlsType = [ 'xls', 'xlsx', 'xlsm', 'xlt', 'xltx', 'xltm', 'numbers', 'et', 'ett' ];
    this.pdfType = [ 'pdf' ];
    this.htmlType = [ 'html', 'htm' ];
    this.rarType = [ 'rar', 'zip' ];
}
String.prototype.portalReplaceAll = function(reallyDo, replaceWith, ignoreCase) {
    if (!RegExp.prototype.isPrototypeOf(reallyDo)) {
        return this.replace(new RegExp(reallyDo, (ignoreCase ? "gi" : "g")), replaceWith);
    } else {
        return this.replace(reallyDo, replaceWith);
    }
};
String.prototype.getStrLength = function() {
    var content = this;
    var len = 0;
    if (null == content || "" == content) {
        return len;
    }
    for ( var i = 0; i < this.length; i++) {
        if (this.charCodeAt(i) > 255 || this.charCodeAt(i) < 0)
            len += 2;
        else
            len++;
    }
    return len;
};
String.prototype.startWith = function(str) {
    if (str == null || str == "" || this.length == 0 || str.length > this.length)
        return false;
    if (this.substr(0, str.length) == str)
        return true;
    else
        return false;
    return true;
};
String.prototype.endWith = function(str) {
    if (str == null || str == "" || this.length == 0 || str.length > this.length)
        return false;
    if (this.substring(this.length - str.length) == str)
        return true;
    else
        return false;
    return true;
};
Date.prototype.format = function(fmt) {
    var o = {
        "M+" : this.getMonth() + 1, // 月份
        "d+" : this.getDate(), // 日
        "h+" : this.getHours(), // 小时
        "H+" : this.getHours(), // 小时
        "m+" : this.getMinutes(), // 分
        "s+" : this.getSeconds(), // 秒
        "q+" : Math.floor((this.getMonth() + 3) / 3), // 季度
        "S" : this.getMilliseconds()
        // 毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for ( var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
};
Array.prototype.searchByKey = function(personStr, personID) {
    if (personID == null || personID == undefined)
        return -1;
    else {
        for ( var i = 0; i < this.length; i++) {
            if (this[i][personStr] === personID)
                return i;
        }
        return -1;
    }
};
Array.prototype.removeAt = function (index) {
    this.splice(index, 1);
};
$
    .extend(
        true,
        ESNMOBILE.prototype,
        {
            /**
             * @param fileSize long类型 字节
             */
            formatFileSize : function(fileSize) {
                fileSize = fileSize / 1024.00;
                var upSizeStr = "KB";
                if (fileSize > 1024) {
                    fileSize = fileSize / 1024;
                    upSizeStr = "MB";
                }
                fileSize = Math.round(fileSize * 100) / 100;
                if (fileSize < 1) {
                    fileSize = 1;
                }
                upSizeStr = fileSize + upSizeStr;
                return upSizeStr;
            },

            // 获得图标
            getFileIcon : function(fileName) {
                var index = fileName.lastIndexOf(".");
                var ext = fileName.substring(index + 1, fileName.length);
                var image = [ 'gif', 'jpg', 'png', 'jpeg', 'bmp', 'tif' ];
                var audio = [ 'mp3', 'wav', 'amr', 'wma', 'ogg', 'ape', 'acc' ];
                var video = [ 'mov', 'mp4', '3gp', 'avi', 'rmvb', 'mpg', 'rm', 'asf', 'wmv', 'navi', 'mkv',
                    'ra', 'ram', 'flv' ];
                var excel = [ 'xls', 'xlsx', 'xlsm', 'xlt', 'xltx', 'xltm', 'numbers', 'et', 'ett' ];
                var word = [ 'doc', 'docx', 'txt', 'dot', 'dotx', 'dotm', 'pages', 'wps', 'wpt' ];
                var pdf = [ 'pdf' ];
                var ppt = [ 'ppt', 'pptx' ];
                var zip = [ 'rar', 'zip' ];
                var link = [ 'html', 'htm' ];
                ext = ext.toLowerCase();
                if (image.indexOf(ext) != -1) {
                    return 'mCommon_basicFileName_img80x90.png';
                }
                if (audio.indexOf(ext) != -1) {
                    return 'mCommon_basicFileName_music80x90.png';
                }
                if (video.indexOf(ext) != -1) {
                    return 'mCommon_basicFileName_video80x90.png';
                }
                if (excel.indexOf(ext) != -1) {
                    return 'mCommon_basicFileName_excel80x90.png';
                }
                if (word.indexOf(ext) != -1) {
                    return 'mCommon_basicFileName_text80x90.png';
                }
                if (pdf.indexOf(ext) != -1) {
                    return 'mCommon_basicFileName_pdf80x90.png';
                }
                if (ppt.indexOf(ext) != -1) {
                    return 'mCommon_basicFileName_ppt80x90.png';
                }
                if (zip.indexOf(ext) != -1) {
                    return 'mCommon_basicFileName_zip80x90.png';
                }
                if (link.indexOf(ext) != -1) {
                    return 'mCommon_basicFileName_link80x90.png';
                }
                return 'mCommon_basicFileName_unknown80x90.png';
            },
            getCoverImg : function(richText) {
                var richTextTemplateID = richText.richTextTemplateID;
                var shareText = richText.content || "";
                // 封面
                var coverPicID = richText.coverPicID;
                if (!coverPicID) {
                    coverPicID = this.getFristPic(shareText);
                }

                var imgUrl = "";
                if (!coverPicID) {
                    var suffix = "";
                    if (richTextTemplateID == "5" || richTextTemplateID == "6") {
                        suffix = "png";
                    } else {
                        suffix = "jpg";
                    }
                    imgUrl = _imgPortalPath + "/mCommon_frameNoticeInfo_page_skin00" + richTextTemplateID
                        + "ListDefault." + suffix + "?v=" + _imgVersion;
                } else {
                    imgUrl = _ctxPath + '/file/loadPic.img?' + new Date() + '&show=middle&id=' + coverPicID;
                }
                return imgUrl;
            },
            // 获取内容中的第一张图片
            getFristPic : function(shareText) {
                var start = "#picidstart#";
                var end = "#picidend#";
                var picID = null;
                if (shareText.indexOf(start) != -1) {
                    try {
                        picID = shareText.substring(shareText.indexOf(start) + 12, shareText.indexOf(end));
                    } catch (e) {
                        // TODO: handle exception
                    }
                }
                return picID;
            },
            getLongTextObj : function(weiboContentJson) {
                var weiboContent = eval('(' + weiboContentJson + ')');
                if (!weiboContent.others && weiboContent.others.length > 0) {
                    return;
                }
                var others = weiboContent.others;
                var blog = {};
                for ( var i = 0; i < others.length; i++) {
                    var other = others[i];
                    var key = "";
                    if (other.key == "阅读全文") {
                        key = "blogID";
                    } else if (other.key == "title") {
                        key = "title";
                    } else if (other.key == "summary") {
                        key = "summary";
                    } else if (other.key == "tagNames") {
                        key = "tagNames";
                    } else if (other.key == "type"){
                        key = "type"
                    }
                    if (key) {
                        blog[key] = other.value;
                    }
                }
                return blog;
            },
            getFormContent : function(content){
                if(!content){
                    return "";
                }
                var strarry = content.split("<br>");
                var newContent = "";
                if(strarry != null && strarry.length > 0){
                    for(var i=0; i < strarry.length; i++){
                        newContent = newContent + strarry[i] + "<br>";
                        if(i == 7){
                            break;
                        }
                    }
                }
                return newContent || content;
            },
            processFeedContent : function(weiboContentJson, isCut, isTop) {
                weiboContentJson = weiboContentJson.replace(new RegExp("\\n", "gm"), "<br>");
                var weiboContent = eval('(' + weiboContentJson + ')');
                if (isCut) {
                    var content = weiboContent.content;
                    var tp = $("<div></div>").html(content).text();

                    var length = tp.getStrLength();
                    content = content.replace(new RegExp("\\n", "gm"), "<br>");
                    if (length > 150) {
                        content = content.subCHString(0, 150) + "...";
                    }
                    weiboContent.content = content;
                }
                weiboContent.content = weiboContent.content.replace(new RegExp("\\n", "gm"), "<br>");
                if (weiboContent.content.indexOf("\\{(at|link|topic)*(\\d)*\\}")) {
                    this.processAtPerson(weiboContent,isTop);
                    this.processLink(weiboContent,isTop);
                    this.processTopic(weiboContent,isTop);
                }
                weiboContent.content = this.processExpression(weiboContent.content,isTop);
                return weiboContent.content;
            },
            processLink : function(weiboContent,isTop){
                if (weiboContent.link && weiboContent.link.length > 0) {
                    for ( var i = 0; i < weiboContent.link.length; i++) {
                        var linkContent = weiboContent.link[i];
                        if(isTop){
                            weiboContent.content = weiboContent.content
                                .portalReplaceAll("{link" + i + "}", linkContent.key);
                        }else{
                            var url = "<span class='mCommon_basicTextAndNamePageAddr_pageLinkAddress'><img class='mCommon_basicTextAndNamePageAddr_pageLinkAddressImg' style='-webkit-tap-highlight-color: rgba(0, 0, 0, 0);' src='"
                                + _imgPortalPath
                                + "/mCommon_basicIcon_linkAddress.png' /><i class='mCommon_basicTextAndNamePageAddr_pageLinkAddressText' webUrl='"+linkContent.value+"'>网页链接</i></span>";
                            weiboContent.content = weiboContent.content
                                .portalReplaceAll("{link" + i + "}", url);
                        }
                    }
                }
            },
            processAtPerson : function (weiboContent,isTop) {
                if (weiboContent.at && weiboContent.at.length > 0) {
                    for ( var i = 0; i < weiboContent.at.length; i++) {
                        var atContent = weiboContent.at[i];
                        weiboContent.content = weiboContent.content.portalReplaceAll("{at" + i + "}", "<i personID='"+ atContent.value +"' personName='"+atContent.key+"'>"
                            + atContent.key + "</i>");
                    }
                }
            },
            processTopic : function(weiboContent){
                if (weiboContent.topic && weiboContent.topic.length > 0) {
                    for ( var i = 0; i < weiboContent.topic.length; i++) {
                        var topicContent = weiboContent.topic[i];
                        weiboContent.content = weiboContent.content.portalReplaceAll("{topic" + i + "}",
                            "<i topicID='"+topicContent.value+"' topicName='" + topicContent.key + "'>" + topicContent.key + "</i>");
                    }
                }
            },
            // 定义表情查找替换方法
            processExpression : function(content,isTop) {
                if (content && !isTop) {
                    var expressionHtml = '<img title="{0}" src="{1}"/>';
                    var reg = /\[[\w*\u4e00-\u9fa5]{1,}\]/igm;
                    var r = "";
                    while (r = reg.exec(content)) {
                        expressionHtml = '<img title="{0}" src="{1}"/>';
                        var expression = this.findExpressionImageByMark(r);
                        if (expression) {
                            expressionHtml = expressionHtml.replace("{0}", expression.title);
                            expressionHtml = expressionHtml.replace("{1}", _expressionPath + expression.image);
                            content = content.replace(r, expressionHtml);
                        }
                    }
                }
                return content;

            },
            findExpressionImageByMark : function(mark) {
                var expression = null;
                for ( var i = 0; i < EXPRESSION.length; i++) {
                    if (mark == EXPRESSION[i].mark) {
                        expression = EXPRESSION[i];
                        break;
                    }
                }
                return expression;
            },
            windowOpen : function(url) {
                var a = $("<a href='" + url + "' target='_blank'>Apple</a>").get(0);
                var e = document.createEvent('MouseEvents');
                e.initEvent('click', true, true);
                a.dispatchEvent(e);
            }
        });