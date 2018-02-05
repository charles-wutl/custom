/*
 * 
 * 页面级错误提示层，屏幕居中
 * 逻辑是计算全屏居中
 * 第一个参数是提示信息的容器，必填，jquery类型
 * 第二个参数是容器居中时候要减去的值
 * 当容器内居中时，margin-top是相对容器来说，所以需要减去
 * 
 * */

//错误提示层
function mCommon_controlPrompt(promptbox,subtractVal) { //promptbox是错误提示层jq对象

	//容器不存在直接返回
	if(!promptbox){
		return false;
	}

	//给图片外层容器添加宽高，不用在等图片加载完后计算位置 16.09.28
	calculMargin();

	//设置居中
	function calculMargin(){
		var promptBoxHeight = promptbox.outerHeight();
		var winHeight = $(window).innerHeight();
		var parentPadding = parseInt(promptbox.parent().css("padding-top"));
		var promptBoxTop = (winHeight-promptBoxHeight)/2-parentPadding;
		if(subtractVal && (0 != subtractVal)){
			promptBoxTop = promptBoxTop - subtractVal;
		}
		promptbox.css({"margin-top":promptBoxTop});
	}
}
