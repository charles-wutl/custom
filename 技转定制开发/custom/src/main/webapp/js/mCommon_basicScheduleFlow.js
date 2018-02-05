/**
 * Created by H-06135 on 2017/2/6.
 */
//参照mCommon_basicShopItemProtal.js
//字符串截取 第一个参数是盛放字符串的容器，数组，必填
//第二个参数是固定截取的长度，选填，默认40
//第三个参数是截取的行数,选填，默认2
function mCommon_basicScheduleFlow_Rem(contentArr,appointLen,lineNum){
    //必要判断
    if(contentArr.length == 0){
        return false;
    }
    mCommon_basicScheduleFlow_operationStr(contentArr,appointLen,lineNum);

    //绑定resize事件
    $(window).resize(function(){
        setTimeout(function(){
            mCommon_basicScheduleFlow_operationStr(contentArr,appointLen,lineNum);
        },300);
    })
}
//计算屏幕宽度，根据不同尺寸来做字符截取，规则是小于360就截取固定长度，大于460按照两行截取，大于640不管
//参数是要截取的字符串的容器，数组，必填
function mCommon_basicScheduleFlow_operationStr(contentArr,appointLen,lineNum){
    var $body = $(window);
    var bodyW = $body.width();

    bodyW = bodyW > 640 ? 640 : bodyW ;
    
    
    
    //小于640 固定字数，
    if(640 > bodyW){
        contentArr.each(function(){
            var oldStr,newStr;
            //是否截取过
            if(!$(this).attr('titleStr')){
                oldStr = $(this).text();
                $(this).attr('titleStr',oldStr);
            }else{
                oldStr = $(this).attr('titleStr');
            }
            if(!appointLen){
                appointLen = 40;
            }
            //获取截取后的字符串
            newStr = oldStr.subCHStr(0,appointLen);
            //将新字符串填入dom中
            $(this).text(newStr);
        });
    }else{//大于640 按照两行截取
        contentArr.each(function(){
            var oldStr,newStr;
            //是否截取过
            if(!$(this).attr('titleStr')){
                oldStr = $(this).text();
                $(this).attr('titleStr',oldStr);
            }else{
                oldStr = $(this).attr('titleStr');
            }
            //获取要截取的长度
            var strLength = mCommon_basicScheduleFlow_getStrLength($(this),lineNum);
            //获取截取后的字符串
            newStr = oldStr.subCHStr(0,strLength);
            //将新字符串填入dom中
            $(this).text(newStr);
        });
    }
}
//获取截取的长度大于640才会走这里
function mCommon_basicScheduleFlow_getStrLength(domObj,lineNum){
    //获取字符串的字体大小
    var fontSizeNum = parseInt(domObj.css('font-size'));
    //获取容器宽度
    var boxW = domObj.width();
    if(!lineNum){
        lineNum = 2;
    }
    return parseInt(boxW/fontSizeNum * 2 * lineNum * 1);
}