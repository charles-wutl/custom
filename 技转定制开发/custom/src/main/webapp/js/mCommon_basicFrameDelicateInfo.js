/*
 * 设置标题的字符截取
 * 参数为标题容器，jquery对象，必填
 * */
function mCommon_basicFrameDelicateInfo_setTitleMaxW(titleObj){
	var parentW = titleObj.parent().width();
	titleObj.css('max-width',parentW-50);
}
