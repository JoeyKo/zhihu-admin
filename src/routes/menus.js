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
    icon: <BookOutlined />
  },
]

export default menus;