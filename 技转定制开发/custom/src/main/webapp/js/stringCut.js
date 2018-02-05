/*===中英文字符截取===
使用String.subCHStr(start,length)
字符串String
start开始字符 例如：0
length截取数量（英文字符） 例如：8
截取后为4个英文字符加...

文件名截取
使用String.subCHStrFileName(cutLength,endCutLength)
cutLength 截取总长度
endCutLength 尾部保留字符长度
都以英文计算
srting 带文件后缀的名称
*/ 

//计算字符串长度
String.prototype.strLen = function () {
    var len = 0;
    for (var i = 0; i < this.length; i++) {
        if (this.charCodeAt(i) > 255 || this.charCodeAt(i) < 0) len += 2; else len++;
    }
    return len;
};
//将字符串拆成字符，并存到数组中
String.prototype.strToChars = function () {
    var chars = [];
    for (var i = 0; i < this.length; i++) {
        chars[i] = [this.substr(i, 1), this.isCHS(i)];
    }
    String.prototype.charsArray = chars;
    return chars;
};
//判断某个字符是否是汉字
String.prototype.isCHS = function (i) {
    if (this.charCodeAt(i) > 255 || this.charCodeAt(i) < 0){
        return true;
    }else {
        return false;
    }
};
//截取字符串（从start字节到end字节）
String.prototype.subCHString = function (start, end) {
    var len = 0;
    var str = "";
    var dian = "";
	var len1=0;//字符串长度（英文计算）
    this.strToChars();//返回字符数组
    for (var i = 0; i < this.length; i++) {
        if (this.charsArray[i][1]) { len1 += 2; }
        else { len1++; }
    }
    if (len1 > end) { end = end - 2, dian = "..." }
    for (var i = 0; i < this.length; i++) {
        if (this.charsArray[i][1]) { len += 2; }
        else { len++; }
        if (end < len) { str = str + dian; return str; }
        else if (start < len) { str += this.charsArray[i][0]; }
    }
    return str;
};
//截取字符串（从start字节截取length个字节）
String.prototype.subCHStr = function(start, length){//参数开始和结束的数字，英文为准
    return this.subCHString(start, start + length);
};

//截取字符串最后几位（取的长度 字节）没有...
String.prototype.subCHStringEnd = function(cutLength){//参数截取的长度
    var len = 0;
    var str = "";
	//var dian="";
	var len1=0;//字符串长度（英文计算）
    this.strToChars();//返回字符数组

    for (var i = 0; i < this.length; i++) {
        if (this.charsArray[i][1]) { len1 += 2; }
        else { len1++; }
    }
    var end = len1;
    var start = end - cutLength;
    //if(len1>end){end=end-2,dian="..."}
    for (var i = 0; i < this.length; i++) {
        if (this.charsArray[i][1]) { len += 2; }
        else { len++; }
        if (end < len) { str = str + dian; return str; }
        else if (start < len) { str += this.charsArray[i][0]; }
    }
    return str;
};

//文件名称截取（参数：保留字符长度，尾部保留字符数 英文）
String.prototype.subCHStrFileName=function(cutLength,endCutLength){
	var len = 0;
    var str ="";//新字符串
	//var dian="";
	var len1=0;//字符串长度（英文计算）
	var len2=0;//尾部字符串长度（英文计算）
	
	if((cutLength-endCutLength)<4){//除文件名外剩余的部分过短，少于2个中文字符，就不保留尾部的截取了。
        str = this.subCHStr(0, cutLength);
        return str;
    }

    this.strToChars();//返回字符数组
	for(var i=0; i<this.length; i++){
        if(this.charsArray[i][1]){len1 += 2;}
        else{len1++;}
	}
	if(cutLength>=len1){//如果字符串长度小于截取长度，返回源字符串
		return this;
	}
	str=this.subCHStringEnd(endCutLength);//新字符串为尾部的截取字符串
	str.strToChars();//返回字符数组
	for(var i=0; i<str.length; i++){//计算尾部字符串长度
        if(str.charsArray[i][1]){len2 += 2;}
        else{len2++;}
	}
	var end=cutLength-len2;//计算断尾前字符串截取位置
	str=this.subCHStr(0,end)+str;//断尾前字符截取 和 尾部字符截取 相加
    return str;
};
