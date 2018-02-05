/*
 * 计算每个头像的marginLeft值
 * 
 * */
/*
 * 计算头像之间的间隔，resize会自动计算
 * 无需参数
 * */
function mCommon_basicHeadHorizontalRank_setMarginVal(){
	//获取容器的宽度
	var containerW = parseInt($('.mCommon_basicHeadHorizontalRank_box').width());
	var imgBoxW = parseInt($('.mCommon_basicHeadHorizontalRank_imgBox').width());
	var marginVal = containerW - (imgBoxW*5);
	var avarageMarginLeft = parseInt(marginVal/4);
	var lastMarginLeft = marginVal - (avarageMarginLeft*3);
	var imgArr = $('.mCommon_basicHeadHorizontalRank_box').children('.mCommon_basicHeadHorizontalRank_item');
	//循环头像数组
	for(var i=0; i<imgArr.length; i++){
		if(0 == i){
			continue;
		}else{
			$(imgArr[i]).css('margin-Left',avarageMarginLeft);
			if(i == (imgArr.length - 1)){
				$(imgArr[i]).css('margin-Left',lastMarginLeft);
			}
		}
	}
}
//resize在重新执行下计算
$(window).resize(function(){
	mCommon_basicHeadHorizontalRank_setMarginVal();
})
