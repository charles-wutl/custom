    	/*
    	 * 第一个参数为一个jquery对象，input输入框上层的div
    	 * 第二个参数是日期时间，有三个参数：datetime/date/time
    	 * 第三个参数是日期对象，即日期时间默认值
    	 * 第四个参数是分钟步长设置
    	 * 第五个参数是小时步长设置
    	 */
function mCommon_basicInputDatetime_init(obj,Formate,primaryTime,minuteSet,hourSet) {
	var currYear = (new Date()).getFullYear();//当前年
    //add 17-02-16 by cocoa
    //cancelText :string,//取消按钮文本
    //setText :string,//确定按钮文本
    var setText = obj.setText || mCommonLang({"zh_CN":"确定","zh_TW":"確定","en_US":"OK"});
    var cancelText = obj.cancelText || mCommonLang({"zh_CN":"取消","zh_TW":"取消","en_US":"Cancel"});
    var yearText = obj.year || mCommonLang({"zh_CN":"年","zh_TW":"年","en_US":"Year"});
    var monthText = obj.month || mCommonLang({"zh_CN":"月","zh_TW":"月","en_US":"Month"});
    var dayText = obj.day || mCommonLang({"zh_CN":"日","zh_TW":"日","en_US":"Day"});
    var hourText = obj.hour || mCommonLang({"zh_CN":"時","zh_TW":"時","en_US":"Hour"});
    var minuteText = obj.minute || mCommonLang({"zh_CN":"分","zh_TW":"分","en_US":"Min"});
	var opt = {
		preset: Formate, //日期格式，datetime/date/time
        theme: 'android-holo-light', //主题
        display: 'modal',//modal居中显示，top居顶显示，bottom居底显示，bubble浮层尖角显示,inline
    	dateOrder: 'yyyymmdd', //面板中日期排列格  
	    dateFormat: 'yyyy-mm-dd', // 回填的日期格式 
    	timeWheels: 'HHii', //面板中时间排列格
		timeFormat: 'HH:ii', //回填的时间格式
		rows: 3, //时间显示3行
		showLabel: true, //将面板年月日时分秒给显示出来      
	    yearText: yearText,monthText: monthText,dayText: dayText,hourText: hourText,minuteText: minuteText,//面板年月日时分秒文字
        steps: { 
        	hour: hourSet, //小时步长
		    minute: minuteSet, //分钟步长
		    zeroBased: true
		},
        startYear: currYear - 100, //开始年份
   		endYear: currYear + 20, //结束年份
        setText: setText, //确定按钮名称
		cancelText: cancelText,//取消按钮名称
		headerText: false, //头部显示的时间隐藏,也可改变显示的形式，eg:headerText:'2015-03-03 10:10:10',
		minWidth:65, //每一列的宽度
		height:40 //显示时间的高度										
	};
	obj.mobiscroll(opt); 
	if(primaryTime==''){
		primaryTime=null;
	}
	obj.mobiscroll('setVal', primaryTime, true, true);//设置输入框和滑动条的初始默认值
}
