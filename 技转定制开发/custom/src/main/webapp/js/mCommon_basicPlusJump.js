/*
 * containerObj:null,//盛放的容器，选填，jquery对象，默认是body
 * defaultShow:null,//容器默认是否显示，选填，布尔值，默认为true显示
 * zIndex:null,//设置容器等级，选填，number类型，默认是99
 * rightPosition:null,//设置距离右侧位置，选填,默认是15
 * bottomPosition:null,//设置距离下面位置，选填，默认是60
 * showFun:function(){},//显示时候回调，选填
 * hideFun:function(){},//隐藏时候回调，选填
 * clickFun:function(){}//点击时候回调，选填
 * 
 * 
 * */

function mCommon_basicPlusJump_setRoundBall(options){
	//默认参数
	var defaults = {
		containerObj:null,//盛放的容器，选填，jquery对象，默认是body
		defaultShow:null,//容器默认是否显示，选填，布尔值，默认显示
		zIndex:null,//设置容器等级，选填，number类型，默认是99
		rightPosition:null,//设置距离右侧位置，选填,默认是15
		bottomPosition:null,//设置距离下面位置，选填，默认是60
		showFun:function(){},//显示时候回调，选填
		hideFun:function(){},//隐藏时候回调，选填
		clickFun:function(){}//点击时候回调，选填
	}
	//合并参数
	var options = $.extend(true, defaults, options);
	//盛放的容器
	var containerObj = options.containerObj;
	//层级
	var zIndex = options.zIndex;
	//容器距离右侧位置
	var rightPosition = options.rightPosition;
	//容器距离底部的位置
	var bottomPosition = options.bottomPosition;
	//默认是否显示
	var defaultShow = options.defaultShow;
	//fixed容器
	var fixedBox;
	//圆球容器
	var roundBall;
	//按钮容器
	var btnDiv;
	//容器默认设置为Body
	if(!containerObj || null == containerObj){
		containerObj = $('body');
	}
	//层级默认设置99
	if(!zIndex || null == zIndex){
		zIndex = 99;
	}
	//距离右侧距离
	if(!rightPosition || null == rightPosition){
		rightPosition = 15;
	}
	//距离底部距离
	if(!bottomPosition || null == bottomPosition){
		bottomPosition = 60;
	}
	//容器默认显示
	if(defaultShow != false){
		defaultShow = true;
	}
	//渲染dom结构
	this.renderDom = function(){
		var template = '';
		template += '<div class="mCommon_basicPlusJump_box">';
		template += '<div class="mCommon_basicPlusJump_boxMaxW">';
		template += '<div class="mCommon_basicPlusJump_bottomBtnBox mTheme_bgColor">';
		template += '<span class="mCommon_basicPlusJump_bottomBtnBoxContent"></span>';
		template += '</div>';
		template += '</div>';
		template += '</div>';
		containerObj.append(template);
		fixedBox = containerObj.find('.mCommon_basicPlusJump_box');
		roundBall = containerObj.find('.mCommon_basicPlusJump_bottomBtnBox');
		btnDiv = containerObj.find('.mCommon_basicPlusJump_bottomBtnBox');
		if(!defaultShow){
			fixedBox.hide();
		}
	};
	//设置位置
	this.setRoundBallPosition = function(){
		fixedBox.css({
			'z-index':zIndex,
			'bottom': (bottomPosition + 48)
		});
		roundBall.css('right',rightPosition);
	};
	//绑定事件
	this.ballBindEvent = function(){
		roundBall.tap(function(){
			options.clickFun(btnDiv.children('span'));
		});
	};
	//显示
	this.showFun = function(){
		fixedBox.show();
		options.showFun();
	};
	//隐藏
	this.hideFun = function(){
		fixedBox.hide();
		options.hideFun();
	};
	//将加号更改为叉子
	this.changeClose = function(){
		var spanObj = btnDiv.children('span');
		if(spanObj.hasClass('mCommon_basicPlusJump_bottomBtnBoxContent')){
			spanObj.removeClass('mCommon_basicPlusJump_bottomBtnBoxContent');
			spanObj.addClass('mCommon_basicPlusJump_bottomBtnBoxContentClose');
			btnDiv.addClass('mCommon_basicPlusJump_bottomBtnBoxRed');
		}else{
			spanObj.removeClass('mCommon_basicPlusJump_bottomBtnBoxContentClose');
			spanObj.addClass('mCommon_basicPlusJump_bottomBtnBoxContent');
			btnDiv.removeClass('mCommon_basicPlusJump_bottomBtnBoxRed');
		}
	};
	//初始化
	this.init = function(){
		this.renderDom();
		this.setRoundBallPosition();
		this.ballBindEvent();
	};
	//执行初始化
	this.init();
}
