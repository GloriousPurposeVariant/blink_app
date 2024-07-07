// NoteCard.js
import React from "react";
import "./noteCard.css";

const NoteGrid = ({ note }) => {
  return (
    <div className="note-grid">
      <h3>{note.title}</h3>
      <p>{note.text}</p>
    </div>
  );
};

export default NoteGrid;
