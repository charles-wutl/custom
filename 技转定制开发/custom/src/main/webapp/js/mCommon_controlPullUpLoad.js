/*滑到底部加载数据
 列表内容中的图片要有高度，因为图片不会同步加载过来，否则列表盒子找不到高度
 初始化加载数据后，如果不满一屏且还有数据就再加载数据直到盛满一屏；
 加载完数据后再次恢复上拉加载更多数据，调用这个方法 this.refresh(haveMore) ; haveMore可以是true
 清除上划事件及其dom,调用方法 this.clearPullUp()
 * */
function mCommon_controlPullUpLoad(option){
    this.setting = {
    	loadingDiv:$('<p class="mCommon_jsPullToRefresh_loading "><img class="mCommon_jsPullToRefresh_loading_icon"  src='+ctxPath+'/images/mCommon_basicIcon_loading.png />加载中</p>'),//加载中显示的jq对象
	 	noneMoreDiv:$("<p class='mCommon_jsPullToRefresh_noneMore'>没有更多内容</p>"),//没有更多内容显示的jq对象
    	listOuterBox:null,//jquery对象,列表外容器容器，找底边位置用
    	loadLineUpY:20,//int型 加载触发线的向上偏移量 ,初始值是列表外容器底边为触发线,如果底部有fixed按钮,这个值就是按钮的高度+10
    	loadData:function(){//加载数据写入数据回调
    		return true;//必须返回是否还有更多;
    	}
    };
    option = option || {};
    $.extend(true, this.setting, option);mCommon_controlPullUpLoad.js
    var self=this;

	//变量定义======================
	this.loadData = this.setting.loadData;
	this.loadingBox=$('<div style="display:none"></div>');//显示loading的容器
	this.winH;//窗口高度
	this.boxH;//列表盒子高度
	this.boxOffsetTop;//box document y位置（左上角）
	this.scrollTopMax=0;//scrollTop的最大值，大于这个值就触发 加载更多
	this.loadingState=false;//是否在加载中
	
	
	
	//定义方法=======================
	
	//获取高度 resize调用
	this.getHeight=function(){
		//this.winH=$(window).height();//窗口高度
		this.winH=window.innerHeight;//窗口高度
		this.boxOffsetTop=this.setting.listOuterBox.offset().top;//offset y位置  
	};
	
	//scrollTopMax值 resize调用 refresh调用
	this.getScrollTopMax=function(){
		this.boxH=this.setting.listOuterBox.outerHeight();//列表盒子高度
		this.scrollTopMax=this.boxOffsetTop+this.boxH-this.winH-this.setting.loadLineUpY;//scrollTop的最大值，大于这个值就触发 加载更多
	};
	
	//loadingBox是否显示
	this.loadingBox_showHide=function(){
		this.boxH=this.setting.listOuterBox.outerHeight();//列表盒子高度
		//console.log(this.boxOffsetTop+"+"+this.boxH+"-"+this.setting.loadLineUpY+"/"+(this.boxOffsetTop+this.boxH-this.setting.loadLineUpY) +"/"+"<"+ (this.winH)+"/winH:"+this.winH);

		if(this.boxOffsetTop+this.boxH-this.setting.loadLineUpY < this.winH){//列表盒子的底线在 一屏之内
			this.loadingBox.hide();//loadingBox隐藏
		}else{//列表盒子的底线在 一屏之外
			this.loadingBox.show(50);//loadingBox显示
		}
	};
	
	 //放入 加载中 或 没有更多(没有更多永远显示)
	 this.showLoadOrNone=function(haveMore){//参数 是否有更多内容
	 	var loadingDiv=this.setting.loadingDiv;//加载中
	 	var noneMoreDiv=this.setting.noneMoreDiv;//没有更多内容
	 	this.loadingBox.html("");//清空loading容器
	 	if(haveMore){//如果有更多内容
			//this.loadingBox.hide();
	 		this.loadingBox.show();//20161021 客户快速频繁上拉，此时数据没有请求回来 要有加载中提示
	 		this.loadingBox.append(loadingDiv);//加载中
	 	}else{//如果没有更多内容
	 		this.loadingBox.append(noneMoreDiv);//没有更多内容
	 		this.loadingBox_showHide();
	 		//this.loadingBox.show();//一直显示
	 	}
	 };

	//初始化方法
	this.init=function(){//初始化方法
		this.getHeight();//获取高度 resize调用
 		this.setting.listOuterBox.after(this.loadingBox);//loading容器写在列表容器后面	
 		this.appendData();//写入数据	
	};
	
	
	//只有外部加载数据方法要调用这个方法，
	//刷新方法；判断是否要显示loading或没有更多内容，是否要挂事件
	this.refresh=function(haveMore){//参数是是否有更多数据，布尔类型
		self.showLoadOrNone(haveMore);//放入 加载中 或 没有更多
		self.getScrollTopMax();//取加载数据的最大值
		setTimeout(function(){//延时一会儿触发，否在加完数据还会触发window的scroll事件
			self.loadingState=false;//加载状态 修改
		},100);
		if(!haveMore){//如果没有更多数据
			$(window).unbind("scroll.mCommon_jsPullToRefresh resize.mCommon_jsPullToRefresh");//解绑事件不在加载
		}else if(self.scrollTopMax <=0 ){//如果内容没有盛满一屏 且 还有更多内容
			self.appendData();//写入数据
		}
	};
	//写入数据方法
	this.appendData=function(){
		self.loadingState=true;//正在加载中
		//self.loadingBox_showHide();//loadingBox是否显示 20161021 注释掉，客户快速频繁上拉，此时数据没有请求回来 要有加载中提示
		//self.loadingBox.show(100);//显示loading
		try{
 			this.loadData();//加载数据 回调函数
 		}catch(e){}
 		
	};
	//清除上划事件
	this.clearPullUp=function(){
		this.loadingBox.remove();//清除load dom元素
		$(window).unbind("resize.mCommon_jsPullToRefresh");//清除resize监听
		$(window).unbind('scroll.mCommon_jsPullToRefresh' );//清除滚动监听
	};
	//恢复上划加载更多
//	this.recoverPullUp=function(){
//	}
	
	
	//挂事件==========================
	//加载更过事件
	$(window).bind('scroll.mCommon_jsPullToRefresh',function(){
		self.getHeight();//获取高度 魅族隐藏地址栏是没有触发 resize 事件
		self.getScrollTopMax();//scrollTopMax值 魅族隐藏地址栏是没有触发 resize 事件
		var winScrollTop=$(window).scrollTop();//窗口的滚动值
		// var h=window.innerHeight;
		//alert(winScrollTop+">"+self.scrollTopMax+'/winH:'+self.winH+"/"+h);
		if(winScrollTop >= self.scrollTopMax && !self.loadingState){//窗口的滚动  到 阀值
			self.appendData();//写入数据
		}
	});
	

	
	//win resize事件
	$(window).bind("resize.mCommon_jsPullToRefresh",function(){
		self.getHeight();//获取高度 resize调用
	    self.getScrollTopMax();//scrollTopMax值 resize调用 refresh调用
	});
	
	//执行=============================
	this.init();
}

/*解决重名问题
 注意：老的上拉加载和引用在这个js文件前面
 原来的名字叫 mCommon_jsPullToRefresh已经用了很多地方，新名字 mCommon_controlPullUpLoad
 单独引用叫老名字，两个js文件都引用了就叫新名字*/
if(typeof(mCommon_jsPullToRefresh)=="undefined"){//如果老名字 没有引入
	var mCommon_jsPullToRefresh = mCommon_controlPullUpLoad;//还叫老名字
}

