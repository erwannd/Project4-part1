import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import "./Tryout.css";
import Banner from "./Banner";

export default function Tryout() {
  const [showBanner, setShowBanner] = useState(false);

  return (
    <div className="App">
      <button onClick={() => setShowBanner(true)} className="start-button">
        Show Welcome Banner
      </button>

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
  );
}
