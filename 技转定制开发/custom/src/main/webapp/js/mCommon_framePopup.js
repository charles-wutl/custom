/*弹出层框架
传入弹窗内容和按钮
显示弹窗
this.showPopup
隐藏弹窗
this.hidePopup

非模态弹窗不显示黑层，不显示按钮，过一会自动消失
隐藏弹窗也生效
this.hidePopup

*/
function mCommon_framePopup(setting) {
    this.option = {
        appendObj: $("body"),//浮出层和黑层显写入的容器
        contentObj: $("<div>信息内容</div>"),//内容区显示的对象
        buttonObj: null,//按钮区显示的对象
        //非模态弹窗不显示黑层，不显示按钮，过一会自动消失
        modal: true,//是否为模态弹窗 
        spaceClose: false,//点击空白关闭弹层，默认为false
        showTime: 3000,//非模态弹窗停留时间
        winScroll: true,//浏览器是否可以滚动
        showCallback:function(self){},//显示弹窗后的回调 参数是this 
        hideCallback:function(self){}//隐藏弹窗后的回调  参数是this 
    };
    setting = setting || {};
    $.extend(true, this.option, setting);
    var self=this;

    //定义变量===========

    //浮出层框架
    this.showFrame =$('<div class="mCommon_framePopup_bigBox"><div class="mCommon_framePopup_black"></div><div class="mCommon_framePopup_winBox"><div class="mCommon_framePopup_winBox_win"><ul class="mCommon_framePopup_winBox_winContnet"><li class="mCommon_framePopup_winBox_winContnet_content"></li><li class="mCommon_framePopup_winBox_winContnet_button"></li></ul></div></div></div>');
    //黑层部分
    this.black = this.showFrame.find(".mCommon_framePopup_black");
    //浮出部分
    this.popup = this.showFrame.find(".mCommon_framePopup_winBox");
    //弹窗
    this.win = this.showFrame.find(".mCommon_framePopup_winBox_win");
    //浮层内容区
    this.popup_content = this.popup.find(".mCommon_framePopup_winBox_winContnet_content");
    //浮层按钮区
    this.popup_button = this.popup.find(".mCommon_framePopup_winBox_winContnet_button");
    
    //body的内部包裹层
    this.bodyWrapInner=$("<div id='mCommon_framePopup_bodyWrapInner'></div>");
    
    //window的ScrollTop值
    this.winScrollTop=0;
    
    //浮层上下最小间距
    this.popup_minMarginTB = 50;
    //非模态浮层 setTimeoutId
    this.setTimeoutId = null;
     //是否点击了弹窗
    this.tapWin = false;


    //定义方法===============

    //定位和尺寸
    this.positionSize = function () {
        var winH = $(window).height();
        var buttonAreaH = 0;//按钮区高度
        if (this.option.buttonObj) {
            buttonAreaH = this.popup_button.outerHeight();
        }
        var contentAreaMaxH = winH - buttonAreaH - this.popup_minMarginTB * 2 - 10 * 2;//内容区最大高度
        this.popup_content.css("max-height", contentAreaMaxH);//内容区最大高度
        
        var popupTop = (winH - this.popup.outerHeight())/2;//弹窗top值
        this.popup.css("top", popupTop);
        if(!this.option.winScroll ){//如果设置了浏览器不可滚动  
			$("body").height(winH);//给body加高度
        }
    };

	//浏览器不可滚动
	this.winNoScroll = function () {
//		$(window).scroll(function(e){
//			//e.preventDefault();
//			$(window).scrollTop(self.winScrollTop);
//		});
		
		var top=$(window).scrollTop();
		if(!($("#mCommon_framePopup_bodyWrapInner").length)){//如果没有body子层div 就先加入
			$("body").wrapInner(this.bodyWrapInner);//body里面套一层
		}
		$("#mCommon_framePopup_bodyWrapInner").css("margin-top",-top);//body内层加margin-top
	   $("body").css({overflow:"hidden"});	
	   $(window).scrollTop(0);
	   
	};
	//浏览器可滚动
	this.winScroll  = function () {
		var bodyWrapInner=$("body > #mCommon_framePopup_bodyWrapInner");//body里的包裹层
		var top=bodyWrapInner.css("margin-top");
		top=top.replace(/[^0-9]/ig,""); //去掉px取数字
		bodyWrapInner.children().unwrap();//去掉body内的包裹层
		this.bodyWrapInner.css("margin-top",0);//body内层margin-top恢复正常
		$("body").css({overflow:"auto",height:"auto"}); //body 恢复正常
		$(window).scrollTop(top);//window向上滚动
	};

    //初始化
    this.initPopup = function () {
    	
        this.option.contentObj.appendTo(this.popup_content);//内容写入内容区
        if(!this.option.modal){//非模态弹框
        	this.black.remove();
        }
        if (this.option.buttonObj == null ) {//按钮为对象为空
            this.popup_button.remove();//删除按钮区
        } else {//非（按钮为对象为空 或 非模态弹框）
            this.option.buttonObj.appendTo(this.popup_button);//按钮写入按钮区
        }

        this.showFrame.hide();//浮层先隐藏
        this.showFrame.appendTo(this.option.appendObj);//浮层黑层写入页面
        
        //挂事件
		mCommonTapClass(this.showFrame);//整个弹窗挂tapClass事件
		mCommon20150221_note2NumInput(this.showFrame);//浮出层处理note2数字输入问题
		
		this.win.tap(function(){//弹窗点击事件	
			self.tapWin = true;//是否点击弹窗为true
		});
		
		
		if(this.option.spaceClose){//如果点击空白关闭设为 true		
			this.showFrame.tap(function(){//黑层挂事件
				if(!self.tapWin){//如果没有点击弹窗				
					self.hidePopup();//关闭弹窗
				}
			    self.tapWin = false;//是否点击弹窗复原
			});
		}
    };

    
    //显示弹窗
    this.showPopup = function () {
    	
    	this.winScrollTop=$(window).scrollTop();//scrollTop幅值
    	
    	if(!this.option.winScroll){//如果设置了浏览器不可滚动
       	 	this.winNoScroll();//禁止滚动
        }
    	
        if (this.option.modal) {//模态显示  	
            this.showFrame.show(0,function(){
            	self.option.showCallback(self);//显示的回调函数参数是整个框架
            });
        } else {//非模态显示方法
            this.showFrame.show(500,function(){//动画显示浮层
            	self.option.showCallback(self);//显示的回调函数参数是整个框架       
            	
	         	self.setTimeoutId = setTimeout(function () {//延时后关闭浮层
	                self.showFrame.hide(300,function(){ 	
	                	self.option.hideCallback(self);//参数是整个框架
	                });//浮层黑层隐藏
				    if(!self.option.winScroll){//如果设置了浏览器不可滚动
			       	 	self.winScroll();//恢复滚动
			        }
	                $(window).unbind("resize.mCommon_framePopup");//解绑resize
	                self.setTimeoutId = null;
	            }, self.option.showTime);
	         });
            
        }

        this.positionSize();//控制尺寸和位置
        $(window).bind("resize.mCommon_framePopup", function () {//绑定resize
            self.positionSize();//控制尺寸和位置
        });

    };


    //隐藏弹窗
    this.hidePopup = function () {
    	
    	if(!this.option.winScroll){//如果设置了浏览器不可滚动
       	 	this.winScroll();//恢复滚动
        }
        $(window).unbind("resize.mCommon_framePopup");//解绑resize
        this.showFrame.hide(0,function(){//浮层黑层隐藏
        	self.option.hideCallback(self);//关闭的回调函数 参数是整个框架
        });

        this.showFrame.stop();//清除动画
        if (this.setTimeoutId) {//如果有延时程序
            clearTimeout(this.setTimeoutId);//清除setTimeout
            this.setTimeoutId = null;
        }
       
    };

    //执行============
    this.initPopup();//初始化

}