/*图片按照容器进行剪裁
 参数：
 box 图片容器jq对象
 isFull 图片小于容器是否需要撑满 true/false 默认false
 */
function mCommon_jsImgCut0114(box,isFull){
	
	var img=box.find("img");//图片
	img.hide();
	img.css({"margin-top":"0","height":"auto","width":"auto"});//去掉影响的样式
	
	if(img.height()){
		 cutImg();//剪裁图片
	}else{
		img.load(function(){//图片加载后执行
			cutImg();//剪裁图片
		});
	}
	
	//剪裁图片
	function cutImg(){
		var boxWidth=box.width();//容器宽度
		var boxHeight=box.height();//容器高度
		var imgWidth=img.width();//图片宽度
		var imgHeight=img.height();//图片高度
		
		var imgWidthChange;//图片最终宽度
		var imgHeightChange;//图片最终高度
		var imgMarginTop;//图片最终margin值
		var imgMarginLeft;//图片最终margin值
		
		box.css("overflow","hidden");//容器加入属性
	
	    //图片加宽度或高度
		if(!isFull && (imgWidth <=boxWidth || imgHeight <= boxHeight)){//如果不需要缩小图片
			//图片不加宽度和高度
		}else{//如果需要缩小图片
			//给图片加宽度还是加高度
			if(imgWidth/boxWidth <=  imgHeight/boxHeight){	
				img.css("width",boxWidth);//图片加宽度
			}else{
				img.css("height",boxHeight);//图片加宽度
			}
		}
		//取新的图片宽度高度
		imgWidthChange=img.width();//图片最终宽度
		imgHeightChange=img.height();//图片最终高度
		
		 //图片的margin值
		imgMarginLeft=(boxWidth-imgWidthChange)/2;//图片最终margin值
		imgMarginTop=(boxHeight-imgHeightChange)/2;//图片最终margin值
		
		//图片加margin
		// img.css({"margin-left":imgMarginLeft,"margin-top":imgMarginTop});//马蓉，2017年5月9日注释，crm新增页面，添加图片显示有问题
		img.css({"margin-left":0,"margin-top":imgMarginTop});//马蓉，2017年5月9日注释，crm新增页面，解决添加图片显示的问题
		img.show();
	}

}
