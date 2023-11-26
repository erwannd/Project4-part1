import React from "react";
import "../static/welcomeBanner.css";

export default function WelcomeBanner({ onCloseWelcome }) {
  return (
    <div className="welcome-banner-container">
      <div className="welcome-banner-content">
        <h2>Game Instructions</h2>
        <p>You will be given a secret phrase at the start of the game.</p>
        <p>You may guess a letter at a time.</p>
        <p>Uncover the secret phrase, before you run out of life.</p>
        <button onClick={onCloseWelcome} className="close-btn">
          Okay
        </button>
      </div>
    </div>
  );
}
