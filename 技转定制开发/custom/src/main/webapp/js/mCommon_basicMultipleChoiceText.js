/*多选，页面需要有dom结构，
*全选按钮可以有或无
*全选按钮样式名称checkAll，选中状态样式名称mCommon_basicMultipleTextItemSelected，不可点击状态mCommon_basicMultipleTextItemDisabled，
*回调callback(selectedItemArray)参数是所有选中状态的li的jq对象
*全选回调 callbackCheckAll($(this),callbackParameterB)参数是全选按钮的jq对象和所有选中状态li的jq对象
*/
function mCommon_basicMultipleChoiceText(obj,callback,callbackCheckAll){//参数是选项的外层容器，jq对象a；选项回调；全选按钮回调
	obj.each(function(){
		var thisObj=$(this);
		var checkAll=thisObj.find(".checkAll");//全选按钮
		var multipleItemArray=thisObj.find("li").not($(".checkAll,.mCommon_basicMultipleTextItemDisabled"));//除全选按钮和不可选项外的所有的选项
		
		//点击可选项
		multipleItemArray.tap(function(){
			var currentItem=$(this);
			var selectedItem=currentItem.hasClass("mCommon_basicMultipleTextItemSelected");//选中项
			var disabledItem=currentItem.hasClass("mCommon_basicMultipleTextItemDisabled");//不可选项
			if(!selectedItem && !disabledItem){
				currentItem.addClass("mCommon_basicMultipleTextItemSelected"); //当前选中状态
			}else{
				currentItem.removeClass("mCommon_basicMultipleTextItemSelected"); //去掉当前选中状态

}
			checkAllBtn();//全选按钮状态
			
			var selectedItemArray = thisObj.find(".mCommon_basicMultipleTextItemSelected");
			try{
                callback(selectedItemArray);//回调,参数为所有选中状态的li的jq对象
            }
			catch (e) {
			}
		});
		//全选按钮状态，全选或全不选
		function checkAllBtn(){
//			可选个数是否与已选个数相等
			if(multipleItemArray.length==thisObj.find(".mCommon_basicMultipleTextItemSelected").not($(".checkAll,.mCommon_basicMultipleTextItemDisabled")).length){
				checkAll.addClass("mCommon_basicMultipleTextItemSelected"); 
			}else{
				checkAll.removeClass("mCommon_basicMultipleTextItemSelected"); 
			}
		}
		//点击全选按钮
		checkAll.tap(function(){
			if($(this).hasClass("mCommon_basicMultipleTextItemSelected")){
				thisObj.find("li").removeClass("mCommon_basicMultipleTextItemSelected")
			}else{
				multipleItemArray.addClass("mCommon_basicMultipleTextItemSelected");
				$(this).addClass("mCommon_basicMultipleTextItemSelected");
			}
			
			var callbackParameterB=thisObj.find(".mCommon_basicMultipleTextItemSelected").not($(".checkAll,.mCommon_basicMultipleTextItemDisabled"));
			try{
                callbackCheckAll($(this),callbackParameterB);//回调,参数是全选按钮 和所有选中状态li的jq对象
            }
			catch (e) {
			}
		})
	
	})
}

