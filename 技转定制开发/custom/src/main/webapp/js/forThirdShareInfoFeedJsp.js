/**
 * Created by Tim on 1/29/16.
 */
(function () {
    var esnMobile = new ESNMOBILE();
    var FEED_INFO_TYPE_FEED = "1"; // 短文本信息流
    var FEED_INFO_TYPE_BLOG_FEED = "5"; //博客信息流
    var FEED_INFO_TYPE_FORM_FEED = "11"; //表单信息流
    var $Template = $("#_templateDiv");
    var portalHtml5Data = new PortalHtml5Data();
    var portalHtml5Feed = new PortalHtml5Feed();
    var feedDetailUrl = _ctxPath + "/r/mp/feedInfo/{0}/{1}";
    var companyID = $("#companyID").val();
    //信息流内容模板
    var feedContentTemplate = $("<div class='marginTop10 mCommon_basicTextAndNamePageAddr_contentBox" +
        " mCommon_basicTextAndNamePageAddr_contentBoxReplyShow'>" +
        "<span class='mCommon_basicTextAndNamePageAddr_contentBoxReplyContent wordBreak'" +
        " id='_shareInfo_content'></span></div>");
    //表单模板
    var formContentTemplate = $Template.find("#_formApp");

    /**
     * 初始化页面
     */
    function initShareInfoFeedPage() {
        //js处理渲染jsp页面
        var personFeed = $("#_person_feed").html();
        personFeed = eval("(" + personFeed + ")");
        if (personFeed == null) {
            return;
        }
        personFeedID = personFeed.feedID;
        var infoType = personFeed.infoType;
        //处理头部信息
        constractHeaderInfo(personFeed);
        if (infoType != FEED_INFO_TYPE_BLOG_FEED && !personFeed.feedIDFwd) {
            constractFeedAttachments(personFeed);
        }
        mShortText_details_setPicHeight($("#_shareInfo_pic_span").find(".mShortText_list_conprehensiveBox"));
        mShortText_details_setPicHeight($("#_bottom_display_span").find(".mCommon_basicPicLayoutThreeCol_container"));
        // mCommon_jsImgCut0114($("#_shareInfo_pic_span").find(".mCommon_basicPicLayoutThreeCol_containerOptionBox"), true);//参数脱贫容器obj对象，是否放大充满容器
        constractBottomReplyReadAndPraise(personFeed);
    }

    /**
     * 构造底部回复 已阅 点赞
     * @param personFeed
     */
    function constractBottomReplyReadAndPraise(personFeed) {
        var commentsNum = personFeed.commentsNum || 0;
        var readPersonList = personFeed.readList;
        var praisePersonList = personFeed.praiseList;
        var readPersonLength = readPersonList ? readPersonList.length : 0;
        var praisePersonLenth = praisePersonList ? praisePersonList.length : 0;
        var browseNum = personFeed.browseNum || 0;
        portalHtml5Data.readPersonList = readPersonList;
        portalHtml5Data.constractOptionTab(commentsNum, readPersonLength, praisePersonLenth, browseNum, $("#visitShowType").val());
        /*字符串截取*/
        $(".mCommon_basicShortTextHead_appointGroupText").html($(".mCommon_basicShortTextHead_appointGroupText").html().subCHStr(0, 16));
        //初始化点赞事件
        portalHtml5Data.initReplyAndPraiseEvent(praisePersonList);
    }

    /**
     * 构造信息流 附件 地理位置等
     * @param personFeed
     */
    function constractFeedAttachments(personFeed) {
        //复制地理位置模板
        var locationTemplate = $Template.find("#_lbs");
        portalHtml5Feed.constructLbs($("#_shareInfo_loaction_span"), locationTemplate, personFeed);
        //构造语音
        var $voicTemplate = $Template.find("#_musicAndVoice");
        portalHtml5Feed.constructMusicAndVoice($("#_shareInfo_voice_span"), $voicTemplate, personFeed);
        //附件处理内容
        var $attachment = $Template.find("#_attachment");
        portalHtml5Feed.constructAttachment($("#_shareInfo_attachment_span"), $attachment, personFeed);
        //处理表单
        var $formTemplate = $Template.find("#_serviceApp");
        portalHtml5Feed.constructServiceApp($("#_shareInfo_form_span"), $formTemplate, personFeed);
        //图片处理
        var $imageList = $Template.find("#_imageList");
        portalHtml5Feed.constructImage($("#_shareInfo_pic_span"), $imageList, personFeed);
    }

    /**
     * 处理头部信息
     */
    function constractHeaderInfo(personFeed) {
        var currentPersonID = $("#currentPersonID").val();
        //处理头像信息
        var publishPersonID = personFeed.publishPersonID;
        var personPicUrl = _ctxPath + '/file/loadPic.img?personID=' + publishPersonID + "&t=" + new Date();
        $("#_basic_feed_content").find("#_header_pic").find("img").attr("src", personPicUrl);
        //名称信息
        var publishPersonName = personFeed.publishPersonName;
        $("#_basic_feed_content").find("#_basic_publisher_name").html(publishPersonName);
        //发布时间信息
        var publishTime = personFeed.timeDistance;
        $("#_basic_feed_content").find("#_basic_publish_time").html(publishTime);
        //发布范围
        var publishRangeType = personFeed.publishRangeType;
        initPublishRange(publishRangeType, personFeed);
        //短文本内容
        var content = personFeed.weiboContent;
        if (personFeed.infoType != FEED_INFO_TYPE_BLOG_FEED) {
            content = esnMobile.processFeedContent(content);
        }
        constractFeedContentByInfoType($("#_show_content_by_type_span"),personFeed, content);
        if (personFeed.infoType == FEED_INFO_TYPE_BLOG_FEED) {
            //长文本下的博客标题字符截取2行
            mCommon_controlListInfoFlow_interceptStr($(".mCommon_controlListInfoFlow_blogTitleName"), 16, 2);
            //长文本下的博客内容字符截取4行
            mCommon_controlListInfoFlow_interceptStr($(".mCommon_controlListInfoFlow_blogContentText"), 15, 4);
        }
        //处理长文本图片
        mCommon_jsImgCut0114($(".mCommon_controlListInfoFlow_blogContentPic"),true);
        //判断当前人是否作者本人
        if (publishPersonID == currentPersonID) {
            $("#_basic_feed_content").find("#_shareInfo_reportBtn").hide();
            $("#_basic_feed_content").find("#_shareInfo_deleteBtn").show();
            //注册删除事件
            var $deleteBtn = $("#_basic_feed_content").find("#_shareInfo_deleteBtn").find("a");
            portalHtml5Data.initDeleteFeedEvent($deleteBtn, personFeed);
        } else {
            $("#_basic_feed_content").find("#_shareInfo_reportBtn").show();
            $("#_basic_feed_content").find("#_shareInfo_deleteBtn").hide();
            //注册举报事件
            var $aBtn = $("#_basic_feed_content").find("#_shareInfo_reportBtn").find("a");
            $aBtn.attr("feedID", personFeed.feedID);
            portalHtml5Data.initReportFeedEvent($aBtn);
        }
    }

    /**
     * 构造信息流显示的部分
     * @param personFeed
     * @param content
     * @returns {string}
     */
    function constractFeedContentByInfoType($container,personFeed, content) {
        var htmlTemplate = "";
        var infoType = personFeed.infoType;
        if(personFeed.feedIDFwd){
            constractFwdPersonFeed($container,personFeed,content);
        }else{
            if (FEED_INFO_TYPE_FEED == infoType) { //普通信息流
                htmlTemplate = feedContentTemplate.clone();
                htmlTemplate.find("#_shareInfo_content").html(content);
                htmlTemplate.find("*[webUrl]").each(function (index) {
                    $(this).bind("tap", function (e) {
                        var url = $(this).attr("webUrl");
                        esnMobile.windowOpen(url);
                        e.stopPropagation();
                    });
                });
            } else if (FEED_INFO_TYPE_BLOG_FEED == infoType) { //博客
                htmlTemplate = constractBlogEvent(personFeed);
            } else if (FEED_INFO_TYPE_FORM_FEED == infoType) { //轻表单
                htmlTemplate = constractFormFeedEvent(personFeed, content);
            }
            $container.append(htmlTemplate);
        }

    }

    /**
     * 构造转发块
     * @param $container
     * @param personFeed
     * @param content
     */
    function constractFwdPersonFeed($container,personFeed, content) {
        //构造转发文字
        var fwdContent = feedContentTemplate.clone();
        fwdContent.find("#_shareInfo_content").html(content);
        $container.append(fwdContent);
        var $attachment = $Template.find("#_attachment");
        var $imageList = $Template.find("#_imageList");
        var $lbs = $Template.find("#_lbs");
        var $normalText = $Template.find("#_shortTextNormalText");
        var $musicAndVoice = $Template.find("#_musicAndVoice");
        var $serviceApp = $Template.find("#_serviceApp");
        portalHtml5Feed.constructLbs($container, $lbs, personFeed);
        //构造转发块
        var $feedFwdSub = $Template.find("#_feedFwd").clone();
        var $feedFwdFrame = $feedFwdSub.find("#feedFwdFrame");
        var feedFwd = portalHtml5Feed.changeFeedToFeedFwd(personFeed);
        if(personFeed.publishPersonNameFwd){
            $feedFwdSub.find("#feedFwdPersonName").html(personFeed.publishPersonNameFwd + ":");
        }else{
            $feedFwdSub.find("#feedFwdPersonName").remove();
        }
        // 长文本
        if(feedFwd.infoType == "5"){
            // 构造Blog
            var blogHtmlTemplate = constractBlogEvent(feedFwd);
            $feedFwdSub.append(blogHtmlTemplate);
        }else if(feedFwd.infoType == "11" ){
            var weiboContentJson = feedFwd.weiboContent;
            var content = esnMobile.processFeedContent(weiboContentJson);
            content = content.replace("内容摘要<br>","");
            content = esnMobile.getFormContent(content);
            var formTemplate = constractFormFeedEvent(feedFwd,content);
            $feedFwdSub.append(formTemplate);
            portalHtml5Feed.constructAttachment($feedFwdSub, $attachment, feedFwd);
            portalHtml5Feed.constructImage($feedFwdSub, $imageList, feedFwd);
        }else{
            portalHtml5Feed.constructNormalText($feedFwdFrame, $normalText, feedFwd);
            portalHtml5Feed.constructLbs($feedFwdFrame, $lbs, feedFwd);
            portalHtml5Feed.constructMusicAndVoice($feedFwdFrame, $musicAndVoice, feedFwd);
            portalHtml5Feed.constructAttachment($feedFwdFrame, $attachment, feedFwd);
            portalHtml5Feed.constructServiceApp($feedFwdFrame, $serviceApp, feedFwd);
            portalHtml5Feed.constructImage($feedFwdFrame, $imageList, feedFwd);
            //注册短文本类点击事件
            $feedFwdFrame.bind("tap",function (e) {
                var url = feedDetailUrl.replace("{0}",companyID);
                url = url.replace("{1}", feedFwd.feedID);
                window.location.href = url;
                e.stopPropagation();
            });
        }
        $feedFwdSub.show();
        $container.append($feedFwdSub);
    }

    /**
     * 构造轻表单信息流
     * @param personFeed
     * @param htmlTemplate
     * @param content
     */
    function constractFormFeedEvent(personFeed, content) {
        var htmlTemplate = formContentTemplate.clone();
        htmlTemplate.find("#_formComponent").removeClass("mCommon_controlListInfoFlow_componentContentIntercept");
        htmlTemplate.find("#_formComponent").html(content);
        /* 标题截取 */
        var setting = {
            pageBox: $(window),// 页面容器jq对象,默认为window
            obj: htmlTemplate.find("#_easyForm").find(".mCommon_basicLink_text_title"),// 插入区域jq对象
            string: "查看填写的内容",// 字符串（带后缀名的文件名）
            fontSize: 17,// 字号
            cutWidht: 92,// 整行去掉的宽度
            rows: 1 // 显示行数
        };
        var str = new mCommon_basicLink_stringCut(setting);
        htmlTemplate.find("#_easyForm").attr("formID", personFeed.formID);
        htmlTemplate.find("#_easyForm").attr("formRecordID", personFeed.formRecordID);
        htmlTemplate.find("#_easyForm").bind("tap", function (e) {
            var formID = $(this).attr("formID");
            var formRecordID = $(this).attr("formRecordID");
            var url = _ctxPath + "/formrecord/getScopeFormRecordByID.action?formID="
                + formID + "&recordID=" + formRecordID;
            //var url = _ctxPath + "/r/f/" + formID;
            esnMobile.windowOpen(url);
            // 阻止块冒泡
            e.stopPropagation();
        });
        htmlTemplate.show();
        return htmlTemplate;
    }

    /**
     * 构造长文本
     * @param htmlTemplate
     * @param content
     * @param blogID
     */
    function constractBlogEvent(personFeed) {
        var blogTemplate = $Template.find("#_longText").clone();
        var blog = esnMobile.getLongTextObj(personFeed.weiboContent);
        if (!blog || !blog.title) {
            return;
        }
        blogTemplate.find("#_longText_title").html(blog.title);
        var feedAttachments = personFeed.feedAttachments;
        if (feedAttachments && feedAttachments.length > 0) {
            var coverImage = feedAttachments[0];
            var bigUrl = _ctxPath + "/file/loadPic.img?id=" + coverImage.fileID + "&show=big" + "&t=" + new Date();
            blogTemplate.find("#_longText_img").attr("src", bigUrl);
            blogTemplate.find("#_longText_img").parent().show();

        }
        //注册点击事件
        blogTemplate.bind("tap", function (e) {
            window.location.href = _ctxPath + '/r/mp/bl/' + blog.blogID;
            e.stopPropagation();
        });
        blogTemplate.find("#_longText_content").html(blog.summary);
        blogTemplate.show();
        return blogTemplate;
    }

    /**
     * 判断初始化信息流发布范围
     * @param publishRangeType
     */
    function initPublishRange(publishRangeType, personFeed) {
        $("#_basic_feed_content").find("._shareInfo_publishRangeType_span").each(function () {
            var rangeType = $(this).attr("publishRangeType");
            if ("2" == rangeType) {
                var toGroupName = personFeed.toGroupName;
                $(this).find(".mCommon_basicShortTextHead_appointGroupText").html(toGroupName || "指定群组");
            }
            if (publishRangeType == rangeType) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }

    $(document).ready(function () {
        var feedID = $("#feedID").val();
        initShareInfoFeedPage();
        portalHtml5Data.initReplyEvent(feedID);
        setTimeout(function () {
            if($("#_bottom_opreation_div").is(":hidden")){
                $("#_bottom_opreation_div").show();
            }
        },200);
        $(window).scrollTop($(window).scrollTop());
    });
})();