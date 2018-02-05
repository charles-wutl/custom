
    var mNews_messageList_colorArray=["#17c295","#4da9eb","#f7b55e","#f2725e","#f2725e","#5299cc","#e66b9e","#808080"];
    //汉字和字母转为Unicode字符码表示
    function mNews_messageList_toUnicode(str) {
          var temp,
          i = 0,
          r = '',
          len = str.length;
          for (; i < len; i++) {
            temp = str.charCodeAt(i).toString(16); 
              while ( temp.length < 4 )
                temp = '0' + temp;
                r +=  temp;
              };
          return r;
    };
    //如果名字为中文，截取后两位,如果是其他截取后两位
    function mNews_messageList_cutStr(str){

        if(/^[\u4e00-\u9fa5]+$/.test(str)){
            newstr=str.substr(str.length-2,2); 
        }else{
             newstr=str.substr(0,2);
        }
        return newstr;
    };
    //随机选取背景颜色,参数是str,输出str(例如:"#17c295")
    function mNews_messageList_changebgcolor(name){
        var newcolor=(parseInt(mNews_messageList_toUnicode(name),16))%(mNews_messageList_colorArray.length);
        return mNews_messageList_colorArray[newcolor];
    };
    //数据加载方法模拟===============
    //模拟开发 写入数据
    //创建一个dom元素,参数是obj(例如:{name:"m",title:"发发起人姓名发起人姓名起人姓名",date:"2016-12-20",time:"12:00",news:"显示最新消息，最新消息一行断尾"}),输出一个新的dom(jq类型)
    function mNews_messageList_creatItem(dataObj){
        var mNewsdom=$(
                '<div class="mNews_messageList_content_item">'+
                    '<div class="mNews_messageList_content_itemBar">'+
                            '<div class="mNews_messageList_content_itemBar_left">'+
                               '<em>'+mNews_messageList_cutStr(dataObj.name)+'</em>'+
                            '</div>'+
                            '<div class="mNews_messageList_content_itemBar_right">'+
                                '<div class="mNews_messageList_content_itemBar_right_top clearfix">'+
                                  '<div class="mNews_messageList_content_itemBar_right_top_day">'+
                                      '<i class="mNews_messageList_content_itemBar_right_top_date">'+dataObj.date+'</i>'+
                                      '<i class="mNews_messageList_content_itemBar_right_top_time">'+dataObj.time+'</i>'+
                                  '</div>'+
                                '<p class="mNews_messageList_content_itemBar_right_top_news textCut">'+dataObj.title+'</p>'+
                                '</div>'+
                                '<div class="mNews_messageList_content_itemBar_right_bottom clearfix">'+
                                '<p class="mNews_messageList_content_itemBar_right_bottom_news textCut">'+dataObj.news+'</p>'+
                                '</div>'+
                            '</div>'+   
                    '</div>'+
                '</div>')
        mNewsdom.find('em').css('background',mNews_messageList_changebgcolor(dataObj.name));
        return mNewsdom;
    }
    
    function mNews_messageList_appendDate(box){//参数：append的容器
        var haveMoreData=true;//是否还有更多数据
        var maxNum=100;//最多新闻条数
        var eachNum=5; //每次加载数量
        //append数据
        
        for(var i=0;i<eachNum;i++){//写入100条数据
            //console.log(typeof(dataArray[i].date))
            //如果没有日期，日期为空
            if(typeof(mNews_messageList_dataArray[i].date)==="undefined"){
                mNews_messageList_dataArray[i].date="";
            }
            $('.mNews_messageList_content').append(mNews_messageList_creatItem(mNews_messageList_dataArray[i]));
        }
        if(maxNum <= box.find(".mNews_messageList_content_item").length){//已有条数和最大值比较
            haveMoreData=false;
        }
        return haveMoreData;//返回是否还有更多数据
    }

    //模拟开发 数据请求
    //var nextPageNumber=0;//请求页号累计

    function mNews_messageList_dataLoad(funRefresh,box){//参数：刷新方法，append的容器
        setTimeout(function(){//模拟返回数据返回成功
            var hoveMoreData=mNews_messageList_appendDate(box);//数据写入页面方法,返回是否还有更多数据
            funRefresh(hoveMoreData);//关键 参数是否有更多数据======
        },2000);
    }
   