import React from 'react'
import PropTypes from 'prop-types'
import { PageHeader } from 'antd'
import styles from './index.module.scss'
const WebBreadcrumb = props => {
    let { routes, title, subTitle } = props
    routes = [
        { path: 'dashboard', breadcrumbName: '首页' },
        ...routes
    ]

    return (
        <PageHeader
        className={styles.pageHeader}
            title={title}
            breadcrumb={{ routes }}
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