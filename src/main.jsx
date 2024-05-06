import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { ActiveTabProvider } from "./context/ActiveTabProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <ActiveTabProvider>
        <App />
      </ActiveTabProvider>
    </AuthProvider>
  </BrowserRouter>
);
