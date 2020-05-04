import React from 'react'
import { Layout, Row, Col } from 'antd'

const Dashboard = () => {
   
    return (
        <Layout className='index animated fadeIn'>
            <Row gutter={24} className='index-header'>
                <Col span={6}>
                    <div className='base-style wechat'>
                        <div>
                            <span>999</span>
                            <div>微信</div>
                        </div>
                    </div>
                </Col>
                <Col span={6}>
                    <div className='base-style qq'>
                        <div>
                            <span>366</span>
                            <div>QQ</div>
                        </div>
                    </div>
                </Col>
                <Col span={6}>
                    <div className='base-style dingding'>
                        <div>
                            <span>666</span>
                            <div>钉钉</div>
                        </div>
                    </div>
                </Col>
                <Col span={6}>
                    <div className='base-style weibo'>
                        <div>
                            <span>689</span>
                            <div>微博</div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Layout>
    )
}

export default Dashboard