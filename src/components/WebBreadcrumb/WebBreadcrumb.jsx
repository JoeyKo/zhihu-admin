import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { PageHeader } from 'antd'
import { useTranslation } from 'react-i18next'
import styles from './index.module.scss'

const WebBreadcrumb = props => {
    let { routes, title, subTitle } = props
    const { t } = useTranslation()

    routes = [
        { path: '/dashboard', breadcrumbName: t('dashboard') },
        ...routes
    ]

    return (
        <PageHeader
            className={styles.pageHeader}
            title={title}
            breadcrumb={{
                itemRender: (route, params, routes, paths) => {
                    if (route.path === routes[routes.length - 1].path) {
                        return route.breadcrumbName
                    }
                    return <Link to={route.path}>{route.breadcrumbName}</Link>
                }, routes
            }}
            subTitle={subTitle}
        />
    )
}

WebBreadcrumb.propTypes = {
    routes: PropTypes.array.isRequired,
    title: PropTypes.string,
    subTitle: PropTypes.string
}

WebBreadcrumb.defaultProps = {
    routes: []
}


export default WebBreadcrumb