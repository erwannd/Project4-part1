import React from "react";
import "../static/heart.css";
import filledHeart from "../static/images/heart_filled.png";
import emptyHeart from "../static/images/heart_empty.png";

export default function Heart({ remainingLife }) {
  const hearts = Array.from({ length: 5 }, (_, index) => (
    <img
      key={index}
      className="heart-icon"
      src={index < remainingLife ? filledHeart : emptyHeart}
      alt={index < remainingLife ? "filled heart" : "empty heart"}
      draggable={false}
    />
  ));

  return <div className="health-bar">{hearts}</div>;
}
