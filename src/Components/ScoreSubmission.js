import React, { useState, useEffect } from "react";
import axios from "axios";
import "../static/scoreSubmission.css";

export default function ScoreSubmission({ score, onExit }) {
  const handleSubmission = () => {
    console.log(`Submitted score: ${score}`);
    onExit();
  };

  return (
    <div className="record-submission">
      <p>Would you like to be added to the leaderboard?</p>
      <button onClick={handleSubmission}>Yes</button>
      <button onClick={onExit}>No</button>
    </div>
  );
}
