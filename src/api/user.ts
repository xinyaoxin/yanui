import http from '../utils/http'
/**
 *  @parms resquest 请求地址 例如：http://197.82.15.15:8088/request/...
 *  @param '/testIp'代表vue-cil中config，index.js中配置的代理
 */

//baseUlr
let resquest = "/dev-api"

export function getListAPI(params:any){
    return http.get(`${resquest}/api/first`,params)
}
// post请求
export function login(params:any){
    return http.post(`${resquest}/vue-element-admin/user/login`,params)
}

//获取用户信息，需要携带token
export function getInfo(params:any){
    return http.post(`${resquest}/api/first`,params)
}
export function logout(params:any){
    return http.post(`${resquest}/api/first`,params)
}

// export function getInfo(token) {
//   return request({
//     url: '/vue-element-admin/user/info',
//     method: 'get',
//     params: { token }
//   })
// }
