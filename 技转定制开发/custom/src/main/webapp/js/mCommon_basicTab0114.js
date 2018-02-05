/*页签切换 */

function mCommon_basicTab0114(option) {
    this.setting = {
		appendObj: $("body"),//页签写入的容器，类型是jquery对象
		selectedIndex:0,//默认当前选中状态组
		tabMenu: [], //菜单内容对象
		tapFun:function(tapObj){//点击tap的回调函数,参数是点击的tap对象
		}
    };
    option = option || {};
    $.extend(true, this.setting, option);
    var self=this;
	
    //定义变量===========
	this.selectedClass = "mCommon_basicTab0114_Menu_active";  //选中时的CSS
	
	//dom结构
	this.tabBox = $(//tab签大容器
		'<div class="mCommon_basicTab0114 borderPx1">'+
			'<ul class="mCommon_basicTab0114_Box clearfix">'+
			'</ul>'+
   		 '</div>'
	);
	this.menuBox = this.tabBox.find(".mCommon_basicTab0114_Box");//tab签容器
	this.menuItemDemo = $('<li class="mCommon_basicTab0114_Menu"></li>');//每个tab签demo

    //定义方法===============
    
    //激活方法
    this.tapActive=function(tabObj){//激活的obj
    	var allTab=this.menuBox.find(".mCommon_basicTab0114_Menu");//全部tab签
    	var activeTab=tabObj;//激活的tab签
    	allTab.removeClass(this.selectedClass);//去掉全部的激活
    	activeTab.addClass(this.selectedClass);//激活签加入激活样式
    	try{
    		this.setting.tapFun(activeTab);//调用点击回调，参数是激活的签对象
    	}catch(e){}
    	
    }
    

    //初始化
    this.initTab = function () {
    	
		for(var i=0; i<this.setting.tabMenu.length;i++){
			var item=this.menuItemDemo.clone();//克隆一个tap html
			var itemContent=this.setting.tabMenu[i];//取当前内容
			item.append(itemContent);//签里写入内容
			this.menuBox.append(item);//签写入容器
			item.tap(function(){//每个签挂点击样式
				self.tapActive($(this));
			});
		}
		
		this.tabBox.appendTo(this.setting.appendObj);//页签容器写入页面中
		
		var allTab=this.menuBox.find(".mCommon_basicTab0114_Menu");//全部tab签
		var activeTab=allTab.eq(this.setting.selectedIndex);//激活的tab签
		
		this.tapActive(activeTab);//激活默认tab签
		
    };

    //执行============
    this.initTab();//初始化*/

}
