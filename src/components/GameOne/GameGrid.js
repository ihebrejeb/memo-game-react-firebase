/* eslint-disable no-eval */
import React from "react";
import { Button } from "@material-ui/core";
import GameCard from "./GameCard";
import { store } from "../../store";
import { shuffle } from "../../helpers/shuffle";
import { useHistory } from "react-router-dom";
import { Popup } from "./Popup";
export default function GameGrid() {
  const { state, dispatch } = React.useContext(store);
  const [content, setContent] = React.useState([]);
  const [flipped, setFlipped] = React.useState([]);
  const [solved, setSolved] = React.useState([]);
  const [disabled, setDisabled] = React.useState(false);
  const [notMatch, setNotMatch] = React.useState(false);
  const history = useHistory();
  function flip(id) {
    if (solved.includes(id)) return;
    setDisabled(true);
    if (flipped.length === 0) {
      //if the first card is flipped
      setFlipped([id]);
      setDisabled(false);
    } else {
      //if the second card is flipped
      if (sameCardClicked(id)) {
        setDisabled(false);
        return;
      } //and not the same as the first one
      setFlipped([...flipped, id]);
      if (isMatch(id)) {
        // if the two cards are matched //success
        setSolved([...solved, ...flipped, id]);
        setFlipped([]);
        setDisabled(false);
        dispatch({
          type: "SUCCESS",
        });
      } else {
        dispatch({
          type: "FAILURE",
        });
        // if the two cards are not matched //failure

        setNotMatch(true);
      }
    }
  }
  function isMatch(id) {
    const oldCard = content.find((card) => card.id === flipped[0]);
    const newCard = content.find((card) => card.id === id);

    return oldCard.name === newCard.name;
  }
  function sameCardClicked(id) {
    return flipped.includes(id);
  }
  React.useEffect(() => {
    if (
      eval(state.options ? state.options.grid : 0) * 5 === state.stats.trys ||
      state.stats.success === eval(state.options ? state.options.grid : 0) / 2
    ) {
      console.log("over");
      dispatch({
        type: "OVER",
      });
    }
  }, [
    content.length,
    dispatch,
    state.options,
    state.stats.success,
    state.stats.trys,
  ]);
  React.useEffect(() => {
    if (!state.options) history.push("/game-1-options");
  }, [history, state.options]);
  React.useEffect(() => {
    if (state.options) {
      // eslint-disable-next-line no-eval
      let size = eval(state.options.grid) / 2;
      let i = 0;
      let data = [
        ...state.data.slice(0, size),
        ...state.data.slice(0, size),
      ].map((item) => {
        return { ...item, id: i++ };
      });
      setContent(shuffle(data));
    }
  }, [state.data, state.options]);
  React.useEffect(() => {
    if (!notMatch) return;
    const to = setTimeout(() => {
      setFlipped([]);
      setDisabled(false);
      setNotMatch(false);
    }, 500);

    return () => {
      clearTimeout(to);
    };
  }, [notMatch]);
  function restartGame() {
    if (disabled) return;
    if (state.options && state.options.isVisible) {
      setDisabled(true);
      setTimeout(() => {
        setSolved(content.map((i) => i.id));
      }, 500);
      setTimeout(() => {
        setSolved([]);
        setDisabled(false);
      }, 2000);
    }
    setSolved([]);

    setContent(shuffle(content));
    setFlipped([]);
    dispatch({
      type: "RESET",
    });
  }
  React.useEffect(() => {
    let to;
    if (state.options && state.options.isVisible) {
      setDisabled(true);
      setSolved(content.map((i) => i.id));
      to = setTimeout(() => {
        setSolved([]);
        setDisabled(false);
      }, 1500);
    }
    return () => clearTimeout(to);
  }, [content, state.options]);
  function goback() {
    dispatch({
      type: "RESET",
    });
    history.push("/game-1-options");
  }
  return (
    <>
      <Popup restartGame={restartGame}></Popup>
      <div className="game-grid">
        <div className="game-grid-item stats">
          <Button color="primary" variant="contained" onClick={goback}>
            BACK
          </Button>
          <h1>
            Trys left:
            {eval(state.options ? state.options.grid : 0) * 5 -
              state.stats.trys}
          </h1>

          <h1>SCORE:{state.stats.success * 5 - state.stats.failure}</h1>
          <Button color="secondary" variant="contained" onClick={restartGame}>
            RESTART
          </Button>
        </div>
        <div className="game-grid-item">
          <div
            className="card-container"
            style={
              content.length === 12 ? { width: "700px" } : { width: "500px" }
            }
          >
            {content.map((item) => {
              return (
                <GameCard
                  key={item.id}
                  flipped={
                    flipped.includes(item.id) || solved.includes(item.id)
                  }
                  flip={flip}
                  data={item}
                  length={content.length}
                  disabled={disabled}
                ></GameCard>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
