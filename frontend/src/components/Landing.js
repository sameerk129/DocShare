import React, {Component} from 'react';

import Sidebar from 'react-sidebar';
import {logger} from '../utils';
import axios from "axios/index";
import settings from "../config";

import util from 'util';
import {NotesCard} from "./NotesCard";
import {Button} from 'react-bootstrap';


export class Landing extends Component {

  constructor(props) {
    super(props);

    this.beforeRenderChecks = this.beforeRenderChecks.bind(this);
    this.state = {
      foldersList: [],
      notes: [],
    };
  }

  beforeRenderChecks() {
    logger.component("Landing", "beforeRenderChecks", {State: this.state, Props: this.props})
  }

  componentDidMount() {
    logger.component("Landing", "componentDidMount", {State: this.state, Props: this.props});
    axios.get(settings.urls.FOLDERS_LIST).then(
      resp => {
        logger.component("FolderList", "componentWillMount", "after axios", {resp});
        this.setState({foldersList: [...resp.data]});
      }
    )
  }

  onFolderClick = (event) => {
    logger.component("FolderList", "componentWillMount", {event});
    let target = event.target;
    logger.component("FolderList", "componentWillMount", {target});
    let value = event.target.value;
    logger.component("FolderList", "componentWillMount", {value});
    let url = util.format(settings.urls.FOLDER_NOTES_LIST, value);
    logger.component("FolderList", "componentWillMount", {url});

    axios({
      url: url,
      method: "GET",
    })
      .then(resp => {
        logger.component("FolderList", "componentWillMount", {resp});
        this.setState({notes: [...resp.data.notes], selectedFolderId: value});
      })
  };

  onAddNoteClick = () => {
    let folderId = this.state.selectedFolderId;
    let url = util.format(settings.uiRouteUrls.FOLDER_NOTE, folderId);
    logger.component("Landing", "onAddNoteClick", {url});
    this.props.history.push(url);
  };

  renderFoldersList() {
    let selectedFolderId = this.state.selectedFolderId;

    return this.state.foldersList.map(folderDetails => {
      return <Button
        block
        onClick={this.onFolderClick}
        value={folderDetails.id}
        bsStyle="link"
        active={(selectedFolderId !== undefined) ? (folderDetails.id === parseInt(selectedFolderId)) : false}
        key={folderDetails.id}>
        {folderDetails.title}
      </Button>
    })
  }

  renderNotesList() {
    return this.state.notes.map(note => {
      return <NotesCard
        className="col-md-3"
        data={note}
        folderId={this.state.selectedFolderId}
        key={note.id}/>
    })
  }

  render() {
    this.beforeRenderChecks();

    return (
      <div className="row landing-page">
        <div className="col-md-3">
          {this.renderFoldersList()}
        </div>
        <div className="col-md-9">
          <div className="row">
            {this.renderNotesList()}
          </div>
        </div>
        {this.state.selectedFolderId !== undefined ?
          <Button
            onClick={this.onAddNoteClick}
            className="add-note-button">
            Add Note to Folder
          </Button>: null}
          <Button
            className="add-folder-button"
            onClick={this.onAddFolderClick}>
            Add Folder
          </Button>
      </div>
    )
  }
}

