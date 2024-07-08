import React from 'react';
import './noteCard.css';

const NoteCard = ({ note, view }) => {
  return (
    <div className={`note-card cursor-pointer ${view}`}>
      <div className="note-content">
        <div className="note-heading">{note.heading}</div>
        <div className="note-text">{note.text}</div>
      </div>
    </div>
  );
};

export default NoteCard;
