import React, {Component} from 'react';

import {Jumbotron} from 'react-bootstrap';

import {logger} from '../utils';
import util from 'util';
import settings from "../config";
import history from '../history';

export class NotesCard extends Component{

  onClick = (event) => {
    logger.component("NotesCard", "onClick", {Props: this.props});
    let folderId = this.props.folderId;
    let noteId = this.props.data.id;
    let url = util.format(settings.uiRouteUrls.FOLDER_NOTE, folderId);
    url += "?note=" + noteId;
    history.push(url);
  };

  render() {
    return (
      <div
        className={(this.props.className === undefined) ? "note-card" : "note-card " + this.props.className}
        onClick={this.onClick}>
        <Jumbotron className="note-card-jumbotron">
        <div>{this.props.data.title}</div>
        </Jumbotron>
        {/*<div>{this.props.data.contents}</div>*/}
      </div>
    )
  }
}