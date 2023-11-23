import React, { useEffect, useState } from "react";
import GuessErrorModal from "./GuessErrorModal";

export default function PlayerGuess() {
  const [guess, setGuess] = useState("");
  const [previousGuesses, setPreviousGuesses] = useState([]);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleText = (e) => {
    setGuess(e.target.value);
  };

  const handleGuessSubmission = (event) => {
    event.preventDefault();

    // Checks for guess validity
    const guessCheck = isValidGuess(guess, previousGuesses);
    if (guessCheck !== true) {
      setIsError(true);
      setErrorMessage(guessCheck);
      return;
    }

    setPreviousGuesses([...previousGuesses, guess.toLowerCase()]);
    console.log(previousGuesses);
    console.log(`Guess: ${guess}`);
    setGuess("");
    setIsError(false);
  };

  const closeErrorModal = () => {
    setIsError(false);
    setErrorMessage("");
  };

  return (
    <div className="guess-area">
      <form onSubmit={handleGuessSubmission}>
        <input
          type="text"
          value={guess}
          placeholder="Guess a letter"
          onChange={handleText}
        ></input>
        <button type="submit">Guess</button>
        <p>Previous guesses: {arrayToString(previousGuesses)}</p>
      </form>
      <div className="error-modal">
        {isError && (
          <GuessErrorModal
            errorMessage={errorMessage}
            onCloseError={closeErrorModal}
          />
        )}
      </div>
    </div>
  );
}

function arrayToString(array) {
  return array.join(", ");
}

function isValidGuess(guess, previousGuesses) {
  const isLetter = (g) => {
    return /^[a-zA-Z]$/.test(g); // Only single letters are allowed
  };

  const isPreviouslyGuessed = (g, prev) => {
    // Check if player has guessed the same letter
    if (prev.includes(g.toLowerCase())) {
      return true;
    }
  };

  if (guess.length === 0) {
    return "Invalid guess: Please guess a letter.";
  } else if (!isLetter(guess)) {
    return "Invalid guess: Please enter a single alphabetical character.";
  } else if (isPreviouslyGuessed(guess, previousGuesses)) {
    return "Invalid guess: You have already guessed this letter.";
  } else {
    return true;
  }
}
