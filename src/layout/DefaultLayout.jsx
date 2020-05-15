import React, { useState, useReducer } from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import { Layout } from 'antd'

import routes from '@/routes'
import menus from '@/routes/menus'

import AppHeader from './AppHeader.jsx'
import AppAside from './AppAside.jsx'
import AppFooter from './AppFooter.jsx'

import avatar from '@/assets/images/logo.png'

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

const getMenu = menu => {
    const user = JSON.parse(localStorage.getItem('user'))
    const role = (user && user.role) ||  'guest'
    return menu.filter(res => !res.roles || res.roles.indexOf(role) !== -1)
}

const DefaultLayout = props => {
    const user = JSON.parse(localStorage.getItem('user'))
    const [menu] = useState(prevState => {
        if (!localStorage.getItem('user')) {
            props.history.push('/login')
            return []
        } else {
            return getMenu(menus)
        }
    })

    const [state, dispatch] = useReducer(reducer, { menuToggle: false })
    const role = (user && user.role) || 'guest'

    const menuClick = () => {
        dispatch({ type: 'menuToggle' })
    }

    const loginOut = () => {
        localStorage.removeItem('user')
        props.history.push('/login')
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
                                        !item.roles || item.roles.indexOf(role) !== -1 ?
                                            (
                                                <item.component {...props} />
                                            ) : (
                                                <Redirect to='/403' {...props} />
                                            )
                                    }
                                />
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