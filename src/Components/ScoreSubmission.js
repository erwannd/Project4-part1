import React, { useState, useEffect } from "react";
import axios from "axios";
import "../static/scoreSubmission.css";

export default function ScoreSubmission({ player, username, score, onExit }) {
  const [playerName, setPlayerName] = useState(username);

  // function to handle the user submit of a new book
  // async used so we can use the "await", which causes a block until post is done
  async function handleSubmission(event) {
    event.preventDefault();

    const data = {
      record: {
        googleId: player.uid,
        score: score,
      },
      name: playerName,
    };

    console.log(`Submitted your score: ${score}`);

    try {
      const response = await axios.post(
        "https://wheelofortune.wl.r.appspot.com/saveGame",
        data
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
      <form>
        <p>Would you like to be added to the leaderboard?</p>
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        ></input>
        <button onClick={handleSubmission}>Yes</button>
        <button onClick={handleNoSubmission}>No</button>
      </form>
    </div>
  );
}
