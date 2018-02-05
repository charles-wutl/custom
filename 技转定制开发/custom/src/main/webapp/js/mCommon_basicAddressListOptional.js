/*
 * 初始化通讯录列表
 * containerObj:'',//数据写入的容器，jquery类型，必填
 * addressListData:[],//通讯录数据，数组类型，必填
 * 格式如下：
 * addressListData:[
 * {
 * 	imgAddress:'',//头像地址，字符串类型，选填
 * 	name:'',//名字，字符串类型，必填
 * 	company:'',//公司名称，字符串类型，选填
 * 	jobPosition:'',//职位，字符串类型，选填
 * },
 * ]
 * clickCallBack:function(){}//点击每一条数据时的回调函数，选填
 * 
 * */

function mCommon_basicAddressListOptional_dataAnalysis(options){
	var defaults = {
		containerObj:'',//数据写入的容器，jquery类型，必填
		addressListData:[],//通讯录数据，数组类型，必填
		clickCallBack:function(){}//点击每一条数据时的回调函数，选填
	}
	
	//合并参数
	var options = $.extend(true,defaults,options);
	
	var self = this;
	//数据数组
	var dataArr = options.addressListData;
	
	if(!options.containerObj){
		return false;
	}
	
	if(0 == dataArr.length){
		return false;
	}
	//渲染dom
	this.renderDom = function(){
		for(var i=0; i<dataArr.length; i++){
			
			var dataObj = dataArr[i];
			//头像地址
			var imgAddress = dataObj.imgAddress;
			//名字
			var name = dataObj.name;
			//公司
			var company = dataObj.company;
			//职位
			var jobPosition = dataObj.jobPosition;
			
			//头像地址没有就给默认
			if(!imgAddress || null == imgAddress || '' == imgAddress){
				imgAddress = '../../../../../modulev1/portalHtml5/images/mCommon_basicIcon_personalHeadPortrait64.png';
			}
			if(!name || null==name || ''==name){
				return false;
			}
			//dom改用字符串，性能考虑
			var templateStr = '<div class="mCommon_basicAddressListOptional_box borderPx1"><ul class="mCommon_basicAddressListOptional_boxTable"><li class="mCommon_basicAddressListOptional_headPicBox"><img src="'+imgAddress+'"/></li><li class="mCommon_basicAddressListOptional_describeBox"><div class="mCommon_basicAddressListOptional_peopleName textCut">'+name+'</div>';
			
			if(company || jobPosition){
				templateStr += '<div class="mCommon_basicAddressListOptional_companyAndJobPosition textCut">';
				templateStr += '<i>'+company+'</i> <i>'+jobPosition+'</i>';
				templateStr += '</div>';
			}
			templateStr += '</li></ul></div>';
			
			options.containerObj.append(templateStr);
		}
	}
	
	//绑定回调事件
	this.bindEvent = function(){
		options.containerObj.children('div.mCommon_basicAddressListOptional_box').tap(function(){
			options.clickCallBack($(this).index(),$(this));
		})
	}
	
	
	//初始化
	this.init = function(){
		this.renderDom();
		this.bindEvent();
	}
	//执行初始化
	this.init();
}
