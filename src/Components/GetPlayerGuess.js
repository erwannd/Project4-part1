import React, { useEffect, useState } from "react";
import GuessErrorModal from "./GuessErrorModal";
import "../static/getPlayerGuess.css";

export default function PlayerGuess({ onGuess, previousGuesses }) {
  const [input, setInput] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleInputSubmission = (event) => {
    event.preventDefault();

    // Checks for input validity
    const inputValidation = isValidInput(input, previousGuesses);
    if (inputValidation !== true) {
      setIsError(true);
      setErrorMessage(inputValidation);
      return;
    }

    console.log(previousGuesses);
    console.log(`Input: ${input}`);
    onGuess(input);
    setIsError(false);
    setInput("");
  };

  const closeErrorModal = () => {
    setIsError(false);
    setErrorMessage("");
  };

  return (
    <div className="guess-area">
      <form onSubmit={handleInputSubmission} className="guess-form">
        <input
          type="text"
          value={input}
          placeholder="Guess a letter"
          onChange={handleInputChange}
          className="guess-input"
        ></input>
        <button type="submit" className="guess-button">
          Guess
        </button>
        <p className="previous-guesses">
          Previous guesses: {arrayToString(previousGuesses)}
        </p>
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

function isValidInput(input, previousGuesses) {
  const isLetter = (g) => {
    return /^[a-zA-Z]$/.test(g); // Only single letters are allowed
  };

  const isPreviouslyGuessed = (g, prev) => {
    // Check if player has guessed the same letter
    if (prev.includes(g.toLowerCase())) {
      return true;
    }
  };

  if (input.length === 0) {
    return "Invalid guess: Please guess a letter.";
  } else if (!isLetter(input)) {
    return "Invalid guess: Please enter a single alphabetical character.";
  } else if (isPreviouslyGuessed(input, previousGuesses)) {
    return "Invalid guess: You have already guessed this letter.";
  } else {
    return true;
  }
}
