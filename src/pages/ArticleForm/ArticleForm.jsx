import React from 'react'
import { Form, Input, Card, Button, message } from 'antd';

import PageLayout from '@/components/PageLayout'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 10 },
};

// breadcrumb routes
const routes = [{ path: '/article', breadcrumbName: '文章' }, { path: '/articleForm', breadcrumbName: '表单' }]

const ArticleForm = props => {
  const onFinish = values => {
    console.log(values);
    props.history.push('/article')
    message.success('提交成功！')
  };
  return (
    <PageLayout routes={routes} title="文章表单">
      <Card>

      <Form {...layout} onFinish={onFinish}>
        <Form.Item name="title" label="标题" rules={[{ required: true, message: '请输入标题' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="description" label="描述" rules={[{ required: true, message: '请输入描述' }]}>
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            提交
        </Button>
        </Form.Item>
      </Form>
      </Card>
    </PageLayout>
  )
}

export default ArticleForm