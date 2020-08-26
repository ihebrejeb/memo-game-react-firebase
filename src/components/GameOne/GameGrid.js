import React from "react";
import { Grid } from "@material-ui/core";
import GameCard from "./GameCard";
import { store } from "../../store";
import { shuffle } from "../../helpers/shuffle";

export default function GameGrid() {
  const { state } = React.useContext(store);
  const [content, setContent] = React.useState([]);
  const [flipped, setFlipped] = React.useState([]);
  const [solved, setSolved] = React.useState([]);
  const [disabled, setDisabled] = React.useState(false);

  function flip(id) {
    setDisabled(true);
    if (flipped.length === 0) {
      setFlipped([id]);
      setDisabled(false);
    } else {
      if (sameCardClicked(id)) return;
      setFlipped([...flipped, id]);
      if (isMatch(id)) {
        setSolved([...solved, ...flipped, id]);
        setFlipped([]);
        setDisabled(false);
      } else {
        setTimeout(() => {
          setFlipped([]);
          setDisabled(false);
        }, 1000);
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
    // eslint-disable-next-line no-eval
    let size = eval(state.options.grid) / 2;
    let i = 0;
    let data = [...state.data.slice(0, size), ...state.data.slice(0, size)].map(
      (item) => {
        return { ...item, id: i++ };
      }
    );
    setContent(shuffle(data));
  }, [state.data, state.options.grid]);

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      style={{ height: "100vh", width: "100%" }}
    >
      <Grid
        container
        spacing={10}
        direction="row"
        justify="center"
        alignItems="center"
        style={{ maxWidth: "60%" }}
      >
        {content.map((item) => {
          return (
            <GameCard
              key={item.id}
              flipped={flipped.includes(item.id) || solved.includes(item.id)}
              flip={flip}
              data={item}
              disabled={disabled}
            ></GameCard>
          );
        })}
      </Grid>
    </Grid>
  );
}
