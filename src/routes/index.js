import loadable from '@/utils/AsyncLoadable'

const Dashboard = loadable(() => import(/* webpackChunkName: 'index' */ '@/pages/Dashboard'))
const Article = loadable(() => import(/* webpackChunkName: 'index' */ '@/pages/Article'))
const ArticleForm = loadable(() => import(/* webpackChunkName: 'index' */ '@/pages/ArticleForm'))

const routes = [
  { path: '/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
  { path: '/article', exact: true, name: 'Article', component: Article },
  { path: '/articleForm', exact: true, name: 'ArticleForm', component: ArticleForm },
]

export default routes
