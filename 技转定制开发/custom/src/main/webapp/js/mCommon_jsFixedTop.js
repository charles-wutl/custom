//滚动到某个dom元素，这个dom元素就停留在顶部，滚到这个dom原来的位置dom元素回到原来位置。
//再次手动定位  this.reFixed()
//清除 this.FixedTopClear()
//修改定位方式 this.objAbsolute() 或 this.objFixed()
function mCommon_jsFixedTop(option){
	 this.setting = {
		fixedObj:null,//需要停留到顶部的jq对象,必填
		 position:"fixed"//定位方式"fixed"或是"absolute"默认fixed
		//fixOptionTop:0,//停留到顶部的位置，top值，默认是0
		//fixedFun:function(){},//浮动到顶部的回调
		//staticFun:function(){}//回到原位的回调
    };
    option = option || {};
    $.extend(true, this.setting, option);
    var self=this;
	
	//定义变量
	this.staticOffsetY;//定位元素原来的页面位置y值
	this.scrollTop;//滚动条位置
	this.fixedBox;//浮动的容器
	this.heightBox;//撑着高度的容器
	this.fixedObjHeight;//停留顶部对象高度
	this.resizeSettimeoutId;
	this.scrollSettimeoutId;
	this.timeout_time=100;//延时时间
	this.position=this.setting.position;//定位放方式
	
	//获取位置和尺寸 resize调用
	this.getOffsetSize=function(){
		this.staticOffsetY=this.heightBox.offset().top;//获取定位对象offset y位置
		this.fixedObjHeight=this.setting.fixedObj.outerHeight();//停留顶部对象高度
		this.heightBox.height(this.fixedObjHeight);//撑着高度的容器 加高度
	};
	
	//获取scrollTop值 resize调用 scroll调用
	this.getScrollTop=function(){
		this.scrollTop=$(window).scrollTop();//滚动条位置
	};
	
	//判断对象是否要浮出
	this.objFixed=function(){
		this.position="fixed";//修改变量
		self.getScrollTop();//获取scrollTop值 resize调用 scroll调用
		if(this.staticOffsetY <= this.scrollTop){//对象滑动到屏幕上面了
			this.fixedBox.css({"position":"fixed","top":"0"});//浮动
		}else{//对象在屏幕里
			this.fixedBox.css("position","static");//不浮动
		}
	};

	//改为absolute定位
	this.objAbsolute=function(){
		this.position="absolute";//修改变量
		self.getScrollTop();//获取scrollTop值 resize调用 scroll调用
		if(this.staticOffsetY <= this.scrollTop){//对象滑动到屏幕上面了
			this.fixedBox.css({"position":"absolute","top":this.scrollTop});//浮动
		}else{//对象在屏幕里
			this.fixedBox.css("position","static");//不浮动
		}
	};

	//再次手动定位
	this.reFixed=function(){
		this.getOffsetSize();//获取位置和尺寸 resize调用
		//this.getScrollTop();//获取scrollTop值 resize调用 scroll调用
		this.objPosition();//定位
	};
	
	//初始化
	this.initFixedTop=function(){
		//dom准备
		this.setting.fixedObj.wrap('<div class="mCommon_jsFilter_height"></div>').wrap('<div class="mCommon_jsFilter_fixed"></div>').wrap('<div class="mCommon_jsFilter_fixedContent"></div>');
		this.fixedBox=this.setting.fixedObj.parents(".mCommon_jsFilter_fixed");//浮动的容器 赋值
		this.heightBox=this.setting.fixedObj.parents(".mCommon_jsFilter_height");//撑着高度的容器 赋值
		
	};

	//清除
	this.FixedTopClear=function(){
		this.setting.fixedObj.unwrap().unwrap().unwrap();//去掉三个外层
		$(window).unbind('scroll.mCommon_jsFixedTop');//解绑事件
		$(window).unbind("resize.mCommon_jsFixedTop");
		
	};

	//定位
	this.objPosition=function(){
		if(self.position=="fixed"){
			self.objFixed();//获取scrollTop值 resize调用 scroll调用
		}else if(self.position=="absolute"){
			self.objAbsolute();//获取scrollTop值 resize调用 scroll
		}
	};

	//window scroll事件
	this.winScroll=function(){
		$(window).bind('scroll.mCommon_jsFixedTop',function(){
			clearTimeout(self.scrollSettimeoutId);
			self.scrollSettimeoutId=setTimeout(function(){
				self.objPosition();
			},self.timeout_time);
		});
	};

	//停止window scroll事件
	this.winUnBindScroll=function(){
		$(window).unbind('scroll.mCommon_jsFixedTop');//解绑事件
	};
	
	//执行
	this.initFixedTop();//初始化
	this.getOffsetSize();//获取位置和尺寸 resize调用
	this.getScrollTop();//获取scrollTop值 resize调用 scroll调用
	this.objFixed();//获取scrollTop值 resize调用 scroll调用
	this.winScroll();//window scroll事件


	$(window).bind("resize.mCommon_jsFixedTop",function(){
		clearTimeout(self.resizeSettimeoutId);
		self.resizeSettimeoutId=setTimeout(function(){
			self.getOffsetSize();//获取位置和尺寸 resize调用
			self.getScrollTop();//获取scrollTop值 resize调用 scroll调用
		},self.timeout_time);
	});

}
