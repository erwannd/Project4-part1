import React, { useEffect, useState } from "react";
import "./App.css";
import phraseList from "./static/phrases.json";
import PlayerGuess from "./Components/GetPlayerGuess";
import WelcomeBanner from "./Components/WelcomeBanner";
import Heart from "./Components/Heart";
import { CSSTransition } from "react-transition-group";
import Title from "./Components/TitleAnimation";

// Sets a hidden letter into this character
const HIDDEN = "_";

export default function App() {
  const [gameStart, setGameStart] = useState(false);
  const [welcomeBanner, setWelcomeBanner] = useState(false);
  const [randomPhrase, setRandomPhrase] = useState("");
  const [displayedPhrase, setDisplayedPhrase] = useState("");
  const [previousGuesses, setPreviousGuesses] = useState([]);
  const [gameComplete, setGameCompletion] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [message, setMessage] = useState("");
  const [health, setHealth] = useState(5);

  useEffect(() => {
    setDisplayedPhrase(hideRandomPhrase(randomPhrase));
  }, [randomPhrase]);

  // This function is run when the player clicks the start button
  const handleStart = () => {
    // Set showBanner to true first
    setWelcomeBanner(true);

    // Simulate asynchronous setup logic
    Promise.resolve().then(() => {
      // Finally, set gameStart to true
      setGameStart(true);
    });
    const rdn = getRandomPhrase();
    setRandomPhrase(rdn);
  };

  // Function to handle guess submission
  const handleGuess = (guess) => {
    if (randomPhrase.toLowerCase().includes(guess.toLowerCase())) {
      // Player guess is correct
      setFeedback("Your guess is correct");
      const updatedPhrase = updateDisplayedPhrase(
        randomPhrase,
        displayedPhrase,
        guess
      );

      // If there's no more asterisk, the user has successfully guessed the phrase
      if (!updatedPhrase.includes(HIDDEN)) {
        setGameCompletion(true);
        setMessage(`You guessed the secret phrase!`);
      }
      setDisplayedPhrase(updatedPhrase);
    } else {
      // Player guess incorrectly
      setFeedback("Your guess is not in the phrase");
      setHealth((prevHealth) => prevHealth - 1);

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
      {/* Main screen is always on display */}
      <div className="main-game-screen">
        {!gameStart ? ( // If the game is has not started display START button
          <div className="game-opening">
            <h1>
              <Title text="Wheel of Fortune" />
            </h1>
            <button onClick={handleStart} className="start-button">
              START
            </button>
          </div>
        ) : (
          <div className="player-info">
            <p className="hidden-phrase">{displayedPhrase}</p>
            <div className="hearts-container">
              <Heart remainingLife={health} />
            </div>
          </div>
        )}

        {/* Welcome banner is always on display */}
        <div className="game-div">
          <CSSTransition
            in={welcomeBanner}
            timeout={500}
            classNames={{
              enter: "welcome-banner-enter",
              enterActive: "welcome-banner-enter-active",
              exit: "welcome-banner-exit",
              exitActive: "welcome-banner-exit-active",
            }}
            unmountOnExit
          >
            <WelcomeBanner onCloseWelcome={() => setWelcomeBanner(false)} />
          </CSSTransition>

          {/* Checks for game completion */}
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
                  clearFeedback={() => setFeedback("")}
                />
                <p>{feedback}</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

function getRandomPhrase() {
  const randomNumber = Math.random(); // Generate a random decimal between 0 and 1
  const scaledNumber = Math.floor(randomNumber * phraseList.length);
  return phraseList[scaledNumber];
}

function hideRandomPhrase(phrase) {
  return phrase.replace(/[a-zA-Z]/g, HIDDEN); // Replaces phrase with *'s.
}

function updateDisplayedPhrase(phrase, displayedPhrase, guess) {
  const phraseArr = displayedPhrase.split("");
  for (let index = 0; index < phrase.length; index++) {
    if (phrase.toLowerCase()[index] === guess.toLowerCase()) {
      phraseArr[index] = phrase[index];
    }
  }
  const updatedHiddenPhrase = phraseArr.join("");
  return updatedHiddenPhrase;
}
