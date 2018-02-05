/*统计
  插入统计的数据
  改变标题和数字的颜色
*/
function mCommon_basicCount(setting) {
    this.option = {
        appendBox: null,//插入区域jq对象
        dataArray: [],//插入的数据，数组形式，例如[{text:[{num:"123",title:"标题标题"}]}]
        numColor:"",//统计数字的颜色
        title_Color:"",//标题的颜色--17.4.6改
        bgColor:"",//一条的背景颜色
        bgOpacity:""//背景颜色透明度
    };
    setting = setting || {};
    var self = this;
    $.extend(true, this.option, setting);

    //定义变量
    this.boxDom=$('<div class="mCommon_basicCount_content clearfixOverflow"></div>');//整个domjq

    //将创建的每一条dom标签插入页面中,参数为一个数组,例如[{num:"456",title:"标题标题"}]
    this.appendDom=function(){
        var dataArray=this.option.dataArray;
        var newdom=this.boxDom;
        for(var i=0;i<dataArray.length;i++){
            if(!dataArray[i].url){
               dataArray[i].url="#";
            }

            var newdomItem=$(
                '<div class="mCommon_basicCount_content_row" url="'+JSON.parse(dataArray[i]).url+'"><a class="mCommon_basicCount_content_row_link"><div class="mCommon_basicCount_content_col">'+
                '<p class="mCommon_basicCount_content_col_top textCut">'+JSON.parse(dataArray[i]).num+'</p>'+
                '<p class="mCommon_basicCount_content_col_bottom textCut">'+JSON.parse(dataArray[i]).title+'</p>'+
                '</div></a></div>');
            newdom.append(newdomItem);
        }
        //改变颜色和背景颜色

        self.option.appendBox.append(newdom);
        //绑定事件
        self.option.appendBox.find(".mCommon_basicCount_content_row").bind('click', function() {
            var url = $(this).attr("url");
            if(url){
                if(da){
                    da.ready(function () {
                        da.createWindow({url: url});
                    });
                }else{
                    window.location.href=url;
                }
            }
        });
                //改变宽度
        self.changeWidth();
        self.changecolor();

    };
    //改变宽度,参数为数组(例如[{num:"456456456456456456456",title:"标题标题"}])，需要改变宽度的jq对象
    this.changeWidth=function(){
        var dataArray=this.option.dataArray;
        var dom=this.boxDom.find('.mCommon_basicCount_content_row');
        var boxWidth=self.option.appendBox.find('.mCommon_basicCount_content').width();//父容器宽度
       //console.log(boxWidth);
        // console.log(self.option.appendBox.find('.mCommon_basicCount_content').width());
        var domwidth=parseInt(boxWidth/dataArray.length);
        var lastwidth=boxWidth-domwidth*(dataArray.length-1);
        dom.css('width',domwidth+"px");
        dom.eq(dataArray.length-1).css('width',lastwidth+"px");
    }
    //改变颜色
    this.changecolor=function(){
        var changedom=this.boxDom;
        //设置颜色
        changedom.find(".mCommon_basicCount_content_col_top").css('color',self.option.numColor);//设置统计数字的颜色
        changedom.find(".mCommon_basicCount_content_col_bottom").css('color',self.option.title_Color);//设置标题文字颜色
        var rgb=this.option.bgColor.substr(0,this.option.bgColor.length-1);
        var rgba=rgb+","+this.option.bgOpacity+")";
        var newrgba="rgba"+rgba.substr(3,rgba.length-2);
        //console.log(newrgb)
        changedom.css('background',newrgba);
    }
    
    this.init=function(){
        this.appendDom();
    } 
     //事件
    $(window).resize(function(){
        self.changeWidth();
    });
    //执行
    this.init();

}


