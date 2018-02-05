/*文件名自动字符截取
文件名中间断尾
保留后缀名和后缀名之前的两个中文字符
*/
function mCommon_basicLink_stringCut(setting) {
    this.option = {
        pageBox:$(window),//页面容器jq对象,默认为window
        obj: null,//插入区域jq对象
        string: null,//字符串（带后缀名的文件名）
        fontSize: 14,//字号
        cutWidht: 0,//整行去掉的宽度
        rows: 1,//显示行数
        maxWindowWidth: 640,//窗口最大宽度
        fileNameEndNum:0
    };
    setting = setting || {};
    $.extend(true, this.option, setting);

    if (this.option.obj == null || this.option.obj == "") {
        //alert("请设置容器对象");
    }
    if (this.option.string == null) {
        //alert("请设置字符串");
    }
    var self = this;


    this.cutString = function () {
        var winWidth = self.option.pageBox.width();

        if (winWidth > self.option.maxWindowWidth) {
            winWidth = self.option.maxWindowWidth;
        }
        var boxWidth = (winWidth - self.option.cutWidht) * 0.85;
        
        //每行显示的中文字数
        var stringLength = parseInt(boxWidth / self.option.fontSize) * self.option.rows;//显示的字符长度
        var newString = self.option.string;
        if (stringLength*2 <= newString.strLen()) {//判断字符长度是否需要截取
            newString = self.option.string.subCHStr(0, stringLength* 2);//截取字符串方法subCHStrFileName(总长度英文, 文件名保留)
        }
        
        self.option.obj.html(newString);// 写入新的字符串
    }


    //执行
    this.cutString();
    $(window).resize(function () {
        self.cutString();
    });
}