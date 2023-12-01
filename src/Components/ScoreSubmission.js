import React, { useState } from "react";
import axios from "axios";
import "../static/scoreSubmission.css";
import noBtn from "../static/images/no-btn.png";
import noBtnFocus from "../static/images/no-btn-focus.png";
import yesBtn from "../static/images/yes-btn.png";
import yesBtnFocus from "../static/images/yes-btn-focus.png";

export default function ScoreSubmission({ player, username, score, onExit }) {
  const [playerName, setPlayerName] = useState(username);

  async function handleSubmission(event) {
    event.preventDefault();

    const data = {
      record: {
        googleId: player.uid,
        score: score,
      },
      name: playerName,
    };

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

  function cancelSubmit(event) {
    event.preventDefault();
    onExit();
  }

  return (
    <div className="record-submission">
      <div>
        <p>Add your score to the leaderboard?</p>
        <div className="submission-confirmation">
          <img
            src={yesBtn}
            onClick={handleSubmission}
            className="confirm-btn"
            onMouseOver={(e) => (e.target.src = yesBtnFocus)}
            onMouseOut={(e) => (e.target.src = yesBtn)}
          ></img>
          <img
            src={noBtn}
            onClick={cancelSubmit}
            className="confirm-btn"
            onMouseOver={(e) => (e.target.src = noBtnFocus)}
            onMouseOut={(e) => (e.target.src = noBtn)}
          ></img>
        </div>
        <div className="submit-modal">
          <form>
            <label className="input-label">Enter your name</label>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
            ></input>
          </form>
        </div>
      </div>
    </div>
  );
}
