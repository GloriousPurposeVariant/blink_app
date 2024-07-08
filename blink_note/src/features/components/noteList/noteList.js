import React from "react";
import NoteCard from "./noteCard";
import NoteGrid from "./noteGrid";
import "./noteList.css";
import { useSelector, useDispatch } from "react-redux";

const NoteList = (props) => {
  const { filter: activeMenuFilter, view } = useSelector(
    (state) => state.filterSidebar
  );
  //   const sidebar = useSelector((state) => state.filterSidebar);
  //   const view = "grid_view";
  const notes = useSelector((state) => {
    if (props.filter) {
      const isPinned = props.filter === "pinned";
      return isPinned
        ? state.notes.filter(
            (item) => item.isPinned && item.state === activeMenuFilter
          )
        : state.notes.filter(
            (item) => !item.isPinned && item.state === activeMenuFilter
          );
    }
    return state.notes.filter((item) => item.state === activeMenuFilter);
  });

  return (
    <div>
      {notes.length > 0 && <div className="note-list-display-name">{props.displayText}</div>}{" "}
      <div className={`note-list ${view}`}>
        {notes.map((note) =>
          view === "list_view" ? (
            <NoteCard key={note.id} note={note} />
          ) : (
            <NoteGrid key={note.id} note={note} />
          )
        )}
      </div>
    </div>
  );
};

export default NoteList;
