let r20 = /%20/g;
let rSpace = /\+/g;
// 统一维护一些全局可使用的工具方法
module.exports =  {
  /*
   * 时间戳转成日期时间格式
   * @params time 传入时间戳，必需
   * @params rules 转换规则，返回格式配置，默认返回date格式
   */
  formatDate(time, rules) {
    if (!time) {
      return;
    }
    var result = "";
    if (typeof time === "string" || typeof time === "number") {
      time = new Date(time * 1000);
      var year = time.getFullYear();
      var month = (time.getMonth() + 1 < 10 ? "0" + (time.getMonth() + 1) : time.getMonth() + 1);
      var date = (time.getDate() < 10 ? "0" + time.getDate() : time.getDate());
      var hour = (time.getHours() < 10 ? "0" + time.getHours() : time.getHours());
      var minute = (time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes());
      var second = (time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds());

      if (rules) {
        switch (rules) {
          case 'datetime':
            result = year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second;
            break;
          case 'date':
            result = year + '-' + month + '-' + date;
            break;
          case 'noYear':
            result = month + '.' + date;
            break;
          case 'minyear':
            result = String(year).substring(2, 4) + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second;
            break;
          case 'onlyDate':
            result = year + month + date;
            break;
        }
      } else {
        result = year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second;
      }
    }
    return result;
  },
  /**
   * 秒转时间
   * @type {[type]}
   */
  secondToTime(second) {
    var day = Math.floor(second / 86400);
    var hour = Math.floor((second % 86400) / 3600);
    var min = Math.floor(((second % 86400) % 3600) / 60);
    var sec = ((second % 86400) % 3600) % 60;
    if (hour < 10) {
      hour = "0" + hour;
    }
    if (min < 10) {
      min = "0" + min;
    }
    if (sec < 10) {
      sec = "0" + sec;
    }
    return day + "天" + hour + ":" + min + ":" + sec;
  },
  /*
   * 将日期格式转成时间戳格式
   * @params time 传入时间戳，必需
   * @params exact 是否精确到毫秒，默认为false
   */
  formatUnixTime(time, exact) {
    if (!time) {
      return;
    }
    var result = Date.parse(new Date(time));
    if (exact !== true) {
      result = result / 1000;
    }
    return result;
  },
  /*
   * 除去空格操作
   * @parmas string 传入字符串
   * @params replace 是否除去所有空格，默认为false，只除去前后空格
   */
  trim(string, replace) {
    let str = string.toString();

    if (!replace) {
      return str.toString().replace(/(^\s*)|(\s*$)/g, "");
    } else if (replace === true) {
      return str.toString().replace(/\s/g, "");
    }
  },
  /**
   * 查询url参数
   * */
  queryString: function (key) {
    var reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)', 'i');
    var result = window.location.search.substr(1).match(reg);
    if (result != null) {
      var value = decodeURIComponent(result[2]) || '';

      return value.replace(rSpace, ' ');
    }
    return null;
  },
  /**
   * 查询url参数
   * */
  hashQueryString: function (key, str) {
    var reg = new RegExp(key + '=([^&]*)(&|$)', 'i');
    var searchStr = str || window.location.hash;
    var result = searchStr.substr(1).match(reg);
    if (result != null) {
      var value = decodeURIComponent(result[1]) || '';

      return value.replace(rSpace, ' ');
    }
    return null;
  },

  /**
   * 查询全部url参数
   * 会以对象形式返回
   * */
  queryLocationSearch: function (url) {
    var search = "";
    var result = {};
    if (url) {
      if (url.indexOf('?') >= 0) {
        search = url.substr(url.indexOf('?') + 1);
      }
    } else {
      search = window.location.search.substr(1);
    }
    if (search.length) {
      var params = search.split("&");
      for (var i = 0, length = params.length; i < length; i++) {
        var item = params[i].split("=");
        // 对于空格, 正常情况下,是转义为 '+'(W3C); 但是encodeURIComponent是将' ' 转义为 '%20' (RFC)
        //RFC 1738: ' ' -> '%20' 同时包括(php) rawurlencode/encodeURIComponent
        // 表单的POS,GET: ' ' -> '+'  同时包括(php) urlencode, (jQuery) $.params()
        var key = decodeURIComponent(item[0]) || '';
        var value = decodeURIComponent(item[1]) || '';
        result[key.replace(rSpace, ' ')] = value.replace(rSpace, ' ');
      }
    }

    return result
  },
  /**
   * 深拷贝方法
   * @params {Object} source 需要拷贝的对象
   * @return {Object} target 拷贝完成的新对象
   */
  copy: function _copy(source) {
    var target = {};
    for (var key in source) {
      if (source.hasOwnProperty(key)) {
        if (typeof source[key] === "object") {
          if (source[key] === null) {
            target[key] = null;
          } else if ({}.toString.call(source[key]).slice(8, -1).toLowerCase() === "array") {
            target[key] = source[key].slice(0);
          } else {
            target[key] = _copy(source[key]);
          }
        } else {
          target[key] = source[key];
        }
      }
    }
    return target;
  },
  /**
   * extend方法 对目标对象进行拓展
   * @params {Boolean} deep 是否需要深拷贝
   * @return {Object} target 需要被extend的对象
   * @return {Object} others 后续可传入任意个被extend的对象
   */
  extend: function (deep, target) {
    var args = [].slice.call(arguments, 2),
      len = args.length,
      i = 0,
      key;
    if (len === 0) {
      throw new Error("未传入要拓展的对象！");
    }
    if (!deep) {
      for (; i < len; i++) {
        for (key in args[i]) {
          if (args[i].hasOwnProperty(key)) {
            target[key] = args[i][key];
          }
        }
      }
    } else {
      for (; i < len; i++) {
        for (key in args[i]) {
          if (args[i].hasOwnProperty(key)) {
            if (typeof args[i][key] === "object") {
              if (args[i][key] === null) {
                target[key] = null;
              } else if ({}.toString.call(args[i][key]).slice(8, -1).toLowerCase() === "array") {
                target[key] = args[i][key].slice(0);
              } else {
                target[key] = this.copy(args[i][key]);
              }
            } else {
              target[key] = args[i][key];
            }
          }
        }
      }
    }
    return target;
  },
  /**
   * 生成一个随机的字符串（形如：iba6nelt_2p3in）
   * @returns {string}
   */
  randomKey: function () {
    return (+(new Date)).toString(36) + '_' + Math.ceil((10e6 * Math.random())).toString(36);
  }
}
