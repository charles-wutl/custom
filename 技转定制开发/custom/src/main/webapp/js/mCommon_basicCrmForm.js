
//创建一条dom，参数为对象，例如{filedType:'select',filedTitle:'交辦給',filedPlaceholder:'請選擇',filedValue:'',filedDescript:'',errorMsg:'错误提示错误提示',required:false}，返回值为一条dom，jq对象
function mCommon_basicCrmForm_creatItem(dataObj,i){
    var box = $('<ul class="mCommon_controlFormGroup_item">'+
		'<li class="mCommon_controlFormGroup_item_lable wordBreak">'+dataObj.filedTitle+'</li>'+
		'<li class="mCommon_controlFormGroup_item_input"></li>'+
		'<li class="mCommon_controlFormGroup_item_error wordBreak" style="display:none">'+dataObj.errorMsg+'</li>'+
		'</ul>');

	if(dataObj.required){
		box.find('.mCommon_controlFormGroup_item_lable').prepend($('<i class="font_red">*</i>'));
	} else {
		//edit by cjshie 20170822 若不是必填的, 要加一個透明的*, 文字才會對齊
		box.find('.mCommon_controlFormGroup_item_lable').prepend($('<i style="color: rgba(0, 0, 0, 0);">*</i>'));
	};

	if(dataObj.filedType == 'block'){
		var box = $('<div></div>')
	}

	var cInputDom  = function (dataObj,dombox) {
		var dom;
		dataObj.id = dataObj.id || '';
		switch (dataObj.filedType){
			case 'input02':
				dom=$('<div id="'+dataObj.id+'" class="mCommon_basicCrmForm_input02 clearfixOverflow">'+
					'<img src='+ctxPath+'/images/basicIcon_arrowRightGrey.png>'+
					'<input type="text" value="" class="" placeholder="' + dataObj.placeholder + '">'+
					'</div>');
				break;
			case 'select':
				dom = $('<div id="'+dataObj.id+'" class="mCommon_basicSelect Select'+i+'">'+
					'<img src='+ctxPath+'/images/mCommon_basicSelect_icon.png>'+
					'</div>');
				mCommon_basicSelect({
					boxObj:dom,//input的容器外层容器，有触发事件，例如：$("#mCommon_basicTreeList_box")
					dataArray:dataObj.popupArray,//选项的数据，每个选线同时是指是否为有效值，例如：[{val:"val1",str:"选项1"},{val:"val2",str:"选项2"}]
					defaultObj:'',//弹出窗的默认值，参数是两级选项字符串的对象，例如{val:"val1",str:"选项1"}
					placeholder:dataObj.placeholder,//string,//placeholder文字"请选择"
					disable:false,//不可用
					selectedFun:function(selectObj){//确定按钮的回调函数，参数是两级选项字符串的对象，例如{val:"val1",str:"选项1"}
						//$("title").html(selectObj.val+"/"+selectObj.str);
						//setTimeout(function(){},300);//回调参考
						console.log(selectObj);
					}
				});
				break;
			case 'select02':
				dom = $('<div id="'+dataObj.id+'" class="mCommon_basicSelect Select'+i+'">'+
					'<img src='+ctxPath+'/images/mCommon_basicSelect_icon.png>'+
					'</div>');
				mCommon_jsTreeList({
					boxObj:dom.eq(0),//jqObj,//input的容器外层容器，有触发事件
					hierarchy:2,//选项层级2，下面的数组为二维数组；（选项层级 1或2；下面的数组要相应 传入 一维数组 或二维数组）
					dataArray: dataObj.popupArray,//array两级选项的数据，每个选项同时是指是否为有效值
					placeholder:dataObj.placeholder,//string,//placeholder文字"请选择"
					disable:false,//不可用
					//defaultObj:{dates:"2012-12-11",times:"03:11-04:20"},//obj,//弹出窗的默认值，参数是两级选项字符串的对象，例如{dates:"2010年11月3日",times:"11:00-12:00"}
					selectedFun:function(selectedObj){//function//确定按钮的回调函数，参数：
						setTimeout(function(){
							//alert("你选择了"+selectedObj.dates+" "+selectedObj.times+"-索引是:"+selectedObj.datesIndex+"/"+selectedObj.timesIndex);
						},300);
					}
				});
				break;
			case 'calendar':
				dombox.addClass('mCommon_controlFormGroup_itemError');
				dom=$('<div id="'+dataObj.id+'" class="mCommon_basicInputDatetime clearfixOverflow" >'+
					'<input type="text" placeholder="'+dataObj.placeholder+'" class="scroller mCommon_basicCrmForm_datetime" >'+
					'<img src='+ctxPath+'/images/mCommon_basicDate_icon.png>'+
					'</div>');
				var value = dataObj.value || '';
				mCommon_basicInputDatetime_init(dom.find('.mCommon_basicCrmForm_datetime'),'datetime',value);
				break;
			case 'calendar02':
				dombox.addClass('mCommon_controlFormGroup_itemError');
				dom=$('<div id="'+dataObj.id+'" class="mCommon_basicInputDatetime clearfixOverflow" >'+
					'<input type="text" placeholder="'+dataObj.placeholder+'" class="scroller mCommon_basicCrmForm_time" >'+
					'<img src='+ctxPath+'/images/mCommon_basicIcon_publishTime.png style="width: 17px;height: 17px;margin-top: -20px;margin-right:0px;">'+
					'</div>');
				var value = dataObj.value || '';
				mCommon_basicInputDatetime_init(dom.find('.mCommon_basicCrmForm_time'),'time',value);
				break;
			case 'text':
				dom=$('<div id="'+dataObj.id+'" class="mCommon_basicInputTel">'+
					'<input placeholder="'+dataObj.placeholder+'" type="text">'+
					'</div>');
				break;
			case 'number':
				dom=$('<div id="'+dataObj.id+'" class="mCommon_basicInputNum">'+
					'<input placeholder="'+dataObj.placeholder+'" type="number">'+
					'</div>');
				break;
			case 'tel':
				dom=$('<div id="'+dataObj.id+'" class="mCommon_basicInputTel">'+
					'<input placeholder="'+dataObj.placeholder+'" type="tel">'+
					'</div>');
				break;
			case 'contact':
				dom=$('<div id="'+dataObj.id+'" class="mCommon_basicInputContact mCommon_basicCrmForm_contact clearfixOverflow" >'+
					'<img src='+ctxPath+'/images/basicIcon_arrowRight32.png>'+
					'<input placeholder="'+dataObj.placeholder+'" type="text" readonly>'+
					'</div><div class="mCommon_controlRelatedContent_detail_box"></div>');
				break;
			case 'location':
				dom=$('<div id="'+dataObj.id+'" class="mCommon_basicCrmForm_location clearfixOverflow">'+
					'<img src='+ctxPath+'/images/mCommon_basicCrmForm_location.png>'+
					'<input placeholder="'+dataObj.placeholder+'" type="text"/>'+
					'</div>')
				break;
			case 'servlet':
				dom=$('<div id="'+dataObj.id+'" class="mCommon_basicInputContact mCommon_basicCrmForm_contact clearfixOverflow" >'+
					'<input  type="text" readonly>'+
					'</div>');
				break;
			case 'pic':
				//console.log(mCommonLang({"zh_CN":"批量处理","zh_TW":"批量處理","en_US":"Batch processing"}))
				dombox.find('.mCommon_controlFormGroup_item_lable').append($('<br><i class="font_littlegray">'+dataObj.filedDescript+'</i>'));
				var picdom = $('<li class="mCommon_basicCrmForm_pic" ><li class="mCommon_controlFormGroup_item_lable mCommon_controlFormGroup_item_pic wordBreak"></li><div class="mCommon_controlThumbnail"><div class="mCommon_controlThumbnail_box">'+
					'</div></div></li>');
				for(var j=0;j<mCommon_basicCrmForm_imageArray.length;j++){
					console.log(mCommon_basicCrmForm_imageArray);
					var picContentDom=$('<span  class="mCommon_controlThumbnail_item">'+
						'<ul class="mCommon_controlThumbnail_item_box">'+
						'<li  class="mCommon_controlThumbnail_item_img"><img src="'+mCommon_basicCrmForm_imageArray[j].image+'"></li>'+
						'<li  class="mCommon_controlThumbnail_item_icon"><img src='+ctxPath+'/images/mCommon_basicIcon_deleteRed.png></li>'+
						'</ul>'+
						'</span>');
					picdom.find('.mCommon_controlThumbnail_box').append(picContentDom);
				};
				dombox.append(picdom);
				dom=$('<div style="height: 10px;"></div>'+
					'<a id="'+dataObj.id+'" class="mCommon_basicUploadBtn" tapclass="mCommon_basicUploadBtn_tapClass" style="position: relative; overflow:hidden">'+
					'<em>+</em><i>' + dataObj.placeholder + '</i>'+
					'<input type="file" style="width:600px;height:40px;opacity :0; background-color: #fff; overflow:hidden;font-size:600px;position:absolute; top:0px; left:0px; right:0px;bottom:0px;margin:0; padding:0;z-index:2;zoom:1;">'+
					'</a>')
				break;
			case 'textarea':
				dom = $('<div id="'+dataObj.id+'" class="mCommon_basicTextArea">'+
					'<div class="mCommon_basicTextArea_box"><textarea placeholder="'+dataObj.placeholder+'" style="border:none;width:100%"></textarea></div>'+
					'</div>');
				break;
			case 'singleChoice':
				dom = $('<ul class="mCommon_basicSingleChoiceList" id="'+dataObj.id+'"></ul>');
				for(var j=0;j<dataObj.popupArray.length;j++){
					var domLi = $('<li><span id="'+dataObj.popupArray[j].id+'">'+dataObj.popupArray[j].str+'</span></li>');
					dom.append(domLi);
				}
				break;
			case 'block':
				dom = $('<div id="'+dataObj.id+'" style="width: 100%; background-color:'+dataObj.bcolor+' ;height: '+dataObj.height+'"></div>');
				break;
			case 'voice':
				dombox.find('.mCommon_controlFormGroup_item_lable').append($('<i class="font_littlegray">'+dataObj.filedDescript+'</i>'));
				var voicedom = $('<li class="mCommon_basicCrmForm_voice" style="display:none;"></li>');
				dom =$('<div style="height: 10px;"></div>'+
					//	'<a class="mCommon_basicUploadBtn" tapclass="mCommon_basicUploadBtn_tapClass" style="position: relative; overflow:hidden">'+
					'<a id="'+dataObj.id+'" class="mCommon_basicUploadBtn" tapclass="mCommon_basicUploadBtn_tapClass" >'+
					'<em>+</em><i>' + dataObj.placeholder + '</i>'+
					//	'<input type="file" style="width:600px;height:40px;opacity :0; background-color: #fff; overflow:hidden;font-size:600px;position:absolute; top:0px; left:0px; right:0px;bottom:0px;margin:0; padding:0;z-index:2;zoom:1;">'+
					'</a>');
				var voiceContentdom=$('<div class="mCommon_basicVoice_voicePlay"><span class="mCommon_basicVoice_listOptions borderPx1" tapclass="" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">'+
					'<table class="mCommon_basicVoice_listOptionsTable"><tbody><tr>'+
					'<td class="mCommon_basicVoice_tablePic">'+
					'<img class="mCommon_basicVoice_voice" src='+ctxPath+'/images/mCommon_basicIcon_voice.png>'+
					'</td>'+
					'<td class="mCommon_basicVoice_tableText wordBreak"><i class="mCommon_basicVoice_tableTextTitle">语音</i></td>'+
					'<td class="mCommon_basicVoice_tablePlayAndSuspend">'+
					'<img class="mCommon_basicVoice_tablePicRightPlay" src='+ctxPath+'/images/mCommon_basicIcon_play.png>'+
					'<img class="mCommon_basicVoice_tablePicRightSuspend" src='+ctxPath+'/images/mCommon_basicIcon_suspend.png>'+
					'<img class="mCommon_basicCrmForm_deleteVoice" src='+ctxPath+'/images/mCommon_basicIcon_deleteRed.png>'+
					'</td>'+
					'</tr></tbody></table>'+
					'</span></div>');
				voicedom.append(voiceContentdom);
				dombox.append(voicedom);
				break;
			case 'lunch':
				dombox.addClass('mCommon_basicCrmForm_lunch');
				dom = $('<div class="mCommon_basicLunchDom_Box" id="'+dataObj.id+'" >'+
					'<div class="mCommon_basicLunchDom_head">'+
					'<div class="mCommon_basicLunchDom_head_icon" tap></div>'+
					'<i class="mCommon_basicLunchDom_head_title">'+dataObj.subtitle+'</i>'+
					'</div>'+
					'<div class="mCommon_basicLunchDom_content">'+
					'<div class="mCommon_basicLunchDom_contentDom" >'+
					'</div></div></div>');
				var addBtn = $('<a class="mCommon_basicUploadBtn" tapclass="mCommon_basicUploadBtn_tapClass"> <em>+</em> <i>新增竞品咨询</i> </a>');
				dom.find('.mCommon_basicLunchDom_head_icon').click(function () {
					var tap = $(this).attr('tap'),h;
					if(tap == 'Up'){tap = 'Down';h = '100px'}else{tap = 'Up';h='auto'}
					$(this).attr('tap',tap).css('backgroundImage','url('+ctxPath+'/images/mCommon_basicLunchDom_arrow'+tap+'.png)').parent().parent().find('.mCommon_basicLunchDom_contentDom').css('height',h)
				})
				dombox.append(addBtn);
				break;
			case 'input':
				dom = $('<div class="mCommon_basicInputText" id="'+dataObj.id+'"><input placeholder="'+dataObj.placeholder+'" type="text"/></div>');
				break;
			default:
				dom = $('<div class="mCommon_basicInputText" id="'+dataObj.id+'"><input placeholder="" type="text"/></div>');
		}
		return dom;

	}

	var domcontent = cInputDom(dataObj,box);
	box.find('.mCommon_controlFormGroup_item_input').append(domcontent);
	if(dataObj.filedType == 'block'){
		box.append(domcontent);
	}
	if(dataObj.filedType == 'lunch'){
		var crearContent = function (box) {
			var deleteDom=$('<div class="mCommon_basicBtn_box2Center marginBottom10">'+
				'<a class="mCommon_basicBtn mCommon_basicBtn_red" tapclass="mCommon_basicBtn_red_tap">'+
				'<i>删除</i>'+
				'</a>'+
				'</div>');
			for(var i=0; i<dataObj.fileds.length; i++){
				var inbox = $('<div class="mCommon_controlFormGroup_box"><ul class="mCommon_controlFormGroup_item">'+
					'<li class="mCommon_controlFormGroup_item_lable wordBreak">'+dataObj.fileds[i].filedTitle+'</li>'+
					'<li class="mCommon_controlFormGroup_item_input"></li>'+
					'<li class="mCommon_controlFormGroup_item_error wordBreak" style="display:none">'+dataObj.fileds[i].errorMsg+'</li>'+
					'</ul></div>');
				var incontent = cInputDom(dataObj.fileds[i],inbox);
				inbox.find('.mCommon_controlFormGroup_item_input').append(incontent);
				box.find('.mCommon_basicLunchDom_contentDom').append(inbox);
			};
			box.find('.mCommon_basicLunchDom_contentDom').append(deleteDom);
			deleteDom.click(function(){
				$(this).parents('.mCommon_basicLunchDom_Box').css('display','none');
			})
		}
		crearContent(domcontent);
		var addBtn = box.find('.mCommon_basicUploadBtn');
		addBtn.click(function () {
			var ddom = $('<div class="mCommon_basicLunchDom_Box">'+
				'<div class="mCommon_basicLunchDom_head">'+
				'<div class="mCommon_basicLunchDom_head_icon" tap></div>'+
				'<i class="mCommon_basicLunchDom_head_title">'+dataObj.subtitle+'</i>'+
				'</div>'+
				'<div class="mCommon_basicLunchDom_content">'+
				'<div class="mCommon_basicLunchDom_contentDom" >'+
				'</div></div></div>');
			ddom.find('.mCommon_basicLunchDom_head_icon').click(function () {
				var tap = $(this).attr('tap'),h;
				if(tap == 'Up'){tap = 'Down';h = '100px'}else{tap = 'Up';h='auto'}
				$(this).attr('tap',tap).css('backgroundImage','url('+ctxPath+'/images/mCommon_basicLunchDom_arrow'+tap+'.png)').parent().parent().find('.mCommon_basicLunchDom_contentDom').css('height',h)
			})
			crearContent(ddom);
			ddom.insertBefore($(this));
			$('.mCommon_controlThumbnail_item').find('img').tap(function(){
				$(this).parents('.mCommon_controlThumbnail_item').css('display','none');
			});
			mCommon_jsImgCut0114($(".mCommon_controlThumbnail_item_img"),true);//图片剪裁
		})
	}
	return box;

};
//将数据插入dom中，参数为数组，无返回值
function mCommon_basicCrmForm_appendData(box,dataArray){
	for(var i=0;i<dataArray.length;i++){
		box.append(mCommon_basicCrmForm_creatItem(dataArray[i],i));
	}
};
