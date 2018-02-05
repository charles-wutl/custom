function mCommon_basicMesPopup2(options){
	this.setting = {
		appendObj:'',
		dataArray: [],
		tapFun: function(id){
			
		}
	}
	options = options || {}
	$.extend(true,this.setting,options);
	var self = this;
    //創建一條dom
	this.creatItem = function(dataObj){
        var newdom = $('<div class="mCommon_basicMesPopup2_content"><div class="mCommon_basicMesPopup2_content_text">'+dataObj.text+'</div>'+
				 	    '<div class="mCommon_basicMesPopup2_content_button"  id="'+dataObj.id+'">'+
				 	   		'<a class="mCommon_basicBtn mCommon_basicBtn_blueBorder mCommon_basicMesPopup2_btn" tapclass="mCommon_basicBtn_blue_tap">'+
				 	   			'<i>'+dataObj.btn+'</i>'+
				 	   		'</a>'+
				 	   	'</div></div>');
       
		return newdom;
	};
	//將插入的dom寫入頁面
	this.appendDom = function(dataArray){
		var dom = $('<div class="mCommon_basicMesPopup2_box"><div class="mCommon_basicMesPopup2_wrapper"><div class="mCommon_basicMesPopup2"></div></div></div>');
		for(var i=0;i<dataArray.length;i++){
            dom.find('.mCommon_basicMesPopup2').append(this.creatItem(dataArray[i]));
            $('body').append(dom);
        }
        $('.mCommon_basicMesPopup2_content').find('.mCommon_basicMesPopup2_content_button').tap(function(){//当前项点击
			var id = $(this).attr("id");//当前id
			try{
				self.setting.tapFun(id); //点击的回调
			}catch(e){

			}	//关闭浮层
		});
        
	};
	this.itemSize = function(){
		var screenHeight = $(window).height(); //window的高
		var marginTop = (screenHeight-342)/2; //垂直居中
		$('body').find('.mCommon_basicMesPopup2_wrapper').css("margin-top",marginTop);//垂直居中		
	};
	//初始化
	this.init = function(){
		this.appendDom(this.setting.dataArray);
		this.itemSize(); //尺寸
		$(window).bind("resize.mCommon_basicMessageEnter",function(){
			self.itemSize(); //尺寸
		})	
	};
	this.init();
}