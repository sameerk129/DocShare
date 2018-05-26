import React, {Component} from 'react';

import {Jumbotron, PageHeader} from 'react-bootstrap';


export class NotFound extends Component{
  render() {
    return(
      <Jumbotron>
        <PageHeader>
          <h1>Sorry Page Not Found :'(</h1>
        </PageHeader>
      </Jumbotron>
    )
  }
}