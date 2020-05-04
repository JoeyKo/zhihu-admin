import React, { useEffect, useState } from 'react'
import { Layout, Table } from 'antd'
import axios from '@/api'

const columns = [
    {
      title: '姓名',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '年龄',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '住址',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
  ];
const Article = () => {
    const [list, setList] = useState([])
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
            <Table dataSource={list} columns={columns}>

            </Table>
        </Layout>
    )
}

export default Article