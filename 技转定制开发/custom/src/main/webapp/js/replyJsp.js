(function(){
    var portalComment;
    var isReplying = false;
    var imageArray = new Array();
    var weixinReady = false;
    function init() {
        portalComment = new PortalHtml5Data();
    }

    function initEvent() {
        $("*[faceStr]").unbind("tap").bind("tap", function(){
            var faceStr = $(this).attr("faceStr");
            var obj = $("#replyContentTA")[0];
            var pos = getPosition(obj);
            obj.value = obj.value.substr(0,pos)+faceStr+obj.value.substr(pos,obj.value.length);
            setSelect(obj, pos + faceStr.length);
        });

        $("#contentDeleteP").unbind("tap").bind("tap", function(){
            var obj = $("#replyContentTA")[0];
            var pos = getPosition(obj);
            obj.value = obj.value.substr(0, pos -1) + obj.value.substr(pos, obj.value.length);
            setSelect(obj, pos -1);
        });
        $("#otherPictureInput").fileupload({
            url : _ctxPath + "/file/myUploadFile.json?enctype=multipart",
            dataType : 'json',
            limitMultiFileUploadSize : 5242880,
            add : function(e, data) {
                mCommon_basicLoadingShow("", true);//屏幕居中对齐不用写参数，容器居中对齐写参数
                var jqXHR = data.submit().success(function(result, textStatus, jqXHR) {
                    mCommon_basicLoadingRemove();//删除loading层
                    var $pictureBox = $("#pictureBox");
                    $pictureBox.show();
                    var $pictureItem = $("#_template").find("#pictureItem").clone();
                    $pictureItem.find("#pictureThumb").attr("src", result.files[0].thumbnailUrl);
                    $pictureItem.attr("fileID", result.files[0].fileID);
                    $pictureItem.data("pictureObject", result.files[0]);
                    //图片剪裁
                    mCommon_jsImgCut0114($pictureItem.find(".mCommon_controlThumbnail_item_img"),true);
                    $pictureItem.find(".mCommon_controlThumbnail_item_img").attr("pictureIndex", imageArray.length);
                    var tempArray = new Array();
                    tempArray.push(result.files[0].thumbnailUrl);
                    tempArray.push(result.files[0].url + "&show=big");
                    imageArray.push(tempArray);
                    //点击小图看大图
                    $pictureItem.find(".mCommon_controlThumbnail_item_img").tap(function(){
                        mCommon_jsImageView(imageArray, $(this).attr("pictureIndex"));//图片放大和缩放实现
                    });
                    // 注册删除事件
                    $pictureItem.find("#deletePictureIcon").tap(function(){
                        imageArray.removeAt($pictureBox.find("*[fileID="+result.files[0].fileID+"]").find(".mCommon_controlThumbnail_item_img").attr("pictureIndex"));
                        $pictureBox.find("*[fileID="+result.files[0].fileID+"]").remove();
                        $('#otherPictureInput').show();
                        $('#otherPictureP').unbind();
                    });
                    $pictureBox.append($pictureItem);
                    if ($pictureBox.children().length >= 9) {
                        $('#otherPictureInput').hide();
                        $('#otherPictureP').unbind().bind('tap', function(){
                            alert("最多只能上传9张");
                        });
                    }
                    $pictureBox.parent().scrollLeft(10000000);
                }).error(function(jqXHR, textStatus, errorThrown) {
                    mCommon_basicLoadingRemove();//删除loading层
                    alert("图片上传失败,请稍候再试");
                });
            }
        });

        portalComment.renderPushComment = function(state){
            var sendCommentSpanButton = $("#sendCommentSpan");
            if (state) {
                var mark = $("#_reply_hidden").val();
                if("isLogined" == mark){
                    $("#_topFrame").show();
                    $("#_reply_content_div").hide();
                    var commentsNum = $("#_replyTabBtn").attr("commentsNum") ? $("#_replyTabBtn").attr("commentsNum") : 0;
                    var readPersonLength = $("#_readTabBtn").attr("readPersonLength") ? $("#_readTabBtn").attr("readPersonLength") : 0;
                    var praisePersonLenth = $("#_praiseTabBtn").attr("praisePersonLenth") ? $("#_praiseTabBtn").attr("praisePersonLenth") : 0;
                    var browseNum = $("#_readTabBtn").attr("browseNum") ? $("#_readTabBtn").attr("browseNum") : 0;
                    $("#mCommon_basicTab0114").empty();
                    portalComment.constractOptionTab((Number(commentsNum) + 1),readPersonLength,praisePersonLenth, browseNum, $("#visitShowType").val());
                    $("#replyContentTA").val("");
                    sendCommentSpanButton.disabled = false;
                    sendCommentSpanButton.removeClass("mCommon_basicBtn32_disabledBorder").addClass("mCommon_basicBtn32_blue");
                    isReplying = false;
                    imageArray = new Array();
                    $("#pictureBox").empty();
                    if (typeof(mCommon_basicPlusJump_setRoundBallObj) != "undefined" && mCommon_basicPlusJump_setRoundBallObj.defaultShow) {
                        mCommon_basicPlusJump_setRoundBallObj.showFun();
                    }
                    window.location.href = _ctxPath + "/r/mp/feedInfo/" + $("#companyID").val() + "/"+$("#feedID").val() + "/";
                }else if("isPersonSpace" == mark){
                    window.location.href = window.location.href;
                }else{
                    window.location.href = _ctxPath + "/r/mp/feedInfo/" + $("#companyID").val() + "/"+$("#feedID").val() + "/";
                }
            } else {
                $(this).disabled = false;
                $(this).removeClass("mCommon_basicBtn32_disabledBorder").addClass("mCommon_basicBtn32_blue");
                alert("发送评论失败,请稍候再试");
                isReplying = false;
            }
            mCommon_basicLoadingRemove();
        };
        $("#sendCommentSpan").unbind("tap").bind("tap", function(e){
            if (isReplying) {
                return;
            }
            isReplying = true;
            var sendCommentSpanButton = $(this);
            var message = $("#replyContentTA").val();
            var children = $("#pictureBox").children();
            if ((!message || message == '') && (children == "undefined" || children.length == 0)) {
                alert("评论内容不能为空");
                isReplying = false;
                return false;
            }
            var picIDs = "";
            var picNames = "";
            for (var i = 0; i < children.length; i++) {
                var pictureObject = $(children[i]).data("pictureObject");
                if (i != 0) {
                    picIDs += ",";
                    picNames += ",";
                }
                picIDs += pictureObject.fileID;
                picNames += pictureObject.name;
            }
            $(this).removeClass("mCommon_basicBtn32_blue").addClass("mCommon_basicBtn32_disabledBorder");
            $(this).disabled = true;

            var objId = $("#feedID").val(); // 评论对象
            var dataObj = {};
            dataObj.objId = objId;
            dataObj.toCommentID = $("#commentID").val();
            dataObj["message"] = message;
            dataObj["picID"] = picIDs;
            dataObj["picName"] = picNames;
            dataObj.companyID = $("#companyID").val();
            mCommon_basicLoadingShow("", true);
            portalComment.pushComment({
                data : dataObj
            });
            e.stopPropagation();
        });



    }

    function setSelect(ctrl, pos) {
        if(ctrl.setSelectionRange) {//非IE
            //ctrl.focus();
            ctrl.setSelectionRange(pos,pos);
            ctrl.blur();
        } else if (ctrl.createTextRange) {
            var range = ctrl.createTextRange();
            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
    }

    function getPosition(obj){
        var result = 0;
        if(obj.selectionStart || 0 == obj.selectionStart ){ //IE以外
            result = obj.selectionStart
        }else{ //IE
            var rng;
            if(obj.tagName == "textarea"){ //TEXTAREA
                rng = event.srcElement.createTextRange();
                rng.moveToPoint(event.x,event.y);
            }else{ //Text
                rng = document.selection.createRange();
            }
            rng.moveStart("character",-event.srcElement.value.length);
            result = rng.text.length;
        }
        return result;
    }

    function initWeixin() {
        $.get(_ctxPath + "/mobilemainpageforthirdparty/getWeixinJSApiTicket.json?companyID="
            + $("#companyID").val() + "&url=" + window.location.href, function(data, status){
            var jsApiConfigParamsJson = data;
            var noncestr = jsApiConfigParamsJson.noncestr;
            var signature = jsApiConfigParamsJson.signature;
            var timestamp = jsApiConfigParamsJson.timestamp;
            var appid = jsApiConfigParamsJson.appid;
            wx.config({
                debug: false,
                appId: appid,
                timestamp: timestamp,
                nonceStr: noncestr,
                signature: signature,
                jsApiList: [
                    'checkJsApi',
                    'chooseImage'
                ]
            });
            wx.ready(function(){
                weixinReady = true;
            });
        });
    }

    $(document).ready(function(){
        init();
        initEvent();
        var mark = $("#_reply_hidden").val();
        if("isLogined" != mark && "isPersonSpace" != mark){
            $("#_reply_content_div").show();
        }
    });
})();