/*
 * 设置群组轮播
 * 其中参数为：
 * swiperContainer:'',//轮询容器,字符串形式，必填
 * clickFun:function(){}//点击后的回调函数，选填
 * 
 * 
 * */
function mCommon_basicHotGroupSlide_setSlideContent(options){
	var defaults = {
		swiperContainer:'',//轮询容器,字符串形式，必填
		clickFun:function(){}//点击后的回调函数，选填
	}
	
	options = $.extend(true, defaults, options);
	var self = this;
	
	var swiperContainer = options.swiperContainer;
	//容器不存在，跳出
	if(!swiperContainer){
		return false;
	}
	//群描述
	var groupDescArr = [];
	//计算宽度
	this.calculWidth = function(){
		//计算出大容器的宽度
		var containerW = parseInt($('.'+swiperContainer).width());
		//计算出每个轮播的小容器的宽度
		var swiperSlideW = containerW - 32;
		
		var swiperSlideArr = $('.'+swiperContainer).find('.mCommon_basicHotGroupSlide_itemBox');
		//给每一个轮播的小容器设置宽度
		swiperSlideArr.each(function(){
			$(this).width(swiperSlideW);
			$(this).find('.mCommon_basicHotGroupSlide_groupName').width(swiperSlideW-64-10-15);
			$(this).find('.mCommon_basicHotGroupSlide_groupDesc').width(swiperSlideW-64-10-15);
		})
		//最后一个轮播小容器宽度为大容器的宽度
		swiperSlideArr.last().width(containerW);
		//最后一个轮播小容器中群名称设置宽度
		swiperSlideArr.last().find('.mCommon_basicHotGroupSlide_groupName').width(containerW-64-10-15);
		swiperSlideArr.last().find('.mCommon_basicHotGroupSlide_groupDesc').width(containerW-64-10-15);
	}
	//初始化swiper
	this.initSwiper = function(){
		var mySwiper = new Swiper('.'+swiperContainer,{
		    slidesPerView: 'auto',
			onSlideClick: function(swiper){
				var clickedSlide = swiper.clickedSlide;
				var clickedSlideIndex = clickedSlide.index() + 1;
				options.clickFun(clickedSlideIndex,$(clickedSlide));
			}
		})
	}
	
	//字符串做截取
	this.stringHandle = function(){
		var swiperSlideArr = $('.'+swiperContainer).find('.mCommon_basicHotGroupSlide_itemBox');
		//给每一个轮播的小容器设置宽度
		swiperSlideArr.each(function(){
			var groupDescObj = $(this).find('.mCommon_basicHotGroupSlide_groupDesc');
			if(0 != groupDescObj.length){
				var groupDesc = groupDescObj.text();
				groupDescArr.push(groupDesc);
			}
		})
		this.stringIntercept();
	}
	this.stringIntercept = function(){
		var swiperSlideArr = $('.'+swiperContainer).find('.mCommon_basicHotGroupSlide_itemBox');
		//给每一个轮播的小容器设置宽度
		swiperSlideArr.each(function(i,o){
			var groupDescObj = $(this).find('.mCommon_basicHotGroupSlide_groupDesc')
			if(0 != groupDescObj.length){
				var groupDescW = parseInt(groupDescObj.width());
				var oneLineFontCount = groupDescW/12;
				var newStr = groupDescArr[i].subCHStr(0, parseInt(oneLineFontCount* 2 * 2 * 0.8));
				groupDescObj.text(newStr);
			}
		})
	}
	//resize重新计算宽度
	$(window).resize(function(){
		this.calculWidth();
		this.stringIntercept();
	})
	
	//初始化
	this.init = function(){
		this.initSwiper();
		this.calculWidth();
		this.stringHandle();
	}
	//执行初始化
	this.init();
}
