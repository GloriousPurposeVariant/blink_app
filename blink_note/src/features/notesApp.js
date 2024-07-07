import React from "react";
import NavBar from "./components/navBar";
import LeftSidebar from "./components/leftSideBar/leftSideBar";
import { useSelector, useDispatch } from "react-redux";
import { addNote, updateNote, deleteNote } from "./noteSlice";
import TakeNote from "./components/takeNote/takeNote";
import NoteList from "./components/noteList/noteList";

const NoteApp = () => {
  const notes = useSelector((state) => state.notes);
  const activeMenuFilter = useSelector((state) => state.filterSidebar.filter);

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
        <div className="d-flex note-sub-container">
          <LeftSidebar />
          <div className="notes-list-all">
            <div className="note-list-all-container">
              {activeMenuFilter === "active" && (
                <>
                  <div className="note-take-a-note-container d-flex justify-content-center">
                    <TakeNote />
                  </div>
                  <NoteList displayText="Pinned" filter={"pinned"} />
                  <NoteList displayText="Others" filter={"unpinned"} />
                </>
              )}
              {activeMenuFilter === "archived" && (
                <>
                  <NoteList displayText="Archived" />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteApp;
