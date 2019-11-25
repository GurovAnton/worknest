import React from 'react';
import ReactDOM from 'react-dom';

export const PortalPopup = ({ text, value, onClick }) =>
  value
    ? ReactDOM.createPortal(
        <div className="modal">
          <div className="modal-text">{text}</div>
          <div className="modal-close" onClick={() => onClick(false)}>
            &times;
          </div>
        </div>,
        document.body,
      )
    : null;
