/*设置全部群组描述字符长度，2行做截取,参数是 描述容器
 * */
function mCommon_basicAllGroupItem_setDescLength(allGroupArr){
    //字符串字体大小
    var titleFontSize = 12;
    allGroupArr.each(function(){
        var groupDescObj = $(this).find('.mCommon_basicHotGroupItem_describe');
        //热门群组描述的字符串
        var groupDescStr = groupDescObj.text();
        groupDescObj.attr('title',groupDescStr);
        //计算截取多长字符串
        var titleTextLength = mCommon_basicAllGroupItem_getFontCount(allGroupArr,titleFontSize);
        var newTitleStr = groupDescStr.subCHStr(0,titleTextLength);
        groupDescObj.text(newTitleStr);
    })

    $(window).resize(function(){
        allGroupArr.each(function(i,o){
            var groupDescObj = $(this).find('.mCommon_basicHotGroupItem_describe');
            var groupDescStr = groupDescObj.attr('title');
            //计算截取多长字符串
            var titleTextLength = mCommon_basicAllGroupItem_getFontCount(allGroupArr,titleFontSize);
            var newTitleStr = groupDescStr.subCHStr(0,titleTextLength);
            groupDescObj.text(newTitleStr);
        })
    });
}
function mCommon_basicAllGroupItem_getFontCount(allGroupArr,fontSize){
    var hotGroupObj = allGroupArr.first();
    var parentObj = $('.mCommon_frameContent0_content');
    if(0 == parentObj.length){
        return false;
    }
    var bigW = parentObj.width();
    var boxWidth = bigW - 89 - 73;
    var fontCount = parseInt(boxWidth/fontSize);
    var strInterceptLength = parseInt(fontCount*2*2*0.8);
    return strInterceptLength;
}