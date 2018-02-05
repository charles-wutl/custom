    	 /*
    	  两级选择，选择一个选项下的子选项;
    	  或是一级选择;
    	  参数：
			{   
				boxObj:jqObj,//input的容器外层容器，有触发事件，例如：$("#mCommon_jsTreeList_box")
				hierarchy:2,//选项层级 1或2；下面的数组要相应 传入 一维数组 或二维数组
				dataArray:array,//一维数组 或二维数组 选项的数据，每个选线同时是指是否为有效值，例如：dateArr3 或 dateArr4
				placeholder:string,//placeholder文字"请选择"
				disable:false,//不可用
				defaultObj:Obj,//弹出窗的默认值，参数是两级选项 或 一级选项 字符串的对象，例如{dates:"2010-11-03",times:"11:00-12:00"} 或 {dates:"2010-11-03"}
				selectedFun:function//确定按钮的回调函数，参数是：
				                                      //例如{dates:"2010-11-03",datesIndex:"1",times:"11:00-12:00",timesIndex:"2"}
				                                      //或 {dates:"2010-11-03",datesIndex:"1"}
			}
    	 */

//var dateArr3 = [{
//	dates: '2012-12-10',
//	valid: false, //有效为否
//	times: [{
//		time: '02:10-02:20',
//		valid: true //有效为是
//	}, {
//		time: '03:11-04:20',
//		valid: true //有效为是
//	}]
//}, {
//	dates: '2012-12-28',
//	times: [{
//		time: '02:10-02:20',
//		valid: true //有效为是
//	}, {
//		time: '03:11-04:20',
//		valid: true //有效为是
//	}]
//}];

//var dateArr4 = [
//  {
//	dates: '2012-12-10',//日期数据
//	valid: false//有效为否
//  },
//  {
//	dates: '2012-12-13',//日期数据
//	valid: true//有效为否
//  },
// {
//	dates: '2012-12-28'//日期数据
//}];
  	function mCommon_jsTreeList(obj) { //{boxObj:jqObj,dataArray:array,defaultArray:array,selectedFun:function}
  		    var box=obj.boxObj;//盒子容器
  		    
  		    /*是否可用*/
			var disable = false;//不可用，默认为false
			if(obj.disable){//不可用是否有值
				disable = true;//不可用
			}
			var placeholder="请选择";//placeholder默认值
			if(obj.placeholder){
				placeholder=obj.placeholder;
			}
  		    
  		    if(box.find(">ul").length>0){
  		    	 box.find(">ul").remove();//删除原有的dom
  		    }
  		   if(box.find(">input").length>0){
  		  	  box.find(">input").remove();//删除原有的dom
			}
			
			
			/**dom结构**/
			var opt1Array=obj.dataArray;//一级选项数组
        	var optBox=$("<ul></ul>"); //所有选项的最大容器
			var opt1LiHtml = $('<li><span></span></li>');//一级选项html结构
			var opt2LiHtml = $('<li></li>');//二级选项html结构
			
			for(var i=0;i<opt1Array.length;i++){//opt1的循环
				var opt1 = opt1Array[i]; //一级选项string
				var opt1Valid=true;//选项1是否 有效
				var opt1Content = opt1.dates; //一级选项string
				var opt1LiHtmlClone = opt1LiHtml.clone();//可以一级容器
				
				if(opt1.valid!=null && opt1.valid!=undefined){//如果有值传入
					opt1Valid=opt1.valid;//选项1是否有效
				}
				if(!opt1Valid && obj.hierarchy==2){//如果 一级菜单为无效 并且 是两级筛选
					continue;//跳出本次循环
				}else if(!opt1Valid){ //如果 一级菜单为无效  是1级筛选
					opt1LiHtmlClone.attr("data-invalid","true");//写入无效标签
				}
				opt1LiHtmlClone.find("span").prepend(opt1Content);//一级选项写入内容
				//二级构造
				if(obj.hierarchy==2){//如果是两层筛选
					opt1LiHtmlClone.append("<ul></ul>");//预制的dom加入一层ul结构
					var opt2Array=opt1.times; //二级选项数组
					for(var j=0;j<opt2Array.length;j++){//opt2的循环
					var opt2=opt2Array[j];//二级选项
					var opt2Content=opt2.time;//二级选项内容
					var opt2LiHtmlClone = opt2LiHtml.clone();//复制二级html
					
					var opt2Valid=true;//选项2是否 有效
					if(opt2.valid!=null && opt2.valid!=undefined){//如果有值传入
						opt2Valid=opt2.valid;//选项2是否有效
					}
					if(!opt2Valid){//如果一级菜单为无效
						opt2LiHtmlClone.attr("data-invalid","true");//写入无效标签
					}

					opt2LiHtmlClone.append(opt2Content);//写入选项2内容
					opt2LiHtmlClone.appendTo(opt1LiHtmlClone.find("ul"));//选项2dom写入选项1dom
				}
				}
				opt1LiHtmlClone.appendTo(optBox);//构造的选项dom写入页面
			}
			box.append(optBox); //所有选项 写入页面
        	/**dom结构end**/
        	
        	/**取默认值**/
        	var defauleOptIndexArray=[];//默认值索引
			var defauleOpt1Index=0;//一级选项的默认值的index
			var defauleOpt2Index=0;//二级选项的默认值的index
			
			
			if(obj.defaultObj!=undefined && obj.defaultObj!=null){
				var defauleOpt1Val=obj.defaultObj.dates;//一级选项的默认值
				
				
				var opt1ObjArray=box.find("li > span");//查询所有的opt1
				for(var n=0; n<opt1ObjArray.length;n++){
					/*选项1选取默认index*/
					var opt1Text=opt1ObjArray.eq(n).text();//选项一中的文字
					if(defauleOpt1Val){//如果设置了一级选项的默认值
						if(opt1Text==defauleOpt1Val){//当前一级选项值 等于 一级选项的默认值
							defauleOpt1Index=n;//取到默认值opt 1的索引
						}
					}

					/*选项2选取默认index*/
					if(obj.hierarchy==2){//如果是两级筛选
						var defauleOpt2Val=obj.defaultObj.times;//二级选项的默认值
						var opt2ObjArray=opt1ObjArray.eq(n).parent().find("li");//当前选项1下的所有选项2
						for(var m=0; m<opt2ObjArray.length;m++){
							var opt2Text=opt2ObjArray.eq(m).text();//选项2中的文字
							if(defauleOpt2Val){//如果设置了2级选项的默认值
								if(opt2Text==defauleOpt2Val){//当前2级选项值 等于 2级选项的默认值
									defauleOpt2Index=m;//取到默认值opt 2的索引
								}
							}
						}
					}
				}
			}
			
			if(obj.hierarchy==2){//两级筛选
				defauleOptIndexArray=[defauleOpt1Index,defauleOpt2Index];//两层筛选赋值
			}else{//一级筛选
				defauleOptIndexArray=[defauleOpt1Index];//一层选项默认值	
			}
			
			
			
        	/**取默认值end**/
        	
        	
        	/**mobiscroll初始化**/
            var myMobile=box.find(">ul").mobiscroll().treelist({//obj.boxObj为容器对象
            	cancelText:'取消', //取消按钮文字
            	setText:'確定', //确定按钮文字
                lang:'zh', //语言              
                closeOnOverlay:true, //true点击黑色浮层任意位置关闭,false点击黑色浮层任意位置不关闭
                disabled:disable,//false输入框点击没反应，true输入框点击出现日期弹层

                maxWidth:200, //最大宽度
                minWidth:120, //最小宽度
                height:40, //显示时间的高度
	            rows: 3,//显示三行
                theme: 'android-holo-light',
                display: 'modal',             
                placeholder:placeholder,
//               headerText: "请选择日期",//选择结果写入头部
				onClose:function(selectText,inst){//关闭浮层，valueText是结果字符串，inst是按钮文字
					if(inst=="set"){//点击确定按钮
							var selectedArray=arguments[2]._tempWheelArray;//取当前选中索引[1,2]
							var opt1Text=optBox.find('>li').eq(selectedArray[0]).children('span').text();//选项1的文字
							var opt1Index=selectedArray[0];//选项1的索引
							var opt2Text=optBox.find('>li').eq(selectedArray[0]).find('ul li').eq(selectedArray[1]).text();//选项2的文字
							var opt2Index=selectedArray[1];//选项2的索引
							var selectedObj={dates:opt1Text,datesIndex:opt1Index,times:opt2Text,timesIndex:opt2Index};//选中的选项 obj
							obj.selectedFun(selectedObj);//传入参数的 回调函数
					}
				},
               defaultValue:defauleOptIndexArray,//浮出层的默认值
				formatValue:function (array) { //自定义格式结果  
					if(obj.hierarchy==2){//如果是两级选项
						return optBox.find('>li').eq(array[0]).children('span').text() +' '+ optBox.find('>li').eq(array[0]).find('ul li').eq(array[1]).text();  
					}else{//如果不是两级选项
						return optBox.find('>li').eq(array[0]).children('span').text() ;  
					}
					
				} 
            });   
            /**mobiscroll初始化end**/
           
           
           //input里写入默认值
           if(obj.defaultObj!=undefined && obj.defaultObj!=null){
           		if(obj.hierarchy==2){//如果是两级选项
            		box.find("input").val(defauleOpt1Val+" "+defauleOpt2Val);
            	}else{//如果不是两级选项
            		box.find("input").val(defauleOpt1Val);
            	}
           }
            
           //整个div出现选项
		   box.click(function(){
				myMobile.mobiscroll('show');//点击出现选项
		   });
		            
        }




