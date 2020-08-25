import React from "react";
import { Grid, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
export default function GamePicker() {
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      style={{ height: "80vh" }}
    >
      <Link to="/game-1-options">
        <Button
          color="secondary"
          variant="contained"
          size="large"
          className="start-button"
        >
          START
        </Button>
      </Link>
    </Grid>
  );
}
