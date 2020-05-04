import React, { useEffect } from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import AsyncLoadable from './utils/AsyncLoadable';
import './App.css';


const DefaultLayout = AsyncLoadable(() => import(/* webpackChunkName: 'default' */ './layout'))

function App() {
 
  return (
    <div className="App">
       <Router>
          <Switch>
              <Route path='/' exact render={() => <Redirect to='/index' />} />
              <Route component={DefaultLayout} />
          </Switch>
      </Router>
    </div>
  );
}

export default App;
