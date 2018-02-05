/**
 * 活动日历
 * 点击年月，弹层选择年月，有最小年 calendarStartYear ，最大年 calendarEndYear
 * 左右滑翻月
 * 周末增加class="mCommon_basicCalendar_days_weekend"，当前日期class="mCommon_basicCalendar_dayCurrent"
 * 当前月历空白处显示上个月和下个月的日期：showLastDays，showNextDays
 * 设置每个月默认选中的日期 defaultSelectDay(year,month)
 * 设置当月的活动日数组 getActivityDay(year,month) ,返回数字数组 [1,2,5,6,20]
 * 点击日回调 tapDayCallback(dayObj) ，日的jq对象。判断单日点击内容是否加载完成，加载完成后才能再次点击单日。避免当前点击未加载完内容 又点击新的日期，开发需要先设置this.flagChangeDay=false,在加载完内容后设置this.flagChangeDay=true
 * 初始化日历方法 this.initBasicCalendar(year,month)
 * 如果日历初始化未得到活动日期，单给日历加活动日期的方法 this.addActivityDay(year,month,array)
 * change年月后的事件（点击标题选择年月后，左滑后，右滑后）。初始化dom，默认日期触发回调 this.changeMonthEvent(year,month)
 * 选中某天的方法：this.selectDay(obj) ，参数为每个li的jq对象
 *
 * 201607增加属性方法:
 * 设置当月 今天之前的日期置灰： this.setting.setlastDaysDisabled ，默认 false，不置灰
 * 设置禁止选择之前的月： this.setting.setPreventChoosePreMonth，默认 false，不禁止
 * 改变头部年月的两种方式，1:弹层（默认） popup，2:左右箭头 sideArrow，如果采用箭头方式，则外部文件可以不引入mobiscroll
 * 点击头部左箭头回调：this.setting.tapPreMonthCallback
 * 点击头部右箭头回调：this.setting.tapNextMonthCallback
 * 是否显示 选择整月 按钮：this.setting.showChooseMonth
 * 点击 选择整月 按钮后的回调：this.setting.tapChooseMonthCallback
 * 是否默认 当前日期 为选中状态：this.setting.cancelSelectCurrentDay
 * 是否显示 重置和完成 按钮：this.setting.showBtnResetAndConfirm
 * 点击重置按钮的回调：this.setting.tapResetCallback
 * 点击完成按钮的回调：this.setting.tapConfirmCallback
 * 左滑日历的回调：this.setting.swipeLeftCallback(year,month)
 * 右滑日历的回调：this.setting.swipeRightCallback(year,month)
 * 重置方法：this.resetStatus();  //取消选中的天 或 选择整月
 * 显示隐藏方法： this.show(); this.hide();
 * 隐藏日历的回调：this.setting.hideLayerCallback(selectData);
 * ===============================
 * 注意：取消默认选中当天后this.setting.cancelSelectCurrentDay,如果已选择日期,改变年月，再改变回已选择的月份，之前选中的日期仍会选中
 *
 *
 * 201703添加属性方法
 *
 * 是否允许月日历转换为周日历 this.setting.allowWeekCalander
 * 月日历转换为周日历回调函数 this.setting.changeToWeekclendearCall()
 * 周日历转换为月日历回调函数 this.setting.changeToMonthclendearCall()
 */

function mCommon_basicCalendar(option){
    this.setting = {
        parentObj:$("body"), //日历挂的父容器
        maxHeight:null, //默认最大高度,窗口高度的75%
        serverDate:"",  //传入的服务器时间,字符串
        calendarStartYear:1990,  //设置日历的最小年
        calendarEndYear:2040,   //设置日历的最大年
        showLastDays:false, //当前月历上 显示上个月的剩余天，默认false
        showNextDays:false, //当前月历上 显示下个月的开始天，默认false
        setlastDaysDisabled:false, //设置当月 今天之前的日期置灰，默认false，不置灰
        setPreventChoosePreMonth:false,  //设置禁止选择之前的月，默认false，不禁止
        changeHeaderYearMonth:"popup", //两种方式改变头部年月，1:弹层(默认) popup，2:左右箭头 sideArrow
        showChooseMonth:false,  //是否显示 选择整月 按钮,默认false，不显示
        defaultSelectPeriodOfTime:[],//默认选中的一个时间段
        tapChooseMonthCallback:function(year,month){
            //console.log(year + "/" + month);
        }, //点击 选择整月 按钮的回调，与showChooseMonth属性一起使用
        tapPreMonthCallback:function(year,month){
            //console.log(year + "/" + month);
        },  //上一月
        tapNextMonthCallback:function(year,month){
            //console.log(year + "/" + month);
        },  //下一月
        defaultSelectDay:function(year,month){ //2014,8  默认选择某天
            //return 3;
        }, //每个月默认选中日期
        cancelSelectCurrentDay:false,  //取消默认选中当天。默认false。
        getActivityDay:function(year,month){ //2014,8
            //return [1,2,6,15,25,29];
        },//获取当月活动日数组
        tapDayCallback:function(dayObj){//日的jq对象,
            //alert(dayObj.attr("data-date")); //当前日期string
        }, //点击日 的回调，开发需要先设置this.flagChangeDay=false,在加载完内容后设置flagChangeDay=true
        showBtnResetAndConfirm:false, //是否显示 重置和完成 按钮，默认为 false 不显示
        tapResetCallback:function(){},  //点击重置按钮的回调
        tapConfirmCallback:function(selectData){ //无选中项为"",有选中项为 年月 或者 年月日
            //console.log("完成"+selectData);
        },    //点击完成按钮的回调
        swipeLeftCallback:function(year,month){
            //console.log(year+month)
        },  //左滑回调，参数上个月的 年，月
        swipeRightCallback:function(year,month){
            //console.log(year+month)
        },  //右滑回调，参数下个月的 年，月
        hideLayerCallback:function(selectData){ //参数为 点击完成按钮 后的数据，无选中项为"",有选中项为 年月 或者 年月日
            //console.log("关闭层"+selectData);
        },//隐藏日历的回调
		isPeriodOfTime:false,//是否是时间段,true表示是时间段，false表示不是
		startText:"开始",//开始点文字(选时间段用)
		endText:"结束",//结束点文字(选时间段用)
		starEndtText:"起止",//起止点文字(选时间段用)
		allowSelectSameDay:true,//允许选择相同一天,false不允许选同一天，true允许选同一天(选时间段用)
		disabledTime:[],//不可选的时间点，(选时间段用)
		defaultSelectPeriodOfTime:[],//默认选中的一个时间段(选时间段用)
		maxSelectableDays: 2000, //最多能选多少天(选时间段用)
		periodOfTimeSelectCallback:function(PeriodOfTimeArray){//选中的时间段数组(选时间段用)
			//console.log("选中的时间段数组为："+PeriodOfTimeArray); //时间段数组
		}, //选中时间段的回调
		maxSelectableDaysCallBack:function(num){//(选时间段用)
			//console.log("最多能选"+num+"天");
		},
		errorCallback:function(){//多选选择了开始时间没选结束时间就点确定的错误回调(选时间段用)
			//console.log("请选择结束时间");
		},
        allowWeekCalander:false,//20170322添加,时候可以变成周日历
        changeToWeekclendearCall:function () {//切换为周日历回调函数

        },
        changeToMonthclendearCall:function () {//切换为月日历回调函数

        },

    };

    option = option || {};
    $.extend(true,this.setting,option);
    var self=this;
    /*if(this.setting.defaultSelectPeriodOfTime.length>0){
        this.setting.serverDate = this.setting.defaultSelectPeriodOfTime[0].substr(0,8)+new Date().getDate();
    }*/

    //定义变量===========
    this.basicCalendarWrapper = $("<div class='mCommon_basicCalendar'></div>");

    if(this.setting.changeHeaderYearMonth == "sideArrow"){
        this.yearAndMonthDom = $("<div class='mCommon_basicCalendar_ymWrapper borderPx1'><span class='mCommon_basicCalendar_ymWrapper_preMonth'></span><div class='mCommon_basicCalendar_ymWrapper_yearAndMonthCurrent'></div><span class='mCommon_basicCalendar_ymWrapper_nextMonth'></span></div>");
    }else{
        this.yearAndMonthDom = $("<div class='mCommon_basicCalendar_ymWrapper borderPx1'><div class='mCommon_basicCalendar_ymWrapper_yearAndMonthCurrent'></div><span class='mCommon_basicCalendar_ymWrapper_icon'></span></div>");
    }
    this.daysDomWrapper = $("<div class='mCommon_basicCalendar_daysWrapper'></div>"); //放月的容器
    this.daysDom = $("<ul class='mCommon_basicCalendar_days'></ul>"); //一个月
    this.btnArea = $("<div class='mCommon_basicCalendar_btnArea'></div>");
    this.btnChooseMonth = $("<a href='####' class='mCommon_basicCalendar_btnChooseMonth borderPx1' tapClass='mCommon_basicCalendar_btnChooseMonth_tap'>选择整月</a>");  //选择整月按钮
    this.btnResetAndConfirm = $("<div class='mCommon_basicCalendar_btnResetAndConfirmWrapper borderPx1 clearfixOverflow'>" +
        "<a href='####' class='mCommon_basicCalendar_btnReset' tapClass=''>取消已选</a>" +
        "<a href='####' class='mCommon_basicCalendar_btnConfirm' tapClass=''>完成</a></div>");
    this.flagChangeDay = true; //判断单日点击内容是否加载完成，加载完成后才能再次点击单日
    var myDate = null,minDate = null;
    //服务器时间
    if(this.setting.serverDate != ""){
        myDate = new Date(this.setting.serverDate);
    }else{
        myDate = new Date();
    }
    //最小月份
    if(self.setting.setPreventChoosePreMonth){
        minDate = myDate;
    }else{
        minDate = new Date(self.setting.calendarStartYear,0,1)
    }

    var flagDom = false; //判断日历的dom是否已经被append到页面上
    var swipeStartX=0,swipeEndX=0; //滑动翻日历，初始位置和结束位置
    var swipeStartY=0,swipeEndY=0; //日历周日历月日历切换 ，初始位置和结束位置
    var minYearMonth = self.setting.calendarStartYear + "年1月"; //最小年月
    var maxYearMonth = self.setting.calendarEndYear + "年12月"; //最大年月
    this.selectedDate = {};  // 用于放 已选择的日期
    this.selectedDate.date = ""; //临时选择数据，用于翻月。默认无选中日期,如果已有选择的日期，只有当点击 取消已选 按钮时，此属性才重置空。其关联的方法：点击日，选择当月，点击取消已选，点击完成，月的dom，change年月后的事件
    this.selectedDate.confirmDate = "";  //点完成后确定的数据
    this.selectedDate.start = "";
    this.selectedDate.end = "";
    this.isWeekCalender = false;//标志目前为周日历
    //定义方法===========


    //年月 国际化
    var yearText = option.yearText || "年";
    var monthText = option.monthText || "月";
    //日历-年月
    function yearAndMonthDomText(year,month){
        var text;
        if (option.locale==='en_US' && month<10){
            text = year + yearText + "0" +month + monthText;
        }
        else {
            text = year + yearText + month + monthText;
        }


        self.yearAndMonthDom.find(".mCommon_basicCalendar_ymWrapper_yearAndMonthCurrent").text(text).attr("data-date",year + "-" + month);
    }

    //日历-天
    function creatDaysDom(year,month,daysPerMonth,planArray,defaultSelectDay){
        var daysDom = self.daysDom.clone();

        var prevBlankDaysArray = getPrevBlankDays(year,month); //当月日历第一行需要补全的空白
        var prevBlankDays = prevBlankDaysArray[0]; //空白天数
        var preMonthDays = prevBlankDaysArray[1];  //上个月共多少天
        var _preMonthYear = prevBlankDaysArray[2]; //上个月的年
        var _preMonth = prevBlankDaysArray[3];     //上个月
        var prevStartDay = preMonthDays - prevBlankDays + 1;  //上个月开始的日期

        var nextBlankDaysArray = getNextBlankDays(year,month); //当月日历最后一行需要补全的空白
        var nextBlankDays = nextBlankDaysArray[0]; //空白天数
        var _nextMonthYear = nextBlankDaysArray[1]; //下个月的年
        var _nextMonth = nextBlankDaysArray[2];     //下个月

        //当月日历第一行需要补全的空白
        for(var j = prevStartDay; j <= preMonthDays; j++){
            var daysLiDomBlank;
            if(self.setting.showLastDays){
                daysLiDomBlank = $("<li class='mCommon_basicCalendar_dayPreMonth mCommon_basicCalendar_day mCommon_basicCalendar_dayDisabled'>"
                    + "<div class='mCommon_basicCalendar_dayWrapper'>"
                    + "<span class='mCommon_basicCalendar_dayNum'>"+ j +"</span>"
                    + "<span class='mCommon_basicCalendar_planIcon'></span>"
                    + "</div></li>");

                var dataDate = _preMonthYear+"-"+ _preMonth + "-" + j;
                daysLiDomBlank.attr("data-date",dataDate);
            }else{
                daysLiDomBlank = $("<li class='mCommon_basicCalendar_dayPreMonth mCommon_basicCalendar_dayDisabled mCommon_basicCalendar_cursorDefault'></li>");
            }
            daysDom.append(daysLiDomBlank);
        }

        //当月日历
        for(var i= 1; i <= daysPerMonth; i++){
            var daysLiDom = $("<li class='mCommon_basicCalendar_day'>"
                + "<div class='mCommon_basicCalendar_dayWrapper'>"
                + "<span class='mCommon_basicCalendar_dayNum'>"+ i +"</span>"
                + "<span class='mCommon_basicCalendar_planIcon'></span>"
                + "</div></li>");

            //输出的data-date需要2016-01-01格式的，处理月和日的格式
            var dataDateMonth = formatNumber(month);
            var dataDateDay = formatNumber(i);
            var dataDate = year+"-"+ dataDateMonth + "-" + dataDateDay;
            daysLiDom.attr("data-date",dataDate);
            //当天之前的day加disabled
            if(self.setting.setlastDaysDisabled){
                if((year == myDate.getFullYear()) && (month == myDate.getMonth()+1)){
                    if(i < myDate.getDate()){
                        daysLiDom.addClass("mCommon_basicCalendar_dayDisabled");
                    }
                }
            }
            //当前日期加样式
            if((year == myDate.getFullYear()) && (month == myDate.getMonth()+1) && (i == myDate.getDate())){
                daysLiDom.find(".mCommon_basicCalendar_dayWrapper").addClass("mCommon_basicCalendar_dayCurrent");
            }

            //改变年月前已选中日期/每月默认选中的日期/当前日期，加选中状态，优先默认选中日期
            if( self.selectedDate.date !=""){
                //if( self.selectedDate.date == dataDate && self.setting.cancelSelectCurrentDay){
                if( self.selectedDate.date == dataDate){
                    daysLiDom.find(".mCommon_basicCalendar_dayWrapper").addClass("mCommon_basicCalendar_daySelect");
                }
            }else{
                if( i == defaultSelectDay){
                    daysLiDom.find(".mCommon_basicCalendar_dayWrapper").addClass("mCommon_basicCalendar_daySelect");
                }else if( defaultSelectDay == undefined && (year == myDate.getFullYear()) && (month == myDate.getMonth()+1) && (i == myDate.getDate()) && (!self.setting.cancelSelectCurrentDay)){
                    daysLiDom.find(".mCommon_basicCalendar_dayWrapper").addClass("mCommon_basicCalendar_daySelect");
                }
            }


            //判断有活动日期的数组里是否有该天
            if(inArray(i,planArray)){
                daysLiDom.addClass("mCommon_basicCalendar_hasPlan");
            }
            //如果该天是周末，加weekend标示
            if(((prevBlankDays + i -1) % 7 == 0 ) || ((prevBlankDays + i ) % 7 == 0 )){
                daysLiDom.addClass("mCommon_basicCalendar_days_weekend");
            }

            daysDom.append(daysLiDom);
            self.daysDomWrapper.find(".mCommon_basicCalendar_daysScroll").append(daysDom);
        }

        //当月日历最后一行需要补全的空白
        for(var k = 1; k <= nextBlankDays; k++){
            var daysLiDomBlank;
            if(self.setting.showNextDays){
                daysLiDomBlank = $("<li class='mCommon_basicCalendar_dayNextMonth mCommon_basicCalendar_day mCommon_basicCalendar_dayDisabled'>"
                    + "<div class='mCommon_basicCalendar_dayWrapper'>"
                    + "<span class='mCommon_basicCalendar_dayNum'>"+ k +"</span>"
                    + "<span class='mCommon_basicCalendar_planIcon'></span>"
                    + "</div></li>");

                var dataDate = _nextMonthYear+"-"+ _nextMonth + "-" + k;
                daysLiDomBlank.attr("data-date",dataDate);
            }else{
                daysLiDomBlank = $("<li class='mCommon_basicCalendar_dayNextMonth mCommon_basicCalendar_dayDisabled'></li>");
            }
            daysDom.append(daysLiDomBlank);
        }

    }

    //日历-滚动的月(上一月,当前月,下一月)
    function creatDaysScroll(year,month){
        if(self.daysDomWrapper.find(".mCommon_basicCalendar_daysScroll")){
            self.daysDomWrapper.find(".mCommon_basicCalendar_daysScroll").remove();
        }
        var daysDomScroll = $("<div class='mCommon_basicCalendar_daysScroll'></div>");
        self.daysDomWrapper.append(daysDomScroll);

        var preyearmonth = preMonth(year,month);
        var preyear = preyearmonth[0];
        var premonth = preyearmonth[1];
        var nextyearmonth = nextMonth(year,month);
        var nextyear = nextyearmonth[0];
        var nextmonth = nextyearmonth[1];

        //月
        function createMonth(year,month){ //第三个参数记录是否为当前月，希米亚预约日历（20160803）用于判断是否请求之前活动日期
            var daysPerMonth = days(year,month); //每月有多少天
            var planArray = self.setting.getActivityDay(year,month);//活动日
            var defaultSelectDay = self.setting.defaultSelectDay(year,month); //默认选中天

            creatDaysDom(year,month,daysPerMonth,planArray,defaultSelectDay);//日
        }

        createMonth(preyear,premonth);  //上个月
        createMonth(year,month);        //当前月
        createMonth(nextyear,nextmonth);//下个月

        self.daysDomWrapper.find("ul").eq(0).attr({"index":"0","data-ym":preyear+"-"+formatNumber(premonth)});
        self.daysDomWrapper.find("ul").eq(1).attr({"index":"1","data-ym":year+"-"+formatNumber(month)});
        self.daysDomWrapper.find("ul").eq(2).attr({"index":"2","data-ym":nextyear+"-"+formatNumber(nextmonth)});

        //self.size = function(){
        //    var singleULwidth = self.setting.parentObj.width();
        //    self.daysDomWrapper.find("ul").css("width",singleULwidth);
        //    self.daysDomWrapper.find(".mCommon_basicCalendar_daysScroll").css({"width":singleULwidth*3,"left":-singleULwidth});
        //};
        self.size();
        $(window).resize(function(){
            self.size();
        });
    }

    this.size = function(){
        var maxHeight=this.setting.maxHeight ? this.setting.maxHeight : $(window).height()*0.75;
        var singleULwidth = self.setting.parentObj.width();
        self.daysDomWrapper.find("ul").css("width",singleULwidth);
        self.daysDomWrapper.find(".mCommon_basicCalendar_daysScroll").css({"width":singleULwidth*3,"left":-singleULwidth});
        self.basicCalendarWrapper.css("max-height",maxHeight);//最大高度值赋值
    };

    //整个日历dom
    function createBasicCalendarDom(year,month){
        //标题区
        //星期国际化
        var MondayText = option.MondayText || '一';
        var TuesdayText = option.TuesdayText || '二';
        var WednesdayText = option.WednesdayText || '三 ';
        var ThursdayText = option.ThursdayText || '四';
        var FridayText = option.FridayText || '五';
        var SaturdayText = option.SaturdayText || '六';
        var SundayText = option.SundayText || '日';
        var weekDom = $("<p class='mCommon_basicCalendar_week'>"
            + "<span class='mCommon_basicCalendar_days_weekend'>" + SundayText + "</span>"
            + "<span>"+MondayText+"</span>"
            + "<span>"+TuesdayText+"</span>"
            + "<span>"+WednesdayText+"</span>"
            + "<span>"+ThursdayText+"</span>"
            + "<span>"+FridayText+"</span>"
            + "<span class='mCommon_basicCalendar_days_weekend'>"+SaturdayText+"</span>"
            + "</p>");
        self.basicCalendarWrapper.append(self.yearAndMonthDom,weekDom,self.daysDomWrapper);

        //按钮区
        if(self.setting.showChooseMonth){   //是否显示 选择整月 按钮
            self.btnArea.append(self.btnChooseMonth);
        }
        if(self.setting.showBtnResetAndConfirm){   //是否显示 重置和完成 按钮
            self.btnArea.append(self.btnResetAndConfirm);
        }
        if(self.setting.showChooseMonth || self.setting.showBtnResetAndConfirm){
            self.basicCalendarWrapper.append(self.btnArea);
            mCommonTapClass(self.btnArea);   //绑定tapClass
        }

        self.setting.parentObj.append(self.basicCalendarWrapper);
        flagDom = true;
    }

    //选中某天
    this.selectDay = function(obj){//参数为每个li的jq对象
        //obj.parents("ul").find(".dayWrapper").removeClass("daySelect");
        if(!self.setting.isPeriodOfTime) {//2016-09-22添加
            self.cancelSelectDay();
        }
        //如果选择了整月，去除选择整月
        if($(".mCommon_basicCalendar_btnChooseMonth").hasClass("mCommon_basicCalendar_btnChooseMonthSelect")){
            self.cancelSelectMonth();
        }
        obj.find(".mCommon_basicCalendar_dayWrapper").addClass("mCommon_basicCalendar_daySelect");
    };

    //取消选中 天
    this.cancelSelectDay = function(){
        this.basicCalendarWrapper.find("ul").eq(1).find(".mCommon_basicCalendar_daySelect").removeClass("mCommon_basicCalendar_daySelect");
        if(self.setting.isPeriodOfTime){//2016-09-22添加
            $('.mCommon_basicCalendar_daySelect_start').removeClass('mCommon_basicCalendar_daySelect_start');//有开始去除开始class
            $('.mCommon_basicCalendar_daySelect_startEnd').removeClass('mCommon_basicCalendar_daySelect_startEnd');//有起止去除起止class
            $('.mCommon_basicCalendar_daySelect_end').removeClass('mCommon_basicCalendar_daySelect_end');//有结束去除结束class
			self.selectedDate.start = "";
            self.selectedDate.end = "";
        }
    };

    //选择当月
    this.selectMonth = function(){
        var arr = currentMonth();
        var btn = this.btnChooseMonth;
        btn.addClass("mCommon_basicCalendar_btnChooseMonthSelect"); //按钮加选中状态
        btn.attr("data-date",arr[0]+"-"+arr[1]);
        self.selectedDate.date = btn.attr("data-date");
    };

    //取消 选择整月
    this.cancelSelectMonth = function(){
        this.basicCalendarWrapper.find(".mCommon_basicCalendar_btnChooseMonth").removeClass("mCommon_basicCalendar_btnChooseMonthSelect").removeAttr("data-date");
    };

    //重置状态，取消选中天 或 整月
    this.resetStatus = function(){
        self.cancelSelectDay();
        self.cancelSelectMonth();
        self.selectedDate.date = "";
    };

    //每月有多少天
    function days(year,month){//参数月,年
        var daysPerMonth;
        //4,6,9,11为30天，2（闰月29，28），其余31天。
        if(month == 4 || month == 6 || month == 9 || month == 11){
            daysPerMonth = 30;
        }else if(month == 2){
            if(isLeapYear(year)){
                daysPerMonth = 29;
            }else{
                daysPerMonth = 28;
            }
        }else{
            daysPerMonth = 31;
        }
        return daysPerMonth;
    }

    //判断是否为闰年,四年一闰,百年不闰,四百年再闰.
    function isLeapYear(year){
        if ((year % 4 == 0) && (year % 100 != 0) || (year % 400 == 0)){
            return true
        }else{
            return false
        }
    }

    //检查当月一号为周几
    function getFirstDay(year,month){
        month = month - 1;
        return new Date(year,month,1).getDay();
    }

    //当月日历第一行需要补全的空白
    function getPrevBlankDays(year,month){
        var prevBlankDays = getFirstDay(year,month); //空白天数
        //上个月的天数
        var str = preMonth(year,month);
        var _preMonthYear = str[0];
        var _preMonth = str[1];
        var preMonthDays = days(_preMonthYear,_preMonth);
        return [prevBlankDays,preMonthDays,_preMonthYear,_preMonth]; //返回空白天数，上个月共多少天，上个月的年月
    }
    //当月日历最后一行需要补全的空白
    function getNextBlankDays(year,month){
        var prevBlankDays = getFirstDay(year,month); //第一行空白天数
        var currentDays = days(year,month); //当前月天数
        var nextBlankDays = 42 - prevBlankDays - currentDays; //最后一行空白天数
        //下个月的年月
        var str = nextMonth(year,month);
        var _nextMonthYear = str[0];
        var _nextMonth = str[1];
        return [nextBlankDays,_nextMonthYear,_nextMonth]; //返回空白天数，下个月的年月
    }

    //判断是否在数组里
    function inArray(obj,array){
        if(array != undefined){
            for(var i = 0; i < array.length; i++){
                array[i] = parseInt(array[i]);  //转换成数字
                if(obj === array[i]){
                    return true;
                }
            }
            return false;
        }
    }

    function formatNumber(number){ //给小于10的数字加0
        var str = number.toString();
        if(str.substr(0, 1)!=0 && number<10){
            number = "0" + number;
        }else{
            number = number;
        }
        return number;
    }

    //上个月,返回的是年月数组
    function preMonth(year,month){
        month--;
        if(month<1){
            month = 12;
            year--;
            //if(year < calendarStartYear) return
        }
        return [year,month];
    }

    //下个月,返回的是年月数组hi
    function nextMonth(year,month){
        month++;
        if(month > 12){
            month = 1;
            year++;
            //if(year > calendarEndYear) return
        }
        return [year,month];
    }

    //当前年月,返回的是年月数组
    function currentMonth(){
        var ym = self.yearAndMonthDom.text();
        var year;
        if ((ym.split("年"))[0].length===4){
            year = (ym.split("年"))[0];
        }
        else {
            year = (ym.split("\/"))[0];
        }
        // var year = (ym.split("年"))[0] || (ym.split("-"))[0];
        var month;
        if (ym.split("年")[1]){
            month = ((ym.split("年"))[1].split("月"))[0];
        }
        else {
            month = ((ym.split("\/"))[1].split(" "))[0];
        }
        return [year,month];
    }

    //如果日历初始化未得到活动日期，单给日历加活动日期的方法
    this.addActivityDay = function(year,month,daysArray){
        var day,
            li = $("ul[data-ym="+year + "-" + formatNumber(month)+"]").find("li");
        if(li.hasClass("mCommon_basicCalendar_hasPlan")){
            li.removeClass("mCommon_basicCalendar_hasPlan");
        }
        for(var i=0; i < daysArray.length; i++){
            day = year + "-" + formatNumber(month) + "-" + formatNumber(daysArray[i]);
            $("li[data-date="+day+"]").addClass("mCommon_basicCalendar_hasPlan");
        }
    };

    //左翻月,页面加载完dom再调
    this.swipeLeft = function(){
        //var ym = this.yearAndMonthDom.text();
        //var year = (ym.split("年"))[0];
        //var month = ((ym.split("年"))[1].split("月"))[0];
        //var str = preMonth(year,month);
        var arr = currentMonth();
        var str = preMonth(arr[0],arr[1]);
        var year = str[0];
        var month = str[1];

        var currentDate= new Date(year,month,1);

        if(currentDate >= minDate) {  //选择的月大于最小日期
            //change年月后的事件
            self.changeMonthEvent(year,month);
            //左滑回调，参数上个月的 年，月
            self.setting.swipeLeftCallback(year,month);

        }

    };

    //右翻月,页面加载完dom再调
    this.swipeRight = function(){
        //var ym = this.yearAndMonthDom.text();
        //var year = (ym.split("年"))[0];
        //var month = ((ym.split("年"))[1].split("月"))[0];
        //var str = nextMonth(year,month);
        var arr = currentMonth();
        var str = nextMonth(arr[0],arr[1]);
        var year = str[0];
        var month = str[1];

        //change年月后的事件
        self.changeMonthEvent(year,month);

        //右滑回调，参数下个月的 年，月
        self.setting.swipeRightCallback(year,month);

    };

    this.hide = function(){
        this.basicCalendarWrapper.hide();
        this.resetStatus();
        if(self.selectedDate.confirmDate !=""){  //关闭浮层后，该日历保存上次选中并点击完成的状态
            self.selectedDate.date=self.selectedDate.confirmDate;
            var arry = self.selectedDate.date.split("-");
            arry[1] = parseInt(arry[1]);
            self.initBasicCalendar(arry[0],arry[1]);
            self.setting.setlastDaysDisabled=true;
            self.setting.setPreventChoosePreMonth=true;
            if(arry[2] != undefined){
                item = $("li[data-date="+ self.selectedDate.date +"]");
                self.selectDay(item); //给选中的天加select
            }else{
                self.selectMonth(); //给选中的月加select
            }
        }
        this.setting.hideLayerCallback(self.selectedDate.confirmDate); //隐藏浮层的回调,参数为 点击完成按钮 后的数据

    };

    this.show = function(){
        self.size();
        this.basicCalendarWrapper.show();
    };

    //事件===============

    //点击年月,调用mobiscroll
    //this.changeYearMonth = function(){
    this.tapChangeYearMonth = function(){
        var yearMonthObj = this.basicCalendarWrapper.find(".mCommon_basicCalendar_ymWrapper_yearAndMonthCurrent");
        var text = yearMonthObj.text();
        var year = text.substr(0,4);
        var month =((text.split("年"))[1].split("月"))[0];
        var selectedYear,selectedMonth; //选择后的年月

        //设置mobiscroll参数
        var yearArray = [[],[]];
        for (var i = 0; i <= self.setting.calendarEndYear - self.setting.calendarStartYear; i++) {
            yearArray[0][i] = self.setting.calendarStartYear + i;
            yearArray[1][i] = (self.setting.calendarStartYear + i).toString();
        }
        var minDateMob=null;
        if(self.setting.setPreventChoosePreMonth){  //设置禁止选择之前的月
            minDateMob = myDate;
        }

        var mobiscrollOption = {
            lang: "zh",
            wheels:[[//设置此属性可以只显示年月，注意要设置startYear和endYear
                    {
                        label: 'year',
                        keys: yearArray[0],
                        values: yearArray[1]
                    },
                    {
                        label: 'month',
                        keys: [0,1,2,3,4,5,6,7,8,9,10,11],
                        values: ['1','2','3','4','5','6','7','8','9','10','11','12']
                    }
                ]],
            //onBeforeShow: function (inst) {
            //    inst.settings.wheels[0].length>2?inst.settings.wheels[0].pop():null;
            //}, //移除“日”滚轮
            onHide:function(inst){ //inst._value取出值
                var str = inst._value;
                if(str == null)
                    return; //当点击弹出层的取消按钮后，str为null，退出函数
                selectedYear = (str.split("年"))[0];
                selectedMonth = ((str.split("年"))[1].split("月"))[0];
                //如果月小于10，去掉0。即03 改为 3
                if(selectedMonth < 10)
                    selectedMonth = (selectedMonth.split("0"))[1];

                //change年月后的事件
                self.changeMonthEvent(selectedYear,selectedMonth);
            },
            preset : 'date', //日期
            theme: 'android-holo-light', //皮肤样式白色
            display : 'modal', //显示方式
            dateFormat : 'yy年mm月', // 此处是弹出面板标题的日期格式
            setText : '确定', //确认按钮
            cancelText : '取消', //取消按钮
            dateOrder: 'yymmdd', //面板中日期排列格式
            headerText: false, //头部显示的时间隐藏
            defaultValue: new Date(year,month-1), //初始日期
            minDate: minDateMob, ////如果设置了 当前月小于实际月时 禁止选择之前的月
            startYear : self.setting.calendarStartYear, //开始年份
            endYear : self.setting.calendarEndYear //结束年份
        };

        //标题选择月如果不用popup形式，外部页面不用引入mobiscroll文件
        if(typeof yearMonthObj.mobiscroll !== 'function'){
            return
        }else{
            yearMonthObj.mobiscroll().date(mobiscrollOption);
        }
    };

    //change年月后的事件:初始化dom，默认日期触发回调
    this.changeMonthEvent = function(year,month){
        //初始化dom
        self.initBasicCalendar(year,month);
        this.setCalendarDisableState();
        /*2016-09-21新增start*/
        if(self.setting.isPeriodOfTime){
            self.renderSelectedDate(self.selectedDate.date);
        }
        //切换月后，当前月的默认日期要触发点击的回调 tapDayCallback(dayObj);
        var li = $(".mCommon_basicCalendar_days[index='1']").find(".mCommon_basicCalendar_daySelect").parent("li");
        if(li.length > 0){
            self.setting.tapDayCallback(li);
        }
        //切换月后，如果当前月不是至之前已选择的整月，则取消之前的选择整月
        if(self.setting.showChooseMonth){
            self.selectedDate.date == (year +"-" + month ) ? self.selectMonth():self.cancelSelectMonth();
        }
    };
    /**
     * 2016-09-22添加
     * 将字符串转为日期对象
     * @param str 字符串
     * @returns {Date} 日期对象
     */
    this.getDateObj = function(str){//日期字符串转日期格式
        var date = str.split("-");
        return new Date(date[0],date[1]-1,date[2]);
    };
    /**
     * 2016-09-22添加
     * 将日期对象转为字符串
     * @param date 日期对象
     * @returns {string} 字符串对象
     */
    this.yyyymmdd = function(date) {//年月日格式，位不足补0
        var mm = (date.getMonth() + 101).toString().substring(1, 3); //月不足位补0
        var dd = (date.getDate() + 100).toString().substring(1, 3);//日不足为补0
        return [date.getFullYear(), mm,dd].join('-');//输出标准时间，eg:2016-09-02
    };
    /**
     * 2016-09-22添加
     * 设置开始、结束、起止属性
     */
    this.setStartEndTextAttr = function(){
        $('.mCommon_basicCalendar_daySelect_start').attr('data-attr', self.setting.startText);
        $('.mCommon_basicCalendar_daySelect_end').attr('data-attr', self.setting.endText);
        $('.mCommon_basicCalendar_daySelect_startEnd').attr('data-attr', self.setting.starEndtText);
    }
    /**
     * 2016-09-22添加
     * 页面渲染选中的所有时间，添加选中状态
     * @param dateArray 时间数组
     */
    this.renderSelectedDate = function(dateArray){
        function contains(obj, arr) {//在一个数组里查找一个对象，找到返回true,否则false
            var i = arr.length;
            while (i--) {
                if (arr[i] === obj) {
                    return true;
                }
            }
            return false;
        }
        var dates = dateArray;
        var $currentMonth = $(".mCommon_basicCalendar_days[index='1']");
        $currentMonth.find("li").each(function(){
            var day = $(this).data('date');
            if(day){
                if(contains(day, dates)){
                    self.selectDay($(this));
                }
                if(day == self.selectedDate.start){
                    $(this).addClass("mCommon_basicCalendar_daySelect_start");//添加开始点
                }
                if(day == self.selectedDate.end){
                    $(this).addClass("mCommon_basicCalendar_daySelect_end");//添加结束点
                }
				if(day == self.selectedDate.start && day == self.selectedDate.end && self.setting.allowSelectSameDay){
					$(this).addClass("mCommon_basicCalendar_daySelect_startEnd"); //添加起始点
				}
            }
        });
        this.setStartEndTextAttr();
    }
    /**
     *
     * @param startTime 开始时间
     * @param endTime 结束时间
     * @returns {boolean} true表示开始时间与结束时间包含不可点时间，false表示开始时间与结束时间没有不可点时间
     */
	this.isContainDisableTime = function(startTime,endTime){
        var start = self.getDateObj(startTime);
        var end = self.getDateObj(endTime);
        while (start < end || this.yyyymmdd(start)==this.yyyymmdd(end)) {//轮询遍历开始时间与结束时间之间所有的时间点
			var dateStr = self.yyyymmdd(start);//转换日期格式2016-09-01
			for(var i=0;i<this.setting.disabledTime.length;i++){
				if(this.setting.disabledTime[i]==dateStr){
					return true;
				}
			}
            start.setDate(start.getDate() + 1);
		}
		return false;
    };
    //点击日
    this.dayTap = function(){
        if(!self.setting.isPeriodOfTime) {
            this.daysDomWrapper.on("tap.daytap", "li", function () {
                if (self.flagChangeDay) {//判断单日点击内容是否加载完成，加载完成后才能再次点击单日
                    if ($(this).attr("data-date") == undefined) {
                        return
                    }
                    var date = $(this).attr("data-date").split("-");
                    var currentDate = new Date(date[0], date[1] - 1, date[2]);
                    var myDateLocal = new Date(myDate.getFullYear(), myDate.getMonth(), myDate.getDate());
                    if (self.setting.setPreventChoosePreMonth) {
                        if (currentDate >= myDateLocal) { //小于当前日期的天不能选
                            self.selectDay($(this)); //给选中的天加select
                            self.selectedDate.date = $(this).attr("data-date");
                        }
                    } else {
                        self.selectDay($(this)); //给选中的天加select
                        self.selectedDate.date = $(this).attr("data-date");
                    }
                    self.setting.tapDayCallback($(this)); //回调,开发需要先设置this.flagChangeDay=false,在加载完内容后设置flagChangeDay=true
                } else {
                    self.daysDomWrapper.append($("<div class='mCommon_basicCalendarLoading'>加载中，请稍后再点击</div>"));
                }
            })
        }else{//2016-09-22添加点击选一段时间
            this.daysDomWrapper.on("tap.daytap", "li", function () {
                if($(this).attr("data-date") == undefined){
                    return;
                }
                if($(this).hasClass("mCommon_basicCalendar_isPeriodOfTimeDayDisabled")){return;}
				self.selectedDate.date = [];
                //if(self.setting.defaultSelectPeriodOfTime){
                    //self.setting.startCallBack($(this).data("date"));//开始的回调
                //}
                if(!self.selectedDate.start && !self.selectedDate.end){//无开始时间也无结束时间
                    $(this).addClass('mCommon_basicCalendar_daySelect_start');//给结束点变为开始点;//添加开始点class
                    self.selectedDate.start = $(this).data("date");//写入开始点
                }else if(self.selectedDate.start && self.selectedDate.end){//有开始时间且有结束时间
                    self.cancelSelectDay();//将选中的时间都取消
                    $(this).addClass('mCommon_basicCalendar_daySelect_start');//给结束点变为开始点;//当前添加开始class
                    self.selectedDate.start = $(this).data("date");//写入开始点
                    self.selectedDate.end = null;
                }else if(self.selectedDate.start && !self.selectedDate.end){//有开始时间无结束时间
                    var date1 = self.getDateObj(self.selectedDate.start);//start 2016-09-08 data1日期格式
                    var date2 = self.getDateObj($(this).data("date")); //2016-09-08 data2日期格式
					var isDisable = self.isContainDisableTime(self.selectedDate.start,$(this).data("date"));//开始与结束时间之间是否包含disable的时间
                    //判断开始时间与结束时间是否有disable，有则将date2变为开始
                    if(date1 > date2 || isDisable){//开始时间大于结束时间或者开始和结束时间点之间包含disable的
						$('.mCommon_basicCalendar_daySelect_start').removeClass('mCommon_basicCalendar_daySelect_start');//去除之前的开始class
                        $(this).addClass('mCommon_basicCalendar_daySelect_start');//给结束点变为开始点
                        self.selectedDate.start = $(this).data("date");//写入开始点
                    }else if(date1 < date2){//开始时间小于结束时间
                        //判断是否超过能选择的天数
                        var start1 = self.getDateObj(self.selectedDate.start);
                        if(date2 > start1.setDate(start1.getDate()+self.setting.maxSelectableDays-1)){
                            try{
                                self.setting.maxSelectableDaysCallBack(self.setting.maxSelectableDays);
                            }catch(e){}
                            return false;
                        }
                        self.selectedDate.end = $(this).data("date");//写入结束点
                        while (date1 <= date2 || self.yyyymmdd(date1)==self.yyyymmdd(date2)) {//轮询遍历开始时间与结束时间之间所有的时间点
                            var dateStr = self.yyyymmdd(date1);//转换日期格式2016-09-01
                            self.selectedDate.date.push(dateStr);//
                            date1.setDate(date1.getDate() + 1);
                        }
                        self.renderSelectedDate(self.selectedDate.date);
                        $(this).addClass('mCommon_basicCalendar_daySelect_end');//添加结束点class
                        try{
                            self.setting.periodOfTimeSelectCallback(self.selectedDate.date);
                        }catch(e){}
                    }else {
                        if(self.setting.allowSelectSameDay) {
                            //开始时间==结束时间
                            $(this).removeClass('mCommon_basicCalendar_daySelect_start').addClass('mCommon_basicCalendar_daySelect_startEnd');
                            self.selectedDate.start = self.selectedDate.end = $(this).data("date");
                            self.selectedDate.date.push(self.selectedDate.start);
                            try{
                                self.setting.periodOfTimeSelectCallback(self.selectedDate.date); //点击选中一个时间段后回调
                            }catch(e){}
                        }else{
                            $('.mCommon_basicCalendar_daySelect_start').removeClass('mCommon_basicCalendar_daySelect_start');//去除之前的开始class
                            $(this).addClass('mCommon_basicCalendar_daySelect_start');//给结束点变为开始点
                            self.selectedDate.start = $(this).data("date");//写入开始点
                        }
                    }
                }
                self.setStartEndTextAttr();//设置开始结束文字属性
                if($(this).hasClass("mCommon_basicCalendar_daySelect_start")){
                    self.setting.startCallBack($(this).data("date"));//开始的回调
                }
            })
        }
    };
    //点击 选择整月 按钮
    this.btnChooseMonth.on("tap",function(){
        var arr = currentMonth();
        self.cancelSelectDay();//取消天的选择
        self.selectMonth();   //选择当月
        self.setting.tapChooseMonthCallback(arr[0],arr[1]);//点击选择整月按钮的回调
    })

    //点击顶部左侧箭头，查看上个月日历
    this.yearAndMonthDom.find(".mCommon_basicCalendar_ymWrapper_preMonth").on("tap",function(){
        var arr = currentMonth();
        var str = preMonth(arr[0],arr[1]);
        var year = str[0];
        var month = str[1];

        var currentDate= new Date(year,month-1);

        if(currentDate >= new Date(minDate.getFullYear(),minDate.getMonth())){  //选择的月份大于最小日期
            self.changeMonthEvent(year,month);  //change年月后的事件
            self.setting.tapPreMonthCallback(year,month);  //回调
        }

        setMonthArrowState();
    })

    //点击顶部右侧箭头，查看下个月日历
    this.yearAndMonthDom.find(".mCommon_basicCalendar_ymWrapper_nextMonth").on("tap",function(){
        var arr = currentMonth();
        var str = nextMonth(arr[0],arr[1]);
        var year = str[0];
        var month = str[1];

        var currentDate= new Date(year,month-1);
        var maxDate = new Date(self.setting.calendarEndYear,11);

        if(currentDate <= maxDate){
            self.changeMonthEvent(year,month);  //change年月后的事件
            self.setting.tapNextMonthCallback(year,month);  //回调
            setMonthArrowState();
        }

    })

    //设置顶部年月箭头状态
    function setMonthArrowState(){
        var preMonthBtn = self.yearAndMonthDom.find(".mCommon_basicCalendar_ymWrapper_preMonth");
        var nextMonthBtn = self.yearAndMonthDom.find(".mCommon_basicCalendar_ymWrapper_nextMonth");
        if(self.setting.calendarEndYear+"年12月" == self.yearAndMonthDom.text()){//最大日期
            nextMonthBtn.addClass("mCommon_basicCalendar_ymWrapper_nextMonthDisabled");
        }else if(self.yearAndMonthDom.text() == minDate.getFullYear()+"年"+(minDate.getMonth()+1)+"月"){//最小日期
            preMonthBtn.addClass("mCommon_basicCalendar_ymWrapper_preMonthDisabled");
        }else{
            if(preMonthBtn.hasClass("mCommon_basicCalendar_ymWrapper_preMonthDisabled")){
                preMonthBtn.removeClass("mCommon_basicCalendar_ymWrapper_preMonthDisabled");
            }
            if(nextMonthBtn.hasClass("mCommon_basicCalendar_ymWrapper_nextMonthDisabled")){
                nextMonthBtn.removeClass("mCommon_basicCalendar_ymWrapper_nextMonthDisabled");
            }
        }
    }

    //点击重置按钮
    this.btnResetAndConfirm.find(".mCommon_basicCalendar_btnReset").on("tap",function(){
        self.resetStatus();
        self.setting.tapResetCallback();
    })
	//获取页面保存的数据(2016-09-21新增)
    /**
     *2016-09-22新增
     * @returns {*}得到选中的时间数组
     */
    this.getSelectedDate = function(){
        if(self.setting.isPeriodOfTime && self.selectedDate.start && !self.selectedDate.end){
            try{
                self.setting.errorCallback();
            }catch(e){}
        }
        var selectData = self.selectedDate.date;
        self.selectedDate.confirmDate = selectData;
        return selectData;
    }


    //点击完成按钮
    this.btnResetAndConfirm.find(".mCommon_basicCalendar_btnConfirm").on("tap",function(){
        var selectData = self.getSelectedDate();
		self.setting.tapConfirmCallback(selectData); //无选中项为"",有选中项为 年月 或者 年月日
    })

    //滑动翻日历
/*
    function touchStart(event){
        var touch = event.touches[0];
        swipeStartX = touch.pageX;
        swipeStartY = touch.pageY;
        self.daysDomWrapper[0].addEventListener('touchmove', touchMove, false);
        self.daysDomWrapper[0].addEventListener('touchend', touchEnd, false);
    }
 function touchMove(event){
 if(!event.touches.length) return;
 var touch = event.touches[0];
 swipeEndX = touch.pageX;
 swipeEndY = touch.pageY;

 //左右滑动时禁止默认事件
 if(Math.abs(swipeEndX - swipeStartX) - Math.abs(swipeEndY - swipeStartY) > 0){
 event.preventDefault();
 }

 //当前年月为最大年月或最小年月时不滑动
 var currentYearMonth = self.yearAndMonthDom.find(".mCommon_basicCalendar_ymWrapper_yearAndMonthCurrent").text();
 if(self.setting.setPreventChoosePreMonth){  //如果设置了 当前月小于实际月时禁止滑动
 minYearMonth = myDate.getFullYear()+"年"+ (myDate.getMonth()+1)+"月";
 }

 if(swipeEndX - swipeStartX >50 && currentYearMonth == minYearMonth){
 return
 }
 if(swipeEndX - swipeStartX < -50 && currentYearMonth == maxYearMonth){
 return
 }


 //滑动动画
 var calendarWidth = self.setting.parentObj.width();
 var daysDomScroll = self.daysDomWrapper.find(".mCommon_basicCalendar_daysScroll");
 var distance = swipeEndX - swipeStartX;
 if(swipeEndX - swipeStartX >50 || swipeEndX - swipeStartX < -50){ //左翻,右翻
 if('WebkitTransform' in document.documentElement.style){ //判断是否支持transform
 daysDomScroll.css({"-webkit-transform":"translateX("+ distance +"px)","transform":"translateX("+ distance +"px)"});
 }else{
 daysDomScroll.animate({
 left: - calendarWidth + (swipeEndX - swipeStartX)
 },0);
 }
 }
 }

    function touchEnd(event){
        var calendarWidth = self.setting.parentObj.width();
        //当前年月为最大年月或最小年月时不滑动
        var currentYearMonth = self.yearAndMonthDom.find(".mCommon_basicCalendar_ymWrapper_yearAndMonthCurrent").text();
        if(swipeEndX - swipeStartX >50 && currentYearMonth == minYearMonth){
            return
        }
        if(swipeEndX - swipeStartX < -50 && currentYearMonth == maxYearMonth){
            return
        }

        //滑动后
        if(swipeStartX==0 || swipeEndX==0)   //解决 滑动后再单击（没有再次滑动）仍触发事件
            return;
        if(swipeEndX - swipeStartX >50){
            self.swipeLeft();
        }else if(swipeEndX - swipeStartX < -50){
            self.swipeRight();
        }else{
            if('WebkitTransform' in document.documentElement.style){
                self.daysDomWrapper.find(".mCommon_basicCalendar_daysScroll").css({"-webkit-transform":"translateX("+ 0 +"px)","transform":"translateX("+ 0 +"px)"});
            }else{
                self.daysDomWrapper.find(".mCommon_basicCalendar_daysScroll")[0].style.left = - calendarWidth +"px";
            }
        }
        swipeStartX=0;
        swipeEndX=0;
        self.daysDomWrapper[0].removeEventListener('touchmove', touchMove, false);
        self.daysDomWrapper[0].removeEventListener('touchend', touchEnd, false);
    }

*/
    //左右滑动翻日历,上下滑动周日历月瑞切换
    function touchStart(event){
        var touch = event.touches[0];
        swipeStartX = touch.pageX;
        swipeStartY = touch.pageY;
        self.daysDomWrapper[0].addEventListener('touchmove', touchMove, false);
        self.daysDomWrapper[0].addEventListener('touchend', touchEnd, false);
    }
    function touchMove(event){
        if(!event.touches.length) return;
        var touch = event.touches[0];
        swipeEndX = touch.pageX;
        swipeEndY = touch.pageY;
        //禁止默认事件
        event.preventDefault();

        //当前年月为最大年月或最小年月时不滑动
        var currentYearMonth = self.yearAndMonthDom.find(".mCommon_basicCalendar_ymWrapper_yearAndMonthCurrent").text();
        if(self.setting.setPreventChoosePreMonth){  //如果设置了 当前月小于实际月时禁止滑动
            minYearMonth = myDate.getFullYear()+"年"+ (myDate.getMonth()+1)+"月";
        }
        if(swipeEndX - swipeStartX >50 && currentYearMonth == minYearMonth){
            return
        }
        if(swipeEndX - swipeStartX < -50 && currentYearMonth == maxYearMonth){
            return
        }
        if(self.isWeekCalender){return}//如果是周日历禁止左右滑动


        //滑动动画
        var calendarWidth = self.setting.parentObj.width();
        var daysDomScroll = self.daysDomWrapper.find(".mCommon_basicCalendar_daysScroll");
        var distance = swipeEndX - swipeStartX;
        if(swipeEndX - swipeStartX >50 || swipeEndX - swipeStartX < -50){ //左翻,右翻
            if('WebkitTransform' in document.documentElement.style){ //判断是否支持transform
                daysDomScroll.css({"-webkit-transform":"translateX("+ distance +"px)","transform":"translateX("+ distance +"px)"});
            }else{
                daysDomScroll.animate({
                    left: - calendarWidth + (swipeEndX - swipeStartX)
                },0);
            }
        }
    }
    function touchEnd(event){
        var calendarWidth = self.setting.parentObj.width();
        var xflag = true;
        var yflag = true;
        //当前年月为最大年月或最小年月时不滑动
        var currentYearMonth = self.yearAndMonthDom.find(".mCommon_basicCalendar_ymWrapper_yearAndMonthCurrent").text();
        if(swipeEndX - swipeStartX >50 && currentYearMonth == minYearMonth){
            xflag = false;

        }
        if(swipeEndX - swipeStartX < -50 && currentYearMonth == maxYearMonth){
            xflag = false;
        }
        if(swipeEndX - swipeStartX <50&&swipeEndX - swipeStartX>-50){
            xflag = false;
        }
        if(swipeEndY - swipeStartY <10 &&swipeEndY - swipeStartY>-50){
            yflag = false;
        }
        //上下发生滑动
        if(!xflag&&yflag){
            if(swipeStartY==0 || swipeEndY==0)   //解决 滑动后再单击（没有再次滑动）仍触发事件
                return;
            if(option.allowWeekCalander){
                if(swipeEndY - swipeStartY>10){
                    self.changeMonthCalendar();
                };
                if(swipeEndY - swipeStartY<-50){
                    self.changeWeekCalendar();
                };
            }
        }
        if(self.isWeekCalender){return}//如果是周日历禁止左右滑动

        if(xflag){
            //滑动后
            if(swipeStartX==0 || swipeEndX==0)   //解决 滑动后再单击（没有再次滑动）仍触发事件
                return;
            if(swipeEndX - swipeStartX >50){
                self.swipeLeft();
            }else if(swipeEndX - swipeStartX < -50){
                self.swipeRight();
            }else{
                if('WebkitTransform' in document.documentElement.style){
                    self.daysDomWrapper.find(".mCommon_basicCalendar_daysScroll").css({"-webkit-transform":"translateX("+ 0 +"px)","transform":"translateX("+ 0 +"px)"});
                }else{
                    self.daysDomWrapper.find(".mCommon_basicCalendar_daysScroll")[0].style.left = - calendarWidth +"px";
                }
            }

            self.daysDomWrapper[0].removeEventListener('touchmove', touchMove, false);
            self.daysDomWrapper[0].removeEventListener('touchend', touchEnd, false);
        }
        swipeStartX=0;
        swipeEndX=0;
        swipeStartY=0;
        swipeEndY=0;

    }

    //初始化===========
    this.initBasicCalendar = function(year,month){
        year = !year ? myDate.getFullYear() : year;
        month = !month ? (myDate.getMonth()+1) : month;
        yearAndMonthDomText(year,month);//年月

        creatDaysScroll(year,month);

        if(!flagDom){
            createBasicCalendarDom(year,month);
            this.dayTap(); //点击日
            self.daysDomWrapper[0].addEventListener('touchstart', touchStart, false); //绑定手滑事件
        }
        //this.changeYearMonth(); //点击年月
        if(this.setting.changeHeaderYearMonth =="popup"){
            this.tapChangeYearMonth();//点击年月,popup方式的
        }

        if(this.setting.changeHeaderYearMonth =="sideArrow"){
            setMonthArrowState(); //设置头部年月左右箭头状态
        }
    };
	/**
	 *单独设置deisable状态
	 *disableArray不可点时间数组
	 */
	this.setDisableDate = function(disableArray){
		for(var i=0;i<disableArray.length;i++){
			var currentDisabelItem = disableArray[i];
			$('.mCommon_basicCalendar_day[data-date='+currentDisabelItem+']').addClass("mCommon_basicCalendar_isPeriodOfTimeDayDisabled");
		}
	}
	/*初始多选设置不可选的时间*/
	this.setCalendarDisableState = function(){
        //执行初始化
        /*多选设置不可选的时间start 2016-09-22*/
        if(this.setting.isPeriodOfTime && this.setting.disabledTime){
			this.setDisableDate(this.setting.disabledTime);
        }
        /*初始多选设置不可选的时间end 2016-09-22*/
        
    };
	//对象深拷贝
	this.objectClone = function(obj){
		if (null == obj || "object" != typeof obj) return obj;
		var copy = obj.constructor();
		for (var attr in obj) {
			if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
		}
		return copy;
	}
	/*多选设置默认时间段显示*/
	this.setCalendardefaultSelectPeriodOfTime = function(){
		/*多选设置默认时间段显示start 2016-09-22*/
		if(self.setting.isPeriodOfTime && self.setting.defaultSelectPeriodOfTime && self.setting.defaultSelectPeriodOfTime.length>0){
            year = self.setting.defaultSelectPeriodOfTime[0].substr(0,4);
            month = self.setting.defaultSelectPeriodOfTime[0].substr(5,2);
            this.changeMonthEvent(year,month);
			var length = self.setting.defaultSelectPeriodOfTime.length;
			self.selectedDate.start = self.setting.defaultSelectPeriodOfTime[0];
			self.selectedDate.end = self.setting.defaultSelectPeriodOfTime[length-1];
			self.renderSelectedDate(self.setting.defaultSelectPeriodOfTime);
			this.selectedDate.date = this.objectClone(self.setting.defaultSelectPeriodOfTime);
			this.selectedDate.confirmDate = this.objectClone(self.setting.defaultSelectPeriodOfTime);
		}
		/*多选设置默认时间段显示end 2016-09-22*/
	}
    this.initBasicCalendar(); //年，月    
    this.setCalendarDisableState();//多选设置不可选的时间
	this.setCalendardefaultSelectPeriodOfTime();//多选设置默认时间段显示
    /*转换为周日历*/
    this.changeWeekCalendar = function () {
        this.basicCalendarWrapper.find('.mCommon_basicCalendar_daysWrapper').height(36);//设置日历显示高度
        this.basicCalendarWrapper.find('.mCommon_basicCalendar_ymWrapper').hide();//隐藏年月显示条
        var today = this.basicCalendarWrapper.find('.mCommon_basicCalendar_daysScroll').find('ul').filter("[index =1]").find('.mCommon_basicCalendar_daySelect').parent().attr('data-date');
        today = today || this.basicCalendarWrapper.find('.mCommon_basicCalendar_daysScroll').find('ul').filter("[index =1]").attr("data-ym") + '-01'
        var today_year = today.split('-')[0];
        var today_month = today.split('-')[1];
        var today_day = today.split('-')[2];
      //  var beginday = today_year+'-'+today_month+'-'+1;//获取这个月的第一天
        var d=new Date(today_year,today_month -1,1);
        var weekday=d.getDay();//获取这个月的第一天是周几
        var linnum = parseInt((parseInt(today_day) + parseInt(weekday)) /7);
        if((parseInt(today_day) + parseInt(weekday)) %7 === 0){linnum--;}
        console.log('today_day:'+parseInt(today_day));
        console.log('weekday:'+parseInt(weekday));
        console.log('linnum:'+linnum);
        var toph= -(linnum * 36);
        this.basicCalendarWrapper.find('.mCommon_basicCalendar_daysScroll').css('top',toph);
        option.changeToWeekclendearCall();
        self.isWeekCalender = true;//设置当前日历状态
    }
    this.changeMonthCalendar = function () {
        this.basicCalendarWrapper.find('.mCommon_basicCalendar_daysWrapper').height(220);//设置日历显示高度
        this.basicCalendarWrapper.find('.mCommon_basicCalendar_ymWrapper').show();//隐藏年月显示条
        this.basicCalendarWrapper.find('.mCommon_basicCalendar_daysScroll').css('top',0);
        option.changeToMonthclendearCall();
        self.isWeekCalender = false;//设置当前日历状态
    }


    // function is(ch){ //此方法不知道怎么加上的
    //    return ch== "-"
    //}
}




