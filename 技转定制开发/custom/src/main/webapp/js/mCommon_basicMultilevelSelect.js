/*
 说明：
 多级单选
 支持1-3级的单选
 3级数据可以在2级点击时加载
 高度必须是整页高度，可以减去筛选条高度；
 第三级可以是通过点击二级出来的三级；

每个节点的基本数据＝＝＝＝＝＝＝＝＝＝＝＝
 {
	 name:"第一级选项", //必填
	 id:"level1-1",//必填
	 level:1,//节点层级
	 isActive:false,//是否选中，默认false
	 loadFun:function(){};//加载数据方法
	 subNodeArray:[]//下一级的数据数组
 }

 */

function mCommon_basicMultilevelSelect(options) {
	this.setting = {
		$appendBox:$("body"),//写入的容器,必填
		dataArray:[],//选项的数组，必填
		selectedFun:function(dataObj){},//选中了的回调函数 参数是最后激活的ID
		tapFun:function(dataObj){},//点击的回调函数 参数是最后激活的ID
		boxHeight:null,//容器总体高度 默认屏幕的75%
		headerHeight:0,//头部高度
		footerHeight:0//底部高度
	};
	options = options || {};
	$.extend(true, this.setting, options);
	var self=this;

	//控件统一控制＝＝＝＝
	var instanceId;//控件的实例id
	if(!mCommonObj.mCommon_basicMultilevelSelect){//查看是否有这种类型，没有
		mCommonObj.mCommon_basicMultilevelSelect={};//造一个空类型
	}
	for(var i=0; true ;i++){
		instanceId="mCommon_basicMultilevelSelect"+i;//生成id
		if(!mCommonObj.mCommon_basicMultilevelSelect[instanceId]){//如果没有这个id
			break;//终止循环
		}
	}
	mCommonObj.mCommon_basicMultilevelSelect[instanceId]=self;//生成这个类型 和 一个实例
	this.id=instanceId;//控件的id

	//定义变量===========

	this.boxWidth;//列表容器宽度
	this.listHeight; //选项的高度
	this.listWidth_normal; //一般选项宽度
	this.listWidth_last; //最后一级选项的宽度
	this.listWidth3_2; //三级选项的第2个宽度，没显示第三级时有用
	this.levelNum=1;//层级数
	this.activeId;//激活的ID，需要反出去
	this.newDataArray=[];//缓存数组

	var boxHtml=$('<div class="mCommon_basicMultilevelSelect_box"><ul class="mCommon_basicMultilevelSelect_con clearfixOverflow"></ul></div>');//盒子容器
	var listHtml=$('<li class="mCommon_basicMultilevelSelect_con_list"></li>');//列表
	var itemHtml_=$('<p class="mCommon_basicMultilevelSelect_con_list_item textCut borderPx1"></p>');//每个选项
	var activeClass="mCommon_basicMultilevelSelect_con_list_itemActive";//选项激活


	//定义方法＝＝＝＝＝＝＝＝＝
	//取层级数
	this.getLevelNum=function(){
		var array1=this.newDataArray;//一级数据数组
		for(var i in array1){
			var item1=array1[i];//一级数组中的一项

			if(this.haveNextLevel(item1)){//如果 有数组 且 数组不为空 ;说明有下一级数据

				var array2=item1.subNodeArray;//二级数据数组
				for(var j in array2){
					var item2=array2[j];//二级数组中的一项
					if(this.haveNextLevel(item2)) {//如果 有数组 且 数组不为空 或 有加载数据方法;说明有下一级数据

						this.levelNum=3;//层级为3
						return 3;//直接退出
					}else{
						this.levelNum=2;//层级为2
					}
				}
			}
		}
	};

	//dom生成 写入页面
	this.createHtml=function(){
		boxHtml.find(".mCommon_basicMultilevelSelect_con").html("");//盒子清空
		var array1=this.newDataArray;//一级数组
		var listBox1;//一级数组
		for(var i=0; i < this.levelNum ; i++){//写入多级列表盒子
			var listBox=listHtml.clone();//一级列表 dom
			boxHtml.find(".mCommon_basicMultilevelSelect_con").append(listBox);//列表写入盒子box
			if(i==2){//如果是第三个盒子
				listBox.hide();//隐藏第三级盒子
			}
			if(i==0){
				listBox1=listBox;//第一个盒子赋值
			}
		}
		this.createItem(listBox1,array1);//一级盒子写入数据内容
		boxHtml.appendTo(this.setting.$appendBox);//全部dom写入页面
	};

	//列表中写入选项
	this.createItem=function($listBox,array){//参数 写入列表的容器，数据数组
		$listBox.html("");//清空容器

		if($listBox.index()==2){//如果显示容器是第三个容器
			boxHtml.find(".mCommon_basicMultilevelSelect_con_list").last().show();//最后一个层级显示
			this.size();//重新计算宽度
		}

		for(var i=0; i<array.length;i++){
			var item=array[i];//数组的一个元素
			var itemHtml=itemHtml_.clone();//一个选项的dom
			itemHtml.html(item.name);//写入名字
			itemHtml.attr("id",item.id);//写入ID
			$listBox.append(itemHtml);//写入一个选项

			if(item.isActive){//如果时激活状态
				self.itemActive_show(itemHtml);//激活显示方法
			}
			itemHtml.tap(function(){//选项点击事件
				self.itemActive_tap($(this));//激活点击方法
				var objData=self.findDataItem($(this).attr("id"));//找到点击的数据对象
				try{
					self.setting.tapFun(objData);//点击的回调，参数{activeId:self.activeId,$activeDom:$(this)} {激活的ID,激活的dom}
				}catch(e){}
			});//一个选项的点击

		}
	};

	//判断是否有下一级
	this.haveNextLevel=function(dataItem){//参数 数据中的一个选项

		if((dataItem.subNodeArray && dataItem.subNodeArray.length > 0) || dataItem.loadFun){//如果有下级数组且数组不能为空 或 loadFun回调
			return true;
		}
		return false;
	};

	//找到id对应的 数据选项,返回一个数据选项
	this.findDataItem=function(id,array){//第二个参数选填
		//逐层查找ID 返回 数据一个对象
		function findObj_data(array,id){//开始查找的数组 ID
			for(var i in array){
				if(array[i].id==id){//如果这层找到了id
					return array[i];//返回数据对象
				}else{
					var subArray=array[i].subNodeArray;//下一级数组
					if(subArray && subArray.length > 0){
						var obj = findObj_data(subArray,id);//返回对象
						if(obj){
							return obj;
						}
					}
				}
			}
		}
		var array_=this.newDataArray;//选项的数组
		if(array){//如果有参数传入，
			array_=array;//array_为传入参数
		}
		return findObj_data(array_,id);//逐层查找ID 返回 数据是一个对象
	};

	//激活方法_显示，本级显示激活样式，下级展示出来
	this.itemActive_show=function($item){//参数要激活的选项jq对象
		var thisBoxIndex=$item.parent().index();//但前选项层级
		for(var n=thisBoxIndex+1; n < this.levelNum ; n++){//轮询所有下级容器
			boxHtml.find(".mCommon_basicMultilevelSelect_con_list").eq(n).html("");//清空所有下级容器
			boxHtml.find(".mCommon_basicMultilevelSelect_con_list").eq(n).scrollTop(0);//滚动倒顶部
		}
		if(this.levelNum==3 && thisBoxIndex!=2){//如果三级,当前级不是第三级
			boxHtml.find(".mCommon_basicMultilevelSelect_con_list").last().hide();//最后一个层级先hide
			this.size();//重新计算宽度
		}

		//改本级样式
		$item.siblings("."+activeClass).removeClass(activeClass);//去掉同级的激活样式
		$item.addClass(activeClass);//改为激活状态


		//改变量的赋值
		this.activeId=$item.attr("id");//激活ID附值


		//显示下一级的选项
		var activeDataItem=this.findDataItem(this.activeId);//数据选项 找到id对应的数据选项,返回一个数据选项
		if(this.haveNextLevel(activeDataItem)){//有下一级
			//显示下级选项
			function showNext(subNodeArray){//下级选项数组
				var nextBox=$item.parent().next();//下一级选项的容器
				if(nextBox.index()==2){//如果向第三级容器中写内容
					nextBox.show();//显示第三级容器
				}
				self.createItem(nextBox,subNodeArray);//显示下一级选项
			}
			function loadFun_callback(subNodeArray){//load方法的回调，参数是load的数组
				activeDataItem.subNodeArray=subNodeArray;//数组写入数据中
				//setting中的数组添加数组
				var id=activeDataItem.id;//找到id
				self.findDataItem(id,self.setting.dataArray).subNodeArray=subNodeArray;//setting中的数组添加数组
				showNext(subNodeArray);//下级选项数组
			}



			if(activeDataItem.subNodeArray && activeDataItem.subNodeArray.length > 0){//如果数组中有数据
				var subNodeArray=activeDataItem.subNodeArray;//下一级数组
				showNext(subNodeArray);
			}else{//如果下级数据需要load
				try{
					activeDataItem.loadFun(loadFun_callback);//loadFun_callback(subNodeArray)//load方法的回调，参数是load的数组
				}catch(e){}
			}

		}

	};

	//显示下一级选项
	this.showNextLevel=function(){

	};



	//激活方法_点击动作和修改数据
	this.itemActive_tap=function($item){//参数要激活的选项jq对象
		var id=$item.attr("id");//点击对象的id
		//修改数据
		this.changeActiveData(id);//改数据中的激活状态 本级其他选项变为不激活，自己变为激活，所有下级都变为不激活变为；
		//显示激活
		this.itemActive_show($item);//显示激活的对应数据
		//执行事件
		var activeDataItem=this.findDataItem(id);//数据选项 找到id对应的数据选项,返回一个数据选项
		if(!this.haveNextLevel(activeDataItem)){//没有下一级数组
			this.finished();//选择完成方法执行
		}
	};

	//改数据中的激活状态 本级其他选项变为不激活，自己变为激活，所有下级都变为不激活变为；
	this.changeActiveData=function(id){//参数是数据ID
		var arrayIn=this.inArray(this.newDataArray,id);//查找id所在的数组

		this.arrayActive(arrayIn,id);//本级数组中的其他变为不激活,自己变为激活;没有ID 就都变为不激活

		this.subArrayUnactive(arrayIn);//下级数据全部变为不激活

	};

	//找ID所在的当前数组,返回所在数组
	this.inArray=function(array,id){//开始查找的数组 ID
		for(var i in array){
			if(array[i].id==id){//本级数组含有ID
				return array;//返回找到的数组
			}else{//本级数组不含有ID
				var subArray=array[i].subNodeArray;//下级数组
				if(subArray && subArray.length > 0){//如果有下级数组
					var arr = this.inArray(subArray,id);//查找下级数组，返回值赋值
					if(arr){
						return arr;
					}
				}
			}
		}

	};


	//本级数组中的其他变为不激活,自己变为激活;没有ID 就都变为不激活
	this.arrayActive=function(array,id){//本级数组 激活的id
		for(var i in array){
			var dateItem=array[i];//一个数据对象
			if(!id || dateItem.id!=id){//如果没有ID 或 不是激活ID
				dateItem.isActive=false;//激活改为 false
			}else if(dateItem.id==id){//是激活ID
				dateItem.isActive=true;//激活改为 true
			}
		}
	};


	//下级数据全部变为不激活
	this.subArrayUnactive=function(array){//本级数组
		for (var i in array){
			var subArray=array[i].subNodeArray;//下级数组
			if(subArray && subArray.length > 0){
				for(var j in subArray){//轮寻下一级数组
					subArray[j].isActive=false;//激活状态只为false
				}
				this.subArrayUnactive(subArray);//下级数据全部变为不激活
			}
		}
	};

	//选择完毕
	this.finished=function(){
		try{
			this.setting.selectedFun(this.findDataItem(this.activeId));//参数是最后激活的数据对象
		}catch(e){}
		this.setting.dataArray=this.newDataArray;//缓存数组覆盖 传入数组
	};

	//定义尺寸，附值
	this.size=function(){
		var boxHeight=this.setting.boxHeight ? this.setting.boxHeight : $(window).height()*0.75;//容器总高度
		this.listHeight=boxHeight-this.setting.headerHeight-this.setting.footerHeight;//列表高度

		this.boxWidth=this.setting.$appendBox.width();//列表容器宽度


		this.listWidth_normal=parseInt(this.boxWidth/this.levelNum); //一般选项宽度
		this.listWidth_last=this.boxWidth-this.listWidth_normal*(this.levelNum-1); //最后一级选项的宽度
		this.listWidth3_2=this.boxWidth-this.listWidth_normal; //三级选项的第2个宽度，没显示第三级时有用

		boxHtml.find(".mCommon_basicMultilevelSelect_con_list").height(this.listHeight);//写入高度
		//写宽度
		if(this.levelNum==1){//一级单选
			boxHtml.find(".mCommon_basicMultilevelSelect_con_list").width(this.listWidth_normal);
		}else if(this.levelNum==2){//2级单选
			boxHtml.find(".mCommon_basicMultilevelSelect_con_list").eq(0).width(this.listWidth_normal);
			boxHtml.find(".mCommon_basicMultilevelSelect_con_list").eq(1).width(this.listWidth_last);
		}else{//3级单选
			//如果第三级隐藏
			if(boxHtml.find(".mCommon_basicMultilevelSelect_con_list").last().css("display")=="none"){
				boxHtml.find(".mCommon_basicMultilevelSelect_con_list").eq(0).width(this.listWidth_normal);
				boxHtml.find(".mCommon_basicMultilevelSelect_con_list").eq(1).width(this.listWidth3_2);
			}else{//如果第三级显示
				boxHtml.find(".mCommon_basicMultilevelSelect_con_list").last().siblings().width(this.listWidth_normal);
				boxHtml.find(".mCommon_basicMultilevelSelect_con_list").last().width(this.listWidth_last);
			}
		}
	};



	//初始化方法
	this.init=function(){
		self.newDataArray=[];
		mCommonExtend(self.newDataArray,self.setting.dataArray);//缓存＝拷贝setting数组
		this.getLevelNum();//取层级数
		this.createHtml();//构造dom
		this.size();//定义尺寸，附值
		$(window).bind('resize.'+this.id,function(){//挂事件
			self.size();//定义尺寸，附值
		});
	};

	//清除方法
	this.clear=function(){
		$(window).unbind('resize.'+this.id);//解绑事件
		boxHtml.remove();//清除dom
	};

	//显示
	this.show=function(){
		this.init();
		boxHtml.show();
	};

	//隐藏
	this.hide=function(){

		boxHtml.hide();
		$(window).unbind('resize.'+this.id);//停止window的事件监控
		//this.newDatyaArra=this.setting.dataArray;//传入数组 覆盖 缓存数组
	};




	//执行方法＝＝＝＝＝＝＝＝＝
	this.init();//初始化方法

}
