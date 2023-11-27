import React, { useState, useEffect } from "react";
import axios from "axios";
import "../static/scoreSubmission.css";

export default function ScoreSubmission({ player, score, onExit }) {
  // function to handle the user submit of a new book
  // async used so we can use the "await", which causes a block until post is done
  async function handleSubmission(event) {
    event.preventDefault();
    const postData = {
      player: {
        userId: player.uid,
        name: player.displayName,
      },
      score: score,
    };
    console.log(`Submitted your score: ${score}`);

    try {
      const response = await axios.post(
        "https://wheelofortune.wl.r.appspot.com/saveGame",
        postData
      );
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error posting data:", error);
    }
    onExit();
  }

  function handleNoSubmission(event) {
    event.preventDefault();
    console.log(`Do not submit score`);
    onExit();
  }

  return (
    <div className="record-submission">
      <p>Would you like to be added to the leaderboard?</p>
      <button onClick={handleSubmission}>Yes</button>
      <button onClick={handleNoSubmission}>No</button>
    </div>
  );
}

// This is what the post-body-json should look like:
// {
//   "player": {
//       "userId": "special-one",
//       "name": "Jose"
//   },
//   "score": 1900
// }
