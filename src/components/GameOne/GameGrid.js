import React from "react";
import { Grid } from "@material-ui/core";
import GameCard from "./GameCard";
export default function GameGrid() {
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      style={{ height: "100vh", width: "100%" }}
    >
      <Grid
        container
        spacing={3}
        direction="row"
        justify="space-evenly"
        alignItems="center"
        style={{ height: "80vh", maxWidth: "80%" }}
      >
        <GameCard data="1"></GameCard>
        <GameCard data="2"></GameCard>
        <GameCard data="3"></GameCard>
        <GameCard data="1"></GameCard>
        <GameCard data="2"></GameCard>
        <GameCard data="3"></GameCard>
        <GameCard data="1"></GameCard>
        <GameCard data="2"></GameCard>
        <GameCard data="3"></GameCard>
        <GameCard data="1"></GameCard>
        <GameCard data="2"></GameCard>
        <GameCard data="3"></GameCard>
      </Grid>
    </Grid>
  );
}
