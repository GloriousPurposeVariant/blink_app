import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNote } from "../../noteSlice";
import { setTakeNoteMode, setclassName } from "../../takeNoteslice";
import Note from "./note";
import "./takeNote.css";
import AddImage from "../../../assets/add-image.png";

const TakeNote = () => {
  const [note, setNote] = useState({
    heading: "",
    text: "",
    isPinned: false,
    background: "",
    images: [],
  });
  const [imageMode, setImageMode] = useState(false)
  const [canSave, setCanSave] = useState(false)
  const takeNote = useSelector((state) => state.takeNote);
  const dispatch = useDispatch();
  const takeNoteRef = useRef(null);

  const handleCloseNote = () => {
    if (
      note.heading ||
      note.text ||
      note.isPinned ||
      note.images.length > 0
    ) {
      dispatch(addNote(note));
    }
    handleDeleteNote();
  };

  const handleDeleteNote = () => {
    setNote({
      heading: "",
      text: "",
      isPinned: false,
      background: "",
      images: [],
    });
    dispatch(setTakeNoteMode("idle"));
    setImageMode(false)
    setCanSave(false)
    handleSetclassName()
  };
  const handleColorChange = (color) => {
    setNote((prevNote) => ({
      ...prevNote,
      background: color
    }))
  } 

  const handleClickOutside = (e) => {
    if (takeNoteRef.current && !takeNoteRef.current.contains(e.target)) {
      if (takeNote.takeNoteMode !== "idle") {
        dispatch(setTakeNoteMode("idle"));
      }
    }
  };

  const handleTakeNote = (e, action = false) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(setTakeNoteMode("create"));
    console.log(action, "action");
    if (action === "image") {
      setImageMode(true);
    }
  };
  const handleSetNote = (value) => {
    setNote(value)
    setCanSave(true)
  }
  useEffect(() => {
    if (canSave) {
      handleCloseNote()
    }
  }, [canSave])
  const handleSetclassName = (className) => {
    dispatch(setclassName(className))
  }

  return (
    <div style={{ backgroundColor: note.background }}
      ref={takeNoteRef}
      className={`take-note-container ${
        takeNote.takeNoteMode === "idle"
          ? "h-1rem container-inactive": "h-14rem container-active" 
      } ${
        takeNote.takeNoteMode !== "idle" && takeNote.className
      }`}
    >
      {takeNote.takeNoteMode === "idle" ? (
        <div
          onClick={handleTakeNote}
          className="d-flex justify-content-between w-100 align-items-center"
        >
          <div className="dy-font-size">Take a note...</div>
          <div
            onClick={(e) => {
              handleTakeNote(e, "image");
            }}
            className="add-icons-container"
          >
            <img src={AddImage} alt="Add" className="add-tools-icon" />
          </div>
        </div>
      ) : (
        <Note
          note={note}
          handleDeleteNote={handleDeleteNote}
          setNote={handleSetNote}
          handleBackgroundColorChange={handleColorChange}
          openImage={imageMode}
          setclassName={handleSetclassName}
          closeNote={handleDeleteNote}
        />
      )}
    </div>
  );
};
export default TakeNote;
