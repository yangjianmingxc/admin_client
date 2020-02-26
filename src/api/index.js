/*
包含应用中所有请求接口的函数:接口请求函数

*/

import axios from './ajax'

const BASE = 'http://localhost:3000'
//请求登陆（这边用'()'是为了直接return出promise对象）
export const reLogin = ({username, password}) => (
    axios.post(BASE + '/login', {
        username,
        password
    })
)

