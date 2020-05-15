import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Menu, Dropdown, Layout, Avatar } from 'antd';
import { LogoutOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import axios from '@/api'
import styles from './index.module.scss'

const { Header } = Layout

const AppHeader = props => {
    const { avatar, loginOut, menuToggle, menuClick } = props
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const getProfile = async () => {
            const res = await axios.get('/api/user/profile')
            setProfile(res.profile)
        }
        getProfile()
    }, [])

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
                        ? <MenuUnfoldOutlined onClick={menuClick} />
                        : <MenuFoldOutlined onClick={menuClick} />
                }
            </div>
            <div className={styles.right}>
                {profile ?
                    <div>
                        <Dropdown overlay={menu}>
                            <div className={styles.userInfo}>
                                <Avatar src={avatar} alt='avatar' className={styles.userLogo} />
                                <span>{profile.username}</span>
                            </div>
                        </Dropdown>
                    </div>
                    : 
                    <div>请登录</div>}
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