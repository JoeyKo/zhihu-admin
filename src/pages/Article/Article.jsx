import React, { useEffect, useState } from 'react'
import { Layout, Table, Button, Divider } from 'antd'
import WebBreadcrumb from '@/components/WebBreadcrumb'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from '@/api'

const Article = () => {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)

  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '描述',
      dataIndex: 'description',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button shape="circle" icon={<EditOutlined />} size="small"></Button>
          <Divider type="vertical" ></Divider>
          <Button shape="circle" icon={<DeleteOutlined />} size="small" danger></Button>
        </span>
      ),
    }
  ];

  async function getArticles() {
    setLoading(true)
    try {
      const res = await axios.get(`/api/article`)
      console.log(res)
      setList(res.data)
      setLoading(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    getArticles()
  }, [])

  return (
    <Layout>
      <WebBreadcrumb arr={['文章']}></WebBreadcrumb>
      <Table dataSource={list} loading={loading} columns={columns}>
      </Table>
    </Layout>
  )
}

export default Article