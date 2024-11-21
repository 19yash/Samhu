import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Modal = ({ isVisible, hasBackdrop = true, style, children }) => {
  const navigate = useNavigate();
  const modalRef = useRef(null);

  const onModalHide = (e) => {
    if (e.target === modalRef.current) {
      navigate(-1);
    }
  };

  useEffect(() => {
    if (!isVisible) {
      onModalHide();
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div style={{ position: 'relative', zIndex: 1000 }}>
      {hasBackdrop && (
        <div
          onClick={onModalHide}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
        />
      )}
      <div
        ref={modalRef}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          padding: '1rem',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          ...style,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
