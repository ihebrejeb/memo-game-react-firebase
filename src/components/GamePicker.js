import React from "react";
import { AuthContext } from "../auth";
import firebase, { auth } from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { Grid, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
export default function GamePicker() {
  const history = useHistory();

  const authContext = React.useContext(AuthContext);
  const provider = new firebase.auth.GoogleAuthProvider();
  function handleClick() {
    auth.signInWithPopup(provider).then(function (result) {
      authContext.setUser(result.user);
      history.push("/game-1-options");
    });
  }
  React.useEffect(() => {
    if (authContext.authenticated) {
      history.push("/game-1-options");
    }
  }, [authContext.authenticated, history]);
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      style={{ height: "80vh" }}
    >
      <Button
        color="secondary"
        variant="contained"
        size="large"
        className="start-button"
        onClick={handleClick}
      >
        <FontAwesomeIcon icon={faSignInAlt} className="google" />
        login with google
      </Button>
    </Grid>
  );
}
