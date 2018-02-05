//注释：
//页面使用rem方式放大尺寸
//1.根据页面容器(pageBoxObj )的宽度，计算<html style="font-size: ">中的font-size值；
//2如果是ie中打开，pageBoxObj 会加入 style="font-size:",font-size值会自动取值；
//3.效果图中px 值直接除以100 得到 rem单位的值,前提是320宽的效果图；例如 font-size:28px  》 font-size:0.28rem 
//4.注意：
//a. line-height不要用rem；
//b.border-width不要用rem,ie中会有问题,可以使用style方式写入"border-width:--rem"；
//c.面容器(pageBoxObj )和使用"font-size:--rem"容器之间的容器不能有使用非rem定义font-size，ie中会有问题，可以使用style方式写入"font-size:--rem" ；

function mCommon_jsPageAutoSize(pageBoxObj){//参数：pageBoxObj 为 页面的最大容器，可以不写，默认为body
	var box=pageBoxObj;//页面容器
	if(!box){
		box=$("body");
	}
	var boxFontSize=box.css("font-size");//取字号
	//var pageBoxFontSizePxNum;
	var pageBoxFontSizePxNum = Math.round(parseFloat(boxFontSize));//取数字
	var setTimeoutId;//延时id
	
	mCommon_jsPageAutoSize_size(box,pageBoxFontSizePxNum);//计算font-size,写入html
	$(window).resize(function(){
		if(setTimeoutId){//清除上次的延时
			clearTimeout(setTimeoutId);
		}
		setTimeoutId=setTimeout(function(){//延时执行
			mCommon_jsPageAutoSize_size(box,pageBoxFontSizePxNum);
		},300);
		
	});
}



//计算font-size,写入html
function mCommon_jsPageAutoSize_size(pageBoxObj,pageBoxFontSizePxNum){//参数：pageBoxObj 为 页面的最大容器，可以不写，默认为body;pageBoxFontSizePxNumr为容器的px字号
	var boxW=pageBoxObj.outerWidth();//容器宽度
	var fontSize=(Math.round(boxW/3.2*10000))/10000;//html中的font-size值
	$("html").css("font-size",fontSize+"px");//写入font-size
	if(isMobile()){//如果是移动就跳出，解决苹果手机不支持brower()
		return;
	}
	if((brower()=="ie9")||(brower()=="ie10")||(brower()=="ie11")){//如果是ie
		var boxFontSize_rem=Math.round(pageBoxFontSizePxNum/Math.round(fontSize)*10000)/10000+"rem";
		pageBoxObj.css("font-size",boxFontSize_rem);//写入font-size
	}
}


//=========判断浏览器类型================
//返回string opera/chrome/safari/firefox/ie7/ie8/ie9/ie10/ie11
function brower(){
	var userAgent = navigator.userAgent,   
		rMsie = /(msie\s|trident.*rv:)([\w.]+)/,   
		rFirefox = /(firefox)\/([\w.]+)/,   
		rOpera = /(opera).+version\/([\w.]+)/,   
		rChrome = /(chrome)\/([\w.]+)/,   
		rSafari = /version\/([\w.]+).*(safari)/;  
	var browser;  
	var version;  
	var ua = userAgent.toLowerCase(); 
	function uaMatch(ua){  
		var match = rMsie.exec(ua);  
		if (match != null) {  
			return { browser : "IE", version : match[2] || "0" };  
		}  
		var match = rFirefox.exec(ua);  
		if (match != null) {  
			return { browser : match[1] || "", version : match[2] || "0" };  
		}  
		var match = rOpera.exec(ua);  
		if (match != null) {  
			return { browser : match[1] || "", version : match[2] || "0" };  
		}  
		var match = rChrome.exec(ua);  
		if (match != null) {  
			return { browser : match[1] || "", version : match[2] || "0" };  
		}  
		var match = rSafari.exec(ua);  
		if (match != null) {  
			return { browser : match[2] || "", version : match[1] || "0" };  
		}  
		if (match != null) {  
			return { browser : "", version : "0" };  
		}  
	} 
	
	var browserMatch = uaMatch(userAgent.toLowerCase());  
	if (browserMatch.browser){  
	browser = browserMatch.browser;  
	version = browserMatch.version;  
	} 
	
	var browserStr;
	if(browser=="IE"){
		browserStr="ie"+Math.floor(version);
	}else{
		browserStr=browser;
	}
	//alert(userAgent);
	return browserStr;
}