/**
 * Created by hewanxian on 16/5/11.
 */
function ContactList(options) {
    
}
$.extend(true, ContactList.prototype, {
    listContact : function (personID, companyID, term, page, count) {
        var self = this;
        $.ajax({
            url : _ctxPath + "/contact/listContlistContactact.json",
            data : {
                personID : personID,
                companyID : companyID,
                term : term,
                page : page,
                count : count
            },
            dataType : "JSON",
            type : "POST",
            success : function(result) {
                self.setContactList(result.result);
            },
            error : function() {
                alert("获取数据失败");
            }
        });
    },
    setContactList : function (data) {
        
    },
    listAllContact : function (companyID, term, page, count) {
        var self = this;
        $.ajax({
            url : _ctxPath + "/contact/listAllContact.json",
            data : {
                companyID : companyID,
                term : term,
                page : page,
                count : count
            },
            dataType : "JSON",
            type : "POST",
            async : false,
            success : function(result) {
                self.setAllContactList(result.result);
            },
            error : function() {
                alert("获取数据失败");
            }
        });
    },
    setAllContactList : function (data) {
        
    }
});