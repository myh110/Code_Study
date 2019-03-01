// 线上与其它测试环境使用
// const base = "";

// test环境测试qa使用
// const base = "https://qa.quark.wmdev2.lsh123.com";
//正式环境
const base = "https://mall.quark.lsh123.com";
export default {
    /**
     * 发送验证码 /uc/user/sendcode?cellphone=18701496016
     */
    "sendCode": base + "/uc/user/sendcode", 
    /**
     * 登录 /uc/connect/miniwx?js_code=abc
     */
    "login": base + "/uc/connect/miniwx",
    /**
     * 开门 /device/door/gotoopen?market_id=abc
     */
    "goToOpen": base + "/device/door/gotoopen",
    /**
     * 上传照片/uc/user/uploadfaceimg
     */
    "uploadFaceImg":base + "/uc/user/uploadfaceimg",
    /**
     * 获取用户手机号，更新用户信息 /uc/user/updateinfo
     */
    "updateinfo": base + "/uc/user/updateinfo", 
    /**
     * 获取微信配置 /uc/connect/wxjsconfig?url=
     */
    "getWxConfig": base + "/uc/connect/wxjsconfig", 
    /**
     * 上传用户识别头像id 有两种来源 微信上传的serverId或阿里云直接上传的id  /uc/user/updatefaceimg?face_img=abc
     */
    "sendFaceImg": base + "/uc/user/updatefaceimg", 
    /**
     * 上传serverId /uc/user/uploadmedia?media_id=123
     */
    "sendMediaImg": base + "/uc/user/uploadmedia", 
    /**
     * 获取用户信息
     */
    "getUserInfo": base + "/uc/user/info",
    /**
     * 微信登录，根据wxcode获取微信信息 /uc/connect/wx?code=
     */
    "wxLogin": base + "/uc/connect/wx", 
    /**
     * 根据扫码code查询sku /freego/sku/search?code=111111
     */
    "searchSku": base + "/freego/sku/search", 
    /**
     * 获取商品价格 /freego/cart?sku_list=[{%22sku_id%22:%22100000%22,%22qty%22:2}]
     */
    "getSum": base + "/freego/cart", 
    /**
     * 获取支付信息 /freego/order/pay?sku_list=
     */
    "goPay": base + "/freego/order/pay", 
    /**
     * 获取订单列表 /freego/order/getlist?pn=1&rn=1
     */
    "getOrderList": base + "/freego/order/getlist", 
    /**
     * 获取订单详情 /freego/order/info?order_id=5243787528771307712
     */
    "getOrderDetail": base + "/freego/order/info", 
    /**
     * 购物车获取优惠券列表 /freego/cart/coupon?sku_list=[{%22sku_id%22:%22100021%22,%22qty%22:1}]
     */
    "getCartCouponList": base + "/freego/cart/coupon", 
    /**
     * 个人中心获取优惠券列表 /uc/user/getcouponlist?pn=0&rn=12
     */
    "getCouponList": base + "/uc/user/getcouponlist", 
    /**
     * 支付结果页获取优惠券信息
     */
    "getCouponPayret": base + "/freego/order/payret",
    /**
     * 获取当前版本
     */
    "getVersion": base + "/freego/version",
    /**
     * 获取多点授权跳转参数
     */
    "getDmallAuthUrl": base + "/uc/dmall/getdmallinfo",
    /**
     * 获取多点用户信息
     */
    "getDmallUserInfo": base + "/uc/dmall/dmallcallback",
    /**
     * 获取超市信息
     */
    "getMarketInfo": base + "/freego/order/getmarketinfo",
    /**
     * 用户选择超市 ?market_id
     */
    "userSelectMarket": base + "/uc/user/choosemarket"
}