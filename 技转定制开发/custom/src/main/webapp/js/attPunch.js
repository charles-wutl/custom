var latitude;
var longitude;
var current_location;
var lat;
var lon;
var customer_id;
var isLocate = false;
//客户经纬度
var customerLat,customerLon;
var dataArray=[];
var i=0;
function initGaodeMap() {
    var infoWindow = new AMap.InfoWindow();
    var map=new AMap.Map('map',{
        resizeEnable:true,
        zoom:16,
        center:[116.39751,39.908685]
    })

    //高德地图上标点
    function cteateGaodeMarker(lnglatXY,info) {
        var marker = new AMap.Marker({
            position: lnglatXY,
            icon:"../../images/map_mark.png",
            map: map
        });
        marker.content=info;
        //给Marker绑定单击事件
        marker.on('click', markerClick);
    }

    function markerClick(e){
        infoWindow.setContent(e.target.content);
        infoWindow.open(map, e.target.getPosition());
    }

    var isComplete = true;
    //定位
    function locate() {
        da.ready(function () {
            if (longitude==""){
                da.inChina({
//                    current:1,
                    success: function (res) {
                        //暂时只用高德地图
                        longitude = res.lon;
//                        longitude = 121.26;
                        latitude = res.lat;
//                        latitude = 31.18;
                        var lnglatXY=[longitude,latitude];

                        map=new AMap.Map('map',{
                            resizeEnable:true,
                            zoom:16,
                            center:[longitude,latitude]
                        })


//                        dataArray.push({'addr':"當前地點：",'num':""});

                        AMap.service('AMap.Geocoder',function(){//回调函数

                            //实例化Geocoder
                            var geocoder = new AMap.Geocoder({});
                            geocoder.getAddress(lnglatXY, function(status, result) {
                                if (status === 'complete' && result.info === 'OK') {
                                    //获得了有效的地址信息:
//                                    dataArray.push({'addr':"當前地點："+result.regeocode.formattedAddress,'num':""});
                                    $('#currentAddress').html(result.regeocode.formattedAddress);
//                                    appendData(dataArray);
                                }else{
                                    //获取地址失败
                                }
                            });
                        })

                        var marker = new AMap.Marker({
                            position: lnglatXY,
                            map: map
                        });
                        function getData() {
                            page++;
                            $.ajax({
                                url: "/crm/r/mp/crm/customer/customer/around",
                                type: "POST",
                                data: {
//                                        async: false,
                                    "page": page,
                                    "page_size": 10,
                                    "locale": locale,
                                    "longitude": longitude,
                                    "latitude": latitude,
                                    "title_fields_dataset": "GG003",    //GG003 客戶名稱
                                    "special_fields_dataset": "DISTANCE",  //距離
                                    "brief_fields_dataset": "GG036",  //地址
                                    "access_token":access_token,
                                    "companyID":companyID,
                                    "personID":personID
                                },
                                success: function (json) {
                                    if (page===1){
                                        isLocate=true;
//                                            longitude="";
//                                            latitude="";
                                        dataArray=[];
                                        //隱藏暫無數據
                                        $('.mCommon_controlPrompt_box').hide();
                                        //清空DOM
                                        $('.mCommon_basictimecard_box').empty();
                                    }
                                    isComplete = true;
                                    json = JSON.parse(json);
                                    if (json.std_data){
                                        var customers=json.std_data.parameter.list_dataset;
                                        var total=json.std_data.parameter.total_cnt;  //总数
                                        if (total==0){
                                            appendData(dataArray);
                                            $('.mCommon_controlPrompt_box').show();
                                        }
                                        var pageNum=parseInt(total/10)+1;     //总页数
                                        for (var i=0;i<customers.length;i++){
                                            dataArray.push({'addr':customers[i].title.field_content,'num':customers[i].brief_detail[0].field_content,"id":customers[i].id,"latitude":customers[i].latitude,"longitude":customers[i].longitude});
                                            //地圖上标点
//                                            cteateGaodeMarker([customers[i].latitude,customers[i].longitude]);
                                            cteateGaodeMarker([parseFloat(customers[i].longitude),parseFloat(customers[i].latitude)],customers[i].title.field_content);
                                        }
                                        if (page<pageNum){
                                            getData();
                                        }
                                        else {
                                            appendData(dataArray);
                                        }
                                    }
                                    else {
                                        $('.mCommon_controlPrompt_box').show();
                                    }

                                },
                                error:function (e) {
//                                        alert(JSON.stringify(e));
                                }
                            })
                        }
                        var page=0;
                        //请求数据
                        if (isComplete){
                            isComplete=false;
                            getData();
                        }



                    }
                })
            }
        })
    }
    locate();
    //重新定位
    $('#mCrm_attPunch_content_mes_locat').on("click",function () {
        isLocate=true;
        longitude="";
        latitude="";
        dataArray=[];
        //隱藏暫無數據
        $('.mCommon_controlPrompt_box').hide();
        //清空DOM
        $('.mCommon_basictimecard_box').empty();
        locate();
    })



}
function initGoogleMap(){
//        var earch_radius=6378137.0  //地球半径，单位M
//        var markers=new Array();  //附近地点的标识集合
//        var i=0;
    var infowindow = new google.maps.InfoWindow(); //信息框
    var map=new google.maps.Map(document.getElementById('map'),{       //将地图显示在相应div控件中
        center:new google.maps.LatLng(25.05,121.50),    //地图中心点
        zoom:15,            //缩放比例（0-21）
        streetViewControl:false,        //禁用街景小人控件
        mapTypeControl:false,             //禁用地图类型控件
        zoomControl:false               //禁用缩放控件
    });

    //创建客户地点标记
    function createMarker(place){
//            var latlng=new google.maps.LatLng(place.latitude,place.longitude);
        var latlng={lat: parseFloat(place.latitude), lng: parseFloat(place.longitude)};
//            var latlng={lat: 31.52, lng: 121.432};
        //创建标签
        var marker = new google.maps.Marker({
            map: map,
            icon: '../../images/map_mark.png',
            position: latlng
        });
        //点击标签时显示地点名称
        google.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent(place.title);
            infowindow.open(map, this);
        });
    }
    var isComplete=true;
    //用高德jssdk定位
    function locate() {
        da.ready(function () {
            if (longitude == "") {
                da.inChina({
                    success: function (res) {
                        longitude = res.lon;
                        latitude = res.lat;
                        //当前地点
                        var myCenter=new google.maps.LatLng(latitude,longitude);
                        //设置当前地点为中心点
                        map.setCenter(myCenter);
                        //在当前地点标点
                        var marker=new google.maps.Marker({     //当前位置标识
                            position:myCenter,
                            map:map
                        });

                        //根据经纬度获取当前地址
                        var geocoder = new google.maps.Geocoder;
                        var infowindow = new google.maps.InfoWindow;
                        geocoder.geocode({'location': myCenter}, function(results, status) {
                            if (status === 'OK') {
                                //当前地址
                                var address = results[0].formatted_address;
                                $('#currentAddress').html(address);
                            }
                        })
                        function getData() {
                            page++;
                            $.ajax({
                                url: "/crm/r/mp/crm/customer/customer/around",
                                type: "POST",
                                data: {
                                    "page": page,
                                    "page_size": 10,
                                    "locale": locale,
                                    "longitude": longitude,
                                    "latitude": latitude,
                                    "title_fields_dataset": "GG003",    //GG003 客戶名稱
                                    "special_fields_dataset": "DISTANCE",  //距離
                                    "brief_fields_dataset": "GG036",  //地址
                                    "access_token":access_token,
                                    "companyID":companyID,
                                    "personID":personID
                                },
                                success: function (json) {
                                    if (page===1){
                                        isLocate=true;
//                                            longitude="";
//                                            latitude="";
                                        dataArray=[];
                                        //隱藏暫無數據
                                        $('.mCommon_controlPrompt_box').hide();
                                        //清空DOM
                                        $('.mCommon_basictimecard_box').empty();
                                    }
                                    isComplete=true;
                                    json = JSON.parse(json);
                                    if (json.std_data){
                                        var customers=json.std_data.parameter.list_dataset;
                                        var total=json.std_data.parameter.total_cnt;  //总数
                                        if (total==0){
                                            appendData(dataArray);
                                            $('.mCommon_controlPrompt_box').show();
                                        }
                                        var pageNum=parseInt(total/10)+1;     //总页数
                                        for (var i=0;i<customers.length;i++){
                                            dataArray.push({'addr':customers[i].title.field_content,'num':customers[i].brief_detail[0].field_content,"id":customers[i].id,"latitude":customers[i].latitude,"longitude":customers[i].longitude});
                                            //地圖上标点
                                            createMarker([customers[i].latitude,customers[i].longitude]);
                                        }
                                        if (page<pageNum){
                                            getData();
                                        }
                                        else {
                                            appendData(dataArray);
                                        }
                                    }
                                    else {
                                        $('.mCommon_controlPrompt_box').show();
                                    }


                                }
                            })
                        }

                        var page=0;
                        //请求数据
                        if (isComplete){
                            isComplete=false;
                            getData();
                        }



                    }
                })
            }
        })
    }
    locate();

    $('#mCrm_attPunch_content_mes_locat').on("click",function () {

        isLocate=true;
        longitude="";
        latitude="";
        dataArray=[];
        //隱藏暫無數據
        $('.mCommon_controlPrompt_box').hide();
        //清空DOM
        $('.mCommon_basictimecard_box').empty();

        locate();
    })
}
function creatItem(dataObj){
    var newdom=$('<div class="mCrm_attPunch_addMap clearfix list">'+
        '<div class="mCrm_attPunch_addMap_left"><img src="'+ctxPath+'/images/mCrm_attPunch_addMap_cs.png"/></div>'+
        '<div class="mCrm_attPunch_addMap_right">'+
        '<p class="mCrm_attPunch_addMap_right_name wordBreak">'+dataObj.addr+'</p>'+
        '<p class="mCrm_attPunch_addMap_right_address wordBreak">'+dataObj.num+'</p>'+
        '</div>'+
        '</div>');
    return newdom;
};
function appendData(dataArray){
    for(var i=0;i<dataArray.length;i++){
        $('.mCommon_basictimecard_box').append(creatItem(dataArray[i]));
        $('.mCrm_attPunch_addMap.clearfix.list').on("click",function () {
            var j=$(this).index();
            if (isLocate){
                j = j+2;
            }
            current_location=dataArray[j-2].num;
            lat=latitude;
            lon=longitude;
            customerLat=dataArray[j-2].latitude;
            customerLon=dataArray[j-2].longitude;
            customer_id=dataArray[j-2].id;
            $('#currentLocation').html(dataArray[j-2].addr);
            $('#cardPage').show();
            $('#mapPage').hide();
            document.title=title;
            window.location = "#page2";
        })
    };
};
var currentHour=new Date().getHours();
var currentMinute=new Date().getMinutes();
if (currentHour<10){
    currentHour="0"+currentHour;
}
if (currentMinute<10){
    currentMinute="0"+currentMinute;
}
var currentTime=' ('+nowTime+' '+currentHour+':'+currentMinute+') ';
$('#currentTime').html(currentTime);
var mCrm_attPunch_addAtt_imageArray = [];
function mCrm_attPunch_addAtt_appendImgData(imageArray){
    var dom=$('<div class="mCommon_controlThumbnail"><div class="mCommon_controlThumbnail_box"></div></div>');
    for(var i=0;i<imageArray.length;i++){
        var picContentDom=$('<span  class="mCommon_controlThumbnail_item">'+
            '<ul class="mCommon_controlThumbnail_item_box">'+
            '<li  class="mCommon_controlThumbnail_item_img"><img src="'+imageArray[i].image+'"></li>'+
            '<li  class="mCommon_controlThumbnail_item_icon"><img src="'+ctxPath+'/images/mCommon_basicIcon_deleteRed.png"></li>'+
            '</ul>'+
            '</span>');
        picContentDom.data("data",imageArray[i]);
        dom.append(picContentDom);
    }
    $('.mReleaseMessage_info_maskHeadArea').append(dom);
};

//固定一屏
var mCommon_jsFixedOneScreen_setFixedOneScreenObj = new mCommon_jsFixedOneScreen_setFixedOneScreen();

//遮罩层
var mCommon_basicMask_setMaskObj = new mCommon_basicMask_setMask({
    zIndex:null,//设置遮罩层级，默认值为100，Number类型，选填，
    maskContainer:'',//要遮罩的容器，局部遮罩要传入容器，jquery类型,全局遮罩传空字符串，必填
    maskClickFun:function(){}//点击遮罩层时的回调函数，选填
});
//弹窗
var mCommon_controlPagePopupPromptModal_setTopPositionObj;

$('#addAtt_btn').children().find('img').tap(function(){

    if($(this).attr("src")==ctxPath+'/images/mCommon_basicIcon_camera.png'){
        if (mCrm_attPunch_addAtt_imageArray.length>=3){
            var content = $('<p class="mCommon_framePopup_defaultText mCrm_customerInfo_tab01">最多衹能傳三張圖片</p>');
            //弹窗
            var popupMD = new mCommon_framePopup({
                appendObj: $("body"),//浮出层和黑层显写入的容器
                contentObj: content.clone(),//内容区显示的对象
                spaceClose: true,//点击空白关闭
                winScroll:true,//不允许滚动
                //非模态弹窗不显示黑层，不显示按钮，过一会自动消失
                modal: false,//是否为模态弹窗
                showTime: 2000,//非模态弹窗停留时间
                showCallback:function(a){
                    //alert("show"+a.showFrame.html());
                },//显示弹窗后的回调 参数this
                hideCallback:function(a){
                    //alert("hide"+a.showFrame.html());
                }//隐藏弹窗后的回调  参数this
            });
            popupMD.showPopup();
        }
        else {
            $(this).attr("src", ctxPath+"/images/mCommon_basicIcon_cameraBlue.png");
            if (da.djJsReady){
                da.chooseImage({
                    type:1,
                    returnType:2,
                    current:0,
                    max:9,
                    success:function(res){

                        var newBase64=res[0].thumbData;
                        var path=res[0].filePath;
                        var index = path .lastIndexOf("\/");
                        var name = path .substring(index + 1, path .length);
                        mCrm_attPunch_addAtt_imageArray.push({id:i++,name:name,image:"data:image/jpg;base64,"+newBase64});
                        $('.mReleaseMessage_info_maskHeadArea').html('');

                        //根据容器宽高对图片进行缩放，并显示图片的中间部分，如果图小，放大充满容器。。
                        mCrm_attPunch_addAtt_appendImgData(mCrm_attPunch_addAtt_imageArray);

                        mCommon_jsImgCut0114($(".mCommon_controlThumbnail_item_img"),true);//图片剪裁
//
                        $('.mCommon_controlThumbnail_item').find('.mCommon_controlThumbnail_item_icon').children('img').tap(function(){
//
                            $(this).parents('.mCommon_controlThumbnail_item').css('display','none');
//
                            var dataObj=$(this).parents('.mCommon_controlThumbnail_item').data("data");
                            for (var j=0;j<mCrm_attPunch_addAtt_imageArray.length;j++){
                                if (mCrm_attPunch_addAtt_imageArray[j].id===dataObj.id){
                                    mCrm_attPunch_addAtt_imageArray.splice(j,1);
                                }
                            }
                        })
                    },
                    fail:function(res){}
                })
            }
            else {
                alert("请使用手机客户端");
            }
            $(this).attr("src", ctxPath+"/images/mCommon_basicIcon_camera.png");
            $(this).parent('.mReleaseMessage_info_toolBar_item').siblings().children('img').attr("src", ctxPath+"/images/basicIcon_address44.png");
        }
    }else if($(this).attr("src")==ctxPath+'/images/mCommon_basicIcon_cameraBlue.png'){
        $(this).attr("src", ctxPath+"/images/mCommon_basicIcon_camera.png");
        $(this).parent('.mReleaseMessage_info_toolBar_item').siblings().children('img').attr("src", ctxPath+"/images/basicIcon_address44.png");
    }else if($(this).attr("src")==ctxPath+'/images/basicIcon_address44.png'){
        $(this).attr("src", ctxPath+"/images/basicIcon_address44Blue.png");
        $(this).parent('.mReleaseMessage_info_toolBar_item').siblings().children('img').attr("src", ctxPath+"/images/mCommon_basicIcon_camera.png");
        $('#cardPage').hide();
        window.history.go(-1)
//                    dataArray=[];
//                    $('.mCrm_attPunch_content_mes').empty();
//                    initGoogleMap();
        $('#mapPage').show();
        document.title = mapTitle;
//                ll();
        $(this).attr("src", ctxPath+"/images/basicIcon_address44.png");
    }else if($(this).attr("src")==ctxPath+'/images/basicIcon_address44Blue.png'){
        $(this).attr("src", ctxPath+"/images/basicIcon_address44.png");
        $(this).parent('.mReleaseMessage_info_toolBar_item').siblings().children('img').attr("src", ctxPath+"/images/mCommon_basicIcon_camera.png");
    }
});
$('.mCommon_controlThumbnail_item').find('.mCommon_controlThumbnail_item_icon').children('img').tap(function(){
    $(this).parents('.mCommon_controlThumbnail_item').css('display','none');
})

$('.mCommon_basicLocation_table').on("click",function () {
    $('#cardPage').hide();
    window.history.go(-1)
    $('#mapPage').show();
    document.title = mapTitle;
})
//弹窗
function showDialog(text) {
    mCommon_jsFixedOneScreen_setFixedOneScreenObj.openFixedOneScreen({
        scrollVal : null,//scrollTop的值，选填，不填默认实际滚动值
        fixedOneScreenOpenFun : function(){}//固定一屏开启时的回调函数，选填
    });

    new mCommon_controlPagePopupPrompt_setPromptInfo({
        promptText:text,//提示的信息内容，字符串类型，必填
        setTimeVal:2000,//出现时间，在到达此时间后，自动关闭提示信息，默认值为2000毫秒，number类型，选填
        closeFun:function(){
//					alert('回调完了');
            //删除遮罩层
            mCommon_basicMask_setMaskObj.removeMask();
            //关闭固定一屏
            mCommon_jsFixedOneScreen_setFixedOneScreenObj.closeFixedOneScreen({
                scrollVal : null,//scrollTop的值，选填，不填默认开启时的滚动值
                fixedOneScreenCloseFun : function(){}//取消固定一屏时的回调函数，选填
            });
        }//关闭后的回调函数，选填
    });
}
$('#startCard').on("click",function () {
    //loading弹窗
    mCommon_basicLoadingShow("", true);

    //图片
    var photo_dataset = [];
    for (var i = 0; i < mCrm_attPunch_addAtt_imageArray.length; i++) {
        //获取图片的base64编码
        var base64Str = mCrm_attPunch_addAtt_imageArray[i].image;
        var index0 = base64Str.lastIndexOf(',');
        var content = base64Str.substring(index0 + 1, base64Str.length);
        //获取图片名
        var file_name = mCrm_attPunch_addAtt_imageArray[i].name;
        //获取图片后缀
        var index = file_name.lastIndexOf('.');
        var file_extname = file_name.substring(index + 1, file_name.length);
        file_name = file_name.substring(0, index);
        var photoObj = {
            "content": content,
            "file_extname": file_extname,
            "file_name": file_name
        }
        photo_dataset.push(photoObj);
    }

    var checkin_content=$('#content').val();



    var contentSuccess = $('<p class="mCommon_framePopup_defaultText mCrm_customerInfo_tab01">'+startCardSuccess+'</p>');
    //弹窗
    var popupMDSuccess = new mCommon_framePopup({
        appendObj: $("body"),//浮出层和黑层显写入的容器
        contentObj: contentSuccess.clone(),//内容区显示的对象
        spaceClose: true,//点击空白关闭
        winScroll:true,//不允许滚动
        //非模态弹窗不显示黑层，不显示按钮，过一会自动消失
        modal: false,//是否为模态弹窗
        showTime: 2000,//非模态弹窗停留时间
        showCallback:function(a){
            //alert("show"+a.showFrame.html());
        },//显示弹窗后的回调 参数this
        hideCallback:function(a){
            //alert("hide"+a.showFrame.html());
        }//隐藏弹窗后的回调  参数this
    });

    var contentFail = $('<p class="mCommon_framePopup_defaultText mCrm_customerInfo_tab01">'+startCardFail+'</p>');
    //弹窗
    var popupMDFail = new mCommon_framePopup({
        appendObj: $("body"),//浮出层和黑层显写入的容器
        contentObj: contentFail.clone(),//内容区显示的对象
        spaceClose: true,//点击空白关闭
        winScroll:true,//不允许滚动
        //非模态弹窗不显示黑层，不显示按钮，过一会自动消失
        modal: false,//是否为模态弹窗
        showTime: 2000,//非模态弹窗停留时间
        showCallback:function(a){
            //alert("show"+a.showFrame.html());
        },//显示弹窗后的回调 参数this
        hideCallback:function(a){
            //alert("hide"+a.showFrame.html());
        }//隐藏弹窗后的回调  参数this
    });
    var reqData = {
        "checkin_type":"arrive",
        "current_location":current_location,
        "latitude":lat,
        "longitude":lon,
        "photo_dataset":photo_dataset,
        "checkin_content":checkin_content,
        "customer_id":customer_id,
        "locale":locale,
        "access_token":access_token,
        "companyID":companyID,
        "personID":personID
    }
    $.ajax({
        type: "POST",
        url: "/crm/r/mp/crm/v2/sendOuterCard",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(reqData),
        success: function (json) {
            var data=json.std_data;
            var parameter=data.parameter;
            var checkin_result=parameter.checkin_result;
            if (checkin_result){
                showDialog(startCardSuccess);
                // popupMDSuccess.showPopup();
                mCommon_basicLoadingRemove();
                setTimeout(function () {
                    var u=navigator.userAgent;
                    if (u.indexOf('Android')>1 || u.indexOf('Adr')>1){
                        //是android，使用window.close跳回首页
                        window.opener=null;
                        window.open("about:blank", "_self");
                        window.close();
                    }
                    else {
                        //是IOS,使用jssdk跳回首页
                        if (da.djJsReady){
                            da.historyBack();
                        }
                    }
                }, 1000);
            }
            else {
                showDialog(startCardFail);
                // popupMDFail.showPopup();
                mCommon_basicLoadingRemove();
//                        setTimeout(function () {
//                            window.opener=null;
//                            window.open("about:blank", "_self");
//                            window.close();
//                        },1000);
            }
        }
    })



})
$('#endCard').on("click",function () {

    //loading弹窗
    mCommon_basicLoadingShow("", true);

    //图片
    var photo_dataset = [];
    for (var i = 0; i < mCrm_attPunch_addAtt_imageArray.length; i++) {
        //获取图片的base64编码
        var base64Str = mCrm_attPunch_addAtt_imageArray[i].image;
        var index0 = base64Str.lastIndexOf(',');
        var content = base64Str.substring(index0 + 1, base64Str.length);
        //获取图片名
        var file_name = mCrm_attPunch_addAtt_imageArray[i].name;
        //获取图片后缀
        var index = file_name.lastIndexOf('.');
        var file_extname = file_name.substring(index + 1, file_name.length);
        file_name = file_name.substring(0, index);
        var photoObj = {
            "content": content,
            "file_extname": file_extname,
            "file_name": file_name
        }
        photo_dataset.push(photoObj);
    }

    var checkin_content=$('#content').val();

    var contentSuccess = $('<p class="mCommon_framePopup_defaultText mCrm_customerInfo_tab01">'+endCardSuccess+'</p>');
    //弹窗
    var popupMDSuccess = new mCommon_framePopup({
        appendObj: $("body"),//浮出层和黑层显写入的容器
        contentObj: contentSuccess.clone(),//内容区显示的对象
        spaceClose: true,//点击空白关闭
        winScroll:true,//不允许滚动
        //非模态弹窗不显示黑层，不显示按钮，过一会自动消失
        modal: false,//是否为模态弹窗
        showTime: 2000,//非模态弹窗停留时间
        showCallback:function(a){
            //alert("show"+a.showFrame.html());
        },//显示弹窗后的回调 参数this
        hideCallback:function(a){
            //alert("hide"+a.showFrame.html());
        }//隐藏弹窗后的回调  参数this
    });

    var contentFail = $('<p class="mCommon_framePopup_defaultText mCrm_customerInfo_tab01">'+endCardFail+'</p>');
    //弹窗
    var popupMDFail = new mCommon_framePopup({
        appendObj: $("body"),//浮出层和黑层显写入的容器
        contentObj: contentFail.clone(),//内容区显示的对象
        spaceClose: true,//点击空白关闭
        winScroll:true,//不允许滚动
        //非模态弹窗不显示黑层，不显示按钮，过一会自动消失
        modal: false,//是否为模态弹窗
        showTime: 2000,//非模态弹窗停留时间
        showCallback:function(a){
            //alert("show"+a.showFrame.html());
        },//显示弹窗后的回调 参数this
        hideCallback:function(a){
            //alert("hide"+a.showFrame.html());
        }//隐藏弹窗后的回调  参数this
    });

    var reqData = {
        "checkin_type":"leave",
        "current_location":current_location,
        "latitude":lat,
        "longitude":lon,
        "photo_dataset":photo_dataset,
        "checkin_content":checkin_content,
        "customer_id":customer_id,
        "locale":locale,
        "access_token":access_token,
        "companyID":companyID,
        "personID":personID
    }


    $.ajax({
        type: "POST",
        url: "/crm/r/mp/crm/v2/sendOuterCard",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(reqData),
        success: function (json) {
            var data=json.std_data;
            var parameter=data.parameter;
            var checkin_result=parameter.checkin_result;
            if (checkin_result){
                mCommon_basicLoadingRemove();
                mCommon_jsFixedOneScreen_setFixedOneScreenObj.openFixedOneScreen({
                    scrollVal : null,//scrollTop的值，选填，不填默认实际滚动值
                    fixedOneScreenOpenFun : function(){}//固定一屏开启时的回调函数，选填
                });
                mCommon_basicMask_setMaskObj.addMask();

                //弹窗
                mCommon_controlPagePopupPromptModal_setTopPositionObj = new mCommon_controlPagePopupPromptModal_setTopPosition({
                    titleText:endCardSuccess,//弹框显示的提示标题,字符串类型，必填
                    contentText:$('<p class="mCommon_controlPagePopupPromptModal_textContent wordBreak">'+isToFill+'</p>'),//弹框显示的提示内容，jquery类型，选填
//						btnType:'',//按钮类型，两个值，一个是transverse表示横向按钮，另一个是endwise表示纵向按钮，字符串类型，默认是transverse，选填
                    btnType:'transverse',//按钮类型，两个值，一个是transverse表示横向按钮，另一个是endwise表示纵向按钮，字符串类型，默认是transverse，选填


                    confirmText:toFill,//确定功能显示的文字
                    clickConfirmFun:function(index,thisObj){
                        //關閉彈窗
                        mCommon_jsFixedOneScreen_setFixedOneScreenObj.closeFixedOneScreen({
                            scrollVal : null,//scrollTop的值，选填，不填默认开启时的滚动值
                            fixedOneScreenCloseFun : function(){}//取消固定一屏时的回调函数，选填
                        });
                        mCommon_basicMask_setMaskObj.removeMask();
                        mCommon_controlPagePopupPromptModal_setTopPositionObj.closePrompt();
                        //跳转到新增客户日报页面
                        var url = "";
                        if (customer_id){
                            //选择客户签到,将客户信息带入新增日报页面
                            url = "http://122.146.157.159/crm/r/mp/crm/v2/addCustomer?locale="+locale+"&personID="+personID+"&companyID="+companyID+"&mobile_token="+access_token+"&latitude="+customerLat+"&longitude="+customerLon+"&customerId="+customer_id+"&customerName="+$('#currentLocation').html()+"&customerAttr="+current_location;
                        }
                        else {
                            url = "http://122.146.157.159/crm/r/mp/crm/v2/addCustomer?locale="+locale+"&personID="+personID+"&companyID="+companyID+"&mobile_token="+access_token;
                        }
                        if (typeof(da) == "object"){
                            da.checkFun({funName:"createWindow",success: function () {
                                try{
                                    da.createWindow({'type':null,'url':url});
                                }catch (e){
                                    window.location.href = url;
                                }
                            },fail:function () {
                                window.location.href = url;
                            }});
                        }else {
                            window.location.href = url;
                        }
                    },//确定功能按钮的回调函数
                    cancleText:no,//取消功能显示的文字
                    cancleShow:true,//取消功能的按钮是否显示，默认值是true-按钮显示，选填
                    clickCancleFun:function(index,thisObj){
                        //去掉彈窗
                        mCommon_jsFixedOneScreen_setFixedOneScreenObj.closeFixedOneScreen({
                            scrollVal : null,//scrollTop的值，选填，不填默认开启时的滚动值
                            fixedOneScreenCloseFun : function(){}//取消固定一屏时的回调函数，选填
                        });
                        mCommon_basicMask_setMaskObj.removeMask();
                        mCommon_controlPagePopupPromptModal_setTopPositionObj.closePrompt();
                        //關閉頁面
                        var u=navigator.userAgent;
                        if (u.indexOf('Android')>1 || u.indexOf('Adr')>1){
                            //是android，使用window.close跳回首页
                            window.opener=null;
                            window.open("about:blank", "_self");
                            window.close();
                        }
                        else {
                            //是IOS,使用jssdk跳回首页
                            if (da.djJsReady){
                                da.historyBack();
                            }
                        }
                    },//取消功能按钮的回调函数
                    isShow:true,//默认显示弹窗,布尔值，选填

                });
            }
            else {
                showDialog(endCardFail)
                // popupMDFail.showPopup();
                mCommon_basicLoadingRemove();
            }
        }
    })

})
$().ready(function(){
    latitude="";
    longitude="";

    var contentObj = $('<p class="mCommon_framePopup_defaultText">'+lacateFail+'</p>');
    var buttonObj = $('<div class="mCommon_basicBtn_box2Center" >' +
        '<a id="popupBtn" class="mCommon_basicBtn mCommon_basicBtn_blue" tapclass="mCommon_basicBtn_blue_tap">' +
        '<i>確定</i>' +
        '</a>' +
        '</div>');
    //模态====================签到成功弹窗
    var popup = new mCommon_framePopup({
        appendObj: $("body"),//浮出层和黑层显写入的容器
        contentObj: contentObj.clone(),//内容区显示的对象
        spaceClose: false,//点击空白关闭
        buttonObj: buttonObj,//按钮区显示的对象
        winScroll:true,//不允许滚动
        showCallback:function(a){
//                alert("show"+a.showFrame.html());
        },//显示弹窗后的回调 参数this
        hideCallback:function(a){
            //alert("hide"+a.showFrame.html());
        }//隐藏弹窗后的回调  参数this
    });
    $("#popupBtn").click(function () {
        popup.hidePopup();
        da.historyBack();
        $(".mCommon_framePopup_winBox_win").find("ul").removeClass("mCommon_framePopup_winBox_winContnetwhite");
    });


    da.ready(function () {
        da.inChina({
            success: function (res) {
                if (res.isChina==1){
                    //在在大陆，使用高德地图
                    initGaodeMap();
                }
                else {
                    //不在大陆，使用谷歌地图
                    initGoogleMap();
                }
            },
            fail: function () {
//                        alert("请开始定位权限");
                popup.showPopup();
                $(".mCommon_framePopup_winBox_win").find("ul").addClass("mCommon_framePopup_winBox_winContnetwhite");
            },
            error:function () {
//                        alert("请开始定位权限");
                popup.showPopup();
            }
        })
    })

    var resizeFun = function () {//设置DOM元素大小与位置
        //设置地图显示位置
        var width=$(".mCrm_attPunch_content_mes_box").width()*2/3;//屏幕宽度的2/3
        var height=$(window).height()/2;//屏幕高度的1/2
        var newH=Math.min(width,height);//选取最小的值作为地图的高度
        $('.mCrm_attPunch_content_mes_map').css('height',newH+"px");//设置地图的高度

        //计算暂无更多数据显示位置
        var tT = ($(window).height() - newH - 60 -114 )/2 ;
        console.log(tT)
        $('.mCommon_controlPrompt_box').css('padding-top',tT+"px");

    }
    resizeFun();
    $(window).resize(function(){
        resizeFun()
    });
    var searchbox=new mCommon_basicSearch151124({
        boxObj:$(".mCommon_basicSearch151124_box"),//搜索的外层div，类型是jq对象
        tapBoxFun:function(inputObj){//点击输入框的回调函数，参数是input jq对象

        },
        changeValueFun:function(inputObj,inputValue){//填写的值发生变化时的回调函数，参数是input jq对象
//              alert(inputValue);
        },
        searchKeyDownFun:function(val){ //当按下的键为‘搜索’时，回调，参数是input的value值

        },
        clearValueFun:function(val){//清空input的value时，回调，参数 input的value值

        },
        searchBtnFun:function(basicSearchInputObj){//点击右侧的搜索按钮时，回调，参数为输入框jq对象

        },
        cancelBtnFun:function(basicSearchInputObj){//点击左侧的取消按钮时，回调，参数为输入框jq对象

        }
    });
    var test=new mCommon_jsFixedTop({
        fixedObj:$(".mCrm_attPunch_content_mes_header")
        //position:"fixed"//定位方式"fixed"或是"absolute" 默认fixed
    });//实例

    //重新定位touch事件
    $("#mCrm_attPunch_content_mes_locat").on("touchstart",function (){
        $(this).removeClass("mCrm_attPunch_content_mes_locat").addClass("mCrm_attPunch_content_mes_locatGray");
    });
    $("#mCrm_attPunch_content_mes_locat").on("touchend",function (){
        $(this).removeClass("mCrm_attPunch_content_mes_locatGray").addClass("mCrm_attPunch_content_mes_locat");
    });

    //当前地点点击事件
    $('#current').on("click",function () {
        current_location=$('#currentAddress').html();
        lat=latitude;
        lon=longitude;
        customer_id="";
        customerLat="";
        customerLon="";
        $('#currentLocation').html(current_location);
        $('#cardPage').show();
        $('#mapPage').hide();
        document.title=title;
        window.location = "#page2";
    })



    mCommon_basicSingleChoice($(".mCommon_basicSingleChoiceList"),false,function(c){});
    mCommon_basicSingleChoice($(".mCommon_basicSingleChoiceList"));//单选
    //根据容器宽高对图片进行缩放，并显示图片的中间部分，如果图小，放大充满容器。。
    // mCrm_attPunch_addAtt_appendImgData(mCrm_attPunch_addAtt_imageArray);
    // mCommon_jsImgCut0114($(".mCommon_controlThumbnail_item_img"),true);//图片剪裁

    if (window.history && window.history.pushState) {

        $(window).on('popstate', function() {
            var hashLocation = location.hash;
            var hashSplit = hashLocation.split("#!/");
            var hashName = hashSplit[1];

            if (hashName !== '') {
                var hash = window.location.hash;
                if (hash === '') {
                    $('#cardPage').hide();
                    window.history.go(-1)
                    $('#mapPage').show();
                    document.title = mapTitle;
                    mCommon_basicLoadingRemove();
                }
            }
        });


    }
})