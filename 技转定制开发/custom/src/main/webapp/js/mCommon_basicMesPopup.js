
function mCommon_basicMessageEnter(options){
	this.setting = {
		dataArray: [],
		tapFun: function(id){
			
		}
	}
	options = options || {}
	$.extend(true,this.setting,options);
	var self = this;
	
	//定义变量
	this.colorArr = ['#2db95f','#55a6ed','#f5b758'];
	var swiperBoxHtml = '<div class="mCommon_basicMessageEnter_box"><div class="mCommon_basicMessageEnter"><div class="swiper-container mCommon_basicMessageEnter_container"><div class="swiper-wrapper mCommon_basicMessageEnter_wrapper"></div></div></div></div>';//轮播图盒子	
	this.perPage = 9; //每页放几个
	this.swiperBox;
	
	//定义方法
	/*通过id找数据对象*/
	this.findDataObjById = function(id){//参数是id,返回jq
		for(var i=0;i<this.setting.dataArray.length;i++){
			if(this.setting.dataArray[i].id==id){
				return this.setting.dataArray[i];
			}
		}
	};
	/*通过id找jq对象*/
	this.findJqObjById = function(id){//参数是id,返回jq
		return this.swiperBox.find("#"+id);
	};
	/*create dom*/
	this.createDome = function(){
		var pointBox = $('<div class="pagination"></div>'); //分屏小圆豆	    
		var slideNumber = Math.ceil((this.setting.dataArray.length)/this.perPage); //分几屏
		for(var i=0;i<slideNumber;i++){
			var slideHtml = $('<div class="swiper-slide mCommon_basicMessageEnter_slide clearfix"></div>');	//每一屏slide	
			for(var j=i*this.perPage;j<(i+1)*this.perPage && j<this.setting.dataArray.length;j++){
				var itemHtml = $('<span class="mCommon_basicMessageEnter_item" id="'+ this.setting.dataArray[j].id+'"><div class="mCommon_basicMessageEnter_item_icon" style="background: #15bae3;"><em class="'+this.setting.dataArray[j].icon+'"></em></div><div class="mCommon_basicMessageEnter_item_text textCut">'+this.setting.dataArray[j].name+'</div></span>');//每一个item
				var colorIndex = j%8;
				itemHtml.find(".mCommon_basicMessageEnter_item_icon").css('background-color',this.colorArr[colorIndex]);
				itemHtml.tap(function(){//当前项点击
					var id = $(this).attr("id");//当前id
					try{
						self.setting.tapFun(id); //点击的回调
					}catch(e){}	
					self.close(); //关闭浮层
				});
				slideHtml.append(itemHtml); //将每一项放入slide
			}
			this.swiperBox.find(".mCommon_basicMessageEnter_wrapper").append(slideHtml);//将slide放入wrapper容器
		}
		if(this.setting.dataArray.length>1){//当数组长度大于1时
			this.swiperBox.find(".mCommon_basicMessageEnter_container").append(pointBox);//将分屏小圆点插入
		}
	};
	/*init swiper*/
	this.initSwiper = function(){
		var swiperContainer = this.swiperBox.find(".mCommon_basicMessageEnter_container")[0]; //swiperContainer : 必选，HTML元素或者string类型
		var pagination = this.swiperBox.find(".pagination")[0];
		var mySwiper = new Swiper(swiperContainer, {
			pagination : pagination,
		})
	};
	/*resize*/
	this.itemSize = function(){
		var slideWidth = this.swiperBox.find(".mCommon_basicMessageEnter_container").width()-20; //slide的宽
		console.log(slideWidth);
		var itemWidth = slideWidth/3; //每一项的宽
		var lastItemWidth = slideWidth-itemWidth*2; //第三列的宽
		var screenHeight = $(window).height(); //window的高
		//var marginTop = (screenHeight-342)/2; //垂直居中
		this.swiperBox.find(".mCommon_basicMessageEnter_item").css("width",itemWidth);//每一项的宽
		this.swiperBox.find(".mCommon_basicMessageEnter_item:nth-child(3n)").css("width",lastItemWidth);//第三列的宽
		this.swiperBox.find(".mCommon_basicMessageEnter_container").css("margin-top","162.5px");//垂直居中
	};
	/*init*/
	this.init = function(){
		this.swiperBox=$(swiperBoxHtml).clone();
		this.createDome(); //组装dom
		$("body").append(this.swiperBox); //将浮层加入页面
		this.itemSize(); //尺寸
		this.initSwiper(); //初始化swiper
		$(window).bind("resize.mCommon_basicMessageEnter",function(){
			self.itemSize(); //尺寸
		})		
	};
	/*open*/
	this.open = function(){
		this.init();
	};
	/*close*/
	this.close = function(){
		this.swiperBox.remove();
	};
	
	//执行
	this.init();
}
