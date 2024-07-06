import React from "react";
import NavBar from "./components/navBar";
import LeftSidebar from "./components/leftSideBar/leftSideBar";
import { useSelector, useDispatch } from "react-redux";
import { addNote, updateNote, deleteNote } from "./noteSlice";

const NoteApp = () => {
  const notes = useSelector((state) => state.notes);
  const dispatch = useDispatch();

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
      <NavBar />
      <div className="note-container">
        <div>
          <LeftSidebar />
        </div>
        <div>content</div>
      </div>
    </div>
  );
};

export default NoteApp;
