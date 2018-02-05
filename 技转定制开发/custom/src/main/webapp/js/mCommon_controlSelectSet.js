/*选项集合
数组中的数据
 {
	 title:"标题1",
	 maxShowNum:null,//最多显示个数，默认全部显示
	 maxChoice:null,//最多选择数量，数值，默认为选项数量，就是多选，null也是多选；单选是1，
	 optinsArray:[//选线的数据数组
		 {name:"选项1",id:"001",state:"selected"},
		 {name:"选项2",id:"002",state:"disabled"},
		 {name:"选项3",id:"003",state:"normal"},
		 {name:"选项4",id:"004"}
		 ]
 }
 状态：选填，默认是"normal", 可能的值"selected"/"disabled"/"normal"
 state:"selected"/"disabled"/"normal"
*/


function mCommon_controlSelectSet(options){
	this.setting = {
		$appendBox: null,//写入的容器,必填
		dataArray:[],//数据数组，必填
		maxHeight:null,//最大高度；默认窗口高度的75%
		$header:null,//头部对象
		$footer:null,//尾部对象
		tapOptinFun:function(id){//点击的每个选项的回调，参数点击的id
		},
		enterFun: function(idArray) {//点击完成按钮的回调，参数选中的idArray
		},
		resetFun: function(idArray) {//点击重置按钮的回调，参数选中的idArray
		}
	};
	options = options || {};
	$.extend(true, this.setting, options);

	//this.setting.dataArray=options.dataArray;//数组赋值，以免被打断

	//console.log("extend")
	//console.log(this.setting.dataArray[0].optinsArray);
	//console.log(options.dataArray[0].optinsArray);
	//options.dataArray[0].optinsArray[0].name="1000000"
	//console.log(this.setting.dataArray[0].optinsArray);
	//console.log(options.dataArray[0].optinsArray);


	var self = this;

	//控件统一控制＝＝＝＝
	var instanceId;//控件的实例id
	if(!mCommonObj.mCommon_controlSelectSet){//查看是否有这种类型，没有
		mCommonObj.mCommon_controlSelectSet={};//造一个空类型
	}
	for(var i=0; true ;i++){
		instanceId="mCommon_controlSelectSet"+i;//生成id
		if(!mCommonObj.mCommon_controlSelectSet[instanceId]){//如果没有这个id
			break;//终止循环
		}
	}
	mCommonObj.mCommon_controlSelectSet[instanceId]=self;//生成这个类型 和 一个实例
	this.id=instanceId;//控件的id


	//定义变量＝＝＝＝
	var $box=$('<div class="mCommon_controlSelectSet_box">'+
			'<div class="mCommon_controlSelectSet">'+
			'<ul class="mCommon_controlSelectSet_list"><!--多个选项插入位置-->'+
			'</ul></div>'+
			'<ul class="mCommon_controlSelectSet_btnBox clearfixOverflow">'+
			'</ul>'+
			'</div>');
	var $btn=$('<li><a class="mCommon_basicBtnShop_white" tapclass="mCommon_basicBtnShop_white_tap"><i>重置</i></a></li>'+
		'<li><a class="mCommon_basicBtnShop_red" tapclass="mCommon_basicBtnShop_red_tap"><i>完成</i></a></li>');
	var itemDemo=$('<li class="mCommon_controlSelectSet_item">'+
			'<p class="mCommon_controlSelectSet_itemTitle clearfixOverflow">'+
			'<b class="mCommon_controlSelectSet_itemTitle_icon">'+
			'<em class="mCommon_controlSelectSet_itemTitle_iconMore">全部<img src='+ctxPath+'/images/mCommon_basicIcon_arrowDown1.png></em>'+
			'<em class="mCommon_controlSelectSet_itemTitle_iconUp" style="display: none">收起<img src="../../../../../modulev1/portalHtml5/images/mCommon_basicIcon_arrowUp1.png"></em>'+
			'</b>'+
			'<b class="mCommon_controlSelectSet_itemTitle_text textCut"><!--标题--></b>'+
			'</p>'+
			'<p class="mCommon_controlSelectSet_itemCon">'+
			'<!--插入选项-->'+
			'</p>'+
			'</li>');
	this.newDataArray=[];//缓存数组

	//方法定义＝＝＝＝
	//构造dom；返回构造好jq对象
	this.createDom=function(){
		var array=this.newDataArray;//数据数组
		var mCommon_basicSelectBtn_array=[];//选项实例数组
		$box.find(".mCommon_controlSelectSet_list").html("");//清空选项列表区域






		for(var i in array){
			var dataItem=array[i]; //数据中的一个提目
			var item=itemDemo.clone();//一组选项的dom
			var optionsBox=item.find(".mCommon_controlSelectSet_itemCon");//放入选项的盒子
			var titleBox=item.find(".mCommon_controlSelectSet_itemTitle_text");//标题盒子
			var iconBox=item.find(".mCommon_controlSelectSet_itemTitle_icon");//图标盒子
			var optionsDataArray=dataItem.optinsArray;//选项数组
			var setting= {//初始化选项按钮
				$appendBox: optionsBox,//写入的容器,必填
				dataArray: optionsDataArray,//选项的数组，必填
				maxChoice: dataItem.maxChoice,//最多选择数量，数值，默认为选项数量，就是多选，null也是多选；单选是1
				tapFun: function (id,that) {//点击事件，回调是点击的id

					try {
						self.setting.tapOptinFun(id);//执行回调
					} catch (e) {}
					var dataObj = that.findDataObjById(id);//找到id对应的数据对象
					var jqObj = that.findJqObjById(id);//找到id对应的jq对象

					//同时修改大数组的数据＝＝＝＝



					//对应修改属性
					//var state=dataObj.state;//取到小数组的属性
					//var bigDataObj_new=self.findDataObjById_btn(id);//新数组中的对应选项数据对象
					//bigDataObj_new.state=state;//修改属性

					//同时修改大数组的数据end＝＝＝＝＝

					//console.log("点击是获取")
					//console.log(self.setting.dataArray);
					//console.log(self.newDataArray)

					//that.setState(jqObj,"normal");//参数是jq对象,状态，state:"selected"/"disabled"/"normal"

				}
			};
			var selectBtn=new mCommon_basicSelectBtn(setting);//初始化选项按钮
			mCommon_basicSelectBtn_array.push(selectBtn);//选项实例写入数组

			titleBox.append(dataItem.title);//写入标题
			var $options=optionsBox.find(".mCommon_basicSelectBtn_list_item");//所有选项
			var optionsNum=$options.length;//选项总数
			if(dataItem.maxShowNum && dataItem.maxShowNum < optionsNum){//实际选项多于最大显示数
				item.attr("mCommon_controlSelectSet_maxOptions",dataItem.maxShowNum);//写入显示选项数量
				this.optionsHide(item);//隐藏超出的选项
				iconBox.tap(function(){//箭头挂点击事件
					self.arrowTap($(this));//执行点击方法
				});
			}else{
				iconBox.remove();//删除icon容器
			}

			$box.find(".mCommon_controlSelectSet_list").append(item);//一道题目写入选项容器
		}
		$box.find(".mCommon_controlSelectSet_btnBox").html($btn);//按钮写入容器
		//按钮事件
		var btnReset=$box.find(".mCommon_basicBtnShop_white");//重置按钮
		var btnEnter=$box.find(".mCommon_basicBtnShop_red");//完成按钮
		btnReset.tap(function(){//重置按钮点击
			for(var n in mCommon_basicSelectBtn_array){//轮询选项的实例数组
				mCommon_basicSelectBtn_array[n].setNormalAll();//重置按钮状态
			}


			for(var k in array){//轮询数组修改状态
				var array2=array[k].optinsArray;
				for(var o in array2){
					var item=array2[o];
					if(item.state=="selected"){
						item.state="normal"
					}
				}
			}

			var idArray=self.getSelectedOptins();//选中id数组
			try{
				self.setting.resetFun(idArray);//执行回调
			}catch(e){}
		});
		btnEnter.tap(function(){//完成按钮点击
			self.setting.dataArray=[];//setting数组
			mCommonExtend(self.setting.dataArray,self.newDataArray);//setting数组＝缓存拷贝
			//self.setting.dataArray=self.newDataArray;//setting数组＝缓存拷贝


			var idArray=self.getSelectedOptins();//选中id数组
			try{
				self.setting.enterFun(idArray);//执行回调
			}catch(e){}

			//console.log("大控件完成====");
			//console.log(self.setting.dataArray);


		});


		return $box;
	};

	//获取选中选项的ID;返回 ID 数组
	this.getSelectedOptins=function(){
		var idArray=[];//选中选项的ID数组
		var options=$box.find(".mCommon_basicSelectBtn_list_item");//所有选项
		options.each(function(){//轮询数组
			var item=$(this);//一个元素
			var id=item.attr("id");
			var state=item.attr("state");
			if(state=="selected"){//如果是选中
				idArray.push(id);
			}
		});
		return idArray;
	};

	//下箭头点击方法
	this.arrowTap=function($icon){//箭头区域
		var $item=$icon.parents(".mCommon_controlSelectSet_item");//一道题的对象
		var showAll=$icon.find(".mCommon_controlSelectSet_itemTitle_iconMore").css("display")=="none";//下箭头是否隐藏 判断当前选项是否全部显示
		if(showAll){//如果已经显示了全部,就隐藏多余的
			$icon.find(".mCommon_controlSelectSet_itemTitle_iconMore").show();//箭头改变方向
			$icon.find(".mCommon_controlSelectSet_itemTitle_iconUp").hide();//箭头改变方向
			this.optionsHide($item);//隐藏超出的选项
		}else{//如果没有显示全部,就显示全部
			$icon.find(".mCommon_controlSelectSet_itemTitle_iconUp").show();//箭头改变方向
			$icon.find(".mCommon_controlSelectSet_itemTitle_iconMore").hide();//箭头改变方向
			this.optionsShow($item);//显示超出的选项
		}

	};

	//隐藏超出的选项
	this.optionsHide=function($optionGroup){
		var maxOptions=$optionGroup.attr("mCommon_controlSelectSet_maxOptions");//选项最大数量
		var options=$optionGroup.find(".mCommon_basicSelectBtn_list_item");//全部选项
		var hideNum=options.length-maxOptions;//需要隐藏的个数
		var hideOptions=options.slice(-hideNum);//需要隐藏的 选项
		hideOptions.hide();
	};

	//显示超出的选项
	this.optionsShow=function($optionGroup){
		var maxOptions=$optionGroup.attr("mCommon_controlSelectSet_maxOptions");//选项最大数量
		var options=$optionGroup.find(".mCommon_basicSelectBtn_list_item");//全部选项
		var hideNum=options.length-maxOptions;//需要隐藏的个数
		var hideOptions=options.slice(-hideNum);//需要隐藏的 选项
		hideOptions.show();
	};

	//尺寸设置
	this.size=function(){

		var $boxIsShow=($box.css("display")=="block");//box是否显示

		if(!$boxIsShow){
			$box.css("visibility","hidden");//先显现
			$box.show();
		}


		var contentBox=$box.find(".mCommon_controlSelectSet");//内容区
		var $btn=$box.find(".mCommon_controlSelectSet_btnBox");//按钮区域
		var headerH=this.setting.$header ? this.setting.$header.height() : 0;
		var footerH=this.setting.$footer ? this.setting.$footer.height() : 0;
		var maxHeight=this.setting.maxHeight ? this.setting.maxHeight : $(window).height()*0.75;
		var contentBoxMaxHeight=maxHeight-headerH-footerH-$btn.height();//内容区最大高
		//alert(maxHeight+"-"+headerH+"-"+footerH+"-"+$btn.height())
		contentBox.css("max-height",contentBoxMaxHeight);//最大高度值赋值

		if(!$boxIsShow){
			$box.hide();
			$box.css("visibility","visible");//先显现
		}

	};

	//找到选项的id;返回找到的数据对象
	this.findDataObjById_btn=function(id){
		var array1=this.newDataArray;
		for(var i in array1){
			var array2=array1[i].optinsArray;
			for(var n in array2){
				var item=array2[n];
				if(item.id==id){
					return item;
				}
			}
		}
	};

	//初始化
	this.init=function(){
		console.log("调用了init");
		//console.log("大控件进入====");
		//console.log(self.setting.dataArray);
		//debugger;
		this.newDataArray=[];//缓存数组
		mCommonExtend(self.newDataArray,self.setting.dataArray);//缓存＝拷贝setting数组





		this.createDom();//dom构造
		this.setting.$appendBox.append($box);//写入页面
		this.size();//尺寸设置
		//挂事件＝＝＝＝
		$(window).bind("resize."+this.id,function(){
				self.size();//尺寸设置
		});
	};

	//清除方法
	this.clear=function(){
		$(window).unbind('resize.'+this.id);//解绑事件
		$box.remove();//清除dom
	};

	//显示
	this.show=function(){
		this.init();
		$box.show();
	};

	//隐藏
	this.hide=function(){
		$box.hide();
		$(window).unbind('resize.'+this.id);//停止window的事件监控
	};

	//执行＝＝＝＝
	this.init();


}




