import React, { useState } from "react";
import GuessErrorModal from "./GuessErrorModal";
import "../static/getPlayerGuess.css";

export default function PlayerGuess({
  onGuess,
  previousGuesses,
  clearFeedback,
}) {
  const [input, setInput] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    setInput(e.target.value);
    clearFeedback();
    clearError();
  };

  const handleInputSubmission = (event) => {
    event.preventDefault();

    // Checks for input validity
    const inputValidation = isValidInput(input, previousGuesses);
    if (inputValidation !== true) {
      setIsError(true);
      setErrorMessage(inputValidation);
      setInput("");
      return;
    }

    console.log(previousGuesses);
    console.log(`Input: ${input}`);
    clearError(); // Clear error message when a valid input is submitted
    onGuess(input);
    setInput("");
  };

  // Function to clear error message
  const clearError = () => {
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
          id="player-input"
        ></input>
      </form>
      {previousGuesses.length > 0 && (
        <p className="previous-guesses">
          Previous guesses: {arrayToString(previousGuesses)}
        </p>
      )}
      <div className="error-modal">
        {isError && <GuessErrorModal errorMessage={errorMessage} />}
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
