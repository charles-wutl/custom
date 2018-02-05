function PortalHtml5Data() {
    this.mCommon_basicTab0114 = null;
    this.currentPageSize = 10;
    this.nextPageNumber = 0;
    this.groupNextPageNumber = 0;
    this.totalSize = 0;
    this.esnMobile = new ESNMOBILE();
    this.pcManage = new PortalPcManage({
        currentCompanyID: $("#companyID").val() || $("#_group_companyID").val(),
        isCanImportCommodity: true
    });
    this.pullUp = null;
    this.portalHtml5Feed = new PortalHtml5Feed();
    this.readPersonList = null;
    this.companyID = $("#_group_companyID").val();
    this.currentCompanyID = $("#companyID").val();
    this.$Template = $("#_templateDiv");
    //回复模板
    this.commentsBox = $("<div class='mShortText_details_replySpecificContentListAll'>" +
        "<div class='mShortText_details_replySpecificContentList borderPx1'" +
        " id='_comments_page_div'></div></div>");
    //阅读列表模板
    this.readListBox = $("<div class='mShortText_details_alreadyReadBoxAll'>" +
        "<div class='mShortText_details_alreadyReadBox' id='_readList_content_div'></div></div>");
    //赞列表模板
    this.praiseListBox = $("<div class='mShortText_details_praiseBoxAll'><div" +
        " class='mShortText_details_praiseBox' id='_praiseList_content_div'>" +
        "</div></div>");
    this.readListTemplate = $("#_template_div_content").find(".mPicTextPush_details_alreadyReadBoxOption").clone();
    this.praiseListTemplate = $("#_template_div_content").find(".mPicTextPush_details_praiseBoxOption").clone();
    this.loadingDiv = $('<p class="mCommon_jsPullToRefresh_loading"><img' +
        ' class="mCommon_jsPullToRefresh_loading_icon" ' +
        'src="' + _imgPortalPath + '/mCommon_basicIcon_loading.png"/>加载中</p>');
    this.successPic = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo4ODRDQTRGREZGQzYxMUU1OEYwMEFBODNDMDlGMUE2NyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo4ODRDQTRGRUZGQzYxMUU1OEYwMEFBODNDMDlGMUE2NyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjg4NENBNEZCRkZDNjExRTU4RjAwQUE4M0MwOUYxQTY3IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjg4NENBNEZDRkZDNjExRTU4RjAwQUE4M0MwOUYxQTY3Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+qYMBIgAABkhJREFUeNrsnG1o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';//提示的图片地址，字符串类型，必填
    this.failPic = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxMkUyRTFGOTAwNjMxMUU2QjFFQ0RCOTU3MDBCQ0QxQSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoxMkUyRTFGQTAwNjMxMUU2QjFFQ0RCOTU3MDBCQ0QxQSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjEyRTJFMUY3MDA2MzExRTZCMUVDREI5NTcwMEJDRDFBIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjEyRTJFMUY4MDA2MzExRTZCMUVDREI5NTcwMEJDRDFBIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+rPbKzAAABydJREFUeNrsXGts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';
    this.warningPic = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxMkUyRTFGRDAwNjMxMUU2QjFFQ0RCOTU3MDBCQ0QxQSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoxMkUyRTFGRTAwNjMxMUU2QjFFQ0RCOTU3MDBCQ0QxQSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjEyRTJFMUZCMDA2MzExRTZCMUVDREI5NTcwMEJDRDFBIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjEyRTJFMUZDMDA2MzExRTZCMUVDREI5NTcwMEJDRDFBIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+WHXY9AAABmZJREFUeNrsnFtsFUUYx7eFEntFYjWKAvGS1kuJNI2J0dZADRThpT5QtIRI1PKg0kjQV3gQE2KM8UJpTLw0MVIjGn1Rgxcklhc1hEqrQtVKvTTKra2toLT0+P/sf8t0Odszp+fsnj278yW/7DRtd2f+O7s78803X04sFrOMzdxyjIBGQCOgEXDmNgssAbeCclAGbgCXgSJQzL8bBiPgFPgR9ICj4BvQCc5HScAF4F5wN7gLXJri+QbBF+Az8A7oD6OAl4C14EFQI9eN8zfjbPwxcIK9bZy/K2GPnAuuBfNBbpxzSE/8FLwB3gX/ZLuA0uBm8Bi4wvE7eSQ7wD5wAHSBvzXPWwgWg2pQy5tS5Pib42AneBEMedZCEdAD5oAt4HRsqg2D10EdmJ3G68m5VvDcw45rnmJd5njRVi/EWwZ6HI04Bh4HJR7dMBW5xibQ66hDD+sWWAELwC4wrlS6H2wEeT4I5ySP1+5X6jPOOhYETcAy0KVUdBQ8A4oyIJyTItZlVKlfN+scCAHl3TPoeFSqAiCckyrHq2WIdc+ogOsdd/Ytn95zqbwf2x1PygOZErBJed/J8YkAC+dks6PuTX4LuAaMsQLn2BOtLGM96x5jWxr8ErAW/MsLy3FVFopns9rRllqvBSxTPhjS9ddlsXg265THeTDZr3MyU7kC8CWo4M9Pgmc9mBx1cK4bz/o5bUu3bVHa8h24DZxJ91SuRfl6tXvYI/pi7tbn4XV3K9dpSfcjXKN086OgOIQCFrNt9uupWuf/cjU66WzQQheUuIsa6eAMmw2zbefZ1l1s+7SmI2AzXUdireBgiD30BymcxTY3p+oPFH/ez2Ae+APcRA+wl9YHFrr87hewyOPrS5uPgCvBAB24QzPtgZsontg2H8QLgolYW1mel6gXTtcD83nHS+lmlwWfUR8akOkeaL/3ZdHqOnCS9TmbbA9soHhiz/kkXlBsDDzPcim1SPoRfkhZu2iL4JJvG9su9nCyAi7kgo3YnpAOW3SGNXtYvtPtteImYL2y9Nge4cADu+05XMvWFnC18kXaH2EB9ytDmFW6AuYpj+8nEft4OG2UGljUJE9HwEp6XmzPSNStQ/FGVeoIuEQpf2X0s7520cZVwAqlfMToZ32vlBfrCHg9j39GZOqWyAaphcWZSUIB7fHOD0a7SbO1WKAjYKnSA41N1eJyHQHtMLHTRrdJs7UoTEbAMaPbFOeCWLGOgOeU6YuxBFrkukyixUqMbpNmazGiI+CIETA1Ae2x31yj26TZOwlO6Aj4O4+LjG4XjY1/1RHwJx6vjvfZjqAVUguxXh0Bu3mUXUS3GP3+12AWy106AnYq5duNflM06NQR8JB1ITKpxug3qcEZajN1gOiyLrwXrLAm3Nky/4uqV1rWh09yRPIxqNPpgWIfKEOZpRHufUuV4dyHujMRsfeB3TXvi7CA9/MoWrwXd443TWiHrAVUc/Q934re2rA4DiQiVpwrB9y+B9NFJrzCo5xgQwR73wbrgmfqVVcvQwCDizIRIx3v46EVXJQohHWrEl670aeo+UyF+Do3Edm2LZUofWeA5Y2Wl5uXJyzT4W3ieZHVyKusNARYyj9uZ1kiNp+KwLtvO8UTezphh9HcDX5Y2RJVFeJHuErZwnZYZ1e9TpC5rAc8yrGQTKp3W3HWBkIybHmTbYyxzQnXhXI1Ty5fxlaW5Wv8cggFlDaVs9xqacYFJbvVS+JEbubPEoC+MyTDGMkq8hLLnm31EsqVzYbyrqgPwWbDeuW9N8g2+rrddWUWi7fS7+2uNg3KXZMLN2aheI2KeNKWtZne8r/ZbPlPPenEayA/wMLls46BSDqhpj0ZUir1LagMoHiVrJua9qQuKIl3ypnMRr2zOwKUeGdHnMQ75ek4vx+pn5rSnGgsmYRkTdmS+sk5zHEmH+tlQrBin3qcW/Kx2nRfz+v0dwNx0t/JS3y5B+nvlvPczvR3A16mv/M6AaO93/YR6+IEjLLGIqk7P+f0rVt7+jQxrazgtG6ZNZFK1OngOM457Qv063lifqYAldU92fV4h+WeAvQ3OlTtFKAxxVNSyBsiDtVrLPcUoHJD2qyQpACNZyKAbNy7hz0oP8XznWUP/gi8bYU0Ca2byd6zSj6OahrkUrrWC5Swir+4wKOmQZbH/lAmIydMIm4joBHQCBhl+0+AAQA0e3ZwqiM+UAAAAABJRU5ErkJggg==';
}
$.extend(true, PortalHtml5Data.prototype, {
    pushComment: function (option) {
        var self = this;
        var options = {
            url: _ctxPath + '/comments/createCommentByMobilePortal.json',
            dataType: 'json',
            type: 'post',
            async: false,
            success: function (data) {
                var bl = data._message;
                if ("false" == bl) {
                    self.renderPushComment(0);
                } else {
                    self.renderPushComment(1);
                }
            },
            error : function(){
                mCommon_basicLoadingRemove();
            }
        };
        $.extend(true, options, option);
        $.ajax(options);
    },
    renderPushComment: function (state) {
    },
    //获取信息回复列表 分页
    findFeedCommentsByFeedID: function (option, funRefresh, box) {
        var self = this;
        var options = {
            url: _ctxPath + '/r/mp/fms',
            dataType: 'JSON',
            type: 'POST',
            success: function (data) {
                var isHasMore = self.constructCommentListForThird(data, box);
                funRefresh(isHasMore);
            }
        };
        $.extend(true, options, option);
        $.ajax(options);
    },
    /**
     * 构造回复列表入口
     * @param dataList
     */
    constructCommentListForThird: function (data, box) {
        var self = this;
        var dataList = data.page.dataList;
        var totalSize = data.page.totalSize;
        if (!data || null == dataList || dataList.length <= 0) {
            if (box.find("div[id='_comment_template_content']").length <= 0) {
                if (self.pullUp) {
                    self.pullUp.clearPullUp();
                }
                //空白提示
                var nullInfoTemplate = $("#_template_div_content").find(".mPicTextPush_details_nullInfo").clone();
                box.prepend(nullInfoTemplate);
                $("#_bottom_display_span").html(box);
                box.siblings().remove();
            }
            return false;
        }
        self.nextPageNumber = data.page.currentPageNumber;
        mCommon_basicLoadingShow("", true);//屏幕居中对齐不用写参数，容器居中对齐写参数
        $("#_replyTabBtn").attr("commentsNum", totalSize || 0);
        $("#_replyTabBtn").html("回复" + totalSize || 0);
        for (var i = 0; i < dataList.length; i++) {
            var comments = dataList[i];
            var commentsTemplate = self.constractCommentsContent(comments);
            box.find("#_comments_page_div").append(commentsTemplate);
        }
        mCommon_jsImgCut0114($("#_bottom_display_span").find(".mCommon_basicPicLayoutThreeCol_containerOptionBox"), true);//参数脱贫容器obj对象，是否放大充满容器
        $("#_bottom_display_span").prepend(box);
        box.siblings().remove();
        mCommon_basicLoadingRemove();//删除loading层
        if (dataList.length < self.currentPageSize) {
            return false;
        }
        return true;
    },
    /**
     * 构造回复信息
     * @param commentsData 回复对象
     */
    constractCommentsContent: function (commentsData) {
        var self = this;
        //复制 回复模板
        var commentsTemplate = $("#_template_div_content").find("#_comment_template_content").clone();
        //填充基本信息
        //头像信息
        var headImgURL = _ctxPath + "/file/loadPic.img?personID=" + commentsData.authorid + "&date=" + _currentTime;
        var $image = commentsTemplate.find(".mCommon_basicShortTextHead_headPic").find("img");
        $image.attr("src", headImgURL);
        if (da.djJsReady) {
            $image.attr("personID", commentsData.authorid);
            $image.attr("personName", commentsData.authorname);
            $image.bind("tap", function (e) {
                da.showPerson({
                    personID: $(this).attr("personID"),
                    personName: $(this).attr("personName")
                });
                e.stopPropagation();
            });
        }
        //名称信息
        var authorname = commentsData.authorname;
        commentsTemplate.find(".mCommon_basicShortTextHead_name").html(authorname);
        //显示 时间
        var timeGaps = commentsData.timeGaps;
        commentsTemplate.find(".mCommon_basicShortTextHead_timeBox").html(timeGaps);
        //回复谁的
        var toauthorName = commentsData.toauthorName;
        commentsTemplate.find("#_comments_to_person").html(toauthorName);
        //回复内容
        var messageContent = commentsData.messageJson;
        if (null != messageContent) {
            messageContent = messageContent.replace(new RegExp("\\n", "gm"), "<br>");
        }
        messageContent = self.esnMobile.processFeedContent(messageContent);
        commentsTemplate.find(".mCommon_basicTextAndNamePageAddr_contentBoxReplyContent").html(messageContent);
        commentsTemplate.find("i[personID]").each(function () {
            $(this).bind("tap", function (e) {
                if (da.djJsReady) {
                    da.showPerson({
                        personID: $(this).attr("personID"),
                        personName: $(this).attr("personName")
                    });
                }
                // 阻止块冒泡
                e.stopPropagation();
            });
        });
        commentsTemplate.find("i[webUrl]").each(function () {
            $(this).bind("tap", function (e) {
                self.processMethod("createWindow", {
                    "url": $(this).attr("webUrl")
                });
                // 阻止块冒泡
                e.stopPropagation();
            });

        });
        commentsTemplate.find("i[topicID]").each(function () {
            $(this).bind("tap", function (e) {
                if (da.djJsReady) {
                    da.showFeedList({
                        type: 1,
                        objID: $(this).attr("topicID"),
                        objName: $(this).attr("topicName")
                    });
                }
                // 阻止块冒泡
                e.stopPropagation();
            });
        });
        self.bindCommentsContenEvent(commentsTemplate, commentsData);
        //构造地理位置
        var lbsMapList = commentsData.lbsMapListJsonString;
        if ("null" != lbsMapList && null != lbsMapList && lbsMapList.length > 0) {
            commentsTemplate = self.constractCommentsLocation(commentsTemplate, lbsMapList);
        }
        //构造录音
        var soundID = commentsData.soundID;
        var soundName = commentsData.soundName;
        if (soundID != null && soundID.length > 0) {
            commentsTemplate = self.constractCommentsVoiceBySound(commentsTemplate, soundID, soundName);
        }
        //文档内容 fileID的字符串
        var fileID = commentsData.fileID;
        var fileName = commentsData.fileName;
        if (fileID != null && fileID != "") {
            var fileIDs = fileID.split(",");
            var fileNames = fileName.split(",");
            for (var i = 0; i < fileIDs.length; i++) {
                var fID = fileIDs[i];
                if (fID) {
                    var fName = fileNames[i];
                    var fileToHtml = self.addFileToHtmlForThird(fID, fName);
                    commentsTemplate.find("#_file_template_content_div").append(fileToHtml);
                }
            }
        } else {
            commentsTemplate.find("#_file_template_content_div").hide();
        }
        //回复中图片信息
        self.constructPicList(commentsData, commentsTemplate);

        if (commentsData.messageHiding) {
            commentsTemplate.find(".mCommon_basicShortTextHead_btnBox").show();
        } else {
            commentsTemplate.find(".mCommon_basicShortTextHead_btnBox").hide();
        }
        return commentsTemplate;
    },

    constructPicList: function (commentsData, commentsTemplate) {
        var self = this;
        var picID = commentsData.picID;
        if (picID != null && picID != "") {
            var domain = commentsData.cdnDomainHTTP;
            var smallPic = commentsData.picSmallCDNAddr;
            var originalPic = commentsData.picOriginalCDNAddr;
            var picName = commentsData.picName;

            var pIDs = picID.split(",");
            var pNames = picName.split(",");
            if (domain !== null && domain !== ""
                && originalPic !== null && originalPic !== "") {
                var smallCDNURLs = smallPic.split(",");
                var bigCDNURLs = originalPic.split(",");
                for (var i = 0; i < pIDs.length; i++) {
                    var pID = pIDs[i];
                    var picName = pNames[i];
                    var smallCDNURL = domain + smallCDNURLs[i];
                    var bigCDNURL = domain + bigCDNURLs[i];
                    var picToHtml = self.addPicToHtmlForThird(pID, picName, smallCDNURL, bigCDNURL);
                    commentsTemplate.find("#_pic_template_content_div").append(picToHtml);
                }
            } else {
                for (var i = 0; i < pIDs.length; i++) {
                    var pID = pIDs[i];
                    var picName = pNames[i];
                    var picToHtml = self.addPicToHtmlForThird(pID, picName);
                    commentsTemplate.find("#_pic_template_content_div").append(picToHtml);
                }
            }
            //注册图片点击事件
            self.portalHtml5Feed.showBigImage(commentsTemplate.find("#_pic_template_content_div"));
        } else {
            commentsTemplate.find("#_pic_template_content_div").parent().hide();
        }
    },

    createWindow: function (requestData) {
        var self = this;
        self.esnMobile.windowOpen(requestData.url);
    },
    /** =====================pc app转换方法===================* */
    // app和PC 转换
    processMethod: function (method, paramObj) {
        var self = this;
        var obj;
        if (da.djJsReady) {
            obj = da;
        } else {
            obj = self;
        }
        obj[method](paramObj);
    },
    //添加回复中 图片
    addPicToHtmlForThird: function (picID, picName, smallCDNURL, bigCDNURL) {
        var self = this;
        //防空判断
        if (!picID) {
            return;
        }

        var smallUrl;
        var bigUrl;
        if (smallCDNURL && bigCDNURL) {
            smallUrl = smallCDNURL;
            bigUrl = bigCDNURL;
        } else {
            smallUrl = _ctxPath + "/file/loadPic.img?id=" + picID + "&show=small";
            bigUrl = _ctxPath + "/file/loadPic.img?id=" + picID + "&show=big";
        }
        var picTemplate = $("#_template_div_content").find("#_comments_pic_template").clone();
        picTemplate.find("img").attr("src", smallUrl);
        picTemplate.find("img").attr("bigUrl", bigUrl);
        picTemplate.find("img").attr("alt", picName);
        picTemplate.find("img").attr("picID", picID);
        return picTemplate;
    },
    //构造回复中 地理位置
    constractCommentsLocation: function (commentsTemplate, lbsMapList) {
        var self = this;
        if (typeof lbsMapList == "string") {
            lbsMapList = eval('(' + lbsMapList + ')');
        }
        for (var i = 0; i < lbsMapList.length; i++) {
            var locationTemplate = self.$Template.find("#_lbs").clone();
            var lbs = lbsMapList[i];
            locationTemplate.find("#_lbsName").html(lbs.name);
            locationTemplate.find("#_lbsName").attr("lbsLocation", lbs.location);
            locationTemplate.find("#_lbsName").attr("locationName", lbs.address);
            locationTemplate.find("#_lbsName").bind("tap", function (e) {
                var lbsMap = $(this).data("lbsMap");
                var locationName = $(this).attr("locationName");
                var lbsLocation = $(this).attr("lbsLocation");
                var lon = lbsLocation.split(",")[1];
                var lat = lbsLocation.split(",")[0];
                self.processMethod("showLocation", {
                    name: locationName,
                    lon: lon,
                    lat: lat
                });
                // 阻止块冒泡
                e.stopPropagation();
            });
            locationTemplate.show();
            commentsTemplate.find("#_comments_location_span").append(locationTemplate);
        }
        return commentsTemplate;
    },
    showLocation: function (lbsMap) {
        var lbslon = lbsMap.lon;
        var lbslat = lbsMap.lat;
        var lbsLocation = lbslat + "," + lbslon;
        var url = "";
        if (null != lbsLocation && "" != lbsLocation) {
            url = "http://mo.amap.com/?q=" + lbsLocation + "&name=" + lbsMap.name + "&dev=0";
        } else {
            url = "http://mo.amap.com/?q=31.234527,121.287689&name=park&dev=0";
        }
        window.location.href = url;
    },
    /**
     * 构造回复中录音
     * @param soundID
     * @param soundName
     */
    constractCommentsVoiceBySound: function (commentsTemplate, soundID) {

        var self = this;
        var sIDs = soundID.split(",");
        for (var i = 0; i < sIDs.length; i++) {
            var sID = sIDs[i];
            //注册图片点击事件
            var $musicAndVoiceSub = self.$Template.find("#_musicAndVoice").clone();
            $musicAndVoiceSub.find("#_musicAudio").attr("fileID", sID);
            var $audio = $musicAndVoiceSub.find("#_musicAudio")[0];
            $audio.addEventListener("ended", function (msg) {
                $musicAndVoiceSub.removeClass("mCommon_basicVoice_voiceSuspend");
                $musicAndVoiceSub.addClass("mCommon_basicVoice_voicePlay");
            }, false);
            $musicAndVoiceSub.find("#_musicSpan").bind("tap", function (e) {
                var fileID = $(this).find("#_musicAudio").attr("fileID");
                var url = _ctxPath + "/file/downloadMp3File.file?id=" + fileID;
                var $audio = $("*[fileID=" + fileID + "]");
                $audio.attr("src", url);
                var $parentObj = $audio.parent().parent();
                var isPlay = $parentObj.hasClass("mCommon_basicVoice_voicePlay");
                if (isPlay) {
                    $parentObj.removeClass("mCommon_basicVoice_voicePlay");
                    $parentObj.addClass("mCommon_basicVoice_voiceSuspend ");
                    $audio[0].play(0);
                } else {
                    $parentObj.removeClass("mCommon_basicVoice_voiceSuspend");
                    $parentObj.addClass("mCommon_basicVoice_voicePlay");
                    $audio[0].pause();
                }
                // 阻止块冒泡
                e.stopPropagation();
            });
        }
        $musicAndVoiceSub.show();
        commentsTemplate.find("#_comments_voic_span").append($musicAndVoiceSub);
        return commentsTemplate;
    },
    getFile: function (data) {
        var type = data.type;
        var url = "";
        if (2 == type) {
            url = _ctxPath + "/file/downloadMp3File.file?id=" + data.fileID;
        }
        var res = {
            fileID: data.fileID,
            url: url
        };
        data.success && data.success.call(this, res);
    },
    /**
     * 构造文档内容
     * @param fileID
     * @param fileName
     * @param downloadLock
     * @param feed
     * @param isForward
     * @returns {*|jQuery|HTMLElement}
     */
    addFileToHtmlForThird: function (fileID, fileName) {
        var self = this;
        //复制文档文件显示模板
        var fileTemplate = $("#_template_div_content").find(".mCommon_basicFileName").clone();
        if (fileName == null || fileName == "") {
            fileName = "未命名.file";
        }
        var downloadText = new mCommon_basicFileName_stringCut({
            pageBox: $(window),//页面容器jq对象,默认为window
            obj: fileTemplate.find(".mCommon_basicFileName_textTitle"),//插入区域jq对象
            string: fileName || "",//字符串
            fontSize: 16,//字号
            cutWidht: 176,//整行去掉的宽度
            rows: 2,//显示行数
            maxWindowWidth: 640,//窗口最大宽度
            fileNameEndNum: 8//尾部截取的英文字符
        });
        var url = _ctxPath + "/modulev1/portalHtml5/images/" + self.esnMobile.getFileIcon(fileName);
        fileTemplate.find("img").attr("src", url);
        fileTemplate.data("attachment", {
            fileID: fileID,
            fileName: fileName
        });
        fileTemplate.bind("tap", function (e) {
            var attachment = $(this).data("attachment");
            self.processMethod("showFile", attachment);
            // 阻止块冒泡
            e.stopPropagation();
        });
        return fileTemplate;
    },
    showFile: function (attachment) {
        var self = this;
        if ((/micromessenger/.test(navigator.userAgent.toLowerCase())) ? true : false) {
            var popup = new mCommon_controlPagePopupPrompt_setPromptInfo({
                promptImg: self.warningPic,
                promptText: "无法打开此文件。请点击右上角，选择在浏览器中打开",
                setTimeVal: 2000,
                closeFun: function () {
                    //do nothing
                }
            });
        } else {
            window.location.href = _ctxPath + "/file/mobileDownloadFile.file?id=" + attachment.fileID;
        }
    },
    /**
     * 通用事件
     * 根据点击dom的index 判断
     * 初始化那种类型的下拉刷新
     * Tim
     * 2015-01-28
     */
    initPullUpEvent: function (index, commentsBox) {
        var self = this;
        self.nextPageNumber = 0;
        if (self.pullUp) {
            self.pullUp.clearPullUp();
        }
        var setting = { //实例化上拉类
            loadingDiv: self.loadingDiv,
            listOuterBox: commentsBox.find("#_comments_page_div"),//jquery对象,列表外容器容器，找底边位置用
            loadData: function () {//加载数据回调
                self.dataLoad(this.refresh, commentsBox, index);//数据请求模拟 参数：删除圆球方法，append的容器
            }
        };
        self.pullUp = new mCommon_jsPullToRefresh(setting);
    },
    /**
     * 请求数据
     * @param funRefresh
     * @param box
     * @param index
     */
    dataLoad: function (funRefresh, box, index) {//参数：刷新方法，append的容器
        var self = this;
        var feedID = $("#feedID").val();
        var data = {
            objID: feedID,
            companyID: self.currentCompanyID,
            nextPage: self.nextPageNumber + 1
        }
        var option = {
            data: data
        }
        self.findFeedCommentsByFeedID(option, funRefresh, box);
    },
    // 点赞
    updatePraiseByFeed: function (data, obj, callBack) {
        var self = this;
        var options = {
            url: _ctxPath + '/r/mp/upbf',
            dataType: 'json',
            type: 'post',
            data: data,
            success: function (data) {
                callBack && callBack.call(self, obj, data);
            }
        };
        $.ajax(options);
    },
    /**
     * 删除信息流事件
     * @param data
     * @param callBack
     */
    deletePersonFeedByID: function (data, callBack) {
        var self = this;
        var options = {
            url: _ctxPath + "/r/mp/dpf",
            dataType: 'JSON',
            type: 'POST',
            data: data,
            success: function (jsonData) {
                callBack && callBack.call(self, jsonData);
            }
        }
        $.ajax(options);
    },
    /**
     * 删除评论
     */
    deleteCommentByID: function (data, callBack) {
        var self = this;
        var options = {
            url: _ctxPath + '/r/mp/dcb',
            dataType: 'JSON',
            type: 'POST',
            data: data,
            success: function (jsonData) {
                callBack && callBack.call(self, jsonData);
            }
        }
    },
    /**
     * 初始化回复事件
     * @param feedID
     */
    initReplyEvent: function (feedID) {
        var self = this;
        //回复点击事件
        $("#_feed_reply_btn").bind("tap", function (e) {
            var canFeedBack = $(this).attr("canFeedBack");
            if (canFeedBack == "0") {//不允许回复
                var popupReplyInput = new mCommon_framePopup({
                    appendObj: $("body"),//浮出层和黑层显写入的容器
                    contentObj: $("<p class='mCommon_framePopup_defaultText'>该消息不允许回复</p>"),//内容区显示的对象
                    spaceClose: true,//点击空白关闭
                    winScroll: true,//不允许滚动
                    modal: false,
                    showTime: 2000,//非模态弹窗停留时间
                    showCallback: function (a) {
                    },//显示弹窗后的回调 参数this
                    hideCallback: function (a) {
                    }//隐藏弹窗后的回调  参数this
                });
                popupReplyInput.showPopup();
                return;
            }
            var isRead = self.checkCurrentPersonIsRead(_currentUserID);
            if (!isRead) {
                self.insertReadPersonByFeedID(feedID);
            }
            var url = _ctxPath + "/r/mp/gotoReply?feedID=" + feedID;
            self.pcManage.checkPersonStatusInThird(function () {
                $("#commentID").val("");
                $("#_topFrame").hide();
                $("#_reply_content_div").show();
            }, url);
            // 阻止块冒泡
            e.stopPropagation();
        });
    },
    /**
     * 注册本人删除信息流事件
     * 通用
     * @param $deleteBtn
     */
    initDeleteFeedEvent: function ($deleteBtn, personFeed) {
        var self = this;
        var content = "你确定要删除消息吗?";
        $deleteBtn.bind("tap", function () {
            var needJoin = $("#needJoin").val();
            if (needJoin === "true") {
                var url = _ctxPath + '/r/mp/feedInfo/' + self.currentCompanyID + '/' + personFeed.feedID;
                self.pcManage.getThirdPartyInfo({
                    "weixinCanUse": false,
                    "thirdPartyCanUse": false
                }, url);
                return;
            }
            var callBack = function () {
                var feedID = personFeed.feedID;
                var toGroupID = personFeed.toGroupID;
                var publishPersonID = personFeed.publishPersonID;
                var callBcak = function (data) {
                    var deleteStatus = data.deleteStatus;
                    if (deleteStatus == "success") {
                        var contentObj = $("<p class='mCommon_framePopup_defaultText'>删除成功</p>");
                        //非模态====================
                        var popupMD = new mCommon_framePopup({
                            appendObj: $("body"),//浮出层和黑层显写入的容器
                            contentObj: contentObj.clone(),//内容区显示的对象
                            spaceClose: true,//点击空白关闭
                            winScroll: true,//不允许滚动
                            //非模态弹窗不显示黑层，不显示按钮，过一会自动消失
                            modal: false,//是否为模态弹窗
                            showTime: 2000,//非模态弹窗停留时间
                            showCallback: function (a) {
                            },//显示弹窗后的回调 参数this
                            hideCallback: function (a) {
                            }//隐藏弹窗后的回调  参数this
                        });
                        popupMD.showPopup();
                        setTimeout(function () {
                            window.location = document.referrer;
                        }, 3000);
                        return;
                    } else if ("needRegister" == deleteStatus || "needJoin" == deleteStatus) {
                        var url = _ctxPath + '/r/mp/feedInfo/' + data.companyID + '/' + data.feedID;
                        self.pcManage.getThirdPartyInfo({
                            "weixinCanUse": false,
                            "thirdPartyCanUse": false
                        }, url);
                        return;
                    } else {
                        var popup = new mCommon_controlPagePopupPrompt_setPromptInfo({
                            promptImg: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxMkUyRTFGOTAwNjMxMUU2QjFFQ0RCOTU3MDBCQ0QxQSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoxMkUyRTFGQTAwNjMxMUU2QjFFQ0RCOTU3MDBCQ0QxQSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjEyRTJFMUY3MDA2MzExRTZCMUVDREI5NTcwMEJDRDFBIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjEyRTJFMUY4MDA2MzExRTZCMUVDREI5NTcwMEJDRDFBIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+rPbKzAAABydJREFUeNrsXGtsFFUUnlKKtN2lhdb4iAhKi7Qampa+SFSk1AI/MBITm2ipMSVCSYqJ/PcfPiJR4yOktQlioik/fMEPbYFE0MRHUQyoUNgYhYBG6LtShbbrOeFMPE5mZu/dvTN3Zt2TfLmT7M7Mvd+c+zrn3JMVj8eNjCQvszIUZAjMEBhmmR2AD1gBqAaUAJZSWQSIAiL0vwnAOOAy4CwgRuU3gB8AM7oakKVhElkEeBjQCLgXUJji84YBXwD6AB8DzqcjgTcAWgCtgPvwvTb/mabGIy4BBgFm5VAb8wHz6QPc5jD84P8/B3QD9gGuhp3AeYB2wNOAWyy/DQEOAo4C+qkrTgo+Nw9wD32MVVRaNfkC4FVAJ3V/bwQJ9ACzAc8AhuP/lRFAJ2A1IFvh+/BZawBdgFHLO4cAHVQn5W31gjxsyI+WRgwAngLkefTBOCKAbYCYpQ4nAKuCTGA+aReX84BNirVNphc8CbjI6jMDeEPlh1RV2WWAU6yifwNeJG0wNCMK2AW4xup3ElAaFALXA8Yslbs7AMRZUWH5yDger9VNYBtgilWq26dxLpXxcS+rL2rl47oI7KAxJU4kbgkwcVZsYx9+GrDZbwLbGHmTgI0hIs/EBsBfbHJp9YvAh9jXwwo0hpA8E02MROzODbLPkLXGlAPeBWTT1utRwKEQG1P6qA3TZFj5ALDEK3MWWkbeZxaSDsD+NLBI7ae2oBQAegBzvCAQ95XL6LoLsDuNzHq7yQBhkGntedV74SbLlkhkqVIEOASo1DjGVVMdCgX+O5fWsOakslrVJJLDFqA44JYLknec7rmsicRqWiyj9AuSWMF2LCdFDBAiFdnBtO85SfLimkjk5MUlSdzF7tmeKoFFzDz0q2DX/SxuL36RaEeeKX0C988D/MZMYYWpELiTvVx0y7PSpQFek+hGHpJRJficzey+Z5MlMMIMojFJg6QOEmsUkYeYA7hA914C5CazkG5hZvKXAFMSy4IvAesBoza/FdHiu1LhMqSG3AMFDk4ndGB9J/E89KW8QtfFgOZkljHmWDZIU3wyWuGmiYOKNFGl5lntiOP0nCOyXXghWSlQXkuxgV6S6BV5JvawdeEimS7czHYpPSl2L7fuvCCF7uzWbYeS6LZ2YrYd3bAbZbpwLzGP03mWokG+XqEm1iR4VpWiOuew93wi2oVxtp2gm/YqninrFTS81ifyTHxEz75Cs3PCLlxNUQAGOb1VyleAdS7dGbtklcv9tWSCcuq2DyrotlYxOcgFLBexxlSz634PLB/JkqiDPJSv2XWlCIGlVF4DnPLIfCRLoi7yUE6wGJ1SEQJLqPyZSDQ0k6iTPIPiai7S9V0yBJ7zwZApQqJO8gwLF3eIEFjMtkBGAEjUTR7KH1TeKELgAhYVagSARN3koYyxOEVhn8i44a8giWsTkKhqhyErpjLlp+JU8kNEoj2zNNQrh61MEhI4wdyYforbbGvdO1f5XDeTiz9lCIz6WME6AfJMma+BxKhlLHQlcIxV1C/yel1m29EAkFhE5YgIgTEqbw8AeY0uE4ufJC6k8hcZAu9kg6cu8o7TXlQnidh9b6XrARECz7KZp0wzeXxDr4vE5Wzmj4kQeIxd1wSAPN0k1rHr70UJNKfr+wNCnk4STQ4m7Qh0ssL2MZP+LEWW3TqFJv06j51JwiZ9p51IH5U3G9ePUenWPF2a2MDq3Gu/d0rs1uwKkDNJxj+CmrhCoVtzsWxox1G6eTgFx3q9D451r0gUcqy7GRPeoxLDO55IQv3rAZ8q7LZOgoeum1y6MxplVyTx3C1sD7zH2fzhTXCRH5rnpSYqCS5Co4IZB42R680B0zwvNbGV7T5eN9zOMfsYYOmV5slo4kG/AyytIb47Bf5fbBPi6xd5biQe0xHiaxdkXiZJot/k2ZEoGh+N9byqOsjc7phDriCJhzUfc6iVOOaAk+ZpL445mOhmJHaG+HycE95h7XvZi8OGUfaFUNrTiLx21q5v7aKwVJ3WLGehb1N0cjPs5PHTpyOyqQBk3Zo/AR4zrp9uxBObPbSuC6ugg36f8e/p00eYQVlIkvEL4+nGreTDxZi5A4ZT+GuwZQO1ZS61pQ1wWN6Tnbzqbw/xkf+trNvOUE6bQCSdeCsESSfetiSd2BSEtCfjIU17si4oiXfKbBLvvBCQxDsRh8Q7S4OW+ilik/rpHKBFoV9FNvVTq03qpzeDmPopUfKx0zRQ5/pAXB4tjM/YJEBrUP0+XenvHvAg/V0D+W9GbIypO2R2FzIIUgLGAbvoJwdBYy0mwMAUoloTMPqdAhQXqytd/vc77QQw/ecVS6hdHkVJ4VGDm5yWtUaapQC1k8W0c1lDGlSQ4vNGiDTcRXxo+HO6QCuBXLIpeKeGNKuEECFio6RVE+TrwPIMBfnEqOvjQZj/VRrktJJMJvMMgRkCQy3/CDAAGv+J/Kxkz1YAAAAASUVORK5CYII=",
                            promptText: "出错误了!",
                            setTimeVal: 2000,
                            closeFun: function () {
                                //do nothing
                            }
                        });
                    }
                }

                self.deletePersonFeedByID({
                    feedID: feedID,
                    toGroupID: toGroupID,
                    companyID: self.currentCompanyID,
                    publishPersonID: publishPersonID
                }, callBcak);
            }
            var btn2Content = "确定删除";
            var btn1Content = "取消";
            self.deleteConfirmOpanel(content, btn1Content, btn2Content, callBack);
        });
    },

    // 确认弹窗
    deleteConfirmOpanel: function (content, btn1Content, btn2Content, callBack) {
        var self = this;
        var buttonObj = $('<div class="mCommon_basicBtn_box2Center" ><a class="mCommon_basicBtn mCommon_basicBtn_gray" tapclass="mCommon_basicBtn_gray_tap"><i>' + btn1Content + '</i></a><a class="mCommon_basicBtn mCommon_basicBtn_blue" tapclass="mCommon_basicBtn_blue_tap"><i>' + btn2Content + '</i></a></div>');
        var contentObj = $('<p class="mCommon_framePopup_defaultText">' + content + '</p>');
        var popup = new mCommon_framePopup({
            appendObj: $("body"),//浮出层和黑层显写入的容器
            contentObj: contentObj.clone(),//内容区显示的对象
            spaceClose: false,//点击空白关闭
            buttonObj: buttonObj,//按钮区显示的对象
            winScroll: true,//不允许滚动
            showCallback: function (a) {

            },//显示弹窗后的回调 参数this
            hideCallback: function (a) {
            }//隐藏弹窗后的回调  参数this
        });
        buttonObj.find("a").eq(0).bind("tap", function (e) {
            popup.hidePopup();
            e.stopPropagation();
        });
        buttonObj.find("a").eq(1).bind("tap", function (e) {
            popup.hidePopup();
            callBack && callBack.call(self);
            e.stopPropagation();
        });
        popup.showPopup();
    },

    // 回复块点击事件
    bindCommentsContenEvent: function (obj, comments) {
        var self = this;
        var feedID = $("#feedID").val();
        obj.attr("commentID", comments.commentId);
        var currentPersonID = $("#currentPersonID").val();
        var url = _ctxPath + "/r/mp/gotoReply?feedID=" + feedID + "&commentID=" + comments.commentId;
        var sourceAuthorID = comments.personId;
        var needJoin = $("#needJoin").val();
        if (currentPersonID == sourceAuthorID && needJoin != "true") {
            self.initPopupEvent(comments, obj, url);
        } else {
            if (currentPersonID == comments.authorid && needJoin != "true") {
                self.initPopupEvent(comments, obj, url);
            } else {
                obj.bind("tap", function (event) {
                    var commentID = $(this).attr("commentID");
                    $("#commentID").val(commentID);
                    if (da.djJsReady) {
                        da.checkFun({
                            funName: 'addComment',
                            success: function () {
                                da.addComment({
                                    feedID: $("#feedID").val(),
                                    commentID: commentID
                                });
                            },
                            fail: function () {
                                $("#_topFrame").hide();
                                $("#_reply_content_div").show();
                            }
                        });
                    } else {
                        self.pcManage.checkPersonStatusInThird(function () {
                            $("#_topFrame").hide();
                            $("#_reply_content_div").show();
                        }, url);
                    }
                    event.stopPropagation();
                });
            }
        }
    },


    /**
     * 注册回复弹窗事件
     * @param comments
     * @param obj
     * @param url
     */
    initPopupEvent: function (comments, obj, url) {
        var self = this;
        var contentObj = $("#_template_div_content").find(".mShortText_details_popOperationBox").clone();//浮层内容
        var popup = new mCommon_framePopup({
            appendObj: $("body"),//浮出层和黑层显写入的容器
            contentObj: contentObj,//内容区显示的对象
            spaceClose: true,//点击空白关闭
            winScroll: true,//不允许滚动
            showCallback: function (a) {
            },//显示弹窗后的回调 参数this
            hideCallback: function (a) {
            }//隐藏弹窗后的回调  参数this
        });
        contentObj.find("#_deleteBtn").bind("tap", function (e) {
            var data = {
                companyID: self.currentCompanyID,
                commentID: comments.commentId,
                objID: comments.objId,
                objtype: comments.objtype
            };
            popup.hidePopup();
            mCommon_basicLoadingShow("", true);//屏幕居中对齐不用写参数，容器居中对齐写参数
            $.ajax({
                url: _ctxPath + "/r/mp/dcb",
                dataType: 'json',
                type: 'post',
                data: data,
                success: function (data) {
                    if (data.result == "success") {
                        obj.remove();
                        var commentsNum = $("#_replyTabBtn").attr("commentsNum");
                        commentsNum = (Number(commentsNum) - 1);
                        $("#_replyTabBtn").attr("commentsNum", commentsNum);
                        $("#_replyTabBtn").html("回复" + commentsNum);
                        var popupReply = new mCommon_framePopup({
                            appendObj: $("body"),//浮出层和黑层显写入的容器
                            contentObj: $("<p class='mCommon_framePopup_defaultText'>回复已删除</p>"),//内容区显示的对象
                            spaceClose: true,//点击空白关闭
                            winScroll: true,//不允许滚动
                            modal: false,
                            showTime: 2000,//非模态弹窗停留时间
                            showCallback: function (a) {
                            },//显示弹窗后的回调 参数this
                            hideCallback: function (a) {
                            }//隐藏弹窗后的回调  参数this
                        });
                        popupReply.showPopup();
                    }
                    mCommon_basicLoadingRemove();//删除loading层
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    mCommon_basicLoadingRemove();//删除loading层
                    var popup = new mCommon_controlPagePopupPrompt_setPromptInfo({
                        promptImg: self.failPic,
                        promptText: "出错了,稍后重试",
                        setTimeVal: 2000,
                        closeFun: function () {
                            //do nothing
                        }
                    });
                }
            });
            e.stopPropagation();
        });
        contentObj.find("#_replyBtn").attr("commentID", comments.commentId);
        contentObj.find("#_replyBtn").bind("tap", function (e) {
            popup.hidePopup();
            var commentID = $(this).attr("commentID");
            $("#commentID").val(commentID);
            if (da.djJsReady) {
                da.checkFun({
                    funName: 'addComment',
                    success: function () {
                        da.addComment({
                            feedID: $("#feedID").val(),
                            commentID: commentID
                        });
                    },
                    fail: function () {
                        self.pcManage.checkPersonStatusInThird(function () {
                            $("#_topFrame").hide();
                            $("#_reply_content_div").show();
                        }, url);
                    }
                });
            } else {
                self.pcManage.checkPersonStatusInThird(function () {
                    $("#_topFrame").hide();
                    $("#_reply_content_div").show();
                }, url);
            }
            e.stopPropagation();
        });
        contentObj.find("#_cancleBtn").bind("tap", function (e) {
            popup.hidePopup();
            e.stopPropagation();
        });
        obj.bind("tap", function (event) {
            var target = event.target;
            target = $(target);
            if (!(target.is("i") && target.hasClass("‘mCommon_basicTextAndNamePageAddr_pageLinkAddressText’"))) {
                var needJoin = $("#needJoin").val();
                if (needJoin === "true") {
                    self.pcManage.getThirdPartyInfo({
                        "weixinCanUse": false,
                        "thirdPartyCanUse": false
                    }, url);
                    return;
                } else {
                    //模态弹窗====================
                    popup.showPopup();
                    //模态弹窗end====================
                }
            }
            event.stopPropagation();
        });
    },
    /**
     * 注册点赞事件
     */
    initReplyAndPraiseEvent: function (praisePersonList) {
        var self = this;
        var feedID = $("#feedID").val();
        var currentPersonID = $("#currentPersonID").val();
        var isPraised = self.checkCurrentPersonIsPraise(currentPersonID, praisePersonList);
        self.changedPraiseStatus(isPraised);
        //注册点赞事件
        $("#_praise_btn").bind("tap", function () {
            if ($(this).hasClass("disable")) {
                return false;
            }
            $(this).addClass("disable");
            var praiseMark = $(this).attr("praise");
            var type = ""
            if ("isPraised" == praiseMark) { //取消赞
                type = "delete";
            } else { //赞
                type = "insert";
            }
            var isRead = self.checkCurrentPersonIsRead(currentPersonID);
            if (!isRead) {
                self.insertReadPersonByFeedID(feedID);
            }
            var callBack = function (obj, data) {
                if (data && data.message == "add") {
                    self.changedPraiseStatus(true);
                    var praisePersonLenth = $("#_praiseTabBtn").attr("praisePersonLenth");
                    $("#_praiseTabBtn").attr("praisePersonLenth", (Number(praisePersonLenth) + 1));
                    $("#_praiseTabBtn").html("赞" + (Number(praisePersonLenth) + 1));
                    obj.find("#_praise_btn").removeClass("disable");
                } else if (data && data.message == "delete") {
                    self.changedPraiseStatus(false);
                    var praisePersonLenth = $("#_praiseTabBtn").attr("praisePersonLenth");
                    $("#_praiseTabBtn").attr("praisePersonLenth", (Number(praisePersonLenth) - 1));
                    $("#_praiseTabBtn").html("赞" + (Number(praisePersonLenth) - 1));
                    obj.find("#_praise_btn").removeClass("disable");
                } else if (data && (data.message == "needRegister" || data.message == "needJoin")) {
                    var url = _ctxPath + 'r/mp/feedInfo/' + data.companyID + '/' + data.feedID;
                    self.pcManage.getThirdPartyInfo({
                        "weixinCanUse": false,
                        "thirdPartyCanUse": false
                    }, url);
                    obj.find("#_praise_btn").removeClass("disable");
                    return false;
                } else if (data && data.message == "fail") {
                    var popup = new mCommon_controlPagePopupPrompt_setPromptInfo({
                        promptImg: self.failPic,
                        promptText: "出错误了!",
                        setTimeVal: 2000,
                        closeFun: function () {
                            //do nothing
                        }
                    });
                    obj.find("#_praise_btn").removeClass("disable");
                }
            }
            self.updatePraiseByFeed({
                companyID: self.currentCompanyID,
                feedID: feedID,
                type: type
            }, $(".mCommon_basicBottomReply"), callBack);
        });
    },
    //改变赞的标记
    changedPraiseStatus: function (isPraised) {
        var praiseImgPath = _ctxPath + "/modulev1/portalHtml5/images/";
        if (isPraised) {
            $("#_praise_btn").attr("praise", "isPraised")
            $("#_praise_btn").find("img").attr("src", praiseImgPath + "mCommon_basicIcon_praised.png");
        } else {
            $("#_praise_btn").attr("praise", "noPraised")
            $("#_praise_btn").find("img").attr("src", praiseImgPath + "mCommon_basicIcon_praise.png");
        }
    },
    /**
     * 判断当前人是否赞过该条信息流
     * @param currentPersonID 当前人perosnID
     * @param praisePersonList 信息流赞列表
     */
    checkCurrentPersonIsPraise: function (currentPersonID, praisePersonList) {
        var isPraised = false;
        if (null == praisePersonList || praisePersonList.length <= 0) {
            return isPraised;
        }
        //检查人员是否在赞列表中
        for (var i = 0; i < praisePersonList.length; i++) {
            var praisePerson = praisePersonList[i];
            if (currentPersonID == praisePerson.praisePersonID) {
                isPraised = true;
                break;
            }
        }
        return isPraised;
    },
    /**
     *
     * @param currentUserID
     */
    checkCurrentPersonIsRead: function (currentUserID) {
        var self = this;
        var isReadPerson = false;
        if (null == self.readPersonList || self.readPersonList.length <= 0) {
            return isReadPerson;
        }
        //检查当前人员是否在已阅列表中
        for (var i = 0; i < self.readPersonList.length; i++) {
            var readPerson = self.readPersonList[i];
            if (currentUserID == readPerson.readPersonID) {
                isReadPerson = true;
                break;
            }
        }
        return isReadPerson;
    },
    /**
     * 获取赞阅列表
     * @param data
     * @param callBack
     */
    getReadAndPraiseByType: function (data, callBack) {
        var self = this;
        var options = {
            url: _ctxPath + '/r/mp/grpl',
            dataType: 'JSON',
            type: 'POST',
            data: data,
            async: false,
            success: function (jsonData) {
                callBack && callBack.call(self, jsonData);
            }
        }
        $.ajax(options);
    },
    /**
     * 他人举报事件
     * @param $reportBtn
     */
    initReportFeedEvent: function ($reportBtn) {
        $reportBtn.bind("tap", function () {
            var tipoffedMsgID = $reportBtn.attr("feedID");
            var url = _ctxPath + '/navigation/goToTipoff.action?tipoffedMsgID=' + tipoffedMsgID + '&tipoffedMsgType=1&tipoffFromPC=1';
            window.location.href = url;
        });
    },
    /**
     * 构造通用阅读列表事件
     * @param listBox
     * @param index
     * @param readListTemplate
     */
    constractReadPersonList: function (index, readListBox, readListTemplate) {
        var self = this;
        $(".mCommon_jsPullToRefresh_noneMore").each(function () {
            $(this).parent("div").remove();
        });
        var callBack = function (jsonData) {
            if (!jsonData || jsonData.list == null || jsonData.list.length <= 0) {
                //空白提示
                var nullInfoTemplate = $("#_template_div_content").find(".mPicTextPush_details_nullInfo").clone();
                readListBox.find("#_readList_content_div").append(nullInfoTemplate);
                $("#_bottom_display_span").html(readListBox);
                readListBox.siblings().remove();
                return;
            }
            var readPersonList = jsonData.list;
            self.readPersonList = readPersonList;
            $("#_readTabBtn").html("已阅" + readPersonList.length);
            mCommon_basicLoadingShow("", true);
            ;//屏幕居中对齐不用写参数，容器居中对齐写参数
            for (var i = 0; i < readPersonList.length; i++) {
                var subTemplate = readListTemplate.clone();
                var readPerson = readPersonList[i];
                var personID = readPerson.readPersonID;
                var readPersonName = readPerson.readPersonName;
                var url = _ctxPath + '/file/loadPic.img?personID=' + personID + "&date=" + _currentTime;
                subTemplate.find("img").attr("src", url);
                subTemplate.find(".mPicTextPush_details_alreadyReadBoxOptionText").html(readPersonName || "");
                if (da.djJsReady) {
                    subTemplate.attr("personID", personID);
                    subTemplate.attr("personName", readPersonName);
                    subTemplate.bind("tap", function (e) {
                        da.showPerson({
                            personID: $(this).attr("personID"),
                            personName: $(this).attr("personName")
                        });
                        e.stopPropagation();
                    });
                }
                readListBox.find("#_readList_content_div").append(subTemplate);
            }
            $("#_bottom_display_span").prepend(readListBox);
            readListBox.siblings().remove();
            mCommon_basicLoadingRemove();//删除loading层
        }
        var data = {
            companyID: self.currentCompanyID,
            feedID: $("#feedID").val(),
            listType: "read"
        }
        self.getReadAndPraiseByType(data, callBack);
    },
    /**
     * 构造赞列表事件
     * @param listBox
     * @param index
     * @param praiseListTemplate
     */
    constractPraisePersonList: function (index, praiseListBox, praiseListTemplate) {
        var self = this;
        $(".mCommon_jsPullToRefresh_noneMore").each(function () {
            $(this).parent("div").remove();
        });
        var callBack = function (jsonData) {
            if (!jsonData || jsonData.list == null || jsonData.list.length <= 0) {
                //空白提示
                var nullInfoTemplate = $("#_template_div_content").find(".mPicTextPush_details_nullInfo").clone();
                praiseListBox.find("#_praiseList_content_div").append(nullInfoTemplate);
                $("#_bottom_display_span").html(praiseListBox);
                praiseListBox.siblings().remove();
                return;
            }
            var praisePersonList = jsonData.list;
            $("#_praiseTabBtn").attr("praisePersonLenth", praisePersonList.length);
            $("#_praiseTabBtn").html("赞" + praisePersonList.length);
            mCommon_basicLoadingShow("", true);//屏幕居中对齐不用写参数，容器居中对齐写参数
            for (var i = 0; i < praisePersonList.length; i++) {
                var subTemplate = praiseListTemplate.clone();
                var praisePerson = praisePersonList[i];
                var personID = praisePerson.praisePersonID;
                var praisePersonName = praisePerson.praisePersonName;
                var url = _ctxPath + '/file/loadPic.img?personID=' + personID + "&date=" + _currentTime;
                subTemplate.find("img").attr("src", url);
                subTemplate.find(".mPicTextPush_details_praiseBoxOptionText").html(praisePersonName || "");
                if (da.djJsReady) {
                    subTemplate.attr("personID", personID);
                    subTemplate.attr("personName", praisePersonName);
                    subTemplate.bind("tap", function (e) {
                        da.showPerson({
                            personID: $(this).attr("personID"),
                            personName: $(this).attr("personName")
                        });
                        e.stopPropagation();
                    });
                }
                praiseListBox.find("#_praiseList_content_div").append(subTemplate);
            }
            $("#_bottom_display_span").prepend(praiseListBox);
            praiseListBox.siblings().remove();
            mCommon_basicLoadingRemove();//删除loading层
        }
        var data = {
            companyID: self.currentCompanyID,
            feedID: $("#feedID").val(),
            listType: "praise"
        }
        self.getReadAndPraiseByType(data, callBack);
    },
    /**
     * 构造信息流中页签
     * @param commentsNum 评论数
     * @param readPersonLength 阅读数
     * @param praisePersonLenth 赞数
     */
    constractOptionTab: function (commentsNum, readPersonLength, praisePersonLenth, browseNum, visitShowType) {
        var self = this;
        var menu = new Array();
        var count = 0;
        menu[count++] = "<i id='_replyTabBtn' commentsNum='" + commentsNum + "'>回复" + commentsNum + "</i>";
        if (visitShowType == 0) {
        } else if (visitShowType == 1) {
            menu[count++] = "<i id='_readTabBtn' browseNum='" + browseNum + "'>浏览" + browseNum + "</i>";
        } else {
            menu[count++] = "<i id='_readTabBtn' readPersonLength='" + readPersonLength + "'>已阅" + readPersonLength + "</i>";
        }
        menu[count++] = "<i id='_praiseTabBtn' praisePersonLenth='" + praisePersonLenth + "'>赞" + praisePersonLenth + "</i>";
        var optionTab = {
            appendObj: $("#mCommon_basicTab0114"),//页签写入的容器，类型是jquery对象
            selectedIndex: 0,//默认当前选中状态组
            //tabMenu: ["<i id='_replyTabBtn' commentsNum='" + commentsNum + "'>回复" + commentsNum + "</i>",
            //	"<i id='_readTabBtn' readPersonLength='" + readPersonLength + "'>已阅" + readPersonLength + "</i>",
            //	"<i id='_praiseTabBtn' praisePersonLenth='" + praisePersonLenth + "'>赞" + praisePersonLenth + "</i>"],
            tabMenu: menu,
            tapFun: function (tapObj) {//点击tap的回调函数,参数是点击的tap对象
                //页签切换事件
                self.tapChangedEvent(tapObj, visitShowType);
            }
        };
        self.mCommon_basicTab0114 = new mCommon_basicTab0114(optionTab);
    },
    /**
     * tap页签变化通用事件
     */
    tapChangedEvent: function (tapObj, visitShowType) {
        var self = this;
        var index = tapObj.index();
        if (0 == index) { //回复页签
            //查询回复事件
            self.initPullUpEvent(index, self.commentsBox.clone());
        } else if (1 == index) {
            if (self.pullUp) {
                self.pullUp.clearPullUp();
            }
            if (!visitShowType) {
                //显示阅读列表事件
                $("#_bottom_display_span").hide();
            } else {
                $("#_bottom_display_span").show();
                if ("0" == visitShowType) {//已赞列表
                    self.constractPraisePersonList(index, self.praiseListBox.clone(), self.praiseListTemplate);
                } else if ("1" == visitShowType) {//浏览   置空
                    $("#_bottom_display_span").html('');
                } else if ("2" == visitShowType) {//已阅列表
                    //显示阅读列表事件
                    self.constractReadPersonList(index, self.readListBox.clone(), self.readListTemplate);
                }
            }
        } else if (2 == index) { //已赞列表
            if (self.pullUp) {
                self.pullUp.clearPullUp();
            }
            //显示已赞列表事件
            self.constractPraisePersonList(index, self.praiseListBox.clone(), self.praiseListTemplate);
        }
    },
    /**
     * 增加已阅列表人数
     * @param feedID
     */
    insertReadPersonByFeedID: function (feedID) {
        var options = {
            url: _ctxPath + '/r/mp/irp/' + feedID,
            dataType: 'JSON',
            type: "POST",
            success: function (data) {
            }
        }
        $.ajax(options);
    },
    /** 构造群组列表方法 **/
    initGroupListPage: function () {
        var self = this;
        if (self.pullUp) {
            self.pullUp.clearPullUp();
        }
        var listBox = $(".mGroup_groupList_listBox");//列表容器
        var setting = {
            loadingDiv: self.loadingDiv,//加载中显示的jq对象
            listOuterBox: listBox,
            loadData: function () {//加载数据回调
                self.requestGroupListByPage(this.refresh);//数据请求模拟 参数：删除圆球方法，append的容器
            }
        };
        self.pullUp = new mCommon_jsPullToRefresh(setting);
    },
    /**
     * 请求数据
     * @param callBack
     */
    requestGroupListByPage: function (callBack) {
        var self = this;
        var paramData = {
            companyID: self.companyID,
            nextPageNumber: self.groupNextPageNumber + 1
        };
        var option = {
            url: _ctxPath + "/r/mp/gl",
            data: paramData,
            dataType: 'JSON',
            type: 'POST',
            async: false,
            success: function (data) {
                var isMore = self.constractGroupList(data);
                callBack && callBack.call(this, isMore);
            }
        }
        $.ajax(option);
    },
    /**
     * 构造群组列表
     * @param data
     */
    constractGroupList: function (data) {
        var self = this;
        if (!data || !data.page_info.dataList || data.page_info.dataList.length == 0) {
            return false;
        }
        self.totalSize = data.page_info.totalSize;
        if ((self.totalSize / 10 - self.groupNextPageNumber) < 0) {
            return false;
        }
        self.groupNextPageNumber = data.page_info.currentPageNumber;
        var userGroupList = data.page_info.dataList;
        if (null == userGroupList || userGroupList.length <= 0) {
            var template = $("#_template_div").find(".mCommon_controlPrompt_box").clone();
            $(".mCommon_frameContent0_content").prepend(template);
            mCommon_controlPrompt($("#_template_div").find(".mCommon_controlPrompt_box"));
            return false;
        } else {
            for (var i = 0; i < userGroupList.length; i++) {
                var userGroup = userGroupList[i];
                var groupPicUrl = _ctxPath + '/file/loadPic.img?groupID=' + userGroup.groupID + "&t=" + new Date();
                var groupTemplate = $("#_template_div").find(".mCommon_basicHeadPicAndDesc_item").clone();
                groupTemplate.find(".mCommon_basicHeadPicAndDesc_itemTdHeadPic").find("img").attr("src", groupPicUrl);
                groupTemplate.find(".mCommon_basicHeadPicAndDesc_title").html(userGroup.groupName);
                groupTemplate.find(".mCommon_basicHeadPicAndDesc_content").html(userGroup.description);
                $(".mGroup_groupList_listBox").append(groupTemplate);
                groupTemplate.attr("groupID", userGroup.groupID);
                groupTemplate.unbind("tap").bind("tap", function () {
                    var groupID = $(this).attr("groupID");
                    var groupUrl = _ctxPath + '/r/mp/ggcp/' + groupID + '/' + self.companyID;
                    window.location.href = groupUrl;
                });
            }
        }
        return true;
    }
    /** 构造群组列表方法 **/
})
;