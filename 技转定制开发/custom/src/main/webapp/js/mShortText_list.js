/*设置每个缩略图的高度，用来占位，再拉下时候出现正确位置
 一个参数：jquery数组,图片最外层容器，页面定义
 * */
function mShortText_list_setPicHeight(picBoxArr){
	var onePicBoxWidth = picBoxArr.find("p").first().width();
	picBoxArr.find("p").height(onePicBoxWidth);
}
