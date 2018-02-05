/*浮出层
 * 浮出层结构：上中下3个区域，上下可有无
 * 浮出层位置：上或下
 * 动画：有：滑出，无：显示隐藏
 * 回调：浮出层显示前，浮出层显示后，关闭浮出层
 * 最大层高：页面传进的高度，是最大高度，默认是window.height,如果传进的高度>window.height,则层高=window.height*0.8
 * 点击空白是否关闭浮出层
 * 页面无需浮层结构
 * 参考容器，用于pc端浮出层左右定位 和 浮出层宽度.如果没有参考容器，默认浮层的宽度为window.width，左侧值left=0
 */

function mCommon_jsOverlay(setting) {
    this.option = {
        appendObj: $("body"),//jq对象，浮出层和黑层显写入的容器
        referenceObj:null,//参考容器，jq对象，默认无，用于浮出层左右定位 和 浮出层宽度，比如pc左右浮出时要以最大640宽度那层为基准
        contentObj: $("<div>信息内容</div>"),//内容区显示的对象
        headerObj: null,//jq对象，头部显示的对象
        footerObj: null,//jq对象，底部显示的对象
        spaceClose: false,//点击空白关闭弹层，默认为false
        showBeforeCallback:function(self){},//显示浮层前的回调 参数是this 
        showAfterCallback:function(self){},//显示浮层后的回调 参数是this 
        hideCallback:function(self){},//隐藏浮层后的回调  参数是this
        overlayPosition:"bottom",//默认是底部，可选位置top,bottom
        overlayH:null, //最大层高，默认是window.height
        animation:true //默认是滑出动画,无：显示隐藏
    };
    setting = setting || {};
    $.extend(true, this.option, setting);
    var self=this;

    //定义变量===========
    var overlayRealH; //实际层高

    //浮出层框架
    this.showFrame =$('<div class="mCommon_jsOverlay"><div class="mCommon_jsOverlay_mask"></div><div class="mCommon_jsOverlay_inner"><div class="mCommon_jsOverlay_header"></div><div class="mCommon_jsOverlay_content"></div><div class="mCommon_jsOverlay_footer"></div></div></div>');
    //黑层部分
    this.black = this.showFrame.find(".mCommon_jsOverlay_mask");
    //浮出层部分
    this.overLay = this.showFrame.find(".mCommon_jsOverlay_inner");
    //头部
    this.overLay_header = this.overLay.find(".mCommon_jsOverlay_header");
    //内容区，可滚动区域
    this.overLay_content = this.overLay.find(".mCommon_jsOverlay_content");
    //底部按钮区
    this.overLay_footer = this.overLay.find(".mCommon_jsOverlay_footer");
    
    //body的内部包裹层，用于浮层显示时 禁止浏览器滚动
    this.bodyWrapInner=$("<div id='mCommon_jsOverlay_bodyWrapper'></div>");
    
     //是否点击了浮层
    this.tapOverlay = false;


    //定义方法===============

    //浮出层尺寸
    this.overlaySize = function () {
        var winH = $(window).height();
        var winW = $(window).width();
        var overlayH;//浮层高度
        var headerH = 0;//头部高度
        var footerH = 0;//底部高度
        var overlayW;//浮出层宽度
        if(this.option.overlayH && this.option.overlayH<(winH*0.8)){
        	overlayH = this.option.overlayH;
        }else{
        	overlayH = winH*0.8;
        }
        if (this.option.headerObj) {
            headerH = this.overLay_header.outerHeight();
        }else{
        	headerH = 0
        }
        if (this.option.footerObj) {
            footerH = this.overLay_footer.outerHeight();
        }else{
        	footerH = 0
        }
        /*浮层宽度*/
        if(this.option.referenceObj){
        	overlayW = this.option.referenceObj.outerWidth();	
        }else{
        	overlayW = winW
        }
        /*浮层宽度end*/
       
        var contentAreaMaxH = overlayH - headerH - footerH;//内容区最大高度
        this.overLay_content.css({"max-height":contentAreaMaxH});//内容区最大高度
        overlayRealH = headerH + footerH + this.overLay_content.height();
        this.showFrame.css({"width":overlayW});//去掉高度，pc上浮层显示不完全
		
		$("body").height(winH);//浏览器不可滚动  给body加高度
    };
    
    
    //浮出层相对定位
    this.overlayPositionReference = function(){
    	/*浮层左侧定位*/
    	if(this.option.referenceObj){
    		this.showFrame.css({left:this.option.referenceObj.offset().left});
    	}else{
    		this.showFrame.css({left:"0"});
    	}
    	/*浮层左侧定位end*/
    }
    
    //浮出层初始位置
    this.overlayPosition=function(){
    	/*上*/
    	if(this.option.overlayPosition=="top"){
    		if(self.option.animation==true){
    			this.showFrame.css({top:-overlayRealH});
    		}else{
    			this.showFrame.css({top:"0"});
    		}
    	}
    	/*下*/
		if(this.option.overlayPosition=="bottom"){
    		if(self.option.animation==true){
    			this.showFrame.css({'bottom':-overlayRealH});
//  			this.showFrame.css({'bottom':'0'});
    		}else{
    			this.showFrame.css({'bottom':'0'});
    		}
    	}
    	
    }
    
    //浮出层动画-显示
    this.overlayAnimationShow=function(){
    	/*上*/
    	if(this.option.overlayPosition=="top"){
			this.showFrame.css("display","block").animate({top:"0"},500);
    	}
    	/*下*/
    	if(this.option.overlayPosition=="bottom"){
			this.showFrame.css("display","block").animate({bottom:"0"},500);
//			this.showFrame.css({"display":"block"});
//			this.showFrame.removeClass("hideAnimationBToT").addClass("showAnimationBToT");
    	}
    }
    //浮出层动画-隐藏
    this.overlayAnimationHide=function(){
    	/*上*/
    	if(this.option.overlayPosition=="top"){
			this.showFrame.animate({top:-overlayRealH},500,function(){this.showFrame.css("display","none")});			
    	}
    	/*下*/
    	if(this.option.overlayPosition=="bottom"){
			this.showFrame.animate({bottom:-overlayRealH},500,function(){self.showFrame.css("display","none")});
//			this.showFrame.removeClass("showAnimationBToT").addClass("hideAnimationBToT");
//			setTimeout(function(){
//				self.showFrame.css({"display":"none"});
//				self.showFrame.removeClass("hideAnimationBToT");
//			},500);
   		}
    }
    

    
	//浏览器不可滚动
	this.winNoScroll = function () {		
		var top=$(window).scrollTop();
		if(!($("#mCommon_jsOverlay_bodyWrapper").length)){//如果没有body子层div 就先加入
			$("body").wrapInner(this.bodyWrapInner);//body里面套一层
		}
		$("#mCommon_jsOverlay_bodyWrapper").css("margin-top",-top);//body内层加margin-top
		this.showFrame.appendTo("body");
		$("body").css({overflow:"hidden"});	
		$(window).scrollTop(0);
    
	};
	//浏览器可滚动
	this.winScroll  = function () {
		if($("#mCommon_jsOverlay_bodyWrapper").length!=0){
			var bodyWrapInner=$("body > #mCommon_jsOverlay_bodyWrapper");//body里的包裹层
			var top=bodyWrapInner.css("margin-top");
			top=top.replace(/[^0-9]/ig,""); //去掉px取数字
			bodyWrapInner.children().unwrap();//去掉body内的包裹层
			this.bodyWrapInner.css("margin-top",0);//body内层margin-top恢复正常
			$("body").css({overflow:"auto",height:"auto"}); //body 恢复正常
			$(window).scrollTop(top);//window向上滚动,防止页面滚动条滚动到最顶部
		}else{
			return;
		}

	};

    //初始化
    this.initOverlay = function () {
        this.option.contentObj.appendTo(this.overLay_content);//内容写入内容区
        if (this.option.headerObj == null ) {//头部对象为空
            this.overLay_header.remove();//删除头部区
        } else {//非（头部对象为空）
            this.option.headerObj.appendTo(this.overLay_header);//头部对象写入头部区
        }
        if (this.option.footerObj == null ) {//底部对象为空
            this.overLay_footer.remove();//删除底部区
        } else {//非（底部对象为空）
            this.option.footerObj.appendTo(this.overLay_footer);//底部部对象写入底部区
        }
		
       	this.showFrame.css("display","none");
        this.showFrame.appendTo(this.option.appendObj);//浮层黑层写入页面
        
        this.overlayPosition(); //浮层居顶部或底部
        
        //挂事件
		mCommonTapClass(this.showFrame);//整个浮层挂tapClass事件
		
		this.overLay.tap(function(){//浮层点击事件	
			self.tapOverlay = true;//点击浮层为true
		});
		
		if(this.option.spaceClose){//如果点击空白关闭设为 true		
			this.showFrame.tap(function(){//浮层挂事件
				if(!self.tapOverlay){//如果没有点击浮层	
					self.hideOverlay();//关闭浮层
				}
			    self.tapOverlay = false;//是否点击浮层复原
			});
		}
    };
  
    //显示浮层
    this.showOverlay = function () {
     	       	    	
    	self.option.showBeforeCallback(self);//浮层显示前的回调
    	
    	this.black.fadeIn(400,function(){
    		$(this).css("display","block");
    	});//黑层显示
    	
    	this.winNoScroll();//禁止浏览器滚动
    	
    	if(this.option.animation==true){
    		this.overlayAnimationShow();//层显示动画
    	}else{
    		this.showFrame.show();
    	}
    	
		setTimeout(function(){
			self.option.showAfterCallback(self) //浮层显示后的回调，函数参数是整个框架,时间为动画执行的时间
		},500);
        
        this.overlaySize();//浮层尺寸
        this.overlayPositionReference();//浮层相对位置
        $(window).bind("resize", function () {//绑定resize
            self.overlaySize();//浮层尺寸
            self.overlayPositionReference();//浮层相对位置
        });

    };

    //隐藏浮层
    this.hideOverlay = function () {
    	
        $(window).unbind("resize");//解绑resize
     
        if(this.option.animation==true){
    		this.overlayAnimationHide();//层关闭动画
    		this.black.fadeOut(500,function(){
	        	$(this).css("display","none");
	        });
			setTimeout(function(){
				self.option.hideCallback(self); //浮层关闭的回调函数 参数是整个框架,时间为动画执行的时间
				self.winScroll();//恢复滚动
			},500);
    	}else{
    		this.showFrame.hide();
    		this.black.css("display","none");
    		self.option.hideCallback(self); 
    	}
        
        
       
    };

    this.initOverlay();//初始化

}