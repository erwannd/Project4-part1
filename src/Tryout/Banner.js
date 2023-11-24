import React from "react";

export default function Banner({ closeBanner }) {
  return (
    <div className="welcome-banner">
      <div className="banner-content">
        <h2>Welcome!</h2>
        <p>This is a test welcome banner.</p>
        <button onClick={closeBanner} className="close-btn">
          Close
        </button>
      </div>
    </div>
  );
}
