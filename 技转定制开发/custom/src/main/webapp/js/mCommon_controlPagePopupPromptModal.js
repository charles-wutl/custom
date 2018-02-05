/*//模态弹窗提示
 *
 * titleText:'',//弹框显示的提示标题,字符串类型，必填
 * contentText:null,//弹框显示的提示内容，jquery类型，选填
 * btnType:'',//按钮类型，两个值，一个是transverse表示横向按钮，另一个是endwise表示纵向按钮，字符串类型，默认是transverse，选填
 * 	//列表形式的按钮，数组类型，选填
 *	//数组中每个对象包括三个属性，
 *	//第一个是btnName代表按钮的显示内容,值是字符串类型，必填
 *	//第二个是btnId代表按钮的id，字符串类型，需要是唯一，必填
 *	//第三个是btnState代表按钮的状态，字符串类型，传入空字符串表示文字黑色显示，传入selected文字蓝色显示，选填
 * listButtonArr:[
 *	{btnName:'好的，知道了！',btnId:'mCommon_controlPagePopupPromptModal_endwiseConfirm',btnState:'selected'},
 *	{btnName:'不用了，谢谢！',btnId:'mCommon_controlPagePopupPromptModal_endwiseCancle',btnState:''}
 *],
 *
 * clickListButtonFun:function(){},//列表按钮形式的点击回调函数,选填
 * confirmText:'',//确定功能显示的文字
 * clickConfirmFun:function(){},//确定功能按钮的回调函数
 * cancleText:'',//取消功能显示的文字
 * cancleShow:true,//取消功能的按钮是否显示，默认值是true-按钮显示，选填
 * clickCancleFun:function(){}//取消功能按钮的回调函数
 *
 *
 * */

function mCommon_controlPagePopupPromptModal_setTopPosition(options){
	var defaults = {
		titleText:'',//弹框显示的提示标题,字符串类型，必填
		contentText:null,//弹框显示的提示内容，jquery类型，选填
		btnType:'',//按钮类型，两个值，一个是transverse表示横向按钮，另一个是endwise表示纵向按钮，字符串类型，默认是transverse，选填
		//列表形式的按钮，数组类型，选填
		//数组中每个对象包括三个属性，
		//第一个是btnName代表按钮的显示内容,值是字符串类型，必填
		//第二个是btnId代表按钮的id，字符串类型，需要是唯一，必填
		//第三个是btnState代表按钮的状态，字符串类型，传入空字符串表示文字黑色显示，传入selected文字蓝色显示，选填
		listButtonArr:[],
		clickListButtonFun:function(){},//列表按钮形式的点击回调函数,选填
		confirmText:'',//确定功能显示的文字
		clickConfirmFun:function(){},//确定功能按钮的回调函数
		cancleText:'',//取消功能显示的文字
		cancleShow:true,//取消功能的按钮是否显示，默认值是true-按钮显示，选填
		clickCancleFun:function(){},//取消功能按钮的回调函数
		isShow:null,//默认显示弹窗,布尔值，选填
		showFun:function(){}//显示时候回调，选填
	};
	
	options = options || {};
	
	$.extend(true,defaults,options);
	
	var self = this;
	
	//确定提示标题存在
	if(!options.titleText){
		return false;
	}
	//默认显示类型为横向按钮
	if(!options.btnType){
		options.btnType = 'transverse';
	}
	
	//提示框
	var $promptBox = $('<div class="mCommon_controlPagePopupPromptModal_box"></div>');
	//提示内容框
	var $promptBoxContent = $('<ul class="mCommon_controlPagePopupPromptModal_boxContent"></ul>');
	//提示内容框内显示的文字区域
	var $textArea = $('<li class="mCommon_controlPagePopupPromptModal_item borderPx1 mCommon_controlPagePopupPromptModal_text"></li>');
	//显示的标题
	var $textTitle = $('<p class="mCommon_controlPagePopupPromptModal_textTitle wordBreak"></p>');
	
	//列表形式的按钮
	var $endwiseListBtnBox = $('<li class="mCommon_controlPagePopupPromptModal_item borderPx1" tapclass=""></li>');
	var $endwiseListBtn = $('<div class="mCommon_controlPagePopupPromptModal_operateInfo textCut"></div>');
	
	
	//横向显示的按钮容器
	var $transverseBtnBox = $('<li class="mCommon_controlPagePopupPromptModal_item borderPx1 mCommon_controlPagePopupPromptModal_operateInfo mCommon_controlPagePopupPromptModal_transverse mCommon_controlPagePopupPromptModal_transverseOnlyOne"></li>');
	//横向显示按钮--取消
	var $transverseCancle = $('<p class="mCommon_controlPagePopupPromptModal_operateInfoCancle borderPx1 textCut" tapclass=""></p>');
	//横向显示按钮--确定
	var $transverseConfirm = $('<p class="mCommon_controlPagePopupPromptModal_operateInfoConfirm textCut" tapclass=""></p>');
	
	
	//编写dom结构
	this.writeStructure = function(){
		$('.mCommon_controlPagePopupPromptModal_box').remove();
		//标题内容填写
		$textTitle.text(options.titleText);
		//标题写入显示内容区域内
		$textArea.append($textTitle);
		//副标题有内容就写入到显示内容区域内
		if(options.contentText){
			//副标题写入显示内容区域内
			$textArea.append(options.contentText);
		}
		//添加标题
		$promptBoxContent.append($textArea);
		
		if('transverse' == options.btnType){
			//横向形式按钮
			if(options.cancleShow){
				$transverseBtnBox.removeClass('mCommon_controlPagePopupPromptModal_transverseOnlyOne');
				//取消功能按钮名称写入dom
				$transverseCancle.text(options.cancleText);
				//添加取消功能按钮到dom中
				$transverseBtnBox.append($transverseCancle);
			}
			//确定功能按钮填入名称
			$transverseConfirm.text(options.confirmText);
			$transverseBtnBox.append($transverseConfirm);
			//横向按钮填入到dom结构中
			$promptBoxContent.append($transverseBtnBox);
		}else if('endwise' == options.btnType){
			//列表形式按钮数组
			var listBtnArr = options.listButtonArr;
			for(var i=0; i<listBtnArr.length; i++){
				var $temEndListBtn = $endwiseListBtn.clone();
				var $temEndwiseListBtnBox = $endwiseListBtnBox.clone();
				var listBtnObj = listBtnArr[i];
				//按钮名称
				var btnName = listBtnObj.btnName;
				//按钮id
				var btnId = listBtnObj.btnId;
				//按钮状态
				var btnState = listBtnObj.btnState;
				
				$temEndListBtn.text(btnName);
				if('selected' == btnState){
					$temEndListBtn.addClass('mCommon_controlPagePopupPromptModal_selected');
				}
				$temEndwiseListBtnBox.attr('id',btnId);
				$temEndwiseListBtnBox.append($temEndListBtn);
				$promptBoxContent.append($temEndwiseListBtnBox);
			}
		}
		
		$promptBox.append($promptBoxContent);
		$('body').append($promptBox);
		if(undefined != options.isShow && !options.isShow){//默认不显示
			$promptBox.hide();
		}
	};
	
	//计算marginTop值
	this.calculMarginTopVal = function(){
		//计算marginTop的值用来设置居中
		$promptBox.css('margin-top',-($promptBox.outerHeight()/2));
	};
	//绑定事件
	this.objBindFun = function(){
		if('transverse' == options.btnType){
			//横向排列按钮
			if(options.cancleShow){
				//取消按钮绑定事件
				$promptBox.find('.mCommon_controlPagePopupPromptModal_operateInfoCancle').click(function(){
					var index = $(this).index();
					options.clickCancleFun(index,$(this));
				});
			}
			//确定按钮绑定事件
			$promptBox.find('.mCommon_controlPagePopupPromptModal_operateInfoConfirm').click(function(){
				var index = $(this).index();
				options.clickConfirmFun(index,$(this));
			});
		}else if('endwise' == options.btnType){
			//列表按钮形式的点击回调函数
			$promptBox.find('.mCommon_controlPagePopupPromptModal_operateInfo').click(function(){
				var parentLi = $(this).parent();
				var id = parentLi.attr('id');
				options.clickListButtonFun(id,parentLi);
			});
		}
	};
	//关闭弹窗提示
	this.closePrompt = function(){
		$promptBox.remove();
	};
	//隐藏弹窗
	this.hidePrompt = function(){
		$promptBox.hide();
	};
	//重新显示弹窗
	this.showPrompt = function(){
		$promptBox.show();
		if(undefined != options.showFun){
			options.showFun();
		}
	};
	//根据id找到指定的dom
	this.findDomById = function(id){
		return $('#'+id);
	};
	//根据id找到列表样式按钮数组中的指定的数据
	this.findDataById = function(id){
		var listBtnArr = options.listButtonArr;
		for(var i=0; i<listBtnArr.length; i++){
			var listBtnObj = listBtnArr[i];
			//按钮id
			var btnId = listBtnObj.btnId;
			if(id == btnId){
				return listBtnObj;
			}
		}
	};

	//重新计算margintop值
	$(window).resize(function(){
		self.calculMarginTopVal();
	});

	//初始化方法
	this.init = function(){
		this.writeStructure();
		this.calculMarginTopVal();
		this.objBindFun();
	};
	//执行初始化
	this.init();
}
