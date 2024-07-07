import React from "react";
import "./note.css"; // Optionally, define styles for this component
import AddImage from "../../../assets/add-image.png";
import backgroundSelector from "../../../assets/backgroundSelector.png";
import Delete from "../../../assets/delete.png";
import PinLine from "../../../assets/pin-line.png";
import PinFill from "../../../assets/pin-fill.png";
import Close from "../../../assets/close.png";

const Note = ({
  note,
  setNote,
  handleDeleteNote,
  handleCloseNote,
  handleImageUploadClick,
}) => {
  const handlePinAction = () => {
    setNote({
      ...note,
      isPinned: !note.isPinned,
    });
  };

  return (
    <div
      className={`text-editor-card ${
        note.images.length > 0 ? "h-34rem" : "h-14rem"
      }`}
    >
      <div className="scroll-conatiner">
        {/* <div className="image-container"> */}
          {/* {note.images.length > 0 && <div>Images</div>} */}
          <div className={note.images.length > 0 ? "d-flex justify-content-center h-20rem p-4px": ""}>
            {note.images.map((image, index) => (
              <div key={index} className="image-wrapper">
                <img
                  src={image}
                  className="image-item"
                  alt={`Image ${index + 1}`}
                />
              </div>
            ))}
          {/* </div> */}
        </div>
        <div className="d-flex align-items-start gap-12px">
          <div className="d-flex flex-column w-100 gap-12px">
            <textarea
              value={note.heading}
              onChange={(e) => setNote({ ...note, heading: e.target.value })}
              placeholder="Heading"
              className="dy-font-size"
            />
            <textarea
              value={note.text}
              onChange={(e) => setNote({ ...note, text: e.target.value })}
              placeholder="Take a note..."
              className="dy-font-size"
            />
          </div>
          <div
            onClick={handlePinAction}
            className="d-flex justify-content-between align-items-center"
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
      </div>

      <div>
        <div className="tool-containers d-flex justify-content-between w-100">
          <div className="d-flex ">
            <div
              onClick={handleImageUploadClick}
              className="add-icons-container"
            >
              <img src={AddImage} alt="AddImage" className="add-tools-icon" />
            </div>
            <div className="add-icons-container">
              <img
                src={backgroundSelector}
                alt="AddBackground"
                className="add-tools-icon"
              />
            </div>
            <div onClick={handleDeleteNote} className="add-icons-container">
              <img src={Delete} alt="Delete" className="add-tools-icon" />
            </div>
          </div>
          <div onClick={handleCloseNote} className="add-icons-container">
            <img src={Close} alt="Close" className="add-tools-icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Note;
