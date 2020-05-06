import React from 'react'
import { Layout } from 'antd'
import WebBreadcrumb from '@/components/WebBreadcrumb'

const Dashboard = () => {
   
    return (
        <Layout className='index animated fadeIn'>
            <WebBreadcrumb arr={[]}></WebBreadcrumb>
        </Layout>
    )
}

export default Dashboard