/*遮罩层：分为全屏遮罩和局部遮罩
* zIndex:null,//设置遮罩层级，默认值为100，Number类型，选填，
* maskContainer:'',//要遮罩的容器，局部遮罩要传入容器，jquery类型,全局遮罩传空字符串，必填
* maskClickFun:function(){}//点击遮罩层时的回调函数，选填
*/

function mCommon_basicMask_setMask(options){
	var defaults = {
		zIndex:null,//设置遮罩层级，默认值为100，Number类型，选填，
		maskContainer:null,//要遮罩的容器，局部遮罩要传入容器，jquery类型,全局遮罩传空字符串，必填
		maskClickFun:function(){}//点击遮罩层时的回调函数，选填
	};
	
	options = options || {};
	options = $.extend(true, defaults, options);
	var self = this;
	//全屏遮罩的dom
	var $screenMask = $('<div class="mCommon_basicMask_screenMask"></div>');
	//传入的要遮罩的容器
	var maskContainer = options.maskContainer;
	//遮罩层级
	var zIndex = options.zIndex;
	//容器原始定位
	var originalPosition;
	//默认是全屏遮罩
	if(null == maskContainer || '' == maskContainer){
		maskContainer = $('body');
	}
	//默认遮罩层级为100
	if(null == zIndex){
		zIndex = 100;
	}
	//添加遮罩层
	this.addMask = function(){
		//获取原始定位
		originalPosition = maskContainer.css('position');
		//获取遮罩层的高度
		var maskH = this.calculateHeight();
		maskContainer.height(maskH);

		maskContainer.css('position','relative');
		$screenMask.css('z-index',zIndex);
		maskContainer.append($screenMask);

		//点击遮罩层的回调事件
		$screenMask.tap(function(){
			options.maskClickFun();
		});
	};
	//判断是否超过一屏，计算高度用
	this.calculateHeight = function(){
		//遮罩高度
		var maskH;
		//标签是Body
		if('body' == maskContainer[0].tagName.toLowerCase()){
			//先删除原先的高度
			$('body').height('');
			//文档高度
			var bodyH = $('body').height();
			//屏幕高度
			var windowH = $(window).height();
			if(bodyH < windowH){//不满一屏
				maskH = windowH;
			}else{//盛满一屏
				maskH = bodyH;
			}
		}else{
			//先删除原先的高度
			maskContainer.height('');
			maskH = maskContainer.height();
		}
		return maskH;
	};

	//删除遮罩层
	this.removeMask = function(){
		//删除高度
		$screenMask.height('');
		//删除遮罩
		$screenMask.remove();
		//还原定位
		maskContainer.css('position',originalPosition);
	};

	//初始化
	this.init = function(){

	};
	//resize重新计算
	$(window).resize(function(){
		if(maskContainer.length > 0){
			//获取遮罩层的高度
			var maskH = self.calculateHeight();
			maskContainer.height(maskH);
		}
	});
	
	//执行初始化
	this.init();
	
}

