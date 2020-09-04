import React from "react";
import { store } from "../../store";
import { Card, Button, ButtonGroup } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { db, auth } from "../../firebase";
export const Popup = ({ restartGame }) => {
  const { state, dispatch } = React.useContext(store);
  const history = useHistory();
  function goBack() {
    dispatch({
      type: "RESET",
    });
    history.push("/game-1-options");
  }
  React.useEffect(() => {
    if (state.over) {
      db.collection("score")
        .doc(auth.currentUser.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            if (
              doc.data().score <
              state.stats.success * 5 - state.stats.failure
            ) {
              db.collection("score")
                .doc(auth.currentUser.uid)
                .set({
                  score: state.stats.success * 5 - state.stats.failure,
                  name: auth.currentUser.displayName,
                  photo: auth.currentUser.photoURL,
                });
            }
          } else {
            db.collection("score")
              .doc(auth.currentUser.uid)
              .set({
                score: state.stats.success * 5 - state.stats.failure,
                name: auth.currentUser.displayName,
                photo: auth.currentUser.photoURL,
              });
          }
        });
    }
  }, [state.over, state.stats.failure, state.stats.success]);
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
