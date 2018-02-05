//dataArray数据
//var dataArr = [
//      ｛
//          tabType:"dropDownTab",//标签类型,必填，textTab为文字标签，dropDownTab为下拉标签，sortTab为排序标签，imgTab为图片标签
//          text:"新品",//标签显示的内容
//          state:"normal",//选中状态，shrink激活有浮层状态，stretch激活无浮层状态,normal正常状态
//          imgState:"normal",//只用于图片类型的浮层展开关闭状态，shrink激活有浮层状态，normal正常状态
//          imgArr:[//当类型为3的时候才会解析图片地址和默认显示图片
//                "../images/mCommon_jsFilterSearchNormal.png",
//          ],
//          id:"dropDownTab1",//唯一标识 必填
//          contentType:"mCommon_basicMultilevelSelect",//选项内容的类型"mCommon_basicMultilevelSelect"/"search"/"mCommon_controlSelectSet"
//          contentTapFun:function(){//简单的点击回调"search"执行这个，其他的不执行
//          },
//          contentSetting:{},//选项的设置项，实例化时使用//"search"之外有这个，其他的不执行
//          contentSetting_edit:{}//加工好的setting,不需要穿参数，自动生成
//        }
//
//］;

//多级筛选需显示在filer上的文字写在filterName属性里，否则显示name

function mCommon_controlTabAndFilter(options) {
    this.setting = {
        $appendBox_fliter: null,//筛选条写入的容器,必填
        $appendBox_overlay: $("body"),//浮层写入的容器,默认body里
        dataArray: [],//选项的数组，必填
        fliterFixedTop:true,//筛选条在页面中是否固定到顶部；默认true
        closeOverlayScrollTop:0,//关闭浮层后原有页面的scrollTop位置，默认0
        fliterTapFun:function(id){//点击fliterd回调参数是ID
        },
        openOverlayFun:function(){//打开浮层的回调
        },
        closeOverlayFun:function(){//关闭浮层的回调
        }
    };
    options = options || {};
    $.extend(true, this.setting, options);
    var self = this;

    //控件统一控制＝＝＝＝
    var instanceId;//控件的实例id
    if (!mCommonObj.mCommon_basicTabAndFilter) {//查看是否有这种类型，没有
        mCommonObj.mCommon_basicTabAndFilter = {};//造一个空类型
    }
    for (var i = 0; true; i++) {
        instanceId = "mCommon_basicTabAndFilter" + i;//生成id
        if (!mCommonObj.mCommon_basicTabAndFilter[instanceId]) {//如果没有这个id
            break;//终止循环
        }
    }
    mCommonObj.mCommon_basicTabAndFilter[instanceId] = self;//生成这个类型 和 一个实例
    this.id = instanceId;//控件的id

    //定义变量＝＝＝＝
    this.fliter={};//fliter实例对象
    this.contentArray=[];//储存下拉的 对象 ｛id:this.setting.dataArray[n].id,domObj:{}｝
    this.ScreenObj = {};//固定一屏实例化对象
    this.MaskObj={};//黑层的实例化对象
    this.$filert={};//筛选条 jq对象
    this.flirterFixedTop={};//筛选条固定顶部实例
    var $overlay=$('<div class="mCommon_controlTabAndFilter_overlay">'+//浮出层
            '<div class="mCommon_controlTabAndFilter_overlay_content">'+
            '<!--标签容器-->'+
            '<div class="mCommon_controlTabAndFilter_overlay_filter">'+
            '<!--筛选条-->'+
            '</div>'+
            '<!--标签容器end-->'+
            '<!--标签下内容-->'+
            '<div class="mCommon_controlTabAndFilter_overlay_options">'+
            '<!--写入选项-->'+
            '</div>'+
            '<!--标签下内容end-->'+
            '</div>'+
            '</div>');
    var $filterBox=$overlay.find(".mCommon_controlTabAndFilter_overlay_filter");//筛选条盒子
    var $optionBox=$overlay.find(".mCommon_controlTabAndFilter_overlay_options");//选项盒子

    //方法定义＝＝＝＝
    //初始化fiter条
    this.initFilter=function(){



        //筛选条初始化
        this.fliter = new mCommon_basicFilterBlend_setBlendTab({//筛选条出事化
                containerObj:self.setting.$appendBox_fliter,//筛选条写入的容器
                dataArr:self.setting.dataArray,//数据
                callBack:function(id,currentObj){//回调函数
                    self.fliterTap(id);//fliter点击的方法
                    try{
                        self.setting.fliterTapFun(id);//点击筛选条的回调
                    }catch(e){}
                }
            });



        this.$filert=self.setting.$appendBox_fliter.children();//筛选条的jq对象

        if(this.setting.fliterFixedTop){//如果设置搜索条固定顶部
            this.flirterFixedTop=new mCommon_jsFixedTop({fixedObj:this.$filert});//筛选条固定顶部实例
        }

    };

    //打开下拉层
    this.openDownDiv=function(id){
        var dataObj=this.getDataById(id,this.setting.dataArray);//对应数据对象

        //改签的状态
        var tabObj=this.fliter.findDomById(id);//签的对象
        if(tabObj.attr("tabtype")=="imgTab"){
            this.fliter.setTabState(tabObj,"1","shrink");//签改为 shrink 下拉状态
        }else{
            this.fliter.setTabState(tabObj,"shrink");//签改为 shrink 下拉状态
        }


        if(dataObj.contentType=="mCommon_basicMultilevelSelect"){//多级筛选
            //下拉的显示
            var contentObj_=this.getDataById(id,this.contentArray).domObj;//返回实例对象

            contentObj_.show();//多级筛选显示
        }else if(dataObj.contentType=="mCommon_controlSelectSet"){//选项组
            //下拉的显示
            var contentObj_=this.getDataById(id,this.contentArray).domObj;//返回实例对象

            contentObj_.show();//多级筛选显示
        }else if(dataObj.contentType=="calendar"){//日历
            //下拉的显示
            var contentObj_=this.getDataById(id,this.contentArray).domObj;//返回实例对象

            contentObj_.show();//日历选显示
        }

    };


    //关闭下拉层，关闭自己,改签的状态
    this.closeDownDiv=function(id){

        //改签的状态
        var tabObj=this.fliter.findDomById(id);//签的对象
        if(this.tapIsStretch(id)){//判断这个签是否为激活无下拉，返回 true／false；有选中项就为“激活无下拉”，无选中项就为“normal”
            if(tabObj.attr("tabtype")=="imgTab"){
                this.fliter.setTabState(tabObj,"1","stretch");//签改为 stretch 无下拉状态
            }else{
                this.fliter.setTabState(tabObj,"stretch");//签改为 stretch 状态
            }

        }else{
            if(tabObj.attr("tabtype")=="imgTab"){
                this.fliter.setTabState(tabObj,"0","normal");//签改为 normal 下拉状态
            }else{
                this.fliter.setTabState(tabObj,"normal");//签改为 normal 下拉状态
            }
        }


        var dataObj=this.getDataById(id,this.setting.dataArray);//对应数据对象
        if(dataObj.contentType=="mCommon_basicMultilevelSelect"){//多级筛选
            //下拉的显示
            var contentObj_=this.getDataById(id,this.contentArray).domObj;//返回实例对象
            contentObj_.hide();//多级筛选显示
        }else if(dataObj.contentType=="mCommon_controlSelectSet"){//选项组
            //下拉的显示
            var contentObj_=this.getDataById(id,this.contentArray).domObj;//返回实例对象
            contentObj_.hide();//多级筛选显示
        }else if(dataObj.contentType=="calendar"){//日历
            //下拉的显示
            var contentObj_=this.getDataById(id,this.contentArray).domObj;//返回实例对象
            contentObj_.hide();
        }


    };

     //判断这个签是否为激活无下拉，返回 true／false；有选中项就为“激活无下拉”，无选中项就为“normal”
    this.tapIsStretch=function(tabId){//参数签的id
        var tapIsStretch=false;//不是 激活无下拉
        var dataObj_=this.getDataById(tabId,this.setting.dataArray);//返回数据对象
        if(dataObj_.contentType=="mCommon_controlSelectSet"){//如果是选项组
            var contentObj_=this.getDataById(tabId,this.contentArray).domObj;//返回实例对象,下拉的
            //检查实例中的数据是否有激活的按钮数据
            var array1=contentObj_.setting.dataArray;
            for(var i in array1){
                var array2=array1[i].optinsArray;
                for(var n in array2){
                    var optionItem=array2[n];
                    if(optionItem.state=="selected"){//如果选项选中
                        tapIsStretch=true;//是 激活无下拉
                        return tapIsStretch;//结束方法
                    }


                }
            }


            //var selectedArray=contentObj_.getSelectedOptins();//选中选项的ID;返回 ID 数组
            //if(selectedArray.length > 0){//选中选项个数 大于0
            //    tapIsStretch=true;//是 激活无下拉
            //}


        }
        if(dataObj_.contentType=="calendar"){//如果是日历
            var contentObj_=this.getDataById(tabId,this.contentArray).domObj;//返回实例对象,下拉的
            //检查实例中的数据是否有激活的数据
            if(contentObj_.selectedDate.confirmDate !=""){
                tapIsStretch=true;//是 激活无下拉
                return tapIsStretch;//结束方法
            }

        }





        return tapIsStretch;
    };

    //fliter点击的方法
    this.fliterTap=function(id){//参数是点击的filter ID
        var dataObj=this.getDataById(id,this.setting.dataArray);//点击的数据对象
        if(dataObj.contentType=="search"){//点击的是查询
            try{
                dataObj.contentTapFun();//执行传入的方法
            }catch(e){}
        }else if(dataObj.contentType=="mCommon_basicMultilevelSelect" || dataObj.contentType=="mCommon_controlSelectSet" || dataObj.contentType=="calendar"){//有下拉层的签点击
            var tabObj=this.fliter.findDomById(id);//签的对象
            var tabState=this.fliter.getTabState(tabObj);//点击签的状态
            //状态：shrink激活有浮层状态，stretch激活无浮层状态,normal正常状态
            if(tabState=="shrink"){//有浮层===shrink激活 有浮层状态
                this.closeOverlay();//关闭浮层
                //this.closeDownDiv(id);//关闭下拉
            }else if(tabState=="normal" || tabState=="stretch"){//无浮层===stretch激活无浮层状态,normal正常状态
                this.openOverlay();//打开浮层
                //关闭其他下拉
                for(var k in this.contentArray){//轮训 所有下拉
                   var item_id= this.contentArray[k].id;//其中一个下拉的 id
                    if(item_id!=id){//不是当前id
                        this.closeDownDiv(item_id);//关闭下拉
                    }
                }
                //打开当前下拉
                this.openDownDiv(id);//打开下拉
            }

        }
    };


    //下拉选项整理 整理setting
    this.contentSettingEdit=function(){
        for(var i in this.setting.dataArray){//轮训数据数组
            var dataObj=self.setting.dataArray[i];//一个数据对象
            var setting_=dataObj.contentSetting;//实例化的setting的obj
            var contentSetting_edit={};//整理好的setting对象
            if(dataObj.contentType=="mCommon_basicMultilevelSelect"){//多级筛选====
                //console.log(setting_);
                contentSetting_edit.$appendBox=$optionBox;//写入的容器,必填
                contentSetting_edit.dataArray=setting_.dataArray;//选项的数组，必填
                contentSetting_edit.selectedFun_old=setting_.selectedFun;//取回调函数
                contentSetting_edit.tapFun_old=setting_.tapFun;//取回调函数
                //var selectedFun_=setting_.selectedFun;
                contentSetting_edit.selectedFun=function(ObjData){//选中了的回调函数 参数是最后激活的数据对象
                    var name=ObjData.name;//选中的名字
                    if(ObjData.filterName){//如果有filer显示名
                        name=ObjData.filterName;//显现 filter名称
                    }
                    var tabId=self.findShrinkId();//找到激活签的id
                    var tabObj=self.fliter.findDomById(tabId);//激活签的dom对象
                    self.fliter.tabContentBackFill(tabObj,name);//标签的文字回填
                    self.closeOverlay();//关闭浮层
                    try {
                        this.selectedFun_old(ObjData);//执行传入的回调
                    }catch(e){}
                };
                contentSetting_edit.tapFun=function(ObjData){//点击的回调 参数是最后激活的数据对象
                    try {
                        contentSetting_edit.tapFun_old(ObjData);//执行传入的回调
                    }catch(e){}
                };
                contentSetting_edit.headerHeight=45;//头部高度
                contentSetting_edit.footerHeight=0;//底部高度

            }else if(dataObj.contentType=="mCommon_controlSelectSet"){//选项组====
                contentSetting_edit.$appendBox= $optionBox;//写入的容器,必填
                contentSetting_edit.dataArray=setting_.dataArray;//数据数组，必填
                contentSetting_edit.maxHeight=null;//最大高度；默认窗口高度的75%
                contentSetting_edit.$header=self.$filert;//头部对象
                contentSetting_edit.$footer=null;//尾部对象
                contentSetting_edit.tapOptinFun_old=setting_.tapOptinFun;//传入的参数
                contentSetting_edit.enterFun_old=setting_.enterFun;//传入的参数
                contentSetting_edit.tapOptinFun=function(id){//点击的每个选项的回调，参数点击的id
                    try{
                        this.tapOptinFun_old(id);//执行回调函数
                    }catch(e){}
                    //console.log("tapOptinFun"+id);
                };
                contentSetting_edit.enterFun=function(idArray) {//点击完成按钮的回调，参数选中的idArray
                    //console.log("enterFun"+idArray.length);
                    try{
                        this.enterFun_old(idArray);//执行回调函数
                    }catch(e){}


                    self.closeOverlay();//关闭浮出层
                    //self.closeDownDiv(id);//关闭下拉和修改fliter状态
                    //修改fuliter按钮状态//关闭下拉层
                    //for(var i in self.contentArray){//轮询有下拉的按钮
                    //    var id=self.contentArray[i].id;//取下拉对应的id
                    //    if(self.fliter.getTabState(self.fliter.findDomById(id))=="shrink"){//如果fliter是打开状态
                    //        self.closeDownDiv(id);//关闭下拉和修改fliter状态
                    //    }
                    //}


                };
                contentSetting_edit.resetFun=function(idArray) {//点击重置按钮的回调，参数选中的idArray
                    //console.log("resetFun"+idArray.length);
                    try{
                        setting_.enterFun(idArray);//执行回调函数
                    }catch(e){}
                };


            }else if(dataObj.contentType=="calendar"){//选项组====
                contentSetting_edit.parentObj = $optionBox;//写入的容器,必填
                //contentSetting_edit.$appendBox= $optionBox;//写入的容器,必填
                contentSetting_edit.dataArray=setting_.dataArray;//数据数组，必填
                contentSetting_edit.maxHeight=null;//最大高度；默认窗口高度的75%
                contentSetting_edit.$header=self.$filert;//头部对象
                contentSetting_edit.$footer=null;//尾部对象
                contentSetting_edit.serverDate=setting_.serverDate;
                contentSetting_edit.setlastDaysDisabled=setting_.setlastDaysDisabled;
                contentSetting_edit.setPreventChoosePreMonth=setting_.setPreventChoosePreMonth;
                contentSetting_edit.changeHeaderYearMonth=setting_.changeHeaderYearMonth;
                contentSetting_edit.showChooseMonth=setting_.showChooseMonth;
                contentSetting_edit.tapChooseMonthCallback=setting_.tapChooseMonthCallback;
                contentSetting_edit.tapPreMonthCallback=setting_.tapPreMonthCallback;
                contentSetting_edit.tapNextMonthCallback=setting_.tapNextMonthCallback;
                contentSetting_edit.defaultSelectDay=setting_.defaultSelectDay;
                contentSetting_edit.cancelSelectCurrentDay=setting_.cancelSelectCurrentDay;
                contentSetting_edit.getActivityDay=setting_.getActivityDay;
                contentSetting_edit.tapDayCallback=setting_.tapDayCallback;
                contentSetting_edit.swipeLeftCallback = setting_.swipeLeftCallback;
                contentSetting_edit.swipeRightCallback = setting_.swipeRightCallback;
                contentSetting_edit.showBtnResetAndConfirm=setting_.showBtnResetAndConfirm;
                contentSetting_edit.tapResetCallback=setting_.tapResetCallback;
                contentSetting_edit.tapConfirmCallback_old=setting_.tapConfirmCallback;
                contentSetting_edit.tapConfirmCallback=function(selectData) {//点击完成按钮的回调，参数选中的日期或月份
                        try{
                            this.tapConfirmCallback_old(selectData);//执行回调函数
                        }catch(e){}

                        self.closeOverlay();//关闭浮出层
                    };
                contentSetting_edit.hideLayerCallback=setting_.hideLayerCallback;
                contentSetting_edit.headerHeight=44;//头部高度
                contentSetting_edit.footerHeight=0;//底部高度

                //contentSetting_edit.enterFun=function(idArray) {//点击完成按钮的回调，参数选中的idArray
                //    //console.log("enterFun"+idArray.length);
                //    try{
                //        this.enterFun_old(idArray);//执行回调函数
                //    }catch(e){}
                //
                //    self.closeOverlay();//关闭浮出层
                //};
            }
            dataObj.contentSetting_edit=contentSetting_edit;//新的setting对象写入 传入的数组
        }

    };

    //所有下拉层初始化
    this.initOption=function(){
        for(var i in this.setting.dataArray){//轮训数据数组
            var dataObj=this.setting.dataArray[i];//一个数据对象
            var contengObj={};//下拉的实例化对象
            if(dataObj.contentType=="mCommon_basicMultilevelSelect") {//多级筛选
                //实例化多级筛选
                contengObj=new mCommon_basicMultilevelSelect(dataObj.contentSetting_edit);
                contengObj.hide();//付出层先隐藏

            }else if(dataObj.contentType=="mCommon_controlSelectSet"){//选项组
                //实例化选项组
                contengObj=new mCommon_controlSelectSet(dataObj.contentSetting_edit);

                contengObj.hide();//付出层先隐藏
            }else if(dataObj.contentType=="calendar"){//日历
                //实例化选项组
                contengObj=new mCommon_basicCalendar(dataObj.contentSetting_edit);
                contengObj.hide();//付出层先隐藏
            }
            this.contentArray.push({id:this.setting.dataArray[i].id,domObj:contengObj});//下拉的实例化对象存入数组
        }
        $overlay.css({"z-index":"200","display":"none"});//浮出层属性
    };


    //浮层构造
    this.overlayCreate=function(){
        this.setting.$appendBox_overlay.append($overlay);//浮层写入页面
    };


    //从数组中找数据对象，通过ID找数据对象,返回数据对象
    this.getDataById=function(id,array){
        var dataObj;//数据对象
        for(var i in array){
            if(array[i].id==id){//如果id相等
                dataObj=array[i];
                return dataObj;
            }
        }
    };

    //黑层初始化
    this.maskInit=function(){

        this.MaskObj=new mCommon_basicMask_setMask({
            zIndex:null,//设置遮罩层级，默认值为100，Number类型，选填，
            maskContainer:'',//要遮罩的容器，局部遮罩要传入容器，jquery类型,全局遮罩传空字符串，必填
            maskClickFun:function(){//点击遮罩层时的回调函数，选填
                //alert("只是测试一下");
                self.closeOverlay();//关闭浮出层
            }
        });
    };

     //整体初始化方法
    this.init=function(){
        this.initFilter();//筛选条出事化
        this.overlayCreate();//浮层构造写入页面
        this.contentSettingEdit();//整理下拉层的setting值
        this.initOption();//下拉层初始化
        this.maskInit();//黑层初始化
        this.ScreenObj=new mCommon_jsFixedOneScreen_setFixedOneScreen();//固定一屏初始化
    };

    //打开浮层方法
    this.openOverlay=function(){
        try{
            this.setting.openOverlayFun();//调取回调函数
        }catch(e){}
        $overlay.show();//显示浮层
        $filterBox.append(this.$filert);//筛选条写入浮出层
        this.ScreenObj.openFixedOneScreen({scrollVal:0});//打开固定一屏
        this.MaskObj.addMask();//打开黑层
    };

    //关闭浮层方法
    this.closeOverlay=function(){
        if(this.setting.fliterFixedTop){//fliter 停留在顶部
            $(".mCommon_jsFilter_fixedContent").append(this.$filert);//筛选条写入页面
        }else{
            self.setting.$appendBox_fliter.append(this.$filert);//筛选条写入页面
        }
        $overlay.hide();//显示浮层
        this.ScreenObj.closeFixedOneScreen({scrollVal:this.setting.closeOverlayScrollTop});//关闭固定一屏
        this.MaskObj.removeMask();//关闭黑层

        //修改fliter按钮状态//关闭下拉层
        self.closeDownDiv(this.findShrinkId());//关闭下拉和修改fliter状态 //修改fliter按钮状态
        try{
            this.setting.closeOverlayFun();//调取回调函数
        }catch(e){}

    };

    //找到代开的签和下拉的id; 返回id
    this.findShrinkId=function(){
        var id_=null;
        for(var i in this.contentArray){//轮询有下拉的按钮
            var id=this.contentArray[i].id;//取下拉对应的id
            if(this.fliter.getTabState(this.fliter.findDomById(id))=="shrink"){//如果fliter是打开状态
                id_=id;
                return id_;
            }
        }
        return id_;
    };

    //执行＝＝＝＝

    this.init();//整体出事化

    //测试的＝＝＝＝
    //this.openOverlay();
    //$(window).tap(function(){
    //    this.closeOverlay();
    //});




}
var mCommon_basicTabAndFilter=mCommon_controlTabAndFilter;
