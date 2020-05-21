import React, { useEffect } from 'react'
import { Form, Input, Card, Button, message } from 'antd';

import PageLayout from '@/components/PageLayout'
import axios from '@/api'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 10 },
};

// breadcrumb routes
const routes = [{ path: '/article', breadcrumbName: '文章' }, { path: '/articleForm', breadcrumbName: '文章表单' }]

const ArticleForm = props => {
  const id = props.location.search.split('id=')[1]
  const [form] = Form.useForm();

  useEffect(() => {
    const getArticle = async id => {
      try {
        const res = await axios.get(`/api/article/${id}`)
        if (res.status === 1) {
          form.setFieldsValue(res.article)
        } else {
          message.error(res.message)
        }
      } catch (err) {
        console.log(err)
      }
    }
    if (id) getArticle(id)
  }, [id, form])

  const onFinish = async values => {
    try {
      const res = (id ? await axios.put(`/api/article/${id}`, values) : await axios.post(`/api/article`, values))
      if (res.status === 1) {
        props.history.push('/article')
        message.success('提交成功！')
      } else {
        message.error(res.message)
      }
    } catch (err) {
      console.log(err)
    }
  };
  return (
    <PageLayout routes={routes} title="文章表单">
      <Card>
        <Form {...layout} form={form} onFinish={onFinish}>
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