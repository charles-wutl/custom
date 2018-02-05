/*搜索
 * 搜索的操作按钮：清空、取消（清空并且失去焦点）
 * 输入回调时机：focus,keydown(当keycode是‘搜索/enter’时),changeValue,clearValue.
 * 默认无搜索按钮，输入框聚焦时，显示“搜索”按钮，当点击搜索按钮或点击键盘搜索时，“搜索”按钮隐藏
 * 点击取消按钮回调：cancelBtnFun取消按钮回调
 * 取消按钮的显示和隐藏方法：cancelBtnShow，cancelBtnHide
 * 点击搜索按钮回调：searchBtnFun搜索按钮回调
 * 搜索按钮的显示和隐藏方法：searchBtnShow，searchBtnHide
 * input内输入文字时，清空图标显示。点击清空图标，清空输入框的value值
 */
function mCommon_basicSearch151124(opt) {
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
			searchBtnFun:function(basicSearchInputObj){//点击右侧的搜索按钮时，回调，参数为输入框jq对象
				
			},
			cancelBtnFun:function(basicSearchInputObj){//点击左侧的取消按钮时，回调，参数为输入框jq对象
				
			}
			
    };
    opt = opt || {};
    $.extend(true, this.setting,opt);
    var self=this;
	
    //定义变量===========
    this.box=this.setting.boxObj;//输入框外层盒子
	this.inputObj = this.setting.boxObj.find("input");  //输入框
	this.clearObj = this.setting.boxObj.find(".mCommon_basicSearch151124_clear");  //右侧图标
	this.searchBtn = this.setting.boxObj.find(".mCommon_basicSearch151124_btnSearch"); //搜索按钮
	this.cancelBtn = this.setting.boxObj.find(".mCommon_basicSearch151124_btnCancel"); //取消按钮
	
	
	
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
	this.inputObj.bind('focus',function(){
		if(self.searchBtn.css("display")=="none"){
			self.searchBtnShow();//搜索按钮显示
		}
	
		self.setting.tapBoxFun(self.inputObj); //点击输入框的回调,参数是input obj
	});
	
	this.inputObj.bind('keydown',function(event) {
		if(event.keyCode == 13) {
			self.searchBtnHide();//搜索按钮隐藏
	    	self.setting.searchKeyDownFun(self.inputObj.val()); //当按下的键为‘搜索’时，回调，参数是input的value值
	    	self.inputBlur();//失去焦点，键盘收起
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
	this.clearObj.bind('tap',function() {
		self.inputValueNull();
		self.inputObj.focus();
		self.setting.clearValueFun(self.inputObj.val()); //清空input的value时，回调
	});
	
	//搜索按钮显示
	this.searchBtnShow = function() {
		this.box.addClass("mCommon_basicSearch151124_withBtnSearch");
	};
	//搜索按钮隐藏
	this.searchBtnHide = function() {
		this.box.removeClass("mCommon_basicSearch151124_withBtnSearch");
	};
	//点击搜索按钮
	this.searchBtn.bind('tap',function() {
		self.searchBtnHide();//搜索按钮隐藏
		self.setting.searchBtnFun(self.inputObj); //点击搜索按钮时回调，回调，参数为输入框jq对象
	});
	
	//取消按钮显示
	this.cancelBtnShow = function() {
		this.box.addClass("mCommon_basicSearch151124_withBtnCancel");
	};
	//取消按钮隐藏
	this.cancelBtnHide = function() {
		this.box.removeClass("mCommon_basicSearch151124_withBtnCancel");
	};
	//点击取消按钮
	this.cancelBtn.bind('tap',function() {
		self.setting.cancelBtnFun(self.inputObj); //点击取消按钮时回调，回调，参数为输入框jq对象
	});
	
	
	//执行============
	this.initSearch();
	
}

