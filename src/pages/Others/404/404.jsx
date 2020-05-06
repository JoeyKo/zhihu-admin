  
import React from 'react'
import { Button } from 'antd'
import { Link } from 'react-router-dom'

const View404 = () => (
   <div>
     <h1>oops!</h1>
     <div>404 - PAGE NOT FOUND</div>
     <div><Link to="/dashboard"><Button type="primary">Go Home</Button></Link></div>
   </div>
)

export default View404