import React, { createContext, useReducer } from "react";

const initialState = {
  stats: { trys: 0, success: 0, failure: 0 },
  over: false,
};
const store = createContext(initialState);
const { Provider } = store;

const reducer = (state, action) => {
  switch (action.type) {
    case "OVER":
      return { ...state, over: true };
    case "MAIN_DATA":
      return { ...state, data: action.payload };
    case "GAME_OPTIONS":
      return { ...state, options: action.payload };
    case "SUCCESS":
      return {
        ...state,
        stats: {
          ...state.stats,
          success: state.stats.success + 1,
          trys: state.stats.trys + 1,
        },
      };
    case "FAILURE":
      return {
        ...state,
        stats: {
          ...state.stats,
          failure: state.stats.failure + 1,
          trys: state.stats.trys + 1,
        },
      };
    case "RESET":
      return {
        ...state,
        stats: { trys: 0, success: 0, failure: 0 },
        over: false,
      };

    default:
      return state;
  }
};
const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
