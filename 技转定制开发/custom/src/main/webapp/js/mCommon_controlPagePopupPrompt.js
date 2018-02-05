/*
 * 弹窗提示非模态
 * 
 * 	promptImg:'',//提示的图片地址，字符串类型，选填
 *	promptText:'',//提示的信息内容，字符串类型，必填
 *	setTimeVal:null,//出现提示信息的时间,单位是毫秒，在到达此时间后自动关闭提示信息，默认值为2000毫秒，number类型，选填
 *	closeFun:function(){}//关闭后的回调函数，选填
 * 
 * */
function mCommon_controlPagePopupPrompt_setPromptInfo(options){
	this.setting = {
		promptImg:'',//提示的图片地址，字符串类型，选填
		promptText:'',//提示的信息内容，字符串类型，必填
		setTimeVal:null,//出现提示信息的时间,单位是毫秒，在到达此时间后自动关闭提示信息，默认值为2000毫秒，number类型，选填
		closeFun:function(){}//关闭后的回调函数，选填
	};
	options = options || {};
	//合并参数
	options = $.extend(true, this.setting, options);

	var self = this;
	//图片地址
	var promptImg = options.promptImg;
	//显示的内容
	var promptText = options.promptText;
	//显示的时间
	var setTimeVal = options.setTimeVal;
	//setTimeout返回的ID
	var promptTimeout;

	//添加默认值
	if(null == setTimeVal){
		setTimeVal = 2000;//单位是毫秒
	}
	//弹窗盒子
	$promptBox = $('<div class="mCommon_controlPagePopupPrompt_box mCommon_controlPagePopupPrompt_boxNoImg"></div>');
	//写入dom结构
	this.writeStructure = function(){
		//定义dom字符串
		var template = '';
		//如果有图片才走if逻辑
		if('' != promptImg && null != promptImg){
			$promptBox.removeClass('mCommon_controlPagePopupPrompt_boxNoImg');
			template += '<span class="mCommon_controlPagePopupPrompt_promptImgBox">';
			template += '<img src="'+promptImg+'" />';
			template += '</span>';
		}
		template += '<span class="mCommon_controlPagePopupPrompt_promptInfo wordBreak">'+promptText;
		template += '</span>';
		//字符串填到dom中
		$promptBox.append(template);
		$('body').append($promptBox);
	};

	//计算margin值，设置居中
	this.calculMarginVal = function(){
		var boxOuterW = $promptBox.outerWidth();
		var boxOuterH = $promptBox.outerHeight();
		$promptBox.css({
			'margin-left':-(boxOuterW/2),
			'margin-top':-(boxOuterH/2),
			'left':'50%'
		});
	};

	//在等待指定时间后自动删除提示信息
	this.closePromptInfo = function(){
		promptTimeout = setTimeout(function(){
			self.removePromptDom();
			options.closeFun();
		},setTimeVal);
	};

	//移除dom结构
	this.removePromptDom = function(){
		$promptBox.remove();
		$('body').unbind('touchmove.mCommon_controlPagePopupPrompt');
	};

	//执行resize
	$(window).resize(function(){
		self.calculMarginVal();
	});

	//初始化方法
	this.init = function(){
		//先判断是否存在提示盒子
		if($('.mCommon_controlPagePopupPrompt_box').length > 0){
			$('.mCommon_controlPagePopupPrompt_box').remove();
		}
		this.writeStructure();
		this.calculMarginVal();
		this.closePromptInfo();

		$('body').bind('touchmove.mCommon_controlPagePopupPrompt',function(){
			self.removePromptDom();
			options.closeFun();
			clearTimeout(promptTimeout);
		});
	};

	//执行初始化
	this.init();
}
