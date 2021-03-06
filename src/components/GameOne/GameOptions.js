import React from "react";
import {
  Grid,
  Card,
  CardContent,
  FormControl,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Radio,
  Checkbox,
  Button,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { store } from "../../store";
import Leaderboard from "../Leaderboard";
export default function GameOptions() {
  const history = useHistory();
  const { state, dispatch } = React.useContext(store);
  const [gamesize, setGamesize] = React.useState(
    state.options ? state.options.grid : "4*3"
  );
  const [isVisible, setIsVisible] = React.useState(
    state.options ? state.options.isVisible : false
  );

  const startGame = () => {
    dispatch({
      type: "GAME_OPTIONS",
      payload: { grid: gamesize, isVisible },
    });

    dispatch({
      type: "RESET",
    });
    history.push("/game-1");
  };
  return (
    <>
      <Leaderboard></Leaderboard>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        style={{ height: "80vh" }}
      >
        <Card>
          <CardContent>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <FormControl component="fieldset" style={{ margin: "10px" }}>
                <FormLabel component="legend">Game Grid</FormLabel>
                <RadioGroup
                  aria-label="game"
                  name="game"
                  value={gamesize}
                  onChange={(event) => {
                    setGamesize(event.target.value);
                  }}
                >
                  <FormControlLabel
                    value="4*4"
                    control={<Radio />}
                    label="4x4"
                  />
                  <FormControlLabel
                    value="4*3"
                    control={<Radio />}
                    label="4x3"
                  />
                </RadioGroup>
              </FormControl>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isVisible}
                    onChange={() => {
                      setIsVisible(!isVisible);
                    }}
                    name="isVisible"
                  />
                }
                label="visible on start"
              />
              <Button color="secondary" variant="contained" onClick={startGame}>
                GO
              </Button>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}
