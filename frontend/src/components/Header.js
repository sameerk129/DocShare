import React, {Component} from 'react';

import {
  Navbar,
  Nav,
  NavItem,
} from 'react-bootstrap';
import settings from '../config';
import history from '../history';
import axios from 'axios';

export class Header extends Component{

  onClick = () => {
    history.push(settings.uiRouteUrls.LANDING)
  };

  logoutUser = () => {
    axios({
      url: settings.urls.LOGOUT,
      method: 'GET',
    })
      .then(resp => {
        sessionStorage.removeItem(settings.SESSION_STORAGE_AUTH_KEY);
        delete axios.defaults.headers.common[settings.AUTHORIZATION_HEADER];
        history.push(settings.uiRouteUrls.LOGIN);
      })
  };

  render() {
    return (
      <Navbar fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <div onClick={this.onClick}>DocShare</div>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            {/*<NavDropdown*/}
              {/*title={*/}
                {/*<Glyphicon glyph="menu-hamburger"/>*/}
              {/*}*/}
              {/*id="header-dropdown">*/}
              {/*<MenuItem*/}
                {/*eventKey="navbar-event-1"*/}
                {/*id="navbar-event-5"*/}
                {/*onClick={this.logoutUser}>*/}
                {/*Logout*/}
              {/*</MenuItem>*/}
            {/*</NavDropdown>*/}
            <NavItem onClick={this.logoutUser}>
              Logout
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}