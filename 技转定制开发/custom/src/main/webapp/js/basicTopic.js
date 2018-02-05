/*
 * 话题内容的最大宽度
 * 参数为容器对象，jquery类型，必填
 * 
 * */
function mCommon_basicTopic_setTopicContentIntercept(containerObj){
	//必填校验
	if(!containerObj){
		return false;
	}
	//计算容器宽度
	var boxW = parseInt(containerObj.width());
	//左右两侧#号和margin值计算
	var leftW = parseInt(containerObj.find('.mCommon_basicTopic_specialSymbolLeft').outerWidth(true)) + 1;
	//计算话题内容最大宽度
	var contentW = boxW - leftW * 2 - 8;
	//赋值
	containerObj.find('.mCommon_basicTopic_topicContent').css('max-width',contentW);
}
