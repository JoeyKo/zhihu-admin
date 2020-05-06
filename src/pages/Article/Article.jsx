import React, { useEffect, useState } from 'react'
import { Layout, Table, Button } from 'antd'
import axios from '@/api'
import WebBreadcrumb from '@/components/WebBreadcrumb'


const Article = () => {
    const [list, setList] = useState([])

    const columns = [
      {
        title: '姓名',
        dataIndex: 'title',
      },
      {
        title: '年龄',
        dataIndex: 'description',
      },
      {
        title: '住址',
        dataIndex: 'createdAt',
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <Button type="link">编辑 {record.name}</Button>
            <Button type="link">删除</Button>
          </span>
        ),
      }
    ];
    useEffect(() => {
        axios.get(`/api/article`).then(res => {
          console.log(res)
          setList(res.data)
        }).catch(err => {
            console.error(err)
        })
      }, [])
    return (
        <Layout className='index animated fadeIn'>
            <WebBreadcrumb arr={['文章']}></WebBreadcrumb>

            <Table dataSource={list} columns={columns}>

            </Table>
        </Layout>
    )
}

export default Article