import axios from 'axios'
import { Message } from 'element-ui';
import store from "@/store/index.js";

export function request(config){
  const BASEURL = process.env.NODE_ENV === "production" ? "" : "/devApi";
  const instance = axios.create({
    baseURL:BASEURL,
    timeout:5000
  })

  //1.请求拦截
  instance.interceptors.request.use(config =>{
    return config
  },err =>{
    console.log(err);
  })
  //2.响应拦截
  instance.interceptors.response.use(res =>{
    //对接口邮箱响应拦截，返回数据处理
    let data = res.data
    if(res.data.resCode !== 0){
      Message.error(data.message)
      return Promise.reject(data);//promise返回错误数据->request
    }
    return res.data
  },err =>{
    console.log(err);
  })
  //3.发送真正请求 返回pormise
  return instance(config)
}
