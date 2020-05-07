
import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Result, } from 'antd'

const View404 = props => {

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Link to="/dashboard"><Button type="primary">Back Home</Button></Link>}
    />
  )

}
export default View404