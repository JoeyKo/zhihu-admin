import React from 'react';
import { HomeOutlined, BookOutlined, EditOutlined, CompassOutlined, ShopOutlined } from '@ant-design/icons';

const menus = [
  {
    key: '/dashboard',
    title: 'dashboard',
    icon: <HomeOutlined />,
  },
  {
    key: '/article',
    title: 'article',
    icon: <BookOutlined />,
  },
  {
    key: '/articleForm',
    menu: '/article',
    title: '文章表单',
    hide: true
  },
  {
    key: '/store',
    title: 'store',
    icon: <ShopOutlined />,
  },
  {
    key: '/storeForm',
    menu: '/store',
    title: 'storeForm',
    hide: true
  },
  {
    key: '/editor',
    title: 'editor',
    icon: <EditOutlined />,
    roles: ['admin']
  },
  {
    key: '/nav',
    title: 'nav',
    icon: <CompassOutlined />,
    subs: [
      { title: 'subNav', key: '/nav/sub' }
    ]
  },
]

export default menus;