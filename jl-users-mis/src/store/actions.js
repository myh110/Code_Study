import * as types from './mutation-types'


//设置登录状态
export const setLoginStatus = async ({ commit, state }, islogin) => {
    commit(types.UPDATE_LOGIN_STATUS, islogin) // -> 'foo/someMutation'

}
//提交用户信息
export const updateUserInfo = async ({ commit, state }, userInfo) => {
    
    commit(types.UPDATE_USER_INFO, userInfo) // -> 'foo/someMutation'
}
//提交用户信息
export const initPlugin = async ({ commit, state }, plugins) => {
    
    commit(types.UPDATE_USER_INFO, userInfo) // -> 'foo/someMutation'
}
