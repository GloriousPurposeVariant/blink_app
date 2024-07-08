import React from 'react';
import './modal.css';

const Modal = ({ isOpen, onClose, children, background = '#ffffff' }) => {
  if (!isOpen) return null;
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div style={{ backgroundColor: background }} className="modal-content" onClick={handleContentClick}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
