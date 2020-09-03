import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { StateProvider } from "./store.js";
import { AuthProvider } from "./auth";
ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <StateProvider>
        <App />
      </StateProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
