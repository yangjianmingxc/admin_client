/* 
封装的能发ajax请求的函数
*/
import axios from 'axios'
// import qs from 'qs'
import { message } from "antd";
// 请求拦截器，在真正发请求前执行
axios.interceptors.request.use((config) => {
    console.log(config)
    // 处理post请求
    // const { method, data } = config
    //大小写问题toLowerCase()
    // if (method.toLowerCase() === 'post' && typeof data === 'object') {
    //     console.log(qs.stringify(data))
    //     config.data = qs.stringify(data)
    // }

    return config;
});
//响应拦截器，在请求返回之后且在外面指定的请求回调函数之前
axios.interceptors.response.use((response) => {
    return response.data;
}, (error) => {
    message.error('请求出错了' + error.message)
    //返回一个pending状态的promise，中断promise链,统一处理异常
    return new Promise(() => { })
    // return Promise.reject(error);
});
export default axios