// This module will define the counter container

import React, {Component} from 'react';
import {
  Image,
  Form,
  FormGroup,
  FormControl,
  HelpBlock,
  Button,
  Jumbotron,
  PageHeader,
  InputGroup,
  Glyphicon,
  Alert } from 'react-bootstrap';
import loginIcon from '../images/login-icon.png';

import settings from '../config';
import { login, logger } from '../utils';
import history from '../history';

export class Login extends Component{

  constructor(props) {

    super(props);

    this.state = {username: null, password: null, unameErr: '', pwdErr: '', unamePwdErr: null};

    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.sendLoginRequest = this.sendLoginRequest.bind(this);
    this.beforeRenderChecks = this.beforeRenderChecks.bind(this);
    this.handleAlertDismiss = this.handleAlertDismiss.bind(this);
    this.getUsernameValidationState = this.getUsernameValidationState.bind(this);
    this.getPasswordValidationState = this.getPasswordValidationState.bind(this);

  }

  handleAlertDismiss(event){
    this.setState({
      unamePwdErr: null
    });
  }

  onUsernameChange(event){
    this.setState({username: event.target.value, unameErr: null});
  }

  onPasswordChange(event){
    this.setState({password: event.target.value, pwdErr: null});
  }

  getUsernameValidationState(){
    if (this.state.username === '' || this.state.unameErr){
      return 'error';
    }
  }

  getPasswordValidationState(){
    if (this.state.password === '' || this.state.pwdErr){
      return 'error';
    }
  }

  sendLoginRequest(event) {
    /*  Function is called when Login button is clicked in the modal window,
     it extracts the text in username and password element, and calls the
     props function loginUser
     */
    event.preventDefault();

    logger.component("Login", "sendLoginRequest", {state: this.state});
    let username = this.state.username;
    let password = this.state.password;

    if (!username){
      this.setState({
        unameErr: "Username can't be empty",
      })
    }
    else{
      this.setState({unameErr: null})
    }

    if (!password){
      this.setState({
        pwdErr: "Password can't be empty",
      })
    }
    else{
      this.setState({pwdErr: null})
    }

    if (username && password){
      const request_data = {
        username,
        password,
      };
      login(request_data, (userLoggedIn) => {
        if (userLoggedIn){
          history.push(settings.uiRouteUrls.LANDING);
        }
        else{
          this.setState({
            unamePwdErr: "Username/Password Not Matching",
          })
        }
      });
    }
  }

  beforeRenderChecks(){
    /*
     User can apply the before rendering checks here
     */
  }

  render(){

    this.beforeRenderChecks();

    return(
      <div className="login container">
        <PageHeader>
          DocShare
          <small>Share Documents</small>
        </PageHeader>
        <Jumbotron className="row">
          <div className="col-md-4 col-md-offset-4">
            <div className="row text-center">
              <Image src={loginIcon} alt="Login Image" id="login-logo"/>
            </div>
            <hr/>
            {this.state.unamePwdErr? <Alert bsStyle="danger" onDismiss={this.handleAlertDismiss} className="text-center">{this.state.unamePwdErr}</Alert>: null}
            <Form>
              <FormGroup controlId="loginForm" validationState={this.getUsernameValidationState()}>
                <InputGroup>
                  <InputGroup.Addon>
                    <Glyphicon glyph="glyphicon glyphicon-user"/>
                  </InputGroup.Addon>
                  <FormControl type="text" placeholder="Enter Username" onChange={this.onUsernameChange}></FormControl>
                </InputGroup>
                <HelpBlock>{this.state.unameErr}</HelpBlock>
              </FormGroup>
              <FormGroup controlId="loginForm" validationState={this.getPasswordValidationState()}>
                <InputGroup>
                  <InputGroup.Addon>
                    <Glyphicon glyph="glyphicon glyphicon-lock"/>
                  </InputGroup.Addon>
                  <FormControl type="password" placeholder="Enter Password" onChange={this.onPasswordChange}></FormControl>
                </InputGroup>
                <HelpBlock>{this.state.pwdErr}</HelpBlock>
              </FormGroup>
              <Button id="login-confirm-button" bsStyle="warning"
                      type="submit" onClick={this.sendLoginRequest} block>Login
              </Button>
            </Form>
          </div>
        </Jumbotron>
      </div>
    )
  }
}
