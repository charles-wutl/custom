function mCommon_basicTab04(options){
	this.setting = {
		appendObj:'',
		selectedIndex:1,   //默认当前选中状态组，从0开始
		perTabNum:4,
		dataArray: [],
		isshowshadow:true,
		tapFun: function(jqObj){
			
		}
	}
	options = options || {}
	$.extend(true,this.setting,options);
	var self = this;
	
	//定义变量
	this.swiperBoxHtml = $('<div class="mCommon_basicTab04_box">'+
							'<div class="mCommon_basicTab04">'+
								'<div class="swiper-container mCommon_basicTab04_container">'+
									'<div class="swiper-wrapper mCommon_basicTab04_wrapper">'+
									'</div>'+
								'</div>'+
							'</div>'+
						'</div>');//轮播图盒子	
	this.perPage = 4; //每页放几个
	this.activeFun = function(id){
		//console.log(id);
        var jqObj = self.swiperBoxHtml.find('#'+id);
        jqObj.find('.mCommon_basicTab04_item_text').addClass('mCommon_basicTabMenu_active04');//.siblings().removeClass('mCommon_basicTabMenu_active04');
        jqObj.parent('.mCommon_basicTab04_slide').siblings().find('.mCommon_basicTab04_item_text').removeClass('mCommon_basicTabMenu_active04');
	};
	this.createDom = function(){
		var shadowDom = $('<p class="mCommon_basicTab04_img"></p><p class="mCommon_basicTab04_left_img"></p>');
		if(this.setting.isshowshadow){
			this.swiperBoxHtml.children(".mCommon_basicTab04").append(shadowDom);
		}    
		var slideNumber = Math.ceil((this.setting.dataArray.length)/this.perPage); //分几屏
		for(var i=0;i<slideNumber;i++){
			for(var j=i*this.perPage;j<(i+1)*this.perPage && j<this.setting.dataArray.length;j++){
				var slideHtml = $('<div class="swiper-slide mCommon_basicTab04_slide clearfix"></div>');	//每一屏slide	
				var itemHtml = $('<span class="mCommon_basicTab04_item" id="'+ this.setting.dataArray[j].id+'"><div class="mCommon_basicTab04_item_text textCut">'+this.setting.dataArray[j].name+'</div></span>');//每一个item
				itemHtml.tap(function(){//当前项点击
					var id = $(this).attr("id");//当前id
					var jqObj = self.swiperBoxHtml.find('#'+id)
					self.activeFun(id);
					try{
						self.setting.tapFun(jqObj); //点击的回调
					}catch(e){}	
					//self.close(); //关闭浮层
				});
				slideHtml.append(itemHtml); //将每一项放入slide
				this.swiperBoxHtml.find(".mCommon_basicTab04_wrapper").append(slideHtml);//将slide放入wrapper容器
			}
			
		}
	
	};
	this.initSwiper = function(){
		self.swiperBoxHtml.find(".swiper-slide").css('height', '45px');
		self.swiperBoxHtml.find(".swiper-wrapper").css('height','45px');
		var swiper = new Swiper('.swiper-container', {
	        slidesPerView: self.setting.perTabNum,
	        paginationClickable: true,
	        spaceBetween: 30,
	        onSetWrapperTransform:function(swiper,transform){
				//console.log(transform.x)
				if(transform.x >= 0){
					 $('.mCommon_basicTab04_left_img').css('background',"white");
				}else{
					$('.mCommon_basicTab04_left_img').css('background',"url(../../../../../modulev1/portalHtml5/images/mCommon_basicTab02_left.png) white no-repeat top").css("background-size","8px").css("background-position","left 10px");
				}
			}
	    });
	    
        this.swiperBoxHtml.find(".swiper-slide").css('height', '48px');
		this.swiperBoxHtml.find(".swiper-wrapper").css('height','48px');
	};
	/*resize*/
	this.itemSize = function(){
		var slideWidth =  this.swiperBoxHtml.find('.mCommon_basicTab04_slide').width(); //slide的宽
		var spanWidth = parseInt(this.swiperBoxHtml.find('.mCommon_basicTab04_item').css("padding-left"))*2;
		console.log(spanWidth);
		this.swiperBoxHtml.find('.mCommon_basicTab04_item_text').css('max-width',slideWidth-spanWidth);
		//console.log(slideWidth);
		
		var screenHeight = $(window).height(); //window的高
		var marginTop = (screenHeight-342)/2; //垂直居中
		//this.swiperBox.find(".mCommon_basicTab04_wrapper").css('height',"45px");
		//this.swiperBoxHtml.find(".mCommon_basicTab04_item").css("width",itemWidth);//每一项的宽
		//this.swiperBoxHtml.find(".mCommon_basicTab04_item:nth-child(3n)").css("width",lastItemWidth);//第三列的宽
		//this.swiperBox.find(".mCommon_basicTab04_container").css("margin-top",marginTop);//垂直居中		
	};
	this.init = function (){
		this.createDom();
		this.setting.appendObj.append(this.swiperBoxHtml); //将浮层加入页面
		this.initSwiper(); //初始化swiper
		this.itemSize(); //尺寸
		this.activeFun(this.setting.selectedIndex);
		$(window).bind("resize.mCommon_basicTab04",function(){
			self.itemSize(); //尺寸
		})
	};
	this.init();
}
