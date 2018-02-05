//截取个人信息
function mCommon_basicPortrait_infoBreak(box){//个人信息容器 jq对象
    mCommon_basicPortrait_addAttr(box);//写入属性
    mCommon_basicPortrait_textCut(box);//截取字符
    var setTimeoutId=false;
    $(window).resize(function(){
        if(setTimeoutId){
            clearTimeout(setTimeoutId);
        }
        setTimeoutId=setTimeout(function(){
            mCommon_basicPortrait_textCut(box);//截取字符
        },1000);

    });
}

//原始文字写入属性
function mCommon_basicPortrait_addAttr(box){//个人信息容器 jq对象
    var oldStr = box.text();
    box.attr('titleStr',oldStr);
}

//字符截取
function mCommon_basicPortrait_textCut(box){//个人信息容器 jq对象
    var oldStr =box.attr('titleStr');
    //var item=$(this);
    var fontSize=parseInt(box.css("font-size"));//字号

    var num=parseInt(box.width()/fontSize*0.8)*3*2;//取字数
    var newStr=oldStr.subCHStr(0,num);//字符截取
    box.html(newStr);//写入文字
    // alert("fontSize:"+fontSize +"/box.width:"+ box.width() +"/num:"+ num);
}

//截取字符串
function mCommon_basicPortrait_infoBreak1(box){//字符串容器 jq对象

    mCommon_basicPortrait_addAttr1(box);//写入属性
    mCommon_basicPortrait_textCut1(box);//截取字符
    var setTimeoutId=false;
    $(window).resize(function(){
        if(setTimeoutId){
            clearTimeout(setTimeoutId);
        }
        setTimeoutId=setTimeout(function(){
            mCommon_basicPortrait_textCut1(box);//截取字符
        },1000);

    });
}

//原始文字写入属性
function mCommon_basicPortrait_addAttr1(box){//个人信息容器 jq对象
    var oldStr = box.text();
    box.attr('titleStr',oldStr);
}

//字符截取
function mCommon_basicPortrait_textCut1(box){//个人信息容器 jq对象
    var oldStr =box.attr('titleStr');
    //var item=$(this);
    var fontSize=parseInt(box.css("font-size"));//字号

    var num=parseInt(box.width()/fontSize*0.8)*2*2;//取字数
    var newStr=oldStr.subCHStr(0,num);//字符截取
    box.html(newStr);//写入文字
    // alert("fontSize:"+fontSize +"/box.width:"+ box.width() +"/num:"+ num);
}
