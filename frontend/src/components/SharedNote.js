import React, {Component} from 'react';
import axios from 'axios';
import settings from '../config';
import util from 'util';
import RichTextEditor from 'react-rte';
import {logger} from '../utils';

export class SharedNote extends Component {

  constructor(props) {
    super(props);

    this.beforeRenderChecks = this.beforeRenderChecks.bind(this);
    this.state = {noteDetails: {
      content: RichTextEditor.createEmptyValue(),
      }};

  }

  beforeRenderChecks() {
  }

  componentDidMount() {
    let noteId = this.props.history.location.pathname.split('/')[2];
    axios({
      url: util.format(settings.urls.SHARED_NOTE, noteId),
      method: 'GET',
    })
      .then(resp => {
        logger.component("SharedNote", "componentDidMount", {resp});
        this.setState({noteDetails: {
            content: RichTextEditor.createValueFromString(resp.data.contents, 'html'),
            title: resp.data.title,
          }})
      })
      .catch(err => {

      })
  }

  render() {
    this.beforeRenderChecks();

    return (
      <div className="text-center">
        <h2>{this.state.noteDetails.title}</h2>
        <RichTextEditor value={this.state.noteDetails.content}
                        readOnly
                        onChange={this.onChange}/>
      </div>
    )
  }
}

