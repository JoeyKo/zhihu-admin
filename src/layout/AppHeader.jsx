import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Dropdown, Layout, Avatar } from 'antd';
import { EditOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import styles from './index.module.scss'
const { Header } = Layout


const AppHeader = props => {
    let {avatar, loginOut } = props
    const menu = (
        <Menu>
            <Menu.ItemGroup title='用户设置'>
                <Menu.Divider />
                <Menu.Item>
                    <EditOutlined /> 个人设置
                </Menu.Item>
                <Menu.Item>
                    <SettingOutlined /> 系统设置
                </Menu.Item>
            </Menu.ItemGroup>
            <Menu.Divider />
            <Menu.Item>
                <span onClick={loginOut}>
                    <LogoutOutlined /> 退出登录
                </span>
            </Menu.Item>
        </Menu>
    )
    return (
        <Header className={styles.header}>
            <div className={styles.userInfo}>
                <div>
                    <Dropdown overlay={menu}>
                        <Avatar src={avatar} alt='avatar' className={styles.userLogo} />
                    </Dropdown>
                </div>
            </div>
        </Header>
    )
}

AppHeader.propTypes = {
    loginOut: PropTypes.func
}

export default AppHeader