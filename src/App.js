import React, { useEffect, useState } from "react";
import "./App.css";
import phraseList from "./static/phrases.json";
import PlayerGuess from "./GetPlayerGuess";

export default function App() {
  const [randomPhrase, setRandomPhrase] = useState("");
  const [displayedPhrase, setDisplayedPhrase] = useState("");

  useEffect(() => {
    setDisplayedPhrase(hideRandomPhrase(randomPhrase));
  }, [randomPhrase]);

  const handleClick = () => {
    const rdn = getRandomPhrase();
    console.log(rdn);
    setRandomPhrase(rdn);
  };

  return (
    <div className="App">
      <p>{randomPhrase}</p>
      <p>{displayedPhrase}</p>
      <PlayerGuess />
      <button onClick={handleClick}>Click Me</button>
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
