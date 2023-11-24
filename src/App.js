import React, { useEffect, useState } from "react";
import "./App.css";
import phraseList from "./static/phrases.json";
import PlayerGuess from "./Components/GetPlayerGuess";

export default function App() {
  const [gameStart, setGameStart] = useState(false);
  const [randomPhrase, setRandomPhrase] = useState("");
  const [displayedPhrase, setDisplayedPhrase] = useState("");
  const [submittedGuess, setSubmittedGuess] = useState("");
  const [previousGuesses, setPreviousGuesses] = useState([]);
  const [gameComplete, setGameCompletion] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [message, setMessage] = useState("");
  const [health, setHealth] = useState(5);

  useEffect(() => {
    setDisplayedPhrase(hideRandomPhrase(randomPhrase));
  }, [randomPhrase]);

  // This function is run when the player clicks the start button
  const handleClick = () => {
    setGameStart(true);
    const rdn = getRandomPhrase();
    setRandomPhrase(rdn);
    console.log(rdn);
  };

  const clearFeedback = () => {
    setFeedback("");
  };

  // Function to handle guess submission
  const handleGuess = (guess) => {
    setSubmittedGuess(guess);

    if (randomPhrase.toLowerCase().includes(guess.toLowerCase())) {
      // Player guess is correct
      setFeedback("Your guess is correct");
      const updatedPhrase = updateDisplayedPhrase(
        randomPhrase,
        displayedPhrase,
        guess
      );

      // If there's no more asterisk, the user has successfully guessed the phrase
      if (!updatedPhrase.includes("*")) {
        setGameCompletion(true);
        setMessage(`You guessed the secret phrase!`);
      }
      setDisplayedPhrase(updatedPhrase);
    } else {
      // Player guess incorrectly
      setFeedback("Your guess is not in the phrase");
      setHealth(health - 1);

      // If health is zero after state update, the game is over
      if (health - 1 === 0) {
        setGameCompletion(true);
        setMessage(`GAME OVER. The phrase is: ${randomPhrase}`);
      }
    }

    setPreviousGuesses([...previousGuesses, guess.toLowerCase()]);
  };

  return (
    <div className="App">
      {!gameStart ? ( // If the game is has not started display START button
        <button onClick={handleClick} className="start-button">
          START
        </button>
      ) : (
        // Do this once the player pressed START
        <div className="main-game-screen">
          <div className="player-info">
            <p>{displayedPhrase}</p>
            <p>health: {health}</p>
          </div>
          <div className="game-div">
            {gameComplete ? (
              // The game is over, show result screen
              <div className="game-result-div">
                <p>{message}</p>
                <button>Play again</button>
              </div>
            ) : (
              // Game is not complete, keep playing
              randomPhrase && (
                <div className="player-guess-div">
                  <PlayerGuess
                    onGuess={handleGuess}
                    previousGuesses={previousGuesses}
                    clearFeedback={clearFeedback}
                  />
                  <p>Submitted guess: {submittedGuess}</p>
                  <p>{feedback}</p>
                </div>
              )
            )}
          </div>
        </div>
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
