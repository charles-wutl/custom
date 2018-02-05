 /*
  弹窗选择
  参数：
	{   
		boxObj:jqObj,//input的容器外层容器，有触发事件，例如：$("#mCommon_basicTreeList_box")
		dataArray:array,//选项的数据，每个选线同时是指是否为有效值，例如：[{val:"val1",str:"选项1"},{val:"val2",str:"选项2"}]
		defaultObj:Obj,//弹出窗的默认值，参数是两级选项字符串的对象，例如{val:"val1",str:"选项1"}
		placeholder:string,//placeholder文字"请选择"
		disable:false,//不可用
		selectedFun:function,//确定按钮的回调函数，参数是两级选项字符串的对象，例如{val:"val1",str:"选项1"}
		//add 17-02-16 by cocoa
  		cancelText :string,//取消按钮文本
  		setText :string,//确定按钮文本
	}
 */
  	function mCommon_basicSelect(obj) { //{boxObj:jqObj,dataArray:array,defaultArray:array,placeholder:string,selectedFun:function}

        	obj.cancelText = obj.cancelText || mCommonLang({"zh_CN":"取消","zh_TW":"取消","en_US":"Cancel"});;//add 17-02-16 by cocoa  取消按钮文本
        	obj.setText = obj.setText || mCommonLang({"zh_CN":"确定","zh_TW":"確定","en_US":"OK"});;//add 17-02-16 by cocoa  确定按钮文本
  		    var box=obj.boxObj;//盒子容器
  		    
  		    box.unbind("tap.mCommon_basicSelect");//解绑原有事件
  		    
  		    if(box.find(">ul").length>0){
  		    	 box.find(">ul").remove();//删除原有的dom
  		    }
  		   if(box.find(">input").length>0){
  		  	  box.find(">input").remove();//删除原有的dom
			}

			/**取默认值**/
			var defauleOptIndex=0;//选项的默认值的index
			if(obj.defaultObj!=undefined && obj.defaultObj!=null){
				var defauleOptVal=obj.defaultObj.val;//选项的默认值
				var defauleOptStr=obj.defaultObj.str;//选项的默串
			}
			 
			/*是否可用*/
			var disable = false;//不可用，默认为false
			if(obj.disable){//不可用是否有值
				disable = true;//不可用
			}
			var placeholder="请选择";//placeholder默认值
			if(obj.placeholder){
				placeholder=obj.placeholder;
			}



			/**dom结构**/
			var optArray=obj.dataArray;//一级选项数组
        	var optBox=$("<ul></ul>"); //所有选项的最大容器
			var optHtml = $('<li></li>');//一级选项html结构
			for(var i=0;i<optArray.length;i++){//opt的循环
				var optObj = optArray[i]; //选项
				var optContent = optObj.str; //选项string
				var optVal= optObj.val; //选项val
				if(obj.defaultObj!=undefined && obj.defaultObj!=null){
					if(defauleOptVal==optVal){//当前val 如果和默认值val相等 
						defauleOptIndex=i;//设置默认的index值
					}
				}
				var optHtmlClone = optHtml .clone();//选项html容器
				optHtmlClone.prepend(optContent);//选项写入内容
				optHtmlClone.attr("optValue",optVal);//选项写入optValue标签
				optHtmlClone.appendTo(optBox);//构造的选项dom写入页面
			}
			box.append(optBox); //所有选项 写入页面
        	/**dom结构end**/
        	
        	
        	
        	/**mobiscroll初始化**/
            var myMobile=box.find(">ul").mobiscroll().treelist({//obj.boxObj为容器对象
            	cancelText:obj.cancelText, //取消按钮文字
            	setText:obj.setText, //确定按钮文字
                lang:'zh', //语言              
                closeOnOverlay:true, //true点击黑色浮层任意位置关闭,false点击黑色浮层任意位置不关闭
                disabled:disable,//false输入框点击没反应，true输入框点击出现日期弹层
                maxWidth:290, //最大宽度
                minWidth:200, //最小宽度
                height:40, //显示时间的高度
	            rows: 3,//显示三行
                theme: 'android-holo-light',
                display: 'modal',  
                onShow:function(html){//弹出窗时
                  	setTimeout(function(){//解决华为手机弹窗变蓝问题
           				$(html).find("*").blur();//弹出的div 失去焦点
           			},300);
                },
                placeholder:placeholder,
//                headerText: "请选择日期",//选择结果写入头部
				onClose:function(selectText,inst){//关闭浮层，valueText是结果字符串，inst是按钮文字
					if(inst=="set"){//点击确定按钮
							var selectedArray=arguments[2]._tempWheelArray;//取当前选中索引[2]
							var selectedStr=optBox.find('>li').eq(selectedArray[0]).text();//选项的文字
							var selectedVal=optBox.find('>li').eq(selectedArray[0]).attr("optValue");//选项的value值
							var selectedObj={str:selectedStr,val:selectedVal};//选中的选项 obj
							try{
								obj.selectedFun(selectedObj);//传入参数的 回调函数
							}catch(e){}

}
				},
                defaultValue:[defauleOptIndex],//浮出层的默认值
				formatValue:function (array) { //自定义格式结果  
					return optBox.find('>li').eq(array[0]).text() ;  
				} 
            });   
            /**mobiscroll初始化end**/
           
           
           //input里写入默认值
           if(obj.defaultObj!=undefined && obj.defaultObj!=null&&obj.defaultObj!=""){
            	var length  = Object.keys(obj.defaultObj).length;//对象的key value对数量
	            if(length > 0){//默认值不是空对象
	                    box.find("input").val(obj.defaultObj.str);
               	}
           }
            
           //整个div出现选项
           box.bind("tap.mCommon_basicSelect",function(){
           		myMobile.mobiscroll('show');//点击出现选项
//         		setTimeout(function(){
//         			$(".dw-modal *").blur();
//         		},300);
           });		            
        }   







// \/old \/ ===========================================================
    	
		function mCommon_basicTreeList_init(obj,dateArr,defaultArray) { //{boxObj:jqObj,dataArray:array,defaultArray:array,selectedFun:function}
			
        	/**dom结构**/
			var opt1LiHtml = $('<li><ul></ul></li>');
			var opt2LiHtml = $('<li></li>');
			
			for(var i=0;i<dateArr.length;i++){
				var opt1 = dateArr[i].dates; //string
				var opt2Arr = dateArr[i].times; //array
				var opt1LiHtmlClone = opt1LiHtml.clone();
				opt1LiHtmlClone.prepend(opt1);
				opt1LiHtmlClone.attr("data-val",opt1);//第一层加入属性
				for(var j=0;j<opt2Arr.length;j++){
					var opt2LiHtmlClone = opt2LiHtml.clone();
					opt2LiHtmlClone.attr("data-val",opt2Arr[j]);//第二层加入属性
					opt2LiHtmlClone.append(opt2Arr[j]);
					opt2LiHtmlClone.appendTo(opt1LiHtmlClone.find("ul"));
				}
				opt1LiHtmlClone.appendTo(obj);
			}
        	
        	/**初始化**/
            obj.mobiscroll().treelist({   
            	cancelText:'取消按钮', //取消按钮文字
            	setText:'確定按钮', //确定按钮文字
                lang:'zh', //语言              
                closeOnOverlay:false, //true点击黑色浮层任意位置关闭,false点击黑色浮层任意位置不关闭
                disabled:false,//false输入框点击没反应，true输入框点击出现日期弹层
                maxWidth:200, //最大宽度
                minWidth:100, //最小宽度
                height:40, //显示时间的高度
                rows: 3,
                theme: 'android-holo-light',
                display: 'modal',             
                placeholder:'请选择日期',
                inputClass:'ww',
                defaultValue:defaultArray,
                formatResult: function (array) { //返回自定义格式结果  
 			       		
                }
            });   
        }
