/*
 * 选择联系人的显示
 * 三个参数
 * containerObj:'',//放置选中联系人的容器，jquery类型，必填
 * electPersonDataArr:[],//显示选中联系人的数据数组，数组类型，必填
 * 内容格式如下
 * {
 *		selectId:'0001',//选中联系人的id,字符串类型，必填
 *		selectName:'张三'//选中联系人的名字,字符串类型，必填
 *	},
 * listClickCallBack:function(){},//点击每个列表项的回调事件，选填
 * inputClickCallBack:function(){}//点击input的回调事件，选填
 * addDataCallBack:function(){}//添加数据后的回调事件，选填
 * changeCallBack:function(){}//input框内容改变时的回调，选填
 * */
function mCommon_basicSelectedContacts_setSelectedPerson(options){
	//默认参数
	var defaults = {
		containerObj:'',//放置选中联系人的容器，jquery类型，必填
		selectPersonDataArr:[],//显示选中联系人的数据数组，数组类型，必填
		clickCallBack:function(){},//点击每个列表项的回调事件，选填
		listClickCallBack:function(){},//点击每个列表项的回调事件，选填
		inputClickCallBack:function(){},//点击input的回调事件，选填
		addDataCallBack:function(){},//添加单个数据后的回调事件，选填
		addArrCallBack:function(){},//添加数组后的回调事件，选填
		changeCallBack:function(){}//input框内容改变时的回调，选填
	}
	//合并参数
	var options = $.extend(true,defaults,options);
	
	var self = this;
	//容器对象
	var containerObj = options.containerObj;
	//选中的人员数据
	var dataArr = options.selectPersonDataArr;
	//写内容的容器
	var contentObj;
	//input容器
	var inputObj;
	
	//必填校验
	if(!containerObj){
		return false;
	}

	//dom结构渲染
	this.renderDom = function(){
		var template = '<div class="mCommon_basicSelectedContacts_box borderPx1">';
		template += '<div class="mCommon_basicSelectedContacts_boxContent">';
		for(var i=0; i<dataArr.length; i++){
			var dataObj = dataArr[i];
			template += '<div class="mCommon_basicSelectedContacts_selectedPerson borderPx1" id="'+dataObj.selectId+'">';
			template += '<span class="mCommon_basicSelectedContacts_selectedPersonContent textCut">'+dataObj.selectName;
			template += '</span>';
			template += '</div>';
		}
		template += '<input type="text" name="" id="" value="" />';
		template += '</div>';
		template += '</div>';
		//dom添加到指定容器
		containerObj.append(template);
		//有内容时的容器
		contentObj = containerObj.find('.mCommon_basicSelectedContacts_boxContent');
		//没有内容时的容器
		noContentObj = containerObj.find('.mCommon_basicSelectedContacts_noSelectPerson');
		//input容器
		inputObj = containerObj.find('input');
		if(0 == dataArr.length){
			self.showNullSelectPerson();
		}
	};
	//点击选项的事件
	this.clickFun = function(){
		containerObj.find('.mCommon_basicSelectedContacts_selectedPerson').unbind('tap').tap(function(){
			self.removePerson($(this));
			options.clickCallBack($(this).index(),$(this));
		});
	};
	//删除联系人
	this.removePerson = function(domObj){
		domObj.remove();
		self.showNullSelectPerson();
	}
	//置顶搜索框
	this.contactsListTop = function(){
		contentObj.scrollTop(1000);
	}
	//点击input框的事件
	this.inputClickFun = function(){
		var inputObj = contentObj.children('input');
		$(document).keydown(function(e){
			//如果是删除键
			if(8==e.keyCode && inputObj.is(':focus') && ''==$.trim(inputObj.val()) && 0!=inputObj.siblings().length){
				self.removePerson(inputObj.prev());
			}
		})
	};
	//没有联系人时显示未选择联系人
	this.showNullSelectPerson = function(){
		inputObj = contentObj.children('input');
		var personList = inputObj.siblings();
		if(0 == personList.length){
			inputObj.attr('placeholder','请选择联系人');
		}
	}
	//移除Input的占位信息
	this.removePlaceholder = function(){
		inputObj.removeAttr('placeholder');
	}
	//添加一个联系人
	this.addDataForDom = function(dataObj){
		var template2 = '';
		template2 += '<div class="mCommon_basicSelectedContacts_selectedPerson borderPx1" id="'+dataObj.selectId+'">';
		template2 += '<span class="mCommon_basicSelectedContacts_selectedPersonContent textCut">'+dataObj.selectName;
		template2 += '</span>';
		template2 += '</div>';
		contentObj.children('input').before(template2);
		self.clickFun();
		self.removePlaceholder();
		self.contactsListTop();
		options.addDataCallBack(dataObj);
	};
	//添加联系人数组
	this.addArrForDom = function(idArr,nameArr){
		var template3 = '';
		for(var i=0; i<idArr.length; i++){
			template3 += '<div class="mCommon_basicSelectedContacts_selectedPerson borderPx1" id="'+idArr[i]+'">';
			template3 += '<span class="mCommon_basicSelectedContacts_selectedPersonContent textCut">'+nameArr[i];
			template3 += '</span>';
			template3 += '</div>';
		}
		contentObj.children('input').before(template3);
		self.clickFun();
		self.removePlaceholder();
		self.contactsListTop();
		options.addArrCallBack(idArr,nameArr);
	};
	//input输入内容更改时的回调
	this.inputChange = function(){
		inputObj.change(function(){
			var inputVal = inputObj.val();
			options.changeCallBack(inputVal);
		});
	};
	//初始化
	this.init = function(){
		//渲染dom
		this.renderDom();
		//点击每个选中联系人的回调
		this.clickFun();
		//点击input的回调
		this.inputClickFun();
		//input值更改时的回调
		this.inputChange();
	};
	//执行初始化
	this.init();
}

