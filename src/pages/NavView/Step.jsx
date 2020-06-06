
import React from 'react'
import PageLayout from '@/components/PageLayout'
import { useTranslation } from 'react-i18next'

const Step = props => {
  const { t } = useTranslation()
  
  return (
    <PageLayout title={t('subNav')} routes={[{ breadcrumbName: t('nav') }, { breadcrumbName: t('subNav') }]}>
      
    </PageLayout>
  )
}
export default Step