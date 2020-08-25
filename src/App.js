import React from "react";
import "./App.css";
import { store } from "./store";
import GamePicker from "./components/GamePicker";
import GameOneOptions from "./components/GameOne/GameOneOptions";
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
  const { dispatch } = globalState;
  React.useEffect(() => {
    fetchData().then((data) => {
      dispatch({ type: "MAIN_DATA", payload: data });
    });
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/game-1-options">
          <GameOneOptions></GameOneOptions>
        </Route>
        <Route exact path="/">
          <GamePicker></GamePicker>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
