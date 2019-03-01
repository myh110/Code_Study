import Api from "../../utils/api/Api.js";
import Loading from "../../utils/ui/loading/loading.js";

//存取用户信息
class UserInfo {
  userinfo = {};

  constructor() { }

  set(userinfo) {
    this.userinfo = userinfo;
  }

  get() {
    return this.userinfo;
  }
}
const handlers = new Map();
const userInfo = new UserInfo();
let rSpace = /\+/g;

handlers.set("login", function() {
  return new Promise((resolve, reject) => {
    wx.login({
      success: res => {
        $http(Api.login, { js_code: res.code })
          .then(data => {
            wx.setStorageSync(
              data.content.session_name,
              data.content.session_id
            );
            // 获取邻选用户信息
            $http(Api.getUserInfo, {}).then(data => {
              userInfo.set(data.content);
              resolve(userInfo.get());
            }).catch(msg => {
              Loading.hide();
              reject(msg);
            });
            
          })
          .catch(msg => {
            reject(msg);
          });
      }
    });
  });
});



function $http(url, params, type,headers) {
  if (handlers.has(url)) {
    return handlers.get(url)();
  }

  let sessionInfo = wx.getStorageSync("QUARKSESSID");

  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      data: Object.assign({}, params),
      header: Object.assign({
        QUARKSESSID: sessionInfo
      }, headers ? headers:{}),
      method: type || "GET",
      success: function(res) {
        const isStrData = typeof res.data === "string";
        let formatData = isStrData ? JSON.parse(res.data.trim()) : res.data;
        if (res.statusCode === 200) {
          if (formatData.ret === 0) {
            resolve(formatData);
          } else if (formatData.ret === 50001) {
            // handlers.get("login")();
            reject("login");
          } else {
            reject(formatData.msg || "数据请求错误！");
          }
        } else {
          reject("数据请求错误！");
        }
      },
      fail: function(res) {
        reject("数据请求错误！");
      }
    });
  });
}

export default {
  scanCode() {
    return new Promise((resolve, reject) => {
      wx.scanCode({
        success(res) {
          resolve(res.result);
        },
        fail(res) {
          reject(res);
        }
      });
    });
  },
  $http,
  userInfo,
  /**
   * 查询url参数
   * */
  hashQueryString(key,str) {
    var reg = new RegExp(key + '=([^&]*)(&|$)', 'i');
    var searchStr = str;
    var result = searchStr.substr(1).match(reg);

    if (result != null) {
        var value = decodeURIComponent(result[1]) || '';

        return value.replace(rSpace, ' ');
    }
    return null;
  },
};
