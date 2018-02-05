/*单选，页面需要有dom结构，<ul><li><span></span></li></ul>
*选中状态 mCommon_basicSingleItemSelected，
*不可点击状态mCommon_basicSingleItemDisabled，
*参数：
*第一个：选项的外层容器，jq对象
*第二个：cancelSelected当选项为选中状态，二次点击该选项，取消selected状态；ture||false
*第三个：回调callback(currentItem)参数是当前点击的jq对象
*/
function mCommon_basicSingleChoice(obj,cancelSelected,callback){//参数是选项的外层容器，jq对象；二次点击取消select状态；回调
	obj.each(function(){
		var singleItemArray=$(this).find("li");//所有的选项
		singleItemArray.tap(function(){
			var currentItem=$(this);
			var selectedItem=currentItem.hasClass("mCommon_basicSingleItemSelected");//选中项
			var disabledItem=currentItem.hasClass("mCommon_basicSingleItemDisabled");//不可选项
			//当前选项为不可选状态
			if(disabledItem){
				return
			}
			//当前选项为非选中和非不可选状态时
			if(!selectedItem && !disabledItem){
				singleItemArray.removeClass("mCommon_basicSingleItemSelected");//去掉其他选中状态
				currentItem.addClass("mCommon_basicSingleItemSelected");//当前选中状态
				
			}
			//如果设置cancelSelected,当选项为选中状态时，二次点击该选项，取消selected状态
			if(cancelSelected){
				if(selectedItem){
					currentItem.removeClass("mCommon_basicSingleItemSelected")
				}
			}
							
			try{
                callback(currentItem);//回调
            }
            catch(e){}
		})
	})
	
}
