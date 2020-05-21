import React, { useEffect, useState } from 'react'
import { Form, Input, Card, Button, message, Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import PageLayout from '@/components/PageLayout'
import axios from '@/api'
import { BASEURL } from '@/api/config'
import { getBase64, beforeUpload } from '@/utils'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 10 },
};

// breadcrumb routes
const routes = [{ path: '/store', breadcrumbName: '店铺' }, { path: '/storeForm', breadcrumbName: '店铺表单' }]

const StoreForm = props => {
  const id = props.location.search.split('id=')[1]
  const [uploadLoading, setUploadLoading] = useState(false)
  const [coverImageUrl, setCoverImageUrl] = useState('')
  const [form] = Form.useForm();

  useEffect(() => {
    const getStore = async id => {
      try {
        const res = await axios.get(`/api/store/${id}`)
        if (res.status === 1) {
          form.setFieldsValue(res.store)
          if (res.store.coverImage) setCoverImageUrl(BASEURL + res.store.coverImage.path)
        } else {
          message.error(res.message)
        }
      } catch (err) {
        console.log(err)
      }
    }
    if (id) getStore(id)
  }, [id, form])

  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setUploadLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      setUploadLoading(false)
      form.setFieldsValue({ coverImage: info.file})

      getBase64(info.file.originFileObj, imageUrl =>
        setCoverImageUrl(imageUrl),
      );
    }
  };

  const onFinish = async values => {
    try {
      console.log(values)
      const newValues = {
        ...values,
        coverImage: id ? values.coverImage : values.coverImage.response.images[0]
      }
      const res = (id ? await axios.put(`/api/store/${id}`, newValues) : await axios.post(`/api/store`, newValues))
      if (res.status === 1) {
        props.history.push('/store')
        message.success('提交成功！')
      } else {
        message.error(res.message)
      }
    } catch (err) {
      console.log(err)
    }
  };

  const uploadButton = (
    <div>
      {uploadLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">上传</div>
    </div>
  );

  return (
    <PageLayout routes={routes} title="店铺表单">
      <Card>
        <Form {...layout} form={form} onFinish={onFinish}>
          <Form.Item name="name" label="店名" rules={[{ required: true, message: '请输入店名' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="coverImage" label="封面图">
            <Upload
              name="images"
              listType="picture-card"
              showUploadList={false}
              action={`${BASEURL}/api/file/upload?type=image`}
              headers={{ Authorization: localStorage.getItem('token') }}
              onChange={handleChange}
              beforeUpload={beforeUpload}
            >
              {coverImageUrl ? <img src={coverImageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
          </Form.Item>
          <Form.Item name="location" label="地址" rules={[{ required: true, message: '请输入地址' }]}>
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

export default StoreForm