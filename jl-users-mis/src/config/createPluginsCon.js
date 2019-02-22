import cloneDeep from "lodash/cloneDeep";
/**
 * 类型插件
 *
 */
export const typePluginInitData = {
    //是否选中
    selected: false, //控制组件的创建及销毁，一般调用处负责此属性的处理
    // 插件选中名称
    selectedName: "",
    //插件选中的类型
    selectedType: "",
    data: [],
    //插件列表
    pluginList: {
        goodsPlugin: {
            //插件类型
            type: "goodsPlugin",
            //插件名称
            name: '商品插件',
            //初始化传递的数据  可空
            data: [

            ],
            //关联关系
            relation: {
                pluginName: [],

            }

        }
    }
}

/**
 * 活动插件
 * on-selected-change 通知父组件 活动插件删除
 *
 */
export const activityPluginInitData = {
    //支付插件
    payPlugin: {
        //插件类型
        type: "payPlugin",
        //插件名称
        name: "支付设置",
        //选中状态
        selected: false,

        data: {
            online_pay: '0',
            op_rules: {
                group_buy_price: "" //   
            },
            award_list: {
                share_rule: {
                    money: ""
                },
                random_rule: {
                    max_money: ""
                },
                share_open: ""
            }
        }
    },
    //物流插件
    logisticsPlugin: {
        //插件类型
        type: "logisticsPlugin",
        name: "物流方式",
        selected: false,
        data: {
            delivery_type: "1",
            delivery_type_status: '1',
            delivery_address_id: [],
        }
    }
}

/**
 * 
 * @param {*} data 类型插件数据
 */
export const compareTypePluginData = (data) => {
    let cpTypePlugin = cloneDeep(typePluginInitData)
    if (!data) {
        return cpTypePlugin
    } else {
        cpTypePlugin.selected = true;
        cpTypePlugin.selectedName = '商品插件';
        cpTypePlugin.selectedType = 'goodsPlugin';
        cpTypePlugin.data = data;
        return cpTypePlugin
    }
}
/**
 * 
 * @param {*} data 活动插件数据
 */
export const compareActivityPluginData = (list) => {

    let cpActivityPlugin = cloneDeep(activityPluginInitData)
    if(!list){
        return cpActivityPlugin
    } else {
        for (const item of list) {
            cpActivityPlugin[item.type].selected = true;
            cpActivityPlugin[item.type].data = item.data;
        }
        return cpActivityPlugin
    }
}