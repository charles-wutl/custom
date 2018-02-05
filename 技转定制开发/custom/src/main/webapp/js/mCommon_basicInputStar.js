/*选择星星*/
function mCommon_basicInputStar(starBox) {//参数星星父容器 jq对象
    starBox.find("em").tap(function () {
        starBox.find("em").attr("class", "mCommon_basicInputStar_star mCommon_basicInputStar_starGray");
        $(this).prevAll().removeClass("mCommon_basicInputStar_starGray");
        $(this).prevAll().addClass("mCommon_basicInputStar_starYellow");
        $(this).removeClass("mCommon_basicInputStar_starGray");
        $(this).addClass("mCommon_basicInputStar_starYellow");
    });
}