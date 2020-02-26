import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Form, Icon, Input, Button, message } from 'antd';

import { reLogin } from '../../api/index'
import logo from '../../assets/images/logo.png'
import storageUtils from '../../utils/storageUtils'
import './login.less'

const Item = Form.Item
class Login extends Component {
    handleSubmit = e => {
        e.preventDefault();
        //对表单所有字段进行统一验证
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                const res = await reLogin(values)
                console.log(res)
                if (res.status === 0) {
                    const user = res.data
                    storageUtils.saveUser(user)
                    this.props.history.replace('/')
                    message.success('登陆成功！')
                } else {
                    message.error(res.msg)
                }
            }
        });
    };
    /* 
    密码的验证
    */
    validatePwd = (rule, value, callback) => {
        value = value.trim()//去空格
        if (!value) {
            callback('密码必须输入!')
        } else if (value.length < 4) {
            callback('密码不能小于4位!')
        } else if (value.length > 12) {
            callback('密码不能大于12位!')
        } else if (!/^[a-zA-Z0-9]+$/.test(value)) {
            callback('密码必须是英文丶数字或下划线组成!')
        } else {
            callback()//验证通过
        }
    }
    render() {
        const user = storageUtils.getUser()
        if (user._id) {
            return <Redirect to="/"></Redirect>
        }
        const { getFieldDecorator } = this.props.form
        return (
            <div className='login'>
                <div className='login_header'>
                    <img src={logo} alt="logo" />
                    <h1>后台管理系统</h1>
                </div>
                <div className='login_content'>
                    <h1>用户登录</h1>
                    <div>
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <Item>
                                {getFieldDecorator('username', {
                                    rules: [
                                        { required: true, whitespace: true, message: '用户名不能为空!' },
                                        { min: 4, message: '用户名不能小于4位!' },
                                        { max: 12, message: '用户名不能大于12位!' },
                                        { pattern: /^[a-zA-Z0-9]+$/, message: '用户名必须是英文丶数字或下划线组成!' },
                                    ],
                                    initialValue: ''
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="用户名"
                                    />
                                )}
                            </Item>
                            <Item>
                                {getFieldDecorator('password', {
                                    rules: [
                                        { validator: this.validatePwd }
                                    ],
                                    initialValue: ''
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="密码"
                                    />
                                )}
                            </Item>
                            <Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">登 陆</Button>
                            </Item>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}

/* 
理解From组件：包含<Form></Form>
利用Form.create()包装Form组件生成一个新的组件
新组件会向form组件传递一个强大的属性：属性名：form，属性值对象

高阶函数：
    定义：接收的参数是函数或者返回值是函数
    常见的：数组遍历相关的方法 / 定时器 / Promise / 高阶组件
    作用：实现一个更加强大，动态的功能


高阶组件：
    本质是一个函数
    函数接收一个组件，返回一个新的组件
    Form.create()返回的就是一个高阶组件
 */

const WrapperForm = Form.create()(Login)

export default WrapperForm
// 组件：组件类，本质就是一个构造函数
// 组件对象：组件累的实例，也就是构造函数的实例
//.都是只能有对象去调用，（）都是只能是函数去调用
//方法是是特别的属性