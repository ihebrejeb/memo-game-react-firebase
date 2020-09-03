import React from "react";
import { store } from "../../store";
import { Card, Button, ButtonGroup } from "@material-ui/core";
import { useHistory } from "react-router-dom";
export const Popup = ({ restartGame }) => {
  const { state, dispatch } = React.useContext(store);
  const history = useHistory();
  function goBack() {
    dispatch({
      type: "RESET",
    });
    history.push("/game-1-options");
  }
  return state.over ? (
    <div className="popup">
      <Card className="popup-body">
        <h1>Game over</h1>
        <h2>Your score: {state.stats.success * 5 - state.stats.failure}</h2>
        <div className="flex-buttons">
          <ButtonGroup>
            <Button color="secondary" variant="outlined" onClick={restartGame}>
              Play again
            </Button>
            <Button color="primary" variant="outlined" onClick={goBack}>
              Options
            </Button>
          </ButtonGroup>
        </div>
      </Card>
    </div>
  ) : (
    <></>
  );
};
