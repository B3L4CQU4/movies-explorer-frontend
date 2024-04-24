import React from 'react';
import './ErrorPopup.css';

function ErrorPopup({ onClose, errorMessage }) {
  return (
    <div className="error-popup">
      <div className="error-popup__content">
      <p className="error-popup__content-message">{`${errorMessage.error}: ${errorMessage.message}`}</p>
        <button className="error-popup__content-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default ErrorPopup;