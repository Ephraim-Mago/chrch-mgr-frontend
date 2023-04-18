import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "react-toastify/dist/ReactToastify.min.css";
import "./main.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { ContextProvider } from "./contexts/ContextProvider";
// import "./assets/script.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>
);
