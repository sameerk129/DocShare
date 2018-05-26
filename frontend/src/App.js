import React, { Component } from 'react';
import logo from './images/logo.svg';
import './css/App.css';
import axios from 'axios';
import {Header, FolderList, NotesList, Note, Landing} from './components';
import { Route, Switch, Redirect, Router } from 'react-router-dom';
import {Notes} from './components/Notes';

import settings from './config';


class App extends Component {

  renderEmpty() {
    return (<Redirect to={settings.uiRoutingUrls.LANDING}/>);
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route path={settings.uiRoutingUrls.LANDING} component={Landing}/>
          <Route path={settings.uiRoutingUrls.FOLDER_NOTE} component={Notes}/>
          <Route path="/" render={this.renderEmpty}/>
        </Switch>
      </div>
    );
  }
}

export default App;
