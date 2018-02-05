$(document).ready(function () {
    var companyID = $("#companyID").val();
    var groupID = $("#groupID").val();
    var $template = $("#_templateDiv");
    var $shortTextDiv = $("#_templateDiv").find("#_shortTextDiv").clone();
    var groupName = $("#groupName").val();
    var flag = $("#flag").val();
    var pcManage = new PortalPcManage({
        currentCompanyID: companyID,
        isCanImportCommodity: true
    });
    var portalFeed = null;
    var mCommon_jsFixedTopObjTab = null;
    var pullUpObj = null;

    var portalHtml5Data = new PortalHtml5Data();

    function getBtnStr(flag, $btn) {
        var url = "";
        var str = "";
        switch (flag) {
            case "needRegistJoin" :
                url = "";
                str = "加入";
                break;
            case "needRegistApply" :
                url = "";
                str = "申请加入";
                break;
            case "needJoin" :
                url = "";
                str = "加入";
                break;
            case "needApplyJoin" :
                url = "";
                str = "申请加入";
                break;
            case "checking" :
                url = "";
                str = "审核中";
                $btn.addClass("mGroup_groupContent_btnAudit");
                break;
        }
        $btn.find("#_btnText").html(str);
        $btn.filter(":not(.mGroup_groupContent_btnAudit)").bind("tap", function (e) {
            var self =  $(this);
            if ($(this).attr("disabled") == "disabled") {
                return false;
            }
            var url = _ctxPath + "/r/mp/ggcp/" + groupID + "/" + companyID;
            pcManage.getThirdPartyInfo({
                "weixinCanUse": false,
                "thirdPartyCanUse": false
            }, url, null, groupID);
            $(this).attr("disabled", "disabled");
            setTimeout(function(){
                self.removeAttr("disabled");
            },300);
        });
    }

    function initSearchTab() {
        var searchBoxObj = $('.mGroup_groupContent_peopleTabBox').find(".mCommon_basicSearch_box");
        var aBtn = searchBoxObj.find('.mCommon_basicSearchBtn').children('a');
        var searchInput = searchBoxObj.find('input');
        var mGroup_groupContent_searchObj = new mCommon_basicSearch({
            boxObj: searchBoxObj,//搜索的外层div，类型是jq对象
            tapBoxFun: function (inputObj) {//点击输入框的回调函数，参数是input jq对象
                setTimeout(function () {//16.08.03
                    mGroup_groupContent_searchObj.box.addClass("mCommon_basicSearchAndBtn");
                    //隐藏tab签
                    $('.mCommon_basicTabMenu_fixedBox_height').hide();
                    //重新计算固定区域
                    mCommon_jsFixedTopObjTab.reFixed();

                    //加一层防护，不然选择键盘的完成，在focus时键盘总是开启后关闭
                    if ('fixed' == $('.mCommon_jsFilter_fixed').css('position')) {
                        //16.08.23 start
                        $(window).unbind('scroll.staticEvent');
                        setTimeout(function(){
                            //$('.mCommon_jsFilter_fixed')是固定在顶部控件的对象
                            $('.mCommon_jsFilter_fixed').css('position','static');
                            //调取控件不在监听事件
                            mCommon_jsFixedTopObjTab.winUnBindScroll();
                            //每次搜索时候要回滚到顶部
                            $(window).scrollTop(0);
                        },100);
                        //16.08.23 end
                        //调取控件不在监听事件
                        mCommon_jsFixedTopObjTab.winUnBindScroll();
                        setTimeout(function () {
                            //16.08.23 start
                            //绑定scroll事件，当scrollTop大于10认为是向下滚动了，此时把Input值为blur
                            $(window).bind('scroll.fixedEvent',function(){
                                if(10 < $(window).scrollTop()){
                                    searchInput.blur();
                                    //重新开启控件的监听事件
                                    mCommon_jsFixedTopObjTab.winScroll();
                                    //重新计算固定区域
                                    mCommon_jsFixedTopObjTab.reFixed();
                                    //每次blur后需要将事件解绑
                                    $(window).unbind('scroll.fixedEvent');
                                }
                            });
                            //16.08.23 end
                        }, 300);
                    }

                    if ('' == inputObj.val()) {
                        aBtn.text('取消');
                        aBtn.removeClass('mAllGroup_list_searchActive');
                    } else {
                        aBtn.text('搜索');
                        aBtn.addClass('mAllGroup_list_searchActive');
                    }
                }, 300);
            },
            changeValueFun: function (inputObj, inputValue) {//填写的值发生变化时的回调函数，参数是input jq对象
                if ('' == inputValue) {
                    aBtn.text('取消');
                    aBtn.removeClass('mAllGroup_list_searchActive');
                } else {
                    aBtn.text('搜索');
                    aBtn.addClass('mAllGroup_list_searchActive');
                }
            },
            searchKeyDownFun: function (val) { //当按下的键为‘搜索’时，回调，参数是input的value值
                aBtn.text('取消');
                aBtn.removeClass('mAllGroup_list_searchActive');
                $("#_groupValid_div").hide();
                var inputValue = searchInput.val();
                portalFeed.initGroupPersonList(inputValue);//调用显示人员方法
            },
            clearValueFun: function (val) {//清空input的value时，回调，参数 input的value值
                aBtn.text('取消');
                aBtn.removeClass('mAllGroup_list_searchActive');

            },
            cancelBtnFun: function () {
                $('.mGroup_groupContent_peopleListBox').html('');
                $('.mGroup_groupContent_peopleListBox').next().remove();
                //有这个类是搜索按钮，没有是取消按钮
                if (aBtn.hasClass('mAllGroup_list_searchActive')) {
                    aBtn.text('取消');
                    aBtn.removeClass('mAllGroup_list_searchActive');
                    $("#_groupValid_div").hide();
                    var inputValue = searchInput.val();
                    portalFeed.initGroupPersonList(inputValue);//调用显示人员方法
                } else {
                    //点击取消后的事件
                    mGroup_groupContent_searchObj.box.removeClass("mCommon_basicSearchAndBtn");
                    mGroup_groupContent_searchObj.inputValueNull(); //清空输入框内容
                    $('.mCommon_basicTabMenu_fixedBox_height').show();
                    //重新计算固定区域
                    mCommon_jsFixedTopObjTab.reFixed();
                    $("#_groupValid_div").hide();
                    portalFeed.initGroupPersonList(null);//调用显示人员方法
                }
            }
        });
    }

    function initDataList() {
        var options = {
            companyID: companyID,
            groupID: groupID,
            pcManage: pcManage,
            portalHtml5Data: portalHtml5Data,
            $template: $template,
            pullUpObj: pullUpObj,
            $shortTextDiv: $shortTextDiv,
            groupName: groupName
        };
        portalFeed = new PortalHtml5Feed(options);
        if (!flag) {
            portalFeed.initGroupFeedList();
        } else {
            getBtnStr(flag, $("#_groupContentFooter").find(".mGroup_groupContent_btn"));
            $("#_groupValid_div").show();
            $("#_groupContentFooter").show();
            mCommon_controlPrompt($(".mCommon_controlPrompt_box"));
        }
        var groupPersonNumber = $("#groupPersonNumber").val();
        groupPersonNumber = groupPersonNumber || 1;
        $(".mCommon_basicTabMenu_common em").eq(1).html("成员(" + groupPersonNumber + ")");
    }

    // 初始化页面
    function initPage() {
        mCommonPageMiniHeight($(".mGroup_groupContent_content"));//页面最小高度
        var peopleBoxStr = '<div class="mGroup_groupContent_peopleTabBox"><div class="mCommon_basicSearch_box"> <!--搜索输入--> <div class="mCommon_basicSearch"> <div class="mCommon_basicSearchInputWrapper"> <!--搜索图标--> <em class="mCommon_basicSearchIcon"></em> <!--搜索图标 end--> <input type="search" placeholder="搜索成员" value=""> </div> <!--清空--> <div class="mCommon_basicSearchClear"><em></em></div> <!--清空end--> </div> <!--按钮--> <div class="mCommon_basicSearchBtn"> <a href="####">搜索</a> </div> </div></div>';
        //页签菜单和内容层=========================
        var tabMenuContAry = [
            {menuText: "群聊", contentText: ''},
            {menuText: "成员", contentText: peopleBoxStr}

        ];
        var tab = new mCommon_basicTab({
            appendObj: $(".mGroup_groupContent_headerBox"),//页签写入的容器，类型是jquery对象
            selectedIndex: 0, //默认当前选中状态组，从0开始
            fixedTop: true,//是否停留顶部
            tabMenuContAry: tabMenuContAry,//菜单及对应的内容数组
            tapFun: function (tapFunObj) {//点击的回调
                mCommon_jsFixedTopObjTab.reFixed();
                pullUpObj && pullUpObj.clearPullUp();//清除上拉事件
                $(window).scrollTop(0);//滚动条归位
                $(".mGroup_groupContent_peopleListBox").html("");//清除数据
                $(".mGroup_groupContent_feedListBox").html("");//清除数据
                if (tapFunObj.activeIndex == 0) {//点击第一个
                    $(".mGroup_groupContent_peopleListBox").hide();
                    $(".mGroup_groupContent_feedListBox").show();
                    if (!flag) {
                        portalFeed.initGroupFeedList();//调用显示信息流方法
                        if (typeof(mCommon_basicPlusJump_setRoundBallObj) != "undefined") {
                            mCommon_basicPlusJump_setRoundBallObj.showFun();
                        }
                    } else {
                        if (typeof(mCommon_basicPlusJump_setRoundBallObj) != "undefined") {
                            mCommon_basicPlusJump_setRoundBallObj.hideFun();
                        }
                        $("#_groupValid_div").show();
                        $("#_groupContentFooter").show();
                    }

                } else {
                    $(".mGroup_groupContent_peopleListBox").show();
                    $(".mGroup_groupContent_feedListBox").hide();
                    if (typeof(mCommon_basicPlusJump_setRoundBallObj) != "undefined") {
                        mCommon_basicPlusJump_setRoundBallObj.hideFun();
                    }
                    $("#_groupValid_div").hide();
                    $("#_groupContentFooter").hide();
                    portalFeed.initGroupPersonList(null);//调用显示人员方法
                }
            }
        });
        initSearchTab();
        initDataList();
        //页签菜单和内容层end=========================
        mCommon_jsFixedTopObjTab = new mCommon_jsFixedTop({
            fixedObj: $('.mGroup_groupContent_headerBox')
        });//实例

    }

    initPage();

});
