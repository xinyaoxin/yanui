
import http from '../utils/http'
/**
 *  @parms resquest 请求地址 例如：http://197.82.15.15:8088/request/...
 *  @param '/testIp'代表vue-cil中config，index.js中配置的代理
 */

//baseUlr
let resquest = "/api"
 
// get请求
export function getListAPI(params){
    return http.get(`${resquest}/api/first`,params)
}
// post请求
export function postFormAPI(params){
    return http.post(`${resquest}/api/first`,params)
}
// put 请求
export function putSomeAPI(params){
    return http.put(`${resquest}/putSome.json`,params)
}
// delete 请求
export function deleteListAPI(params){
    return http.delete(`${resquest}/deleteList.json`,params)
}
//登录接口
export function postLoginAPI(params){
    return http.post(`${resquest}/api/login`,params)
}
//请求用户列表
export function getUserListAPI(params){
    return http.get(`${resquest}/api/userList`,params)
}
//请求判断
export function postComputeAPI(params){
    return http.post(`${resquest}/api/compute?new+item=id%3D1`,params)
}
// 连接晨后端
export function accessAPI(params){
    return http.get(`${resquest}/api/real/getRealDiscrete`,params)
}
