/*固定屏幕不出现滚动条，内容显示在一屏内
 
 * 固定一屏开启方法openFixedOneScreen()
 * 可以传入参数，对象形式，选填，格式
 *	var options = {
 *		scrollVal : null,//scrollTop的值，选填，不填默认实际滚动值
 *		fixedOneScreenOpenFun : function(){}//固定一屏开启时的回调函数，选填
 *	}
 * 固定一屏关闭方法closeFixedOneScreen()
 * 可以传入参数，对象形式，格式
 *	var options = {
 *		scrollVal : null,//scrollTop的值，选填，不填默认开启时的滚动值
 *		fixedOneScreenCloseFun : function(){}//取消固定一屏时的回调函数，选填
 *	}
 * 
 * */

function mCommon_jsFixedOneScreen_setFixedOneScreen(){
	
	var self = this;
	
	//可视区域
	var $window = $(window);
	//可视区域的高度
	var windowHeight;
	//可视区域的scrollTop
	var windowScrollTop;
	//文档
	var $body = $('body');
		
	//设置一屏,开启
	this.openFixedOneScreen = function(options){
		//防止多次点击
		if(!$body.hasClass('mCommon_jsFixedOneScreen_active')){
			//默认记录页面操作的scroollTop值
			windowScrollTop =  $window.scrollTop();
			//如果有值传入就替换
			if(undefined != options && null != options.scrollVal && undefined != options.scrollVal){
				windowScrollTop = options.scrollVal;
			}
			
			//获取可视区域高度
			windowHeight = $window.height();
			
			//将Body的高度设置成全屏
			$body.height(windowHeight +　windowScrollTop);
			
			//设置body样式，在overflow时保证位置正确
			//$body.css('margin-top',-windowScrollTop);
			$body.parent().css('overflow-y','hidden');
			
			//打开固定一屏回调方法
			if(undefined != options && null != options.fixedOneScreenOpenFun){
				options.fixedOneScreenOpenFun();
			}
			
			$body.addClass('mCommon_jsFixedOneScreen_active');
		}
	};
	
	//设置一屏,关闭
	this.closeFixedOneScreen = function(options){
		//防止多次点击
		if($body.hasClass('mCommon_jsFixedOneScreen_active')){
			//body恢复高度
			$body.css('height','');
			if(undefined != options && null != options.scrollVal){
				//恢复body的滚动距离
				$window.scrollTop(options.scrollVal);
			}else{
				//恢复body的滚动距离
				$window.scrollTop(windowScrollTop);
			}
			
			//去掉body的样式
			//$body.css('margin-top','');
			$body.parent().css('overflow-y','');

			if(undefined != options && null != options.fixedOneScreenCloseFun){
				options.fixedOneScreenCloseFun();
			}
			$body.removeClass('mCommon_jsFixedOneScreen_active');
		}
	};
	
	//resize时重新计算高度
	$window.resize(function(){
		if($body.hasClass('mCommon_jsFixedOneScreen_active')){
			$body.height('');
			//去掉body的样式
			//$body.css('margin-top','');
			$body.parent().css('overflow-y','');
			
			//获取可视区域高度
			windowHeight = $window.height();
			
			//将Body的高度设置成全屏
			$body.height(windowHeight +　windowScrollTop);
			
			//设置body样式，在overflow时保证位置正确
			//$body.css('margin-top',-windowScrollTop);
			$body.parent().css('overflow-y','hidden');
		}
	});
}
