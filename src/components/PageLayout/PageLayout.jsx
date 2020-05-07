import React from 'react'
import PropTypes from 'prop-types'
import { Layout } from 'antd'
import WebBreadcrumb from '@/components/WebBreadcrumb'
import styles from './index.module.scss'

const PageLayout = props => {
  const { routes, title, subTitle, children } = props
  return (
    <Layout>
      <WebBreadcrumb routes={routes} title={title} subTitle={subTitle}></WebBreadcrumb>
      <div className={styles.content}>
        {children}
      </div>
    </Layout>
  )
}

PageLayout.propTypes = {
  routes: PropTypes.array.isRequired,
  title: PropTypes.string,
  subTitle: PropTypes.string 
}

PageLayout.defaultProps = {
  routes: []
}

export default PageLayout