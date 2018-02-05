// html5信息流控制器
function PortalHtml5Feed(options) {
    this.setting = {
        companyID: "",
        tagID: "",
        uniqueCode: "",
        pcManage: {},
        groupID: "",
        portalHtml5Data: {},
        $shortTextDiv: null,
        $richTextDiv: null,
        $template: null,
        $topFrame: null,
        mobileListStyle: null,
        pullUpObj: null,
        groupName: null,
        tagName: null
    };
    this.mobileListStyle = ""; // 图文推送样式
    // 当前页数
    this.nextPageNumber = 0;
    this.currentPersonID = "";
    this.pageMaxSize = 10;
    this.totalSize = 0;
    this.lastTime = 0;
    this.feedDetailUrl = _ctxPath + "/r/mp/feedInfo/{0}/{1}";
    // 多附件中文件类型
    this.FILE_ATTACHMENT_FILE_TYPE_PIC = 1;// 图片
    this.FILE_ATTACHMENT_FILE_TYPE_DOC = 2;// 文件
    this.FILE_ATTACHMENT_FILE_TYPE_SOUND = 3;// 声音
    this.FILE_ATTACHMENT_FILE_TYPE_WEB = 4; // 网页

    this.IMAGE_APP_UNIQUE = "sm.menu.mobile.photograph";
    this.BLOG_APP_UNIQUE = "sm.menu.blog";
    this.FORM_APP_UNIQUE = "common_iconLeft26_form";
    // 左图右文
    this.MOBILE_LIST_STYLE_LEFT = 1;
    // 左文右图
    this.MOBILE_LIST_STYLE_RIGHT = 2;
    // 中间大图
    this.MOBILE_LIST_STYLE_TOP = 3;
    this.esnMobile = new ESNMOBILE();
    this.pullUp = null;
    this.HOTFEED_HOTPERSON = 1;
    this.HOTFEED_HOTGROUP = 6;
    this.inDajia = navigator.userAgent.indexOf("dajia/") != -1;
    this.srcPath = _ctxPath;
    this.successPic = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo4ODRDQTRGREZGQzYxMUU1OEYwMEFBODNDMDlGMUE2NyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo4ODRDQTRGRUZGQzYxMUU1OEYwMEFBODNDMDlGMUE2NyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjg4NENBNEZCRkZDNjExRTU4RjAwQUE4M0MwOUYxQTY3IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjg4NENBNEZDRkZDNjExRTU4RjAwQUE4M0MwOUYxQTY3Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+qYMBIgAABkhJREFUeNrsnG1o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';//提示的图片地址，字符串类型，必填
    this.failPic = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxMkUyRTFGOTAwNjMxMUU2QjFFQ0RCOTU3MDBCQ0QxQSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoxMkUyRTFGQTAwNjMxMUU2QjFFQ0RCOTU3MDBCQ0QxQSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjEyRTJFMUY3MDA2MzExRTZCMUVDREI5NTcwMEJDRDFBIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjEyRTJFMUY4MDA2MzExRTZCMUVDREI5NTcwMEJDRDFBIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+rPbKzAAABydJREFUeNrsXGts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';
    this.warningPic = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxMkUyRTFGRDAwNjMxMUU2QjFFQ0RCOTU3MDBCQ0QxQSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoxMkUyRTFGRTAwNjMxMUU2QjFFQ0RCOTU3MDBCQ0QxQSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjEyRTJFMUZCMDA2MzExRTZCMUVDREI5NTcwMEJDRDFBIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjEyRTJFMUZDMDA2MzExRTZCMUVDREI5NTcwMEJDRDFBIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+WHXY9AAABmZJREFUeNrsnFtsFUUYx7eFEntFYjWKAvGS1kuJNI2J0dZADRThpT5QtIRI1PKg0kjQV3gQE2KM8UJpTLw0MVIjGn1Rgxcklhc1hEqrQtVKvTTKra2toLT0+P/sf8t0Odszp+fsnj278yW/7DRtd2f+O7s78803X04sFrOMzdxyjIBGQCOgEXDmNgssAbeCclAGbgCXgSJQzL8bBiPgFPgR9ICj4BvQCc5HScAF4F5wN7gLXJri+QbBF+Az8A7oD6OAl4C14EFQI9eN8zfjbPwxcIK9bZy/K2GPnAuuBfNBbpxzSE/8FLwB3gX/ZLuA0uBm8Bi4wvE7eSQ7wD5wAHSBvzXPWwgWg2pQy5tS5Pib42AneBEMedZCEdAD5oAt4HRsqg2D10EdmJ3G68m5VvDcw45rnmJd5njRVi/EWwZ6HI04Bh4HJR7dMBW5xibQ66hDD+sWWAELwC4wrlS6H2wEeT4I5ySP1+5X6jPOOhYETcAy0KVUdBQ8A4oyIJyTItZlVKlfN+scCAHl3TPoeFSqAiCckyrHq2WIdc+ogOsdd/Ytn95zqbwf2x1PygOZErBJed/J8YkAC+dks6PuTX4LuAaMsQLn2BOtLGM96x5jWxr8ErAW/MsLy3FVFopns9rRllqvBSxTPhjS9ddlsXg265THeTDZr3MyU7kC8CWo4M9Pgmc9mBx1cK4bz/o5bUu3bVHa8h24DZxJ91SuRfl6tXvYI/pi7tbn4XV3K9dpSfcjXKN086OgOIQCFrNt9uupWuf/cjU66WzQQheUuIsa6eAMmw2zbefZ1l1s+7SmI2AzXUdireBgiD30BymcxTY3p+oPFH/ez2Ae+APcRA+wl9YHFrr87hewyOPrS5uPgCvBAB24QzPtgZsontg2H8QLgolYW1mel6gXTtcD83nHS+lmlwWfUR8akOkeaL/3ZdHqOnCS9TmbbA9soHhiz/kkXlBsDDzPcim1SPoRfkhZu2iL4JJvG9su9nCyAi7kgo3YnpAOW3SGNXtYvtPtteImYL2y9Nge4cADu+05XMvWFnC18kXaH2EB9ytDmFW6AuYpj+8nEft4OG2UGljUJE9HwEp6XmzPSNStQ/FGVeoIuEQpf2X0s7520cZVwAqlfMToZ32vlBfrCHg9j39GZOqWyAaphcWZSUIB7fHOD0a7SbO1WKAjYKnSA41N1eJyHQHtMLHTRrdJs7UoTEbAMaPbFOeCWLGOgOeU6YuxBFrkukyixUqMbpNmazGiI+CIETA1Ae2x31yj26TZOwlO6Aj4O4+LjG4XjY1/1RHwJx6vjvfZjqAVUguxXh0Bu3mUXUS3GP3+12AWy106AnYq5duNflM06NQR8JB1ITKpxug3qcEZajN1gOiyLrwXrLAm3Nky/4uqV1rWh09yRPIxqNPpgWIfKEOZpRHufUuV4dyHujMRsfeB3TXvi7CA9/MoWrwXd443TWiHrAVUc/Q934re2rA4DiQiVpwrB9y+B9NFJrzCo5xgQwR73wbrgmfqVVcvQwCDizIRIx3v46EVXJQohHWrEl670aeo+UyF+Do3Edm2LZUofWeA5Y2Wl5uXJyzT4W3ieZHVyKusNARYyj9uZ1kiNp+KwLtvO8UTezphh9HcDX5Y2RJVFeJHuErZwnZYZ1e9TpC5rAc8yrGQTKp3W3HWBkIybHmTbYyxzQnXhXI1Ty5fxlaW5Wv8cggFlDaVs9xqacYFJbvVS+JEbubPEoC+MyTDGMkq8hLLnm31EsqVzYbyrqgPwWbDeuW9N8g2+rrddWUWi7fS7+2uNg3KXZMLN2aheI2KeNKWtZne8r/ZbPlPPenEayA/wMLls46BSDqhpj0ZUir1LagMoHiVrJua9qQuKIl3ypnMRr2zOwKUeGdHnMQ75ek4vx+pn5rSnGgsmYRkTdmS+sk5zHEmH+tlQrBin3qcW/Kx2nRfz+v0dwNx0t/JS3y5B+nvlvPczvR3A16mv/M6AaO93/YR6+IEjLLGIqk7P+f0rVt7+jQxrazgtG6ZNZFK1OngOM457Qv063lifqYAldU92fV4h+WeAvQ3OlTtFKAxxVNSyBsiDtVrLPcUoHJD2qyQpACNZyKAbNy7hz0oP8XznWUP/gi8bYU0Ca2byd6zSj6OahrkUrrWC5Swir+4wKOmQZbH/lAmIydMIm4joBHQCBhl+0+AAQA0e3ZwqiM+UAAAAABJRU5ErkJggg==';
    $.extend(true, this.setting, options);
}
$.extend(true, PortalHtml5Feed.prototype, {
    // 初始化信息流列表
    initFeedList: function () {
        var self = this;
        self.setting.$shortTextDiv.find("#_listBoxItemList").empty();
        self.setting.$richTextDiv.find("#_listBoxItemList").empty();
        self.setting.$topFrame.html(self.setting.$shortTextDiv);
        // 关键方法========================
        /*
         * 滑到底部加载数据 列表内容中的图片要有高度，因为图片不会同步加载过来，否则列表盒子找不到高度
         * 初始化加载数据后，如果不满一屏且还有数据就再加载数据直到盛满一屏；
         */
        var listBox = self.setting.$shortTextDiv.find("#_listBoxItemList");// 列表容器
        self.setting.pullUpObj = new mCommon_jsPullToRefresh({ // 实例化上拉类
            loadingDiv: $('<p class="mCommon_jsPullToRefresh_loading"><img class="mCommon_jsPullToRefresh_loading_icon" src="'+self.srcPath+'/modulev1/portalHtml5/images/mCommon_basicIcon_loading.png"/>加载中</p>'),
            // 加载中显示的jq对象
            // noneMoreDiv:$("<p
            // class='mCommon_jsPullToRefresh_noneMore'>没有更多内容</p>"),//没有更多内容显示的jq对象
            listOuterBox: listBox,// jquery对象,列表外容器容器，找底边位置用
            loadData: function () {// 加载数据回调
                self.requestFeedData(this.refresh);// 数据请求模拟

                // 参数：删除圆球方法，append的容器
            }
        });
        // 关键方法end========================
    },
    /**
     * 初始化全部消息
     * @param personID
     */
    initAllFeedList: function (personID) {
        var self = this;
        self.setting.$shortTextDiv.find("#_listBoxItemList").empty();
        self.setting.$richTextDiv.find("#_listBoxItemList").empty();
        self.setting.$topFrame.html(self.setting.$shortTextDiv);
        // 关键方法========================
        /*
         * 滑到底部加载数据 列表内容中的图片要有高度，因为图片不会同步加载过来，否则列表盒子找不到高度
         * 初始化加载数据后，如果不满一屏且还有数据就再加载数据直到盛满一屏；
         */
        var listBox = self.setting.$shortTextDiv.find("#_listBoxItemList");// 列表容器
        self.setting.pullUpObj = new mCommon_jsPullToRefresh({ // 实例化上拉类
            loadingDiv: $('<p class="mCommon_jsPullToRefresh_loading"><img class="mCommon_jsPullToRefresh_loading_icon" src="'+self.srcPath+'/modulev1/portalHtml5/images/mCommon_basicIcon_loading.png"/>加载中</p>'),
            // 加载中显示的jq对象
            // noneMoreDiv:$("<p
            // class='mCommon_jsPullToRefresh_noneMore'>没有更多内容</p>"),//没有更多内容显示的jq对象
            listOuterBox: listBox,// jquery对象,列表外容器容器，找底边位置用
            loadData: function () {// 加载数据回调
                self.setting.pullUpObj = this;
                self.requestAllFeedData(personID, self.setting.pullUpObj.refresh);// 数据请求模拟

                // 参数：删除圆球方法，append的容器
            }
        });
        // 关键方法end========================
    },
    // 初始化成员列表
    initGroupPersonList: function (inputValue) {
        var self = this;
        // 关键方法========================
        /*
         * 滑到底部加载数据 列表内容中的图片要有高度，因为图片不会同步加载过来，否则列表盒子找不到高度
         * 初始化加载数据后，如果不满一屏且还有数据就再加载数据直到盛满一屏；
         */
        self.cleanCacheData();
        var listBox = $(".mGroup_groupContent_peopleListBox");//列表容器
        self.setting.pullUpObj = new mCommon_jsPullToRefresh({ // 实例化上拉类
            loadingDiv: $('<p class="mCommon_jsPullToRefresh_loading"><img class="mCommon_jsPullToRefresh_loading_icon" src="'+self.srcPath+'/modulev1/portalHtml5/images/mCommon_basicIcon_loading.png"/>加载中</p>'),
            // 加载中显示的jq对象
            // noneMoreDiv:$("<p
            // class='mCommon_jsPullToRefresh_noneMore'>没有更多内容</p>"),//没有更多内容显示的jq对象
            listOuterBox: listBox,// jquery对象,列表外容器容器，找底边位置用
            loadData: function () {// 加载数据回调
                self.setting.pullUpObj = this;
                self.requestGroupPersonData(self.setting.pullUpObj.refresh, inputValue);// 数据请求模拟

                // 参数：删除圆球方法，append的容器
            }
        });
        // 关键方法end========================
    },
    // 群组信息流
    initGroupFeedList: function () {
        var self = this;
        self.cleanCacheData();
        self.setting.$shortTextDiv = self.setting.$template.find("#_shortTextDiv").clone();
        self.setting.$shortTextDiv.find("#_listBoxItemList").empty();
        $(".mGroup_groupContent_feedListBox").html(self.setting.$shortTextDiv);
        // 关键方法========================
        /*
         * 滑到底部加载数据 列表内容中的图片要有高度，因为图片不会同步加载过来，否则列表盒子找不到高度
         * 初始化加载数据后，如果不满一屏且还有数据就再加载数据直到盛满一屏；
         */
        var listBox = $(".mGroup_groupContent_feedListBox");// 列表容器
        self.setting.pullUpObj = new mCommon_jsPullToRefresh({ // 实例化上拉类
            loadingDiv: $('<p class="mCommon_jsPullToRefresh_loading"><img class="mCommon_jsPullToRefresh_loading_icon" src="'+self.srcPath+'/modulev1/portalHtml5/images/mCommon_basicIcon_loading.png"/>加载中</p>'),
            // 加载中显示的jq对象
            // noneMoreDiv:$("<p
            // class='mCommon_jsPullToRefresh_noneMore'>没有更多内容</p>"),//没有更多内容显示的jq对象
            listOuterBox: listBox,// jquery对象,列表外容器容器，找底边位置用
            loadData: function () {// 加载数据回调
                self.setting.pullUpObj = this;
                self.requestGroupFeedData(self.setting.pullUpObj.refresh);// 数据请求模拟

                // 参数：删除圆球方法，append的容器
            }
        });
        // 关键方法end========================
    },
    // 初始化个人空间信息流
    initPersonFeedList: function (publishPersonID) {
        var self = this;
        self.setting.$shortTextDiv.find("#_listBoxItemList").empty();
        self.setting.$richTextDiv.find("#_listBoxItemList").empty();
        self.setting.$topFrame.html(self.setting.$shortTextDiv);
        // 关键方法========================
        /*
         * 滑到底部加载数据 列表内容中的图片要有高度，因为图片不会同步加载过来，否则列表盒子找不到高度
         * 初始化加载数据后，如果不满一屏且还有数据就再加载数据直到盛满一屏；
         */
        var listBox = self.setting.$shortTextDiv.find("#_listBoxItemList");// 列表容器
        self.setting.pullUpObj = new mCommon_jsPullToRefresh({ // 实例化上拉类
            loadingDiv: $('<p class="mCommon_jsPullToRefresh_loading"><img class="mCommon_jsPullToRefresh_loading_icon" src="'+self.srcPath+'/modulev1/portalHtml5/images/mCommon_basicIcon_loading.png"/>加载中</p>'),
            // 加载中显示的jq对象
            // noneMoreDiv:$("<p
            // class='mCommon_jsPullToRefresh_noneMore'>没有更多内容</p>"),//没有更多内容显示的jq对象
            listOuterBox: listBox,// jquery对象,列表外容器容器，找底边位置用
            loadData: function () {// 加载数据回调
                self.setting.pullUpObj = this;
                self.requestPersonFeedData(publishPersonID, self.setting.pullUpObj.refresh);// 数据请求模拟

                // 参数：删除圆球方法，append的容器
            }
        });
    },
    requestPersonFeedData: function (personID, callBack) {
        var self = this;
        var data = {
            tagID: self.setting.tagID,
            companyID: self.setting.companyID,
            nextPageNumber: self.nextPageNumber + 1,
            publishTime: self.lastTime,
            tagName: self.setting.tagName
        };
        var options = {
            url: _ctxPath + "/r/mp/lmaf/" + personID + "/" + (self.nextPageNumber + 1),
            dataType: 'json',
            type: "POST",
            data: data,
            success: function (data) {
                var more = false;
                if (!data || !data.page.dataList || data.page.dataList.length == 0) {
                    more = false;
                    var $nullPage = $("#_nullPageDiv").clone();
                    $nullPage.find("#_content").html("暂无消息");
                    $nullPage.show();
                    self.setting.$topFrame.append($nullPage);
                    mCommon_controlPrompt($nullPage, 139);
                } else {
                    self.totalSize = data.page.totalSize;
                    self.nextPageNumber = data.page.currentPageNumber;
                    var personFeedList = data.page.dataList;
                    self.setting.$shortTextDiv.show();
                    self.constructNormalFeed(self.setting.$shortTextDiv, false, true, personFeedList);
                    if ((self.totalSize > 10 && (self.totalSize / 10 - self.nextPageNumber) < 0) || (self.totalSize < 10 && self.nextPageNumber > 0)) {
                        more = false;
                    }
                }
                mCommon_basicLoadingRemove();//删除loading层
                callBack && callBack.call(this, more);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                mCommon_basicLoadingRemove();//删除loading层
                if (textStatus != "error") {
                    var popup = new mCommon_controlPagePopupPrompt_setPromptInfo({
                        promptImg: self.warningPic,
                        promptText: "出错了,稍后重试",
                        setTimeVal: 2000,
                        closeFun: function () {
                            //do nothing
                        }
                    });
                }

            }
        };
        $.ajax(options);

    },
    // 请求feed数据
    requestFeedData: function (callBack) {
        var self = this;
        var data = {
            tagID: self.setting.tagID,
            companyID: self.setting.companyID,
            nextPageNumber: self.nextPageNumber + 1,
            publishTime: self.lastTime,
            tagName: self.setting.tagName
        };
        var options = {
            url: _ctxPath + "/r/mp/mtl",
            dataType: 'json',
            type: "POST",
            data: data,
            async: false,
            success: function (data) {
                var more = self.constructFeed(data);
                callBack && callBack.call(this, more);
//                    setTimeout(function(){
//                        callBack && callBack.call(this, more);
//                    },2000);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                var popup = new mCommon_controlPagePopupPrompt_setPromptInfo({
                    promptImg: self.warningPic,
                    promptText: "出错了,稍后重试",
                    setTimeVal: 2000,
                    closeFun: function () {
                        //do nothing
                    }
                });
            }
        };
        $.ajax(options);
    },
    requestAllFeedData: function (personID, callBack) {
        var self = this;
        var data = {
            publishTime: self.lastTime,
            personID: personID
        };
        var options = {
            url: _ctxPath + "/r/mp/gfl/" + self.setting.companyID + "/" + (self.nextPageNumber + 1),
            dataType: 'json',
            type: "POST",
            data: data,
            async: false,
            success: function (data) {
                var more = self.constructFeed(data, true);
                callBack && callBack.call(this, more);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                var popup = new mCommon_controlPagePopupPrompt_setPromptInfo({
                    promptImg: self.warningPic,
                    promptText: "出错了,稍后重试",
                    setTimeVal: 2000,
                    closeFun: function () {
                        //do nothing
                    }
                });
            }
        };
        $.ajax(options);

    },
    // 请求群组成员数据
    requestGroupPersonData: function (callBack, inputValue) {
        var self = this;
        var data = {
            publishTime: self.lastTime,
            input: inputValue
        };
        var options = {
            url: _ctxPath + "/r/mp/ggpl/" + self.setting.groupID + "/" + self.setting.companyID + "/" + (self.nextPageNumber + 1),
            dataType: 'json',
            type: "POST",
            data: data,
            async: false,
            success: function (data) {
                var more = self.constructGroupPersonList(data);
                callBack && callBack.call(this, more);
//                    setTimeout(function(){
//                        callBack && callBack.call(this, more);
//                    },2000);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                var popup = new mCommon_controlPagePopupPrompt_setPromptInfo({
                    promptImg: self.failPic,
                    promptText: "出错了,稍后重试",
                    setTimeVal: 2000,
                    closeFun: function () {
                        //do nothing
                    }
                });
            }
        };
        $.ajax(options);
    },
    // 请求群组信息流数据
    requestGroupFeedData: function (callBack) {
        var self = this;
        var data = {
            publishTime: self.lastTime,
            noInfoType: "4"
        };
        var options = {
            url: _ctxPath + "/r/mp/ggcl/" + self.setting.groupID + "/" + self.setting.companyID + "/" + (self.nextPageNumber + 1),
            dataType: 'json',
            type: "POST",
            data: data,
            async: false,
            success: function (data) {
                //$(".mCommon_basicTabMenu_common em").eq(0).html("群聊("+data.page.totalSize+")");
                var more = self.constructFeed(data, true);
                var feedListsize = $(".mGroup_groupContent_feedListBox").find("#_listBoxItemList").children().size();
                var topFeedSize = $(".mGroup_groupContent_feedListBox").find("#_feedTop").size();
                if (feedListsize == 0 && topFeedSize == 0) {
                    var $nullPage = $("#_nullPageDiv").clone();
                    $nullPage.find("#_content").html("暂无消息");
                    $nullPage.show();
                    $(".mGroup_groupContent_feedListBox").append($nullPage);
                    mCommon_controlPrompt($nullPage);
                }
                callBack && callBack.call(self, more);
//                    setTimeout(function(){
//                        callBack && callBack.call(self, more);
//                    },2000);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                var popup = new mCommon_controlPagePopupPrompt_setPromptInfo({
                    promptImg: self.failPic,
                    promptText: "出错了,稍后重试",
                    setTimeVal: 2000,
                    closeFun: function () {
                        //do nothing
                    }
                });
            }
        };
        $.ajax(options);
    },
    requestHotFeedList: function () {
        var self = this;
        var options = {
            url: _ctxPath + "/r/mp/ftip/" + self.setting.companyID,
            dataType: 'json',
            type: "GET",
            async: false,
            success: function (data) {
                self.constructHotFeedList($("#_hotFeedContainerDiv"), data.result);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                var popup = new mCommon_controlPagePopupPrompt_setPromptInfo({
                    promptImg: self.failPic,
                    promptText: "出错了,稍后重试",
                    setTimeVal: 2000,
                    closeFun: function () {
                        //do nothing
                    }
                });
            }
        };
        $.ajax(options);
    },
    // 清除缓存数据
    cleanCacheData: function () {
        var self = this;
        self.setting.pullUpObj && self.setting.pullUpObj.clearPullUp();//清除上拉事件
        $(window).scrollTop(0);//滚动条归位
        $(".mGroup_groupContent_peopleListBox").html("");//清除数据
        $(".mGroup_groupContent_feedListBox").html("");//清除数据
        self.nextPageNumber = 0;
        self.totalSize = 0;
        self.lastTime = 0;
    },
    // 设置
    initSetting: function ($item) {
        var self = this;
        /*
         * 设置每个缩略图的高度，用来占位，再拉下时候出现正确位置 一个参数：jquery数组,图片最外层容器，页面定义
         */
        mShortText_list_setPicHeight($item.find(".mShortText_list_conprehensiveBox"));
        /* 字符串截取 */
        $item.find(".mCommon_basicShortTextHead_appointGroupText").html(
            $item.find(".mCommon_basicShortTextHead_appointGroupText").html().subCHStr(0, 16));
        /*设置上图下文时字符长度，2行做截取,参数是上图下文字符容器* */
        $.each($item.find(".mPicTextPush_list_textBoxTitle"), function () {
            mPicTextPush_list_setTitleLineStrIntercept($(this));
        });
        /*设置左图右文/右图左文时字符长度，2行做截取,参数是字符容器* */
        $.each($item.find(".mPicTextPush_list_textBoxContent"), function () {
            mPicTextPush_list_setContentLineStrIntercept($(this));
        });
        //上图下文的裁剪2.20
        mCommon_jsImgCut0114($item.find("#_richTextImg"), true);
        //图片--根据容器宽高对图片进行缩放，并显示图片的中间部分，如果图小，放大充满容器。。
        mCommon_jsImgCut0114($item.find(".mCommon_controlListInfoFlow_pictContainer"), true);//参数脱贫容器obj对象，是否放大充满容器
        // 长文本--根据容器宽高对图片进行缩放，并显示图片的中间部分，如果图小，放大充满容器。。
        mCommon_jsImgCut0114($item.find(".mCommon_controlListInfoFlow_blogContentPic"), true);// 参数脱贫容器obj对象，是否放大充满容器
        // 长文本下的博客标题字符截取2行
        /*
         * 按要求截取字符串长度 第一个参数是要截取字符串的容器 第二个参数是字体大小 第三个参数是截取的行数
         */
        mCommon_controlListInfoFlow_interceptStr($item.find("#_longText_title"), 16, 2);
        // 长文本下的博客内容字符截取4行
        /*
         * 按要求截取字符串长度 第一个参数是要截取字符串的容器 第二个参数是字体大小 第三个参数是截取的行数
         */
        mCommon_controlListInfoFlow_interceptStr($item.find("#_longText_content"), 15, 4);
        /*头部截取字符串*/
        $item.find(".mCommon_basicShortTextHead_appointGroupText").text($item.find(".mCommon_basicShortTextHead_appointGroupText").text().subCHStr(0, 16));
        $item.find(".mCommon_basicShortTextHead_btnLable").children("i").text($item.find(".mCommon_basicShortTextHead_btnLable").children("i").text().subCHStr(0, 16));
    },
    // 块事件
    bindItemEvent: function ($listBoxItem) {
        var self = this;
        $listBoxItem.bind("tap", function (e) {
            var feedID = $(this).attr("feedID");
            var tagID = $(this).attr("tagID");
            var url = self.feedDetailUrl.replace("{0}", self.setting.companyID);
            url = url.replace("{1}", feedID);
            window.location.href = url;
            return;
        });
    },
    // 展示大图
    showBigImage: function ($item, imageArray) {
        var self = this;
        // 大图浏览==================
        var loadImageArray = [];
        if (imageArray) {
            loadImageArray = imageArray;
            $item.tap(function (e) {
                var index = 0;// 取点击的是第几个
                self.processMethod("previewImage", {
                    current: index,
                    urls: loadImageArray
                });
                // 阻止块冒泡
                e.stopPropagation();
            });
        } else {
            $item.find("img").each(function (i) {
                var url = $(this).attr("bigUrl");
                var smallUrl = $(this).attr("src");
                if (!url) {
                    url = smallUrl;
                }

                if (da.djJsReady) {
                    loadImageArray.push(url);
                } else {
                    loadImageArray.push([smallUrl, url]);
                }
            });
            $item.find("img").each(function (i) {
                $(this).tap(function (e) {
                    if ($(this).parent().is("a") && $(this).parent().attr("href")
                        && $(this).parent().attr("href").indexOf("http") > -1) {
                        return true;
                    }
                    var index = i;// 取点击的是第几个
                    if(da.djJsReady && loadImageArray && typeof (loadImageArray[0]) !== "string"){
                        loadImageArray.splice(0,loadImageArray.length);
                        $item.find("img").each(function (i) {
                            var url = $(this).attr("bigUrl");
                            var smallUrl = $(this).attr("src");
                            if (!url) {
                                url = smallUrl;
                            }
                            loadImageArray.push(url);
                        });
                    }
                    self.processMethod("previewImage", {
                        current: index,
                        urls: loadImageArray
                    });
                    // 阻止块冒泡
                    e.stopPropagation();
                });
            });
        }
    },
    previewImage: function (data) {
        mCommon_jsImageView(data.urls, data.current);// 图片放大和缩放实现
    },
    /** =====================pc app转换方法===================* */
    // app和PC 转换
    processMethod: function (method, paramObj) {
        var self = this;
        var obj;
        if (da.djJsReady) {
            obj = da;
        } else {
            obj = self;
        }
        obj[method](paramObj);
    },
    // 转发对象转换
    changeFeedToFeedFwd: function (personFeed) {
        var feedFwd = {};
        for (var key in personFeed) {
            if (key.endWith("Fwd")) {
                var newKey = key.replace("Fwd", "");
                feedFwd[newKey] = personFeed[key];
            } else if (key == "formFwdList") { //兼容转发表单
                var formKey = "formList";
                feedFwd[formKey] = personFeed[key];
            }
        }
        return feedFwd;
    },
    constructFeed: function (data, isShowType, isImageApp) {
        var self = this;
        if (!data || !data.page.dataList || data.page.dataList.length == 0) {
            return false;
        }
        self.totalSize = data.page.totalSize;
        self.nextPageNumber = data.page.currentPageNumber;
        self.lastTime = data.queryTime;
        if (!self.currentPersonID) {
            self.currentPersonID = data.currentPersonID;
        }
        self.mobileListStyle = data.mobileListStyle;
        var personFeedList = data.page.dataList;
        self.setting.$shortTextDiv.show();
        var $feedTop = self.setting.$template.find("#_feedTop");
        var $personHeader = self.setting.$template.find("#_shortTextPersonHeader");
        var $imageApp = self.setting.$template.find("#_imageApp");
        var $longText = self.setting.$template.find("#_longText");
        var $feedFwd = self.setting.$template.find("#_feedFwd");
        var $formApp = self.setting.$template.find("#_formApp");
        var $normalText = self.setting.$template.find("#_shortTextNormalText");
        var $lbs = self.setting.$template.find("#_lbs");
        var $musicAndVoice = self.setting.$template.find("#_musicAndVoice");
        var $attachment = self.setting.$template.find("#_attachment");
        var $serviceApp = self.setting.$template.find("#_serviceApp");
        var $imageList = self.setting.$template.find("#_imageList");
        var $btnbar = self.setting.$template.find("#_btnbar");
        var $richText = self.setting.$template.find("#_richTextUpAndDown");
        for (var i = 0; i < personFeedList.length; i++) {
            var $listBoxItem = self.setting.$template.find("#_shortTextDiv").find("#_listBoxItem").clone();
            var personFeed = personFeedList[i];
            if (isImageApp == "true") {
                self.constructSubPersonHeader($listBoxItem.find("#_listBoxItemContainer"), $personHeader, personFeed, isShowType);
                self.constructImageApp($listBoxItem.find("#_listBoxItemContainer"), $imageApp, personFeed);
                self.constructBtnBar($listBoxItem.find("#_listBoxItemContainer"), $btnbar, personFeed);
                $listBoxItem.find("#_listBoxItemContainer").attr("feedID", personFeed.feedID);
                $listBoxItem.find("#_listBoxItemContainer").attr("tagID", personFeed.tagID);
                self.bindItemEvent($listBoxItem.find("#_listBoxItemContainer"));
                $listBoxItem.show();
                self.setting.$shortTextDiv.find("#_listBoxItemList").append($listBoxItem);
                self.initSetting($listBoxItem);
            } else {
                var preCount = self.setting.$shortTextDiv.find(".mCommon_basicTopNotice_containerNormal").size();
                self.constructSubFeedTop(self.setting.$shortTextDiv, $feedTop, personFeed);
                var lastCount = self.setting.$shortTextDiv.find(".mCommon_basicTopNotice_containerNormal").size();
                if (lastCount == preCount) {
                    // 转发
                    if (personFeed.feedIDFwd) {
                        self.constructSubPersonHeader($listBoxItem.find("#_listBoxItemContainer"), $personHeader, personFeed, isShowType);
                        self.constructNormalText($listBoxItem.find("#_listBoxItemContainer"), $normalText, personFeed);
                        self.constructLbs($listBoxItem.find("#_listBoxItemContainer"), $lbs, personFeed);
                        self.constructFeedFwd($listBoxItem.find("#_listBoxItemContainer"), $feedFwd, personFeed, $formApp);
                        self.constructBtnBar($listBoxItem.find("#_listBoxItemContainer"), $btnbar, personFeed);
                    }
                    // 长文本
                    else if (personFeed.infoType == "5" || self.BLOG_APP_UNIQUE == self.setting.uniqueCode) {
                        self.constructSubPersonHeader($listBoxItem.find("#_listBoxItemContainer"), $personHeader, personFeed, isShowType);
                        // 构造Blog
                        self.constructLongText($listBoxItem.find("#_listBoxItemContainer"), $longText, personFeed, $normalText);
                        self.constructBtnBar($listBoxItem.find("#_listBoxItemContainer"), $btnbar, personFeed);
                    }
                    // 图片应用
                    else if (personFeed.infoType == "image" || self.IMAGE_APP_UNIQUE == self.setting.uniqueCode) {
                        self.constructSubPersonHeader($listBoxItem.find("#_listBoxItemContainer"), $personHeader, personFeed, isShowType);
                        self.constructImageApp($listBoxItem.find("#_listBoxItemContainer"), $imageApp, personFeed);
                        self.constructNormalText($listBoxItem.find("#_listBoxItemContainer"), $normalText, personFeed);
                        self.constructLbs($listBoxItem.find("#_listBoxItemContainer"), $lbs, personFeed);
                        self.constructMusicAndVoice($listBoxItem.find("#_listBoxItemContainer"), $musicAndVoice, personFeed);
                        self.constructAttachment($listBoxItem.find("#_listBoxItemContainer"), $attachment, personFeed);
                        self.constructBtnBar($listBoxItem.find("#_listBoxItemContainer"), $btnbar, personFeed);
                    }
                    // 表单应用
                    else if (personFeed.infoType == "11") {
                        self.constructSubPersonHeader($listBoxItem.find("#_listBoxItemContainer"), $personHeader, personFeed, isShowType);
                        self.constructFormApp($listBoxItem.find("#_listBoxItemContainer"), $formApp, personFeed);
                        self.constructAttachment($listBoxItem.find("#_listBoxItemContainer"), $attachment, personFeed);
                        self.constructImage($listBoxItem.find("#_listBoxItemContainer"), $imageList, personFeed);
                        self.constructBtnBar($listBoxItem.find("#_listBoxItemContainer"), $btnbar, personFeed);
                    }
                    // 图文推送
                    else if (personFeed.infoType == "13") {
                        var style = "";
                        if (!personFeed.defaultMobileListStyle) {
                            style = self.setting.mobileListStyle;
                        } else {
                            style = personFeed.defaultMobileListStyle;
                        }
                        if (style == self.MOBILE_LIST_STYLE_LEFT) {
                            $richText = self.setting.$template.find("#_richTextLeftAndRight");
                        } else if (style == self.MOBILE_LIST_STYLE_RIGHT) {
                            $richText = self.setting.$template.find("#_richTextRightAndLeft");
                        } else if (style == self.MOBILE_LIST_STYLE_TOP) {
                            $richText = self.setting.$template.find("#_richTextUpAndDown");
                        }
                        self.constructSubPersonHeader($listBoxItem.find("#_listBoxItemContainer"), $personHeader, personFeed, isShowType);
                        self.constructRichText($listBoxItem.find("#_listBoxItemContainer"), $richText, personFeed.richText);
                        self.constructBtnBar($listBoxItem.find("#_listBoxItemContainer"), $btnbar, personFeed);
                    } else {
                        self.constructSubPersonHeader($listBoxItem.find("#_listBoxItemContainer"), $personHeader, personFeed, isShowType);
                        self.constructNormalText($listBoxItem.find("#_listBoxItemContainer"), $normalText, personFeed);
                        self.constructLbs($listBoxItem.find("#_listBoxItemContainer"), $lbs, personFeed);
                        self.constructMusicAndVoice($listBoxItem.find("#_listBoxItemContainer"), $musicAndVoice, personFeed);
                        self.constructAttachment($listBoxItem.find("#_listBoxItemContainer"), $attachment, personFeed);
                        self.constructServiceApp($listBoxItem.find("#_listBoxItemContainer"), $serviceApp, personFeed);
                        self.constructImage($listBoxItem.find("#_listBoxItemContainer"), $imageList, personFeed);
                        self.constructBtnBar($listBoxItem.find("#_listBoxItemContainer"), $btnbar, personFeed);
                    }
                    $listBoxItem.find("#_listBoxItemContainer").attr("feedID", personFeed.feedID);
                    $listBoxItem.find("#_listBoxItemContainer").attr("tagID", personFeed.tagID);
                    self.bindItemEvent($listBoxItem.find("#_listBoxItemContainer"));
                    $listBoxItem.show();
                    self.setting.$shortTextDiv.find("#_listBoxItemList").append($listBoxItem);
                    self.initSetting($listBoxItem);
                }
            }

        }
        if ((self.totalSize > 10 && (self.totalSize / 10 - self.nextPageNumber) < 0) || (self.totalSize < 10 && self.nextPageNumber > 0)) {
            return false;
        }
        return true;
    },
    // 构造置顶
    constructSubFeedTop: function ($frame, $feedTop, personFeed) {
        var self = this;
        // 是否置顶
        if (personFeed.feedTopPlace || personFeed.topPlace) {
            var $feedTopClone = $feedTop.clone();
            if (personFeed.infoType == "13") {
                $feedTopClone.find(".mCommon_basicTopNotice_containerText").html(personFeed.richText.title || personFeed.richText.summary || "暂无内容");
            } else if (personFeed.infoType == "5") {
                var blog = self.esnMobile.getLongTextObj(personFeed.weiboContent);
                if (!blog || !blog.title) {
                    return;
                }
                $feedTopClone.find(".mCommon_basicTopNotice_containerText").html(blog.title);
            } else {
                $feedTopClone.find(".mCommon_basicTopNotice_containerText").html(personFeed.content);
            }
            var readPersonMap = personFeed.readList;
            if (self.currentPersonID && readPersonMap.searchByKey("readPersonID", self.currentPersonID) > -1) {
                $feedTopClone.removeClass("mCommon_basicTopNotice_containerProminent");
            }
            $feedTopClone.attr("feedID", personFeed.feedID);
            $feedTopClone.attr("tagID", personFeed.tagID);
            $feedTopClone.show();
            $feedTopClone.bind("tap", function (e) {
                var feedID = $(this).attr("feedID");
                var tagID = $(this).attr("tagID");
                var url = self.feedDetailUrl.replace("{0}", self.setting.companyID);
                url = url.replace("{1}", feedID);
                window.location.href = url;
                // 阻止块冒泡
                e.stopPropagation();
                return;
            });
            $frame.find("#_listBoxItemList").before($feedTopClone);
        }
        return $frame;
    },
    // 构造头部信息
    constructSubPersonHeader: function ($frame, $personHeader, personFeed, isShowType) {
        var loopImg = 0;
        var self = this;
        var url = _ctxPath + "/file/loadPic.img?personID=" + personFeed.publishPersonID + "&date=" + _currentTime;
        var groupName = self.setting.groupName ? self.setting.groupName : personFeed.toGroupName;
        var $personHeaderSub = $personHeader.clone();
        $personHeaderSub.find("#_headPic").attr("src", url);
        $personHeaderSub.find(".mCommon_basicShortTextHead_name").html(personFeed.publishPersonName);
        $personHeaderSub.find(".mCommon_basicShortTextHead_timeBox").html(personFeed.timeDistance);
        $personHeaderSub.find(".mCommon_basicShortTextHead_appointGroupText").html(groupName);
        if (personFeed.tagNames && isShowType) {
            $personHeaderSub.find("#_tagTypeText").html(personFeed.tagNames[0]);
            $personHeaderSub.addClass("mCommon_basicShortTextHead_btnLableShow");
            $personHeaderSub.find("#_tagType").bind("tap", function (e) {
                self.setting.pcManage.transRequestService("shareInfo", personFeed.tagIDs != null ? personFeed.tagIDs[0] : null, personFeed.tagNames[0]);
                e.stopPropagation();
            });
        }
        // 公开
        if (personFeed.isPublic == "1") {
            $personHeaderSub.addClass("mCommon_basicShortTextHead_appointPublicShow");
        } else if (personFeed.publishRangeType == "1") {
            $personHeaderSub.addClass("mCommon_basicShortTextHead_appointPeopleShow");
        } else if (personFeed.publishRangeType == "2") {
            $personHeaderSub.addClass("mCommon_basicShortTextHead_appointGroupShow");
        }

        $personHeaderSub.show();
        $frame.append($personHeaderSub);
        return $frame;
    },
    // 图片应用
    constructImageApp: function ($frame, $imageApp, personFeed) {
        var self = this;
        var feedAttachments = personFeed.feedAttachments;
        var $imageAppSub = $imageApp.clone();
        if (feedAttachments && feedAttachments.length > 0) {
            var imageArray = self.constructPicList(feedAttachments, $imageAppSub);
            if (imageArray.length > 0) {
                $imageAppSub.find("i").html(imageArray.length);
                self.showBigImage($imageAppSub, imageArray);
                $imageAppSub.show();
                $frame.append($imageAppSub);
            }
            if (!$frame.is(":visible")) {
                $frame.show();
            }
        }
        return $frame;
    },

    constructPicList: function (feedAttachments, $imageAppSub) {
        var self = this;
        var imageArray = [];
        var imageCount = 0;
        for (var i = 0; i < feedAttachments.length; i++) {
            var image = feedAttachments[i];
            if (image.fileType == self.FILE_ATTACHMENT_FILE_TYPE_PIC) {
                imageCount++;

                var domain = image.cdnDomainHTTP;
                var originalPic = image.picOriginalCDNAddr;

                var smallUrl;
                var bigUrl;

                if (domain !== null && domain !== ""
                    && originalPic) {
                    if (da.djJsReady) {
                        imageArray.push(domain + originalPic);
                    } else {
                        smallUrl = domain + image.picSmallCDNAddr;
                        bigUrl = domain + originalPic;
                        imageArray.push([smallUrl, bigUrl]);
                    }
                } else {
                    if (da.djJsReady) {
                        imageArray.push(image.fileID);
                    } else {
                        smallUrl = _ctxPath + "/file/loadPic.img?id=" + image.fileID + "&show=small";
                        bigUrl = _ctxPath + "/file/loadPic.img?id=" + image.fileID + "&show=big";
                        imageArray.push([smallUrl, bigUrl]);
                    }
                }
                if (imageCount == 1 && bigUrl) {
                    $imageAppSub.find("img").attr("src", bigUrl + "&category=bigImage");
                }
            }
        }
        return imageArray;
    },
    // 文本
    constructNormalText: function ($frame, $normalText, personFeed) {
        var self = this;
        $normalText.find(".mCommon_basicTextAndNamePageAddr_contentBoxReply").remove();
        var $normalTextSub = $normalText.clone();
        var weiboContentJson = personFeed.weiboContent;
        var content = self.esnMobile.processFeedContent(weiboContentJson, true);
        $normalTextSub.find(".mCommon_basicTextAndNamePageAddr_contentBoxReplyContent").html(content);
        $normalTextSub.show();
        $normalTextSub.find("*[webUrl]").each(function (index) {
            $(this).bind("tap", function (e) {
                var url = $(this).attr("webUrl");
                self.esnMobile.windowOpen(url);
                e.stopPropagation();
            })
        });
        $frame.append($normalTextSub);
        return $frame;
    },
    // 构造地理位置[55
    constructLbs: function ($frame, $lbs, personFeed) {
        var self = this;
        var lbsMapList = personFeed.lbsMapList;
        if (lbsMapList && lbsMapList.length > 0) {
            for (var i = 0; i < lbsMapList.length; i++) {
                var lbsMap = lbsMapList[i];
                var $lbsSub = {};
                if (lbsMap.isFixed && lbsMap.isFixed == true) {
                    $lbsSub = $lbs.siblings("#_lbs_not_show").eq(0).clone();
                    $lbsSub.find("#_lbsName").html(lbsMap.name);
                    $lbsSub.find("#_lbsAddress").html(lbsMap.address);
                    var date = new Date(lbsMap.gpsTimestamp);
                    $lbsSub.find("#_lbsTime").html(date.format("yyyy-MM-dd HH:mm"));
                } else {
                    $lbsSub = $lbs.clone();
                    $lbsSub.find("#_lbsName").html(lbsMap.name);
                }
                $lbsSub.attr("lbsLocation", lbsMap.location);
                $lbsSub.attr("locationName", lbsMap.name);
                $lbsSub.show();
                $lbsSub.bind("tap", function (e) {
                    var lbsLocation = $(this).attr("lbsLocation");
                    var locationName = $(this).attr("locationName");
                    if (da.djJsReady) {
                        var lat = lbsLocation.substring(0, lbsLocation.indexOf(","));
                        var lon = lbsLocation.substring(lbsLocation.indexOf(",") + 1);
                        da.showLocation({
                            lat: lat,
                            lon: lon,
                            addr: locationName
                        });
                    } else {
                        var url = "";
                        if (null != lbsLocation && "" != lbsLocation) {
                            url = "http://mo.amap.com/?q=" + lbsLocation + "&name=" + locationName + "&dev=0";
                        } else {
                            url = "http://mo.amap.com/?q=31.234527,121.287689&name=park&dev=0";
                        }
                        window.location.href = url;
                    }
                    // 阻止块冒泡
                    e.stopPropagation();
                });
                $frame.append($lbsSub);
            }
            if (!$frame.is(":visible")) {
                $frame.show();
            }
        }
        return $frame;
    },
    // 语音
    constructMusicAndVoice: function ($frame, $musicAndVoice, personFeed) {
        var self = this;
        var feedAttachments = personFeed.feedAttachments;
        if (feedAttachments && feedAttachments.length > 0) {
            for (var i = 0; i < feedAttachments.length; i++) {
                var attachment = feedAttachments[i];
                if (attachment.fileType == self.FILE_ATTACHMENT_FILE_TYPE_SOUND) {
                    var $musicAndVoiceSub = $musicAndVoice.clone();
                    var src = _ctxPath + "/file/downloadMp3File.file?id=" + attachment.fileID;
                    $musicAndVoiceSub.find("#_musicAudio").attr("src", src);
                    var $audio = $musicAndVoiceSub.find("#_musicAudio")[0];
                    $audio.addEventListener("ended", function (msg) {
                        $musicAndVoiceSub.removeClass("mCommon_basicVoice_voiceSuspend");
                        $musicAndVoiceSub.addClass("mCommon_basicVoice_voicePlay");
                    }, false);
                    $musicAndVoiceSub.find("#_musicSpan").bind("tap", function (e) {
                        var $audio = $(this).find("#_musicAudio")[0];
                        var isPlay = $(this).parent().hasClass("mCommon_basicVoice_voicePlay");
                        if (isPlay) {
                            $(this).parent().removeClass("mCommon_basicVoice_voicePlay");
                            $(this).parent().addClass("mCommon_basicVoice_voiceSuspend ");
                            $audio.play(0);
                            e.stopPropagation();
                        } else {
                            $(this).parent().removeClass("mCommon_basicVoice_voiceSuspend");
                            $(this).parent().addClass("mCommon_basicVoice_voicePlay");
                            $audio.pause();
                            e.stopPropagation();
                        }
                    });
                    $musicAndVoiceSub.show();
                    $frame.append($musicAndVoiceSub);
                    if (!$frame.is(":visible")) {
                        $frame.show();
                    }
                }
            }
        }
        return $frame;
    },
    // 附件
    constructAttachment: function ($frame, $attachment, personFeed) {
        var self = this;
        var feedAttachments = personFeed.feedAttachments;
        if (feedAttachments && feedAttachments.length > 0) {
            var $attachmentSub = $attachment.find("span").clone();
            var $attachmentListSub = $attachment.clone();
            $attachmentListSub.empty();
            for (var i = 0; i < feedAttachments.length; i++) {
                var attachment = feedAttachments[i];
                if (attachment.fileType == self.FILE_ATTACHMENT_FILE_TYPE_DOC) {
                    var $attachmentSubClone = $attachmentSub.clone();
                    /*--附件断尾--*/
                    var downloadText = new mCommon_basicFileName_stringCut({
                        pageBox: $(window),// 页面容器jq对象,默认为window
                        obj: $attachmentSubClone.find(".mCommon_basicFileName_textTitle"),// 插入区域jq对象
                        string: attachment.fileName,// 字符串
                        fontSize: 16,// 字号
                        cutWidht: 176,// 整行去掉的宽度
                        rows: 2,// 显示行数
                        maxWindowWidth: 640,// 窗口最大宽度
                        fileNameEndNum: 8
                        // 尾部截取的英文字符
                    });
                    /*--附件断尾end--*/
                    $attachmentSubClone.find(".mCommon_basicFileName_numBox_num").html(
                        self.esnMobile.formatFileSize(attachment.fileSize));
                    var url = _ctxPath + '/modulev1/portalHtml5/images' + '/' + self.esnMobile.getFileIcon(attachment.fileName);
                    $attachmentSubClone.find("img").attr("src", url);
                    $attachmentSubClone.attr("attachmentID", attachment.fileID);
                    $attachmentSubClone.bind("tap", function (e) {
                        var fileID = $(this).attr("attachmentID");
                        if ((/micromessenger/.test(navigator.userAgent.toLowerCase())) ? true : false) {
                            var popup = new mCommon_controlPagePopupPrompt_setPromptInfo({
                                promptImg: self.warningPic,
                                promptText: "无法打开此文件。请点击右上角，选择在浏览器中打开",
                                setTimeVal: 2000,
                                closeFun: function () {
                                    //do nothing
                                }
                            });
                        } else {
                            if (self.inDajia && (/android/.test(navigator.userAgent.toLowerCase())) ? true : false) {
                                da.showFile({
                                    fileID:fileID,
                                    fileName:attachment.fileName,
                                    fileSize:attachment.fileSize
                                });
                            }else {
                                window.location.href = _ctxPath + "/file/mobileDownloadFile.file?id=" + fileID;
                            }
                        }
                        // 阻止块冒泡
                        e.stopPropagation();
                    });
                    $attachmentListSub.append($attachmentSubClone);
                }
            }
            $attachmentListSub.show();
            $frame.append($attachmentListSub);
            if (!$frame.is(":visible")) {
                $frame.show();
            }
        }
        return $frame;
    },
    // 应用List
    constructServiceApp: function ($frame, $serviceApp, personFeed) {
        var self = this;
        var formList = personFeed.formList;
        var $serviceAppListSub = $serviceApp.clone();
        $serviceAppListSub.empty();
        if (personFeed.webLinkFeed) {
            var $serviceAppSub = $serviceApp.find("#_webLinkFeed").clone();
            /* 标题截取 */
            var setting = {
                pageBox: $(window),// 页面容器jq对象,默认为window
                obj: $serviceAppSub.find(".mCommon_basicLink_text_title"),// 插入区域jq对象
                string: personFeed.webLinkTitle,// 字符串（带后缀名的文件名）
                fontSize: 17,// 字号
                cutWidht: 92,// 整行去掉的宽度
                rows: 1
                // 显示行数
            };
            var str = new mCommon_basicLink_stringCut(setting);
            /* 标题截取 end */
            $serviceAppSub.attr("feedUrl", personFeed.webLinkURL);
            $serviceAppSub.bind("tap", function (e) {
                var url = $(this).attr("feedUrl");
                self.esnMobile.windowOpen(url);
                // 阻止块冒泡
                e.stopPropagation();
            });
            $serviceAppListSub.append($serviceAppSub);
            $serviceAppListSub.show();
        }
        if (formList && formList.length > 0) {
            for (var i = 0; i < formList.length; i++) {
                var $serviceAppSub = $serviceApp.find("#_easyForm").clone();
                var form = formList[i];
                /* 标题截取 */
                var setting = {
                    pageBox: $(window),// 页面容器jq对象,默认为window
                    obj: $serviceAppSub.find(".mCommon_basicLink_text_title"),// 插入区域jq对象
                    string: form.formTitle,// 字符串（带后缀名的文件名）
                    fontSize: 17,// 字号
                    cutWidht: 92,// 整行去掉的宽度
                    rows: 1
                    // 显示行数
                };
                var str = new mCommon_basicLink_stringCut(setting);
                /* 标题截取 end */

                /* 内容截取 */
                var settingInfo = {
                    pageBox: $(window),// 页面容器jq对象,默认为window
                    obj: $serviceAppSub.find(".mCommon_basicLink_text_info"),// 插入区域jq对象
                    string: form.formDescription,// 字符串（带后缀名的文件名）
                    fontSize: 12,// 字号
                    cutWidht: 92,// 整行去掉的宽度
                    rows: 2
                    // 显示行数
                };
                var infoStr = new mCommon_basicLink_stringCut(settingInfo);
                /* 内容截取 end */
                $serviceAppSub.attr("formID", form.formID);
                $serviceAppSub.attr("formRecordID", form.formRecordID);
                $serviceAppSub.bind("tap", function (e) {
                    var formID = $(this).attr("formID");
                    var formRecordID = $(this).attr("formRecordID");
                    var url = _ctxPath + "/r/f/" + formID;
                    //var url = _ctxPath + "/r/f/" + formID;
                    self.esnMobile.windowOpen(url);
                    // 阻止块冒泡
                    e.stopPropagation();
                });
                $serviceAppListSub.append($serviceAppSub);
            }
            $serviceAppListSub.show();

        }
        $frame.append($serviceAppListSub);
        if (!$frame.is(":visible")) {
            $frame.show();
        }
    },
    // 图片
    constructImage: function ($frame, $imageList, personFeed) {
        var self = this;
        var feedAttachments = personFeed.feedAttachments;
        var $imageListSub = $imageList.clone();
        if (feedAttachments && feedAttachments.length > 0) {
            var $imageListDiv = $imageList.find("div").clone();
            $imageListDiv.empty();
            for (var i = 0; i < feedAttachments.length; i++) {
                var $imageSub = $imageList.find("#_imageSpan").clone();
                var image = feedAttachments[i];
                if (image.fileType == self.FILE_ATTACHMENT_FILE_TYPE_PIC) {
                    var smallUrl = _ctxPath + "/file/loadPic.img?id=" + image.fileID + "&show=small";
                    var bigUrl = _ctxPath + "/file/loadPic.img?id=" + image.fileID + "&show=big";
                    $imageSub.find("img").attr("picID", image.fileID);
                    $imageSub.find("img").attr("src", smallUrl);
                    $imageSub.find("img").attr("bigUrl", bigUrl);
                    $imageListDiv.append($imageSub);

                }
            }
            $imageListSub.empty();
            $imageListSub.append($imageListDiv);
            $imageListSub.show();
            $frame.append($imageListSub);
            if (!$frame.is(":visible")) {
                $frame.show();
            }
            self.showBigImage($imageListDiv);
        }
        return $frame;
    },
    // 底部按钮
    constructBtnBar: function ($frame, $btnbar, personFeed) {
        var self = this;
        var readList = personFeed.readList;
        var praiseList = personFeed.praiseList;
        var commentsNum = personFeed.commentsNum;
        var browseNum = personFeed.browseNum;
        var readNum = readList && readList.length > 0 ? readList.length : 0;
        commentsNum = commentsNum ? commentsNum : 0;
        browseNum = browseNum ? browseNum : 0;
        var praiseNum = praiseList && praiseList.length > 0 ? praiseList.length : 0;
        var $btnbarSub = $btnbar.clone();
        var visitShowType = $("#visitShowType").val();
        if (0 == visitShowType) {
            $btnbarSub.find("#_readNumBtn").remove();
        } else if (1 == visitShowType) {
            $btnbarSub.find("#_readNum").html("浏览 " + browseNum);
        } else {
            $btnbarSub.find("#_readNum").html("已阅 " + readNum);
        }
        //兼容图文推送可以回复按钮
        if (personFeed.richText) {
            if (personFeed.richText.canFeedBack == "0") {
                $btnbarSub.find("#_reply").hide();
            } else {
                $btnbarSub.find("#_reply i").html(commentsNum ? commentsNum : "回复");
            }
        } else {
            $btnbarSub.find("#_reply i").html(commentsNum ? commentsNum : "回复");
        }
        $btnbarSub.find("#_praise i").html(praiseNum ? praiseNum : "赞");
        $btnbarSub.find("#_reply").attr("commentsNum", commentsNum);
        $btnbarSub.find("#_praise").attr("praiseNum", praiseNum);
        if (praiseList && praiseList.searchByKey("praisePersonID", self.currentPersonID) > -1) {
            $btnbarSub.addClass("mCommon_controlBottomBtnReadPraise_commitPraise");
            $btnbarSub.removeClass("mCommon_controlBottomBtnReadPraise_cancelPraise");
        } else {
            $btnbarSub.addClass("mCommon_controlBottomBtnReadPraise_cancelPraise");
            $btnbarSub.removeClass("mCommon_controlBottomBtnReadPraise_commitPraise");
        }
        $btnbarSub.find("#_readNumBtn").bind("tap", function (e) {
            // 阻止块冒泡
            e.stopPropagation();
        });
        $btnbarSub.find("#_reply").bind("tap", function (e) {
            var commentsNum = $(this).attr("commentsNum");
            var feedID = $btnbarSub.parent().attr("feedID");
            var tagID = $btnbarSub.parent().attr("tagID");
            var url = _ctxPath + "/r/mp/gotoReply?feedID=" + feedID + "&type=forThirdRichTextFeed";
            if (Number(commentsNum) == 0) {
                $("#feedID").val(feedID);
                self.setting.pcManage.checkPersonStatusInThird(function () {
                    $("#_topFrame").hide();
                    $("#_reply_content_div").show();
                    if (typeof(mCommon_basicPlusJump_setRoundBallObj) != "undefined") {
                        mCommon_basicPlusJump_setRoundBallObj.hideFun();
                    }
                }, url);
                // 阻止块冒泡
                e.stopPropagation();
            } else {
                url = self.feedDetailUrl.replace("{0}", self.setting.companyID);
                url = url.replace("{1}", feedID);
                self.setting.pcManage.getThirdPartyInfo({
                    "weixinCanUse": true,
                    "thirdPartyCanUse": true
                }, url);
                // 阻止块冒泡
                e.stopPropagation();
            }
        });
        $btnbarSub.find("#_praise").bind(
            "tap",
            function (e) {
                if ($(this).hasClass("disable")) {
                    return false;
                }
                $(this).addClass("disable");
                var type = "";
                var isInsert = $btnbarSub.hasClass(
                    "mCommon_controlBottomBtnReadPraise_cancelPraise");
                if (isInsert) {
                    type = "insert";
                } else {
                    type = "delete";
                }
                var feedID = $btnbarSub.parent().attr("feedID");
                var tagID = $btnbarSub.parent().attr("tagID");
                var callBack = function (obj, data) {
                    if (data && data.message == "add") {
                        var praiseNum = obj.find("#_praise").attr("praiseNum");
                        praiseNum = Number(praiseNum) + 1;
                        obj.find("#_praise i").html(praiseNum ? praiseNum : "赞");
                        obj.find("#_praise").attr("praiseNum", praiseNum);
                        obj.addClass("mCommon_controlBottomBtnReadPraise_commitPraise");
                        obj.removeClass("mCommon_controlBottomBtnReadPraise_cancelPraise");
                        obj.find("#_praise").removeClass("disable");
                    } else if (data && data.message == "delete") {
                        var praiseNum = obj.find("#_praise").attr("praiseNum");
                        praiseNum = Number(praiseNum) - 1;
                        obj.find("#_praise i").html(praiseNum ? praiseNum : "赞");
                        obj.find("#_praise").attr("praiseNum", praiseNum);
                        obj.addClass("mCommon_controlBottomBtnReadPraise_cancelPraise");
                        obj.removeClass("mCommon_controlBottomBtnReadPraise_commitPraise");
                        obj.find("#_praise").removeClass("disable");
                    } else if (data && (data.message == "needRegister" || data.message == "needJoin")) {
                        var url = ""
                        if (self.setting.uniqueCode == "header.bottomMenu.allFeed") {
                            url = _ctxPath + "/r/mp/gtafp/" + self.setting.companyID;
                        } else {
                            url = _ctxPath + "/r/mp/mfp/" + self.setting.companyID + "/" + $("#tagID").val();
                        }
                        self.setting.pcManage.getThirdPartyInfo({
                            "weixinCanUse": false,
                            "thirdPartyCanUse": false
                        }, url);
                        obj.find("#_praise").removeClass("disable");
                        return false;
                    } else if (data && data.message == "fail") {
                        obj.find("#_praise").removeClass("disable");
                    }

                };
                self.setting.portalHtml5Data.updatePraiseByFeed({
                    companyID: self.setting.companyID,
                    feedID: feedID,
                    tagID: tagID,
                    type: type
                }, $btnbarSub, callBack);
                // 阻止块冒泡
                e.stopPropagation();
            });
        $btnbarSub.show();
        $frame.append($btnbarSub);
        return $frame;
    },
    // 图文推送
    constructRichText: function ($frame, $richText, richText) {
        var self = this;
        var $richTextSub = $richText.clone();
        var shareText = richText.content || "";
        var url = self.esnMobile.getCoverImg(richText);
        $richTextSub.find("#_richTextImg img").attr("src", url);
        // 标题和摘要
        var title = richText.title;
        if (!richText.summary && null != shareText && "" != shareText) {
            shareText = $("<div></div>").html(shareText).text();
            shareText = shareText.replace(new RegExp("<", "gm"), "&lt;");
            shareText = shareText.replace(new RegExp(">", "gm"), "&gt;");
            richText.summary = shareText;
        }
        $richTextSub.find("#_richTextTitle").html(title);
        $richTextSub.find("#_richTextContent").html(richText.summary);
        $richTextSub.show();
        $frame.append($richTextSub.html());
    },
    // 长文本
    constructLongText: function ($frame, $longText, personFeed, $normalText) {
        var self = this;
        var $longTextSub = $longText.clone();
        var blog = self.esnMobile.getLongTextObj(personFeed.weiboContent);
        if (!blog || !blog.title) {
            return;
        }
        if (blog.type == "forward" && $normalText) {
            $normalText.find(".mCommon_basicTextAndNamePageAddr_contentBoxReply").remove();
            var $normalTextSub = $normalText.clone();
            $normalTextSub.find(".mCommon_basicTextAndNamePageAddr_contentBoxReplyContent").html(personFeed.content);
            $normalTextSub.show();
            $frame.append($normalTextSub);
        }
        $longTextSub.find("#_longText_title").html(blog.title);
        var feedAttachments = personFeed.feedAttachments;
        if (feedAttachments && feedAttachments.length > 0) {
            var coverImage = feedAttachments[0];
            var bigUrl = _ctxPath + "/file/loadPic.img?id=" + coverImage.fileID + "&show=big";
            $longTextSub.find("#_longText_img").attr("src", bigUrl);
            $longTextSub.find("#_longText_img").parent().show();

        }
        $longTextSub.bind("tap", function (e) {
            window.location.href = _ctxPath + '/r/mp/bl/' + blog.blogID;
            e.stopPropagation();
        });
        $longTextSub.find("#_longText_content").html(blog.summary);
        $longTextSub.show();
        $frame.append($longTextSub);
    },
    // 表单应用
    constructFormApp: function ($frame, $formApp, personFeed) {
        var self = this;
        var $formAppSub = $formApp.clone();
        var $formComponent = $formAppSub.find("#_formComponent");
        var weiboContentJson = personFeed.weiboContent;
        var content = self.esnMobile.processFeedContent(weiboContentJson);
        content = content.replace("内容摘要<br>", "");
        content = self.esnMobile.getFormContent(content);
        $formComponent.html(content);
        /* 标题截取 */
        var setting = {
            pageBox: $(window),// 页面容器jq对象,默认为window
            obj: $formAppSub.find("#_easyForm").find(".mCommon_basicLink_text_title"),// 插入区域jq对象
            string: "查看填写的内容",// 字符串（带后缀名的文件名）
            fontSize: 17,// 字号
            cutWidht: 92,// 整行去掉的宽度
            rows: 1
            // 显示行数
        };
        var str = new mCommon_basicLink_stringCut(setting);
        /* 标题截取 end */
        $formAppSub.find("#_easyForm").attr("formID", personFeed.formID);
        $formAppSub.find("#_easyForm").attr("formRecordID", personFeed.formRecordID);
        $formAppSub.find("#_easyForm").bind("tap", function (e) {
            var formID = $(this).attr("formID");
            var formRecordID = $(this).attr("formRecordID");
            var url = _ctxPath + "/formrecord/getScopeFormRecordByID.action?formID="
                + formID + "&recordID=" + formRecordID;
            //var url = _ctxPath + "/r/f/" + formID;
            self.esnMobile.windowOpen(url);
            // 阻止块冒泡
            e.stopPropagation();
        });
        $formAppSub.show();
        $frame.append($formAppSub);
    },
    // 转发块
    constructFeedFwd: function ($frame, $feedFwd, personFeed, $formApp) {
        var self = this;
        var $feedFwdSub = $feedFwd.clone();
        var $feedFwdFrame = $feedFwdSub.find("#feedFwdFrame");
        var $normalText = self.setting.$template.find("#_shortTextNormalText");
        var $lbs = self.setting.$template.find("#_lbs");
        var $musicAndVoice = self.setting.$template.find("#_musicAndVoice");
        var $attachment = self.setting.$template.find("#_attachment");
        var $serviceApp = self.setting.$template.find("#_serviceApp");
        var $longText = self.setting.$template.find("#_longText");
        var $imageList = self.setting.$template.find("#_imageList");
        var feedFwd = self.changeFeedToFeedFwd(personFeed);
        if (personFeed.publishPersonNameFwd) {
            $feedFwdSub.find("#feedFwdPersonName").html(personFeed.publishPersonNameFwd + ":");
        } else {
            $feedFwdSub.find("#feedFwdPersonName").remove();
        }
        // 长文本
        if (feedFwd.infoType == "5") {
            // 构造Blog
            self.constructLongText($feedFwdFrame, $longText, feedFwd);
        } else if (feedFwd.infoType == "11") {
            self.constructFormApp($feedFwdFrame, $formApp, feedFwd);
            self.constructAttachment($feedFwdFrame, $attachment, feedFwd);
            self.constructImage($feedFwdFrame, $imageList, feedFwd);
        } else {
            self.constructNormalText($feedFwdFrame, $normalText, feedFwd);
            self.constructLbs($feedFwdFrame, $lbs, feedFwd);
            self.constructMusicAndVoice($feedFwdFrame, $musicAndVoice, feedFwd);
            self.constructAttachment($feedFwdFrame, $attachment, feedFwd);
            self.constructServiceApp($feedFwdFrame, $serviceApp, feedFwd);
            self.constructImage($feedFwdFrame, $imageList, feedFwd);
        }
        $feedFwdSub.show();
        $frame.append($feedFwdSub);
    },
    // 群組成员List
    constructGroupPersonList: function (data) {
        var self = this;
        self.totalSize = data.page.totalSize;
        if (!data.page.totalSize) {
            $(".mGroup_groupContent_peopleListBox").hide();
            $('#_groupPersonNone_div').show();
            mCommon_controlPrompt($(".mCommon_controlPrompt_box"), 42);
        } else {
            $(".mGroup_groupContent_peopleListBox").show();
            $('#_groupPersonNone_div').hide();
        }
        if ((self.totalSize / 10 - self.nextPageNumber) < 0) {
            return false;
        }
        self.nextPageNumber = data.page.currentPageNumber;
        var $frame = $(".mGroup_groupContent_peopleListBox");

        var $groupPerson = self.setting.$template.find("#_groupPerson");
        $(".mCommon_basicTabMenu_common em").eq(1).html("成员(" + data.page.totalSize + ")");
        var groupPersonList = data.page.dataList;
        if (groupPersonList || groupPersonList.length > 0) {
            for (var i = 0; i < groupPersonList.length; i++) {
                var groupPerson = groupPersonList[i];
                self.constructGroupPerson($frame, $groupPerson, groupPerson);
            }
            return true;
        } else {
            return false;
        }
    },
    // 群组成员
    constructGroupPerson: function ($frame, $groupPerson, groupPerson) {
        var self = this;
        // if($frame.find("[personID="+groupPerson.personID+"]").size() > 0){
        //     return;
        // }
        var src = _ctxPath + "/file/loadPic.img?personID=" + groupPerson.personID + "&date=" + _currentTime;
        var $groupPersonSub = $groupPerson.clone();
        $groupPersonSub.find("img").attr("src", src);
        $groupPersonSub.find("#_groupPersonTitle").html(groupPerson.name);
        if (!groupPerson.isAdmin || groupPerson.isAdmin != "1005") {
            $groupPersonSub.find("#_groupPersonAdmin").remove();
        }
        $groupPersonSub.attr("personID", groupPerson.personID);
        self.bindHotPersonEvent($groupPersonSub);
        $groupPersonSub.show();
        $frame.append($groupPersonSub);
    },
    constructNormalFeed: function ($shortDiv, isImageApp, isShowType, personFeedList, isHot) {
        var self = this;
        var $personHeader = self.setting.$template.find("#_shortTextPersonHeader");
        var $imageApp = self.setting.$template.find("#_imageApp");
        var $longText = self.setting.$template.find("#_longText");
        var $feedFwd = self.setting.$template.find("#_feedFwd");
        var $formApp = self.setting.$template.find("#_formApp");
        var $normalText = self.setting.$template.find("#_shortTextNormalText");
        var $lbs = self.setting.$template.find("#_lbs");
        var $musicAndVoice = self.setting.$template.find("#_musicAndVoice");
        var $attachment = self.setting.$template.find("#_attachment");
        var $serviceApp = self.setting.$template.find("#_serviceApp");
        var $imageList = self.setting.$template.find("#_imageList");
        var $btnbar = self.setting.$template.find("#_btnbar");
        var $richText = self.setting.$template.find("#_richTextUpAndDown");
        for (var i = 0; i < personFeedList.length; i++) {
            var $listBoxItem = self.setting.$template.find("#_shortTextDiv").find("#_listBoxItem").clone();
            var personFeed = personFeedList[i];
            if (isImageApp == "true") {
                self.constructSubPersonHeader($listBoxItem.find("#_listBoxItemContainer"), $personHeader, personFeed, isShowType);
                self.constructImageApp($listBoxItem.find("#_listBoxItemContainer"), $imageApp, personFeed);
                self.constructBtnBar($listBoxItem.find("#_listBoxItemContainer"), $btnbar, personFeed);
            } else {
                // 转发
                if (personFeed.feedIDFwd) {
                    self.constructSubPersonHeader($listBoxItem.find("#_listBoxItemContainer"), $personHeader, personFeed, isShowType);
                    self.constructNormalText($listBoxItem.find("#_listBoxItemContainer"), $normalText, personFeed);
                    self.constructLbs($listBoxItem.find("#_listBoxItemContainer"), $lbs, personFeed);
                    self.constructFeedFwd($listBoxItem.find("#_listBoxItemContainer"), $feedFwd, personFeed, $formApp);
                    self.constructBtnBar($listBoxItem.find("#_listBoxItemContainer"), $btnbar, personFeed);
                }
                // 长文本
                else if (personFeed.infoType == "5" || self.BLOG_APP_UNIQUE == self.setting.uniqueCode) {
                    self.constructSubPersonHeader($listBoxItem.find("#_listBoxItemContainer"), $personHeader, personFeed, isShowType);
                    // 构造Blog
                    self.constructLongText($listBoxItem.find("#_listBoxItemContainer"), $longText, personFeed);
                    self.constructBtnBar($listBoxItem.find("#_listBoxItemContainer"), $btnbar, personFeed);
                }
                // 图片应用
                else if (personFeed.infoType == "image" || self.IMAGE_APP_UNIQUE == self.setting.uniqueCode) {
                    self.constructSubPersonHeader($listBoxItem.find("#_listBoxItemContainer"), $personHeader, personFeed, isShowType);
                    self.constructImageApp($listBoxItem.find("#_listBoxItemContainer"), $imageApp, personFeed);
                    self.constructNormalText($listBoxItem.find("#_listBoxItemContainer"), $normalText, personFeed)
                    self.constructLbs($listBoxItem.find("#_listBoxItemContainer"), $lbs, personFeed);
                    self.constructMusicAndVoice($listBoxItem.find("#_listBoxItemContainer"), $musicAndVoice, personFeed);
                    self.constructAttachment($listBoxItem.find("#_listBoxItemContainer"), $attachment, personFeed);
                    self.constructBtnBar($listBoxItem.find("#_listBoxItemContainer"), $btnbar, personFeed);
                }
                // 表单应用
                else if (personFeed.infoType == "11") {
                    self.constructSubPersonHeader($listBoxItem.find("#_listBoxItemContainer"), $personHeader, personFeed, isShowType);
                    self.constructFormApp($listBoxItem.find("#_listBoxItemContainer"), $formApp, personFeed);
                    self.constructAttachment($listBoxItem.find("#_listBoxItemContainer"), $attachment, personFeed);
                    self.constructImage($listBoxItem.find("#_listBoxItemContainer"), $imageList, personFeed);
                    self.constructBtnBar($listBoxItem.find("#_listBoxItemContainer"), $btnbar, personFeed);
                }
                // 图文推送
                else if (personFeed.infoType == "13") {
                    var style = "";
                    if (!personFeed.defaultMobileListStyle) {
                        style = self.setting.mobileListStyle;
                    } else {
                        style = personFeed.defaultMobileListStyle;
                    }
                    if (style == self.MOBILE_LIST_STYLE_LEFT) {
                        $richText = self.setting.$template.find("#_richTextLeftAndRight");
                    } else if (style == self.MOBILE_LIST_STYLE_RIGHT) {
                        $richText = self.setting.$template.find("#_richTextRightAndLeft");
                    } else if (style == self.MOBILE_LIST_STYLE_TOP) {
                        $richText = self.setting.$template.find("#_richTextUpAndDown");
                    }
                    self.constructSubPersonHeader($listBoxItem.find("#_listBoxItemContainer"), $personHeader, personFeed, isShowType);
                    self.constructRichText($listBoxItem.find("#_listBoxItemContainer"), $richText, personFeed.richText);
                    self.constructBtnBar($listBoxItem.find("#_listBoxItemContainer"), $btnbar, personFeed);
                } else {
                    self.constructSubPersonHeader($listBoxItem.find("#_listBoxItemContainer"), $personHeader, personFeed, isShowType);
                    self.constructNormalText($listBoxItem.find("#_listBoxItemContainer"), $normalText, personFeed);
                    self.constructLbs($listBoxItem.find("#_listBoxItemContainer"), $lbs, personFeed);
                    self.constructMusicAndVoice($listBoxItem.find("#_listBoxItemContainer"), $musicAndVoice, personFeed);
                    self.constructAttachment($listBoxItem.find("#_listBoxItemContainer"), $attachment, personFeed);
                    self.constructServiceApp($listBoxItem.find("#_listBoxItemContainer"), $serviceApp, personFeed);
                    self.constructImage($listBoxItem.find("#_listBoxItemContainer"), $imageList, personFeed);
                    self.constructBtnBar($listBoxItem.find("#_listBoxItemContainer"), $btnbar, personFeed);
                }
            }

            $listBoxItem.find("#_listBoxItemContainer").attr("feedID", personFeed.feedID);
            $listBoxItem.find("#_listBoxItemContainer").attr("tagID", personFeed.tagID);
            self.bindItemEvent($listBoxItem.find("#_listBoxItemContainer"));
            $listBoxItem.show()
            if (isHot) {
                $listBoxItem.addClass("mDelicateInfo_list_hotTopicContainerItem").removeClass("mShortText_list_infoComprehensiveBoxItem");
                $shortDiv.find("#_listBoxItemList").removeClass("mShortText_list_infoComprehensiveBoxItemList").addClass("mDelicateInfo_list_hotTopicContainer");
            }
            $shortDiv.find("#_listBoxItemList").append($listBoxItem);
            self.initSetting($listBoxItem);
            mCommon_basicLoadingRemove();//删除loading层
        }
    },
    // 构造精选消息
    constructHotFeedList: function ($topFrame, feedList) {
        var self = this;
        if (!feedList || feedList.length == 0) {
            var $nullPage = $("#_nullPageDiv").clone();
            $nullPage.find("#_content").html("暂无内容");
            $nullPage.show();
            self.setting.$topFrame.append($nullPage);
            mCommon_controlPrompt($nullPage);
            return null;
        }
        for (var i = 0; i < feedList.length; i++) {
            var feed = feedList[i];
            var appChoiceness = feed["appChoiceness"];
            var dataList = feed["dataList"];
            var $frame = self.setting.$template.find("#_hotFeedFrame").clone();
            $topFrame.append($frame);
            $frame.show();
            if (self.HOTFEED_HOTPERSON == appChoiceness.widgetType) {
                self.constructHotPerson($frame, dataList, appChoiceness.widgetName);
            } else if (self.HOTFEED_HOTGROUP == appChoiceness.widgetType) {
                self.constructHotGroup($frame, dataList, appChoiceness.widgetName);
            } else {
                var isImageApp = "true";
                if (4 == appChoiceness.widgetType || 5 == appChoiceness.widgetType) {
                    isImageApp = "false";
                }
                self.constructHotTopic($frame, dataList, appChoiceness.widgetName, isImageApp);
            }
            $frame.data("appChoicenessID", appChoiceness.appChoicenessID);
            $frame.find("#_hotFeedMore,#_scanHotFeedMore").bind("tap", function () {
                var appChoicenessID = $(this).parents("#_hotFeedFrame").data("appChoicenessID");
                window.location.href = _ctxPath + "/r/mp/gpi/" + self.setting.companyID + "/" + appChoicenessID;
            });
            mCommon_basicFrameDelicateInfo_setTitleMaxW($frame.find('.mCommon_basicFrameDelicateInfo_title'));
        }
        /*
         * 计算头像之间的间隔，resize会自动计算
         * 无需参数
         * */
        mCommon_basicHeadHorizontalRank_setMarginVal();
        /*
         * 设置群组轮播
         * 其中参数为：
         * swiperContainer:'',//轮询容器,字符串形式，必填
         * clickFun:function(){}//点击后的回调函数，选填
         * */
        mCommon_basicHotGroupSlide_setSlideContent({
            swiperContainer: 'mCommon_basicHotGroupSlide_box',//轮询容器
            clickFun: function (index, clickObj) {
                var gourpID = clickObj.attr("groupID");
                window.location.href = _ctxPath + "/r/mp/ggcp/" + gourpID + "/" + self.setting.companyID;
            }
        });
        return $topFrame;

    },
    // 构造人气用户
    constructHotPerson: function ($frame, hotPersonList, title) {
        var self = this
        var $hotPersonFiveDiv = $("#_hotPersonFiveDiv").clone();
        var isNone = false;
        $frame.find("#_hotFeedTitle").html(title);
        $frame.find("#_scanHotFeedMore").remove();
        if (!hotPersonList || hotPersonList.length == 0) {
            $frame.find("#_hotFeedMore").remove();
            isNone = true;
        }
        for (var i = 0; i < 5; i++) {
            if (isNone) {
                var $noneItem = $("#_hotPersonFiveNullItem").clone();
                $noneItem.show();
                $hotPersonFiveDiv.find(".mCommon_basicHeadHorizontalRank_box").append($noneItem);
            } else {
                var $hotPersonItem = $("#_hotPersonFiveItem").clone();
                var hotPerson = hotPersonList[i];
                var src = "";
                if (hotPerson) {
                    src = _ctxPath + "/file/loadPic.img?personID=" + hotPerson.personID + "&date=" + _currentTime;
                }
                $hotPersonItem.find("#_personHeadImage").attr("src", src);
                if (i < 3) {
                    $hotPersonItem.find("#_hotPersonLevelImage").attr("src", self.getLevelImage(i));
                } else {
                    $hotPersonItem.find("#_hotPersonLevelImage").remove();
                }
                $hotPersonItem.attr("personID", hotPerson.personID);
                self.bindHotPersonEvent($hotPersonItem);
                $hotPersonItem.show();
                $hotPersonFiveDiv.find(".mCommon_basicHeadHorizontalRank_box").append($hotPersonItem);

                if (hotPersonList.length == (i + 1)) {
                    isNone = true;
                }
            }
            $hotPersonFiveDiv.show();
        }
        $frame.find("#_hotFeedContent").html($hotPersonFiveDiv);

    },
    constructHotGroup: function ($frame, hotGroupList, title) {
        var self = this
        var $hotGroupFiveDiv = $("#_hotGroupDiv").clone();
        $frame.find("#_hotFeedTitle").html(title);
        $frame.find("#_scanHotFeedMore").remove();
        $frame.find("#_hotFeedContent").html("");
        if (!hotGroupList || hotGroupList.length == 0) {
            var $hotFeedNullDiv = $("#_hotFeedNullDiv").clone();
            $frame.find("#_hotFeedMore").remove();
            $hotFeedNullDiv.show()
            $frame.find("#_hotFeedContent").html($hotFeedNullDiv);
            return;
        }
        for (var i = 0; i < hotGroupList.length; i++) {
            var $hotGroupItem = $("#_hotGroupItem").clone();
            var hotGroup = hotGroupList[i];
            var src = _ctxPath + '/file/loadPic.img?groupID=' + hotGroup.groupID + "&t=" + new Date();
            $hotGroupItem.find("#_hotGroupHeaderImage").attr("src", src);
            $hotGroupItem.find("#_hotGroupTitle").html(hotGroup.groupName);
            $hotGroupItem.find("#_hotGroupSubTitle").html(hotGroup.description || "");
            $hotGroupItem.find("#_hotGroupMember").html("<i>" + hotGroup.joinNumber + "</i>位成员");
            $hotGroupItem.find("#_hotGroupShare").html("<i>" + hotGroup.feedNumber + "</i>条分享");
            $hotGroupItem.attr("groupID", hotGroup.groupID);
            $hotGroupItem.css("display", "");
            $hotGroupFiveDiv.find("#_hotGroupContent").append($hotGroupItem);
            $hotGroupFiveDiv.show();
        }
        $frame.find("#_hotFeedContent").append($hotGroupFiveDiv);

    },
    constructHotTopic: function ($frame, personFeedList, title, isImageApp) {
        var self = this;
        var isShowType = true;
        $frame.find("#_hotFeedTitle").html(title);
        $frame.find("#_hotFeedContent").html("");
        if (!personFeedList || personFeedList.length == 0) {
            var $hotFeedNullDiv = $("#_hotFeedNullDiv").clone();
            $frame.find("#_hotFeedMore").remove();
            $frame.find("#_scanHotFeedMore").remove();
            $hotFeedNullDiv.show();
            $frame.find("#_hotFeedContent").html($hotFeedNullDiv);
            return;
        }
        var shortDiv = self.setting.$shortTextDiv.clone();
        shortDiv.show();
        $frame.find("#_hotFeedContent").append(shortDiv);
        self.constructNormalFeed(shortDiv, isImageApp, true, personFeedList, true);
        return true;
    },
    getLevelImage: function (index) {
        var str = "";
        switch (index) {
            case 0 :
                str = "One";
                break;
            case 1 :
                str = "Two";
                break;
            case 2 :
                str = "Three";
        }
        var url = _ctxPath + "/modulev1/portalHtml5/images/mCommon_basicIcon_popularityUserLevel" + str + ".png";
        return url;
    },
    bindHotPersonEvent: function ($obj) {
        var self = this;
        $obj.bind("tap", function (e) {
            var personID = $(this).attr("personID");
            var url = _ctxPath + "/r/mp/pls/" + personID;
            $('.mCommon_basicSearch_box').find("input").val("");
            self.setting.pcManage.getThirdPartyInfo({
                "weixinCanUse": false,
                "thirdPartyCanUse": false
            }, url);
        });
    },
    /**==================================Tim 2016-05-07 查询热门 人员 群组 信息流 开始===============================*/
    requestHotChoincessByList: function (cID, option) {
        var options = {
            url: _ctxPath + '/r/mp/lt30/' + cID,
            dataType: 'JSON',
            type: 'POST',
            data: null,
            success: function (result) {
            },
            error: function () {
                var popup = new mCommon_controlPagePopupPrompt_setPromptInfo({
                    promptImg: self.warningPic,
                    promptText: "出错了,稍后重试",
                    setTimeVal: 2000,
                    closeFun: function () {
                        //do nothing
                    }
                });
            }
        };
        $.extend(true, options, option);
        $.ajax(options);
    },
    /**==================================Tim 2016-05-07 查询热门 人员 群组 信息流 结束===============================*/

    /**##################################Tim 2016-05-11 查询个人空间方法 开始 ######################################*/
    requestPersonInfo: function (pID, option) {
        var options = {
            url: _ctxPath + "/r/mp/gpid/" + pID,
            dataType: 'JSON',
            type: 'POST',
            data: null,
            success: function (result) {
            },
            error: function () {
                var popup = new mCommon_controlPagePopupPrompt_setPromptInfo({
                    promptImg: self.warningPic,
                    promptText: "出错了,稍后重试",
                    setTimeVal: 2000,
                    closeFun: function () {
                        //do nothing
                    }
                });
            }
        };
        $.extend(true, options, option);
        $.ajax(options);
    },
    /**##################################Tim 2016-05-11 查询个人空间方法 结束 ######################################*/
    /**==================================好友交互 操作 Tim 2016-05-12开始==========================================*/
    addFriendByPersonID: function (pID, option) {
        var options = {
            url: _ctxPath + "/r/mp/afbp/" + pID,
            dataType: 'JSON',
            type: 'POST',
            data: null,
            success: function (result) {

            },
            error: function () {
                var popup = new mCommon_controlPagePopupPrompt_setPromptInfo({
                    promptImg: self.warningPic,
                    promptText: "出错了,稍后重试",
                    setTimeVal: 2000,
                    closeFun: function () {
                        //do nothing
                    }
                });
            }
        };
        $.extend(true, options, option);
        $.ajax(options);
    },
    /**
     * 检查加好友之前 俩个人的关系
     * @param pID
     * @param option
     */
    checkCoditionBeforeAddFriend: function (pID, option) {
        var options = {
            url: _ctxPath + "/r/mp/ccba/" + pID,
            dataType: 'JSON',
            type: 'POST',
            data: null,
            async: false,
            success: function (result) {

            },
            error: function () {
                var popup = new mCommon_controlPagePopupPrompt_setPromptInfo({
                    promptImg: self.warningPic,
                    promptText: "出错了,稍后重试",
                    setTimeVal: 2000,
                    closeFun: function () {
                        //do nothing
                    }
                });
            }
        }
        $.extend(true, options, option);
        $.ajax(options);
    },
    addBlankByPersonID: function (pID, option) {
        var options = {
            url: _ctxPath + '/r/mp/abbp/' + pID,
            dataType: 'JSON',
            type: 'POST',
            data: null,
            success: function (result) {
            },
            error: function () {
                var popup = new mCommon_controlPagePopupPrompt_setPromptInfo({
                    promptImg: self.warningPic,
                    promptText: "出错了,稍后重试",
                    setTimeVal: 2000,
                    closeFun: function () {
                        //do nothing
                    }
                });
            }
        }
        $.extend(true, options, option);
        $.ajax(options);
    },

    deleteBlankListByPersonID: function (pID, option) {
        var options = {
            url: _ctxPath + '/r/mp/dblb/' + pID,
            dataType: 'JSON',
            type: 'POST',
            data: null,
            success: function (result) {
            },
            error: function () {
                var popup = new mCommon_controlPagePopupPrompt_setPromptInfo({
                    promptImg: self.warningPic,
                    promptText: "出错了,稍后重试",
                    setTimeVal: 2000,
                    closeFun: function () {
                        //do nothing
                    }
                });
            }
        }
        $.extend(true, options, option);
        $.ajax(options);
    },
    /**==================================好友交互 操作 Tim 2016-05-12结束==========================================*/
    // 初始化全部群组列表
    initAllGroupListPage: function () {
        var self = this;
        var companyID = $("#companyID").val();
        var nextPageNumber = 0;
        var oldTerm = null;
        return function (callBack, listBox, term) {
            if (oldTerm != term) {
                nextPageNumber = 0;
                oldTerm = term;
            }
            nextPageNumber++;
            var options = {
                url: _ctxPath + '/r/mp/lacg/' + self.setting.companyID,
                dataType: 'JSON',
                type: 'GET',
                data: {
                    companyID: companyID,
                    input: oldTerm,
                    page: nextPageNumber,
                    count: 20
                },
                success: function (data) {
                    var more = true;
                    if (nextPageNumber == 1 && (!data || !data.page.dataList || data.page.dataList.length == 0)) {
                        more = false;
                        $('.mAllGroup_list_contentBox').hide();
                        $('.mAllGroup_list_nullInfo').show();
                        mCommon_controlPrompt($(".mCommon_controlPrompt_box"), 42);
                    } else {
                        $('.mAllGroup_list_contentBox').show();
                        $('.mAllGroup_list_nullInfo').hide();
                        var totalSize = data.page.totalSize;
                        var groupList = data.page.dataList;
                        nextPageNumber = nextPageNumber;
                        self.constructAllGroupList(groupList);
                        if ((totalSize > 20 && (totalSize / 20 - nextPageNumber) < 0) || (totalSize < 20 && nextPageNumber > 0)) {
                            more = false;
                        }
                    }
                    callBack && callBack.call(this, more);
                },
                error: function () {
                    var popup = new mCommon_controlPagePopupPrompt_setPromptInfo({
                        promptImg: self.warningPic,
                        promptText: "出错了,稍后重试",
                        setTimeVal: 2000,
                        closeFun: function () {
                            //do nothing
                        }
                    });
                }
            };
            $.ajax(options);
        }
    },
    // 获取素有群组
    constructAllGroupList: function (dataList) {
        var self = this;
        if (dataList) {
            for (var i = 0; i < dataList.length; i++) {
                var group = dataList[i];
                if ($("#_topFrame").find("[groupID='" + group.groupID + "']").size() > 0) {
                    continue;
                }
                var template = $("#_template_div").find("#_group_template").clone();
                var groupTemplate = template.clone();
                //群组头像
                var picUrl = _ctxPath + '/file/loadPic.img?groupID=' + group.groupID + "&t=" + new Date();
                groupTemplate.find(".mCommon_basicHotGroupItem_imgBox").find("img").attr("src", picUrl);
                //群组名称
                groupTemplate.find(".mCommon_basicHotGroupItem_title").html(group.groupName);
                //群组简介
                groupTemplate.find(".mCommon_basicHotGroupItem_describe").html(group.description);
                //加入人数
                groupTemplate.find("#_joinNumber").html(group.joinNumber + "位成员");
                //分享数
                groupTemplate.find("#_feedNumber").html(group.feedNumber + '条分享');
                //状态图片
                var gpStatus = group.joinStatus;
                groupTemplate.find(".mCommon_basicHotGroupItem_operateBox").empty();
                if ("1009" == gpStatus || "1010" == gpStatus) {
                    var arelyJoinIn = $("<div class='mCommon_basicHotGroupItem_alreadyJoin'><img " +
                        "src='"+self.srcPath+"/modulev1/portalHtml5/images/mCommon_basicIcon_hotGroupAlreadyJoin.png'/><p class='mCommon_basicHotGroupItem_operateBoxText'>已加入</p></div>");
                    groupTemplate.find(".mCommon_basicHotGroupItem_operateBox").append(arelyJoinIn);
                } else if ("1008" == gpStatus) {
                    var aduiting = "<div id='_joinGroup' class='mCommon_basicHotGroupItem_alreadyJoin'><em class='mCommon_basicHotGroupItem_exclamation mCommon_basicHotGroupItem_auditColor'></em><p class='mCommon_basicHotGroupItem_operateBoxText mCommon_basicHotGroupItem_auditColor'>审核中</p></div>";
                    groupTemplate.find(".mCommon_basicHotGroupItem_operateBox").append(aduiting);
                } else {
                    var str = "";
                    if (group.joinType == 25) {
                        str = "加入";
                    } else {
                        str = "申请加入";
                    }
                    var applyJoin = "<div id='_joinGroup' class='mCommon_basicHotGroupItem_alreadyJoin'><em class='mCommon_basicHotGroupItem_plus mTheme_color'></em><p class='mCommon_basicHotGroupItem_operateBoxText mCommon_basicHotGroupItem_operateBoxTextBlue mTheme_color'>" + str + "</p></div>";
                    groupTemplate.find(".mCommon_basicHotGroupItem_operateBox").append(applyJoin);
                }
                //注册事件
                groupTemplate.attr("groupID", group.groupID);
                groupTemplate.bind("tap", function (e) {
                    var groupID = $(this).attr("groupID");
                    $('.mCommon_basicSearch_box').find("input").val("");
                    window.location.href = _ctxPath + '/r/mp/ggcp/' + groupID + '/' + group.companyID;
                    e.stopPropagation();
                });
                groupTemplate.find("#_joinGroup").bind("tap", function (e) {
                    mCommon_basicLoadingShow("", true);//屏幕居中对齐不用写参数，容器居中对齐写参数
                    var groupID = $(this).parents("#_group_template").attr("groupID");
                    var url = _ctxPath + "/r/mp/ggcp/" + groupID + "/" + self.setting.companyID;
                    self.setting.pcManage.getThirdPartyInfo({
                        "weixinCanUse": false,
                        "thirdPartyCanUse": false
                    }, url, null, groupID);
                    e.stopPropagation();
                });
                $("#_topFrame").append(groupTemplate);
            }
        }
    }
});