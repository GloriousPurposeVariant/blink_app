import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNote } from "../../noteSlice";
import { setTakeNoteMode } from "../../takeNoteslice";
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
  const [selectedImages, setSelectedImages] = useState([]);
  const takeNote = useSelector((state) => state.takeNote);
  const dispatch = useDispatch();
  const takeNoteRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleCloseNote = () => {
    if (
      note.heading ||
      note.text ||
      note.isPinned ||
      note.background ||
      note.images.length > 0
    ) {
      dispatch(addNote(note));
    }
    handleDeleteNote();
  };

  // useEffect(() => {
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);
  const handleDeleteNote = () => {
    setNote({
      heading: "",
      text: "",
      isPinned: false,
      background: "",
      images: [],
    });
    setSelectedImages([]);
    dispatch(setTakeNoteMode("idle"));
  };

  const handleClickOutside = (e) => {
    console.log(e, takeNoteRef, "sdffd");
    if (takeNoteRef.current && !takeNoteRef.current.contains(e.target)) {
      if (takeNote.takeNoteMode !== "idle") {
        dispatch(setTakeNoteMode("idle"));
      }
    }
  };

  const handleFileInputChange = async (e) => {
    const files = Array.from(e.target.files);
    const base64Images = [];

    try {
      for (const file of files) {
        const base64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        });
        base64Images.push(base64);
      }

      setSelectedImages(base64Images);
      setNote((prevNote) => ({
        ...prevNote,
        images: [...prevNote.images, ...base64Images]
        // images: prevNote.images.concat(
        //   base64Images.slice(0, 3 - prevNote.images.length)
      }));

      console.log("Images converted to base64:", base64Images);
    } catch (error) {
      console.error("Error converting file to base64:", error);
    }
  };

  const handleImageUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleTakeNote = (e, action = false) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(setTakeNoteMode("create"));
    console.log(action, "action");
    if (action === "image") {
      handleImageUploadClick();
    }
  };

  const handleSave = () => {
    // if (noteText.trim()) {
    //   dispatch(addNote({ id: Date.now(), text: noteText, done: false }));
    //   setNoteText("");
    //   dispatch(setTakeNoteMode("idle"));
    // }
  };

  const handleCancel = () => {
    dispatch(setTakeNoteMode("idle"));
  };
  // "h-14rem container-active"

  return (
    <div
      ref={takeNoteRef}
      className={`take-note-container ${
        takeNote.takeNoteMode === "idle"
          ? "h-1rem container-inactive"
          : note.images.length > 0
          ? "h-34rem container-active"
          : "h-14rem container-active"
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
          handleCloseNote={handleCloseNote}
          setNote={setNote}
          handleImageUploadClick={handleImageUploadClick}
        />
      )}
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileInputChange}
        style={{ display: "none" }}
        ref={fileInputRef}
      />
    </div>
  );
};
export default TakeNote;
