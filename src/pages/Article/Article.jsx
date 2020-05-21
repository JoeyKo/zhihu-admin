import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Table, Button, Divider, Card, Popconfirm, message } from 'antd'
import PageLayout from '@/components/PageLayout'
import axios from '@/api'

const Article = () => {
  const [list, setList] = useState([])
  const [total, setTotal] = useState(0)
  const [current, setCurrent] = useState(1)
  const [sorter, setSorter] = useState('')
  const [loading, setLoading] = useState(false)

  const delConfirm = async id => {
    try {
      const res = await axios.delete(`/api/article/${id}`)
      if (res.status === 1) {
        setList(list.filter(item => item.id !== id))
        message.success('已删除！');
      } else {
        message.error(res.message)
      }
    } catch (err) {
      console.log(err)
    }
  }

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
      sorter: true,
      render: (text, record) => moment(text).format('LLL')
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      sorter: true,
      render: (text, record) => moment(text).format('LLL')
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <Link to={`/articleForm?id=${record.id}`}><Button shape="circle" icon={<EditOutlined />} size="small"></Button></Link>
          <Divider type="vertical" ></Divider>
          <Popconfirm
            title="确定删除该项吗?"
            onConfirm={() => delConfirm(record.id)}
            onCancel={null}
            okText="是"
            cancelText="否"
          >
            <Button shape="circle" icon={<DeleteOutlined />} size="small" danger></Button>
          </Popconfirm>
        </span>
      ),
    }
  ];
  function handleTableChange(pagination, filters, sorter) {
    setCurrent(pagination.current)
    if (sorter.order) setSorter(`${sorter.field}_${sorter.order.replace('end', '').toUpperCase()}`)
  }

  useEffect(() => {
    async function getArticles() {
      setLoading(true)
      try {
        const res = await axios.get(`/api/article?current=${current}&sorter=${sorter}`)
        if (res.status === 1) {
          setList(res.data)
          setTotal(res.count)
        } else {
          message.error(res.message)
        }
        setLoading(false)
      } catch (error) {
        console.error(error)
        setLoading(false)
      }
    }
    getArticles()
  }, [current, sorter])

  return (
    <PageLayout routes={[{ path: '/article', breadcrumbName: '文章' }]} title="文章列表">
      <Card title={<Link to={`/articleForm`}><Button type="primary" icon={<PlusOutlined />}>新建</Button></Link>} bordered={false}>
        <Table
          dataSource={list}
          loading={loading}
          columns={columns}
          pagination={{ total, current, pageSize: 20, showTotal: (total, range) => `总共 ${total} 项` }}
          onChange={handleTableChange} />
      </Card>
    </PageLayout>
  )
}

export default Article