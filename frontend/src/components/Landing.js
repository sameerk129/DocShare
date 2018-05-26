import React, {Component} from 'react';

import {logger} from '../utils';
import axios from "axios/index";
import settings from "../config";

import util from 'util';
import {NotesCard} from "./NotesCard";
import {
  Button,
  Modal,
  Form,
  FormControl,
  ControlLabel,
  HelpBlock,
} from 'react-bootstrap';


export class Landing extends Component {

  constructor(props) {
    super(props);

    this.beforeRenderChecks = this.beforeRenderChecks.bind(this);
    this.state = {
      foldersList: [],
      notes: [],
      showFolderModal: false,
      editFolderDetails: {},
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

  onFolderNameChange = (event) => {
    logger.component("Landing", "onFolderNameChange", {event});
    this.setState({title: event.target.value});
  };

  onAddFolderClick = () => {
    this.setState({showFolderModal: true, newFolder: true});
  };

  onSaveModalClick = () => {
    let data = {
      title: this.state.title,
    };

    if (data.title === undefined || data.title === null || data.title === "") {
      this.setState({titleErr: "Please Enter some title"});
      return
    }

    if (this.state.newFolder) {
      axios({
        url: settings.urls.NEW_FOLDER,
        method: "POST",
        data: data,
      })
        .then(resp => {
          let foldersList = [...this.state.foldersList];
          foldersList.push(resp.data);
          this.setState({
            foldersList: foldersList,
            showFolderModal: false,
          });
        });
    }
    else {
      axios({
        url: util.format(settings.urls.EDIT_FOLDER, this.state.selectedFolderId),
        method: "PUT",
        data: data,
      })
        .then(resp => {
          let foldersList = [...this.state.foldersList].map( ele => {
            if (ele.id === parseInt(this.state.selectedFolderId)) {
              return {
                title: resp.data.title,
                id: resp.data.id,
                notes: resp.data.notes,
              };
            }
            else return ele;
          });
          this.setState({foldersList: foldersList, showFolderModal: false});
        });
    }
  };

  editFolderOptions = (event) => {
    let selectedFolder = this.state.foldersList.find(ele => {
      return (ele.id === parseInt(this.state.selectedFolderId));
    });
    this.setState({title: selectedFolder.title, showFolderModal: true});
  };

  closeFolderModal = () => {
    this.setState({showFolderModal: false});
  };

  onModalExit = () => {
    this.setState({
      title: null,
      titleErr: null,
    })
  };

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
            onClick={this.editFolderOptions}
            bsStyle="link"
            className="edit-folder-button">
            Edit
          </Button>: null}
        {this.state.selectedFolderId !== undefined ?
          <Button
            onClick={this.onAddNoteClick}
            bsStyle="success"
            className="add-note-button">
            Add Note to Folder
          </Button>: null}
        <Button
          className="add-folder-button"
          onClick={this.onAddFolderClick}>
          Add Folder
        </Button>
        <Modal show={this.state.showFolderModal} onHide={this.closeFolderModal} onExit={this.onModalExit}>
          <Modal.Header closeButton>
            <Modal.Title>
              Folder Options
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <ControlLabel>Title</ControlLabel>
              <FormControl
                onChange={this.onFolderNameChange}
                type="text"
                placeholder="Enter text"
                value={this.state.title}
              />
              <HelpBlock>
                {this.state.titleErr}
              </HelpBlock>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.onSaveModalClick}>Save</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

