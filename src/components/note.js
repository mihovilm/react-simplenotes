import React, { Component } from 'react';
import Draggable from 'react-draggable';
import marked from 'marked';


class Note extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      currentTitle: this.props.note.title,
      currentText: this.props.note.text,
    };

    this.handleStartDrag = this.handleStartDrag.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.saveEdit = this.saveEdit.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
    this.updateText = this.updateText.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

    this.renderNoteTitle = this.renderNoteTitle.bind(this);
    this.renderNoteBody = this.renderNoteBody.bind(this);
    this.renderNoteIcons = this.renderNoteIcons.bind(this);
  }

  handleDrag(e, data) {
    this.props.updateNote(this.props.id, { x: data.x, y: data.y });
  }

  handleStartDrag(e) {
    this.props.changeZ(this.props.id);
  }

  updateTitle(e) {
    this.setState({
      currentTitle: e.target.value,
    });
  }

  updateText(e) {
    this.setState({
      currentText: e.target.value,
    });
  }

  handleEdit(e) {
    this.setState(prevState => ({
      isEditing: !prevState.isEditing,
      currentTitle: this.props.note.title,
      currentText: this.props.note.text,
    }));
  }

  saveEdit(e) {
    this.props.updateNote(this.props.id, { title: this.state.currentTitle, text: this.state.currentText });
    this.setState({
      isEditing: false,
    });
  }

  handleDelete(e) {
    this.props.deleteNote(this.props.id);
  }


  // Rendering the Title, Icons, and Body separately depending on editing T/F
  renderNoteTitle() {
    if (this.state.isEditing) {
      return (
        <textarea id="note-title-edit" rows="1" cols="20" value={this.state.currentTitle} onChange={this.updateTitle} />
      );
    } else {
      return (
        <div className="note-title">{this.props.note.title}</div>
      );
    }
  }

  renderNoteIcons() {
    if (this.state.isEditing) {
      return (
        <div className="note-icons">
          <i className="note-mover fas fa-arrows-alt" role="button" tabIndex="0" />
          <i onClick={this.saveEdit} className="fa fa-check" role="button" tabIndex="0" />
          <i onClick={this.handleDelete} className="far fa-trash-alt" role="button" tabIndex="0" />
        </div>
      );
    } else {
      return (
        <div className="note-icons">
          <i className="note-mover fas fa-arrows-alt" role="button" tabIndex="0" />
          <i onClick={this.handleEdit} className="fas fa-edit" role="button" tabIndex="0" />
          <i onClick={this.handleDelete} className="far fa-trash-alt" role="button" tabIndex="0" />
        </div>
      );
    }
  }

  renderNoteBody() {
    if (this.state.isEditing) {
      return (
        <div>
          <textarea rows="6" cols="30" value={this.state.currentText} onChange={this.updateText} />
        </div>
      );
    } else {
      return (
        // eslint-disable-next-line react/no-danger
        <div dangerouslySetInnerHTML={{ __html: marked(this.props.note.text || '') }} />
      );
    }
  }

  // Adapted from https://github.com/evcohen/eslint-plugin-jsx-a11y/issues/181
  // In order to use FontAwesome icons as buttons I had to add role and tabindex
  render() {
    return (
      <div className="note-container">
        <Draggable
          handle=".note-mover"
          bounds={{
            left: 0, top: 0, right: (window.innerWidth - 400), bottom: (window.innerHeight - 320),
          }}
          grid={[25, 25]}
          defaultPosition={{ x: 100, y: 100 }}
          position={{ x: this.props.note.x, y: this.props.note.y }}
          onStart={this.handleStartDrag}
          onDrag={this.handleDrag}
          onStop={this.handleStopDrag}
        >
          <div className="note" style={{ zIndex: this.props.note.zIndex }}>
            <div className="note-header">
              {this.renderNoteTitle()}
              {this.renderNoteIcons()}
            </div>
            <div className="note-body">
              {this.renderNoteBody()}
            </div>
          </div>
        </Draggable>
      </div>
    );
  }
}

export default Note;
