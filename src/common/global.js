/* global document:true */
/**
 * 扩展Array对象的方法(判断数组中是否包含指定值)
 * @param  {[type]} item 指定值
 * @return {[type]}      [description]
 */

try {
    if (!Array.prototype.contains) {
        // 利用Array的原型prototype点出一个我想要封装的方法名contains 
        Array.prototype.contains = function(element) {
            for (var i = 0; i < this.length; i++) {
                //如果数组中某个元素和你想要测试的元素对象element相等，则证明数组中包含这个元素，返回true
                if (this[i] === element) {
                    return true;
                }
            }
        };
    }
} catch (e) {
    console.error(e);
}
// forEach方法的兼容解决方法
try {
    if (!Array.prototype.forEach) {
        Array.prototype.forEach = function(callback, thisArg) {
            var T, k;
            if (this === null) {
                throw new TypeError(' this is null or not defined');
            }
            var O = Object(this);
            var len = O.length >>> 0; // jshint ignore:line
            if (typeof callback !== "function") {
                throw new TypeError(callback + ' is not a function');
            }
            if (arguments.length > 1) {
                T = thisArg;
            }
            k = 0;
            while (k < len) {
                var kValue;
                if (k in O) {
                    kValue = O[k];
                    callback.call(T, kValue, k, O);
                }
                k++;
            }
        };
    }
} catch (e) {
    console.error(e);
}

/**
 * 提供命名管理，管理全局变量。
 * 所有全局变量必须命名在GLOBAL里面的命名空间下，将变量冲突、覆盖问题降到最小。
 * @type {{}}
 */
var GLOBAL = {};
/**
 * 给创建命名空间提供一个统一接口
 * 调用方法：GLOBAL.namespace('Ie');这样便创建了一个ie的命名空间。
 * 创建完命名空间后，如果需要定义一个全局变量，方法如下：GLOBAL.Ie.isIe6;
 * 使用该变量的方法也是：GLOBAL.Ie.isIe6
 * @param str
 */
GLOBAL.namespace = function(str) {
    var arr = str.split("."),
        o = GLOBAL;
    for (var i = (arr[0] === "GLOBAL") ? 1 : 0; i < arr.length; i++) {
        o[arr[i]] = o[arr[i]] || {};
        o = o[arr[i]];
    }
};

GLOBAL.namespace('Util');
GLOBAL.namespace('Cookie');
GLOBAL.namespace('Array');
GLOBAL.namespace('Os');
GLOBAL.namespace('Browser');
GLOBAL.namespace('Online');


/* cookie扩展 */
GLOBAL.Cookie = {
    /**
     * 设置cookie
     * @param name 名称
     * @param value 值
     * @param expires 有效时间（单位：小时）（可选） 默认：24h
     */
    set: function(name, value, expires, domain) {
        var expTimes = expires ? (Number(expires) * 60 * 60 * 1000) : (24 * 60 * 60 * 1000); // 毫秒
        var expDate = new Date();
        expDate.setTime(expDate.getTime() + expTimes);
        var expString = expires ? '; expires=' + expDate.toUTCString() : '';
        var pathString = '; path=/';
        var domain = '; domain=' + domain;
        document.cookie = name + '=' + encodeURI(value) + expString + pathString + domain;
    },
    /**
     * 读cookie
     * @param name
     */
    get: function(name) {
        var cookieStr = '; ' + document.cookie + '; ';
        var index = cookieStr.indexOf('; ' + name + '=');
        if (index !== -1) {
            var s = cookieStr.substring(index + name.length + 3, cookieStr.length);
            return decodeURI(s.substring(0, s.indexOf('; ')));
        } else {
            return null;
        }
    },
    /**
     * 删除cookie
     * @param name
     */
    del: function(name, domain) {
        var exp = new Date(new Date().getTime() - 1);
        var s = this.get(name);
        if (s !== null) {
            document.cookie = name + '=' + s + '; expires=' + exp.toUTCString() + '; path=/; domain=' + domain;
        }
    }
};

// 操作系统
GLOBAL.Os = function() {
    var u = navigator.userAgent,
        Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"),
        mobile = false;
    for (var v = 0; v < Agents.length; v++) {
        if (u.indexOf(Agents[v]) > -1) {
            mobile = true;
            break;
        }
    }
    return {
        //移动终端浏览器版本信息 
        mobile: mobile, //是否为移动终端 
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端 
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器 
        iphone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器 
        ipad: u.indexOf('iPad') > -1, //是否iPad 
        webapp: u.indexOf('Safari') === -1 //是否web应该程序，没有头部与底部 
    };
}();

// 浏览器
GLOBAL.Browser = function() {
    var ua = navigator.userAgent, //获取判断用的对象
        mobile = GLOBAL.Os.mobile;
    if (mobile) { // mobile
        //移动终端浏览器版本信息
        return {
            wechat: ua.indexOf('MicroMessenger') > -1, // 在微信中打开  
            weibo: ua.toLowerCase().indexOf('weibo') > -1, // 在新浪微博客户端打开
            qq: ua.indexOf('QQ/') > -1, // 在QQ、QQ空间中打开 
            qqbrowser: ua.indexOf('MQQBrowser') > -1 // 在QQ空间打开
        };
    }
    return {};
}();

// uid
GLOBAL.getUid=function(){
    
        var mu = GLOBAL.Cookie.get('_mu'),
            mopUid = GLOBAL.Cookie.get('mop_uid');
        if (mu) {
            this.login = mu.replace(/\"/g, '').split('|')[0];
        }
        if (mopUid) {
            this.uid = mopUid;
            return
        } else {
            this.uid = (+new Date()) + Math.random().toString(10).substring(2, 6);
            GLOBAL.Cookie.set('mop_uid', this.uid, 365, 'mop.com');
            return
        }
    
};

 /* 获取qid */
 GLOBAL.getQid=function() {
    this.qid = GLOBAL.Util.getQueryString('qid') || GLOBAL.Cookie.get('qid') || 'null';
    if (GLOBAL.Util.getQueryString('qid')) {
        GLOBAL.Cookie.set('qid', GLOBAL.Util.getQueryString('qid'), 3, 'mop.com');
    }
};

// 在线链接
GLOBAL.Online = {
    // 发布上线
    // preUrl: '//www.mop.com/',  // 在线地址
    // hostUrl: '//www.mop.com/',  // 在线地址
    // loginUrl: '//www.mop.com/login.html',  // 登录
    // registerUrl: '//www.mop.com/register.html',  // 注册
    // perfectUrl: '//www.mop.com/perfect.html',  // 完善信息
    // postUrl: '//dzh.mop.com/dzhpost.html', // 大杂烩发帖页面
    // ttpostUrl: '//tt.mop.com/ttpost.html', // 贴贴发帖页面
    // sdUrl: '//dzh.mop.com/a/171224124822288858977.html'

    // 测试
    // preUrl: '//www.mop.com/moptest/', // 在线地址
    // hostUrl: '//www.mop.com/moptest/', // 在线地址
    // loginUrl: '//www.mop.com/moptest/login.html', // 登录
    // registerUrl: '//www.mop.com/moptest/register.html', // 注册
    // perfectUrl: '//www.mop.com/moptest/perfect.html',  // 完善信息
    // postUrl: '//dzh.mop.com/moptest/dzhpost.html', // 大杂烩发帖页面
    // ttpostUrl: '//tt3.mop.com/subject/add', // 贴贴发帖页面

    preUrl: '',  // 在线地址
    loginUrl: 'login.html',  // 登录
    registerUrl: 'register.html',  // 注册
    perfectUrl: 'perfect.html',  // 完善信息
    postUrl: 'http://dzh.mop.com/subject/add', // 发帖页面
}
export default GLOBAL