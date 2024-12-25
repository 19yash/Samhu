import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import './modal.css'; // CSS for modal styling

const Modal = ({ children }) => {
  const navigate = useNavigate();

  // Close modal when clicking outside the modal content
  const handleOutsideClick = (event) => {
    if (event.target.classList.contains('modal-overlay')) {
      navigate(-1); // Navigate back
    }
  };

  useEffect(() => {
    // Close modal when pressing the Escape key
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        navigate(-1); // Navigate back
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate]);

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={handleOutsideClick}>
      <div className="modal-content">
        {children}
        <button className="modal-close" onClick={() => navigate(-1)}>
          &times;
        </button>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
