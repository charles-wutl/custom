
function mCommon_basicServiceSearchList(options) {
    this.setting = {
        appendObj: null,//放入列表的容器，必填
        dataArray: []
    };
    options = options || {};
    $.extend(true, this.setting, options);
    var self = this;

    this.addItemDom = function (itemData) {//添加一条列表,返回一个列表的dom
        if(!itemData || itemData.length<0){//如果没有数据或者数据对象为空，不执行
            return;
        }
        var dataId;
        var dataImg;
        var dataTitle;
        var dataField;
        if(itemData.id || itemData.id==0){
            dataId = itemData.id;
        }
        if(itemData.img){
            dataImg = itemData.img;
        }
        if(itemData.title){
            dataTitle = itemData.title;
        }
        if(itemData.field){
            dataField = itemData.field;
        }
        if(!dataTitle.value){//如果标题不存在不执行
            return;
        }
        var itemDom = $('<div class="mCommon_basicServiceSearchList_list_box borderPx1"><div class="mCommon_basicServiceSearchList_list"></div></div>');//单个列表
        var itemInfo = $('<div class="mCommon_basicServiceSearchList_info"></div>');//右侧大容器
        //写id
        itemDom.attr("id", dataId);

        //图片
        if (dataImg && dataImg!=null && dataImg!='') {//图片地址存在为有图，否则为无图
            var itemImg = $('<div class="mCommon_basicServiceSearchList_img"><img src="' + dataImg + '"></div>');
            itemDom.find(".mCommon_basicServiceSearchList_list").append(itemImg);
        }

        //标题（必填）
        var title = $('<div class="mCommon_basicServiceSearchList_title textCut"></div>');//标题外盒子
        var titleLabel = $('<span class="mCommon_basicServiceSearchList_title_label"></span>');//标题label
        var titleText = $('<span class="mCommon_basicServiceSearchList_title_info"></span>');//标题值
        var titleTextStr = '';
        var titleValueArr = dataTitle.value;
        for(var n=0;n<titleValueArr.length;n++){
            titleText.append(titleValueArr[n]+" ");
        }
        //titleText.text(titleTextStr);
        titleLabel.text(dataTitle.label + ":");
        if (dataTitle.labelShow) {//如果label显示
            title.append(titleLabel);//标题label放入标题外盒子
        }
        title.append(titleText);//标题值放入标题外盒子
        itemInfo.append(title);//标题盒子放入右侧大容器

        //字段
        if(dataField!=undefined){
            var itemBoxHtml = '<div>';//字段整个块(包括概要)
            if(dataField[0]&&dataField[0].isProfile){//如果字段是概要（数据第一条是概要），给加一个内联的外盒子
                itemBoxHtml = '<div class="mCommon_basicServiceSearchList_profileInline">';//
                if(dataField[1] && !dataField[1].isConnect && dataField[0].type=="text" || dataField[1]==undefined && dataField[0].type=="text"){//如果概要的下一个字段不连接，给概要加一个块盒子，方便一行截取
                    itemBoxHtml = '<div class="mCommon_basicServiceSearchList_profileBlock textCut">';
                }
            }
            for(var i=0;i<dataField.length;i++){//遍历所有数据字段
                var fieldData = dataField[i];//一个数据字段
                if(!fieldData.isConnect){//不连接
                    if(i>0){//不是概要字段
                        if(fieldData.type == "text") {
                            itemBoxHtml = itemBoxHtml + "</div><div class='mCommon_basicServiceSearchList_fieldBlock textCut'>";//关闭字段外盒子
                        }else{
                            itemBoxHtml = itemBoxHtml + "</div><div>";//关闭字段外盒子
                        }
                    }
                }

                var itemLabelHtml = '<span class="mCommon_basicServiceSearchList_label">'+fieldData.label+':</span>';//字段label
                var itemValueHtml = '';//字段value
                if(fieldData.type == "text"){//如果字段类型为text
                    //itemLabelHtml = '<div class="textCut">'+itemLabelHtml;
                    var textData = fieldData.value;//字段值
                    for(var j=0;j<textData.length;j++){
                        itemValueHtml += '<span class="mCommon_basicServiceSearchList_text">'+textData[j]+'</span>';
                    }
                    //itemValueHtml = itemValueHtml + '</div>'
                }else if(fieldData.type == "radio"){//如果字段类型为radio
                    var radioData = fieldData.value;
                    for(var j=0;j<radioData.length;j++){
                        itemValueHtml += '<span class="mCommon_basicServiceSearchList_radio textCut">'+radioData[j]+'</span>';
                    }
                }else if(fieldData.type == "Multiple"){//如果字段类型为Multiple
                    var multipleData = fieldData.value;
                    for(var j=0;j<multipleData.length;j++){
                        itemValueHtml += '<span class="mCommon_basicServiceSearchList_multiple textCut">'+multipleData[j]+'</span>';
                    }
                }

                if(fieldData.labelShow){//如果label显示
                    itemHtml = itemLabelHtml + itemValueHtml;
                }else{//label不显示
                    itemHtml = itemValueHtml;
                }

                itemBoxHtml = itemBoxHtml + itemHtml;
            }
            itemBoxHtml = itemBoxHtml + '</div>';//关闭字段外盒子

            itemInfo.append(itemBoxHtml);//字段写入右侧大盒子
        }
        itemDom.find(".mCommon_basicServiceSearchList_list").append(itemInfo);//右侧大盒子放入列表
        this.setting.appendObj.append(itemDom);//一个列表项
        return itemDom;//一个列表的dom

    };
    this.renderDom = function(dataArray){//渲染整个页面dom
        if(dataArray && dataArray.length>0){//如果数据存在且数据长度大于0
            for (var i = 0; i < dataArray.length; i++) {
                this.addItemDom(dataArray[i]);//添加一条列表
            }
        }

    };

    this.init = function(){//页面初始化
        this.renderDom(this.setting.dataArray);
    };
    this.init();
}