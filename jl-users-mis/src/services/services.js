import {
    baseUrl
} from '@/config/baseUrl'
/**
 * 登录
 * @param {Number} code 
 */
export const login = (params = {
    code: 1
}) => axios({
    method: 'get',
    url: baseUrl + '/api/client/user/login',
    params: params
})
/**
 * 登出
 * @param {*} params 
 */
export const loginout = (params = {}) => axios({
    method: 'get',
    url: baseUrl + '/api/client/user/logout',
    params: params
})
/**
 * 用户信息
 * @param {*} params 
 */
export const fetchUserInfo = (params = {}) => axios({
    method: 'get',
    url: baseUrl + '/api/client/user/getUserInfo',
    params: params
})

/**
 * 获取接龙列表
 * @param {*} params 
 */
export const getmyList = (params = {}) => axios({
    method: 'get',
    url: baseUrl + '/api/client/game/getmylist',
    params: params
})
/**
 * 删除接龙
 * @param {*} params 
 */
export const deleteJl = (params = {}) => axios({
    method: 'get',
    url: baseUrl + '/api/client/game/delete',
    params: params
})
/**
 * 结束接龙
 * @param {*} params 
 */
export const jlEnd = (params = {}) => axios({
    method: 'get',
    url: baseUrl + '/api/client/game/over',
    params: params
})
/**
 * 创建接龙自提地点
 * @param {*} params 
 */
export const creatPoint = (params = {}) => axios({
    method: 'post',
    url: baseUrl + '/api/client/address/create',
    params: params
})

/**
 * 上传图片
 * @param {*} params 
 */
export const uploadImg = (params = {}) => axios({
    method: 'post',
    url: baseUrl + '/api/client/game/uploadimg',
    data: params
})
/**
 * 创建接龙
 * @param {*} params 
 */
export const creatJl = (params = {}) => axios({
    method: 'post',
    url: baseUrl + '/api/client/game/create',
    data: params
})
/**
 * 接龙详情
 * @param {NUmber} game_id 
 */
export const gameDetail = (params = {}) => axios({
    method: 'get',
    url: baseUrl + '/api/client/game/get',
    params: params
// 获取自提点列表
})
export const getPointList = (params = {}) => axios({
    method: 'get',
    url: baseUrl + '/api/client/address/getlist',
    data: params
})
