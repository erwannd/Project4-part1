import React, { useEffect, useState } from "react";
import "./App.css";
import phraseList from "./static/phrases.json";
import PlayerGuess from "./Components/GetPlayerGuess";

export default function App() {
  const [randomPhrase, setRandomPhrase] = useState("");
  const [displayedPhrase, setDisplayedPhrase] = useState("");
  const [submittedGuess, setSubmittedGuess] = useState("");
  const [previousGuesses, setPreviousGuesses] = useState([]);
  const [gameComplete, setGameCompletion] = useState(false);

  useEffect(() => {
    setDisplayedPhrase(hideRandomPhrase(randomPhrase));
  }, [randomPhrase]);

  const handleClick = () => {
    const rdn = getRandomPhrase();
    setRandomPhrase(rdn);
  };

  const handleGuess = (guess) => {
    setSubmittedGuess(guess);
    const updatedPhrase = updateDisplayedPhrase(
      randomPhrase,
      displayedPhrase,
      guess
    );
    setDisplayedPhrase(updatedPhrase);
    setPreviousGuesses([...previousGuesses, guess.toLowerCase()]);

    // Check game completion
    if (!updatedPhrase.includes("*")) {
      setGameCompletion(true);
    }
  };

  return (
    <div className="App">
      <button onClick={handleClick} className="start-button">
        START
      </button>

      {gameComplete ? (
        <p>You guessed the secret phrase</p>
      ) : (
        randomPhrase && (
          <div className="game-screen">
            <p>{randomPhrase}</p>
            <p>{displayedPhrase}</p>
            <PlayerGuess
              onGuess={handleGuess}
              previousGuesses={previousGuesses}
            />
            <p>Submitted guess: {submittedGuess}</p>
          </div>
        )
      )}
    </div>
  );
}

function getRandomPhrase() {
  const randomNumber = Math.random(); // Generate a random decimal between 0 and 1
  const scaledNumber = Math.floor(randomNumber * phraseList.length);
  return phraseList[scaledNumber];
}

function hideRandomPhrase(phrase) {
  return phrase.replace(/[a-zA-Z]/g, "*"); // Replaces phrase with *'s.
}

function isCharacterPresent(str, char) {
  return str.includes(char);
}

function updateDisplayedPhrase(phrase, displayedPhrase, guess) {
  const phraseArr = displayedPhrase.split("");
  for (let index = 0; index < phrase.length; index++) {
    if (phrase.toLowerCase()[index] === guess.toLowerCase()) {
      phraseArr[index] = phrase[index];
    }
  }
  const updatedHiddenPhrase = phraseArr.join("");
  console.log(phraseArr);
  console.log(updatedHiddenPhrase);
  return updatedHiddenPhrase;
}
