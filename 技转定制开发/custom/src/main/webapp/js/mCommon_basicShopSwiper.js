/**
左右滑动图片
可以移动滚动
只有一个图，没有小点，也不自动循环

参数：
*boxStr：必填 jq选择器 字符串，即放置在页面的位置
*imageArea：必填 图片地址数组
*clickFun：点击的回调 回到函数 参数是index值
* scale:为宽高比例，默认为1，例如：1.5
* autoSwipe：是否自动轮播；默认false ，例如：true
*/

function mCommon_basicShopSwiper(boxStr,imageArea,clickFun,scale,autoSwipe){
    var autoSwipe_=autoSwipe?autoSwipe:false;//是否自动轮播；默认false ，例如：true
    var autoplay=0;//自动轮播间隔，0为不轮播
	var loop=false;//无限循环翻动
	if(autoSwipe_ && imageArea.length > 1){//如果设置自动轮播,同时 图片个数大于1
		autoplay=2000;//自动轮播间隔，0为不轮播
		loop=true;//无限循环翻动
	}
	var mySwiper1;//swiper的实例化对象
	var boxObj = $(boxStr);
	var _scale=scale?scale:1;//宽高比例
	var pointBox = $('<div class="pagination"></div>');//小点盒子
    var swiperBox = $('<div class="swiper-container"><div class="swiper-wrapper"></div></div>');//轮播图盒子
    for (var i = 0; i < imageArea.length; i++) {
		var itemSrc = imageArea[i];
        var itemHtmlBox = $('<div class="swiper-slide"><table><tr><td><img src="" /></td></tr></table></div>');
        itemHtmlBox.find("img").attr("src",itemSrc);
        swiperBox.children(0).append(itemHtmlBox);
		    }
    swiperBox.append(pointBox);
    if(imageArea.length<=1){
   	 	pointBox.css({'visibility':'hidden'});
    }

    swiperBox.appendTo(boxObj);
    boxObj.css("overflow","hidden");//最大盒子
    
    function size(){
    	var boxObjWidth=boxObj.width();//取最大盒子的宽度
    	var boxObjHeight=boxObjWidth/_scale;//最大容器的高度
    	boxObj.height(boxObjHeight);//盒子加高度
    }
    
	function initSwiper(){ //轮播图初始化
		mySwiper1 = new Swiper(boxStr+' .swiper-container',{
			autoplay:autoplay,//自动播放事件
			loop:loop,//是否无限循环
			speed: 500,
			autoplayDisableOnInteraction: false,//操作后不停止自动滚
		    pagination: boxStr+' .pagination',
		    paginationClickable: true,
			onSlideClick: function(swiper){//点击事件
				var index=swiper.activeIndex;
				if(loop){//如果是无限滚动，inde有问题，
					index=index-1;
					if(index < 0){index=imageArea.length-1}
					if(index > imageArea.length-1){index=0}
				}
				clickFun(index);//回到函数 参数是index值
		    }
		})
	//添加图片最高高度与框同高
		boxObj.find('img').css('maxHeight',boxObj.height())
	}
//执行==============================
	size();//设置尺寸
	initSwiper();//初始化滚动
	$(window).resize(function(){
		size();
		//mySwiper1.onResize();//swiper重新定尺寸
	});
}