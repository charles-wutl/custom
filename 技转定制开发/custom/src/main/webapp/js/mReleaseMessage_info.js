/*
 * 最近联系人下
 * 多个人名一行截取给定最大宽度
 * 参数是每一个最近联系人的jquery对象
 * */

function mReleaseMessage_info_cSetConctactsGroupRange(containerObj){
	var itemW = containerObj.width();
	var imgBoxW = parseInt(containerObj.children('.mReleaseMessage_info_cItemImgBox').outerWidth());
	var numbersBoxW = Math.ceil(containerObj.children('.mReleaseMessage_info_cItemNumbersBox').outerWidth(true)) + 2;
	var namesBoxW = itemW - imgBoxW - numbersBoxW - 26;
	containerObj.children('.mReleaseMessage_info_cItemNamesBox').css('max-width',namesBoxW);
}




