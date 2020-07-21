import {request} from '@/api/request.js'

//请求验证码
export function GetSms(params){
   return request({
       url:'/getSms/',
       data:params,
       method:'post'
   })
}
//请求登录
export function Login(params){
    return request({
        url:'/login/',
        data:params,
        method:'post'
    })
}
//请求注册
export function Register(params){
    return request({
        url:'/register/',
        data:params,
        method:'post'
    })
}