/*上拉加载更多，下拉刷新
 * 上拉加载更多和下拉刷新可单独使用
 * 页面中的header区和footer区不影响滚动内容层的高度
 * 滚动层的父元素parentObj可以有固定宽度，适应pc端
 * 页面回调时：加载完数据loading动画隐藏self.myScroll.refresh()
 * 上拉加载更多内容时，每次露出的数据的高度大概是50，如需改变上拉加载更多内容的高度，在回调里加myscroll.scrollTo(0,10,200,true)相对当前位置在200毫秒内Y轴向上滚动10像素的效果
 * 两个没有更多内容方法：下拉层dataEndPullDownFun,上拉层dataEndpullUpFun
 * */
function mCommon_jsPullToRefresh(option){
    this.setting = {
    	parentObj:"",//jquery对象,wrapper的父容器;如值为空,wrapper的宽度为屏幕宽
    	headerObj:"",//jquery对象，如页面中有头部，wrapper的top值改为header的高度值
    	footerObj:"",//jquery对象，如页面中有底部，wrapper的bottom值改为footer的高度值
    	contentObj:"",//jquery对象，给列表内容外加wrapper，scroller，pullDown，pullUp层
    	pullDownEvent:true,//是否有下拉刷新事件
    	pullDownFun:function(pullToRefresh){
    			pullDownFun(pullToRefresh);
    		},//下拉刷新，回调，参数为类实例，开发加载完数据会用到refresh方法：pullToRefresh.myScroll.refresh()
    	pullUpEvent:true,//是否有上拉加载更多事件
    	pullUpFun:function(pullToRefresh){
    			pullUpFun(pullToRefresh);
    		}//上拉加载更多，回调，参数为类实例，开发加载完数据会用到refresh方法：pullToRefresh.myScroll.refresh()
    };
    option = option || {};
    $.extend(true, this.setting, option);
    var self=this;

	//变量定义======================
	this.myScroll;
	var pullDownEl,pullDownOffset,pullUpEl,pullUpOffset;
	var hasDataScroll=true; //用于onScrollMove，设置有无数据时上下按钮层执行哪个内容的开关
	
	
	//方法定义=======================
	
	//滚动列表结构
	this.scrollerDom=function(){
		//页面如果已有滚动列表，先清除scroller结构
		if($("#wrapper").length>0){
			$("#wrapper").remove();
		}
		//创建scroller dom 结构
		this.setting.contentObj.wrap("<div id='wrapper' class='mCommon_jsPullToRefresh_wrapper'></div>").wrap("<div id='scroller'  class='mCommon_jsPullToRefresh_scroller'></div>");
				
		//如果有下拉刷新事件，加下拉层
		if(this.setting.pullDownEvent){
			this.setting.contentObj.before('<div id="pullDown"><span class="pullDownIcon"></span><span class="pullDownLabel">下拉刷新</span></div>');
		}
		//如果有上拉加载更多事件，加上拉层
		if(this.setting.pullUpEvent){
			this.setting.contentObj.after('<div id="pullUp"><span class="pullUpIcon"></span><span class="pullUpLabel">上拉加载更多</span></div>');
		}
		
	}
	
	
	//滚动列表外wrapper定位，根据页面上是否有header和footer，给wrapper元素设置top，bottom值；给wrapper的父级定位赋高
	this.scrollerWrapperPosition = function(){
		if(this.setting.parentObj){
//			this.setting.parentObj.css({"height":$(window).height(),"position":"relative"})//$(window).height()在iphone4,qq浏览器底部栏压住页面
			this.setting.parentObj.css({"height":window.innerHeight,"position":"relative"});
		}
		if(this.setting.headerObj){
			$("#wrapper").css("top",this.setting.headerObj.outerHeight());
		}
		if(this.setting.footerObj){
			$("#wrapper").css("bottom",this.setting.footerObj.outerHeight());
		}
	};
	

	//onRefresh	===================
	//刷新时pullDownEl隐藏loading动画
	this.refreshPullDownEl=function(){
		if (pullDownEl.className.match('loading')) {
			pullDownEl.className = '';
			pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新';
		} 
	}
	//刷新时pullUpEl隐藏loading动画
	this.refreshPullUpEl=function(){
		if (pullUpEl.className.match('loading')) {
			pullUpEl.className = '';
			pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多';
		} 
	}

	
	//onScrollMove=================
	//当前滚动在顶部时，pullDownEl文字内容改变
	//self.myScroll.x/y 是页面已经滚动的垂直距离；
	//this.maxScrollY是最大垂直滚动距离
	//this.pointY手指当前的垂直坐标
	//this.minScrollY = -this.options.topOffset || 0;
	//this.maxScrollY = this.wrapperH - this.scrollerH + this.minScrollY;
	this.scrollMovePullDownEl=function(myScroll){
		if(hasDataScroll==false){
			return
		}
		else{
			if (myScroll.y > 5 && !pullDownEl.className.match('flip')) {
				pullDownEl.className = 'flip';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = '松开刷新';
				myScroll.minScrollY = 0; //minScrollY上拉层与页面头部的距离
			} else if (myScroll.y < 5 && pullDownEl.className.match('flip')) {
				pullDownEl.className = '';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新';
				myScroll.minScrollY = -pullDownOffset;
			}
		}
	}
	//当前滚动在底部时pullUpEl文字内容改变
	//myScroll.maxScrollX/maxScrollY 当滚动到底部时的myScroll.x/y
	this.scrollMovePullUpEl=function(myScroll){
		if(hasDataScroll==false){
			return
		}
		else{
			if (myScroll.y < (myScroll.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
				pullUpEl.className = 'flip';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '松开刷新';
				myScroll.maxScrollY = myScroll.maxScrollY;
			} else if (myScroll.y > (myScroll.maxScrollY + 5) && pullUpEl.className.match('flip')) {
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多';
//				myScroll.maxScrollY = pullUpOffset;
				myScroll.scrollTo(0,pullUpOffset);
			}
		}
	}
	
	//onScrollEnd==================
	//滚动结束pullDownEl，加载中动画，文字内容改变，加载新数据
	this.scrollEndPullDownEl=function(){
		if (pullDownEl.className.match('flip')) {
			pullDownEl.className = 'loading';
			pullDownEl.querySelector('.pullDownLabel').innerHTML = '加载中';				
			this.setting.pullDownFun(this);//回调，参数为mCommon_jsPullToRefresh类的实例，开发加载数据会用到refresh方法
		} 
	}
	//滚动结束pullUpEl，加载中动画，文字内容改变，加载新数据
	this.scrollEndPullUpEl=function(){
		if (pullUpEl.className.match('flip')) {
			pullUpEl.className = 'loading';
			pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中';				
			this.setting.pullUpFun(this); //回调，参数为mCommon_jsPullToRefresh类的实例。开发加载数据会用到refresh方法。
		}
	}
	
	//加载完数据==========================
	//没有新的数据
	this.dataEndPullDownFun=function(myScroll){
		hasDataScroll=false; //
		self.scrollMovePullDownEl(self.myScroll);//滚动列表，下拉层内容不改变，直接跳出
		pullDownEl.className = 'noData'; //设置下拉层图标
		pullDownEl.querySelector('.pullDownIcon').style.display="none"; //改变下拉层图标
		pullDownEl.querySelector('.pullDownLabel').innerHTML = '没有新的内容';//改变下拉层文字内容
		//隔1500ms，"没有新的内容"隐藏，并重置下拉层内容。
		setTimeout(function(){
			$("#scroller").animate({top:'-51px'},"400",'',function(){//缓慢上滑隐藏"没有新的内容"，设置top负值模拟translate(0px, -51px).
			  	pullDownEl.className = '';
				pullDownEl.querySelector('.pullDownIcon').style.display="block";
				pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新';
				$("#scroller").css({"top":"0","transform":"translate(0px, -51px)"});//重置top值，scroller通过改变translate值改变显示的内容
			});		
			hasDataScroll=true; //设置scrollMovePullDownEl执行哪个内容的开关
		},1500);

	}
	//没有更多内容
	this.dataEndPullUpFun=function(myScroll){
		hasDataScroll=false; //设置scrollMovePullDownEl执行哪个内容的开关
		self.scrollMovePullUpEl(self.myScroll);//滚动列表，上拉层内容不改变，直接跳出
		pullUpEl.className = 'noData'; //设置下拉层图标
		pullUpEl.querySelector('.pullUpIcon').style.display="none"; //改变下拉层图标
		pullUpEl.querySelector('.pullUpLabel').innerHTML = '没有更多内容';//改变下拉层文字内容
		//隐藏“没有更多内容”文字
		setTimeout(function(){
			self.myScroll.scrollTo(0, -50, 400,true);
		},1500)

	}
	
	this.refresh = function(){
		this.myScroll.refresh();
	}

	//iscroll在调用之前实例化======================
	this.loaded=function() {
		/*如果有下拉层，pullDownOffset为下拉层高度，否则为0*/
		pullDownEl = document.getElementById('pullDown');
		if(pullDownEl){
			pullDownOffset = pullDownEl.offsetHeight;
		}else{
			pullDownOffset = 0;
		}
		/*如果有上拉层，pullUpOffset为上拉层高度，否则为0*/
		pullUpEl = document.getElementById('pullUp');	
		if(pullUpEl){
			pullUpOffset = pullUpEl.offsetHeight;
		}else{
			pullUpOffset = 0;
		}
		
		self.myScroll = new iScroll("wrapper", {
			useTransition: false,//内容区滑到头部，会有白边闪动，此属性值为false，白边无。测试手机：华为
			topOffset: pullDownOffset,//已经滚动的基准值(一般用在拖动刷新)   
			
			onRefresh: function () {
				//顶部pullDownEl隐藏loading动画
				if(self.setting.pullDownEvent==true){
					self.refreshPullDownEl();
				}
				//底部pullUpEvent隐藏loading动画
//				if(self.setting.pullUpEvent==true){
//					self.refreshPullUpEl();
//				}
				if(self.setting.pullUpEvent==true && self.setting.contentObj.outerHeight()>($(window).height()-$("#pullUp").outerHeight())){
					pullUpEl.style.visibility="visible";
					self.refreshPullUpEl();
				}else{
					if(pullUpEl){
						pullUpEl.style.visibility="hidden";
					}
				}
			},
			onScrollMove: function () {
				//当手指接近屏幕边缘的时候，手动触发回弹。当this.y < this.maxScrollY，就是已经处于上拉的过程，当this.pointY < 1 ，手指已经触及屏幕边缘
				if((this.y < this.maxScrollY) &&(this.pointY < 1)){
					this.scrollTo(0,this.maxScrollY, 400);
				}else if (this.y > 0 && (this.pointY > window.innerHeight - 1)) {
					this.scrollTo(0, 0, 400);
					return;
				}

				//当前滚动在顶部时pullDownEl文字内容改变，当没有下拉刷新时，滚动条在最顶部
				if(self.setting.pullDownEvent==true&&hasDataScroll==true){
						self.scrollMovePullDownEl(self.myScroll);
				}

				//当前滚动在底部时pullUpEl文字内容改变
				if(self.setting.pullUpEvent==true){
					self.scrollMovePullUpEl(self.myScroll);
				}

			},
			onScrollEnd: function () {
				//滚动结束，顶部pullDownEl，加载中动画，文字内容改变，加载新数据
				if(self.setting.pullDownEvent==true){
						self.scrollEndPullDownEl();
				}
				//滚动结束，底部pullUpEl，加载中动画，文字内容改变，加载新数据
				if(self.setting.pullUpEvent==true){
						self.scrollEndPullUpEl();
				}
			}
		});
		
		setTimeout(function () { document.getElementById("wrapper").style.left = '0'; }, 500);
	}
	
	//绑定 禁止默认  
	var preventDefault=function (e) { e.preventDefault(); }
	this.addPreventDefault = function(){
		document.addEventListener('touchmove',preventDefault , false);
	}
	//解除绑定 禁止默认  
	this.removePreventDefault = function(){
		document.removeEventListener('touchmove',preventDefault, false);
	}
	
	
	//执行=================
	this.scrollerDom();
	this.scrollerWrapperPosition();
	this.loaded();	
	this.addPreventDefault();
	
	$(window).resize(function(){
		self.scrollerWrapperPosition();
	})
	
}

