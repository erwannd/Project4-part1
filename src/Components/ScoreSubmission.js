import React, { useState, useEffect } from "react";
import axios from "axios";
import "../static/scoreSubmission.css";
import noBtn from "../static/images/no-btn.png";
import noBtnFocus from "../static/images/no-btn-focus.png";
import yesBtn from "../static/images/yes-btn.png";
import yesBtnFocus from "../static/images/yes-btn-focus.png";

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
        <p>Add your score to the leaderboard?</p>
        <div className="confirm-submission">
          <img
            src={yesBtn}
            onClick={handleSubmission}
            className="confirm-btn"
            onMouseOver={(e) => (e.target.src = yesBtnFocus)}
            onMouseOut={(e) => (e.target.src = yesBtn)}
          ></img>
          <img
            src={noBtn}
            onClick={handleNoSubmission}
            className="confirm-btn"
            onMouseOver={(e) => (e.target.src = noBtnFocus)}
            onMouseOut={(e) => (e.target.src = noBtn)}
          ></img>
        </div>
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        ></input>
      </form>
    </div>
  );
}
