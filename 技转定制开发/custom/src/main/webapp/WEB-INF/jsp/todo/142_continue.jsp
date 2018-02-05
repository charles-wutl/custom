<%@page contentType="text/html;charset=UTF-8" language="java" %>
<%--引入jstl、定义上下文对象ctxPath、国际化资源--%>
<%@include file="/common.jsp" %>

<!DOCTYPE html>
<html>
<input type="hidden" value="${companyID}" id="companyID">
<input type="hidden" value="${personID}" id="personID">
<input type="hidden" value="${access_token}" id="access_token">
<input type="hidden" value="${related_id}" id="related_id">
<input type="hidden" value="${continueData}" id="continueData">
<head>
    <title>${c5:i18n('i18n.todo.todo_continue',locale,'title')}</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1, user-scalable=no">
    <!--屏幕宽度等于设备宽度-->
    <meta content="blue" name="apple-mobile-web-app-status-bar-style"/>  <!--指定的iphone中safari顶端的状态条的样式-->
    <meta content="telephone=no" name="format-detection"/><!--ios告诉设备忽略将页面中的数字识别为电话号码-->
    <link rel="stylesheet" href="${ctxPath}/css/common20150324.css"/><!--跨平台公用css-->
    <link rel="stylesheet" href="${ctxPath}/css/mCommon20150108.css"/><!--公用css-->
    <script src="${ctxPath}/js/jquery-1.11.0.min.js"></script><!--基础js-->
    <script src="${ctxPath}/js/fastclick.js"></script><!--基础js-->
    <script src="${ctxPath}/js/mCommon20150212.js"></script><!--公用js-->
    <link rel="stylesheet" href="${ctxPath}/css/mCommon_frameContent15.css"/>

    <link rel="stylesheet" href="${ctxPath}/css/mCommon_basicBottomAdver.css"/>
    <link rel="stylesheet" href="${ctxPath}/css/mCommon_basicFlowChart.css"/>
    <link rel="stylesheet" href="${ctxPath}/css/mCommon_controlFormGroup.css"/>

    <!--表单控件-->
    <script src="${ctxPath}/js/mobiscroll.core.js" type="text/javascript"></script>
    <script src="${ctxPath}/js/mobiscroll.frame.js" type="text/javascript"></script>
    <script src="${ctxPath}/js/mobiscroll.scroller.js" type="text/javascript"></script>
    <script src="${ctxPath}/js/mobiscroll.listbase.js" type="text/javascript"></script>
    <script src="${ctxPath}/js/mobiscroll.treelist.js" type="text/javascript"></script>
    <script src="${ctxPath}/js/mobiscroll.frame.android-holo.js" type="text/javascript"></script>
    <script src="${ctxPath}/js/mobiscroll.util.datetime.js"></script>
    <script src="${ctxPath}/js/mobiscroll.datetimebase.js"></script>
    <script src="${ctxPath}/js/mobiscroll.datetime.js"></script>
    <script src="${ctxPath}/js/mobiscroll.android-holo-light.js"></script>

    <script src="${ctxPath}/js/mCommon_basicInputDatetime.js"></script>
    <link href="${ctxPath}/css/mobiscroll.frame.css" rel="stylesheet" type="text/css"/>
    <link href="${ctxPath}/css/mobiscroll.frame.android.css" rel="stylesheet" type="text/css"/>
    <link href="${ctxPath}/css/mobiscroll.frame.android-holo.css" rel="stylesheet"
          type="text/css"/>
    <link href="${ctxPath}/css/mobiscroll.scroller.css" rel="stylesheet" type="text/css"/>
    <link href="${ctxPath}/css/mobiscroll.scroller.android-holo.css" rel="stylesheet"
          type="text/css"/>
    <link href="${ctxPath}/css/mobiscroll.android-holo-light.css" rel="stylesheet"
          type="text/css"/>
    <link href="${ctxPath}/css/mCommon_basicInputDatetime.css" rel="stylesheet" type="text/css"/>
    <link rel="stylesheet" href="${ctxPath}/css/mCommon_basicInputText.css"/>
    <link rel="stylesheet" href="${ctxPath}/css/mCommon_basicInputTel.css"/>
    <link rel="stylesheet" href="${ctxPath}/css/mCommon_basicInputNum.css"/>
    <link rel="stylesheet" href="${ctxPath}/css/mCommon_basicSelect.css"/>
    <link rel="stylesheet" href="${ctxPath}/css/mCommon_basicTextArea.css"/>
    <link rel="stylesheet" href="${ctxPath}/css/mCommon_basicInputStar.css"/>
    <script src="${ctxPath}/js/mCommon_basicSelect.js"></script>
    <script src="${ctxPath}/js/mCommon_basicInputStar.js"></script>
    <link rel="stylesheet" href="${ctxPath}/css/mCommon_basicLoadBar.css"/>
    <link rel="stylesheet" href="${ctxPath}/css/mCommon_controlFileTool.css"/>
    <script src="${ctxPath}/js/stringCut.js"></script>
    <script src="${ctxPath}/js/mCommon_controlFileTool.js"></script>
    <link rel="stylesheet" href="${ctxPath}/css/mCommon_basicUploadBtn.css"/>
    <link rel="stylesheet" href="${ctxPath}/css/mCommon_basicBtn.css"/>
    <!--表单控件 end-->

    <script src="${ctxPath}/js/mCommon_jsImgCut0114.js"></script><!--图片剪裁-->
    <link rel="stylesheet" href="${ctxPath}/css/mCommon_controlThumbnail.css"/>
    <link rel="stylesheet" type="text/css" href="${ctxPath}/css/mCommon_basicVoice.css"/>
    <!--展开框-->
    <link rel="stylesheet" href="${ctxPath}/css/mCommon_basicLunchDom.css"/>
    <!--選擇聯絡人-->
    <%--<script src="${ctxPath}/js/mCommon_basicInputContact.js"></script>--%>
    <link href="${ctxPath}/css/mCommon_basicInputContact.css" rel="stylesheet" type="text/css"/>
    <link rel="stylesheet" href="${ctxPath}/css/mCommon_basicCrmForm.css"/>
    <script src="${ctxPath}/js/mCommon_basicCrmForm.js"></script>
    <!--单选文本控件-->
    <link rel="stylesheet" href="${ctxPath}/css/mCommon_basicSingleChoiceText.css"/>
    <!--页面内容-->
    <link rel="stylesheet" href="${ctxPath}/css/mCommon_frameContent15.css"/>
    <link rel="stylesheet" href="${ctxPath}/css/mCommon_controlFormGroup.css"/>
    <link rel="stylesheet" href="${ctxPath}/css/mCommon_basicCrmForm.css"/>
    <script src="${ctxPath}/js/mCommon_basicCrmForm.js"></script>
    <!--搜索-->
    <link rel="stylesheet" href="${ctxPath}/css/mCommon_basicSearch151124.css"/>
    <script src="${ctxPath}/js/mCommon_basicSearch151124.js"></script>
    <!--按钮-->
    <link rel="stylesheet" href="${ctxPath}/css/mCommon_basicBtn.css"/>
    <!--上划加载更多-->
    <link rel="stylesheet" href="${ctxPath}/css/mCommon_controlPullUpLoad.css"/>
    <script src="${ctxPath}/js/mCommon_controlPullUpLoad.js"></script>
    <!--顶部固定-->
    <link rel="stylesheet" href="${ctxPath}/css/mCommon_jsFixedTop.css"/>
    <script src="${ctxPath}/js/mCommon_jsFixedTop.js"></script>
    <!--开窗单选-->
    <link rel="stylesheet" href="${ctxPath}/css/mCommon_controlSingleChoiceText.css"/>
    <!--页面-->
    <link rel="stylesheet" href="${ctxPath}/css/mCommon_controlRelatedContent.css"/>
    <link rel="stylesheet" href="${ctxPath}/css/mCommon_basicSingleChoice.css"/>
    <script src="${ctxPath}/js/mCommon_basicSingleChoice.js"></script>
    <!--底部按钮-->
    <link rel="stylesheet" href="${ctxPath}/css/mCommon_basicBtnShop.css"/>
    <link rel="stylesheet" href="${ctxPath}/css/mCommon_controlShopInfoBottomBtn.css"/>
    <link rel="stylesheet" href="${ctxPath}/css/mCommon_controlShopOverlayBtn.css"/>
    <link rel="stylesheet" href="${ctxPath}/css/mCommon_frameContent0.css"/>

    <!--大家jssdk-->
    <script src="${ctxPath}/js/jdajia.js"></script>
    <!-- 压缩图片 -->
    <script src="${ctxPath}/js/exif.js"></script>
    <script src="${ctxPath}/js/lrz.js"></script>
    <script src="${ctxPath}/js/mobileFix.mini.js"></script>
    <!--弹出框-->
    <link rel="stylesheet" href="${ctxPath}/css/mCommon_framePopup.css"/>
    <script src="${ctxPath}/js/mCommon_framePopup.js"></script>
    <%-- 加载动画 --%>
    <link rel="stylesheet" href="${ctxPath}/css/mCommon_basicLoading.css"/>
    <script src="${ctxPath}/js/mCommon_basicLoading.js"></script>

    <link rel="stylesheet" href="${ctxPath}/css/mCommon_basicInfoList7.css"/>
    <!--固定一屏引入-->
    <script src="${ctxPath}/js/mCommon_jsFixedOneScreen.js" type="text/javascript" charset="utf-8"></script>

    <!--遮罩层引入-->
    <link rel="stylesheet" type="text/css" href="${ctxPath}/css/mCommon_basicMask.css"/>
    <script src="${ctxPath}/js/mCommon_basicMask.js" type="text/javascript" charset="utf-8"></script>
    <link rel="stylesheet" type="text/css" href="${ctxPath}/css/mCommon_controlPagePopupPrompt.css"/>
    <script src="${ctxPath}/js/mCommon_controlPagePopupPrompt.js" type="text/javascript" charset="utf-8"></script>

    <%-- 加载 鯨魚动画 --%>
    <link rel="stylesheet" href="${ctxPath}/css/mCommon_basicLoadinglogoWhale.css"/>
    <script src="${ctxPath}/js/mCommon_basicLoadinglogoWhale.js"></script>

</head>
<body>
<style>
    .mCommon_basicUploadBtn {
        background: none;
    }

    .mCRM_V2_156_create_footer {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: #fff;
        max-width:100%;
        margin: 0 auto;
        z-index: 10;
    }

    .mCommon_basicSingleChoiceText_list li {
        line-height: 20px;
        margin-top: 10px;
    }

    .mCommon_basicSingleChoiceText_list em {
        vertical-align: -10px;
    }

    .mCommon_basicBtn_box2Center {
        z-index: 9999;
    }

    .mCommon_controlSingleChoiceText_footer {
        padding: 0px 0px;
    }

    .mCommon_crm_singleContact_button {
        display: table-cell;
        vertical-align: middle;
        width: 40px;
        height: 40px;
        padding-left: 15px;
        box-sizing: border-box;
    }

    .mCommon_basicInputNum {
        padding: 7px 0;
    }

    .mCommon_basicCrmForm .mCommon_controlFormGroup_box {
        padding: 0;
    }

    .mCommon_basicCrmForm .mCommon_controlFormGroup_item_pic {
        float: none;
    }

    .mCommon_controlThumbnail {
        margin-left: 82px;
    }

</style>
<div class="mCommon_frameContent15_page mCommon_basicCrmForm">
    <!--此处插入头部-->
    <div class="mCommon_frameContent15_content">
        <!--此处插入内容-->
        <div class="mCommon_basicFlowChart_box">
            <ul class="mCommon_basicFlowChart_item mCommon_basicFlowChart_itemFinished">
                <li class="mCommon_basicFlowChart_itemContent">
                    <!--填报内容-->
                    <div class="mCommon_controlFormGroup_box paddingTop10">
                    </div>
                    <!--填报内容end-->
                    <!--开窗单选-->
                    <div class="mCommon_controlSingleChoiceText_box" id="choiceText">
                        <!--搜索-->
                        <div class="mCommon_basicSearch151124_box" id="search">
                            <!--按钮取消-->
                            <div class="mCommon_basicSearch151124_btnCancel">
                                <a href="javascript:void(0)">取消</a>
                            </div>
                            <!--搜索输入-->
                            <div class="mCommon_basicSearch151124">
                                <form>
                                    <div class="mCommon_basicSearch151124_inputWrapper">
                                        <!--搜索图标-->
                                        <em class="mCommon_basicSearch151124_icon"></em>
                                        <!--搜索图标 end-->
                                        <input placeholder="请输入搜索条件" value="" type="search">
                                        <input style="display: none;" type="text"><!--不显示input阻止回车时表单自动提交-->
                                    </div>
                                </form>
                                <!--清空-->
                                <div class="mCommon_basicSearch151124_clear"><em></em></div>
                                <!--清空end-->
                            </div>
                            <!--按钮搜索-->
                            <div class="mCommon_basicSearch151124_btnSearch">
                                <a href="javascript:void(0)">搜索</a>
                            </div>
                        </div>
                        <!--搜索 end-->
                        <!--单选内容-->
                        <ul class="mCommon_basicSingleChoiceTextList mCommon_basicSingleChoiceText_list marginTop40">
                        </ul>
                        <!--单选内容 end-->
                        <!--底部按钮-->
                        <div class="mCommon_controlSingleChoiceText_footer mCommon_basicBtn_boxCenter">

                            <a class="mCommon_basicBtn mCommon_basicBtn_gray" id="cancel"
                               tapclass="mCommon_basicBtn_blue_tap" style="margin-right:70px;color: #ffffff">
                                <i>取消</i>
                            </a>


                            <a class="mCommon_basicBtn mCommon_basicBtn_blue" id="sure"
                               tapclass="mCommon_basicBtn_blue_tap">
                                <i>确定</i>
                            </a>

                        </div>
                        <!--底部按钮 end-->
                    </div>
                    <!--开窗单选 end-->
                    <div style="height: 60px;background:#fff;bottom:0;left:0;width: 100%;z-index: 2;display: block; "></div>

                </li>
            </ul>
        </div>
        <div class="mCommon_controlShopOverlayBtn_box clearfix">
        </div>
    </div>
    <!--此处插入尾部-->

</div>

<div class="mCommon_frameContent0_page">
    <div class="mCommon_frameContent0_content">
        <div class="mCommon_controlShopOverlayBtn_box">
         <span class="mCommon_controlShopOverlayBtn" style="max-width:100%;left: inherit;">
                <div id="cancelBtn" class="left" style="width: 50%">
                    <a class="mCommon_basicBtnShop_silvery" tapclass="mCommon_basicBtnShop_silvery_tap"><i>
                        ${c5:i18n('i18n.todo.todo_continue',locale,'cancel')}

                    </i></a>
                </div>
                <div id="submitBtn" class="right" style="width: 50%">
                    <a class="mCommon_basicBtnShop_blue"
                       tapclass="mCommon_basicBtnShop_blue_tap"><i>
                        ${c5:i18n('i18n.todo.todo_continue',locale,'sure')}

                    </i></a>
                </div>
         </span>
        </div>
    </div>
</div>


<script type="text/javascript">
    var mCommon_basicCrmForm_dataArray = [
        {
            filedType: 'input',
            id: 'received_amount',
            filedTitle: '${c5:i18n('i18n.todo.todo_continue',locale,'amountReceived')}',
            placeholder: '${c5:i18n('i18n.todo.todo_continue',locale,'enterAmount')}',
            errorMsg: '错误提示错误提示',
            required: true
        },
        {
            filedType: 'input',
            id: 'job_duration',
            filedTitle: '${c5:i18n('i18n.todo.todo_continue',locale,'workingHours')}',
            placeholder: '${c5:i18n('i18n.todo.todo_continue',locale,'enter')}',
            errorMsg: '错误提示错误提示',
            required: true
        },
        {
            filedType: 'textarea',
            id: 'job_content',
            filedTitle: '${c5:i18n('i18n.todo.todo_continue',locale,'workRecord')}',
            placeholder: '${c5:i18n('i18n.todo.todo_continue',locale,'enter')}',
            errorMsg: '错误提示错误提示',
            required: false
        },
        {
            filedType: 'pic',
            filedTitle: '${c5:i18n('i18n.todo.todo_continue',locale,'photos')}',
            id: 'customerImg',
            placeholder: "${c5:i18n('i18n.todo.todo_continue',locale,'picUpload')}",
            filedDescript: "${c5:i18n('i18n.todo.todo_continue',locale,'picMax')}",
            errorMsg: '错误提示错误提示',
            required: false
        },
        {
            filedType: 'block',
            id: 'block1',
            height: '5px',
            bcolor: '#f4f4f4'
        },
        {
            filedType: 'calendar',
            id: 'start_time',
            filedTitle: '${c5:i18n('i18n.todo.todo_continue',locale,'startTime')}',
            placeholder: '${c5:i18n('i18n.todo.todo_continue',locale,'enter')}',
            filedDescript: '',
            errorMsg: '${c5:i18n('i18n.todo.todo_continue',locale,'startTime')}',
            required: true,
        },
        {
            filedType: 'calendar',
            id: 'finish_time',
            filedTitle: '${c5:i18n('i18n.todo.todo_continue',locale,'finishTime')}',
            placeholder: '${c5:i18n('i18n.todo.todo_continue',locale,'enter')}',
            filedDescript: '',
            errorMsg: '${c5:i18n('i18n.todo.todo_continue',locale,'finishTime')}',
            required: true
        },
        {
            filedType: 'textarea',
            id: 'next_subject',
            filedTitle: '${c5:i18n('i18n.todo.todo_continue',locale,'nextVisitSubject')}',
            placeholder: '${c5:i18n('i18n.todo.todo_continue',locale,'enter')}',
            errorMsg: '错误提示错误提示',
            required: true
        }
    ];

    var mCommon_basicCrmForm_imageArray = [];

    var contentObj = $('<p class="mCommon_framePopup_defaultText mCrm_customerInfo_tab01">發送成功</p>');
    var popupMD = new mCommon_framePopup({
        appendObj: $("body"),//浮出层和黑层显写入的容器
        contentObj: contentObj,//内容区显示的对象
        spaceClose: true,//点击空白关闭
        winScroll: true,//不允许滚动
        //非模态弹窗不显示黑层，不显示按钮，过一会自动消失
        modal: false,//是否为模态弹窗
        showTime: 2000,//非模态弹窗停留时间
        showCallback: function (a) {
            //alert("show"+a.showFrame.html());
        },//显示弹窗后的回调 参数this
        hideCallback: function (a) {
            //alert("hide"+a.showFrame.html());
        }//隐藏弹窗后的回调  参数this
    });

    //固定一屏  用于弹窗
    var mCommon_jsFixedOneScreen_setFixedOneScreenObj = new mCommon_jsFixedOneScreen_setFixedOneScreen();

    //遮罩层
    var mCommon_basicMask_setMaskObj = new mCommon_basicMask_setMask({
        zIndex: null,//设置遮罩层级，默认值为100，Number类型，选填，
        maskContainer: '',//要遮罩的容器，局部遮罩要传入容器，jquery类型,全局遮罩传空字符串，必填
        maskClickFun: function () {
        }//点击遮罩层时的回调函数，选填
    });

    function showDialog(text) {
        mCommon_jsFixedOneScreen_setFixedOneScreenObj.openFixedOneScreen({
            scrollVal: null,//scrollTop的值，选填，不填默认实际滚动值
            fixedOneScreenOpenFun: function () {
            }//固定一屏开启时的回调函数，选填
        });

        new mCommon_controlPagePopupPrompt_setPromptInfo({
            promptText: text,//提示的信息内容，字符串类型，必填
            setTimeVal: 2000,//出现时间，在到达此时间后，自动关闭提示信息，默认值为2000毫秒，number类型，选填
            closeFun: function () {
//					alert('回调完了');
                //删除遮罩层
                mCommon_basicMask_setMaskObj.removeMask();
                //关闭固定一屏
                mCommon_jsFixedOneScreen_setFixedOneScreenObj.closeFixedOneScreen({
                    scrollVal: null,//scrollTop的值，选填，不填默认开启时的滚动值
                    fixedOneScreenCloseFun: function () {
                    }//取消固定一屏时的回调函数，选填
                });
            }//关闭后的回调函数，选填
        });
    }

    function getImg() {
        var images = $('#customerImg').find('input')[0].files;
        var imgFile = new FileReader();
        var name = images[0].name;
        imgFile.readAsDataURL(images[0]);
        imgFile.onload = function () {
            var imgObj = {
                file_name: name,
                content: this.result//base64格式数据
            };
            //获取文件后缀名
            var fileExtension = imgObj.file_name.substring(imgObj.file_name.lastIndexOf('.') + 1);
            if (fileExtension == 'mp4' || fileExtension == 'MOV') {
                //IOS上傳視頻文件MP4,會壓縮成.MOV格式
//                contentObj.html("暂不支持上传视频");
                contentObj.html("${c5:i18n('i18n.todo.todo_continue',locale,'banVideo')}");
//                popupMD.showPopup();
                showDialog("${c5:i18n('i18n.todo.todo_continue',locale,'banVideo')}");

            }
            else {
                showImg(images, name);//显示图片
            }
        };
    }

    function showImg(images, name) {
        //base64
        var imageBase;

        //压缩图片
        lrz(images[0], {width: 350}, function (results) {
            // 你需要的数据都在这里，可以以字符串的形式传送base64给服务端转存为图片。
            imageBase = results.base64;
            //判断图片是否存在
            for (var i = 0; i < mCommon_basicCrmForm_imageArray.length; i++) {
                if (mCommon_basicCrmForm_imageArray[i].image === imageBase) {
                    console.log('该照片已存在');
                    contentObj.html("${c5:i18n('i18n.todo.todo_continue',locale,'pic_exists')}");
//                    popupMD.showPopup();
                    showDialog("${c5:i18n('i18n.todo.todo_continue',locale,'pic_exists')}");

                    return;
                }
            }

            //图片dom
            var picContentDom = $('<span  class="mCommon_controlThumbnail_item">' +
                '<ul class="mCommon_controlThumbnail_item_box">' +
                //                '<li  class="mCommon_controlThumbnail_item_img">'+
                //                '<img src="' + imgObj.content + '"></li>' +
                '<li class="left mCommon_basicInfoList7_box_item_pic_img">' +
                '<img src="' + imageBase + '"></li>' +
                '<li  class="mCommon_controlThumbnail_item_icon"><img src="${ctxPath}/images/mCommon_basicIcon_deleteRed.png"></li>' +
                '</ul>' +
                '</span>');
            picContentDom.data("name", name);
            $('.mCommon_controlThumbnail_box').append(picContentDom);

            setTimeout(function () {
                mCommon_basicCrmForm_imageArray = [];
                $('.mCommon_controlThumbnail_box span').each(function () {
                    var imgBase64 = $(this).find("li").first().find("img").attr("src");
                    var imgName = $(this).data("name");
                    mCommon_basicCrmForm_imageArray.push({image: imgBase64, name: imgName});
                });
            }, 200);

            if ($('.mCommon_controlThumbnail_box span').length >= 3) {
//                    $('#customerImg').find('input').attr("type", "button");
                $('#customerImg').find('input').hide();
            }

            //删除按钮
            $('.mCommon_controlThumbnail_item').find('.mCommon_controlThumbnail_item_icon').children('img').tap(function () {
                //
                $(this).parents('.mCommon_controlThumbnail_item').remove();
                $('#customerImg').find('input').show();
                //
                mCommon_basicCrmForm_imageArray = [];
                $('.mCommon_controlThumbnail_box span').each(function () {
                    var imgBase64 = $(this).find("li").first().find("img").attr("src");
                    var imgName = $(this).data("name");
                    mCommon_basicCrmForm_imageArray.push({image: imgBase64, name: imgName});
                });
            })
        });
    }

    //获取录音
    function getRecord() {
        if (da.djJsReady) {
            da.record({
                success: function (res) {
                    var path = res.path;
                    var index = path.lastIndexOf("\/");
                    var name = path.substring(index + 1, path.length);
                    $('.mCommon_basicCrmForm_voice').css('display', 'block');
                    $('.mCommon_basicVoice_tableTextTitle').html(name);

                    var recordBase64 = res.content;
                    var length = res.length;
                    //获取音频文件后缀名
                    var index0 = name.lastIndexOf(".");
                    var filename = name.substring(0, index0);
                    var file_extname = name.substring(index0 + 1, name.length);
                    record_dataset = {
                        "content": recordBase64,
                        "file_name": filename,
                        "file_extname": file_extname
                    }
                }
            })
        }
    }
    $().ready(function () {
        $("#related_id").val(decodeURI($("#related_id").val()))

        mCommon_basicCrmForm_appendData($('.mCommon_controlFormGroup_box'), mCommon_basicCrmForm_dataArray);
        $('.mCommon_controlThumbnail_item_icon img').tap(function () {
            $(this).parents('.mCommon_controlThumbnail_item').css('display', 'none');
        });
        mCommon_jsImgCut0114($(".mCommon_controlThumbnail_item_img"), true);//图片剪裁
        $('.mCommon_basicLunchDom_head>img').click(function () {
            $(this).parents('.mCommon_basicLunchDom_Box').css('display', 'none');
        });
        $('.mCommon_basicCrmForm_deleteVoice').click(function () {//删除录音
            $(this).parents('.mCommon_basicCrmForm_voice').css('display', 'none');
        });


        var continueData = ${continueData};
        var json = "";
        if (continueData != undefined && continueData != null && continueData != "") {
            json = JSON.parse(${continueData})
        }
        var parameter = {};
        var field_dataset = [];
        if (json.std_data && json.std_data.parameter) {
            parameter = json.std_data.parameter;
            field_dataset = parameter.field_dataset;
        }

        var todo_type_content = ""
        var todo_id_content = ""
        var todo_sn_content = ""
        if (field_dataset != undefined && field_dataset != null && field_dataset != "") {
            for (var i = 0; i < field_dataset.length; i++) {
                if (field_dataset[i].field_id == "todo_type") {
                    if (field_dataset[i].field_content.length > 0) {
                        todo_type_content = field_dataset[i].field_content[0].content_label
                    }
                }
                if (field_dataset[i].field_id == "todo_id") {
                    if (field_dataset[i].field_content.length > 0) {
                        todo_id_content = field_dataset[i].field_content[0].content_label
                    }
                }
                if (field_dataset[i].field_id == "todo_sn") {
                    if (field_dataset[i].field_content.length > 0) {
                        todo_sn_content = field_dataset[i].field_content[0].content_label
                    }
                }
            }
        }
        if (todo_type_content === 'amount') { //如果是收款型待办，需要将“已收金额”栏位显示
            $("#received_amount").parents("ul:first").css("display", "block");
        } else {     //否则隐藏
            $("#received_amount").parents("ul:first").css("display", "none");
        }

        var dialogContentObj = $('<p class="mCommon_framePopup_defaultText mCrm_customerInfo_tab01">' +
            '${c5:i18n('i18n.todo.todo_continue',locale,'imagesUpload')}'
            + '</p>');

        //弹窗
        var dialogPopupMD = new mCommon_framePopup({
            appendObj: $("body"),//浮出层和黑层显写入的容器
            contentObj: dialogContentObj.clone(),//内容区显示的对象
            spaceClose: true,//点击空白关闭
            winScroll: true,//不允许滚动
            //非模态弹窗不显示黑层，不显示按钮，过一会自动消失
            modal: false,//是否为模态弹窗
            showTime: 2000,//非模态弹窗停留时间
            showCallback: function (a) {
                //alert("show"+a.showFrame.html());
            },//显示弹窗后的回调 参数this
            hideCallback: function (a) {
                //alert("hide"+a.showFrame.html());
            }//隐藏弹窗后的回调  参数this
        });

        $('#customerImg').off().on('click', function () {
//            $('#customerImg').find('input').attr("type","file");
            if ($('.mCommon_controlThumbnail_box span').length >= 3) {
//                dialogPopupMD.hidePopup();
//                dialogPopupMD.showPopup();
                showDialog("${c5:i18n('i18n.todo.todo_continue',locale,'imagesUpload')}");

                return;
            }
        });

        $('#customerImg').find('input').change(function () {
            getImg();
        });


        $("#received_amount").find("input").off().on("change keypress keyup", function () {
            if ($("#received_amount").find("input").val() != "") {
                $('#received_amount').parent().next().css("display", "none")
            }
        })

        $("#job_duration").find("input").off().on("change keypress keyup", function () {
            if ($("#job_duration").find("input").val() != "") {
                $('#job_duration').parent().next().css("display", "none")
            }
        })

        $("#next_subject").find("textarea").off().on("change keypress keyup", function () {
            if ($("#next_subject").find("textarea").val() != "") {
                $('#next_subject').parent().next().css("display", "none")
            }
        })

        //起始时间
        $('#start_time').find('.scroller').mobiscroll('setVal', new Date(), true, true);//设置输入框和滑动条的初始默认值
//        $('#start_time').find('input').off().on("change keypress keyup", function () {
//            if ($('#start_time').find('input').val() != "") {
//                $('#start_time').parent().next().css("display", "none");
//            }
//        })

        //截止时间
        $('#finish_time').find('.scroller').mobiscroll('setVal', new Date(), true, true);//设置输入框和滑动条的初始默认值
//        $('#finish_time').find('input').off().on("change keypress keyup", function () {
//            if ($('#finish_time').find('input').val() != "") {
//                $('#finish_time').parent().next().css("display", "none");
//            }
//        })
        $("#submitBtn").off().on("click", function () {
            var isTrue = true;
            var job_duration_is_true = true;
            var amount_is_true = true;
            mCommon_basicCrmForm_imageArray = [];
            $('.mCommon_controlThumbnail_box span').each(function () {
                var imgBase64 = $(this).find("li").first().find("img").attr("src");
                var imgName = $(this).data("name");
                mCommon_basicCrmForm_imageArray.push({image: imgBase64, name: imgName});
            });

            var regEx = new RegExp("^(([0-9]+\\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\\.[0-9]+)|([0-9]*[1-9][0-9]*))$");
            if (todo_type_content == "amount") {
                //已收金额校验
                var received_amount = $("#received_amount").find("input").val();
                if (received_amount == "") {
                    $('#received_amount').parent().next().css("display", "block").html("${c5:i18n('i18n.todo.todo_continue',locale,'enterAmountMust')}");
                    isTrue = false;
                    amount_is_true = false;
                } else {
                    $('#received_amount').parent().next().css("display", "none")
                }
                if (amount_is_true) {
                    if (received_amount != "" && !regEx.test(received_amount)) {
                        $('#received_amount').parent().next().css("display", "block").html("${c5:i18n('i18n.todo.todo_continue',locale,'amountReceivedError')}");
                        isTrue = false;
                    } else {
                        $('#received_amount').parent().next().css("display", "none")
                    }
                }
            }
            var checkVal = $("#job_duration").find("input").val();
            //检查工作时数是否为空
            if (checkVal == "") {
                $('#job_duration').parent().next().css("display", "block").html("${c5:i18n('i18n.todo.todo_continue',locale,'workingHoursRequried')}");
                isTrue = false;
                job_duration_is_true = false;
            } else {
                $('#job_duration').parent().next().css("display", "none")
            }

            if (job_duration_is_true) {
                if (checkVal != "" && !regEx.test(checkVal)) {
                    $('#job_duration').parent().next().css("display", "block").html("${c5:i18n('i18n.todo.todo_continue',locale,'workingHoursFormatError')}");
                    isTrue = false;
                } else {
                    $('#job_duration').parent().next().css("display", "none")
                }
            }
            //检查起始时间是否为空
            if (!$('#start_time').find('input').val()) {
                $('#start_time').parent().next().css("display", "block");
                isTrue = false;
            } else {
                $('#start_time').parent().next().css("display", "none");
            }

            //检查截止时间是否为空
            if (!$('#finish_time').find('input').val()) {
                $('#finish_time').parent().next().css("display", "block");
                isTrue = false;
            } else {
                $('#finish_time').parent().next().css("display", "none");
            }
            //起始時間不得大於截止時間
            var start_time = $('#start_time').find('input').val();
            var finish_time = $('#finish_time').find('input').val();
            if (start_time > finish_time) {
                contentObj.html("${c5:i18n('i18n.todo.todo_continue',locale,'startEarlyEnd')}");
//                popupMD.showPopup();
                showDialog("${c5:i18n('i18n.todo.todo_continue',locale,'startEarlyEnd')}");

                isTrue = false;
            }

            var next_subject = $("#next_subject").find("textarea").val();
            //检查工作时数是否为空
            if (next_subject == "") {
                $('#next_subject').parent().next().css("display", "block").html("${c5:i18n('i18n.todo.todo_continue',locale,'nextSubject')}");
                isTrue = false;
            } else {
                $('#next_subject').parent().next().css("display", "none")
            }

            //图片
            var photo_dataset = [];
            for (var i = 0; i < mCommon_basicCrmForm_imageArray.length; i++) {
                //获取图片的base64编码
                var base64Str = mCommon_basicCrmForm_imageArray[i].image;
                var index0 = base64Str.lastIndexOf(',');
                var content = base64Str.substring(index0 + 1, base64Str.length);
                //获取图片名
                var file_name = mCommon_basicCrmForm_imageArray[i].name;
                //获取图片后缀
                var index = file_name.lastIndexOf('.');
                var file_extname = file_name.substring(index + 1, file_name.length);
                file_name = file_name.substring(0, index);
                var photoObj = {
                    "content": content,
                    "file_extname": file_extname,
                    "file_name": file_name
                };
                photo_dataset.push(photoObj);
            }
            if (!isTrue) {
                return;
            }
            var reqData = {
                "locale": "${locale}",
                "companyID": $("#companyID").val(),
                "personID": $("#personID").val(),
                "access_token": $("#access_token").val(),
                "related_id": $("#related_id").val(),
                "todo_type": todo_type_content,
                "todo_id": todo_id_content,
                "todo_sn": todo_sn_content,
                "schedule_id": "schedule_id",
                "start_time": $("#start_time").find("input").val(),
                "finish_time": $("#finish_time").find("input").val(),
                "job_duration": $("#job_duration").find("input").val() != undefined ?
                    $("#job_duration").find("input").val() : "",
//                "job_name": $("#job_name").find("input").val() != undefined ?
//                        $("#job_name").find("input").val() : "",
                "job_content": $("#job_content").find("textarea").val() != undefined ?
                    $("#job_content").find("textarea").val() : "",
                "next_subject": $("#next_subject").find("textarea").val() != undefined ?
                    $("#next_subject").find("textarea").val() : "",
                "photo_dataset": photo_dataset != undefined ? photo_dataset : [],
                "received_amount": $("#received_amount").find("input").val() != undefined ? $("#received_amount").find("input").val() : ""
            };
            mCommon_basicLoadingShow("", true);
            <%--mCommon_basicLoadinglogoWhaleShow("", true,"${c5:i18n('i18n.todo.todo_continue',locale,'submit')}");--%>
            $.ajax({
                type: "POST",
                url: "${ctxPath}/r/mp/crm/v2/todo/continue/post/data",
//                async: false,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(reqData),
                success: function (json) {
                    mCommon_basicLoadingRemove();
//                    mCommon_basicLoadinglogoWhaleRemove();

                    if (json && json.std_data && json.std_data.parameter && json.std_data.parameter.continue_result) {
                        contentObj.html("${c5:i18n('i18n.todo.todo_continue',locale,'sendSuccess')}");
//                        popupMD.showPopup();
                        showDialog("${c5:i18n('i18n.todo.todo_continue',locale,'sendSuccess')}");

                        //跳转至上一页
                        setTimeout(function () {
//                            window.history.back();
//                            window.history.go(-2);
                            if (da.djJsReady) {
                                da.goBackToMain();
                            }

                            <%--var url ="${mobileServer}/r/topic/detail?forward_application_id=5788371667548718067&related_id=${related_id}&locale=${locale}";--%>
//                            window.location.href = encodeURI(url);
                        }, 2000);

                    } else {
                        contentObj.html("${c5:i18n('i18n.todo.todo_continue',locale,'sendFail')}");
//                        popupMD.showPopup();
                        showDialog("${c5:i18n('i18n.todo.todo_continue',locale,'sendFail')}");
                    }
                },
                error: function () {
                    mCommon_basicLoadingRemove();
//                    mCommon_basicLoadinglogoWhaleRemove();

                    contentObj.html("${c5:i18n('i18n.todo.todo_continue',locale,'sendFail')}");
//                    popupMD.showPopup();
                    showDialog("${c5:i18n('i18n.todo.todo_continue',locale,'sendFail')}");

                }
            });
        });

        $("#cancelBtn").off().on("click", function () {

//            if (da.djJsReady) {
//                da.historyBack();
//            }
//            for (var i = 0; i < 2; i++) {
            window.history.back();
//            }
//            window.history.go(-1);
        })
    })

</script>

</body>
</html>