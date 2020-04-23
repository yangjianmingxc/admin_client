import React, { Component } from 'react'
import { Modal } from 'antd';
import { withRouter } from 'react-router-dom';

import './index.less'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils';
import { formateDate } from '../../utils/dateUtils';
import menuList from '../../config/menuConfig'
import { reqWeather } from '../../api/index'
import LinkButton from '../link-button'


const { confirm } = Modal;

class Header extends Component {
    state = {
        currentTime: Date.now(),
        dayPictureUrl: '',
        weather: ''
    }
    logOut = () => {
        confirm({
            title: '提示',
            content: '确认退出吗?',
            onOk: () => {
                storageUtils.removeUser()
                memoryUtils.user = {}
                this.props.history.replace('/login')
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    getTitle = () => {
        let title = ''
        const path = this.props.location.pathname
        menuList.forEach(item => {
            if (item.key === path) {
                title = item.title
            } else if (item.children) {
                const cItem = item.children.find(cItem => cItem.key === path)
                if (cItem) {
                    title = cItem.title
                }
            }
        })
        return title
    }
    getWeather = async () => {
        const { dayPictureUrl, weather } = await reqWeather('杭州')
        console.log(dayPictureUrl, weather)
        this.setState({
            dayPictureUrl, weather
        })
    }
    componentDidMount() {
        this.interval = setInterval(() => {
            this.setState({
                currentTime: Date.now()
            })
        }, 1000)
        this.getWeather()
    }
    componentWillUnmount() {
        clearInterval(this.interval)
    }
    render() {
        const { currentTime, dayPictureUrl, weather } = this.state
        const user = memoryUtils.user
        const title = this.getTitle()
        return (
            <div className='header'>
                <div className="header-top">
                    欢迎，{user.username}
                    <LinkButton onClick={this.logOut}>退出</LinkButton>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">{title}</div>
                    <div className="header-bottom-right">
                        <span>{formateDate(currentTime)}</span>
                        <img src={dayPictureUrl} alt="weather" />
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Header)