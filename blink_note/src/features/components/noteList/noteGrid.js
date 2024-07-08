import React, { useState } from "react";
import "./noteCard.css";
import Modal from "../modal/modal";
import Note from "../takeNote/note";
import { updateNote, deleteNote } from "../../noteSlice";
import { setTakeNoteMode } from "../../takeNoteslice";
import { useDispatch } from "react-redux";
import PinFill from "../../../assets/pin-fill.png";
import PinLine from "../../../assets/pin-line.png";

const NoteGrid = ({ note }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [background, sebackground] = useState(note.background || "#ffffff");
  const dispatch = useDispatch();
  const handleOnClickGrid = () => {
    toggleModal(true);
    dispatch(setTakeNoteMode("idle"));
  };
  const toggleModal = (value) => {
    setIsModalOpen(value);
  };
  const handleChangeNote = (newNote) => {
    dispatch(updateNote(newNote));
  };
  const handleDeleteNote = () => {
    dispatch(deleteNote(note));
  };
  const handleCloseNote = () => {
    toggleModal(false);
  };
  const handleColorChange = (color) => {
    sebackground(color);
  };
  const handlePinAction = (e) =>{
     e.stopPropagation()
     const pin = !note.isPinned
     dispatch(updateNote({...note,isPinned:pin}))
  }

  return (
    <>
      <div
        style={{ backgroundColor: note.background }}
        className={`note-grid cursor-pointer ${
          note.images.length ? "image-container" : ""
        }`}
        onClick={handleOnClickGrid}
      >
        <div className="position-relative">
          <div
            onClick={handlePinAction}
            className="pin-container d-flex justify-content-between align-items-center"
          >
            <div className="add-icons-container">
              <img
                src={note.isPinned ? PinFill : PinLine}
                alt="PinMe"
                className="add-tools-icon"
              />
            </div>
          </div>
        </div>
        <div
          className={
            note.images.length > 0
              ? "d-flex justify-content-center h-20rem p-4px"
              : ""
          }
        >
          {note.images.map((image, index) => (
            <div key={index} className="image-wrapper">                
              <img
                src={image}
                className="image-item"
                alt={`Image ${index + 1}`}
              />
            </div>
          ))}
        </div>
        <div className="grid-heading">{note.heading}</div>
        <p className="grid-text">{note.text}</p>
      </div>
      <Modal
        background={background}
        onClose={() => toggleModal(false)}
        isOpen={isModalOpen}
      >
        <Note
          setNote={handleChangeNote}
          note={note}
          handleBackgroundColorChange={handleColorChange}
          handleCloseNote={handleCloseNote}
          handleDeleteNote={handleDeleteNote}
          closeNote={handleCloseNote}
        />
      </Modal>
    </>
  );
};

export default NoteGrid;
