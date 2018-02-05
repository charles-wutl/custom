

//var dataArr = [
//	{
//		tabType:"textTab",//标签类型,textTab为文字标签，dropDownTab为下拉标签，sortTab为排序标签，imgTab为图片标签
//		text:"文字标签文字标签文字标签文字标签文字标签文字标签文字标签文字标签文字标签文字标签",//标签显示的内容
//		state:"normal",//选中状态，active标签激活状态，normal正常状态
//		imgState:"",//图片的state被占用，增加imgState只用于图片类型的浮层展开关闭状态，shrink激活有浮层状态，normal正常状态
//		imgArr:[],//图片地址，只有在图片标签下才会解析
//		id:"textTabId1"//唯一标识
//	},
//	{
//		tabType:"dropDownTab",//标签类型,textTab为文字标签，dropDownTab为下拉标签，sortTab为排序标签，imgTab为图片标签
//		text:"下拉标签",//标签显示的内容
//		state:"normal",//选中状态，shrink激活有浮层状态，stretch激活无浮层状态,normal正常状态
//		imgState:"",//图片的state被占用，增加imgState只用于图片类型的浮层展开关闭状态，shrink激活有浮层状态，normal正常状态
//		imgArr:[],//图片地址，只有在图片标签下才会解析
//		id:"dropDownTabId1"//唯一标识
//	},
//	{
//		tabType:"sortTab",//标签类型,textTab为文字标签，dropDownTab为下拉标签，sortTab为排序标签，imgTab为图片标签
//		text:"排序标签排序标签排序标签排序标签排序标签排序标签排序标签排序标签排序标签排序标签",//标签显示的内容
//		state:"normal",//选中状态，normal正常状态,activeUp正序状态,activeDown倒序状态,
//		imgState:"",//图片的state被占用，增加imgState只用于图片类型的浮层展开关闭状态，shrink激活有浮层状态，normal正常状态
//		imgArr:[],//图片地址，只有在图片标签下才会解析
//		id:"sortTabId1"//唯一标识
//	}
//	,	
//	{
//		tabType:"imgTab",//标签类型,textTab为文字标签，dropDownTab为下拉标签，sortTab为排序标签，imgTab为图片标签
//		text:"图片标签图片标签",//标签显示的内容
//		state:"1",//要显示的图片下标，number类型，从0开始
//		imgState:"",//图片的state被占用，增加imgState只用于图片类型的浮层展开关闭状态，shrink激活有浮层状态，normal正常状态
//		imgArr:[
//			"../images/mCommon_jsFilterSearchNormal.png",
//			"../images/basicIcon_commentBad.png",
//			"../images/basicIcon_arrayUp.png"
//		],//当类型为3的时候才会解析图片地址和默认显示图片
//		id:"imgTabId1"//唯一标识
//	}
//	,
//	{
//		tabType:"imgTab",//标签类型,textTab为文字标签，dropDownTab为下拉标签，sortTab为排序标签，imgTab为图片标签
//		text:"图片标签图片标签",//标签显示的内容
//		state:"2",//要显示的图片下标，number类型，从0开始
//		imgState:"",//图片的state被占用，增加imgState只用于图片类型的浮层展开关闭状态，shrink激活有浮层状态，normal正常状态
//		imgArr:[
//			"../images/basicIcon_commentGeneral.png",
//			"../images/basicIcon_photoAnonymity.png",
//			"../images/basicIcon_position.png"
//		],//当类型为3的时候才会解析图片地址和默认显示图片
//		id:"imgTabId2"//唯一标识
//	}
//];


/*
 * 两个参数，第一个是dom对象，jquery对象。
 * 第二个回填的文字，string类型
*tabContentBackFill(obj,"回填");
* 
* 设置状态方法：
* 两个参数，第一个参数是dom对象，jquery对象。
* 第二个除图片外的其他类型的状态的字符串，string类型
* 第三个图片类型的状态的字符串，string类型
* setTabState(obj,"其他类型状态","图片类型状态");
* 
* 获取状态方法：
* 一个参数，dom对象，jquery对象。
* getTabState(obj);
* 
* 
* 根据id获取dom对象,参数是id,string类型
* findDomById(id);
* 
* 根据id获取数据数组中相应的数据对象，参数是id,string类型
* findDataById(id);
* 
* */


	
function mCommon_basicFilterBlend_setBlendTab(options){
	this.option = {
		containerObj:$('body'),//默认容器是body
		dataArr:[],//数据
		callBack:function(id,currentObj){
			
		}//回调函数
	};
	//判断参数是否为空
	options = options || {};
	//参数合并
	$.extend(true, this.option, options);
	var self = this;
	
	//定义变量====
	//外层容器
	var $box = $('<div class="mCommon_basicFilterBlend_screenBox borderPx1"></div>');
	//内容的ul
	var $ul = $('<ul class="mCommon_basicFilterBlend_screenBoxContent clearfix"></ul>');
	//每个列表项
	var $li = $('<li class="mCommon_basicFilterBlend_screenItem"></li>');
	//显示的文字
	var $span = $('<span class="mCommon_basicFilterBlend_screenItemText textCut"></span>');
	//排序或者下拉的背景小图
	var $em = $('<em class=""></em>');
	//数据数组
	var dataArray = this.option.dataArr;
	var dataArrayLen = dataArray.length;
	
	//编写DOM结构
	this.writeStructure = function(){
		if(0 == dataArrayLen){
			return false;
		}
		for(var i=0; i<dataArrayLen; i++){
			var data = dataArray[i];
			var tabType = data.tabType;//类型
			var text = data.text;//文本内容
			var state = data.state;//选中状态，图片标签是显示的图片下标
			var imgState = data.imgState;//图片类型的浮层展开关闭状态，shrink激活有浮层状态，normal正常状态
			var imgArr = data.imgArr;//图片地址数组
			var tabId = data.id;//li上绑定id
			
			var $tempEm = $em.clone();//背景小图标容器
			var $tempSpan = $span.clone();//文本内容容器
			var $tempLi = $li.clone();//每个标签
			//是文字标签
			if ("textTab" === tabType) {
				$tempEm.addClass('mCommon_basicFilterBlend_screenItemTabIcon');
				$tempSpan.text(text);
				if("normal" == state){
					$tempLi.addClass('mCommon_basicFilterBlend_screenItemTab');
				}else if("active" == state){
					$tempLi.addClass('mCommon_basicFilterBlend_screenItemTabSelect');
				}
			} else if ("dropDownTab" === tabType) {
				//是下拉标签
				$tempEm.addClass('mCommon_basicFilterBlend_screenItemLableIcon');				
				$tempSpan.text(text);
				if("normal" == state){
					$tempLi.addClass('mCommon_basicFilterBlend_screenItemLableNormal');
				}else if("shrink" == state){
					$tempLi.addClass('mCommon_basicFilterBlend_screenItemLableShrink');
				}else if("stretch" == state){
					$tempLi.addClass('mCommon_basicFilterBlend_screenItemLableStretch');
				}
			} else if ("sortTab" === tabType) {
				//是排序标签
				$tempEm.addClass('mCommon_basicFilterBlend_screenItemSortIcon');				
				$tempSpan.text(text);
				if("normal" == state){
					$tempLi.addClass('mCommon_basicFilterBlend_screenItemSortNormal');
				}else if("activeUp" == state){
					$tempLi.addClass('mCommon_basicFilterBlend_screenItemSortUp');
				}else if("activeDown" == state){
					$tempLi.addClass('mCommon_basicFilterBlend_screenItemSortDown');
				}
			} else if ("imgTab" === tabType) {
				//是图片图标
				
				//图片地址数组
				var imgArrLen = imgArr.length;
				state = parseInt(state);
				//默认显示第一个
				if(!state || !$.isNumeric(state) || state<imgArrLen || state>imgArrLen){
					state = 0;
				}
				if(0 < imgArrLen){
					for(var j=0; j<imgArrLen; j++){
						var $img = $("<img />");
						if(state == j){
							$img.addClass("mCommon_basicFilterBlend_screenItemIconBoxShow");
						}
						$img.attr("src",imgArr[j]);
						$tempLi.addClass("mCommon_basicFilterBlend_screenItemIconContainer");	
						$tempLi.append($img);	
					}
				}
			}
			$tempLi.attr("tabType",tabType);
			$tempLi.attr("state",state);
			$tempLi.attr("id",tabId);
			$tempLi.attr("imgState",imgState);
			if("imgTab" !== tabType){
				$tempLi.append($tempSpan);
				$tempLi.append($tempEm);
			}
			$ul.append($tempLi);
		}
		$box.append($ul);
		this.option.containerObj.append($box);
		this.setImgTabStyle();
	};
	//dom渲染完需要给图片标签加上边距
	this.setImgTabStyle = function(){
		var count = 0;
		var tabLi = $ul.children("li");
		tabLi.each(function(){
			var tabType = $(this).attr("tabType");
			if("textTab" == tabType){
				count += 1;
			}
			if("dropDownTab" == tabType){
				count += 1;
			}
			if("sortTab" == tabType){
				count += 1;
			}
		});
		if(0 < count){
			$ul.children("li.mCommon_basicFilterBlend_screenItemIconContainer").first().addClass("borderPx1 mCommon_basicFilterBlend_screenItemIconContainerFirst");
			$ul.children("li.mCommon_basicFilterBlend_screenItemIconContainer").last().addClass("mCommon_basicFilterBlend_screenItemIconContainerLast");
		}
	};
	
	//计算标签的宽度
	this.calculateSize = function(){
		//图片标签的宽度
		var imgTabW = 0;
		//判断是否有图片标签，有,需要减去它的宽度
		var imgTab = $ul.find("li.mCommon_basicFilterBlend_screenItemIconContainer");
		//图片标签个数
		var imgTabLen = imgTab.length;
		//图片宽度
		var imgW = 22;
		if(imgTabLen > 0){
			if(1 == imgTabLen){
				var imgTabPaddingW = parseInt(imgTab.first().css("padding-left")) * 2;
				imgTabW = imgW + imgTabPaddingW;
			}else{
				var firstImgTabPaddingLeft = parseInt(imgTab.first().css("padding-left"));
				var firstImgTabPaddingRight = parseInt(imgTab.first().css("padding-right"));
				var paddingDisparity = (firstImgTabPaddingLeft - firstImgTabPaddingRight) * 2;
				var imgTabPaddingCount = firstImgTabPaddingRight * 2 * imgTabLen + paddingDisparity;
				var imgCountW = imgW * imgTabLen;
				imgTabW = imgTabPaddingCount + imgCountW;
			}
			this.widthCalculate(imgTabW);
		}else{//没有图片标签计算宽度
			this.widthCalculate();
		}
	};
	//宽度方法提取
	this.widthCalculate = function(imgTabWArg){
		//容器总宽度
		var containerW = $ul.width();
		//找到ul下的所有li
		var liArr = $ul.children("li");
		//图片标签数组
		var imgLiArr = $ul.find("li.mCommon_basicFilterBlend_screenItemIconContainer");
		//标签个数
		var labelLength = liArr.length;
		//图片标签个数
		var imgTabLength = imgLiArr.length;
		//图片标签的总宽度
		var imgTabW = 0;
		if(imgTabWArg){
			imgTabW = imgTabWArg;
		}
		//要平均分配的总宽度
		var toAllocateW = containerW - imgTabW;
		//平均宽度
		var averageW = parseInt(toAllocateW/(labelLength-imgTabLength));
		//无法平均后将宽度加在最后一个非图片标签上
		var lastLiW = toAllocateW - (averageW * (labelLength-imgTabLength-1));
		//获取li的padding值
		var liPadding = parseInt(liArr.eq(0).css("padding-left"))*2;
		//获取li的宽度
		var liW = averageW - liPadding;
		//获取span的pading值
		var spanPadding = parseInt(liArr.eq(0).children("span").css("padding-left")) * 2;
		//剔除图片标签后剩下标签个数
		var loopLen = labelLength - imgTabLength;
		for(var i=0; i < loopLen; i++){
			var $liObj = $(liArr[i]);
			$liObj.width(liW);
			var emW = $liObj.children("em").width();
			$liObj.children("span").css("max-width",liW - emW - spanPadding);
			if(i == loopLen){//最后一个
				$liObj.width(lastLiW - liPadding);
				$liObj.children("span").css("max-width",lastLiW - liPadding - emW - spanPadding);
			}
		}
	};
		
		
	//标签的文字回填
	this.tabContentBackFill = function(checkObj,backFillText){
		checkObj.children("span").text(backFillText);
	};
		
		
	//绑定事件
	this.tabClick = function(){
		//去除图标标签的绑定事件
		$ul.children("li").click(function(){
			var id = $(this).attr("id");
			self.option.callBack(id,$(this));
		});
	};
		
		
	//设置状态，改变标签的显示样式
	this.setTabState = function(checkObj,state,imgState){
		var tabType = checkObj.attr("tabType");
		if("textTab" == tabType){
			if("active" == state){
				//文字标签的切换--选中状态
				checkObj.removeClass("mCommon_basicFilterBlend_screenItemTab").addClass("mCommon_basicFilterBlend_screenItemTabSelect");
				checkObj.attr("state","active");
			}else if("normal" == state){
				//文字标签的切换--正常状态
				checkObj.removeClass("mCommon_basicFilterBlend_screenItemTabSelect").addClass("mCommon_basicFilterBlend_screenItemTab");
				checkObj.attr("state","normal");
			}
		}else if("dropDownTab" == tabType){
			if("normal" == state){
				//下拉标签的切换--正常状态
				checkObj.removeClass("mCommon_basicFilterBlend_screenItemLableShrink mCommon_basicFilterBlend_screenItemLableStretch").addClass("mCommon_basicFilterBlend_screenItemLableNormal");
				checkObj.attr("state","normal");
			}else if("stretch" == state){
				//下拉标签的切换--激活没浮层状态
				checkObj.removeClass("mCommon_basicFilterBlend_screenItemLableNormal mCommon_basicFilterBlend_screenItemLableShrink").addClass("mCommon_basicFilterBlend_screenItemLableStretch");
				checkObj.attr("state","stretch");
			}else if("shrink" == state){
				//下拉标签的切换--有浮层激活状态
				checkObj.removeClass("mCommon_basicFilterBlend_screenItemLableNormal mCommon_basicFilterBlend_screenItemLableStretch").addClass("mCommon_basicFilterBlend_screenItemLableShrink");
				checkObj.attr("state","shrink");
			}
		}else if("sortTab" == tabType){
			if("normal" == state){
				//排序标签的切换--正常状态
				checkObj.removeClass("mCommon_basicFilterBlend_screenItemSortUp mCommon_basicFilterBlend_screenItemSortDown").addClass("mCommon_basicFilterBlend_screenItemSortNormal");
				checkObj.attr("state","normal");
			}else if("activeUp" == state){
				//排序标签的切换--正序
				checkObj.removeClass("mCommon_basicFilterBlend_screenItemSortNormal mCommon_basicFilterBlend_screenItemSortDown").addClass("mCommon_basicFilterBlend_screenItemSortUp");
				checkObj.attr("state","activeUp");
			}else if("activeDown" == state){
				//排序标签的切换--倒序
				checkObj.removeClass("mCommon_basicFilterBlend_screenItemSortNormal mCommon_basicFilterBlend_screenItemSortUp").addClass("mCommon_basicFilterBlend_screenItemSortDown");
				checkObj.attr("state","activeDown");
			}
		}else if("imgTab" == tabType){
			//图片标签切换显示--checkObj是图片容器,showIndex指定下标
			checkObj.find("img").each(function(i,o){
				if(state == i){//只让指定下标的图片显示
					$(o).addClass("mCommon_basicFilterBlend_screenItemIconBoxShow").siblings().removeClass("mCommon_basicFilterBlend_screenItemIconBoxShow");
				}
			});
			if("normal" == imgState){
				//图片标签的切换--正常状态
				checkObj.attr("imgState","normal");
			}else if("shrink" == imgState){
				//图片标签的切换--选中展开下拉层
				checkObj.attr("imgState","shrink");
			}else if("stretch" == imgState){
				//图片标签的切换--选中不展开下拉层
				checkObj.attr("imgState","stretch");
			}
			checkObj.attr("state",state);
		}
	};
	
	//获取状态
	this.getTabState = function(checkObj){
		var state = "";
		if(checkObj.attr("tabType") == "imgTab"){
			state = checkObj.attr("imgState");
		}else{
			state = checkObj.attr("state");
		}
		return state;
	};
		
	//根据id转化为jquery的dom对象
	this.findDomById = function(id){
		if(!id){
			return false;
		}
		return $("#"+id);
	};
	//根据id获取数据中的数据
	this.findDataById = function(id){
		if(!id){
			return false;
		}
		for(var i=0; i<dataArrayLen; i++){
			var data = dataArray[i];
			var dataId = data.id;
			if(id == dataId){
				return data;
			}
		}
	};
		
	this.init = function(){
		this.writeStructure();
		$box.css("visibility","hidden");
		this.calculateSize();
		$box.css("visibility","visible");
		this.tabClick();
	};
	//重新计算宽度
	$(window).resize(function(){
		self.calculateSize();
	});
	
	this.init();
}
