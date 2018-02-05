/**
 * 联系人或群组数据回填
 * obj为列表外盒子
 * data为联系人或群的数据
 */
function mCommon_basicContactGroupBackfill(obj,data,initText){
	obj.find(".mCommon_basicContactGroupBackfill_initText").text(initText);
	var contactGroupDom = obj.find(".mCommon_basicContactGroupBackfill_contactList");
	contactGroupDom.empty();
	if(data == ''){
		contactGroupDom.hide();
		return false;
	}
	var template = '';
	for(var i=0; i < data.length; i++){
		template += '<span>'+data[i].name;
		if(0 != data.length-1 && i != data.length-1){
			template += ',';
		}
		template += '</span>';
	}
	contactGroupDom.append(template);
};