/*多选／单选
 dataArray=[
 {name:"选项1",id:"001",state:"selected"},
 {name:"选项2",id:"002",state:"disabled"},
 {name:"选项3",id:"003",state:"normal"},
 {name:"选项4",id:"004"}
 ]

 状态：选填，默认是"normal", 可能的值"selected"/"disabled"/"normal"
 state:"selected"/"disabled"/"normal"

*/


function mCommon_basicSelectBtn(options){
	this.setting = {
		$appendBox: null,//写入的容器,必填
		dataArray: [],//选项的数组，必填
		maxChoice:null,//最多选择数量，数值，默认为选项数量，就是多选，单选是1
		exceedsMaxChoiceFun:function(){//超过了选择的最大数量，maxChoice:1(单选)不生效
		},
		tapFun: function (id) {//点击事件，回调是点击的id
		}
	};
	options = options || {};
	$.extend(true, this.setting, options);
	this.setting.dataArray=options.dataArray;//数组赋值，以免被打断
	var self = this;

	//定义变量＝＝＝＝
	if(!this.setting.maxChoice){//如果没传数量
		this.setting.maxChoice=this.setting.dataArray.length;//数组长度
	}
	var optionItemDemo=$('<li class="borderPx1 mCommon_basicSelectBtn_list_item">'+
		'<span class="mCommon_basicSelectBtn_list_item_text"></span>'+
		'</li>');
	var optionBox=$('<ul class="mCommon_basicSelectBtn_list"></ul>');//选项列表盒子
	var disableClass="mCommon_basicSelectBtn_list_itemDisabled";
	var selectedClass="mCommon_basicSelectBtn_list_itemSelected";

	//方法定义＝＝＝＝

	//组装dom
	this.createDom=function(){
		var array=this.setting.dataArray;//数据数组
		for(var i in array){
			var item=optionItemDemo.clone();//一个选项的dom
			var dataItem=array[i];//一个选项的数据
			item.find("span").text(dataItem.name);//写入名字
			item.attr("id",dataItem.id);//写入id
			var itemState=dataItem.state || "normal" ;//状态默认为 'normal'

			this.setState(item,itemState);//改为相应状态

			//挂事件
			item.bind("tap.mCommon_basicSelectBtn",function(){
				var id=$(this).attr("id");//取点击的id
				var state=self.getState($(this));//取状态



				switch (state) {
					case "disabled"://如果点击的是不可用状态
						//什么都不执行
						break;
					case "normal"://如果点击的是常规状态
						self.setState($(this),"selected");//置为选中状态
						break;
					case "selected"://如果点击的是选中状态
						self.setState($(this),"normal");//置为常规状态
						break;
					default:
				}
				try{
					self.setting.tapFun(id,self);//点击的回调函数
				}catch(e){}

				//console.log("点击按钮＝＝＝＝");
				//console.log(self.setting.dataArray);

			});

			optionBox.append(item);//一个选项写入列表容器
		}
		return optionBox;//返回构造好的dom
	};

	//设置状态
	this.setState=function($item,state){//参数是jq对象,状态，state:"selected"/"disabled"/"normal"

		var $oldSelectedItem=$item.siblings("."+selectedClass);//同辈元素中有选中的元素
		if(this.setting.maxChoice==1){//如果最多选择一个，就是单选
			$oldSelectedItem.attr("state","normal");//写入normal状态
			$oldSelectedItem.attr("class","borderPx1 mCommon_basicSelectBtn_list_item");//写入normal class
			$oldSelectedItem.each(function(){//轮询修改数据

				var $item=$(this);
				var dataItem=self.findDataObjById($item.attr("id"));//找到数据对象

				dataItem.state="normal";//修改数据状态,为normal
			});


		}else if($oldSelectedItem.length >=this.setting.maxChoice){//如果超过了选择数量
			try{
				this.setting.exceedsMaxChoiceFun();//超过选择最大数量的回调
			}catch(e){}
			return;
		}

		$item.attr("state",state);//写入状态

		var dataItem=this.findDataObjById($item.attr("id"));//找到数据对象

		dataItem.state=state;//修改数据状态


		$item.attr("class","borderPx1 mCommon_basicSelectBtn_list_item");//写入normal class
		if(state=="selected"){//如果是选中状态
			$item.addClass(selectedClass);//加入选中class

		}else if(state=="disabled"){//如果是不可用状态
			$item.addClass(disableClass);//加入不可用class
		}
		//解决华为手机选不中问题
		$item.css({"-webkit-transform":"rotateY(360deg)"});
	};

	//全部设置为normal状态，disable除外
	this.setNormalAll=function(){
		var options=optionBox.find(".mCommon_basicSelectBtn_list_item");//所有选项
		options.each(function(){
			var $item=$(this);//一个选项
			if(self.getState($item)=="selected"){//如果是选中状态
				self.setState($item,"normal");//修改状态
			}
		});

	};

	//取一个选项的状态 返回状态state:"selected"/"disabled"/"normal"
	this.getState=function($item){//参数是jq对象
		return $item.attr("state");//返回状态
	};

	//通过id找jq对象
	this.findJqObjById=function(id){//参数是id，返回jq对象
		return this.setting.$appendBox.find("#"+id);//返回jq对象
	};

	//通过id找数据对象
	this.findDataObjById=function(id){//参数是id，返回jq对象
		var array=this.setting.dataArray;//数据数组
		var dataObj;
		for(var i in array){
			if(array[i].id==id){
				dataObj=array[i];
				break;
			}
		}

		return dataObj;//返回数据对象
	};

	//初始化方法
	this.init=function(){
		//console.log("进入按钮＝＝＝＝");
		//console.log(this.setting.dataArray);

		this.createDom();//组装dom;
		this.setting.$appendBox.append(optionBox);//选项列表写入页面
	};

	//执行＝＝＝＝
	this.init();
}

