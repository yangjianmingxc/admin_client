import React, { Component } from 'react'
import { Menu, Icon } from 'antd';
import { Link, withRouter } from 'react-router-dom'

import menuList from "../../config/menuConfig";
import logo from '../../assets/images/logo.png'
import './index.less'

const { SubMenu } = Menu;
class LeftNav extends Component {

    //函数递归
    getMenuList = (menuList) => {
        const path = this.props.location.pathname
        console.log('path-->', path)
        return menuList.map(item => {
            if (!item.children) {
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            } else {
                const cItem = item.children.find(cItem => cItem.key === path)
                console.log('cItem-->', cItem)
                if (cItem) {
                    this.openKey = item.key
                }
                return (
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                        {
                            this.getMenuList(item.children)
                        }
                    </SubMenu>
                )
            }
        })
    }
    //第一次render()之前执行一次
    componentWillMount() {
        this.menuNodeList = this.getMenuList(menuList)
    }
    //第一次render()之后执行一次
    //执行异步任务：发ajax请求，启动定时器
    componentDidMount() {

    }
    render() {
        //得到当前请求的路径
        const selectKey = this.props.location.pathname
        console.log(this.props.location)
        return (
            <div className='left-nav'>
                <Link className='left-nav-link' to='/home'>
                    <img src={logo} alt="" />
                    <h1 style={{ color: '#fff' }}>后台管理</h1>
                </Link>
                {/* 
                    defaultSelectedKeys:总是根据第一次指定的key进行显示
                    selectedKeys:总是根据最新指定的key进行显示
                */}
                <Menu
                    selectedKeys={[selectKey]}
                    defaultOpenKeys={[this.openKey]}
                    mode="inline"
                    theme="dark"
                >
                    {
                        this.menuNodeList
                    }

                </Menu>
            </div>
        )
    }
}

/* 
使用高阶组件withRouter(）来包装非路由组件
新组件向leftNav传递3个特别的属性:history/location/match
 */
export default withRouter(LeftNav)