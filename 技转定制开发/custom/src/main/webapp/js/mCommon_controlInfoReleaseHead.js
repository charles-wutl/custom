/*
 * 设定头部操作
 * 
 *containerObj : '',//盛放头部和下拉内容的容器。jquery对象，必填
 *defaultSelectText : '',//默认显示的下拉内容，最多五个汉字，字符串，必填
 *defaultBtnText : '',//默认显示右侧按钮的文字，字符串，必填
 *downListArr : [],//下拉内容数据，数组中每个内容是字符串，必填
 * 数组中对象格式：
 *{
 *	selectId:'001',//列表项的id，字符串类型，选填
 *	selectText:'指定联系人指定联系人'//列表项的显示内容，字符串类型，选填
 *},
 *{
 *	selectId:'002',//
 *	selectText:'公开公开公开公开公开公开公开公开公开公开公开公开公开公开公开'//
 *},
 *closeCallBack:function(){},//点击叉子时候的回调，选填
 *selectedCallBack:function(){},//点击头部下拉时的回调，选填
 *selectedOptionCallBack:function(){}//点击列表项的回调，选填
 * 
 * */
function mCommon_controlInfoReleaseHead_setHeadBox(options){
	//默认参数
	var defaults = {
		containerObj : '',//盛放头部和下拉内容的容器。jquery对象，必填
		defaultSelectText : '',//默认显示的下拉内容，字符串，必填
		defaultSelectTextId : '',//默认显示的下拉内容的id，字符串，必填
		defaultBtnText : '',//默认显示右侧按钮的文字，字符串，必填
		isProhibit : '',//是否预设，布尔值，必填
		downListArr : [],//下拉内容数据，数组中每个内容是字符串，必填
		closeCallBack:function(){},//点击叉子时候的回调，选填
		selectedCallBack:function(){},//点击头部下拉时的回调，选填
		selectedOptionCallBack:function(){}//点击列表项的回调，选填
	};
	
	//合并参数
	var options = $.extend(true,defaults,options);
	var self = this;
	//头部内容和下拉项目写入的容器
	var containerObj = options.containerObj;
	//下来项的数据
	var listDataArr = options.downListArr;
	//下拉容器的宽度
	var downOptionBoxW;
	//左侧按钮
	var $leftBtnObj;
	//右侧按钮
	var $rightBtnObj;
	//中部下拉按钮
	var $centerOperateBtn;
	//列表项的容器
	var $optionListBox;
	//中部下拉区域
	var newDownArea;
	
	//必填字段校验
	if(!containerObj){
		return false;
	}
	//必填字段校验
	if(0 == options.defaultSelectText){
		return false;
	}
	//必填字段校验
	if(0 == options.defaultBtnText){
		return false;
	}
	//必填字段校验
	if(0 == listDataArr.length){
		return false;
	}
	
	//渲染dom结构
	this.renderDom = function(){
		var template = '<div class="mCommon_controlInfoReleaseHead_box">';
		template += '<div class="mCommon_controlInfoReleaseHead_operateBox">';
		template += '<span class="mCommon_controlInfoReleaseHead_operateBoxClose">';
		template += '<img src='+ctxPath+'images/mCommon_basicIcon_closeWhite.png>';
		template += '</span>';
		template += '<span class="mCommon_controlInfoReleaseHead_operateBoxSure">'+options.defaultBtnText;
		template += '</span>';
		template += '<span class="mCommon_controlInfoReleaseHead_operateBoxSelect" selectid="'+options.defaultSelectTextId+'" isProhibit="'+options.isProhibit+'"><i class="textCut">'+options.defaultSelectText+'</i>';
		template += '<img class="mCommon_controlInfoReleaseHead_operateBoxSelectUp" src='+ctxPath+'/images/mCommon_basicIcon_arrowUpWhite.png>';
		template += '<img class="mCommon_controlInfoReleaseHead_operateBoxSelectDown" src='+ctxPath+'/images/mCommon_basicIcon_arrowDownWhite.png>';
		template += '</span>';
		template += '</div>';
		template += '<div class="mCommon_controlInfoReleaseHead_selectOptionBox">';
		template += '<div class="mCommon_basicPoptip">';
		template += '<div class="mCommon_basicPoptip_arrow_box">';
		template += '<img class="mCommon_basicPoptip_arrow" src='+ctxPath+'/images/mCommon_basicPoptip_arrowUp.png />';
		template += '</div>';
		template += '<div class="mCommon_basicPoptip_content">';
		for(var i=0; i<listDataArr.length; i++){
			var selectOptionObj = listDataArr[i];
			template += '<p class="textCut mCommon_basicPoptip_content_item" id="'+selectOptionObj.selectId+'">'+selectOptionObj.selectText+'</p>';
			if(i != listDataArr.length-1){
				template += '<p class="mCommon_basicPoptip_content_line"></p>';
			}
		}
		template += '</div>';
		template += '</div>';
		template += '</div>';
		template += '</div>';
		containerObj.append(template);
		//变量赋值
		$optionListBox = containerObj.find('.mCommon_controlInfoReleaseHead_selectOptionBox');
		$rightBtnObj = containerObj.find('.mCommon_controlInfoReleaseHead_operateBoxSure');
		$leftBtnObj = containerObj.find('.mCommon_controlInfoReleaseHead_operateBoxClose');
		$centerOperateBtn = containerObj.find('.mCommon_controlInfoReleaseHead_operateBoxSelect');
		//计算居中
		this.headSelectOptionCenter();
		downOptionBoxW= parseInt($optionListBox.outerWidth())
		this.downOptionListCenter();
		
	};
	//计算头部文字的居中
	this.headSelectOptionCenter = function(){
		var btnW = parseInt($rightBtnObj.outerWidth());
		var marginRight = btnW - 45;
		$leftBtnObj.css('margin-right',marginRight);
	};
	//下拉选项居中
	this.downOptionListCenter = function(){
		var screenW = parseInt(containerObj.parents('body').width());
		var nullInfoW = screenW - downOptionBoxW;
		containerObj.find('.mCommon_controlPoptip_arrow').css('left',downOptionBoxW/2);
		$optionListBox.css('left',nullInfoW/2);
	};
	//按钮名称更改
	this.btnChangeText = function(btnText){
		$rightBtnObj.text('').text(btnText);
		this.headSelectOptionCenter();
	};
	//关闭时候的方法
	this.closeFun = function(){
		$leftBtnObj.tap(function(){
			options.closeCallBack($centerOperateBtn.attr('selectid'),$(this));
		});
	};
	//点击头部下拉时候的回调
	this.headSelectFun = function(){
		//下拉项列表出现
		$centerOperateBtn.tap(function(){
			if($(this).hasClass('mCommon_controlInfoReleaseHead_selectActive')){
				$centerOperateBtn.removeClass('mCommon_controlInfoReleaseHead_selectUpShow mCommon_controlInfoReleaseHead_selectActive');
				$optionListBox.hide();
			}else{
				$centerOperateBtn.addClass('mCommon_controlInfoReleaseHead_selectUpShow mCommon_controlInfoReleaseHead_selectActive');
				$optionListBox.show();
			}
			options.selectedCallBack($(this).attr('selectid'),$(this));
		});
	};
	//点击每个下拉项的回调
	this.selectOptionListFun = function(){
		containerObj.find('.mCommon_basicPoptip_content_item').tap(function(){
			$centerOperateBtn.removeClass('mCommon_controlInfoReleaseHead_selectUpShow mCommon_controlInfoReleaseHead_selectActive');
			$centerOperateBtn.children('i').text($(this).text());
			$centerOperateBtn.attr('selectid',$(this).attr('id'));
			$optionListBox.hide();
			options.selectedOptionCallBack($(this).attr('id'),$(this));
		});
	};
	//根据id查找dom
	this.findDomById = function(id){
		return $('#'+id);
	};
	//根据id查找数组中数据
	this.findDataById = function(id){
		for(var i=0; i<listDataArr.length; i++){
			var dataObj = listDataArr[i];
			if(id == dataObj.selectId){
				return dataObj;
			}
		}
	};
	//中部下拉内容更改
	this.changeDownContent = function(textStr){
		$centerOperateBtn.children('i').text('').text(textStr);
	};
	//去掉中部下拉的点击事件
	this.unbindDownEvent = function(){
		$centerOperateBtn.addClass('mCommon_controlInfoReleaseHead_notClickCursor mCommon_controlInfoReleaseHead_notDown');
		newDownArea = $centerOperateBtn.clone();
		$centerOperateBtn.after(newDownArea);
		$centerOperateBtn.hide();
	};
	//重新绑定事件
	this.openDownEvent = function(){
		$centerOperateBtn.removeClass('mCommon_controlInfoReleaseHead_notClickCursor mCommon_controlInfoReleaseHead_notDown');
		//克隆的删除
		if(newDownArea){
			newDownArea.remove();
		}
		$centerOperateBtn.show();
	};
	//禁止绑定事件
	this.stopBindEvent = function(){
		$centerOperateBtn.addClass('mCommon_controlInfoReleaseHead_notClickCursor mCommon_controlInfoReleaseHead_notDown');
		$centerOperateBtn.unbind();
	};
	//重新开启绑定事件
	this.openBindEvent = function(){
		$centerOperateBtn.removeClass('mCommon_controlInfoReleaseHead_notClickCursor mCommon_controlInfoReleaseHead_notDown');
		this.headSelectFun();
		$centerOperateBtn.show();
	};
	//初始化
	this.init = function(){
		//渲染dom
		this.renderDom();
		//关闭按钮触发事件
		this.closeFun();
		//点击下拉触发事件
		this.headSelectFun();
		//下拉出来列表项触发事件
		this.selectOptionListFun();
	};
	
	//执行初始化
	this.init();
	
	//resize时执行方法
	$(window).resize(function(){
		self.downOptionListCenter();
	});
}
