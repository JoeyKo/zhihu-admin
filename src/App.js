import React, { useEffect } from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
// set moment locale
import 'moment/locale/zh-cn'
import moment from 'moment'

import AsyncLoadable from './utils/AsyncLoadable';

import './App.css';

const DefaultLayout = AsyncLoadable(() => import(/* webpackChunkName: 'default' */ './layout'))

const View404 = AsyncLoadable(() => import(/* webpackChunkName: '404' */ './pages/Others/404'))
const Login = AsyncLoadable(() => import(/* webpackChunkName: 'login' */ './pages/Login'))

function App() {
  useEffect(() => {
    console.log(moment.locale('zh-cn'))
  })
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/' exact render={() => <Redirect to='/dashboard' />} />
          <Route path='/404' component={View404} />
          <Route path='/login' component={Login} />
          <Route component={DefaultLayout} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
