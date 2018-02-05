/*
图片轮播
可以放大

mCommon_jsImageView(srcArray,index)
参数是 图片地址数组，打开的当前图片的index值；
例如mCommon_jsImageView([["../pic/test001.jpg","../pic/big001.jpg" ],["../pic/test002.jpg","../pic/big002.jpg" ],["../pic/test003.jpg","../pic/big003.jpg" ]],10)
	

页面要引入：
<script src="../js/mCommon20150212.js"></script><!--公用js-->
<script type="text/javascript" src="../js/idangerous.swiper.js"></script>
<link rel="stylesheet" href="../css/idangerous.swiper.css" />
<script type="text/javascript" src="../js/iscroll.js"></script>

*/
function mCommon_jsImageView_setWH() {//设置宽高
    var winH = $(window).height();//窗口高度
    var swiperWH = "<style swiperWH='true'>.swiper-container, .swiper-slide {width:100%;height:" + winH + "px; overflow:hidden}</style>";//滑动区域的宽高
    $("style[swiperWH]").remove();
    $(".mCommon_jsImageView").append(swiperWH);
    $(".mCommon_jsImageView").find("td").height(winH);
}

function mCommon_jsImageView_autoSetWH() {//自动宽高 resize
    mCommon_jsImageView_setWH();//设置宽高
    $(window).resize(function () {//窗口变化
        mCommon_jsImageView_setWH();//设置宽高
    });
}

function mCommon_jsImageView_zoomDiv(swiper) {//构造放大层 参数是整个swiper对象
    //放大图片
    $("#mCommon_jsImageView_swiperZoom").hide();//隐藏原有的放大浮层
    $("#mCommon_jsImageView_swiperZoom").attr("id", "");//id置为空
    var myScroll = null;//放大对象 删除内容
    var oneZoom=true;//是否含有一倍的字符

    var index = $(swiper.activeSlide()).attr("activeIndex");//当前激活的 index

    var activeZoomDiv = $(".mCommon_jsImageView  div[mCommon_jsImageView_swiperZoom='" + index + "']");//找到相应的隐藏层
    activeZoomDiv.attr("id", "mCommon_jsImageView_swiperZoom");
    activeZoomDiv.css("display","block");

    myScroll = new iScroll('mCommon_jsImageView_swiperZoom', {//构造放大层
        zoom: true,//放大
        zoomMax: 8,//最大放大比例
        zoomMin: 1,//最小放大比例
        bounce: false,//是否反弹
        hScrollbar: false, //滚动条显示
        vScrollbar: false,//滚动条显示
        //checkDOMChanges: true,//自动检测内容变化
        //useTransition: true,//是否使用css变换
        onZoomStart: function () {//放大开始回调函数
        },
        onZoomEnd: function () {//放大结束回调函数
            var styleString = $("#mCommon_jsImageView_swiperZoom > *").attr("style");//取放大的css
            var styleWord = /scale\(1\)/;//一倍
            oneZoom = styleWord.test(styleString); //判断是否含有一倍的字符，返回是、否
        }
    });

    //阻止滑动事件
        document.getElementById('mCommon_jsImageView_swiperZoom').addEventListener('touchstart', function (e) {//阻止冒泡
            if (!oneZoom) {//图片不是一倍时
                e.stopPropagation();//不可以滑动
            }
        }, false);

    
}

function mCommon_jsImageView_swiperZoom(imageArea,index,removeCallback) {//图片滑动 放大 参数：图片链接地址数组,第一个显示哪一屏,消失回掉函数
    //初始化
    //监控左右滑动
    var horizontalMove=false;//是否单指水平移动
    var touchStarX=0;//移动开始水平位置
    var touchMoveX=0;//移动中水平位置
    var fingerOne=false;//是否为单指滑动
    var threshold=20;//界定水平移动的阀值
    document.addEventListener('touchstart', function (e) {//开始移动事件
		var fingerNum=e.targetTouches.length;//触屏的手指数
		if (fingerNum==1) {//一个手指触屏时
			fingerOne=true;//是否为单指滑动
		}else{
			fingerOne=false;//是否为单指滑动
		}
		touchStarX=e.targetTouches[0].pageX;//移动开始水平位置  touches数组对象获得屏幕上所有的touch，取第一个touch
	  });
    
    document.addEventListener('touchmove', function (e) {//移动中事件
    	touchMoveX=e.targetTouches[0].pageX;//移动中水平位置
    	if(Math.abs(touchStarX-touchMoveX)>threshold && fingerOne ){//水平移动超过阀值 并且 一个手指开始
    		horizontalMove=true;//是否单指水平移动
    	}
    });
    document.addEventListener('touchend', function (e) {//移动结束中事件
    		//全部置为初始值
			horizontalMove=false;//是否单指水平移动
			touchStarX=0;//移动开始水平位置
			touchMoveX=0;//移动中水平位置
			fingerOne=false;//是否为单指滑动
    });
    //监控左右滑动end

    //关闭按钮国际化start
    var resultWord = mCommonLang({"zh_CN":"关闭","zh_TW":"關閉","en_US":"Close"});
    //关闭按钮国际化end

	//页面html
    var swiperPage = $('<div class="mCommon_jsImageView"><div class="mCommon_jsImageView_imgBox"><div class="swiper-container"><div class="swiper-wrapper"></div></div></div><!--数字--><span class="mCommon_jsImageView_numBox clearfix"><p class="mCommon_jsImageView_close"><!--<em class="common_fontIcon32_closed"></em>--><em style="line-height:30px; height:30px; display:inline-block;font-size:14px;color:#fff">'+resultWord+'</em></p><p class="mCommon_jsImageView_numBox_mum"><i>1</i>/<i>1</i></p></span><!--数字 end--></div>');
	//每个滑动容器
    var slideItemBox = $('<div class="swiper-slide"><table class="mCommon_jsImageView_imgContent"><tr><td><img src="" /></td></tr></table></div>');
    //放大的容器
    var zoomBox = $('<div mCommon_jsImageView_swiperZoom="" style="display:none" ><div id="scroller" ><table id="wrapperImg" class="mCommon_jsImageView_imgContent"><tr><td ><img src=""/></td></tr></table></div></div>');

    for (var n = 0; n < imageArea.length; n++) {//每个图片写入
        var slideItemBoxClone = slideItemBox.clone();//克隆一个图片滑动容器
        slideItemBoxClone.find('img').attr("src", imageArea[n]);
        slideItemBoxClone.attr("activeIndex", n);//加索引
        swiperPage.find(".swiper-wrapper").append(slideItemBoxClone);
        

        var zoomBoxClone = zoomBox.clone();//克隆一个图片放大容器
        zoomBoxClone.find('img').attr("src", imageArea[n]);
        zoomBoxClone.attr("mCommon_jsImageView_swiperZoom", n);
        swiperPage.find(".swiper-container").append(zoomBoxClone);
        var zoomBoxClone_imgBox = zoomBoxClone.find("td");
        zoomBoxClone_imgBox.height($(window).height());//td加高度
		
    }


    swiperPage.appendTo('body');//滑动显示到页面中
    var nowNumBox = swiperPage.find(" .mCommon_jsImageView_numBox_mum > i").eq(0);//当前数字显示区
    var totalNumBox = swiperPage.find(" .mCommon_jsImageView_numBox_mum > i").eq(1);//总数字显示区
    totalNumBox.html(imageArea.length);//写入图片总数

    var myScroll;//图片放大类
    var oneZoom = true;//是否为缩放1倍
    mCommon_jsImageView_autoSetWH();//自动宽高 resize

    //滑动初始化
    var mySwiper = new Swiper('.mCommon_jsImageView .swiper-container', {
        initialSlide:index,//初始化时显示哪一个
        loop: true,//循环翻动
        eventTarget: 'container',//滑动事件的dom
        onSwiperCreated: function (swiper) {//swiper初始化完成执行
            nowNumBox.html(swiper.activeLoopIndex + 1);//显示当前数字
            nowSlideIndex = swiper.activeIndex;//修改当前slide的index值
            mCommon_jsImageView_zoomDiv(swiper);//构造放大层
        },
        onTouchMove: function (swiper) {//触摸移动开始
				if(isMobile()){//如果是移动设备
					if (horizontalMove) {//如果是单指水平移动
						$("#mCommon_jsImageView_swiperZoom").hide();//放大层消失
					}
				}else{//pc设备
					$("#mCommon_jsImageView_swiperZoom").hide();//放大层消失
				}
        },
        onSlideReset: function (swiper) {//滑动复位
            $("#mCommon_jsImageView_swiperZoom").show();//放大层显示
        },
        onSlideChangeStart: function (swiper) {//滑动开始
            nowNumBox.html(swiper.activeLoopIndex + 1);//显示当前数字
        },
        onSlideChangeEnd: function (swiper) {//滑动结束    
            mCommon_jsImageView_zoomDiv(swiper);//构造放大层
        }
    });
    //浮层消失 关闭
    swiperPage.find(".mCommon_jsImageView_close").click(function () {
    	setTimeout(function(){//延时执行防止点击下面的东西
    		swiperPage.remove();//浮层消失
        	removeCallback();
    	},300);
    })

}

function mCommon_jsImageView_lodeImg(loadImageArray) {//图片加载  先显示小图，载入大图后显示大图,参数为图片地址数组[['little.jpg',''big.jpg],['little.jpg',''big.jpg],['little.jpg',''big.jpg]]
    for (var i = 0; i < loadImageArray.length; i++) {
        
        var bigImgObj = new Image();
        
        //大图对象加载完成后执行
        $(bigImgObj).load(function () {
            var littleSrc = $(this).attr("littleSrc");//小图地址
            var littleImg = $(".mCommon_jsImageView").find("img[src='" + littleSrc + "']");//小图对象
            littleImg.attr("src", this.src);//小图地址替换为大图地址
        });

        $(bigImgObj).attr("littleSrc", loadImageArray[i][0]);//小图地址藏入大图对象里
        bigImgObj.src = loadImageArray[i][1];//image对象加 大图地址
       
    }   
} 

function mCommon_jsImageView_bodyHide(){//页面内容隐藏
    document.addEventListener("touchStart.mCommon_jsImageView_bodyHide",function(e){//屏蔽浏览器默认事件
        e.preventDefault()
    });
	if($("*[mCommon_jsImageView_bodyChild]").length>0){//如果页面已有隐藏的容器
		mCommon_jsImageView_bodyShow();//就显示原有内容，去掉个隐藏
	}
	var bodyChild=$("<div mCommon_jsImageView_bodyChild='' style='position:fixed; top:-10000px; z-index:-10;'></div>");//body子容器
	var content=$("body").children();//body里的内容
	var scrollTop = $(window).scrollTop();//原有滚动条位置
	bodyChild.attr("mCommon_jsImageView_bodyChild",scrollTop);//容器写入属性 记住scrollTop值
	bodyChild.append(content);//body里的内容写入新容器中
	bodyChild.appendTo("body");//新容器写入body
    document.removeEventListener("touchStart.mCommon_jsImageView_bodyHide",function(e){//解除屏蔽浏览器默认事件
        e.preventDefault()
    });
}
function mCommon_jsImageView_bodyShow(){//页面内容显示
	if($("*[mCommon_jsImageView_bodyChild]").length==0){//如果页面没有隐藏的容器
		return false;//跳出函数
	}
	var bodyChild=$("*[mCommon_jsImageView_bodyChild]");//body子容器
	var content=bodyChild.children();//原来body里的内容
	var scrollTop = bodyChild.attr("mCommon_jsImageView_bodyChild");//原有滚动条位置
	$("body").append(content);//的原有内容写入body里
	$(window).scrollTop(scrollTop);//滚动条滑动原来位置
	bodyChild.remove();//删除加入的容器

}

//最终实现--图片放大和滑动
function mCommon_jsImageView(srcArray,index){//参数是 图片地址数组，打开的当前图片的index值；
	//例如mCommon_jsImageView([["../pic/test001.jpg","../pic/big001.jpg" ],["../pic/test002.jpg","../pic/big002.jpg" ],["../pic/test003.jpg","../pic/big003.jpg" ]],10)
	
	mCommon_jsImageView_bodyHide();//原有内容隐藏
	var littleImgSrcArray=[];//小图的连接地址数组
	for(var i=0;i<srcArray.length;i++){
		littleImgSrcArray.push(srcArray[i][0]);//取小图地址拼成数组
	}
	mCommon_jsImageView_swiperZoom(littleImgSrcArray, index,function () {//滑动和放大效果
		//关闭移除的回调函数
		mCommon_jsImageView_bodyShow();//页面内容显示
	});
	mCommon_jsImageView_lodeImg(srcArray);//加载图片,大图替换小图
}




