/**
 * Jquery extend JS
 * 
 * @author Jackie
 */
$.ajaxSetup({
   global: true,
   type: "POST"

 });
jQuery.extend({
    /**
     * *
     * 
     * @see 将javascript数据类型转换为json字符串 *
     * @param 待转换对象,支持object,array,string,function,number,boolean,regexp *
     * @return 返回json字符串
     */
    toJSON : function(object) {
        var type = typeof object;
        if ('object' == type) {
            if ($.isArray(object))
                type = 'array';
            else
                type = 'object';
        }
        switch (type) {
            case 'undefined':
            case 'unknown':
                return;
                break;
            case 'function':
            case 'boolean':
            case 'regexp':
                return object.toString();
                break;
            case 'number':
                return isFinite(object) ? object.toString() : 'null';
                break;
            case 'string':
                return '"' + object.replace(/(\\|\")/g, "\\$1").replace(/\n|\r|\t/g, function() {
                    var a = arguments[0];
                    return (a == '\n') ? '\\n' : (a == '\r') ? '\\r' : (a == '\t') ? '\\t' : "";
                }) + '"';
                break;
            case 'object':
                if (object === null)
                    return 'null';
                var results = [];
                for ( var property in object) {
                    var value = jQuery.toJSON(object[property]);
                    if (value !== undefined)
                        results.push(jQuery.toJSON(property) + ':' + value);
                }
                return '{' + results.join(',') + '}';
                break;
            case 'array':
                var results = [];
                for ( var i = 0; i < object.length; i++) {
                    var value = jQuery.toJSON(object[i]);
                    if (value !== undefined)
                        results.push(value);
                }
                return '[' + results.join(',') + ']';
                break;
        }
    }
});

jQuery.fn.extend({
    addOption : function(options) {
        var self = this;
        if (!options) {
            return;
        }
        var option = document.createElement('option');
        var text = options.text;
        var value = options.value;
        var selected = options.selected || false;
        self.append(option);
        $(option).append(text);
        $(option).val(value);
        if (selected) {
            $(option).attr('selected', selected);
        }
    },

    clearOptions : function() {
        this.empty();
    },

    addAjaxOptions : function(ajaxOptions) {
        var options = {
            type : 'post',
            dataType : 'json'
        };
        var self = this;
        var option = $.extend(options, ajaxOptions);
        var successfun = ajaxOptions['success'];
        var optionfunc = function(data) {
            self.clearOptions();
            var textName = 'text';
            var valueName = 'value';
            var selectedName = 'selected';
            $.each(data.optionList, function(i, object) {
                var addOption = {};
                addOption.text = object[textName];
                addOption.value = object[valueName];
                addOption.selected = object[selectedName];
                self.addOption(addOption);
            });
            if (successfun) {
                sccessfun.call(this, data);
            }
        };
        ajaxOptions['success'] = optionfunc;
        $.ajax(ajaxOptions);
    }

});