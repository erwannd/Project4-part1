import React, { useEffect, useState } from "react";
import "../static/guessErrorModal.css";

export default function GuessErrorModal({ errorMessage, onCloseError }) {
  return (
    <div className="error-modal-content">
      <button onClick={onCloseError} className="close-button">
        Close
      </button>
      <p className="error-message">{errorMessage}</p>
    </div>
  );
}
