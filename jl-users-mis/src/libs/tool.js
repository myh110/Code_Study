import cloneDeep from "lodash/cloneDeep";
import isObject from "lodash/isObject";
/**
 * 
 * @param {Number} num 当前页
 * @param {Number} size 每页条数
 */
export const getPageParams = (num, size)=>{
    let pn = (num - 1) * size
    let rn =  size
    return {pn, rn}
}
/**
 * 格式化创建数据(创建)
 * @param {Object} obj
 */

export const arrToString = (obj)=>{
    const cpObj = cloneDeep(obj);
    if(cpObj.img_list.length){
        for (let key in cpObj.img_list) {
            cpObj.img_list[key] = cpObj.img_list[key].id
        }        
    }
    if(cpObj.video_list.length){
        for (let key in cpObj.video_list) {
            delete cpObj.video_list[key].snapshot_url;
            delete cpObj.video_list[key].video_url;
        }        
    }

    for (const key in cpObj) {
        if (cpObj.hasOwnProperty(key)) {
            let element = cpObj[key];
            if(Array.isArray(element)){
                if (element.length > 0) {
                    cpObj[key] = JSON.stringify(element)
                    // console.log(element, typeof element)
                }else{
                    delete cpObj[key]
                }
            }
            if(isObject(element)){
                cpObj[key] = JSON.stringify(element)
            }
        }
    }
    console.log(cpObj)
    return cpObj
}