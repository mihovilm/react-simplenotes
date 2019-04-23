/* eslint-disable new-cap */
import React, { Component } from 'react';
import { Map } from 'immutable';
import AddBar from './addbar';
import Note from './note';
import * as db from '../services/datastore';


// Extracted the main App into a separate file outside of index.js as Tim suggested

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: Map(), // Immutable.Map
      newID: 0, // ID counter
    };

    this.addNote = this.addNote.bind(this);
    this.updateNote = this.updateNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
  }

  componentDidMount() {
    db.fetchNotes((notes) => {
      this.setState({ notes: Map(notes) });
    });
  }

  addNote(title) {
    const newNote = {
      title,
      text: '',
      // Randomize initial position
      x: 40 + Math.random() * (window.innerWidth / 2.25 - 40),
      y: 20 + Math.random() * (window.innerHeight / 2.5 - 20),
      zIndex: 0,
    };

    db.addNote(newNote);
    this.setState(prevState => ({
      newID: prevState.newID + 1,
    }));
  }

  updateNote(id, fields) {
    console.log(fields);
    db.updateNote(id, Object.assign({}, this.state.notes.get(id), fields));
  }

  // eslint-disable-next-line class-methods-use-this
  deleteNote(id) {
    db.deleteNote(id);
  }

  renderNotes() {
    return this.state.notes.entrySeq().map(([id, note]) => {
      return (<Note id={id} note={note} key={id} updateNote={this.updateNote} deleteNote={this.deleteNote} />);
    });
  }

  render() {
    return (
      <div className="main-container">
        <h1 id="title">React Notes - by Mihovil Mandic, CS52, Spring 2019</h1>
        <AddBar addNote={this.addNote} />
        <div id="notes">
          {this.renderNotes()}
        </div>
      </div>
    );
  }
}

export default App;
