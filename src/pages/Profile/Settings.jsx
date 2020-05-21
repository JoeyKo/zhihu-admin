import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { Menu, Card, Form, Input, DatePicker, Radio, Button, Upload, message, Avatar, Row, Col } from 'antd'
import PageLayout from '@/components/PageLayout'
import { BASEURL } from '@/api/config'
import { LoadingOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons'
import axios from '@/api'

import styles from './index.module.scss'

const { TextArea } = Input

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

function disabledDate(current) {
  return current && current > moment().endOf('day');
}

const ProfileSettings = () => {
  const [uploadLoading, setUploadLoading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [form] = Form.useForm();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user')) || {}

    if (user.birthday) user.birthday = moment(user.birthday)
    if (user.avatar) setImageUrl(BASEURL + user.avatar.path)
    console.log(user)
    form.setFieldsValue(user)
  }, [form])

  const onFinish = async values => {
    try {
      setLoading(true)
      const res = await axios.put('/api/user/profile', values)
      setLoading(false)
      if (res.status === 1) {
        localStorage.setItem('user', JSON.stringify(res.profile || {}))
        message.success('提交成功！')
      } else {
        message.error(res.message)
      }
    } catch (err) {
      setLoading(false)
      console.log(err)
    }
  };

  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setUploadLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      setUploadLoading(false)
      getBase64(info.file.originFileObj, imageUrl =>
        setImageUrl(imageUrl),
      );
    }
  };

  return (
    <PageLayout routes={[{ path: '/profile-settings', breadcrumbName: '基本设置' }]} title="基本设置">
      <Card bordered={false} bodyStyle={{ padding: "16px 0" }}>
        <Row>
          <Col span={4}>
            <Menu
              style={{ borderRight: 'none' }}
              defaultSelectedKeys={['basic']}
              mode="inline"
            >
              <Menu.Item key="basic">基本设置</Menu.Item>
              <Menu.Item key="safe">安全设置</Menu.Item>
            </Menu>
          </Col>
          <Col span={20}>
            <Card title="基本设置" bordered={false}>
              <Form layout="vertical" form={form} onFinish={onFinish}>
                <Row>
                  <Col span={5}>
                    <Form.Item name="username" label="用户名">
                      <Input />
                    </Form.Item>
                    <Form.Item name="gender" label="性别">
                      <Radio.Group>
                        <Radio value={0}>女</Radio>
                        <Radio value={1}>男</Radio>
                      </Radio.Group>
                    </Form.Item>
                    <Form.Item name="birthday" label="出生日期">
                      <DatePicker disabledDate={disabledDate} />
                    </Form.Item>
                    <Form.Item name="headline" label="个人简介">
                      <TextArea rows={3} />
                    </Form.Item>
                  </Col>
                  <Col className={styles.avatarWrapper}>
                  <Form.Item label="头像">
                    <Upload
                      name="avatar"
                      showUploadList={false}
                      action={`${BASEURL}/api/user/upload-avatar`}
                      onChange={handleChange}
                      headers={{ Authorization: localStorage.getItem('token') }}
                      beforeUpload={beforeUpload}
                    >
                      <div className={styles.uploadWrapper}>
                        <Avatar className={styles.avatar} src={imageUrl} />
                        <Button loading={uploadLoading} icon={<UploadOutlined />}>更换头像</Button>
                      </div>
                    </Upload>
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item>
                  <Button loading={loading} type="primary" htmlType="submit">
                    更新基本信息
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </Card>
    </PageLayout>
  )
}

export default ProfileSettings