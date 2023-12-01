import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import phraseList from "./static/phrases.json";
import PlayerGuess from "./Components/GetPlayerGuess";
import WelcomeBanner from "./Components/WelcomeBanner";
import Title from "./Components/TitleAnimation";
import Heart from "./Components/Heart";
import RecordViewer from "./Components/RecordViewer";
import { CSSTransition } from "react-transition-group";
import LoginForm from "./Components/LoginForm";
import ScoreSubmission from "./Components/ScoreSubmission";
import backBtn from "./static/images/back-btn.png";
import backBtnFocus from "./static/images/back-btn-focus.png";
import startBtn from "./static/images/start-btn.png";
import scoreBtn from "./static/images/score-btn.png";

// Sets a hidden letter into this character
const HIDDEN = "_";
// Maximum number of misses
const STARTING_HEALTH = 5;

export default function App() {
  const [user, setUser] = useState("");
  const [gameStart, setGameStart] = useState(false);
  const [score, setScore] = useState(0);
  const [scoreViewer, setScoreViewer] = useState(false);
  const [welcomeBanner, setWelcomeBanner] = useState(false);
  const [playerName, setPlayerName] = useState(null);
  const [randomPhrase, setRandomPhrase] = useState("");
  const [displayedPhrase, setDisplayedPhrase] = useState("");
  const [previousGuesses, setPreviousGuesses] = useState([]);
  const [gameInProgress, setGameInProgress] = useState(false);
  const [gameComplete, setGameCompletion] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [message, setMessage] = useState("");
  const [health, setHealth] = useState(STARTING_HEALTH);

  useEffect(() => {
    if (gameInProgress) {
      setDisplayedPhrase(hideRandomPhrase(randomPhrase));
    }
  }, [randomPhrase, gameInProgress]);

  // This is run when the player clicks the start button
  const handleStart = () => {
    // Set showBanner to true first
    setGameCompletion(false);
    setPreviousGuesses([]);
    setScore(0);
    setHealth(STARTING_HEALTH);
    setWelcomeBanner(true);

    // Simulate asynchronous setup logic
    Promise.resolve().then(() => {
      // Finally, set gameStart to true
      setGameStart(true);
      setGameInProgress(true);
    });
    const rdn = getRandomPhrase();
    setRandomPhrase(rdn);
    setMessage("");
    setFeedback("");
  };

  const handleBackToMainMenu = () => {
    setGameStart(false);
    setGameCompletion(false);
    setGameInProgress(false);
    setWelcomeBanner(false);
  };

  // This is run when player clicks on highscore button
  const handleView = () => {
    setScoreViewer(true);
  };

  const handleExitSubmission = () => {
    setGameStart(false);
    setGameCompletion(false);
    setGameInProgress(false);
    setMessage("");
  };

  // this will be called by the LoginForm
  function handleLogin(user) {
    setUser(user);
    if (user !== null) {
      axios
        .get(
          `https://wheelofortune.wl.r.appspot.com/findNameById?googleId=${user.uid}`
        )
        .then((response) => {
          if (response.data !== null) {
            setPlayerName(response.data[0].name);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  // Function to handle guess submission
  const handleGuess = (guess) => {
    if (randomPhrase.toLowerCase().includes(guess.toLowerCase())) {
      // Player guess is correct
      setScore(score + 1);
      const updatedPhrase = updateDisplayedPhrase(
        randomPhrase,
        displayedPhrase,
        guess
      );

      // If there's no more asterisk, the user has successfully guessed the phrase
      if (!updatedPhrase.includes(HIDDEN)) {
        setGameCompletion(true);
        setMessage(`You guessed the secret phrase!`);
        setScore(score + health * 5);
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
      <div className="main-display">
        {!gameStart &&
          !scoreViewer && ( // If the game is has not started and viewer is not active display button
            <div className="game-opening">
              <h1>
                <Title text="Wheel of Fortune" />
              </h1>
              <div>
                <LoginForm username={playerName} loginEvent={handleLogin} />
              </div>
              {/* Only show start and highscores button if the user is logged in. */}
              {user && (
                <div className="menu-options">
                  <img
                    src={startBtn}
                    onClick={handleStart}
                    className="start-btn"
                    draggable={false}
                  ></img>
                  <img
                    src={scoreBtn}
                    onClick={handleView}
                    className="score-btn"
                    draggable={false}
                  ></img>
                </div>
              )}
            </div>
          )}

        {/* Show score records when the viewer is set to true */}
        {scoreViewer && (
          <RecordViewer
            playerId={user.uid}
            closeViewer={() => setScoreViewer(false)}
          />
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

          {/* On game start display player info and health */}
          {gameStart && (
            <div>
              <div className="player-status">
                <p className="hidden-phrase">{displayedPhrase}</p>
                <div className="hearts-container">
                  <Heart remainingLife={health} />
                </div>
                <div className="score">Score: {score}</div>
              </div>

              {/* Game is not complete, keep playing */}
              {!gameComplete && randomPhrase && (
                <div className="guess-area">
                  <PlayerGuess
                    onGuess={handleGuess}
                    previousGuesses={previousGuesses}
                    clearFeedback={() => setFeedback("")}
                  />
                  <p className="answer-feedback">{feedback}</p>
                  <img
                    src={backBtn}
                    className="back-btn"
                    onClick={handleBackToMainMenu}
                    onMouseOver={(e) => (e.target.src = backBtnFocus)}
                    onMouseOut={(e) => (e.target.src = backBtn)}
                    draggable={false}
                  ></img>
                </div>
              )}
            </div>
          )}

          {/* Checks for game completion */}
          {gameComplete && (
            // The game is over, show result screen
            <div className="game-result-div">
              <p className="result-message">{message}</p>
              {console.log(message)}
              <ScoreSubmission
                player={user}
                username={playerName}
                score={score}
                onExit={handleExitSubmission}
              />
            </div>
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
