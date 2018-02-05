/*设置字符串长度，只截取两行，resize时重新计算
 参数为字符串的容器，jquery对象，必填*/
function mCommon_controlLeftPicRightText_setStrIntercept(containerObj) {
    var titleFontSize = parseInt(containerObj.css("font-size"));
    var titleStr = containerObj.text();
//	计算要截取的字符数
    var fontNum = mCommon_controlLeftPicRightText_setStrIntercept_fontNum(containerObj, titleFontSize);
    var newTitleStr = titleStr.subCHStr(0, fontNum);
    containerObj.text(newTitleStr);
    $(window).resize(function () {
        fontNum = mCommon_controlLeftPicRightText_setStrIntercept_fontNum(containerObj, titleFontSize);
        newTitleStr = titleStr.subCHStr(0, fontNum);
        containerObj.text(newTitleStr);
    });
}
//计算要截取的字符数
function mCommon_controlLeftPicRightText_setStrIntercept_fontNum(containerObj, titleFontSize) {
    var boxWidth = containerObj.width();
    var titleOneLineFontCount = parseInt(boxWidth / titleFontSize);
    var fontNum = parseInt(titleOneLineFontCount * 2 * 2 * 0.7);
    return fontNum;
}