import React, { useEffect, useState } from "react";

export default function PlayerGuess() {
  const [guess, setGuess] = useState("");

  const handleText = (e) => {
    console.log(e.target.value);
    setGuess(e.target.value);
  };

  const handleGuessSubmission = (event) => {
    event.preventDefault();
    console.log(guess);
  };

  return (
    <div className="guess-area">
      <form onSubmit={handleGuessSubmission}>
        <input
          type="text"
          value={guess}
          placeholder="guess a letter"
          onChange={handleText}
        ></input>
        <button type="submit">Guess</button>
      </form>
    </div>
  );
}
