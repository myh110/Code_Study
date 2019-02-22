
import * as types from './mutation-types'
import Storage from '@/libs/storage'
export default {
    //更新登录状态
    [types.UPDATE_LOGIN_STATUS](state, islogin){
        
        if(islogin){
            Storage.ls.set("is_login", islogin);
        } else {
            Storage.ls.del("is_login");
        }
        state.login = islogin;
    },
    //更新用户信息
    [types.UPDATE_USER_INFO](state, userInfo){
        Storage.ls.set("userInfo", userInfo);
        state.userInfo = userInfo;
    },
    //设置类型插件
    [types.SET_TYPE_PLUGIN_DATA](state, typePlugin){
        state.typePlugin = typePlugin;
    },
    //设置活动插件
    [types.SET_ACTIVITY_PLUGIN_DATA](state, activityPlugin){
        state.activityPlugin = activityPlugin;
    },
}