import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import SideMenu from '../components/SideMenu'
import logo from '@/assets/images/logo.png'

import styles from './index.module.scss'

const { Sider } = Layout

const AppAside = props => {
    let { menuToggle, menu } = props
    return (
        <Sider trigger={null} collapsible collapsed={menuToggle}>
            <div className={styles.logoContainer}>
                <a rel='noopener noreferrer' href='/'>
                    <img src={logo} alt="logo" className={styles.logo} />
                </a>
            </div>
            <SideMenu menu={menu} collapsed={menuToggle}></SideMenu>
        </Sider>
    )
}

AppAside.propTypes = {
    menuToggle: PropTypes.bool,
    menu: PropTypes.array.isRequired
}

export default AppAside