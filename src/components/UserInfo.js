import React from "react";
import { AuthContext } from "../auth";
import { auth } from "../firebase";
import { useHistory } from "react-router-dom";
import { Avatar, Card, Button } from "@material-ui/core";

export default function UserInfo() {
  const history = useHistory();
  const authContext = React.useContext(AuthContext);
  React.useEffect(() => {
    if (!authContext.authenticated) {
      history.push("/");
    }
  }, [authContext.authenticated, history]);

  return authContext.authenticated ? (
    <UserCard authContext={authContext}></UserCard>
  ) : (
    <></>
  );
}

function UserCard({ authContext }) {
  const history = useHistory();
  const handleSignout = () => {
    auth.signOut().then(() => {
      history.push("/");
    });
  };
  return (
    <Card className="user-info">
      <Avatar
        alt={authContext.user.displayName}
        src={authContext.user.photoURL}
      />
      <h3>{authContext.user.displayName}</h3>
      <Button
        color="secondary"
        variant="contained"
        size="small"
        onClick={handleSignout}
      >
        Sign out
      </Button>
    </Card>
  );
}
