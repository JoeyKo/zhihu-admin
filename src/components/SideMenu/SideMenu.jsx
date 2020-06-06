import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'antd';
import { Link, withRouter } from 'react-router-dom'
import menus from '@/routes/menus'
import { useTranslation } from 'react-i18next'

// 处理 pathname
const getOpenKeys = (string, collapsed) => {
    let newStr = '',
        newArr = [],
        arr = string.split('/').map(i => '/' + i)
    for (let i = 1; i < arr.length - 1; i++) {
        newStr += arr[i]
        newArr.push(newStr)
    }
    return collapsed ? [] : newArr
}

const SideMenu = props => {
    const [state, setstate] = useState({
        openKeys: [],
        selectedKeys: []
    })
    const { t } = useTranslation();

    let { openKeys, selectedKeys } = state
    let menuProps = props.collapsed ? {} : { openKeys };

    // 页面刷新的时候可以定位到 menu 显示
    useEffect(() => {
        let { pathname } = props.location
        const matchedMenu = menus.find(menu => {
            return menu.key === pathname && menu.hide
        })
        setstate(prevState => {
            return {
                ...prevState,
                selectedKeys: matchedMenu ? [matchedMenu.menu] : [pathname],
                openKeys: getOpenKeys(matchedMenu ? matchedMenu.menu : pathname)
            }
        })
    }, [props]);

    // 只展开一个 SubMenu
    const onOpenChange = openKeys => {
        setstate(prevState => {
            if (openKeys.length === 0 || openKeys.length === 1) {
                return { ...prevState, openKeys }
            }
            const latestOpenKey = openKeys[openKeys.length - 1]

            // 这里与定义的路由规则有关
            if (latestOpenKey.includes(openKeys[0])) {
                return { ...prevState, openKeys }
            } else {
                return { ...prevState, openKeys: [latestOpenKey] }
            }
        })
    }

    const renderMenuItem = ({ key, icon, title, hide }) => (hide ? null : (
        <Menu.Item key={key}>
            <Link to={key}>
                {icon}
                <span>{t(title)}</span>
            </Link>
        </Menu.Item>)
    )

    // 循环遍历数组中的子项 subs ，生成子级 menu
    const renderSubMenu = ({ key, icon, title, subs }) => {
        return (
            <Menu.SubMenu
                key={key}
                title={
                    <span>
                        {icon}
                        <span>{t(title)}</span>
                    </span>
                }>
                {subs &&
                    subs.map(item => {
                        return item.subs && item.subs.length > 0 ? renderSubMenu(item) : renderMenuItem(item)
                    })}
            </Menu.SubMenu>
        )
    }

    return (
        <Menu
            mode='inline'
            theme='dark'
            {...menuProps}
            selectedKeys={selectedKeys}
            onClick={({ key }) => setstate(prevState => ({ ...prevState, selectedKeys: [key] }))}
            onOpenChange={onOpenChange}>
            {props.menu && props.menu.map(item => {
                return item.subs && item.subs.length > 0 ? renderSubMenu(item) : renderMenuItem(item)
            })}
        </Menu>
    )
}

SideMenu.propTypes = {
    menu: PropTypes.array.isRequired
}

export default withRouter(SideMenu)