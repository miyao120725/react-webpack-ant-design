import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Home from './models/content';
import Details from './models/details';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/details/:id" exact component={Details} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
