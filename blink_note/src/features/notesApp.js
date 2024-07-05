import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addNote, updateNote, deleteNote } from './noteSlice';

const NoteApp = () => {
  const notes = useSelector((state) => state.notes);
  const dispatch = useDispatch();
  console.log(notes, dispatch)

  const handleAddNote = (id, text) => {
    dispatch(addNote({ id, text }));
  };

  const handleChangeNote = (note) => {
    dispatch(updateNote(note));
  };

  const handleDeleteNote = (id) => {
    dispatch(deleteNote({ id }));
  };

  return (
    <div>
      {notes.map(note => (
        <div key={note.id}>
          <span>{note.text}</span>
          <button onClick={() => handleDeleteNote(note.id)}>Delete</button>
          <button onClick={() => handleChangeNote({ ...note, text: 'Updated text' })}>Change</button>
        </div>
      ))}
      <button onClick={() => handleAddNote(notes.length, 'New Note')}>Add Note</button>
    </div>
  );
};

export default NoteApp;