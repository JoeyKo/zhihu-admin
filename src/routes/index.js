import loadable from '@/utils/AsyncLoadable'

const Dashboard = loadable(() => import(/* webpackChunkName: 'index' */ '@/pages/Dashboard'))

// article
const Article = loadable(() => import(/* webpackChunkName: 'index' */ '@/pages/Article'))
const ArticleForm = loadable(() => import(/* webpackChunkName: 'index' */ '@/pages/ArticleForm'))

const Editor = loadable(() => import(/* webpackChunkName: 'index' */ '@/pages/Editor'))

const Step = loadable(() => import(/* webpackChunkName: 'step' */ '@/pages/NavView/Step'))

// profile settings
const ProfileSettings = loadable(() => import(/* webpackChunkName: 'step' */ '@/pages/Profile/Settings'))

const routes = [
  { path: '/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
  { path: '/article', exact: true, name: 'Article', component: Article },
  { path: '/articleForm', exact: true, name: 'ArticleForm', component: ArticleForm },
  { path: '/editor', exact: true, name: 'Editor', component: Editor, roles: ['admin'] },
  { path: '/nav/steps', exact: true, name: 'Step', component: Step },
  { path: '/profile-settings', exact: true, name: 'ProfileSettings', component: ProfileSettings },
]

export default routes
