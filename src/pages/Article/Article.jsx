import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Table, Button, Divider } from 'antd'
import PageLayout from '@/components/PageLayout'
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
          <Link to="/articleForm"><Button shape="circle" icon={<EditOutlined />} size="small"></Button></Link>
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
    <PageLayout routes={[{path: 'article', breadcrumbName: '文章'}]} title="文章列表">
      <Table dataSource={list} loading={loading} columns={columns}>
      </Table>
    </PageLayout>
  )
}

export default Article