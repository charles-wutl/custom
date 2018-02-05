/*
 * 设置名字的最大宽度，因为要显示等级，所以名字的最大宽度是要减去等级宽度的
 * */
function mCommon_basicHotUserAndLevel_setNameMaxW(containerObj){
	//可视区域的宽度
	var containerW = parseInt(containerObj.parent().width());
	//等级宽度
	var levelW = parseInt(containerObj.find('.mCommon_basicHotUserAndLevel_level').outerWidth(true)) + 1;
	//名字的最大宽度
	var nameMaxW = containerW-79-15-levelW;
	containerObj.find('.mCommon_basicHotUserAndLevel_name').css('max-width',nameMaxW);
}
$(window).resize(function(){
	mCommon_basicHotUserAndLevel_setNameMaxW($('.mCommon_basicHotUserAndLevel_box'));
});