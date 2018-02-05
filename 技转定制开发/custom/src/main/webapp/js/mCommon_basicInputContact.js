function mCommon_basicInputContact(opt) {
	this.setting = {
		boxObj:null,//input的外层div，类型是jq对象
		placeholderText:"選擇聯絡人",//设置placeholder文字，
		defaultVal:null,//输入框默认值，
		tapInputFun:function(inputObj){//点击输入框，的回调函数，参数是input jq对象
			//alert(inputObj.html());
		}
	};
    opt = opt || {};
    $.extend(true, this.setting,opt);
    var self=this;
    //定义变量===========
    this.box=this.setting.boxObj;//输入框外层盒子
	this.inputObj = this.setting.boxObj.find("input");  //输入框
	//定义方法===========
	//初始化方法
	this.ipnutInit=function(){
		this.inputObj.attr("placeholder",this.setting.placeholderText);//写入placeholder
		this.valWrite(this.setting.defaultVal);//写入默认的value值
	};
	//数据回写
	this.valWrite=function(text){//参数是字符串
		//this.inputObj.val(text);//写入value值
		this.inputObj.prop("value", text);//写入数据
	};
	//判断输入框是否有值 ,返回true/false
	this.isValue=function(){
		var hasValue=false;//是否有值
		var value_=this.inputObj.prop("value");//取input的value值
		if(value_){//如果input不为空
			hasValue=true;//是否有值
		}
		return hasValue;
	};
	//挂事件==============
	this.inputObj.focus(function(){//输入框不可输入
		$(this).blur();
	});
	$.each([this.box], function(index,  obj) {//两个对象挂同一个事件
		$(obj).tap(function(){//输入框和定位图标点击事件
			try{
				self.setting.tapBoxFun(self.box);//执行回掉函数，参数是input jq对象
				//self.valWrite("0000")
			}catch(e){}
		});
	});
	//执行
	this.ipnutInit();//初始化方法
}


