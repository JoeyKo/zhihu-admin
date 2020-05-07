import React from 'react'
import { Layout } from 'antd'
import WebBreadcrumb from '@/components/WebBreadcrumb'

const Store = () => {

    return (
      <Layout>
        <WebBreadcrumb arr={['文章']}></WebBreadcrumb>
      </Layout>
    )
}

export default Store