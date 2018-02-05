/*设置上图下文时字符长度，2行做截取,参数是上图下文字符容器
 * */
function mPicTextPush_list_setTitleLineStrIntercept(containerObj){
	var titleFontSize = 16;
	var titleStr = containerObj.text();
	var titleTextLength = mPicTextPush_list_getFontCount(containerObj,titleFontSize);
	var newTitleStr = titleStr.subCHStr(0,titleTextLength);
	containerObj.text(newTitleStr);
	$(window).resize(function(){
		titleTextLength = mPicTextPush_list_getFontCount(containerObj,titleFontSize);
		newTitleStr = titleStr.subCHStr(0,titleTextLength);
		containerObj.text(newTitleStr);
	});
}
function mPicTextPush_list_getFontCount(obj,fontSize){
	var boxWidth = obj.width();
	var fontCount = parseInt(boxWidth/fontSize);
	var strInterceptLength = parseInt(fontCount*2*2*0.7);
	return strInterceptLength;
}

/*设置左图右文/右图左文时字符长度，2行做截取,参数是字符容器
 * */
function mPicTextPush_list_setContentLineStrIntercept(contentStrObj){
	var contentFontSize = 12;
	var contentStr = contentStrObj.text();
	var contentTextLength = mPicTextPush_list_getFontCount(contentStrObj,contentFontSize);
	var newContentStr = contentStr.subCHStr(0,contentTextLength);
	contentStrObj.text(newContentStr);
	$(window).resize(function(){
		contentTextLength = mPicTextPush_list_getFontCount(contentStrObj,contentFontSize);
		newContentStr = contentStr.subCHStr(0,contentTextLength);
		contentStrObj.text(newContentStr);
	})
}
