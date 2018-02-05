 $().ready(function () {
        /*--附件断尾--*/
        var downloadText = new mCommon_controlFileTool_stringCut({
            pageBox: $(window),//页面容器jq对象,默认为window
            obj: $(".mCommon_controlFileTool_textTitle"),//插入区域jq对象
            string: "0.71Graphic OLED 48x64",//字符串
            fontSize: 16,//字号
            cutWidht: 108,//整行去掉的宽度
            rows: 1,//显示行数
            maxWindowWidth: 640,//窗口最大宽度
            fileNameEndNum: 8//尾部截取的英文字符
        });
        /*--附件断尾end--*/
    });