import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import "./Tryout.css";
import Banner from "./Banner";

export default function Tryout() {
  const [gameStart, setGameStart] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  const handleStart = () => {
    // Set showBanner to true first
    setShowBanner(true);

    // Simulate asynchronous setup logic
    Promise.resolve().then(() => {
      // Finally, set gameStart to true
      setGameStart(true);
    });
  };

  return (
    <div className="App">
      <div className="game-screen">
        <p>My name Jeff</p>
        <CSSTransition
          in={showBanner}
          timeout={300}
          classNames={{
            enter: "welcome-banner-enter",
            enterActive: "welcome-banner-enter-active",
            exit: "welcome-banner-exit",
            exitActive: "welcome-banner-exit-active",
          }}
          unmountOnExit
        >
          <Banner closeBanner={() => setShowBanner(false)} />
        </CSSTransition>
      </div>

      {!gameStart && (
        <button onClick={handleStart} className="start-button">
          START
        </button>
      )}
    </div>
  );
}
