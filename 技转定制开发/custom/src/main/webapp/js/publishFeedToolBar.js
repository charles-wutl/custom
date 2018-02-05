/**
 * Created by panli on 16/5/17.
 * 信息流发布工具栏类
 */

function PublishFeedToolBar() {
    this.currentTopicPreset = null;
    this.toGroupID = null;
    this.currentActiveTopicID = null;
    this.fileUploadComponent = null;
    this.picUploadComponent = null;
    this.contentMaxLength = 1000;
    this.imageArray = [];
    this.fileIDArray = [];
    this.itemArray = [];
    this.atPersonMap = {};
    this.currentLbsData = null;
    this.currentContactNextPageNumber = 0;
    this.successPic = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo4ODRDQTRGREZGQzYxMUU1OEYwMEFBODNDMDlGMUE2NyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo4ODRDQTRGRUZGQzYxMUU1OEYwMEFBODNDMDlGMUE2NyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjg4NENBNEZCRkZDNjExRTU4RjAwQUE4M0MwOUYxQTY3IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjg4NENBNEZDRkZDNjExRTU4RjAwQUE4M0MwOUYxQTY3Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+qYMBIgAABkhJREFUeNrsnG1o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';//提示的图片地址，字符串类型，必填
    this.failPic = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxMkUyRTFGOTAwNjMxMUU2QjFFQ0RCOTU3MDBCQ0QxQSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoxMkUyRTFGQTAwNjMxMUU2QjFFQ0RCOTU3MDBCQ0QxQSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjEyRTJFMUY3MDA2MzExRTZCMUVDREI5NTcwMEJDRDFBIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjEyRTJFMUY4MDA2MzExRTZCMUVDREI5NTcwMEJDRDFBIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+rPbKzAAABydJREFUeNrsXGts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';
    this.warningPic = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxMkUyRTFGRDAwNjMxMUU2QjFFQ0RCOTU3MDBCQ0QxQSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoxMkUyRTFGRTAwNjMxMUU2QjFFQ0RCOTU3MDBCQ0QxQSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjEyRTJFMUZCMDA2MzExRTZCMUVDREI5NTcwMEJDRDFBIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjEyRTJFMUZDMDA2MzExRTZCMUVDREI5NTcwMEJDRDFBIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+WHXY9AAABmZJREFUeNrsnFtsFUUYx7eFEntFYjWKAvGS1kuJNI2J0dZADRThpT5QtIRI1PKg0kjQV3gQE2KM8UJpTLw0MVIjGn1Rgxcklhc1hEqrQtVKvTTKra2toLT0+P/sf8t0Odszp+fsnj278yW/7DRtd2f+O7s78803X04sFrOMzdxyjIBGQCOgEXDmNgssAbeCclAGbgCXgSJQzL8bBiPgFPgR9ICj4BvQCc5HScAF4F5wN7gLXJri+QbBF+Az8A7oD6OAl4C14EFQI9eN8zfjbPwxcIK9bZy/K2GPnAuuBfNBbpxzSE/8FLwB3gX/ZLuA0uBm8Bi4wvE7eSQ7wD5wAHSBvzXPWwgWg2pQy5tS5Pib42AneBEMedZCEdAD5oAt4HRsqg2D10EdmJ3G68m5VvDcw45rnmJd5njRVi/EWwZ6HI04Bh4HJR7dMBW5xibQ66hDD+sWWAELwC4wrlS6H2wEeT4I5ySP1+5X6jPOOhYETcAy0KVUdBQ8A4oyIJyTItZlVKlfN+scCAHl3TPoeFSqAiCckyrHq2WIdc+ogOsdd/Ytn95zqbwf2x1PygOZErBJed/J8YkAC+dks6PuTX4LuAaMsQLn2BOtLGM96x5jWxr8ErAW/MsLy3FVFopns9rRllqvBSxTPhjS9ddlsXg265THeTDZr3MyU7kC8CWo4M9Pgmc9mBx1cK4bz/o5bUu3bVHa8h24DZxJ91SuRfl6tXvYI/pi7tbn4XV3K9dpSfcjXKN086OgOIQCFrNt9uupWuf/cjU66WzQQheUuIsa6eAMmw2zbefZ1l1s+7SmI2AzXUdireBgiD30BymcxTY3p+oPFH/ez2Ae+APcRA+wl9YHFrr87hewyOPrS5uPgCvBAB24QzPtgZsontg2H8QLgolYW1mel6gXTtcD83nHS+lmlwWfUR8akOkeaL/3ZdHqOnCS9TmbbA9soHhiz/kkXlBsDDzPcim1SPoRfkhZu2iL4JJvG9su9nCyAi7kgo3YnpAOW3SGNXtYvtPtteImYL2y9Nge4cADu+05XMvWFnC18kXaH2EB9ytDmFW6AuYpj+8nEft4OG2UGljUJE9HwEp6XmzPSNStQ/FGVeoIuEQpf2X0s7520cZVwAqlfMToZ32vlBfrCHg9j39GZOqWyAaphcWZSUIB7fHOD0a7SbO1WKAjYKnSA41N1eJyHQHtMLHTRrdJs7UoTEbAMaPbFOeCWLGOgOeU6YuxBFrkukyixUqMbpNmazGiI+CIETA1Ae2x31yj26TZOwlO6Aj4O4+LjG4XjY1/1RHwJx6vjvfZjqAVUguxXh0Bu3mUXUS3GP3+12AWy106AnYq5duNflM06NQR8JB1ITKpxug3qcEZajN1gOiyLrwXrLAm3Nky/4uqV1rWh09yRPIxqNPpgWIfKEOZpRHufUuV4dyHujMRsfeB3TXvi7CA9/MoWrwXd443TWiHrAVUc/Q934re2rA4DiQiVpwrB9y+B9NFJrzCo5xgQwR73wbrgmfqVVcvQwCDizIRIx3v46EVXJQohHWrEl670aeo+UyF+Do3Edm2LZUofWeA5Y2Wl5uXJyzT4W3ieZHVyKusNARYyj9uZ1kiNp+KwLtvO8UTezphh9HcDX5Y2RJVFeJHuErZwnZYZ1e9TpC5rAc8yrGQTKp3W3HWBkIybHmTbYyxzQnXhXI1Ty5fxlaW5Wv8cggFlDaVs9xqacYFJbvVS+JEbubPEoC+MyTDGMkq8hLLnm31EsqVzYbyrqgPwWbDeuW9N8g2+rrddWUWi7fS7+2uNg3KXZMLN2aheI2KeNKWtZne8r/ZbPlPPenEayA/wMLls46BSDqhpj0ZUir1LagMoHiVrJua9qQuKIl3ypnMRr2zOwKUeGdHnMQ75ek4vx+pn5rSnGgsmYRkTdmS+sk5zHEmH+tlQrBin3qcW/Kx2nRfz+v0dwNx0t/JS3y5B+nvlvPczvR3A16mv/M6AaO93/YR6+IEjLLGIqk7P+f0rVt7+jQxrazgtG6ZNZFK1OngOM457Qv063lifqYAldU92fV4h+WeAvQ3OlTtFKAxxVNSyBsiDtVrLPcUoHJD2qyQpACNZyKAbNy7hz0oP8XznWUP/gi8bYU0Ca2byd6zSj6OahrkUrrWC5Swir+4wKOmQZbH/lAmIydMIm4joBHQCBhl+0+AAQA0e3ZwqiM+UAAAAABJRU5ErkJggg==';

    this.contactTemplate = $("<div class='mCommon_basicAddressListOptional_box borderPx1'><ul" +
        " class='mCommon_basicAddressListOptional_boxTable'><li class='mCommon_basicAddressListOptional_headPicBox'>" +
        "<img src=''></li><li" +
        " class='mCommon_basicAddressListOptional_describeBox'><div class='mCommon_basicAddressListOptional_peopleName textCut'>" +
        "</div><div class='mCommon_basicAddressListOptional_companyAndJobPosition textCut'><i id='_comapnyName'></i> " +
        "<i id='_position'></i></div></li></ul></div>");
    this.richTextFaceID = "";
    this.cursor = 0;
    this.selectedRange = null;

}
$.extend(true, PublishFeedToolBar.prototype, {
    initToolBar: function (currentTopicPreset, toGroupID) {
        var self = this;
        self.currentTopicPreset = currentTopicPreset;
        self.toGroupID = toGroupID;
        self.enableImageTool()($("#otherPictureInput"));
        if ($("#_richText_publisher").val() === "_richText_publisher") { //图文推送标示
            //图文推送上传图片
            self.enableRichTextImageTool()($("#richFaceInput"));
            //图文推送内容上传图片
            self.enableRichTextContentImageTool()($("#_fileupload_btn"));
            //图文推送地理位置
            self.enableRichTextLocationTool()($('#_position_template_table'), $("#_position_tbody"));
            //初始化光标位置
            // self.initRecordCursorPosition();
        }
        self.enableExpressionTool()();
        self.enableLocationTool()($('.mReleaseMessage_info_toolBar_item').eq(3), $("#_position_tbody"));
    },

    // initRecordCursorPosition : function () {
    //     var self = this;
    //     //记录光标位置
    //     document.onselectionchange = function () {
    //         var range = document.selection.createRange();
    //         var srcele = range.parentElement();//获取到当前元素
    //         var copy = document.body.createTextRange();
    //         copy.moveToElementText(srcele);
    //         for (self.cursor = 0; copy.compareEndPoints("StartToStart", range) < 0; self.cursor++) {
    //             copy.moveStart("character", 1);//改变光标位置，实际上我们是在记录cursor的数量.
    //         }
    //     }
    // },

    // 短文本类型信息流激活图片工具
    enableImageTool: function () {
        var self = this;

        function setContent(contentObj, imageData) {
        }

        /**
         * obj : 绑定对象
         * contentObj : 内容区域
         * 回调实现借口
         */
        return function (obj, contentObj, callBack) {
            if (!obj) {
                return null;
            }
            obj.fileupload({
                url: _ctxPath + "/file/myUploadFile.json?enctype=multipart",
                dataType: 'json',
                limitMultiFileUploadSize: 5242880,
                add: function (e, data) {
                    mCommon_basicLoadingShow("", true);//屏幕居中对齐不用写参数，容器居中对齐写参数
                    var jqXHR = data.submit().success(function (result, textStatus, jqXHR) {
                        mCommon_basicLoadingRemove();//删除loading层
                        var fileID = result.files[0].fileID;
                        var smallUrl = result.files[0].thumbnailUrl;
                        var bigUrl = result.files[0].url + "&show=big";
                        var $pictureBox = $(".mReleaseMessage_info_image_bottom"); //图片的父容器
                        var $pictureItem = mReleaseMessage_info_addImage(smallUrl);
                        if (!$pictureItem) {
                            return;
                        }
                        $pictureItem.attr("fileID", fileID);
                        var tempArray = new Array();
                        tempArray.push(smallUrl);
                        tempArray.push(bigUrl);
                        self.imageArray.push(tempArray);
                        self.fileIDArray.push(fileID);
                        //点击小图看大图
                        $pictureItem.find(".mReleaseMessage_info_image_bottom_item_img").tap(function () {
                            mCommon_jsImageView(imageArray, $(this).attr("pictureIndex"));//图片放大和缩放实现
                        });
                        // 注册删除事件
                        $pictureItem.find(".mReleaseMessage_info_image_bottom_item_del").bind("tap", function () {
                            var fileID = $pictureItem.attr("fileID");
                            var index = $pictureBox.find("*[fileID=" + fileID + "]").find(".mReleaseMessage_info_image_bottom_item_img").attr("pictureIndex");
                            self.imageArray.splice(index - 1, 1);
                            self.fileIDArray.splice(index - 1, 1);
                            $pictureBox.find("*[fileID=" + fileID + "]").remove();
                            mReleaseMessage_info_delImage();
                        });
                    }).error(function (jqXHR, textStatus, errorThrown) {
                        mCommon_basicLoadingRemove();//删除loading层
                        alert("图片上传失败,请稍候再试");
                    });
                }
            });
        }
    },
    //图文推送类型信息流激活图片工具
    enableRichTextImageTool: function () {
        var self = this;
        /**
         * obj : 绑定对象
         * contentObj : 内容区域
         * 回调实现借口
         */
        return function (obj, contentObj, callBack) {
            if (!obj) {
                return null
            }
            obj.fileupload({
                url: _ctxPath + "/file/myUploadFile.json?enctype=multipart",
                dataType: 'json',
                limitMultiFileUploadSize: 5242880,
                add: function (e, data) {
                    mCommon_basicLoadingShow("", true);//屏幕居中对齐不用写参数，容器居中对齐写参数
                    var jqXHR = data.submit().success(function (result, textStatus, jqXHR) {
                        mCommon_basicLoadingRemove();//删除loading层
                        var fileID = result.files[0].fileID;
                        var smallUrl = result.files[0].thumbnailUrl;
                        var $pictureBox = $(".mReleaseMessage_info_image_bottom"); //图片的父容器
                        var $pictureItem = mReleaseMessage_info_addRichTextImage(smallUrl);
                        if (!$pictureItem) {
                            return;
                        }
                        self.richTextFaceID = fileID;
                        $pictureItem.attr("fileID", fileID);
                        // 注册删除事件
                        $pictureItem.find(".mCommon_basicUploadImg_uploadImgDel").bind("tap", function () {
                            mReleaseMessage_info_delRichTextImage();
                        });
                    }).error(function (jqXHR, textStatus, errorThrown) {
                        mCommon_basicLoadingRemove();//删除loading层
                        alert("图片上传失败,请稍候再试");
                    });
                }
            });
        }
    },
    //图文推送类型信息流内容上传图片
    enableRichTextContentImageTool: function () {
        var self = this;
        /**
         * obj : 绑定对象
         * contentObj : 内容区域
         * 回调实现借口
         */
        return function (obj, contentObj, callBack) {
            if (!obj) {
                return null
            }
            obj.fileupload({
                url: _ctxPath + "/file/myUploadFile.json?enctype=multipart",
                dataType: 'json',
                limitMultiFileUploadSize: 5242880,
                add: function (e, data) {
                    //重置光标
                    // self.restoreSelection();
                    mCommon_basicLoadingShow("", true);//屏幕居中对齐不用写参数，容器居中对齐写参数
                    var jqXHR = data.submit().success(function (result, textStatus, jqXHR) {
                        mCommon_basicLoadingRemove();//删除loading层
                        var fileID = result.files[0].fileID;
                        var smallUrl = result.files[0].thumbnailUrl;
                        var bigUrl = result.files[0].url + "&show=big";
                        var $pictureBox = $("#richText_content_div"); //图片的父容器
                        var $pictureItem = addRichTextCotentImg(bigUrl, fileID);
                        if (!$pictureItem) {
                            return;
                        }
                        var pictureDomItem = $("<div></div>").append($pictureItem).html();
                        //添加前获取焦点
                        $pictureBox.focus();
                        var pos = self.getCurrentRange();
                        var $currentContainer = self.setImgToEditableDiv(pos,$pictureItem, pictureDomItem);
                        if(!$currentContainer){
                            return false;
                        }
                        var currentNode = $("#richText_content_div").find("#" + fileID);
                        pos.collapse(true);
                        pos.setStart(currentNode[0],1);
                        pos.setEnd(currentNode[0],1);
                        self.restoreSelection(pos);
                        self.selectedRange = pos;
                        $pictureBox.focus();
                    }).error(function (jqXHR, textStatus, errorThrown) {
                        mCommon_basicLoadingRemove();//删除loading层
                        alert("图片上传失败,请稍候再试");
                    });
                }
            });
        }
    },
    /**
     * 添加图片到可编辑div中
     * @param $pictureItem
     * @param pictureDomItem
     */
    setImgToEditableDiv: function (pos,$pictureItem, pictureDomItem) {
        var self = this;
        var $currentContainer = null;
        var currentStartOffset = 0;
        if (pos) {
            var container = pos.startContainer;
            currentStartOffset = pos.startOffset;
            if (!container.tagName && container.nodeName == "#text" && container.nodeType == "3") {
                $currentContainer = $(pos.startContainer.parentElement);
                var textLength = container.length;
                var contentString = $currentContainer.html();
                var preContentLength = contentString.length;
                if (preContentLength == 0) {
                    $currentContainer.append($pictureItem);
                } else {
                    $currentContainer.html(contentString.substr(0, preContentLength + currentStartOffset) + pictureDomItem + contentString.substr(preContentLength + currentStartOffset, preContentLength));
                }
            } else if (container.tagName == "P") {
                $currentContainer = $(pos.startContainer);
                $currentContainer.after(pictureDomItem);
            } else if (container.tagName == "DIV") {
                $currentContainer = $(pos.startContainer);
                //最外层div
                $currentContainer.append(pictureDomItem);
            } else {
                $currentContainer = $(pos.startContainer.parentElement);
                var contentString = $currentContainer.html();
                var preContentLength = contentString.length;
                if (preContentLength == 0) {
                    $currentContainer.append($pictureItem);
                } else {
                    $currentContainer.html(contentString.substr(0, preContentLength) + pictureDomItem);
                }
            }
        }
        return $currentContainer;
    },
    getCurrentRange: function () {
        var sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            return sel.getRangeAt(0);
        }
    },
    restoreSelection: function (selectedRange) {
        var self = this;
        var oldSelectRange = null;
        if(selectedRange){
            oldSelectRange = selectedRange;
        }else {
            oldSelectRange =self.selectedRange;
        }
        var selection = window.getSelection();
        if (oldSelectRange) {
            try {
                selection.removeAllRanges();
            } catch (ex) {
                document.body.createTextRange().select();
                document.selection.empty();
            }
            selection.addRange(oldSelectRange);
        }
    },

// 激活表情工具
    enableExpressionTool: function () {
        var self = this;

        /**
         * obj : 绑定对象
         * contentObj : 内容区域
         */
        return function () {
            $("*[faceStr]").bind("tap", function () {
                var faceStr = $(this).attr("faceStr");
                self.appendTopicContent(faceStr);
            });
            $("#contentDeleteP").unbind("click").bind("click", function () {
                var obj = $("#_shareText")[0];
                var pos = self.getPosition(obj);
                obj.value = obj.value.substr(0, pos - 1) + obj.value.substr(pos, obj.value.length);
                self.setSelect(obj, pos - 1);
            });

        }
    }
    ,
// 激活@人工具
    enableAtPersonTool: function () {
        var self = this;

        function setContent(contentObj, data) {

        }

        /**
         * obj : 绑定对象
         * contentObj : 内容区域
         */
        return function (obj, contentObj, callBack) {
            if (!obj || !contentObj) {
                return null
            }
            // 绑定按钮
            obj.bind("tap", function () {

            });

        }
    }
    ,
// 激活地理为知工具
    enableLocationTool: function () {
        var self = this;

        function setContent(contentObj, data, callBack) {
            contentObj.html("");
            var $positionTr = $("#_position_template_table").find("tr").clone();
            var currentDate = new Date().format("yyyy-MM-dd HH:mm:ss");
            if (self.currentTopicPreset.isDefaultLocation && self.currentTopicPreset.isDefaultLocation == '1') {
                $positionTr.find(".mReleaseMessage_info_positionTime").html(currentDate);
                $positionTr.find(".mCommon_basicLocation_tableDel").hide();
            } else {
                $positionTr.find(".mCommon_basicLocation_tableDel").bind("tap", function (e) {
                    contentObj.empty();
                    $('.mReleaseMessage_info').find(".mReleaseMessage_info_edit_position").hide();
                    self.currentLbsData = null;
                    e.stopPropagation();
                });
            }
            $positionTr.find(".mCommon_basicLocation_tableTextTitle").html(data.name);
            $positionTr.bind("tap", function (e) {
                var _isEdit = true;
                if (self.currentTopicPreset.isDefaultLocation && self.currentTopicPreset.isDefaultLocation == '1') {
                    _isEdit = false;
                }
                initMapEvent($("#bodyWrap"), null, null, _isEdit, function (lbsData) {
                    setContent(contentObj, lbsData);
                });
            })
            $positionTr.show();
            contentObj.append($positionTr);
            self.currentLbsData = data;
            self.currentLbsData.isFixed = self.currentTopicPreset.isDefaultLocation == 1 ? true : false;
            self.currentLbsData.gpsTimestamp = currentDate;
            $('.mReleaseMessage_info').find(".mReleaseMessage_info_edit_position").show();
            mReleaseMessage_info_arrowPos();
            mReleaseMessage_info_textareaH($(".mReleaseMessage_info_edit"));
            mReleaseMessage_info_imageSize($('.mReleaseMessage_info_imageBox')); //图片计算尺寸
        }

        /**
         * obj : 绑定对象
         * contentObj : 内容区域
         */
        return function (obj, contentObj, callBack) {
            if (!obj || !contentObj) {
                return null
            }
            // 绑定按钮
            obj.bind("tap", function () {
                $("#_shareText").blur();
                var _isEdit = true;
                if (self.currentTopicPreset.isDefaultLocation && self.currentTopicPreset.isDefaultLocation == '1') {
                    _isEdit = false;
                }

                initMapEvent($("#bodyWrap"), null, null, _isEdit, function (lbsData) {
                    setContent(contentObj, lbsData);
                })


            });

        }
    }
    ,

// 激活地理为知工具
    enableRichTextLocationTool: function () {
        var self = this;

        function setContent(contentObj, data) {
            var $positionTr = $("#_location_template").find("tr").clone();
            contentObj.html("");
            $positionTr.find(".mCommon_basicLocation_tableTextTitle").html(data.locationName);
            $positionTr.find("i").html(data.name);
            $(".mPicTextPush_edit_location").show();
            contentObj.append($positionTr);
            self.currentLbsData = data;
            self.currentLbsData.isFixed = self.currentTopicPreset.isDefaultLocation == 1 ? true : false;
            self.currentLbsData.gpsTimestamp = new Date().format("yyyy-MM-dd HH:mm:ss");
        }

        /**
         * obj : 绑定对象
         * contentObj : 内容区域
         */
        return function (obj, contentObj) {
            if (!obj || !contentObj) {
                return null
            }
            // 绑定按钮
            obj.bind("tap", function () {
                var _isEdit = true;
                if (self.currentTopicPreset.isDefaultLocation && self.currentTopicPreset.isDefaultLocation == '1') {
                    _isEdit = false;
                }
                initMapEvent($("#bodyWrap"), null, null, _isEdit, function (lbsData) {
                    setContent(contentObj, lbsData);
                });

            });

        }
    }
    ,


// 激活话题工具
    enableTopicTool: function () {
        var self = this;

        function setContent(contentObj, data) {

        }

        /**
         * obj : 绑定对象
         * contentObj : 内容区域
         */
        return function (obj, contentObj, callBack) {
            if (!obj || !contentObj) {
                return null
            }
            // 绑定按钮
            obj.bind("tap", function () {

            });

        }
    }
    ,
    cleanCacheData: function (pullUpObj, listBox) {
        var self = this;
        pullUpObj && pullUpObj.clearPullUp();//清除上拉事件
        $(window).scrollTop(0);//滚动条归位
        listBox.empty();
    }
    ,
    setSelect: function (ctrl, pos) {
        if (ctrl.setSelectionRange) {//
            //ctrl.focus();
            setTimeout(function () {
                ctrl.setSelectionRange(pos, pos);
                ctrl.blur();
            }, 0);
        } else if (ctrl.createTextRange) {
            var range = ctrl.createTextRange();
            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
    }
    ,

    getPosition: function (obj) {
        var result = 0;
        if (obj.selectionStart || 0 == obj.selectionStart) { //IE以外
            result = obj.selectionStart
        } else { //IE
            var rng;
            if (obj.tagName == "textarea") { //TEXTAREA
                rng = event.srcElement.createTextRange();
                rng.moveToPoint(event.x, event.y);
            } else { //Text
                rng = document.selection.createRange();
            }
            rng.moveStart("character", -event.srcElement.value.length);
            result = rng.text.length;
        }
        return result;
    }
    ,
    checkMaxInputLength: function (shareText) {
        if (null == shareText || "" == shareText.trim()) {
            return 0;
        } else {
            return shareText.length;
        }
    }
    ,
    checkGroupPerson: function (groupID) {
        var boo = true;
        if (!groupID) {
            return boo;
        }

        var data = {
            groupIDs: groupID
        };
        $.ajax({
            url: _ctxPath + '/complexsearch/checkGroupScope.json',
            dataType: 'json',
            data: data,
            async: false,
            success: function (json) {
                var groupName = json.groupName;
                if (1009 != json.groupStatus && 1010 != json.groupStatus) {
                    var content = "您现在不在此群组内，需要先加入，才能向群组发消息。";
                    if (groupName) {
                        content = "您现在不在" + groupName + "群组内，需要先加入，才能向群组发消息。";
                    }
                    alert(content);
                    boo = false;
                } else if (32 == json.userGroupStatus) {
                    var content = "群组已经关闭，请联系管理员。";
                    if (groupName) {
                        content = groupName + "群组已经关闭，请联系管理员。";
                    }
                    alert(content);
                    boo = false;
                } else {
                    boo = true;
                }
            }
        });
        return boo;
    }
    ,
    initAtPersonShareText: function () {
        var self = this;
        var shareText = $("#_shareText").val();
        if (self.atPersonMap) {
            for (var key in self.atPersonMap) {
                var name = self.atPersonMap[key];
                if (shareText.indexOf("@" + name) == -1) {
                    delete  self.atPersonMap.key;
                }
            }
        }
    }
    ,

    publishFormFeed: function (publishBtn, formRecordID, message, sendType) {
        var self = this;
        var personId = {};
        var groupId = {};
        var categoryId = {};
        var gNum = 0;
        var pNum = 0;
        var groupID = null;
        for (var i = 0; i < self.itemArray.length; i++) {
            var item = self.itemArray[i];
            if (sendType == 'person') {
                pNum++;
                personId[item.id] = item.name;
            } else if (sendType == 'group') {
                gNum++;
                groupId[item.id] = item.name;
                groupID = item.realValue;
            }
        }
        if (!self.checkGroupPerson(groupID)) {
            publishBtn.removeAttr("disabled");
            return;
        }
        if (sendType == "group") {
            if (gNum == 0) {
                var content = "请选择一个群组发送消息"
                self.showOpanel(content);
                publishBtn.removeAttr("disabled");
                return;
            }
        }
        if (sendType == "person") {
            if (pNum == 0) {
                var content = "请选择或输入成员后发送"
                self.showOpanel(content);
                publishBtn.removeAttr("disabled");
                return;
            }
        }
        var feedModel = {
            text: '',
            personIds: '', // 逗号隔开分享人IDS
            groupIds: '', // 逗号隔开GROUPIDS
            categoryIds: '',
            tags: ''
        };
        feedModel.formRecordID = formRecordID;
        feedModel.infoType = "11";
        if (self.currentTopicPreset) {
            feedModel.tagNames = self.currentTopicPreset.companyMenuName;
            feedModel.formID = self.currentTopicPreset.formID;
            var tagIDs = [];
            tagIDs.push(self.currentTopicPreset.companyMenuID);
            var tagClasss = [];
            tagClasss.push(self.currentTopicPreset.companyMenuClass || "");
            feedModel.tagIDs = tagIDs;
            feedModel.tagClasss = tagClasss;
        }
        feedModel.personIds = personId;
        feedModel.groupIds = groupId;
        feedModel.categoryIds = categoryId;
        if (self.toGroupID) {
            self.publishFeed($.toJSON(feedModel), publishBtn);
        } else {
            if (self.currentTopicPreset && self.currentTopicPreset.topicPresetID) {
                feedModel.topicID = self.currentTopicPreset.topicPresetID;
            }
            self.publishFeed($.toJSON(feedModel), publishBtn);
        }
    }
    ,
// 发送短文本类信息流(包括群组)
    publishFeedForShortText: function (shareText, sendType, publishBtn) {
        var self = this;
        var length = this.checkMaxInputLength(shareText);
        if (length > self.contentMaxLength) {
            // 超过最大值；
            var content = "最大输入1000字";
            self.showOpanel(content);
            publishBtn.removeAttr("disabled");
            return;
        }
        var personId = {};
        var groupId = {};
        var categoryId = {};
        var gNum = 0;
        var pNum = 0;
        var groupID = null;

        for (var i = 0; i < self.itemArray.length; i++) {
            var item = self.itemArray[i];
            if (sendType == 'person') {
                pNum++;
                personId[item.id] = item.name;
            } else if (sendType == 'group' || sendType == "toGroup") {
                gNum++;
                groupId[item.id] = item.name;
                groupID = item.realValue;
            }
        }
        if (!self.checkGroupPerson(groupID)) {
            publishBtn.removeAttr("disabled");
            return;
        }
        if (sendType == "group") {
            if (gNum == 0) {
                var content = "请选择一个群组发送消息"
                self.showOpanel(content);
                publishBtn.removeAttr("disabled");
                return;
            }
        }
        if (sendType == "person") {
            if (pNum == 0) {
                var content = "请选择或输入成员后发送"
                self.showOpanel(content);
                publishBtn.removeAttr("disabled");
                return;
            }
        }

        var feedModel = {
            text: '',
            personIds: '', // 逗号隔开分享人IDS
            groupIds: '', // 逗号隔开GROUPIDS
            categoryIds: '',
            tags: ''
        };
        // 禁用按钮
        self.initAtPersonShareText();
        feedModel.text = shareText;
        feedModel.personIds = personId;
        feedModel.groupIds = groupId;
        feedModel.categoryIds = categoryId;
        //feedModel.sendAtNotice = "sendAtNotice";
        if (self.currentLbsData) {
            feedModel.lbsMapList = [self.currentLbsData];
        }
        feedModel.atPersonMap = self.atPersonMap;
        if (self.fileIDArray && self.fileIDArray.length > 0) {
            feedModel.picID = self.fileIDArray.join(",");
        }

        if (self.currentTopicPreset) {
            feedModel.tagNames = self.currentTopicPreset.companyMenuName;
            var tagIDs = [];
            tagIDs.push(self.currentTopicPreset.companyMenuID);
            var tagClasss = [];
            tagClasss.push(self.currentTopicPreset.companyMenuClass || "");
            feedModel.tagIDs = tagIDs;
            feedModel.tagClasss = tagClasss;
        }
        if (!$.trim(feedModel.text) && !feedModel.picID && !feedModel.lbsMapList) {
            var content = "请输入内容";
            self.showOpanel(content);
            publishBtn.removeAttr("disabled");
            return;
        } else if (!feedModel.text && feedModel.picID) {
            feedModel.text = "分享了图片";
        } else if (!feedModel.text && feedModel.lbsMapList) {
            feedModel.text = "分享了地址位置";
        }
        if (self.toGroupID) {
            self.publishFeed($.toJSON(feedModel));
        } else {
            if (self.currentTopicPreset && self.currentTopicPreset.topicPresetID) {
                feedModel.topicID = self.currentTopicPreset.topicPresetID;
            }
            self.publishFeed($.toJSON(feedModel));
        }
    }
    ,
// 发信息流请求
    publishFeed: function (myFeed, publishBtn) {
        var self = this;
        var options = {
            url: _ctxPath + "/r/mp/pfd",
            dataType: 'json',
            type: "POST",
            async: false,
            data: {parseString: myFeed},
            success: function (data) {
                // if (publishBtn) {
                //     publishBtn.attr("disabled", "disabled");
                // }
                publishFeedToolBar.saveTopicPresetPerson(self.currentTopicPreset.topicPresetID, "", function () {
                    window.location = document.referrer;
                });
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                if (publishBtn) {
                    publishBtn.removeAttr("disabled");
                }

                var popup = new mCommon_controlPagePopupPrompt_setPromptInfo({
                    promptImg: self.failPic,
                    promptText: "网络异常,稍后重试",
                    setTimeVal: 2000,
                    closeFun: function () {
                        //do nothing
                    }
                });
            }
        };
        $.ajax(options);
    }
    ,
    /**
     * 获取图文推送内容
     * @param shareText
     * @param richTextTemplateID
     * @returns {{title: (*|jQuery), summary: (*|jQuery), richTextTemplateID: (*|string), coverPicID: *, context: *, canFeedBack: (*|jQuery)}}
     */
    getRichTextByDiv: function (shareText, richTextTemplateID) {
        var self = this;
        var title = $("#_richText_title").val();
        var length = this.checkMaxInputLength(title);
        if (length == 0 || length > 60) {
            // 超过最大值；
            var content = "此项不能为空且最多输入30个汉字";
            self.showOpanel(content);
            return false;
        }
        var summary = $("#_richText_summary_area").val();
        var canFeedBack = $("#_canFeedBack").attr("canFeedBack");
        if (null != summary && "" != summary) {
            summary = $("<div></div>").html(summary).text();
        }
        if (null != shareText && "" != shareText) {
            shareText = shareText.replace(new RegExp("&lt;", "gm"), "##lt##;");
            shareText = shareText.replace(new RegExp("&gt;", "gm"), "##gt##;");
        }
        if ("yes" === canFeedBack) {
            canFeedBack = "1";
        } else {
            canFeedBack = "0";
        }
        var richText = {
            title: title,
            summary: summary,
            richTextTemplateID: richTextTemplateID || "2",
            coverPicID: self.richTextFaceID,
            context: shareText,
            canFeedBack: canFeedBack
        };
        return richText;
    }
    ,
    /**
     * 发送图文推送信息流
     * @param shareText
     * @param sendType
     * @param publishBtn
     */
    publishRichTextFeed: function (richTextContent, richTextTemplateID, sendType, publishBtn) {
        var self = this;
        var richText = self.getRichTextByDiv(richTextContent, richTextTemplateID);
        if (!richText) {
            publishBtn.removeAttr("disabled");
            return false;
        }
        var personId = {};
        var groupId = {};
        var categoryId = {};
        var gNum = 0;
        var pNum = 0;
        var groupID = null;
        for (var i = 0; i < self.itemArray.length; i++) {
            var item = self.itemArray[i];
            if (sendType == 'person') {
                pNum++;
                personId[item.id] = item.name;
            } else if (sendType == 'group') {
                gNum++;
                groupId[item.id] = item.name;
                groupID = item.realValue;
            }
        }
        if (!self.checkGroupPerson(groupID)) {
            publishBtn.removeAttr("disabled");
            return false;
        }
        if (sendType == "group") {
            if (gNum == 0) {
                var content = "请选择一个群组发送消息"
                self.showOpanel(content);
                publishBtn.removeAttr("disabled");
                return false;
            }
        }
        if (sendType == "person") {
            if (pNum == 0) {
                var content = "请选择或输入成员后发送"
                self.showOpanel(content);
                publishBtn.removeAttr("disabled");
                return false;
            }
        }
        //信息流对象
        var feedModel = {
            text: '',
            personIds: '', // 逗号隔开分享人IDS
            groupIds: '', // 逗号隔开GROUPIDS
            categoryIds: categoryId,
            tags: ''
        };
        if (self.currentLbsData) {
            feedModel.lbsMapList = [self.currentLbsData];
        }
        feedModel.personIds = personId;
        feedModel.groupIds = groupId;
        //构造填充tagID,tagName
        if (self.currentTopicPreset) {
            feedModel.tagNames = self.currentTopicPreset.companyMenuName;
            var tagIDs = [];
            tagIDs.push(self.currentTopicPreset.companyMenuID);
            var tagClasss = [];
            tagClasss.push(self.currentTopicPreset.companyMenuClass || "");
            feedModel.tagIDs = tagIDs;
            feedModel.tagClasss = tagClasss;
        }
        //设置富文本
        feedModel.richText = richText;
        self.publishRichText($.toJSON(feedModel));
    }
    ,
    /**
     * 图文推送发送
     * @param myFeed
     */
    publishRichText: function (myFeed) {
        var self = this;
        var options = {
            url: _ctxPath + "/r/mp/prt",
            dataType: 'JSON',
            type: 'POST',
            async: false,
            data: {parseString: myFeed},
            success: function (data) {
                window.history.back();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                var popup = new mCommon_controlPagePopupPrompt_setPromptInfo({
                    promptImg: self.failPic,
                    promptText: "网络异常,稍后重试",
                    setTimeVal: 2000,
                    closeFun: function () {
                        //do nothing
                    }
                });
            }
        }
        $.ajax(options);
    }
    ,
    /**
     * 获取最近10条联系人
     * @param topicID
     */
    recentTopicContact: function (option) {
        var self = this;
        var topicID = self.currentTopicPreset.topicPresetID;
        var options = {
            url: _ctxPath + "/r/mp/gttls/" + topicID,
            dataType: "JSON",
            data: null,
            type: 'GET',
            success: function (result) {
            },
            error: function () {
                var popup = new mCommon_controlPagePopupPrompt_setPromptInfo({
                    promptImg: self.failPic,
                    promptText: "网络异常,稍后重试",
                    setTimeVal: 2000,
                    closeFun: function () {
                        //do nothing
                    }
                });
            }
        };
        $.extend(true, options, option);
        $.ajax(options);
    }
    ,
    /**
     * 获取全部联系人
     * @param companyID
     * @param term
     * @param page
     * @param count
     */
    listAllContact: function () {
        var self = this;
        var companyID = $("#companyID").val();
        var nextPageNumber = 0;
        var oldTerm = "";
        var requestq;
        var isPullup = true;
        return function (callBack, listBox, term, callBack2, isInputi) {
            if (isInputi) {
                nextPageNumber = 0;
                oldTerm = term;
                isPullup = false;
            } else {
                isPullup = true;
            }
            nextPageNumber++;
            if (requestq) {
                requestq.abort();
            }
            requestq = $.ajax({
                url: _ctxPath + "/contact/listContlistContactact.json",
                data: {
                    companyID: companyID,
                    term: term,
                    page: nextPageNumber,
                    count: 20
                },
                dataType: "JSON",
                type: "POST",
                async: false,
                success: function (data) {
                    if (!isPullup) {
                        listBox.empty();
                    }
                    var more = true;
                    if (nextPageNumber == 1 && (!data || !data.result.dataList || data.result.dataList.length == 0)) {
                        more = false;
                        $(".mReleaseMessage_info_cSelectContactsNullBox").eq(0).show();
                    } else {
                        $(".mReleaseMessage_info_cSelectContactsNullBox").eq(0).hide();
                        var totalSize = data.result.totalSize;
                        var contactList = data.result.dataList;
                        nextPageNumber = nextPageNumber;
                        self.constractContactList(contactList, listBox, callBack2)
                        if ((totalSize >= 20 && (totalSize / 20 - nextPageNumber) < 0) || (totalSize < 20 && nextPageNumber > 0)) {
                            more = false;
                        }
                    }
                    callBack && callBack.call(this, more);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    if (textStatus != "abort") {
                        var popup = new mCommon_controlPagePopupPrompt_setPromptInfo({
                            promptImg: self.failPic,
                            promptText: "网络异常,稍后重试",
                            setTimeVal: 2000,
                            closeFun: function () {
                                //do nothing
                            }
                        });
                    }
                }
            });
        }
    }
    ,
    /**
     * 构造联系人列表
     * @param result
     * @param listBox
     */
    constractContactList: function (contactList, listBox, callBack) {
        var self = this;
        if (null != contactList) {
            for (var i = 0; i < contactList.length; i++) {
                var contact = contactList[i];
                var name = contact.name;//名字
                var department = contact.department;//公司
                var position = contact.position;//职位
                var picUrl = _ctxPath + "/file/loadPic.img?personID=" + contact.personID;
                if (!name || null == name || '' == name) {
                    continue;
                }
                var template = self.contactTemplate.clone();
                if (listBox.find("*[personID='" + contact.personID + "']").size() > 0) {
                    continue;
                }
                template.attr("personID", contact.personID);
                template.attr("personName", name);
                template.find(".mCommon_basicAddressListOptional_peopleName").html(name);
                template.find(".mCommon_basicAddressListOptional_headPicBox").find("img").attr("src", picUrl);
                if (department || position) {
                    template.find("#_position").html(position);
                    template.find("#_comapnyName").html(department);
                }
                template.bind("tap", function () {
                    var personID = $(this).attr("personID");
                    var personName = $(this).attr("personName");
                    var personArray = {
                        id: personID,
                        name: personName
                    };
                    callBack && callBack.call(self, personArray);

                });
                listBox.append(template);
            }
        }
    }
    ,
    /**
     * 获取草稿内容
     * @param recentTopicScopeID
     */
    findTempContentByID: function (recentTopicScopeID) {
        var options = {
            url: _ctxPath + "/mp/ftcd/" + recentTopicScopeID,
            type: 'GET',
            dataType: 'JSON',
            data: null,
            success: function (result) {
            },
            error: function () {
                var popup = new mCommon_controlPagePopupPrompt_setPromptInfo({
                    promptImg: self.failPic,
                    promptText: "网络异常,稍后重试",
                    setTimeVal: 2000,
                    closeFun: function () {
                        //do nothing
                    }
                });
            }
        };
        $.ajax(options);
    }
    ,
    /**
     * 保存草稿内容
     * @param recentTopicScopeID
     */
    saveTempContentByTopicID: function (recentTopicScopeID) {
        var options = {
            url: _ctxPath + "/r/mp/stct/" + recentTopicScopeID,
            type: 'GET',
            dataType: 'JSON',
            data: null,
            success: function (result) {
            },
            error: function () {
                var popup = new mCommon_controlPagePopupPrompt_setPromptInfo({
                    promptImg: self.failPic,
                    promptText: "网络异常,稍后重试",
                    setTimeVal: 2000,
                    closeFun: function () {
                        //do nothing
                    }
                });
            }
        };
        $.ajax(options);
    }
    ,
// 构造话题列表
    constructTopicHotList: function (list, listBox, callBack) {
        var self = this;
        listBox.empty();
        if (list) {
            for (var i = 0; i < list.length; i++) {
                var topic = list[i];
                var topicName = topic.topicName;
                var size = listBox.find("*[topicName='" + topicName + "']").size();
                if (size > 0) {
                    continue;
                }
                var $topicDiv = $("#_template_topic_div").clone();
                topicName = topicName.replace(/#/ig, "");
                var title = topicName;
                if (topicName.length > 22) {
                    topicName = topicName.substring(0, 19) + "...";
                }
                $topicDiv.find(".mCommon_basicTopic_topicContent").html(topicName);
                $topicDiv.attr("topicName", title);
                $topicDiv.bind("tap", function (e) {
                    var topicName = $(this).attr("topicName");
                    self.appendTopicContent("#" + topicName + "# ", true);
                    callBack && callBack.call(self);
                });
                $topicDiv.show();
                listBox.append($topicDiv);
            }
        }
    }
    ,
    appendTopicContent: function (content, boo) {
        var self = this;
        //插入文本之前先做判断，同一话题不能插入两次
        var obj = $("#_shareText")[0];
        var pos = self.getPosition(obj);
        obj.value = obj.value.substr(0, pos) + content + obj.value.substr(pos, obj.value.length);
        self.setSelect(obj, obj.value.length);

    }
    ,
// 查询人们话题
    findAllTopicHot: function (callBack) {
        var self = this;
        var options = {
            url: _ctxPath + "/r/mp/fathl",
            type: 'GET',
            dataType: 'JSON',
            data: null,
            success: function (result) {
                callBack && callBack.call(self, result);
            },
            error: function () {
                var popup = new mCommon_controlPagePopupPrompt_setPromptInfo({
                    promptImg: self.failPic,
                    promptText: "网络异常,稍后重试",
                    setTimeVal: 2000,
                    closeFun: function () {
                        //do nothing
                    }
                });
            }
        };
        $.ajax(options);

    }
    ,
// 模糊查询话题
    findAllTopicHotByPerson: function (input, callBack) {
        var options = {
            url: _ctxPath + "/r/mp/fatbp",
            type: 'GET',
            dataType: 'JSON',
            data: {input: input},
            success: function (result) {
                callBack && callBack.call(self, result);
            },
            error: function () {
                var popup = new mCommon_controlPagePopupPrompt_setPromptInfo({
                    promptImg: self.failPic,
                    promptText: "网络异常,稍后重试",
                    setTimeVal: 2000,
                    closeFun: function () {
                        //do nothing
                    }
                });
            }
        };
        $.ajax(options);

    }
    ,

// 查询我的群组
    getMyGroupListByPerson: function () {
        var self = this;
        var nextPageNumber = 0;
        var oldInput = "";
        return function (input, listBox, callBack1, callBack2) {
            if (oldInput != input) {
                nextPageNumber = 0;
                oldInput = input;
            }
            nextPageNumber++;
            var options = {
                url: _ctxPath + "/r/mp/gmgl",
                type: 'GET',
                dataType: 'JSON',
                data: {
                    nextPageNumber: nextPageNumber,
                    pageMaxSize: 20,
                    groupName: input
                },
                success: function (data) {
                    var more = true;
                    if (nextPageNumber == 1 && (!data || !data._page_info.dataList || data._page_info.dataList.length == 0)) {
                        more = false;
                        $(".mReleaseMessage_info_cSelectGroupNullBox").show();
                    } else {
                        $(".mReleaseMessage_info_cSelectGroupNullBox").hide();
                        var totalSize = data._page_info.totalSize;
                        nextPageNumber = data._page_info.currentPageNumber;
                        var groupList = data._page_info.dataList;
                        self.constructMyGroupList(groupList, listBox, callBack2);
                        if ((totalSize >= 20 && (totalSize / 20 - nextPageNumber) < 0) || (totalSize < 20 && nextPageNumber > 0)) {
                            more = false;
                        }
                    }
                    callBack1 && callBack1.call(self, more);
                },
                error: function () {
                    var popup = new mCommon_controlPagePopupPrompt_setPromptInfo({
                        promptImg: self.failPic,
                        promptText: "网络异常,稍后重试",
                        setTimeVal: 2000,
                        closeFun: function () {
                            //do nothing
                        }
                    });
                }
            };
            $.ajax(options);
        }

    }
    ,
//  构造我的群组
    constructMyGroupList: function (groupList, listBox, callBack) {
        var self = this;
        listBox.empty();
        if (groupList) {
            for (var i = 0; i < groupList.length; i++) {
                var group = groupList[i];
                var $groupDiv = $("#_templateGroup_div").clone();
                $groupDiv.find(".mCommon_basicHeadPicAndDesc_title").html(group.groupName);
                var url = _ctxPath + '/file/loadPic.img?groupID=' + group.groupID + "&t=" + new Date();
                $groupDiv.find("img").attr("src", url);
                $groupDiv.data("groupName", group.groupName);
                $groupDiv.data("groupID", group.groupID);
                $groupDiv.bind("tap", function (e) {
                    var groupName = $(this).data("groupName");
                    var groupID = $(this).data("groupID");
                    self.itemArray = [{
                        id: group.groupID,
                        name: groupName
                    }];
                    callBack && callBack.call(self, self.itemArray);
                });
                $groupDiv.show();
                listBox.append($groupDiv);
            }
        }
    }
    ,
    findTopicPresetPerson: function (topicPresetID, callBack) {
        var options = {
            url: _ctxPath + "/topicpersonpreset/getTopicPersonPresetTemContent.json",
            type: 'GET',
            dataType: 'JSON',
            data: {topicPresetID: topicPresetID},
            success: function (result) {
                callBack && callBack.call(self, result);
            },
            error: function () {
                var popup = new mCommon_controlPagePopupPrompt_setPromptInfo({
                    promptImg: self.failPic,
                    promptText: "网络异常,稍后重试",
                    setTimeVal: 2000,
                    closeFun: function () {
                        //do nothing
                    }
                });
            }
        };
        $.ajax(options);
    }
    ,
// 保存草稿
    saveTopicPresetPerson: function (topicPresetID, tmpSaveContent, callBack) {
        var self = this;
        var options = {
            url: _ctxPath + "/topicpersonpreset/updateTopicPersonPresetTemContent.json",
            type: 'GET',
            dataType: 'JSON',
            data: {topicPresetID: topicPresetID, tmpSaveContent: tmpSaveContent},
            success: function (result) {
                callBack && callBack.call(self, result);
            },
            error: function () {
                var popup = new mCommon_controlPagePopupPrompt_setPromptInfo({
                    promptImg: self.failPic,
                    promptText: "网络异常,稍后重试",
                    setTimeVal: 2000,
                    closeFun: function () {
                        //do nothing
                    }
                });
            }
        };
        $.ajax(options);

    }
    ,
// 确认弹窗
    confirmOpanel: function (content, btn1Content, btn2Content, callBack1, callBack2) {
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
            callBack1 && callBack1.call(self);
            e.stopPropagation();
        });
        buttonObj.find("a").eq(1).bind("tap", function (e) {
            popup.hidePopup();
            callBack2 && callBack2.call(self);
            e.stopPropagation();
        });
        popup.showPopup();
    }
    ,
    showOpanel: function (content, callBack) {
        var self = this;
        var popup = new mCommon_controlPagePopupPrompt_setPromptInfo({
            promptImg: self.failPic,
            promptText: content,
            setTimeVal: 2000,
            closeFun: function () {
                callBack && callBack.call();
            }
        });
    }
})
;