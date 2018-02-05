/**
 * Created by sh-wutl on 2017/3/1.
 */
function Dialog(options) {
    // 基本信息；
    this.setting = {
        // 域Id
        domainId : "",

        showDomainID : null,
        scroll : true,
        // 宽度
        width : false,
        fixed : true, // 是否固定到当前窗口；默认为true-固定到当前窗口
        // 高度
        height : false,
        minHeight : false,
        minWidth : false,
        showFilter : true,
        showTitle : true,
        autoOpen : true,
        addCloseBtn : true,
        ifShowFootDiv : false,
        windowMoveToCurrentElem : false,
        filterClass : "overlay_bg", // overlay-none 无色透明 overlay_bg 灰色透明；
        speed : null,
        title : "",
        contentClass : "content",
        panelClass : "overlay_box",
        leftGap : 15, // 去掉margin-left的值；
        clickFilterClose : false,
        // 鼠标移出关闭事件；
        mouseOutClosePanel : false,
        // 参照物; 用于显示到某元素周围；
        referenceObj : null,
        attachToReferenceObj : false,
        // open回调函数；
        openCallBack : function() {
            // alert("opened");
        },
        // 关闭回调函数
        closeCallBack : function() {
            //
        },
        // 销毁回调函数；
        destroyCallBack : function() {

        },
        addCloseBtnEvent : null,
        usetop : null,
        useleft : null,
        "z-index" : 500,
        autoFocus : true,
        clickClose : true
    };

    this.attahcedDiv = null;

    // panel
    this.panel = {
        id : "_panel" + this.getRadomUUID()
    };
    // 状态信息；
    this.status = {
        opened : null
    };
    options = options || {};
    $.extend(true, this.setting, options);
    // this.setData(options);
    this.initialAttahcDiv();
    this.initial();
    return this;
};

// 扩展方法；
$.extend(true, Dialog.prototype, {

    bindDocumentClick : function() {
        var self = this;
        $(document).one('click', function() {
            if (self.status.isOpen == true)
                self.close();
        });
    },
    getRadomUUID : function() {
        return parseInt(Math.random() * 99999 + 1);
    },
    // 设置数据；
    setData : function(options) {
        options = options || {};
        $.extend(true, this.setting, options);
    },
    // 设置标题信息
    setTitleInfo : function(titleInfo) {
        try {
            if (titleInfo != null && this.titleContentSpan) {
                this.titleContentSpan.html(titleInfo);
            }
        } catch (e) {
        }

    },
    setContentInfo : function(contentInfo) {
        this.contentDiv.html(contentInfo);
    },
    // 设置目标地址；
    initialAttahcDiv : function() {
        var attahcedDiv = $("<div></div>");
        var domainId = this.setting.domainId;
        $("#" + domainId).after(attahcedDiv);
        this.attahcedDiv = attahcedDiv;
    },
    // 鼠标移出关闭层
    PanelDivOutCloseEvent : function() {
        this.close();
    },
    initial : function() {

        var self = this;
        // 显示层
        this.panelDiv = this.getPanelDiv();
        if (this.setting.panelClass != null) {
            this.panelDiv.attr("class", this.setting.panelClass);
        }
        // 过滤层
        this.filterPanelDiv = this.getFilterPanelDiv();
        // 边距信息；
        this.borderInfo = {
            top : 0,
            left : 0,
            scrWidth : 0,
            scrHeight : 0
        };
        try {
            // $("#" + this.setting.domainId).hide();
            var divTitle = $("#" + this.setting.domainId).attr("title");
            if (null != divTitle) {
                this.setting.title = divTitle;
                $("#" + this.setting.domainId).attr("oldTitle", divTitle);
                $("#" + this.setting.domainId).removeAttr("title");
            }
        } catch (e) {
        }

        if (this.setting.showTitle) {
            this.setTitle();
        }
        var contentDiv = this.getContentDiv();
        this.contentDiv = contentDiv;
        // alert(this.contentDiv.html());
        this.panelDiv.append(contentDiv);

        if (this.setting.ifShowFootDiv) {
            var footDiv = this.getFootDiv();
            this.panelDiv.append(footDiv);
            this.footDiv = footDiv;
        }
        this.panelDiv.hide();

        this.attahcedDiv.append(this.panelDiv);
        if (this.setting.showFilter) {
            this.filterPanelDiv.hide();
            var showDomainID = this.setting.showDomainID;
            if (null != showDomainID) {
                $("#" + showDomainID).append(this.filterPanelDiv);
            } else {
                this.panelDiv.after(this.filterPanelDiv);
            }
            if (this.setting.clickFilterClose) {
                this.filterPanelDiv.css({
                    cursor : "pointer"
                });
                this.filterPanelDiv.click(function() {
                    self.close();
                });
            }
        }
        if (this.setting.autoOpen) {
            // 自动打开
            this.open();
        }
        this.resizePosition();

    },
    // 初始化domainId方法；
    initalElmentsEvent : function() {

    },
    // 得到页脚域
    getFootDiv : function() {
        var footDiv = $("<div style='margin:0 auto' class='button-box clearfix overlay-div-button'></div>");
        return footDiv;
    },
    // 构造Title内容
    getTitleDiv : function() {
        var self = this;
        var titleDiv = $("<div></div>");
        titleDiv.attr("class", "title clearfix");
        var titleContentSpan = $("<font>" + this.setting.title + "</font>");
        // titleContentSpan.attr("class", "overlay-div-tit-left");
        var title = this.setting.title;
        if (null != title) {
            titleContentSpan.html(title);
        }
        this.titleContentSpan = titleContentSpan;
        titleDiv.append(titleContentSpan);
        if (this.setting.addCloseBtn) {
            // 关闭按钮；
            var aCloseBtn = $("<em></em>");
            // aCloseBtn.attr("href", "javascript:void(0);");
            aCloseBtn.attr("title", "关闭");
            // var closeImg = $("<img class='overlay-div-tit-rihgt' >");
            // closeImg.attr("src", _imgPath + "/close_white.gif");
            // aCloseBtn.append(closeImg);
            aCloseBtn.click(function() {
                if(self.setting.addCloseBtnEvent){
                    self.setting.addCloseBtnEvent.call(self);
                }else{
                    self.close();
                }
            });
            // this.closeImg = closeImg;
            // this.aCloseBtn = aCloseBtn;
            titleDiv.append(aCloseBtn);
        }
        this.titleDiv = titleDiv;
    },
    // 显示Title
    setTitle : function() {
        this.getTitleDiv();
        this.panelDiv.append(this.titleDiv);
    },
    // 构造内容区域；
    getContentDiv : function() {
        var domainId = this.setting.domainId;
        var contentDiv = $("<div></div>");
        contentDiv.attr("class", this.setting.contentClass);
        // 填充内容；
        var domain = $("#" + domainId);
        if (null != domain) {
            try {
                domain.appendTo(contentDiv);
                domain.css({
                    display : "block"
                });
            } catch (e) {
            }
        }
        return contentDiv;
    },
    // 构造显示面板
    getPanelDiv : function() {
        var self = this;
        var panelDiv = $("<div></div>");
        panelDiv.attr("id", this.panel.id);
        panelDiv.attr("class", "overlay_box");
        return panelDiv;
    },
    resizePosition : function() {
        var self = this;
        $(window).resize(function() {
            if (self.status.isOpen) {
                self.rePosition();
            }
        });

        $(window).scroll(function(event) {
            if (self.status.isOpen && self.setting.fixed) {
                self.rePosition();
                // event.preventDefault();
                // event.stopPropagation();
                return false;
            }
        });

        /*
         * $(window).scroll(function(){ if(self.status.isOpen){
         * self.rePosition(); } });
         */
    },
    rePosition : function() {
        // 初始化边距信息；
        this.setMinBorder();
        this.setPanelBorderInfo();
        if (this.setting.showFilter) {
            this.setFilterBorderInfo();
            this.filterPanelDiv.show(this.setting.speed);
        }
    },
    setMinBorder : function() {
        var domainId = this.setting.domainId;
        $("#" + domainId).show();
        var elemWidth = $("#" + domainId).outerWidth();
        if (null == elemWidth) {
            elemWidth = 300;
            // $("#" + domainId).attr("");
        }
        this.panelDiv.css({
            width : elemWidth + "px"
        });
        if (this.setting.width && this.setting.width != "auto") {
            // alert(this.setting.width);
            // lihz 这里修改 兼容this.setting.width中的值为类似330px的情况 会导致弹框宽度不对
            var widthNew = parseInt(this.setting.width);
            this.panelDiv.css({
                width : widthNew + "px"
            });
        }
        if (this.setting.height && this.setting.height != "auto") {
            // alert(this.setting.height);
            this.panelDiv.css({
                height : this.setting.height + "px"
            });
        }
        /*
         * if (this.setting.showTitle) { var titleDiv=this.titleDiv; var
         * w=elemWidth-16; titleDiv.css({width:w+"px"}); }
         */

        var panelDiv = this.panelDiv;
        var pWidth = panelDiv.width();
        var pHeight = panelDiv.height();
        var minHeight = this.setting.minHeight;
        var minWidth = this.setting.minWidth;
        var css = {};
        if (minWidth && parseFloat(pWidth) < parseFloat(minWidth)) {
            css.width = minWidth;
            panelDiv.css(css);
        }
        if (minHeight && parseFloat(pHeight) < parseFloat(minHeight)) {
            css.height = minHeight;
            panelDiv.css(css);
        }
    },
    // 构造遮罩层；
    getFilterPanelDiv : function() {
        var filterPanelDiv = $("<div domainID='" + this.setting.domainId + "'></div>");
        if (this.setting.filterClass != "") {
            filterPanelDiv.attr("class", this.setting.filterClass);
        } else {
            filterPanelDiv.attr("class", "overlay-gray");
        }
        filterPanelDiv.css({
            "z-index" : this.setting["z-index"] * 1 - 1,
            "position" : "fixed"
        });
        return filterPanelDiv;
    },
    // 在元素周围显示；
    attachToElement : function() {
        var currentObj = this.setting.referenceObj;
        if (null == currentObj) {
            this.getBorderInfo();
        } else {
            if (typeof currentObj == "string") {
                currentObj = $("#" + currentObj);
            }
            var borderInfo = new Object();
            var pos = currentObj.offset();
            var elmHeight = currentObj.outerHeight();
            // alert(elmHeight);
            borderInfo['top'] = pos.top + elmHeight;
            borderInfo['left'] = pos.left;
            this.borderInfo = borderInfo;
        }

    },
    // 显示提示信息到某区域内；
    getByElemBorderInfo : function() {
        var showDomainID = this.setting.showDomainID;
        var width = $("#" + showDomainID).width();
        var height = $("#" + showDomainID).height();
        var panelDiv = this.panelDiv;
        var pWidth = panelDiv.width();
        var pHeight = panelDiv.height();

        var left = (parseFloat(width) - parseFloat(pWidth)) / 2;
        var top = (parseFloat(height) - parseFloat(pHeight)) / 3;
        var borderInfo = new Object();
        borderInfo['top'] = top;
        borderInfo['left'] = left;
        this.borderInfo = borderInfo;
    },
    // 得到屏幕值、应该显示的高度与宽度；
    getBorderInfo : function() {

        var showDomainID = this.setting.showDomainID;
        if (null != showDomainID) {
            this.getByElemBorderInfo();
            return;
        }
        var panelDiv = this.panelDiv;
        var pWidth = panelDiv.width();
        var wWidth = $(window).width();
        var nWidth = wWidth - parseFloat(pWidth);
        var left = parseFloat(nWidth) / 2;
        left = left + $(document).scrollLeft();
        var pHeight = panelDiv.height();
        var wHeight = $(window).height();
        var nHeight = wHeight - pHeight;
        var height = nHeight / 2;

        var top = height + $(document).scrollTop();
        /*
         *
         * var panelDiv = this.panelDiv; var pWidth = panelDiv.width(); var
         * pHeight = panelDiv.height(); var scrWidth = $(document).width(); var
         * scrHeight = $(document).height(); var left = (parseFloat(scrWidth) -
         * parseFloat(pWidth)) / 2; var top = (parseFloat(scrHeight) -
         * parseFloat(pHeight)) / 2; var borderInfo = new Object();
         * borderInfo['top'] = top; borderInfo['left'] = left;
         */
        var borderInfo = new Object();
        // console.log('pHeight:'+pHeight);
        // console.log('pHeight+top:'+(pHeight+top));
        // console.log('$(document).height():'+$(document).height());
        // panel高度加top值小于document高度 ,才设置top值,防止document高度被拉伸 panelDiv 有pandding
        // 20
        if (pHeight + top + 20 < $(document).height()) {
            borderInfo['top'] = top;
        } else {
            top = $(document).height() - pHeight - 20;
        }
        borderInfo['top'] = top;
        borderInfo['left'] = left;
        this.borderInfo = borderInfo;
    },
    // 设置其top、left值；
    setPanelBorderInfo : function() {

        if (this.setting.attachToReferenceObj) {
            this.attachToElement();
        } else {
            this.getBorderInfo();
        }
        if (this.borderInfo['left'] < 0) {
            this.borderInfo['left'] = 0;
        }
        if (this.borderInfo['top'] < 0) {
            this.borderInfo['top'] = 0;
        }

        var left = this.borderInfo['left'];
        var top = this.borderInfo['top'];
        var usetop = this.setting.usetop;
        var useleft = this.setting.useleft;
        if (null != usetop) {
            top = usetop;
        }
        if (null != useleft) {
            left = useleft;
        }
        var css = {
            left : left - this.setting.leftGap,
            top : top,
            "position" : "absolute",
            "z-index" : this.setting["z-index"]
        };
        this.panelDiv.css(css);
    },
    // 设置遮罩区域显示范围；
    setFilterBorderInfo : function() {
        var self = this;
        this.setFilterBorder();
        $(window).resize(function() {
            self.setFilterBorder();
        });
        $(window).scroll(function() {
            self.setFilterBorder();
        });

    },
    setFilterBorder : function() {
        var showDomainID = this.setting.showDomainID;
        var css = {};
        if (null != showDomainID) {
            var scrWidth = $("#" + showDomainID).width();
            var scrHeight = $("#" + showDomainID).height();
            css = {
                width : scrWidth,
                height : scrHeight
            };
        } else {
            var scrWidth = $(document).width();
            var scrHeight = $(document).height();
            css = {
                width : "100%",
                height : scrHeight
            };
        }

        this.filterPanelDiv.css(css);
    },
    // placeHoler事件；
    callPlaceholder : function() {
        this.panelDiv.find("input").each(function() {
            var p = $(this).attr("placeholder");
            if ($(this).hasClass("placeholder")) {
                $(this).val(p);
            }

        });
    },

    fisrtInputGetFocus : function() {
        try {
            var input = this.panelDiv.find("input[display!='none']").first();
            if (!input[0]) {
                input = this.panelDiv.find("textarea").first();
            }
            if (input[0]) {
                input[0].focus();
            }
        } catch (e) {
        }
    },
    // 打开
    open : function(title) {
        var self = this;
        self.panelDiv.css({
            width : null,
            height : null
        });
        try {
            if (null != title && "" != title) {
                this.setting.title = title;
            }
            this.setTitleInfo(this.setting.title);
        } catch (e) {
        }

        try {
            this.setContentInfo(this.setting.content);
        } catch (e) {
        }

        this.panelDiv.show(this.setting.speed);
        // 初始化边距信息；
        this.setMinBorder();
        this.setPanelBorderInfo();
        if (this.setting.showFilter) {
            this.setFilterBorderInfo();
            this.filterPanelDiv.show(this.setting.speed);
        }
//        if (browser.indexOf("ie9") != -1) {
//
//        }
        // window.location.hash = this.panel.id;
        this.moveViewToPanel();
        this.setting.openCallBack();

        // 如果鼠标移出关闭，则绑定事件；
        if (this.setting.mouseOutClosePanel) {
            this.panelDiv.mouseout(function() {
                // alert("out");
                // self.close();
            });
            this.panelDiv.mouseover(function() {
                // alert("over");
                // self.close();
            });
        }
        this.status.isOpen = true;
        if (this.setting.autoFocus) {
            this.fisrtInputGetFocus();
        }
        if (this.setting.clickClose) {
            // this.bindDocumentClick();
        }
        if (this.setting.scroll == false) {
            self.stopScroll();
        }
    },
    stopScroll : function() {
        $("html").css({
            "overflow-y" : "hidden"
        });
        $(window).resize();
    },
    startScroll : function() {
        $("html").css({
            "overflow-y" : "auto"
        });
        $(window).resize();
    },
    moveViewToPanel : function() {
        if (this.setting.windowMoveToCurrentElem) {
            $.moveToCurrentElement(this.panelDiv);
        }
        //
    },
    // 关闭
    close : function() {
        var self = this;
        self.status.isOpen = false;
        self.filterPanelDiv.hide(this.setting.speed);
        self.panelDiv.hide(this.setting.speed);
        if (self.setting.scroll == false) {
            self.startScroll();
        }
        self.setting.closeCallBack();
    },
    // 销毁
    destroy : function() {
        // TODO
        this.panelDiv.remove();
        if (this.setting.showFilter) {
            this.filterPanelDiv.remove();
        }
        this.setting.destroyCallBack();
    }
});
/**
 *
 * 通用显示图层
 */
(function($) {

    // 集合；
    var dailogCollection = {};

    $.getPanelById = function(objId) {
        return dailogCollection[objId];
    };
    /*
     * //open 设置； var openCollection={};
     * $.setOpenCollection=function(objId,status){ openCollection[objId]=status;
     * return openCollection; } $.removeOpenCollection=function(objId){
     * openCollection=$.removeByKey(openCollection, objId); }
     *
     * $.getOpenCollection=function(){ return openCollection; }
     * //如果点击关闭的话，触发该事件； $(window).click(function(){ var
     * openCollection=$.getOpenCollection(); for(var id in openCollection){ }
     *
     * });
     */

    $.moveToCurrentElement = function(currentElement) {
        var scrollPos;
        if (typeof document.compatMode != 'undefined' && document.compatMode != 'BackCompat') {
            scrollPos = document.documentElement;
        } else if (typeof document.body != 'undefined') {
            scrollPos = document.body;
        }
        var windowHeight = $(window).height();
        var eTop = currentElement.offset().top;
        var eHeight = currentElement.height();
        var next_top = parseFloat(eTop) + parseFloat(eHeight) / 2 - parseFloat(windowHeight) / 2;
        $(window).scrollTop(next_top);
    };

    // 初始化；
    $.fn.Panel = function(options) {
        var id = $(this).attr("id");
        if (dailogCollection[id] && $("#" + id).attr("paneled") != null) {
            return dailogCollection[id];
        }
        var setting = {
            domainId : id,
            width : "auto",
            height : "auto",
            showFilter : true,
            autoOpen : false
        };
        options = options || {};
        $.extend(true, setting, options);
        var dialog = new Dialog(setting);
        dailogCollection[dialog.setting.domainId] = dialog;
        $("#" + id).attr("paneled", "paneled");
        return dialog;
    };
    // 绑定元素事件；
    $.fn.opPanel = function(tagName, title, currentBtn) {
        var id = $(this).attr("id");
        if (tagName == "open") {
            var dailog = dailogCollection[id];
            try {
                if (null == dailog) {
                    return;
                }
                dailog.setting.referenceObj = currentBtn;
                dailog.open(title);
            } catch (e) {
                throw e;
            }
        }

        if (tagName == "close") {
            var dailog = dailogCollection[id];
            try {
                dailog.close();
            } catch (e) {
                throw e;
            }
        }
        if(tagName == "destroy"){
            var dailog = dailogCollection[id];
            try {
                if (!dailog) {
                    return;
                }
                dailog.destroy();
                delete dailogCollection.id;
            } catch (e) {
                throw e;
            }
        }
    };
})(jQuery);

/*  在textarea处插点击选择下拉框插入选择文本--Start */
(function($) {
    $.fn.extend({
        insertSelectContent : function(myValue, t) {
            var $t = $(this)[0];
            if (document.selection) { // ie
                this.focus();
                var sel = document.selection.createRange();
                sel.text = myValue;
                this.focus();
                sel.moveStart('character', -l);
                var wee = sel.text.length;
                if (arguments.length == 2) {
                    var l = $t.value.length;
                    sel.moveEnd("character", wee + t);
                    t <= 0 ? sel.moveStart("character", wee - 2 * t
                        - myValue.length) : sel.moveStart(
                        "character", wee - t - myValue.length);
                    sel.select();
                }
            } else if ($t.selectionStart
                || $t.selectionStart == '0') {
                var startPos = $t.selectionStart;
                var endPos = $t.selectionEnd;
                var scrollTop = $t.scrollTop;
                $t.value = $t.value.substring(0, startPos)
                    + myValue
                    + $t.value.substring(endPos,
                        $t.value.length);
                this.focus();
                $t.selectionStart = startPos + myValue.length;
                $t.selectionEnd = startPos + myValue.length;
                $t.scrollTop = scrollTop;
                if (arguments.length == 2) {
                    $t.setSelectionRange(startPos - t,
                        $t.selectionEnd + t);
                    this.focus();
                }
            } else {
                this.value += myValue;
                this.focus();
            }
        }
    })
})(jQuery);
/* 在textarea处插入文本--Ending */