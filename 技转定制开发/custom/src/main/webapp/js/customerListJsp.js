var mCustomerList_wordbreak = function () {
    //字符截取
    var breakfun = function () {
        var oldStr,newStr;
        //是否截取过
        if(!$(this).attr('titleStr')){
            oldStr = $(this).text();
            $(this).attr('titleStr',oldStr);
        }else{
            oldStr = $(this).attr('titleStr');
        }
        var item=$(this);
        var fontSize=parseInt(item.css("font-size"));//字号
        var num=parseInt(item.width()/fontSize*0.8)*2*2;//取字数
        var newStr=oldStr.subCHStr(0,num);//字符截取
        item.html(newStr);//写入文字

    }


    $(".mCommon_basicInfoList5_item_center_centerBox_title").each(breakfun);

}
$().ready(function(){
    mCommon_controlPrompt($(".mCommon_controlPrompt_box"),50);

    var pullUp0 = null;//下拉加载对象0

    var listBox0=$("#listContent0");//列表容器
    //经纬度
    var longitude;
    var latitude;

    var haveMoreData=true;//是否还有更多数据
    var maxNum;//最多条数

    var page = 0
    //第一个标签数据加载方法模拟===============
    //模拟开发 写入数据
    //

    var appendData = function (jsonobjs,box) {


        var addData = function (jsonobj,box) {

//                box = box || $('<div class="mCommon_basicInfoList5_Box"></div>');//添加到的列表
            box = $("#listContent0");//添加到的列表
            var div1 = $('<div class="mCommon_basicInfoList5_item  clearfix"></div>');
            var itemRight = $('<div class="mCommon_basicInfoList5_item_right"></div>');
            var itemCenter = $('<div class="mCommon_basicInfoList5_item_center"></div>');
            var titleDom = $('<p class="mCommon_basicInfoList5_item_center_centerBox_title wordBreak"></p>');

            //给列表特殊字段添加css样式
            var addSpecilalCss = function(targetobj,color){
                //console.log(jsonobj)
                if(jsonobj.special_detail){
                    var bcolor = 'rgba('+color.split('(')[1].split(')')[0]+',0.1)';
                    targetobj.css('borderColor',color).css('color',color).css('backgroundColor',bcolor);
                }

            }

            //设置标题内容
            titleDom.text(jsonobj.title.field_content);

            itemCenter.append(titleDom);
            //设置特殊标签
            if(jsonobj.special_detail.length > 0){//如果存在特殊标签
                div1.addClass('mCommon_basicInfoList5_item_tap');//添加有特殊标签的css样式
                for(var i=0 ; i< jsonobj.special_detail.length ; i++){
                    var tap = $('<div class="mCommon_basicInfoList5_tap textCut"></div>');
                    tap.text(jsonobj.special_detail[i].field_content);
                    addSpecilalCss(tap,jsonobj.special_detail[i].field_color);
                    itemRight.append(tap);//在右侧容器内部添加标签
                }
                div1.append(itemRight);
            };

            //设置概要字段
            //jsonobj.brief_detail = change_brief_detail(jsonobj.brief_detail)
            if(jsonobj.brief_detail.length > 0){//如果存在概要字段
                for(var j=0 ; j< jsonobj.brief_detail.length ; j++){
                    var item = $('<p class="mCommon_basicInfoList5_item_center_centerBox_detail"></p>');
                    item.addClass(((jsonobj.brief_detail[j].textcut)?'textCut':'wordBreak'));//设置概要行是否断行
                    item.text(jsonobj.brief_detail[j].field_content);//设置概要字段内容
                    itemCenter.append(item);//在右侧容器内部添加标签
                }

            };
            div1.append(itemCenter);
            div1.click(function () {
                // var url = "http://180.167.0.43:18081/r/mp/tab?menuID=191431218000053207" + "&access_token=" + access_token + "&mobile_token=" + mobile_token + "&related_id=GG001§" + jsonobj.id + "&companyID=" + companyID + "&locale=" + locale + "&user_id=" + personID;
                // var url = "/r/mp/tab?menuID=" + $("#customerlist.detail.forwardApplicationId").val()
                //     + "&access_token=" + access_token + "&mobile_token=" + mobile_token + "&related_id=GG001§" + jsonobj.id + "&companyID=" + companyID + "&locale=" + locale + "&user_id=" + personID;
                // 81 环境
                // var url = "/r/mp/tab?menuID=191431218000053207" + "&access_token=" + access_token + "&mobile_token=" + mobile_token + "&related_id=GG001§" + jsonobj.id + "&companyID=" + companyID + "&locale=" + locale + "&user_id=" + personID;
                // 80 环境
                var url = "/r/mp/tab?menuID=2452100447410473365" + "&access_token=" + access_token + "&mobile_token=" + mobile_token + "&related_id=GG001§" + jsonobj.id + "&companyID=" + companyID + "&locale=" + locale + "&user_id=" + personID;
                window.open(url);
            })
            box.append(div1);//向容器添加
            mCustomerList_wordbreak();
        }
        //模拟判断是否继续加载
//            if(maxNum <= box.find(".mCommon_basicInfoList5_item").length){//已有条数和最大值比较
//                haveMoreData=false;
//                return haveMoreData;
//            };

        for(var i=0;i<jsonobjs.length;i++){
            addData(jsonobjs[i],box)
        };
        //模拟判断是否继续加载
        if(maxNum <= box.find(".mCommon_basicInfoList5_item").length){//已有条数和最大值比较
            haveMoreData=false;
        }
        return haveMoreData;//返回是否还有更多数据


    }
    //模拟开发 数据请求
    //var nextPageNumber0=0;//请求页号累计
//        appendData(listBox0);
    function dataLoad0(funRefresh,box){//参数：刷新方法，append的容器
        page++;
        $.ajax({
            type: "POST",
            url: "/crm/r/mp/crm/customer/customer/around",
            data: {
                "page": page,
                "page_size": 10,
                "locale": locale,
                "longitude": longitude,
                "latitude": latitude,
                "title_fields_dataset": "GG003",    //GG003 客戶名稱
                "special_fields_dataset": "DISTANCE",  //距離
                "brief_fields_dataset": "GG036",  //地址
                "access_token":mobile_token,
                "companyID":companyID,
                "personID":personID
            },
            success: function (json) {
                json = JSON.parse(json);
                mCommon_basicLoadingRemove();
                var customers=json.std_data.parameter.list_dataset;
//                    alert(customers);
                maxNum = json.std_data.parameter.total_cnt;
                var hoveMoreData=appendData(customers,box);//数据写入页面方法,返回是否还有更多数据
                funRefresh(hoveMoreData);//关键 参数是否有更多数据======
                //如果没有数据，提示暂无数据
                if (maxNum===0){
                    $(".mCommon_controlPrompt_box").show();
                }
            }
        })
//            setTimeout(function(){//模拟返回数据返回成功

//            },1000);
    };
    mCommon_basicLoadingShow("", true);
    //定位，获取经纬度 (使用高德jssdk定位)
    da.ready(function () {
        da.inChina({
            success: function (res) {
                //定位成功
                longitude = res.lon;
//                    alert(longitude);
//                    longitude = "121.452589";
                latitude = res.lat;
//                    alert(latitude);
//                    latitude = "31.298753";
                //加载上拉类
                var pullUp0 = new mCommon_controlPullUpLoad({ //实例化上拉类
                    listOuterBox:listBox0,//jquery对象,列表外容器容器，找底边位置用
                    loadLineUpY:-20,//int型 加载触发线的向上偏移量 ,初始值是列表外容器底边为触发线,如果底部有fixed按钮,这个值就是按钮的高度+10
                    loadData:function(){//加载数据回调,有数据执行 this.refresh(true);没有数据执行 this.refresh(false);
                        dataLoad0(this.refresh,listBox0);//数据请求模拟 参数：删除圆球方法，append的容器
                    }
                });
            },
            fail: function (res) {
                //定位失败
                mCommon_basicLoadingRemove();
                alert("请开始定位权限");
            }
        })
    })

    $("#customerMap_btn").click(function(){
        // window.open(ctxPath+"/r/mp/crm/v2/customerNearby/map?locale="+locale,"_self");
        window.open(ctxPath+"/r/mp/crm/v2/customerNearby/map?locale="+locale+"&companyID="+companyID+"&mobile_token="+mobile_token+"&access_token="+access_token+"&personID="+personID,"_self");

    })

    $(window).resize(function(){
        mCustomerList_wordbreak();
    });


})
