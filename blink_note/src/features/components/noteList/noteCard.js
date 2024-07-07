import React from 'react';
import './noteCard.css';

const NoteCard = ({ note, view }) => {
  return (
    <div className={`note-card ${view}`}>
      <div className="note-content">
        <div className="note-heading">{note.heading}</div>
        <div className="note-text">{note.text}</div>
      </div>
      <div className="note-actions">
        {/* <button onClick={() => onEdit(note)}>Edit</button> */}
        <button >Edit</button>
        <button >Delete</button>
        {/* <button onClick={() => onDelete(note.id)}>Delete</button> */}
      </div>
    </div>
  );
};

export default NoteCard;
