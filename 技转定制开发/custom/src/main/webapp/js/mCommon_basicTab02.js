/*页签切换 
 内容层随之变化
 _global_titleBackGroundColor 为主题色全局变量，写在开发文件里
 */

//例如：		
//  	[{menuText:"<span>进行中</span>",contentText:"<div>内容1</div>"},
//  	{menuText:"进行中",contentText:"<div>内容1</div>"}]
//  	{menuText:"搜索",contentText:null}]

function mCommon_basicTab(setting) {
    this.option = {
		appendObj: $("body"),//页签写入的容器，类型是jquery对象
		selectedIndex:0,//默认当前选中状态组
		fixedTop:false,//tab签是否定位在顶部，布尔
		tabMenuContAry: [], //菜单及对应的内容数组，从0开始
		themeColor:typeof(_global_titleBackGroundColor)=="undefined" ? "rgb(0,172,230)":_global_titleBackGroundColor,	//主题色,根据portal设置的主题色改变此控件的颜色 或 默认蓝色
		tapFun:function(tapFunObj){//点击tap的回调函数,参数是对象
//			tapFunObj={//点击的回调的参数
//				tapJqObj:jqObj,//激活的tap
//				contentJqObj:jqObj,//激活的内容
//				activeIndex:num //激活的index值	
//			};
		},
		tabmenucontActiveCallBack : function(menu){

		}

    };
    setting = setting || {};
    $.extend(true, this.option, setting);
    var self=this;
	
    //定义变量===========
	this.selectedClass = "mCommon_basicTabMenu_active";  //选中时的CSS
    this.index = 0;
	//dom结构
	this.tabBox = $("<div class='mCommon_basicTab'><div class='mCommon_basicTabMenu borderPx1'><div class='mCommon_basicTabMenu_content'><ul class='clearfix'></ul></div></div><div class='mCommon_basicTabContent_wrapper'></div></div>");
	this.menuBox = this.tabBox.find(".mCommon_basicTabMenu ul");
	this.contentBox = this.tabBox.find(".mCommon_basicTabContent_wrapper");
	if(this.option.fixedTop){//如果停留在顶部
		this.tabBox.find(".mCommon_basicTabMenu").wrap('<div class="mCommon_basicTabMenu_fixedBox_height"></div>').wrap('<div class="mCommon_basicTabMenu_fixedBox_fixed"></div>').wrap('<div class="mCommon_basicTabMenu_fixedBox_fixedContent"></div>');
	}

	//返回tab签个数

	this.getTabLength = function(){
		return this.option.tabMenuContAry.length;//页签个数
	}

	//tabMenuContAry 创建多页签和内容层数组，默认激活页签
	this.createTabMenuConts = function(){		
		for(var i=0;i<this.option.tabMenuContAry.length; i++){
			var menuText = this.option.tabMenuContAry[i].menuText;
			var contentText = this.option.tabMenuContAry[i].contentText;
			
			var menuItem;
			//每个菜单层结构，搜索和非搜索结构
			menuItem = $("<li class='mCommon_basicTabMenu_common'><span><em class='textCut'></em></span></li>");
			//每个内容层结构
			var contentItem = $("<div class='mCommon_basicTabContent'></div>");			
		
			//页签菜单层内容
			var menuEm = menuItem.find("em");
			menuEm.append(menuText); 
			menuItem.appendTo(this.menuBox);			
			
			//页签内容层的内容
			if(contentText!=null){
				contentItem.append(contentText);
				contentItem.appendTo(this.contentBox);	
			}
	  	}

	};
	var i=0;
	this.tapFun = function(){
		var tabMenuContent = this.tabBox.find('.mCommon_basicTabMenu_content');
		tabMenuContent.scroll(function(){
			var scrollLeft = tabMenuContent.scrollLeft();
			if(scrollLeft===0){
               $('.mCommon_basicTab02_left_img').css('background',"white")
			}else{
               $('.mCommon_basicTab02_left_img').css('background',"url(../../../../../modulev1/portalHtml5/images/mCommon_basicTab02_right.png) white no-repeat top").css("background-size","8px").css("background-position","left 10px");
			}
		})
        $('.mCommon_basicTab02_img').click(function(){
        	i++;
        	console.log(i)
			//图片切换
			var tabmenuNum= self.option.tabMenuContAry.length;//页签个数
			var winFourWidth = self.option.appendObj.find('ul').width()/2;
			var tabmenuFourWidth;
			tabmenuFourWidth = parseInt(winFourWidth/4);
			var scrollLeft = $('.mCommon_basicTabMenu_content').scrollLeft();
			tabMenuContent.scrollLeft(scrollLeft+tabmenuFourWidth);
            //self.option.appendObj.find('ul').css('margin-left','20px');
            if(i>4){
            	$('.mCommon_basicTab02_left_img').css('background',"white")
            }else{
            	$('.mCommon_basicTab02_left_img').css('background',"url("+ctxPath+"/images/mCommon_basicTab02_right.png) white no-repeat top").css("background-size","8px").css("background-position","left 10px");
            }
            
        })

	};
	//页签大小
	this.tabmenuSize = function(){
		//设置单个页签宽度
		var tabmenuNum= this.option.tabMenuContAry.length;//页签个数
		var spanW = parseInt(this.menuBox.find("span").css("padding-left"))*2;
		if(this.option.tabMenuContAry.length<=4){
			var winWidth = this.option.appendObj.find('.mCommon_basicTabMenu_content').width();//页签所绑定的容器宽度
			var tabmenuWidth,tabmenuLastWidth;
			
			tabmenuWidth = parseInt(winWidth/tabmenuNum);
			tabmenuLastWidth = (winWidth - tabmenuWidth*tabmenuNum) + tabmenuWidth;
			this.menuBox.find("li").css("width",tabmenuWidth);
       		this.menuBox.find("em").css("max-width",tabmenuWidth-spanW);//设置截取字符的最大宽度，与li的宽度一致
			this.menuBox.find("li:last").css("width",tabmenuLastWidth);
			this.menuBox.find("li:last em").css("max-width",tabmenuLastWidth-spanW);
		}else{
			var bodyWidth = $(document.body).width()-parseInt(this.option.appendObj.find(".mCommon_basicTabMenu_content").css("padding-left"))*2;
			this.option.appendObj.find('.mCommon_basicTabMenu_content').width(bodyWidth);
            this.option.appendObj.find('ul').width(bodyWidth*2);
            var winWidth = this.option.appendObj.find('ul').width();//页签所绑定的容器宽度
            var winFourWidth = this.option.appendObj.find('ul').width()/2;
			var tabmenuWidth,tabmenuLastWidth,tabmenuFourWidth,tabmenuFourLastWidth;
			
			tabmenuWidth = parseInt(winWidth/tabmenuNum);
			tabmenuFourWidth = parseInt(winFourWidth/4);
			tabmenuLastWidth = (winWidth - tabmenuWidth*tabmenuNum) + tabmenuWidth - spanW;
			tabmenuFourLastWidth = (winWidth - tabmenuFourWidth*4) + tabmenuFourWidth;
            this.menuBox.find("li").css("width",tabmenuFourWidth-spanW/4);
       		this.menuBox.find("em").css("max-width",tabmenuFourWidth-spanW);//设置截取字符的最大宽度，与li的宽度一致
       		
       		this.tapFun();
		}
			
	};

	//页签菜单激活，内容层显示
	this.tabmenucontActive = function(index){
			this.menuBox.find("li").eq(index).addClass(this.selectedClass).siblings().removeClass(this.selectedClass);
			this.replaceThemeColor(this.menuBox.find("li").eq(index)); //根据app的portal页设置的主题色替换active时原标签的颜色
			this.contentBox.find(".mCommon_basicTabContent").eq(index).show().siblings().hide();
			this.option.tabmenucontActiveCallBack(this.option.tabMenuContAry[index] || {});
	};

	//根据app的portal页设置的主题色替换active时原标签的颜色
	this.replaceThemeColor = function(currentObj){  //当前active的jq对象
		if(this.option.themeColor && currentObj.hasClass(this.selectedClass)){
			currentObj.find("em").css({color:this.option.themeColor,borderColor:this.option.themeColor})
			currentObj.siblings().find("em").css({color:"",borderColor:""})
		}
	};

    //初始化
    this.initTab = function () {
		this.createTabMenuConts(); //创建页签菜单内容层
		self.tabmenucontActive(this.option.selectedIndex);//激活状态
		this.tabBox.appendTo(this.option.appendObj);//页签写入页面
		this.tabmenuSize(); //页签菜单大小
		
		$(window).bind("resize",function () {//绑定resize
            self.tabmenuSize();//设置单个页签宽度
        });
		
		//事件
		this.menuBox.find("li").bind("tap",function(){
			var index = $(this).index();
			self.tabmenucontActive(index);
			var tapFunObj={//点击的回调的参数
				tapJqObj:self.menuBox.find("li").eq(index),//激活的tap
				contentJqObj:self.contentBox.find(".mCommon_basicTabContent").eq(index),//激活的内容
				activeIndex:index 
				//激活的index值
			};
			self.option.tapFun(tapFunObj);//点击的回调
		})    
	};

    //执行============
    this.initTab();//初始化*/

}
