import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Dropdown, Layout, Avatar } from 'antd';
import { LogoutOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import styles from './index.module.scss'

const { Header } = Layout

const AppHeader = props => {
    let {avatar, loginOut, menuToggle, menuClick } = props
    const menu = (
        <Menu>
            <Menu.Item>
                <span onClick={loginOut}>
                    <LogoutOutlined /> 退出登录
                </span>
            </Menu.Item>
        </Menu>
    )
    return (
        <Header className={styles.header}>
            <div className={styles.left}>
                {
                    menuToggle
                    ? <MenuUnfoldOutlined onClick={menuClick}/>
                    : <MenuFoldOutlined onClick={menuClick}/>
                }
            </div>
            <div className={styles.right}>
                <div className={styles.userInfo}>
                    <div>
                        <Dropdown overlay={menu}>
                            <Avatar src={avatar} alt='avatar' className={styles.userLogo} />
                        </Dropdown>
                    </div>
                </div>
            </div>
        </Header>
    )
}

AppHeader.propTypes = {
    menuClick: PropTypes.func,
    avatar: PropTypes.string,
    menuToggle: PropTypes.bool,
    loginOut: PropTypes.func
}

export default AppHeader