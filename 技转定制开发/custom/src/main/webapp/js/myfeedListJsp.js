(function () {
    var companyID = $("#companyID").val();
    // 图文推送样式
    var tagID = $("#tagID").val();
    var mobileListStyle = $("#mobileListStyle").val();
    var uniqueCode = $("#uniqueCode").val();
    var toPersonID = $("#toPersonID").val();
    var tagName = $("#tagName").val();
    // 当前页数
    var $template = $("#_templateDiv");
    var $shortTextDiv = $("#_templateDiv").find("#_shortTextDiv").clone();
    var $richTextDiv = $("#_templateDiv").find("#_richTextDiv").clone();
    var pcManage = new PortalPcManage({
        currentCompanyID: companyID,
        isCanImportCommodity: true
    });
    var portalHtml5Data = new PortalHtml5Data();
    // 初始化页面
    function initPage() {
        $shortTextDiv.find("#_listBoxItemList").empty();
        $richTextDiv.find("#_listBoxItemList").empty();
        var options = {
            companyID: companyID,
            tagID: tagID,
            pcManage: pcManage,
            uniqueCode: uniqueCode,
            portalHtml5Data: portalHtml5Data,
            $shortTextDiv: $shortTextDiv,
            $richTextDiv: $richTextDiv,
            mobileListStyle: mobileListStyle,
            $template: $template,
            $topFrame: $("#_topFrame"),
            tagName : tagName
        };
        var portalFeed = new PortalHtml5Feed(options);
        if (uniqueCode == "header.bottomMenu.allFeed") {
            portalFeed.initAllFeedList(toPersonID);
        } else {
            portalFeed.initFeedList();
        }
    }

    initPage();
})();