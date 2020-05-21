import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Table, Button, Divider, Card, Popconfirm, message, Avatar } from 'antd'
import PageLayout from '@/components/PageLayout'
import axios from '@/api'
import { BASEURL } from '@/api/config'

const Store = () => {
  const [list, setList] = useState([])
  const [total, setTotal] = useState(0)
  const [current, setCurrent] = useState(1)
  const [sorter, setSorter] = useState('')
  const [loading, setLoading] = useState(false)

  const delConfirm = async id => {
    try {
      const res = await axios.delete(`/api/store/${id}`)
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
      title: '图片',
      dataIndex: 'coverImage',
      render: (coverImage, row, index) => {
        return <Avatar shape="square" src={BASEURL + (coverImage && coverImage.path)} />;
      },
    },
    {
      title: '店名',
      dataIndex: 'name',
    },
    {
      title: '地址',
      dataIndex: 'location',
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
          <Link to={`/storeForm?id=${record.id}`}><Button shape="circle" icon={<EditOutlined />} size="small"></Button></Link>
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
    async function getStores() {
      setLoading(true)
      try {
        const res = await axios.get(`/api/store?current=${current}&sorter=${sorter}`)
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
    getStores()
  }, [current, sorter])

  return (
    <PageLayout routes={[{ path: '/store', breadcrumbName: '店铺' }]} title="店铺列表">
      <Card title={<Link to={`/storeForm`}><Button type="primary" icon={<PlusOutlined />}>新建</Button></Link>} bordered={false}>
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

export default Store