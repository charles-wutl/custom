/*按要求截取字符串长度
第一个参数是要截取字符串的容器
第二个参数是字体大小
第三个参数是截取的行数*/
function mCommon_controlListInfoFlow_interceptStr(obj,fontSize,lineNum){
	var textOld = obj.text();
	var interceptLength = mCommon_controlListInfoFlow_resizeIntercept(obj,fontSize,lineNum);
	var newStr = textOld.subCHStr(0,interceptLength);
	obj.text(newStr);
	$(window).resize(function(){
		var interceptLength = mCommon_controlListInfoFlow_resizeIntercept(obj,fontSize,lineNum);
		newStr = textOld.subCHStr(0,interceptLength);
		obj.text(newStr);
	})
}
function mCommon_controlListInfoFlow_resizeIntercept(obj,fontSize,lineNum){
	var containerW = obj.width();
	var oneLineFontCount = parseInt(containerW/fontSize);
	var interceptLength = parseInt(oneLineFontCount * 2 * lineNum * 0.65);
	return interceptLength;
}
/*设置每个缩略图的高度，用来占位，再拉下时候出现正确位置
 一个参数：jquery数组,图片最外层容器，页面定义
 * */
function mCommon_controlListInfoFlow_setPicHeight(picBoxArr){
	var onePicBoxWidth = picBoxArr.find("p").first().width();
	picBoxArr.find("p").height(onePicBoxWidth);
	$(window).resize(function(){
		onePicBoxWidth = picBoxArr.find("p").first().width();
		picBoxArr.find("p").height(onePicBoxWidth);
	})
}

//设置字体颜色
//第一个参数要操作的dom,jquery对象，必填
//第二个参数是颜色值，字符串类型，必填
function mCommon_controlListInfoFlow_setTextFontColor(domObj,colorVal){
	domObj.css({'color':colorVal});
}
//设置边框颜色
//第一个参数要操作的dom,jquery对象，必填
//第二个参数是颜色值，字符串类型，必填
function mCommon_controlListInfoFlow_setBorderColor(domObj,colorVal){
	if(!domObj.hasClass('mCommon_controlListInfoFlow_setBorderPx1Color')){
		domObj.addClass('mCommon_controlListInfoFlow_setBorderPx1Color');
	}
	var colorStr = '<style>.mCommon_controlListInfoFlow_setBorderPx1Color:after{border-color:'+colorVal+'}</style>'
	$('head').append(colorStr);
}
//设置背景颜色
//第一个参数要操作的dom,jquery对象，必填
//第二个参数是颜色值，字符串类型，必填
function mCommon_controlListInfoFlow_setBackgroundColor(domObj,colorVal){
	domObj.css({'background-color':colorVal});
}
