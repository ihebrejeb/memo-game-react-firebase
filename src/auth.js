import React, { useEffect, useState } from "react";
import firebase from "./firebase";

export const AuthContext = React.createContext({});
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingAuthState, setLoadingAuthState] = useState(true);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
      setLoadingAuthState(false);
    });
  }, []);
  return (
    <AuthContext.Provider
      value={{
        user,
        authenticated: user !== null,
        setUser,
        loadingAuthState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
