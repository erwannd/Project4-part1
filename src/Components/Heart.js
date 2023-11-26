import React from "react";
import "../static/heart.css";
import filledHeart from "../static/heart_filled.png";
import emptyHeart from "../static/heart_empty.png";

export default function Heart({ remainingLife }) {
  const hearts = Array.from({ length: 5 }, (_, index) => (
    <img
      key={index}
      className="heart-icon"
      src={index < remainingLife ? filledHeart : emptyHeart}
      alt={index < remainingLife ? "filled heart" : "empty heart"}
    />
  ));

  return <div className="health-bar">{hearts}</div>;
}
