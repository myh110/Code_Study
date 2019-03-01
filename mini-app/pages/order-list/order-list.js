// pages/order-list/order-list.js

import WX from "../../utils/weixin/weixin.js";
import Api from "../../utils/api/Api.js";
import Loading from "../../utils/ui/loading/loading.js";
import Confirm from "../../utils/ui/confirm/confirm.js";
import Alert from "../../utils/ui/alert/alert.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pn: 0,
    rn: 12,
    total: 0,
    list: [],
    // list: [
    //   {
    //     "id": "1567",
    //     "order_id": "2867998244657453227",
    //     "uid": "469549866158571131",
    //     "market_id": "1",
    //     "status": "2",
    //     "is_valid": "1",
    //     "activity_info": "[]",
    //     "promotion_info": "{\"promotion_ids\":[],\"promotion_money\":\"0.00\"}",
    //     "coupon_info": "{\"coupon_ids\":[\"3521583101580407862\"],\"coupon_money\":\"50.00\",\"usable_coupon_total\":2}",
    //     "sku_num": "1",
    //     "sku_total": "1.000",
    //     "sku_money": "1.01",
    //     "money": "0.01",
    //     "ip": "1032262158",
    //     "order_from": "1",
    //     "ordered_at": "1516935808",
    //     "pay_channel": "2",
    //     "pay_no": "956724239107358720",
    //     "pay_at": "1516935815",
    //     "created_at": "1516935808",
    //     "updated_at": "1516935815",
    //     "promotion_sku_info": "{\"promotion_sku_ids\":[],\"promotion_sku_money\":\"0.00\"}",
    //     "status_name": "支付完成",
    //     "order_detail_list": [
    //       {
    //         "id": "1879",
    //         "order_id": "2867998244657453227",
    //         "sku_id": "100010",
    //         "qty": "1.000",
    //         "original_price": "1.01",
    //         "price": "1.01",
    //         "real_price": "0.0000",
    //         "promotion_info": [
    //           {
    //             "promotion_id": "3521583101580407862",
    //             "promotion_type": 2,
    //             "promotion_money": "1.01"
    //           }
    //         ],
    //         "created_at": "1516935808",
    //         "updated_at": "1516935808",
    //         "sku_info": {
    //           "original_price": 1.01,
    //           "price": 1.01,
    //           "real_price": 1.01,
    //           "barcode": "4891028164456",
    //           "pic_url": "http://gb.cri.cn/mmsource/images/2014/06/23/1/13548919996083314649.jpg",
    //           "sku_name": "维他",
    //           "sku_id": 100010,
    //           "promotion_info": []
    //         }
    //       }
    //     ]
    //   },
    //   {
    //     "id": "1484",
    //     "order_id": "3243063612124908619",
    //     "uid": "469549866158571131",
    //     "market_id": "1",
    //     "status": "2",
    //     "is_valid": "1",
    //     "activity_info": "[]",
    //     "promotion_info": "{\"promotion_ids\":[],\"promotion_money\":\"0.00\"}",
    //     "coupon_info": "{\"coupon_ids\":[\"3846264484318154181\"],\"coupon_money\":\"50.00\",\"usable_coupon_total\":2}",
    //     "sku_num": "1",
    //     "sku_total": "1.000",
    //     "sku_money": "0.03",
    //     "money": "0.01",
    //     "ip": "1032262158",
    //     "order_from": "1",
    //     "ordered_at": "1515745638",
    //     "pay_channel": "2",
    //     "pay_no": "951732304512811008",
    //     "pay_at": "1515745647",
    //     "created_at": "1515745638",
    //     "updated_at": "1515745647",
    //     "promotion_sku_info": "{\"promotion_sku_ids\":[],\"promotion_sku_money\":\"0.00\"}",
    //     "status_name": "支付完成",
    //     "order_detail_list": [
    //       {
    //         "id": "1873",
    //         "order_id": "3243063612124908619",
    //         "sku_id": "100315",
    //         "qty": "1.000",
    //         "original_price": "0.03",
    //         "price": "0.03",
    //         "real_price": "0.0000",
    //         "promotion_info": [
    //           {
    //             "promotion_id": "3846264484318154181",
    //             "promotion_type": 2,
    //             "promotion_money": "0.03"
    //           }
    //         ],
    //         "created_at": "1515745638",
    //         "updated_at": "1515745638",
    //         "sku_info": {
    //           "original_price": 0.03,
    //           "price": 0.03,
    //           "real_price": 0.03,
    //           "barcode": "6926892527088",
    //           "pic_url": "http://gb.cri.cn/mmsource/images/2014/06/23/1/13548919996083314649.jpg",
    //           "sku_name": "银鹭桂圆八宝粥360g/听",
    //           "sku_id": 100315,
    //           "promotion_info": []
    //         }
    //       }
    //     ]
    //   },
    //   {
    //     "id": "1483",
    //     "order_id": "456602080094945691",
    //     "uid": "469549866158571131",
    //     "market_id": "1",
    //     "status": "2",
    //     "is_valid": "1",
    //     "activity_info": "[]",
    //     "promotion_info": "{\"promotion_ids\":[],\"promotion_money\":\"0.00\"}",
    //     "coupon_info": "{\"coupon_ids\":[\"1572509622426385841\"],\"coupon_money\":\"50.00\",\"usable_coupon_total\":2}",
    //     "sku_num": "2",
    //     "sku_total": "2.000",
    //     "sku_money": "2.02",
    //     "money": "0.01",
    //     "ip": "1032262158",
    //     "order_from": "1",
    //     "ordered_at": "1515743111",
    //     "pay_channel": "2",
    //     "pay_no": "951721704093122560",
    //     "pay_at": "1515743115",
    //     "created_at": "1515743111",
    //     "updated_at": "1515743115",
    //     "promotion_sku_info": "{\"promotion_sku_ids\":[],\"promotion_sku_money\":\"0.00\"}",
    //     "status_name": "支付完成",
    //     "order_detail_list": [
    //       {
    //         "id": "1871",
    //         "order_id": "456602080094945691",
    //         "sku_id": "100012",
    //         "qty": "1.000",
    //         "original_price": "0.02",
    //         "price": "0.02",
    //         "real_price": "0.0000",
    //         "promotion_info": [
    //           {
    //             "promotion_id": "1572509622426385841",
    //             "promotion_type": 2,
    //             "promotion_money": "0.02"
    //           }
    //         ],
    //         "created_at": "1515743111",
    //         "updated_at": "1515743111",
    //         "sku_info": {
    //           "original_price": 6,
    //           "price": 6,
    //           "real_price": 6,
    //           "barcode": "6954767415772",
    //           "pic_url": "http://gb.cri.cn/mmsource/images/2014/06/23/1/13548919996083314649.jpg",
    //           "sku_name": "可口可乐",
    //           "sku_id": 100012,
    //           "promotion_info": []
    //         }
    //       },
    //       {
    //         "id": "1872",
    //         "order_id": "456602080094945691",
    //         "sku_id": "100011",
    //         "qty": "1.000",
    //         "original_price": "2.00",
    //         "price": "2.00",
    //         "real_price": "0.0000",
    //         "promotion_info": [
    //           {
    //             "promotion_id": "1572509622426385841",
    //             "promotion_type": 2,
    //             "promotion_money": "2"
    //           }
    //         ],
    //         "created_at": "1515743111",
    //         "updated_at": "1515743111",
    //         "sku_info": {
    //           "original_price": 6.65,
    //           "price": 6.65,
    //           "real_price": 6.65,
    //           "barcode": "6921168593569",
    //           "pic_url": "http://gb.cri.cn/mmsource/images/2014/06/23/1/13548919996083314649.jpg",
    //           "sku_name": "茶π蜜桃乌龙茶",
    //           "sku_id": 100011,
    //           "promotion_info": []
    //         }
    //       }
    //     ]
    //   },
    //   {
    //     "id": "1464",
    //     "order_id": "8419669905912672555",
    //     "uid": "469549866158571131",
    //     "market_id": "1",
    //     "status": "2",
    //     "is_valid": "1",
    //     "activity_info": "[]",
    //     "promotion_info": "{\"promotion_ids\":[],\"promotion_money\":\"0.00\"}",
    //     "coupon_info": "{\"coupon_ids\":[\"7439011078654200146\"],\"coupon_money\":\"50.00\",\"usable_coupon_total\":2}",
    //     "sku_num": "1",
    //     "sku_total": "1.000",
    //     "sku_money": "0.02",
    //     "money": "0.01",
    //     "ip": "1032262158",
    //     "order_from": "1",
    //     "ordered_at": "1515657201",
    //     "pay_channel": "2",
    //     "pay_no": "951361374376689664",
    //     "pay_at": "1515657208",
    //     "created_at": "1515657201",
    //     "updated_at": "1515657208",
    //     "promotion_sku_info": "{\"promotion_sku_ids\":[],\"promotion_sku_money\":\"0.00\"}",
    //     "status_name": "支付完成",
    //     "order_detail_list": [
    //       {
    //         "id": "1854",
    //         "order_id": "8419669905912672555",
    //         "sku_id": "100012",
    //         "qty": "1.000",
    //         "original_price": "0.02",
    //         "price": "0.02",
    //         "real_price": "0.0000",
    //         "promotion_info": [
    //           {
    //             "promotion_id": "7439011078654200146",
    //             "promotion_type": 2,
    //             "promotion_money": "0.02"
    //           }
    //         ],
    //         "created_at": "1515657201",
    //         "updated_at": "1515657201",
    //         "sku_info": {
    //           "original_price": 6,
    //           "price": 6,
    //           "real_price": 6,
    //           "barcode": "6954767415772",
    //           "pic_url": "http://gb.cri.cn/mmsource/images/2014/06/23/1/13548919996083314649.jpg",
    //           "sku_name": "可口可乐",
    //           "sku_id": 100012,
    //           "promotion_info": []
    //         }
    //       }
    //     ]
    //   },
    //   {
    //     "id": "1462",
    //     "order_id": "6654118114472044859",
    //     "uid": "469549866158571131",
    //     "market_id": "1",
    //     "status": "2",
    //     "is_valid": "1",
    //     "activity_info": "[]",
    //     "promotion_info": "{\"promotion_ids\":[],\"promotion_money\":\"0.00\"}",
    //     "coupon_info": "{\"coupon_ids\":[],\"coupon_money\":\"0.00\",\"usable_coupon_total\":1}",
    //     "sku_num": "1",
    //     "sku_total": "1.000",
    //     "sku_money": "0.02",
    //     "money": "0.02",
    //     "ip": "1032262158",
    //     "order_from": "1",
    //     "ordered_at": "1515656498",
    //     "pay_channel": "2",
    //     "pay_no": "951358423788683264",
    //     "pay_at": "1515656503",
    //     "created_at": "1515656498",
    //     "updated_at": "1515656503",
    //     "promotion_sku_info": "{\"promotion_sku_ids\":[],\"promotion_sku_money\":\"0.00\"}",
    //     "status_name": "支付完成",
    //     "order_detail_list": [
    //       {
    //         "id": "1852",
    //         "order_id": "6654118114472044859",
    //         "sku_id": "100012",
    //         "qty": "1.000",
    //         "original_price": "0.02",
    //         "price": "0.02",
    //         "real_price": "0.0200",
    //         "promotion_info": [],
    //         "created_at": "1515656498",
    //         "updated_at": "1515656498",
    //         "sku_info": {
    //           "original_price": 6,
    //           "price": 6,
    //           "real_price": 6,
    //           "barcode": "6954767415772",
    //           "pic_url": "http://gb.cri.cn/mmsource/images/2014/06/23/1/13548919996083314649.jpg",
    //           "sku_name": "可口可乐",
    //           "sku_id": 100012,
    //           "promotion_info": []
    //         }
    //       }
    //     ]
    //   },
    //   {
    //     "id": "1444",
    //     "order_id": "7126010912531826875",
    //     "uid": "469549866158571131",
    //     "market_id": "1",
    //     "status": "2",
    //     "is_valid": "1",
    //     "activity_info": "[]",
    //     "promotion_info": "{\"promotion_ids\":[],\"promotion_money\":\"0.00\"}",
    //     "coupon_info": "{\"coupon_ids\":[],\"coupon_money\":\"0.00\",\"usable_coupon_total\":0}",
    //     "sku_num": "1",
    //     "sku_total": "1.000",
    //     "sku_money": "0.03",
    //     "money": "0.03",
    //     "ip": "1032262158",
    //     "order_from": "1",
    //     "ordered_at": "1515644424",
    //     "pay_channel": "2",
    //     "pay_no": "951307782026428416",
    //     "pay_at": "1515644428",
    //     "created_at": "1515644424",
    //     "updated_at": "1515644428",
    //     "promotion_sku_info": "{\"promotion_sku_ids\":[],\"promotion_sku_money\":\"0.00\"}",
    //     "status_name": "支付完成",
    //     "order_detail_list": [
    //       {
    //         "id": "1841",
    //         "order_id": "7126010912531826875",
    //         "sku_id": "100315",
    //         "qty": "1.000",
    //         "original_price": "0.03",
    //         "price": "0.03",
    //         "real_price": "0.0300",
    //         "promotion_info": [],
    //         "created_at": "1515644424",
    //         "updated_at": "1515644424",
    //         "sku_info": {
    //           "original_price": 0.03,
    //           "price": 0.03,
    //           "real_price": 0.03,
    //           "barcode": "6926892527088",
    //           "pic_url": "http://gb.cri.cn/mmsource/images/2014/06/23/1/13548919996083314649.jpg",
    //           "sku_name": "银鹭桂圆八宝粥360g/听",
    //           "sku_id": 100315,
    //           "promotion_info": []
    //         }
    //       }
    //     ]
    //   },
    //   {
    //     "id": "1258",
    //     "order_id": "7064367867502222795",
    //     "uid": "469549866158571131",
    //     "market_id": "1",
    //     "status": "2",
    //     "is_valid": "1",
    //     "activity_info": "[]",
    //     "promotion_info": "{\"promotion_ids\":[],\"promotion_money\":\"0.00\"}",
    //     "coupon_info": "{\"coupon_ids\":[],\"coupon_money\":\"0.00\",\"usable_coupon_total\":0}",
    //     "sku_num": "1",
    //     "sku_total": "1.000",
    //     "sku_money": "0.01",
    //     "money": "0.01",
    //     "ip": "1032262158",
    //     "order_from": "1",
    //     "ordered_at": "1514877518",
    //     "pay_channel": "2",
    //     "pay_no": "948091146003808256",
    //     "pay_at": "1514877527",
    //     "created_at": "1514877518",
    //     "updated_at": "1514877527",
    //     "promotion_sku_info": "{\"promotion_sku_ids\":[],\"promotion_sku_money\":\"0.00\"}",
    //     "status_name": "支付完成",
    //     "order_detail_list": [
    //       {
    //         "id": "1685",
    //         "order_id": "7064367867502222795",
    //         "sku_id": "100406",
    //         "qty": "1.000",
    //         "original_price": "0.01",
    //         "price": "0.01",
    //         "real_price": "0.0100",
    //         "promotion_info": [],
    //         "created_at": "1514877518",
    //         "updated_at": "1514877518",
    //         "sku_info": {
    //           "original_price": 0.01,
    //           "price": 0.01,
    //           "real_price": 0.01,
    //           "barcode": "6954767430386",
    //           "pic_url": "http://gb.cri.cn/mmsource/images/2014/06/23/1/13548919996083314649.jpg",
    //           "sku_name": "雪碧碳酸饮料330ml/听",
    //           "sku_id": 100406,
    //           "promotion_info": []
    //         }
    //       }
    //     ]
    //   }
    // ],
    hasGeted: false,
    isEnd: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(!this.data.isEnd){
      this.getList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  getList(){
    Loading.show()
    WX.$http(Api.getOrderList, {
      pn: this.data.pn,
      rn: this.data.rn
    }).then(data => {
      Loading.hide();
      this.setData({
        pn: this.data.pn + 12,
        total: data.content.total,
        list: [...this.data.list,...data.content.list]
      })
      if(this.data.pn >= this.data.total){
        this.setData({
          isEnd: true
        })
      }
    })
  }
})