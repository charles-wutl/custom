$().ready(function(){
//下拉框
   mCommon_basicSelect({
		boxObj:$(".mCommon_basicSelect01"),//input的容器外层容器，有触发事件，例如：$("#mCommon_basicTreeList_box")
		dataArray:[{val:"val1",str:"選項一"},{val:"val2",str:"選項二"},{val:"val3",str:"選項三"}],//选项的数据，每个选线同时是指是否为有效值，例如：[{val:"val1",str:"选项1"},{val:"val2",str:"选项2"}]
//		defaultObj:{val:"val1",str:"选项1"},//弹出窗的默认值，参数是两级选项字符串的对象，例如{val:"val1",str:"选项1"}
		placeholder:"請選擇",//string,//placeholder文字"请选择"
		disable:false,//不可用
		selectedFun:function(selectObj){//确定按钮的回调函数，参数是两级选项字符串的对象，例如{val:"val1",str:"选项1"}
			//$("title").html(selectObj.val+"/"+selectObj.str);
			setTimeout(function(){alert(selectObj.val+"/"+selectObj.str);},300);//回调参考
		}
	});
	mCommon_basicSelect({
		boxObj:$(".mCommon_basicSelect02"),//input的容器外层容器，有触发事件，例如：$("#mCommon_basicTreeList_box")
		dataArray:[{val:"val1",str:"選項一"},{val:"val2",str:"選項二"},{val:"val3",str:"選項三"}],//选项的数据，每个选线同时是指是否为有效值，例如：[{val:"val1",str:"选项1"},{val:"val2",str:"选项2"}]
//		defaultObj:{val:"val1",str:"选项1"},//弹出窗的默认值，参数是两级选项字符串的对象，例如{val:"val1",str:"选项1"}
		placeholder:"請選擇人员處理下一環節",//string,//placeholder文字"请选择"
		disable:false,//不可用
		selectedFun:function(selectObj){//确定按钮的回调函数，参数是两级选项字符串的对象，例如{val:"val1",str:"选项1"}
			//$("title").html(selectObj.val+"/"+selectObj.str);
			setTimeout(function(){alert(selectObj.val+"/"+selectObj.str);},300);//回调参考
		}
	});
	mCommon_basicSelect({
		boxObj:$(".mCommon_basicSelect03"),//input的容器外层容器，有触发事件，例如：$("#mCommon_basicTreeList_box")
		dataArray:[{val:"val1",str:"選項一"},{val:"val2",str:"選項二"},{val:"val3",str:"選項三"}],//选项的数据，每个选线同时是指是否为有效值，例如：[{val:"val1",str:"选项1"},{val:"val2",str:"选项2"}]
//		defaultObj:{val:"val1",str:"选项1"},//弹出窗的默认值，参数是两级选项字符串的对象，例如{val:"val1",str:"选项1"}
		placeholder:"請選擇人员處理下一環節",//string,//placeholder文字"请选择"
		disable:false,//不可用
		selectedFun:function(selectObj){//确定按钮的回调函数，参数是两级选项字符串的对象，例如{val:"val1",str:"选项1"}
			//$("title").html(selectObj.val+"/"+selectObj.str);
			setTimeout(function(){alert(selectObj.val+"/"+selectObj.str);},300);//回调参考
		}
	});
    //下拉框end
    

})

