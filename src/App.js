import React from "react";
import "./App.css";
import { store } from "./store";
import GamePicker from "./components/GamePicker";
import GameOptions from "./components/GameOne/GameOptions";
import GameGrid from "./components/GameOne/GameGrid";
import UserInfo from "./components/UserInfo";

import { BrowserRouter, Switch, Route } from "react-router-dom";

async function fetchData() {
  const res = await fetch(
    "https://restcountries.eu/rest/v2/region/europe?fields=name;flag"
  );
  if (res.ok) {
    return await res.json();
  }
}
function App() {
  const globalState = React.useContext(store);
  const { state, dispatch } = globalState;
  React.useEffect(() => {
    fetchData().then((data) => {
      dispatch({
        type: "MAIN_DATA",
        payload: data,
      });
    });
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <UserInfo></UserInfo>
        <Switch>
          <Route path="/game-1-options">
            {state.data && <GameOptions></GameOptions>}
          </Route>
          <Route path="/game-1">{state.data && <GameGrid></GameGrid>}</Route>
          <Route path="/">
            <GamePicker></GamePicker>
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
