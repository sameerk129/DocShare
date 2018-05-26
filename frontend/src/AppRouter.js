import React, { Component } from 'react';
import { Route, Switch, Redirect, Router } from 'react-router-dom';

import App from './App';
import history from './history';
import { Login, SharedNote } from './components';
import settings from './config';
import axios from 'axios';

class AppRouter extends Component{

  constructor(props) {
    super(props);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.requireAuth = this.requireAuth.bind(this);
  }

  isAuthenticated(nextState) {
    let authToken = sessionStorage.getItem(settings.SESSION_STORAGE_AUTH_KEY);
    if (authToken !== null && authToken !== undefined && authToken !== '') {
      axios.defaults.headers.common[settings.AUTHORIZATION_HEADER] = settings.AUTHORIZATION_KEY + authToken;
      return <Redirect to={settings.uiRoutingUrls.LANDING} />;
    }
    else return <Login />;
  }

  requireAuth(nextState, replace) {
    let authToken = sessionStorage.getItem(settings.SESSION_STORAGE_AUTH_KEY);
    if (authToken !== null && authToken !== undefined && authToken !== '') {
      axios.defaults.headers.common[settings.AUTHORIZATION_HEADER] = settings.AUTHORIZATION_KEY + authToken;
      return <App />;
    }
    else return <Redirect to={settings.uiRoutingUrls.LOGIN} />;
  }

  render() {
    return (
        <Router history={history}>
          <Switch>
            <Route path={settings.uiRoutingUrls.SHARED_NOTE} component={SharedNote}/>
            <Route path={settings.uiRoutingUrls.LOGIN} render={this.isAuthenticated}/>
            <Route path='/' render={this.requireAuth}/>
          </Switch>
        </Router>
    );
  }
}

export default AppRouter;
