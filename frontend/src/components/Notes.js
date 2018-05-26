import React, {Component} from 'react';

import {logger} from '../utils';
import settings from '../config';
import {Button, Checkbox} from 'react-bootstrap';
import RichTextEditor from 'react-rte';
import InlineEdit from 'react-edit-inline';


import util from 'util';

import axios from 'axios';

export class Notes extends Component {

  constructor(props) {
    super(props);

    this.beforeRenderChecks = this.beforeRenderChecks.bind(this);
    this.state = {
      value: RichTextEditor.createEmptyValue(),
      title: "Title",
    };
    this.onChange = (value) => this.setState({value});
    this.postCurrentURL = this.postCurrentURL.bind(this);
  }

  postCurrentURL() {
    let [isNew, noteId] = this.isNew();
    console.log("noteId is:");
    console.dir(noteId);
    console.log("isNew is: ");
    console.dir(isNew);
    let folderId = this.props.history.location.pathname.split('/')[2];
    if (isNew) {
      return [util.format(settings.urls.NEW_NOTE, folderId), 'POST']
    }
    else {
      return [util.format(settings.urls.FOLDER_NOTE, folderId, noteId), 'PUT'];
    }
  }

  isNew() {
    let queryString = window.location.toString().split('?')[1];
    console.log('qureyString is: ' );
    console.log(queryString);
    if (queryString !== undefined) {
      return [false, queryString.split('=')[1]];
    }
    else {
      return [true, null];
    }
  }

  beforeRenderChecks() {
    logger.component("Note", "beforeRenderChecks", {State: this.state, Props: this.props})
  }

  getCurrentUrl() {
    let [isNew, noteId] = this.isNew();
    let folderId = this.props.history.location.pathname.split('/')[2];
    if (isNew) {
      return util.format(settings.urls.NEW_NOTE, folderId, noteId);
    }
    else {
      return util.format(settings.urls.FOLDER_NOTE, folderId, noteId);
    }
  }

  componentDidMount() {
    logger.component("Note", "componentDidMount", {State: this.state, Props: this.props});
    let [isNew, noteId] = this.isNew();
    let folderId = this.props.history.location.pathname.split('/')[2];
    if (!isNew) {
      axios({
        url: util.format(settings.urls.FOLDER_NOTE, folderId, noteId),
        method: 'GET',
      })
        .then(resp => {
          this.setState({
            value: RichTextEditor.createValueFromString(resp.data.contents, 'html'),
            title: resp.data.title,
            public: resp.data.public,
          });
        });
    }
  }

  onTitleChange = (event) => {
    logger.component("Note", "onTitleChange", {event});
    this.setState({title: event.title});
  };

  onSaveClick = (event) => {
    logger.component("Note", "onSaveClick", {State: this.state});
    let htmlComp = this.state.value.toString('html');

    // validating data
    if (this.state.title === "") {
      console.error("title cant be None");
    }

    let [url, method] = this.postCurrentURL();
    axios({
      url: url,
      method: method,
      data: {
        contents: htmlComp,
        title: this.state.title,
        public: this.state.public ? this.state.public : false,
      },
    })
      .then(
        resp => {
          logger.component("Notes", "onSaveClick", {resp});
          // Route to the last page
          this.props.history.push(settings.uiRouteUrls.LANDING);
        }
      )
  };

  onPublicChange = (event) => {
    logger.component("Note", "onPublicChange", {event, checked: event.target.checked});
    this.setState({public: event.target.checked});
  };

  render() {
    this.beforeRenderChecks();

    return (
      <div className="section">
        <InlineEdit
          change={this.onTitleChange}
          text={this.state.title}
          paramName="title"
        />
        <RichTextEditor value={this.state.value}
                        onChange={this.onChange}/>
        <Checkbox
          className="editor-share-checkbox"
          checked={this.state.public}
          onChange={this.onPublicChange}>
          Public
        </Checkbox>
        <Button className="editor-save-button" onClick={this.onSaveClick}>Save</Button>
      </div>
    )
  }

}

