
import React from 'react'
import PageLayout from '@/components/PageLayout'

const Step = props => {

  return (
    <PageLayout title="Step view" routes={[{ breadcrumbName: '导航' }, { breadcrumbName: '步骤条' }]}>
      <div>step view</div>
    </PageLayout>
  )
}
export default Step