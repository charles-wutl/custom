function mCommon_controlPersonSpaceInfo_arrow(obj,srcStr){
	obj.click(function(e){
		var popupstate = $(this).parents(".mCommon_controlPersonSpaceInfo_arrow_box").find(".mCommon_basicPoptip").css("display");
		var src = $(this).attr("src");
		var imgStr;
		if(srcStr){
			imgStr = srcStr;
		}else{
			imgStr = '../images/';
		}
		if(popupstate=="none"){
			$(this).parents(".mCommon_controlPersonSpaceInfo_arrow_box").find(".mCommon_basicPoptip").show();
			$(this).attr("src",imgStr+"mCommon_basicIcon_arrowUpCircle.png");
		}else{
			$(this).parents(".mCommon_controlPersonSpaceInfo_arrow_box").find(".mCommon_basicPoptip").hide();
			$(this).attr("src",imgStr+"mCommon_basicIcon_arrowDownCircle.png");
		}
		e.stopPropagation();
	});		
}

