

import React from 'react'
import { Tooltip } from 'antd'
import { ReloadOutlined, FullscreenOutlined } from '@ant-design/icons'
import styles from './index.module.scss'

const TableToolbar = (props) => {
  const { onReload, onFullScreen } = props
  return (
    <div className={styles.tableToolbar}>
      <Tooltip placement="top" title="刷新">
        <ReloadOutlined onClick={onReload} className={styles.action} />
      </Tooltip>
      <Tooltip placement="top" title="全屏">
        <FullscreenOutlined onClick={onFullScreen} className={styles.action} />
      </Tooltip>
    </div>
  )
}

export default TableToolbar