import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom'
import { Menu, Dropdown, Layout, Avatar, Tag, Button, message } from 'antd';
import i18n from "i18next";
import { useTranslation } from 'react-i18next'
import { SettingOutlined, LogoutOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { BASEURL } from '@/api/config'

import styles from './index.module.scss'

const { Header } = Layout

const AppHeader = props => {
    const { profile, loginOut, menuToggle, menuClick } = props
    const [locale, setLocale] = useState(localStorage.getItem('locale') || 'zh')
    const { t } = useTranslation()
    const goProfileSettings = () => {
        props.history.push('/profile-settings')
    }

    const toggleLocale = () => {
        try {
            const localeTarget = locale === 'en' ? 'zh' : 'en'
            i18n.changeLanguage(localeTarget)
            localStorage.setItem('locale', localeTarget)
            setLocale(localeTarget)
        } catch (err) {
            message.error(err)
        }
    }
    
    const menu = (
        <Menu>
            <Menu.Item>
                <span onClick={goProfileSettings}>
                    <SettingOutlined /> 个人设置
                </span>
            </Menu.Item>
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
            <div className={styles.left}>
                {
                    menuToggle
                        ? <MenuUnfoldOutlined onClick={menuClick} />
                        : <MenuFoldOutlined onClick={menuClick} />
                }
            </div>
            <div className={styles.right}>
                <div className={styles.profile}>
                    {
                        profile ?
                            <Dropdown overlay={menu}>
                                <div className={styles.userInfo}>
                                    <Tag color="#f50">{profile.role}</Tag>
                                    <Avatar src={BASEURL + (profile.avatar && profile.avatar.path)} alt='avatar' className={styles.userLogo} />
                                    <span>{profile.username || profile.email}</span>
                                </div>
                            </Dropdown>
                            :
                            <Link to="/login">{t('login')}</Link>
                    }
                    <Button className={styles.localeBtn} size="small" onClick={toggleLocale}>{locale === 'en' ? '中文' : 'English'}</Button>
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

export default withRouter(AppHeader)