import React, { useEffect, useRef, useState } from "react";
import "./note.css"; // Optionally, define styles for this component
import AddImage from "../../../assets/add-image.png";
import backgroundSelector from "../../../assets/backgroundSelector.png";
import Delete from "../../../assets/delete.png";
import PinLine from "../../../assets/pin-line.png";
import PinFill from "../../../assets/pin-fill.png";
import Close from "../../../assets/close.png";
import Archive from "../../../assets/archive.png";
import UnArchive from "../../../assets/unarchive.png";

const Note = ({
  note,
  setNote,
  handleDeleteNote,
  handleCloseNote,
  openImage,
  handleBackgroundColorChange,
  setclassName,
  closeNote,
}) => {
  const [currentNote, setCurrentNote] = useState(note);
  const [backgroundPicker, setBackgroundPicker] = useState(false);

  useEffect(() => {
    if (openImage) {
      handleImageUploadClick();
    }
  }, [openImage]);

  const fileInputRef = useRef(null);

  const handleImageUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleColorChange = (event) => {
    const color = event.target.value;
    handleBackgroundColorChange && handleBackgroundColorChange(color);
    setCurrentNote((prevNote) => ({
      ...prevNote,
      background: color,
    }));
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

      setCurrentNote((prevNote) => ({
        ...prevNote,
        images: [...prevNote.images, ...base64Images].slice(-3),
      }));

      console.log("Images converted to base64:", base64Images);
    } catch (error) {
      console.error("Error converting file to base64:", error);
    }
  };
  const handleNoteChange = (key, value) => {
    setCurrentNote((prevNote) => ({
      ...prevNote,
      [key]: value,
    }));
  };
  const handlePinAction = () => {
    setCurrentNote((prevNote) => ({
      ...prevNote,
      isPinned: !prevNote.isPinned,
    }));
  };
  const handleArchive = () => {
    setCurrentNote((prevNote) => ({
      ...prevNote,
      state: prevNote.state === "active" ? "archived" : "active",
    }));
  };
  const handleCancel = () => {
    closeNote();
  };

  const handleSaveNote = () => {
    setNote(currentNote);
    handleCloseNote && handleCloseNote();
  };
  useEffect(() => {
    if (
      currentNote.images.length ||
      currentNote.text.length > 200 ||
      currentNote.heading.length > 80
    ) {
      if (setclassName) {
        setclassName(
          `h-40rem ${currentNote.images.length ? "image-true" : "image-false"}`
        );
      }
    } else {
      if (setclassName) {
        setclassName("h-34rem");
      }
    }
  }, [currentNote.images, currentNote.text, currentNote.heading]);
  const handleRemoveImage = (indexToRemove) => {
    setCurrentNote((prevNote) => {
      const updatedImages = prevNote.images.filter(
        (_, index) => index !== indexToRemove
      );
      return {
        ...prevNote,
        images: updatedImages,
      };
    });
  };

  return (
    <div
      className={`text-editor-card ${
        currentNote.images.length > 0 ? "h-34rem" : "h-14rem"
      } ${
        currentNote.images.length ||
        currentNote.text.length > 200 ||
        currentNote.heading.length > 80
          ? `h-40rem ${
              currentNote.images.length ? "image-true" : "image-false"
            }`
          : "h-34rem"
      }`}
    >
      <div className="scroll-conatiner">
        <div
          className={
            currentNote.images.length > 0
              ? "d-flex justify-content-center h-20rem p-4px"
              : ""
          }
        >
          {currentNote.images.map((image, index) => (
            <div key={index} className="image-wrapper position-relative">
              <img
                src={image}
                className="image-item"
                alt={`Image ${index + 1}`}
              />
              <div
                className="add-icons-container top-right"
                onClick={() => handleRemoveImage(index)}
              >
                <img src={Close} alt="close" className="add-tools-icon" />
              </div>
            </div>
          ))}
        </div>
        <div className="d-flex align-items-start flex-column gap-12px p-4px">
          <div
            onClick={handlePinAction}
            className="d-flex justify-content-between align-items-center"
          >
            <div className="add-icons-container">
              <img
                src={currentNote.isPinned ? PinFill : PinLine}
                alt="PinMe"
                className="add-tools-icon"
              />
            </div>
          </div>
          <div className="d-flex flex-column w-100 gap-12px">
            <textarea
              value={currentNote.heading}
              onChange={(e) => handleNoteChange("heading", e.target.value)}
              placeholder="Heading"
              className={`dy-font-size ${
                currentNote.heading.length > 80
                  ? currentNote.images.length
                    ? "h-d50px"
                    : "h-d130px"
                  : ""
              }`}
            />
            <textarea
              value={currentNote.text}
              onChange={(e) => handleNoteChange("text", e.target.value)}
              placeholder="Take a note..."
              className={`dy-font-size ${
                currentNote.text.length > 100
                  ? currentNote.images.length
                    ? "h-d70px image-true"
                    : currentNote.text.length > 180
                    ? "h-d350px"
                    : `h-d70px${
                        currentNote.images.length ? "image-true" : "image-false"
                      }`
                  : ""
              }`}
            />
          </div>
        </div>
      </div>

      <div>
        <div className="tool-containers d-flex justify-content-between align-items-center w-100">
          <div className="d-flex ">
            <div
              onClick={handleImageUploadClick}
              className="add-icons-container"
            >
              <img src={AddImage} alt="AddImage" className="add-tools-icon" />
            </div>
            <div className="add-icons-container">
              {!backgroundPicker ? (
                <img
                  src={backgroundSelector}
                  alt="AddBackground"
                  className="add-tools-icon"
                  onClick={() => setBackgroundPicker(true)}
                />
              ) : (
                <input
                  type="color"
                  value={currentNote.background}
                  onChange={handleColorChange}
                  onBlur={() => setBackgroundPicker(false)}
                  className="color-input"
                />
              )}
            </div>
            <div onClick={handleDeleteNote} className="add-icons-container">
              <img src={Delete} alt="Delete" className="add-tools-icon" />
            </div>
            {currentNote.id ? (
              <div onClick={handleArchive} className="add-icons-container">
                <img
                  src={currentNote.state === "active" ? Archive : UnArchive}
                  alt="Archive/Un-Archive"
                  className="add-tools-icon"
                />
              </div>
            ) : ""}
          </div>
          <div className="d-flex gap-12px">
            <div onClick={handleCancel} className="add-icons-container">
              <div className="dy-font-size">Cancel</div>
            </div>
            <div onClick={handleSaveNote} className="add-icons-container">
              <div className="dy-font-size">Done</div>
            </div>
          </div>
        </div>
      </div>
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

export default Note;
