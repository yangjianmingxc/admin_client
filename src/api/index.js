/*
包含应用中所有请求接口的函数:接口请求函数

*/
import jsonp from 'jsonp'
import axios from './ajax'
import { message } from 'antd';

const BASE = 'http://localhost:3000'
//请求登陆（这边用'()'是为了直接return出promise对象）
export const reLogin = ({ username, password }) => (
    axios.post(BASE + '/login', {
        username,
        password
    })
)
//发送jsonp请求得到天气信息
export const reqWeather = (city) => {
    //执行器函数：内部去执行异步任务
    //成功了调用resolve(),失败了不调用reject(),直接提示错误
    return new Promise((resolve, reject) => {
        const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
        jsonp(url, {}, (err, data) => {
            if (!err && data.error === 0) {
                const { dayPictureUrl, weather } = data.results[0].weather_data[0]
                resolve({ dayPictureUrl, weather })
            } else {
                message.error('获取天气信息失败')
            }
        })
    })

}

