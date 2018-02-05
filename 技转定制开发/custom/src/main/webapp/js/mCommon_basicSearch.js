/*搜索
 * 搜索的操作按钮：清空、取消（清空并且失去焦点）
 * 输入回调时机：focus,keydown(当keycode是‘搜索/enter’时),changeValue,clearValue.
 * 点击按钮回调：cancelBtnFun取消按钮回调
 * input内输入文字时，清空图标显示。点击清空图标，清空输入框的value值
 */
function mCommon_basicSearch(opt) {
	    this.setting = {
			boxObj:null,//搜索的外层div，类型是jq对象
			tapBoxFun:function(inputObj){//点击输入框的回调函数，参数是input jq对象
				//alert(inputObj.val());
			},
			changeValueFun:function(inputObj,val){//填写的值发生变化时的回调函数，参数是input jq对象、input的value值
				//alert(val);
			},
			searchKeyDownFun:function(val){ //当按下的键为‘搜索’时，回调，参数是input的value值
				//alert(val)
			},
			clearValueFun:function(val){//清空input的value时，回调，参数 input的value值
				//alert(val)
			},
			cancelBtnFun:function(basicSearchInputObj){//点击右侧的取消按钮时，回调。取消：清空输入框，失去焦点
			}
			
    };
    opt = opt || {};
    $.extend(true, this.setting,opt);
    var self=this;
	
    //定义变量===========
    this.box=this.setting.boxObj;//输入框外层盒子
	this.inputObj = this.setting.boxObj.find("input");  //输入框
	this.clearObj = this.setting.boxObj.find(".mCommon_basicSearchClear");  //右侧图标
	this.searchBtn = this.setting.boxObj.find(".mCommon_basicSearchBtn"); //右侧按钮区
	
	
	
	//定义方法===========
	//input清空
	this.inputValueNull = function(){
		self.clearObj.hide();
		self.inputObj.val(""); 
	};
	
	//失去焦点
	this.inputBlur = function(){
		this.inputObj.blur();
	};
	
	//清除图标出现
	this.clearObjShow = function(){
		this.clearObj.show();
	};
	
	//回填数据
	this.writeData = function(text){
		self.inputObj.val(text);
		self.clearObj.show();
	};
	
	//初始化
	this.initSearch = function(){
		if(this.inputObj.val()!=""){
			this.clearObjShow();
		}
	};

	//事件===============

	//inputObj
	this.inputObj.focus(function(){
		self.setting.tapBoxFun(self.inputObj); //点击输入框的回调,参数是input obj
	});
	this.inputObj.keydown(function(event) {
		if(event.keyCode == 13) {
			self.inputBlur();//iphone下搜狗输入法不收回键盘
	    	self.setting.searchKeyDownFun(self.inputObj.val()); //当按下的键为‘搜索’时，回调，参数是input的value值
		}
	});
	this.inputObj.bind('input propertychange',function() { //输入框内的文字改变
		if(self.inputObj.val()==""){ //当输入的文字删除后，隐藏 清除图标
			self.clearObj.hide();
		}else{
			self.clearObjShow();
		}
		self.setting.changeValueFun(self.inputObj, self.inputObj.val()); //填写的值变化时 回调,参数是input obj 和输入的值
	});
	
	
	//clear button
	this.clearObj.tap(function() {
		self.inputValueNull();
		self.inputObj.focus();
		self.setting.clearValueFun(self.inputObj.val()); //清空input的value时，回调
	});
	
	this.searchBtn.tap(function() {
		self.setting.cancelBtnFun(self.inputObj); //点击取消按钮时回调，回调
	});
	
	
	//执行============
	this.initSearch();
	
}

