import React, { useState, useReducer } from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import { Layout, message } from 'antd'

import routes from '@/routes'
import menus from '@/routes/menus'

import WebBreadcrumb from '@/components/WebBreadcrumb'

import AppHeader from './AppHeader.jsx'
import AppAside from './AppAside.jsx'
import AppFooter from './AppFooter.jsx'

import avatar from '@/assets/images/logo.png'
import styles from './index.module.scss'

const { Content } = Layout

const MENU_TOGGLE = 'menuToggle'

const reducer = (state, action) => {
    switch (action.type) {
        case MENU_TOGGLE:
            return { ...state, menuToggle: !state.menuToggle }
        default:
            return state
    }
}

const DefaultLayout = props => {
    const [menu] = useState(prevState => {

        return menus
    })

    const [state, dispatch] = useReducer(reducer, { menuToggle: false })

    const menuClick = () => {
        dispatch({ type: 'menuToggle' })
    }

    const loginOut = () => {
        localStorage.clear()
        props.history.push('/login')
        message.success('登出成功!')
    }
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <AppAside menuToggle={state.menuToggle} menu={menu} />
            <Layout>
                <AppHeader menuToggle={state.menuToggle} menuClick={menuClick} avatar={avatar} loginOut={loginOut} />
                <Content>
                    <Switch>
                        {routes.map(item => {
                            return (
                                <Route
                                    key={item.path}
                                    path={item.path}
                                    exact={item.exact}
                                    render={props =>
                                        <item.component {...props} />
                                    }></Route>
                            )
                        })}
                        <Redirect to='/404' />
                    </Switch>
                </Content>
                <AppFooter />
            </Layout>
        </Layout>
    )
}

export default withRouter(DefaultLayout)