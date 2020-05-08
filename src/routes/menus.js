import React from 'react';
import { HomeOutlined, BookOutlined } from '@ant-design/icons';

const menus = [
  {
    key: '/dashboard',
    title: '首页',
    icon: <HomeOutlined />,
  },
  {
    key: '/article',
    title: '文章',
    icon: <BookOutlined />,
  },
  {
    key: '/articleForm',
    title: '文章表单',
    hide: true
  }
]

export default menus;