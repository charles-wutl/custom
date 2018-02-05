/*控件管理＝＝＝＝＝＝＝＝＝＝＝＝＝
*mCommonObj控件统一管理对象
* mCommonObj＝{
* 	inputs:{
* 		instanceId1:instanceName1,
* 		instanceId2:instanceName2,
* 		...
*	},
*	overlay:{
* 		instanceId1:instanceName1,
* 		instanceId2:instanceName2,
* 		...
*	}
* 	...
* }
*
*
*
*/
var mCommonObj=mCommonObj || {};
//给出控件ID 返回控件实例
//function mCommonObj(instanceId){
//	var instance;//实例
//
//	return instance;
//}


/*点击改变样式===================
    自动执行；
    页面使用<p class="mCommon" tapClass="mCommonTapClass">点击查看效果</p>
    页面上移动有"tapClass"属性的元素，
    tap时添加"tapClass"的样式，
    过一会样式消失；
    */
function mCommonTapClass(obj) {//参数是查找范围 jq对象，默认是document
	var box=$(document);//查找范围
	if(obj!=null&&obj!=""){//如果obj有参数
		box=obj;//查找范围是obj
	}
	var tapItem=box.find("*[tapClass]");//点击的对象
	if(tapItem.length==0){//范围内没有tapClass
		return false;
	}
	tapItem.css("-webkit-tap-highlight-color","rgba(0,0,0,0)");//去掉默认的相应
    tapItem.on("tap",function (){
        var self = $(this);
        var timeOut = 500;//延时
        var tapClass = self.attr("tapClass");
        if (tapClass == "" || tapClass == null) {
            self.css("background-color", "#e5e5e5");
            setTimeout(function () { self.css("background-color", ""); }, timeOut);
        } else {
            self.addClass(tapClass);
            setTimeout(function () { self.removeClass(tapClass) }, timeOut);
        }


        });
}

//按钮阻止冒泡
function mCommonBtnStopPropagation(obj) {//参数是查找范围 jq对象，默认是document
	var box=$(document);//查找范围
	if(obj!=null&&obj!=""){//如果obj有参数
		box=obj;//查找范围是obj
	}
	var tapBtn=box.find(".mCommon_basicBtn,.mCommon_basicBtn32");//点击的对象
	if(tapBtn.length==0){//范围内没有tapClass
		return false;
	}
    tapBtn.tap(function(event){
		 event.stopPropagation(); 
	})
 
}

//自动执行匿名函数
(function () {
    $().ready(function () {
        mCommonTapClass();
        mCommonBtnStopPropagation();//给所有按钮阻止冒泡
    });
})();

/*点击改变样式 end*/


/*换肤class,自动执行=====*/
/*开发必须写入变量值，用于换肤*/

/* var _global_titleBackGroundColor="rgb(0,172,230)"; */
function mCommonThemeColor(colorRgb){//参数是rgb色值例如"rgb(0,172,230)"
	var colorNum=colorRgb.slice(4,colorRgb.length-1);//转换成数字
	var oldStyle=$("style[mCommonThemeColor]");//页面上原有的换肤样式
	if(oldStyle.length > 0){
		oldStyle.remove();//换肤标签删除原有标签
	}
	var newStyle=$("<style mCommonThemeColor='mCommonThemeColor'></style>");//生成样式标签

	//自定义各种色值的处理====
	var classArray=[//class名字，对应的属性
		{className:"mTheme_bgColor", style:"background-color"},
		{className:"mTheme_color", style:"color"},
		{className:"mTheme_borderColor", style:"border-color"},
		{className:"mTheme_afterBorderColor", style:"border-color"}
			];
	var alphaArray=[0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1.0];//透明度
	for(var i=0; i< classArray.length; i++){
		var item_className=classArray[i].className;//一个calss名字
		var item_style=classArray[i].style;//一个calss名字
		for(var n=0;n<alphaArray.length; n++){
			var alphaItem=alphaArray[n];//一个透明度
			var classString;//一条class定义
			var createName;//class的name组合
			if(alphaItem=="1.0"){//如果透明度是1
				//组合一条class名字
				createName="."+item_className
			}else{
				//组合一条class定义
				createName="."+item_className+alphaItem*100;
			}
			if(item_className.indexOf("after")>=0){//className中含有after
				createName=createName+":after";//class选择器后加入伪类定义
			}
			//组合一条class定义
			classString=createName+"{"+
				item_style+":rgba("+colorNum+","+alphaItem+
				");}\r";
			newStyle.append(classString);//class定义写入标签
		}
	}

	//控件主色按钮calss 的处理====
	var controlClassNameArray=[//控件class数组,style 要修改属性的数组，透明度alpha:"0.8";默认是1
		{className:"mCommon_basicBtn_blue",style:[{cssName:"background-color",alpha:"1"}]},
		{className:"mCommon_basicBtn_blue_tap",style:[{cssName:"background-color",alpha:"1"}]},
		{className:"mCommon_basicBtn_blueBorder",style:[{cssName:"color",alpha:"1"}]},
		{className:"mCommon_basicBtn_blueBorder:after",style:[{cssName:"border-color",alpha:"1"}]},

		{className:"mCommon_basicBtn32_blue",style:[{cssName:"background-color",alpha:"1"}]},
		{className:"mCommon_basicBtn32_blue_tap",style:[{cssName:"background-color",alpha:"1"}]},
		{className:"mCommon_basicBtn32_blueBorder",style:[{cssName:"color",alpha:"1"}]},
		{className:"mCommon_basicBtn32_blueBorder:after",style:[{cssName:"border-color",alpha:"1"}]}
			];

	for(var k=0;k<controlClassNameArray.length; k++){//class数组轮询
		var controlItem=controlClassNameArray[k];//一个样式对象
		var controlClassName=controlItem.className;//一个样式名字
		var styleArray=controlItem.style;//样式数组
		var cssString="";//样式串
		var colorNum_control=colorNum;//颜色的数值
		for(var m=0; m<styleArray.length; m++){//轮询要加入的样式
			if(controlClassName.indexOf("_tap")>=0){//如果是tap样式
				var colorNum_controlArray=colorNum.split(",");//颜色数字变成数组
				var colorNum_controlArray_new=[];//计算后的颜色数组
				for(var o=0; o<colorNum_controlArray; o++){//三个颜色轮询
					var newNum=colorNum_controlArray[o]*1+25;//新色值加25
					if(newNum > 255){
						newNum=255;//色值大于255就用255
					}
					colorNum_controlArray_new.push(newNum);//计算后的色值写入数组
				}
				colorNum_control=colorNum_controlArray_new.join(",");//数组转数字
			}



			//样式内容串
			cssString=cssString+styleArray[m].cssName+":rgba("+colorNum_control+","+styleArray[m].alpha+");";
		}

		var newClassString="."+controlClassName+"{"+cssString+"}\r";//一条新的样式
		newStyle.append(newClassString);//class定义写入标签
	}


	//=======
	newStyle.appendTo($("body"));//style标签写入head
}


//_global_titleBackGroundColor="rgb(0,172,230)";//默认生成全局变量
$().ready(function(){
	if ('undefined' == typeof(_global_titleBackGroundColor) || null == _global_titleBackGroundColor || "" == _global_titleBackGroundColor){//找不到变量
		_global_titleBackGroundColor="rgb(0,172,230)";//定义默认值
	}
	mCommonThemeColor(_global_titleBackGroundColor);//执行生成class
});
/*换肤class end=====*/


/*页面最小高度=========================*/

function mCommonPageMiniHeight(obj, headH, footH, otherH) {//obj:加最小高的jq对象,headH:头部高度,footH:底部高度,otherH:其他高度如padding/margin
	if (headH == "" || headH == null) {
		headH = 0
	}
	if (footH == "" || footH == null) {
		footH = 0
	}
	if (otherH == "" || otherH == null) {
		otherH = 0
	}
	function minHeight() {
            var WH = $(window).height();
            var minH = WH - headH - footH - otherH;
            obj.css("min-height", minH);
		}
	minHeight();//执行
        $(window).resize(function () {
            minHeight();
        });
}
/*页面最小高度end*/

/*多语言设置==========*/
/*开发必须写入变量值 语言别参数 locale	="zh_CN"/"zh_TW"/"en_US" */
//返回对应的语言
//locale="en_US" ;//测试
function mCommonLang(strObj){//参数传入 对象 或 字符串；对象例：{"zh_CN":"确定","zh_TW":"確認","en_US":"Enter"} ；串实例"shop_list_show"

    var Lang="zh_CN";//语言取值
    var strObj_type=typeof(strObj);//传入参数类型
    var str_return="";//返回的字符串

    //获取语言
    if(typeof(locale)!="undefined"){//如果有这个变量
        if(locale=="zh_CN" || locale=="zh_TW" || locale=='en_US'){//如果有预言参数
            Lang=locale;
        }
    }


    if(strObj_type=="string"){//如果传入字符串
        str_return=i18n[strObj][Lang];
    }else if(strObj_type=="object"){//如果传入对象
        str_return=strObj[Lang];
    }else{//如果其他类型
        return;
    }

    return str_return;//返回字符串
}


/*判断微信==================*/
function isWeiXin() {//返回true/false
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true;
        } else {
            return false;
        }
}
/*判断微信end*/


/*判断是否为移动端==================*/
function isMobile(){//返回true/false

        var userAgentInfo = navigator.userAgent;
	//var a="";
	//for(var n in navigator){
	//	a= a + n + ":" + navigator[n] +"<br/>";
	//}
	////alert(a);
	//$("body").html("").html('<div>'+a+'</div>');
        /*var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");*/
        var Agents = ["Android", "iPhone"];
        var flag = false;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) >= 0) { flag = true; return flag; }
        }
	//匹配乐视手机max2
	if(userAgentInfo=="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/534.24 (KHTML, like Gecko) Chrome/37.0.696.34 Safari/534.24"){

		flag=true;
	}
        return flag;
}
/*判断是否为移动端end*/

/*根据浏览器 给 body 加 class 自动执行==================*/
(function () {
        function browser() {//移动端 body标签写入 class="Android"/ "iPhone"
            var userAgentInfo = navigator.userAgent;
            /*var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");*/
            var Agents = ["Android", "iPhone"];
            for (var v = 0; v < Agents.length; v++) {
                if (userAgentInfo.indexOf(Agents[v]) >= 0) {
                    $("body").addClass(Agents[v]);
                    return;
                }
            }
        }
        $().ready(function () {
            browser();
        });
    })();
/*根据浏览器 给 body 加 class end==================*/

/*解决三星note2 数字键盘没有小数点================*/
function mCommon20150221_note2NumInput(obj) {//参数是查找范围 jq对象，默认是document
	var box=$(document);//查找范围
	if(obj!=null&&obj!=""){//如果obj有参数
		box=obj;//查找范围是obj
	}
	var userAgentInfo = navigator.userAgent;
	var note2="GT-N7108";//note的标记
	var qqBrowser="MQQBrowser";//qq浏览器
	if (userAgentInfo.indexOf(note2)>0 && userAgentInfo.indexOf(qqBrowser)<0){ //如果是note2,且不是qq浏览器
			box.find('input[type="number"]').attr("type","text");
	}
}
$().ready(function(){
	mCommon20150221_note2NumInput();
});
/*解决三星note2 数字键盘没有小数点 end================*/


/*数组 和 对象 深度拷贝＝＝＝＝*/
function mCommonGetType(o) {
	var _t;
	return ((_t = typeof(o)) == "object" ? o==null && "null" || Object.prototype.toString.call(o).slice(8,-1):_t).toLowerCase();
}
function mCommonExtend(destination,source) {
	for(var p in source) {
		if(mCommonGetType(source[p])=="array"||mCommonGetType(source[p])=="object"){
			destination[p]=mCommonGetType(source[p])=="array"?[]:{};
			arguments.callee(destination[p],source[p]);
		}
		else{
			destination[p]=source[p];
		}
	}
}
/*数组深度拷贝end＝＝＝＝*/
