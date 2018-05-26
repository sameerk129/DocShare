import React, { Component } from 'react';
import logo from './images/logo.svg';
import './css/App.css';
import axios from 'axios';
import {Header, FolderList, NotesList, Note, Landing} from './components';
import { Route, Switch, Redirect, Router } from 'react-router-dom';
import {Notes} from './components/Notes';

import settings from './config';


class App extends Component {

  componentDidMount() {
    // axios.get('http://localhost:8000/api/folders/notes/').then(
    //   resp => {
    //     console.log("resp is:");
    //     console.log(resp);
    //     // alert(resp);
    //   }, fail => {
    //     console.error("Failure");
    //     // alert("Fail");
    //   }
    // )
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route path="/landing" component={Landing}/>
          <Route path={settings.uiRoutingUrls.FOLDER_NOTE} component={Notes}/>
          {/*<Route path={settings.uiRoutingUrls.FOLDERS} component={FolderList}/>*/}
        </Switch>
      </div>
    );
  }
}

export default App;
