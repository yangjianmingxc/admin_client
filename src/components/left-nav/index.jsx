import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './index.less'

export default class LeftNav extends Component {
    render() {
        return (
            <div className='left-nav'>
               <Link>
                <img src="" alt=""/>
                <h1>后台管理</h1>
               </Link>
            </div>
        )
    }
}
