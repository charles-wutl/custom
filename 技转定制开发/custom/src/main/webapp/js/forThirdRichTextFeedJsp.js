/**
 * Created by tianbaolong on 1/29/16.
 */
(function (){
	var pageReady = false;
	var portalHtml5Data = new PortalHtml5Data();
	var portalHtml5Feed = new PortalHtml5Feed();
	var $TemplateDiv = $("#_templateDiv");
	/**
	 * 初始化图文页面
	 */
	function initRichTextPageEevent(){
		var $template = $("#_push_richText_content_div");
		//获取personFeed
		var personFeed = $("#personFeedJson").html();
		personFeed = eval("(" + personFeed + ")");
		//构造图文推送头部内容
		constractRichTextHeader($template, personFeed);
		//写入图文推送内容
		var richTextContent = personFeed.richText.context;
		$template.find("#_richText_content_span").html(richTextContent);
		initLocationClickEvent($template.find("#_richText_content_span"));
		portalHtml5Feed.showBigImage($template.find("#_richText_content_span"));
		////处理地理位置事件
		//var locationTemplate = $TemplateDiv.find("#_lbs").clone();
		//portalHtml5Feed.constructLbs($("#_richText_location_span"),locationTemplate,personFeed);
		//构造语音
		var $voicTemplate = $TemplateDiv.find("#_musicAndVoice");
		portalHtml5Feed.constructMusicAndVoice($("#_richText_voice_span"),$voicTemplate,personFeed);
		//构造表单事件
		var $formTemplate = $TemplateDiv.find("#_serviceApp");
		portalHtml5Feed.constructServiceApp($("#_richText_form_span"),$formTemplate,personFeed);
		//附件构造方法
		var $attachment = $TemplateDiv.find("#_attachment");
		portalHtml5Feed.constructAttachment($("#_richText_attachement_span"),$attachment,personFeed);
		var readListLength = personFeed.readList ? personFeed.readList.length : 0;
		var praiseListLength = personFeed.praiseList ? personFeed.praiseList.length : 0;
		portalHtml5Data.readPersonList = personFeed.readList;
		var commentsNum = personFeed.commentsNum || 0;
        var browseNum = personFeed.browseNum || 0;
		portalHtml5Data.constractOptionTab(commentsNum,readListLength,praiseListLength,browseNum,$("#visitShowType").val());
		if(personFeed.richText.canFeedBack == "0"){
			$("#_feed_reply_btn").html("该消息不允许回复");
			$("#_feed_reply_btn").attr("canFeedBack",personFeed.richText.canFeedBack);
		}
		//初始化 点赞事件
		var canFeedBack = personFeed.canFeedBack;
		portalHtml5Data.initReplyAndPraiseEvent(personFeed.praiseList,canFeedBack);
		
	}

	/**
	 * 注册图文推送中 地理位置链接
	 * @param template
	 */
	function initLocationClickEvent(template){
		template.find("a[clas='locationcls']").each(function (){
			var map = $("#_templateDiv").find("#_lbs").clone();
			var locationName = $(this).attr("name");
			if(locationName==null){
				locationName=$(this).text();
			}
			var location = $(this).attr("location");
			var address = $(this).attr("address");
			map.find("#_lbsName").html(locationName);
			map.attr("location", location);
			map.attr("address", address);
			map.show();
			$(this).hide().after(map);
			map.unbind("tap").bind("tap", function (e){
				var location = $(this).attr("location");
				var address = $(this).attr("address");
				if (da.djJsReady) {
					var lat = location.substring(0, location.indexOf(","));
					var lon = location.substring(location.indexOf(",") + 1);
					da.showLocation({
						lat : lat,
						lon : lon,
						addr:address
					});
				} else {
					var url = "";
					if (null != location && "" != location) {
						url = "http://mo.amap.com/?q=" + location + "&name=" + address + "&dev=0";
					} else {
						url = "http://mo.amap.com/?q=31.234527,121.287689&name=park&dev=0";
					}
					window.location.href = url;
				}
				// 阻止块冒泡
				e.stopPropagation();
			});
		});
	}

	/**
	 * 构造头部信息
	 * @param $template
	 * @param personFeed
	 */
	function constractRichTextHeader($template,personFeed){
		//当前人员id
		var currentPersonID = $("#currentPersonID").val();
		var publishPersonID = personFeed.publishPersonID;
		var feedID = personFeed.feedID;
		if ($("#showOperate").val() == 1) {
			//判断当前人是否作者本人
			if (publishPersonID == currentPersonID){
				$template.find("#_richText_opration").find("#_richText_reportal").hide();
				$template.find("#_richText_opration").find("#_richText_delete").show();
				//注册删除事件
				portalHtml5Data.initDeleteFeedEvent($template.find("#_richText_opration").find("#_richText_delete").find("a"), personFeed);
			} else {
				$template.find("#_richText_opration").find("#_richText_reportal").show();
				$template.find("#_richText_opration").find("#_richText_delete").hide();
				//注册举报事件
				var $aBtn = $template.find("#_richText_opration").find("#_richText_reportal").find("a");
				$aBtn.attr("feedID",feedID);
				portalHtml5Data.initReportFeedEvent($aBtn);
			}
		} else {

			$template.find("#_richText_opration").find("#_richText_reportal").hide();
			$template.find("#_richText_opration").find("#_richText_delete").hide();
		}

	}
	//页面开始加载处理
	$(document).ready(function (){
		var inDajia = navigator.userAgent.indexOf("dajia/") != -1;
		if (inDajia){
			da.ready(function () {
				initForThirdRichTextFeed();
			});
		} else {
			initForThirdRichTextFeed();
		}

	});
	function initForThirdRichTextFeed() {
		if (!pageReady) {
			var feedID = $("#feedID").val();
			initRichTextPageEevent();
			mPicTextPush_details_setPicHeight($(".mPicTextPush_details_conprehensiveBox"));
			//初始化  阅
			portalHtml5Data.initReplyEvent(feedID);
			pageReady = true;
		}
	};
	window.web = {};
	window.web.feedPraise=function(isAdd){
		var n=$("#_praiseTabBtn").attr("praisePersonLenth");
		n=parseInt(n)+isAdd;
		if(n<0){
			n=0;
		}
		$("#_praiseTabBtn").attr("praisePersonLenth", n);
		$("#_praiseTabBtn").text("赞" + n);
	};
	window.web.refreshComment = function () {
		if ($("#mCommon_basicTab0114 .mCommon_basicTab0114_Menu_active").index() == 0) {
			portalHtml5Data.tapChangedEvent($("#mCommon_basicTab0114 .mCommon_basicTab0114_Menu_active"), $("#visitShowType").val());
		};
	};
})();
