$().ready(function(){
///商品列表
//字符截取
$(".mCommon_basicShopListItem_info h3").each(function(){
	var oldString=$(this).text();
	var newString=oldString.subCHStr(0,44);//开始字符index值，截取数量（英文字符数）
	$(this).html(newString);
})
$(".mCommon_basicShopList_specification").each(function(){
	var oldString=$(this).text();
	var newString=oldString.subCHStr(0,80);//开始字符index值，截取数量（英文字符数）
	$(this).html(newString);
})
//字符截取end	
///商品列表end



////頭部下拉簽

var dataArr = [
	
	{
		tabType:"dropDownTab",//标签类型,textTab为文字标签，dropDownTab为下拉标签，sortTab为排序标签，imgTab为图片标签
		text:"新品",//标签显示的内容
		state:"normal",//选中状态，shrink激活有浮层状态，stretch激活无浮层状态,normal正常状态
		imgState:"",//用于图片类型的浮层展开关闭状态
		imgArr:[],//图片地址，只有在图片标签下才会解析
		id:"dropDownTabId1"//唯一标识
	},
	{
		tabType:"dropDownTab",//标签类型,textTab为文字标签，dropDownTab为下拉标签，sortTab为排序标签，imgTab为图片标签
		text:"全部",//标签显示的内容
		state:"normal",//选中状态，shrink激活有浮层状态，stretch激活无浮层状态,normal正常状态
		imgState:"",//用于图片类型的浮层展开关闭状态
		imgArr:[],//图片地址，只有在图片标签下才会解析
		id:"dropDownTabId2"//唯一标识
	},	
	{
		tabType:"imgTab",//标签类型,textTab为文字标签，dropDownTab为下拉标签，sortTab为排序标签，imgTab为图片标签
		text:"图片标签图片标签",//标签显示的内容
		state:"1",//要显示的图片下标，number类型，从0开始
		imgState:"normal",//用于图片类型的浮层展开关闭状态，shrink激活有浮层状态，normal正常状态
		imgArr:[
			"../images/mCommon_jsFilterSearchNormal.png",
			"../images/basicIcon_commentBad.png",
			"../images/basicIcon_arrayUp.png"
		],//当类型为3的时候才会解析图片地址和默认显示图片
		id:"imgTabId1"//唯一标识
	}
	
];


var mCommon_basicFilterBlend_setBlendTabObj = new mCommon_basicFilterBlend_setBlendTab({
	containerObj:$('#divId'),//默认容器是body
	dataArr:dataArr,//数据
	callBack:function(id,currentObj){
//	console.log(id);
//	console.log(currentObj);
		
	}//回调函数
});

$("#divId").find("li").click(function(){
	var tabType = $(this).attr("tabType");
	var state = $(this).attr("state");
	var imgState = $(this).attr("imgState");
	if("dropDownTab" == tabType){
		if("shrink" == state){
			mCommon_basicFilterBlend_setBlendTabObj.setTabState($(this),"stretch");
		}else{
			mCommon_basicFilterBlend_setBlendTabObj.setTabState($(this),"shrink");
		}
	}else if("imgTab" == tabType){
		if("shrink" == imgState){
			mCommon_basicFilterBlend_setBlendTabObj.setTabState($(this),"0","normal");
		}else{
			mCommon_basicFilterBlend_setBlendTabObj.setTabState($(this),"2","shrink");
		}
	}
	$(this).siblings().each(function(){
		if("imgTab" == tabType){
			mCommon_basicFilterBlend_setBlendTabObj.setTabState($(this),"0","normal");
		}else{
			mCommon_basicFilterBlend_setBlendTabObj.setTabState($(this),"normal");
		}
	})
});

////頭部下拉簽end







})

$().ready(function(){
	var test=new mCommon_jsFixedTop({
		fixedObj:$(".test"),
		//position:"fixed"//定位方式"fixed"或是"absolute" 默认fixed
	});//实例
})

//数据加载方法模拟===============
//模拟开发 写入数据
function appendDate(box){//参数：append的容器
		var haveMoreData=true;//是否还有更多数据
		var maxNum=10;//最多新闻条数
		var eachNum=5; //每次加载数量
		var listItem=$(
			'<!--商品列表1-->'+
				'<div class="mCommon_basicShopListItem clearfixOverflow" tapclass="mCommon_basicShopListItem_tapClass">'+
					'<div class="mCommon_basicShopListItem_imgAndInfo">'+
						'<div class="mCommon_basicShopListItem_img">'+
							'<img src="../images/pictureAlbum.png">'+
						'</div>'+
						'<div class="mCommon_basicShopListItem_info">'+
							'<h2>0.71"Graphic OLED</h2>'+
							'<p class="mCrm_productsinfo_productsList_content_list">'+
								'<span class="textred">48x64</span>'+
							'</p>'+
							'<p class="mCrm_productsinfo_productsList_content_list">'+
								'<img src="../images/mCommon_basicIcon_praise.png">'+
								'98%'+
							'</p>'+
						'</div>'+
					'</div>'+
				'</div>'+
				'<!--商品列表1end-->'+
				'<!--商品列表2-->'+
				'<div class="mCommon_basicShopListItem clearfixOverflow" tapclass="mCommon_basicShopListItem_tapClass">'+
					'<div class="mCommon_basicShopListItem_imgAndInfo">'+
						'<div class="mCommon_basicShopListItem_img">'+
							'<img src="../images/pictureAlbum.png">'+
						'</div>'+
						'<div class="mCommon_basicShopListItem_info">'+
							'<h2>小磨坊 白胡椒粉</h2>'+
							'<p class="mCrm_productsinfo_productsList_content_list">'+
								'<span class="textred">30g</span>'+
							'</p>'+
							'<p class="mCrm_productsinfo_productsList_content_list">'+
								'<img src="../images/mCommon_basicIcon_praise.png">'+
								'98%'+
							'</p>'+
						'</div>'+
					'</div>'+
				'</div>'+
				'<!--商品列表2end-->'+
				'<!--商品列表3-->'+
				'<div class="mCommon_basicShopListItem clearfixOverflow" tapclass="mCommon_basicShopListItem_tapClass">'+
					'<div class="mCommon_basicShopListItem_imgAndInfo">'+
						'<div class="mCommon_basicShopListItem_img">'+
							'<img src="../images/pictureAlbum.png">'+
						'</div>'+
						'<div class="mCommon_basicShopListItem_info">'+
							'<h2>可口可樂-易開關250ml行段</h2>'+
							'<p class="mCrm_productsinfo_productsList_content_list">'+
								'<span class="textred">24入</span>'+
							'</p>'+
							'<p class="mCrm_productsinfo_productsList_content_list">'+
								'<img src="../images/mCommon_basicIcon_praise.png">'+
								'98%'+
							'</p>'+
						'</div>'+
					'</div>'+
				'</div>'+
				'<!--商品列表3end-->'




			);
	//	for(var i=0;i<eachNum;i++){//写入30条数据
			box.append(listItem.clone());
	//	}
		$('.mCommon_basicShopListItem.clearfixOverflow').on("click",function () {
			window.open("http://180.167.0.42:8088/demo/crm/productsinfo/productsInfo","_self");
        })
		if(maxNum <= box.find(".mCommon_basicShopListItem").length){//已有条数和最大值比较
			haveMoreData=false;
		}
		return haveMoreData;//返回是否还有更多数据
}

//模拟开发 数据请求
//var nextPageNumber=0;//请求页号累计
function dataLoad(funRefresh,box){//参数：刷新方法，append的容器
//	nextPageNumber++;//请求页号累加
//	var data_= {//请求时传入的数据
//		"nextPageNumber":nextPageNumber,//请求的页号
//		'pageMaxSize':5//每次请求的条数
//	};
//	$.ajax({
//		url :"http://portal.g2work.com/navigation/getPersonList.json",
//		dataType :'JSON',
//		type :'POST',
//		data : data_,
//		async : false,
//		success : function(result){
//			var totalNum=result.page.totalPageSize;//总页数
//			var currentNum=result.page.currentPageNumber;//当前页号
//	    	var hoveMoreData=appendDate(box);//数据写入页面方法,返回是否还有更多数据
//
//			console.log(totalNum > currentNum);
//			console.log(totalNum + ">" + currentNum);
//			console.log("nextPageNumber"+nextPageNumber);
//			funRefresh(totalNum > currentNum);//关键 参数是否有更多数据======
//			//alert(data_.nextPageNumber);
//		}
//	});

	setTimeout(function(){//模拟返回数据返回成功
        var hoveMoreData=appendDate(box);//数据写入页面方法,返回是否还有更多数据
        funRefresh(hoveMoreData);//关键 参数是否有更多数据======
	},2000);
}


$().ready(function(){
	
//关键方法========================
/*滑到底部加载数据
 列表内容中的图片要有高度，因为图片不会同步加载过来，否则列表盒子找不到高度
 初始化加载数据后，如果不满一屏且还有数据就再加载数据直到盛满一屏；
 */
	var listBox=$(".mCommon_basicShopList").eq(0);//列表容器
	var pullUp=new mCommon_controlPullUpLoad({ //实例化上拉类
		    	//loadingDiv:$('<p class="mCommon_jsPullToRefresh_loading"><img class="mCommon_jsPullToRefresh_loading_icon"  src="../images/mCommon_basicIcon_loading.png"/>加载中</p>'),//加载中显示的jq对象
	 	        //noneMoreDiv:$("<p class='mCommon_jsPullToRefresh_noneMore'>没有更多内容</p>"),//没有更多内容显示的jq对象
				listOuterBox:listBox,//jquery对象,列表外容器容器，找底边位置用
				loadLineUpY:-20,//int型 加载触发线的向上偏移量 ,初始值是列表外容器底边为触发线,如果底部有fixed按钮,这个值就是按钮的高度+10
				loadData:function(){//加载数据回调,有数据执行 this.refresh(true);没有数据执行 this.refresh(false);
					dataLoad(this.refresh,listBox);//数据请求模拟 参数：删除圆球方法，append的容器
				}
			});
//关键方法end========================
	
});

