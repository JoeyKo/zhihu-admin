import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Layout, Input, Form, Button, Divider, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styles from './index.module.scss'

const Login = props => {
    const [loading, setLoading] = useState(false);

    const handleSubmitFinish = values => {
        console.log('Success:', values);
            localStorage.setItem('user', JSON.stringify(values))
            setLoading(true)
            setTimeout(() => {
                message.success('登录成功!')
                props.history.push('/dashboard')
            }, 2000);
    };
    
    const handleSubmitFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Layout className={styles.login}>
            <div className={styles.model}>
                <div className={styles.loginForm}>
                    <h3>后台管理系统</h3>
                    <Divider />
                    <Form
                        onFinish={handleSubmitFinish}
                        onFinishFailed={handleSubmitFinishFailed}
                    >
                        <Form.Item
                            // label="Username"
                            name="username"
                            rules={[{ required: true, message: '请输入用户名' }]}
                        >
                            <Input
                                placeholder='用户名'
                                prefix={<UserOutlined className="site-form-item-icon" />}
                            />
                        </Form.Item>
                        <Form.Item
                            // label="Password"
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
            </div>
        </Layout>
    )
}

export default withRouter(Login);