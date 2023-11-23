import React, { useEffect, useState } from "react";

export default function GuessErrorModal({ errorMessage, onCloseError }) {
  return (
    <div>
      <button onClick={onCloseError}>Close</button>
      <p>{errorMessage}</p>
    </div>
  );
}
