/*根据容器的比例，对单张图片进行缩放剪裁
 * 页面中 有dom结构，box里含有图片
 * box jq对象,图片的外层容器
 * scale 数值，容器宽高比。scale如果是空，就不对box设置高度。
 * 例如：mImgCut($(".mCommon_basicListBlockList1_img"),107/80)
 * */
function mImgCut(box,scale){
	var imgObj = box.find("img");	
	imgObj.css("visibility","hidden");//先让大图隐藏
	
	//是否需要设置box高度
	if(scale!="" && scale!=null){
		mImgCut_boxSize(box,scale);//容器尺寸，占位
	}
	//判断图片是否加载
	if(imgObj[0].complete){
		mImgCut_imgSize(box,scale);
		imgObj.css("visibility","visible");//裁完显示
	}else{
		imgObj.load(function(){
			mImgCut_imgSize(box,scale);
			imgObj.css("visibility","visible");//裁完显示
		});
	}	
	
	//resize
	$(window).resize(function(){
		//是否需要设置box高度
		if(scale!="" && scale!=null){
			mImgCut_boxSize(box,scale);//容器尺寸，占位
		}
		mImgCut_imgSize(box,scale);
	})
}

//容器尺寸
function mImgCut_boxSize(box,scale){
	var boxWidth = box.width();
	var boxHeight = parseInt(boxWidth / scale);
	box.css("height", boxHeight); 
}

//图片缩放，并显示图片的中间部分
function mImgCut_imgSize(box,scale){//box是容器jq对象，scale比例数值根据视觉稿得来
	//盒子大小
	var boxWidth = box.width();
	var boxHeight = box.height();
	//取图片的宽度和高度
	var imgObj = box.find("img");
	var imgWidth;
	imgWidth = imgObj.width();
	imgHeight = imgObj.height();
	var imgWidthScale; //缩放后的图片宽度
	var imgHeightScale; //缩放后的图片高度
	//容器和图片的宽高比进行对比，并对图片进行缩放。根据宽进行缩放的，图片显示时用marginTop负值；根据高进行所放的，图片显示时用marginLeft负值
	var widthRatio = boxWidth / imgWidth; //宽度比
	var heightRatio = boxHeight / imgHeight; //高度比
	if (widthRatio > heightRatio) {
		imgWidthScale = imgWidth * widthRatio;
		imgHeightScale = imgHeight * widthRatio;
		var imgMarginTop = parseInt(imgHeightScale / 2 - (boxHeight / 2));
		imgObj.css({"margin-top":-imgMarginTop,"width":imgWidthScale,"height":imgHeightScale});
	} else {
		imgWidthScale = imgWidth * heightRatio;
		imgHeightScale = imgHeight * heightRatio;
		var imgMarginLeft = parseInt(imgWidthScale / 2 - (boxWidth / 2));
		imgObj.css({"margin-left":-imgMarginLeft,"width":imgWidthScale,"height":imgHeightScale});
	}
}
