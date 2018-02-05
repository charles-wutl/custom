//loading加载中图层，垂直水平居中。屏幕居中对齐不用写参数，容器居中对齐写参数。
//显示loading层
//参数根据需要填写。
//第一个参数是添加Loading层的容器jquery对象
//第二个参数是否添加背景的黑色遮罩层，true是添加，false(或者不填写)不添加。
function mCommon_basicLoadingShow(parentbox,flag){//parentbox是loadingbox的父容器,jq对象
	//loading层结构
	var  loadingbox=$("<div class='mCommon_basicLoading'><div class='mCommon_basicLoadingLayerWrapper'><div class='mCommon_basicLoadingLayer'><span class='mCommon_basicLoadingLayer0'><i></i></span><span class='mCommon_basicLoadingLayer5'><i></i></span><span class='mCommon_basicLoadingLayer10'><i></i></span><span class='mCommon_basicLoadingLayer15'><i></i></span><span class='mCommon_basicLoadingLayer20'><i></i></span><span class='mCommon_basicLoadingLayer25'><i></i></span><span class='mCommon_basicLoadingLayer30'><i></i></span><span class='mCommon_basicLoadingLayer35'><i></i></span><span class='mCommon_basicLoadingLayer40'><i></i></span><span class='mCommon_basicLoadingLayer45'><i></i></span><span class='mCommon_basicLoadingLayer50'><i></i></span><span class='mCommon_basicLoadingLayer55'><i></i></span></div></div></div>");
	//添加遮罩层之前先判断是否有遮罩，有先删除，没有在添加
	if($(".mCommon_basicLoading_maskAreaAll").length != 0){
		$(".mCommon_basicLoading_maskAreaAll").remove();
	}
	//添加遮罩层之前先判断是否有遮罩，有先删除，没有在添加
	if($(".mCommon_basicLoading_maskAreaLocal").length != 0){
		$(".mCommon_basicLoading_maskAreaLocal").remove();
	}
	var box;//append dom
	var boxWidth;
	var boxHeight;
	var maskObj = $("<div></div>");
	var domObj = $(document);
	if(parentbox){//容器居中对齐，容器为函数参数
		box=parentbox;
		if(box.height()<60){//如果父容器高度小于loading层的高度，给父容器设置最小高度
			box.css("min-height","80px")
		}
		box.css({"position":"relative"}); 
		boxWidth=box.outerWidth();
		boxHeight=box.outerHeight();
		
		if(flag){
			maskObj.addClass("mCommon_basicLoading_maskAreaLocal");
			maskObj.width(boxWidth);
			maskObj.height(boxHeight);
			box.append(maskObj);
		}
	}else{//屏幕居中对齐，容器为body
		box=$("body");
		boxWidth=document.documentElement.clientWidth;
		boxHeight=document.documentElement.clientHeight;
		box.css("position","relative");
		loadingbox.css({"position":"fixed"});//loading屏幕居中对齐，不随滚动条滚动
		
		if(flag){
			maskObj.addClass("mCommon_basicLoading_maskAreaAll");
			box.append(maskObj);
		}
		
	}
	var loadingTop = (boxHeight - 60)/2;
	var loadingLeft = (boxWidth - 60)/2;
	box.append(loadingbox);
	loadingbox.css({"top":loadingTop,"left":loadingLeft});
}


//删除loading层
function mCommon_basicLoadingRemove(parentbox){
	var box;
	if(parentbox){//容器居中对齐
		box=parentbox;
		box.removeAttr("style"); 	
	}else{//屏幕居中对齐
		box=$("body");
		box.removeAttr("style");
	}
	if($(".mCommon_basicLoading_maskAreaAll").length != 0){
		$(".mCommon_basicLoading_maskAreaAll").remove();
	}
	if($(".mCommon_basicLoading_maskAreaLocal").length != 0){
		$(".mCommon_basicLoading_maskAreaLocal").remove();
	}
	var loadingbox=box.find($(".mCommon_basicLoading"));
	loadingbox.remove();
}





