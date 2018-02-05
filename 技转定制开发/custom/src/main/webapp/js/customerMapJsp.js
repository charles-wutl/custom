var width=$(window).width();
var height=$(window).height();
$('.mCustomerMap_customerMap').css('width',width);
$('.mCustomerMap_customerMap img').css('width',width);
$('.mCustomerMap_customerMap').css('height',height);
$('.mCustomerMap_customerMap img').css('height',height);
$(window).resize(function(){

    $('.mCustomerMap_customerMap').css('width',width);
    $('.mCustomerMap_customerMap img').css('width',width);
    $('.mCustomerMap_customerMap').css('height',height);
    $('.mCustomerMap_customerMap img').css('height',height);
});


da.ready(function () {
    da.inChina({
        success: function (res) {
            if (res.isChina==1){
                //在大陆，用高德地图
                initGaodeMap();
            }
            else {
                //不在大陆，使用谷歌地图
                initGoogleMap();
            }
        },
        fail:function (res) {
            //定位失败，提示请打开定位权限
            popup.showPopup();
        }

    })
})

function initGaodeMap() {
    var latitude=null;
    var longitude=null;
    var infoWindow = new AMap.InfoWindow();
    var map=new AMap.Map('customerMap',{
        resizeEnable:true,
        zoom:15,
        center:[116.39751,39.908685]
    })
    //高德地图上标点
    function createGaodeMarker(lnglatXY,info) {
        var marker = new AMap.Marker({
            position: lnglatXY,
            icon: ctxPath+"/images/map_mark.png",
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

    //定位
    da.ready(function () {
        if (longitude==null){
            da.inChina({
                success: function (res) {

                    longitude = res.lon;
//                        longitude = 121.4509;
                    latitude = res.lat;
//                        latitude = 31.3201;
                    var lnglatXY=[longitude,latitude];

                    map=new AMap.Map('customerMap',{
                        resizeEnable:true,
                        zoom:15,
                        center:[longitude,latitude]
                    })

                    var marker = new AMap.Marker({
                        position: lnglatXY,
                        map: map
                    });
//                        //请求数据
                    var page=0;
                    getData();
                    function getData() {
                        page++;
                        $.ajax({
                            type: "POST",
                            url: "/crm/r/mp/crm/customer/customer/around",
                            data: {
                                "nowPage": page,
                                "eachShowNum": 10,
                                "locale": locale,
                                "longitude": longitude,
                                "latitude": latitude,
                                "title_fields_dataset": "GG003",    //GG003 客戶名稱
                                "special_fields_dataset": "DISTANCE",  //距離
                                "brief_fields_dataset": "GG036",  //地址
                                "companyID":companyID,
                                "access_token":mobile_token,
                                "personID":personID
                            },
                            success: function (json) {
                                json = JSON.parse(json);
                                var customers=json.std_data.parameter.list_dataset;
                                var total=json.std_data.parameter.total_cnt;  //总数
                                var pageNum=parseInt(total/10)+1;     //总页数
                                for (var i=0;i<customers.length;i++){
                                    createGaodeMarker([parseFloat(customers[i].longitude),parseFloat(customers[i].latitude)],customers[i].title.field_content);
//                                        map.setFitView();
                                }
                                if (page<pageNum){
                                    getData();
                                }

                            }
                        })
                    }


                }

            })
        }
    })

}

function initGoogleMap(){
    var longitude=null;
    var latitude=null;

    var infowindow = new google.maps.InfoWindow(); //信息框
//        var earch_radius=6378137.0  //地球半径，单位M
    var map=new google.maps.Map(document.getElementById('customerMap'),{       //将地图显示在相应div控件中
        center:new google.maps.LatLng(39.908685,116.39751),    //地图中心点
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
            icon: ctxPath+'/images/map_mark.png',
            position: latlng
        });
        //点击标签时显示地点名称
        google.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent(place.title);
            infowindow.open(map, this);
        });
    }

    //用高德jssdk定位
    da.ready(function () {
        if (longitude == null) {
            da.inChina({
                success: function (res) {
                    longitude = res.lon;
//                        longitude = 121.4509;
                    latitude = res.lat;
//                        latitude = 31.3205;

                    var myCenter=new google.maps.LatLng(latitude,longitude);
                    map.setCenter(myCenter);
                    var marker=new google.maps.Marker({     //当前位置标识
                        position:myCenter,
                        map:map,
                        table:'我'
                    });

                    //请求数据
                    var page=0;
                    getData();
                    function getData() {
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
                                "companyID":companyID,
                                "access_token":mobile_token,
                                "personID":personID
                            },
                            success: function (json) {
                                json = JSON.parse(json);
                                var customers=json.std_data.parameter.list_dataset;
                                var total=json.std_data.parameter.total_cnt;  //总数
                                var pageNum=parseInt(total/10)+1;     //总页数
                                for (var i=0;i<customers.length;i++){
                                    var place={
                                        "latitude":customers[i].latitude,
                                        "longitude":customers[i].longitude,
                                        "title":customers[i].title.field_content
                                    }
                                    createMarker(place);
                                }
                                if (page<pageNum){
                                    getData();
                                }

                            }
                        })
                    }

                }
            })
        }
    })

}

$('#mCrm_attPunch_content_mes_locat').on("click",function () {

    da.ready(function () {
        da.inChina({
            success: function (res) {
                if (res.isChina==1){
                    initGaodeMap();
                }
                else {
                    initGoogleMap();
                }
            }
        })
    })
})

var contentObj = $('<p class="mCommon_framePopup_defaultText">'+locateFail+'</p>');
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



var width=$('.mCommon_frameContent0_page').width();
$('.mCustomerMap_customerMap').css('width',width);
$('.mCustomerMap_customerMap img').css('width',width);
$(window).resize(function(){
    $('.mCustomerMap_customerMap').css('width',width);
    $('.mCustomerMap_customerMap img').css('width',width);
});
$("#cusListBtn").on("click",function () {
    window.open(ctxPath+"/r/mp/crm/v2/customerNearby/list?locale="+locale+"&companyID="+companyID+"&mobile_token="+mobile_token+"&access_token="+access_token+"&personID="+personID,"_self");
})

//重新定位touch事件
$("#mCrm_attPunch_content_mes_locat").on("touchstart",function (){
    $(this).removeClass("mCrm_attPunch_content_mes_locat").addClass("mCrm_attPunch_content_mes_locatGray");
});
$("#mCrm_attPunch_content_mes_locat").on("touchend",function (){
    $(this).removeClass("mCrm_attPunch_content_mes_locatGray").addClass("mCrm_attPunch_content_mes_locat");
});