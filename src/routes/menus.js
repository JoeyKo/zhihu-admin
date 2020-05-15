import React from 'react';
import { HomeOutlined, BookOutlined, EditOutlined, CompassOutlined } from '@ant-design/icons';

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
    menu: '/article',
    title: '文章表单',
    hide: true
  },
  {
    key: '/editor',
    title: '文本编辑器',
    icon: <EditOutlined />,
    roles: ['admin']
  },
  {
    title: '导航',
    key: '/nav',
    icon: <CompassOutlined />,
    subs: [
      { title: '步骤条', key: '/nav/steps' }
    ]
  },
]

export default menus;