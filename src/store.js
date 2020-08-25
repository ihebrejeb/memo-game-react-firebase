import React, { createContext, useReducer } from "react";

const initialState = {
  stats: { trys: 0, success: 0, failure: 0 },
  options: { grid: "4x3", isVisible: false },
};
const store = createContext(initialState);
const { Provider } = store;

const reducer = (state, action) => {
  switch (action.type) {
    case "MAIN_DATA":
      return { ...state, data: action.payload };
    case "GAME_OPTIONS":
      return { ...state, options: action.payload };
    default:
      return state;
  }
};
const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
