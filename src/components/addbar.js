import React, { Component } from 'react';

class AddBar extends Component {
  constructor(props) {
    super(props);
    this.state = { title: '' };

    this.onInputChange = this.onInputChange.bind(this);
    this.addNote = this.addNote.bind(this);
  }

  onInputChange(event) {
    this.setState({ title: event.target.value });
  }

  addNote() {
    this.props.addNote(this.state.title);
    this.setState({ title: '' });
  }

  render() {
    return (
      <div id="addbar">
        <input onChange={this.onInputChange} value={this.state.title} placeholder="New note title..." />
        <button onClick={this.addNote} type="submit">Add note</button>
      </div>
    );
  }
}

export default AddBar;
