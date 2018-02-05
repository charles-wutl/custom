$().ready(function(){
	//创建一条dom，参数为对象，例如{filedType:'select',filedTitle:'交辦給',filedPlaceholder:'請選擇',filedValue:'',filedDescript:'',errorMsg:'错误提示错误提示',required:false}，返回值为一条dom，jq对象
	function mCrm_todolistpage_addtodoList_creatItem(dataObj,i){
		var dombox = $('<ul class="mCommon_controlFormGroup_item">'+
						   '<li class="mCommon_controlFormGroup_item_lable wordBreak">'+dataObj.filedTitle+'</li>'+
						   '<li class="mCommon_controlFormGroup_item_input"></li>'+
						   '<li class="mCommon_controlFormGroup_item_error wordBreak" style="display:none">'+dataObj.errorMsg+'</li>'+
					    '</ul>');
		if(dataObj.required){
			dombox.find('.mCommon_controlFormGroup_item_lable').prepend($('<i class="font_red">*</i>')); 
		};
		if(dataObj.filedType=='select'){
			dombox.addClass('mCommon_controlFormGroup_itemError');
			var domcontent=$('<div class="mCommon_basicSelect mCrm_todolistpage_addtodoList_select'+i+'">'+
								'<img src='+ctxPath+'/images/mCommon_basicSelect_icon.png>'+
							 '</div>');			  
		}else if(dataObj.filedType=='calendar'){
			dombox.addClass('mCommon_controlFormGroup_itemError');
			var domcontent=$('<div class="mCommon_basicInputDatetime clearfixOverflow" >'+
								'<input type="text" placeholder="'+dataObj.placeholder+'" class="scroller" >'+
								'<img src='+ctxPath+'/images/mCommon_basicDate_icon.png>'+
							  '</div>');
		}else if(dataObj.filedType=='text'){
			var domcontent=$('<div class="mCommon_basicInputTel">'+
									'<input placeholder="'+dataObj.placeholder+'" type="text">'+
							'</div>')
		}else if(dataObj.filedType=='pic'){
			dombox.find('.mCommon_controlFormGroup_item_lable').append($('<i class="font_littlegray">'+dataObj.filedDescript+'</i>'));
			var domcontent=$('<div style="height: 10px;"></div>'+
								'<a class="mCommon_basicUploadBtn" tapclass="mCommon_basicUploadBtn_tapClass" style="position: relative; overflow:hidden">'+
									'<em>+</em><i>點擊上傳</i>'+
									'<input type="file" style="width:600px;height:40px;opacity :0; background-color: #fff; overflow:hidden;font-size:600px;position:absolute; top:0px; left:0px; right:0px;bottom:0px;margin:0; padding:0;z-index:2;zoom:1;">'+
								'</a>')
		}else if(dataObj.filedType=='textarea'){
		    var domcontent=$('<div class="mCommon_basicTextArea">'+
							    '<textarea placeholder="'+dataObj.placeholder+'"></textarea>'+
						     '</div>')
		}
		dombox.find('.mCommon_controlFormGroup_item_input').append(domcontent);
		return dombox;
	};
	//将数据插入dom中，参数为数组，无返回值
	function mCrm_todolistpage_addtodoList_appendData(dataArray){
		for(var i=0;i<dataArray.length;i++){
			$('.mCommon_controlFormGroup_box').append(mCrm_todolistpage_addtodoList_creatItem(dataArray[i],i));
			if(dataArray[i].filedType=='select'){
				mCommon_basicSelect({
					boxObj:$('.mCrm_todolistpage_addtodoList_select'+i+''),//input的容器外层容器，有触发事件，例如：$("#mCommon_basicTreeList_box")
					dataArray:dataArray[i].popupArray,//选项的数据，每个选线同时是指是否为有效值，例如：[{val:"val1",str:"选项1"},{val:"val2",str:"选项2"}]
			//		defaultObj:{val:"val1",str:"选项1"},//弹出窗的默认值，参数是两级选项字符串的对象，例如{val:"val1",str:"选项1"}
					placeholder:dataArray[i].placeholder,//string,//placeholder文字"请选择"
					disable:false,//不可用
					selectedFun:function(selectObj){//确定按钮的回调函数，参数是两级选项字符串的对象，例如{val:"val1",str:"选项1"}
						//$("title").html(selectObj.val+"/"+selectObj.str);
						setTimeout(function(){},300);//回调参考
					}
				});	
			}
		}
			
	};

	mCrm_todolistpage_addtodoList_appendData(mCrm_todolistpage_addtodoList_Data);


	/*
	 * 第一个参数为一个jquery对象，input输入框上层的div
	 * 第二个参数是日期时间，有三个参数：datetime/date/time
	 * 第三个参数是日期对象，即日期时间默认值
	 * 第四个参数是分钟步长设置
	 * 第五个参数是小时步长设置
	 */
    mCommon_basicInputDatetime_init($('.scroller'),'datetime'/*,new Date(2013,11,21,14,51)*/);

})

