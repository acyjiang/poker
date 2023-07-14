import React from "react";
import "../styles.css";
import PlayingCard from "./card";

export default function Player({ data }) {
  return (
    <div className="player">
      <span className="value">{data.name}:</span>
      <PlayingCard data={data.cards[0]} />
      <PlayingCard data={data.cards[1]} />
      <span className="value">{data.stack}</span>
    </div>
  );
}
