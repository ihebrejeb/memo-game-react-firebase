import React from "react";
import "./card.css";
import { Card } from "@material-ui/core";
export default function GameCard({ data, flipped, flip, disabled, length }) {
  return (
    <div className={`flip-container ${flipped ? "flipped" : ""}`}>
      <div
        className="flipper"
        style={
          length === 12
            ? { width: "150px", height: "150px" }
            : { width: "100px", height: "100px" }
        }
        onClick={() => (disabled ? null : flip(data.id))}
      >
        <Card className="front">
          <img src={data.flag} alt={data.name} style={{ width: "70%" }}></img>
        </Card>
        <Card className="back"></Card>
      </div>
    </div>
  );
}
