import React, { useState } from 'react';
import { withRouter, Redirect, Route } from 'react-router-dom';
import { Layout, Input, Form, Button, Divider, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from '@/api'

import styles from './index.module.scss'

const Login = props => {
    const [loading, setLoading] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false)
    const handleSubmitFinish = async values => {
        try {
            setLoading(true)
            const res = await axios.post('/api/user/login', values)
            if (res.status === 1) {
                setLoggedIn(true)
                localStorage.setItem('user', JSON.stringify(res.profile || {}))
                message.success('登录成功！')
            } else {
                message.error(res.message)
            }
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    };

    const handleSubmitFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Layout className={styles.login}>
            <Route exact path="/login">
                {loggedIn ? <Redirect to="/dashboard" /> : <div className={styles.model}>
                    <div className={styles.loginForm}>
                        <h3>后台管理系统</h3>
                        <Divider />
                        <Form
                            onFinish={handleSubmitFinish}
                            onFinishFailed={handleSubmitFinishFailed}
                        >
                            <Form.Item
                                name="email"
                                rules={[{ required: true, message: '请输入邮箱' }]}
                            >
                                <Input
                                    placeholder='邮箱'
                                    prefix={<UserOutlined className="site-form-item-icon" />}
                                />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: '请输入密码' }]}
                            >
                                <Input.Password
                                    type="password"
                                    placeholder="密码"
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button type='primary' htmlType='submit' className={styles.loginFormBtn} loading={loading}>
                                    登录
                            </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>}
            </Route>
        </Layout>
    )
}

export default withRouter(Login);