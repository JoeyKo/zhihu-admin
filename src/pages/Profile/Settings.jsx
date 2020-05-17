import React, { useState } from 'react'
import moment from 'moment'
import { Card, Form, Input, DatePicker, Radio, Button, Upload, message } from 'antd'
import PageLayout from '@/components/PageLayout'
import { BASEURL } from '@/api/config'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'

const { TextArea } = Input

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 10 },
};

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
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [form] = Form.useForm();

  const onFinish = async values => {
    try {

    } catch (err) {
      console.log(err)
    }
  };

  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        setImageUrl(imageUrl),
      );
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">上传头像</div>
    </div>
  );

  return (
    <PageLayout routes={[{ path: '/profile-settings', breadcrumbName: '基本设置' }]} title="基本设置">
      <Card bordered={false}>
        <Form {...layout} form={form} onFinish={onFinish}>
          <Form.Item name="avatar" label="头像">
            <Upload
              name="avatar"
              listType="picture-card"
              showUploadList={false}
              action={`${BASEURL}/api/user/upload-avatar`}
              onChange={handleChange}
              headers={{ Authorization: localStorage.getItem('token') }}
              beforeUpload={beforeUpload}
            >
              {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
          </Form.Item>
          <Form.Item name="gender" label="性别">
            <Radio.Group>
              <Radio value={0}>女</Radio>
              <Radio value={1}>男</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="username" label="昵称">
            <Input />
          </Form.Item>
          <Form.Item name="birthday" label="出生日期">
            <DatePicker disabledDate={disabledDate} />
          </Form.Item>
          <Form.Item name="headline" label="个人简介">
            <TextArea rows={3} />
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

export default ProfileSettings