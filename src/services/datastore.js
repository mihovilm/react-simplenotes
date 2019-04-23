import firebase from 'firebase';

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyCDN4CSL2fllHAY9uIqjyqkHGsRZa9Fmb0',
  authDomain: 'react-notes-779e0.firebaseapp.com',
  databaseURL: 'https://react-notes-779e0.firebaseio.com',
  projectId: 'react-notes-779e0',
  storageBucket: 'react-notes-779e0.appspot.com',
  messagingSenderId: '303925804888',
};
firebase.initializeApp(config);

const database = firebase.database();

// Adapted from Lab 3 CS52 page
// and adapted from Firebase documentation https://firebase.google.com/docs/database/web/read-and-write#value_events

export function fetchNotes(callback) {
  database.ref('notes').on('value', (snapshot) => {
    const newNoteState = snapshot.val();
    callback(newNoteState);
  });
}

// Exporting functions from main App.js
export function addNote(note) {
  const id = database.ref('notes').push().key;
  database.ref('notes').child(id).set(note);
}

export function updateNote(id, note) {
  database.ref('notes').child(id).set(note);
}

export function deleteNote(id) {
  database.ref('notes').child(id).remove();
}
