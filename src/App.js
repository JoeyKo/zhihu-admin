import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

// set moment locale
import 'moment/locale/zh-cn'

// antd locale
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN';

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enLocale from '@/locales/en_US'
import zhLocale from '@/locales/zh_CN'

import AsyncLoadable from './utils/AsyncLoadable';

import './App.css';

const locale = localStorage.getItem('locale') || 'zh'
console.log(locale)
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: enLocale
      },
      zh: {
        translation: zhLocale
      }
    },
    lng: locale,
    fallbackLng: locale,

    interpolation: {
      escapeValue: false
    }
  });
  
const DefaultLayout = AsyncLoadable(() => import(/* webpackChunkName: 'default' */ './layout'))

const View404 = AsyncLoadable(() => import(/* webpackChunkName: '404' */ './pages/Others/404'))
const View403 = AsyncLoadable(() => import(/* webpackChunkName: '404' */ './pages/Others/403'))
const Login = AsyncLoadable(() => import(/* webpackChunkName: 'login' */ './pages/Login'))

function App() {
  return (
    <div className="App">
      <ConfigProvider locale={zhCN}>
        <Router>
          <Switch>
            <Route path='/' exact render={() => <Redirect to='/dashboard' />} />
            <Route path='/404' component={View404} />
            <Route path='/403' component={View403} />
            <Route path='/login' component={Login} />
            <Route component={DefaultLayout} />
          </Switch>
        </Router>
      </ConfigProvider>
    </div>
  );
}

export default App;
