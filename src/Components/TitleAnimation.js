import React from "react";
import "../static/titleAnimation.css";

export default function Title({ text }) {
  const letters = text.split("");
  console.log(letters);

  return (
    <div className="animated-text">
      {letters.map((character, index) => (
        <span
          key={index}
          className={character === " " ? "space" : `color-${index + 1}`}
        >
          {character === " " ? "\u00A0" : character}
        </span>
      ))}
    </div>
  );
}
