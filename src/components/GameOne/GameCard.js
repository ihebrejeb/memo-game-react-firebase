import React from "react";
import "./card.css";
import { Grid, Card } from "@material-ui/core";
export default function GameCard({ data, flipped, flip, disabled }) {
  return (
    <Grid
      item
      xs={6}
      md={3}
      style={{ padding: "10px" }}
      className={`flip-container ${flipped ? "flipped" : ""}`}
    >
      <div
        className="flipper"
        style={{ width: "100%", height: "150px" }}
        onClick={() => (disabled ? null : flip(data.id))}
      >
        <Card className="front">
          <img src={data.flag} alt={data.name} style={{ width: "70%" }}></img>
        </Card>
        <Card className="back"></Card>
      </div>
    </Grid>
  );
}
